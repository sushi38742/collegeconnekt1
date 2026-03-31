import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

function StepIndicator({ current }) {
  return (
    <div className="flex items-center gap-2 mb-10">
      {[1, 2, 3].map(n => (
        <div key={n} className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors ${
            n < current ? 'bg-[#1a1a1a] text-white'
            : n === current ? 'bg-[#1a1a1a] text-white'
            : 'bg-[#f3f4f6] text-[#9ca3af]'
          }`}>
            {n < current ? (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : n}
          </div>
          {n < 3 && <div className={`w-8 h-px ${n < current ? 'bg-[#1a1a1a]' : 'bg-[#e5e7eb]'}`} />}
        </div>
      ))}
      <span className="ml-1 text-[11px] text-[#9ca3af]">Step {current} of 3</span>
    </div>
  )
}

export default function Onboarding({ step }) {
  const { session, refreshProfile } = useAuth()
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function saveStep1(data) {
    setSaving(true)
    setError('')
    const { error } = await supabase.from('profiles').update({
      first_name: data.firstName,
      last_name: data.lastName,
      graduation_year: data.graduationYear,
      onboarding_step: 2,
    }).eq('id', session.user.id)
    if (error) { setError(error.message); setSaving(false); return }
    await refreshProfile()
    navigate('/onboarding/2')
    setSaving(false)
  }

  async function saveStep2(data) {
    setSaving(true)
    setError('')
    const { error: profileError } = await supabase.from('profiles').update({
      gpa: data.gpa,
      test_type: data.testType,
      test_score: data.testScore,
      intended_major: data.major,
      state: data.state,
      onboarding_step: 3,
    }).eq('id', session.user.id)
    if (profileError) { setError(profileError.message); setSaving(false); return }

    // Insert ECs (replace all existing)
    await supabase.from('extracurriculars').delete().eq('user_id', session.user.id)
    if (data.ecs.length > 0) {
      const rows = data.ecs.map(ec => ({ user_id: session.user.id, ...ec }))
      const { error: ecError } = await supabase.from('extracurriculars').insert(rows)
      if (ecError) { setError(ecError.message); setSaving(false); return }
    }

    await refreshProfile()
    navigate('/onboarding/3')
    setSaving(false)
  }

  async function saveStep3(schoolNames) {
    setSaving(true)
    setError('')

    // Upsert each school by name, get back IDs
    const schoolIds = []
    for (const name of schoolNames) {
      // Try to find existing school first
      const { data: existing } = await supabase
        .from('schools').select('id').ilike('name', name).single()
      if (existing) {
        schoolIds.push(existing.id)
      } else {
        const { data: created } = await supabase
          .from('schools').insert({ name }).select('id').single()
        if (created) schoolIds.push(created.id)
      }
    }

    // Save to saved_schools
    if (schoolIds.length > 0) {
      await supabase.from('saved_schools').insert(
        schoolIds.map(id => ({ user_id: session.user.id, school_id: id }))
      )
    }

    // Complete onboarding
    const { error: profileError } = await supabase
      .from('profiles').update({ onboarding_step: null }).eq('id', session.user.id)
    if (profileError) { setError(profileError.message); setSaving(false); return }

    // Fire edge functions (fire-and-forget)
    schoolIds.forEach(schoolId => {
      supabase.functions.invoke('generate-fit-score', { body: { user_id: session.user.id, school_id: schoolId } })
    })
    supabase.functions.invoke('generate-action-plan', { body: { user_id: session.user.id } })

    await refreshProfile()
    navigate('/dashboard')
    setSaving(false)
  }

  const steps = { 1: Step1, 2: Step2, 3: Step3 }
  const StepComponent = steps[step]

  return (
    <div className="min-h-screen bg-[#f9fafb] px-4 py-12 flex flex-col items-center">
      <div className="w-full max-w-lg">
        <div className="mb-8">
          <span className="text-[16px] font-black tracking-[-0.03em] text-[#1a1a1a]">CollegeConnekt</span>
        </div>
        <StepIndicator current={step} />
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-[12px] text-red-600">
            {error}
          </div>
        )}
        <StepComponent
          onSubmit={step === 1 ? saveStep1 : step === 2 ? saveStep2 : saveStep3}
          saving={saving}
        />
      </div>
    </div>
  )
}
