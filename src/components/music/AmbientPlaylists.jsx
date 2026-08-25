import useMusicStore from '../../store/musicStore'

const PLAYLISTS = [
  { id: 'lofi',       label: 'Lo-fi',       emoji: '🎵', videoId: 'jfKfPfyJRdk' },
  { id: 'nature',     label: 'Nature',      emoji: '🌿', videoId: 'eKFTSSKCzWA' },
  { id: 'jazz',       label: 'Jazz',        emoji: '🎷', videoId: 'Dx5qFachd3A' },
  { id: 'classical',  label: 'Classical',   emoji: '🎻', videoId: '4Tr0otuiQuU' },
  { id: 'deepfocus',  label: 'Deep Focus',  emoji: '🧠', videoId: 'b1aQOfxlE3Y' },
]

function AmbientPlaylists() {
  const { currentVideoId, setVideo } = useMusicStore()

  return (
    <div>
      <p className="text-gray-400 text-sm mb-3 font-medium">
        Ambient Playlists
      </p>
      <div className="flex flex-wrap gap-2">
        {PLAYLISTS.map(p => (
          <button
            key={p.id}
            onClick={() => setVideo(p.videoId, p.label)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl
                        text-sm font-medium transition duration-200
                        ${currentVideoId === p.videoId
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
          >
            <span>{p.emoji}</span>
            <span>{p.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default AmbientPlaylists