import { Outlet, Link } from 'react-router-dom'
import { Zap } from 'lucide-react'

function AuthLayout() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 lg:flex-col lg:justify-between bg-gradient-to-br from-[#18181B] via-[#1e1e22] to-[#18181B] p-12">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">LifeOps</span>
        </Link>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight text-foreground">
            Your AI-powered
            <br />
            <span className="gradient-text">operating system</span>
          </h1>
          <p className="max-w-md text-lg text-muted-foreground">
            Automate projects, content, finances, and health through coordinated multi-agent AI workflows.
          </p>
          <div className="flex gap-8 pt-4">
            {[
              { value: '10K+', label: 'Active Users' },
              { value: '1M+', label: 'Runs Completed' },
              { value: '99.9%', label: 'Uptime' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          &copy; 2026 LifeOps. Enterprise-grade AI automation.
        </p>
      </div>

      <div className="flex w-full flex-col items-center justify-center px-6 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
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
