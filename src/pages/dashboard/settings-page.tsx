import {
  Settings,
  Bell,
  Bot,
  Database,
  Code,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

function ToggleSwitch({ enabled, label, description }: { enabled: boolean; label: string; description: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border p-4 transition-all hover:bg-muted/50">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <div className={cn(
        'relative h-6 w-11 rounded-full transition-colors cursor-pointer',
        enabled ? 'bg-primary' : 'bg-muted'
      )}>
        <div className={cn(
          'absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform',
          enabled ? 'translate-x-5' : 'translate-x-0.5'
        )} />
      </div>
    </div>
  )
}

function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="h-6 w-6 text-muted-foreground" />
          Settings & Preferences
        </h1>
        <p className="text-sm text-muted-foreground">Global app settings and defaults</p>
      </div>

      <Tabs defaultValue="notifications">
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="data">Data & Privacy</TabsTrigger>
          <TabsTrigger value="developer">Developer</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-warning" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ToggleSwitch enabled={true} label="Email Notifications" description="Receive email alerts for approvals and errors" />
              <ToggleSwitch enabled={true} label="In-App Notifications" description="Show notifications in the dashboard" />
              <ToggleSwitch enabled={false} label="Slack Notifications" description="Forward alerts to your Slack workspace" />
              <ToggleSwitch enabled={true} label="Approval Reminders" description="Get reminded about pending approvals before SLA" />
              <ToggleSwitch enabled={false} label="Weekly Digest" description="Receive a weekly summary of all automation activity" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                Automation Defaults
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Default Automation Level</label>
                <div className="flex gap-2">
                  {['suggest-only', 'approval-required', 'conditional-auto', 'bounded-autopilot'].map((level) => (
                    <Badge
                      key={level}
                      variant={level === 'approval-required' ? 'default' : 'secondary'}
                      className="cursor-pointer transition-colors hover:bg-primary/20"
                    >
                      {level}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Default Max Actions</label>
                  <Input type="number" defaultValue="50" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Default Spend Limit ($)</label>
                  <Input type="number" defaultValue="100" />
                </div>
              </div>
              <ToggleSwitch enabled={true} label="Require Approval for Destructive Actions" description="Always require human approval for delete, rollback, or financial operations" />
              <ToggleSwitch enabled={true} label="Auto-pause on Error" description="Pause cronjobs automatically after consecutive failures" />
              <Button onClick={() => toast.success('Automation defaults saved')}>Save Defaults</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-accent" />
                Data & Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Audit Log Retention</label>
                <div className="flex gap-2">
                  {['30 days', '90 days', '1 year', 'Forever'].map((period) => (
                    <Badge
                      key={period}
                      variant={period === '90 days' ? 'default' : 'secondary'}
                      className="cursor-pointer transition-colors hover:bg-primary/20"
                    >
                      {period}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Artifact Retention</label>
                <div className="flex gap-2">
                  {['30 days', '90 days', '1 year', 'Forever'].map((period) => (
                    <Badge
                      key={period}
                      variant={period === '1 year' ? 'default' : 'secondary'}
                      className="cursor-pointer transition-colors hover:bg-primary/20"
                    >
                      {period}
                    </Badge>
                  ))}
                </div>
              </div>
              <ToggleSwitch enabled={true} label="Immutable Audit Logs" description="Prevent deletion of audit log entries (recommended for compliance)" />
              <ToggleSwitch enabled={false} label="Export Data on Delete" description="Automatically export all data before account deletion" />
              <Button variant="destructive" onClick={() => toast.error('This action requires confirmation')}>
                Request Data Export
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="developer">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-success" />
                Developer Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">API Base URL</label>
                <Input defaultValue="https://api.lifeops.ai/v1" disabled />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Webhook URL</label>
                <Input placeholder="https://your-server.com/webhook" />
              </div>
              <ToggleSwitch enabled={false} label="Sandbox Mode" description="Use sandbox environment for testing (no real actions)" />
              <ToggleSwitch enabled={true} label="Verbose Logging" description="Include detailed debug information in run logs" />
              <Button onClick={() => toast.success('Developer settings saved')}>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SettingsPage
