import { useState } from 'react'
import { Alert } from 'react-native'
import { Link, router } from 'expo-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { YStack, XStack, H1, H4, Text, Paragraph, Card, ScrollView } from 'tamagui'
import { Mail } from '@tamagui/lucide-icons'
import { useAuth } from '../../contexts/AuthContext'
import { loginSchema, type LoginFormData } from '../../lib/schemas'
import { FormField } from '../../components/forms/FormField'
import { PasswordField } from '../../components/forms/PasswordField'
import { PrimaryButton, SecondaryButton } from '../../components/ui'

export default function LoginScreen() {
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const { control, handleSubmit, setValue } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true)
      await login(data.email.trim(), data.password)
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
    setValue('email', 'demo@example.com')
    setValue('password', 'password123')
  }

  return (
    <YStack flex={1} bg="$background">
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <YStack maxW={400} width="100%" self="center" gap="$6" px="$4" py="$8">
          {/* Header */}
          <YStack gap="$2" items="center">
            <H1 color="$color12" text="center" size="$8">
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
              <SecondaryButton size="$2" onPress={fillDemoCredentials} mt="$2">
                Fill Demo Credentials
              </SecondaryButton>
            </YStack>
          </Card>

          {/* Login Form */}
          <YStack gap="$4">
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

            {/* Login Button */}
            <PrimaryButton
              size="$4"
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
              loadingText="Signing In..."
              mt="$2"
            >
              Sign In
            </PrimaryButton>

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
