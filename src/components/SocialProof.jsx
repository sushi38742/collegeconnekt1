const stats = [
  { value: '16,000+', label: 'Students' },
  { value: '50 states', label: 'Nationwide reach' },
  { value: '4.9 stars', label: 'Average rating' },
  { value: '94%', label: 'Would recommend' },
]

export default function SocialProof() {
  return (
    <section className="bg-[#f9fafb] border-y border-[#e5e7eb] py-10">
      <div className="max-w-4xl mx-auto px-6">
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
    </section>
  )
}
