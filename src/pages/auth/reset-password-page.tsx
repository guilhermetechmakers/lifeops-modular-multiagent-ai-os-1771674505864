import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { KeyRound, ArrowLeft, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useResetPassword } from '@/hooks/useAuth'
import { resetPasswordSchema, type ResetPasswordInput } from '@/types/auth'

function ResetPasswordPage() {
  const [sentToEmail, setSentToEmail] = useState<string | null>(null)
  const resetPassword = useResetPassword()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = (data: ResetPasswordInput) => {
    resetPassword.mutate(data.email, {
      onSuccess: () => setSentToEmail(data.email),
    })
  }

  if (sentToEmail) {
    return (
      <div className="animate-fade-in text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
          <CheckCircle className="h-8 w-8 text-success" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Check your email</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We sent a password reset link to{' '}
          <strong className="text-foreground">{sentToEmail}</strong>.
          Check your inbox and follow the instructions.
        </p>
        <Link
          to="/auth/login"
          className="mt-8 inline-flex items-center gap-1 text-sm text-primary hover:underline transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to login
        </Link>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 lg:mx-0">
        <KeyRound className="h-8 w-8 text-primary" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight">Reset your password</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Enter your email and we&apos;ll send you a reset link.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <div>
          <label htmlFor="reset-email" className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <Input
            id="reset-email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          isLoading={resetPassword.isPending}
        >
          Send Reset Link
        </Button>
      </form>

      <Link
        to="/auth/login"
        className="mt-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to login
      </Link>
    </div>
  )
}

export default ResetPasswordPage
