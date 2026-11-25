import { useState } from "react"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import { ListChecks } from "lucide-react"
import { useAuth } from "../context/useAuth"
import { getApiError } from "../services/api"
import { validateLogin } from "../utils/validation"

const Login = () => {
  const { isAuthenticated, signIn } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [values, setValues] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  const handleChange = (event) => {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }))
    setError("")
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationError = validateLogin(values)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsSubmitting(true)
    setError("")
    try {
      await signIn({ email: values.email.trim(), password: values.password })
      navigate("/dashboard", { replace: true })
    } catch (requestError) {
      setError(getApiError(requestError))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="brand-mark"><ListChecks size={28} /></div>
        <h1>Welcome back</h1>
        <p className="auth-subtitle">Sign in to manage your tasks</p>
        {location.state?.message && (
          <p className="success-message" role="status">{location.state.message}</p>
        )}

        <form className="form-stack" onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span>Email address</span>
            <input
              autoComplete="email"
              name="email"
              onChange={handleChange}
              placeholder="you@example.com"
              type="email"
              value={values.email}
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              autoComplete="current-password"
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
              type="password"
              value={values.password}
            />
          </label>

          {error && <p className="form-error" role="alert">{error}</p>}

          <button className="button button-primary button-full" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="auth-footer">
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </section>
    </main>
  )
}

export default Login
