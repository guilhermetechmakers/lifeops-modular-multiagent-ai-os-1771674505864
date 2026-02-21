import { Link } from 'react-router-dom'
import {
  Zap,
  Bot,
  FolderKanban,
  FileText,
  DollarSign,
  Heart,
  Clock,
  Shield,
  CheckSquare,
  ArrowRight,
  Star,
  ChevronRight,
  Undo2,
  Eye,
  Lock,
  Workflow,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const features = [
  {
    icon: <FolderKanban className="h-6 w-6" />,
    title: 'Projects',
    description: 'Auto-triage PRs, manage roadmaps, orchestrate releases with AI agents that understand your codebase.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: 'Content',
    description: 'End-to-end content pipeline from ideation to publishing with SEO optimization and analytics.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    icon: <DollarSign className="h-6 w-6" />,
    title: 'Finance',
    description: 'Automated bookkeeping, anomaly detection, and monthly close with full audit trails.',
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Health',
    description: 'AI-driven training plans, nutrition tracking, and recovery balancing synced with your wearables.',
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
]

const capabilities = [
  {
    icon: <Clock className="h-5 w-5" />,
    title: 'First-Class Cronjobs',
    description: 'Schedule autonomy with automation levels, constraints, safety rails, and full run artifacts.',
  },
  {
    icon: <CheckSquare className="h-5 w-5" />,
    title: 'Human-in-the-Loop',
    description: 'Approval queues with SLA timers, diff previews, and threaded comments for safe automation.',
  },
  {
    icon: <Eye className="h-5 w-5" />,
    title: 'Explainable Actions',
    description: 'Every action stores rationale, structured metadata, and schema-validated outputs.',
  },
  {
    icon: <Undo2 className="h-5 w-5" />,
    title: 'Reversible Everything',
    description: 'Diff engine for code, docs, and ledger entries with automated reversal scripts.',
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: 'Enterprise Security',
    description: 'RBAC, immutable audit logs, encrypted secrets vault, and tamper-evident entries.',
  },
  {
    icon: <Lock className="h-5 w-5" />,
    title: 'Scoped Memory',
    description: 'Agents share memory with ACLs, versioning, and conflict resolution rules.',
  },
]

const useCases = [
  { role: 'Engineering Lead', task: 'Auto-triage nightly PRs, gradually increase automation from suggest-only to bounded-autopilot.' },
  { role: 'Content Manager', task: 'Schedule conditional publishing based on analytics thresholds with approval gates.' },
  { role: 'Finance Manager', task: 'Monthly close with max-action constraints and anomaly flagging for audit compliance.' },
  { role: 'Coach / Athlete', task: 'AI-adapted training plans with wearable sync and recovery-based deload suggestions.' },
]

const pricingTiers = [
  { name: 'Starter', price: '$0', period: '/month', features: ['3 agents', '100 runs/mo', '1 module', 'Community support'], cta: 'Get Started Free', highlighted: false },
  { name: 'Pro', price: '$49', period: '/month', features: ['Unlimited agents', '5,000 runs/mo', 'All modules', 'Priority support', 'Custom templates'], cta: 'Start Pro Trial', highlighted: true },
  { name: 'Enterprise', price: 'Custom', period: '', features: ['Unlimited everything', 'On-prem runners', 'SAML SSO', 'SLA guarantee', 'Dedicated CSM'], cta: 'Contact Sales', highlighted: false },
]

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">LifeOps</span>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Features</a>
            <a href="#capabilities" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Capabilities</a>
            <a href="#use-cases" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Use Cases</a>
            <a href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/auth/login">
              <Button variant="ghost" size="sm">Log In</Button>
            </Link>
            <Link to="/auth/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl animate-pulse-slow" />
        <div className="absolute top-40 right-1/4 h-64 w-64 rounded-full bg-accent/5 blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="default" className="mb-6 animate-fade-in">
              <Bot className="mr-1 h-3 w-3" /> Powered by GPT-5 Multi-Agent Orchestration
            </Badge>
            <h1 className="animate-fade-in-up text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              Your Life,{' '}
              <span className="gradient-text">Automated</span>
              <br />
              with AI Agents
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              LifeOps is a modular AI operating system that coordinates specialized agents to automate your projects, content, finances, and health — with full explainability and safe rollback.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Link to="/auth/signup">
                <Button size="xl" className="gap-2 bg-gradient-to-r from-primary to-primary/80 shadow-glow">
                  Start Free <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="secondary" size="xl" className="gap-2">
                  View Demo <ChevronRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-20 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
              <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                <div className="h-3 w-3 rounded-full bg-warning/60" />
                <div className="h-3 w-3 rounded-full bg-success/60" />
                <span className="ml-2 text-xs text-muted-foreground">LifeOps — Master Dashboard</span>
              </div>
              <div className="grid grid-cols-4 gap-4 p-6">
                {[
                  { label: 'Active Agents', value: '6', color: 'border-l-primary' },
                  { label: 'Runs Today', value: '23', color: 'border-l-success' },
                  { label: 'Pending Approvals', value: '4', color: 'border-l-warning' },
                  { label: 'Success Rate', value: '98.2%', color: 'border-l-accent' },
                ].map((card) => (
                  <div key={card.label} className={cn('rounded-lg border border-border bg-secondary p-4 border-l-4', card.color)}>
                    <p className="text-xs text-muted-foreground">{card.label}</p>
                    <p className="mt-1 text-2xl font-bold">{card.value}</p>
                  </div>
                ))}
              </div>
              <div className="h-32 bg-gradient-to-t from-card to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="accent" className="mb-4">Modules</Badge>
            <h2 className="text-3xl font-bold md:text-4xl">Four Domains, One Platform</h2>
            <p className="mt-4 text-muted-foreground">
              Specialized agents for each domain communicate through an ordered message bus with scoped shared memory.
            </p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {features.map((feature, i) => (
              <Card
                key={feature.title}
                className="group overflow-hidden hover:shadow-card-hover hover:translate-y-[-2px] transition-all duration-300"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <CardContent className="flex gap-4 p-6">
                  <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-xl', feature.bgColor, feature.color)}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="border-t border-border bg-secondary/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="success" className="mb-4">
              <Workflow className="mr-1 h-3 w-3" /> Orchestration
            </Badge>
            <h2 className="text-3xl font-bold md:text-4xl">Built for Trust & Safety</h2>
            <p className="mt-4 text-muted-foreground">
              Every action is explainable, permissioned, schema-validated, logged, and reversible.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap, i) => (
              <div
                key={cap.title}
                className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-card-hover hover:translate-y-[-2px] hover:border-primary/30"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {cap.icon}
                </div>
                <h3 className="text-base font-semibold">{cap.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="warning" className="mb-4">Use Cases</Badge>
            <h2 className="text-3xl font-bold md:text-4xl">Built for Every Role</h2>
            <p className="mt-4 text-muted-foreground">
              From individual founders to enterprise teams, LifeOps adapts to your workflow.
            </p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {useCases.map((uc, i) => (
              <div
                key={uc.role}
                className="flex gap-4 rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-card-hover hover:translate-y-[-1px]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 text-lg font-bold text-primary">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold">{uc.role}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{uc.task}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-border bg-secondary/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4">Pricing</Badge>
            <h2 className="text-3xl font-bold md:text-4xl">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-muted-foreground">Start free, scale as you grow.</p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {pricingTiers.map((tier) => (
              <Card
                key={tier.name}
                className={cn(
                  'relative overflow-hidden transition-all duration-300 hover:translate-y-[-4px]',
                  tier.highlighted && 'border-primary shadow-glow'
                )}
              >
                {tier.highlighted ? (
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-accent" />
                ) : null}
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold">{tier.name}</h3>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{tier.price}</span>
                      <span className="text-muted-foreground">{tier.period}</span>
                    </div>
                  </div>
                  <ul className="mb-8 space-y-3">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/auth/signup">
                    <Button
                      className="w-full"
                      variant={tier.highlighted ? 'default' : 'secondary'}
                    >
                      {tier.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to <span className="gradient-text">automate your life</span>?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of users who trust LifeOps to run their operations safely and intelligently.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link to="/auth/signup">
              <Button size="xl" className="gap-2 bg-gradient-to-r from-primary to-primary/80 shadow-glow">
                Get Started Free <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Link to="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Zap className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold">LifeOps</span>
              </Link>
              <p className="mt-3 text-sm text-muted-foreground">
                Enterprise-grade AI automation for modern teams.
              </p>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><Link to="/docs" className="hover:text-foreground transition-colors">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                <li><Link to="/cookies" className="hover:text-foreground transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/docs" className="hover:text-foreground transition-colors">Help Center</Link></li>
                <li><a href="mailto:support@lifeops.ai" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
            &copy; 2026 LifeOps. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
