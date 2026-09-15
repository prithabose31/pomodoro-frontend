import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useAuthStore from '../store/authStore'
import useTaskStore from '../store/taskStore'
import useCategoryStore from '../store/categoryStore'

import WeeklyPlanModal from '../components/tasks/WeeklyPlanModal'
import TaskModal from '../components/tasks/TaskModal'

import { useWeeklyPlan } from '../hooks/useWeeklyPlan'
import api from '../services/api'

function Home() {
  const navigate = useNavigate()

  const { user } = useAuthStore()

  const {
    tasks,
    fetchTasks,
    addTask
  } = useTaskStore()

  const {
    categories,
    fetchCategories
  } = useCategoryStore()

  const {
    isNewWeek,
    markPlanned
  } = useWeeklyPlan()

  const [weeklyPlanOpen, setWeeklyPlanOpen] = useState(false)
  const [taskModalOpen, setTaskModalOpen] = useState(false)

  // Load tasks and categories
  useEffect(() => {
    fetchTasks()
    fetchCategories()
  }, [fetchTasks, fetchCategories])

  // Automatically open weekly plan at the beginning of a new week
  useEffect(() => {
    if (isNewWeek()) {
      const timer = setTimeout(() => {
        setWeeklyPlanOpen(true)
      }, 800)

      return () => clearTimeout(timer)
    }
  }, [isNewWeek])

  // Stats
  const totalTasks = tasks.length

  const doneTasks = tasks.filter(
    t => t.status === 'Done'
  ).length

  const inProgressTasks = tasks.filter(
    t => t.status === 'InProgress'
  ).length

  const totalTimeSpent = tasks.reduce(
    (sum, t) => sum + (t.timeSpentMinutes || 0),
    0
  )

  const totalGoal = tasks.reduce(
    (sum, t) => sum + (t.weeklyGoalMinutes || 0),
    0
  )

  const formatTime = (minutes) => {
    if (!minutes) return '0m'

    const h = Math.floor(minutes / 60)
    const m = minutes % 60

    if (h === 0) {
      return `${m}m`
    }

    if (m === 0) {
      return `${h}h`
    }

    return `${h}h ${m}m`
  }

  const weekProgress = totalGoal > 0
    ? Math.min(
        Math.round(
          (totalTimeSpent / totalGoal) * 100
        ),
        100
      )
    : 0

  const getGreeting = () => {
    const hour = new Date().getHours()

    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon'

    return 'Good Evening'
  }

  const today = new Date().toLocaleDateString(
    'en-US',
    {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    }
  )

  // Save weekly plan
  const handleWeeklySave = async (updates) => {
    try {
      await Promise.all(
        updates.map(({ taskId, weeklyGoalMinutes }) => {
          const task = tasks.find(
            t => t.id === taskId
          )

          if (!task) return null

          return api.put(`/tasks/${taskId}`, {
            ...task,
            weeklyGoalMinutes
          })
        })
      )

      await fetchTasks()

      markPlanned()

      setWeeklyPlanOpen(false)

    } catch (err) {
      console.error(
        'Failed to save weekly plan:',
        err
      )
    }
  }

  // Open Task Modal from Weekly Plan
  const handleAddTask = () => {
    setWeeklyPlanOpen(false)
    setTaskModalOpen(true)
  }

  // Create task
  const handleTaskSave = async (formData) => {
    try {
      await addTask({
        ...formData,
        status: 'New'
      })

      await fetchTasks()

      setTaskModalOpen(false)
      setWeeklyPlanOpen(true)

    } catch (err) {
      console.error(
        'Failed to create task:',
        err
      )
    }
  }

  const activeTasks = tasks.filter(
    t => t.status !== 'Done'
  )

  return (
    <div className="min-h-screen bg-[#F7F1E8] px-4 sm:px-6 py-8 pb-32">

      <div className="max-w-6xl mx-auto">

        {/* Welcome Header */}
        <div className="mb-10">

          <p className="text-[#8A8178] text-sm mb-2">
            {today}
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#3D3833]">
            {getGreeting()}, {user?.name?.split(' ')[0]} 👋
          </h1>

          <p className="text-[#81776D] mt-2 text-base">
            What are we working on today?
          </p>

        </div>


        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">

          {/* Task Board */}
          <button
            onClick={() => navigate('/tasks')}
            className="group text-left rounded-3xl p-6
                       bg-[#F3DDD4]
                       border border-[#E9C9BD]
                       hover:-translate-y-1
                       hover:shadow-md
                       transition-all duration-200"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FFF8F4]
                            flex items-center justify-center
                            text-2xl mb-5">
              📋
            </div>

            <h3 className="font-bold text-lg text-[#6F4035]">
              Task Board
            </h3>

            <p className="text-[#96695D] text-sm mt-1">
              {inProgressTasks} in progress
            </p>

            <div className="mt-5 text-sm font-medium text-[#9E5947]
                            group-hover:translate-x-1 transition-transform">
              View tasks →
            </div>
          </button>


          {/* Timer */}
          <button
            onClick={() => navigate('/pomodoro')}
            className="group text-left rounded-3xl p-6
                       bg-[#E8DFED]
                       border border-[#D8C9E0]
                       hover:-translate-y-1
                       hover:shadow-md
                       transition-all duration-200"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FAF7FC]
                            flex items-center justify-center
                            text-2xl mb-5">
              🍅
            </div>

            <h3 className="font-bold text-lg text-[#5F526A]">
              Start Timer
            </h3>

            <p className="text-[#81758B] text-sm mt-1">
              Focus session
            </p>

            <div className="mt-5 text-sm font-medium text-[#766181]
                            group-hover:translate-x-1 transition-transform">
              Start focusing →
            </div>
          </button>


          {/* Categories */}
          <button
            onClick={() => navigate('/categories')}
            className="group text-left rounded-3xl p-6
                       bg-[#E1E9DC]
                       border border-[#CFDCC9]
                       hover:-translate-y-1
                       hover:shadow-md
                       transition-all duration-200"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#F8FBF6]
                            flex items-center justify-center
                            text-2xl mb-5">
              📂
            </div>

            <h3 className="font-bold text-lg text-[#53634E]">
              Categories
            </h3>

            <p className="text-[#788371] text-sm mt-1">
              Organize tasks
            </p>

            <div className="mt-5 text-sm font-medium text-[#5E7058]
                            group-hover:translate-x-1 transition-transform">
              Manage categories →
            </div>
          </button>

        </div>


        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">

          <div className="bg-[#FFFDF8] rounded-2xl p-5
                          border border-[#E8DED2]">
            <p className="text-[#8A8178] text-sm">
              Total Tasks
            </p>

            <p className="text-3xl font-bold text-[#3D3833] mt-2">
              {totalTasks}
            </p>
          </div>


          <div className="bg-[#FFFDF8] rounded-2xl p-5
                          border border-[#E8DED2]">
            <p className="text-[#8A8178] text-sm">
              In Progress
            </p>

            <p className="text-3xl font-bold text-[#A36351] mt-2">
              {inProgressTasks}
            </p>
          </div>


          <div className="bg-[#FFFDF8] rounded-2xl p-5
                          border border-[#E8DED2]">
            <p className="text-[#8A8178] text-sm">
              Done This Week
            </p>

            <p className="text-3xl font-bold text-[#66805E] mt-2">
              {doneTasks}
            </p>
          </div>


          <div className="bg-[#FFFDF8] rounded-2xl p-5
                          border border-[#E8DED2]">
            <p className="text-[#8A8178] text-sm">
              Focus Time
            </p>

            <p className="text-3xl font-bold text-[#A47E3D] mt-2">
              {formatTime(totalTimeSpent)}
            </p>
          </div>

        </div>


        {/* Weekly Progress */}
        <div className="bg-[#FFFDF8] rounded-3xl p-6 sm:p-7
                        border border-[#E8DED2] mb-10">

          <div className="flex items-center justify-between mb-5">

            <div>
              <h2 className="text-[#3D3833] font-bold text-lg">
                Weekly Progress
              </h2>

              <p className="text-[#8A8178] text-sm mt-1">
                Keep building momentum
              </p>
            </div>

            <span className="text-[#81776D] text-sm">
              {formatTime(totalTimeSpent)} / {formatTime(totalGoal)}
            </span>

          </div>


          <div className="w-full bg-[#EDE4D9] rounded-full h-3 mb-3 overflow-hidden">

            <div
              className="h-3 rounded-full transition-all duration-500"
              style={{
                width: `${weekProgress}%`,
                backgroundColor:
                  weekProgress >= 100
                    ? '#8FA88A'
                    : '#D49A84'
              }}
            />

          </div>


          <div className="flex items-center justify-between">

            <p className="text-[#8A8178] text-sm">
              {weekProgress}% of weekly goal complete
            </p>

            {weekProgress >= 100 && (
              <span className="text-[#66805E] text-sm font-medium">
                Goal reached 🎉
              </span>
            )}

          </div>

        </div>


        {/* Active Tasks */}
        <div className="bg-[#FFFDF8] rounded-3xl p-6 sm:p-7
                        border border-[#E8DED2]">

          <div className="flex items-center justify-between mb-6">

            <div>
              <h2 className="text-[#3D3833] font-bold text-lg">
                Active Tasks
              </h2>

              <p className="text-[#8A8178] text-sm mt-1">
                Things currently on your plate
              </p>
            </div>

            <button
              onClick={() => navigate('/tasks')}
              className="text-[#A36351] hover:text-[#874D3E]
                         text-sm font-medium transition-colors"
            >
              View all →
            </button>

          </div>


          {activeTasks.length === 0 ? (

            <div className="text-center py-12">

              <div className="w-16 h-16 mx-auto rounded-2xl
                              bg-[#F3DDD4]
                              flex items-center justify-center
                              text-3xl mb-4">
                🎉
              </div>

              <p className="text-[#4F4841] font-semibold">
                All caught up!
              </p>

              <p className="text-[#8A8178] text-sm mt-1">
                No active tasks right now
              </p>

            </div>

          ) : (

            <div className="space-y-3">

              {activeTasks
                .slice(0, 5)
                .map(task => {

                  const progress =
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

                  return (

                    <div
                      key={task.id}
                      onClick={() => navigate('/tasks')}
                      className="flex items-center gap-4 p-4
                                 bg-[#F9F5EE]
                                 border border-[#EEE4D8]
                                 rounded-2xl cursor-pointer
                                 hover:bg-[#F5EDE4]
                                 hover:border-[#E3D5C7]
                                 transition-all duration-200 group"
                    >

                      <div
                        className="w-11 h-11 rounded-xl
                                   bg-[#FFFDF8]
                                   border border-[#E8DED2]
                                   flex items-center justify-center
                                   text-xl flex-shrink-0"
                      >
                        {task.categoryEmoji || '📌'}
                      </div>


                      <div className="flex-1 min-w-0">

                        <div className="flex items-center
                                        justify-between gap-2">

                          <p
                            className="text-[#4F4841] font-medium
                                       text-sm truncate
                                       group-hover:text-[#A36351]
                                       transition-colors"
                          >
                            {task.title}
                          </p>


                          <span
                            className={`text-xs px-2.5 py-1
                                        rounded-full flex-shrink-0 font-medium
                              ${
                                task.status === 'InProgress'
                                  ? 'bg-[#E8DFED] text-[#6F5B7B]'
                                  : task.status === 'New'
                                    ? 'bg-[#F3DDD4] text-[#966052]'
                                    : 'bg-[#F2E8C8] text-[#8B743D]'
                              }`}
                          >
                            {task.status === 'InProgress'
                              ? 'In Progress'
                              : task.status === 'OnHold'
                                ? 'On Hold'
                                : task.status}
                          </span>

                        </div>


                        {task.weeklyGoalMinutes > 0 && (

                          <div className="mt-3">

                            <div className="w-full bg-[#E9E0D5]
                                            rounded-full h-1.5 overflow-hidden">

                              <div
                                className="h-1.5 rounded-full transition-all"
                                style={{
                                  width: `${progress}%`,
                                  backgroundColor:
                                    progress >= 100
                                      ? '#8FA88A'
                                      : '#D49A84'
                                }}
                              />

                            </div>


                            <p className="text-[#9A9086] text-xs mt-1.5">
                              {formatTime(task.timeSpentMinutes)} /{' '}
                              {formatTime(task.weeklyGoalMinutes)}
                            </p>

                          </div>

                        )}

                      </div>

                    </div>

                  )
                })}

            </div>

          )}

        </div>

      </div>


      {/* Weekly Plan Modal */}
      {weeklyPlanOpen && (
        <WeeklyPlanModal
          isOpen={weeklyPlanOpen}

          onClose={() => {
            setWeeklyPlanOpen(false)
            markPlanned()
          }}

          onSave={handleWeeklySave}

          onAddTask={handleAddTask}

          tasks={tasks}
        />
      )}


      {/* Add Task Modal */}
      {taskModalOpen && (
        <TaskModal
          isOpen={taskModalOpen}

          onClose={() => {
            setTaskModalOpen(false)
          }}

          onSave={handleTaskSave}

          existingTask={null}

          categories={categories}
        />
      )}


      {/* Manual trigger */}
      <button
        onClick={() => setWeeklyPlanOpen(true)}
        className="fixed bottom-24 right-5 sm:right-6
                   bg-[#D49A84] hover:bg-[#C88972]
                   text-white font-semibold
                   px-5 py-3 rounded-2xl shadow-md
                   hover:shadow-lg transition-all duration-200
                   flex items-center gap-2 text-sm"
      >
        📅 Plan Week
      </button>

    </div>
  )
}

export default Home