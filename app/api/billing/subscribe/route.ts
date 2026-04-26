import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { plan, product, name, email } = body

    if (!plan || !product) {
      return NextResponse.json(
        { error: "Missing plan or product" },
        { status: 400 }
      )
    }

    const authHeader = req.headers.get("authorization")

    const BASE_URL = process.env.NEXT_PUBLIC_API_URL

    if (!BASE_URL) {
      throw new Error("API URL not configured")
    }

    const endpoint = authHeader
  ? "/api/billing/subscribe/paypal"
  : "/api/billing/newaccount/paypal"

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      body: JSON.stringify({
        plan,
        product,
        ...(name && email ? { name, email } : {}),
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(text)
    }

    const data = await res.json()

    const checkoutUrl =
      data.checkoutUrl || data.approveUrl

    if (!checkoutUrl) {
      throw new Error("No checkout URL returned")
    }

    return NextResponse.json({
      success: true,
      checkoutUrl,
    })

  } catch (error: any) {
    console.error("Billing error:", error)

    return NextResponse.json(
      {
        error: "Checkout failed",
        message: error.message,
      },
      { status: 500 }
    )
  }
}