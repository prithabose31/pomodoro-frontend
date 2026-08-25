import { useEffect, useCallback } from 'react'
import TimerCircle from '../components/timer/TimerCircle'
import TimerControls from '../components/timer/TimerControls'
import SessionConfig from '../components/timer/SessionConfig'
import SessionDots from '../components/timer/SessionDots'
import TaskSelector from '../components/timer/TaskSelector'
import useTimer from '../hooks/useTimer'
import useSound from '../hooks/useSound'
import useTimerStore from '../store/timerStore'
import useTaskStore from '../store/taskStore'
import { logPomodoroSession } from '../services/pomodoroService'

function Pomodoro() {
  const {
    workMinutes, breakMinutes, cycles,
    selectedTaskId, setConfig, setSelectedTask
  } = useTimerStore()

  const { tasks, fetchTasks } = useTaskStore()
  const {
    playWorkEnd, playBreakEnd, playDone,
    notifyWorkEnd, notifyBreakEnd, notifyAllDone
  } = useSound()

  useEffect(() => {
    fetchTasks()
    if ('Notification' in window &&
      Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [fetchTasks])

  const logTime = useCallback(async (minutesWorked, cyclesCompleted) => {
    if (!minutesWorked || minutesWorked <= 0) return

    // The backend logs only TotalMinutesLogged to the task, so break time is not counted.
    try {
      await logPomodoroSession({
        taskId: selectedTaskId || null,
        workMinutes: minutesWorked,
        breakMinutes,
        cyclesCompleted,
        totalMinutesLogged: minutesWorked
      })
      if (selectedTaskId) await fetchTasks()
    } catch (err) {
      console.error('Failed to log session:', err)
    }
  }, [selectedTaskId, breakMinutes, fetchTasks])

  const handleWorkSessionEnd = useCallback(async (cycle, minutesWorked) => {
    playWorkEnd()
    notifyWorkEnd(cycle)
    await logTime(minutesWorked, 1)
  }, [playWorkEnd, notifyWorkEnd, logTime])

  const handleStop = useCallback(async (minutesWorked) => {
    await logTime(minutesWorked, 0)
  }, [logTime])

  const handleAllCyclesComplete = useCallback(() => {
    playDone()
    notifyAllDone()
  }, [playDone, notifyAllDone])

  const {
    phase, isPaused, currentCycle,
    progress, formattedTime,
    start, pause, resume, stop, skip
  } = useTimer({
    onWorkSessionEnd: handleWorkSessionEnd,
    onAllCyclesComplete: handleAllCyclesComplete,
    onStop: handleStop
  })

  // Break end sound
  useEffect(() => {
    if (phase === 'work' && currentCycle > 1) {
      playBreakEnd()
      notifyBreakEnd()
    }
  }, [phase, currentCycle, playBreakEnd, notifyBreakEnd])

  const isRunning = phase !== 'idle' && phase !== 'done'
  const canStart = selectedTaskId !== null

  return (
    <div className="min-h-screen bg-gray-900 px-6 py-8 pb-32">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">
            Pomodoro Timer 🍅
          </h1>
          <p className="text-gray-400">Stay focused, get things done</p>
        </div>

        <div className="mb-8">
          <SessionConfig
            workMinutes={workMinutes}
            breakMinutes={breakMinutes}
            cycles={cycles}
            onChange={setConfig}
            disabled={isRunning}
          />
        </div>

        <div className="mb-8">
          <TaskSelector
            tasks={tasks}
            selectedTaskId={selectedTaskId}
            onSelect={setSelectedTask}
            disabled={isRunning}
          />
          {!selectedTaskId && phase === 'idle' && (
            <p className="text-yellow-400 text-xs mt-2 text-center">
              ⚠️ Please select a task before starting
            </p>
          )}
        </div>

        <div className="mb-8">
          <TimerCircle
            formattedTime={formattedTime}
            progress={progress}
            phase={phase}
          />
        </div>

        <div className="mb-8">
          <SessionDots
            totalCycles={cycles}
            currentCycle={currentCycle}
            phase={phase}
          />
        </div>

        <div className="mb-8">
          <TimerControls
            phase={phase}
            isPaused={isPaused}
            canStart={canStart}
            onStart={start}
            onPause={pause}
            onResume={resume}
            onStop={stop}
            onSkip={skip}
          />
        </div>

        {phase === 'done' && (
          <div className="text-center bg-yellow-500/10 border
                          border-yellow-500/30 rounded-2xl p-6 mb-8">
            <p className="text-4xl mb-2">🎉</p>
            <p className="text-white font-bold text-xl">
              All cycles complete!
            </p>
            <p className="text-gray-400 mt-1">
              Great work! Take a long break.
            </p>
          </div>
        )}
      </div>
      <div className="min-h-screen bg-gray-900 px-6 py-8 pb-24"></div>
    </div>
  )
}

export default Pomodoro