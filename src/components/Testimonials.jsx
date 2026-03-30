const featured = {
  quote: "CollegeConnekt was the first thing that actually made me feel in control of the process. I knew exactly where I stood at every school, and the essay feedback was sharper than anything my counselor gave me.",
  name: 'Priya M.',
  detail: 'Admitted to Duke University · Class of 2028',
  initials: 'PM',
}

const cards = [
  {
    quote: "The fit score feature alone saved me from applying to schools I had no real shot at. I ended up with a stronger, more focused list.",
    name: 'Marcus T.',
    detail: 'Admitted to Northeastern · Class of 2028',
    initials: 'MT',
  },
  {
    quote: "I used the essay review on every single draft. The inline comments were specific — not the vague 'be more specific' feedback I'd gotten before.",
    name: 'Sophie L.',
    detail: 'Admitted to UVA · Class of 2027',
    initials: 'SL',
  },
  {
    quote: "My school counselor manages 400 students. CollegeConnekt gave me a personal advisor available at 2am the week of deadlines.",
    name: 'Aiden K.',
    detail: 'Admitted to UT Austin · Class of 2028',
    initials: 'AK',
  },
]

function Avatar({ initials }) {
  return (
    <div className="w-8 h-8 rounded-full bg-[#f3f4f6] flex items-center justify-center flex-shrink-0">
      <span className="text-[11px] font-bold text-[#1a1a1a]">{initials}</span>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="py-24 px-6 bg-[#f9fafb] border-t border-[#e5e7eb]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-[40px] font-black tracking-[-0.04em] text-[#1a1a1a] leading-tight mb-10">
          Students who got in.
        </h2>

        {/* Featured card */}
        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-10 mb-4 grid grid-cols-[1fr_auto] gap-12 items-start">
          <div>
            <p className="text-[22px] font-normal text-[#1a1a1a] leading-snug tracking-tight">
              "{featured.quote}"
            </p>
            <div className="flex items-center gap-2.5 mt-8">
              <Avatar initials={featured.initials} />
              <div>
                <p className="text-[13px] font-semibold text-[#1a1a1a]">{featured.name}</p>
                <p className="text-[12px] text-[#9ca3af] font-normal">{featured.detail}</p>
              </div>
            </div>
          </div>
          <div className="border-l border-[#e5e7eb] pl-12 flex flex-col gap-7">
            {[
              { val: '12', label: 'Schools tracked' },
              { val: '7', label: 'Essays reviewed' },
              { val: '3', label: 'Offers received' },
            ].map((s, i) => (
              <div key={i} className="text-right">
                <p className="text-[32px] font-black tracking-tighter text-[#1a1a1a] leading-none">{s.val}</p>
                <p className="text-[11px] text-[#9ca3af] mt-1 font-normal">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3-column cards */}
        <div className="grid grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <div key={i} className="bg-white border border-[#e5e7eb] rounded-xl p-6 flex flex-col justify-between gap-6">
              <p className="text-[14px] text-[#1a1a1a] leading-relaxed font-normal">
                "{card.quote}"
              </p>
              <div className="flex items-center gap-2.5">
                <Avatar initials={card.initials} />
                <div>
                  <p className="text-[12px] font-semibold text-[#1a1a1a]">{card.name}</p>
                  <p className="text-[11px] text-[#9ca3af] font-normal">{card.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
