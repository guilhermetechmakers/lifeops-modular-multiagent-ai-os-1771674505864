import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
        <p className="relative text-[120px] font-bold leading-none gradient-text">404</p>
      </div>
      <h1 className="text-2xl font-bold">Page Not Found</h1>
      <p className="mt-2 max-w-md text-center text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
      </p>
      <div className="mt-8 flex gap-3">
        <Link to="/">
          <Button variant="secondary" className="gap-2">
            <Home className="h-4 w-4" /> Home
          </Button>
        </Link>
        <Link to="/dashboard">
          <Button className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
