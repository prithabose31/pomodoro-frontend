import { useEffect, useRef } from 'react'
import useTimerStore from '../store/timerStore'

const useTimer = ({ onWorkSessionEnd, onAllCyclesComplete, onStop }) => {
  const store = useTimerStore()

  // Store callbacks in refs — never causes re-renders
  const onWorkSessionEndRef = useRef(onWorkSessionEnd)
  const onAllCyclesCompleteRef = useRef(onAllCyclesComplete)
  const onStopRef = useRef(onStop)

  // Keep refs up to date without triggering re-renders
  useEffect(() => {
    onWorkSessionEndRef.current = onWorkSessionEnd
  }, [onWorkSessionEnd])

  useEffect(() => {
    onAllCyclesCompleteRef.current = onAllCyclesComplete
  }, [onAllCyclesComplete])

  useEffect(() => {
    onStopRef.current = onStop
  }, [onStop])

  // Register stable ref-based callbacks into the store ONCE on mount
  useEffect(() => {
    useTimerStore.getState().setCallbacks({
      onWorkSessionEnd: (cycle, minutes) => onWorkSessionEndRef.current?.(cycle, minutes),
      onAllCyclesComplete: () => onAllCyclesCompleteRef.current?.(),
      onStop: (minutes) => onStopRef.current?.(minutes)
    })
  }, []) // ← empty array = runs once only, no loop

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const totalSeconds = store.phase === 'work'
    ? store.workMinutes * 60
    : store.breakMinutes * 60

  const progress = totalSeconds > 0
    ? 1 - (store.timeLeft / totalSeconds)
    : 0

  return {
    phase: store.phase,
    timeLeft: store.timeLeft,
    isPaused: store.isPaused,
    currentCycle: store.currentCycle,
    progress,
    formattedTime: formatTime(store.timeLeft),
    start: store.startTimer,
    pause: store.pauseTimer,
    resume: store.resumeTimer,
    stop: store.stopTimer,
    skip: store.skipSession
  }
}

export default useTimer