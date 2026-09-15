import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom'

import { useEffect } from 'react'

import GlobalMusicPlayer from './components/music/GlobalMusicPlayer'

import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Categories from './pages/Categories'
import CategoryDetail from './pages/CategoryDetail'
import TaskBoard from './pages/TaskBoard'
import Pomodoro from './pages/Pomodoro'

import Navbar from './components/layout/Navbar'

import useAuthStore from './store/authStore'

function AppContent() {
  const { fetchMe, user } = useAuthStore()
  const location = useLocation()

  useEffect(() => {
    fetchMe()
  }, [fetchMe])

  // Music player is available on every logged-in page,
  // but not on authentication pages.
  const showMusic =
    user &&
    !['/login', '/signup'].includes(location.pathname)

  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<SignUp />}
        />

        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/categories"
          element={<Categories />}
        />

        {/* Individual category */}
        <Route
          path="/categories/:id"
          element={<CategoryDetail />}
        />

        <Route
          path="/tasks"
          element={<TaskBoard />}
        />

        <Route
          path="/pomodoro"
          element={<Pomodoro />}
        />

        <Route
          path="/"
          element={<Navigate to="/login" />}
        />
      </Routes>

      {/* Universal music player for logged-in users */}
      {showMusic && (
        <div className="
          fixed
          bottom-0
          left-0
          right-0
          z-50
        ">
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