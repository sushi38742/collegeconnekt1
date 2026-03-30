function CollegeProfileUI() {
  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden text-left mt-6">
      <div className="h-20 bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8e] flex items-end px-5 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow">
            <span className="text-[14px] font-bold text-[#1e3a5f]">NU</span>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-white">Northwestern University</p>
            <p className="text-[10px] text-blue-200">Evanston, IL · Private · Research University</p>
          </div>
        </div>
      </div>
      <div className="p-4 grid grid-cols-3 gap-3">
        {[
          { label: 'Acceptance Rate', value: '7%' },
          { label: 'Avg SAT (CDS)', value: '1500–1570' },
          { label: 'Avg GPA (CDS)', value: '3.92' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#f9fafb] rounded-lg p-2.5">
            <p className="text-[10px] text-[#6b6b6b] font-medium">{stat.label}</p>
            <p className="text-[14px] font-bold text-[#1a1a1a] mt-0.5">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="px-4 pb-4">
        <div className="border border-[#e5e7eb] rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] font-semibold text-[#1a1a1a]">Your Fit Score</p>
            <span className="text-[16px] font-bold text-[#2563eb]">79%</span>
          </div>
          <div className="w-full bg-[#f3f4f6] rounded-full h-1.5">
            <div className="bg-[#2563eb] h-1.5 rounded-full" style={{ width: '79%' }} />
          </div>
          <p className="mt-2 text-[10px] text-[#6b6b6b]">Your test scores and GPA are slightly below median. Strong EC profile can help.</p>
        </div>
      </div>
    </div>
  )
}

function DocumentVaultUI() {
  const docs = [
    { name: 'Common App Personal Statement', type: 'Essay', status: 'Final', date: 'Oct 2' },
    { name: 'MIT Supplement — Why MIT?', type: 'Essay', status: 'Draft 3', date: 'Oct 8' },
    { name: 'Official Transcript (GPA 3.91)', type: 'Transcript', status: 'Uploaded', date: 'Sep 15' },
    { name: 'SAT Score Report — 1520', type: 'Test', status: 'Uploaded', date: 'Sep 15' },
    { name: 'Recommendation — Mr. Chen', type: 'Rec Letter', status: 'Received', date: 'Oct 1' },
  ]

  const statusColor = {
    Final: 'bg-[#f0fdf4] text-[#16a34a]',
    'Draft 3': 'bg-[#fefce8] text-[#92400e]',
    Uploaded: 'bg-[#eff6ff] text-[#2563eb]',
    Received: 'bg-[#f0fdf4] text-[#16a34a]',
  }

  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden text-left mt-6">
      <div className="px-4 py-3 border-b border-[#e5e7eb] flex items-center justify-between bg-[#f9fafb]">
        <span className="text-[12px] font-semibold text-[#1a1a1a]">Document Vault</span>
        <button className="text-[11px] text-[#2563eb] font-medium">+ Upload</button>
      </div>
      <div className="divide-y divide-[#f3f4f6]">
        {docs.map((doc, i) => (
          <div key={i} className="px-4 py-2.5 flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-[#f3f4f6] flex items-center justify-center flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 1h4l3 3v7a1 1 0 01-1 1H3a1 1 0 01-1-1V2a1 1 0 011-1z" stroke="#6b6b6b" strokeWidth="1.1"/>
                <path d="M7 1v3h3" stroke="#6b6b6b" strokeWidth="1.1" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium text-[#1a1a1a] truncate">{doc.name}</p>
              <p className="text-[10px] text-[#6b6b6b]">{doc.type} · {doc.date}</p>
            </div>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${statusColor[doc.status]}`}>
              {doc.status}
            </span>
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
    cta: 'Explore school profiles',
    UI: CollegeProfileUI,
  },
  {
    label: 'Document Vault',
    headline: 'One place for everything.',
    desc: 'Essays, transcripts, test scores, and rec letters — organized by school and always one click away.',
    cta: 'See the vault',
    UI: DocumentVaultUI,
  },
]

export default function SplitFeatures() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-6">
          {cards.map(({ label, headline, desc, cta, UI }, i) => (
            <div key={i} className="border border-[#e5e7eb] rounded-2xl overflow-hidden bg-white">
              <div className="p-8 pb-2">
                <p className="text-[11px] font-semibold text-[#6b6b6b] uppercase tracking-wide mb-3">{label}</p>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display font-bold text-[22px] leading-snug tracking-tight text-[#1a1a1a]">
                    {headline}
                  </h3>
                  <a href="#" className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center flex-shrink-0 hover:bg-[#2563eb] transition-colors mt-0.5">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
                <p className="mt-2 text-[13px] text-[#6b6b6b] leading-relaxed">{desc}</p>
              </div>
              <div className="px-8 pb-8">
                <UI />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
