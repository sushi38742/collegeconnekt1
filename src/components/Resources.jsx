const articles = [
  {
    category: 'Strategy',
    title: 'How to build a balanced college list in 5 steps',
    excerpt: 'Most students apply to too many reaches and not enough matches. Here\'s the framework we recommend — and the data behind it.',
    readTime: '6 min read',
    date: 'Oct 14, 2025',
  },
  {
    category: 'Essays',
    title: 'The Common App essay prompts, ranked by difficulty',
    excerpt: 'Not all prompts are created equal. We analyzed thousands of admitted essays to find out which prompts students use — and which they should.',
    readTime: '8 min read',
    date: 'Sep 28, 2025',
  },
  {
    category: 'Deadlines',
    title: 'Early Decision vs. Early Action: which is right for you?',
    excerpt: 'The difference matters more than most students realize. ED is binding; EA isn\'t. But the strategy depends entirely on your situation.',
    readTime: '5 min read',
    date: 'Sep 10, 2025',
  },
  {
    category: 'Financial Aid',
    title: 'Understanding your financial aid award letter',
    excerpt: 'When offers arrive, the numbers can be confusing. This guide breaks down every line item — and shows you what to negotiate.',
    readTime: '10 min read',
    date: 'Nov 2, 2025',
  },
]

const categoryColor = {
  Strategy: 'bg-[#eff6ff] text-[#2563eb]',
  Essays: 'bg-[#fef9c3] text-[#92400e]',
  Deadlines: 'bg-[#fef2f2] text-[#dc2626]',
  'Financial Aid': 'bg-[#f0fdf4] text-[#16a34a]',
}

export default function Resources() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[11px] font-semibold text-[#6b6b6b] uppercase tracking-wide mb-2">From the blog</p>
            <h2 className="font-display font-bold text-[36px] tracking-tight text-[#1a1a1a]">
              The knowledge you actually need.
            </h2>
          </div>
          <a href="#" className="text-[13px] font-medium text-[#2563eb] hover:underline flex-shrink-0">
            View all articles →
          </a>
        </div>

        {/* Featured article + 3 cards */}
        <div className="grid grid-cols-5 gap-4">
          {/* Featured — spans 2 cols */}
          <a
            href="#"
            className="col-span-2 border border-[#e5e7eb] rounded-xl p-7 flex flex-col justify-between bg-white hover:border-[#d1d5db] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all group"
          >
            <div>
              <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded mb-4 ${categoryColor[articles[0].category]}`}>
                {articles[0].category}
              </span>
              <h3 className="font-display font-bold text-[20px] leading-snug tracking-tight text-[#1a1a1a] group-hover:text-[#2563eb] transition-colors">
                {articles[0].title}
              </h3>
              <p className="mt-3 text-[13px] text-[#6b6b6b] leading-relaxed">{articles[0].excerpt}</p>
            </div>
            <div className="flex items-center justify-between mt-8">
              <span className="text-[11px] text-[#9ca3af]">{articles[0].date}</span>
              <span className="text-[11px] font-medium text-[#6b6b6b] bg-[#f3f4f6] px-2.5 py-1 rounded-full">{articles[0].readTime}</span>
            </div>
          </a>

          {/* 3 stacked on right — spans 3 cols in a 1-col grid */}
          <div className="col-span-3 flex flex-col gap-4">
            {articles.slice(1).map((article, i) => (
              <a
                key={i}
                href="#"
                className="border border-[#e5e7eb] rounded-xl p-5 flex items-start gap-5 bg-white hover:border-[#d1d5db] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${categoryColor[article.category]}`}>
                      {article.category}
                    </span>
                    <span className="text-[10px] text-[#9ca3af]">{article.date}</span>
                  </div>
                  <h3 className="font-display font-bold text-[15px] leading-snug tracking-tight text-[#1a1a1a] group-hover:text-[#2563eb] transition-colors">
                    {article.title}
                  </h3>
                  <p className="mt-1 text-[12px] text-[#6b6b6b] leading-relaxed line-clamp-2">{article.excerpt}</p>
                </div>
                <span className="text-[11px] font-medium text-[#6b6b6b] bg-[#f3f4f6] px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0 mt-1">
                  {article.readTime}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
