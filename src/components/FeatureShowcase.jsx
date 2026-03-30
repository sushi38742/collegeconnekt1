const subFeatures = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="14" height="14" rx="3" stroke="#2563eb" strokeWidth="1.4"/>
        <path d="M4 8h8M4 5h5M4 11h6" stroke="#2563eb" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    label: 'School list builder',
    desc: 'Build a balanced list of reach, match, and safety schools.',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6.5" stroke="#2563eb" strokeWidth="1.4"/>
        <path d="M8 4.5v4l2.5 1.5" stroke="#2563eb" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: 'Deadline calendar',
    desc: 'Every EA, ED, and RD deadline in one synced calendar.',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 4h10M3 8h7M3 12h5" stroke="#2563eb" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Decision tracker',
    desc: 'Log acceptances, waitlists, and rejections as they arrive.',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M4 2h5l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#2563eb" strokeWidth="1.4"/>
        <path d="M9 2v4h4" stroke="#2563eb" strokeWidth="1.4" strokeLinejoin="round"/>
      </svg>
    ),
    label: 'Document vault',
    desc: 'Store essays, transcripts, and test scores in one place.',
  },
]

const useCases = [
  { text: 'Check your fit score' },
  { text: 'Draft a supplement' },
  { text: 'Track your deadlines' },
  { text: 'Compare financial aid' },
]

function SchoolListUI() {
  const schools = [
    { name: 'MIT', type: 'Reach', match: 82, status: 'In progress', color: 'bg-[#fef2f2] text-[#dc2626]' },
    { name: 'U Michigan', type: 'Match', match: 91, status: 'Essay ready', color: 'bg-[#f0fdf4] text-[#16a34a]' },
    { name: 'Northeastern', type: 'Match', match: 94, status: 'Submitted', color: 'bg-[#eff6ff] text-[#2563eb]' },
    { name: 'Fordham', type: 'Safety', match: 98, status: 'Not started', color: 'bg-[#f3f4f6] text-[#6b7280]' },
  ]

  return (
    <div className="h-full flex flex-col">
      <div className="px-5 py-3 border-b border-[#e5e7eb] flex items-center justify-between">
        <span className="text-[12px] font-semibold text-[#1a1a1a]">My School List</span>
        <span className="text-[11px] text-[#6b6b6b]">Fall 2026 · 8 schools</span>
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-4 px-5 py-2 border-b border-[#e5e7eb] bg-[#f9fafb]">
          {['School', 'Type', 'Fit', 'Status'].map((h) => (
            <span key={h} className="text-[10px] font-medium text-[#6b6b6b] uppercase tracking-wide">{h}</span>
          ))}
        </div>
        {schools.map((school, i) => (
          <div key={i} className={`grid grid-cols-4 px-5 py-3 items-center ${i < schools.length - 1 ? 'border-b border-[#f3f4f6]' : ''}`}>
            <span className="text-[12px] font-medium text-[#1a1a1a]">{school.name}</span>
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded w-fit ${school.type === 'Reach' ? 'bg-[#fef2f2] text-[#dc2626]' : school.type === 'Match' ? 'bg-[#eff6ff] text-[#2563eb]' : 'bg-[#f0fdf4] text-[#16a34a]'}`}>
              {school.type}
            </span>
            <span className="text-[12px] font-semibold text-[#1a1a1a]">{school.match}%</span>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full w-fit ${school.color}`}>
              {school.status}
            </span>
          </div>
        ))}
      </div>
      <div className="px-5 py-3 border-t border-[#e5e7eb] bg-[#f9fafb]">
        <button className="text-[11px] text-[#2563eb] font-medium">+ Add school</button>
      </div>
    </div>
  )
}

export default function FeatureShowcase() {
  return (
    <section className="py-24 px-6 bg-[#f9fafb] border-t border-[#e5e7eb]">
      <div className="max-w-6xl mx-auto">

        {/* Main showcase card */}
        <div className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden grid grid-cols-[1fr_1.4fr] min-h-[440px]">
          {/* Left panel */}
          <div className="p-10 flex flex-col border-r border-[#e5e7eb]">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-[11px] font-semibold text-[#6b6b6b] uppercase tracking-wide">Application Tracking</span>
              <span className="text-[10px] font-semibold bg-[#eff6ff] text-[#2563eb] px-2 py-0.5 rounded">New</span>
            </div>
            <h2 className="font-display font-bold text-[26px] leading-snug tracking-tight text-[#1a1a1a] mb-6">
              Manage every school, deadline, and decision in one place.
            </h2>
            <a href="#" className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-10 hover:bg-[#2563eb] transition-colors flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            <div className="space-y-5 mt-auto">
              {subFeatures.map((f, i) => (
                <div key={i}>
                  <div className="flex items-center gap-2.5 mb-1">
                    <div className="w-6 h-6 rounded-md bg-[#eff6ff] flex items-center justify-center flex-shrink-0">
                      {f.icon}
                    </div>
                    <span className="text-[13px] font-semibold text-[#1a1a1a]">{f.label}</span>
                  </div>
                  <p className="text-[12px] text-[#6b6b6b] leading-relaxed pl-8">{f.desc}</p>
                  {i < subFeatures.length - 1 && <div className="mt-4 border-b border-[#f3f4f6]" />}
                </div>
              ))}
            </div>
          </div>

          {/* Right panel — UI mockup */}
          <div className="bg-[#f9fafb] overflow-hidden">
            <SchoolListUI />
          </div>
        </div>

        {/* Use-case cards row */}
        <div className="mt-3">
          <p className="text-[11px] text-[#6b6b6b] mb-2 font-medium">See what you can do</p>
          <div className="grid grid-cols-5 gap-2">
            {useCases.map((uc, i) => (
              <a
                key={i}
                href="#"
                className="bg-white border border-[#e5e7eb] rounded-xl p-4 hover:border-[#d1d5db] hover:bg-[#f9fafb] transition-colors group"
              >
                <p className="text-[13px] font-semibold text-[#1a1a1a] leading-snug">
                  {uc.text}{' '}
                  <span className="text-[#2563eb] group-hover:translate-x-0.5 inline-block transition-transform">→</span>
                </p>
              </a>
            ))}
            <a
              href="#"
              className="bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl p-4 hover:bg-[#2563eb] hover:border-[#2563eb] transition-colors group"
            >
              <p className="text-[13px] font-semibold text-white leading-snug">
                Start your application →
              </p>
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
