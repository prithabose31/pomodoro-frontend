import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import GlobalMusicPlayer from './components/music/GlobalMusicPlayer'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Categories from './pages/Categories'
import TaskBoard from './pages/TaskBoard'
import Pomodoro from './pages/Pomodoro'
import Navbar from './components/layout/Navbar'
import useAuthStore from './store/authStore'
import { useLocation } from 'react-router-dom'

function AppContent() {
  const { fetchMe, user } = useAuthStore()
  const location = useLocation()

  useEffect(() => {
    fetchMe()
  }, [])

  // Only show music player when logged in and not on auth pages
  const showMusic = user && !['/login', '/signup'].includes(location.pathname)

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/tasks" element={<TaskBoard />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>

      {/* Global music player — always mounted, never unmounts */}
      {showMusic && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <GlobalMusicPlayer />
        </div>
      )}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App