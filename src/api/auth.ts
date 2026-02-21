import { api } from '@/lib/api'
import type {
  LoginInput,
  SignupInput,
  AuthResponse,
  SSOProvider,
} from '@/types/auth'

export const authApi = {
  login: async (credentials: LoginInput): Promise<AuthResponse> => {
    const data = await api.post<AuthResponse>('/auth/login', credentials)
    if (data.session?.token) {
      localStorage.setItem('auth_token', data.session.token)
    }
    return data
  },

  signup: async (credentials: SignupInput): Promise<AuthResponse> => {
    const data = await api.post<AuthResponse>('/auth/signup', {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
    })
    if (data.session?.token) {
      localStorage.setItem('auth_token', data.session.token)
    }
    return data
  },

  ssoLogin: async (provider: SSOProvider): Promise<{ redirectUrl: string }> => {
    return api.post<{ redirectUrl: string }>('/auth/sso', { provider })
  },

  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout', {})
    } finally {
      localStorage.removeItem('auth_token')
    }
  },

  verifyEmail: async (code: string): Promise<AuthResponse> => {
    return api.post<AuthResponse>('/auth/verify-email', { code })
  },

  resetPassword: async (email: string): Promise<void> => {
    await api.post('/auth/reset-password', { email })
  },

  getSession: async (): Promise<AuthResponse> => {
    return api.get<AuthResponse>('/auth/session')
  },
}
