import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Check({ blue }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
      <circle cx="7" cy="7" r="7" fill={blue ? '#2563eb' : '#1a1a1a'}/>
      <path d="M4 7l2 2 4-4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function Lock() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
      <circle cx="7" cy="7" r="7" fill="#f3f4f6"/>
      <rect x="4.5" y="6.5" width="5" height="4" rx="1" stroke="#d1d5db" strokeWidth="1.1"/>
      <path d="M5.5 6.5V5.5C5.5 4.7 6.2 4 7 4C7.8 4 8.5 4.7 8.5 5.5V6.5" stroke="#d1d5db" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  )
}

const compareRows = [
  { group: 'College Search', features: [
    { label: 'College search & browse',           free: true,           student: true,        tutor: true  },
    { label: 'Saved schools',                     free: 'Up to 5',      student: 'Unlimited', tutor: '—'   },
    { label: 'School comparison tool',            free: false,          student: true,        tutor: '—'   },
    { label: 'Full CDS data breakdowns',          free: false,          student: true,        tutor: '—'   },
  ]},
  { group: 'AI Assistant', features: [
    { label: 'AI chat',                           free: '15 / month',   student: 'Unlimited', tutor: '—'   },
    { label: 'Admissions likelihood & fit score', free: false,          student: true,        tutor: '—'   },
  ]},
  { group: 'Essays', features: [
    { label: 'Essay analysis & feedback',         free: false,          student: true,        tutor: '—'   },
    { label: 'Personalized revision suggestions', free: false,          student: true,        tutor: '—'   },
  ]},
  { group: 'Profile & Planning', features: [
    { label: 'Student profile',                   free: true,           student: true,        tutor: '—'   },
    { label: 'Deadline calendar',                 free: true,           student: true,        tutor: '—'   },
    { label: 'Priority support',                  free: false,          student: true,        tutor: '—'   },
  ]},
  { group: 'Tutor Matching', features: [
    { label: '30-min onboarding call',            free: false,          student: false,       tutor: true  },
    { label: 'Matched with 3 vetted tutors',      free: false,          student: false,       tutor: true  },
    { label: 'Side-by-side tutor comparison',     free: false,          student: false,       tutor: true  },
    { label: 'Direct tutor intro',                free: false,          student: false,       tutor: true  },
  ]},
]

function CellValue({ val }) {
  if (val === true)    return <Check />
  if (val === false)   return <Lock />
  if (val === '—')     return <span className="text-[#d1d5db] text-[13px]">—</span>
  return <span className="text-[12px] font-medium text-[#1a1a1a]">{val}</span>
}

const tutors = [
  { initials: 'MR', name: 'Marcus R.', score: '1580 SAT', tests: 'SAT',      rate: '$65/hr', specialty: 'Math & Evidence-Based Reading', students: 47,  avgGain: '+210 pts' },
  { initials: 'JP', name: 'Jordan P.', score: '36 ACT',   tests: 'ACT',      rate: '$70/hr', specialty: 'Science Reasoning & Reading',   students: 38,  avgGain: '+4 pts'   },
  { initials: 'AK', name: 'Anika K.',  score: '1570 SAT', tests: 'SAT & ACT',rate: '$60/hr', specialty: 'Writing & Language',            students: 52,  avgGain: '+180 pts' },
]

function TutorModal({ onClose, openOnStep }) {
  const [step, setStep] = useState(openOnStep || 1)
  const [selectedTest, setSelectedTest] = useState(null)

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className={`relative bg-white rounded-t-2xl sm:rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.18)] overflow-hidden w-full ${step === 2 ? 'sm:max-w-3xl' : 'sm:max-w-md'}`}
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        layout
      >
        <div className="bg-[#1a1a1a] px-5 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
            <span className="text-[11px] font-semibold text-white tracking-wide">8 spots left this month</span>
          </div>
          <span className="text-[11px] font-bold text-white">$29 · one-time</span>
        </div>
        <div className="p-6 sm:p-8">
          <button onClick={onClose} className="absolute top-[52px] right-6 text-[#9ca3af] hover:text-[#1a1a1a] transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.18 }}>
                <h3 className="text-[22px] font-black tracking-[-0.03em] text-[#1a1a1a] leading-tight mb-1">Find your tutor.</h3>
                <p className="text-[13px] text-[#6b6b6b] font-normal mb-7">
                  Tell us your test and target. We'll get on a call, learn exactly what you need, and match you with 3 tutors you can compare side by side.
                </p>
                <div className="space-y-4 mb-7">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-widest mb-2">Which test?</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['SAT', 'ACT'].map((t) => (
                        <button key={t} onClick={() => setSelectedTest(t)}
                          className={`py-2.5 rounded-lg border text-[13px] font-semibold transition-colors ${selectedTest === t ? 'bg-[#1a1a1a] border-[#1a1a1a] text-white' : 'border-[#e5e7eb] text-[#1a1a1a] hover:border-[#d1d5db]'}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-widest mb-2">Target score</label>
                    <input type="text" placeholder={selectedTest === 'ACT' ? 'e.g. 34' : 'e.g. 1500'}
                      className="w-full border border-[#e5e7eb] rounded-lg px-3.5 py-2.5 text-[13px] text-[#1a1a1a] placeholder-[#9ca3af] outline-none focus:border-[#1a1a1a] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-widest mb-2">Your email</label>
                    <input type="email" placeholder="you@email.com"
                      className="w-full border border-[#e5e7eb] rounded-lg px-3.5 py-2.5 text-[13px] text-[#1a1a1a] placeholder-[#9ca3af] outline-none focus:border-[#1a1a1a] transition-colors" />
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="w-full py-3 bg-[#1a1a1a] text-white rounded-lg text-[13px] font-semibold hover:bg-[#2563eb] transition-colors">
                  Show me my matches →
                </button>
                <p className="mt-3 text-center text-[11px] text-[#9ca3af]">$29 locked in. We call you within 24 hours.</p>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} transition={{ duration: 0.18 }}>
                <h3 className="text-[22px] font-black tracking-[-0.03em] text-[#1a1a1a] leading-tight mb-1">Your matches.</h3>
                <p className="text-[13px] text-[#6b6b6b] font-normal mb-6">All scored in the top 1%. Pick the one that fits you best.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  {tutors.map((tutor, i) => (
                    <div key={tutor.name} className={`border rounded-xl p-5 flex flex-col gap-4 ${i === 0 ? 'border-[#1a1a1a]' : 'border-[#e5e7eb]'}`}>
                      {i === 0 && (
                        <div className="-mt-5 -mx-5 mb-0 bg-[#1a1a1a] rounded-t-xl px-3 py-1.5 text-center">
                          <span className="text-[10px] font-semibold text-white tracking-wide">Best match</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-[#f3f4f6] flex items-center justify-center flex-shrink-0">
                          <span className="text-[11px] font-bold text-[#1a1a1a]">{tutor.initials}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold text-[#1a1a1a] truncate">{tutor.name}</p>
                          <p className="text-[10px] text-[#9ca3af]">{tutor.tests}</p>
                        </div>
                      </div>
                      <div className="space-y-2 flex-1">
                        {[['Score', tutor.score], ['Rate', tutor.rate], ['Avg gain', tutor.avgGain], ['Students', `${tutor.students} helped`]].map(([label, val]) => (
                          <div key={label} className="flex justify-between text-[11px]">
                            <span className="text-[#9ca3af]">{label}</span>
                            <span className="font-semibold text-[#1a1a1a]">{val}</span>
                          </div>
                        ))}
                        <p className="text-[10px] text-[#6b6b6b] pt-1 leading-relaxed border-t border-[#f3f4f6]">{tutor.specialty}</p>
                      </div>
                      <button className={`w-full py-2 rounded-lg text-[12px] font-semibold transition-colors ${i === 0 ? 'bg-[#1a1a1a] text-white hover:bg-[#2563eb]' : 'border border-[#e5e7eb] text-[#1a1a1a] hover:border-[#1a1a1a]'}`}>
                        Choose {tutor.name.split(' ')[0]}
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-center text-[11px] text-[#9ca3af]">
                  <button onClick={() => setStep(1)} className="underline hover:text-[#1a1a1a] transition-colors">← Back</button>
                  {' · '}$29 one-time · 8 spots left this month
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

export default function Pricing() {
  const [modalOpen, setModalOpen] = useState(false)
  const [compareOpen, setCompareOpen] = useState(false)

  return (
    <section className="py-20 md:py-24 px-6 bg-[#f9fafb] border-t border-[#e5e7eb]">
      <div className="max-w-4xl mx-auto">

        <div className="mb-12">
          <h2 className="text-[32px] md:text-[40px] font-black tracking-[-0.04em] text-[#1a1a1a] leading-tight">
            Simple, honest pricing.
          </h2>
          <p className="mt-3 text-[16px] text-[#6b6b6b] font-normal max-w-lg">
            Free to search and chat. Upgrade the moment you want real answers.
          </p>
        </div>

        {/* Plan cards — clean, minimal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">

          {/* Free */}
          <div className="bg-white border border-[#e5e7eb] rounded-2xl p-7 flex flex-col">
            <p className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-4">Free</p>
            <div className="mb-5">
              <span className="text-[40px] font-black tracking-[-0.04em] text-[#1a1a1a] leading-none">$0</span>
              <p className="mt-1.5 text-[12px] text-[#9ca3af] font-normal">Free forever</p>
            </div>
            <p className="text-[13px] text-[#6b6b6b] leading-relaxed mb-6 flex-1">
              College search, AI chat (15 questions/mo), up to 5 saved schools, and a student profile.
            </p>
            <a href="#" className="block w-full text-center text-[13px] font-semibold py-2.5 rounded-lg border border-[#e5e7eb] text-[#1a1a1a] hover:bg-[#f9fafb] transition-colors">
              Start free
            </a>
          </div>

          {/* Student */}
          <div className="bg-white border-2 border-[#1a1a1a] rounded-2xl p-7 flex flex-col relative">
            <div className="absolute -top-3.5 left-6">
              <span className="bg-[#1a1a1a] text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wide">
                Best for most students
              </span>
            </div>
            <p className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-4">Student</p>
            <div className="mb-5">
              <div className="flex items-end gap-2">
                <span className="text-[40px] font-black tracking-[-0.04em] text-[#1a1a1a] leading-none">$42</span>
                <span className="text-[12px] text-[#9ca3af] mb-1.5 font-normal">one-time</span>
              </div>
              <p className="mt-1.5 text-[12px] text-[#9ca3af] font-normal">Pay once, yours all season</p>
            </div>
            <p className="text-[13px] text-[#6b6b6b] leading-relaxed mb-6 flex-1">
              Unlimited AI chat, essay feedback, fit scores, full CDS data, and school comparison.
            </p>
            <a href="#" className="block w-full text-center text-[13px] font-semibold py-2.5 rounded-lg bg-[#1a1a1a] text-white hover:bg-[#2563eb] transition-colors">
              Get started
            </a>
            <p className="mt-2 text-center text-[11px] text-[#9ca3af]">Most students upgrade within a week.</p>
          </div>

          {/* Tutor Connection */}
          <div className="bg-[#1a1a1a] rounded-2xl p-7 flex flex-col relative overflow-hidden">
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
              <span className="text-[10px] font-semibold text-white">8 left</span>
            </div>
            <p className="text-[11px] font-semibold text-white/50 uppercase tracking-widest mb-4">Add-on</p>
            <div className="mb-5">
              <div className="flex items-end gap-2">
                <span className="text-[40px] font-black tracking-[-0.04em] text-white leading-none">$29</span>
                <span className="text-[12px] text-white/50 mb-1.5 font-normal">one-time</span>
              </div>
              <p className="mt-1.5 text-[12px] text-white/50 font-normal">Tutor Connection</p>
            </div>
            <p className="text-[13px] text-white/60 leading-relaxed mb-6 flex-1">
              A 30-min call, then matched with 3 vetted SAT/ACT tutors you compare side by side.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="w-full text-center text-[13px] font-semibold py-2.5 rounded-lg bg-white text-[#1a1a1a] hover:bg-[#2563eb] hover:text-white transition-colors"
            >
              Find my tutor →
            </button>
          </div>
        </div>

        {/* Compare all plans toggle */}
        <div className="flex justify-center mb-0">
          <button
            onClick={() => setCompareOpen(o => !o)}
            className="flex items-center gap-1.5 text-[13px] text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors font-medium py-2"
          >
            <span>{compareOpen ? 'Hide comparison' : 'Compare all plans'}</span>
            <svg
              width="14" height="14" viewBox="0 0 14 14" fill="none"
              className={`transition-transform duration-200 ${compareOpen ? 'rotate-180' : ''}`}
            >
              <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Comparison table */}
        <AnimatePresence>
          {compareOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-4 bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden">
                {/* Table header */}
                <div className="grid grid-cols-[1fr_80px_80px_80px] sm:grid-cols-[1fr_100px_120px_120px] border-b border-[#f3f4f6]">
                  <div className="px-6 py-4" />
                  {['Free', 'Student', 'Tutor'].map((h, i) => (
                    <div key={h} className={`px-3 py-4 text-center ${i === 1 ? 'bg-[#fafafa]' : ''}`}>
                      <p className={`text-[11px] font-bold uppercase tracking-widest ${i === 1 ? 'text-[#1a1a1a]' : 'text-[#9ca3af]'}`}>{h}</p>
                    </div>
                  ))}
                </div>

                {compareRows.map((group) => (
                  <div key={group.group}>
                    {/* Group label */}
                    <div className="grid grid-cols-[1fr_80px_80px_80px] sm:grid-cols-[1fr_100px_120px_120px] bg-[#f9fafb] border-b border-[#f3f4f6]">
                      <div className="px-6 py-2.5 col-span-4">
                        <span className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-widest">{group.group}</span>
                      </div>
                    </div>
                    {/* Feature rows */}
                    {group.features.map((row, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-[1fr_80px_80px_80px] sm:grid-cols-[1fr_100px_120px_120px] border-b border-[#f8f8f8] last:border-0 hover:bg-[#fafafa] transition-colors"
                      >
                        <div className="px-6 py-3 flex items-center">
                          <span className="text-[13px] text-[#1a1a1a] font-normal">{row.label}</span>
                        </div>
                        <div className="px-3 py-3 flex items-center justify-center">
                          <CellValue val={row.free} />
                        </div>
                        <div className="px-3 py-3 flex items-center justify-center bg-[#fafafa]">
                          <CellValue val={row.student} />
                        </div>
                        <div className="px-3 py-3 flex items-center justify-center">
                          <CellValue val={row.tutor} />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}

                {/* CTA row */}
                <div className="grid grid-cols-[1fr_80px_80px_80px] sm:grid-cols-[1fr_100px_120px_120px] border-t border-[#e5e7eb] bg-[#fafafa]">
                  <div className="px-6 py-4" />
                  <div className="px-3 py-4 flex items-center justify-center">
                    <a href="#" className="text-[11px] font-semibold text-[#6b6b6b] hover:text-[#1a1a1a] underline underline-offset-2 transition-colors">Start free</a>
                  </div>
                  <div className="px-3 py-4 flex items-center justify-center bg-[#fafafa]">
                    <a href="#" className="text-[11px] font-semibold text-[#1a1a1a] underline underline-offset-2 hover:text-[#2563eb] transition-colors">Get started</a>
                  </div>
                  <div className="px-3 py-4 flex items-center justify-center">
                    <button onClick={() => setModalOpen(true)} className="text-[11px] font-semibold text-[#2563eb] underline underline-offset-2 hover:text-[#1d4ed8] transition-colors">Find tutor</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <AnimatePresence>
        {modalOpen && <TutorModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </section>
  )
}
