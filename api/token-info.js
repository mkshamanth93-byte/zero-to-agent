/**
 * GET /api/token-info?token=UUID
 *
 * Returns whether a token is valid and the associated email.
 * Used by the frontend to verify a stored token is still active.
 */

import { Redis } from '@upstash/redis'

const kv = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { token } = req.query

  if (!token) {
    return res.status(400).json({ valid: false, error: 'token is required' })
  }

  const tokenData = await kv.get(`token:${token}`)

  if (!tokenData) {
    return res.status(200).json({ valid: false })
  }

  let parsed
  try {
    parsed = typeof tokenData === 'string' ? JSON.parse(tokenData) : tokenData
  } catch {
    return res.status(200).json({ valid: false })
  }

  return res.status(200).json({
    valid: true,
    email: parsed.email,
    createdAt: parsed.createdAt,
  })
}
