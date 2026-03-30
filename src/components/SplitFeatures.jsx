function CollegeProfileUI() {
  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden text-left mt-6">
      <div className="px-5 py-4 border-b border-[#e5e7eb]">
        <p className="text-[13px] font-bold text-[#1a1a1a]">Northwestern University</p>
        <p className="text-[11px] text-[#9ca3af] mt-0.5">Evanston, IL · Private Research University</p>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#f3f4f6] bg-[#fafafa]">
            <th className="px-5 py-2 text-left text-[10px] font-medium text-[#9ca3af]">Metric (CDS)</th>
            <th className="px-5 py-2 text-right text-[10px] font-medium text-[#9ca3af]">School</th>
            <th className="px-5 py-2 text-right text-[10px] font-medium text-[#9ca3af]">You</th>
          </tr>
        </thead>
        <tbody>
          {[
            { label: 'Acceptance Rate', school: '7%', you: '—' },
            { label: 'GPA (mid 50%)', school: '3.87–3.97', you: '3.91' },
            { label: 'SAT (mid 50%)', school: '1490–1570', you: '1520' },
            { label: 'ACT (mid 50%)', school: '33–35', you: '34' },
          ].map((row, i) => (
            <tr key={i} className={i < 3 ? 'border-b border-[#f3f4f6]' : ''}>
              <td className="px-5 py-3 text-[12px] text-[#1a1a1a]">{row.label}</td>
              <td className="px-5 py-3 text-right text-[12px] text-[#6b6b6b]">{row.school}</td>
              <td className="px-5 py-3 text-right text-[12px] font-semibold text-[#1a1a1a]">{row.you}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-5 py-3 border-t border-[#e5e7eb] flex items-center justify-between">
        <span className="text-[11px] text-[#6b6b6b]">Your fit score</span>
        <span className="text-[13px] font-bold text-[#1a1a1a]">79 / 100</span>
      </div>
    </div>
  )
}

function DocumentVaultUI() {
  const docs = [
    { name: 'Common App Personal Statement', type: 'Essay', date: 'Oct 2', status: 'Final' },
    { name: 'MIT Supplement — Why MIT?', type: 'Essay', date: 'Oct 8', status: 'Draft 3' },
    { name: 'Official Transcript', type: 'Transcript', date: 'Sep 15', status: 'Uploaded' },
    { name: 'SAT Score Report — 1520', type: 'Test Score', date: 'Sep 15', status: 'Uploaded' },
    { name: 'Recommendation — Mr. Chen', type: 'Rec Letter', date: 'Oct 1', status: 'Received' },
  ]

  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden text-left mt-6">
      <div className="px-4 py-3 border-b border-[#e5e7eb] flex items-center justify-between">
        <span className="text-[12px] font-semibold text-[#1a1a1a]">Document Vault</span>
        <button className="text-[11px] text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors">+ Upload</button>
      </div>
      <div className="divide-y divide-[#f3f4f6]">
        {docs.map((doc, i) => (
          <div key={i} className="px-4 py-2.5 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[12px] font-medium text-[#1a1a1a] truncate">{doc.name}</p>
              <p className="text-[10px] text-[#9ca3af] mt-0.5">{doc.type} · {doc.date}</p>
            </div>
            <span className="text-[11px] text-[#6b6b6b] flex-shrink-0">{doc.status}</span>
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
  },
  {
    label: 'Document Vault',
    headline: 'One place for everything.',
    desc: 'Essays, transcripts, test scores, and rec letters — organized by school and always one click away.',
    UI: DocumentVaultUI,
  },
]

export default function SplitFeatures() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-6">
          {cards.map(({ label, headline, desc, UI }, i) => (
            <div key={i} className="border border-[#e5e7eb] rounded-2xl overflow-hidden bg-white">
              <div className="p-8 pb-2">
                <p className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-3">{label}</p>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-[22px] font-black tracking-[-0.03em] text-[#1a1a1a] leading-tight">
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
