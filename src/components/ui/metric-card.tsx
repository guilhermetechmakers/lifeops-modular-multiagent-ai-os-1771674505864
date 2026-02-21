import { type ReactNode } from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'

interface MetricCardProps {
  label: string
  value: string | number
  change?: number
  changeLabel?: string
  trend?: 'up' | 'down' | 'neutral'
  icon?: ReactNode
  accentColor?: 'orange' | 'green' | 'purple'
  className?: string
}

function MetricCard({
  label,
  value,
  change,
  changeLabel,
  trend = 'neutral',
  icon,
  accentColor = 'orange',
  className,
}: MetricCardProps) {
  const accentClasses = {
    orange: 'from-primary/20 to-transparent border-l-primary',
    green: 'from-success/20 to-transparent border-l-success',
    purple: 'from-accent/20 to-transparent border-l-accent',
  }

  const trendIcon = {
    up: <TrendingUp className="h-3 w-3" />,
    down: <TrendingDown className="h-3 w-3" />,
    neutral: <Minus className="h-3 w-3" />,
  }

  const trendColor = {
    up: 'text-success',
    down: 'text-destructive',
    neutral: 'text-muted-foreground',
  }

  return (
    <Card
      className={cn(
        'relative overflow-hidden border-l-4 hover:shadow-card-hover hover:translate-y-[-2px] transition-all duration-300',
        accentClasses[accentColor],
        className
      )}
    >
      <div className={cn('absolute inset-0 bg-gradient-to-r opacity-50', accentClasses[accentColor])} />
      <div className="relative p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          {icon ? (
            <div className="text-muted-foreground">{icon}</div>
          ) : null}
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {change !== undefined ? (
            <span className={cn('flex items-center gap-0.5 text-xs font-medium', trendColor[trend])}>
              {trendIcon[trend]}
              {change > 0 ? '+' : ''}{change}%
              {changeLabel ? <span className="text-muted-foreground ml-1">{changeLabel}</span> : null}
            </span>
          ) : null}
        </div>
      </div>
    </Card>
  )
}

export { MetricCard }
