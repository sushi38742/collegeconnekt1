import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

const SCHOOLS = [
  { name: 'MIT',              location: 'Cambridge, MA',   accept: '4%',  satLo: 1510, satHi: 1580, gpaLo: 3.90, gpaHi: 4.00 },
  { name: 'Yale',             location: 'New Haven, CT',   accept: '5%',  satLo: 1500, satHi: 1570, gpaLo: 3.92, gpaHi: 4.00 },
  { name: 'Northwestern',     location: 'Evanston, IL',    accept: '7%',  satLo: 1490, satHi: 1570, gpaLo: 3.88, gpaHi: 3.97 },
  { name: 'U Michigan',       location: 'Ann Arbor, MI',   accept: '17%', satLo: 1360, satHi: 1530, gpaLo: 3.80, gpaHi: 3.96 },
  { name: 'Northeastern',     location: 'Boston, MA',      accept: '7%',  satLo: 1450, satHi: 1540, gpaLo: 3.70, gpaHi: 3.96 },
  { name: 'UCLA',             location: 'Los Angeles, CA', accept: '11%', satLo: 1290, satHi: 1510, gpaLo: 3.89, gpaHi: 4.00 },
]

function fitScore(sat, gpa, school) {
  if (!sat || !gpa) return null
  const satMid = (school.satLo + school.satHi) / 2
  const gpaMid = (school.gpaLo + school.gpaHi) / 2
  const satFit = Math.max(0, 1 - Math.abs(sat - satMid) / 220)
  const gpaFit = Math.max(0, 1 - Math.abs(gpa - gpaMid) / 0.55)
  return Math.min(99, Math.max(12, Math.round((satFit * 0.45 + gpaFit * 0.45 + 0.1) * 100)))
}

function tier(score) {
  if (score >= 84) return { label: 'Strong match', color: '#4ade80' }
  if (score >= 66) return { label: 'Match',        color: '#60a5fa' }
  if (score >= 46) return { label: 'Reach',        color: '#fbbf24' }
  return                  { label: 'Far reach',    color: '#f87171' }
}

export default function FitPreview() {
  const [sat, setSat] = useState('')
  const [gpa, setGpa] = useState('')
  const hasInput = sat !== '' && gpa !== ''

  const results = useMemo(() => {
    const s = parseInt(sat, 10)
    const g = parseFloat(gpa)
    return SCHOOLS.map(school => ({
      ...school,
      score: (!isNaN(s) && !isNaN(g)) ? fitScore(s, g, school) : null,
    })).sort((a, b) => (b.score ?? -1) - (a.score ?? -1))
  }, [sat, gpa])

  return (
    <section className="bg-[#0f1117] py-20 md:py-28 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">

          {/* Left */}
          <div>
            <p className="text-[11px] font-semibold text-[#4b5563] uppercase tracking-widest mb-4">Live fit preview</p>
            <h2 className="text-[28px] sm:text-[34px] font-black tracking-[-0.04em] text-white leading-tight mb-4">
              See where you stand<br className="hidden sm:block" /> before you apply.
            </h2>
            <p className="text-[14px] text-[#6b7280] leading-relaxed mb-8 max-w-sm">
              Enter your GPA and SAT. We'll show you an instant fit score for six schools — no account needed.
            </p>

            <div className="space-y-3 mb-8">
              <div>
                <label className="block text-[11px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-2">
                  SAT score
                </label>
                <input
                  type="number"
                  min="400" max="1600"
                  placeholder="e.g. 1480"
                  value={sat}
                  onChange={e => setSat(e.target.value)}
                  className="w-full bg-[#1c1f26] border border-[#2d3139] rounded-xl px-4 py-3 text-[15px] text-white placeholder-[#4b5563] outline-none focus:border-[#4b5563] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#9ca3af] uppercase tracking-widest mb-2">
                  GPA (unweighted)
                </label>
                <input
                  type="number"
                  min="2.0" max="4.0" step="0.01"
                  placeholder="e.g. 3.85"
                  value={gpa}
                  onChange={e => setGpa(e.target.value)}
                  className="w-full bg-[#1c1f26] border border-[#2d3139] rounded-xl px-4 py-3 text-[15px] text-white placeholder-[#4b5563] outline-none focus:border-[#4b5563] transition-colors"
                />
              </div>
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-2 bg-white text-[#0f1117] text-[13px] font-bold px-5 py-3 rounded-xl hover:bg-[#2563eb] hover:text-white transition-colors"
            >
              Get your full list →
            </a>
            <p className="mt-3 text-[11px] text-[#4b5563]">Free. No card. Scores for all schools you add.</p>
          </div>

          {/* Right — school results */}
          <div className="space-y-2">
            {results.map((school, i) => {
              const t = school.score ? tier(school.score) : null
              return (
                <motion.div
                  key={school.name}
                  layout
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-[#1c1f26] border border-[#2d3139] rounded-2xl px-5 py-4 flex items-center gap-4"
                >
                  {/* Rank */}
                  <span className="text-[12px] font-bold text-[#3d4149] w-4 flex-shrink-0 text-right">{i + 1}</span>

                  {/* School info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[13px] font-bold text-white truncate">{school.name}</span>
                      <span className="text-[10px] text-[#4b5563] flex-shrink-0">{school.accept} accept</span>
                    </div>
                    {/* Fit bar */}
                    <div className="h-1 bg-[#2d3139] rounded-full overflow-hidden w-full">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: t?.color ?? '#2d3139' }}
                        animate={{ width: school.score ? `${school.score}%` : '0%' }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>

                  {/* Score + tier */}
                  <div className="text-right flex-shrink-0 w-24">
                    {school.score ? (
                      <>
                        <motion.p
                          key={school.score}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                          className="text-[18px] font-black text-white leading-none"
                        >
                          {school.score}
                        </motion.p>
                        <p className="text-[10px] mt-0.5 font-medium" style={{ color: t.color }}>
                          {t.label}
                        </p>
                      </>
                    ) : (
                      <p className="text-[11px] text-[#3d4149]">Enter stats</p>
                    )}
                  </div>
                </motion.div>
              )
            })}

            {hasInput && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-[11px] text-[#4b5563] pt-2"
              >
                Scores are estimates. Sign up for full admissions analysis.
              </motion.p>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
