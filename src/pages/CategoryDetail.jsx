import { useEffect, useState, useRef } from 'react'

import {
  useParams,
  useNavigate
} from 'react-router-dom'

import useCategoryStore from '../store/categoryStore'
import useTaskStore from '../store/taskStore'

import TaskModal from '../components/tasks/TaskModal'
import CategoryModal from '../components/categories/CategoryModal'

function CategoryDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    categories,
    fetchCategories,
    editCategory,
    removeCategory
  } = useCategoryStore()

  const {
    tasks,
    fetchTasks,
    addTask,
    editTask,
    removeTask
  } = useTaskStore()

  const [isModalOpen, setIsModalOpen] =
    useState(false)

  const [editingTask, setEditingTask] =
    useState(null)

  const [menuOpen, setMenuOpen] =
    useState(false)

  const [editCategoryOpen, setEditCategoryOpen] =
    useState(false)

  const menuRef = useRef(null)

  useEffect(() => {
    fetchTasks()
    fetchCategories()
  }, [fetchTasks, fetchCategories])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setMenuOpen(false)
      }
    }

    document.addEventListener(
      'mousedown',
      handleClickOutside
    )

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      )
    }
  }, [])

  const category = categories.find(
    c => c.id === id
  )

  const categoryTasks = tasks.filter(
    task => task.categoryId === id
  )

  const totalGoal = categoryTasks.reduce(
    (sum, task) =>
      sum + (task.weeklyGoalMinutes || 0),
    0
  )

  const totalSpent = categoryTasks.reduce(
    (sum, task) =>
      sum + (task.timeSpentMinutes || 0),
    0
  )

  const formatTime = (minutes) => {
    if (!minutes) return '0m'

    const h = Math.floor(minutes / 60)
    const m = minutes % 60

    return h > 0
      ? `${h}h ${m}m`
      : `${m}m`
  }

  const handleSave = async (formData) => {
    if (editingTask) {
      await editTask(
        editingTask.id,
        formData
      )
    } else {
      await addTask({
        ...formData,
        categoryId: id
      })
    }

    await fetchTasks()

    setIsModalOpen(false)
    setEditingTask(null)
  }

  const handleEditCategory = async (formData) => {
    await editCategory(id, formData)

    await fetchCategories()

    setEditCategoryOpen(false)
  }

  const handleDeleteCategory = async () => {
    if (
      window.confirm(
        `Delete "${category.name}"? This won't delete its tasks.`
      )
    ) {
      await removeCategory(id)
      navigate('/categories')
    }
  }

  const handleDelete = async (taskId) => {
    await removeTask(taskId)

    await fetchTasks()

    setIsModalOpen(false)
    setEditingTask(null)
  }

  if (!category) {
    return (
      <div className="
        min-h-screen
        bg-[#F7F1E8]
        flex
        items-center
        justify-center
        px-4
      ">
        <div className="
          bg-[#FFFDF8]
          border border-[#E8DED2]
          rounded-2xl
          px-8
          py-10
          text-center
        ">
          <div className="text-4xl mb-3">
            📂
          </div>

          <p className="
            text-[#3D3833]
            font-semibold
            mb-1
          ">
            Category not found
          </p>

          <button
            onClick={() =>
              navigate('/categories')
            }
            className="
              text-[#A45F4B]
              hover:text-[#8F4E3D]
              text-sm
              font-medium
              mt-2
            "
          >
            ← Back to Categories
          </button>
        </div>
      </div>
    )
  }

  const progress =
    totalGoal > 0
      ? Math.min(
          Math.round(
            (totalSpent / totalGoal) * 100
          ),
          100
        )
      : 0

  const STATUS_CONFIG = {
    New: {
      label: 'New',
      bg: '#EEE6F2',
      text: '#7B5B8D'
    },
    Backlog: {
      label: 'Backlog',
      bg: '#F4EBD8',
      text: '#9A7136'
    },
    InProgress: {
      label: 'In Progress',
      bg: '#F3DDD4',
      text: '#9E5947'
    },
    OnHold: {
      label: 'On Hold',
      bg: '#F4DFDC',
      text: '#A85E52'
    },
    Done: {
      label: 'Done',
      bg: '#E2EBDD',
      text: '#5F7858'
    }
  }

  return (
    <div className="
      min-h-screen
      bg-[#F7F1E8]
      px-4 sm:px-6
      py-8
      pb-32
    ">

      <div className="max-w-4xl mx-auto">

        {/* Back */}
        <button
          onClick={() =>
            navigate('/categories')
          }
          className="
            flex
            items-center
            gap-2
            text-[#81776D]
            hover:text-[#4F4841]
            transition
            mb-6
            text-sm
            font-medium
          "
        >
          ← Back to Categories
        </button>

        {/* Category Header */}
        <div
          className="
            rounded-3xl
            p-5 sm:p-6
            mb-6

            border
            border-[#E8DED2]
          "
          style={{
            backgroundColor:
              category.color + '12'
          }}
        >

          {/* Main header */}
          <div className="
            flex
            flex-col sm:flex-row
            sm:items-center
            justify-between
            gap-5
          ">

            <div className="
              flex
              items-center
              gap-4
              min-w-0
            ">

              <div
                className="
                  w-16 h-16
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  text-4xl
                  flex-shrink-0
                "
                style={{
                  backgroundColor:
                    category.color + '20'
                }}
              >
                {category.emoji}
              </div>

              <div className="min-w-0">

                <h1
                  className="
                    text-3xl
                    font-bold
                    tracking-tight
                    truncate
                  "
                  style={{
                    color: category.color
                  }}
                >
                  {category.name}
                </h1>

                {category.description && (
                  <p className="
                    text-[#81776D]
                    mt-1
                    truncate
                  ">
                    {category.description}
                  </p>
                )}

              </div>
            </div>

            {/* Actions */}
            <div className="
              flex
              items-center
              gap-2
              flex-shrink-0
            ">

              <button
                onClick={() => {
                  setEditingTask(null)
                  setIsModalOpen(true)
                }}
                className="
                  bg-[#D49A84]
                  hover:bg-[#C88972]
                  text-white
                  font-semibold
                  px-4
                  py-2.5
                  rounded-xl
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  flex
                  items-center
                  gap-2
                  text-sm
                  shadow-sm
                "
              >
                + Add Task
              </button>

              {/* Menu */}
              <div
                className="relative"
                ref={menuRef}
              >

                <button
                  onClick={() =>
                    setMenuOpen(!menuOpen)
                  }
                  className="
                    w-10 h-10
                    flex
                    items-center
                    justify-center

                    rounded-xl
                    bg-[#FFFDF8]
                    border border-[#E8DED2]

                    hover:bg-[#F3EDE5]
                    text-[#81776D]
                    hover:text-[#4F4841]

                    transition
                    text-xl
                    font-bold
                  "
                >
                  ⋯
                </button>

                {menuOpen && (
                  <div className="
                    absolute
                    right-0
                    top-12

                    bg-[#FFFDF8]
                    border border-[#E8DED2]

                    rounded-xl
                    shadow-xl
                    z-50
                    overflow-hidden
                    min-w-[180px]
                  ">

                    <button
                      onClick={() => {
                        setMenuOpen(false)
                        setEditCategoryOpen(true)
                      }}
                      className="
                        w-full
                        text-left
                        px-4
                        py-3

                        text-sm
                        text-[#625A52]

                        hover:bg-[#F7F1E8]
                        hover:text-[#3D3833]

                        transition
                        flex
                        items-center
                        gap-2
                      "
                    >
                      ✏️ Edit Category
                    </button>

                    <div className="
                      border-t
                      border-[#E8DED2]
                    " />

                    <button
                      onClick={() => {
                        setMenuOpen(false)
                        handleDeleteCategory()
                      }}
                      className="
                        w-full
                        text-left
                        px-4
                        py-3

                        text-sm
                        text-[#A85E52]

                        hover:bg-[#F8E4DF]

                        transition
                        flex
                        items-center
                        gap-2
                      "
                    >
                      🗑️ Delete Category
                    </button>

                  </div>
                )}

              </div>

            </div>

          </div>

          {/* Stats */}
          <div className="
            grid
            grid-cols-3
            gap-3
            sm:gap-4
            mt-6
          ">

            <div className="
              bg-[#FFFDF8]/75
              border border-[#E8DED2]
              rounded-2xl
              p-4
              text-center
            ">
              <p className="
                text-2xl
                font-bold
                text-[#3D3833]
              ">
                {categoryTasks.length}
              </p>

              <p className="
                text-[#81776D]
                text-xs sm:text-sm
                mt-1
              ">
                Total Tasks
              </p>
            </div>

            <div className="
              bg-[#FFFDF8]/75
              border border-[#E8DED2]
              rounded-2xl
              p-4
              text-center
            ">
              <p className="
                text-2xl
                font-bold
                text-[#3D3833]
              ">
                {formatTime(totalSpent)}
              </p>

              <p className="
                text-[#81776D]
                text-xs sm:text-sm
                mt-1
              ">
                Time Spent
              </p>
            </div>

            <div className="
              bg-[#FFFDF8]/75
              border border-[#E8DED2]
              rounded-2xl
              p-4
              text-center
            ">
              <p className="
                text-2xl
                font-bold
                text-[#3D3833]
              ">
                {formatTime(totalGoal)}
              </p>

              <p className="
                text-[#81776D]
                text-xs sm:text-sm
                mt-1
              ">
                Weekly Goal
              </p>
            </div>

          </div>

          {/* Overall progress */}
          {totalGoal > 0 && (
            <div className="mt-5">

              <div className="
                flex
                justify-between
                text-xs
                text-[#81776D]
                mb-2
              ">
                <span>
                  Overall Progress
                </span>

                <span className="font-medium">
                  {progress}%
                </span>
              </div>

              <div className="
                w-full
                bg-[#EDE5DB]
                rounded-full
                h-2
                overflow-hidden
              ">
                <div
                  className="
                    h-2
                    rounded-full
                    transition-all
                  "
                  style={{
                    width: `${progress}%`,
                    backgroundColor:
                      category.color
                  }}
                />
              </div>

            </div>
          )}

        </div>

        {/* Tasks */}
        {categoryTasks.length === 0 ? (

          <div className="
            bg-[#FFFDF8]
            border border-[#E8DED2]
            rounded-3xl

            text-center
            py-16
            px-6
          ">

            <div className="
              w-16 h-16
              rounded-2xl
              bg-[#F3EDE5]
              flex
              items-center
              justify-center
              text-4xl
              mx-auto
              mb-5
            ">
              📭
            </div>

            <h3 className="
              text-[#3D3833]
              font-semibold
              text-lg
              mb-2
            ">
              No tasks yet
            </h3>

            <p className="
              text-[#81776D]
              mb-6
              text-sm
            ">
              Add your first task to this category
            </p>

            <button
              onClick={() => {
                setEditingTask(null)
                setIsModalOpen(true)
              }}
              className="
                bg-[#D49A84]
                hover:bg-[#C88972]
                text-white
                px-6
                py-3
                rounded-xl
                transition-all
                duration-200
                hover:-translate-y-0.5
                font-semibold
              "
            >
              + Add Task
            </button>

          </div>

        ) : (

          <div className="space-y-3">

            {categoryTasks.map(task => {

              const taskProgress =
                task.weeklyGoalMinutes > 0
                  ? Math.min(
                      Math.round(
                        (task.timeSpentMinutes /
                          task.weeklyGoalMinutes) *
                          100
                      ),
                      100
                    )
                  : 0

              const completedSubs =
                task.subtasks?.filter(
                  s => s.isCompleted
                ).length ?? 0

              const totalSubs =
                task.subtasks?.length ?? 0

              const status =
                STATUS_CONFIG[task.status] || {
                  label: task.status,
                  bg: '#F3EDE5',
                  text: '#81776D'
                }

              return (
                <div
                  key={task.id}
                  onClick={() => {
                    setEditingTask(task)
                    setIsModalOpen(true)
                  }}
                  className="
                    bg-[#FFFDF8]
                    rounded-2xl
                    p-5
                    cursor-pointer

                    border border-[#E8DED2]

                    hover:border-[#D8B7AA]
                    hover:-translate-y-0.5
                    hover:shadow-md
                    hover:shadow-[#C97862]/10

                    transition-all
                    duration-200

                    group
                  "
                >

                  <div className="
                    flex
                    items-start
                    justify-between
                    gap-4
                  ">

                    <div className="
                      flex-1
                      min-w-0
                    ">

                      {/* Title + status */}
                      <div className="
                        flex
                        flex-wrap
                        items-center
                        gap-2.5
                        mb-2
                      ">

                        <h3 className="
                          text-[#3D3833]
                          font-semibold
                          group-hover:text-[#B96F59]
                          transition
                          truncate
                        ">
                          {task.title}
                        </h3>

                        <span
                          className="
                            text-xs
                            px-2.5
                            py-1
                            rounded-full
                            font-medium
                            flex-shrink-0
                          "
                          style={{
                            backgroundColor:
                              status.bg,
                            color:
                              status.text
                          }}
                        >
                          {status.label}
                        </span>

                      </div>

                      {/* Description */}
                      {task.description && (
                        <p className="
                          text-[#8A8178]
                          text-sm
                          mb-3
                          line-clamp-1
                        ">
                          {task.description}
                        </p>
                      )}

                      {/* Time progress */}
                      {task.weeklyGoalMinutes > 0 && (
                        <div className="mb-3">

                          <div className="
                            flex
                            justify-between
                            text-xs
                            text-[#8A8178]
                            mb-1.5
                          ">
                            <span>
                              ⏱ {formatTime(
                                task.timeSpentMinutes
                              )} done
                            </span>

                            <span>
                              Goal: {formatTime(
                                task.weeklyGoalMinutes
                              )}
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
                                width:
                                  `${taskProgress}%`,
                                backgroundColor:
                                  taskProgress >= 100
                                    ? '#6F8A68'
                                    : category.color
                              }}
                            />
                          </div>

                          <p className="
                            text-xs
                            text-[#9A9086]
                            mt-1
                            text-right
                          ">
                            {taskProgress}%
                          </p>

                        </div>
                      )}

                      {/* Subtasks */}
                      {totalSubs > 0 && (
                        <div className="
                          flex
                          items-center
                          gap-1.5
                          text-xs
                          text-[#81776D]
                        ">
                          <span className="
                            w-4 h-4
                            rounded-full
                            bg-[#E2EBDD]
                            text-[#6F8A68]
                            flex
                            items-center
                            justify-center
                            text-[10px]
                            font-bold
                          ">
                            ✓
                          </span>

                          <span>
                            {completedSubs}/
                            {totalSubs} subtasks
                          </span>
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
          onClose={() =>
            setEditCategoryOpen(false)
          }
          onSave={handleEditCategory}
          existingCategory={category}
          onDelete={handleDeleteCategory}
        />
      )}

    </div>
  )
}

export default CategoryDetail