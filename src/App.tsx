import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { AuthLayout } from '@/components/layout/auth-layout'

const LandingPage = lazy(() => import('@/pages/landing/landing-page'))
const LoginPage = lazy(() => import('@/pages/auth/login-page'))
const SignupPage = lazy(() => import('@/pages/auth/signup-page'))
const VerifyEmailPage = lazy(() => import('@/pages/auth/verify-email-page'))
const ResetPasswordPage = lazy(() => import('@/pages/auth/reset-password-page'))

const OverviewPage = lazy(() => import('@/pages/dashboard/overview-page'))
const AgentsPage = lazy(() => import('@/pages/dashboard/agents-page'))
const ProjectsPage = lazy(() => import('@/pages/dashboard/modules/projects-page'))
const ContentPage = lazy(() => import('@/pages/dashboard/modules/content-page'))
const FinancePage = lazy(() => import('@/pages/dashboard/modules/finance-page'))
const HealthPage = lazy(() => import('@/pages/dashboard/modules/health-page'))
const CronjobsPage = lazy(() => import('@/pages/dashboard/cronjobs-page'))
const WorkflowsPage = lazy(() => import('@/pages/dashboard/workflows-page'))
const ApprovalsPage = lazy(() => import('@/pages/dashboard/approvals-page'))
const RunDetailsPage = lazy(() => import('@/pages/dashboard/run-details-page'))
const ConnectorsPage = lazy(() => import('@/pages/dashboard/connectors-page'))
const SettingsPage = lazy(() => import('@/pages/dashboard/settings-page'))
const ProfilePage = lazy(() => import('@/pages/dashboard/profile-page'))
const OrgSettingsPage = lazy(() => import('@/pages/dashboard/org-settings-page'))
const AdminPage = lazy(() => import('@/pages/dashboard/admin-page'))

const DocsPage = lazy(() => import('@/pages/docs-page'))
const LegalPage = lazy(() => import('@/pages/legal-page'))
const NotFoundPage = lazy(() => import('@/pages/not-found-page'))
const ErrorPage = lazy(() => import('@/pages/error-page'))

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/privacy" element={<LegalPage />} />
          <Route path="/terms" element={<LegalPage />} />
          <Route path="/cookies" element={<LegalPage />} />
          <Route path="/error" element={<ErrorPage />} />

          {/* Auth */}
          <Route element={<AuthLayout />}>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/signup" element={<SignupPage />} />
            <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
            <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
          </Route>

          {/* Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<OverviewPage />} />
            <Route path="agents" element={<AgentsPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="content" element={<ContentPage />} />
            <Route path="finance" element={<FinancePage />} />
            <Route path="health" element={<HealthPage />} />
            <Route path="cronjobs" element={<CronjobsPage />} />
            <Route path="workflows" element={<WorkflowsPage />} />
            <Route path="approvals" element={<ApprovalsPage />} />
            <Route path="runs/:runId" element={<RunDetailsPage />} />
            <Route path="connectors" element={<ConnectorsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="org" element={<OrgSettingsPage />} />
            <Route path="admin" element={<AdminPage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'rgb(35 35 38)',
            border: '1px solid rgb(55 55 60)',
            color: 'rgb(229 231 235)',
          },
        }}
      />
    </BrowserRouter>
  )
}

export default App
