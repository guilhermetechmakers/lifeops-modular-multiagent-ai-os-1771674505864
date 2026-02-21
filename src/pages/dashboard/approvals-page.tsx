import {
  CheckSquare,
  Clock,
  Check,
  X,
  Edit3,
  MessageSquare,
  AlertTriangle,
  Bot,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { formatRelativeTime } from '@/lib/utils'
import { mockApprovals } from '@/lib/mock-data'
import type { Approval } from '@/types'
import { toast } from 'sonner'

const priorityConfig: Record<Approval['priority'], { variant: 'destructive' | 'warning' | 'default' | 'secondary'; label: string }> = {
  critical: { variant: 'destructive', label: 'Critical' },
  high: { variant: 'warning', label: 'High' },
  medium: { variant: 'default', label: 'Medium' },
  low: { variant: 'secondary', label: 'Low' },
}

const moduleColors: Record<string, string> = {
  projects: 'bg-primary/10 text-primary',
  content: 'bg-accent/10 text-accent',
  finance: 'bg-success/10 text-success',
  health: 'bg-warning/10 text-warning',
}

function ApprovalsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleApprove = (id: string) => {
    toast.success(`Approval ${id} approved`)
  }

  const handleReject = (id: string) => {
    toast.error(`Approval ${id} rejected`)
  }

  const getSlaStatus = (deadline: string): { label: string; urgent: boolean } => {
    const now = new Date()
    const sla = new Date(deadline)
    const diff = sla.getTime() - now.getTime()
    const hours = Math.floor(diff / 3600000)

    if (hours < 0) return { label: 'Overdue', urgent: true }
    if (hours < 2) return { label: `${hours}h remaining`, urgent: true }
    if (hours < 24) return { label: `${hours}h remaining`, urgent: false }
    return { label: `${Math.floor(hours / 24)}d remaining`, urgent: false }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <CheckSquare className="h-6 w-6 text-warning" />
            Approvals Queue
          </h1>
          <p className="text-sm text-muted-foreground">Human-in-the-loop reviews for pending agent actions</p>
        </div>
        <Badge variant="warning" className="gap-1">
          <AlertTriangle className="h-3 w-3" />
          {mockApprovals.filter((a) => a.status === 'pending').length} pending
        </Badge>
      </div>

      <div className="space-y-3">
        {mockApprovals.map((approval, i) => {
          const priority = priorityConfig[approval.priority]
          const sla = getSlaStatus(approval.slaDeadline)
          const isExpanded = expandedId === approval.id

          return (
            <Card
              key={approval.id}
              className={cn(
                'overflow-hidden transition-all duration-300 hover:shadow-card-hover',
                sla.urgent && 'border-destructive/30'
              )}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <CardContent className="p-0">
                <div
                  className="flex items-center gap-4 p-4 cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : approval.id)}
                >
                  <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', moduleColors[approval.module])}>
                    <CheckSquare className="h-5 w-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold truncate">{approval.title}</h3>
                      <Badge variant={priority.variant}>{priority.label}</Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                      <Bot className="h-3 w-3" />
                      <span>{approval.agentName}</span>
                      <span>&middot;</span>
                      <span>{formatRelativeTime(approval.createdAt)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={cn('flex items-center gap-1 text-xs', sla.urgent ? 'text-destructive' : 'text-muted-foreground')}>
                      <Clock className="h-3 w-3" />
                      {sla.label}
                    </div>
                    {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                  </div>
                </div>

                {isExpanded ? (
                  <div className="border-t border-border animate-fade-in">
                    <div className="p-4">
                      <p className="text-sm text-muted-foreground">{approval.description}</p>

                      {approval.diffs && approval.diffs.length > 0 ? (
                        <div className="mt-4 space-y-2">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Changes</p>
                          {approval.diffs.map((diff, di) => (
                            <div key={di} className="rounded-lg border border-border bg-secondary/50 p-3 font-mono text-xs">
                              <p className="text-muted-foreground mb-1">{diff.path}</p>
                              {diff.before ? (
                                <p className="text-destructive">- {diff.before}</p>
                              ) : null}
                              {diff.after ? (
                                <p className="text-success">+ {diff.after}</p>
                              ) : null}
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    <div className="flex items-center justify-between border-t border-border bg-secondary/30 px-4 py-3">
                      <Button variant="ghost" size="sm" className="gap-1 text-xs">
                        <MessageSquare className="h-3 w-3" /> Comment
                      </Button>
                      <div className="flex items-center gap-2">
                        <Button variant="secondary" size="sm" className="gap-1 text-xs" onClick={() => handleReject(approval.id)}>
                          <X className="h-3 w-3" /> Reject
                        </Button>
                        <Button variant="secondary" size="sm" className="gap-1 text-xs">
                          <Edit3 className="h-3 w-3" /> Modify
                        </Button>
                        <Button size="sm" className="gap-1 text-xs" onClick={() => handleApprove(approval.id)}>
                          <Check className="h-3 w-3" /> Approve
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default ApprovalsPage
