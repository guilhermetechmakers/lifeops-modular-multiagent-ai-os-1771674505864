import { useState } from 'react'
import {
  Bot,
  Search,
  Plus,
  Filter,
  MoreVertical,
  Copy,
  Archive,
  Activity,
  Cpu,
  Plug,
  Brain,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { formatRelativeTime } from '@/lib/utils'
import { mockAgents } from '@/lib/mock-data'
import type { Agent } from '@/types'

const statusConfig: Record<Agent['status'], { label: string; variant: 'success' | 'default' | 'destructive' | 'secondary'; dot: string }> = {
  active: { label: 'Active', variant: 'success', dot: 'bg-success' },
  idle: { label: 'Idle', variant: 'secondary', dot: 'bg-muted-foreground' },
  error: { label: 'Error', variant: 'destructive', dot: 'bg-destructive' },
  archived: { label: 'Archived', variant: 'secondary', dot: 'bg-muted-foreground' },
}

const moduleConfig: Record<string, { color: string; bg: string }> = {
  projects: { color: 'text-primary', bg: 'bg-primary/10' },
  content: { color: 'text-accent', bg: 'bg-accent/10' },
  finance: { color: 'text-success', bg: 'bg-success/10' },
  health: { color: 'text-warning', bg: 'bg-warning/10' },
}

function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterModule, setFilterModule] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredAgents = mockAgents.filter((agent) => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesModule = filterModule === 'all' || agent.module === filterModule
    const matchesStatus = filterStatus === 'all' || agent.status === filterStatus
    return matchesSearch && matchesModule && matchesStatus
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Agent Directory</h1>
          <p className="text-sm text-muted-foreground">Manage and monitor your AI agents</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Create Agent
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {['all', 'projects', 'content', 'finance', 'health'].map((mod) => (
            <button
              key={mod}
              onClick={() => setFilterModule(mod)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                filterModule === mod
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              {mod === 'all' ? 'All Modules' : mod.charAt(0).toUpperCase() + mod.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {['all', 'active', 'idle', 'error'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                filterStatus === status
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Agent Grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredAgents.map((agent, i) => {
          const modConfig = moduleConfig[agent.module]
          const statConfig = statusConfig[agent.status]

          return (
            <Card
              key={agent.id}
              className="group overflow-hidden hover:shadow-card-hover hover:translate-y-[-2px] transition-all duration-300"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <CardContent className="p-0">
                <div className="flex items-center justify-between border-b border-border p-4">
                  <div className="flex items-center gap-3">
                    <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', modConfig.bg, modConfig.color)}>
                      <Bot className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{agent.name}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className={cn('h-1.5 w-1.5 rounded-full', statConfig.dot)} />
                        <span className="text-xs text-muted-foreground">{statConfig.label}</span>
                        <Badge variant="secondary" className="text-[10px]">{agent.type}</Badge>
                      </div>
                    </div>
                  </div>
                  <button className="rounded-lg p-1.5 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 hover:bg-muted hover:text-foreground">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-3 p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Cpu className="h-3.5 w-3.5" />
                    <span className="font-medium text-foreground">Capabilities:</span>
                    <div className="flex flex-wrap gap-1">
                      {agent.capabilities.map((cap) => (
                        <Badge key={cap} variant="outline" className="text-[10px]">{cap}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Brain className="h-3.5 w-3.5" />
                    <span className="font-medium text-foreground">Memory:</span>
                    <span>{agent.memoryScope}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Plug className="h-3.5 w-3.5" />
                    <span className="font-medium text-foreground">Connectors:</span>
                    <div className="flex gap-1">
                      {agent.connectors.map((conn) => (
                        <Badge key={conn} variant="secondary" className="text-[10px]">{conn}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border px-4 py-3 bg-secondary/30">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Activity className="h-3 w-3" />
                    <span>{agent.runsCompleted.toLocaleString()} runs</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Active {formatRelativeTime(agent.lastActive)}
                  </span>
                  <div className="flex gap-1">
                    <button className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground" title="Clone">
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                    <button className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground" title="Archive">
                      <Archive className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default AgentsPage
