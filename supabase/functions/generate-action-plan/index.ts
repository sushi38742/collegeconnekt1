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

  const { user_id } = await req.json()

  const { data: profile } = await supabase.from('profiles')
    .select('*, extracurriculars(*), saved_schools(*, school:schools(*))')
    .eq('id', user_id).single()

  if (!profile) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: corsHeaders })

  const maxTasks = profile.plan === 'free' ? 5 : 999
  const schools = profile.saved_schools ?? []
  const ecs = (profile.extracurriculars ?? []).filter((e: any) => !e.deleted_at)

  const prompt = `You are a college admissions counselor. Generate a personalized action plan for this student.

Student profile:
- Name: ${profile.first_name} ${profile.last_name}
- Graduation year: ${profile.graduation_year}
- GPA: ${profile.gpa}
- ${profile.test_type}: ${profile.test_score}
- Intended major: ${profile.intended_major}
- State: ${profile.state}
- Extracurriculars: ${ecs.map((e: any) => `${e.title} (${e.category}, ${e.years}yr${e.is_leadership ? ', leader' : ''})`).join('; ') || 'None listed'}
- Applying to: ${schools.map((s: any) => s.school?.name).join(', ') || 'No schools added yet'}

Generate exactly ${Math.min(maxTasks, 12)} action items. Return ONLY a valid JSON array, no commentary.
Each item must have: title (string), description (string), why_it_matters (string), priority ("high"|"medium"|"low"), due_month (string like "November 2025"), school_id (null for general tasks, or the school name as a string — I'll map it).

Focus on: essays, test prep, recommendation letters, application deadlines, financial aid, and school-specific requirements.`

  const message = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }],
  })

  let tasks: any[] = []
  try {
    const text = message.content[0].type === 'text' ? message.content[0].text : ''
    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (jsonMatch) tasks = JSON.parse(jsonMatch[0])
  } catch { tasks = [] }

  // Map school names to IDs
  const schoolNameToId: Record<string, string> = {}
  schools.forEach((s: any) => { if (s.school?.name) schoolNameToId[s.school.name] = s.school_id })

  // Delete existing pending tasks
  await supabase.from('action_plan').delete().eq('user_id', user_id).eq('status', 'pending')

  // Insert new tasks
  if (tasks.length > 0) {
    const rows = tasks.map((t: any) => ({
      user_id,
      school_id: t.school_id ? (schoolNameToId[t.school_id] ?? null) : null,
      title: t.title,
      description: t.description,
      why_it_matters: t.why_it_matters,
      priority: t.priority ?? 'medium',
      due_month: t.due_month,
      status: 'pending',
    }))
    await supabase.from('action_plan').insert(rows)
  }

  await supabase.from('activity_log').insert({ user_id, event_type: 'action_plan_generated', metadata: { task_count: tasks.length } })

  return new Response(JSON.stringify({ tasks_created: tasks.length }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
