import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

function VerifyEmailPage() {
  const navigate = useNavigate()
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = async () => {
    const fullCode = code.join('')
    if (fullCode.length !== 6) {
      toast.error('Please enter the full 6-digit code')
      return
    }
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsLoading(false)
    toast.success('Email verified successfully!')
    navigate('/dashboard')
  }

  const handleResend = async () => {
    setIsResending(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsResending(false)
    toast.success('Verification code resent!')
  }

  return (
    <div className="animate-fade-in text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <Mail className="h-8 w-8 text-primary" />
      </div>
      <h2 className="text-2xl font-bold">Check your email</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        We sent a 6-digit verification code to your email address.
      </p>

      <div className="mt-8 flex justify-center gap-2">
        {code.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="h-12 w-12 rounded-lg border border-border bg-input text-center text-lg font-bold text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
          />
        ))}
      </div>

      <Button className="mt-8 w-full" onClick={handleVerify} isLoading={isLoading}>
        Verify Email
      </Button>

      <p className="mt-4 text-sm text-muted-foreground">
        Didn&apos;t receive the code?{' '}
        <button
          onClick={handleResend}
          disabled={isResending}
          className="font-medium text-primary hover:underline disabled:opacity-50"
        >
          {isResending ? 'Sending...' : 'Resend'}
        </button>
      </p>

      <Link
        to="/auth/login"
        className="mt-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to login
      </Link>
    </div>
  )
}

export default VerifyEmailPage
