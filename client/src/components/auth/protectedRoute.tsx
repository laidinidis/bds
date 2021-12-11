import { FC } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/auth';

interface Props {

}

const ProtectedRoute: FC<Props> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation()

  if(loading) return null

  if (!loading && !user) {
    return <Navigate to="/login" state={{ from: location }} />
  }

  return <>{children}</>
}

export default ProtectedRoute
