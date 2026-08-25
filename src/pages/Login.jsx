import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

function Login() {
  const navigate = useNavigate()
  const { login, isLoading, error, clearError } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    clearError()
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(form.email, form.password)
    const user = useAuthStore.getState().user
    if (user) navigate('/home')
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl p-8 shadow-xl">

        {/* Logo + App Name */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-4xl">🍅</span>
            <span className="text-2xl font-bold text-white">
              FocusFlow
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            Welcome Back! 👋
          </h1>
          <p className="text-gray-400 text-sm">
            Are we ready to manage our day?
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/20 border border-red-500
                          text-red-400 rounded-lg px-4 py-3
                          mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full bg-gray-700 text-white rounded-lg
                         px-4 py-3 border border-gray-600
                         focus:border-purple-500 focus:outline-none
                         focus:ring-1 focus:ring-purple-500
                         placeholder-gray-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-gray-700 text-white rounded-lg
                           px-4 py-3 pr-12 border border-gray-600
                           focus:border-purple-500 focus:outline-none
                           focus:ring-1 focus:ring-purple-500
                           placeholder-gray-500 transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2
                           text-gray-400 hover:text-white transition
                           text-sm px-1"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700
                       disabled:bg-purple-800 disabled:cursor-not-allowed
                       text-white font-semibold rounded-lg py-3
                       transition duration-200"
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-gray-400 mt-6 text-sm">
          New User?{' '}
          <Link
            to="/signup"
            className="text-purple-400 hover:text-purple-300
                       font-semibold transition"
          >
            Sign Up →
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login