import { create } from 'zustand'

let globalIntervalId = null

const useTimerStore = create((set, get) => ({
  workMinutes: 25,
  breakMinutes: 5,
  cycles: 4,
  selectedTaskId: null,
  phase: 'idle',
  timeLeft: 25 * 60,
  isPaused: false,
  currentCycle: 1,
  elapsedSeconds: 0,

  onWorkSessionEnd: null,
  onAllCyclesComplete: null,
  onStop: null,

  // Simple set — no comparison, called once from useTimer on mount
  setCallbacks: (callbacks) => set({
    onWorkSessionEnd: callbacks.onWorkSessionEnd,
    onAllCyclesComplete: callbacks.onAllCyclesComplete,
    onStop: callbacks.onStop
  }),

  setConfig: (key, value) => {
    set({ [key]: value })
    if (get().phase === 'idle' && key === 'workMinutes') {
      set({ timeLeft: value * 60 })
    }
  },

  setSelectedTask: (taskId) => set({ selectedTaskId: taskId }),

  startTimer: () => {
    const { workMinutes } = get()
    set({
      phase: 'work',
      timeLeft: workMinutes * 60,
      currentCycle: 1,
      isPaused: false,
      elapsedSeconds: 0
    })
    get()._startInterval()
  },

  pauseTimer: () => {
    if (globalIntervalId) {
      clearInterval(globalIntervalId)
      globalIntervalId = null
    }
    set({ isPaused: true })
  },

  resumeTimer: () => {
    set({ isPaused: false })
    get()._startInterval()
  },

  stopTimer: () => {
    const { phase, elapsedSeconds, onStop } = get()
    if (globalIntervalId) {
      clearInterval(globalIntervalId)
      globalIntervalId = null
    }
    if (phase === 'work' && elapsedSeconds > 0) {
      const minutesWorked = Math.floor(elapsedSeconds / 60)
      if (minutesWorked > 0 && onStop) {
        onStop(minutesWorked)
      }
    }
    const { workMinutes } = get()
    set({
      phase: 'idle',
      timeLeft: workMinutes * 60,
      currentCycle: 1,
      isPaused: false,
      elapsedSeconds: 0
    })
  },

  skipSession: () => {
    const state = get()
    if (globalIntervalId) {
      clearInterval(globalIntervalId)
      globalIntervalId = null
    }
    if (state.phase === 'work') {
      const minutesWorked = Math.floor(state.elapsedSeconds / 60)
      if (minutesWorked > 0 && state.onWorkSessionEnd) {
        state.onWorkSessionEnd(state.currentCycle, minutesWorked)
      }
      if (state.currentCycle >= state.cycles) {
        set({ phase: 'done', elapsedSeconds: 0 })
        if (state.onAllCyclesComplete) state.onAllCyclesComplete()
        return
      }
      set({
        phase: 'break',
        timeLeft: state.breakMinutes * 60,
        elapsedSeconds: 0
      })
    } else if (state.phase === 'break') {
      const nextCycle = state.currentCycle + 1
      set({
        phase: 'work',
        timeLeft: state.workMinutes * 60,
        currentCycle: nextCycle,
        elapsedSeconds: 0
      })
    }
    get()._startInterval()
  },

  _startInterval: () => {
    if (globalIntervalId) {
      clearInterval(globalIntervalId)
      globalIntervalId = null
    }

    globalIntervalId = setInterval(() => {
      const state = get()

      if (state.phase === 'idle' || state.phase === 'done') {
        clearInterval(globalIntervalId)
        globalIntervalId = null
        return
      }

      const newTimeLeft = state.timeLeft - 1

      if (state.phase === 'work') {
        set({ elapsedSeconds: state.elapsedSeconds + 1 })
      }

      if (newTimeLeft <= 0) {
        clearInterval(globalIntervalId)
        globalIntervalId = null
        set({ timeLeft: 0 })
        get()._handleSessionEnd()
        return
      }

      set({ timeLeft: newTimeLeft })
    }, 1000)
  },

  _handleSessionEnd: () => {
    const state = get()

    if (state.phase === 'work') {
      const minutesWorked = state.workMinutes
      if (state.onWorkSessionEnd) {
        state.onWorkSessionEnd(state.currentCycle, minutesWorked)
      }

      if (state.currentCycle >= state.cycles) {
        set({ phase: 'done', elapsedSeconds: 0 })
        if (state.onAllCyclesComplete) state.onAllCyclesComplete()
        return
      }

      set({
        phase: 'break',
        timeLeft: state.breakMinutes * 60,
        elapsedSeconds: 0
      })
      get()._startInterval()

    } else if (state.phase === 'break') {
      const nextCycle = state.currentCycle + 1
      set({
        phase: 'work',
        timeLeft: state.workMinutes * 60,
        currentCycle: nextCycle,
        elapsedSeconds: 0
      })
      get()._startInterval()
    }
  }
}))

export default useTimerStore