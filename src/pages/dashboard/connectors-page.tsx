import { useState } from 'react'
import {
  Plug,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Settings,
  Github,
  MessageSquare,
  Calendar,
  Landmark,
  Globe,
  Watch,
  Triangle,
  Receipt,
  CreditCard,
  BarChart3,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { formatRelativeTime } from '@/lib/utils'
import { mockConnectors } from '@/lib/mock-data'
import type { Connector } from '@/types'

const iconMap: Record<string, React.ReactNode> = {
  github: <Github className="h-5 w-5" />,
  'message-square': <MessageSquare className="h-5 w-5" />,
  calendar: <Calendar className="h-5 w-5" />,
  landmark: <Landmark className="h-5 w-5" />,
  globe: <Globe className="h-5 w-5" />,
  watch: <Watch className="h-5 w-5" />,
  triangle: <Triangle className="h-5 w-5" />,
  receipt: <Receipt className="h-5 w-5" />,
  'credit-card': <CreditCard className="h-5 w-5" />,
  'bar-chart-3': <BarChart3 className="h-5 w-5" />,
}

const statusConfig: Record<Connector['status'], { variant: 'success' | 'destructive' | 'secondary'; icon: React.ReactNode; label: string }> = {
  connected: { variant: 'success', icon: <CheckCircle2 className="h-3 w-3" />, label: 'Connected' },
  disconnected: { variant: 'secondary', icon: <XCircle className="h-3 w-3" />, label: 'Disconnected' },
  error: { variant: 'destructive', icon: <AlertTriangle className="h-3 w-3" />, label: 'Error' },
}

function ConnectorsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')

  const categories = ['all', ...new Set(mockConnectors.map((c) => c.category))]

  const filteredConnectors = mockConnectors.filter((conn) => {
    const matchesSearch = conn.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === 'all' || conn.category === filterCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Plug className="h-6 w-6 text-accent" />
            Integration Connectors
          </h1>
          <p className="text-sm text-muted-foreground">Configure and monitor external service integrations</p>
        </div>
        <Button className="gap-2">
          <Plug className="h-4 w-4" /> Add Connector
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search connectors..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                filterCategory === cat ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Connector Grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredConnectors.map((conn, i) => {
          const config = statusConfig[conn.status]
          return (
            <Card
              key={conn.id}
              className={cn(
                'group overflow-hidden hover:shadow-card-hover hover:translate-y-[-2px] transition-all duration-300',
                conn.status === 'error' && 'border-destructive/30'
              )}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <CardContent className="p-0">
                <div className="flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                    {iconMap[conn.icon] ?? <Plug className="h-5 w-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{conn.name}</h3>
                      <Badge variant={config.variant} className="gap-1 text-[10px]">
                        {config.icon} {config.label}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{conn.category}</p>
                  </div>
                </div>

                <div className="px-4 pb-3">
                  <p className="text-sm text-muted-foreground">{conn.description}</p>
                </div>

                <div className="flex items-center justify-between border-t border-border bg-secondary/30 px-4 py-2.5">
                  <span className="text-[10px] text-muted-foreground">
                    {conn.lastSync ? `Synced ${formatRelativeTime(conn.lastSync)}` : 'Never synced'}
                  </span>
                  <div className="flex items-center gap-1">
                    {conn.status === 'connected' ? (
                      <>
                        <button className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground" title="Refresh">
                          <RefreshCw className="h-3.5 w-3.5" />
                        </button>
                        <button className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground" title="Settings">
                          <Settings className="h-3.5 w-3.5" />
                        </button>
                      </>
                    ) : (
                      <Button size="sm" variant="secondary" className="text-xs h-7">
                        {conn.status === 'error' ? 'Reconnect' : 'Connect'}
                      </Button>
                    )}
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

export default ConnectorsPage
