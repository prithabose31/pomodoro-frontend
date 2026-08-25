function CategoryCard({ category, onClick }) {
  return (
    <div
      onClick={() => onClick(category)}
      className="relative bg-gray-800 rounded-2xl p-5 cursor-pointer
                 border border-gray-700 hover:border-purple-500
                 transition duration-200 hover:scale-105 hover:shadow-xl
                 hover:shadow-purple-500/10 group"
    >
      {/* Color accent bar on top */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
        style={{ backgroundColor: category.color }}
      />

      {/* Emoji */}
      <div className="text-4xl mb-3 mt-1">
        {category.emoji}
      </div>

      {/* Name */}
      <h3 className="text-white font-semibold text-lg mb-1 
                     group-hover:text-purple-300 transition">
        {category.name}
      </h3>

      {/* Description */}
      {category.description && (
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {category.description}
        </p>
      )}

      {/* Task count badge */}
      <div className="flex items-center gap-2 mt-auto">
        <span
          className="text-xs font-medium px-2 py-1 rounded-full"
          style={{
            backgroundColor: category.color + '20',
            color: category.color
          }}
        >
          {category.taskCount ?? 0} tasks
        </span>
      </div>
    </div>
  )
}

export default CategoryCard