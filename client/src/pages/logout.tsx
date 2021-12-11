import { useEffect } from 'react'
import { useAuth } from '../hooks/auth'

const Logout = () => {
  const { user, loading, logout } = useAuth()

  useEffect(() => {
    if (!loading && user) {
      logout()
    }
  }, [loading, logout, user])

  return null
}

export default Logout
