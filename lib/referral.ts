// Client-side referral persistence.
//
// When a visitor lands with ?ref=CODE we validate it against the backend and
// store it here; CTAs then carry it onto the app.smapey.com register URL so the
// signup request can replay it as `referralCode` (backend Phase 2 attribution).

const STORAGE_KEY = "smapey_ref"
const TTL_DAYS = 60

export interface StoredRef {
  code: string
  referrerName: string | null
  ts: number // epoch ms when captured
}

/** Persist a validated referral. Last-click wins (overwrites any prior code). */
export const storeRef = (code: string, referrerName: string | null) => {
  if (typeof window === "undefined") return
  try {
    const payload: StoredRef = { code, referrerName, ts: Date.now() }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    /* private mode / storage disabled — ignore */
  }
}

/** Read the stored referral, or null if absent or expired past the TTL. */
export const getStoredRef = (): StoredRef | null => {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredRef
    const ageDays = (Date.now() - parsed.ts) / (1000 * 60 * 60 * 24)
    if (!parsed.code || ageDays > TTL_DAYS) {
      window.localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return parsed
  } catch {
    return null
  }
}

/** Append the stored ref code to a URL, if any. Safe for absolute URLs. */
export const withRef = (url: string): string => {
  const ref = getStoredRef()
  if (!ref) return url
  const sep = url.includes("?") ? "&" : "?"
  return `${url}${sep}ref=${encodeURIComponent(ref.code)}`
}

/**
 * Decorate every register link on the page with the stored ref code, so a
 * referred visitor carries attribution to signup no matter which landing page's
 * CTA they click — without editing each page. Idempotent.
 */
export const decorateRegisterLinks = () => {
  if (typeof document === "undefined") return
  const ref = getStoredRef()
  if (!ref) return
  const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href*="/register"]')
  anchors.forEach((a) => {
    if (a.href.includes("ref=")) return
    a.href = withRef(a.href)
  })
}
