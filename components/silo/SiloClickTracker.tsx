"use client"

import { useEffect } from "react"

const KIND_ATTRS = ["upward", "hub", "lateral", "child"] as const

/**
 * Counts clicks on the silo's internal links.
 *
 * Every module already stamps a data-silo-* attribute on its links, so this
 * listens once at the document instead of threading a handler through each
 * component - which also means a link added later is tracked without anyone
 * remembering to wire it up.
 *
 * Uses sendBeacon so the request survives the page navigating away, and stays
 * entirely passive: it never calls preventDefault, so a failure here can only
 * lose a statistic, never a click.
 */
export default function SiloClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null
      const link = target?.closest?.("a[data-silo-upward], a[data-silo-hub], a[data-silo-lateral], a[data-silo-child]")
      if (!link) return

      let kind: string | null = null
      let branch: string | null = null
      for (const attr of KIND_ATTRS) {
        const value = link.getAttribute(`data-silo-${attr}`)
        if (value === null) continue
        // "upward" carries the kind in its value: apex or parent
        kind = attr === "upward" ? value : attr
        if (attr === "hub" || attr === "lateral") branch = value || null
        break
      }
      if (!kind) return

      const payload = JSON.stringify({
        fromPage: window.location.pathname,
        toPage: link.getAttribute("href") ?? "",
        kind,
        branch,
      })

      // sendBeacon survives the navigation this click is about to cause
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/track-click", new Blob([payload], { type: "application/json" }))
      } else {
        fetch("/api/track-click", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {})
      }
    }

    document.addEventListener("click", onClick, { capture: true })
    return () => document.removeEventListener("click", onClick, { capture: true })
  }, [])

  return null
}
