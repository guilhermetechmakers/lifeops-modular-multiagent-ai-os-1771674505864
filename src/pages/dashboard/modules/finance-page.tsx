import {
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CreditCard,
  Receipt,
  PiggyBank,
  Download,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'
import { MetricCard } from '@/components/ui/metric-card'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const monthlyData = [
  { month: 'Sep', income: 42000, expenses: 31000 },
  { month: 'Oct', income: 45000, expenses: 33000 },
  { month: 'Nov', income: 48000, expenses: 35000 },
  { month: 'Dec', income: 52000, expenses: 38000 },
  { month: 'Jan', income: 49000, expenses: 34000 },
  { month: 'Feb', income: 51000, expenses: 36000 },
]

const forecastData = [
  { month: 'Mar', actual: null, forecast: 53000 },
  { month: 'Apr', actual: null, forecast: 55000 },
  { month: 'May', actual: null, forecast: 58000 },
]

const transactions = [
  { id: 1, description: 'AWS Cloud Services', amount: -4250.00, category: 'Infrastructure', date: '2026-02-20', agentSuggestion: null },
  { id: 2, description: 'Stripe Payout', amount: 12800.00, category: 'Revenue', date: '2026-02-19', agentSuggestion: null },
  { id: 3, description: 'CloudServ Inc', amount: -890.00, category: 'Uncategorized', date: '2026-02-18', agentSuggestion: 'Software & Tools' },
  { id: 4, description: 'Google Workspace', amount: -432.00, category: 'Software', date: '2026-02-17', agentSuggestion: null },
  { id: 5, description: 'Freelancer Payment', amount: -3500.00, category: 'Contractors', date: '2026-02-16', agentSuggestion: null },
  { id: 6, description: 'Client Invoice #1089', amount: 8500.00, category: 'Revenue', date: '2026-02-15', agentSuggestion: null },
]

const subscriptions = [
  { name: 'AWS', amount: 4250, renewal: '2026-03-01', status: 'active' },
  { name: 'Vercel', amount: 320, renewal: '2026-03-05', status: 'active' },
  { name: 'Slack', amount: 180, renewal: '2026-03-01', status: 'active' },
  { name: 'Figma', amount: 75, renewal: '2026-03-15', status: 'active' },
  { name: 'Notion', amount: 48, renewal: '2026-04-01', status: 'cancelled' },
]

function FinancePage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-success" />
            Finance
          </h1>
          <p className="text-sm text-muted-foreground">Automated bookkeeping, forecasting, and anomaly detection</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" className="gap-2">
            <Download className="h-4 w-4" /> Export GL
          </Button>
          <Button className="gap-2">
            <PiggyBank className="h-4 w-4" /> Monthly Close
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Revenue (MTD)" value="$51K" change={4.1} trend="up" icon={<TrendingUp className="h-5 w-5" />} accentColor="green" />
        <MetricCard label="Expenses (MTD)" value="$36K" change={5.9} trend="up" icon={<CreditCard className="h-5 w-5" />} accentColor="orange" />
        <MetricCard label="Net Income" value="$15K" change={-2.3} trend="down" icon={<DollarSign className="h-5 w-5" />} accentColor="purple" />
        <MetricCard label="Anomalies" value={3} change={50} trend="up" icon={<AlertTriangle className="h-5 w-5" />} accentColor="orange" />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(55 55 60 / 0.5)" />
                <XAxis dataKey="month" stroke="#A1A1AA" fontSize={12} />
                <YAxis stroke="#A1A1AA" fontSize={12} tickFormatter={(v: number) => `$${v / 1000}K`} />
                <Tooltip contentStyle={{ backgroundColor: '#232326', border: '1px solid #37373C', borderRadius: '8px', color: '#E5E7EB' }} formatter={(value) => [`$${Number(value).toLocaleString()}`, '']} />
                <Bar dataKey="income" fill="#3FC56B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="#FF7300" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={[...monthlyData.slice(-3).map((d) => ({ month: d.month, actual: d.income, forecast: null })), ...forecastData]}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(55 55 60 / 0.5)" />
                <XAxis dataKey="month" stroke="#A1A1AA" fontSize={12} />
                <YAxis stroke="#A1A1AA" fontSize={12} tickFormatter={(v: number) => `$${v / 1000}K`} />
                <Tooltip contentStyle={{ backgroundColor: '#232326', border: '1px solid #37373C', borderRadius: '8px', color: '#E5E7EB' }} formatter={(value) => value != null ? [`$${Number(value).toLocaleString()}`, ''] : ['—', '']} />
                <Line type="monotone" dataKey="actual" stroke="#3FC56B" strokeWidth={2} dot={{ fill: '#3FC56B', r: 4 }} connectNulls={false} />
                <Line type="monotone" dataKey="forecast" stroke="#B16FFF" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: '#B16FFF', r: 4 }} connectNulls={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Transactions */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-primary" />
              Recent Transactions
            </CardTitle>
            <Badge variant="secondary">{transactions.length} items</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center gap-3 rounded-lg border border-border p-3 transition-all duration-200 hover:bg-muted/50"
                >
                  <div className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-lg',
                    tx.amount > 0 ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                  )}>
                    {tx.amount > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{tx.description}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="secondary" className="text-[10px]">{tx.category}</Badge>
                      {tx.agentSuggestion ? (
                        <Badge variant="accent" className="text-[10px]">AI: {tx.agentSuggestion}</Badge>
                      ) : null}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn('text-sm font-semibold', tx.amount > 0 ? 'text-success' : 'text-foreground')}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{new Date(tx.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subscriptions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-accent" />
              Subscriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {subscriptions.map((sub) => (
                <div
                  key={sub.name}
                  className="flex items-center justify-between rounded-lg border border-border p-3 transition-all duration-200 hover:bg-muted/50"
                >
                  <div>
                    <p className="text-sm font-medium">{sub.name}</p>
                    <p className="text-xs text-muted-foreground">Renews {new Date(sub.renewal).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">${sub.amount}/mo</p>
                    <Badge
                      variant={sub.status === 'active' ? 'success' : 'secondary'}
                      className="text-[10px]"
                    >
                      {sub.status}
                    </Badge>
                  </div>
                </div>
              ))}
              <div className="rounded-lg bg-muted/50 p-3 text-center">
                <p className="text-sm font-semibold">
                  Total: ${subscriptions.filter((s) => s.status === 'active').reduce((sum, s) => sum + s.amount, 0).toLocaleString()}/mo
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default FinancePage
