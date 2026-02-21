import { INDUSTRY_TEMPLATES } from '../data/industryTemplates'

/**
 * Takes a completed user profile from onboarding and returns
 * all the personalised strings used throughout the course UI.
 * If profile.generatedContent exists (from LLM), it takes precedence over templates.
 */
export function generateCourseProfile(profile) {
  const template = INDUSTRY_TEMPLATES[profile.industry] || INDUSTRY_TEMPLATES['other']
  const name = profile.name || 'You'
  const firstName = name.split(' ')[0]
  const gen = profile.generatedContent || null

  const courseTitleMap = {
    career:   `${firstName}'s Agentic AI Career Playbook`,
    business: `${firstName}'s Business Automation Playbook`,
    project:  `${firstName}'s Custom Build Playbook`,
    personal: `${firstName}'s Personal AI Playbook`,
  }
  const courseTitle = courseTitleMap[profile.goalTrack] || 'Your Agentic AI Playbook'

  const eyebrow = `${template.label} · 30-Day Build Programme`

  const subtitleMap = {
    career:   '9 modules · 30 days · career intelligence built · portfolio proven',
    business: '9 modules · 30 days · your business automated · your time reclaimed',
    project:  '9 modules · 30 days · your custom system — designed, built, deployed',
    personal: '9 modules · 30 days · your life automated · your routines handled',
  }
  const subtitle = subtitleMap[profile.goalTrack] || '9 modules · 30 days · 5 working AI systems'

  const welcomeMap = {
    career:   `You're already technical. This course gives you the agentic layer that turns that into a competitive edge. In 30 days you'll have working AI systems and portfolio projects that speak for themselves.`,
    business: `You know your domain. This course gives you the tools to build an intelligent layer on top of it. In 30 days you'll have a working automation system tailored to your ${template.label.toLowerCase()} workflows.`,
    project:  `You know what you want to build. This course is the structured path from idea to deployed system. Every module gets you closer to your specific goal.`,
    personal: `You know what eats your time. This course gives you the tools to automate the patterns and focus on what matters. In 30 days your routines run on autopilot.`,
  }
  const welcomeMessage = welcomeMap[profile.goalTrack] || 'Let\'s build.'

  // Module 7 — LLM takes priority, then template
  const m7Template = template.module7Goal || 'Your Custom Automation Agent'
  const module7 = gen?.module7
    ? {
        title: gen.module7.title,
        subtitle: gen.module7.subtitle,
        description: gen.module7.fullBrief,
        keyIntegrations: gen.module7.keyIntegrations || [],
        humanApprovalPoints: gen.module7.humanApprovalPoints || [],
      }
    : {
        title: profile.goalTrack === 'project'
          ? 'Your Custom System Build'
          : m7Template.split(' — ')[0],
        subtitle: profile.goalTrack === 'project'
          ? shortenProjectDesc(profile.projectDescription)
          : m7Template.split(' — ')[1] || m7Template,
        description: profile.goalTrack === 'project'
          ? `Your specific project: ${profile.projectDescription || 'described in detail in your profile'}.`
          : m7Template,
      }

  // Module 8
  const m8Template = template.module8Capstone || 'Full Orchestrated System'
  const module8 = gen?.module8
    ? { title: gen.module8.capstoneTitle, subtitle: gen.module8.capstoneDescription }
    : {
        title: m8Template.split(' — ')[0],
        subtitle: m8Template.split(' — ')[1] || 'Connect all the pieces. Deploy the orchestrator. Go live.',
      }

  // MEMORY.md
  const memoryMdGuide = buildMemoryMdGuide(profile, template)
  const memoryMdDraft = gen?.memoryMdDraft || null

  // Use cases
  const useCases = gen?.useCases?.length ? gen.useCases : (template.useCases || [])

  // Key projects
  const keyProjects = gen?.keyProjects?.length
    ? gen.keyProjects
    : buildKeyProjects(profile, template)

  // Tagline
  const agentTagline = gen?.courseTagline || buildAgentTagline(profile, template)

  const day1Message = gen?.day1Message || null
  const whyThisMatters = gen?.whyThisMatters || template.whyThisMatters || null

  return {
    courseTitle,
    eyebrow,
    subtitle,
    welcomeMessage,
    module7,
    module8,
    memoryMdGuide,
    memoryMdDraft,
    useCases,
    keyProjects,
    agentTagline,
    day1Message,
    whyThisMatters,
    isLLMGenerated: Boolean(gen),
    template,
    industryColor: template.color,
  }
}

function shortenProjectDesc(desc) {
  if (!desc) return 'Your custom system — designed and built from scratch'
  if (desc.length <= 80) return desc
  return desc.slice(0, 77) + '...'
}

function buildKeyProjects(profile, template) {
  const m7Title = (template.module7Goal || 'Your Custom Automation Agent').split(' — ')[0]
  const m7Desc = (template.module7Goal || '').split(' — ')[1] || ''

  if (profile.goalTrack === 'project') {
    return [
      { title: 'Foundation Infrastructure', desc: 'OpenClaw + MEMORY.md personalised for your project' },
      { title: 'Core Integration Build', desc: 'The key API connections your system needs' },
      { title: 'Your Custom System', desc: profile.projectDescription || 'Full build — orchestrated and deployed' },
    ]
  }
  if (profile.goalTrack === 'career') {
    return [
      { title: 'Research Agent', desc: 'Autonomously researches any topic — the backbone of your career intelligence' },
      { title: 'Portfolio RAG Agent', desc: 'Answers questions about your projects from a live vector knowledge base' },
      { title: m7Title, desc: m7Desc },
    ]
  }
  return [
    { title: 'Research & Intelligence Agent', desc: `Research agent for ${template.label.toLowerCase()} intelligence` },
    { title: 'Knowledge Base Agent', desc: `RAG agent that knows your ${template.label.toLowerCase()} domain` },
    { title: m7Title, desc: m7Desc },
  ]
}

function buildAgentTagline(profile, template) {
  if (profile.goalTrack === 'career') return 'Your career intelligence system — scanning opportunities, prepping applications, tracking your market.'
  if (profile.goalTrack === 'project') return `Your custom system — ${shortenProjectDesc(profile.projectDescription)}`
  if (profile.goalTrack === 'personal') return 'Your personal AI — handling the routine so you focus on what matters.'
  return `Your ${template.label.toLowerCase()} automation — handling the patterns so you handle the exceptions.`
}

function buildMemoryMdGuide(profile, template) {
  const sections = [
    'Identity & Role — who you are, what you do',
    `Domain Context — ${template.label.toLowerCase()} specifics and terminology`,
    'Systems & Tools — the software your agent connects to',
    'Key Workflows — the processes you want automated',
    'Automation Preferences — what runs automatically vs. what needs your approval',
    'Communication Style — how you want your agent to talk to you',
  ]
  return {
    intro: `Your MEMORY.md is the file your agent reads before every conversation. The more specific you make it, the smarter every interaction becomes. Here's what to include for your ${template.label} context:`,
    sections,
    tip: 'Be opinionated. "I prefer Xero over QuickBooks" is more useful than "I use accounting software." Specific preferences make your agent dramatically more useful.',
  }
}

/**
 * Returns adaptive module overrides for modules 3–8.
 */
export function getAdaptiveModuleOverrides(profile) {
  const template = INDUSTRY_TEMPLATES[profile.industry] || INDUSTRY_TEMPLATES['other']
  const gen = profile.generatedContent || null

  return {
    3: {
      title: gen?.module3?.title,
      subtitle: gen?.module3?.subtitle || `Build a research agent for ${template.label.toLowerCase()} intelligence.`,
      exampleProject: gen?.module3?.projectBrief,
    },
    4: {
      title: gen?.module4?.title,
      subtitle: gen?.module4?.subtitle || `Build a knowledge base from your ${template.label.toLowerCase()} domain.`,
      exampleProject: gen?.module4?.projectBrief,
    },
    5: {
      title: gen?.module5?.title,
      subtitle: gen?.module5?.subtitle,
      exampleProject: gen?.module5?.projectBrief,
    },
    6: {
      title: gen?.module6?.title,
      subtitle: gen?.module6?.subtitle,
      exampleProject: gen?.module6?.projectBrief,
    },
    7: {
      title: gen?.module7?.title || (profile.goalTrack === 'project' ? 'Your Custom System Build' : undefined),
      subtitle: gen?.module7?.subtitle || (profile.goalTrack === 'project'
        ? shortenProjectDesc(profile.projectDescription)
        : template.module7Goal),
      fullBrief: gen?.module7?.fullBrief,
      keyIntegrations: gen?.module7?.keyIntegrations,
      humanApprovalPoints: gen?.module7?.humanApprovalPoints,
    },
    8: {
      title: gen?.module8?.capstoneTitle,
      subtitle: gen?.module8?.capstoneDescription || 'Connect all agents. Build the orchestrator. Deploy.',
    },
  }
}
