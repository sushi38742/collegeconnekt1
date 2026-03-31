import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Anthropic from 'https://esm.sh/@anthropic-ai/sdk@0.24.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  const anthropic = new Anthropic({ apiKey: Deno.env.get('ANTHROPIC_API_KEY')! })

  const { user_id, school_ids } = await req.json()

  const { data: profile } = await supabase.from('profiles').select('plan, gpa, test_type, test_score, intended_major').eq('id', user_id).single()
  if (!profile || profile.plan === 'free') {
    return new Response(JSON.stringify({ upgrade_required: true, plan_needed: 'student' }), { status: 403, headers: corsHeaders })
  }

  // Check cache (7 days)
  const sortedIds = [...school_ids].sort()
  const { data: cached } = await supabase.from('comparisons')
    .select('*').eq('user_id', user_id)
    .contains('school_ids', sortedIds)
    .gte('generated_at', new Date(Date.now() - 7 * 86400000).toISOString())
    .limit(1).single()

  if (cached) return new Response(JSON.stringify({ result_text: cached.result_text }), { headers: corsHeaders })

  // Fetch schools + fit scores
  const { data: schools } = await supabase.from('schools').select('*').in('id', school_ids)
  const { data: fits } = await supabase.from('fit_scores').select('*').eq('user_id', user_id).in('school_id', school_ids)

  const schoolData = schools?.map(s => {
    const fit = fits?.find(f => f.school_id === s.id)
    return { ...s, fit_score: fit?.overall_score }
  })

  const prompt = `Compare these colleges for a student with GPA ${profile.gpa}, ${profile.test_type} ${profile.test_score}, interested in ${profile.intended_major}.

Schools:
${schoolData?.map(s => `- ${s.name}: ${s.acceptance_rate}% accept, GPA ${s.gpa_lo}–${s.gpa_hi}, fit score ${s.fit_score ?? 'N/A'}`).join('\n')}

Write a 2-3 paragraph comparison paragraph covering: fit differences, program strengths, selectivity tradeoffs, and a recommendation. Be direct and specific.`

  const message = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 600,
    messages: [{ role: 'user', content: prompt }],
  })

  const result_text = message.content[0].type === 'text' ? message.content[0].text : ''

  await supabase.from('comparisons').insert({ user_id, school_ids: sortedIds, result_text })

  return new Response(JSON.stringify({ result_text }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
