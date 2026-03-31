import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.21.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const PRICE_IDS: Record<string, string> = {
  student:     Deno.env.get('STRIPE_STUDENT_PRICE_ID') ?? '',
  student_pro: Deno.env.get('STRIPE_PRO_PRICE_ID') ?? '',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, { apiVersion: '2024-04-10' })
  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

  const { user_id, plan } = await req.json()

  const priceId = PRICE_IDS[plan]
  if (!priceId) return new Response(JSON.stringify({ error: 'Invalid plan' }), { status: 400, headers: corsHeaders })

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user_id).single()
  const { data: authUser } = await supabase.auth.admin.getUserById(user_id)

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: authUser?.user?.email,
    metadata: { user_id, plan },
    success_url: `${Deno.env.get('SITE_URL')}/dashboard?upgraded=true`,
    cancel_url: `${Deno.env.get('SITE_URL')}/dashboard`,
  })

  return new Response(JSON.stringify({ url: session.url }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
