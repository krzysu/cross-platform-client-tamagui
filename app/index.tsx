import { Redirect } from 'expo-router'
import { useAuth } from '../contexts/AuthContext'
import { YStack, Spinner } from 'tamagui'

export default function IndexScreen() {
  const { isAuthenticated, isLoading } = useAuth()

  // Show loading spinner while checking auth state
  if (isLoading) {
    return (
      <YStack flex={1} justify="center" items="center" bg="$background">
        <Spinner size="large" color="$blue10" />
      </YStack>
    )
  }

  // Redirect based on authentication state
  if (isAuthenticated) {
    return <Redirect href="/(app)/dashboard" />
  }

  return <Redirect href="/(auth)/login" />
}
