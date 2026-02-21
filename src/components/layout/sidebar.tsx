import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Bot,
  FolderKanban,
  FileText,
  DollarSign,
  Heart,
  Clock,
  Workflow,
  CheckSquare,
  Plug,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  icon: React.ReactNode
  path: string
  badge?: string
}

const mainNav: NavItem[] = [
  { label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, path: '/dashboard' },
  { label: 'Agents', icon: <Bot className="h-5 w-5" />, path: '/dashboard/agents' },
]

const moduleNav: NavItem[] = [
  { label: 'Projects', icon: <FolderKanban className="h-5 w-5" />, path: '/dashboard/projects' },
  { label: 'Content', icon: <FileText className="h-5 w-5" />, path: '/dashboard/content' },
  { label: 'Finance', icon: <DollarSign className="h-5 w-5" />, path: '/dashboard/finance' },
  { label: 'Health', icon: <Heart className="h-5 w-5" />, path: '/dashboard/health' },
]

const automationNav: NavItem[] = [
  { label: 'Cronjobs', icon: <Clock className="h-5 w-5" />, path: '/dashboard/cronjobs' },
  { label: 'Workflows', icon: <Workflow className="h-5 w-5" />, path: '/dashboard/workflows' },
  { label: 'Approvals', icon: <CheckSquare className="h-5 w-5" />, path: '/dashboard/approvals', badge: '4' },
]

const systemNav: NavItem[] = [
  { label: 'Connectors', icon: <Plug className="h-5 w-5" />, path: '/dashboard/connectors' },
  { label: 'Settings', icon: <Settings className="h-5 w-5" />, path: '/dashboard/settings' },
]

function NavSection({ title, items, isCollapsed }: { title: string; items: NavItem[]; isCollapsed: boolean }) {
  const location = useLocation()

  return (
    <div className="mb-4">
      {!isCollapsed ? (
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </p>
      ) : (
        <div className="mb-2 mx-3 h-px bg-border" />
      )}
      <nav className="flex flex-col gap-1">
        {items.map((item) => {
          const isActive = location.pathname === item.path ||
            (item.path !== '/dashboard' && location.pathname.startsWith(item.path))

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-sidebar-accent text-foreground'
                  : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground',
                isCollapsed && 'justify-center px-2'
              )}
              title={isCollapsed ? item.label : undefined}
            >
              {isActive ? (
                <div className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />
              ) : null}
              <span className={cn(isActive && 'text-primary')}>{item.icon}</span>
              {!isCollapsed ? (
                <>
                  <span>{item.label}</span>
                  {item.badge ? (
                    <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary/10 px-1.5 text-[10px] font-bold text-primary">
                      {item.badge}
                    </span>
                  ) : null}
                </>
              ) : null}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-30 flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300',
        isCollapsed ? 'w-[68px]' : 'w-[240px]'
      )}
    >
      <div className={cn('flex h-16 items-center border-b border-sidebar-border px-4', isCollapsed && 'justify-center px-2')}>
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          {!isCollapsed ? (
            <span className="text-lg font-bold text-foreground">LifeOps</span>
          ) : null}
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin px-2 py-4">
        <NavSection title="Overview" items={mainNav} isCollapsed={isCollapsed} />
        <NavSection title="Modules" items={moduleNav} isCollapsed={isCollapsed} />
        <NavSection title="Automation" items={automationNav} isCollapsed={isCollapsed} />
        <NavSection title="System" items={systemNav} isCollapsed={isCollapsed} />
      </div>

      <div className="border-t border-sidebar-border p-2">
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center rounded-lg p-2.5 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
    </aside>
  )
}

export { Sidebar }
export function useSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  return { isCollapsed, toggle: () => setIsCollapsed((prev) => !prev) }
}
