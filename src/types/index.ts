export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'admin' | 'member' | 'viewer'
  createdAt: string
}

export interface Agent {
  id: string
  name: string
  type: 'system' | 'user'
  module: ModuleType
  status: 'active' | 'idle' | 'error' | 'archived'
  capabilities: string[]
  memoryScope: string
  connectors: string[]
  lastActive: string
  runsCompleted: number
}

export type ModuleType = 'projects' | 'content' | 'finance' | 'health'

export type AutomationLevel = 'suggest-only' | 'approval-required' | 'conditional-auto' | 'bounded-autopilot'

export type CronjobStatus = 'active' | 'paused' | 'error' | 'completed'

export interface Cronjob {
  id: string
  name: string
  description: string
  schedule: string
  module: ModuleType
  automationLevel: AutomationLevel
  status: CronjobStatus
  nextRun: string
  lastRun?: string
  lastOutcome?: 'success' | 'failure' | 'skipped'
  agentId: string
  constraints: CronjobConstraints
  runsCount: number
}

export interface CronjobConstraints {
  maxActions: number
  spendLimit?: number
  allowedTools: string[]
  requireApproval: boolean
}

export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'modified'

export interface Approval {
  id: string
  title: string
  description: string
  module: ModuleType
  agentName: string
  cronjobId?: string
  status: ApprovalStatus
  priority: 'low' | 'medium' | 'high' | 'critical'
  createdAt: string
  slaDeadline: string
  diffs?: ActionDiff[]
}

export interface ActionDiff {
  type: 'added' | 'removed' | 'modified'
  path: string
  before?: string
  after?: string
}

export type RunStatus = 'running' | 'completed' | 'failed' | 'cancelled' | 'pending'

export interface Run {
  id: string
  cronjobId: string
  cronjobName: string
  module: ModuleType
  status: RunStatus
  startedAt: string
  completedAt?: string
  duration?: number
  actionsCount: number
  agentName: string
  artifacts: Artifact[]
}

export interface Artifact {
  id: string
  name: string
  type: 'diff' | 'log' | 'report' | 'snapshot'
  size: number
  createdAt: string
}

export interface AuditEntry {
  id: string
  action: string
  actor: string
  module: ModuleType
  timestamp: string
  details: string
  severity: 'info' | 'warning' | 'error'
}

export interface Connector {
  id: string
  name: string
  category: string
  icon: string
  status: 'connected' | 'disconnected' | 'error'
  description: string
  lastSync?: string
}

export interface MetricCard {
  label: string
  value: string | number
  change?: number
  changeLabel?: string
  trend?: 'up' | 'down' | 'neutral'
}

export interface WorkflowTemplate {
  id: string
  name: string
  description: string
  module: ModuleType
  category: string
  rating: number
  usageCount: number
  agents: string[]
  tags: string[]
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: string
}
