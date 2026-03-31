import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  const { user_id, school_id } = await req.json()

  // Auth check
  const authHeader = req.headers.get('Authorization')
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '')
    const { data: { user } } = await supabase.auth.getUser(token)
    if (!user || user.id !== user_id) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders })
    }
  }

  // Fetch profile + school
  const [{ data: profile }, { data: school }] = await Promise.all([
    supabase.from('profiles').select('*, extracurriculars(*)').eq('id', user_id).single(),
    supabase.from('schools').select('*').eq('id', school_id).single(),
  ])

  if (!profile || !school) {
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: corsHeaders })
  }

  // Plan gate — free tier max 3 schools
  if (profile.plan === 'free') {
    const { count } = await supabase.from('fit_scores').select('*', { count: 'exact', head: true }).eq('user_id', user_id)
    if ((count ?? 0) >= 3) {
      return new Response(JSON.stringify({ upgrade_required: true, plan_needed: 'student' }), { status: 403, headers: corsHeaders })
    }
  }

  // Compute scores
  const sat = profile.test_type === 'SAT' ? profile.test_score : null
  const act = profile.test_type === 'ACT' ? profile.test_score : null
  const gpa = profile.gpa ?? 0
  const ecs = profile.extracurriculars?.filter((e: any) => !e.deleted_at) ?? []

  function clamp(v: number) { return Math.max(0, Math.min(100, Math.round(v))) }

  // Academic fit — GPA comparison
  const gpaMid = (school.gpa_lo + school.gpa_hi) / 2
  const gpaFit = clamp((1 - Math.abs(gpa - gpaMid) / 0.6) * 100)

  // Test score fit
  let testFit = 50
  if (sat && school.sat_lo && school.sat_hi) {
    const satMid = (school.sat_lo + school.sat_hi) / 2
    testFit = clamp((1 - Math.abs(sat - satMid) / 220) * 100)
  } else if (act && school.act_lo && school.act_hi) {
    const actMid = (school.act_lo + school.act_hi) / 2
    testFit = clamp((1 - Math.abs(act - actMid) / 6) * 100)
  }

  const academic_fit = clamp((gpaFit * 0.5 + testFit * 0.5))

  // Major availability — simplified (1.0 if major present in CDS, else 0.7)
  const major = profile.intended_major?.toLowerCase() ?? ''
  const cds = school.cds_data ?? {}
  const majorNames = (cds.majors ?? []).map((m: string) => m.toLowerCase())
  const major_availability = majorNames.some((m: string) => m.includes(major) || major.includes(m)) ? 85 : 65

  // Location fit — same state = boost
  const location_fit = profile.state === school.state ? 80 : 65

  // Financial fit — based on aid percentage
  const financial_fit = clamp((school.aid_pct ?? 50) * 1.2)

  // Profile completeness
  const fields = [profile.first_name, profile.last_name, profile.gpa, profile.test_score, profile.intended_major, profile.state, profile.graduation_year]
  const filled = fields.filter(Boolean).length
  const profile_completeness = clamp((filled / fields.length) * 100 + (ecs.length > 0 ? 10 : 0))

  // Weighted overall
  const overall_score = clamp(
    academic_fit * 0.35 +
    profile_completeness * 0.25 +
    major_availability * 0.133 +
    location_fit * 0.133 +
    financial_fit * 0.134
  )

  const category_scores = { academic: academic_fit, major: major_availability, location: location_fit, financial: financial_fit, profile: profile_completeness }

  await supabase.from('fit_scores').upsert({
    user_id, school_id, overall_score, category_scores, generated_at: new Date().toISOString(),
  }, { onConflict: 'user_id,school_id' })

  await supabase.from('activity_log').insert({
    user_id, event_type: 'fit_score_generated',
    metadata: { school_name: school.name, score: overall_score },
  })

  return new Response(JSON.stringify({ overall_score, category_scores }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
