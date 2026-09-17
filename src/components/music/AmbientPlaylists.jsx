import useMusicStore from '../../store/musicStore'

const PLAYLISTS = [
  {
    id: 'focus',
    label: 'Focus',
    emoji: '🎧',
    videoId: '53gNFOqDFcE'
  },
  {
    id: 'rain',
    label: 'Rain',
    emoji: '🌧️',
    videoId: 'TsRgQuud3Sk'
  },
  {
    id: 'cafe',
    label: 'Café',
    emoji: '☕',
    videoId: 'RrwT3nHojSY'
  },
  {
    id: 'piano',
    label: 'Piano',
    emoji: '🎹',
    videoId: 'K5_sBujU-mU'
  },
  {
    id: 'nature',
    label: 'Nature',
    emoji: '🌿',
    videoId: '5lCRsLjMeso'
  }
]

function AmbientPlaylists() {
  const { currentVideoId, setVideo } = useMusicStore()

  return (
    <div>
      <p className="text-sm font-medium mb-3 text-[#9a8878]">
        FocusFlow Sounds
      </p>

      <div className="flex flex-wrap gap-2">
        {PLAYLISTS.map((playlist) => {
          const isActive = currentVideoId === playlist.videoId

          return (
            <button
              key={playlist.id}
              type="button"
              onClick={() =>
                setVideo(playlist.videoId, playlist.label)
              }
              className={`
                flex items-center gap-2
                px-4 py-2.5
                rounded-xl
                text-sm font-medium
                border
                transition-all duration-200
                ${
                  isActive
                    ? 'bg-[#e9b7a5] border-[#e9b7a5] text-[#3d3833] shadow-sm'
                    : 'bg-[#fffaf4] border-[#e3d7ca] text-[#5d5148] hover:bg-[#f5e9dd] hover:border-[#d8c6b6]'
                }
              `}
            >
              <span>{playlist.emoji}</span>
              <span>{playlist.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default AmbientPlaylists