import type { ReactNode } from 'react'
import { createContext, useContext, useEffect,useState } from 'react'

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user' | 'investigator'
  permissions: string[]
  lastLogin?: string
  createdAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  refreshAuth: () => Promise<void>
  updateUser: (updates: Partial<User>) => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  const login = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }))
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!response.ok) throw new Error('Login failed')
      const { user, token } = await response.json()
      localStorage.setItem('auth_token', token)
      setAuthState({ user, isAuthenticated: true, isLoading: false })
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }))
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    setAuthState({ user: null, isAuthenticated: false, isLoading: false })
  }

  const refreshAuth = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        setAuthState(prev => ({ ...prev, isLoading: false }))
        return
      }
      const response = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) {
        logout()
        return
      }
      const user = await response.json()
      setAuthState({ user, isAuthenticated: true, isLoading: false })
    } catch {
      logout()
    }
  }

  const updateUser = (updates: Partial<User>) => {
    setAuthState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...updates } : null,
    }))
  }

  useEffect(() => {
    refreshAuth()
  }, [])

  const contextValue: AuthContextType = {
    ...authState,
    login,
    logout,
    refreshAuth,
    updateUser,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}


