import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
})

export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character'),
  acceptTos: z.literal(true, {
    error: 'You must accept the Terms of Service',
  }),
})

export const resetPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export type LoginInput = z.infer<typeof loginSchema>
export type SignupInput = z.infer<typeof signupSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>

export type SSOProvider = 'google' | 'microsoft' | 'github' | 'saml'

export interface AuthSession {
  user: AuthUser
  token: string
  expiresAt: string
}

export interface AuthUser {
  id: string
  email: string
  name: string
  avatar?: string
  emailVerified: boolean
  role: 'admin' | 'member' | 'viewer'
  createdAt: string
}

export interface AuthResponse {
  session: AuthSession | null
  error: string | null
}

export interface PasswordStrength {
  score: number
  label: string
  color: string
}
