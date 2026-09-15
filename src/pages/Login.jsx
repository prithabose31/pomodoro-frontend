import { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import useAuthStore from '../store/authStore'

function Login() {
  const navigate = useNavigate()

  const {
    login,
    isLoading,
    error,
    clearError
  } = useAuthStore()

  const [showPassword, setShowPassword] = useState(false)

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    clearError()

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(form.email, form.password)

    const user = useAuthStore.getState().user

    if (user) {
      navigate('/home')
    }
  }

  return (
    <div className="
      min-h-screen
      bg-[#F7F1E8]
      flex
      items-center
      justify-center
      px-4
      py-10
    ">

      <div className="
        w-full
        max-w-md
        bg-[#FFFDF8]
        rounded-3xl
        p-7 sm:p-9

        border border-[#E8DED2]

        shadow-xl
        shadow-[#8B7765]/10
      ">

        {/* Logo + App Name */}
        <div className="text-center mb-8">

          <div className="
            flex
            items-center
            justify-center
            gap-2.5
            mb-6
          ">
            <div className="
              w-12 h-12
              rounded-2xl
              bg-[#F3DDD4]
              flex
              items-center
              justify-center
              text-2xl
            ">
              🍅
            </div>

            <span className="
              text-2xl
              font-bold
              text-[#3D3833]
              tracking-tight
            ">
              FocusFlow
            </span>
          </div>

          <h1 className="
            text-2xl
            font-bold
            text-[#3D3833]
            mb-2
          ">
            Welcome back! 👋
          </h1>

          <p className="
            text-[#81776D]
            text-sm
          ">
            Ready to make today count?
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="
            bg-[#F4DFDC]
            border border-[#E4C4BE]
            text-[#A85E52]
            rounded-xl
            px-4 py-3
            mb-6
            text-sm
          ">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Email */}
          <div>
            <label className="
              block
              text-[#625A52]
              text-sm
              font-medium
              mb-2
            ">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="
                w-full
                bg-[#FFFDF8]
                text-[#3D3833]
                rounded-xl
                px-4 py-3

                border border-[#DCCFC2]

                focus:border-[#C97862]
                focus:outline-none
                focus:ring-2
                focus:ring-[#C97862]/15

                placeholder-[#B0A59A]

                transition
              "
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="
              block
              text-[#625A52]
              text-sm
              font-medium
              mb-2
            ">
              Password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="
                  w-full
                  bg-[#FFFDF8]
                  text-[#3D3833]
                  rounded-xl
                  px-4 py-3 pr-12

                  border border-[#DCCFC2]

                  focus:border-[#C97862]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#C97862]/15

                  placeholder-[#B0A59A]

                  transition
                "
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2

                  w-8 h-8
                  rounded-lg

                  text-[#8A8178]
                  hover:text-[#5F574F]
                  hover:bg-[#F7F1E8]

                  transition

                  flex
                  items-center
                  justify-center
                "
              >
                {showPassword ? '🙈' : '👁️'}
              </button>

            </div>
          </div>

          {/* Login */}
          <button
            type="submit"
            disabled={isLoading}
            className="
              w-full

              bg-[#D49A84]
              hover:bg-[#C88972]

              disabled:bg-[#D8B9AC]
              disabled:cursor-not-allowed

              text-white
              font-semibold
              rounded-xl
              py-3

              transition-all
              duration-200
              hover:-translate-y-0.5

              shadow-sm
            "
          >
            {isLoading
              ? 'Logging in...'
              : 'Log In'}
          </button>

        </form>

        {/* Sign Up */}
        <p className="
          text-center
          text-[#81776D]
          mt-7
          text-sm
        ">
          New user?{' '}

          <Link
            to="/signup"
            className="
              text-[#A45F4B]
              hover:text-[#8F4E3D]
              font-semibold
              transition
            "
          >
            Sign Up →
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login