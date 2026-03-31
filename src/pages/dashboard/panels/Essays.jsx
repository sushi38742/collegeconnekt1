import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import { useAuth } from '../../../context/AuthContext'
import { useUpgradeModal } from '../../../hooks/useUpgradeModal'

export default function Essays({ data }) {
  const { session, profile } = useAuth()
  const { openModal } = useUpgradeModal()
  const [selectedSchoolId, setSelectedSchoolId] = useState('')
  const [essayText, setEssayText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])
  const [historyOpen, setHistoryOpen] = useState(null)

  useEffect(() => {
    loadHistory()
  }, [])

  async function loadHistory() {
    const { data: rows } = await supabase
      .from('essay_reviews')
      .select('*, school:schools(name)')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .limit(10)
    setHistory(rows ?? [])
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (profile?.plan === 'free' || profile?.plan === 'student') {
      openModal({ feature: 'Essay analysis & feedback', planNeeded: 'student_pro' })
      return
    }
    setSubmitting(true)
    setResult(null)
    const { data: res, error } = await supabase.functions.invoke('review-essay', {
      body: { user_id: session.user.id, school_id: selectedSchoolId || null, essay_text: essayText },
    })
    if (error || res?.upgrade_required) {
      openModal({ feature: 'Essay analysis & feedback', planNeeded: 'student_pro' })
    } else {
      setResult(res)
      await loadHistory()
    }
    setSubmitting(false)
  }

  const isPro = profile?.plan === 'student_pro'

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto">
      <h2 className="text-[22px] font-black tracking-[-0.04em] text-[#1a1a1a] mb-1">Essay Review</h2>
      <p className="text-[13px] text-[#6b6b6b] mb-6">Paste your essay and get AI feedback on strengths, improvements, and specific suggestions.</p>

      {!isPro && (
        <div className="mb-6 bg-[#eff6ff] border border-[#bfdbfe] rounded-xl p-4 flex items-start gap-3">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
            <circle cx="8" cy="8" r="7" stroke="#2563eb" strokeWidth="1.4"/>
            <path d="M8 5v4M8 11v.5" stroke="#2563eb" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <div>
            <p className="text-[12px] font-semibold text-[#1e40af]">Student Pro feature</p>
            <p className="text-[12px] text-[#3b82f6] mt-0.5">Essay review requires Student Pro ($42 one-time).</p>
            <button onClick={() => openModal({ feature: 'Essay analysis & feedback', planNeeded: 'student_pro' })}
              className="text-[12px] font-semibold text-[#2563eb] underline mt-1 hover:text-[#1d4ed8]">
              Upgrade now →
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-widest mb-1.5">School (optional)</label>
          <select
            value={selectedSchoolId} onChange={e => setSelectedSchoolId(e.target.value)}
            className="w-full border border-[#e5e7eb] rounded-lg px-3.5 py-2.5 text-[13px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a] bg-white"
          >
            <option value="">General / Common App</option>
            {data.schools.map(s => <option key={s.school_id} value={s.school_id}>{s.school?.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-widest mb-1.5">Your essay</label>
          <textarea
            required value={essayText} onChange={e => setEssayText(e.target.value)}
            rows={10}
            placeholder="Paste your essay here…"
            className="w-full border border-[#e5e7eb] rounded-xl px-4 py-3 text-[13px] text-[#1a1a1a] placeholder-[#9ca3af] outline-none focus:border-[#1a1a1a] resize-none leading-relaxed"
          />
          <p className="text-[10px] text-[#9ca3af] mt-1">{essayText.split(/\s+/).filter(Boolean).length} words</p>
        </div>
        <button
          type="submit" disabled={submitting || !essayText.trim()}
          className="px-6 py-2.5 bg-[#1a1a1a] text-white text-[13px] font-semibold rounded-lg hover:bg-[#2563eb] transition-colors disabled:opacity-50"
        >
          {submitting ? 'Reviewing…' : 'Get feedback →'}
        </button>
      </form>

      {/* Result */}
      {result && (
        <div className="space-y-4 mb-8">
          {result.strengths?.length > 0 && (
            <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl p-5">
              <p className="text-[11px] font-semibold text-[#166534] uppercase tracking-widest mb-3">Strengths</p>
              <ul className="space-y-1.5">
                {result.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-[13px] text-[#166534]">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#22c55e] flex-shrink-0" />{s}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {result.improvements?.length > 0 && (
            <div className="bg-[#fefce8] border border-[#fde68a] rounded-xl p-5">
              <p className="text-[11px] font-semibold text-[#92400e] uppercase tracking-widest mb-3">Areas to improve</p>
              <ul className="space-y-1.5">
                {result.improvements.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-[13px] text-[#92400e]">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#f59e0b] flex-shrink-0" />{s}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {result.suggestions?.length > 0 && (
            <div className="border border-[#e5e7eb] rounded-xl p-5">
              <p className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-3">Specific suggestions</p>
              <div className="space-y-3">
                {result.suggestions.map((s, i) => (
                  <div key={i} className="border-l-2 border-[#d1d5db] pl-3">
                    {s.quote && <p className="text-[12px] italic text-[#6b6b6b] mb-1">"{s.quote}"</p>}
                    <p className="text-[12px] text-[#1a1a1a]">{s.recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div>
          <p className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-3">Previous reviews</p>
          <div className="space-y-2">
            {history.map(r => (
              <div key={r.id} className="border border-[#e5e7eb] rounded-xl overflow-hidden">
                <button
                  onClick={() => setHistoryOpen(historyOpen === r.id ? null : r.id)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#f9fafb] transition-colors text-left"
                >
                  <div>
                    <p className="text-[12px] font-semibold text-[#1a1a1a]">{r.school?.name ?? 'Common App'}</p>
                    <p className="text-[10px] text-[#9ca3af]">
                      {new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform ${historyOpen === r.id ? 'rotate-180' : ''}`}>
                    <path d="M2 4l4 4 4-4" stroke="#9ca3af" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {historyOpen === r.id && (
                  <div className="px-4 pb-4 border-t border-[#f3f4f6] pt-3">
                    <p className="text-[12px] text-[#6b6b6b] italic leading-relaxed line-clamp-3">{r.essay_text}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
