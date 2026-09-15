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

  return (
    <div className="
      bg-[#FFFDF8]
      border-t border-[#E8DED2]
      shadow-[0_-4px_20px_rgba(61,56,51,0.08)]
    ">

      {/* Collapsed bar */}
      <div className="
        flex
        items-center
        justify-between
        px-4
        py-3
        min-h-[64px]
      ">

        <div className="
          flex
          items-center
          gap-3
          min-w-0
        ">

          {/* Expand */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="
              w-9 h-9
              rounded-xl
              bg-[#F3EDE5]
              hover:bg-[#EAE0D5]
              text-[#81776D]
              hover:text-[#5F574F]
              transition
              flex
              items-center
              justify-center
              flex-shrink-0
            "
            title={isExpanded ? 'Collapse player' : 'Open player'}
          >
            {isExpanded ? '▼' : '▲'}
          </button>

          {/* Music icon */}
          <div className="
            w-9 h-9
            rounded-xl
            bg-[#EEE6F2]
            flex
            items-center
            justify-center
            text-lg
            flex-shrink-0
          ">
            🎵
          </div>

          {/* Current track */}
          {currentVideoId ? (
            <div className="
              flex
              items-center
              gap-2
              min-w-0
            ">
              <span className="
                text-[#6F8A68]
                text-xs
                font-semibold
                animate-pulse
                flex-shrink-0
              ">
                ▶ Playing
              </span>

              <span className="
                text-[#4F4841]
                text-sm
                font-medium
                truncate
                max-w-[180px]
                sm:max-w-[400px]
              ">
                {currentTitle}
              </span>
            </div>
          ) : (
            <span className="
              text-[#8A8178]
              text-sm
              truncate
            ">
              No music playing — pick something below
            </span>
          )}

        </div>

        {/* Actions */}
        <div className="
          flex
          items-center
          gap-2
          ml-3
          flex-shrink-0
        ">

          {currentVideoId && (
            <button
              onClick={clearVideo}
              className="
                hidden sm:block
                text-[#8A8178]
                hover:text-[#A85E52]
                text-sm
                px-3
                py-2
                rounded-xl
                hover:bg-[#F8E4DF]
                transition
              "
              title="Stop music"
            >
              ⏹ Stop
            </button>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="
              bg-[#D49A84]
              hover:bg-[#C88972]
              text-white
              text-xs
              font-semibold
              px-3.5
              py-2
              rounded-xl
              transition-all
              duration-200
              hover:-translate-y-0.5
              shadow-sm
            "
          >
            {isExpanded ? 'Close' : 'Open Player'}
          </button>

        </div>

      </div>

      {/* YouTube player */}
      {currentVideoId && (
        <div
          style={{
            display: isExpanded ? 'block' : 'none'
          }}
          className="
            border-t
            border-[#E8DED2]
            bg-[#F7F1E8]
          "
        >
          <div className="
            max-w-3xl
            mx-auto
            px-4
            py-4
          ">

            {/* Now playing */}
            <div className="
              flex
              items-center
              justify-between
              bg-[#FFFDF8]
              border border-[#E8DED2]
              rounded-2xl
              px-4
              py-3
              mb-4
            ">

              <div className="
                flex
                items-center
                gap-3
                min-w-0
              ">
                <span className="
                  text-[#6F8A68]
                  text-sm
                  font-semibold
                  animate-pulse
                  flex-shrink-0
                ">
                  ▶ Playing
                </span>

                <span className="
                  text-[#4F4841]
                  text-sm
                  font-medium
                  truncate
                ">
                  {currentTitle}
                </span>
              </div>

              <button
                onClick={clearVideo}
                className="
                  w-8 h-8
                  rounded-lg
                  text-[#8A8178]
                  hover:text-[#A85E52]
                  hover:bg-[#F8E4DF]
                  transition
                  flex
                  items-center
                  justify-center
                  text-lg
                  flex-shrink-0
                "
              >
                ×
              </button>

            </div>

            {/* Iframe stays mounted so music doesn't stop */}
            <div
              className="
                relative
                w-full
                rounded-2xl
                overflow-hidden
                border border-[#E8DED2]
                shadow-sm
              "
              style={{ paddingBottom: '56.25%' }}
            >
              <iframe
                className="
                  absolute
                  top-0
                  left-0
                  w-full
                  h-full
                "
                src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&rel=0`}
                title={currentTitle}
                allow="
                  accelerometer;
                  autoplay;
                  clipboard-write;
                  encrypted-media;
                  gyroscope;
                  picture-in-picture
                "
                allowFullScreen
              />
            </div>

          </div>
        </div>
      )}

      {/* Search / playlists */}
      {isExpanded && (
        <div className="
          border-t
          border-[#E8DED2]
          bg-[#FFFDF8]
          px-4
          py-5
          max-h-[50vh]
          overflow-y-auto
        ">
          <div className="
            max-w-3xl
            mx-auto
            space-y-6
          ">
            <AmbientPlaylists />

            <div className="
              border-t
              border-[#E8DED2]
            " />

            <YouTubeSearch />
          </div>
        </div>
      )}

    </div>
  )
}

export default GlobalMusicPlayer