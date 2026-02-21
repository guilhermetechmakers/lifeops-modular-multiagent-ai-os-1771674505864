import { useState } from 'react'
import {
  Clock,
  Plus,
  Search,
  Play,
  Pause,
  MoreVertical,
  Shield,
  Zap,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { mockCronjobs } from '@/lib/mock-data'
import type { AutomationLevel, CronjobStatus } from '@/types'

const statusConfig: Record<CronjobStatus, { variant: 'success' | 'warning' | 'destructive' | 'secondary'; icon: React.ReactNode }> = {
  active: { variant: 'success', icon: <CheckCircle2 className="h-3 w-3" /> },
  paused: { variant: 'warning', icon: <Pause className="h-3 w-3" /> },
  error: { variant: 'destructive', icon: <AlertCircle className="h-3 w-3" /> },
  completed: { variant: 'secondary', icon: <CheckCircle2 className="h-3 w-3" /> },
}

const automationColors: Record<AutomationLevel, string> = {
  'suggest-only': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'approval-required': 'bg-warning/10 text-warning border-warning/20',
  'conditional-auto': 'bg-accent/10 text-accent border-accent/20',
  'bounded-autopilot': 'bg-success/10 text-success border-success/20',
}

const moduleColors: Record<string, string> = {
  projects: 'bg-primary/10 text-primary',
  content: 'bg-accent/10 text-accent',
  finance: 'bg-success/10 text-success',
  health: 'bg-warning/10 text-warning',
}

function CronjobsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCronjobs = mockCronjobs.filter((cron) =>
    cron.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Clock className="h-6 w-6 text-primary" />
            Cronjobs Manager
          </h1>
          <p className="text-sm text-muted-foreground">Schedule, monitor, and govern automated workflows</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Create Cronjob
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search cronjobs..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
        </div>
      </div>

      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <div className="space-y-3">
            {filteredCronjobs.map((cron, i) => {
              const config = statusConfig[cron.status]
              return (
                <Card
                  key={cron.id}
                  className="overflow-hidden hover:shadow-card-hover hover:translate-y-[-1px] transition-all duration-300"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <CardContent className="p-0">
                    <div className="flex items-center gap-4 p-4">
                      <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', moduleColors[cron.module])}>
                        <Clock className="h-5 w-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{cron.name}</h3>
                          <Badge variant={config.variant} className="gap-1">
                            {config.icon} {cron.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5 truncate">{cron.description}</p>
                      </div>

                      <div className="hidden md:flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Schedule</p>
                          <p className="text-sm font-mono">{cron.schedule}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Next Run</p>
                          <p className="text-sm">{new Date(cron.nextRun).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Runs</p>
                          <p className="text-sm font-semibold">{cron.runsCount}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge className={cn('text-[10px] border', automationColors[cron.automationLevel])}>
                          {cron.automationLevel}
                        </Badge>
                        {cron.lastOutcome ? (
                          <div className={cn('h-2 w-2 rounded-full', {
                            'bg-success': cron.lastOutcome === 'success',
                            'bg-destructive': cron.lastOutcome === 'failure',
                            'bg-muted-foreground': cron.lastOutcome === 'skipped',
                          })} title={`Last: ${cron.lastOutcome}`} />
                        ) : null}
                      </div>

                      <div className="flex items-center gap-1">
                        <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" title={cron.status === 'active' ? 'Pause' : 'Resume'}>
                          {cron.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </button>
                        <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Constraints Bar */}
                    <div className="flex items-center gap-4 border-t border-border bg-secondary/30 px-4 py-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        Max {cron.constraints.maxActions} actions
                      </span>
                      {cron.constraints.spendLimit !== undefined ? (
                        <span className="flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          Spend limit: ${cron.constraints.spendLimit}
                        </span>
                      ) : null}
                      <span className="flex items-center gap-1">
                        {cron.constraints.requireApproval ? (
                          <><CheckCircle2 className="h-3 w-3 text-warning" /> Approval required</>
                        ) : (
                          <><XCircle className="h-3 w-3" /> No approval</>
                        )}
                      </span>
                      <span className="ml-auto">
                        Tools: {cron.constraints.allowedTools.join(', ')}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardContent className="p-8">
              <div className="grid grid-cols-7 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-muted-foreground pb-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 28 }, (_, i) => {
                  const dayNum = i + 1
                  const hasCronjob = dayNum === 22 || dayNum === 23 || dayNum === 27
                  return (
                    <div
                      key={i}
                      className={cn(
                        'flex flex-col items-center gap-1 rounded-lg border border-border p-2 text-sm transition-colors hover:bg-muted/50',
                        hasCronjob && 'border-primary/30 bg-primary/5'
                      )}
                    >
                      <span className={cn('text-xs', dayNum === 21 && 'text-primary font-bold')}>{dayNum}</span>
                      {hasCronjob ? <div className="h-1 w-1 rounded-full bg-primary" /> : null}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CronjobsPage
