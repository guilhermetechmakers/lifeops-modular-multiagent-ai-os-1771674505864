import {
  Building2,
  Users,
  Shield,
  CreditCard,
  Plus,
  MoreVertical,
  Crown,
  UserCheck,
  Eye,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
const teamMembers = [
  { name: 'Alex Chen', email: 'alex@lifeops.ai', role: 'admin', status: 'active', lastActive: '2 min ago' },
  { name: 'Sarah Kim', email: 'sarah@lifeops.ai', role: 'member', status: 'active', lastActive: '1h ago' },
  { name: 'James Wilson', email: 'james@lifeops.ai', role: 'member', status: 'active', lastActive: '3h ago' },
  { name: 'Maria Garcia', email: 'maria@lifeops.ai', role: 'viewer', status: 'invited', lastActive: 'Never' },
]

const roleIcons: Record<string, React.ReactNode> = {
  admin: <Crown className="h-3 w-3" />,
  member: <UserCheck className="h-3 w-3" />,
  viewer: <Eye className="h-3 w-3" />,
}

function OrgSettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Building2 className="h-6 w-6 text-primary" />
          Organization Settings
        </h1>
        <p className="text-sm text-muted-foreground">Manage teams, RBAC, billing, and enterprise config</p>
      </div>

      <Tabs defaultValue="team">
        <TabsList>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="rbac">RBAC Policies</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
        </TabsList>

        <TabsContent value="team">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" />
                Team Members
              </CardTitle>
              <Button size="sm" className="gap-1">
                <Plus className="h-3 w-3" /> Invite
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {teamMembers.map((member) => (
                  <div key={member.email} className="flex items-center gap-3 rounded-lg border border-border p-4 transition-all hover:bg-muted/50">
                    <Avatar name={member.name} size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{member.name}</p>
                        <Badge variant={member.role === 'admin' ? 'default' : 'secondary'} className="gap-1 text-[10px]">
                          {roleIcons[member.role]} {member.role}
                        </Badge>
                        {member.status === 'invited' ? (
                          <Badge variant="warning" className="text-[10px]">Invited</Badge>
                        ) : null}
                      </div>
                      <p className="text-xs text-muted-foreground">{member.email}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{member.lastActive}</span>
                    <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rbac">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-success" />
                Role-Based Access Control
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { role: 'Admin', permissions: ['Full access', 'Manage team', 'Billing', 'RBAC config', 'Delete agents'], color: 'border-l-primary' },
                  { role: 'Member', permissions: ['Create agents', 'Run cronjobs', 'Approve actions', 'View audit logs'], color: 'border-l-accent' },
                  { role: 'Viewer', permissions: ['View dashboards', 'View audit logs', 'View run details'], color: 'border-l-muted-foreground' },
                ].map((policy) => (
                  <div key={policy.role} className={`rounded-lg border border-border border-l-4 ${policy.color} p-4`}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{policy.role}</h3>
                      <Button variant="ghost" size="sm" className="text-xs">Edit</Button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {policy.permissions.map((perm) => (
                        <Badge key={perm} variant="secondary" className="text-[10px]">{perm}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-warning" />
                Billing & Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Badge variant="default">Pro Plan</Badge>
                    <p className="mt-1 text-2xl font-bold">$49<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                  </div>
                  <Button variant="secondary" size="sm">Upgrade</Button>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-border p-4">
                  <p className="text-xs text-muted-foreground">Runs This Month</p>
                  <p className="text-2xl font-bold">2,847</p>
                  <p className="text-xs text-muted-foreground">of 5,000</p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-xs text-muted-foreground">Agents</p>
                  <p className="text-2xl font-bold">6</p>
                  <p className="text-xs text-muted-foreground">Unlimited</p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-xs text-muted-foreground">Team Seats</p>
                  <p className="text-2xl font-bold">4</p>
                  <p className="text-xs text-muted-foreground">of 10</p>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Payment Method</h3>
                <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">Visa ending in 4242</span>
                  <Button variant="ghost" size="sm" className="ml-auto text-xs">Update</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="enterprise">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-accent" />
                Enterprise Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-medium mb-1">SAML SSO</h3>
                <p className="text-sm text-muted-foreground mb-3">Configure SAML-based single sign-on for your organization.</p>
                <Button variant="secondary" size="sm">Configure SAML</Button>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-medium mb-1">On-Premise Runners</h3>
                <p className="text-sm text-muted-foreground mb-3">Deploy agent runners in your own infrastructure for data sovereignty.</p>
                <Button variant="secondary" size="sm">Setup Runners</Button>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-medium mb-1">Custom Domain</h3>
                <p className="text-sm text-muted-foreground mb-3">Use your own domain for the LifeOps dashboard.</p>
                <Input placeholder="ops.yourcompany.com" className="max-w-sm mb-3" />
                <Button variant="secondary" size="sm">Verify Domain</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default OrgSettingsPage
