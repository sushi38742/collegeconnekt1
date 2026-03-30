import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

function DashboardMockup() {
  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-[0_8px_40px_rgba(0,0,0,0.08)] overflow-hidden w-full max-w-2xl mx-auto">
      {/* Toolbar strip */}
      <div className="bg-[#f9fafb] border-b border-[#e5e7eb] px-5 py-3 flex items-center justify-between">
        <span className="text-[12px] font-medium text-[#6b6b6b]">My Applications</span>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-[#6b6b6b]">Fall 2025</span>
          <div className="w-6 h-6 rounded-full bg-[#eff6ff] flex items-center justify-center">
            <span className="text-[10px] font-semibold text-[#2563eb]">AJ</span>
          </div>
        </div>
      </div>

      <div className="p-5 grid grid-cols-3 gap-4">
        {/* Fit Score Card */}
        <div className="col-span-1 border border-[#e5e7eb] rounded-lg p-4 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] text-[#6b6b6b] font-medium uppercase tracking-wide">Fit Score</p>
              <p className="text-[13px] font-semibold text-[#1a1a1a] mt-0.5">MIT</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[22px] font-bold text-[#2563eb] leading-none">82</span>
              <span className="text-[10px] text-[#6b6b6b]">/ 100</span>
            </div>
          </div>
          <div className="w-full bg-[#e5e7eb] rounded-full h-1.5">
            <div className="bg-[#2563eb] h-1.5 rounded-full" style={{ width: '82%' }} />
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-[#6b6b6b]">Avg GPA (CDS)</span>
              <span className="text-[11px] font-medium text-[#1a1a1a]">3.9</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-[#6b6b6b]">Mid SAT (CDS)</span>
              <span className="text-[11px] font-medium text-[#1a1a1a]">1540</span>
            </div>
          </div>
        </div>

        {/* Action Plan Card */}
        <div className="col-span-1 border border-[#e5e7eb] rounded-lg p-4 flex flex-col gap-3">
          <p className="text-[11px] text-[#6b6b6b] font-medium uppercase tracking-wide">Action Plan</p>
          <div className="space-y-2">
            {[
              { text: 'Request rec letter from Mr. Chen', tag: 'High', done: true },
              { text: 'Finalize Common App activities', tag: 'High', done: false },
              { text: 'Draft MIT supplemental essay', tag: 'Due soon', done: false },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className={`mt-0.5 w-3.5 h-3.5 rounded flex-shrink-0 border flex items-center justify-center ${item.done ? 'bg-[#2563eb] border-[#2563eb]' : 'border-[#d1d5db]'}`}>
                  {item.done && (
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[11px] leading-tight ${item.done ? 'line-through text-[#9ca3af]' : 'text-[#1a1a1a]'}`}>{item.text}</p>
                  <span className={`inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded font-medium ${item.tag === 'High' ? 'bg-[#fef2f2] text-[#dc2626]' : 'bg-[#fefce8] text-[#92400e]'}`}>
                    {item.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Essay Status Card */}
        <div className="col-span-1 border border-[#e5e7eb] rounded-lg p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-[#6b6b6b] font-medium uppercase tracking-wide">Essay Review</p>
            <span className="text-[10px] bg-[#eff6ff] text-[#2563eb] font-medium px-2 py-0.5 rounded">AI Draft</span>
          </div>
          <div className="relative">
            <p className="text-[11px] leading-relaxed text-[#1a1a1a]">
              Growing up in a household where two languages collided at the dinner table, I learned early that translation is never just about words—it's about{' '}
              <span className="bg-[#fef9c3] border-b border-[#eab308]">bridging entire worlds.</span>
            </p>
            <div className="mt-2 bg-[#eff6ff] border border-[#bfdbfe] rounded p-2">
              <p className="text-[10px] text-[#2563eb] font-medium">AI Suggestion</p>
              <p className="text-[10px] text-[#1e40af] mt-0.5 leading-relaxed">Strong opening. Consider a specific memory here to ground the reader.</p>
            </div>
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
          className="font-display font-extrabold text-[56px] leading-[1.1] tracking-tight text-[#1a1a1a]"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Your college application,<br />handled.
        </motion.h1>

        <motion.p
          className="mt-5 text-[18px] text-[#6b6b6b] leading-relaxed max-w-xl mx-auto"
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
