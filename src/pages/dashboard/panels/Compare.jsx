import { useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { useAuth } from '../../../context/AuthContext'
import { useUpgradeModal } from '../../../hooks/useUpgradeModal'

const COMPARE_FIELDS = [
  { label: 'Accept rate', key: 'acceptance_rate', fmt: v => v ? `${v}%` : '—' },
  { label: 'GPA range', key: 'gpa_range', fmt: (_, s) => s ? `${s.gpa_lo}–${s.gpa_hi}` : '—' },
  { label: 'SAT range', key: 'sat_range', fmt: (_, s) => s ? `${s.sat_lo}–${s.sat_hi}` : '—' },
  { label: 'ACT range', key: 'act_range', fmt: (_, s) => s ? `${s.act_lo}–${s.act_hi}` : '—' },
  { label: 'Aid %', key: 'aid_pct', fmt: v => v ? `${v}%` : '—' },
]

export default function Compare({ data }) {
  const { session, profile } = useAuth()
  const { openModal } = useUpgradeModal()
  const [selected, setSelected] = useState([])
  const [aiResult, setAiResult] = useState(null)
  const [generating, setGenerating] = useState(false)

  function toggle(savedSchool) {
    const id = savedSchool.school_id
    if (selected.find(s => s.school_id === id)) {
      setSelected(prev => prev.filter(s => s.school_id !== id))
    } else if (selected.length < 3) {
      setSelected(prev => [...prev, savedSchool])
    }
  }

  async function generateComparison() {
    if (profile?.plan === 'free') {
      openModal({ feature: 'School comparison', planNeeded: 'student' })
      return
    }
    setGenerating(true)
    setAiResult(null)
    const { data: res } = await supabase.functions.invoke('compare-schools', {
      body: { user_id: session.user.id, school_ids: selected.map(s => s.school_id) },
    })
    setAiResult(res?.result_text ?? null)
    setGenerating(false)
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <h2 className="text-[22px] font-black tracking-[-0.04em] text-[#1a1a1a] mb-1">Compare Schools</h2>
      <p className="text-[13px] text-[#6b6b6b] mb-6">Select up to 3 schools from your list to compare side by side.</p>

      {/* School selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {data.schools.map(saved => {
          const isSelected = !!selected.find(s => s.school_id === saved.school_id)
          const disabled = !isSelected && selected.length >= 3
          return (
            <button
              key={saved.school_id}
              onClick={() => toggle(saved)}
              disabled={disabled}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold border transition-colors ${
                isSelected ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                : disabled ? 'border-[#f3f4f6] text-[#d1d5db] cursor-not-allowed'
                : 'border-[#e5e7eb] text-[#1a1a1a] hover:border-[#1a1a1a]'
              }`}
            >
              {saved.school?.name}
            </button>
          )
        })}
      </div>

      {selected.length >= 2 && (
        <>
          {/* Comparison table */}
          <div className="bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden mb-4">
            <div className={`grid border-b border-[#f3f4f6]`} style={{ gridTemplateColumns: `140px repeat(${selected.length}, 1fr)` }}>
              <div className="px-4 py-3 bg-[#f9fafb]" />
              {selected.map(s => (
                <div key={s.school_id} className="px-4 py-3 border-l border-[#f3f4f6]">
                  <p className="text-[12px] font-bold text-[#1a1a1a]">{s.school?.name}</p>
                  <p className="text-[10px] text-[#9ca3af]">{s.school?.state}</p>
                </div>
              ))}
            </div>

            {/* Fit score row */}
            <div className={`grid border-b border-[#f8f8f8]`} style={{ gridTemplateColumns: `140px repeat(${selected.length}, 1fr)` }}>
              <div className="px-4 py-3 bg-[#f9fafb] text-[11px] text-[#6b6b6b] font-medium flex items-center">Fit score</div>
              {selected.map(s => {
                const score = s.fit?.[0]?.overall_score
                return (
                  <div key={s.school_id} className="px-4 py-3 border-l border-[#f8f8f8] flex items-center">
                    <span className="text-[15px] font-black text-[#1a1a1a]">{score ?? '–'}</span>
                  </div>
                )
              })}
            </div>

            {COMPARE_FIELDS.map(field => (
              <div key={field.key} className={`grid border-b border-[#f8f8f8] last:border-0`} style={{ gridTemplateColumns: `140px repeat(${selected.length}, 1fr)` }}>
                <div className="px-4 py-3 bg-[#f9fafb] text-[11px] text-[#6b6b6b] font-medium flex items-center">{field.label}</div>
                {selected.map(s => (
                  <div key={s.school_id} className="px-4 py-3 border-l border-[#f8f8f8] text-[12px] text-[#1a1a1a] flex items-center">
                    {field.fmt(s.school?.[field.key], s.school)}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <button
            onClick={generateComparison}
            disabled={generating}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#1a1a1a] text-white text-[13px] font-semibold rounded-lg hover:bg-[#2563eb] transition-colors disabled:opacity-50"
          >
            {generating ? (
              <><svg width="12" height="12" viewBox="0 0 12 12" className="animate-spin" fill="none">
                <path d="M10 6A4 4 0 112 6" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
              </svg> Generating…</>
            ) : 'Generate AI comparison →'}
          </button>
        </>
      )}

      {selected.length < 2 && (
        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-10 text-center">
          <p className="text-[13px] text-[#9ca3af]">Select at least 2 schools to compare.</p>
        </div>
      )}

      {aiResult && (
        <div className="mt-5 bg-white border border-[#e5e7eb] rounded-2xl p-6">
          <p className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-3">AI Analysis</p>
          <p className="text-[13px] text-[#1a1a1a] leading-relaxed">{aiResult}</p>
        </div>
      )}
    </div>
  )
}
