import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ListChecks } from "lucide-react"
import { getApiError } from "../services/api"
import { signup } from "../services/authService"
import { validateSignup } from "../utils/validation"

const initialValues = { firstName: "", lastName: "", email: "", password: "" }

const Signup = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialValues)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }))
    setError("")
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationError = validateSignup(values)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsSubmitting(true)
    setError("")
    try {
      await signup({
        ...values,
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
      })
      navigate("/", { replace: true, state: { message: "Account created. Sign in to continue." } })
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
        <h1>Create your account</h1>
        <p className="auth-subtitle">Organize your tasks and stay productive</p>

        <form className="form-stack" onSubmit={handleSubmit} noValidate>
          <div className="field-row">
            <label className="field">
              <span>First name</span>
              <input autoComplete="given-name" name="firstName" onChange={handleChange} placeholder="First name" value={values.firstName} />
            </label>
            <label className="field">
              <span>Last name</span>
              <input autoComplete="family-name" name="lastName" onChange={handleChange} placeholder="Last name" value={values.lastName} />
            </label>
          </div>

          <label className="field">
            <span>Email address</span>
            <input autoComplete="email" name="email" onChange={handleChange} placeholder="you@example.com" type="email" value={values.email} />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              autoComplete="new-password"
              name="password"
              onChange={handleChange}
              placeholder="At least 8 characters"
              type="password"
              value={values.password}
            />
            <small>Include uppercase, lowercase, a number, and a symbol.</small>
          </label>

          {error && <p className="form-error" role="alert">{error}</p>}

          <button className="button button-primary button-full" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/">Sign in</Link>
        </p>
      </section>
    </main>
  )
}

export default Signup
