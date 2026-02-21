import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Play,
  Clock,
  Bot,
  FileText,
  Undo2,
  Download,
  CheckCircle2,
  MessageSquare,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { mockRuns } from '@/lib/mock-data'
import { toast } from 'sonner'

const run = mockRuns[0]

const messageTrace = [
  { id: 1, from: 'Scheduler', to: 'PR Triage Bot', message: 'Execute nightly triage for org/main', timestamp: '02:00:01', type: 'command' as const },
  { id: 2, from: 'PR Triage Bot', to: 'GitHub Connector', message: 'Fetch open PRs from repos: [api, web, sdk]', timestamp: '02:00:03', type: 'request' as const },
  { id: 3, from: 'GitHub Connector', to: 'PR Triage Bot', message: 'Returned 14 open PRs with metadata', timestamp: '02:00:08', type: 'response' as const },
  { id: 4, from: 'PR Triage Bot', to: 'Shared Memory', message: 'Store triage context: team ownership map, file patterns', timestamp: '02:01:00', type: 'memory' as const },
  { id: 5, from: 'PR Triage Bot', to: 'GitHub Connector', message: 'Apply labels and assignments to 14 PRs', timestamp: '02:05:00', type: 'action' as const },
  { id: 6, from: 'PR Triage Bot', to: 'Slack Connector', message: 'Send triage summary to #engineering', timestamp: '02:10:00', type: 'action' as const },
  { id: 7, from: 'PR Triage Bot', to: 'Approvals Queue', message: 'Request approval for PR #1234 merge', timestamp: '02:11:00', type: 'approval' as const },
  { id: 8, from: 'PR Triage Bot', to: 'Scheduler', message: 'Run complete: 14 actions, 0 errors', timestamp: '02:12:00', type: 'response' as const },
]

const typeColors: Record<string, string> = {
  command: 'border-l-primary',
  request: 'border-l-accent',
  response: 'border-l-success',
  memory: 'border-l-warning',
  action: 'border-l-primary',
  approval: 'border-l-destructive',
}

function RunDetailsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Link to="/dashboard/cronjobs">
          <Button variant="ghost" size="icon-sm">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Run Details</h1>
            <Badge variant="success" className="gap-1">
              <CheckCircle2 className="h-3 w-3" /> {run.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{run.cronjobName} &middot; {run.id}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" className="gap-2" onClick={() => toast.info('Dry-run rollback simulated')}>
            <Undo2 className="h-4 w-4" /> Rollback
          </Button>
          <Button variant="secondary" className="gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      {/* Run Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { label: 'Agent', value: run.agentName, icon: <Bot className="h-4 w-4 text-primary" /> },
          { label: 'Started', value: new Date(run.startedAt).toLocaleTimeString(), icon: <Play className="h-4 w-4 text-success" /> },
          { label: 'Duration', value: run.duration ? `${Math.floor(run.duration / 60)}m ${run.duration % 60}s` : '—', icon: <Clock className="h-4 w-4 text-accent" /> },
          { label: 'Actions', value: run.actionsCount.toString(), icon: <CheckCircle2 className="h-4 w-4 text-primary" /> },
          { label: 'Artifacts', value: run.artifacts.length.toString(), icon: <FileText className="h-4 w-4 text-warning" /> },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="flex items-center gap-3 p-4">
              {item.icon}
              <div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-sm font-semibold">{item.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Message Trace */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-accent" />
              Message Trace
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {messageTrace.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    'rounded-lg border border-border border-l-4 p-3 transition-all duration-200 hover:bg-muted/50',
                    typeColors[msg.type]
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-semibold text-foreground">{msg.from}</span>
                      <span className="text-muted-foreground">&rarr;</span>
                      <span className="font-semibold text-foreground">{msg.to}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px]">{msg.type}</Badge>
                      <span className="text-[10px] font-mono text-muted-foreground">{msg.timestamp}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{msg.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Artifacts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-warning" />
              Artifacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {run.artifacts.map((artifact) => (
                <div
                  key={artifact.id}
                  className="flex items-center gap-3 rounded-lg border border-border p-3 transition-all duration-200 hover:bg-muted/50"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{artifact.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {artifact.type} &middot; {(artifact.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <Button variant="ghost" size="icon-sm">
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}

              {run.artifacts.length === 0 ? (
                <p className="text-center text-sm text-muted-foreground py-8">No artifacts yet</p>
              ) : null}
            </div>

            {/* Diff Preview */}
            <div className="mt-6">
              <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Action Diff Preview</p>
              <div className="rounded-lg border border-border bg-secondary/50 p-3 font-mono text-xs">
                <p className="text-muted-foreground mb-1">label-changes.diff</p>
                <p className="text-destructive">- label: needs-review</p>
                <p className="text-success">+ label: approved, team:backend</p>
                <p className="text-destructive">- assignee: null</p>
                <p className="text-success">+ assignee: @alex-chen</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default RunDetailsPage
