import { useState } from 'react'
import {
  Workflow,
  Search,
  Star,
  Download,
  Users,
  Tag,
  Filter,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { mockTemplates } from '@/lib/mock-data'

const moduleColors: Record<string, { bg: string; text: string }> = {
  projects: { bg: 'bg-primary/10', text: 'text-primary' },
  content: { bg: 'bg-accent/10', text: 'text-accent' },
  finance: { bg: 'bg-success/10', text: 'text-success' },
  health: { bg: 'bg-warning/10', text: 'text-warning' },
}

function WorkflowsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterModule, setFilterModule] = useState<string>('all')

  const filteredTemplates = mockTemplates.filter((tmpl) => {
    const matchesSearch = tmpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tmpl.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesModule = filterModule === 'all' || tmpl.module === filterModule
    return matchesSearch && matchesModule
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Workflow className="h-6 w-6 text-accent" />
            Workflow Templates
          </h1>
          <p className="text-sm text-muted-foreground">Reusable multi-agent workflow templates</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search templates..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {['all', 'projects', 'content', 'finance', 'health'].map((mod) => (
            <button
              key={mod}
              onClick={() => setFilterModule(mod)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                filterModule === mod ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              {mod === 'all' ? 'All' : mod.charAt(0).toUpperCase() + mod.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredTemplates.map((tmpl, i) => {
          const modColor = moduleColors[tmpl.module]
          return (
            <Card
              key={tmpl.id}
              className="group overflow-hidden hover:shadow-card-hover hover:translate-y-[-2px] transition-all duration-300"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <CardContent className="p-0">
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', modColor.bg, modColor.text)}>
                      <Workflow className="h-5 w-5" />
                    </div>
                    <div className="flex items-center gap-1 text-warning">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span className="text-xs font-medium">{tmpl.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-semibold">{tmpl.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{tmpl.description}</p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {tmpl.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[10px]">
                        <Tag className="mr-0.5 h-2.5 w-2.5" /> {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border bg-secondary/30 px-5 py-3">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" /> {tmpl.usageCount.toLocaleString()} uses
                    </span>
                    <Badge variant="secondary" className="text-[10px]">{tmpl.category}</Badge>
                  </div>
                  <Button size="sm" variant="secondary" className="gap-1 text-xs">
                    <Download className="h-3 w-3" /> Use
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default WorkflowsPage
