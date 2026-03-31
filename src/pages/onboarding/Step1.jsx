import { useState } from 'react'

const GRAD_YEARS = [2025, 2026, 2027, 2028, 2029]

export default function Step1({ onSubmit, saving }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [graduationYear, setGraduationYear] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit({ firstName, lastName, graduationYear: parseInt(graduationYear) })
  }

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-2xl p-8">
      <h2 className="text-[22px] font-black tracking-[-0.03em] text-[#1a1a1a] mb-1">Let's get started.</h2>
      <p className="text-[13px] text-[#6b6b6b] mb-7">Tell us a bit about you so we can personalize your experience.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-widest mb-1.5">First name</label>
            <input
              required value={firstName} onChange={e => setFirstName(e.target.value)}
              className="w-full border border-[#e5e7eb] rounded-lg px-3.5 py-2.5 text-[13px] text-[#1a1a1a] placeholder-[#9ca3af] outline-none focus:border-[#1a1a1a] transition-colors"
              placeholder="Alex"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-widest mb-1.5">Last name</label>
            <input
              required value={lastName} onChange={e => setLastName(e.target.value)}
              className="w-full border border-[#e5e7eb] rounded-lg px-3.5 py-2.5 text-[13px] text-[#1a1a1a] placeholder-[#9ca3af] outline-none focus:border-[#1a1a1a] transition-colors"
              placeholder="Johnson"
            />
          </div>
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-widest mb-1.5">Graduation year</label>
          <select
            required value={graduationYear} onChange={e => setGraduationYear(e.target.value)}
            className="w-full border border-[#e5e7eb] rounded-lg px-3.5 py-2.5 text-[13px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors bg-white"
          >
            <option value="">Select year</option>
            {GRAD_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
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
