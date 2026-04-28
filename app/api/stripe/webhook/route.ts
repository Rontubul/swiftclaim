import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
  const sig = req.headers.get('stripe-signature')!
  const body = await req.text()

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const { claimId } = session.metadata

    await supabase
      .from('claims')
      .update({ status: 'submitted', filing_fee_paid: true, filing_fee: (session.amount_total / 100) })
      .eq('id', claimId)

    await supabase
      .from('filing_events')
      .insert({ claim_id: claimId, event_type: 'payment_received', event_description: 'Payment received, claim submitted for filing.' })
  }

  return NextResponse.json({ received: true })
}
