function TaskSelector({ tasks, selectedTaskId, onSelect, disabled }) {
  const selectedTask = tasks.find(t => t.id === selectedTaskId)

  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <span className="text-gray-400 text-sm font-medium">
          Active Task
        </span>
      </div>

      {selectedTask ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {selectedTask.categoryEmoji && (
              <span>{selectedTask.categoryEmoji}</span>
            )}
            <div>
              <p className="text-white font-medium text-sm">
                {selectedTask.title}
              </p>
              {selectedTask.categoryName && (
                <p className="text-gray-400 text-xs">
                  {selectedTask.categoryName}
                </p>
              )}
            </div>
          </div>
          {!disabled && (
            <button
              onClick={() => onSelect(null)}
              className="text-gray-500 hover:text-white
                         transition text-sm"
            >
              ×
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No active tasks
            </p>
          ) : (
            tasks
              .filter(t => t.status !== 'Done')
              .map(task => (
                <button
                  key={task.id}
                  onClick={() => onSelect(task.id)}
                  disabled={disabled}
                  className="w-full text-left px-3 py-2 rounded-lg
                             bg-gray-700 hover:bg-gray-600 transition
                             flex items-center gap-2 disabled:opacity-50"
                >
                  {task.categoryEmoji && (
                    <span className="text-sm">
                      {task.categoryEmoji}
                    </span>
                  )}
                  <span className="text-white text-sm">
                    {task.title}
                  </span>
                </button>
              ))
          )}
        </div>
      )}
    </div>
  )
}

export default TaskSelector