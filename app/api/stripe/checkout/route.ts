import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { claimId, state } = await req.json()
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

    const COURT_FEES: Record<string, number> = { CA: 30, TX: 54, FL: 55 }
    const courtFee = COURT_FEES[state] || 50
    const swiftFee = 49

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'SwiftClaim Filing Service', description: `Small claims filing — ${state}` },
            unit_amount: swiftFee * 100,
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Court Filing Fee', description: `${state} small claims court fee` },
            unit_amount: courtFee * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?success=true&claim=${claimId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/start?cancelled=true`,
      metadata: { claimId, state },
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
