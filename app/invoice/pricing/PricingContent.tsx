"use client"

import { useEffect, useState } from "react"
import PricingCard from "./PricingCard"

const PLANS = {
  FREE: {
    title: "Free",
    description: "For freelancers getting started",
    features: ["10 invoices / month", "2 team members", "Basic templates"],
    usdPrice: "$0",
    phpPrice: "₱0",
  },
  PRO: {
    title: "Pro",
    description: "Best for growing businesses",
    features: ["500 invoices / month", "5 team members", "Advanced templates"],
    usdPrice: "$5",
    phpPrice: "₱299",
    popular: true,
  },
  ENTERPRISE: {
    title: "Enterprise",
    description: "For teams & scaling companies",
    features: ["Unlimited invoices", "Unlimited team members", "Everything in Pro", "Priority support"],
    usdPrice: "$10",
    phpPrice: "₱599",
  },
}

export default function PricingContent() {
  const [isPhilippines, setIsPhilippines] = useState<boolean | null>(null)

  useEffect(() => {
    const tzFallback = Intl.DateTimeFormat().resolvedOptions().timeZone === "Asia/Manila"
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/billing/geo`)
      .then(r => r.json())
      .then(d => setIsPhilippines(d.isPhilippines ?? tzFallback))
      .catch(() => setIsPhilippines(tzFallback))
  }, [])

  const price = (plan: keyof typeof PLANS) => {
    if (isPhilippines === null) return "..."
    return isPhilippines ? PLANS[plan].phpPrice : PLANS[plan].usdPrice
  }

  return (
    <div className="min-h-screen bg-slate-50 py-24 px-6">

      {/* HERO */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl font-semibold text-slate-900 mb-3">
          Simple Pricing
        </h1>
        <p className="text-slate-500">
          Clean invoicing. No hidden fees.
        </p>

        {/* currency badge */}
        {isPhilippines !== null && (
          <div className="inline-flex items-center gap-1.5 mt-4 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs text-slate-500 shadow-sm">
            <span>{isPhilippines ? "🇵🇭" : "🌍"}</span>
            <span>Showing prices in <span className="font-semibold text-slate-700">{isPhilippines ? "Philippine Peso (₱)" : "US Dollar ($)"}</span></span>
          </div>
        )}
      </div>

      {/* CARDS */}
      <div className="flex justify-center gap-6 flex-wrap">

        {(Object.keys(PLANS) as (keyof typeof PLANS)[]).map(key => {
          const plan = PLANS[key]
          return (
            <PricingCard
              key={key}
              title={plan.title}
              price={`${price(key)} /mo`}
              description={plan.description}
              features={plan.features}
              plan={key}
              product="INVOICE"
              popular={"popular" in plan ? plan.popular : false}
              isPhilippines={isPhilippines ?? false}
            />
          )
        })}

      </div>

      <div className="text-center mt-16 text-slate-400 text-sm">
        Trusted by modern businesses worldwide
      </div>

    </div>
  )
}
