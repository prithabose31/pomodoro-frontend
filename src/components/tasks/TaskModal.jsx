import { useState } from 'react'
import SubtaskList from './SubtaskList'

const STATUSES = ['New', 'Backlog', 'InProgress', 'OnHold', 'Done']

const getInitialTaskForm = (task) => ({
  title: task?.title || '',
  description: task?.description || '',
  status: task?.status || 'New',
  categoryId: task?.categoryId || '',
  weeklyGoalMinutes: task?.weeklyGoalMinutes || 0,
  subtasks: task?.subtasks || []
})

const getInitialGoalParts = (task) => {
  const minutes = task?.weeklyGoalMinutes || 0
  return { hours: Math.floor(minutes / 60), mins: minutes % 60 }
}

function TaskModal({ isOpen, onClose, onSave, onDelete, existingTask, categories }) {
  const [form, setForm] = useState(() => getInitialTaskForm(existingTask))
  const [goalHours, setGoalHours] = useState(
    () => getInitialGoalParts(existingTask).hours
  )
  const [goalMins, setGoalMins] = useState(
    () => getInitialGoalParts(existingTask).mins
  )
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    const totalMinutes = (goalHours * 60) + goalMins
    onSave({ ...form, weeklyGoalMinutes: totalMinutes })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm
                 flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-2xl p-6 w-full max-w-lg
                   border border-gray-700 shadow-2xl max-h-[90vh]
                   overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-xl font-bold">
            {existingTask ? 'Edit Task' : 'New Task'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Task Title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="What needs to be done?"
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-3
                         border border-gray-600 focus:border-purple-500
                         focus:outline-none focus:ring-1 focus:ring-purple-500
                         placeholder-gray-500 transition"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Add more details..."
              rows={3}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-3
                         border border-gray-600 focus:border-purple-500
                         focus:outline-none focus:ring-1 focus:ring-purple-500
                         placeholder-gray-500 transition resize-none"
            />
          </div>

          {/* Status + Category Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3
                           border border-gray-600 focus:border-purple-500
                           focus:outline-none transition"
              >
                {STATUSES.map(s => (
                  <option key={s} value={s}>
                    {s === 'InProgress' ? 'In Progress'
                      : s === 'OnHold' ? 'On Hold' : s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Category
              </label>
              <select
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3
                           border border-gray-600 focus:border-purple-500
                           focus:outline-none transition"
              >
                <option value="">No Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.emoji} {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Weekly Time Goal */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Weekly Time Goal
            </label>
            <div className="flex gap-3 items-center">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={goalHours}
                  onChange={(e) => setGoalHours(Number(e.target.value))}
                  className="w-20 bg-gray-700 text-white rounded-lg px-3 py-3
                             border border-gray-600 focus:border-purple-500
                             focus:outline-none text-center"
                />
                <span className="text-gray-400 text-sm">hrs</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={goalMins}
                  onChange={(e) => setGoalMins(Number(e.target.value))}
                  className="w-20 bg-gray-700 text-white rounded-lg px-3 py-3
                             border border-gray-600 focus:border-purple-500
                             focus:outline-none text-center"
                />
                <span className="text-gray-400 text-sm">mins</span>
              </div>
              <span className="text-gray-500 text-sm">
                = {goalHours * 60 + goalMins} min total
              </span>
            </div>
          </div>

          {/* Subtasks */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Subtasks
            </label>
            <SubtaskList
              subtasks={form.subtasks}
              onChange={(subtasks) => setForm({ ...form, subtasks })}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white
                         rounded-lg py-3 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white
                         font-semibold rounded-lg py-3 transition"
            >
              {existingTask ? 'Save Changes' : 'Create Task'}
            </button>
          </div>

          {/* Delete */}
          {existingTask && (
            <button
              type="button"
              onClick={() => { onDelete(existingTask.id); onClose() }}
              className="w-full bg-red-600/20 hover:bg-red-600/40 text-red-400
                         rounded-lg py-2.5 transition text-sm"
            >
              Delete Task
            </button>
          )}
        </form>
      </div>
    </div>
  )
}

export default TaskModal