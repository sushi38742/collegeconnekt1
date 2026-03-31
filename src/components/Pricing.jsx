import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Check({ blue }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-[1px]">
      <circle cx="7" cy="7" r="7" fill={blue ? '#2563eb' : '#1a1a1a'}/>
      <path d="M4 7l2 2 4-4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function Lock() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-[1px]">
      <circle cx="7" cy="7" r="7" fill="#f3f4f6"/>
      <rect x="4.5" y="6.5" width="5" height="4" rx="1" stroke="#d1d5db" strokeWidth="1.1"/>
      <path d="M5.5 6.5V5.5C5.5 4.7 6.2 4 7 4C7.8 4 8.5 4.7 8.5 5.5V6.5" stroke="#d1d5db" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  )
}

const featureGroups = [
  {
    label: 'College Search',
    rows: [
      { text: 'College search & browse', free: true, paid: true },
      { text: 'Saved school list', free: '5 schools', paid: 'Unlimited' },
      { text: 'School comparison tool', free: false, paid: true },
      { text: 'Full CDS data breakdowns', free: false, paid: true },
    ],
  },
  {
    label: 'AI Assistant',
    rows: [
      { text: 'AI chat', free: '15 questions/mo', paid: 'Unlimited' },
      { text: 'Admissions likelihood & fit score', free: false, paid: true },
    ],
  },
  {
    label: 'Essays',
    rows: [
      { text: 'Essay analysis & feedback', free: false, paid: true },
      { text: 'Personalized revision suggestions', free: false, paid: true },
    ],
  },
  {
    label: 'Profile & Planning',
    rows: [
      { text: 'Student profile', free: true, paid: true },
      { text: 'Deadline calendar', free: true, paid: true },
      { text: 'Priority support', free: false, paid: true },
    ],
  },
]

const tutorFeatures = [
  '30-min onboarding call with our team',
  'We learn your test, target score, and timeline',
  'Matched with 3 vetted SAT/ACT tutors',
  'Side-by-side tutor comparison',
  'Direct intro — no marketplace middleman',
]

const tutors = [
  {
    initials: 'MR',
    name: 'Marcus R.',
    score: '1580 SAT',
    tests: 'SAT',
    rate: '$65/hr',
    specialty: 'Math & Evidence-Based Reading',
    students: 47,
    avgGain: '+210 pts',
  },
  {
    initials: 'JP',
    name: 'Jordan P.',
    score: '36 ACT',
    tests: 'ACT',
    rate: '$70/hr',
    specialty: 'Science Reasoning & Reading',
    students: 38,
    avgGain: '+4 pts',
  },
  {
    initials: 'AK',
    name: 'Anika K.',
    score: '1570 SAT',
    tests: 'SAT & ACT',
    rate: '$60/hr',
    specialty: 'Writing & Language',
    students: 52,
    avgGain: '+180 pts',
  },
]

function FeatureValue({ val }) {
  if (val === true) return <Check />
  if (val === false) return <Lock />
  return <span className="text-[12px] font-medium text-[#1a1a1a]">{val}</span>
}

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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />

      <motion.div
        className={`relative bg-white rounded-t-2xl sm:rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.18)] overflow-hidden w-full ${step === 2 ? 'sm:max-w-3xl' : 'sm:max-w-md'}`}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
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
          <button
            onClick={onClose}
            className="absolute top-[52px] right-6 text-[#9ca3af] hover:text-[#1a1a1a] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.18 }}
              >
                <h3 className="text-[22px] font-black tracking-[-0.03em] text-[#1a1a1a] leading-tight mb-1">
                  Find your tutor.
                </h3>
                <p className="text-[13px] text-[#6b6b6b] font-normal mb-7">
                  Tell us your test and target. We'll get on a call, learn exactly what you need, and match you with 3 tutors you can compare side by side.
                </p>

                <div className="space-y-4 mb-7">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-widest mb-2">Which test?</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['SAT', 'ACT'].map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTest(t)}
                          className={`py-2.5 rounded-lg border text-[13px] font-semibold transition-colors ${
                            selectedTest === t
                              ? 'bg-[#1a1a1a] border-[#1a1a1a] text-white'
                              : 'border-[#e5e7eb] text-[#1a1a1a] hover:border-[#d1d5db]'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-widest mb-2">Target score</label>
                    <input
                      type="text"
                      placeholder={selectedTest === 'ACT' ? 'e.g. 34' : 'e.g. 1500'}
                      className="w-full border border-[#e5e7eb] rounded-lg px-3.5 py-2.5 text-[13px] text-[#1a1a1a] placeholder-[#9ca3af] outline-none focus:border-[#1a1a1a] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-widest mb-2">Your email</label>
                    <input
                      type="email"
                      placeholder="you@email.com"
                      className="w-full border border-[#e5e7eb] rounded-lg px-3.5 py-2.5 text-[13px] text-[#1a1a1a] placeholder-[#9ca3af] outline-none focus:border-[#1a1a1a] transition-colors"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full py-3 bg-[#1a1a1a] text-white rounded-lg text-[13px] font-semibold hover:bg-[#2563eb] transition-colors"
                >
                  Show me my matches →
                </button>
                <p className="mt-3 text-center text-[11px] text-[#9ca3af]">$29 locked in. We call you within 24 hours.</p>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.18 }}
              >
                <h3 className="text-[22px] font-black tracking-[-0.03em] text-[#1a1a1a] leading-tight mb-1">
                  Your matches.
                </h3>
                <p className="text-[13px] text-[#6b6b6b] font-normal mb-6">
                  All scored in the top 1%. Pick the one that fits you best.
                </p>

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
                        {[
                          ['Score', tutor.score],
                          ['Rate', tutor.rate],
                          ['Avg gain', tutor.avgGain],
                          ['Students', `${tutor.students} helped`],
                        ].map(([label, val]) => (
                          <div key={label} className="flex justify-between text-[11px]">
                            <span className="text-[#9ca3af]">{label}</span>
                            <span className="font-semibold text-[#1a1a1a]">{val}</span>
                          </div>
                        ))}
                        <p className="text-[10px] text-[#6b6b6b] pt-1 leading-relaxed border-t border-[#f3f4f6]">
                          {tutor.specialty}
                        </p>
                      </div>
                      <button className={`w-full py-2 rounded-lg text-[12px] font-semibold transition-colors ${
                        i === 0
                          ? 'bg-[#1a1a1a] text-white hover:bg-[#2563eb]'
                          : 'border border-[#e5e7eb] text-[#1a1a1a] hover:border-[#1a1a1a]'
                      }`}>
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

  return (
    <section className="py-20 md:py-24 px-6 bg-[#f9fafb] border-t border-[#e5e7eb]">
      <div className="max-w-4xl mx-auto">

        <div className="mb-12 md:mb-14">
          <h2 className="text-[32px] md:text-[40px] font-black tracking-[-0.04em] text-[#1a1a1a] leading-tight">
            Simple, honest pricing.
          </h2>
          <p className="mt-3 text-[16px] text-[#6b6b6b] font-normal max-w-lg">
            Free to search and chat. Upgrade the moment you want real answers.
          </p>
        </div>

        {/* Free vs Student — side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

          {/* Free */}
          <div className="bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden flex flex-col">
            <div className="px-8 pt-8 pb-6 border-b border-[#f3f4f6]">
              <p className="text-[12px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-3">Free</p>
              <div className="flex items-end gap-2 mb-1">
                <span className="text-[44px] font-black tracking-[-0.04em] text-[#1a1a1a] leading-none">$0</span>
              </div>
              <p className="text-[12px] text-[#9ca3af] font-normal mt-2">Free forever. No card required.</p>
              <a
                href="#"
                className="mt-5 block w-full text-center text-[13px] font-semibold py-2.5 rounded-lg border border-[#e5e7eb] text-[#1a1a1a] hover:bg-[#f9fafb] transition-colors"
              >
                Start free
              </a>
            </div>

            <div className="px-8 py-6 flex-1">
              {featureGroups.map((group) => (
                <div key={group.label} className="mb-6 last:mb-0">
                  <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-3">{group.label}</p>
                  <ul className="space-y-2.5">
                    {group.rows.map((row, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <div className="mt-0.5"><FeatureValue val={row.free} /></div>
                        <span className={`text-[13px] leading-snug font-normal ${row.free ? 'text-[#1a1a1a]' : 'text-[#c4c4c4]'}`}>
                          {row.text}
                          {typeof row.free === 'string' && (
                            <span className="ml-1.5 text-[11px] text-[#9ca3af]">({row.free})</span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Student */}
          <div className="bg-white border-2 border-[#1a1a1a] rounded-2xl overflow-hidden flex flex-col relative">
            <div className="absolute -top-3.5 left-6 z-10">
              <span className="bg-[#1a1a1a] text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wide">
                Best for most students
              </span>
            </div>

            <div className="px-8 pt-8 pb-6 border-b border-[#f3f4f6]">
              <p className="text-[12px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-3">Student</p>
              <div className="flex items-end gap-2 mb-1">
                <span className="text-[44px] font-black tracking-[-0.04em] text-[#1a1a1a] leading-none">$42</span>
                <span className="text-[13px] text-[#9ca3af] mb-2 font-normal">one-time</span>
              </div>
              <p className="text-[12px] text-[#9ca3af] font-normal mt-2">Pay once. Yours for the full application season.</p>
              <a
                href="#"
                className="mt-5 block w-full text-center text-[13px] font-semibold py-2.5 rounded-lg bg-[#1a1a1a] text-white hover:bg-[#2563eb] transition-colors"
              >
                Get started
              </a>
              <p className="mt-2.5 text-center text-[11px] text-[#9ca3af]">Most students upgrade within a week.</p>
            </div>

            <div className="px-8 py-6 flex-1">
              {featureGroups.map((group) => (
                <div key={group.label} className="mb-6 last:mb-0">
                  <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-3">{group.label}</p>
                  <ul className="space-y-2.5">
                    {group.rows.map((row, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <div className="mt-0.5"><FeatureValue val={row.paid} /></div>
                        <span className="text-[13px] text-[#1a1a1a] leading-snug font-normal">
                          {row.text}
                          {typeof row.paid === 'string' && (
                            <span className="ml-1.5 text-[11px] font-semibold text-[#2563eb]">({row.paid})</span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tutor Connection — add-on service, below the plans */}
        <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-0">
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="text-[11px] font-semibold text-white uppercase tracking-widest">Add-on service</span>
                <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
                  <span className="text-[10px] font-semibold text-white">8 spots left this month</span>
                </div>
              </div>

              <h3 className="text-[22px] md:text-[26px] font-black tracking-[-0.03em] text-white leading-tight mb-2">
                Tutor Connection
              </h3>
              <p className="text-[14px] text-white/60 font-normal max-w-md leading-relaxed mb-6">
                Not a plan — a personal service. We get on a call, learn your test and timeline, and match you with three vetted tutors you can compare side by side.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 mb-0">
                {tutorFeatures.map((text, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check blue />
                    <span className="text-[12px] text-white/75 font-normal leading-snug">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-center items-start md:items-center px-8 pb-8 md:px-10 md:py-10 md:border-l border-white/10 md:min-w-[220px]">
              <div className="mb-5">
                <div className="flex items-end gap-1.5">
                  <span className="text-[42px] font-black tracking-[-0.04em] text-white leading-none">$29</span>
                  <span className="text-[13px] text-white/50 mb-2 font-normal">one-time</span>
                </div>
                <p className="text-[12px] text-white/50 font-normal mt-1.5">30-min call. Matched in 24 hrs.</p>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="w-full px-6 py-3 bg-white text-[#1a1a1a] text-[13px] font-semibold rounded-lg hover:bg-[#2563eb] hover:text-white transition-colors whitespace-nowrap"
              >
                Find my tutor →
              </button>
              <p className="mt-2.5 text-center text-[11px] text-white/40">Compare all 3 matches before you commit.</p>
            </div>
          </div>
        </div>

      </div>

      <AnimatePresence>
        {modalOpen && <TutorModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </section>
  )
}
