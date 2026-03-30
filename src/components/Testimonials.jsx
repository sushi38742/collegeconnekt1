const featured = {
  quote: "CollegeConnekt was the first thing that actually made me feel in control of the process. I knew exactly where I stood at every school, and the essay feedback was sharper than anything my counselor gave me.",
  name: 'Priya M.',
  detail: 'Admitted to Duke University · Class of 2028',
  avatar: 'PM',
}

const cards = [
  {
    quote: "The fit score feature alone saved me from applying to schools I had no real shot at. I ended up with a stronger, more focused list.",
    name: 'Marcus T.',
    detail: 'Admitted to Northeastern · Class of 2028',
    avatar: 'MT',
  },
  {
    quote: "I used the essay review on every single draft. The inline comments were specific and actually useful — not the vague 'be more specific' feedback I'd gotten before.",
    name: 'Sophie L.',
    detail: 'Admitted to UVA · Class of 2027',
    avatar: 'SL',
  },
  {
    quote: "My school counselor manages 400 students. CollegeConnekt basically gave me a personal advisor who was available at 2am the week of deadlines.",
    name: 'Aiden K.',
    detail: 'Admitted to UT Austin · Class of 2028',
    avatar: 'AK',
  },
]

function Avatar({ initials }) {
  return (
    <div className="w-8 h-8 rounded-full bg-[#eff6ff] flex items-center justify-center flex-shrink-0">
      <span className="text-[11px] font-bold text-[#2563eb]">{initials}</span>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="py-24 px-6 bg-[#f9fafb] border-t border-[#e5e7eb]">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display font-bold text-[36px] tracking-tight text-[#1a1a1a] mb-10">
          Students who got in.
        </h2>

        {/* Featured card */}
        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-10 mb-4 grid grid-cols-[1fr_auto] gap-10 items-center">
          <div>
            <p className="text-[22px] font-display font-medium text-[#1a1a1a] leading-snug tracking-tight">
              "{featured.quote}"
            </p>
            <div className="flex items-center gap-2.5 mt-6">
              <Avatar initials={featured.avatar} />
              <div>
                <p className="text-[13px] font-semibold text-[#1a1a1a]">{featured.name}</p>
                <p className="text-[12px] text-[#6b6b6b]">{featured.detail}</p>
              </div>
            </div>
          </div>
          {/* Mini stats panel */}
          <div className="border-l border-[#e5e7eb] pl-10 flex flex-col gap-6 text-right">
            {[
              { val: '12', label: 'Schools tracked' },
              { val: '7', label: 'Essays reviewed' },
              { val: '3', label: 'Offers received' },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-[28px] font-display font-bold text-[#1a1a1a] leading-none">{s.val}</p>
                <p className="text-[11px] text-[#6b6b6b] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3-column cards */}
        <div className="grid grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <div key={i} className="bg-white border border-[#e5e7eb] rounded-xl p-6 flex flex-col justify-between gap-6">
              <p className="text-[14px] text-[#1a1a1a] leading-relaxed">
                "{card.quote}"
              </p>
              <div className="flex items-center gap-2.5">
                <Avatar initials={card.avatar} />
                <div>
                  <p className="text-[12px] font-semibold text-[#1a1a1a]">{card.name}</p>
                  <p className="text-[11px] text-[#6b6b6b]">{card.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ticker strip */}
        <div className="mt-8 border-t border-[#e5e7eb] pt-5 flex items-center justify-center gap-8 overflow-hidden">
          {[
            'Free to start',
            '16,000+ students',
            '4.9 star rating',
            '94% would recommend',
            'No credit card required',
            'Trusted in all 50 states',
          ].map((item, i) => (
            <span key={i} className="text-[11px] font-medium text-[#6b6b6b] whitespace-nowrap flex items-center gap-2">
              {i > 0 && <span className="w-1 h-1 rounded-full bg-[#d1d5db]" />}
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
