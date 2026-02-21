import { useState, useCallback } from 'react'

const STORAGE_KEY = 'agentic_user_profile'

export const EMPTY_PROFILE = {
  // Step 1 — Who you are
  name: '',
  role: '',
  industry: '',          // 'healthcare' | 'finance' | 'legal' | 'hr' | 'operations' | 'tech-career' | 'other'
  businessType: '',      // 'solo' | 'small' | 'medium' | 'enterprise' | 'personal'
  businessDescription: '',

  // Step 2 — What you want to build
  goalTrack: '',         // 'career' | 'business' | 'project'
  automationGoal: '',    // free text: "the one thing I'd automate"
  projectDescription: '', // only for 'project' track

  // Step 3 — Your tools
  tools: [],             // multi-select: ['xero', 'hubspot', 'slack', ...]
  customTool: '',
  successVision: '',     // "what does success look like?"

  // Meta
  completedAt: null,
}

export function useUserProfile() {
  const [profile, setProfile] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const saveProfile = useCallback((profileData, generatedContent = null) => {
    const complete = {
      ...profileData,
      completedAt: new Date().toISOString(),
      generatedContent: generatedContent || null,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(complete))
    setProfile(complete)
  }, [])

  const updateProfile = useCallback((partial) => {
    setProfile(prev => {
      const updated = { ...(prev || EMPTY_PROFILE), ...partial }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const clearProfile = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setProfile(null)
  }, [])

  const hasProfile = Boolean(profile?.completedAt)

  return { profile, hasProfile, saveProfile, updateProfile, clearProfile }
}
