const stats = [
  { value: '16,000+', label: 'Students' },
  { value: '50 states', label: 'Nationwide reach' },
  { value: '4.9 stars', label: 'Average rating' },
  { value: '94%', label: 'Would recommend' },
]

const badges = [
  {
    platform: 'Product Hunt',
    detail: '#2 Product of the Day',
    dot: '#da552f',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="7" fill="#da552f"/>
        <path d="M5 4h2.5a2 2 0 010 4H5V4z" fill="white"/>
        <path d="M5 8h1.5" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    platform: 'New Tech For You',
    detail: 'Top Edtech Pick 2025',
    dot: '#6366f1',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="7" fill="#6366f1"/>
        <path d="M4 7l2 2 4-4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    platform: 'EssaySpark',
    detail: 'Best AI Essay Tool',
    dot: '#0ea5e9',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="7" fill="#0ea5e9"/>
        <path d="M4 5h6M4 7h4M4 9h5" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    platform: 'Lovable Award',
    detail: '2025 Student Tool of the Year',
    dot: '#f43f5e',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="7" fill="#f43f5e"/>
        <path d="M7 10.5s-4-2.8-4-5.2C3 3.9 4 3 5.2 3c.8 0 1.4.4 1.8 1 .4-.6 1-.9 1.8-.9C10 3.1 11 4 11 5.3c0 2.4-4 5.2-4 5.2z" fill="white"/>
      </svg>
    ),
  },
  {
    platform: 'G2',
    detail: 'High Performer · Spring 2025',
    dot: '#ff492c',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="7" fill="#ff492c"/>
        <text x="4.5" y="10" fontSize="7" fontWeight="800" fill="white" fontFamily="Inter,sans-serif">G2</text>
      </svg>
    ),
  },
  {
    platform: 'Edtech Digest',
    detail: 'Cool Tool Award 2025',
    dot: '#10b981',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="7" fill="#10b981"/>
        <path d="M7 3l1 2.5H10.5l-2 1.5.8 2.5L7 8l-2.3 1.5.8-2.5-2-1.5H6z" fill="white"/>
      </svg>
    ),
  },
]

// Duplicate for seamless infinite loop
const allBadges = [...badges, ...badges]

export default function SocialProof() {
  return (
    <section className="bg-[#f9fafb] border-y border-[#e5e7eb]">
      {/* Stats row */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center md:contents">
              <div className="md:px-8 text-center w-full">
                <p className="text-[20px] font-bold text-[#1a1a1a] tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-1 text-[11px] font-medium text-[#6b6b6b] uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
              {i < stats.length - 1 && (
                <div className="hidden md:block w-px h-8 bg-[#e5e7eb]" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#e5e7eb]" />

      {/* Scrolling awards ticker */}
      <div className="py-4 overflow-hidden relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#f9fafb] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#f9fafb] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee whitespace-nowrap gap-0">
          {allBadges.map((badge, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-2.5 px-6 border-r border-[#e5e7eb] flex-shrink-0"
            >
              {badge.icon}
              <div className="flex items-center gap-1.5">
                <span className="text-[12px] font-semibold text-[#1a1a1a]">{badge.platform}</span>
                <span className="text-[#d1d5db]">·</span>
                <span className="text-[11px] text-[#6b6b6b] font-normal">{badge.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
