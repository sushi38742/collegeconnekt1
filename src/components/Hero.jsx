import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

function ProductPanel() {
  const schools = [
    { name: 'MIT', type: 'Reach', fit: 82, status: 'In progress', deadline: 'Nov 1' },
    { name: 'U Michigan', type: 'Match', fit: 91, status: 'Essay ready', deadline: 'Feb 1' },
    { name: 'Northeastern', type: 'Match', fit: 94, status: 'Submitted', deadline: 'Jan 1' },
    { name: 'Fordham', type: 'Safety', fit: 98, status: 'Not started', deadline: 'Rolling' },
  ]

  return (
    <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.07)] shadow-[0_2px_24px_rgba(0,0,0,0.07)] overflow-hidden text-left">
      {/* App topbar */}
      <div className="px-4 py-2.5 border-b border-[#f0f0f0] flex items-center justify-between bg-[#fafafa]">
        <span className="text-[11px] font-semibold text-[#1a1a1a]">Fall 2026 Applications</span>
        <div className="flex items-center gap-2.5">
          <span className="text-[10px] text-[#9ca3af]">Updated today</span>
          <div className="w-5 h-5 rounded-full bg-[#e5e7eb] flex items-center justify-center">
            <span className="text-[8px] font-bold text-[#1a1a1a]">AJ</span>
          </div>
        </div>
      </div>

      {/* Table */}
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
            <tr key={i} className={i < schools.length - 1 ? 'border-b border-[#f8f8f8]' : ''}>
              <td className="px-4 py-2.5 text-[12px] font-semibold text-[#1a1a1a]">{s.name}</td>
              <td className="px-4 py-2.5 text-[11px] text-[#6b6b6b]">{s.type}</td>
              <td className="px-4 py-2.5 text-[12px] font-semibold text-[#1a1a1a]">{s.fit}%</td>
              <td className="px-4 py-2.5 text-[11px] text-[#6b6b6b]">{s.status}</td>
              <td className="px-4 py-2.5 text-[11px] text-[#9ca3af]">{s.deadline}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary strip */}
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

        {/* Right — product panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="lg:block"
        >
          <div className="bg-[#eaeff8] rounded-2xl p-5 sm:p-7">
            <ProductPanel />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
