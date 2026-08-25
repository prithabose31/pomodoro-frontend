const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

export const searchYouTube = async (query) => {
  const params = new URLSearchParams({
    part: 'snippet',
    q: query,
    type: 'video',
    maxResults: '6',
    key: API_KEY
  })

  const url = `https://www.googleapis.com/youtube/v3/search?${params}`
  
  const response = await fetch(url)
  const data = await response.json()
  
  if (!response.ok) {
    console.error('YouTube API error:', data.error)
    throw new Error(data.error?.message || 'Search failed')
  }

  return data.items.map(item => ({
    videoId: item.id.videoId,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails.medium.url,
    channel: item.snippet.channelTitle
  }))
}

export const extractVideoId = (url) => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}