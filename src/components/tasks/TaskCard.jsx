function TaskCard({ task, onClick }) {
  const progressPercent = task.weeklyGoalMinutes > 0
    ? Math.min(Math.round((task.timeSpentMinutes / task.weeklyGoalMinutes) * 100), 100)
    : 0

  const completedSubtasks = task.subtasks?.filter(s => s.isCompleted).length ?? 0
  const totalSubtasks = task.subtasks?.length ?? 0

  const formatTime = (minutes) => {
    if (!minutes) return '0m'
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return h > 0 ? `${h}h ${m}m` : `${m}m`
  }

  return (
    <div
      onClick={() => onClick(task)}
      className="bg-gray-800 rounded-xl p-4 cursor-pointer
                 border border-gray-700 hover:border-purple-500
                 transition duration-200 hover:shadow-lg
                 hover:shadow-purple-500/10 group"
    >
      {/* Category + Priority */}
      <div className="flex items-center justify-between mb-2">
        {task.categoryName && (
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{
              backgroundColor: (task.categoryColor ?? '#8b5cf6') + '20',
              color: task.categoryColor ?? '#8b5cf6'
            }}
          >
            {task.categoryEmoji} {task.categoryName}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-white font-semibold text-sm mb-1
                     group-hover:text-purple-300 transition line-clamp-2">
        {task.title}
      </h3>

      {/* Description */}
      {task.description && (
        <p className="text-gray-400 text-xs mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Time Progress */}
      {task.weeklyGoalMinutes > 0 && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>⏱ {formatTime(task.timeSpentMinutes)} done</span>
            <span>Goal: {formatTime(task.weeklyGoalMinutes)}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: `${progressPercent}%`,
                backgroundColor: progressPercent >= 100
                  ? '#10b981'
                  : '#8b5cf6'
              }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1 text-right">
            {progressPercent}%
          </p>
        </div>
      )}

      {/* Subtasks */}
      {totalSubtasks > 0 && (
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <span>✓</span>
          <span>{completedSubtasks}/{totalSubtasks} subtasks</span>
        </div>
      )}
    </div>
  )
}

export default TaskCard