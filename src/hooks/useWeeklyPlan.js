import { useCallback } from 'react'

const STORAGE_KEY = 'lastWeeklyPlanWeek'

export const useWeeklyPlan = () => {
  // Get the Monday of the current week as YYYY-MM-DD
  const getCurrentWeekKey = () => {
    const date = new Date()
    const day = date.getDay()

    // Sunday = 0, Monday = 1
    const diff = day === 0 ? -6 : 1 - day

    date.setDate(date.getDate() + diff)

    return date.toISOString().split('T')[0]
  }

  // Check whether the weekly plan has already been shown this week
  const isNewWeek = useCallback(() => {
    const lastPlannedWeek = localStorage.getItem(STORAGE_KEY)
    const currentWeek = getCurrentWeekKey()

    // Never planned before
    if (!lastPlannedWeek) {
      return true
    }

    // Already planned this week
    return lastPlannedWeek !== currentWeek
  }, [])

  // Mark this week's plan as completed
  const markPlanned = useCallback(() => {
    const currentWeek = getCurrentWeekKey()

    localStorage.setItem(STORAGE_KEY, currentWeek)
  }, [])

  // Useful if you ever want to manually show the modal again
  const resetPlan = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return {
    isNewWeek,
    markPlanned,
    resetPlan
  }
}