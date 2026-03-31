const W = 560
const H = 560
const MX = W / 2

const CURVE = `M ${MX} 0 C ${MX - 140} 0 ${MX - 140} ${H / 2} ${MX} ${H / 2} C ${MX + 140} ${H / 2} ${MX + 140} ${H} ${MX} ${H}`
const LEFT_PATH  = `${CURVE} L 0 ${H} L 0 0 Z`
const RIGHT_PATH = `${CURVE} L ${W} ${H} L ${W} 0 Z`

const klimeFeatures = [
  'Connect with mentors who went to your target schools',
  'Get real advice on majors, internships, and first jobs',
  'Industry-specific career roadmaps built for college students',
  'One-on-one sessions, no marketplace overhead',
]

const boostedFeatures = [
  'Discover on-campus and virtual events near you',
  'RSVP and track events organized by school or interest',
  'Network with students at your target schools before you apply',
  'Community updates synced to your CollegeConnekt timeline',
]

export default function Partnerships() {
  return (
    <section className="py-20 md:py-24 px-6 bg-white border-t border-[#e5e7eb]">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">

        {/* Heading */}
        <p className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-4">Integrations</p>
        <h2 className="text-[28px] md:text-[34px] font-black tracking-[-0.04em] text-[#1a1a1a] leading-tight max-w-xl">
          Built to work with the tools students already use.
        </h2>
        <p className="mt-3 text-[15px] text-[#6b6b6b] font-normal leading-relaxed max-w-lg">
          CollegeConnekt connects with Klime and BoostedBy to give you a complete picture of what's next — not just where to apply, but what happens after.
        </p>

        {/* Yin-yang square */}
        <div
          className="relative mt-12 w-full overflow-hidden"
          style={{ maxWidth: W, aspectRatio: '1 / 1', border: '1px solid #e5e7eb', borderRadius: 8 }}
        >
          <svg
            viewBox={`0 0 ${W} ${H}`}
            width="100%" height="100%"
            style={{ position: 'absolute', inset: 0 }}
            preserveAspectRatio="none"
          >
            <path d={LEFT_PATH}  fill="#f9fafb" />
            <path d={RIGHT_PATH} fill="#ffffff" />
            <path d={CURVE} fill="none" stroke="#e5e7eb" strokeWidth="1" />
          </svg>

          {/* Klime — lower-left fat region */}
          <div style={{ position: 'absolute', left: '17%', top: '72%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 17, color: '#1a1a1a', lineHeight: 1.2, margin: 0 }}>
              Klime
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9ca3af', fontWeight: 400, marginTop: 4, lineHeight: 1.4, maxWidth: 100 }}>
              Career mentorship for what comes after.
            </p>
          </div>

          {/* BoostedBy — upper-right fat region */}
          <div style={{ position: 'absolute', left: '83%', top: '28%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 17, color: '#1a1a1a', lineHeight: 1.2, margin: 0 }}>
              BoostedBy
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9ca3af', fontWeight: 400, marginTop: 4, lineHeight: 1.4, maxWidth: 100 }}>
              Student events to keep you connected.
            </p>
          </div>

          {/* CollegeConnekt wordmark — dead center */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 999, padding: '5px 14px', whiteSpace: 'nowrap' }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 13, color: '#1a1a1a', letterSpacing: '-0.02em' }}>
              CollegeConnekt
            </span>
          </div>
        </div>

        {/* Partner detail cards */}
        <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-2 gap-5 text-left">

          {/* Klime */}
          <div className="border border-[#e5e7eb] rounded-2xl overflow-hidden">
            <div className="bg-[#f9fafb] px-6 py-5 border-b border-[#e5e7eb]">
              <div className="flex items-center justify-between mb-1">
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16, color: '#1a1a1a', margin: 0 }}>Klime</p>
                <span className="text-[10px] font-semibold text-[#6366f1] bg-[#eef2ff] px-2.5 py-1 rounded-full">Career</span>
              </div>
              <p className="text-[13px] text-[#6b6b6b] font-normal leading-relaxed mt-1">
                Mentorship from people who actually went to your target schools and work in the fields you're interested in.
              </p>
            </div>
            <div className="px-6 py-4">
              <ul className="space-y-2.5">
                {klimeFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-[1px]">
                      <circle cx="7" cy="7" r="7" fill="#eef2ff"/>
                      <path d="M4 7l2 2 4-4" stroke="#6366f1" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-[13px] text-[#1a1a1a] leading-snug font-normal">{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#" className="inline-flex items-center gap-1 mt-4 text-[12px] font-semibold text-[#6366f1] hover:text-[#4f46e5] transition-colors">
                Learn more about Klime
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

          {/* BoostedBy */}
          <div className="border border-[#e5e7eb] rounded-2xl overflow-hidden">
            <div className="bg-white px-6 py-5 border-b border-[#e5e7eb]">
              <div className="flex items-center justify-between mb-1">
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16, color: '#1a1a1a', margin: 0 }}>BoostedBy</p>
                <span className="text-[10px] font-semibold text-[#0ea5e9] bg-[#e0f2fe] px-2.5 py-1 rounded-full">Events</span>
              </div>
              <p className="text-[13px] text-[#6b6b6b] font-normal leading-relaxed mt-1">
                Student events, campus visits, and networking opportunities — surfaced based on the schools on your list.
              </p>
            </div>
            <div className="px-6 py-4">
              <ul className="space-y-2.5">
                {boostedFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-[1px]">
                      <circle cx="7" cy="7" r="7" fill="#e0f2fe"/>
                      <path d="M4 7l2 2 4-4" stroke="#0ea5e9" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-[13px] text-[#1a1a1a] leading-snug font-normal">{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#" className="inline-flex items-center gap-1 mt-4 text-[12px] font-semibold text-[#0ea5e9] hover:text-[#0284c7] transition-colors">
                Learn more about BoostedBy
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Trust copy */}
        <p className="mt-8 text-[11px] text-[#9ca3af]" style={{ fontFamily: "'DM Mono', monospace" }}>
          Student data is never shared between platforms without your permission.
        </p>

      </div>
    </section>
  )
}
