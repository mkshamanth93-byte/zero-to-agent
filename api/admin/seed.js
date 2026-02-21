/**
 * POST /api/admin/seed
 * Header: x-admin-secret: <ADMIN_SECRET env var>
 * Body: { coupons: [{ code: "BETA01", uses: 1 }, ...] }
 *
 * Seeds coupon codes into KV. Call this once to load your initial codes.
 * Protected by ADMIN_SECRET — only you can call this.
 *
 * Example curl:
 *   curl -X POST https://openlearn.academy/api/admin/seed \
 *     -H "Content-Type: application/json" \
 *     -H "x-admin-secret: YOUR_SECRET" \
 *     -d '{"coupons":[{"code":"BETA01","uses":1},{"code":"TESTME","uses":10}]}'
 */

import { Redis } from '@upstash/redis'

const kv = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const adminSecret = process.env.ADMIN_SECRET
  if (!adminSecret) {
    return res.status(500).json({ error: 'ADMIN_SECRET not configured.' })
  }

  const providedSecret = req.headers['x-admin-secret']
  if (providedSecret !== adminSecret) {
    return res.status(401).json({ error: 'Unauthorized.' })
  }

  const { coupons } = req.body || {}

  if (!Array.isArray(coupons) || coupons.length === 0) {
    return res.status(400).json({ error: 'Provide coupons: [{ code, uses }]' })
  }

  const results = []

  for (const { code, uses = 1 } of coupons) {
    if (!code || typeof code !== 'string') continue
    const key = `coupon:${code.trim().toUpperCase()}`
    await kv.set(key, uses)
    results.push({ code: code.toUpperCase(), uses })
  }

  return res.status(200).json({
    seeded: results.length,
    coupons: results,
  })
}
