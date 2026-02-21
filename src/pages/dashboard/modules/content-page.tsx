import {
  FileText,
  Lightbulb,
  TrendingUp,
  Eye,
  Calendar,
  Plus,
  Edit3,
  Send,
  BarChart3,
  Clock,
} from 'lucide-react'
import {
  LineChart,
  Line,
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
import { Progress } from '@/components/ui/progress'
const analyticsData = [
  { day: 'Mon', views: 1200, engagement: 340 },
  { day: 'Tue', views: 1800, engagement: 520 },
  { day: 'Wed', views: 1500, engagement: 410 },
  { day: 'Thu', views: 2200, engagement: 680 },
  { day: 'Fri', views: 1900, engagement: 590 },
  { day: 'Sat', views: 800, engagement: 220 },
  { day: 'Sun', views: 600, engagement: 180 },
]

const contentItems = [
  { id: 1, title: 'AI Agents in 2026: The Complete Guide', status: 'review', type: 'Blog Post', dueDate: '2026-02-22', progress: 85 },
  { id: 2, title: 'LifeOps Product Update — February', status: 'draft', type: 'Newsletter', dueDate: '2026-02-25', progress: 40 },
  { id: 3, title: 'How to Automate Your Monthly Close', status: 'published', type: 'Blog Post', dueDate: '2026-02-18', progress: 100 },
  { id: 4, title: 'Developer SDK v2.0 Announcement', status: 'idea', type: 'Blog Post', dueDate: '2026-03-01', progress: 10 },
  { id: 5, title: 'Training Plan Automation Case Study', status: 'draft', type: 'Case Study', dueDate: '2026-02-28', progress: 55 },
]

const ideas = [
  { id: 1, title: 'Multi-agent collaboration patterns', source: 'Content Strategist', score: 92 },
  { id: 2, title: 'Cronjob safety rails best practices', source: 'Content Strategist', score: 87 },
  { id: 3, title: 'Enterprise audit compliance guide', source: 'Content Strategist', score: 78 },
  { id: 4, title: 'Wearable data integration tutorial', source: 'Content Strategist', score: 71 },
]

const statusConfig: Record<string, { label: string; variant: 'success' | 'default' | 'warning' | 'secondary' | 'accent' }> = {
  published: { label: 'Published', variant: 'success' },
  review: { label: 'In Review', variant: 'warning' },
  draft: { label: 'Draft', variant: 'default' },
  idea: { label: 'Idea', variant: 'accent' },
}

function ContentPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="h-6 w-6 text-accent" />
            Content
          </h1>
          <p className="text-sm text-muted-foreground">End-to-end content pipeline automation</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" className="gap-2">
            <Calendar className="h-4 w-4" /> Calendar
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> New Content
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Published This Month" value={8} change={33} trend="up" icon={<Send className="h-5 w-5" />} accentColor="purple" />
        <MetricCard label="Total Views" value="12.4K" change={18} trend="up" icon={<Eye className="h-5 w-5" />} accentColor="green" />
        <MetricCard label="Avg Engagement" value="4.2%" change={0.5} trend="up" icon={<TrendingUp className="h-5 w-5" />} accentColor="orange" />
        <MetricCard label="Ideas in Queue" value={4} change={-10} trend="down" icon={<Lightbulb className="h-5 w-5" />} accentColor="purple" />
      </div>

      {/* Analytics Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-accent" />
            Content Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(55 55 60 / 0.5)" />
              <XAxis dataKey="day" stroke="#A1A1AA" fontSize={12} />
              <YAxis stroke="#A1A1AA" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#232326', border: '1px solid #37373C', borderRadius: '8px', color: '#E5E7EB' }} />
              <Line type="monotone" dataKey="views" stroke="#B16FFF" strokeWidth={2} dot={{ fill: '#B16FFF', r: 4 }} />
              <Line type="monotone" dataKey="engagement" stroke="#FF7300" strokeWidth={2} dot={{ fill: '#FF7300', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Content Pipeline */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Edit3 className="h-5 w-5 text-primary" />
              Content Pipeline
            </CardTitle>
            <Badge variant="secondary">{contentItems.length} items</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {contentItems.map((item) => {
                const config = statusConfig[item.status]
                return (
                  <div
                    key={item.id}
                    className="rounded-lg border border-border p-4 transition-all duration-200 hover:bg-muted/50 hover:border-primary/30"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant={config.variant}>{config.label}</Badge>
                        <Badge variant="outline" className="text-[10px]">{item.type}</Badge>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {new Date(item.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <Progress value={item.progress} className="flex-1" />
                      <span className="text-xs text-muted-foreground">{item.progress}%</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Idea Inbox */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-warning" />
              Idea Inbox
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ideas.map((idea) => (
                <div
                  key={idea.id}
                  className="rounded-lg border border-border p-3 transition-all duration-200 hover:bg-muted/50 hover:border-accent/30"
                >
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant="accent" className="text-[10px]">Score: {idea.score}</Badge>
                  </div>
                  <p className="text-sm font-medium">{idea.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">by {idea.source}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ContentPage
