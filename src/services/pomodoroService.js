import api from './api'

export const logPomodoroSession = async (data) => {
  const response = await api.post('/pomodoro/log', data)
  return response.data
}

export const getPomodoroHistory = async () => {
  const response = await api.get('/pomodoro/history')
  return response.data
}