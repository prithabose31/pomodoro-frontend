import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useCategoryStore from '../store/categoryStore'
import useTaskStore from '../store/taskStore'
import TaskModal from '../components/tasks/TaskModal'
import CategoryModal from '../components/categories/CategoryModal'

function CategoryDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { categories, fetchCategories, editCategory, removeCategory } = useCategoryStore()
  const { tasks, fetchTasks, addTask, editTask, removeTask } = useTaskStore()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [editCategoryOpen, setEditCategoryOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    fetchTasks()
    fetchCategories() // ← fixes refresh bug
  }, [fetchTasks, fetchCategories])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [fetchTasks, fetchCategories])

  const category = categories.find(c => c.id === id)
  const categoryTasks = tasks.filter(t => t.categoryId === id)

  const totalGoal = categoryTasks.reduce(
    (sum, t) => sum + (t.weeklyGoalMinutes || 0), 0)
  const totalSpent = categoryTasks.reduce(
    (sum, t) => sum + (t.timeSpentMinutes || 0), 0)

  const formatTime = (minutes) => {
    if (!minutes) return '0m'
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return h > 0 ? `${h}h ${m}m` : `${m}m`
  }

  const handleSave = async (formData) => {
    if (editingTask) {
      await editTask(editingTask.id, formData)
    } else {
      await addTask({ ...formData, categoryId: id })
    }
    setIsModalOpen(false)
  }

  const handleEditCategory = async (formData) => {
    await editCategory(id, formData)
    setEditCategoryOpen(false)
  }

  const handleDeleteCategory = async () => {
    if (window.confirm(`Delete "${category.name}"? This won't delete its tasks.`)) {
      await removeCategory(id)
      navigate('/categories')
    }
  }

  const handleDelete = async (taskId) => {
    await removeTask(taskId)
    setIsModalOpen(false)
  }

  if (!category) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <p className="text-gray-400">Category not found</p>
    </div>
  )

  const STATUS_COLORS = {
    New:        'bg-indigo-500/20 text-indigo-300',
    Backlog:    'bg-yellow-500/20 text-yellow-300',
    InProgress: 'bg-purple-500/20 text-purple-300',
    OnHold:     'bg-red-500/20 text-red-300',
    Done:       'bg-emerald-500/20 text-emerald-300',
  }

  return (
    <div className="min-h-screen bg-gray-900 px-6 py-8">
      <div className="max-w-4xl mx-auto">

        {/* Back button */}
        <button
          onClick={() => navigate('/categories')}
          className="flex items-center gap-2 text-gray-400
                     hover:text-white transition mb-6 text-sm"
        >
          ← Back to Categories
        </button>

        {/* Category Header */}
        <div
          className="rounded-2xl p-6 mb-6 border border-gray-700"
          style={{ backgroundColor: category.color + '15' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{category.emoji}</span>
              <div>
                <h1
                  className="text-3xl font-bold"
                  style={{ color: category.color }}
                >
                  {category.name}
                </h1>
                {category.description && (
                  <p className="text-gray-400 mt-1">
                    {category.description}
                  </p>
                )}
              </div>
            </div>

            {/* Right side — Add Task + 3-dot menu */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEditingTask(null)
                  setIsModalOpen(true)
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white
                           font-semibold px-4 py-2.5 rounded-xl transition
                           flex items-center gap-2 text-sm"
              >
                + Add Task
              </button>

              {/* 3-dot menu */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="w-9 h-9 flex items-center justify-center
                             rounded-xl bg-gray-700 hover:bg-gray-600
                             text-gray-300 hover:text-white transition
                             text-lg font-bold"
                >
                  ⋯
                </button>

                {menuOpen && (
                  <div className="absolute right-0 top-11 bg-gray-700
                                  border border-gray-600 rounded-xl
                                  shadow-xl z-50 overflow-hidden
                                  min-w-[160px]">
                    <button
                      onClick={() => {
                        setMenuOpen(false)
                        setEditCategoryOpen(true)
                      }}
                      className="w-full text-left px-4 py-3 text-sm
                                 text-gray-300 hover:bg-gray-600
                                 hover:text-white transition flex
                                 items-center gap-2"
                    >
                      ✏️ Edit Category
                    </button>
                    <div className="border-t border-gray-600" />
                    <button
                      onClick={() => {
                        setMenuOpen(false)
                        handleDeleteCategory()
                      }}
                      className="w-full text-left px-4 py-3 text-sm
                                 text-red-400 hover:bg-red-400/10
                                 transition flex items-center gap-2"
                    >
                      🗑️ Delete Category
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-800/60 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-white">
                {categoryTasks.length}
              </p>
              <p className="text-gray-400 text-sm mt-1">Total Tasks</p>
            </div>
            <div className="bg-gray-800/60 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-white">
                {formatTime(totalSpent)}
              </p>
              <p className="text-gray-400 text-sm mt-1">Time Spent</p>
            </div>
            <div className="bg-gray-800/60 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-white">
                {formatTime(totalGoal)}
              </p>
              <p className="text-gray-400 text-sm mt-1">Weekly Goal</p>
            </div>
          </div>

          {/* Overall progress */}
          {totalGoal > 0 && (
            <div className="mt-4">
              <div className="flex justify-between text-xs
                              text-gray-400 mb-1">
                <span>Overall Progress</span>
                <span>
                  {Math.min(Math.round(
                    (totalSpent / totalGoal) * 100), 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: `${Math.min(Math.round(
                      (totalSpent / totalGoal) * 100), 100)}%`,
                    backgroundColor: category.color
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Tasks List */}
        {categoryTasks.length === 0 ? (
          <div className="text-center py-16 bg-gray-800 rounded-2xl
                          border border-gray-700">
            <span className="text-5xl mb-4 block">📭</span>
            <h3 className="text-white font-semibold text-lg mb-2">
              No tasks yet
            </h3>
            <p className="text-gray-400 mb-6 text-sm">
              Add your first task to this category
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white
                         px-6 py-3 rounded-xl transition font-semibold"
            >
              + Add Task
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {categoryTasks.map(task => {
              const progress = task.weeklyGoalMinutes > 0
                ? Math.min(Math.round(
                    (task.timeSpentMinutes /
                      task.weeklyGoalMinutes) * 100), 100)
                : 0

              const completedSubs = task.subtasks?.filter(
                s => s.isCompleted).length ?? 0
              const totalSubs = task.subtasks?.length ?? 0

              return (
                <div
                  key={task.id}
                  onClick={() => {
                    setEditingTask(task)
                    setIsModalOpen(true)
                  }}
                  className="bg-gray-800 rounded-2xl p-5 cursor-pointer
                             border border-gray-700 hover:border-purple-500
                             transition group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">

                      {/* Title + Status */}
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white font-semibold
                                       group-hover:text-purple-300
                                       transition truncate">
                          {task.title}
                        </h3>
                        <span className={`text-xs px-2 py-0.5
                                         rounded-full flex-shrink-0
                          ${STATUS_COLORS[task.status] ||
                            'bg-gray-600 text-gray-300'}`}>
                          {task.status === 'InProgress'
                            ? 'In Progress'
                            : task.status === 'OnHold'
                              ? 'On Hold' : task.status}
                        </span>
                      </div>

                      {/* Description */}
                      {task.description && (
                        <p className="text-gray-400 text-sm mb-3 line-clamp-1">
                          {task.description}
                        </p>
                      )}

                      {/* Time Progress */}
                      {task.weeklyGoalMinutes > 0 && (
                        <div className="mb-3">
                          <div className="flex justify-between
                                          text-xs text-gray-400 mb-1">
                            <span>
                              ⏱ {formatTime(task.timeSpentMinutes)} done
                            </span>
                            <span>
                              Goal: {formatTime(task.weeklyGoalMinutes)}
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-1.5">
                            <div
                              className="h-1.5 rounded-full transition-all"
                              style={{
                                width: `${progress}%`,
                                backgroundColor: progress >= 100
                                  ? '#10b981' : category.color
                              }}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1 text-right">
                            {progress}%
                          </p>
                        </div>
                      )}

                      {/* Subtasks */}
                      {totalSubs > 0 && (
                        <div className="flex items-center gap-1
                                        text-xs text-gray-400">
                          <span>✓</span>
                          <span>{completedSubs}/{totalSubs} subtasks</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Task Modal */}
      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingTask(null)
          }}
          onSave={handleSave}
          onDelete={handleDelete}
          existingTask={editingTask}
          categories={categories}
        />
      )}

      {/* Category Edit Modal */}
      {editCategoryOpen && (
        <CategoryModal
          isOpen={editCategoryOpen}
          onClose={() => setEditCategoryOpen(false)}
          onSave={handleEditCategory}
          existingCategory={category}
          onDelete={handleDeleteCategory}
        />
      )}
    </div>
  )
}

export default CategoryDetail