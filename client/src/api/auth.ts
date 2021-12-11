import { User } from "../types/auth"

const BASE_URL = 'http://localhost:4000'

// check for errors, fetch will throw for network errors etc.
// it doesn't throw for 400, 401 etc

export const login = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password
    })
  })

  if (response.status >= 200 && response.status < 300) {
    return response.json()
  } else {
    const json = await response.json()
    throw new Error(json?.message)
  }
}

export const register = async (name: string, email: string, password: string): Promise<User> => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      email,
      password
    })
  })

  if (response.status >= 200 && response.status < 300) {
    return response.json()
  } else {
    const json = await response.json()
    throw new Error(json?.message)
  }
}

export const getUser = async (): Promise<User> => {
  const response = await fetch(`${BASE_URL}/me`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  })

  if(response.status >= 200 && response.status < 300) {
    return response.json()
  } else {
    const json = await response.json()
    throw new Error(json?.message)
  }
}

export const logout = async () => {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  })

  if(response.status >= 200 && response.status < 300) {
    return response.json()
  } else {
    const json = await response.json()
    throw new Error(json?.message)
  }
}
