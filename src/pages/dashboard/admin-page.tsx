import {
  ShieldCheck,
  Users,
  Activity,
  BarChart3,
  Server,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
} from 'lucide-react'
import {
  BarChart,
  Bar,
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

const usageData = [
  { hour: '00', requests: 120 },
  { hour: '04', requests: 45 },
  { hour: '08', requests: 380 },
  { hour: '12', requests: 520 },
  { hour: '16', requests: 450 },
  { hour: '20', requests: 280 },
]

const systemHealth = [
  { service: 'Agent Runtime', status: 'healthy', uptime: '99.99%', latency: '12ms' },
  { service: 'Message Bus', status: 'healthy', uptime: '99.98%', latency: '3ms' },
  { service: 'Cron Scheduler', status: 'healthy', uptime: '99.95%', latency: '8ms' },
  { service: 'Approvals Service', status: 'healthy', uptime: '99.99%', latency: '15ms' },
  { service: 'Connector Gateway', status: 'degraded', uptime: '99.80%', latency: '45ms' },
  { service: 'Audit Store', status: 'healthy', uptime: '100%', latency: '5ms' },
]

const policies = [
  { name: 'Max concurrent runs', value: '10', scope: 'Organization' },
  { name: 'Default approval SLA', value: '12 hours', scope: 'Organization' },
  { name: 'Audit log retention', value: '90 days', scope: 'Organization' },
  { name: 'Max API rate', value: '1000 req/min', scope: 'Per user' },
  { name: 'Secret rotation', value: '90 days', scope: 'Organization' },
]

function AdminPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            Admin Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">System administration, monitoring, and policy management</p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Total Users" value={127} change={8} trend="up" icon={<Users className="h-5 w-5" />} accentColor="orange" />
        <MetricCard label="System Uptime" value="99.97%" change={0.02} trend="up" icon={<Activity className="h-5 w-5" />} accentColor="green" />
        <MetricCard label="API Requests (24h)" value="45.2K" change={12} trend="up" icon={<BarChart3 className="h-5 w-5" />} accentColor="purple" />
        <MetricCard label="Active Alerts" value={1} change={-50} trend="down" icon={<AlertTriangle className="h-5 w-5" />} accentColor="orange" />
      </div>

      {/* API Usage Chart */}
      <Card>
        <CardHeader>
          <CardTitle>API Request Volume (24h)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(55 55 60 / 0.5)" />
              <XAxis dataKey="hour" stroke="#A1A1AA" fontSize={12} />
              <YAxis stroke="#A1A1AA" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#232326', border: '1px solid #37373C', borderRadius: '8px', color: '#E5E7EB' }} />
              <Bar dataKey="requests" fill="#B16FFF" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-success" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {systemHealth.map((service) => (
                <div key={service.service} className="flex items-center gap-3 rounded-lg border border-border p-3 transition-all hover:bg-muted/50">
                  {service.status === 'healthy' ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : service.status === 'degraded' ? (
                    <AlertTriangle className="h-4 w-4 text-warning" />
                  ) : (
                    <XCircle className="h-4 w-4 text-destructive" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{service.service}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{service.uptime}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {service.latency}
                    </span>
                    <Badge variant={service.status === 'healthy' ? 'success' : 'warning'} className="text-[10px]">
                      {service.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Policies */}
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-warning" />
              Active Policies
            </CardTitle>
            <Button variant="secondary" size="sm" className="text-xs">Edit Policies</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {policies.map((policy) => (
                <div key={policy.name} className="flex items-center justify-between rounded-lg border border-border p-3 transition-all hover:bg-muted/50">
                  <div>
                    <p className="text-sm font-medium">{policy.name}</p>
                    <Badge variant="secondary" className="text-[10px] mt-0.5">{policy.scope}</Badge>
                  </div>
                  <span className="text-sm font-mono text-primary">{policy.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminPage
