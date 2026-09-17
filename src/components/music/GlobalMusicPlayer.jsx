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
    <div className="fixed bottom-0 left-0 right-0 z-[9999]">

      {/* =====================================================
          PLAYER PANEL
      ====================================================== */}

      <div
        className={`
          absolute
          bottom-full
          left-0
          right-0
          bg-[#f7f1e8]
          border-t
          border-[#dfd1c3]
          shadow-[0_-10px_35px_rgba(61,56,51,0.15)]
          transition-opacity
          duration-200
          ${
            isExpanded
              ? 'opacity-100 visible'
              : 'opacity-0 invisible pointer-events-none'
          }
        `}
      >

        <div className="max-w-4xl mx-auto px-4 py-5">

          <div className="flex items-center justify-between mb-5">

            <div>
              <h3 className="text-lg font-semibold text-[#3d3833]">
                Music & YouTube
              </h3>

              <p className="text-xs text-[#9a8878] mt-1">
                Choose something to listen to while you focus.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="
                w-9 h-9
                rounded-full
                bg-[#f2e6da]
                text-[#6d5d51]
                hover:bg-[#e9b7a5]
                transition
              "
            >
              ↓
            </button>

          </div>

          <AmbientPlaylists />

          <div className="border-t border-[#e3d7ca] my-5" />

          <YouTubeSearch />

          {currentVideoId && (
            <div className="mt-5">

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                  px-4
                  py-3
                  rounded-2xl
                  bg-[#fffaf4]
                  border
                  border-[#e3d7ca]
                "
              >

                <div className="flex items-center gap-3 min-w-0">

                  <span className="text-xs font-semibold text-[#b46f59]">
                    ▶ Playing
                  </span>

                  <span className="text-sm font-medium text-[#3d3833] truncate">
                    {currentTitle}
                  </span>

                </div>

                <button
                  type="button"
                  onClick={clearVideo}
                  className="
                    text-xs
                    text-[#9a8878]
                    hover:text-[#b45f59]
                  "
                >
                  ⏹ Stop
                </button>

              </div>

            </div>
          )}

        </div>

      </div>


      {/* =====================================================
          PERMANENT YOUTUBE IFRAME

          NEVER UNMOUNT THIS WHILE A VIDEO IS PLAYING.

          Expanded:
            normal size + visible

          Collapsed:
            1px + transparent + off-screen

          opacity is used instead of display:none so the
          browser keeps the iframe alive.
      ====================================================== */}

      {currentVideoId && (
        <div
          className={`
            ${
              isExpanded
                ? `
                  absolute
                  bottom-full
                  left-1/2
                  -translate-x-1/2
                  w-full
                  max-w-4xl
                  px-4
                  pb-[210px]
                  pointer-events-none
                `
                : `
                  absolute
                  left-[-9999px]
                  bottom-0
                  w-[1px]
                  h-[1px]
                  opacity-0
                  overflow-hidden
                  pointer-events-none
                `
            }
          `}
        >

          <div
            className={
              isExpanded
                ? `
                  absolute
                  bottom-0
                  left-4
                  right-4
                  overflow-hidden
                  rounded-2xl
                  bg-[#201d1b]
                  pointer-events-auto
                `
                : ''
            }
            style={
              isExpanded
                ? {
                    height: '200px'
                  }
                : undefined
            }
          >

            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&rel=0`}
              title={currentTitle || 'FocusFlow Music'}
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
      )}


      {/* =====================================================
          MINI PLAYER
      ====================================================== */}

      <div
        className="
          bg-[#fffaf4]
          border-t
          border-[#dfd1c3]
          shadow-[0_-5px_20px_rgba(61,56,51,0.10)]
        "
      >

        <div className="max-w-6xl mx-auto px-4">

          <div className="h-16 flex items-center justify-between gap-4">

            <div className="flex items-center gap-3 min-w-0">

              <button
                type="button"
                onClick={() => setIsExpanded(prev => !prev)}
                className="
                  w-9 h-9
                  flex items-center justify-center
                  rounded-full
                  bg-[#f2e6da]
                  text-[#6d5d51]
                  hover:bg-[#e9b7a5]
                  transition
                  flex-shrink-0
                "
              >
                {isExpanded ? '↓' : '↑'}
              </button>

              <div
                className="
                  w-9 h-9
                  flex items-center justify-center
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
                          text-sm font-medium
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

            <div className="flex items-center gap-2 flex-shrink-0">

              {currentVideoId && (
                <button
                  type="button"
                  onClick={clearVideo}
                  className="
                    hidden sm:block
                    text-xs font-medium
                    text-[#9a8878]
                    hover:text-[#b45f59]
                    px-2
                  "
                >
                  ⏹ Stop
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsExpanded(prev => !prev)}
                className="
                  px-4 py-2
                  rounded-xl
                  bg-[#e9b7a5]
                  text-[#3d3833]
                  text-xs font-semibold
                  hover:bg-[#dfaa96]
                  transition
                "
              >
                {isExpanded ? 'Close' : 'Open'}
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default GlobalMusicPlayer