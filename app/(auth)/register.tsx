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
import { Eye, EyeOff, Mail, Lock, User } from '@tamagui/lucide-icons'
import { useAuth } from '../../contexts/AuthContext'

export default function RegisterScreen() {
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }

    if (password !== 'password123') {
      Alert.alert('Error', 'For this demo, password must be "password123"')
      return
    }

    try {
      setIsLoading(true)
      await register(email.trim(), password, name.trim())
      router.replace('/(app)/dashboard')
    } catch (error) {
      Alert.alert(
        'Registration Failed',
        error instanceof Error ? error.message : 'An error occurred'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const fillDemoCredentials = () => {
    setName('Demo User')
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
              Create Account
            </H1>
            <Paragraph color="$color11" text="center" size="$4">
              Sign up to get started with the app
            </Paragraph>
          </YStack>

          {/* Demo Info Card */}
          <Card bg="$green2" borderColor="$green6" p="$4">
            <YStack gap="$2">
              <H4 color="$green11">Demo Registration</H4>
              <Paragraph color="$green11" size="$3">
                Use any name/email with password:{' '}
                <Text fontWeight="bold">password123</Text>
              </Paragraph>
              <Button
                size="$2"
                bg="$green8"
                color="$green12"
                onPress={fillDemoCredentials}
                mt="$2"
              >
                Fill Demo Credentials
              </Button>
            </YStack>
          </Card>

          {/* Register Form */}
          <YStack gap="$4">
            {/* Name Input */}
            <YStack gap="$2">
              <Text color="$color11" fontSize="$3" fontWeight="500">
                Full Name
              </Text>
              <XStack
                bg="$color2"
                borderColor="$borderColor"
                borderWidth={1}
                items="center"
                px="$3"
                height={50}
              >
                <User size={20} color="$color10" />
                <Input
                  flex={1}
                  borderWidth={0}
                  bg="transparent"
                  placeholder="Enter your full name"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </XStack>
            </YStack>

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

            {/* Register Button */}
            <Button
              size="$4"
              bg="$green9"
              color="$green12"
              onPress={handleRegister}
              disabled={isLoading}
              mt="$2"
            >
              {isLoading ? (
                <XStack gap="$2" items="center">
                  <Spinner size="small" color="$green12" />
                  <Text color="$green12">Creating Account...</Text>
                </XStack>
              ) : (
                'Create Account'
              )}
            </Button>

            {/* Login Link */}
            <XStack justify="center" gap="$2" mt="$4">
              <Text color="$color11">Already have an account?</Text>
              <Link href="/(auth)/login" asChild>
                <Text color="$blue10" fontWeight="500" textDecorationLine="underline">
                  Sign In
                </Text>
              </Link>
            </XStack>
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  )
}
