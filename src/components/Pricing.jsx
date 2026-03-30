import { useState } from 'react'
import { motion } from 'framer-motion'

function Check({ active = true }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-0.5">
      <circle cx="7" cy="7" r="7" fill={active ? '#eff6ff' : '#f3f4f6'} />
      <path d="M4 7L6 9L10 5" stroke={active ? '#2563eb' : '#9ca3af'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function Lock() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0 mt-0.5">
      <rect x="2" y="5" width="8" height="6" rx="1.5" stroke="#d1d5db" strokeWidth="1.2"/>
      <path d="M4 5V3.5C4 2.4 4.9 1.5 6 1.5C7.1 1.5 8 2.4 8 3.5V5" stroke="#d1d5db" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

const plans = [
  {
    name: 'Free',
    price: { monthly: null, annual: null },
    description: 'Get started with the essentials.',
    cta: 'Start free',
    featured: false,
    features: [
      { text: 'Fit scores for up to 5 schools', active: true },
      { text: 'Basic action plan (10 tasks)', active: true },
      { text: 'Common App checklist', active: true },
      { text: '1 essay review per month', active: true },
      { text: 'Email reminders', active: true },
      { text: 'Unlimited school tracking', active: false, locked: true },
      { text: 'AI essay drafts', active: false, locked: true },
      { text: 'Priority support', active: false, locked: true },
    ],
  },
  {
    name: 'Student',
    price: { monthly: 8, annual: 64 },
    description: 'Everything you need for a strong application.',
    cta: 'Get started',
    featured: true,
    badge: 'Most popular',
    features: [
      { text: 'Unlimited school fit scores', active: true },
      { text: 'Full action plan (unlimited tasks)', active: true },
      { text: 'Common App checklist', active: true },
      { text: 'Unlimited essay reviews', active: true },
      { text: 'Email & SMS reminders', active: true },
      { text: 'Unlimited school tracking', active: true },
      { text: 'AI essay drafts', active: true },
      { text: 'Priority support', active: true },
    ],
  },
  {
    name: 'Family',
    price: { monthly: 13, annual: 104 },
    description: 'For parents who want to stay in the loop.',
    cta: 'Get started',
    featured: false,
    features: [
      { text: 'Everything in Student', active: true },
      { text: 'Parent dashboard access', active: true },
      { text: 'Shared action plan view', active: true },
      { text: 'Progress notifications for parents', active: true },
      { text: 'Up to 3 student accounts', active: true },
      { text: 'Unlimited school tracking', active: true },
      { text: 'AI essay drafts', active: true },
      { text: 'Priority support', active: true },
    ],
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <section className="py-24 px-6 bg-[#f9fafb] border-t border-[#e5e7eb]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-black text-[36px] tracking-tight text-[#1a1a1a]">
            Simple, honest pricing.
          </h2>
          <p className="mt-3 text-[16px] text-[#6b6b6b]">
            Start free. Upgrade when you're ready.
          </p>

          {/* Billing toggle */}
          <div className="mt-6 inline-flex items-center gap-3 bg-white border border-[#e5e7eb] rounded-full px-4 py-2">
            <button
              onClick={() => setAnnual(false)}
              className={`text-[13px] font-medium transition-colors ${!annual ? 'text-[#1a1a1a]' : 'text-[#6b6b6b]'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(!annual)}
              className={`w-9 h-5 rounded-full relative transition-colors ${annual ? 'bg-[#2563eb]' : 'bg-[#e5e7eb]'}`}
              role="switch"
              aria-checked={annual}
            >
              <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${annual ? 'translate-x-4' : 'translate-x-0.5'}`} />
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`text-[13px] font-medium transition-colors ${annual ? 'text-[#1a1a1a]' : 'text-[#6b6b6b]'}`}
            >
              Annual
              <span className="ml-1.5 text-[10px] bg-[#eff6ff] text-[#2563eb] font-semibold px-1.5 py-0.5 rounded">
                Save 33%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              className={`bg-white rounded-xl p-6 flex flex-col ${
                plan.featured
                  ? 'border-2 border-[#2563eb] shadow-[0_4px_24px_rgba(37,99,235,0.12)]'
                  : 'border border-[#e5e7eb]'
              }`}
              whileHover={{ y: -3, transition: { duration: 0.2, ease: 'easeOut' } }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-[13px] font-semibold text-[#1a1a1a]">{plan.name}</p>
                  <p className="mt-0.5 text-[12px] text-[#6b6b6b]">{plan.description}</p>
                </div>
                {plan.badge && (
                  <span className="text-[10px] font-semibold bg-[#eff6ff] text-[#2563eb] px-2 py-0.5 rounded">
                    {plan.badge}
                  </span>
                )}
              </div>

              <div className="mb-6">
                {plan.price.monthly ? (
                  <div className="flex items-end gap-1">
                    <span className="text-[32px] font-black text-[#1a1a1a] leading-none">
                      ${annual ? Math.round(plan.price.annual / 12) : plan.price.monthly}
                    </span>
                    <span className="text-[13px] text-[#6b6b6b] mb-1">/ month</span>
                  </div>
                ) : (
                  <span className="text-[32px] font-black text-[#1a1a1a] leading-none">Free</span>
                )}
                {plan.price.annual && annual && (
                  <p className="mt-1 text-[11px] text-[#6b6b6b]">
                    ${plan.price.annual} billed annually
                  </p>
                )}
              </div>

              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    {feature.locked ? <Lock /> : <Check active={feature.active} />}
                    <span className={`text-[13px] leading-snug ${feature.locked ? 'text-[#9ca3af]' : 'text-[#1a1a1a]'}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`w-full text-center text-[13px] font-medium py-2.5 rounded-md transition-colors ${
                  plan.featured
                    ? 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
                    : 'border border-[#e5e7eb] text-[#1a1a1a] hover:border-[#d1d5db] hover:bg-[#f9fafb]'
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
