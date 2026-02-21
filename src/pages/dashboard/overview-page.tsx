import { Link } from 'react-router-dom'
import {
  Bot,
  Clock,
  CheckSquare,
  Activity,
  TrendingUp,
  AlertTriangle,
  Play,
  ArrowRight,
  Zap,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { MetricCard } from '@/components/ui/metric-card'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { formatRelativeTime } from '@/lib/utils'
import {
  mockCronjobs,
  mockRuns,
  mockApprovals,
  mockAuditEntries,
  dashboardChartData,
  moduleDistribution,
} from '@/lib/mock-data'

const statusBadgeVariant: Record<string, 'success' | 'default' | 'destructive' | 'warning' | 'secondary'> = {
  completed: 'success',
  running: 'default',
  failed: 'destructive',
  pending: 'warning',
  cancelled: 'secondary',
}

const moduleColors: Record<string, string> = {
  projects: 'bg-primary/10 text-primary',
  content: 'bg-accent/10 text-accent',
  finance: 'bg-success/10 text-success',
  health: 'bg-warning/10 text-warning',
}

function OverviewPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Master Dashboard</h1>
          <p className="text-sm text-muted-foreground">System overview and orchestration command center</p>
        </div>
        <Button className="gap-2">
          <Zap className="h-4 w-4" /> Quick Create
        </Button>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Active Agents"
          value={6}
          change={12}
          changeLabel="vs last week"
          trend="up"
          icon={<Bot className="h-5 w-5" />}
          accentColor="orange"
        />
        <MetricCard
          label="Runs Today"
          value={23}
          change={8}
          changeLabel="vs yesterday"
          trend="up"
          icon={<Activity className="h-5 w-5" />}
          accentColor="green"
        />
        <MetricCard
          label="Pending Approvals"
          value={4}
          change={-25}
          changeLabel="vs yesterday"
          trend="down"
          icon={<CheckSquare className="h-5 w-5" />}
          accentColor="purple"
        />
        <MetricCard
          label="Success Rate"
          value="98.2%"
          change={1.5}
          changeLabel="vs last week"
          trend="up"
          icon={<TrendingUp className="h-5 w-5" />}
          accentColor="green"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Weekly Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={dashboardChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(55 55 60 / 0.5)" />
                <XAxis dataKey="name" stroke="#A1A1AA" fontSize={12} />
                <YAxis stroke="#A1A1AA" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#232326',
                    border: '1px solid #37373C',
                    borderRadius: '8px',
                    color: '#E5E7EB',
                  }}
                />
                <Bar dataKey="runs" fill="#FF7300" radius={[4, 4, 0, 0]} />
                <Bar dataKey="approvals" fill="#B16FFF" radius={[4, 4, 0, 0]} />
                <Bar dataKey="errors" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-accent" />
              Module Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={moduleDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {moduleDistribution.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#232326',
                    border: '1px solid #37373C',
                    borderRadius: '8px',
                    color: '#E5E7EB',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              {moduleDistribution.map((entry) => (
                <div key={entry.name} className="flex items-center gap-1.5 text-xs">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.fill }} />
                  <span className="text-muted-foreground">{entry.name} ({entry.value}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cronjobs + Active Runs */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Cronjobs */}
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Upcoming Cronjobs
            </CardTitle>
            <Link to="/dashboard/cronjobs">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                View All <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockCronjobs.slice(0, 4).map((cron) => (
                <Link
                  key={cron.id}
                  to="/dashboard/cronjobs"
                  className="flex items-center gap-3 rounded-lg border border-border p-3 transition-all duration-200 hover:bg-muted/50 hover:border-primary/30"
                >
                  <div className={cn('rounded-lg p-2', moduleColors[cron.module])}>
                    <Clock className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{cron.name}</p>
                    <p className="text-xs text-muted-foreground">{cron.schedule}</p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={cron.status === 'active' ? 'success' : cron.status === 'paused' ? 'warning' : 'destructive'}
                    >
                      {cron.status}
                    </Badge>
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      Next: {new Date(cron.nextRun).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Runs */}
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5 text-success" />
              Recent Runs
            </CardTitle>
            <Link to="/dashboard/cronjobs">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                View All <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockRuns.map((run) => (
                <div
                  key={run.id}
                  className="flex items-center gap-3 rounded-lg border border-border p-3 transition-all duration-200 hover:bg-muted/50"
                >
                  <div className={cn('h-2 w-2 rounded-full', {
                    'bg-success': run.status === 'completed',
                    'bg-primary animate-pulse': run.status === 'running',
                    'bg-destructive': run.status === 'failed',
                    'bg-muted-foreground': run.status === 'pending' || run.status === 'cancelled',
                  })} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{run.cronjobName}</p>
                    <p className="text-xs text-muted-foreground">{run.agentName} &middot; {run.actionsCount} actions</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={statusBadgeVariant[run.status]}>
                      {run.status}
                    </Badge>
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      {formatRelativeTime(run.startedAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Approvals + Audit */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Approvals */}
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-warning" />
              Pending Approvals
            </CardTitle>
            <Link to="/dashboard/approvals">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                View All <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockApprovals.map((approval) => (
                <Link
                  key={approval.id}
                  to="/dashboard/approvals"
                  className="flex items-center gap-3 rounded-lg border border-border p-3 transition-all duration-200 hover:bg-muted/50 hover:border-primary/30"
                >
                  <div className={cn('rounded-lg p-2', moduleColors[approval.module])}>
                    <CheckSquare className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{approval.title}</p>
                    <p className="text-xs text-muted-foreground">{approval.agentName}</p>
                  </div>
                  <Badge
                    variant={
                      approval.priority === 'critical' ? 'destructive' :
                      approval.priority === 'high' ? 'warning' :
                      approval.priority === 'medium' ? 'default' : 'secondary'
                    }
                  >
                    {approval.priority}
                  </Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Audit Snapshot */}
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-accent" />
              Audit Log
            </CardTitle>
            <Link to="/dashboard/settings">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                View All <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAuditEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-start gap-3 rounded-lg border border-border p-3 transition-all duration-200 hover:bg-muted/50"
                >
                  <div className={cn('mt-0.5 h-2 w-2 shrink-0 rounded-full', {
                    'bg-blue-400': entry.severity === 'info',
                    'bg-warning': entry.severity === 'warning',
                    'bg-destructive': entry.severity === 'error',
                  })} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{entry.action}</p>
                      <Badge variant="secondary" className="text-[10px]">{entry.module}</Badge>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground truncate">{entry.details}</p>
                    <p className="mt-1 text-[10px] text-muted-foreground">{entry.actor} &middot; {formatRelativeTime(entry.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default OverviewPage
