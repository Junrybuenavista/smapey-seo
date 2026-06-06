"use client"

import { useEffect } from "react"

export default function PageTracker({ page }: { page: string }) {
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/seo-analytics/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page,
        referrer: document.referrer || undefined,
        userAgent: navigator.userAgent,
      }),
    }).catch(() => {})
  }, [page])

  return null
}
