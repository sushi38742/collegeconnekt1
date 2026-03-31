import { useState, useRef } from 'react'

function SchoolChip({ name, onRemove }) {
  return (
    <div className="inline-flex items-center gap-1.5 bg-[#f3f4f6] rounded-full pl-3 pr-2 py-1.5">
      <span className="text-[12px] font-medium text-[#1a1a1a]">{name}</span>
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
  const [input, setInput] = useState('')
  const [schools, setSchools] = useState([])
  const inputRef = useRef(null)

  function addSchool() {
    const name = input.trim()
    if (!name) return
    if (schools.includes(name)) { setInput(''); return }
    setSchools(prev => [...prev, name])
    setInput('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') { e.preventDefault(); addSchool() }
    if (e.key === 'Backspace' && !input && schools.length > 0) {
      setSchools(prev => prev.slice(0, -1))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(schools)
  }

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-2xl p-8">
      <h2 className="text-[22px] font-black tracking-[-0.03em] text-[#1a1a1a] mb-1">Build your school list.</h2>
      <p className="text-[13px] text-[#6b6b6b] mb-7">
        Type a school name and press <kbd className="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[11px]">Enter</kbd> to add it. Add as many as you want.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-widest mb-1.5">Add schools</label>
          <div className="flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 border border-[#e5e7eb] rounded-lg px-3.5 py-2.5 text-[13px] text-[#1a1a1a] placeholder-[#9ca3af] outline-none focus:border-[#1a1a1a] transition-colors"
              placeholder="e.g. MIT, UCLA, Michigan…"
            />
            <button
              type="button"
              onClick={addSchool}
              disabled={!input.trim()}
              className="px-4 py-2.5 bg-[#f3f4f6] text-[13px] font-semibold text-[#1a1a1a] rounded-lg hover:bg-[#e5e7eb] transition-colors disabled:opacity-40"
            >
              Add
            </button>
          </div>
        </div>

        {schools.length > 0 && (
          <div>
            <p className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-2">
              Your list · {schools.length} school{schools.length !== 1 ? 's' : ''}
            </p>
            <div className="flex flex-wrap gap-2">
              {schools.map(name => (
                <SchoolChip
                  key={name}
                  name={name}
                  onRemove={() => setSchools(prev => prev.filter(s => s !== name))}
                />
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full mt-2 py-3 bg-[#1a1a1a] text-white text-[13px] font-semibold rounded-lg hover:bg-[#2563eb] transition-colors disabled:opacity-50"
        >
          {saving ? 'Setting up your account…' : schools.length > 0 ? `Finish setup · ${schools.length} school${schools.length !== 1 ? 's' : ''}` : 'Skip for now'}
        </button>
      </form>
    </div>
  )
}
