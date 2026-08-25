import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

function SignUp() {
  const navigate = useNavigate()
  const { register, isLoading, error, clearError } = useAuthStore()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [validationError, setValidationError] = useState('')

  const handleChange = (e) => {
    clearError()
    setValidationError('')
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.password !== form.confirmPassword) {
      setValidationError('Passwords do not match.')
      return
    }

    if (form.password.length < 8) {
      setValidationError('Password must be at least 8 characters.')
      return
    }

    await register(form.name, form.email, form.password, form.confirmPassword)

    const user = useAuthStore.getState().user
    if (user) navigate('/home')
  }

  const displayError = validationError || error

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl p-8 shadow-xl">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-4xl">🍅</span>
            <span className="text-2xl font-bold text-white">FocusFlow</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            Let's Start! 🚀
          </h1>
          <p className="text-gray-400 text-sm">
            Create your account and get focused
          </p>
        </div>

        {/* Error */}
        {displayError && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 rounded-lg px-4 py-3 mb-6 text-sm">
            {displayError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>

        </form>

        {/* Login Link */}
        <p className="text-center text-gray-400 mt-6 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold">
            Log In →
          </Link>
        </p>

      </div>
    </div>
  )
}

export default SignUp