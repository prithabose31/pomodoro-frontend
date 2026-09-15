function TimerCircle({ formattedTime, progress, phase }) {
  const size = 280
  const strokeWidth = 10
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset =
    circumference * (1 - progress)

  const phaseColor = {
    idle: '#B8A99A',
    work: '#C97862',
    break: '#6F8A68',
    done: '#B68A45'
  }[phase] || '#C97862'

  const phaseBackground = {
    idle: '#F1E9E0',
    work: '#F3DDD4',
    break: '#E2EBDD',
    done: '#F4EBD8'
  }[phase] || '#F3DDD4'

  const phaseLabel = {
    idle: 'READY',
    work: 'FOCUS',
    break: 'BREAK',
    done: 'DONE!'
  }[phase] || 'READY'

  return (
    <div className="
      flex
      items-center
      justify-center
    ">
      <div className="
        relative
        bg-[#FFFDF8]
        rounded-full
        p-3
        shadow-sm
        border border-[#E8DED2]
      ">

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
            stroke="#EDE5DB"
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
            style={{
              transition: 'stroke-dashoffset 1s linear'
            }}
          />
        </svg>

        {/* Center */}
        <div className="
          absolute
          inset-0
          flex
          flex-col
          items-center
          justify-center
        ">

          <span className="
            text-5xl
            sm:text-6xl
            font-bold
            text-[#3D3833]
            font-mono
            tracking-wider
          ">
            {formattedTime}
          </span>

          <span
            className="
              text-xs
              font-bold
              mt-2
              tracking-[0.25em]
              px-3 py-1
              rounded-full
            "
            style={{
              color: phaseColor,
              backgroundColor: phaseBackground
            }}
          >
            {phaseLabel}
          </span>

        </div>

      </div>
    </div>
  )
}

export default TimerCircle