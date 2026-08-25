import api from './api'

export const registerUser = async (name, email, password, confirmPassword) => {
  try {
    const response = await api.post('/auth/register', {
      name,
      email,
      password,
      confirmPassword
    })
    return response.data
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Registration failed')
  }
}

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Login failed')
  }
}

export const logoutUser = async () => {
  try {
    await api.post('/auth/logout')
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Logout failed')
  }
}

export const fetchCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me')
    return response.data
  } catch {
    return null  // silently return null, never throw
  }
}