import { useState } from 'react'
import AmbientPlaylists from './AmbientPlaylists'
import YouTubeSearch from './YouTubeSearch'
import useMusicStore from '../../store/musicStore'

function GlobalMusicPlayer() {
  const [isExpanded, setIsExpanded] = useState(false)

  const {
    currentVideoId,
    currentTitle,
    clearVideo
  } = useMusicStore()

  const toggleExpanded = () => {
    setIsExpanded(prev => !prev)
  }

  return (
    <div className="w-full bg-gray-900 border-t border-gray-700 shadow-2xl">

      {/* ================================================= */}
      {/* MINI PLAYER BAR - ALWAYS VISIBLE                 */}
      {/* ================================================= */}

      <div className="flex items-center justify-between px-4 py-3">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-3 min-w-0">

          {/* Expand / Minimize button */}
          <button
            onClick={toggleExpanded}
            className="w-8 h-8 flex-shrink-0
                       rounded-lg
                       bg-gray-800
                       hover:bg-gray-700
                       text-gray-300
                       hover:text-white
                       transition
                       flex items-center justify-center"
            title={isExpanded ? 'Minimize music player' : 'Open music player'}
          >
            {isExpanded ? '▼' : '▲'}
          </button>

          {/* Music icon */}
          <span className="text-lg flex-shrink-0">
            🎵
          </span>

          {/* Current song */}
          {currentVideoId ? (
            <div className="flex items-center gap-2 min-w-0">

              <span className="text-green-400 text-xs animate-pulse flex-shrink-0">
                ▶ Playing
              </span>

              <span
                className="text-white text-sm font-medium truncate
                           max-w-[180px] sm:max-w-[400px]"
              >
                {currentTitle || 'Unknown song'}
              </span>

            </div>
          ) : (
            <span className="text-gray-400 text-sm truncate">
              No music playing — pick something below
            </span>
          )}

        </div>


        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3 flex-shrink-0">

          {/* Stop music */}
          {currentVideoId && (
            <button
              onClick={clearVideo}
              className="text-gray-500
                         hover:text-red-400
                         transition
                         text-sm"
              title="Stop music"
            >
              ⏹ Stop
            </button>
          )}

          {/* Expand / Minimize */}
          <button
            onClick={toggleExpanded}
            className="bg-purple-600
                       hover:bg-purple-700
                       text-white
                       text-xs
                       px-3
                       py-1.5
                       rounded-lg
                       transition"
          >
            {isExpanded ? 'Minimize' : 'Open Player'}
          </button>

        </div>

      </div>


      {/* ================================================= */}
      {/* EXPANDED MUSIC PLAYER                            */}
      {/* ================================================= */}

      {currentVideoId && (
        <div
          className="border-t border-gray-700 bg-gray-800"
          style={{
            display: isExpanded ? 'block' : 'none',
            maxHeight: '60vh',
            overflowY: 'auto'
          }}
        >

          <div className="max-w-3xl mx-auto px-4 py-4">

            {/* NOW PLAYING */}
            <div
              className="flex items-center justify-between
                         bg-gray-700
                         rounded-xl
                         px-4
                         py-3
                         mb-4"
            >

              <div className="flex items-center gap-3 min-w-0">

                <span className="text-green-400 text-sm animate-pulse flex-shrink-0">
                  ▶ Playing
                </span>

                <span
                  className="text-white
                             text-sm
                             font-medium
                             truncate
                             max-w-[200px]"
                >
                  {currentTitle || 'Unknown song'}
                </span>

              </div>

              {/* Stop */}
              <button
                onClick={clearVideo}
                className="text-gray-400
                           hover:text-red-400
                           transition
                           text-lg
                           ml-3"
                title="Stop music"
              >
                ×
              </button>

            </div>


            {/* ================================================= */}
            {/* YOUTUBE VIDEO                                    */}
            {/* ================================================= */}

            <div
              className="relative
                         w-full
                         rounded-xl
                         overflow-hidden"
              style={{
                paddingBottom: '35%'
              }}
            >

              <iframe
                className="absolute
                           top-0
                           left-0
                           w-full
                           h-full"
                src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&rel=0`}
                title={currentTitle || 'YouTube music player'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

            </div>

          </div>

        </div>
      )}


      {/* ================================================= */}
      {/* PLAYLISTS + SEARCH                               */}
      {/* ================================================= */}

      {isExpanded && (
        <div
          className="border-t
                     border-gray-700
                     bg-gray-800
                     px-4
                     py-5
                     max-h-[35vh]
                     overflow-y-auto"
        >

          <div className="max-w-3xl mx-auto space-y-6">

            {/* Ambient playlists */}
            <AmbientPlaylists />

            <div className="border-t border-gray-700" />

            {/* YouTube search */}
            <YouTubeSearch />

          </div>

        </div>
      )}

    </div>
  )
}

export default GlobalMusicPlayer