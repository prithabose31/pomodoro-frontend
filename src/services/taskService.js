import api from './api'

export const getTasks = async () => {
  const response = await api.get('/tasks')
  return response.data
}

export const createTask = async (data) => {
  const response = await api.post('/tasks', data)
  return response.data
}

export const updateTask = async (id, data) => {
  const response = await api.put(`/tasks/${id}`, data)
  return response.data
}

export const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`)
}

export const logPomodoroTime = async (taskId, minutes) => {
  const response = await api.post(`/tasks/${taskId}/log-time`, { minutes })
  return response.data
}

export const updateWeeklyGoal = async (taskId, weeklyGoalMinutes) => {
  const response = await api.put(
    `/tasks/${taskId}/weekly-goal`,
    { weeklyGoalMinutes }
  )

  return response.data
}