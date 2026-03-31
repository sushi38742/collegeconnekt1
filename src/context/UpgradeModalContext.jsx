import { createContext, useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

const UpgradeModalContext = createContext(null)

const PLAN_DETAILS = {
  student: {
    name: 'Student',
    price: '$26',
    desc: 'Unlimited saved schools, full CDS data, school comparison, and unlimited AI chat.',
    priceId: import.meta.env.VITE_STRIPE_STUDENT_PRICE_ID,
  },
  student_pro: {
    name: 'Student Pro',
    price: '$42',
    desc: 'Everything in Student plus essay analysis, admissions fit scoring, AI action plan, and essay draft assist.',
    priceId: import.meta.env.VITE_STRIPE_PRO_PRICE_ID,
  },
}

export function UpgradeModalProvider({ children }) {
  const { session } = useAuth()
  const [modal, setModal] = useState(null) // { feature, planNeeded }
  const [loading, setLoading] = useState(false)

  function openModal(opts) { setModal(opts) }
  function closeModal() { setModal(null) }

  async function handleUpgrade() {
    if (!session) return
    setLoading(true)
    const { data, error } = await supabase.functions.invoke('stripe-checkout', {
      body: { user_id: session.user.id, plan: modal.planNeeded },
    })
    if (!error && data?.url) window.location.href = data.url
    setLoading(false)
  }

  const plan = modal ? PLAN_DETAILS[modal.planNeeded] : null

  return (
    <UpgradeModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <AnimatePresence>
        {modal && plan && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6"
            onClick={e => { if (e.target === e.currentTarget) closeModal() }}>
            <motion.div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} />
            <motion.div
              className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.18)] w-full sm:max-w-md overflow-hidden"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-[#2563eb] px-5 py-2.5">
                <span className="text-[11px] font-semibold text-white tracking-wide">
                  Unlock {modal.feature}
                </span>
              </div>
              <div className="p-6 sm:p-8">
                <button onClick={closeModal} className="absolute top-[52px] right-6 text-[#9ca3af] hover:text-[#1a1a1a]">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                </button>
                <h3 className="text-[20px] font-black tracking-[-0.03em] text-[#1a1a1a] mb-1">{plan.name}</h3>
                <p className="text-[13px] text-[#6b6b6b] mb-5">{plan.desc}</p>
                <div className="flex items-end gap-1.5 mb-5">
                  <span className="text-[36px] font-black text-[#1a1a1a] leading-none">{plan.price}</span>
                  <span className="text-[13px] text-[#9ca3af] mb-1.5">one-time</span>
                </div>
                <button onClick={handleUpgrade} disabled={loading}
                  className="w-full py-3 bg-[#2563eb] text-white text-[13px] font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors disabled:opacity-50">
                  {loading ? 'Redirecting…' : `Upgrade to ${plan.name} →`}
                </button>
                <p className="mt-2.5 text-center text-[11px] text-[#9ca3af]">One-time payment. No subscription.</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </UpgradeModalContext.Provider>
  )
}

export function useUpgradeModalContext() {
  return useContext(UpgradeModalContext)
}
