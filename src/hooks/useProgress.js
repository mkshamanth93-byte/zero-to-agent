import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'zero-to-agent-progress'

const defaultProgress = {
  completedCheckpoints: {},
  completedModules: [],
  totalXP: 0,
  streak: 0,
  lastActiveDate: null,
  startedDate: null,
  unlockedMilestones: [],
}

export function useProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? { ...defaultProgress, ...JSON.parse(stored) } : defaultProgress
    } catch {
      return defaultProgress
    }
  })

  const save = useCallback((newProgress) => {
    setProgress(newProgress)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress))
  }, [])

  useEffect(() => {
    if (!progress.startedDate) {
      const today = new Date().toISOString().split('T')[0]
      save({ ...progress, startedDate: today, lastActiveDate: today })
    }
  }, [])

  const toggleCheckpoint = useCallback((checkpointId, xpValue = 20) => {
    const isCompleted = !!progress.completedCheckpoints[checkpointId]
    const newCheckpoints = { ...progress.completedCheckpoints }

    if (isCompleted) {
      delete newCheckpoints[checkpointId]
      const newXP = Math.max(0, progress.totalXP - xpValue)
      save({ ...progress, completedCheckpoints: newCheckpoints, totalXP: newXP })
      return { wasCompleted: false, xpDelta: -xpValue }
    } else {
      newCheckpoints[checkpointId] = true
      const today = new Date().toISOString().split('T')[0]
      save({
        ...progress,
        completedCheckpoints: newCheckpoints,
        totalXP: progress.totalXP + xpValue,
        lastActiveDate: today,
      })
      return { wasCompleted: true, xpDelta: xpValue }
    }
  }, [progress, save])

  const completeModule = useCallback((moduleId, bonusXP = 100) => {
    if (progress.completedModules.includes(moduleId)) return false
    const newCompleted = [...progress.completedModules, moduleId]
    save({
      ...progress,
      completedModules: newCompleted,
      totalXP: progress.totalXP + bonusXP,
    })
    return true
  }, [progress, save])

  const isCheckpointDone = useCallback((id) => !!progress.completedCheckpoints[id], [progress])
  const isModuleDone = useCallback((id) => progress.completedModules.includes(id), [progress])

  const getModuleProgress = useCallback((moduleCheckpoints) => {
    if (!moduleCheckpoints?.length) return 0
    const done = moduleCheckpoints.filter(c => progress.completedCheckpoints[c.id]).length
    return Math.round((done / moduleCheckpoints.length) * 100)
  }, [progress])

  const getTotalCheckpoints = useCallback(() => Object.keys(progress.completedCheckpoints).length, [progress])

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setProgress(defaultProgress)
  }, [])

  const getDaysSinceStart = useCallback(() => {
    if (!progress.startedDate) return 0
    const start = new Date(progress.startedDate)
    const now = new Date()
    return Math.floor((now - start) / (1000 * 60 * 60 * 24))
  }, [progress])

  return {
    progress,
    toggleCheckpoint,
    completeModule,
    isCheckpointDone,
    isModuleDone,
    getModuleProgress,
    getTotalCheckpoints,
    resetProgress,
    getDaysSinceStart,
  }
}
