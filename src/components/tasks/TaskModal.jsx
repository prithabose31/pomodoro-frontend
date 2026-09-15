import { useEffect, useState } from 'react'
import SubtaskList from './SubtaskList'

const STATUSES = ['New', 'Backlog', 'InProgress', 'OnHold', 'Done']

const STATUS_COLORS = {
  New: '#A47BB5',
  Backlog: '#B68A45',
  InProgress: '#C97862',
  OnHold: '#B86F68',
  Done: '#6F8A68'
}

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

  return {
    hours: minutes > 0 ? String(Math.floor(minutes / 60)) : '',
    mins: minutes > 0 ? String(minutes % 60) : ''
  }
}

function TaskModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  existingTask,
  categories = []
}) {
  const [form, setForm] = useState(
    () => getInitialTaskForm(existingTask)
  )

  const initialGoal = getInitialGoalParts(existingTask)

  const [goalHours, setGoalHours] = useState(initialGoal.hours)
  const [goalMins, setGoalMins] = useState(initialGoal.mins)

  const [isSaving, setIsSaving] = useState(false)

  // Reset form whenever the modal opens for a different task
  useEffect(() => {
    if (isOpen) {
      setForm(getInitialTaskForm(existingTask))

      const goal = getInitialGoalParts(existingTask)

      setGoalHours(goal.hours)
      setGoalMins(goal.mins)

      setIsSaving(false)
    }
  }, [isOpen, existingTask])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.title.trim()) {
      return
    }

    if (isSaving) return

    const hours =
      goalHours === ''
        ? 0
        : Math.max(0, Math.min(23, Number(goalHours)))

    const mins =
      goalMins === ''
        ? 0
        : Math.max(0, Math.min(59, Number(goalMins)))

    const totalMinutes = (hours * 60) + mins

    const taskData = {
      ...form,
      title: form.title.trim(),
      categoryId: form.categoryId || null,
      weeklyGoalMinutes: totalMinutes
    }

    try {
      setIsSaving(true)

      await onSave(taskData)

      onClose()
    } catch (err) {
      console.error('Failed to save task:', err)
    } finally {
      setIsSaving(false)
    }
  }

  const handleHoursChange = (e) => {
    const value = e.target.value

    if (value === '') {
      setGoalHours('')
      return
    }

    const cleaned = value.replace(/\D/g, '')
    const number = Number(cleaned)

    if (number <= 23) {
      setGoalHours(cleaned)
    }
  }

  const handleMinutesChange = (e) => {
    const value = e.target.value

    if (value === '') {
      setGoalMins('')
      return
    }

    const cleaned = value.replace(/\D/g, '')
    const number = Number(cleaned)

    if (number <= 59) {
      setGoalMins(cleaned)
    }
  }

  const totalGoalMinutes =
    (goalHours === '' ? 0 : Number(goalHours) * 60) +
    (goalMins === '' ? 0 : Number(goalMins))

  if (!isOpen) return null

  const inputClass = `
    w-full
    bg-[#F7F1E8]
    text-[#3D3833]
    rounded-xl
    px-4 py-3
    border border-[#DED3C7]
    focus:border-[#D49A84]
    focus:outline-none
    focus:ring-2
    focus:ring-[#D49A84]/20
    placeholder-[#AAA096]
    transition-all
  `

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
          p-6
          w-full
          max-w-lg
          border border-[#E8DED2]
          shadow-2xl
          max-h-[90vh]
          overflow-y-auto
        "
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}
        <div className="flex items-center justify-between mb-6">

          <div>
            <p className="text-[#A09287] text-xs font-medium mb-1">
              {existingTask ? 'Update your task' : 'Add something to your board'}
            </p>

            <h2 className="text-[#3D3833] text-xl font-bold">
              {existingTask ? 'Edit Task' : 'New Task'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="
              w-9 h-9
              flex items-center justify-center
              rounded-xl
              text-[#8A8178]
              hover:text-[#4F4841]
              hover:bg-[#F7F1E8]
              transition
              text-2xl
              disabled:opacity-50
            "
          >
            ×
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Title */}
          <div>
            <label className="block text-[#6F675F] text-sm font-medium mb-2">
              Task Title
            </label>

            <input
              type="text"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value
                })
              }
              placeholder="What needs to be done?"
              className={inputClass}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[#6F675F] text-sm font-medium mb-2">
              Description
            </label>

            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value
                })
              }
              placeholder="Add more details..."
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Status + Category */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block text-[#6F675F] text-sm font-medium mb-2">
                Status
              </label>

              <select
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value
                  })
                }
                className={inputClass}
              >
                {STATUSES.map((status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status === 'InProgress'
                      ? 'In Progress'
                      : status === 'OnHold'
                        ? 'On Hold'
                        : status}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-2 mt-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor:
                      STATUS_COLORS[form.status] || '#C97862'
                  }}
                />

                <span className="text-xs text-[#9A9086]">
                  {form.status === 'InProgress'
                    ? 'In Progress'
                    : form.status === 'OnHold'
                      ? 'On Hold'
                      : form.status}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-[#6F675F] text-sm font-medium mb-2">
                Category
              </label>

              <select
                value={form.categoryId}
                onChange={(e) =>
                  setForm({
                    ...form,
                    categoryId: e.target.value
                  })
                }
                className={inputClass}
              >
                <option value="">
                  No Category
                </option>

                {categories.map((cat) => (
                  <option
                    key={cat.id}
                    value={cat.id}
                  >
                    {cat.emoji} {cat.name}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Weekly Time Goal */}
          <div>
            <label className="block text-[#6F675F] text-sm font-medium mb-2">
              Weekly Time Goal
            </label>

            <div className="
              bg-[#F7F1E8]
              border border-[#E8DED2]
              rounded-xl
              p-3
            ">
              <div className="flex flex-wrap gap-3 items-center">

                {/* Hours */}
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={goalHours}
                    onChange={handleHoursChange}
                    placeholder="0"
                    className="
                      w-20
                      bg-[#FFFDF8]
                      text-[#3D3833]
                      rounded-lg
                      px-3 py-2.5
                      border border-[#DED3C7]
                      focus:border-[#D49A84]
                      focus:outline-none
                      focus:ring-2
                      focus:ring-[#D49A84]/20
                      text-center
                    "
                  />

                  <span className="text-[#81776D] text-sm">
                    hrs
                  </span>
                </div>

                {/* Minutes */}
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={goalMins}
                    onChange={handleMinutesChange}
                    placeholder="0"
                    className="
                      w-20
                      bg-[#FFFDF8]
                      text-[#3D3833]
                      rounded-lg
                      px-3 py-2.5
                      border border-[#DED3C7]
                      focus:border-[#D49A84]
                      focus:outline-none
                      focus:ring-2
                      focus:ring-[#D49A84]/20
                      text-center
                    "
                  />

                  <span className="text-[#81776D] text-sm">
                    mins
                  </span>
                </div>

                <span className="text-[#8A8178] text-sm">
                  = {totalGoalMinutes} min total
                </span>

              </div>
            </div>
          </div>

          {/* Subtasks */}
          <div>
            <label className="block text-[#6F675F] text-sm font-medium mb-2">
              Subtasks
            </label>

            <div className="
              bg-[#F7F1E8]
              border border-[#E8DED2]
              rounded-xl
              p-3
            ">
              <SubtaskList
                subtasks={form.subtasks}
                onChange={(subtasks) =>
                  setForm({
                    ...form,
                    subtasks
                  })
                }
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="
                flex-1
                bg-[#F1E9E0]
                hover:bg-[#E8DED2]
                text-[#6F675F]
                font-medium
                rounded-xl
                py-3
                transition-all
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="
                flex-1
                bg-[#D49A84]
                hover:bg-[#C88972]
                text-white
                font-semibold
                rounded-xl
                py-3
                transition-all
                hover:-translate-y-0.5
                shadow-sm
                disabled:opacity-50
              "
            >
              {isSaving
                ? 'Saving...'
                : existingTask
                  ? 'Save Changes'
                  : 'Create Task'}
            </button>

          </div>

          {/* Delete */}
          {existingTask && (
            <button
              type="button"
              disabled={isSaving}
              onClick={() => {
                onDelete(existingTask.id)
                onClose()
              }}
              className="
                w-full
                bg-[#F5E1DE]
                hover:bg-[#EDD2CE]
                text-[#A85E52]
                rounded-xl
                py-2.5
                transition
                text-sm
                font-medium
                disabled:opacity-50
              "
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