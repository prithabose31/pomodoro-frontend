function SessionConfig({ workMinutes, breakMinutes, cycles,
  onChange, disabled }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">

      {/* Work duration */}
      <div className="flex items-center gap-2 bg-gray-800
                      rounded-xl px-4 py-2 border border-gray-700">
        <span className="text-purple-400 text-sm font-medium">
          Work
        </span>
        <input
          type="number"
          min="1"
          max="120"
          value={workMinutes}
          disabled={disabled}
          onChange={(e) => onChange('workMinutes',
            Number(e.target.value))}
          className="w-14 bg-transparent text-white text-center
                     focus:outline-none disabled:opacity-50"
        />
        <span className="text-gray-400 text-sm">min</span>
      </div>

      {/* Break duration */}
      <div className="flex items-center gap-2 bg-gray-800
                      rounded-xl px-4 py-2 border border-gray-700">
        <span className="text-emerald-400 text-sm font-medium">
          Break
        </span>
        <input
          type="number"
          min="1"
          max="60"
          value={breakMinutes}
          disabled={disabled}
          onChange={(e) => onChange('breakMinutes',
            Number(e.target.value))}
          className="w-14 bg-transparent text-white text-center
                     focus:outline-none disabled:opacity-50"
        />
        <span className="text-gray-400 text-sm">min</span>
      </div>

      {/* Cycles */}
      <div className="flex items-center gap-2 bg-gray-800
                      rounded-xl px-4 py-2 border border-gray-700">
        <span className="text-yellow-400 text-sm font-medium">
          Cycles
        </span>
        <input
          type="number"
          min="1"
          max="10"
          value={cycles}
          disabled={disabled}
          onChange={(e) => onChange('cycles',
            Number(e.target.value))}
          className="w-10 bg-transparent text-white text-center
                     focus:outline-none disabled:opacity-50"
        />
      </div>
    </div>
  )
}

export default SessionConfig