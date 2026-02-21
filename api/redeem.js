/**
 * POST /api/redeem
 * Body: { email, coupon }
 *
 * Validates a coupon code, atomically decrements its remaining uses,
 * issues a UUID access token, stores it in Vercel KV (Redis).
 *
 * KV keys:
 *   coupon:{CODE}   -> integer (remaining uses)
 *   token:{UUID}    -> JSON string { email, coupon, createdAt }
 */

import { kv } from '@vercel/kv'
import { randomUUID } from 'crypto'

export default async function handler(req, res) {
  // CORS for local dev
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, coupon } = req.body || {}

  if (!email || !coupon) {
    return res.status(400).json({ error: 'Email and coupon code are required.' })
  }

  const emailLower = email.trim().toLowerCase()
  const couponUpper = coupon.trim().toUpperCase()

  if (!emailLower.includes('@') || !emailLower.includes('.')) {
    return res.status(400).json({ error: 'Please enter a valid email address.' })
  }

  if (couponUpper.length < 3) {
    return res.status(400).json({ error: 'Coupon code is too short.' })
  }

  const couponKey = `coupon:${couponUpper}`

  // Check coupon exists and has uses remaining
  const remaining = await kv.get(couponKey)

  if (remaining === null || remaining === undefined) {
    return res.status(400).json({ error: 'Invalid coupon code. Double-check and try again.' })
  }

  const remainingInt = parseInt(remaining, 10)
  if (remainingInt <= 0) {
    return res.status(410).json({ error: 'This coupon has already been fully used.' })
  }

  // Atomically decrement — prevents race conditions
  const newRemaining = await kv.decr(couponKey)
  if (newRemaining < 0) {
    // Race condition — another request won, restore and reject
    await kv.incr(couponKey)
    return res.status(410).json({ error: 'This coupon has already been fully used.' })
  }

  // Issue access token (UUID v4)
  const token = randomUUID()
  const tokenData = JSON.stringify({
    email: emailLower,
    coupon: couponUpper,
    createdAt: new Date().toISOString(),
  })

  // Store for 365 days (ex = seconds)
  await kv.set(`token:${token}`, tokenData, { ex: 60 * 60 * 24 * 365 })

  return res.status(200).json({ token, email: emailLower })
}
