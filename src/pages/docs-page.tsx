import { Link } from 'react-router-dom'
import {
  Search,
  Code,
  Zap,
  Bot,
  Clock,
  Shield,
  Plug,
  ArrowRight,
  ExternalLink,
  FileText,
  Video,
  MessageSquare,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

const categories = [
  { icon: <Zap className="h-5 w-5" />, title: 'Getting Started', description: 'Quick start guide and onboarding', articles: 8, color: 'text-primary bg-primary/10' },
  { icon: <Bot className="h-5 w-5" />, title: 'Agent Configuration', description: 'Create and manage AI agents', articles: 12, color: 'text-accent bg-accent/10' },
  { icon: <Clock className="h-5 w-5" />, title: 'Cronjobs & Scheduling', description: 'Set up automated workflows', articles: 10, color: 'text-success bg-success/10' },
  { icon: <Shield className="h-5 w-5" />, title: 'Security & RBAC', description: 'Permissions, audit, and compliance', articles: 7, color: 'text-warning bg-warning/10' },
  { icon: <Plug className="h-5 w-5" />, title: 'Integrations', description: 'Connect external services', articles: 15, color: 'text-primary bg-primary/10' },
  { icon: <Code className="h-5 w-5" />, title: 'API Reference', description: 'REST & gRPC API documentation', articles: 20, color: 'text-accent bg-accent/10' },
]

const tutorials = [
  { title: 'Build Your First Agent', duration: '15 min', type: 'Tutorial', icon: <FileText className="h-4 w-4" /> },
  { title: 'Setting Up PR Auto-Triage', duration: '10 min', type: 'Video', icon: <Video className="h-4 w-4" /> },
  { title: 'Monthly Close Automation', duration: '20 min', type: 'Tutorial', icon: <FileText className="h-4 w-4" /> },
  { title: 'Custom Connector Development', duration: '25 min', type: 'Tutorial', icon: <FileText className="h-4 w-4" /> },
]

function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">LifeOps</span>
            <Badge variant="secondary">Docs</Badge>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">Dashboard</Button>
            </Link>
            <Link to="/auth/login">
              <Button size="sm">Sign In</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h1 className="text-4xl font-bold">Documentation</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to build, configure, and scale with LifeOps.
          </p>
          <div className="relative mt-8 max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search documentation..." className="pl-9 h-12" />
          </div>
        </div>

        {/* Categories */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {categories.map((cat) => (
            <Card key={cat.title} className="group hover:shadow-card-hover hover:translate-y-[-2px] transition-all duration-300 cursor-pointer">
              <CardContent className="flex items-start gap-4 p-5">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${cat.color}`}>
                  {cat.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{cat.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">{cat.articles} articles</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tutorials */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Popular Tutorials</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {tutorials.map((tut) => (
              <div key={tut.title} className="flex items-center gap-3 rounded-xl border border-border p-4 transition-all hover:bg-muted/50 hover:border-primary/30 cursor-pointer">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  {tut.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{tut.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant="secondary" className="text-[10px]">{tut.type}</Badge>
                    <span className="text-[10px] text-muted-foreground">{tut.duration}</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>

        {/* Support */}
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <MessageSquare className="mx-auto h-8 w-8 text-primary mb-4" />
          <h2 className="text-xl font-bold">Need Help?</h2>
          <p className="mt-2 text-muted-foreground">
            Can&apos;t find what you&apos;re looking for? Our support team is here to help.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="secondary">
              <MessageSquare className="mr-2 h-4 w-4" /> Contact Support
            </Button>
            <Button variant="secondary">
              <ExternalLink className="mr-2 h-4 w-4" /> Community Forum
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocsPage
