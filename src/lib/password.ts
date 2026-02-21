import type { PasswordStrength } from '@/types/auth'

export function getPasswordStrength(password: string): PasswordStrength {
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 1) return { score, label: 'Weak', color: 'bg-destructive' }
  if (score === 2) return { score, label: 'Fair', color: 'bg-warning' }
  if (score === 3) return { score, label: 'Good', color: 'bg-success/70' }
  return { score, label: 'Strong', color: 'bg-success' }
}
