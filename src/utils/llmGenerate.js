/**
 * LLM-powered course personalisation.
 * Makes a single structured call to OpenAI at the end of onboarding.
 * The API key is used for this one call and never stored.
 */

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
Goal track: ${profile.goalTrack} (career = job search automation | business = business process automation | project = build a specific system)
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

const GENERATION_STAGES = [
  { id: 'reading',   label: 'Reading your profile...',              duration: 800 },
  { id: 'modules',   label: 'Designing your module projects...',    duration: 1200 },
  { id: 'memory',    label: 'Writing your MEMORY.md first draft...', duration: 1000 },
  { id: 'examples',  label: 'Tailoring your use cases...',          duration: 800 },
  { id: 'finishing', label: 'Putting it all together...',           duration: 600 },
]

export { GENERATION_STAGES }

/**
 * Validates the API key with a minimal test call before running the full generation.
 */
async function validateApiKey(apiKey) {
  const res = await fetch('https://api.openai.com/v1/models', {
    headers: { Authorization: `Bearer ${apiKey}` },
  })
  if (res.status === 401) throw new Error('Invalid API key. Check it at platform.openai.com/api-keys')
  if (res.status === 429) throw new Error('Rate limit hit. Wait a moment then try again.')
  if (!res.ok) throw new Error(`OpenAI returned ${res.status}. Try again.`)
}

/**
 * Main generation function.
 * @param {string} apiKey — user's OpenAI key, used once and not stored
 * @param {object} profile — completed onboarding profile
 * @param {function} onStage — callback(stageId) called as each stage starts
 * @returns {object} generatedContent
 */
export async function generateWithLLM(apiKey, profile, onStage = () => {}) {
  // Validate key first (fast check)
  await validateApiKey(apiKey)

  onStage('reading')

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: buildSystemPrompt() },
        { role: 'user',   content: buildUserPrompt(profile) },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.72,
      max_tokens: MAX_TOKENS,
    }),
  })

  if (response.status === 401) throw new Error('Invalid API key. Check it at platform.openai.com/api-keys')
  if (response.status === 429) throw new Error('Quota exceeded or rate limit hit. Check your usage at platform.openai.com/usage')
  if (response.status === 500) throw new Error('OpenAI is experiencing issues. Wait a few seconds and try again.')
  if (!response.ok) {
    const body = await response.text().catch(() => '')
    throw new Error(`Generation failed (${response.status}). ${body || 'Try again.'}`)
  }

  const data = await response.json()
  const raw = data.choices?.[0]?.message?.content

  if (!raw) throw new Error('OpenAI returned an empty response. Try again.')

  let parsed
  try {
    parsed = JSON.parse(raw)
  } catch {
    throw new Error('Generated content was malformed. Try again — this is rare.')
  }

  // Validate minimum required fields
  const required = ['courseTagline', 'module7', 'memoryMdDraft', 'useCases']
  const missing = required.filter(f => !parsed[f])
  if (missing.length) throw new Error(`Generation was incomplete (missing: ${missing.join(', ')}). Try again.`)

  onStage('finishing')

  return {
    ...parsed,
    generatedAt: new Date().toISOString(),
    model: MODEL,
  }
}
