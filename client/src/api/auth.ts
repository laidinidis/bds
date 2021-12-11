import { User } from "../types/auth"

const BASE_URL = 'http://localhost:4000'

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

  return response.json()
}

export const getUser = async (): Promise<User> => {
  const response = await fetch(`${BASE_URL}/me`)
  return response.json()
}
