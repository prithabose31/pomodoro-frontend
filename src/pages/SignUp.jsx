import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    isLoading,
    error,
    clearError
  } = useAuthStore()

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

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.password !== form.confirmPassword) {
      setValidationError('Passwords do not match.')
      return
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    if (!passwordRegex.test(form.password)) {
      setValidationError(
        'Password must be at least 8 characters and include one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).'
      )
      return
    }

    await register(
      form.name,
      form.email,
      form.password,
      form.confirmPassword
    )

    const user = useAuthStore.getState().user

    if (user) {
      navigate('/home')
    }
  }

  const displayError =
    validationError || error

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

        {/* Logo */}
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
            Let's get started! 🚀
          </h1>

          <p className="
            text-[#81776D]
            text-sm
          ">
            Create your account and get focused
          </p>
        </div>

        {/* Error */}
        {displayError && (
          <div className="
            bg-[#F4DFDC]
            border border-[#E4C4BE]
            text-[#A85E52]
            rounded-xl
            px-4 py-3
            mb-6
            text-sm
          ">
            {displayError}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* Name */}
          <div>
            <label className="
              block
              text-[#625A52]
              text-sm
              font-medium
              mb-2
            ">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="
                w-full
                px-4 py-3
                bg-[#FFFDF8]
                text-[#3D3833]
                rounded-xl
                border border-[#DCCFC2]
                focus:border-[#C97862]
                focus:outline-none
                focus:ring-2
                focus:ring-[#C97862]/15
                placeholder-[#B0A59A]
                transition
              "
            />
          </div>

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
              required
              className="
                w-full
                px-4 py-3
                bg-[#FFFDF8]
                text-[#3D3833]
                rounded-xl
                border border-[#DCCFC2]
                focus:border-[#C97862]
                focus:outline-none
                focus:ring-2
                focus:ring-[#C97862]/15
                placeholder-[#B0A59A]
                transition
              "
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

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              className="
                w-full
                px-4 py-3
                bg-[#FFFDF8]
                text-[#3D3833]
                rounded-xl
                border border-[#DCCFC2]
                focus:border-[#C97862]
                focus:outline-none
                focus:ring-2
                focus:ring-[#C97862]/15
                placeholder-[#B0A59A]
                transition
              "
            />

            <p className="
              mt-2
              text-xs
              text-[#81776D]
              leading-relaxed
            ">
              Password must contain at least 8 characters,
              one uppercase letter, one lowercase letter,
              one number, and one special character
              (@$!%*?&).
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="
              block
              text-[#625A52]
              text-sm
              font-medium
              mb-2
            ">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Repeat your password"
              required
              className="
                w-full
                px-4 py-3
                bg-[#FFFDF8]
                text-[#3D3833]
                rounded-xl
                border border-[#DCCFC2]
                focus:border-[#C97862]
                focus:outline-none
                focus:ring-2
                focus:ring-[#C97862]/15
                placeholder-[#B0A59A]
                transition
              "
            />
          </div>

          {/* Sign Up */}
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
              py-3
              rounded-xl
              font-semibold
              transition-all
              duration-200
              hover:-translate-y-0.5
              shadow-sm
            "
          >
            {isLoading
              ? 'Creating account...'
              : 'Create Account'}
          </button>

        </form>

        {/* Login */}
        <p className="
          text-center
          text-[#81776D]
          mt-7
          text-sm
        ">
          Already have an account?{' '}

          <Link
            to="/login"
            className="
              text-[#A45F4B]
              hover:text-[#8F4E3D]
              font-semibold
              transition
            "
          >
            Log In →
          </Link>
        </p>

      </div>
    </div>
  )
}

export default SignUp