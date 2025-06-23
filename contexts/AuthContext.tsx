import type React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import {
  login as authLogin,
  register as authRegister,
  logout as authLogout,
  getStoredAuthData,
  validateToken,
  type User,
} from '../lib/auth'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user

  // Check for stored auth data on app start
  useEffect(() => {
    checkAuthState()
  }, [])

  const checkAuthState = async () => {
    try {
      setIsLoading(true)
      const authData = await getStoredAuthData()

      if (authData) {
        // Validate the stored token
        const isValid = await validateToken(authData.token)
        if (isValid) {
          setUser(authData.user)
        } else {
          // Token is invalid, clear stored data
          await authLogout()
        }
      }
    } catch (error) {
      console.error('Error checking auth state:', error)
      // Clear any corrupted data
      await authLogout()
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    const { user: loggedInUser } = await authLogin(email, password)
    setUser(loggedInUser)
  }

  const register = async (email: string, password: string, name: string) => {
    const { user: registeredUser } = await authRegister(email, password, name)
    setUser(registeredUser)
  }

  const logout = async () => {
    try {
      await authLogout()
      setUser(null)
    } catch (error) {
      console.error('Error during logout:', error)
      // Force logout even if there's an error
      setUser(null)
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
