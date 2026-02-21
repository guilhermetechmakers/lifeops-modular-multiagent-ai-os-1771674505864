import { LoginForm } from '@/components/auth/login-form'
import { SSOButtons } from '@/components/auth/sso-buttons'
import { OAuthConsentNote } from '@/components/auth/oauth-consent-note'
import { SwitchFormAction } from '@/components/auth/switch-form-action'

function LoginPage() {
  return (
    <div className="animate-fade-in">
      <div className="space-y-1.5">
        <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
        <p className="text-sm text-muted-foreground">
          Sign in to your LifeOps account to continue
        </p>
      </div>

      <div className="mt-8 space-y-0">
        <LoginForm />
        <SSOButtons />
        <OAuthConsentNote className="mt-5" />
        <div className="mt-6">
          <SwitchFormAction mode="login" />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
