import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, UserPlus, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { signupSchema, type SignupInput } from '@/types/auth'
import { useSignup } from '@/hooks/useAuth'
import { getPasswordStrength } from '@/lib/password'
import { cn } from '@/lib/utils'

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const signup = useSignup()

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      acceptTos: false as unknown as true,
    },
  })

  const password = watch('password')
  const strength = getPasswordStrength(password || '')

  const requirements = [
    { label: 'At least 8 characters', met: (password || '').length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(password || '') },
    { label: 'One number', met: /[0-9]/.test(password || '') },
    { label: 'One special character', met: /[^A-Za-z0-9]/.test(password || '') },
  ]

  const onSubmit = (data: SignupInput) => {
    signup.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label htmlFor="signup-name" className="mb-1.5 block text-sm font-medium">
          Full Name
        </label>
        <Input
          id="signup-name"
          type="text"
          placeholder="Alex Chen"
          autoComplete="name"
          error={errors.name?.message}
          {...register('name')}
        />
      </div>

      <div>
        <label htmlFor="signup-email" className="mb-1.5 block text-sm font-medium">
          Email
        </label>
        <Input
          id="signup-email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      <div>
        <label htmlFor="signup-password" className="mb-1.5 block text-sm font-medium">
          Password
        </label>
        <div className="relative">
          <Input
            id="signup-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a strong password"
            autoComplete="new-password"
            className="pr-10"
            error={errors.password?.message}
            {...register('password')}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        {(password || '').length > 0 && (
          <div className="mt-3 space-y-2.5 animate-fade-in">
            <div className="flex items-center gap-2">
              <div className="flex h-1.5 flex-1 gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      'h-full flex-1 rounded-full transition-all duration-300',
                      i < strength.score ? strength.color : 'bg-muted'
                    )}
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-muted-foreground min-w-[3.5rem] text-right">
                {strength.label}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {requirements.map((req) => (
                <div key={req.label} className="flex items-center gap-1.5 text-xs">
                  {req.met ? (
                    <Check className="h-3 w-3 text-success shrink-0" />
                  ) : (
                    <X className="h-3 w-3 text-muted-foreground shrink-0" />
                  )}
                  <span className={cn('transition-colors', req.met ? 'text-success' : 'text-muted-foreground')}>
                    {req.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        <Controller
          name="acceptTos"
          control={control}
          render={({ field }) => (
            <label className="flex items-start gap-2.5 cursor-pointer select-none group">
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className="mt-0.5"
                id="accept-tos"
              />
              <span className="text-xs leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors">
                I agree to the{' '}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>
          )}
        />
        {errors.acceptTos && (
          <p className="mt-1.5 text-xs text-destructive">{errors.acceptTos.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full gap-2"
        size="lg"
        isLoading={signup.isPending}
      >
        <UserPlus className="h-4 w-4" />
        Create Account
      </Button>
    </form>
  )
}
