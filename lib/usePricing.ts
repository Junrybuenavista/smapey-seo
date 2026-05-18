"use client"

import { useEffect, useState } from "react"

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
}

const formatUsd = (n: number) => n === 0 ? "$0" : `$${n}`
const formatPhp = (n: number | null) => n === null || n === 0 ? "₱0" : `₱${n.toLocaleString("en-PH")}`

const toLegacy = (p: ApiPlan): Plan => ({
  name:      p.displayName ?? p.name.charAt(0) + p.name.slice(1).toLowerCase(),
  phpPrice:  formatPhp(p.paymongoPrice),
  usdPrice:  formatUsd(p.price),
  period:    "/mo",
  planKey:   p.name,
  product:   p.product,
  desc:      p.description ?? "",
  features:  p.features ?? [],
  cta:       p.ctaLabel ?? (p.name === "FREE" ? "Get started free" : `Start ${p.displayName ?? p.name}`),
  highlight: p.highlighted,
})

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
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    const lang = (typeof navigator !== "undefined" ? navigator.language : "").toLowerCase()
    const localPH =
      tz === "Asia/Manila" ||
      lang.includes("-ph") ||
      lang.startsWith("fil")

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/billing/geo`)
      .then(r => r.json())
      .then(d => setIsPhilippines(Boolean(d.isPhilippines) || localPH))
      .catch(() => setIsPhilippines(localPH))
  }, [])

  return { plans, loading, isPhilippines }
}
