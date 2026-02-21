import { INDUSTRY_TEMPLATES } from '../data/industryTemplates'

/**
 * Takes a completed user profile from onboarding and returns
 * all the personalised strings used throughout the course UI.
 */
export function generateCourseProfile(profile) {
  const template = INDUSTRY_TEMPLATES[profile.industry] || INDUSTRY_TEMPLATES['tech-career']
  const name = profile.name || 'You'
  const firstName = name.split(' ')[0]

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

  // Module 7 (the big automation build) — personalised title and subtitle
  const module7 = {
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
  const module8 = {
    title: profile.goalTrack === 'project'
      ? 'Orchestration & Launch'
      : template.module8Capstone.split(' — ')[0] || template.module8Capstone,
    subtitle: 'Connect all the pieces. Deploy the orchestrator. Go live.',
  }

  // MEMORY.md template — what they should write about themselves
  const memoryMdGuide = buildMemoryMdGuide(profile, template)

  // Use case examples for the dashboard preview
  const useCases = template.useCases

  // Key projects they'll build (shown on confirmation screen)
  const keyProjects = buildKeyProjects(profile, template)

  // The "what is your agent doing right now" tagline shown on dashboard
  const agentTagline = buildAgentTagline(profile, template)

  return {
    courseTitle,
    eyebrow,
    subtitle,
    welcomeMessage,
    module7,
    module8,
    memoryMdGuide,
    useCases,
    keyProjects,
    agentTagline,
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

  return {
    3: {
      subtitle: template.module3ExampleProject
        ? `Build a research agent for ${template.label.toLowerCase()} intelligence.`
        : 'Build a research agent that searches deeper than any human would.',
      exampleProject: template.module3ExampleProject,
    },
    4: {
      subtitle: template.module4ExampleProject
        ? `Build a knowledge base from your ${template.label.toLowerCase()} domain.`
        : 'Build a RAG agent that knows everything about your work.',
      exampleProject: template.module4ExampleProject,
    },
    5: {
      exampleProject: template.module5ExampleProject,
    },
    7: {
      title: profile.goalTrack === 'project' ? 'Your Custom System Build' : undefined,
      subtitle: profile.goalTrack === 'project'
        ? shortenProjectDesc(profile.projectDescription)
        : template.module7Goal,
    },
    8: {
      subtitle: 'Connect all agents. Build the orchestrator. Deploy.',
    },
  }
}
