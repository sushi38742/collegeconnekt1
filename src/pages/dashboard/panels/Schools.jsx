import { useState, useEffect, useRef } from 'react'
import { supabase } from '../../../lib/supabase'
import { useAuth } from '../../../context/AuthContext'
import { useUpgradeModal } from '../../../hooks/useUpgradeModal'

function fitColor(score) {
  if (!score) return '#d1d5db'
  if (score >= 84) return '#10b981'
  if (score >= 66) return '#2563eb'
  if (score >= 46) return '#f59e0b'
  return '#ef4444'
}

function fitLabel(score) {
  if (!score) return 'Pending'
  if (score >= 84) return 'Strong match'
  if (score >= 66) return 'Match'
  if (score >= 46) return 'Reach'
  return 'Far reach'
}

export default function Schools({ data, reload }) {
  const { session, profile } = useAuth()
  const { openModal } = useUpgradeModal()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [adding, setAdding] = useState(false)
  const debounceRef = useRef(null)

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      const { data: rows } = await supabase
        .from('schools').select('id, name, state, type').ilike('name', `%${query}%`).limit(6)
      setResults(rows ?? [])
    }, 250)
    return () => clearTimeout(debounceRef.current)
  }, [query])

  async function addSchool(school) {
    const plan = profile?.plan ?? 'free'
    const savedCount = data.schools.length
    if (plan === 'free' && savedCount >= 3) {
      openModal({ feature: 'Unlimited saved schools', planNeeded: 'student' })
      return
    }
    setAdding(true)
    setQuery(''); setResults([])
    await supabase.from('saved_schools').insert({ user_id: session.user.id, school_id: school.id })
    supabase.functions.invoke('generate-fit-score', { body: { user_id: session.user.id, school_id: school.id } })
    await reload()
    setAdding(false)
  }

  async function removeSchool(savedId) {
    await supabase.from('saved_schools').delete().eq('id', savedId)
    await reload()
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-[22px] font-black tracking-[-0.04em] text-[#1a1a1a]">My Schools</h2>
          <p className="text-[13px] text-[#6b6b6b] mt-1">{data.schools.length} school{data.schools.length !== 1 ? 's' : ''} saved</p>
        </div>
        {/* Search */}
        <div className="relative w-56">
          <input
            value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Add a school…"
            className="w-full border border-[#e5e7eb] rounded-lg px-3.5 py-2 text-[13px] text-[#1a1a1a] placeholder-[#9ca3af] outline-none focus:border-[#1a1a1a] transition-colors"
          />
          {results.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-20 mt-1 bg-white border border-[#e5e7eb] rounded-xl shadow-lg overflow-hidden">
              {results.map(s => (
                <button key={s.id} type="button" onClick={() => addSchool(s)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 hover:bg-[#f9fafb] transition-colors text-left border-b border-[#f3f4f6] last:border-0">
                  <span className="text-[12px] font-medium text-[#1a1a1a]">{s.name}</span>
                  <span className="text-[10px] text-[#9ca3af]">{s.state}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {data.schools.length === 0 ? (
        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-12 text-center">
          <p className="text-[14px] text-[#9ca3af]">No schools added yet. Search above to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.schools.map(saved => {
            const school = saved.school
            const fit = saved.fit?.[0]
            const score = fit?.overall_score
            const cats = fit?.category_scores ?? {}
            return (
              <div key={saved.id} className="bg-white border border-[#e5e7eb] rounded-2xl p-5 flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[13px] font-bold text-[#1a1a1a]">{school?.name}</p>
                    <p className="text-[11px] text-[#9ca3af] mt-0.5">{school?.state} · {school?.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[22px] font-black leading-none" style={{ color: fitColor(score) }}>
                      {score ?? '–'}
                    </p>
                    <p className="text-[9px] uppercase tracking-widest mt-0.5" style={{ color: fitColor(score) }}>
                      {fitLabel(score)}
                    </p>
                  </div>
                </div>

                {/* Category breakdown */}
                {score && (
                  <div className="space-y-1.5">
                    {Object.entries(cats).map(([k, v]) => (
                      <div key={k} className="flex items-center gap-2">
                        <span className="text-[10px] text-[#9ca3af] w-20 capitalize">{k.replace('_', ' ')}</span>
                        <div className="flex-1 h-1 bg-[#f3f4f6] rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-[#1a1a1a]" style={{ width: `${v}%` }} />
                        </div>
                        <span className="text-[10px] font-semibold text-[#1a1a1a] w-6 text-right">{v}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-[#f3f4f6]">
                  <span className="text-[10px] text-[#9ca3af]">{school?.acceptance_rate}% accept</span>
                  <button onClick={() => removeSchool(saved.id)} className="text-[11px] text-[#9ca3af] hover:text-red-500 transition-colors">
                    Remove
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
