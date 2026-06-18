"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { storeRef, decorateRegisterLinks } from "../lib/referral"

/**
 * Global referral catcher. Mounted once in the root layout (next to
 * PageTracker). On any page load with ?ref=CODE it validates the code against
 * the backend and, if live, persists it so signup CTAs can carry it through.
 *
 * Reads the URL via window.location in an effect rather than useSearchParams,
 * so it never opts the layout into dynamic rendering or affects SSR/hydration
 * of the (statically rendered) marketing pages. Renders nothing.
 */
export default function ReferralCapture() {
  const pathname = usePathname()

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("ref")?.trim()
    if (code) {
      const base = process.env.NEXT_PUBLIC_API_URL ?? ""
      fetch(`${base}/api/affiliate/track?ref=${encodeURIComponent(code)}`)
        .then((r) => r.json())
        .then((data) => {
          if (data?.valid) {
            storeRef(data.code, data.referrerName ?? null)
            decorateRegisterLinks()
          }
        })
        .catch(() => {})
    }
    // Carry any already-stored ref onto register CTAs once the page has rendered.
    const id = window.setTimeout(decorateRegisterLinks, 0)
    return () => window.clearTimeout(id)
  }, [pathname])

  return null
}
