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
    <div
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-[9999]
        bg-[#fffaf4]
        border-t
        border-[#dfd1c3]
        shadow-[0_-8px_30px_rgba(61,56,51,0.12)]
      "
    >

      {/* =====================================================
          MINI PLAYER
      ====================================================== */}

      <div className="max-w-6xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between gap-4">

          {/* Left side */}
          <div className="flex items-center gap-3 min-w-0">

            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="
                w-9
                h-9
                flex
                items-center
                justify-center
                rounded-full
                bg-[#f2e6da]
                text-[#6d5d51]
                hover:bg-[#e9b7a5]
                transition
              "
              title={isExpanded ? 'Minimize player' : 'Open player'}
            >
              {isExpanded ? '⌄' : '⌃'}
            </button>

            <div
              className="
                w-9
                h-9
                flex
                items-center
                justify-center
                rounded-full
                bg-[#f5d8cc]
                text-lg
                flex-shrink-0
              "
            >
              🎵
            </div>

            <div className="min-w-0">

              {currentVideoId ? (
                <>
                  <div className="flex items-center gap-2">

                    <span className="text-xs font-semibold text-[#b46f59]">
                      ▶ Playing
                    </span>

                    <span
                      className="
                        text-sm
                        font-medium
                        text-[#3d3833]
                        truncate
                        max-w-[180px]
                        sm:max-w-[400px]
                      "
                    >
                      {currentTitle}
                    </span>

                  </div>

                  <p className="text-[11px] text-[#9a8878]">
                    FocusFlow music
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm font-medium text-[#5d5148]">
                    FocusFlow Sounds
                  </p>

                  <p className="text-[11px] text-[#9a8878]">
                    Pick something to listen to
                  </p>
                </>
              )}

            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 flex-shrink-0">

            {currentVideoId && (
              <button
                type="button"
                onClick={clearVideo}
                className="
                  hidden
                  sm:block
                  text-xs
                  font-medium
                  text-[#9a8878]
                  hover:text-[#b45f59]
                  px-2
                  transition
                "
              >
                ⏹ Stop
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="
                px-3
                py-2
                rounded-xl
                bg-[#e9b7a5]
                text-[#3d3833]
                text-xs
                font-semibold
                hover:bg-[#dfaa96]
                transition
              "
            >
              {isExpanded ? 'Close' : 'Open'}
            </button>

          </div>

        </div>
      </div>


      {/* =====================================================
          EXPANDED PLAYER
      ====================================================== */}

      {currentVideoId && (
        <div
          className="
            border-t
            border-[#eadfd5]
            bg-[#f7f1e8]
          "
          style={{
            display: isExpanded ? 'block' : 'none'
          }}
        >

          <div
            className="
              max-w-4xl
              mx-auto
              px-4
              py-5
            "
          >

            {/* Now playing */}
            <div
              className="
                flex
                items-center
                justify-between
                gap-4
                mb-4
                px-4
                py-3
                rounded-2xl
                bg-[#fffaf4]
                border
                border-[#e3d7ca]
              "
            >

              <div className="flex items-center gap-3 min-w-0">

                <span
                  className="
                    text-xs
                    font-semibold
                    text-[#b46f59]
                    flex-shrink-0
                  "
                >
                  ▶ Playing
                </span>

                <span
                  className="
                    text-sm
                    font-medium
                    text-[#3d3833]
                    truncate
                  "
                >
                  {currentTitle}
                </span>

              </div>

              <button
                type="button"
                onClick={clearVideo}
                className="
                  text-[#9a8878]
                  hover:text-[#b45f59]
                  text-lg
                  transition
                "
                title="Stop music"
              >
                ×
              </button>

            </div>


            {/* YouTube player */}

            <div
              className="
                relative
                w-full
                overflow-hidden
                rounded-2xl
                bg-[#201d1b]
                shadow-sm
              "
              style={{
                paddingBottom: '56.25%'
              }}
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


            {/* Playlists + search */}

            <div className="mt-5 space-y-5">

              <AmbientPlaylists />

              <div className="border-t border-[#e3d7ca]" />

              <YouTubeSearch />

            </div>

          </div>

        </div>
      )}

    </div>
  )
}

export default GlobalMusicPlayer