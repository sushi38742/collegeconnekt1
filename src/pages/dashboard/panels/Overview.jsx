import { useAuth } from '../../../context/AuthContext'
import { Link } from 'react-router-dom'

function ProgressRing({ pct }) {
  const r = 36
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - pct / 100)
  return (
    <svg width="88" height="88" viewBox="0 0 88 88">
      <circle cx="44" cy="44" r={r} fill="none" stroke="#f3f4f6" strokeWidth="6" />
      <circle
        cx="44" cy="44" r={r} fill="none" stroke="#1a1a1a" strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        style={{ transform: 'rotate(-90deg)', transformOrigin: '44px 44px', transition: 'stroke-dashoffset 0.6s ease' }}
      />
      <text x="44" y="48" textAnchor="middle" className="font-black" style={{ fontSize: 16, fontWeight: 800, fill: '#1a1a1a' }}>
        {pct}%
      </text>
    </svg>
  )
}

export default function Overview({ data }) {
  const { profile } = useAuth()
  const { plan, schools, deadlines, activity } = data
  const allTasks = data.plan
  const completed = allTasks.filter(t => t.status === 'complete').length
  const total = allTasks.length
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0

  const today = new Date()
  const nearDeadlines = deadlines.slice(0, 3).map(d => {
    const days = Math.ceil((new Date(d.deadline) - today) / 86400000)
    return { ...d, days }
  })

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[24px] font-black tracking-[-0.04em] text-[#1a1a1a]">
          Hey, {profile?.first_name ?? 'there'} 👋
        </h1>
        <p className="text-[13px] text-[#6b6b6b] mt-1">Here's where your applications stand today.</p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Progress ring */}
        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-5 flex items-center gap-4">
          <ProgressRing pct={pct} />
          <div>
            <p className="text-[12px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-0.5">Progress</p>
            <p className="text-[15px] font-black text-[#1a1a1a]">{completed} / {total} tasks</p>
            <Link to="../plan" className="text-[11px] text-[#2563eb] hover:underline mt-0.5 block">View plan →</Link>
          </div>
        </div>

        {/* Schools */}
        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-5">
          <p className="text-[12px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-2">My schools</p>
          <p className="text-[28px] font-black text-[#1a1a1a] leading-none">{schools.length}</p>
          <p className="text-[11px] text-[#6b6b6b] mt-1">
            {schools.filter(s => s.fit?.[0]?.overall_score >= 84).length} strong matches
          </p>
          <Link to="../schools" className="text-[11px] text-[#2563eb] hover:underline mt-1 block">Manage list →</Link>
        </div>

        {/* Next deadline */}
        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-5">
          <p className="text-[12px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-2">Next deadline</p>
          {nearDeadlines[0] ? (
            <>
              <div className="flex items-center gap-1.5 mb-1">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${nearDeadlines[0].days <= 14 ? 'bg-red-400' : 'bg-amber-400'}`} />
                <p className="text-[13px] font-semibold text-[#1a1a1a]">{nearDeadlines[0].school?.name}</p>
              </div>
              <p className="text-[12px] text-[#6b6b6b]">{nearDeadlines[0].type} · {nearDeadlines[0].days}d away</p>
            </>
          ) : (
            <p className="text-[13px] text-[#9ca3af]">No upcoming deadlines</p>
          )}
        </div>
      </div>

      {/* Deadlines + Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Upcoming deadlines */}
        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-5">
          <p className="text-[12px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-3">Upcoming deadlines</p>
          {nearDeadlines.length === 0 ? (
            <p className="text-[13px] text-[#9ca3af]">Nothing in the next 60 days.</p>
          ) : (
            <div className="space-y-2.5">
              {nearDeadlines.map((d, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${d.days <= 14 ? 'bg-red-400' : 'bg-amber-400'}`} />
                    <div>
                      <p className="text-[12px] font-medium text-[#1a1a1a]">{d.school?.name}</p>
                      <p className="text-[10px] text-[#9ca3af]">{d.type}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#1a1a1a]">{d.days}d</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Activity */}
        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-5">
          <p className="text-[12px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-3">Recent activity</p>
          {activity.length === 0 ? (
            <p className="text-[13px] text-[#9ca3af]">No activity yet.</p>
          ) : (
            <div className="space-y-2.5">
              {activity.slice(0, 6).map((a, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d1d5db] mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-[12px] text-[#1a1a1a]">
                      {a.event_type.replace(/_/g, ' ')}
                      {a.metadata?.school_name ? ` — ${a.metadata.school_name}` : ''}
                    </p>
                    <p className="text-[10px] text-[#9ca3af]">
                      {new Date(a.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
