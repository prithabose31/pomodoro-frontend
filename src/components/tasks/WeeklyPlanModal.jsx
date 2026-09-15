import { useEffect, useState } from 'react'

const buildInitialGoals = (tasks) => {
  const initial = {}

  tasks
    .filter(task => task.status !== 'Done')
    .forEach(task => {
      const minutes = task.weeklyGoalMinutes || 0

      initial[task.id] = {
        hours: Math.floor(minutes / 60),
        mins: minutes % 60
      }
    })

  return initial
}

function WeeklyPlanModal({
  isOpen,
  onClose,
  onSave,
  onAddTask,
  tasks
}) {
  const [goals, setGoals] = useState({})

  const activeTasks = tasks.filter(
    task => task.status !== 'Done'
  )

  // Rebuild goals whenever the modal opens or tasks change.
  useEffect(() => {
    setGoals(buildInitialGoals(tasks))
  }, [tasks])

  const handleChange = (taskId, field, value) => {
    const number = Math.max(0, Number(value) || 0)

    setGoals(prev => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        [field]:
          field === 'mins'
            ? Math.min(number, 59)
            : Math.min(number, 40)
      }
    }))
  }

  const handleSave = () => {
    const updated = Object.entries(goals).map(
      ([taskId, { hours, mins }]) => ({
        taskId,
        weeklyGoalMinutes: (hours * 60) + mins
      })
    )

    onSave(updated)
  }

  const totalPlannedMinutes = Object.values(goals).reduce(
    (total, goal) =>
      total + (goal.hours * 60) + goal.mins,
    0
  )

  const formatTime = minutes => {
    if (!minutes) return '0m'

    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60

    if (hours === 0) return `${mins}m`
    if (mins === 0) return `${hours}h`

    return `${hours}h ${mins}m`
  }

  if (!isOpen) return null

  return (
    <div
      className="
        fixed inset-0
        bg-[#3D3833]/40
        backdrop-blur-sm
        flex items-center justify-center
        z-50
        px-4
        py-6
      "
      onClick={onClose}
    >
      <div
        className="
          bg-[#FFFDF8]
          rounded-3xl
          w-full
          max-w-2xl
          border border-[#E8DED2]
          shadow-2xl
          max-h-[90vh]
          overflow-hidden
          flex flex-col
        "
        onClick={e => e.stopPropagation()}
      >

        {/* Header */}
        <div className="
          px-6 py-5
          border-b border-[#E8DED2]
          bg-[#FFFDF8]
        ">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-[#A09287] text-xs font-medium mb-1">
                Weekly planning
              </p>

              <h2 className="text-[#3D3833] text-xl font-bold">
                📅 Plan Your Week
              </h2>

              <p className="text-[#81776D] text-sm mt-1">
                Set how much time you want to spend on each task this week
              </p>
            </div>

            <button
              onClick={onClose}
              className="
                w-9 h-9
                flex items-center justify-center
                rounded-xl
                text-[#8A8178]
                hover:text-[#4F4841]
                hover:bg-[#F7F1E8]
                transition
                text-2xl
              "
            >
              ×
            </button>

          </div>
        </div>

        {/* Task list */}
        <div className="
          flex-1
          overflow-y-auto
          px-6 py-5
          bg-[#FDF9F3]
        ">

          {activeTasks.length === 0 ? (

            <div className="text-center py-12">

              <div className="
                w-16 h-16
                mx-auto mb-4
                rounded-2xl
                bg-[#E2EBDD]
                flex items-center justify-center
                text-3xl
              ">
                🎉
              </div>

              <p className="text-[#3D3833] font-semibold">
                No active tasks!
              </p>

              <p className="text-[#8A8178] text-sm mt-1 mb-4">
                Add some tasks first
              </p>

              <button
                type="button"
                onClick={onAddTask}
                className="
                  bg-[#D49A84]
                  hover:bg-[#C88972]
                  text-white
                  font-semibold
                  px-4 py-2.5
                  rounded-xl
                  transition-all
                  hover:-translate-y-0.5
                "
              >
                + Add Task
              </button>

            </div>

          ) : (

            <div className="space-y-3">

              {activeTasks.map(task => {

                const goal = goals[task.id] || {
                  hours: 0,
                  mins: 0
                }

                const currentMinutes =
                  task.timeSpentMinutes || 0

                const goalMinutes =
                  (goal.hours * 60) + goal.mins

                const progress =
                  goalMinutes > 0
                    ? Math.min(
                        Math.round(
                          (currentMinutes / goalMinutes) * 100
                        ),
                        100
                      )
                    : 0

                const progressColor =
                  progress >= 100
                    ? '#6F8A68'
                    : '#C97862'

                return (
                  <div
                    key={task.id}
                    className="
                      bg-[#FFFDF8]
                      rounded-2xl
                      p-4
                      border border-[#E8DED2]
                      hover:border-[#DCC9BE]
                      transition-colors
                    "
                  >

                    {/* Task information */}
                    <div className="
                      flex
                      flex-col sm:flex-row
                      sm:items-center
                      justify-between
                      gap-4
                    ">

                      <div className="
                        flex items-center gap-3
                        flex-1 min-w-0
                      ">

                        <span className="
                          w-10 h-10
                          flex-shrink-0
                          rounded-xl
                          bg-[#F3EAE1]
                          flex items-center justify-center
                          text-lg
                        ">
                          {task.categoryEmoji || '📌'}
                        </span>

                        <div className="min-w-0">

                          <p className="
                            text-[#3D3833]
                            font-semibold
                            text-sm
                            truncate
                          ">
                            {task.title}
                          </p>

                          {task.categoryName && (
                            <p className="
                              text-[#9A9086]
                              text-xs
                              mt-0.5
                            ">
                              {task.categoryName}
                            </p>
                          )}

                        </div>

                      </div>

                      {/* Time inputs */}
                      <div className="
                        flex
                        items-center
                        gap-2
                        flex-shrink-0
                      ">

                        <div className="flex items-center gap-1">

                          <input
                            type="number"
                            min="0"
                            max="40"
                            value={goal.hours}
                            onChange={e =>
                              handleChange(
                                task.id,
                                'hours',
                                e.target.value
                              )
                            }
                            className="
                              w-14
                              bg-[#F7F1E8]
                              text-[#3D3833]
                              rounded-lg
                              px-2 py-2
                              text-center
                              text-sm
                              border border-[#DED3C7]
                              focus:border-[#D49A84]
                              focus:outline-none
                              focus:ring-2
                              focus:ring-[#D49A84]/20
                            "
                          />

                          <span className="
                            text-[#81776D]
                            text-xs
                          ">
                            h
                          </span>

                        </div>

                        <div className="flex items-center gap-1">

                          <input
                            type="number"
                            min="0"
                            max="59"
                            value={goal.mins}
                            onChange={e =>
                              handleChange(
                                task.id,
                                'mins',
                                e.target.value
                              )
                            }
                            className="
                              w-14
                              bg-[#F7F1E8]
                              text-[#3D3833]
                              rounded-lg
                              px-2 py-2
                              text-center
                              text-sm
                              border border-[#DED3C7]
                              focus:border-[#D49A84]
                              focus:outline-none
                              focus:ring-2
                              focus:ring-[#D49A84]/20
                            "
                          />

                          <span className="
                            text-[#81776D]
                            text-xs
                          ">
                            m
                          </span>

                        </div>

                      </div>

                    </div>

                    {/* Progress */}
                    {goalMinutes > 0 && (
                      <div className="mt-4">

                        <div className="
                          flex justify-between
                          text-xs
                          text-[#8A8178]
                          mb-1.5
                        ">
                          <span>
                            {formatTime(currentMinutes)} completed
                          </span>

                          <span>
                            {formatTime(goalMinutes)} goal
                          </span>
                        </div>

                        <div className="
                          w-full
                          bg-[#EDE5DB]
                          rounded-full
                          h-1.5
                          overflow-hidden
                        ">
                          <div
                            className="
                              h-1.5
                              rounded-full
                              transition-all
                            "
                            style={{
                              width: `${progress}%`,
                              backgroundColor: progressColor
                            }}
                          />
                        </div>

                      </div>
                    )}

                  </div>
                )
              })}

            </div>

          )}

        </div>

        {/* Footer */}
        <div className="
          px-6 py-4
          border-t border-[#E8DED2]
          bg-[#FFFDF8]
        ">

          {activeTasks.length > 0 && (
            <div className="
              flex items-center
              justify-between
              mb-4
            ">

              <button
                onClick={onAddTask}
                className="
                  text-[#B96F59]
                  hover:text-[#9E5947]
                  text-sm
                  font-semibold
                  transition
                "
              >
                + Add Task
              </button>

              <span className="
                text-[#81776D]
                text-sm
              ">
                Total planned:{' '}
                <span className="
                  text-[#3D3833]
                  font-semibold
                ">
                  {formatTime(totalPlannedMinutes)}
                </span>
              </span>

            </div>
          )}

          <div className="flex gap-3">

            <button
              onClick={onClose}
              className="
                flex-1
                bg-[#F1E9E0]
                hover:bg-[#E8DED2]
                text-[#6F675F]
                font-medium
                rounded-xl
                py-3
                transition
              "
            >
              Skip for Now
            </button>

            <button
              onClick={handleSave}
              disabled={activeTasks.length === 0}
              className="
                flex-1
                bg-[#D49A84]
                hover:bg-[#C88972]
                disabled:opacity-50
                disabled:cursor-not-allowed
                text-white
                font-semibold
                rounded-xl
                py-3
                transition-all
                hover:-translate-y-0.5
              "
            >
              Save Plan 🚀
            </button>

          </div>

        </div>

      </div>
    </div>
  )
}

export default WeeklyPlanModal