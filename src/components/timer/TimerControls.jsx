function TimerControls({
  phase,
  isPaused,
  canStart,
  onStart,
  onPause,
  onResume,
  onStop,
  onSkip
}) {
  const mainButtonStyle = canStart
    ? {
        background: '#D49A84',
        boxShadow: '0 8px 24px rgba(201, 120, 98, 0.22)'
      }
    : {
        background: '#D8CFC6'
      }

  return (
    <div className="
      flex
      items-center
      justify-center
      gap-6
    ">

      {/* Stop */}
      {phase !== 'idle' && (
        <button
          onClick={onStop}
          title="Stop"
          className="
            w-11 h-11
            rounded-full
            bg-[#FFFDF8]
            hover:bg-[#F4DFDC]
            border border-[#DED3C7]
            hover:border-[#D7ADA4]
            text-[#8A8178]
            hover:text-[#A85E52]
            transition-all
            duration-200
            flex
            items-center
            justify-center
          "
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="currentColor"
          >
            <rect
              x="2"
              y="2"
              width="10"
              height="10"
              rx="1.5"
            />
          </svg>
        </button>
      )}

      {/* Main button */}
      {phase === 'idle' || phase === 'done' ? (

        <button
          onClick={onStart}
          disabled={!canStart}
          title={
            canStart
              ? 'Start'
              : 'Select a task first'
          }
          className="
            w-20 h-20
            rounded-full
            text-white
            flex
            items-center
            justify-center
            transition-all
            duration-200
            disabled:opacity-60
            disabled:cursor-not-allowed
            hover:scale-105
            disabled:hover:scale-100
          "
          style={mainButtonStyle}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ marginLeft: '3px' }}
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>

      ) : isPaused ? (

        <button
          onClick={onResume}
          title="Resume"
          className="
            w-20 h-20
            rounded-full
            text-white
            flex
            items-center
            justify-center
            transition-all
            duration-200
            hover:scale-105
          "
          style={{
            background: '#D49A84',
            boxShadow:
              '0 8px 24px rgba(201, 120, 98, 0.22)'
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>

      ) : (

        <button
          onClick={onPause}
          title="Pause"
          className="
            w-20 h-20
            rounded-full
            text-white
            flex
            items-center
            justify-center
            transition-all
            duration-200
            hover:scale-105
          "
          style={{
            background: '#D49A84',
            boxShadow:
              '0 8px 24px rgba(201, 120, 98, 0.22)'
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        </button>

      )}

      {/* Skip */}
      {phase !== 'idle' && phase !== 'done' && (
        <button
          onClick={onSkip}
          title="Skip to next"
          className="
            w-11 h-11
            rounded-full
            bg-[#FFFDF8]
            hover:bg-[#F7F1E8]
            border border-[#DED3C7]
            hover:border-[#C8B8A8]
            text-[#8A8178]
            hover:text-[#5F574F]
            transition-all
            duration-200
            flex
            items-center
            justify-center
          "
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z" />
          </svg>
        </button>
      )}

    </div>
  )
}

export default TimerControls