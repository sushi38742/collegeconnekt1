import { motion } from 'framer-motion'

function SchoolIntelUI() {
  const trend = [
    { year: "'20", rate: 10 },
    { year: "'21", rate: 9 },
    { year: "'22", rate: 8 },
    { year: "'23", rate: 7 },
    { year: "'24", rate: 7 },
  ]
  const maxRate = 14
  const fitFactors = [
    { label: 'Academic profile', score: 88, met: true },
    { label: 'Test scores',      score: 92, met: true },
    { label: 'Extracurriculars', score: 61, met: false },
    { label: 'Essays',           score: 74, met: true },
  ]

  return (
    <div className="p-5 space-y-4 text-left">
      {/* School header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[13px] font-bold text-[#1a1a1a]">Northwestern University</p>
          <p className="text-[11px] text-[#9ca3af] mt-0.5">Evanston, IL · Private · Research</p>
        </div>
        <div className="text-right">
          <p className="text-[22px] font-black text-[#1a1a1a] leading-none">79</p>
          <p className="text-[9px] text-[#9ca3af] uppercase tracking-widest mt-0.5">Fit score</p>
        </div>
      </div>

      {/* Fit factor bars */}
      <div className="space-y-2">
        {fitFactors.map((f, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <span className="text-[10px] text-[#6b6b6b] w-32 flex-shrink-0">{f.label}</span>
            <div className="flex-1 h-1.5 bg-[#e8f0fe] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: f.met ? '#2563eb' : '#fbbf24' }}
                initial={{ width: 0 }}
                animate={{ width: `${f.score}%` }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <span className="text-[10px] font-semibold text-[#1a1a1a] w-7 text-right flex-shrink-0">{f.score}</span>
          </div>
        ))}
      </div>

      {/* Acceptance rate trend */}
      <div className="border-t border-[#dbeafe] pt-3">
        <p className="text-[10px] font-semibold text-[#6b6b6b] uppercase tracking-widest mb-2.5">Acceptance rate trend</p>
        <div className="flex items-end gap-2 h-10">
          {trend.map((t, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                className="w-full rounded-sm"
                style={{ background: i === trend.length - 1 ? '#2563eb' : '#bfdbfe' }}
                initial={{ height: 0 }}
                animate={{ height: `${(t.rate / maxRate) * 100}%` }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
              <span className="text-[8px] text-[#9ca3af]">{t.year}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 border-t border-[#dbeafe] pt-3">
        {[
          { label: 'Accept', val: '7%' },
          { label: 'SAT mid', val: '1530' },
          { label: 'Aid %', val: '64%' },
        ].map((s, i) => (
          <div key={i} className="bg-white/60 rounded-lg px-2 py-2 text-center">
            <p className="text-[13px] font-bold text-[#1a1a1a]">{s.val}</p>
            <p className="text-[9px] text-[#9ca3af] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function AppHubUI() {
  const docs = [
    { name: 'Common App Essay', type: 'Essay',     status: 'Final',    progress: 100, color: '#2563eb' },
    { name: 'MIT Supplement',   type: 'Essay',     status: 'Draft 3',  progress: 72,  color: '#2563eb' },
    { name: 'Transcript',       type: 'Transcript',status: 'Uploaded', progress: 100, color: '#10b981' },
    { name: 'SAT — 1520',       type: 'Test Score',status: 'Uploaded', progress: 100, color: '#10b981' },
    { name: 'Rec — Mr. Chen',   type: 'Rec Letter',status: 'Received', progress: 100, color: '#8b5cf6' },
  ]

  const overallProgress = Math.round(docs.reduce((sum, d) => sum + d.progress, 0) / docs.length)

  return (
    <div className="p-5 text-left space-y-3">
      {/* Progress summary */}
      <div className="flex items-center justify-between mb-1">
        <div>
          <p className="text-[12px] font-bold text-[#1a1a1a]">Application Hub</p>
          <p className="text-[10px] text-[#9ca3af] mt-0.5">MIT — due Nov 1</p>
        </div>
        <div className="text-right">
          <p className="text-[22px] font-black text-[#1a1a1a] leading-none">{overallProgress}%</p>
          <p className="text-[9px] text-[#9ca3af] uppercase tracking-widest">Ready</p>
        </div>
      </div>

      {/* Overall bar */}
      <div className="h-1.5 bg-[#f3e8c8] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#d97706] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${overallProgress}%` }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Doc rows */}
      <div className="space-y-1.5 pt-1">
        {docs.map((doc, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.3 }}
            className="flex items-center gap-2.5 bg-white/50 rounded-lg px-2.5 py-2"
          >
            <div
              className="w-1 h-6 rounded-full flex-shrink-0"
              style={{ background: doc.color }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold text-[#1a1a1a] truncate">{doc.name}</p>
              <p className="text-[9px] text-[#9ca3af]">{doc.type}</p>
            </div>
            <span
              className="text-[9px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
              style={{
                background: doc.progress === 100 ? '#d1fae5' : '#fef3c7',
                color: doc.progress === 100 ? '#065f46' : '#92400e',
              }}
            >
              {doc.status}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const cards = [
  {
    label:    'School Research',
    headline: 'Deep dive on any college.',
    desc:     'Real CDS data, acceptance trends, fit factor breakdowns, and financial aid rates — all pulled automatically when you add a school.',
    UI:       SchoolIntelUI,
    panelBg:  '#d8e8fb',
    href:     '#',
  },
  {
    label:    'Application Hub',
    headline: 'Every piece, in one place.',
    desc:     'Track essay drafts, uploaded documents, rec letters, and test scores against each school deadline — one view for your whole application.',
    UI:       AppHubUI,
    panelBg:  '#efe6d8',
    href:     '#',
  },
]

export default function SplitFeatures() {
  return (
    <section className="py-20 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map(({ label, headline, desc, UI, panelBg, href }, i) => (
            <div key={i} className="border border-[#e5e7eb] rounded-2xl overflow-hidden bg-white flex flex-col">
              <div className="p-6 md:p-8 pb-5">
                <p className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-3">{label}</p>
                <h3 className="text-[20px] md:text-[22px] font-black tracking-[-0.03em] text-[#1a1a1a] leading-tight mb-2">
                  {headline}
                </h3>
                <p className="text-[13px] text-[#6b6b6b] leading-relaxed font-normal mb-4">{desc}</p>
                <a
                  href={href}
                  className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
                >
                  Learn more
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
              <div className="flex-1 p-5 md:p-6" style={{ background: panelBg }}>
                <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.06)] shadow-[0_2px_12px_rgba(0,0,0,0.05)] overflow-hidden">
                  <UI />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
