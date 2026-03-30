import { motion } from 'framer-motion'

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

export default function Pricing() {
  return (
    <section className="py-24 px-6 bg-[#f9fafb] border-t border-[#e5e7eb]">
      <div className="max-w-5xl mx-auto">

        <div className="mb-14">
          <h2 className="text-[40px] font-black tracking-[-0.04em] text-[#1a1a1a] leading-tight">
            Simple, honest pricing.
          </h2>
          <p className="mt-3 text-[16px] text-[#6b6b6b] font-normal">
            Free to start. One payment for the full application season.
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

          {/* Student */}
          <motion.div
            className="bg-white border-2 border-[#1a1a1a] rounded-2xl p-8 flex flex-col"
            whileHover={{ y: -3, transition: { duration: 0.18, ease: 'easeOut' } }}
          >
            <div className="flex items-start justify-between mb-1">
              <p className="text-[13px] font-semibold text-[#1a1a1a]">Student</p>
              <span className="text-[10px] font-semibold text-[#1a1a1a] border border-[#1a1a1a] px-2 py-0.5 rounded">
                Full access
              </span>
            </div>
            <p className="text-[12px] text-[#9ca3af] font-normal mb-6">Everything for your entire application season.</p>

            <div className="mb-8">
              <div className="flex items-end gap-2">
                <span className="text-[42px] font-black tracking-[-0.04em] text-[#1a1a1a] leading-none">$64</span>
                <span className="text-[13px] text-[#9ca3af] mb-1.5 font-normal">one-time</span>
              </div>
              <p className="mt-1.5 text-[12px] text-[#9ca3af] font-normal">Billed once. Yours for the full season.</p>
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
          </motion.div>
        </div>

        {/* One-time add-on */}
        <div className="mt-5 max-w-3xl">
          <div className="bg-[#efe6d8] rounded-2xl p-8 grid grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="text-[11px] font-semibold text-[#6b6b6b] uppercase tracking-widest">One-time add-on</span>
              </div>
              <h3 className="text-[20px] font-black tracking-[-0.03em] text-[#1a1a1a] leading-tight mb-2">
                Personalized counselor review.
              </h3>
              <p className="text-[13px] text-[#6b6b6b] leading-relaxed font-normal max-w-md">
                A real person reviews your school list, action plan, and top essay in a 30-minute video call. Specific feedback, not templates. Book once, keep the notes forever.
              </p>
              <ul className="mt-4 space-y-1.5">
                {[
                  'School list balance and fit score review',
                  'Action plan audit — what to cut, what to prioritize',
                  'Essay feedback on your strongest draft',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#6b6b6b] flex-shrink-0" />
                    <span className="text-[12px] text-[#6b6b6b] font-normal">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="mb-4">
                <span className="text-[38px] font-black tracking-[-0.04em] text-[#1a1a1a] leading-none">$29</span>
                <p className="text-[12px] text-[#6b6b6b] mt-1 font-normal">one-time · 30 min call</p>
              </div>
              <a
                href="#"
                className="inline-block text-[13px] font-medium px-6 py-2.5 bg-[#1a1a1a] text-white rounded-lg hover:bg-[#2563eb] transition-colors whitespace-nowrap"
              >
                Book a review
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
