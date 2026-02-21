import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { authApi } from '@/api/auth'
import type { LoginInput, SignupInput, SSOProvider } from '@/types/auth'

export const authKeys = {
  session: ['auth', 'session'] as const,
}

export function useSession() {
  return useQuery({
    queryKey: authKeys.session,
    queryFn: authApi.getSession,
    retry: false,
    staleTime: 1000 * 60 * 10,
    enabled: !!localStorage.getItem('auth_token'),
  })
}

export function useLogin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (credentials: LoginInput) => authApi.login(credentials),
    onSuccess: (data) => {
      if (data.session) {
        queryClient.setQueryData(authKeys.session, data)
        toast.success('Welcome back!')
        navigate('/dashboard')
      } else if (data.error) {
        toast.error(data.error)
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Login failed. Please try again.')
    },
  })
}

export function useSignup() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (credentials: SignupInput) => authApi.signup(credentials),
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error)
      } else {
        toast.success('Account created! Check your email for verification.')
        navigate('/auth/verify-email')
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Signup failed. Please try again.')
    },
  })
}

export function useSSOLogin() {
  return useMutation({
    mutationFn: (provider: SSOProvider) => authApi.ssoLogin(provider),
    onSuccess: (data) => {
      window.location.href = data.redirectUrl
    },
    onError: (error: Error) => {
      toast.error(error.message || 'SSO login failed. Please try again.')
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.clear()
      toast.success('Signed out successfully')
      navigate('/auth/login')
    },
    onError: () => {
      localStorage.removeItem('auth_token')
      queryClient.clear()
      navigate('/auth/login')
    },
  })
}

export function useVerifyEmail() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (code: string) => authApi.verifyEmail(code),
    onSuccess: (data) => {
      if (data.session) {
        queryClient.setQueryData(authKeys.session, data)
        toast.success('Email verified successfully!')
        navigate('/dashboard')
      } else if (data.error) {
        toast.error(data.error)
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Verification failed. Please try again.')
    },
  })
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (email: string) => authApi.resetPassword(email),
    onSuccess: () => {
      toast.success('Reset link sent! Check your inbox.')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to send reset link.')
    },
  })
}
