import { useState, useEffect } from 'react'
import TaskColumn from '../components/tasks/TaskColumn'
import TaskModal from '../components/tasks/TaskModal'
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

  // Load data on mount
  useEffect(() => {
    fetchTasks()
    fetchCategories()
  }, [fetchTasks, fetchCategories])

  const getTasksByStatus = (status) =>
    tasks.filter(t => t.status === status)

  const handleAddTask = (status) => {
    setEditingTask(null)
    setDefaultStatus(status)
    setIsModalOpen(true)
  }

  const handleTaskClick = (task) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  const handleSave = async (formData) => {
    if (editingTask) {
      await editTask(editingTask.id, formData)
    } else {
      await addTask({ ...formData, status: defaultStatus })
    }
    setIsModalOpen(false)
  }

  const handleDelete = async (taskId) => {
    await removeTask(taskId)
    setIsModalOpen(false)
  }

  const totalTasks = tasks.length
  const doneTasks = tasks.filter(t => t.status === 'Done').length
  const inProgressTasks = tasks.filter(t => t.status === 'InProgress').length

  return (
    <div className="min-h-screen bg-gray-900 px-6 py-8">
      <div className="max-w-full mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Task Board</h1>
            <p className="text-gray-400 mt-1">
              {inProgressTasks} in progress · {doneTasks}/{totalTasks} done this week
            </p>
          </div>
          <button
            onClick={() => handleAddTask('New')}
            className="bg-purple-600 hover:bg-purple-700 text-white
                       font-semibold px-5 py-2.5 rounded-xl transition
                       flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            New Task
          </button>
        </div>

        {/* Loading */}
        {isLoading && tasks.length === 0 && (
          <div className="flex items-center justify-center py-24">
            <div className="text-gray-400 animate-pulse">
              Loading tasks...
            </div>
          </div>
        )}

        {/* Board */}
        <div className="flex gap-4 overflow-x-auto pb-6">
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

      {/* Modal */}
      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          onDelete={handleDelete}
          existingTask={editingTask}
          categories={categories}
        />
      )}
      <div className="min-h-screen bg-gray-900 px-6 py-8 pb-24"></div>
    </div>
  )
}

export default TaskBoard