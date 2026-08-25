const COLORS = [
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Blue',   value: '#3b82f6' },
  { name: 'Green',  value: '#10b981' },
  { name: 'Yellow', value: '#f59e0b' },
  { name: 'Red',    value: '#ef4444' },
  { name: 'Pink',   value: '#ec4899' },
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Teal',   value: '#14b8a6' },
]

function ColorPicker({ selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-3">
      {COLORS.map((color) => (
        <button
          key={color.value}
          type="button"
          onClick={() => onSelect(color.value)}
          className="w-8 h-8 rounded-full transition duration-200
                     hover:scale-110 focus:outline-none"
          style={{ backgroundColor: color.value }}
          title={color.name}
        >
          {selected === color.value && (
            <span className="flex items-center justify-center 
                             text-white text-sm font-bold">
              ✓
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

export default ColorPicker