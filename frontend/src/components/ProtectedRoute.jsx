import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/useAuth"

const ProtectedRoute = () => {
  const { isAuthenticated, isCheckingAuth, authCheckError, checkAuth } = useAuth()

  if (isCheckingAuth) {
    return <div className="page-status" role="status">Checking your session…</div>
  }

  if (authCheckError) {
    return (
      <div className="page-status page-status-error" role="alert">
        <p>{authCheckError}</p>
        <button className="button button-primary" onClick={checkAuth}>Try again</button>
      </div>
    )
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />
}

export default ProtectedRoute
