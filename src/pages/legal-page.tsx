import { Link, useLocation } from 'react-router-dom'
import { Zap, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

const legalContent: Record<string, { title: string; lastUpdated: string; sections: { heading: string; content: string }[] }> = {
  '/privacy': {
    title: 'Privacy Policy',
    lastUpdated: 'February 1, 2026',
    sections: [
      { heading: 'Information We Collect', content: 'We collect information you provide directly, such as account details, agent configurations, and workflow data. We also collect usage data including run logs, performance metrics, and interaction patterns to improve our services.' },
      { heading: 'How We Use Your Information', content: 'Your information is used to provide and improve LifeOps services, process agent runs, maintain audit logs, send notifications, and ensure platform security. We never sell your personal data to third parties.' },
      { heading: 'Data Storage & Security', content: 'All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Audit logs are stored in tamper-evident, append-only stores. Secrets are managed through enterprise-grade vault integrations (KMS, HashiCorp Vault, Azure Key Vault).' },
      { heading: 'Data Retention', content: 'Run artifacts and audit logs are retained according to your organization\'s configured retention policy (default: 90 days). You can request data export or deletion at any time through your account settings.' },
      { heading: 'Your Rights', content: 'You have the right to access, correct, export, or delete your personal data. For enterprise customers, data processing agreements (DPAs) are available upon request.' },
      { heading: 'Contact', content: 'For privacy-related inquiries, contact privacy@lifeops.ai or your dedicated Customer Success Manager for enterprise accounts.' },
    ],
  },
  '/terms': {
    title: 'Terms of Service',
    lastUpdated: 'February 1, 2026',
    sections: [
      { heading: 'Acceptance of Terms', content: 'By accessing or using LifeOps, you agree to be bound by these Terms of Service. If you are using LifeOps on behalf of an organization, you represent that you have authority to bind that organization.' },
      { heading: 'Service Description', content: 'LifeOps provides a multi-agent AI orchestration platform including agent management, cronjob scheduling, approval workflows, and integration connectors. The platform processes automated actions on your behalf as configured.' },
      { heading: 'User Responsibilities', content: 'You are responsible for maintaining the security of your account credentials, configuring appropriate automation levels and safety constraints, reviewing and approving agent actions as required, and ensuring compliance with applicable laws.' },
      { heading: 'Automation & Liability', content: 'While LifeOps provides safety rails, approval workflows, and rollback capabilities, you acknowledge that automated actions carry inherent risks. You are responsible for configuring appropriate constraints and reviewing agent outputs.' },
      { heading: 'Intellectual Property', content: 'You retain ownership of your data, configurations, and custom workflows. LifeOps retains ownership of the platform, system agents, and template library. Custom templates you create remain your intellectual property.' },
      { heading: 'Termination', content: 'Either party may terminate the agreement with 30 days notice. Upon termination, you may export your data within 90 days. After that period, data will be deleted according to our retention policy.' },
    ],
  },
  '/cookies': {
    title: 'Cookie Policy',
    lastUpdated: 'February 1, 2026',
    sections: [
      { heading: 'What Are Cookies', content: 'Cookies are small text files stored on your device when you visit our platform. We use cookies to maintain your session, remember preferences, and improve your experience.' },
      { heading: 'Essential Cookies', content: 'These cookies are required for LifeOps to function properly. They include authentication tokens, session identifiers, and CSRF protection tokens. These cannot be disabled.' },
      { heading: 'Analytics Cookies', content: 'We use analytics cookies to understand how users interact with LifeOps, which features are most used, and where we can improve. This data is aggregated and anonymized.' },
      { heading: 'Preference Cookies', content: 'These cookies remember your settings such as sidebar collapse state, notification preferences, and dashboard layout configurations.' },
      { heading: 'Managing Cookies', content: 'You can manage cookie preferences through your browser settings. Note that disabling essential cookies may prevent LifeOps from functioning correctly.' },
    ],
  },
}

function LegalPage() {
  const location = useLocation()
  const content = legalContent[location.pathname] ?? legalContent['/privacy']

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">LifeOps</span>
          </Link>
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold">{content.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {content.lastUpdated}</p>

        <div className="mt-12 space-y-8 prose prose-invert max-w-none">
          {content.sections.map((section, i) => (
            <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
              <h2 className="text-xl font-semibold text-foreground mb-3">{section.heading}</h2>
              <p className="text-muted-foreground leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>Questions about this policy? Contact us at <a href="mailto:legal@lifeops.ai" className="text-primary hover:underline">legal@lifeops.ai</a></p>
        </div>
      </div>
    </div>
  )
}

export default LegalPage
