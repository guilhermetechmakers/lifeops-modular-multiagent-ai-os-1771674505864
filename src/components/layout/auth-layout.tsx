import { Outlet, Link } from 'react-router-dom'
import { Zap, Bot, Shield, Workflow } from 'lucide-react'

const TESTIMONIAL = {
  quote: 'LifeOps cut our manual operations by 80%. The approval workflows give us confidence to automate safely.',
  author: 'Sarah Chen',
  role: 'VP of Engineering, Acme Corp',
}

const STATS = [
  { value: '10K+', label: 'Active Users' },
  { value: '1M+', label: 'Runs Completed' },
  { value: '99.9%', label: 'Uptime' },
]

const TRUST_BADGES = [
  { icon: <Shield className="h-4 w-4" />, label: 'SOC 2 Compliant' },
  { icon: <Bot className="h-4 w-4" />, label: 'Multi-Agent AI' },
  { icon: <Workflow className="h-4 w-4" />, label: 'Full Audit Trail' },
]

function AuthLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-1/2 lg:flex-col lg:justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#18181B] via-[#1e1e22] to-[#18181B]" />
        <div className="absolute top-1/4 -left-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-20 h-64 w-64 rounded-full bg-accent/5 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/3 blur-[100px] animate-gradient-shift" />

        <div className="relative z-10 flex flex-col justify-between h-full p-12">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-glow transition-shadow duration-300 group-hover:shadow-[0_0_30px_rgba(255,115,0,0.3)]">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">LifeOps</span>
          </Link>

          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight text-foreground">
                Your AI-powered
                <br />
                <span className="gradient-text">operating system</span>
              </h1>
              <p className="max-w-md text-lg text-muted-foreground leading-relaxed">
                Automate projects, content, finances, and health through
                coordinated multi-agent AI workflows.
              </p>
            </div>

            <div className="flex gap-8">
              {STATS.map((stat, i) => (
                <div key={stat.label} className="animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-border bg-card/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:shadow-glow">
              <p className="text-sm italic text-muted-foreground leading-relaxed">
                &ldquo;{TESTIMONIAL.quote}&rdquo;
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                  {TESTIMONIAL.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{TESTIMONIAL.author}</p>
                  <p className="text-xs text-muted-foreground">{TESTIMONIAL.role}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {TRUST_BADGES.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-1.5 rounded-full border border-border bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                >
                  {badge.icon}
                  {badge.label}
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            &copy; 2026 LifeOps. Enterprise-grade AI automation.
          </p>
        </div>
      </div>

      {/* Right panel - auth form */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-glow">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">LifeOps</span>
            </Link>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export { AuthLayout }
