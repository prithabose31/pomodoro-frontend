import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import useAuthStore from '../../store/authStore'
import useTimerStore from '../../store/timerStore'

const NAV_LINKS = [
  { path: '/home', label: 'Home', emoji: '🏠' },
  { path: '/categories', label: 'Categories', emoji: '📂' },
  { path: '/tasks', label: 'Board', emoji: '📋' },
  { path: '/pomodoro', label: 'Timer', emoji: '🍅' },
]

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()

  const { user, logout } = useAuthStore()

  const [menuOpen, setMenuOpen] = useState(false)

  const { phase, timeLeft } = useTimerStore()

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0')

    const s = (seconds % 60)
      .toString()
      .padStart(2, '0')

    return `${m}:${s}`
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  // Don't show navbar on auth pages
  if (['/login', '/signup'].includes(location.pathname)) {
    return null
  }

  return (
    <nav className="sticky top-0 z-40 bg-[#FFFDF8]/95 backdrop-blur-md border-b border-[#E8DED2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-[72px]">

          {/* Logo */}
          <Link
            to="/home"
            className="flex items-center gap-2.5 text-[#3D3833] font-bold text-xl
                       hover:text-[#C97862] transition-colors"
          >
            <span className="text-xl">🍅</span>

            <span className="hidden sm:block tracking-tight">
              FocusFlow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl
                            text-sm font-medium transition-all duration-200
                            ${
                              isActive(link.path)
                                ? 'bg-[#F3DDD4] text-[#9E5947]'
                                : 'text-[#81776D] hover:bg-[#F7F1E8] hover:text-[#4F4841]'
                            }`}
              >
                <span className="text-base">
                  {link.emoji}
                </span>

                <span>
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-4">

            {/* Live Timer */}
            {(phase === 'work' || phase === 'break') && (
              <Link
                to="/pomodoro"
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl
                            text-sm font-semibold transition-all
                            ${
                              phase === 'work'
                                ? 'bg-[#F3DDD4] text-[#9E5947] hover:bg-[#EED1C5]'
                                : 'bg-[#DEE8D9] text-[#587052] hover:bg-[#D3E1CD]'
                            }`}
              >
                <span>
                  {phase === 'work' ? '🍅' : '☕'}
                </span>

                <span className="font-mono">
                  {formatTime(timeLeft)}
                </span>
              </Link>
            )}

            {user && (
              <>
                {/* User */}
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-9 h-9 rounded-full bg-[#DCCDE5]
                               flex items-center justify-center
                               text-[#655273] text-sm font-bold"
                  >
                    {user.name?.charAt(0).toUpperCase()}
                  </div>

                  <span className="text-[#5F574F] text-sm font-medium">
                    {user.name}
                  </span>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="text-[#8A8178] hover:text-[#A85E52]
                             transition-colors text-sm px-3 py-2
                             rounded-xl hover:bg-[#F8E4DF]"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-[#625A52] hover:text-[#3D3833]
                       transition-colors p-2.5 rounded-xl
                       hover:bg-[#F7F1E8]"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#FFFDF8] border-t border-[#E8DED2] px-4 py-4 space-y-1">

          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl
                          text-sm font-medium transition-colors
                          ${
                            isActive(link.path)
                              ? 'bg-[#F3DDD4] text-[#9E5947]'
                              : 'text-[#6F675F] hover:bg-[#F7F1E8]'
                          }`}
            >
              <span className="text-lg">
                {link.emoji}
              </span>

              <span>
                {link.label}
              </span>
            </Link>
          ))}

          {/* Mobile User */}
          {user && (
            <div className="border-t border-[#E8DED2] pt-4 mt-4">

              <div className="flex items-center gap-3 px-4 py-2 mb-2">
                <div
                  className="w-9 h-9 rounded-full bg-[#DCCDE5]
                             flex items-center justify-center
                             text-[#655273] text-sm font-bold"
                >
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                <span className="text-[#4F4841] text-sm font-medium">
                  {user.name}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3
                           text-[#A85E52] hover:bg-[#F8E4DF]
                           rounded-xl transition-colors
                           text-sm font-medium"
              >
                Logout
              </button>

            </div>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar