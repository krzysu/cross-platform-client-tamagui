import { useState } from 'react'
import { Alert } from 'react-native'
import { Link, router } from 'expo-router'
import {
  YStack,
  XStack,
  H1,
  H4,
  Input,
  Button,
  Text,
  Paragraph,
  Spinner,
  Card,
  ScrollView,
} from 'tamagui'
import { Eye, EyeOff, Mail, Lock } from '@tamagui/lucide-icons'
import { useAuth } from '../../contexts/AuthContext'

export default function LoginScreen() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }

    try {
      setIsLoading(true)
      await login(email.trim(), password)
      router.replace('/(app)/dashboard')
    } catch (error) {
      Alert.alert(
        'Login Failed',
        error instanceof Error ? error.message : 'An error occurred'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const fillDemoCredentials = () => {
    setEmail('demo@example.com')
    setPassword('password123')
  }

  return (
    <YStack flex={1} bg="$background">
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <YStack maxW={400} width="100%" self="center" gap="$6" px="$4" py="$8">
          {/* Header */}
          <YStack gap="$2" items="center">
            <H1 color="$color12" text="center">
              Welcome Back
            </H1>
            <Paragraph color="$color11" text="center" size="$4">
              Sign in to your account to continue
            </Paragraph>
          </YStack>

          {/* Demo Info Card */}
          <Card bg="$blue2" borderColor="$blue6" p="$4">
            <YStack gap="$2">
              <H4 color="$blue11">Demo Credentials</H4>
              <Paragraph color="$blue11" size="$3">
                Use any email with password: <Text fontWeight="bold">password123</Text>
              </Paragraph>
              <Button
                size="$2"
                bg="$blue8"
                color="$blue12"
                onPress={fillDemoCredentials}
                mt="$2"
              >
                Fill Demo Credentials
              </Button>
            </YStack>
          </Card>

          {/* Login Form */}
          <YStack gap="$4">
            {/* Email Input */}
            <YStack gap="$2">
              <Text color="$color11" fontSize="$3" fontWeight="500">
                Email
              </Text>
              <XStack
                bg="$color2"
                borderColor="$borderColor"
                borderWidth={1}
                items="center"
                px="$3"
                height={50}
              >
                <Mail size={20} color="$color10" />
                <Input
                  flex={1}
                  borderWidth={0}
                  bg="transparent"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </XStack>
            </YStack>

            {/* Password Input */}
            <YStack gap="$2">
              <Text color="$color11" fontSize="$3" fontWeight="500">
                Password
              </Text>
              <XStack
                bg="$color2"
                borderColor="$borderColor"
                borderWidth={1}
                items="center"
                px="$3"
                height={50}
              >
                <Lock size={20} color="$color10" />
                <Input
                  flex={1}
                  borderWidth={0}
                  bg="transparent"
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <Button
                  size="$2"
                  bg="transparent"
                  onPress={() => setShowPassword(!showPassword)}
                  p="$1"
                >
                  {showPassword ? (
                    <EyeOff size={20} color="$color10" />
                  ) : (
                    <Eye size={20} color="$color10" />
                  )}
                </Button>
              </XStack>
            </YStack>

            {/* Login Button */}
            <Button
              size="$4"
              bg="$blue9"
              color="$blue12"
              onPress={handleLogin}
              disabled={isLoading}
              mt="$2"
            >
              {isLoading ? (
                <XStack gap="$2" items="center">
                  <Spinner size="small" color="$blue12" />
                  <Text color="$blue12">Signing In...</Text>
                </XStack>
              ) : (
                'Sign In'
              )}
            </Button>

            {/* Register Link */}
            <XStack justify="center" gap="$2" mt="$4">
              <Text color="$color11">Don't have an account?</Text>
              <Link href="/(auth)/register" asChild>
                <Text color="$blue10" fontWeight="500" textDecorationLine="underline">
                  Sign Up
                </Text>
              </Link>
            </XStack>
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  )
}
