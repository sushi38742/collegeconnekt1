import { useState, useEffect, useRef } from 'react'
import { supabase } from '../../../lib/supabase'
import { useAuth } from '../../../context/AuthContext'

const US_STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']
const EC_CATEGORIES = ['Sports','Arts','Community Service','Academic Club','Student Government','Work/Internship','Research','Other']

function ECRow({ ec, onChange, onRemove }) {
  return (
    <div className="border border-[#e5e7eb] rounded-xl p-4 space-y-3">
      <div className="flex justify-between">
        <span className="text-[12px] font-semibold text-[#1a1a1a]">{ec.title || 'Activity'}</span>
        <button type="button" onClick={onRemove} className="text-[11px] text-[#9ca3af] hover:text-red-500 transition-colors">Remove</button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <select value={ec.category} onChange={e => onChange({ ...ec, category: e.target.value })}
          className="border border-[#e5e7eb] rounded-lg px-3 py-2 text-[12px] outline-none focus:border-[#1a1a1a] bg-white">
          <option value="">Category</option>
          {EC_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input value={ec.title} onChange={e => onChange({ ...ec, title: e.target.value })}
          placeholder="Title / role"
          className="border border-[#e5e7eb] rounded-lg px-3 py-2 text-[12px] placeholder-[#9ca3af] outline-none focus:border-[#1a1a1a]" />
      </div>
      <div className="flex items-center gap-3">
        <input type="number" min={1} max={8} value={ec.years} onChange={e => onChange({ ...ec, years: parseInt(e.target.value) })}
          placeholder="Years" className="w-20 border border-[#e5e7eb] rounded-lg px-3 py-2 text-[12px] outline-none focus:border-[#1a1a1a]" />
        <label className="flex items-center gap-2 text-[12px] cursor-pointer">
          <input type="checkbox" checked={ec.is_leadership} onChange={e => onChange({ ...ec, is_leadership: e.target.checked })}
            className="accent-[#1a1a1a]" />
          Leadership role
        </label>
      </div>
    </div>
  )
}

export default function ProfilePanel({ data, reload }) {
  const { session, refreshProfile } = useAuth()
  const [form, setForm] = useState({
    first_name: '', last_name: '', graduation_year: '', gpa: '', test_type: 'SAT',
    test_score: '', intended_major: '', state: '',
  })
  const [ecs, setEcs] = useState([])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const debounceRef = useRef(null)

  useEffect(() => {
    if (data?.profile) {
      const p = data.profile
      setForm({
        first_name: p.first_name ?? '',
        last_name: p.last_name ?? '',
        graduation_year: p.graduation_year ?? '',
        gpa: p.gpa ?? '',
        test_type: p.test_type ?? 'SAT',
        test_score: p.test_score ?? '',
        intended_major: p.intended_major ?? '',
        state: p.state ?? '',
      })
      setEcs((p.extracurriculars ?? []).filter(ec => !ec.deleted_at))
    }
  }, [data])

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    await supabase.from('profiles').update({
      ...form,
      gpa: parseFloat(form.gpa),
      test_score: parseInt(form.test_score),
      graduation_year: parseInt(form.graduation_year),
    }).eq('id', session.user.id)

    // Replace ECs
    await supabase.from('extracurriculars').update({ deleted_at: new Date().toISOString() })
      .eq('user_id', session.user.id).is('deleted_at', null)
    if (ecs.length > 0) {
      await supabase.from('extracurriculars').insert(ecs.map(ec => ({ ...ec, user_id: session.user.id })))
    }

    // Debounced regeneration
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      supabase.functions.invoke('generate-action-plan', { body: { user_id: session.user.id } })
      data.schools.forEach(s => {
        supabase.functions.invoke('generate-fit-score', { body: { user_id: session.user.id, school_id: s.school_id } })
      })
    }, 5000)

    await refreshProfile()
    await reload()
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto">
      <h2 className="text-[22px] font-black tracking-[-0.04em] text-[#1a1a1a] mb-6">Profile</h2>

      <form onSubmit={handleSave} className="space-y-5">
        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 space-y-4">
          <p className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-widest">Basic info</p>
          <div className="grid grid-cols-2 gap-3">
            {[['First name', 'first_name'], ['Last name', 'last_name']].map(([label, key]) => (
              <div key={key}>
                <label className="block text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-widest mb-1.5">{label}</label>
                <input value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  className="w-full border border-[#e5e7eb] rounded-lg px-3.5 py-2.5 text-[13px] outline-none focus:border-[#1a1a1a]" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-widest mb-1.5">Grad year</label>
              <input type="number" value={form.graduation_year} onChange={e => setForm(f => ({ ...f, graduation_year: e.target.value }))}
                className="w-full border border-[#e5e7eb] rounded-lg px-3.5 py-2.5 text-[13px] outline-none focus:border-[#1a1a1a]" />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-widest mb-1.5">State</label>
              <select value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))}
                className="w-full border border-[#e5e7eb] rounded-lg px-3.5 py-2.5 text-[13px] outline-none focus:border-[#1a1a1a] bg-white">
                <option value="">Select</option>
                {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 space-y-4">
          <p className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-widest">Academic profile</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-widest mb-1.5">GPA</label>
              <input type="number" step="0.01" min="0" max="4" value={form.gpa} onChange={e => setForm(f => ({ ...f, gpa: e.target.value }))}
                className="w-full border border-[#e5e7eb] rounded-lg px-3.5 py-2.5 text-[13px] outline-none focus:border-[#1a1a1a]" />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-widest mb-1.5">Major</label>
              <input value={form.intended_major} onChange={e => setForm(f => ({ ...f, intended_major: e.target.value }))}
                className="w-full border border-[#e5e7eb] rounded-lg px-3.5 py-2.5 text-[13px] outline-none focus:border-[#1a1a1a]" />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex border border-[#e5e7eb] rounded-lg overflow-hidden">
              {['SAT','ACT'].map(t => (
                <button key={t} type="button" onClick={() => setForm(f => ({ ...f, test_type: t }))}
                  className={`px-4 py-2.5 text-[12px] font-semibold transition-colors ${form.test_type === t ? 'bg-[#1a1a1a] text-white' : 'text-[#6b6b6b] hover:bg-[#f9fafb]'}`}>
                  {t}
                </button>
              ))}
            </div>
            <input type="number" value={form.test_score} onChange={e => setForm(f => ({ ...f, test_score: e.target.value }))}
              placeholder={form.test_type === 'SAT' ? '400–1600' : '1–36'}
              className="flex-1 border border-[#e5e7eb] rounded-lg px-3.5 py-2.5 text-[13px] outline-none focus:border-[#1a1a1a]" />
          </div>
        </div>

        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-widest">Extracurriculars</p>
            <button type="button" onClick={() => setEcs(e => [...e, { category: '', title: '', years: 1, is_leadership: false }])}
              className="text-[11px] font-semibold text-[#2563eb]">+ Add</button>
          </div>
          {ecs.map((ec, i) => (
            <ECRow key={i} ec={ec}
              onChange={updated => setEcs(prev => prev.map((e, j) => j === i ? updated : e))}
              onRemove={() => setEcs(prev => prev.filter((_, j) => j !== i))} />
          ))}
        </div>

        <button type="submit" disabled={saving}
          className="w-full py-3 bg-[#1a1a1a] text-white text-[13px] font-semibold rounded-lg hover:bg-[#2563eb] transition-colors disabled:opacity-50">
          {saving ? 'Saving…' : saved ? '✓ Saved' : 'Save changes'}
        </button>
        <p className="text-center text-[11px] text-[#9ca3af]">Saving updates your fit scores and action plan (5s delay).</p>
      </form>
    </div>
  )
}
