import useMusicStore from '../../store/musicStore'

function YouTubePlayer() {
  const { currentVideoId, currentTitle, clearVideo } = useMusicStore()

  if (!currentVideoId) return null

  return (
    <div className="space-y-3">
      {/* Now playing bar */}
      <div className="flex items-center justify-between
                      bg-gray-700 rounded-xl px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-green-400 text-sm animate-pulse">
            ▶ Playing
          </span>
          <span className="text-white text-sm font-medium
                           truncate max-w-[200px]">
            {currentTitle}
          </span>
        </div>
        <button
          onClick={clearVideo}
          className="text-gray-400 hover:text-white transition text-lg"
          title="Stop"
        >
          ×
        </button>
      </div>

      {/* Embedded YouTube player */}
      <div className="relative w-full rounded-xl overflow-hidden"
           style={{ paddingBottom: '56.25%' }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&rel=0`}
          title={currentTitle}
          allow="accelerometer; autoplay; clipboard-write;
                 encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}

export default YouTubePlayer