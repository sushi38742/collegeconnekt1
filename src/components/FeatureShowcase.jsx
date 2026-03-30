const subFeatures = [
  {
    label: 'School list builder',
    desc: 'Build a balanced list of reach, match, and safety schools.',
  },
  {
    label: 'Deadline calendar',
    desc: 'Every EA, ED, and RD deadline synced in one place.',
  },
  {
    label: 'Decision tracker',
    desc: 'Log acceptances, waitlists, and rejections as they arrive.',
  },
  {
    label: 'Document vault',
    desc: 'Essays, transcripts, and test scores — always at hand.',
  },
]

const useCases = [
  'Check your fit score',
  'Draft a supplement',
  'Track your deadlines',
  'Compare financial aid',
]

function SchoolListUI() {
  const schools = [
    { name: 'MIT', type: 'Reach', fit: 82, status: 'In progress' },
    { name: 'U Michigan', type: 'Match', fit: 91, status: 'Essay ready' },
    { name: 'Northeastern', type: 'Match', fit: 94, status: 'Submitted' },
    { name: 'Fordham', type: 'Safety', fit: 98, status: 'Not started' },
  ]

  return (
    <div className="flex flex-col">
      <div className="px-5 py-3 border-b border-[#e5e7eb] flex items-center justify-between">
        <span className="text-[12px] font-semibold text-[#1a1a1a]">My School List</span>
        <span className="text-[11px] text-[#9ca3af]">Fall 2026 · 8 schools</span>
      </div>
      <table className="w-full flex-1">
        <thead>
          <tr className="border-b border-[#f3f4f6] bg-[#fafafa]">
            {['School', 'Type', 'Fit', 'Status'].map(h => (
              <th key={h} className="px-5 py-2 text-left text-[10px] font-medium text-[#9ca3af]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {schools.map((s, i) => (
            <tr key={i} className={i < schools.length - 1 ? 'border-b border-[#f3f4f6]' : ''}>
              <td className="px-5 py-3 text-[12px] font-medium text-[#1a1a1a]">{s.name}</td>
              <td className="px-5 py-3 text-[12px] text-[#6b6b6b]">{s.type}</td>
              <td className="px-5 py-3 text-[12px] font-semibold text-[#1a1a1a]">{s.fit}%</td>
              <td className="px-5 py-3 text-[12px] text-[#6b6b6b]">{s.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-5 py-3 border-t border-[#f3f4f6]">
        <button className="text-[11px] text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors">+ Add school</button>
      </div>
    </div>
  )
}

export default function FeatureShowcase() {
  return (
    <section className="py-24 px-6 bg-white border-t border-[#e5e7eb]">
      <div className="max-w-6xl mx-auto">

        {/* Main showcase card */}
        <div className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden grid grid-cols-[1fr_1.5fr] min-h-[420px]">
          {/* Left panel */}
          <div className="p-10 flex flex-col border-r border-[#e5e7eb]">
            <p className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-4">
              Application Tracking
            </p>
            <h2 className="text-[26px] font-black tracking-[-0.03em] text-[#1a1a1a] leading-tight mb-5">
              Manage every school, deadline, and decision in one place.
            </h2>
            <a href="#" className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-10 hover:bg-[#2563eb] transition-colors flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            <div className="space-y-4 mt-auto">
              {subFeatures.map((f, i) => (
                <div key={i}>
                  <p className="text-[13px] font-semibold text-[#1a1a1a]">{f.label}</p>
                  <p className="text-[12px] text-[#6b6b6b] leading-relaxed mt-0.5">{f.desc}</p>
                  {i < subFeatures.length - 1 && <div className="mt-4 border-b border-[#f3f4f6]" />}
                </div>
              ))}
            </div>
          </div>

          {/* Right panel — colored tinted field, white card floats inside */}
          <div className="bg-[#efe6d8] p-6 flex flex-col justify-center overflow-hidden">
            <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.06)] shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden">
              <SchoolListUI />
            </div>
          </div>
        </div>

        {/* Use-case cards */}
        <div className="mt-3">
          <p className="text-[11px] text-[#9ca3af] mb-2 font-medium">See what you can do</p>
          <div className="grid grid-cols-5 gap-2">
            {useCases.map((text, i) => (
              <a
                key={i}
                href="#"
                className="bg-white border border-[#e5e7eb] rounded-xl p-4 hover:border-[#d1d5db] transition-colors group"
              >
                <p className="text-[13px] font-semibold text-[#1a1a1a] leading-snug">
                  {text}{' '}
                  <span className="text-[#9ca3af] group-hover:text-[#2563eb] transition-colors">→</span>
                </p>
              </a>
            ))}
            <a
              href="#"
              className="bg-[#1a1a1a] rounded-xl p-4 hover:bg-[#2563eb] transition-colors"
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
