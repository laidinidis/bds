import { createContext, FC, useEffect, useMemo, useState } from 'react'
import { User } from '../types/auth'
import {
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
  getUser
} from '../api/auth'

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => void
  register: (name: string, email: string, password: string) => void
  logout: () => void
}
const noop = () => {}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  login: noop,
  logout: noop,
  register: noop
})

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  // TODO: Probably it's a good idea to use react-query to avoid setting loading and error states
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getUser()
      .then((user) => {
        if (user.id) {
          /**
           * ! Important: First set loading to false and then set the user
           * ! This is important because react doesn't batch multiple states updates when done asynchronously
           * ! like here, in a promise
           */
          setLoading(false)
          setUser(user)
        }
      })
      .catch((e) => {
        setLoading(false)
      })
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      const usr = await apiLogin(email, password)
      setLoading(false)
      setUser(usr)
    } catch (error) {
      if (error instanceof Error) {
        setLoading(false)
        setError(error.message)
      }
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true)
      const usr = await apiRegister(name, email, password)
      setLoading(false)
      setUser(usr)
    } catch (error) {
      if (error instanceof Error) {
        setLoading(false)
        setError(error.message)
      }
    }
  }

  const logout = () => {
    setLoading(true)
    apiLogout()
      .then(() => {
        setUser(null)
        setLoading(false)
      })
      .catch((error) => {
        if (error instanceof Error) {
          setLoading(false)
          setError(error.message)
        }
      })
  }

  const value = useMemo(
    () => ({ user, loading, error, login, logout, register }),
    [error, loading, user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
