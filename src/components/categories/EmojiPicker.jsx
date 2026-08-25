const EMOJIS = [
  '💼', '🧠', '📚', '🎯', '🏋️', '🎵',
  '💻', '🎨', '🔬', '📝', '🌱', '⚡',
  '🏠', '✈️', '🎮', '📊', '🤝', '💡',
]

function EmojiPicker({ selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {EMOJIS.map((emoji) => (
        <button
          key={emoji}
          type="button"
          onClick={() => onSelect(emoji)}
          className={`w-10 h-10 rounded-xl text-xl flex items-center 
                      justify-center transition duration-200 hover:scale-110
                      ${selected === emoji
                        ? 'bg-purple-600 ring-2 ring-purple-400'
                        : 'bg-gray-700 hover:bg-gray-600'
                      }`}
        >
          {emoji}
        </button>
      ))}
    </div>
  )
}

export default EmojiPicker