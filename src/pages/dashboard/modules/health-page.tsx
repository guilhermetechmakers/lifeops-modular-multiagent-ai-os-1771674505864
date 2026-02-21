import {
  Heart,
  Activity,
  Flame,
  Moon,
  Dumbbell,
  Target,
  Calendar,
  TrendingUp,
  Droplets,
  Apple,
  Watch,
  Plus,
} from 'lucide-react'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { MetricCard } from '@/components/ui/metric-card'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

const recoveryData = [
  { metric: 'HRV', value: 78, fullMark: 100 },
  { metric: 'Sleep', value: 85, fullMark: 100 },
  { metric: 'Strain', value: 62, fullMark: 100 },
  { metric: 'Nutrition', value: 70, fullMark: 100 },
  { metric: 'Hydration', value: 90, fullMark: 100 },
  { metric: 'Mood', value: 75, fullMark: 100 },
]

const weeklyLoad = [
  { day: 'Mon', load: 85, recovery: 72 },
  { day: 'Tue', load: 45, recovery: 80 },
  { day: 'Wed', load: 92, recovery: 65 },
  { day: 'Thu', load: 30, recovery: 88 },
  { day: 'Fri', load: 78, recovery: 75 },
  { day: 'Sat', load: 95, recovery: 60 },
  { day: 'Sun', load: 20, recovery: 92 },
]

const habits = [
  { name: 'Morning Meditation', streak: 14, target: 30, completed: true, icon: <Moon className="h-4 w-4" /> },
  { name: 'Hydration (3L)', streak: 7, target: 30, completed: true, icon: <Droplets className="h-4 w-4" /> },
  { name: 'Protein Goal (160g)', streak: 5, target: 30, completed: false, icon: <Apple className="h-4 w-4" /> },
  { name: 'Sleep 7+ hours', streak: 3, target: 30, completed: true, icon: <Moon className="h-4 w-4" /> },
  { name: '10K Steps', streak: 10, target: 30, completed: false, icon: <Activity className="h-4 w-4" /> },
]

const trainingPlan = [
  { day: 'Monday', workout: 'Upper Body Strength', duration: '60 min', intensity: 'high', completed: true },
  { day: 'Tuesday', workout: 'Easy Run + Mobility', duration: '45 min', intensity: 'low', completed: true },
  { day: 'Wednesday', workout: 'Lower Body Strength', duration: '60 min', intensity: 'high', completed: true },
  { day: 'Thursday', workout: 'Active Recovery', duration: '30 min', intensity: 'low', completed: false },
  { day: 'Friday', workout: 'Interval Training', duration: '50 min', intensity: 'high', completed: false },
  { day: 'Saturday', workout: 'Long Run', duration: '75 min', intensity: 'medium', completed: false },
  { day: 'Sunday', workout: 'Rest Day', duration: '—', intensity: 'rest', completed: false },
]

const intensityColors: Record<string, string> = {
  high: 'bg-destructive/10 text-destructive border-destructive/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  low: 'bg-success/10 text-success border-success/20',
  rest: 'bg-muted text-muted-foreground border-border',
}

function HealthPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Heart className="h-6 w-6 text-warning" />
            Health
          </h1>
          <p className="text-sm text-muted-foreground">AI-driven habits, training plans, and recovery balancing</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" className="gap-2">
            <Watch className="h-4 w-4" /> Sync Devices
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> New Goal
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Recovery Score" value="78%" change={5} trend="up" icon={<Heart className="h-5 w-5" />} accentColor="green" />
        <MetricCard label="Weekly Strain" value={487} change={-12} trend="down" icon={<Flame className="h-5 w-5" />} accentColor="orange" />
        <MetricCard label="Active Habits" value={5} change={0} trend="neutral" icon={<Target className="h-5 w-5" />} accentColor="purple" />
        <MetricCard label="Training Adherence" value="86%" change={3} trend="up" icon={<Dumbbell className="h-5 w-5" />} accentColor="green" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recovery Radar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-success" />
              Recovery Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={recoveryData}>
                <PolarGrid stroke="rgb(55 55 60 / 0.5)" />
                <PolarAngleAxis dataKey="metric" stroke="#A1A1AA" fontSize={12} />
                <Radar name="Recovery" dataKey="value" stroke="#3FC56B" fill="#3FC56B" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Load */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-primary" />
              Weekly Load vs Recovery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={weeklyLoad}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(55 55 60 / 0.5)" />
                <XAxis dataKey="day" stroke="#A1A1AA" fontSize={12} />
                <YAxis stroke="#A1A1AA" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#232326', border: '1px solid #37373C', borderRadius: '8px', color: '#E5E7EB' }} />
                <Area type="monotone" dataKey="load" stroke="#FF7300" fill="#FF7300" fillOpacity={0.1} strokeWidth={2} />
                <Area type="monotone" dataKey="recovery" stroke="#3FC56B" fill="#3FC56B" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Training Plan */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent" />
              Training Plan
            </CardTitle>
            <Badge variant="accent">Week 6 of 12</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {trainingPlan.map((session) => (
                <div
                  key={session.day}
                  className={cn(
                    'flex items-center gap-3 rounded-lg border p-3 transition-all duration-200 hover:bg-muted/50',
                    session.completed ? 'border-success/20 bg-success/5' : 'border-border'
                  )}
                >
                  <div className="w-20 text-xs font-medium text-muted-foreground">{session.day}</div>
                  <div className="flex-1">
                    <p className={cn('text-sm font-medium', session.completed && 'line-through text-muted-foreground')}>
                      {session.workout}
                    </p>
                    <p className="text-xs text-muted-foreground">{session.duration}</p>
                  </div>
                  <Badge className={cn('text-[10px] border', intensityColors[session.intensity])}>
                    {session.intensity}
                  </Badge>
                  {session.completed ? (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success/10 text-success">
                      <TrendingUp className="h-3 w-3" />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Habits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-warning" />
              Daily Habits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {habits.map((habit) => (
                <div
                  key={habit.name}
                  className="rounded-lg border border-border p-3 transition-all duration-200 hover:bg-muted/50"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={cn(
                      'flex h-7 w-7 items-center justify-center rounded-lg',
                      habit.completed ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                    )}>
                      {habit.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{habit.name}</p>
                      <p className="text-[10px] text-muted-foreground">{habit.streak} day streak</p>
                    </div>
                    {habit.completed ? (
                      <Badge variant="success" className="text-[10px]">Done</Badge>
                    ) : (
                      <Badge variant="secondary" className="text-[10px]">Pending</Badge>
                    )}
                  </div>
                  <Progress value={(habit.streak / habit.target) * 100} className="h-1" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default HealthPage
