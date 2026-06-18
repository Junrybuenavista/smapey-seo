"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { storeRef, decorateRegisterLinks } from "../lib/referral"

/**
 * Global referral catcher. Mounted once in the root layout (next to
 * PageTracker). On any page load with ?ref=CODE it validates the code against
 * the backend and, if live, persists it so signup CTAs can carry it through.
 *
 * Validation keeps junk/expired codes out of storage; an invalid code is simply
 * ignored. Renders nothing.
 */
export default function ReferralCapture() {
  const params = useSearchParams()
  const pathname = usePathname()

  // Capture & validate an incoming ?ref= code.
  useEffect(() => {
    const code = params.get("ref")?.trim()
    if (!code) return

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
  }, [params])

  // On every page, carry any stored ref onto register CTAs. Deferred so it runs
  // after the page's links have rendered.
  useEffect(() => {
    const id = window.setTimeout(decorateRegisterLinks, 0)
    return () => window.clearTimeout(id)
  }, [pathname])

  return null
}
