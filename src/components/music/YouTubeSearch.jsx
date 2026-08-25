import { useState } from 'react'
import useMusicStore from '../../store/musicStore'
import { searchYouTube, extractVideoId } from '../../services/youtubeService'

function YouTubeSearch() {
  const { setVideo, setSearchResults, searchResults,
    isSearching, setIsSearching } = useMusicStore()

  const [query, setQuery] = useState('')
  const [urlInput, setUrlInput] = useState('')
  const [error, setError] = useState('')

  const handleSearch = async () => {
    if (!query.trim()) return
    setIsSearching(true)
    setError('')
    try {
      const results = await searchYouTube(query)
      setSearchResults(results)
    } catch {
      setError('Search failed. Check your API key.')
    } finally {
      setIsSearching(false)
    }
  }

  const handleUrlPlay = () => {
    const videoId = extractVideoId(urlInput)
    if (!videoId) {
      setError('Invalid YouTube URL')
      return
    }
    setVideo(videoId, 'Custom Video')
    setUrlInput('')
    setError('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className="space-y-4">
      {/* URL paste */}
      <div>
        <p className="text-gray-400 text-sm mb-2 font-medium">
          Paste YouTube URL
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2.5
                       border border-gray-600 focus:border-purple-500
                       focus:outline-none placeholder-gray-500 text-sm"
          />
          <button
            onClick={handleUrlPlay}
            className="bg-purple-600 hover:bg-purple-700 text-white
                       px-4 py-2.5 rounded-lg transition text-sm font-medium"
          >
            Play
          </button>
        </div>
      </div>

      {/* Search */}
      <div>
        <p className="text-gray-400 text-sm mb-2 font-medium">
          Search YouTube
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for music, sounds..."
            className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2.5
                       border border-gray-600 focus:border-purple-500
                       focus:outline-none placeholder-gray-500 text-sm"
          />
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="bg-gray-700 hover:bg-gray-600 text-white
                       px-4 py-2.5 rounded-lg transition text-sm
                       disabled:opacity-50"
          >
            {isSearching ? '...' : '🔍'}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
          {searchResults.map(result => (
            <button
              key={result.videoId}
              onClick={() => setVideo(result.videoId, result.title)}
              className="flex gap-2 bg-gray-700 hover:bg-gray-600
                         rounded-lg p-2 text-left transition group"
            >
              <img
                src={result.thumbnail}
                alt={result.title}
                className="w-20 h-14 object-cover rounded flex-shrink-0"
              />
              <div className="overflow-hidden">
                <p className="text-white text-xs font-medium
                               line-clamp-2 group-hover:text-purple-300">
                  {result.title}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  {result.channel}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default YouTubeSearch