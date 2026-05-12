"use client"

import PricingCard from "./PricingCard"
import { usePricing } from "@/lib/usePricing"
import InternalLinks from "@/components/InternalLinks"
import Footer from "@/components/Footer"

export default function PricingContent() {
  const { plans, isPhilippines } = usePricing("INVOICE")

  const priceFor = (phpPrice: string, usdPrice: string) => {
    if (isPhilippines === null) return "..."
    return isPhilippines ? phpPrice : usdPrice
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

        {plans.map(plan => (
          <PricingCard
            key={plan.planKey}
            title={plan.name}
            price={`${priceFor(plan.phpPrice, plan.usdPrice)} /mo`}
            description={plan.desc}
            features={plan.features}
            plan={plan.planKey}
            product={plan.product}
            popular={plan.highlight}
            isPhilippines={isPhilippines ?? false}
          />
        ))}

      </div>

      <div className="text-center mt-16 text-slate-400 text-sm">
        Trusted by modern businesses worldwide
      </div>

      <InternalLinks cluster="invoice" currentPath="/invoice/pricing" limit={6} />
      <Footer />
    </div>
  )
}
