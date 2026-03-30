import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

function DashboardMockup() {
  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-[0_4px_32px_rgba(0,0,0,0.07)] overflow-hidden w-full max-w-2xl mx-auto text-left">
      {/* Top bar */}
      <div className="border-b border-[#e5e7eb] px-5 py-3 flex items-center justify-between">
        <span className="text-[12px] font-semibold text-[#1a1a1a]">My Applications</span>
        <span className="text-[11px] text-[#9ca3af]">Fall 2026</span>
      </div>

      <div className="grid grid-cols-3 divide-x divide-[#e5e7eb]">
        {/* School list */}
        <div className="col-span-1 p-4">
          <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-3">Schools</p>
          <div className="space-y-3">
            {[
              { name: 'MIT', type: 'Reach', score: 82 },
              { name: 'U Michigan', type: 'Match', score: 91 },
              { name: 'Northeastern', type: 'Match', score: 94 },
              { name: 'Fordham', type: 'Safety', score: 98 },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="text-[12px] font-medium text-[#1a1a1a]">{s.name}</p>
                  <p className="text-[10px] text-[#9ca3af]">{s.type}</p>
                </div>
                <span className="text-[12px] font-semibold text-[#1a1a1a]">{s.score}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Plan */}
        <div className="col-span-1 p-4">
          <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-3">Action Plan</p>
          <div className="space-y-2.5">
            {[
              { text: 'Request rec from Mr. Chen', done: true, date: '' },
              { text: 'Finalize activities list', done: false, date: 'Oct 15' },
              { text: 'Draft MIT supplement', done: false, date: 'Nov 1' },
              { text: 'Submit Common App', done: false, date: 'Nov 1' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className={`mt-[2px] w-3 h-3 rounded-sm border flex-shrink-0 flex items-center justify-center ${item.done ? 'bg-[#1a1a1a] border-[#1a1a1a]' : 'border-[#d1d5db]'}`}>
                  {item.done && (
                    <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                      <path d="M1 3.5l1.5 1.5 3.5-3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <div className="flex-1 flex items-start justify-between gap-2">
                  <p className={`text-[11px] leading-tight ${item.done ? 'line-through text-[#9ca3af]' : 'text-[#1a1a1a]'}`}>{item.text}</p>
                  {item.date && <span className="text-[10px] text-[#9ca3af] whitespace-nowrap flex-shrink-0">{item.date}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Essay */}
        <div className="col-span-1 p-4">
          <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-3">Essay · Draft 2</p>
          <p className="text-[11px] leading-relaxed text-[#1a1a1a]">
            Growing up in a household where two languages collided at the dinner table, I learned early that translation is never just about words — it's about{' '}
            <span className="bg-[#fef9c3]">bridging entire worlds.</span>
          </p>
          <div className="mt-3 border-l-2 border-[#e5e7eb] pl-3">
            <p className="text-[10px] font-medium text-[#6b6b6b] mb-0.5">Suggestion</p>
            <p className="text-[10px] text-[#6b6b6b] leading-relaxed">Add a specific memory to ground this opener.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-14 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h1
          className="text-[58px] font-black leading-[1.05] tracking-[-0.04em] text-[#1a1a1a]"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Your college application,<br />handled.
        </motion.h1>

        <motion.p
          className="mt-5 text-[18px] text-[#6b6b6b] leading-relaxed max-w-xl mx-auto font-normal"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Fit scores, essay feedback, and a personalized action plan — all in one place. Free to start.
        </motion.p>

        <motion.div
          className="mt-8 flex items-center justify-center gap-3"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="#"
            className="px-5 py-2.5 bg-[#2563eb] text-white text-[14px] font-medium rounded-md hover:bg-[#1d4ed8] transition-colors"
          >
            Get started free
          </a>
          <a
            href="#"
            className="px-5 py-2.5 border border-[#e5e7eb] text-[#1a1a1a] text-[14px] font-medium rounded-md hover:border-[#d1d5db] hover:bg-[#f9fafb] transition-colors"
          >
            See how it works
          </a>
        </motion.div>

        <motion.div
          className="mt-14"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <DashboardMockup />
        </motion.div>
      </div>
    </section>
  )
}
