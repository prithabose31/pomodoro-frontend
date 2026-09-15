function CategoryCard({ category, onClick }) {
  return (
    <div
      onClick={() => onClick(category)}
      className="
        relative
        bg-[#FFFDF8]
        rounded-2xl
        p-5
        cursor-pointer

        border border-[#E8DED2]

        hover:border-[#D8B7AA]
        hover:-translate-y-0.5
        hover:shadow-md
        hover:shadow-[#C97862]/10

        transition-all
        duration-200

        group
        overflow-hidden
      "
    >
      {/* Color accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
        style={{ backgroundColor: category.color }}
      />

      {/* Emoji */}
      <div className="text-4xl mb-3 mt-1">
        {category.emoji}
      </div>

      {/* Name */}
      <h3
        className="
          text-[#3D3833]
          font-semibold
          text-lg
          mb-1
          group-hover:text-[#B96F59]
          transition-colors
        "
      >
        {category.name}
      </h3>

      {/* Description */}
      {category.description && (
        <p className="
          text-[#81776D]
          text-sm
          mb-4
          line-clamp-2
          leading-relaxed
        ">
          {category.description}
        </p>
      )}

      {/* Task count */}
      <div className="flex items-center gap-2 mt-auto">
        <span
          className="
            text-xs
            font-medium
            px-2.5
            py-1
            rounded-full
          "
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