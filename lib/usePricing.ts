"use client"

import { useEffect, useState } from "react"

export interface TrialInfo {
  days: number
  tier: "PRO" | "ENTERPRISE"
}

export interface Plan {
  name:      string
  phpPrice:  string
  usdPrice:  string
  period:    string
  planKey:   "FREE" | "PRO" | "ENTERPRISE"
  product:   string
  desc:      string
  features:  string[]
  cta:       string
  highlight: boolean
  limits:    Record<string, any> | null
  /** Present only when this FREE plan is configured as a time-limited trial. */
  trial:     TrialInfo | null
}

interface ApiTrialConfig {
  enabled?: boolean
  days?:    number
  tier?:    "PRO" | "ENTERPRISE"
}

interface ApiPlan {
  id:            string
  product:       string
  name:          "FREE" | "PRO" | "ENTERPRISE"
  price:         number
  paymongoPrice: number | null
  displayName:   string | null
  description:   string | null
  features:      string[] | null
  ctaLabel:      string | null
  highlighted:   boolean
  limits:        Record<string, any> | null
  trialConfig:   ApiTrialConfig | null
}

const formatUsd = (n: number) => n === 0 ? "$0" : `$${n}`
const formatPhp = (n: number | null) => n === null || n === 0 ? "₱0" : `₱${n.toLocaleString("en-PH")}`

const parseTrial = (p: ApiPlan): TrialInfo | null => {
  if (p.name !== "FREE") return null
  const c = p.trialConfig
  if (!c?.enabled || !c.days || c.days <= 0) return null
  return { days: Math.floor(c.days), tier: c.tier === "ENTERPRISE" ? "ENTERPRISE" : "PRO" }
}

const toLegacy = (p: ApiPlan): Plan => {
  const trial = parseTrial(p)
  const tierLabel = trial?.tier === "ENTERPRISE" ? "Enterprise" : "Pro"

  return {
    // When the FREE plan is a trial, frame the whole card as a trial so every
    // product's existing pricing card reflects it without per-page edits.
    name:      trial ? (p.displayName ?? "Free trial") : (p.displayName ?? p.name.charAt(0) + p.name.slice(1).toLowerCase()),
    phpPrice:  formatPhp(p.paymongoPrice),
    usdPrice:  formatUsd(p.price),
    period:    trial ? `for ${trial.days} days` : "/mo",
    planKey:   p.name,
    product:   p.product,
    desc:      trial ? `Full ${tierLabel} access for ${trial.days} days, then upgrade to keep using it` : (p.description ?? ""),
    features:  p.features ?? [],
    cta:       trial ? `Start ${trial.days}-day free trial` : (p.ctaLabel ?? (p.name === "FREE" ? "Get started free" : `Start ${p.displayName ?? p.name}`)),
    highlight: p.highlighted,
    limits:    p.limits ?? null,
    trial,
  }
}

/**
 * Fetches pricing for a single product from the API and exposes it
 * in the legacy shape used by the SEO product pages.
 */
export function usePricing(product: string) {
  const [plans, setPlans]                 = useState<Plan[]>([])
  const [loading, setLoading]             = useState(true)
  const [isPhilippines, setIsPhilippines] = useState<boolean | null>(null)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pricing/${product}`)
      .then(r => r.json())
      .then((rows: ApiPlan[]) => setPlans(Array.isArray(rows) ? rows.map(toLegacy) : []))
      .catch(() => setPlans([]))
      .finally(() => setLoading(false))
  }, [product])

  useEffect(() => {
    const override = typeof localStorage !== "undefined" ? localStorage.getItem("smapey_currency") : null
    if (override === "PHP") { setIsPhilippines(true); return }
    if (override === "USD") { setIsPhilippines(false); return }

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""
    const lang = (typeof navigator !== "undefined" ? navigator.language : "").toLowerCase()
    const offsetHours = -new Date().getTimezoneOffset() / 60

    const localPH =
      tz === "Asia/Manila" ||
      lang.includes("-ph") ||
      lang.startsWith("fil") ||
      (offsetHours === 8 && tz.startsWith("Asia/"))

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/billing/geo`)
      .then(r => r.json())
      .then(d => setIsPhilippines(Boolean(d.isPhilippines) || localPH))
      .catch(() => setIsPhilippines(localPH))
  }, [])

  return { plans, loading, isPhilippines }
}
