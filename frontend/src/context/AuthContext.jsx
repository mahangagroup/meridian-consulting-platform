import React, { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('meridian_token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function restore() {
      if (!token) {
        setLoading(false)
        return
      }
      try {
        const profile = await api.me(token)
        setUser(profile)
      } catch {
        localStorage.removeItem('meridian_token')
        setToken(null)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    restore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function applyAuth(authResponse) {
    localStorage.setItem('meridian_token', authResponse.token)
    setToken(authResponse.token)
    setUser({
      id: authResponse.id,
      fullName: authResponse.fullName,
      email: authResponse.email,
      role: authResponse.role,
      country: authResponse.country
    })
  }

  async function signup(payload) {
    const res = await api.signup(payload)
    applyAuth(res)
    return res
  }

  async function login(payload) {
    const res = await api.login(payload)
    applyAuth(res)
    return res
  }

  function logout() {
    localStorage.removeItem('meridian_token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
