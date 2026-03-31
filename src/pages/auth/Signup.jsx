import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function Signup() {
  const { state } = useLocation()
  const [email, setEmail] = useState(state?.email ?? '')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/onboarding/1` },
      })
      if (error) setError(error.message)
      else setDone(true)
    } catch (err) {
      setError(`Network error: ${err.message} — URL: ${import.meta.env.VITE_SUPABASE_URL}`)
    }
    setLoading(false)
  }

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/onboarding/1` },
    })
  }

  if (done) {
    return (
      <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="w-12 h-12 rounded-full bg-[#d1fae5] flex items-center justify-center mx-auto mb-4">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10l4 4 8-8" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-[22px] font-black tracking-[-0.03em] text-[#1a1a1a] mb-2">Check your email</h2>
          <p className="text-[13px] text-[#6b6b6b] leading-relaxed">
            We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account and get started.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link to="/" className="text-[18px] font-black tracking-[-0.03em] text-[#1a1a1a]">
            CollegeConnekt
          </Link>
          <h1 className="mt-6 text-[24px] font-black tracking-[-0.04em] text-[#1a1a1a]">Create your account</h1>
          <p className="mt-1.5 text-[13px] text-[#6b6b6b]">Free to start. No card required.</p>
        </div>

        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-7">
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 border border-[#e5e7eb] rounded-lg text-[13px] font-semibold text-[#1a1a1a] hover:bg-[#f9fafb] transition-colors mb-5"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M15.68 8.18c0-.57-.05-1.11-.14-1.64H8v3.1h4.3a3.67 3.67 0 01-1.59 2.41v2h2.58c1.5-1.39 2.38-3.43 2.38-5.87z" fill="#4285F4"/>
              <path d="M8 16c2.16 0 3.97-.72 5.3-1.95l-2.59-2a4.77 4.77 0 01-7.1-2.5H1v2.07A8 8 0 008 16z" fill="#34A853"/>
              <path d="M3.61 9.55A4.8 4.8 0 013.36 8c0-.54.09-1.07.25-1.55V4.38H1A8 8 0 000 8c0 1.3.31 2.52.86 3.62l2.75-2.07z" fill="#FBBC05"/>
              <path d="M8 3.18c1.22 0 2.31.42 3.17 1.24l2.38-2.38A7.97 7.97 0 008 0 8 8 0 001 4.38l2.75 2.07A4.77 4.77 0 018 3.18z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-[#e5e7eb]" />
            <span className="text-[11px] text-[#9ca3af]">or</span>
            <div className="flex-1 h-px bg-[#e5e7eb]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-widest mb-1.5">Email</label>
              <input
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                className="w-full border border-[#e5e7eb] rounded-lg px-3.5 py-2.5 text-[13px] text-[#1a1a1a] placeholder-[#9ca3af] outline-none focus:border-[#1a1a1a] transition-colors"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-widest mb-1.5">Password</label>
              <input
                type="password" required minLength={8} value={password} onChange={e => setPassword(e.target.value)}
                className="w-full border border-[#e5e7eb] rounded-lg px-3.5 py-2.5 text-[13px] text-[#1a1a1a] placeholder-[#9ca3af] outline-none focus:border-[#1a1a1a] transition-colors"
                placeholder="Min. 8 characters"
              />
            </div>

            {error && <p className="text-[12px] text-red-500">{error}</p>}

            <button
              type="submit" disabled={loading}
              className="w-full py-2.5 bg-[#1a1a1a] text-white text-[13px] font-semibold rounded-lg hover:bg-[#2563eb] transition-colors disabled:opacity-50 mt-1"
            >
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>
        </div>

        <p className="mt-5 text-center text-[12px] text-[#6b6b6b]">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-[#1a1a1a] hover:text-[#2563eb] transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
