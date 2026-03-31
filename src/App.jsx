import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { UpgradeModalProvider } from './context/UpgradeModalContext'
import Landing from './pages/Landing'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Onboarding from './pages/onboarding/Onboarding'
import Dashboard from './pages/dashboard/Dashboard'

// Redirects to onboarding if incomplete, dashboard if done, login if not authed
function ProtectedRoute({ children }) {
  const { session, profile, loading } = useAuth()
  if (loading) return <AppLoader />
  if (!session) return <Navigate to="/login" replace />
  if (profile?.onboarding_step) return <Navigate to={`/onboarding/${profile.onboarding_step}`} replace />
  return children
}

// Redirects authed users away from login/signup
function PublicRoute({ children }) {
  const { session, profile, loading } = useAuth()
  if (loading) return <AppLoader />
  if (session && profile) {
    if (profile.onboarding_step) return <Navigate to={`/onboarding/${profile.onboarding_step}`} replace />
    return <Navigate to="/dashboard" replace />
  }
  return children
}

function OnboardingRoute({ step, children }) {
  const { session, profile, loading } = useAuth()
  if (loading) return <AppLoader />
  if (!session) return <Navigate to="/login" replace />
  // If onboarding complete, go to dashboard
  if (profile && !profile.onboarding_step) return <Navigate to="/dashboard" replace />
  // If on wrong step, redirect to correct step
  if (profile && profile.onboarding_step !== step) return <Navigate to={`/onboarding/${profile.onboarding_step}`} replace />
  return children
}

function AppLoader() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#e5e7eb] border-t-[#1a1a1a] rounded-full animate-spin" />
        <span className="text-[13px] text-[#9ca3af]">Loading…</span>
      </div>
    </div>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
      <Route path="/onboarding/1" element={<OnboardingRoute step={1}><Onboarding step={1} /></OnboardingRoute>} />
      <Route path="/onboarding/2" element={<OnboardingRoute step={2}><Onboarding step={2} /></OnboardingRoute>} />
      <Route path="/onboarding/3" element={<OnboardingRoute step={3}><Onboarding step={3} /></OnboardingRoute>} />
      <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UpgradeModalProvider>
          <AppRoutes />
        </UpgradeModalProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
