import { useState } from 'react'

const EC_CATEGORIES = ['Sports', 'Arts', 'Community Service', 'Academic Club', 'Student Government', 'Work/Internship', 'Research', 'Other']
const US_STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']

function ECRow({ ec, onChange, onRemove }) {
  return (
    <div className="border border-[#e5e7eb] rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-semibold text-[#1a1a1a]">Activity</span>
        <button type="button" onClick={onRemove} className="text-[11px] text-[#9ca3af] hover:text-red-500 transition-colors">Remove</button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <select
          value={ec.category} onChange={e => onChange({ ...ec, category: e.target.value })}
          className="border border-[#e5e7eb] rounded-lg px-3 py-2 text-[12px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a] bg-white"
        >
          <option value="">Category</option>
          {EC_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input
          value={ec.title} onChange={e => onChange({ ...ec, title: e.target.value })}
          placeholder="Title / role"
          className="border border-[#e5e7eb] rounded-lg px-3 py-2 text-[12px] text-[#1a1a1a] placeholder-[#9ca3af] outline-none focus:border-[#1a1a1a]"
        />
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <input
            type="number" min={1} max={8} value={ec.years} onChange={e => onChange({ ...ec, years: parseInt(e.target.value) })}
            placeholder="Years"
            className="w-full border border-[#e5e7eb] rounded-lg px-3 py-2 text-[12px] text-[#1a1a1a] placeholder-[#9ca3af] outline-none focus:border-[#1a1a1a]"
          />
        </div>
        <label className="flex items-center gap-2 text-[12px] text-[#1a1a1a] cursor-pointer select-none">
          <input
            type="checkbox" checked={ec.is_leadership} onChange={e => onChange({ ...ec, is_leadership: e.target.checked })}
            className="w-3.5 h-3.5 rounded accent-[#1a1a1a]"
          />
          Leadership role
        </label>
      </div>
    </div>
  )
}

export default function Step2({ onSubmit, saving }) {
  const [gpa, setGpa] = useState('')
  const [testType, setTestType] = useState('SAT')
  const [testScore, setTestScore] = useState('')
  const [major, setMajor] = useState('')
  const [state, setState] = useState('')
  const [ecs, setEcs] = useState([])

  function addEc() {
    setEcs(prev => [...prev, { category: '', title: '', years: 1, is_leadership: false }])
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit({ gpa: parseFloat(gpa), testType, testScore: parseInt(testScore), major, state, ecs })
  }

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-2xl p-8">
      <h2 className="text-[22px] font-black tracking-[-0.03em] text-[#1a1a1a] mb-1">Your academic profile.</h2>
      <p className="text-[13px] text-[#6b6b6b] mb-7">This powers your fit scores. Be accurate — only you see this.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-widest mb-1.5">GPA (unweighted)</label>
            <input
              required type="number" min="0" max="4" step="0.01" value={gpa} onChange={e => setGpa(e.target.value)}
              className="w-full border border-[#e5e7eb] rounded-lg px-3.5 py-2.5 text-[13px] text-[#1a1a1a] placeholder-[#9ca3af] outline-none focus:border-[#1a1a1a] transition-colors"
              placeholder="3.85"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-widest mb-1.5">State</label>
            <select
              required value={state} onChange={e => setState(e.target.value)}
              className="w-full border border-[#e5e7eb] rounded-lg px-3.5 py-2.5 text-[13px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a] bg-white"
            >
              <option value="">Select</option>
              {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-widest mb-1.5">Test score</label>
          <div className="flex gap-2">
            <div className="flex border border-[#e5e7eb] rounded-lg overflow-hidden">
              {['SAT', 'ACT'].map(t => (
                <button
                  key={t} type="button" onClick={() => setTestType(t)}
                  className={`px-4 py-2.5 text-[12px] font-semibold transition-colors ${testType === t ? 'bg-[#1a1a1a] text-white' : 'text-[#6b6b6b] hover:bg-[#f9fafb]'}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <input
              required type="number" value={testScore} onChange={e => setTestScore(e.target.value)}
              min={testType === 'SAT' ? 400 : 1} max={testType === 'SAT' ? 1600 : 36}
              placeholder={testType === 'SAT' ? '400–1600' : '1–36'}
              className="flex-1 border border-[#e5e7eb] rounded-lg px-3.5 py-2.5 text-[13px] text-[#1a1a1a] placeholder-[#9ca3af] outline-none focus:border-[#1a1a1a] transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-widest mb-1.5">Intended major</label>
          <input
            required value={major} onChange={e => setMajor(e.target.value)}
            className="w-full border border-[#e5e7eb] rounded-lg px-3.5 py-2.5 text-[13px] text-[#1a1a1a] placeholder-[#9ca3af] outline-none focus:border-[#1a1a1a] transition-colors"
            placeholder="e.g. Computer Science"
          />
        </div>

        {/* ECs */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-widest">Extracurriculars</label>
            <button type="button" onClick={addEc} className="text-[11px] font-semibold text-[#2563eb] hover:text-[#1d4ed8] transition-colors">
              + Add activity
            </button>
          </div>
          {ecs.length === 0 && (
            <p className="text-[12px] text-[#9ca3af] py-2">Optional but improves your fit scores significantly.</p>
          )}
          <div className="space-y-2">
            {ecs.map((ec, i) => (
              <ECRow
                key={i}
                ec={ec}
                onChange={updated => setEcs(prev => prev.map((e, j) => j === i ? updated : e))}
                onRemove={() => setEcs(prev => prev.filter((_, j) => j !== i))}
              />
            ))}
          </div>
        </div>

        <button
          type="submit" disabled={saving}
          className="w-full mt-2 py-3 bg-[#1a1a1a] text-white text-[13px] font-semibold rounded-lg hover:bg-[#2563eb] transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Continue →'}
        </button>
      </form>
    </div>
  )
}
