function FitScoreCard() {
  const schools = [
    { name: 'University of Michigan', match: 91 },
    { name: 'UC Berkeley', match: 74 },
    { name: 'NYU', match: 88 },
  ]

  return (
    <div className="border border-[#e5e7eb] rounded-xl overflow-hidden bg-white">
      <div className="bg-[#f9fafb] border-b border-[#e5e7eb] px-4 py-3">
        <span className="text-[11px] font-medium text-[#6b6b6b] uppercase tracking-wide">School Fit Scores</span>
      </div>
      <div className="p-4 space-y-4">
        {schools.map((school, i) => (
          <div key={i}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[12px] font-medium text-[#1a1a1a]">{school.name}</span>
              <span className={`text-[12px] font-bold ${school.match >= 85 ? 'text-[#16a34a]' : 'text-[#2563eb]'}`}>
                {school.match}%
              </span>
            </div>
            <div className="w-full bg-[#f3f4f6] rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full ${school.match >= 85 ? 'bg-[#16a34a]' : 'bg-[#2563eb]'}`}
                style={{ width: `${school.match}%` }}
              />
            </div>
            <div className="flex gap-4 mt-1.5">
              <span className="text-[10px] text-[#6b6b6b]">Avg GPA 3.{Math.floor(5 + i * 1.5)}</span>
              <span className="text-[10px] text-[#6b6b6b]">Mid SAT {1480 + i * 30}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ActionPlanCard() {
  const items = [
    { text: 'Request teacher recommendation from Mr. Chen', priority: 'High', done: true },
    { text: 'Complete FAFSA for all schools', priority: 'High', done: false },
    { text: 'Revise Common App personal statement', priority: 'Due Nov 1', done: false },
    { text: 'Review financial aid package from UMich', priority: 'Pending', done: false },
  ]

  return (
    <div className="border border-[#e5e7eb] rounded-xl overflow-hidden bg-white">
      <div className="bg-[#f9fafb] border-b border-[#e5e7eb] px-4 py-3 flex items-center justify-between">
        <span className="text-[11px] font-medium text-[#6b6b6b] uppercase tracking-wide">Action Plan</span>
        <span className="text-[10px] text-[#6b6b6b]">3 of 4 done</span>
      </div>
      <div className="p-4 space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <div className={`mt-0.5 w-4 h-4 rounded flex-shrink-0 border flex items-center justify-center ${item.done ? 'bg-[#2563eb] border-[#2563eb]' : 'border-[#d1d5db]'}`}>
              {item.done && (
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-[12px] leading-snug ${item.done ? 'line-through text-[#9ca3af]' : 'text-[#1a1a1a]'}`}>
                {item.text}
              </p>
              <span className={`inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded font-medium ${
                item.priority === 'High' ? 'bg-[#fef2f2] text-[#dc2626]' :
                item.priority === 'Pending' ? 'bg-[#f3f4f6] text-[#6b7280]' :
                'bg-[#fefce8] text-[#92400e]'
              }`}>
                {item.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function EssayReviewCard() {
  return (
    <div className="border border-[#e5e7eb] rounded-xl overflow-hidden bg-white">
      <div className="bg-[#f9fafb] border-b border-[#e5e7eb] px-4 py-3 flex items-center justify-between">
        <span className="text-[11px] font-medium text-[#6b6b6b] uppercase tracking-wide">Essay Review</span>
        <span className="text-[10px] bg-[#eff6ff] text-[#2563eb] font-medium px-2 py-0.5 rounded">AI Feedback</span>
      </div>
      <div className="p-4 space-y-3">
        <p className="text-[12px] leading-relaxed text-[#1a1a1a]">
          Growing up in a household where two languages collided at the dinner table, I learned early that translation is never just about words — it's about{' '}
          <span className="bg-[#fef9c3] border-b-2 border-[#eab308] cursor-default">bridging entire worlds.</span>{' '}
          My grandmother's stories, half in Tagalog and half in English, became the maps I used to navigate between cultures.
        </p>
        <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-3 h-3 rounded-full bg-[#2563eb] flex items-center justify-center">
              <span className="text-[8px] text-white font-bold">i</span>
            </div>
            <p className="text-[11px] text-[#1d4ed8] font-medium">CollegeConnekt AI</p>
          </div>
          <p className="text-[11px] text-[#1e40af] leading-relaxed">
            Strong metaphor. Ground this with a specific memory — what was one story she told? A concrete scene here would make the opening unforgettable.
          </p>
        </div>
        <div className="flex items-center gap-3 pt-1">
          <div className="flex-1 bg-[#f3f4f6] rounded-full h-1">
            <div className="bg-[#2563eb] h-1 rounded-full" style={{ width: '68%' }} />
          </div>
          <span className="text-[10px] text-[#6b6b6b] whitespace-nowrap">Draft 2 of 3</span>
        </div>
      </div>
    </div>
  )
}

const features = [
  {
    Card: FitScoreCard,
    headline: 'Know where you stand.',
    description: 'Fit scores built from real Common Data Set figures — GPA, test scores, and acceptance rates — so you apply strategically.',
  },
  {
    Card: ActionPlanCard,
    headline: 'Never miss a deadline.',
    description: 'A prioritized checklist that updates as you progress. Every task, every due date, in one place.',
  },
  {
    Card: EssayReviewCard,
    headline: 'Essays that actually stand out.',
    description: 'Inline AI feedback trained on admitted essays. Get specific suggestions, not generic advice.',
  },
]

export default function Features() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-[36px] tracking-tight text-[#1a1a1a]">
            Everything you need. Nothing you don't.
          </h2>
          <p className="mt-3 text-[16px] text-[#6b6b6b]">
            Built for the way students actually apply to college.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {features.map(({ Card, headline, description }, i) => (
            <div key={i} className="flex flex-col gap-5">
              <Card />
              <div>
                <h3 className="font-display font-bold text-[16px] text-[#1a1a1a] tracking-tight">
                  {headline}
                </h3>
                <p className="mt-1.5 text-[14px] text-[#6b6b6b] leading-relaxed">
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
