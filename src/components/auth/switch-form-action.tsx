import { Link } from 'react-router-dom'

interface SwitchFormActionProps {
  mode: 'login' | 'signup'
}

export function SwitchFormAction({ mode }: SwitchFormActionProps) {
  if (mode === 'login') {
    return (
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link
          to="/auth/signup"
          className="font-medium text-primary hover:underline transition-colors"
        >
          Sign up
        </Link>
      </p>
    )
  }

  return (
    <p className="text-center text-sm text-muted-foreground">
      Already have an account?{' '}
      <Link
        to="/auth/login"
        className="font-medium text-primary hover:underline transition-colors"
      >
        Sign in
      </Link>
    </p>
  )
}
