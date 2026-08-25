import TaskCard from './TaskCard'

const STATUS_CONFIG = {
  New:        { label: 'New',         color: '#6366f1', bg: 'bg-indigo-500/10'  },
  Backlog:    { label: 'Backlog',     color: '#f59e0b', bg: 'bg-yellow-500/10'  },
  InProgress: { label: 'In Progress', color: '#8b5cf6', bg: 'bg-purple-500/10'  },
  OnHold:     { label: 'On Hold',     color: '#ef4444', bg: 'bg-red-500/10'     },
  Done:       { label: 'Done',        color: '#10b981', bg: 'bg-emerald-500/10' },
}

function TaskColumn({ status, tasks, onTaskClick, onAddTask }) {
  const config = STATUS_CONFIG[status]

  return (
    <div className="flex flex-col min-w-[260px] max-w-[260px]">
      {/* Column Header */}
      <div className={`flex items-center justify-between px-3 py-2 
                       rounded-xl mb-3 ${config.bg}`}>
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: config.color }}
          />
          <span
            className="text-sm font-semibold"
            style={{ color: config.color }}
          >
            {config.label}
          </span>
          <span className="text-xs text-gray-500 bg-gray-800
                           px-1.5 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask(status)}
          className="text-gray-500 hover:text-white transition text-lg
                     leading-none"
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
            className="border-2 border-dashed border-gray-700
                       rounded-xl p-4 text-center cursor-pointer
                       hover:border-gray-500 transition"
          >
            <p className="text-gray-600 text-xs">+ Add task</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskColumn