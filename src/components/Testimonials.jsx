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
    <section className="py-20 md:py-24 px-6 bg-white border-t border-[#e5e7eb]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-[32px] md:text-[40px] font-black tracking-[-0.04em] text-[#1a1a1a] leading-tight mb-10">
          Students who got in.
        </h2>

        {/* Featured card */}
        <div className="bg-[#efe6d8] border border-[rgba(0,0,0,0.06)] rounded-2xl p-7 md:p-10 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-start">
            <div>
              <p className="text-[18px] md:text-[22px] font-normal text-[#1a1a1a] leading-snug tracking-tight">
                "{featured.quote}"
              </p>
              <div className="flex items-center gap-2.5 mt-6 md:mt-8">
                <Avatar initials={featured.initials} />
                <div>
                  <p className="text-[13px] font-semibold text-[#1a1a1a]">{featured.name}</p>
                  <p className="text-[12px] text-[#9ca3af] font-normal">{featured.detail}</p>
                </div>
              </div>
            </div>
            {/* Stats — row on mobile, column on desktop */}
            <div className="flex flex-row md:flex-col gap-6 md:gap-7 md:border-l md:border-[#e5e7eb] md:pl-12 pt-6 md:pt-0 border-t md:border-t-0 border-[#e5e7eb]">
              {[
                { val: '12', label: 'Schools tracked' },
                { val: '7', label: 'Essays reviewed' },
                { val: '3', label: 'Offers received' },
              ].map((s, i) => (
                <div key={i} className="md:text-right">
                  <p className="text-[28px] md:text-[32px] font-black tracking-tighter text-[#1a1a1a] leading-none">{s.val}</p>
                  <p className="text-[11px] text-[#9ca3af] mt-1 font-normal">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quote cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
