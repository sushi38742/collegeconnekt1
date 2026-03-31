// S-curve bezier path that divides a 560×560 square yin-yang style.
// Top half curves left, bottom half curves right.
const W = 560
const H = 560
const MX = W / 2  // 280

// The S-curve from (280,0) → (280,280) → (280,560)
const CURVE = `M ${MX} 0 C ${MX - 140} 0 ${MX - 140} ${H / 2} ${MX} ${H / 2} C ${MX + 140} ${H / 2} ${MX + 140} ${H} ${MX} ${H}`

// Left half: bounded by the S-curve then the left/bottom/top edges
const LEFT_PATH  = `${CURVE} L 0 ${H} L 0 0 Z`
// Right half: bounded by the S-curve then the right edges
const RIGHT_PATH = `${CURVE} L ${W} ${H} L ${W} 0 Z`

export default function Partnerships() {
  return (
    <section className="py-20 md:py-24 px-6 bg-white border-t border-[#e5e7eb]">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">

        {/* Heading */}
        <h2 className="text-[28px] md:text-[34px] font-black tracking-[-0.04em] text-[#1a1a1a] leading-tight">
          Built to work with the tools students already use.
        </h2>
        <p className="mt-3 text-[15px] text-[#6b6b6b] font-normal leading-relaxed max-w-xl">
          CollegeConnekt connects with Klime and BoostedBy to give you a complete picture of what's next.
        </p>

        {/* Square */}
        <div
          className="relative mt-12 w-full overflow-hidden"
          style={{
            maxWidth: W,
            aspectRatio: '1 / 1',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
          }}
        >
          {/* SVG halves */}
          <svg
            viewBox={`0 0 ${W} ${H}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', inset: 0 }}
            preserveAspectRatio="none"
          >
            <path d={LEFT_PATH}  fill="#f9fafb" />
            <path d={RIGHT_PATH} fill="#ffffff" />
            {/* S-curve stroke — very subtle */}
            <path d={CURVE} fill="none" stroke="#e5e7eb" strokeWidth="1" />
          </svg>

          {/* Left half label — lower-left fat region */}
          <div
            style={{
              position: 'absolute',
              left: '17%',
              top: '72%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}
          >
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 17, color: '#1a1a1a', lineHeight: 1.2, margin: 0 }}>
              Klime
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9ca3af', fontWeight: 400, marginTop: 4, lineHeight: 1.4, maxWidth: 110 }}>
              Career mentorship for what comes after.
            </p>
          </div>

          {/* Right half label — upper-right fat region */}
          <div
            style={{
              position: 'absolute',
              left: '83%',
              top: '28%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}
          >
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 17, color: '#1a1a1a', lineHeight: 1.2, margin: 0 }}>
              BoostedBy
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#9ca3af', fontWeight: 400, marginTop: 4, lineHeight: 1.4, maxWidth: 110 }}>
              Student events to keep you connected.
            </p>
          </div>

          {/* CollegeConnekt wordmark — dead center on the S-curve */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: 999,
              padding: '5px 14px',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 13, color: '#1a1a1a', letterSpacing: '-0.02em' }}>
              CollegeConnekt
            </span>
          </div>
        </div>

        {/* Trust copy */}
        <p
          className="mt-8 text-[11px] text-[#9ca3af]"
          style={{ fontFamily: "'DM Mono', monospace", fontWeight: 400 }}
        >
          Student data is never shared between platforms without your permission.
        </p>

      </div>
    </section>
  )
}
