import { useState, useCallback } from 'react'

const STORAGE_KEY = 'agentic_user_profile'
const TOKEN_KEY   = 'agentic_access_token'

export const EMPTY_PROFILE = {
  // Step 1 — Who you are
  name: '',
  role: '',
  industry: '',
  businessType: '',
  businessDescription: '',

  // Step 2 — What you want to build
  goalTrack: '',
  automationGoal: '',
  projectDescription: '',

  // Step 3 — Your tools
  tools: [],
  customTool: '',
  successVision: '',

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

  const [accessToken, setAccessToken] = useState(() => {
    try {
      return localStorage.getItem(TOKEN_KEY) || null
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

  const saveToken = useCallback((token) => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token)
      setAccessToken(token)
    }
  }, [])

  const getToken = useCallback(() => {
    try {
      return localStorage.getItem(TOKEN_KEY) || null
    } catch {
      return null
    }
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
    localStorage.removeItem(TOKEN_KEY)
    setProfile(null)
    setAccessToken(null)
  }, [])

  const hasProfile = Boolean(profile?.completedAt)

  return {
    profile,
    hasProfile,
    accessToken,
    saveProfile,
    saveToken,
    getToken,
    updateProfile,
    clearProfile,
  }
}
