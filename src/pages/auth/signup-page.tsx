import { SignupForm } from '@/components/auth/signup-form'
import { SSOButtons } from '@/components/auth/sso-buttons'
import { OAuthConsentNote } from '@/components/auth/oauth-consent-note'
import { SwitchFormAction } from '@/components/auth/switch-form-action'

function SignupPage() {
  return (
    <div className="animate-fade-in">
      <div className="space-y-1.5">
        <h2 className="text-2xl font-bold tracking-tight">Create your account</h2>
        <p className="text-sm text-muted-foreground">
          Start automating with LifeOps in minutes
        </p>
      </div>

      <div className="mt-8 space-y-0">
        <SignupForm />
        <SSOButtons />
        <OAuthConsentNote className="mt-5" />
        <div className="mt-6">
          <SwitchFormAction mode="signup" />
        </div>
      </div>
    </div>
  )
}

export default SignupPage
