import {
  User,
  Key,
  Shield,
  Plug,
  Copy,
  Eye,
  EyeOff,
  Plus,
  Trash2,
} from 'lucide-react'
import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { toast } from 'sonner'

const apiKeys = [
  { id: 'key-1', name: 'Production', prefix: 'lo_prod_****7f3a', created: '2026-01-15', lastUsed: '2026-02-21' },
  { id: 'key-2', name: 'Development', prefix: 'lo_dev_****2b1c', created: '2026-02-01', lastUsed: '2026-02-20' },
]

const connections = [
  { name: 'Google', connected: true, email: 'alex@gmail.com' },
  { name: 'GitHub', connected: true, email: 'alexchen' },
  { name: 'Microsoft', connected: false, email: null },
]

function ProfilePage() {
  const [showKey, setShowKey] = useState<string | null>(null)

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">User Profile</h1>
        <p className="text-sm text-muted-foreground">Manage your personal settings and API keys</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar name="Alex Chen" size="lg" />
                <div>
                  <Button variant="secondary" size="sm">Change Avatar</Button>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Full Name</label>
                  <Input defaultValue="Alex Chen" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Email</label>
                  <Input defaultValue="alex@lifeops.ai" type="email" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Role</label>
                  <Input defaultValue="Admin" disabled />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Timezone</label>
                  <Input defaultValue="America/New_York" />
                </div>
              </div>
              <Button onClick={() => toast.success('Profile updated')}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="connections">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plug className="h-5 w-5 text-accent" />
                Connected Accounts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {connections.map((conn) => (
                  <div key={conn.name} className="flex items-center justify-between rounded-lg border border-border p-4 transition-all hover:bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground font-bold text-sm">
                        {conn.name[0]}
                      </div>
                      <div>
                        <p className="font-medium">{conn.name}</p>
                        {conn.email ? (
                          <p className="text-xs text-muted-foreground">{conn.email}</p>
                        ) : null}
                      </div>
                    </div>
                    {conn.connected ? (
                      <Badge variant="success">Connected</Badge>
                    ) : (
                      <Button variant="secondary" size="sm">Connect</Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api-keys">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-warning" />
                API Keys
              </CardTitle>
              <Button size="sm" className="gap-1">
                <Plus className="h-3 w-3" /> New Key
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {apiKeys.map((key) => (
                  <div key={key.id} className="flex items-center justify-between rounded-lg border border-border p-4 transition-all hover:bg-muted/50">
                    <div>
                      <p className="font-medium">{key.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="text-xs font-mono text-muted-foreground">
                          {showKey === key.id ? 'lo_prod_8f2a3b1c7d4e5f6a7b8c9d0e1f2a3b4c5d6e7f3a' : key.prefix}
                        </code>
                        <button onClick={() => setShowKey(showKey === key.id ? null : key.id)} className="text-muted-foreground hover:text-foreground">
                          {showKey === key.id ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </button>
                        <button onClick={() => toast.success('Copied to clipboard')} className="text-muted-foreground hover:text-foreground">
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1">Created {key.created} &middot; Last used {key.lastUsed}</p>
                    </div>
                    <Button variant="ghost" size="icon-sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-success" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground mb-3">Add an extra layer of security to your account.</p>
                <Button variant="secondary">Enable 2FA</Button>
              </div>
              <div className="border-t border-border pt-6">
                <h3 className="font-medium mb-2">Change Password</h3>
                <div className="space-y-3 max-w-sm">
                  <Input type="password" placeholder="Current password" />
                  <Input type="password" placeholder="New password" />
                  <Input type="password" placeholder="Confirm new password" />
                  <Button onClick={() => toast.success('Password updated')}>Update Password</Button>
                </div>
              </div>
              <div className="border-t border-border pt-6">
                <h3 className="font-medium mb-2">Active Sessions</h3>
                <div className="rounded-lg border border-border p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Current Session</p>
                      <p className="text-xs text-muted-foreground">Chrome on macOS &middot; New York, US</p>
                    </div>
                    <Badge variant="success">Active</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ProfilePage
