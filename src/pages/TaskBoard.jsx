import { useState, useEffect } from 'react'

import TaskColumn from '../components/tasks/TaskColumn'
import TaskModal from '../components/tasks/TaskModal'
import WeeklyPlanModal from '../components/tasks/WeeklyPlanModal'

import useTaskStore from '../store/taskStore'
import useCategoryStore from '../store/categoryStore'

const STATUSES = ['New', 'Backlog', 'InProgress', 'OnHold', 'Done']

function TaskBoard() {
  const {
    tasks,
    isLoading,
    fetchTasks,
    addTask,
    editTask,
    removeTask
  } = useTaskStore()

  const { categories, fetchCategories } = useCategoryStore()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [defaultStatus, setDefaultStatus] = useState('New')
  const [isWeeklyPlanOpen, setIsWeeklyPlanOpen] = useState(false)
  const [returnToWeeklyPlan, setReturnToWeeklyPlan] = useState(false)

  // Load data on mount
  useEffect(() => {
    fetchTasks()
    fetchCategories()
  }, [fetchTasks, fetchCategories])

  const getTasksByStatus = (status) =>
    tasks.filter(t => t.status === status)

  // Add task normally from Task Board
  const handleAddTask = (status) => {
    setIsWeeklyPlanOpen(false)
    setReturnToWeeklyPlan(false)
    setEditingTask(null)
    setDefaultStatus(status)
    setIsModalOpen(true)
  }

  const handleTaskClick = (task) => {
    setEditingTask(task)
    setReturnToWeeklyPlan(false)
    setIsModalOpen(true)
  }

  // Add task specifically from Weekly Plan
  const handleAddTaskFromWeeklyPlan = () => {
    setIsWeeklyPlanOpen(false)
    setReturnToWeeklyPlan(true)
    setEditingTask(null)
    setDefaultStatus('New')
    setIsModalOpen(true)
  }

  const handleSave = async (formData) => {
    try {
      if (editingTask) {
        await editTask(editingTask.id, formData)
      } else {
        await addTask({
          ...formData,
          status: defaultStatus
        })
      }

      await fetchTasks()

      setIsModalOpen(false)

      if (returnToWeeklyPlan) {
        setReturnToWeeklyPlan(false)
        setIsWeeklyPlanOpen(true)
      }
    } catch (err) {
      console.error('Failed to save task:', err)
    }
  }

  const handleDelete = async (taskId) => {
    await removeTask(taskId)
    setIsModalOpen(false)
    setReturnToWeeklyPlan(false)
  }

  const handleWeeklyPlanSave = async (goals) => {
    try {
      for (const goal of goals) {
        const task = tasks.find(t => t.id === goal.taskId)

        if (!task) continue

        await editTask(goal.taskId, {
          title: task.title,
          description: task.description,
          status: task.status,
          categoryId: task.categoryId,
          weeklyGoalMinutes: goal.weeklyGoalMinutes,
          subtasks: task.subtasks
        })
      }

      await fetchTasks()
      setIsWeeklyPlanOpen(false)
    } catch (err) {
      console.error('Failed to save weekly plan:', err)
    }
  }

  const totalTasks = tasks.length

  const doneTasks = tasks.filter(
    t => t.status === 'Done'
  ).length

  const inProgressTasks = tasks.filter(
    t => t.status === 'InProgress'
  ).length

  return (
    <div className="min-h-screen bg-[#F7F1E8] px-4 sm:px-6 py-8 pb-32">

      <div className="max-w-[1600px] mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center
                        justify-between gap-5 mb-8">

          <div>
            <p className="text-[#9A9086] text-sm mb-2">
              Stay organized, stay focused
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold
                           tracking-tight text-[#3D3833]">
              Task Board
            </h1>

            <p className="text-[#81776D] mt-2">
              {inProgressTasks} in progress · {doneTasks}/{totalTasks} done this week
            </p>
          </div>

          {/* Header Buttons */}
          <div className="flex items-center gap-3">

            <button
              onClick={() => {
                setReturnToWeeklyPlan(false)
                setIsWeeklyPlanOpen(true)
              }}
              className="bg-[#FFFDF8]
                         hover:bg-[#F5EDE4]
                         border border-[#E8DED2]
                         text-[#6F675F]
                         font-semibold px-5 py-2.5
                         rounded-xl transition-all duration-200
                         hover:-translate-y-0.5"
            >
              📅 Plan Week
            </button>

            <button
              onClick={() => handleAddTask('New')}
              className="bg-[#D49A84]
                         hover:bg-[#C88972]
                         text-white
                         font-semibold px-5 py-2.5
                         rounded-xl transition-all duration-200
                         hover:-translate-y-0.5
                         shadow-sm
                         flex items-center gap-2"
            >
              <span className="text-xl leading-none">+</span>
              New Task
            </button>

          </div>
        </div>

        {/* Loading */}
        {isLoading && tasks.length === 0 && (
          <div className="flex items-center justify-center py-24">
            <div className="text-[#8A8178] animate-pulse">
              Loading tasks...
            </div>
          </div>
        )}

        {/* Board */}
        {!isLoading || tasks.length > 0 ? (
          <div className="bg-[#FFFDF8]/70
                          border border-[#E8DED2]
                          rounded-3xl p-4 sm:p-5">

            <div className="flex gap-4 overflow-x-auto pb-3">
              {STATUSES.map(status => (
                <TaskColumn
                  key={status}
                  status={status}
                  tasks={getTasksByStatus(status)}
                  onTaskClick={handleTaskClick}
                  onAddTask={handleAddTask}
                />
              ))}
            </div>

          </div>
        ) : null}

      </div>

      {/* Task Modal */}
      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
          }}
          onSave={handleSave}
          onDelete={handleDelete}
          existingTask={editingTask}
          categories={categories}
        />
      )}

      {/* Weekly Plan Modal */}
      <WeeklyPlanModal
        isOpen={isWeeklyPlanOpen}
        onClose={() => {
          setIsWeeklyPlanOpen(false)
          setReturnToWeeklyPlan(false)
        }}
        tasks={tasks}
        onAddTask={handleAddTaskFromWeeklyPlan}
        onSave={handleWeeklyPlanSave}
      />

    </div>
  )
}

export default TaskBoard