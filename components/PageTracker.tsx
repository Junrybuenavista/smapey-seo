"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function PageTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // An embedded render is not a visit. The Site Pages screen in the app
    // (app.smapey.com/admin/site-pages) renders every page of this site in a
    // thumbnail iframe, and counting those would put hundreds of fake visits
    // into SEO Analytics. Same rule guards the GA config in app/layout.tsx.
    if (window.top !== window.self) return

    const page = pathname === "/" ? "home" : pathname.replace(/^\//, "").replace(/\/$/, "")

    fetch("/api/track-visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page,
        referrer: document.referrer || undefined,
        userAgent: navigator.userAgent,
      }),
    }).catch(() => {})
  }, [pathname])

  return null
}
