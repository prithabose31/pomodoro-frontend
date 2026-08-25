import { create } from 'zustand'

const useMusicStore = create((set) => ({
  currentVideoId: null,
  currentTitle: '',
  isPlaying: false,
  searchResults: [],
  isSearching: false,

  setVideo: (videoId, title) => set({
    currentVideoId: videoId,
    currentTitle: title,
    isPlaying: true
  }),

  setSearchResults: (results) => set({ searchResults: results }),
  setIsSearching: (val) => set({ isSearching: val }),
  clearVideo: () => set({ currentVideoId: null, currentTitle: '', isPlaying: false }),
}))

export default useMusicStore