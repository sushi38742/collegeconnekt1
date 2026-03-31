import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Check() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="flex-shrink-0 mt-[2px]">
      <path d="M2 6.5L5 9.5L11 3.5" stroke="#1a1a1a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function Lock() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0 mt-[3px]">
      <rect x="2" y="5" width="8" height="6" rx="1.5" stroke="#d1d5db" strokeWidth="1.2"/>
      <path d="M4 5V3.5C4 2.4 4.9 1.5 6 1.5C7.1 1.5 8 2.4 8 3.5V5" stroke="#d1d5db" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

const freeFeatures = [
  { text: 'Fit scores for up to 5 schools', active: true },
  { text: 'Action plan — up to 10 tasks', active: true },
  { text: 'Common App deadline checklist', active: true },
  { text: '1 essay review per month', active: true },
  { text: 'Email deadline reminders', active: true },
  { text: 'Unlimited school tracking', active: false },
  { text: 'Unlimited essay reviews', active: false },
  { text: 'AI essay drafts', active: false },
]

const studentFeatures = [
  'Unlimited school fit scores',
  'Full action plan — unlimited tasks',
  'Common App deadline checklist',
  'Unlimited essay reviews',
  'AI essay drafts',
  'Email and SMS reminders',
  'Deadline alerts for every school',
  'Priority support',
]

const tutorFeatures = [
  '30-minute call with our team',
  'We learn your target score & timeline',
  'Matched with 3 vetted SAT/ACT tutors',
  'Side-by-side tutor comparison',
  'Direct intro — no marketplace',
  'One-time fee, no ongoing commitment',
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
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        layout
      >
        {/* Sale banner */}
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

                {/* All 3 tutors side by side */}
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
      <div className="max-w-5xl mx-auto">

        <div className="mb-12 md:mb-14">
          <h2 className="text-[32px] md:text-[40px] font-black tracking-[-0.04em] text-[#1a1a1a] leading-tight">
            Simple, honest pricing.
          </h2>
          <p className="mt-3 text-[16px] text-[#6b6b6b] font-normal">
            Free to start. One-time to own it. Most students upgrade within a week.
          </p>
        </div>

        {/* Three plans side by side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Free */}
          <motion.div
            className="bg-white border border-[#e5e7eb] rounded-2xl p-8 flex flex-col"
            whileHover={{ y: -3, transition: { duration: 0.18, ease: 'easeOut' } }}
          >
            <p className="text-[13px] font-semibold text-[#1a1a1a] mb-1">Free</p>
            <p className="text-[12px] text-[#9ca3af] font-normal mb-6">Start here. No card required.</p>

            <div className="mb-8">
              <span className="text-[42px] font-black tracking-[-0.04em] text-[#1a1a1a] leading-none">$0</span>
              <p className="mt-1.5 text-[12px] text-[#9ca3af] font-normal">Free forever</p>
            </div>

            <ul className="space-y-3 flex-1 mb-8">
              {freeFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  {f.active ? <Check /> : <Lock />}
                  <span className={`text-[13px] leading-snug font-normal ${f.active ? 'text-[#1a1a1a]' : 'text-[#c4c4c4]'}`}>
                    {f.text}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="w-full text-center text-[13px] font-medium py-2.5 rounded-lg border border-[#e5e7eb] text-[#1a1a1a] hover:bg-[#f9fafb] transition-colors"
            >
              Start free
            </a>
          </motion.div>

          {/* Student — always the best pick */}
          <motion.div
            className="bg-white border-2 border-[#1a1a1a] rounded-2xl p-8 flex flex-col relative"
            whileHover={{ y: -3, transition: { duration: 0.18, ease: 'easeOut' } }}
          >
            <div className="absolute -top-3.5 left-6">
              <span className="bg-[#1a1a1a] text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wide">
                Best for most students
              </span>
            </div>

            <div className="flex items-start justify-between mb-1">
              <p className="text-[13px] font-semibold text-[#1a1a1a]">Student</p>
              <span className="text-[10px] font-semibold text-[#1a1a1a] border border-[#1a1a1a] px-2 py-0.5 rounded">
                Full access
              </span>
            </div>
            <p className="text-[12px] text-[#9ca3af] font-normal mb-6">Everything for your entire application season.</p>

            <div className="mb-8">
              <div className="flex items-end gap-2">
                <span className="text-[42px] font-black tracking-[-0.04em] text-[#1a1a1a] leading-none">$42</span>
                <span className="text-[13px] text-[#9ca3af] mb-1.5 font-normal">one-time</span>
              </div>
              <p className="mt-1.5 text-[12px] text-[#9ca3af] font-normal">Pay once. Yours for the full season.</p>
            </div>

            <ul className="space-y-3 flex-1 mb-8">
              {studentFeatures.map((text, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Check />
                  <span className="text-[13px] text-[#1a1a1a] leading-snug font-normal">{text}</span>
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="w-full text-center text-[13px] font-medium py-2.5 rounded-lg bg-[#1a1a1a] text-white hover:bg-[#2563eb] transition-colors"
            >
              Get started
            </a>
            <p className="mt-2.5 text-center text-[11px] text-[#9ca3af]">Most students upgrade within a week.</p>
          </motion.div>

          {/* Tutor Connection */}
          <motion.div
            className="bg-white border border-[#e5e7eb] rounded-2xl p-8 flex flex-col relative overflow-hidden"
            whileHover={{ y: -3, transition: { duration: 0.18, ease: 'easeOut' } }}
          >
            {/* Limited banner inside card */}
            <div className="absolute top-0 left-0 right-0 bg-[#2563eb] px-4 py-1.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] font-semibold text-white tracking-wide">8 spots left this month</span>
            </div>

            <div className="mt-6">
              <p className="text-[13px] font-semibold text-[#1a1a1a] mb-1">Tutor Connection</p>
              <p className="text-[12px] text-[#9ca3af] font-normal mb-6">A call + a personal match with the right tutor.</p>

              <div className="mb-8">
                <div className="flex items-end gap-2">
                  <span className="text-[42px] font-black tracking-[-0.04em] text-[#1a1a1a] leading-none">$29</span>
                  <span className="text-[13px] text-[#9ca3af] mb-1.5 font-normal">one-time</span>
                </div>
                <p className="mt-1.5 text-[12px] text-[#9ca3af] font-normal">30-min call. Matched in 24 hours.</p>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {tutorFeatures.map((text, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check />
                    <span className="text-[13px] text-[#1a1a1a] leading-snug font-normal">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="w-full text-center text-[13px] font-medium py-2.5 rounded-lg bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition-colors"
            >
              Find my tutor →
            </button>
            <p className="mt-2.5 text-center text-[11px] text-[#9ca3af]">Compare all 3 matches before you decide.</p>
          </motion.div>

        </div>
      </div>

      <AnimatePresence>
        {modalOpen && <TutorModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </section>
  )
}
