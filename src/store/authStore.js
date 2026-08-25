import { create } from 'zustand'
import { loginUser, registerUser, logoutUser, fetchCurrentUser } from '../services/authService'

const useAuthStore = create((set) => ({
  // ── State ─────────────────────────────────────────────
  user: null,
  isLoading: false,
  error: null,

  // ── Actions ───────────────────────────────────────────
  login: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      const user = await loginUser(email, password)
      set({ user, isLoading: false })
    } catch (err) {
      set({ error: err.message, isLoading: false })
    }
  },

  register: async (name, email, password, confirmPassword) => {
    set({ isLoading: true, error: null })
    try {
      const user = await registerUser(name, email, password, confirmPassword)
      set({ user, isLoading: false })
    } catch (err) {
      set({ error: err.message, isLoading: false })
    }
  },

  logout: async () => {
    set({ isLoading: true })
    try {
      await logoutUser()
      set({ user: null, isLoading: false })
    } catch {
      set({ user: null, isLoading: false })
    }
  },

  fetchMe: async () => {
  set({ isLoading: true })
  try {
    const user = await fetchCurrentUser()
    set({ user: user || null, isLoading: false })
  } catch {
    set({ user: null, isLoading: false })
  }
  },

  clearError: () => set({ error: null })
}))

export default useAuthStore