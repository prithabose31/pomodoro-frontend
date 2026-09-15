function TaskSelector({
  tasks,
  selectedTaskId,
  onSelect,
  disabled
}) {
  const selectedTask = tasks.find(
    t => t.id === selectedTaskId
  )

  return (
    <div className="
      bg-[#FFFDF8]
      rounded-2xl
      p-4
      border border-[#E8DED2]
      shadow-sm
    ">

      <div className="
        flex items-center
        justify-between
        mb-3
      ">
        <div>
          <p className="text-[#3D3833] text-sm font-semibold">
            Focus Task
          </p>

          <p className="text-[#9A9086] text-xs mt-0.5">
            What are you working on?
          </p>
        </div>

        {selectedTask && (
          <span className="
            text-xs
            bg-[#E2EBDD]
            text-[#587052]
            px-2.5 py-1
            rounded-full
            font-medium
          ">
            Selected
          </span>
        )}
      </div>

      {selectedTask ? (

        <div className="
          flex items-center
          justify-between
          bg-[#F7F1E8]
          rounded-xl
          px-3.5 py-3
          border border-[#E8DED2]
        ">

          <div className="flex items-center gap-3 min-w-0">

            <span className="
              w-9 h-9
              rounded-lg
              bg-[#FFFDF8]
              flex items-center
              justify-center
              text-base
              flex-shrink-0
            ">
              {selectedTask.categoryEmoji || '📌'}
            </span>

            <div className="min-w-0">
              <p className="
                text-[#3D3833]
                font-semibold
                text-sm
                truncate
              ">
                {selectedTask.title}
              </p>

              {selectedTask.categoryName && (
                <p className="
                  text-[#8A8178]
                  text-xs
                  mt-0.5
                ">
                  {selectedTask.categoryName}
                </p>
              )}
            </div>

          </div>

          {!disabled && (
            <button
              onClick={() => onSelect(null)}
              className="
                w-7 h-7
                flex items-center justify-center
                rounded-lg
                text-[#9A9086]
                hover:text-[#A85E52]
                hover:bg-[#F4DFDC]
                transition
                text-lg
                flex-shrink-0
              "
            >
              ×
            </button>
          )}

        </div>

      ) : (

        <div className="
          space-y-2
          max-h-40
          overflow-y-auto
        ">

          {tasks.length === 0 ? (

            <div className="
              text-center
              py-5
              bg-[#F7F1E8]
              rounded-xl
            ">
              <p className="text-[#9A9086] text-sm">
                No active tasks
              </p>
            </div>

          ) : (

            tasks
              .filter(t => t.status !== 'Done')
              .map(task => (
                <button
                  key={task.id}
                  onClick={() => onSelect(task.id)}
                  disabled={disabled}
                  className="
                    w-full
                    text-left
                    px-3
                    py-2.5
                    rounded-xl
                    bg-[#F7F1E8]
                    hover:bg-[#F1E5DC]
                    border border-transparent
                    hover:border-[#E2CFC4]
                    transition-all
                    flex items-center
                    gap-3
                    disabled:opacity-50
                  "
                >

                  <span className="
                    w-8 h-8
                    rounded-lg
                    bg-[#FFFDF8]
                    flex items-center
                    justify-center
                    text-sm
                    flex-shrink-0
                  ">
                    {task.categoryEmoji || '📌'}
                  </span>

                  <span className="
                    text-[#4F4841]
                    text-sm
                    truncate
                  ">
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