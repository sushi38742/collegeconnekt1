import { useEffect, useState } from 'react'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import Overview from './panels/Overview'
import Schools from './panels/Schools'
import ActionPlan from './panels/ActionPlan'
import Essays from './panels/Essays'
import Compare from './panels/Compare'
import ProfilePanel from './panels/ProfilePanel'

function Skeleton({ className }) {
  return <div className={`animate-pulse bg-[#f3f4f6] rounded-lg ${className}`} />
}

const NAV = [
  { to: '', label: 'Overview', icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z' },
  { to: 'schools', label: 'My Schools', icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' },
  { to: 'plan', label: 'Action Plan', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  { to: 'essays', label: 'Essays', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
  { to: 'compare', label: 'Compare', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { to: 'profile', label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
]

export default function Dashboard() {
  const { session, profile } = useAuth()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    if (!session) return
    loadAll()
    // Realtime subscriptions
    const planSub = supabase
      .channel('action_plan_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'action_plan', filter: `user_id=eq.${session.user.id}` },
        () => loadAll())
      .subscribe()
    const fitSub = supabase
      .channel('fit_score_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'fit_scores', filter: `user_id=eq.${session.user.id}` },
        () => loadAll())
      .subscribe()
    return () => { supabase.removeChannel(planSub); supabase.removeChannel(fitSub) }
  }, [session])

  async function loadAll() {
    if (!session) return
    const uid = session.user.id
    const [profileRes, schoolsRes, planRes, deadlinesRes, activityRes] = await Promise.all([
      supabase.from('profiles').select('*, extracurriculars(*)').eq('id', uid).single(),
      supabase.from('saved_schools').select('*, school:schools(*), fit:fit_scores(*)').eq('user_id', uid),
      supabase.from('action_plan').select('*').eq('user_id', uid).order('priority'),
      supabase.from('school_deadlines')
        .select('*, school:schools(name)')
        .in('school_id', [])  // populated after schools load
        .gte('deadline', new Date().toISOString().slice(0, 10))
        .lte('deadline', new Date(Date.now() + 60 * 86400000).toISOString().slice(0, 10))
        .order('deadline'),
      supabase.from('activity_log').select('*').eq('user_id', uid).order('created_at', { ascending: false }).limit(10),
    ])

    // Fetch deadlines properly with school IDs
    const schoolIds = (schoolsRes.data ?? []).map(s => s.school_id)
    let deadlines = []
    if (schoolIds.length > 0) {
      const { data: dl } = await supabase
        .from('school_deadlines')
        .select('*, school:schools(name)')
        .in('school_id', schoolIds)
        .gte('deadline', new Date().toISOString().slice(0, 10))
        .lte('deadline', new Date(Date.now() + 60 * 86400000).toISOString().slice(0, 10))
        .order('deadline')
      deadlines = dl ?? []
    }

    setData({
      profile: profileRes.data,
      schools: schoolsRes.data ?? [],
      plan: planRes.data ?? [],
      deadlines,
      activity: activityRes.data ?? [],
    })
    setLoading(false)
  }

  async function signOut() {
    await supabase.auth.signOut()
    navigate('/')
  }

  const firstName = profile?.first_name ?? 'there'

  return (
    <div className="min-h-screen bg-[#f9fafb] flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-white border-r border-[#e5e7eb] fixed top-0 left-0 bottom-0 z-30">
        <div className="px-5 py-5 border-b border-[#f3f4f6]">
          <span className="text-[15px] font-black tracking-[-0.03em] text-[#1a1a1a]">CollegeConnekt</span>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-0.5">
          {NAV.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === ''}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                  isActive ? 'bg-[#f3f4f6] text-[#1a1a1a] font-semibold' : 'text-[#6b6b6b] hover:bg-[#f9fafb] hover:text-[#1a1a1a]'
                }`
              }
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d={icon} />
              </svg>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-[#f3f4f6]">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-7 h-7 rounded-full bg-[#1a1a1a] flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-bold text-white">
                {profile?.first_name?.[0]}{profile?.last_name?.[0]}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-semibold text-[#1a1a1a] truncate">{profile?.first_name} {profile?.last_name}</p>
              <p className="text-[10px] text-[#9ca3af] capitalize">{profile?.plan ?? 'free'} plan</p>
            </div>
          </div>
          <button onClick={signOut} className="w-full text-left text-[11px] text-[#9ca3af] hover:text-[#1a1a1a] transition-colors">
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-[#e5e7eb] px-4 py-3 flex items-center justify-between">
        <span className="text-[14px] font-black tracking-[-0.03em] text-[#1a1a1a]">CollegeConnekt</span>
        <button onClick={() => setMobileNavOpen(o => !o)} className="p-1">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 5h14M3 10h14M3 15h14" stroke="#1a1a1a" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Mobile nav drawer */}
      {mobileNavOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/30" onClick={() => setMobileNavOpen(false)}>
          <div className="absolute top-0 left-0 bottom-0 w-56 bg-white shadow-lg" onClick={e => e.stopPropagation()}>
            <div className="px-5 py-5 border-b border-[#f3f4f6]">
              <span className="text-[15px] font-black tracking-[-0.03em] text-[#1a1a1a]">CollegeConnekt</span>
            </div>
            <nav className="py-4 px-3 space-y-0.5">
              {NAV.map(({ to, label, icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === ''}
                  onClick={() => setMobileNavOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                      isActive ? 'bg-[#f3f4f6] text-[#1a1a1a] font-semibold' : 'text-[#6b6b6b] hover:bg-[#f9fafb]'
                    }`
                  }
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={icon} />
                  </svg>
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 md:ml-56 pt-14 md:pt-0">
        {loading ? (
          <div className="p-6 md:p-8 space-y-4 max-w-5xl mx-auto">
            <Skeleton className="h-8 w-48" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Skeleton className="h-32" /><Skeleton className="h-32" /><Skeleton className="h-32" />
            </div>
            <Skeleton className="h-64" />
          </div>
        ) : (
          <Routes>
            <Route index element={<Overview data={data} reload={loadAll} />} />
            <Route path="schools" element={<Schools data={data} reload={loadAll} />} />
            <Route path="plan" element={<ActionPlan data={data} reload={loadAll} />} />
            <Route path="essays" element={<Essays data={data} reload={loadAll} />} />
            <Route path="compare" element={<Compare data={data} />} />
            <Route path="profile" element={<ProfilePanel data={data} reload={loadAll} />} />
          </Routes>
        )}
      </main>
    </div>
  )
}
