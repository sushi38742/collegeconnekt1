import { motion } from 'framer-motion'

function CollegeProfileUI() {
  const stats = [
    { label: 'Accept rate', school: '7%', you: null, match: null },
    { label: 'GPA', school: '3.87–3.97', you: '3.91', match: true },
    { label: 'SAT', school: '1490–1570', you: '1520', match: true },
    { label: 'ACT', school: '33–35', you: '34', match: true },
  ]

  return (
    <div className="text-left p-5">
      {/* School header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-[13px] font-bold text-[#1a1a1a]">Northwestern University</p>
          <p className="text-[11px] text-[#9ca3af] mt-0.5">Evanston, IL · Private · Research University</p>
        </div>
        <span className="text-[10px] font-semibold text-[#f59e0b] bg-[#fef9c3] px-2 py-0.5 rounded-full flex-shrink-0">Reach</span>
      </div>

      {/* Fit score — large visual */}
      <div className="flex items-center gap-4 mb-4 p-3 bg-[#f8faff] rounded-xl border border-[#e8f0fe]">
        <div className="relative w-14 h-14 flex-shrink-0">
          <svg width="56" height="56" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="22" fill="none" stroke="#e8f0fe" strokeWidth="5"/>
            <motion.circle
              cx="28" cy="28" r="22" fill="none" stroke="#2563eb" strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 22}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 22 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 22 * (1 - 0.79) }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ transform: 'rotate(-90deg)', transformOrigin: '28px 28px' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[14px] font-black text-[#1a1a1a] leading-none">79</span>
          </div>
        </div>
        <div>
          <p className="text-[12px] font-semibold text-[#1a1a1a]">Fit score</p>
          <p className="text-[11px] text-[#6b6b6b] leading-snug mt-0.5">You match 3 of 4<br/>key admissions criteria</p>
        </div>
      </div>

      {/* Stats rows */}
      <div className="space-y-2">
        {stats.map((s, i) => (
          <div key={i} className="flex items-center justify-between text-[11px]">
            <span className="text-[#9ca3af] w-20">{s.label}</span>
            <span className="text-[#6b6b6b] flex-1 text-center">{s.school}</span>
            <div className="flex items-center gap-1.5 w-16 justify-end">
              {s.you ? (
                <>
                  <span className="font-semibold text-[#1a1a1a]">{s.you}</span>
                  {s.match && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="6" r="6" fill="#d1fae5"/>
                      <path d="M3 6l2 2 4-4" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </>
              ) : (
                <span className="text-[#d1d5db]">—</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DocumentVaultUI() {
  const docs = [
    { name: 'Common App Essay', tag: 'Essay', color: '#eff6ff', tagColor: '#2563eb', icon: '✍' },
    { name: 'MIT Supplement', tag: 'Essay', color: '#eff6ff', tagColor: '#2563eb', icon: '✍' },
    { name: 'Official Transcript', tag: 'Transcript', color: '#f0fdf4', tagColor: '#16a34a', icon: '📄' },
    { name: 'SAT Score — 1520', tag: 'Test Score', color: '#fefce8', tagColor: '#ca8a04', icon: '📊' },
    { name: 'Rec — Mr. Chen', tag: 'Rec Letter', color: '#fdf4ff', tagColor: '#9333ea', icon: '✉' },
    { name: 'Rec — Dr. Patel', tag: 'Rec Letter', color: '#fdf4ff', tagColor: '#9333ea', icon: '✉' },
  ]

  return (
    <div className="text-left">
      <div className="px-4 py-3 border-b border-[#f0f0f0] flex items-center justify-between">
        <span className="text-[12px] font-semibold text-[#1a1a1a]">Document Vault</span>
        <button className="flex items-center gap-1 text-[11px] text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors border border-[#e5e7eb] rounded-md px-2 py-1">
          <span>+</span> Upload
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 p-3">
        {docs.map((doc, i) => (
          <div key={i} className="rounded-lg p-2.5 border border-[#f0f0f0] hover:border-[#d1d5db] transition-colors cursor-pointer" style={{ background: doc.color }}>
            <div className="flex items-start justify-between gap-1 mb-1.5">
              <span className="text-[14px] leading-none">{doc.icon}</span>
              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-white border border-[#e5e7eb]" style={{ color: doc.tagColor }}>
                {doc.tag}
              </span>
            </div>
            <p className="text-[11px] font-medium text-[#1a1a1a] leading-snug line-clamp-2">{doc.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const cards = [
  {
    label: 'School Research',
    headline: 'Deep dive on any college.',
    desc: 'Real CDS data, acceptance rates, and a fit score — all pulled automatically when you add a school to your list.',
    UI: CollegeProfileUI,
    panelBg: '#d8e8fb',
  },
  {
    label: 'Document Vault',
    headline: 'One place for everything.',
    desc: 'Essays, transcripts, test scores, and rec letters — organized by school and always one click away.',
    UI: DocumentVaultUI,
    panelBg: '#d8e9e1',
  },
]

export default function SplitFeatures() {
  return (
    <section className="py-20 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map(({ label, headline, desc, UI, panelBg }, i) => (
            <div key={i} className="border border-[#e5e7eb] rounded-2xl overflow-hidden bg-white flex flex-col">
              <div className="p-6 md:p-8 pb-5">
                <p className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-3">{label}</p>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-[20px] md:text-[22px] font-black tracking-[-0.03em] text-[#1a1a1a] leading-tight">
                    {headline}
                  </h3>
                  <a href="#" className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center flex-shrink-0 hover:bg-[#2563eb] transition-colors mt-0.5">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
                <p className="mt-2 text-[13px] text-[#6b6b6b] leading-relaxed font-normal">{desc}</p>
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
