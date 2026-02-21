import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Bell, Plus, Building2, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { mockNotifications } from '@/lib/mock-data'

function TopNav() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isNotifOpen, setIsNotifOpen] = useState(false)
  const unreadCount = mockNotifications.filter((n) => !n.read).length

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-md px-6">
      <div className="flex items-center gap-4">
        {isSearchOpen ? (
          <div className="flex items-center gap-2 animate-scale-in">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search agents, cronjobs, runs..."
              className="w-80 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              autoFocus
            />
            <button onClick={() => setIsSearchOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/80"
          >
            <Search className="h-4 w-4" />
            <span className="hidden md:inline">Search...</span>
            <kbd className="hidden rounded bg-background px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground md:inline">
              ⌘K
            </kbd>
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Quick Create</span>
        </Button>

        <button className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <Building2 className="h-4 w-4" />
          <span className="hidden md:inline">Acme Corp</span>
        </button>

        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {unreadCount}
              </span>
            ) : null}
          </button>

          {isNotifOpen ? (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-border bg-card shadow-lg animate-scale-in">
              <div className="flex items-center justify-between border-b border-border p-4">
                <h3 className="text-sm font-semibold">Notifications</h3>
                <button className="text-xs text-primary hover:underline">Mark all read</button>
              </div>
              <div className="max-h-80 overflow-y-auto scrollbar-thin">
                {mockNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={cn(
                      'flex gap-3 border-b border-border p-4 transition-colors hover:bg-muted/50',
                      !notif.read && 'bg-primary/5'
                    )}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{notif.title}</p>
                        <Badge
                          variant={
                            notif.type === 'error' ? 'destructive' :
                            notif.type === 'warning' ? 'warning' :
                            notif.type === 'success' ? 'success' : 'secondary'
                          }
                        >
                          {notif.type}
                        </Badge>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">{notif.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-border p-3 text-center">
                <Link to="/dashboard/settings" className="text-xs text-primary hover:underline" onClick={() => setIsNotifOpen(false)}>
                  View all notifications
                </Link>
              </div>
            </div>
          ) : null}
        </div>

        <Link to="/dashboard/profile" className="transition-transform hover:scale-105">
          <Avatar name="Alex Chen" size="sm" />
        </Link>
      </div>
    </header>
  )
}

export { TopNav }
