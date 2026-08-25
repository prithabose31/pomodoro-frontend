import { useState } from 'react'

const buildInitialGoals = (tasks) => {
  const initial = {}
  tasks
    .filter(t => t.status !== 'Done')
    .forEach(t => {
      const minutes = t.weeklyGoalMinutes || 0
      initial[t.id] = {
        hours: Math.floor(minutes / 60),
        mins: minutes % 60
      }
    })
  return initial
}

function WeeklyPlanModal({ isOpen, onClose, onSave, tasks }) {
  const [goals, setGoals] = useState(() => buildInitialGoals(tasks))

  const handleChange = (taskId, field, value) => {
    setGoals(prev => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        [field]: Math.max(0, Number(value))
      }
    }))
  }

  const handleSave = () => {
    const updated = Object.entries(goals).map(([taskId, { hours, mins }]) => ({
      taskId,
      weeklyGoalMinutes: (hours * 60) + mins
    }))
    onSave(updated)
    onClose()
  }

  const activeTasks = tasks.filter(t => t.status !== 'Done')

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm
                 flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-2xl w-full max-w-2xl
                   border border-gray-700 shadow-2xl
                   max-h-[90vh] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white text-xl font-bold">
                📅 Plan Your Week
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Set how much time you want to spend on each task
                this week
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white
                         transition text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {activeTasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-4xl mb-3">🎉</p>
              <p className="text-white font-semibold">
                No active tasks!
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Add some tasks first
              </p>
            </div>
          ) : (
            activeTasks.map(task => (
              <div
                key={task.id}
                className="bg-gray-700/50 rounded-xl p-4
                           border border-gray-600"
              >
                <div className="flex items-center
                                justify-between gap-4">
                  {/* Task info */}
                  <div className="flex items-center gap-3 flex-1
                                  min-w-0">
                    <span className="text-xl flex-shrink-0">
                      {task.categoryEmoji || '📌'}
                    </span>
                    <div className="min-w-0">
                      <p className="text-white font-medium
                                    text-sm truncate">
                        {task.title}
                      </p>
                      {task.categoryName && (
                        <p className="text-gray-400 text-xs mt-0.5">
                          {task.categoryName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Time inputs */}
                  <div className="flex items-center gap-2
                                  flex-shrink-0">
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="0"
                        max="40"
                        value={goals[task.id]?.hours ?? 0}
                        onChange={e => handleChange(
                          task.id, 'hours', e.target.value)}
                        className="w-14 bg-gray-600 text-white
                                   rounded-lg px-2 py-1.5 text-center
                                   text-sm border border-gray-500
                                   focus:border-purple-500
                                   focus:outline-none"
                      />
                      <span className="text-gray-400 text-xs">
                        h
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={goals[task.id]?.mins ?? 0}
                        onChange={e => handleChange(
                          task.id, 'mins', e.target.value)}
                        className="w-14 bg-gray-600 text-white
                                   rounded-lg px-2 py-1.5 text-center
                                   text-sm border border-gray-500
                                   focus:border-purple-500
                                   focus:outline-none"
                      />
                      <span className="text-gray-400 text-xs">
                        m
                      </span>
                    </div>
                  </div>
                </div>

                {/* Current progress */}
                {task.weeklyGoalMinutes > 0 && (
                  <div className="mt-3">
                    <div className="flex justify-between
                                    text-xs text-gray-500 mb-1">
                      <span>
                        Last week: {Math.floor(
                          (task.timeSpentMinutes || 0) / 60)}h{' '}
                        {(task.timeSpentMinutes || 0) % 60}m spent
                      </span>
                      <span>
                        Goal was: {Math.floor(
                          task.weeklyGoalMinutes / 60)}h{' '}
                        {task.weeklyGoalMinutes % 60}m
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-700
                        flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600
                       text-white rounded-xl py-3 transition"
          >
            Skip for Now
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-purple-600 hover:bg-purple-700
                       text-white font-semibold rounded-xl py-3
                       transition"
          >
            Save Plan 🚀
          </button>
        </div>
      </div>
    </div>
  )
}

export default WeeklyPlanModal
