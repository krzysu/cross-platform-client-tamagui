import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'

// Mock user data
export interface User {
  id: string
  email: string
  name: string
}

export interface AuthResponse {
  user: User
  token: string
}

// Constants
const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'
const MOCK_PASSWORD = 'password123'

// Platform-specific storage functions
async function setStorageItem(key: string, value: string): Promise<void> {
  if (Platform.OS === 'web') {
    localStorage.setItem(key, value)
  } else {
    await SecureStore.setItemAsync(key, value)
  }
}

async function getStorageItem(key: string): Promise<string | null> {
  if (Platform.OS === 'web') {
    return localStorage.getItem(key)
  }

  return await SecureStore.getItemAsync(key)
}

async function deleteStorageItem(key: string): Promise<void> {
  if (Platform.OS === 'web') {
    localStorage.removeItem(key)
  } else {
    await SecureStore.deleteItemAsync(key)
  }
}

// Helper function to store auth data
async function storeAuthData(user: User, token: string): Promise<void> {
  await setStorageItem(TOKEN_KEY, token)
  await setStorageItem(USER_KEY, JSON.stringify(user))
}

// Mock authentication service functions
export async function login(email: string, password: string): Promise<AuthResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (password !== MOCK_PASSWORD) {
    throw new Error('Invalid credentials')
  }

  // Create mock user based on email
  const user: User = {
    id: Math.random().toString(36).substr(2, 9),
    email: email.toLowerCase(),
    name: email.split('@')[0] || 'User',
  }

  const token = `mock_token_${Date.now()}_${user.id}`

  // Store in secure storage
  await storeAuthData(user, token)

  return { user, token }
}

export async function register(
  email: string,
  password: string,
  name: string
): Promise<AuthResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (password !== MOCK_PASSWORD) {
    throw new Error('Password must be "password123" for this demo')
  }

  const user: User = {
    id: Math.random().toString(36).substr(2, 9),
    email: email.toLowerCase(),
    name: name || email.split('@')[0] || 'User',
  }

  const token = `mock_token_${Date.now()}_${user.id}`

  // Store in secure storage
  await storeAuthData(user, token)

  return { user, token }
}

export async function logout(): Promise<void> {
  await deleteStorageItem(TOKEN_KEY)
  await deleteStorageItem(USER_KEY)
}

export async function getStoredAuthData(): Promise<{ user: User; token: string } | null> {
  try {
    const token = await getStorageItem(TOKEN_KEY)
    const userJson = await getStorageItem(USER_KEY)

    if (!token || !userJson) {
      return null
    }

    const user = JSON.parse(userJson)
    return { user, token }
  } catch (error) {
    console.error('Error retrieving auth data:', error)
    return null
  }
}

export async function validateToken(token: string): Promise<boolean> {
  // Mock token validation - in real app, this would call your API
  await new Promise((resolve) => setTimeout(resolve, 500))
  return token.startsWith('mock_token_')
}
