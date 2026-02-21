import { Outlet } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Sidebar, useSidebar } from '@/components/layout/sidebar'
import { TopNav } from '@/components/layout/top-nav'

function DashboardLayout() {
  const { isCollapsed, toggle } = useSidebar()

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isCollapsed={isCollapsed} onToggle={toggle} />
      <div
        className={cn(
          'flex min-h-screen flex-col transition-all duration-300',
          isCollapsed ? 'ml-[68px]' : 'ml-[240px]'
        )}
      >
        <TopNav />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export { DashboardLayout }
