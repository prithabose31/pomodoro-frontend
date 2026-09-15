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
    workMinutes,
    breakMinutes,
    cycles,
    selectedTaskId,
    setConfig,
    setSelectedTask
  } = useTimerStore()

  const { tasks, fetchTasks } = useTaskStore()

  const {
    playWorkEnd,
    playBreakEnd,
    playDone,
    notifyWorkEnd,
    notifyBreakEnd,
    notifyAllDone
  } = useSound()

  useEffect(() => {
    fetchTasks()

    if (
      'Notification' in window &&
      Notification.permission === 'default'
    ) {
      Notification.requestPermission()
    }
  }, [fetchTasks])

  const logTime = useCallback(
    async (minutesWorked, cyclesCompleted) => {
      if (!minutesWorked || minutesWorked <= 0) return

      try {
        await logPomodoroSession({
          taskId: selectedTaskId || null,
          workMinutes: minutesWorked,
          breakMinutes,
          cyclesCompleted,
          totalMinutesLogged: minutesWorked
        })

        if (selectedTaskId) {
          await fetchTasks()
        }
      } catch (err) {
        console.error(
          'Failed to log session:',
          err
        )
      }
    },
    [
      selectedTaskId,
      breakMinutes,
      fetchTasks
    ]
  )

  const handleWorkSessionEnd = useCallback(
    async (cycle, minutesWorked) => {
      playWorkEnd()
      notifyWorkEnd(cycle)
      await logTime(minutesWorked, 1)
    },
    [
      playWorkEnd,
      notifyWorkEnd,
      logTime
    ]
  )

  const handleStop = useCallback(
    async (minutesWorked) => {
      await logTime(minutesWorked, 0)
    },
    [logTime]
  )

  const handleAllCyclesComplete = useCallback(() => {
    playDone()
    notifyAllDone()
  }, [playDone, notifyAllDone])

  const {
    phase,
    isPaused,
    currentCycle,
    progress,
    formattedTime,
    start,
    pause,
    resume,
    stop,
    skip
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
  }, [
    phase,
    currentCycle,
    playBreakEnd,
    notifyBreakEnd
  ])

  const isRunning =
    phase !== 'idle' &&
    phase !== 'done'

  const canStart =
    selectedTaskId !== null

  return (
    <div className="
      min-h-screen
      bg-[#F7F1E8]
      px-4 sm:px-6
      py-8
      pb-32
    ">

      <div className="
        max-w-2xl
        mx-auto
      ">

        {/* Header */}
        <div className="text-center mb-8">

          <p className="
            text-[#A09287]
            text-sm
            font-medium
            mb-2
          ">
            A little focused time goes a long way
          </p>

          <h1 className="
            text-3xl sm:text-4xl
            font-bold
            text-[#3D3833]
            tracking-tight
            mb-1
          ">
            Pomodoro Timer 🍅
          </h1>

          <p className="text-[#81776D]">
            Stay focused, get things done
          </p>

        </div>

        {/* Configuration */}
        <div className="mb-5">
          <SessionConfig
            workMinutes={workMinutes}
            breakMinutes={breakMinutes}
            cycles={cycles}
            onChange={setConfig}
            disabled={isRunning}
          />
        </div>

        {/* Task */}
        <div className="mb-8">

          <TaskSelector
            tasks={tasks}
            selectedTaskId={selectedTaskId}
            onSelect={setSelectedTask}
            disabled={isRunning}
          />

          {!selectedTaskId &&
            phase === 'idle' && (
              <div className="
                mt-3
                text-center
                text-[#A85E52]
                text-xs
                bg-[#F4DFDC]
                border border-[#E7C9C4]
                rounded-xl
                px-3 py-2
              ">
                ⚠️ Please select a task before starting
              </div>
            )}

        </div>

        {/* Timer */}
        <div className="
          bg-[#FFFDF8]
          rounded-3xl
          border border-[#E8DED2]
          shadow-sm
          py-8 sm:py-10
          mb-6
        ">
          <TimerCircle
            formattedTime={formattedTime}
            progress={progress}
            phase={phase}
          />
        </div>

        {/* Session progress */}
        <div className="
          bg-[#FFFDF8]
          border border-[#E8DED2]
          rounded-2xl
          py-4
          mb-6
        ">
          <SessionDots
            totalCycles={cycles}
            currentCycle={currentCycle}
            phase={phase}
          />
        </div>

        {/* Controls */}
        <div className="
          bg-[#FFFDF8]
          border border-[#E8DED2]
          rounded-2xl
          py-5
          mb-8
        ">
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

        {/* Complete */}
        {phase === 'done' && (
          <div className="
            text-center
            bg-[#F4EBD8]
            border border-[#E6D7B9]
            rounded-2xl
            p-6
            mb-8
          ">
            <div className="text-4xl mb-2">
              🎉
            </div>

            <p className="
              text-[#4F4841]
              font-bold
              text-xl
            ">
              All cycles complete!
            </p>

            <p className="
              text-[#81776D]
              mt-1
            ">
              Great work! Take a long break.
            </p>
          </div>
        )}

      </div>

    </div>
  )
}

export default Pomodoro