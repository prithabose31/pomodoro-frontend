import { useRef } from 'react'

const useSound = () => {
  const audioCtxRef = useRef(null)

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext ||
        window.webkitAudioContext)()
    }
    return audioCtxRef.current
  }

  // Play a beep sound
  const playBeep = (frequency = 800, duration = 0.3, times = 3) => {
    const ctx = getAudioContext()

    for (let i = 0; i < times; i++) {
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.frequency.value = frequency
      oscillator.type = 'sine'

      gainNode.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.5)
      gainNode.gain.exponentialRampToValueAtTime(
        0.001, ctx.currentTime + i * 0.5 + duration
      )

      oscillator.start(ctx.currentTime + i * 0.5)
      oscillator.stop(ctx.currentTime + i * 0.5 + duration)
    }
  }

  const playWorkEnd = () => playBeep(800, 0.3, 3)
  const playBreakEnd = () => playBeep(600, 0.3, 2)
  const playDone = () => playBeep(1000, 0.5, 5)

  // Browser notification
  const notify = async (title, body) => {
    if (!('Notification' in window)) return

    if (Notification.permission === 'default') {
      await Notification.requestPermission()
    }

    if (Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '🍅'
      })
    }
  }

  const notifyWorkEnd = (cycle) =>
    notify('Work Session Done! 🍅', `Cycle ${cycle} complete. Time for a break!`)

  const notifyBreakEnd = () =>
    notify('Break Over! 💪', 'Time to get back to work!')

  const notifyAllDone = () =>
    notify('All Done! 🎉', 'You completed all your Pomodoro cycles!')

  return {
    playWorkEnd,
    playBreakEnd,
    playDone,
    notifyWorkEnd,
    notifyBreakEnd,
    notifyAllDone
  }
}

export default useSound