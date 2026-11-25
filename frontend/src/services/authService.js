import api from "./api"

const SUCCESS_LOGIN = "Login Successfully"
const SUCCESS_SIGNUP = "data added Successfully"

export async function signup({ firstName, lastName, email, password }) {
  const { data } = await api.post("/signUp", {
    firstName,
    lastName,
    email,
    password,
  })

  if (data !== SUCCESS_SIGNUP) {
    throw new Error(typeof data === "string" ? data : "Unable to create account.")
  }
  return data
}

export async function login({ email, password }) {
  const { data } = await api.post("/login", { email, password })

  if (data !== SUCCESS_LOGIN) {
    throw new Error(typeof data === "string" ? data : "Unable to sign in.")
  }
  return data
}

export async function logout() {
  const { data } = await api.post("/logout")
  return data
}
