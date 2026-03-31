import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const schools = [
  { name: 'MIT',          type: 'Reach',  fit: 82,  color: '#f59e0b' },
  { name: 'U Michigan',   type: 'Match',  fit: 91,  color: '#10b981' },
  { name: 'Northeastern', type: 'Match',  fit: 94,  color: '#10b981' },
]

function ProductCollage() {
  return (
    <div className="relative w-full" style={{ minHeight: 340 }}>

      {/* Main card — school list */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-xl border border-[rgba(0,0,0,0.07)] shadow-[0_4px_32px_rgba(0,0,0,0.10)] overflow-hidden"
      >
        {/* Card topbar */}
        <div className="px-4 py-3 border-b border-[#f0f0f0] bg-[#fafafa] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f87171]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#fbbf24]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#34d399]" />
            </div>
            <span className="text-[11px] font-semibold text-[#6b6b6b] ml-1">Fall 2026 Applications</span>
          </div>
          <div className="w-6 h-6 rounded-full bg-[#e5e7eb] flex items-center justify-center">
            <span className="text-[8px] font-bold text-[#1a1a1a]">AJ</span>
          </div>
        </div>

        {/* School rows */}
        <div className="p-1">
          {schools.map((s, i) => (
            <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${i === 0 ? 'bg-[#f8faff]' : ''}`}>
              <div className="w-7 h-7 rounded-lg bg-[#f3f4f6] flex items-center justify-center flex-shrink-0">
                <span className="text-[9px] font-bold text-[#6b6b6b]">{s.name.slice(0, 2).toUpperCase()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] font-semibold text-[#1a1a1a]">{s.name}</span>
                  <span className="text-[11px] font-semibold text-[#1a1a1a]">{s.fit}%</span>
                </div>
                <div className="h-1.5 bg-[#f3f4f6] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: s.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${s.fit}%` }}
                    transition={{ delay: 0.4 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
              <span className="text-[10px] text-[#9ca3af] flex-shrink-0 w-14 text-right">{s.type}</span>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="px-4 py-2.5 border-t border-[#f3f4f6] bg-[#fafafa] flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[10px] text-[#6b6b6b]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />Avg fit 89%
          </span>
          <span className="flex items-center gap-1.5 text-[10px] text-[#6b6b6b]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />3 tasks due
          </span>
          <span className="flex items-center gap-1.5 text-[10px] text-[#6b6b6b]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]" />2 essays
          </span>
        </div>
      </motion.div>

      {/* Floating card — essay feedback */}
      <motion.div
        initial={{ opacity: 0, x: 16, y: -8 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -right-3 sm:-right-5 top-5 w-[180px] sm:w-[200px] bg-white rounded-xl border border-[rgba(0,0,0,0.07)] shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-3.5"
        style={{ transform: 'rotate(1.5deg)' }}
      >
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-4 h-4 rounded-full bg-[#2563eb] flex items-center justify-center flex-shrink-0">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M1.5 4l1.5 1.5 3.5-3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-[10px] font-semibold text-[#1e40af]">AI Essay Feedback</span>
        </div>
        <p className="text-[11px] text-[#1a1a1a] leading-relaxed mb-2">
          "<mark className="bg-yellow-100 rounded-sm px-0.5">two cultures</mark>" sets up your theme immediately. Strong opening."
        </p>
        <div className="flex items-center gap-1">
          <span className="text-[9px] text-[#9ca3af]">Common App · Draft 2</span>
        </div>
      </motion.div>

      {/* Floating card — action item */}
      <motion.div
        initial={{ opacity: 0, x: -12, y: 12 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -left-3 sm:-left-5 -bottom-4 w-[196px] sm:w-[216px] bg-white rounded-xl border border-[rgba(0,0,0,0.07)] shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-3.5"
        style={{ transform: 'rotate(-1deg)' }}
      >
        <div className="flex items-center gap-2 mb-2.5">
          <span className="text-[10px] font-semibold text-[#1a1a1a] uppercase tracking-widest">Next up</span>
        </div>
        {[
          { text: 'MIT supplement — "Why MIT?"', done: false },
          { text: 'Submit FAFSA', done: false },
        ].map((task, i) => (
          <div key={i} className="flex items-start gap-2 mb-1.5 last:mb-0">
            <div className="w-3.5 h-3.5 rounded border border-[#d1d5db] mt-0.5 flex-shrink-0" />
            <span className="text-[11px] text-[#1a1a1a] leading-snug">{task.text}</span>
          </div>
        ))}
        <div className="mt-2.5 pt-2 border-t border-[#f3f4f6] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] flex-shrink-0" />
          <span className="text-[10px] text-[#9ca3af]">Due in 4 days</span>
        </div>
      </motion.div>

    </div>
  )
}

export default function Hero() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  function handleGetStarted(e) {
    e.preventDefault()
    navigate('/signup', { state: { email } })
  }

  return (
    <section className="pt-14 min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center py-16 lg:py-24">

        {/* Left — text */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
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

          <motion.form
            onSubmit={handleGetStarted}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col sm:flex-row gap-2 max-w-md"
          >
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 border border-[#e5e7eb] rounded-lg px-4 py-3 text-[14px] text-[#1a1a1a] placeholder-[#9ca3af] outline-none focus:border-[#1a1a1a] transition-colors"
            />
            <button type="submit" className="px-5 py-3 bg-[#2563eb] text-white text-[14px] font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors whitespace-nowrap">
              Get started free
            </button>
          </motion.form>

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

        {/* Right — product collage */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="lg:block"
        >
          <div className="bg-[#eaeff8] rounded-2xl p-6 sm:p-10 pt-8 sm:pt-10 pb-10 sm:pb-14">
            <ProductCollage />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
