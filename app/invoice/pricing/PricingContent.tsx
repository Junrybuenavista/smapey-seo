"use client"

import PricingCard from "./PricingCard"

export default function PricingContent() {
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
      </div>

      {/* CARDS */}
      <div className="flex justify-center gap-6 flex-wrap">

        <PricingCard
          title="Free"
          price="$0 /month"
          description="For freelancers getting started"
          features={[
            "10 invoices / month",
            "Basic templates",
            "Manual tracking",
          ]}
          plan="FREE"
          product="INVOICE"
        />

        <PricingCard
          title="Pro"
          price="$15 /month"
          description="Best for growing businesses"
          features={[
            "Unlimited invoices",
            "Client management",
            "Payment tracking",
            "Analytics dashboard",
          ]}
          plan="PRO"
          product="INVOICE"
          popular
        />

        <PricingCard
          title="Enterprise"
          price="$25 /month"
          description="For teams & scaling companies"
          features={[
            "Everything in Pro",
            "Team access",
            "Advanced reports",
            "Priority support",
          ]}
          plan="ENTERPRISE"
          product="INVOICE"
        />

      </div>

      <div className="text-center mt-16 text-slate-400 text-sm">
        Trusted by modern businesses worldwide
      </div>

    </div>
  )
}