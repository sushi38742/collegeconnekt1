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

  const { user_id, school_id, essay_text } = await req.json()

  const { data: profile } = await supabase.from('profiles').select('*, plan').eq('id', user_id).single()

  // Plan gate
  if (!profile || profile.plan !== 'student_pro') {
    return new Response(JSON.stringify({ upgrade_required: true, plan_needed: 'student_pro', feature: 'Essay review' }), {
      status: 403, headers: corsHeaders,
    })
  }

  let schoolContext = ''
  if (school_id) {
    const { data: school } = await supabase.from('schools').select('name, cds_data').eq('id', school_id).single()
    if (school) schoolContext = `\nTarget school: ${school.name}`
  }

  const prompt = `You are an expert college admissions essay reviewer. Review this college application essay and provide structured feedback.

Student: ${profile.first_name} ${profile.last_name}, applying for ${profile.graduation_year}${schoolContext}

Essay:
"""
${essay_text}
"""

Return ONLY valid JSON with this exact structure:
{
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "improvements": ["improvement 1", "improvement 2", "improvement 3"],
  "suggestions": [
    { "quote": "exact quote from essay", "recommendation": "specific suggestion" },
    { "quote": "exact quote from essay", "recommendation": "specific suggestion" },
    { "quote": "exact quote from essay", "recommendation": "specific suggestion" }
  ]
}

Be specific, actionable, and encouraging. Quote actual lines from the essay in suggestions.`

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1500,
    messages: [{ role: 'user', content: prompt }],
  })

  let feedback: any = {}
  try {
    const text = message.content[0].type === 'text' ? message.content[0].text : ''
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) feedback = JSON.parse(jsonMatch[0])
  } catch { feedback = { strengths: [], improvements: [], suggestions: [] } }

  await supabase.from('essay_reviews').insert({
    user_id, school_id: school_id || null, essay_text, feedback,
  })

  await supabase.from('activity_log').insert({
    user_id, event_type: 'essay_reviewed',
    metadata: { school_id, word_count: essay_text.split(/\s+/).length },
  })

  return new Response(JSON.stringify(feedback), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
