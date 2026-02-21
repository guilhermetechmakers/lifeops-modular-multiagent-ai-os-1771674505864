import { Link } from 'react-router-dom'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

function ErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-destructive/10 blur-3xl rounded-full" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-12 w-12 text-destructive" />
        </div>
      </div>
      <h1 className="text-2xl font-bold">Something Went Wrong</h1>
      <p className="mt-2 max-w-md text-center text-muted-foreground">
        An unexpected error occurred. Our team has been notified and is working on a fix.
        Please try again or contact support if the issue persists.
      </p>
      <div className="mt-8 flex gap-3">
        <Button variant="secondary" className="gap-2" onClick={() => window.location.reload()}>
          <RefreshCw className="h-4 w-4" /> Try Again
        </Button>
        <Link to="/">
          <Button className="gap-2">
            <Home className="h-4 w-4" /> Go Home
          </Button>
        </Link>
      </div>
      <p className="mt-8 text-xs text-muted-foreground">
        Error Code: 500 &middot; <a href="mailto:support@lifeops.ai" className="text-primary hover:underline">Contact Support</a>
      </p>
    </div>
  )
}

export default ErrorPage
