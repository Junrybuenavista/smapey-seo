"use client"

import { useEffect } from "react"

export default function PageTracker() {
  useEffect(() => {
    const path = window.location.pathname
    const page = path === "/" ? "home" : path.replace(/^\//, "").replace(/\/$/, "")

    fetch("/api/track-visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page,
        referrer: document.referrer || undefined,
        userAgent: navigator.userAgent,
      }),
    }).catch(() => {})
  }, [])

  return null
}
