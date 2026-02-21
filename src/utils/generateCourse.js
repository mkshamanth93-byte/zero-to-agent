import { INDUSTRY_TEMPLATES } from '../data/industryTemplates'

/**
 * Takes a completed user profile from onboarding and returns
 * all the personalised strings used throughout the course UI.
 * If profile.generatedContent exists (from LLM), it takes precedence over templates.
 */
export function generateCourseProfile(profile) {
  const template = INDUSTRY_TEMPLATES[profile.industry] || INDUSTRY_TEMPLATES['tech-career']
  const name = profile.name || 'You'
  const firstName = name.split(' ')[0]
  const gen = profile.generatedContent || null   // LLM-generated content (may be null)

  // Course title — adapts to goal track
  const courseTitleMap = {
    career:   `${firstName}'s Agentic AI Career Playbook`,
    business: `${firstName}'s Business Automation Playbook`,
    project:  `${firstName}'s Custom Build Playbook`,
  }
  const courseTitle = courseTitleMap[profile.goalTrack] || 'Your Agentic AI Playbook'

  // Eyebrow
  const eyebrow = `${template.label} · 30-Day Build Programme`

  // Subtitle (what they'll build)
  const subtitleMap = {
    career:   '9 modules · 30 days · job search automated · career intelligence built',
    business: '9 modules · 30 days · your business automated · your time reclaimed',
    project:  '9 modules · 30 days · your custom system — designed, built, deployed',
  }
  const subtitle = subtitleMap[profile.goalTrack] || '9 modules · 30 days · 5 working AI systems'

  // Welcome message
  const welcomeMap = {
    career:   `You're already technical. This course gives you the agentic layer that turns that into a competitive edge. In 30 days you'll have a working job search engine and 5 portfolio projects that speak for themselves.`,
    business: `You know your domain. This course gives you the tools to build an intelligent layer on top of it. In 30 days you'll have a working automation system tailored to your ${template.label.toLowerCase()} workflows.`,
    project:  `You know what you want to build. This course is the structured path from idea to deployed system. Every module gets you closer to your specific goal.`,
  }
  const welcomeMessage = welcomeMap[profile.goalTrack] || 'Let\'s build.'

  // Module 7 — LLM-generated takes priority over template
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
          : template.module7Goal.split(' — ')[0],
        subtitle: profile.goalTrack === 'project'
          ? shortenProjectDesc(profile.projectDescription)
          : template.module7Goal.split(' — ')[1] || template.module7Goal,
        description: profile.goalTrack === 'project'
          ? `Your specific project: ${profile.projectDescription || 'described in detail in your profile'}.`
          : template.module7Goal,
      }

  // Module 8 capstone
  const module8 = gen?.module8
    ? { title: gen.module8.capstoneTitle, subtitle: gen.module8.capstoneDescription }
    : {
        title: profile.goalTrack === 'project'
          ? 'Orchestration & Launch'
          : template.module8Capstone.split(' — ')[0] || template.module8Capstone,
        subtitle: 'Connect all the pieces. Deploy the orchestrator. Go live.',
      }

  // MEMORY.md — full draft from LLM, or guide from template
  const memoryMdGuide = buildMemoryMdGuide(profile, template)
  const memoryMdDraft = gen?.memoryMdDraft || null   // ready-to-use if generated

  // Use cases — LLM-generated are more specific
  const useCases = gen?.useCases?.length ? gen.useCases : template.useCases

  // Key projects they'll build
  const keyProjects = gen?.keyProjects?.length
    ? gen.keyProjects
    : buildKeyProjects(profile, template)

  // Tagline — from LLM or template
  const agentTagline = gen?.courseTagline || buildAgentTagline(profile, template)

  // Day 1 message
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
    industryIcon: template.icon,
  }
}

function shortenProjectDesc(desc) {
  if (!desc) return 'Your custom system — designed and built from scratch'
  if (desc.length <= 80) return desc
  return desc.slice(0, 77) + '...'
}

function buildKeyProjects(profile, template) {
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
      { title: template.module7Goal.split(' — ')[0], desc: template.module7Goal.split(' — ')[1] || '' },
    ]
  }
  return [
    { title: 'Research & Intelligence Agent', desc: template.module3ExampleProject },
    { title: 'Knowledge Base Agent', desc: template.module4ExampleProject },
    { title: template.module7Goal.split(' — ')[0], desc: template.module7Goal.split(' — ')[1] || template.module7Goal },
  ]
}

function buildAgentTagline(profile, template) {
  if (profile.goalTrack === 'career') return 'Your career intelligence system — scanning opportunities, prepping applications, tracking your market.'
  if (profile.goalTrack === 'project') return `Your custom system — ${shortenProjectDesc(profile.projectDescription)}`
  return template.tagline
}

function buildMemoryMdGuide(profile, template) {
  const sections = template.memoryMdSections || []
  return {
    intro: `Your MEMORY.md is the file your agent reads before every conversation. The more specific you make it, the smarter every interaction becomes. Here's what to include for your ${template.label} context:`,
    sections,
    tip: 'Be opinionated. "I prefer Xero over QuickBooks" is more useful than "I use accounting software." Specific preferences make your agent dramatically more useful.',
  }
}

/**
 * Given a user profile, returns the adaptive module overrides.
 * Only Modules 3-8 adapt — 0, 1, 2 are universal foundations.
 */
export function getAdaptiveModuleOverrides(profile) {
  const template = INDUSTRY_TEMPLATES[profile.industry] || INDUSTRY_TEMPLATES['tech-career']
  const gen = profile.generatedContent || null

  return {
    3: {
      title: gen?.module3?.title,
      subtitle: gen?.module3?.subtitle || (template.module3ExampleProject
        ? `Build a research agent for ${template.label.toLowerCase()} intelligence.`
        : 'Build a research agent that searches deeper than any human would.'),
      exampleProject: gen?.module3?.projectBrief || template.module3ExampleProject,
    },
    4: {
      title: gen?.module4?.title,
      subtitle: gen?.module4?.subtitle || (template.module4ExampleProject
        ? `Build a knowledge base from your ${template.label.toLowerCase()} domain.`
        : 'Build a RAG agent that knows everything about your work.'),
      exampleProject: gen?.module4?.projectBrief || template.module4ExampleProject,
    },
    5: {
      title: gen?.module5?.title,
      subtitle: gen?.module5?.subtitle,
      exampleProject: gen?.module5?.projectBrief || template.module5ExampleProject,
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
