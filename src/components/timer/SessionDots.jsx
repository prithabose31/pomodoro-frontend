function SessionDots({
  totalCycles,
  currentCycle,
  phase
}) {
  return (
    <div className="
      flex
      items-center
      justify-center
      gap-2
      flex-wrap
    ">

      {Array.from({ length: totalCycles }).map((_, i) => {
        const cycleNum = i + 1

        const isCompleted =
          cycleNum < currentCycle

        const isCurrent =
          cycleNum === currentCycle

        const isBreak =
          isCurrent && phase === 'break'

        return (
          <div
            key={i}
            className={`
              rounded-full
              transition-all
              duration-300
              ${
                isCompleted
                  ? 'w-3 h-3 bg-[#C97862]'
                  : isCurrent && phase === 'work'
                    ? 'w-4 h-4 bg-[#C97862] ring-2 ring-[#E9B7A5]'
                    : isBreak
                      ? 'w-4 h-4 bg-[#6F8A68] ring-2 ring-[#C5D6BE]'
                      : 'w-3 h-3 bg-[#D8C9BA]'
              }
            `}
          />
        )
      })}

      <span className="
        text-[#81776D]
        text-sm
        ml-2
      ">
        {phase === 'break'
          ? 'Break time'
          : phase === 'done'
            ? 'All done!'
            : `Session ${currentCycle} of ${totalCycles}`}
      </span>

    </div>
  )
}

export default SessionDots