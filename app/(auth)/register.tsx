import { useState } from 'react'
import { Alert } from 'react-native'
import { Link, router } from 'expo-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  YStack,
  XStack,
  H1,
  H4,
  Button,
  Text,
  Paragraph,
  Spinner,
  Card,
  ScrollView,
} from 'tamagui'
import { Mail, User } from '@tamagui/lucide-icons'
import { useAuth } from '../../contexts/AuthContext'
import { registerSchema, type RegisterFormData } from '../../lib/schemas'
import { FormField } from '../../components/forms/FormField'
import { PasswordField } from '../../components/forms/PasswordField'

export default function RegisterScreen() {
  const { register } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const { control, handleSubmit, setValue } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: RegisterFormData) => {
    // For demo purposes, still check for the demo password
    if (data.password !== 'password123') {
      Alert.alert('Error', 'For this demo, password must be "password123"')
      return
    }

    try {
      setIsLoading(true)
      await register(data.email.trim(), data.password, data.name.trim())
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
    setValue('name', 'Demo User')
    setValue('email', 'demo@example.com')
    setValue('password', 'password123')
    setValue('confirmPassword', 'password123')
  }

  return (
    <YStack flex={1} bg="$background">
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <YStack maxW={400} width="100%" self="center" gap="$6" px="$4" py="$8">
          {/* Header */}
          <YStack gap="$2" items="center">
            <H1 color="$color12" text="center" size="$8">
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
            <FormField
              control={control}
              name="name"
              label="Full Name"
              placeholder="Enter your full name"
              icon={User}
              autoCapitalize="words"
            />

            {/* Email Input */}
            <FormField
              control={control}
              name="email"
              label="Email"
              placeholder="Enter your email"
              icon={Mail}
              keyboardType="email-address"
            />

            {/* Password Input */}
            <PasswordField
              control={control}
              name="password"
              label="Password"
              placeholder="Enter your password"
            />

            {/* Confirm Password Input */}
            <PasswordField
              control={control}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
            />

            {/* Register Button */}
            <Button
              size="$4"
              bg="$green9"
              color="$green12"
              onPress={handleSubmit(onSubmit)}
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
