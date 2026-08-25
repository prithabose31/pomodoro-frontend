function TimerCircle({ formattedTime, progress, phase }) {
  const size = 260
  const strokeWidth = 10
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference * (1 - progress)

  const phaseColor = {
    idle:  '#6366f1',
    work:  '#8b5cf6',
    break: '#10b981',
    done:  '#f59e0b'
  }[phase] || '#8b5cf6'

  const phaseLabel = {
    idle:  'READY',
    work:  'FOCUS',
    break: 'BREAK',
    done:  'DONE!'
  }[phase] || 'READY'

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <svg
          width={size}
          height={size}
          className="-rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#374151"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={phaseColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col
                        items-center justify-center">
          <span className="text-5xl font-bold text-white
                           font-mono tracking-wider">
            {formattedTime}
          </span>
          <span
            className="text-sm font-semibold mt-1 tracking-widest"
            style={{ color: phaseColor }}
          >
            {phaseLabel}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TimerCircle