import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import useTaskStore from '../store/taskStore'
import WeeklyPlanModal from '../components/tasks/WeeklyPlanModal'
import { useWeeklyPlan } from '../hooks/useWeeklyPlan'
import api from '../services/api'

function Home() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { tasks, fetchTasks } = useTaskStore()
  const { isNewWeek, markPlanned } = useWeeklyPlan()
  const [weeklyPlanOpen, setWeeklyPlanOpen] = useState(false)

  useEffect(() => {
    fetchTasks().then(() => {
      // Show weekly plan modal if new week
      if (isNewWeek()) {
        setTimeout(() => setWeeklyPlanOpen(true), 800)
      }
    })
  }, [])

  
  // Stats
  const totalTasks = tasks.length
  const doneTasks = tasks.filter(t => t.status === 'Done').length
  const inProgressTasks = tasks.filter(t => t.status === 'InProgress').length
  const totalTimeSpent = tasks.reduce((sum, t) => sum + (t.timeSpentMinutes || 0), 0)
  const totalGoal = tasks.reduce((sum, t) => sum + (t.weeklyGoalMinutes || 0), 0)

  const formatTime = (minutes) => {
    if (!minutes) return '0m'
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return h > 0 ? `${h}h ${m}m` : `${m}m`
  }

  const weekProgress = totalGoal > 0
    ? Math.min(Math.round((totalTimeSpent / totalGoal) * 100), 100)
    : 0

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  })

  const handleWeeklySave = async (updates) => {
  try {
    await Promise.all(
      updates.map(({ taskId, weeklyGoalMinutes }) =>
        api.put(`/tasks/${taskId}`, {
          weeklyGoalMinutes,
          ...tasks.find(t => t.id === taskId)
        })
      )
    )
    await fetchTasks()
    markPlanned()
  } catch (err) {
    console.error('Failed to save weekly plan:', err)
  }
}

  

  return (
    <div className="min-h-screen bg-gray-900 px-6 py-8">
      <div className="max-w-5xl mx-auto">

        {/* Welcome Header */}
        <div className="mb-8">
          <p className="text-gray-400 text-sm mb-1">{today}</p>
          <h1 className="text-4xl font-bold text-white">
            {getGreeting()}, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-gray-400 mt-2">
            What are we working on today?
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => navigate('/tasks')}
            className="bg-purple-600 hover:bg-purple-700 text-white
                       rounded-2xl p-5 text-left transition duration-200
                       hover:scale-105 group"
          >
            <div className="text-3xl mb-3">📋</div>
            <h3 className="font-bold text-lg">Task Board</h3>
            <p className="text-purple-200 text-sm mt-1">
              {inProgressTasks} in progress
            </p>
          </button>

          <button
            onClick={() => navigate('/pomodoro')}
            className="bg-gray-800 hover:bg-gray-700 text-white
                       rounded-2xl p-5 text-left transition duration-200
                       hover:scale-105 border border-gray-700
                       hover:border-purple-500 group"
          >
            <div className="text-3xl mb-3">🍅</div>
            <h3 className="font-bold text-lg">Start Timer</h3>
            <p className="text-gray-400 text-sm mt-1">
              Focus session
            </p>
          </button>

          <button
            onClick={() => navigate('/categories')}
            className="bg-gray-800 hover:bg-gray-700 text-white
                       rounded-2xl p-5 text-left transition duration-200
                       hover:scale-105 border border-gray-700
                       hover:border-purple-500 group"
          >
            <div className="text-3xl mb-3">📂</div>
            <h3 className="font-bold text-lg">Categories</h3>
            <p className="text-gray-400 text-sm mt-1">
              Organize tasks
            </p>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700">
            <p className="text-gray-400 text-sm">Total Tasks</p>
            <p className="text-3xl font-bold text-white mt-1">
              {totalTasks}
            </p>
          </div>

          <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700">
            <p className="text-gray-400 text-sm">In Progress</p>
            <p className="text-3xl font-bold text-purple-400 mt-1">
              {inProgressTasks}
            </p>
          </div>

          <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700">
            <p className="text-gray-400 text-sm">Done This Week</p>
            <p className="text-3xl font-bold text-emerald-400 mt-1">
              {doneTasks}
            </p>
          </div>

          <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700">
            <p className="text-gray-400 text-sm">Focus Time</p>
            <p className="text-3xl font-bold text-yellow-400 mt-1">
              {formatTime(totalTimeSpent)}
            </p>
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="bg-gray-800 rounded-2xl p-6 border
                        border-gray-700 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-bold text-lg">
              Weekly Progress
            </h2>
            <span className="text-gray-400 text-sm">
              {formatTime(totalTimeSpent)} / {formatTime(totalGoal)}
            </span>
          </div>

          <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
            <div
              className="h-3 rounded-full transition-all duration-500"
              style={{
                width: `${weekProgress}%`,
                backgroundColor: weekProgress >= 100
                  ? '#10b981' : '#8b5cf6'
              }}
            />
          </div>
          <p className="text-gray-400 text-sm">
            {weekProgress}% of weekly goal complete
          </p>
        </div>

        {/* Active Tasks */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-bold text-lg">
              Active Tasks
            </h2>
            <button
              onClick={() => navigate('/tasks')}
              className="text-purple-400 hover:text-purple-300
                         text-sm transition"
            >
              View all →
            </button>
          </div>

          {tasks.filter(t => t.status !== 'Done').length === 0 ? (
            <div className="text-center py-8">
              <p className="text-4xl mb-3">🎉</p>
              <p className="text-white font-semibold">
                All caught up!
              </p>
              <p className="text-gray-400 text-sm mt-1">
                No active tasks right now
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks
                .filter(t => t.status !== 'Done')
                .slice(0, 5)
                .map(task => {
                  const progress = task.weeklyGoalMinutes > 0
                    ? Math.min(Math.round(
                        (task.timeSpentMinutes / task.weeklyGoalMinutes) * 100
                      ), 100)
                    : 0

                  return (
                    <div
                      key={task.id}
                      onClick={() => navigate('/tasks')}
                      className="flex items-center gap-4 p-4
                                 bg-gray-700/50 rounded-xl cursor-pointer
                                 hover:bg-gray-700 transition group"
                    >
                      {/* Category emoji */}
                      <div className="text-2xl flex-shrink-0">
                        {task.categoryEmoji || '📌'}
                      </div>

                      {/* Task info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center
                                        justify-between gap-2">
                          <p className="text-white font-medium
                                        text-sm truncate
                                        group-hover:text-purple-300
                                        transition">
                            {task.title}
                          </p>
                          <span className={`text-xs px-2 py-0.5
                                           rounded-full flex-shrink-0
                            ${task.status === 'InProgress'
                              ? 'bg-purple-500/20 text-purple-300'
                              : task.status === 'New'
                                ? 'bg-indigo-500/20 text-indigo-300'
                                : 'bg-yellow-500/20 text-yellow-300'
                            }`}>
                            {task.status === 'InProgress'
                              ? 'In Progress'
                              : task.status === 'OnHold'
                                ? 'On Hold' : task.status}
                          </span>
                        </div>

                        {/* Progress bar */}
                        {task.weeklyGoalMinutes > 0 && (
                          <div className="mt-2">
                            <div className="w-full bg-gray-600
                                            rounded-full h-1">
                              <div
                                className="h-1 rounded-full"
                                style={{
                                  width: `${progress}%`,
                                  backgroundColor: progress >= 100
                                    ? '#10b981' : '#8b5cf6'
                                }}
                              />
                            </div>
                            <p className="text-gray-500 text-xs mt-1">
                              {formatTime(task.timeSpentMinutes)} /
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
      <WeeklyPlanModal
        isOpen={weeklyPlanOpen}
        onClose={() => {
          setWeeklyPlanOpen(false)
          markPlanned()
        }}
        onSave={handleWeeklySave}
        tasks={tasks}
      />

      {/* Manual trigger button */}
      <button
        onClick={() => setWeeklyPlanOpen(true)}
        className="fixed bottom-6 right-6 bg-purple-600
                   hover:bg-purple-700 text-white font-semibold
                   px-5 py-3 rounded-2xl shadow-lg transition
                   flex items-center gap-2 text-sm"
      >
        📅 Plan Week
      </button>
      <div className="min-h-screen bg-gray-900 px-6 py-8 pb-24"></div>
    </div>
    
  )
}

export default Home