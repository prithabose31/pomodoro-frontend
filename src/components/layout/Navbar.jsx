import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import useTimerStore from '../../store/timerStore'

const NAV_LINKS = [
  { path: '/home',       label: 'Home',       emoji: '🏠' },
  { path: '/categories', label: 'Categories', emoji: '📂' },
  { path: '/tasks',      label: 'Board',      emoji: '📋' },
  { path: '/pomodoro',   label: 'Timer',      emoji: '🍅' },
]

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const [menuOpen, setMenuOpen] = useState(false)
  const { phase, timeLeft } = useTimerStore()

  const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  // Don't show navbar on auth pages
  if (['/login', '/signup'].includes(location.pathname)) return null

  return (
    <>
      <nav className="bg-gray-800 border-b border-gray-700
                      sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link
              to="/home"
              className="flex items-center gap-2 text-white
                         font-bold text-xl hover:text-purple-400
                         transition"
            >
              <span>🍅</span>
              <span className="hidden sm:block">FocusFlow</span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2
                              rounded-lg text-sm font-medium transition
                              ${isActive(link.path)
                                ? 'bg-purple-600 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                              }`}
                >
                  <span>{link.emoji}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Desktop Right — Timer + User + Logout */}
            <div className="hidden md:flex items-center gap-3">

              {/* Live timer indicator */}
              {(phase === 'work' || phase === 'break') && (
                <Link
                  to="/pomodoro"
                  className={`flex items-center gap-2 px-3 py-1.5
                              rounded-lg text-sm font-mono font-bold
                              transition animate-pulse
                              ${phase === 'work'
                                ? 'bg-purple-600/20 text-purple-300'
                                : 'bg-emerald-600/20 text-emerald-300'
                              }`}
                >
                  <span>{phase === 'work' ? '🍅' : '☕'}</span>
                  <span>{formatTime(timeLeft)}</span>
                </Link>
              )}

              {user && (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-purple-600
                                    flex items-center justify-center
                                    text-white text-sm font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-gray-300 text-sm">
                      {user.name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-gray-400 hover:text-red-400
                              transition text-sm px-3 py-1.5
                              rounded-lg hover:bg-red-400/10"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-gray-300 hover:text-white
                         transition p-2 rounded-lg hover:bg-gray-700"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-gray-800 border-t
                          border-gray-700 px-4 py-3 space-y-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3
                            rounded-lg text-sm font-medium transition
                            ${isActive(link.path)
                              ? 'bg-purple-600 text-white'
                              : 'text-gray-300 hover:bg-gray-700'
                            }`}
              >
                <span className="text-lg">{link.emoji}</span>
                <span>{link.label}</span>
              </Link>
            ))}

            {/* Mobile User + Logout */}
            {user && (
              <div className="border-t border-gray-700 pt-3 mt-3">
                <div className="flex items-center gap-3 px-4 py-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-purple-600
                                  flex items-center justify-center
                                  text-white text-sm font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-white text-sm font-medium">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-red-400
                             hover:bg-red-400/10 rounded-lg transition
                             text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  )
}

export default Navbar