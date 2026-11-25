import { useCallback, useEffect, useMemo, useState } from "react"
import { login as loginRequest, logout as logoutRequest } from "../services/authService"
import { getTodos } from "../services/todoService"
import { AuthContext } from "./authContext"

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [authCheckError, setAuthCheckError] = useState("")

  const checkAuth = useCallback(async () => {
    setIsCheckingAuth(true)
    setAuthCheckError("")
    try {
      await getTodos()
      setIsAuthenticated(true)
    } catch (error) {
      if (error.response) {
        setIsAuthenticated(false)
      } else {
        setAuthCheckError("Cannot reach the server. Check that the backend is running.")
      }
    } finally {
      setIsCheckingAuth(false)
    }
  }, [])

  useEffect(() => {
    let active = true
    getTodos()
      .then(() => {
        if (active) setIsAuthenticated(true)
      })
      .catch((error) => {
        if (!active) return
        if (error.response) {
          setIsAuthenticated(false)
        } else {
          setAuthCheckError("Cannot reach the server. Check that the backend is running.")
        }
      })
      .finally(() => {
        if (active) setIsCheckingAuth(false)
      })
    return () => { active = false }
  }, [])

  const signIn = useCallback(async (credentials) => {
    await loginRequest(credentials)
    setIsAuthenticated(true)
  }, [])

  const signOut = useCallback(async () => {
    await logoutRequest()
    setIsAuthenticated(false)
  }, [])

  const value = useMemo(() => ({
    isAuthenticated,
    isCheckingAuth,
    authCheckError,
    checkAuth,
    signIn,
    signOut,
  }), [isAuthenticated, isCheckingAuth, authCheckError, checkAuth, signIn, signOut])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
