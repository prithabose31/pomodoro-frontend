function TaskCard({ task, onClick }) {
  const progressPercent =
    task.weeklyGoalMinutes > 0
      ? Math.min(
          Math.round(
            (task.timeSpentMinutes / task.weeklyGoalMinutes) * 100
          ),
          100
        )
      : 0

  const completedSubtasks =
    task.subtasks?.filter(s => s.isCompleted).length ?? 0

  const totalSubtasks =
    task.subtasks?.length ?? 0

  const formatTime = (minutes) => {
    if (!minutes) return '0m'

    const h = Math.floor(minutes / 60)
    const m = minutes % 60

    return h > 0 ? `${h}h ${m}m` : `${m}m`
  }

  const progressColor =
    progressPercent >= 100
      ? '#6F8A68'
      : '#C97862'

  return (
    <div
      onClick={() => onClick(task)}
      className="
        bg-[#FFFDF8]
        rounded-2xl
        p-4
        cursor-pointer

        border border-[#E8DED2]

        hover:border-[#D8B7AA]
        hover:-translate-y-0.5
        hover:shadow-md
        hover:shadow-[#C97862]/10

        transition-all duration-200
        group
      "
    >

      {/* Category */}
      {task.categoryName && (
        <div className="flex items-center justify-between mb-3">
          <span
            className="
              text-xs
              px-2.5 py-1
              rounded-full
              font-medium
            "
            style={{
              backgroundColor:
                (task.categoryColor ?? '#A47BB5') + '20',
              color:
                task.categoryColor ?? '#A47BB5'
            }}
          >
            {task.categoryEmoji} {task.categoryName}
          </span>
        </div>
      )}

      {/* Title */}
      <h3
        className="
          text-[#3D3833]
          font-semibold
          text-sm
          mb-1
          line-clamp-2
          group-hover:text-[#B96F59]
          transition-colors
        "
      >
        {task.title}
      </h3>

      {/* Description */}
      {task.description && (
        <p
          className="
            text-[#8A8178]
            text-xs
            mb-3
            line-clamp-2
            leading-relaxed
          "
        >
          {task.description}
        </p>
      )}

      {/* Time Progress */}
      {task.weeklyGoalMinutes > 0 && (
        <div className="mb-3">

          <div
            className="
              flex
              justify-between
              text-xs
              text-[#8A8178]
              mb-1.5
            "
          >
            <span>
              ⏱ {formatTime(task.timeSpentMinutes)} done
            </span>

            <span>
              Goal: {formatTime(task.weeklyGoalMinutes)}
            </span>
          </div>

          <div
            className="
              w-full
              bg-[#EDE5DB]
              rounded-full
              h-1.5
              overflow-hidden
            "
          >
            <div
              className="
                h-1.5
                rounded-full
                transition-all duration-300
              "
              style={{
                width: `${progressPercent}%`,
                backgroundColor: progressColor
              }}
            />
          </div>

          <p
            className="
              text-xs
              text-[#9A9086]
              mt-1
              text-right
            "
          >
            {progressPercent}%
          </p>

        </div>
      )}

      {/* Subtasks */}
      {totalSubtasks > 0 && (
        <div
          className="
            flex
            items-center
            gap-1.5
            text-xs
            text-[#81776D]
          "
        >
          <span
            className="
              w-4 h-4
              rounded-full
              bg-[#E2EBDD]
              text-[#6F8A68]
              flex
              items-center
              justify-center
              text-[10px]
              font-bold
            "
          >
            ✓
          </span>

          <span>
            {completedSubtasks}/{totalSubtasks} subtasks
          </span>
        </div>
      )}

    </div>
  )
}

export default TaskCard