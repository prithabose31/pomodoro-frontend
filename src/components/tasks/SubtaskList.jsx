import { useState } from 'react'

function SubtaskList({ subtasks, onChange }) {
  const [newSubtask, setNewSubtask] = useState('')

  const handleAdd = () => {
    if (!newSubtask.trim()) return
    const updated = [
      ...subtasks,
      { id: Date.now(), title: newSubtask.trim(), isCompleted: false }
    ]
    onChange(updated)
    setNewSubtask('')
  }

  const handleToggle = (id) => {
    const updated = subtasks.map(s =>
      s.id === id ? { ...s, isCompleted: !s.isCompleted } : s
    )
    onChange(updated)
  }

  const handleDelete = (id) => {
    onChange(subtasks.filter(s => s.id !== id))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAdd()
    }
  }

  return (
    <div className="space-y-2">
      {/* Existing subtasks */}
      {subtasks.map((subtask) => (
        <div
          key={subtask.id}
          className="flex items-center gap-3 group"
        >
          <button
            type="button"
            onClick={() => handleToggle(subtask.id)}
            className={`w-5 h-5 rounded flex items-center justify-center
                        border-2 transition flex-shrink-0
                        ${subtask.isCompleted
                          ? 'bg-purple-600 border-purple-600'
                          : 'border-gray-500 hover:border-purple-400'
                        }`}
          >
            {subtask.isCompleted && (
              <span className="text-white text-xs">✓</span>
            )}
          </button>
          <span className={`text-sm flex-1 ${subtask.isCompleted
            ? 'line-through text-gray-500'
            : 'text-gray-300'
            }`}>
            {subtask.title}
          </span>
          <button
            type="button"
            onClick={() => handleDelete(subtask.id)}
            className="text-gray-600 hover:text-red-400 transition
                       opacity-0 group-hover:opacity-100 text-sm"
          >
            ×
          </button>
        </div>
      ))}

      {/* Add new subtask */}
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          value={newSubtask}
          onChange={(e) => setNewSubtask(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add subtask..."
          className="flex-1 bg-gray-700 text-white text-sm rounded-lg
                     px-3 py-2 border border-gray-600 focus:border-purple-500
                     focus:outline-none placeholder-gray-500"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="bg-gray-700 hover:bg-gray-600 text-white px-3
                     rounded-lg transition text-sm"
        >
          +
        </button>
      </div>
    </div>
  )
}

export default SubtaskList