import { useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { useAuth } from '../../../context/AuthContext'

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 }
const PRIORITY_COLOR = { high: '#ef4444', medium: '#f59e0b', low: '#9ca3af' }

export default function ActionPlan({ data, reload }) {
  const { session } = useAuth()
  const [refreshing, setRefreshing] = useState(false)

  const pending = data.plan.filter(t => t.status === 'pending')
    .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])
  const completed = data.plan.filter(t => t.status === 'complete')

  async function toggleTask(task) {
    const newStatus = task.status === 'complete' ? 'pending' : 'complete'
    await supabase.from('action_plan').update({ status: newStatus }).eq('id', task.id)
    if (newStatus === 'complete') {
      await supabase.from('activity_log').insert({
        user_id: session.user.id,
        event_type: 'task_completed',
        metadata: { task_title: task.title },
      })
    }
    await reload()
  }

  async function refreshPlan() {
    setRefreshing(true)
    await supabase.functions.invoke('generate-action-plan', { body: { user_id: session.user.id } })
    await reload()
    setRefreshing(false)
  }

  const groups = {}
  pending.forEach(t => {
    const key = t.priority ?? 'medium'
    if (!groups[key]) groups[key] = []
    groups[key].push(t)
  })

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-[22px] font-black tracking-[-0.04em] text-[#1a1a1a]">Action Plan</h2>
          <p className="text-[13px] text-[#6b6b6b] mt-1">
            {pending.length} pending · {completed.length} completed
          </p>
        </div>
        <button
          onClick={refreshPlan} disabled={refreshing}
          className="flex items-center gap-1.5 px-3.5 py-2 border border-[#e5e7eb] rounded-lg text-[12px] font-semibold text-[#1a1a1a] hover:bg-[#f9fafb] transition-colors disabled:opacity-50"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={refreshing ? 'animate-spin' : ''}>
            <path d="M10 6A4 4 0 112 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            <path d="M10 2.5V6h-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {refreshing ? 'Refreshing…' : 'Refresh plan'}
        </button>
      </div>

      {pending.length === 0 && completed.length === 0 ? (
        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-10 text-center">
          <p className="text-[14px] text-[#9ca3af]">Your action plan is being generated. Check back in a moment.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {['high', 'medium', 'low'].map(priority => {
            const tasks = groups[priority]
            if (!tasks?.length) return null
            return (
              <div key={priority}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full" style={{ background: PRIORITY_COLOR[priority] }} />
                  <span className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-widest capitalize">{priority} priority</span>
                </div>
                <div className="space-y-2">
                  {tasks.map(task => (
                    <div key={task.id} className="bg-white border border-[#e5e7eb] rounded-xl p-4 flex items-start gap-3 hover:border-[#d1d5db] transition-colors">
                      <button
                        onClick={() => toggleTask(task)}
                        className="w-5 h-5 rounded border-2 border-[#d1d5db] flex-shrink-0 mt-0.5 hover:border-[#1a1a1a] transition-colors flex items-center justify-center"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-[#1a1a1a]">{task.title}</p>
                        {task.description && <p className="text-[12px] text-[#6b6b6b] mt-0.5 leading-relaxed">{task.description}</p>}
                        {task.why_it_matters && (
                          <p className="text-[11px] text-[#9ca3af] mt-1.5 italic">{task.why_it_matters}</p>
                        )}
                      </div>
                      {task.due_month && (
                        <span className="text-[10px] font-medium text-[#9ca3af] flex-shrink-0">{task.due_month}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}

          {completed.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-widest">Completed · {completed.length}</span>
              </div>
              <div className="space-y-2">
                {completed.map(task => (
                  <div key={task.id} className="bg-[#f9fafb] border border-[#f3f4f6] rounded-xl p-4 flex items-start gap-3">
                    <button
                      onClick={() => toggleTask(task)}
                      className="w-5 h-5 rounded bg-[#1a1a1a] border-2 border-[#1a1a1a] flex-shrink-0 mt-0.5 flex items-center justify-center"
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <p className="text-[12px] text-[#9ca3af] line-through">{task.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
