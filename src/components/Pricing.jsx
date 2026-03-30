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
  const [comparing, setComparing] = useState([])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const toggleCompare = (name) => {
    setComparing((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : prev.length < 2 ? [...prev, name] : prev
    )
  }

  const comparingTutors = tutors.filter((t) => comparing.includes(t.name))

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
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
        className="relative bg-white rounded-2xl w-full max-w-lg shadow-[0_24px_80px_rgba(0,0,0,0.18)] overflow-hidden"
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Limited sale banner */}
        <div className="bg-[#1a1a1a] px-5 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
            <span className="text-[11px] font-semibold text-white tracking-wide">8 spots left this month</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#6b7280] line-through">$99</span>
            <span className="text-[11px] font-bold text-white">$42 intro rate</span>
          </div>
        </div>

        <div className="p-8">
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
                  Tell us your target. We show you matched tutors — compare side by side before you pick.
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
                <p className="mt-3 text-center text-[11px] text-[#9ca3af]">$42 locked in. No commitment until you pick.</p>
              </motion.div>
            )}

            {step === 2 && comparing.length === 0 && (
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
                  All scored in the top 1%. Select up to 2 to compare side by side.
                </p>

                <div className="space-y-2.5 mb-6">
                  {tutors.map((tutor) => {
                    const isSelected = comparing.includes(tutor.name)
                    return (
                      <div
                        key={tutor.name}
                        onClick={() => toggleCompare(tutor.name)}
                        className={`flex items-center gap-4 border rounded-xl p-4 cursor-pointer transition-colors ${
                          isSelected ? 'border-[#1a1a1a] bg-[#fafafa]' : 'border-[#e5e7eb] hover:border-[#d1d5db]'
                        }`}
                      >
                        <div className="w-9 h-9 rounded-full bg-[#f3f4f6] flex items-center justify-center flex-shrink-0">
                          <span className="text-[11px] font-bold text-[#1a1a1a]">{tutor.initials}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-[13px] font-semibold text-[#1a1a1a]">{tutor.name}</p>
                            <span className="text-[10px] text-[#9ca3af] border border-[#e5e7eb] px-1.5 py-0.5 rounded">{tutor.tests}</span>
                          </div>
                          <p className="text-[11px] text-[#6b6b6b] font-normal mt-0.5">{tutor.specialty}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-[12px] font-bold text-[#1a1a1a]">{tutor.score}</p>
                          <p className="text-[11px] text-[#9ca3af]">{tutor.rate}</p>
                        </div>
                        <div className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${isSelected ? 'bg-[#1a1a1a] border-[#1a1a1a]' : 'border-[#d1d5db]'}`}>
                          {isSelected && (
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                              <path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="flex gap-2">
                  <button
                    disabled={comparing.length === 0}
                    onClick={() => comparing.length === 2 && setStep(3)}
                    className={`flex-1 py-2.5 rounded-lg text-[13px] font-semibold transition-colors border ${
                      comparing.length === 2
                        ? 'border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#f9fafb]'
                        : 'border-[#e5e7eb] text-[#9ca3af] cursor-not-allowed'
                    }`}
                  >
                    Compare {comparing.length === 2 ? '2 selected' : '(select 2)'}
                  </button>
                  <button
                    disabled={comparing.length === 0}
                    className={`flex-1 py-2.5 rounded-lg text-[13px] font-semibold transition-colors ${
                      comparing.length > 0
                        ? 'bg-[#1a1a1a] text-white hover:bg-[#2563eb]'
                        : 'bg-[#f3f4f6] text-[#9ca3af] cursor-not-allowed'
                    }`}
                  >
                    Claim $42 rate
                  </button>
                </div>
                <p className="mt-3 text-center text-[11px] text-[#9ca3af]">
                  <button onClick={() => setStep(1)} className="underline hover:text-[#1a1a1a] transition-colors">Back</button>
                  {' · '}8 spots left
                </p>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.18 }}
              >
                <h3 className="text-[22px] font-black tracking-[-0.03em] text-[#1a1a1a] leading-tight mb-1">
                  Side by side.
                </h3>
                <p className="text-[13px] text-[#6b6b6b] font-normal mb-6">Pick the one that fits you best.</p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {comparingTutors.map((tutor) => (
                    <div key={tutor.name} className="border border-[#e5e7eb] rounded-xl p-5 flex flex-col gap-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#f3f4f6] flex items-center justify-center flex-shrink-0">
                          <span className="text-[11px] font-bold text-[#1a1a1a]">{tutor.initials}</span>
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-[#1a1a1a]">{tutor.name}</p>
                          <p className="text-[10px] text-[#9ca3af]">{tutor.tests}</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-[12px]">
                        {[
                          ['Score', tutor.score],
                          ['Rate', tutor.rate],
                          ['Avg gain', tutor.avgGain],
                          ['Students', `${tutor.students} helped`],
                        ].map(([label, val]) => (
                          <div key={label} className="flex justify-between">
                            <span className="text-[#9ca3af]">{label}</span>
                            <span className="font-semibold text-[#1a1a1a]">{val}</span>
                          </div>
                        ))}
                      </div>
                      <button className="w-full py-2 bg-[#1a1a1a] text-white rounded-lg text-[12px] font-semibold hover:bg-[#2563eb] transition-colors">
                        Choose {tutor.name.split(' ')[0]}
                      </button>
                    </div>
                  ))}
                </div>

                <p className="text-center text-[11px] text-[#9ca3af]">
                  <button onClick={() => { setStep(2); setComparing([]) }} className="underline hover:text-[#1a1a1a] transition-colors">
                    ← See all tutors
                  </button>
                  {' · '}$42 one-time · 8 spots left
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
    <section className="py-24 px-6 bg-[#f9fafb] border-t border-[#e5e7eb]">
      <div className="max-w-5xl mx-auto">

        <div className="mb-14">
          <h2 className="text-[40px] font-black tracking-[-0.04em] text-[#1a1a1a] leading-tight">
            Simple, honest pricing.
          </h2>
          <p className="mt-3 text-[16px] text-[#6b6b6b] font-normal">
            Free to start. $8/month for everything. Most students upgrade within a week.
          </p>
        </div>

        {/* Two plan columns */}
        <div className="grid grid-cols-2 gap-5 max-w-3xl">
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

          {/* Student — always positioned as the right choice */}
          <motion.div
            className="bg-white border-2 border-[#1a1a1a] rounded-2xl p-8 flex flex-col relative"
            whileHover={{ y: -3, transition: { duration: 0.18, ease: 'easeOut' } }}
          >
            {/* Best value tag */}
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
            <p className="text-[12px] text-[#9ca3af] font-normal mb-6">Everything, for the length of your application season.</p>

            <div className="mb-8">
              <div className="flex items-end gap-2">
                <span className="text-[42px] font-black tracking-[-0.04em] text-[#1a1a1a] leading-none">$8</span>
                <span className="text-[13px] text-[#9ca3af] mb-1.5 font-normal">/ month</span>
              </div>
              <p className="mt-1.5 text-[12px] text-[#9ca3af] font-normal">Cancel any time. No commitment.</p>
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
            <p className="mt-2.5 text-center text-[11px] text-[#9ca3af]">Most students upgrade within a week of signing up.</p>
          </motion.div>
        </div>

        {/* Tutor matching add-on */}
        <div className="mt-5 max-w-3xl">
          <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden">
            <div className="bg-[#2563eb] px-6 py-2.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-[11px] font-semibold text-white tracking-wide">Limited intro offer — 8 spots left this month</span>
              <span className="ml-auto text-[11px] text-white/60 line-through">$99</span>
              <span className="ml-1.5 text-[11px] font-bold text-white">$42 today</span>
            </div>

            <div className="p-7 grid grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <p className="text-[11px] font-semibold text-[#6b6b6b] uppercase tracking-widest mb-3">Tutor Matching</p>
                <h3 className="text-[20px] font-black tracking-[-0.03em] text-white leading-tight mb-2">
                  Get matched with the right ACT or SAT tutor.
                </h3>
                <p className="text-[13px] text-[#9ca3af] leading-relaxed font-normal">
                  Tell us your target score. We match you with a top-1% scorer who specializes in exactly that — not a marketplace, a personal match. Compare options side by side before you commit.
                </p>
                <div className="flex items-center gap-4 mt-4">
                  {['Top 1% scorers only', 'SAT & ACT', 'Compare before you pick'].map((tag, i) => (
                    <span key={i} className="flex items-center gap-1.5 text-[11px] text-[#6b6b6b] font-normal">
                      <span className="w-1 h-1 rounded-full bg-[#6b6b6b]" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="mb-4">
                  <span className="text-[38px] font-black tracking-[-0.04em] text-white leading-none">$42</span>
                  <p className="text-[12px] text-[#6b6b6b] mt-1 font-normal">one-time · compare &amp; pick</p>
                </div>
                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-block text-[13px] font-medium px-6 py-2.5 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors whitespace-nowrap"
                >
                  Find my tutor →
                </button>
              </div>
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
