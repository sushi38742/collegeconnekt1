function FitScoreCard() {
  const schools = [
    { name: 'University of Michigan', accept: '17%', gpa: '3.88', sat: '1480', fit: 91 },
    { name: 'UC Berkeley', accept: '14%', gpa: '3.92', sat: '1510', fit: 74 },
    { name: 'New York University', accept: '12%', gpa: '3.78', sat: '1450', fit: 88 },
  ]

  return (
    <div className="border border-[#e5e7eb] rounded-xl overflow-hidden bg-white">
      <div className="px-4 py-3 border-b border-[#e5e7eb]">
        <span className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-widest">Fit Scores</span>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#f3f4f6]">
            <th className="px-4 py-2 text-left text-[10px] font-medium text-[#9ca3af]">School</th>
            <th className="px-4 py-2 text-right text-[10px] font-medium text-[#9ca3af]">Accept</th>
            <th className="px-4 py-2 text-right text-[10px] font-medium text-[#9ca3af]">Mid SAT</th>
            <th className="px-4 py-2 text-right text-[10px] font-medium text-[#9ca3af]">Fit</th>
          </tr>
        </thead>
        <tbody>
          {schools.map((s, i) => (
            <tr key={i} className={i < schools.length - 1 ? 'border-b border-[#f3f4f6]' : ''}>
              <td className="px-4 py-3 text-[12px] font-medium text-[#1a1a1a]">{s.name}</td>
              <td className="px-4 py-3 text-right text-[12px] text-[#6b6b6b]">{s.accept}</td>
              <td className="px-4 py-3 text-right text-[12px] text-[#6b6b6b]">{s.sat}</td>
              <td className="px-4 py-3 text-right text-[12px] font-semibold text-[#1a1a1a]">{s.fit}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ActionPlanCard() {
  const items = [
    { text: 'Request rec letter — Mr. Chen', date: null, done: true },
    { text: 'Complete FAFSA', date: 'Oct 15', done: false },
    { text: 'Revise personal statement', date: 'Oct 28', done: false },
    { text: 'Submit Common App', date: 'Nov 1', done: false },
  ]

  return (
    <div className="border border-[#e5e7eb] rounded-xl overflow-hidden bg-white">
      <div className="px-4 py-3 border-b border-[#e5e7eb] flex items-center justify-between">
        <span className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-widest">Action Plan</span>
        <span className="text-[11px] text-[#9ca3af]">1 of 4 done</span>
      </div>
      <div className="divide-y divide-[#f3f4f6]">
        {items.map((item, i) => (
          <div key={i} className="px-4 py-3 flex items-center gap-3">
            <div className={`w-3.5 h-3.5 rounded-sm border flex-shrink-0 flex items-center justify-center ${item.done ? 'bg-[#1a1a1a] border-[#1a1a1a]' : 'border-[#d1d5db]'}`}>
              {item.done && (
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4l1.5 1.5 3.5-3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <p className={`flex-1 text-[12px] ${item.done ? 'line-through text-[#9ca3af]' : 'text-[#1a1a1a]'}`}>
              {item.text}
            </p>
            {item.date && (
              <span className="text-[11px] text-[#9ca3af] flex-shrink-0">{item.date}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function EssayReviewCard() {
  return (
    <div className="border border-[#e5e7eb] rounded-xl overflow-hidden bg-white">
      <div className="px-4 py-3 border-b border-[#e5e7eb] flex items-center justify-between">
        <span className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-widest">Essay Review</span>
        <span className="text-[11px] text-[#9ca3af]">Draft 2 of 3</span>
      </div>
      <div className="p-4 space-y-3">
        <p className="text-[12px] leading-relaxed text-[#1a1a1a]">
          Growing up in a household where two languages collided at the dinner table, I learned early that translation is never just about words — it's about{' '}
          <span className="bg-[#fef9c3]">bridging entire worlds.</span>{' '}
          My grandmother's stories, half in Tagalog and half in English, became the maps I used to navigate between cultures.
        </p>
        <div className="border-l-2 border-[#e5e7eb] pl-3">
          <p className="text-[10px] font-semibold text-[#6b6b6b] mb-0.5">CollegeConnekt</p>
          <p className="text-[11px] text-[#6b6b6b] leading-relaxed">
            Strong metaphor. Add one specific memory here — a scene, not a summary.
          </p>
        </div>
      </div>
    </div>
  )
}

const features = [
  {
    Card: FitScoreCard,
    headline: 'Know where you stand.',
    description: 'Fit scores built from real Common Data Set figures — GPA, test scores, acceptance rates — so you apply strategically.',
  },
  {
    Card: ActionPlanCard,
    headline: 'Never miss a deadline.',
    description: 'A prioritized checklist that updates as you progress. Every task, every due date, in one place.',
  },
  {
    Card: EssayReviewCard,
    headline: 'Essays that actually stand out.',
    description: 'Inline feedback trained on admitted essays. Get specific suggestions, not generic advice.',
  },
]

export default function Features() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <h2 className="text-[40px] font-black tracking-[-0.04em] text-[#1a1a1a] leading-tight">
            Everything you need.<br />Nothing you don't.
          </h2>
          <p className="mt-3 text-[16px] text-[#6b6b6b] font-normal">
            Built for the way students actually apply to college.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {features.map(({ Card, headline, description }, i) => (
            <div key={i} className="flex flex-col gap-5">
              <Card />
              <div>
                <h3 className="text-[15px] font-bold tracking-tight text-[#1a1a1a]">
                  {headline}
                </h3>
                <p className="mt-1 text-[13px] text-[#6b6b6b] leading-relaxed font-normal">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
