import { FC } from 'react'
import { useLocation, Navigate } from 'react-router-dom'

interface Props {

}

const ProtectedRoute: FC<Props> = ({ children }) => {
  const auth = { user: null } // useAuth();
  const location = useLocation()

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} />
  }

  return <>{children}</>
}

export default ProtectedRoute
