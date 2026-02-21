/**
 * POST /api/generate
 * Body: { token, profile }
 *
 * Validates the access token, checks the daily rate limit, then
 * calls OpenAI using the server-side key. Returns generated course JSON.
 *
 * KV keys:
 *   token:{UUID}              -> token data (validated here)
 *   ratelimit:{YYYY-MM-DD}    -> integer (daily generation count)
 */

import { Redis } from '@upstash/redis'

const kv = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

const MODEL = 'gpt-4o-mini'
const MAX_TOKENS = 3500

function buildSystemPrompt() {
  return `You are an expert agentic AI course designer. Your job is to personalise a structured 30-day course for one specific person.

The course teaches anyone — regardless of industry — how to build AI agents using Python, LangChain, LangGraph, and OpenClaw (a self-hosted agent platform). The 9-module structure is fixed. What you personalise is the content inside each module.

The course modules:
- Module 0: Foundations & Environment Setup (universal)
- Module 1: First Python Agent (universal)
- Module 2: OpenClaw Setup & AgentSkills (universal)
- Module 3: Research Agent — BUILD THIS FOR THEIR DOMAIN
- Module 4: Knowledge Base & RAG Agent — BUILD THIS FOR THEIR DOMAIN
- Module 5: Data Analysis Agent — BUILD THIS FOR THEIR DOMAIN
- Module 6: Situation Prep Agent (interview prep or equivalent) — BUILD THIS FOR THEIR DOMAIN
- Module 7: The Big Build — THEIR SPECIFIC AUTOMATION PROJECT
- Module 8: Multi-Agent Orchestration — CONNECT EVERYTHING

Rules:
- Be extremely specific. Reference their actual tools, software, and systems by name.
- Every project description should name real things from their profile — not generic.
- If they have a project description, Module 7 should be built around it precisely.
- The MEMORY.md should be partially pre-filled with their real context so they can just review and top up.
- Tone: direct, practical, no fluff. Write like a senior engineer briefing a colleague.
- Return ONLY valid JSON, no markdown fences.`
}

function buildUserPrompt(profile) {
  const toolList = [...(profile.tools || []), profile.customTool].filter(Boolean).join(', ') || 'not specified'

  return `User profile:
Name: ${profile.name || 'the user'}
Role: ${profile.role || 'not specified'}
Industry: ${profile.industry || 'general'}
Business type: ${profile.businessType || 'not specified'}
Goal track: ${profile.goalTrack} (career = job search automation | business = business process automation | project = build a specific system | personal = personal life automation)
What they want to automate first: ${profile.automationGoal || 'not specified'}
Specific project description: ${profile.projectDescription || 'none — design based on their role and industry'}
Tools and software they use: ${toolList}
What success looks like to them: ${profile.successVision || 'not specified'}

Generate a JSON object with EXACTLY these fields:

{
  "courseTagline": "One punchy sentence about what they will have built in 30 days. Be specific to their world.",

  "whyThisMatters": "2-3 sentences on why agentic AI is particularly relevant to their specific role and industry. Make it personal — why THIS person, doing THIS job, at THIS type of organisation.",

  "day1Message": "A 2-sentence message for Day 1 that acknowledges their specific situation and what they'll have at the end. Reference their actual goal.",

  "module3": {
    "title": "Research Agent title for their domain (e.g. 'Patient Intake Research Agent', 'Job Market Intelligence Agent', 'Legal Precedent Research Agent')",
    "subtitle": "One sentence — what this research agent does for them specifically",
    "projectBrief": "2-3 sentences describing the research agent they'll build. Be specific to their industry and tools."
  },

  "module4": {
    "title": "Knowledge base / RAG agent title for their domain",
    "subtitle": "One sentence",
    "projectBrief": "2-3 sentences. What knowledge does it index? What questions does it answer?"
  },

  "module5": {
    "title": "Data analysis agent title for their domain",
    "subtitle": "One sentence",
    "projectBrief": "2-3 sentences. What data does it analyse? What outputs does it produce?"
  },

  "module6": {
    "title": "Prep / briefing agent title for their domain (e.g. 'Client Meeting Prep Agent', 'Interview Prep Agent', 'Patient Consultation Briefer')",
    "subtitle": "One sentence",
    "projectBrief": "2-3 sentences."
  },

  "module7": {
    "title": "Their big build title — the main automation they're here for",
    "subtitle": "One sentence summary of the system",
    "fullBrief": "4-6 sentences. Describe the full system: what it connects to, what it does automatically, what the human approves before it acts. If they gave a project description, build this around it precisely. Name the specific APIs/software it integrates with.",
    "keyIntegrations": ["List of specific APIs or software it needs to connect to — by name"],
    "humanApprovalPoints": ["Describe 2-3 specific points where the human reviews before the agent continues"]
  },

  "module8": {
    "capstoneTitle": "Name for their full orchestrated system",
    "capstoneDescription": "2-3 sentences on what the complete system does when all agents are connected."
  },

  "useCases": [
    "5 specific, concrete use cases for their exact role. Each one is a sentence starting with a verb. Reference their actual context."
  ],

  "memoryMdDraft": "A complete, ready-to-use MEMORY.md file for their OpenClaw agent. Use markdown with ## headings. Pre-fill everything you know from their profile. Add [FILL IN] only for details they'd need to add themselves (salary, specific people, internal system names you can't know). Include sections: Identity & Role, Domain Context (their industry specifics), Systems & Tools (pre-fill the ones they listed), Key Workflows (describe their likely workflows), Automation Preferences (what they want automated vs what they prefer to control), Communication Style. Make this genuinely useful — write it as if you know their situation well."
}`
}

async function checkAndIncrementRateLimit() {
  const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD
  const key = `ratelimit:${today}`
  const count = await kv.incr(key)
  if (count === 1) await kv.expire(key, 86400) // expire at end of day
  return count
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { token, profile } = req.body || {}

  if (!token || !profile) {
    return res.status(400).json({ error: 'token and profile are required.' })
  }

  // Validate token
  const tokenData = await kv.get(`token:${token}`)
  if (!tokenData) {
    return res.status(401).json({
      error: 'invalid_token',
      message: 'Your access token is invalid or has expired. Please re-enter your coupon code.',
    })
  }

  // Check daily rate limit
  const DAILY_LIMIT = parseInt(process.env.DAILY_LIMIT || '100', 10)
  const todayCount = await checkAndIncrementRateLimit()

  if (todayCount > DAILY_LIMIT) {
    const today = new Date().toISOString().slice(0, 10)
    await kv.decr(`ratelimit:${today}`) // restore counter
    return res.status(503).json({
      error: 'capacity',
      message: "We're at capacity for course generations right now. Check back in a few hours — or drop a message and we'll sort you out.",
    })
  }

  const openaiKey = process.env.OPENAI_API_KEY
  if (!openaiKey) {
    console.error('OPENAI_API_KEY not set')
    return res.status(500).json({ error: 'Server configuration error. Contact support.' })
  }

  let response
  try {
    response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: buildSystemPrompt() },
          { role: 'user', content: buildUserPrompt(profile) },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.72,
        max_tokens: MAX_TOKENS,
      }),
    })
  } catch (networkErr) {
    console.error('OpenAI network error', networkErr)
    return res.status(502).json({ error: 'Could not reach OpenAI. Check your connection and try again.' })
  }

  if (response.status === 429) {
    return res.status(503).json({
      error: 'capacity',
      message: 'High demand right now. Please try again in a few minutes.',
    })
  }

  if (!response.ok) {
    const body = await response.text().catch(() => '')
    console.error('OpenAI error', response.status, body)
    return res.status(502).json({ error: `Generation failed (${response.status}). Try again.` })
  }

  const data = await response.json()
  const raw = data.choices?.[0]?.message?.content

  if (!raw) {
    return res.status(502).json({ error: 'OpenAI returned an empty response. Try again.' })
  }

  let parsed
  try {
    parsed = JSON.parse(raw)
  } catch {
    return res.status(502).json({ error: 'Generated content was malformed. Try again — this is rare.' })
  }

  const required = ['courseTagline', 'module7', 'memoryMdDraft', 'useCases']
  const missing = required.filter(f => !parsed[f])
  if (missing.length) {
    return res.status(502).json({ error: `Generation was incomplete (missing: ${missing.join(', ')}). Try again.` })
  }

  return res.status(200).json({
    generatedContent: {
      ...parsed,
      generatedAt: new Date().toISOString(),
      model: MODEL,
    },
  })
}
