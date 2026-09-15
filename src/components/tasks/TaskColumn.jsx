import TaskCard from './TaskCard'

const STATUS_CONFIG = {
  New: {
    label: 'New',
    color: '#A47BB5',
    bg: 'bg-[#EEE6F2]',
    dot: '#A47BB5'
  },

  Backlog: {
    label: 'Backlog',
    color: '#B68A45',
    bg: 'bg-[#F4EBD8]',
    dot: '#B68A45'
  },

  InProgress: {
    label: 'In Progress',
    color: '#C97862',
    bg: 'bg-[#F3DDD4]',
    dot: '#C97862'
  },

  OnHold: {
    label: 'On Hold',
    color: '#B86F68',
    bg: 'bg-[#F4DFDC]',
    dot: '#B86F68'
  },

  Done: {
    label: 'Done',
    color: '#6F8A68',
    bg: 'bg-[#E2EBDd]',
    dot: '#6F8A68'
  }
}

function TaskColumn({ status, tasks, onTaskClick, onAddTask }) {
  const config = STATUS_CONFIG[status]

  return (
    <div className="flex flex-col min-w-[260px] max-w-[260px]">

      {/* Column Header */}
      <div
        className={`
          flex items-center justify-between
          px-3.5 py-2.5
          rounded-xl mb-3
          ${config.bg}
        `}
      >
        <div className="flex items-center gap-2">

          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: config.dot }}
          />

          <span
            className="text-sm font-semibold"
            style={{ color: config.color }}
          >
            {config.label}
          </span>

          <span
            className="
              text-xs font-medium
              text-[#81776D]
              bg-[#FFFDF8]/80
              px-1.5 py-0.5
              rounded-full
            "
          >
            {tasks.length}
          </span>

        </div>

        <button
          onClick={() => onAddTask(status)}
          className="
            w-7 h-7
            flex items-center justify-center
            rounded-lg
            text-[#8A8178]
            hover:text-[#5F574F]
            hover:bg-[#FFFDF8]/80
            transition-all duration-200
            text-lg leading-none
          "
          title="Add task"
        >
          +
        </button>

      </div>

      {/* Tasks */}
      <div className="flex flex-col gap-3 flex-1">

        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={onTaskClick}
          />
        ))}

        {/* Empty state */}
        {tasks.length === 0 && (
          <div
            onClick={() => onAddTask(status)}
            className="
              border-2 border-dashed
              border-[#DED3C7]
              rounded-xl
              p-5
              text-center
              cursor-pointer
              bg-[#FFFDF8]/40
              hover:border-[#C8B8A8]
              hover:bg-[#FFFDF8]/70
              transition-all duration-200
            "
          >
            <p className="text-[#9A9086] text-xs font-medium">
              + Add task
            </p>
          </div>
        )}

      </div>

    </div>
  )
}

export default TaskColumn