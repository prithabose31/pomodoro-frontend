function SessionDots({ totalCycles, currentCycle, phase }) {
  return (
    <div className="flex items-center gap-2 justify-center">
      {Array.from({ length: totalCycles }).map((_, i) => {
        const cycleNum = i + 1
        const isCompleted = cycleNum < currentCycle
        const isCurrent = cycleNum === currentCycle
        const isBreak = isCurrent && phase === 'break'

        return (
          <div
            key={i}
            className={`rounded-full transition-all duration-300
              ${isCompleted
                ? 'w-3 h-3 bg-purple-500'
                : isCurrent && phase === 'work'
                  ? 'w-4 h-4 bg-purple-400 ring-2 ring-purple-300'
                  : isBreak
                    ? 'w-4 h-4 bg-emerald-400 ring-2 ring-emerald-300'
                    : 'w-3 h-3 bg-gray-600'
              }`}
          />
        )
      })}
      <span className="text-gray-400 text-sm ml-2">
        {phase === 'break'
          ? 'Break time'
          : phase === 'done'
            ? 'All done!'
            : `Session ${currentCycle} of ${totalCycles}`
        }
      </span>
    </div>
  )
}

export default SessionDots