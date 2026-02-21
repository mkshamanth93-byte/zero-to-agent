/**
 * Shareable preset profiles.
 * Access via /onboarding?for=<key>
 * The form is pre-filled but the user still reviews and confirms.
 */
export const PRESETS = {
  deekshita: {
    name: 'Deekshita',
    role: 'Data Scientist — recently completed a Masters in Data Science, now moving into agentic AI workflows, multi-agent orchestration, and building intelligent automation systems',
    industry: 'tech-career',
    businessType: 'individual',
    goalTrack: 'career',
    automationGoal: 'Automatically find relevant ML/Data Science/AI Engineer roles on LinkedIn, score them against my profile, draft tailored cover letters, and queue applications for my review before submitting',
    projectDescription: '',
    tools: ['github', 'vscode', 'notion', 'linkedin'],
    customTool: 'Cursor IDE, OpenClaw',
    successVision: 'I wake up to a shortlist of 3–5 well-matched roles with personalised cover letters ready. I review, approve, and the agent handles the rest. My LinkedIn profile and GitHub are always referenced automatically.',
  },
}

/**
 * OG metadata for preset-specific link previews (optional enhancement).
 * Used by the preset landing to give the link a personal feel.
 */
export const PRESET_META = {
  deekshita: {
    title: 'Your 30-Day Agentic AI Course',
    description: 'Your personalised course is ready. Start building your job application agent — tailored to your Data Science background and career goals.',
  },
}
