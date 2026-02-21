import { Shield, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

interface OAuthConsentNoteProps {
  className?: string
}

export function OAuthConsentNote({ className }: OAuthConsentNoteProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-muted/30 p-3.5',
        className
      )}
    >
      <div className="flex items-start gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10">
          <Shield className="h-3.5 w-3.5 text-primary" />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-foreground flex items-center gap-1.5">
            <Info className="h-3 w-3 text-muted-foreground" />
            Secure Authentication
          </p>
          <p className="text-xs leading-relaxed text-muted-foreground">
            When you sign in with a social provider, we only access your public profile
            and email. We never post on your behalf or access private data. Your
            connected accounts are encrypted and can be revoked anytime from your
            profile settings.
          </p>
        </div>
      </div>
    </div>
  )
}
