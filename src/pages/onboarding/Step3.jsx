import { useState, useEffect, useRef } from 'react'
import { supabase } from '../../lib/supabase'

function SchoolChip({ school, onRemove }) {
  return (
    <div className="inline-flex items-center gap-1.5 bg-[#f3f4f6] rounded-full pl-3 pr-2 py-1.5">
      <span className="text-[12px] font-medium text-[#1a1a1a]">{school.name}</span>
      <button
        type="button"
        onClick={onRemove}
        className="w-4 h-4 rounded-full bg-[#d1d5db] hover:bg-[#9ca3af] flex items-center justify-center transition-colors"
      >
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M1.5 1.5l5 5M6.5 1.5l-5 5" stroke="#6b6b6b" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  )
}

export default function Step3({ onSubmit, saving }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [selected, setSelected] = useState([]) // [{id, name, state}]
  const [searching, setSearching] = useState(false)
  const debounceRef = useRef(null)

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      setSearching(true)
      const { data } = await supabase
        .from('schools')
        .select('id, name, state, type')
        .ilike('name', `%${query}%`)
        .limit(8)
      setResults(data ?? [])
      setSearching(false)
    }, 250)
    return () => clearTimeout(debounceRef.current)
  }, [query])

  function addSchool(school) {
    if (selected.find(s => s.id === school.id)) return
    if (selected.length >= 15) return
    setSelected(prev => [...prev, school])
    setQuery('')
    setResults([])
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (selected.length === 0) return
    onSubmit(selected.map(s => s.id))
  }

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-2xl p-8">
      <h2 className="text-[22px] font-black tracking-[-0.03em] text-[#1a1a1a] mb-1">Build your school list.</h2>
      <p className="text-[13px] text-[#6b6b6b] mb-7">
        Add at least one school. We'll generate fit scores for each when you finish.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Search */}
        <div className="relative">
          <label className="block text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-widest mb-1.5">Search schools</label>
          <input
            value={query} onChange={e => setQuery(e.target.value)}
            className="w-full border border-[#e5e7eb] rounded-lg px-3.5 py-2.5 text-[13px] text-[#1a1a1a] placeholder-[#9ca3af] outline-none focus:border-[#1a1a1a] transition-colors"
            placeholder="e.g. MIT, UCLA, Michigan…"
          />
          {results.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-20 mt-1 bg-white border border-[#e5e7eb] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] overflow-hidden">
              {results.map(school => (
                <button
                  key={school.id}
                  type="button"
                  onClick={() => addSchool(school)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#f9fafb] transition-colors text-left border-b border-[#f3f4f6] last:border-0"
                >
                  <span className="text-[13px] font-medium text-[#1a1a1a]">{school.name}</span>
                  <span className="text-[11px] text-[#9ca3af]">{school.state} · {school.type}</span>
                </button>
              ))}
            </div>
          )}
          {searching && (
            <div className="absolute right-3 top-9 w-4 h-4 border border-[#e5e7eb] border-t-[#1a1a1a] rounded-full animate-spin" />
          )}
        </div>

        {/* Selected chips */}
        {selected.length > 0 && (
          <div>
            <p className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-2">
              Your list · {selected.length} school{selected.length !== 1 ? 's' : ''}
            </p>
            <div className="flex flex-wrap gap-2">
              {selected.map(s => (
                <SchoolChip
                  key={s.id}
                  school={s}
                  onRemove={() => setSelected(prev => prev.filter(x => x.id !== s.id))}
                />
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={saving || selected.length === 0}
          className="w-full mt-2 py-3 bg-[#1a1a1a] text-white text-[13px] font-semibold rounded-lg hover:bg-[#2563eb] transition-colors disabled:opacity-50"
        >
          {saving ? 'Setting up your account…' : `Finish setup${selected.length > 0 ? ` · ${selected.length} school${selected.length !== 1 ? 's' : ''}` : ''}`}
        </button>
        <p className="text-center text-[11px] text-[#9ca3af]">We'll generate fit scores for all your schools instantly.</p>
      </form>
    </div>
  )
}
