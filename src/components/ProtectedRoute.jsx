import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ session, children, redirectTo = '/' }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (session) {
      return navigate(redirectTo)
    }
  }, [session])

  return children || <Outlet />
}

export { ProtectedRoute }
