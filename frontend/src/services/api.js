import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

export function getApiError(error) {
  const message = error.response?.data
  if (typeof message === "string" && message.trim()) return message
  if (message && typeof message.message === "string") return message.message
  if (error.isAxiosError && !error.response) {
    return "Cannot reach the server. Check that the backend is running."
  }
  if (!error.isAxiosError && error.message) return error.message
  return "The request could not be completed. Please try again."
}

export default api
