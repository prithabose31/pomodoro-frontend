import { create } from 'zustand'
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from '../services/taskService'

const useTaskStore = create((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async () => {
    set({ isLoading: true, error: null })
    try {
      const data = await getTasks()
      set({ tasks: data, isLoading: false })
    } catch (err) {
      set({ error: err.message, isLoading: false })
    }
  },

  addTask: async (formData) => {
    const newTask = await createTask(formData)
    set({ tasks: [...get().tasks, newTask] })
  },

  editTask: async (id, formData) => {
    const updated = await updateTask(id, formData)
    set({
      tasks: get().tasks.map(t => t.id === id ? updated : t)
    })
  },

  removeTask: async (id) => {
    await deleteTask(id)
    set({
      tasks: get().tasks.filter(t => t.id !== id)
    })
  },

  updateTimeSpent: (taskId, minutesToAdd) => {
  set({
    tasks: get().tasks.map(t =>
      t.id === taskId
        ? { ...t, timeSpentMinutes: (t.timeSpentMinutes || 0) + minutesToAdd }
        : t
    )
  })
},

  clearError: () => set({ error: null })
}))

export default useTaskStore