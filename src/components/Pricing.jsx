import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Check() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="flex-shrink-0 mt-[1px]">
      <circle cx="6.5" cy="6.5" r="6.5" fill="#e8f0fe"/>
      <path d="M3.5 6.5l2 2 4-4" stroke="#2563eb" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function Lock() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="flex-shrink-0 mt-[1px]">
      <rect x="3" y="6" width="7" height="5.5" rx="1.2" stroke="#d1d5db" strokeWidth="1.1"/>
      <path d="M5 6V4.5C5 3.4 5.9 2.5 7 2.5C8.1 2.5 9 3.4 9 4.5V6" stroke="#d1d5db" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  )
}

const compareGroups = [
  { label: 'College Search', rows: [
    { text: 'College search & browse',           free: true,  student: true,  pro: true  },
    { text: 'Saved schools',                     free: '3',   student: '∞',   pro: '∞'   },
    { text: 'School comparison tool',            free: false, student: true,  pro: true  },
    { text: 'Full CDS data breakdowns',          free: false, student: true,  pro: true  },
  ]},
  { label: 'AI Assistant', rows: [
    { text: 'AI chat',                           free: '15/mo', student: '∞', pro: '∞'  },
    { text: 'Priority AI responses',             free: false, student: false, pro: true  },
  ]},
  { label: 'Essays & Admissions', rows: [
    { text: 'Essay analysis & feedback',         free: false, student: false, pro: true  },
    { text: 'Essay draft assist',                free: false, student: false, pro: true  },
    { text: 'Admissions fit scoring',            free: false, student: false, pro: true  },
    { text: 'AI action plan (monthly updates)',  free: false, student: false, pro: true  },
  ]},
  { label: 'Profile & Planning', rows: [
    { text: 'Student profile',                   free: true,  student: true,  pro: true  },
    { text: 'Deadline calendar',                 free: true,  student: true,  pro: true  },
  ]},
]

function CellValue({ val }) {
  if (val === true)   return <div className="flex justify-center"><Check /></div>
  if (val === false)  return <div className="flex justify-center"><Lock /></div>
  return <span className="text-[12px] font-semibold text-[#1a1a1a]">{val}</span>
}

const tutors = [
  { initials: 'MR', name: 'Marcus R.', score: '1580 SAT', tests: 'SAT',       rate: '$65/hr', specialty: 'Math & Evidence-Based Reading', students: 47, avgGain: '+210 pts' },
  { initials: 'JP', name: 'Jordan P.', score: '36 ACT',   tests: 'ACT',       rate: '$70/hr', specialty: 'Science Reasoning & Reading',   students: 38, avgGain: '+4 pts'   },
  { initials: 'AK', name: 'Anika K.',  score: '1570 SAT', tests: 'SAT & ACT', rate: '$60/hr', specialty: 'Writing & Language',            students: 52, avgGain: '+180 pts' },
]

function TutorModal({ onClose }) {
  const [step, setStep] = useState(1)
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
          <span className="text-[11px] font-bold text-white">$12 add-on</span>
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
                      {['SAT', 'ACT'].map(t => (
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
                <p className="mt-3 text-center text-[11px] text-[#9ca3af]">$12 locked in. We call you within 24 hours.</p>
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
                  {' · '}$12 one-time · 8 spots left this month
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
      <div className="max-w-5xl mx-auto">

        <div className="mb-12">
          <h2 className="text-[32px] md:text-[40px] font-black tracking-[-0.04em] text-[#1a1a1a] leading-tight">
            Simple, honest pricing.
          </h2>
          <p className="mt-3 text-[16px] text-[#6b6b6b] font-normal max-w-lg">
            Free to search and chat. One-time to unlock everything.
          </p>
        </div>

        {/* Three plan columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

          {/* Free */}
          <div className="bg-white border border-[#e5e7eb] rounded-2xl p-7 flex flex-col">
            <p className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-4">Free</p>
            <div className="mb-5">
              <span className="text-[40px] font-black tracking-[-0.04em] text-[#1a1a1a] leading-none">$0</span>
              <p className="mt-1.5 text-[12px] text-[#9ca3af] font-normal">Free forever</p>
            </div>
            <p className="text-[13px] text-[#6b6b6b] leading-relaxed mb-7 flex-1">
              College search, AI chat (15 questions/month), up to 3 saved schools, and a basic student profile.
            </p>
            <a href="#" className="block w-full text-center text-[13px] font-semibold py-2.5 rounded-lg border border-[#e5e7eb] text-[#1a1a1a] hover:bg-[#f9fafb] transition-colors">
              Start free — no card required
            </a>
          </div>

          {/* Student */}
          <div className="bg-white border border-[#e5e7eb] rounded-2xl p-7 flex flex-col">
            <p className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-4">Student</p>
            <div className="mb-5">
              <div className="flex items-end gap-2">
                <span className="text-[40px] font-black tracking-[-0.04em] text-[#1a1a1a] leading-none">$26</span>
                <span className="text-[12px] text-[#9ca3af] mb-1.5 font-normal">one-time</span>
              </div>
              <p className="mt-1.5 text-[12px] text-[#9ca3af] font-normal">Pay once, yours all season</p>
            </div>
            <p className="text-[13px] text-[#6b6b6b] leading-relaxed mb-7 flex-1">
              Everything in Free plus unlimited saved schools, full CDS data, school comparison, and unlimited AI chat.
            </p>
            <a href="#" className="block w-full text-center text-[13px] font-semibold py-2.5 rounded-lg border border-[#e5e7eb] text-[#1a1a1a] hover:bg-[#f9fafb] transition-colors">
              Get Student
            </a>
          </div>

          {/* Student Pro */}
          <div className="bg-white border-2 border-[#2563eb] rounded-2xl p-7 flex flex-col relative">
            <div className="absolute -top-3.5 right-6">
              <span className="bg-[#2563eb] text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wide">
                Most popular
              </span>
            </div>
            <p className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-4">Student Pro</p>
            <div className="mb-5">
              <div className="flex items-end gap-2">
                <span className="text-[40px] font-black tracking-[-0.04em] text-[#1a1a1a] leading-none">$42</span>
                <span className="text-[12px] text-[#9ca3af] mb-1.5 font-normal">one-time</span>
              </div>
              <p className="mt-1.5 text-[12px] text-[#9ca3af] font-normal">Pay once, yours all season</p>
            </div>
            <p className="text-[13px] text-[#6b6b6b] leading-relaxed mb-7 flex-1">
              Everything in Student plus essay analysis, admissions fit scoring, AI action plan, essay draft assist, and priority AI responses.
            </p>
            <a href="#" className="block w-full text-center text-[13px] font-semibold py-2.5 rounded-lg bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition-colors">
              Get Student Pro
            </a>
          </div>

        </div>

        {/* Tutor Connection — add-on */}
        <div className="bg-[#f9fafb] border border-dashed border-[#d1d5db] rounded-2xl px-7 py-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="text-[13px] font-bold text-[#1a1a1a]">Tutor Connection</span>
                <span className="text-[10px] font-semibold text-[#6b6b6b] bg-[#e5e7eb] px-2 py-0.5 rounded-full">Add-on · available on any plan</span>
              </div>
              <p className="text-[12px] text-[#6b6b6b] font-normal leading-relaxed">
                30-minute call with our team · Matched with vetted SAT/ACT tutors in 24 hours · Side-by-side tutor comparison · Direct intro, no marketplace, no ongoing commitment
              </p>
            </div>
            <div className="flex items-center gap-5 flex-shrink-0">
              <div className="text-right">
                <div className="flex items-end gap-1">
                  <span className="text-[28px] font-black tracking-[-0.04em] text-[#1a1a1a] leading-none">$12</span>
                  <span className="text-[11px] text-[#9ca3af] mb-1 font-normal">one-time</span>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="whitespace-nowrap px-5 py-2.5 border border-[#d1d5db] rounded-lg text-[13px] font-semibold text-[#1a1a1a] hover:border-[#1a1a1a] hover:bg-white transition-colors"
              >
                Add tutor connection →
              </button>
            </div>
          </div>
        </div>

        {/* Compare toggle */}
        <div className="flex justify-center mb-0">
          <button
            onClick={() => setCompareOpen(o => !o)}
            className="flex items-center gap-1.5 text-[13px] text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors font-medium py-2"
          >
            <span>{compareOpen ? 'Hide comparison' : 'Compare all plans'}</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
              className={`transition-transform duration-200 ${compareOpen ? 'rotate-180' : ''}`}>
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
                {/* Header */}
                <div className="grid grid-cols-[1fr_72px_72px_84px] sm:grid-cols-[1fr_100px_100px_120px] border-b border-[#f3f4f6]">
                  <div className="px-6 py-4" />
                  {[{ label: 'Free', highlight: false }, { label: 'Student', highlight: false }, { label: 'Pro', highlight: true }].map(({ label, highlight }) => (
                    <div key={label} className={`px-3 py-4 text-center ${highlight ? 'bg-[#eff6ff]' : ''}`}>
                      <p className={`text-[11px] font-bold uppercase tracking-widest ${highlight ? 'text-[#2563eb]' : 'text-[#9ca3af]'}`}>{label}</p>
                    </div>
                  ))}
                </div>

                {compareGroups.map((group) => (
                  <div key={group.label}>
                    <div className="bg-[#f9fafb] border-b border-[#f3f4f6] px-6 py-2">
                      <span className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-widest">{group.label}</span>
                    </div>
                    {group.rows.map((row, i) => (
                      <div key={i} className="grid grid-cols-[1fr_72px_72px_84px] sm:grid-cols-[1fr_100px_100px_120px] border-b border-[#f8f8f8] last:border-0 hover:bg-[#fafafa] transition-colors">
                        <div className="px-6 py-3 flex items-center">
                          <span className="text-[13px] text-[#1a1a1a] font-normal">{row.text}</span>
                        </div>
                        <div className="px-3 py-3 flex items-center justify-center text-center">
                          <CellValue val={row.free} />
                        </div>
                        <div className="px-3 py-3 flex items-center justify-center text-center">
                          <CellValue val={row.student} />
                        </div>
                        <div className="px-3 py-3 flex items-center justify-center text-center bg-[#eff6ff]/40">
                          <CellValue val={row.pro} />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}

                {/* CTA row */}
                <div className="grid grid-cols-[1fr_72px_72px_84px] sm:grid-cols-[1fr_100px_100px_120px] border-t border-[#e5e7eb] bg-[#fafafa]">
                  <div className="px-6 py-4" />
                  <div className="px-3 py-4 flex items-center justify-center">
                    <a href="#" className="text-[11px] font-semibold text-[#9ca3af] hover:text-[#1a1a1a] underline underline-offset-2 transition-colors">Start free</a>
                  </div>
                  <div className="px-3 py-4 flex items-center justify-center">
                    <a href="#" className="text-[11px] font-semibold text-[#6b6b6b] hover:text-[#1a1a1a] underline underline-offset-2 transition-colors">$26</a>
                  </div>
                  <div className="px-3 py-4 flex items-center justify-center bg-[#eff6ff]/40">
                    <a href="#" className="text-[11px] font-semibold text-[#2563eb] hover:text-[#1d4ed8] underline underline-offset-2 transition-colors">$42</a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* One-time reassurance */}
        <p className="mt-8 text-center text-[12px] text-[#9ca3af] font-normal">
          One-time means one-time. No subscriptions, no renewals, no surprises.
        </p>

      </div>

      <AnimatePresence>
        {modalOpen && <TutorModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </section>
  )
}
