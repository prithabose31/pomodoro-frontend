import { useState } from 'react'
import AmbientPlaylists from './AmbientPlaylists'
import YouTubeSearch from './YouTubeSearch'
import YouTubePlayer from './YouTubePlayer'

function MusicSection() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-gray-800 rounded-2xl border border-gray-700
                    overflow-hidden">
      {/* Header — always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between
                   px-5 py-4 hover:bg-gray-700/50 transition"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">🎵</span>
          <span className="text-white font-semibold">
            Music & YouTube
          </span>
        </div>
        <span className="text-gray-400 transition-transform duration-200"
              style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          ▼
        </span>
      </button>

      {/* Expandable content */}
      {isExpanded && (
        <div className="px-5 pb-5 space-y-6 border-t border-gray-700 pt-5">
          {/* Ambient Playlists */}
          <AmbientPlaylists />

          {/* Divider */}
          <div className="border-t border-gray-700" />

          {/* YouTube Search + URL */}
          <YouTubeSearch />

          {/* Divider */}
          <div className="border-t border-gray-700" />

          {/* Player */}
          <YouTubePlayer />
        </div>
      )}
    </div>
  )
}

export default MusicSection