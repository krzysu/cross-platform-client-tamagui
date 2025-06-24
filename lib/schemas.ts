import { z } from 'zod'

// Reusable field validations
const nameValidation = z
  .string()
  .min(1, 'Full name is required')
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')

const emailValidation = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')

const passwordValidation = z
  .string()
  .min(1, 'Password is required')
  .min(6, 'Password must be at least 6 characters')

const confirmPasswordValidation = z.string().min(1, 'Please confirm your password')

// Helper function to create password confirmation schema
export const createPasswordConfirmationSchema = <T extends Record<string, any>>(
  baseSchema: z.ZodObject<T>,
  passwordField: keyof T,
  confirmPasswordField: keyof T,
  errorMessage = "Passwords don't match"
) => {
  return baseSchema.refine((data) => data[passwordField] === data[confirmPasswordField], {
    message: errorMessage,
    path: [confirmPasswordField as string],
  })
}

// Login form schema
export const loginSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
})

export type LoginFormData = z.infer<typeof loginSchema>

// Register form schema
export const registerSchema = createPasswordConfirmationSchema(
  z.object({
    name: nameValidation,
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: confirmPasswordValidation,
  }),
  'password',
  'confirmPassword'
)

export type RegisterFormData = z.infer<typeof registerSchema>

// Profile schema
export const profileSchema = z.object({
  name: nameValidation,
  email: emailValidation,
})

export type ProfileFormData = z.infer<typeof profileSchema>
