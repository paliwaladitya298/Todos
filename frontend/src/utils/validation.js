const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateLogin({ email, password }) {
  if (!emailPattern.test(email.trim())) return "Enter a valid email address."
  if (!password) return "Enter your password."
  return ""
}

export function validateSignup({ firstName, lastName, email, password }) {
  if (firstName.trim().length < 4) return "First name must be at least 4 characters."
  if (lastName.trim().length < 2) return "Last name must be at least 2 characters."
  if (!emailPattern.test(email.trim())) return "Enter a valid email address."
  if (password.length < 8 || !/[a-z]/.test(password) || !/[A-Z]/.test(password)
    || !/\d/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
    return "Password must be at least 8 characters and include uppercase, lowercase, number, and symbol."
  }
  return ""
}
