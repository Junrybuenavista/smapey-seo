"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function PageTracker() {
  const pathname = usePathname()

  useEffect(() => {
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
