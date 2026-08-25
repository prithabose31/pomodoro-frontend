function TimerControls({ phase, isPaused, canStart, onStart,
  onPause, onResume, onStop, onSkip }) {
  return (
    <div className="flex items-center justify-center gap-6">

      {/* Stop button */}
      {phase !== 'idle' && (
        <button
          onClick={onStop}
          title="Stop"
          className="w-11 h-11 rounded-full bg-gray-700/80
                     hover:bg-red-500/20 border border-gray-600
                     hover:border-red-500/50 text-gray-400
                     hover:text-red-400 transition-all duration-200
                     flex items-center justify-center"
        >
          <svg width="14" height="14" viewBox="0 0 14 14"
               fill="currentColor">
            <rect x="2" y="2" width="10" height="10" rx="1.5"/>
          </svg>
        </button>
      )}

      {/* Main button */}
      {phase === 'idle' || phase === 'done' ? (
        <button
          onClick={onStart}
          disabled={!canStart}
          title={canStart ? 'Start' : 'Select a task first'}
          className="w-20 h-20 rounded-full text-white
                     flex items-center justify-center
                     transition-all duration-200
                     disabled:opacity-40 disabled:cursor-not-allowed
                     disabled:scale-100 hover:scale-105"
          style={canStart ? {
            background: 'linear-gradient(135deg, #7c3aed, #9333ea)',
            boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)'
          } : {
            background: '#374151'
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24"
               fill="currentColor" style={{ marginLeft: '3px' }}>
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
      ) : isPaused ? (
        <button
          onClick={onResume}
          title="Resume"
          className="w-20 h-20 rounded-full text-white
                     flex items-center justify-center
                     transition-all duration-200 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #9333ea)',
            boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)'
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24"
               fill="currentColor" style={{ marginLeft: '3px' }}>
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
      ) : (
        <button
          onClick={onPause}
          title="Pause"
          className="w-20 h-20 rounded-full text-white
                     flex items-center justify-center
                     transition-all duration-200 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #9333ea)',
            boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24"
               fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        </button>
      )}

      {/* Skip button */}
      {phase !== 'idle' && phase !== 'done' && (
        <button
          onClick={onSkip}
          title="Skip to next"
          className="w-11 h-11 rounded-full bg-gray-700/80
                     hover:bg-gray-600 border border-gray-600
                     hover:border-gray-500 text-gray-400
                     hover:text-white transition-all duration-200
                     flex items-center justify-center"
        >
          <svg width="16" height="16" viewBox="0 0 24 24"
               fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8
                     14.14V9.86zM16 6h2v12h-2z"/>
          </svg>
        </button>
      )}
    </div>
  )
}

export default TimerControls