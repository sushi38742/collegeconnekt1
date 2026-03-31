import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const schools = [
  { name: 'MIT', type: 'Reach', fit: 82, status: 'In progress', deadline: 'Nov 1' },
  { name: 'U Michigan', type: 'Match', fit: 91, status: 'Essay ready', deadline: 'Feb 1' },
  { name: 'Northeastern', type: 'Match', fit: 94, status: 'Submitted', deadline: 'Jan 1' },
  { name: 'Fordham', type: 'Safety', fit: 98, status: 'Not started', deadline: 'Rolling' },
]

const tasks = [
  { text: 'Request letters of rec from Mr. Patel', done: true },
  { text: 'Finish Common App personal statement', done: true },
  { text: 'Complete MIT supplement — "Why MIT?"', done: false },
  { text: 'Submit FAFSA by state deadline', done: false },
]

const essayLines = [
  'Growing up between two cultures taught me',
  'that ambiguity isn\'t something to fear —',
  'it\'s something to design around.',
]

// Phase 0: School list
function SchoolListPhase() {
  return (
    <motion.div
      key="schools"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-xl border border-[rgba(0,0,0,0.07)] shadow-[0_2px_24px_rgba(0,0,0,0.07)] overflow-hidden text-left"
    >
      <div className="px-4 py-2.5 border-b border-[#f0f0f0] flex items-center justify-between bg-[#fafafa]">
        <span className="text-[11px] font-semibold text-[#1a1a1a]">Fall 2026 Applications</span>
        <div className="flex items-center gap-2.5">
          <span className="text-[10px] text-[#9ca3af]">Updated today</span>
          <div className="w-5 h-5 rounded-full bg-[#e5e7eb] flex items-center justify-center">
            <span className="text-[8px] font-bold text-[#1a1a1a]">AJ</span>
          </div>
        </div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#f3f4f6]">
            {['School', 'Type', 'Fit', 'Status', 'Deadline'].map(h => (
              <th key={h} className="px-4 py-2 text-left text-[10px] font-medium text-[#9ca3af] font-normal">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {schools.map((s, i) => (
            <motion.tr
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={i < schools.length - 1 ? 'border-b border-[#f8f8f8]' : ''}
            >
              <td className="px-4 py-2.5 text-[12px] font-semibold text-[#1a1a1a]">{s.name}</td>
              <td className="px-4 py-2.5 text-[11px] text-[#6b6b6b]">{s.type}</td>
              <td className="px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-10 bg-[#f3f4f6] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#2563eb] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${s.fit}%` }}
                      transition={{ delay: i * 0.12 + 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-[#1a1a1a]">{s.fit}%</span>
                </div>
              </td>
              <td className="px-4 py-2.5 text-[11px] text-[#6b6b6b]">{s.status}</td>
              <td className="px-4 py-2.5 text-[11px] text-[#9ca3af]">{s.deadline}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
      <div className="px-4 py-2.5 border-t border-[#f3f4f6] bg-[#fafafa] flex items-center gap-5">
        {[
          { dot: 'bg-[#f59e0b]', text: '3 tasks due soon' },
          { dot: 'bg-[#2563eb]', text: '2 essays in review' },
          { dot: 'bg-[#10b981]', text: 'Avg fit 91%' },
        ].map((item, i) => (
          <span key={i} className="flex items-center gap-1.5 text-[10px] text-[#6b6b6b]">
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.dot}`} />
            {item.text}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

// Phase 1: Action plan checklist
function ActionPlanPhase() {
  return (
    <motion.div
      key="action"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-xl border border-[rgba(0,0,0,0.07)] shadow-[0_2px_24px_rgba(0,0,0,0.07)] overflow-hidden text-left"
    >
      <div className="px-4 py-2.5 border-b border-[#f0f0f0] flex items-center justify-between bg-[#fafafa]">
        <span className="text-[11px] font-semibold text-[#1a1a1a]">Your Action Plan</span>
        <span className="text-[10px] text-[#10b981] font-medium">2 of 4 done</span>
      </div>
      <div className="p-4 flex flex-col gap-2.5">
        {tasks.map((task, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.14, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-start gap-3"
          >
            <motion.div
              initial={task.done ? { scale: 0 } : {}}
              animate={task.done ? { scale: 1 } : {}}
              transition={{ delay: i * 0.14 + 0.2, duration: 0.3, type: 'spring', stiffness: 300 }}
              className={`w-4 h-4 rounded flex-shrink-0 mt-0.5 flex items-center justify-center border ${
                task.done
                  ? 'bg-[#1a1a1a] border-[#1a1a1a]'
                  : 'border-[#d1d5db] bg-white'
              }`}
            >
              {task.done && (
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4l1.8 1.8 3.2-3.2" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </motion.div>
            <span className={`text-[12px] leading-snug ${task.done ? 'line-through text-[#9ca3af]' : 'text-[#1a1a1a]'}`}>
              {task.text}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-[#f3f4f6] bg-[#fafafa]">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-[#6b6b6b]">Overall progress</span>
          <span className="text-[10px] font-semibold text-[#1a1a1a]">50%</span>
        </div>
        <div className="h-1.5 bg-[#f3f4f6] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#1a1a1a] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '50%' }}
            transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </motion.div>
  )
}

// Phase 2: Essay feedback
function EssayPhase() {
  return (
    <motion.div
      key="essay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-xl border border-[rgba(0,0,0,0.07)] shadow-[0_2px_24px_rgba(0,0,0,0.07)] overflow-hidden text-left"
    >
      <div className="px-4 py-2.5 border-b border-[#f0f0f0] flex items-center justify-between bg-[#fafafa]">
        <span className="text-[11px] font-semibold text-[#1a1a1a]">Common App Essay · Draft 2</span>
        <span className="text-[10px] text-[#2563eb] font-medium">AI Review</span>
      </div>
      <div className="p-4">
        <div className="text-[13px] leading-relaxed text-[#1a1a1a]">
          {essayLines.map((line, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.18, duration: 0.4 }}
              className="inline"
            >
              {i === 0 ? (
                <>
                  {line.slice(0, 18)}
                  <motion.mark
                    initial={{ backgroundColor: 'rgba(254,240,138,0)' }}
                    animate={{ backgroundColor: 'rgba(254,240,138,0.8)' }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="rounded-sm px-0.5"
                  >
                    {line.slice(18)}
                  </motion.mark>
                  {' '}
                </>
              ) : (
                line + (i < essayLines.length - 1 ? ' ' : '')
              )}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 bg-[#eff6ff] border border-[#bfdbfe] rounded-lg p-3"
        >
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-[#2563eb] flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5.5l1.5 1.5L8 3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#1e40af] mb-0.5">Strong opening hook</p>
              <p className="text-[11px] text-[#3b82f6] leading-relaxed">
                "two cultures" sets up your theme immediately. Consider naming the cultures for specificity.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-2 bg-[#fef9c3] border border-[#fde047] rounded-lg p-3"
        >
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-[#ca8a04] flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-[9px] font-bold">!</span>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#92400e] mb-0.5">Show, don't tell</p>
              <p className="text-[11px] text-[#a16207] leading-relaxed">
                "design around" is abstract — add a concrete example here.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

const PHASES = [SchoolListPhase, ActionPlanPhase, EssayPhase]
const LABELS = ['School List', 'Action Plan', 'Essay Review']
const PHASE_DURATION = 4000

function AnimatedDemo() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase(p => (p + 1) % PHASES.length)
    }, PHASE_DURATION)
    return () => clearInterval(timer)
  }, [])

  const PhaseComponent = PHASES[phase]

  return (
    <div>
      <AnimatePresence mode="wait">
        <PhaseComponent key={phase} />
      </AnimatePresence>

      {/* Phase indicator */}
      <div className="flex items-center justify-center gap-3 mt-4">
        {LABELS.map((label, i) => (
          <button
            key={i}
            onClick={() => setPhase(i)}
            className="flex items-center gap-1.5 group"
          >
            <div className={`h-1 rounded-full transition-all duration-300 ${i === phase ? 'w-6 bg-[#1a1a1a]' : 'w-3 bg-[#d1d5db]'}`} />
            <span className={`text-[10px] font-medium transition-colors ${i === phase ? 'text-[#1a1a1a]' : 'text-[#9ca3af]'}`}>
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="pt-14 min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center py-16 lg:py-24">

        {/* Left — text content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {/* Social proof badge */}
          <motion.div variants={fadeUp} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#f59e0b">
                    <path d="M6 1l1.3 2.6L10 4l-2 1.9.5 2.7L6 7.4l-2.5 1.2.5-2.7L2 4l2.7-.4z"/>
                  </svg>
                ))}
              </div>
              <span className="text-[12px] text-[#6b6b6b] font-normal">4.9 · 16,000+ students</span>
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-[38px] sm:text-[46px] lg:text-[54px] font-black leading-[1.05] tracking-[-0.04em] text-[#1a1a1a]"
          >
            Your college application, handled.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-[16px] sm:text-[18px] text-[#6b6b6b] leading-relaxed font-normal max-w-md"
          >
            Fit scores, essay feedback, and a personalized action plan — all in one place.
          </motion.p>

          {/* Email capture */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col sm:flex-row gap-2 max-w-md"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 border border-[#e5e7eb] rounded-lg px-4 py-3 text-[14px] text-[#1a1a1a] placeholder-[#9ca3af] outline-none focus:border-[#1a1a1a] transition-colors"
            />
            <button className="px-5 py-3 bg-[#2563eb] text-white text-[14px] font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors whitespace-nowrap">
              Get started free
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2"
          >
            {['Free to start', 'No credit card required', 'Cancel any time'].map((t, i) => (
              <span key={i} className="flex items-center gap-1.5 text-[12px] text-[#6b6b6b]">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="5.5" stroke="#9ca3af" strokeWidth="1"/>
                  <path d="M3.5 6l1.5 1.5 3.5-3" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — animated demo */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="lg:block"
        >
          <div className="bg-[#eaeff8] rounded-2xl p-5 sm:p-7">
            <AnimatedDemo />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
