import {
  FolderKanban,
  GitPullRequest,
  Rocket,
  Bug,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowUpRight,
  GitBranch,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { MetricCard } from '@/components/ui/metric-card'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const velocityData = [
  { week: 'W1', completed: 12, opened: 15 },
  { week: 'W2', completed: 18, opened: 14 },
  { week: 'W3', completed: 15, opened: 20 },
  { week: 'W4', completed: 22, opened: 18 },
  { week: 'W5', completed: 25, opened: 16 },
  { week: 'W6', completed: 20, opened: 22 },
]

const tickets = [
  { id: 'PROJ-142', title: 'Implement OAuth2 flow for GitHub connector', status: 'in-progress', priority: 'high', assignee: 'PR Triage Bot' },
  { id: 'PROJ-141', title: 'Add rate limiting to agent API endpoints', status: 'todo', priority: 'medium', assignee: 'Unassigned' },
  { id: 'PROJ-140', title: 'Fix memory leak in message bus consumer', status: 'in-progress', priority: 'critical', assignee: 'Release Orchestrator' },
  { id: 'PROJ-139', title: 'Update SDK documentation for v2.0', status: 'review', priority: 'low', assignee: 'Content Strategist' },
  { id: 'PROJ-138', title: 'Migrate cron scheduler to distributed mode', status: 'todo', priority: 'high', assignee: 'Unassigned' },
]

const pullRequests = [
  { id: '#1234', title: 'feat: auth refactor with secure token handling', status: 'open', reviews: 2, checks: 'passing', branch: 'feature/auth-refactor' },
  { id: '#1233', title: 'fix: memory leak in message bus', status: 'open', reviews: 1, checks: 'passing', branch: 'fix/bus-memory-leak' },
  { id: '#1232', title: 'chore: update dependencies', status: 'merged', reviews: 2, checks: 'passing', branch: 'chore/deps-update' },
  { id: '#1231', title: 'feat: add Plaid connector retry logic', status: 'closed', reviews: 3, checks: 'failing', branch: 'feature/plaid-retry' },
]

const statusColors: Record<string, string> = {
  'todo': 'bg-muted-foreground',
  'in-progress': 'bg-primary',
  'review': 'bg-accent',
  'done': 'bg-success',
}

const prStatusColors: Record<string, { variant: 'success' | 'default' | 'destructive' | 'secondary' }> = {
  open: { variant: 'default' },
  merged: { variant: 'success' },
  closed: { variant: 'destructive' },
}

function ProjectsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FolderKanban className="h-6 w-6 text-primary" />
            Projects
          </h1>
          <p className="text-sm text-muted-foreground">Developer-centric automation: roadmaps, tickets, CI/CD</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" className="gap-2">
            <GitBranch className="h-4 w-4" /> Connect Repo
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> New Ticket
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Open PRs" value={8} change={-15} trend="down" icon={<GitPullRequest className="h-5 w-5" />} accentColor="orange" />
        <MetricCard label="Tickets In Progress" value={12} change={5} trend="up" icon={<Bug className="h-5 w-5" />} accentColor="purple" />
        <MetricCard label="Releases This Month" value={3} change={50} trend="up" icon={<Rocket className="h-5 w-5" />} accentColor="green" />
        <MetricCard label="Auto-Triaged PRs" value={47} change={23} trend="up" icon={<CheckCircle2 className="h-5 w-5" />} accentColor="green" />
      </div>

      {/* Velocity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Sprint Velocity</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={velocityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(55 55 60 / 0.5)" />
              <XAxis dataKey="week" stroke="#A1A1AA" fontSize={12} />
              <YAxis stroke="#A1A1AA" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#232326', border: '1px solid #37373C', borderRadius: '8px', color: '#E5E7EB' }} />
              <Area type="monotone" dataKey="completed" stroke="#3FC56B" fill="#3FC56B" fillOpacity={0.1} strokeWidth={2} />
              <Area type="monotone" dataKey="opened" stroke="#FF7300" fill="#FF7300" fillOpacity={0.1} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Ticket Board */}
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Ticket Board</CardTitle>
            <Badge variant="secondary">{tickets.length} tickets</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex items-center gap-3 rounded-lg border border-border p-3 transition-all duration-200 hover:bg-muted/50"
                >
                  <div className={cn('h-2 w-2 rounded-full', statusColors[ticket.status])} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground">{ticket.id}</span>
                      <Badge
                        variant={ticket.priority === 'critical' ? 'destructive' : ticket.priority === 'high' ? 'warning' : ticket.priority === 'medium' ? 'default' : 'secondary'}
                        className="text-[10px]"
                      >
                        {ticket.priority}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium truncate">{ticket.title}</p>
                    <p className="text-xs text-muted-foreground">{ticket.assignee}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pull Requests */}
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Pull Requests</CardTitle>
            <Badge variant="secondary">{pullRequests.filter((pr) => pr.status === 'open').length} open</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pullRequests.map((pr) => (
                <div
                  key={pr.id}
                  className="flex items-center gap-3 rounded-lg border border-border p-3 transition-all duration-200 hover:bg-muted/50"
                >
                  <GitPullRequest className={cn('h-4 w-4', pr.status === 'merged' ? 'text-success' : pr.status === 'open' ? 'text-primary' : 'text-destructive')} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground">{pr.id}</span>
                      <Badge variant={prStatusColors[pr.status].variant} className="text-[10px]">{pr.status}</Badge>
                      <Badge variant={pr.checks === 'passing' ? 'success' : 'destructive'} className="text-[10px]">
                        {pr.checks === 'passing' ? <CheckCircle2 className="mr-0.5 h-2.5 w-2.5" /> : <AlertCircle className="mr-0.5 h-2.5 w-2.5" />}
                        CI
                      </Badge>
                    </div>
                    <p className="text-sm font-medium truncate">{pr.title}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <GitBranch className="h-3 w-3" /> {pr.branch} &middot; {pr.reviews} reviews
                    </p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProjectsPage
