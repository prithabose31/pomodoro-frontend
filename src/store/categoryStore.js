import { create } from 'zustand'
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from '../services/categoryService'

const useCategoryStore = create((set, get) => ({
  // ── State ─────────────────────────────────────────────
  categories: [],
  isLoading: false,
  error: null,

  // ── Fetch All ─────────────────────────────────────────
  fetchCategories: async () => {
    set({ isLoading: true, error: null })
    try {
      const data = await getCategories()
      set({ categories: data, isLoading: false })
    } catch (err) {
      set({ error: err.message, isLoading: false })
    }
  },

  // ── Create ────────────────────────────────────────────
  addCategory: async (formData) => {
    set({ isLoading: true, error: null })
    try {
      const newCategory = await createCategory(formData)
      set({
        categories: [...get().categories, newCategory],
        isLoading: false
      })
    } catch (err) {
      set({ error: err.message, isLoading: false })
    }
  },

  // ── Update ────────────────────────────────────────────
  editCategory: async (id, formData) => {
    set({ isLoading: true, error: null })
    try {
      const updated = await updateCategory(id, formData)
      set({
        categories: get().categories.map(cat =>
          cat.id === id ? updated : cat
        ),
        isLoading: false
      })
    } catch (err) {
      set({ error: err.message, isLoading: false })
    }
  },

  // ── Delete ────────────────────────────────────────────
  removeCategory: async (id) => {
    set({ isLoading: true, error: null })
    try {
      await deleteCategory(id)
      set({
        categories: get().categories.filter(cat => cat.id !== id),
        isLoading: false
      })
    } catch (err) {
      set({ error: err.message, isLoading: false })
    }
  },

  clearError: () => set({ error: null })
}))

export default useCategoryStore