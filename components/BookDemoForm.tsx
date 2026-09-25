"use client"

import { useEffect, useRef, useState } from "react"
import { CalendarCheck, Loader2, CheckCircle2, ChevronRight } from "lucide-react"

const PRODUCT_LABELS: Record<string, string> = {
  RESTAURANT:     "Food Ordering Manager",
  GYM:            "Gym Management",
  SALON:          "Salon Manager",
  LAUNDRY:        "Laundry Management",
  AIRBNB:         "Airbnb / Short-term Rental",
  BOOKING:        "Booking & Appointments",
  CAR_RENTAL:     "Car Rental",
  LENDING:        "Lending Manager",
  STORE:          "Store Manager",
  CLINIC:         "Clinic Manager",
  VET_CLINIC:     "Vet Clinic Manager",
  BOARDING_HOUSE: "Boarding House Manager",
  CATERING:       "Catering Manager",
  WATER_REFILLING:"Water Refilling",
  SCHOOL_DESK:    "School Desk",
  MASSAGE:        "Massage Manager",
  ESSAY:          "Essay Feedback",
  INVOICE:        "Invoice Manager",
}

// The one Calendly event every product page books into: 30 minutes on Google Meet.
const CALENDLY_URL    = "https://calendly.com/buenavistajunry/smapey-demo"
const CALENDLY_SCRIPT = "https://assets.calendly.com/assets/external/widget.js"

// ── Layered Pop tokens ──
const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const MUTED = "#54514c"
const popDisplay = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget(options: {
        url: string
        parentElement: HTMLElement
        prefill?: { name?: string; email?: string }
        utm?: { utmSource?: string; utmMedium?: string; utmCampaign?: string }
        resize?: boolean
      }): void
    }
  }
}

// Fetched only when a visitor reaches the calendar, so the product pages
// themselves never pay for Calendly's script.
function loadCalendly(): Promise<void> {
  if (window.Calendly) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${CALENDLY_SCRIPT}"]`)
    const script = existing ?? document.createElement("script")
    script.addEventListener("load", () => resolve())
    script.addEventListener("error", () => reject(new Error("Calendly failed to load")))
    if (!existing) {
      script.src = CALENDLY_SCRIPT
      script.async = true
      document.body.appendChild(script)
    }
  })
}

// details → schedule → booked, or → later if no time suits them
type Step = "details" | "schedule" | "booked" | "later"

const SUBTITLES: Record<Step, string> = {
  details:  "Leave your details, then pick a time for a free 30-minute walkthrough on Google Meet. No pressure, no commitment.",
  schedule: "Pick a time that suits you. It's a 30-minute call on Google Meet, shown in your own time zone.",
  booked:   "We'll walk you through the product personally, no pressure, no commitment.",
  later:    "We'll walk you through the product personally, no pressure, no commitment.",
}

export default function BookDemoForm({ product }: { product: string }) {
  const [name, setName]       = useState("")
  const [email, setEmail]     = useState("")
  const [phone, setPhone]     = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState("")
  const [step, setStep]       = useState<Step>("details")
  const [bookingId, setBookingId]     = useState<string | null>(null)
  const [scheduledAt, setScheduledAt] = useState<string | null>(null)
  const [calendarFailed, setCalendarFailed] = useState(false)
  const calendarRef = useRef<HTMLDivElement>(null)

  const productLabel = PRODUCT_LABELS[product] || product

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/demo-bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, product }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Something went wrong")
      // Saved before the calendar opens, so the lead is kept even if they never pick a time.
      setBookingId(data.booking.id)
      setStep("schedule")
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "Failed to submit. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Mount Calendly's calendar, already filled in with what they just typed.
  useEffect(() => {
    if (step !== "schedule") return
    let cancelled = false
    loadCalendly()
      .then(() => {
        if (cancelled || !calendarRef.current || !window.Calendly) return
        calendarRef.current.innerHTML = ""
        // Name and email ride on the booking link too: the widget's `prefill` only
        // posts them to the iframe once, just after it loads, and Calendly's page
        // can miss that; link parameters are always read. encodeURIComponent, not
        // URLSearchParams: the widget re-reads these with decodeURIComponent,
        // which would leave a "+" for every space in the name.
        const query = Object.entries({ hide_gdpr_banner: "1", hide_event_type_details: "1", name, email })
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
          .join("&")
        window.Calendly.initInlineWidget({
          url: `${CALENDLY_URL}?${query}`,
          parentElement: calendarRef.current,
          prefill: { name, email },
          utm: { utmSource: "smapey.com", utmMedium: "demo-form", utmCampaign: product },
          // Calendly reports each step's height and the widget sizes our box to it,
          // so the calendar never scrolls inside the card.
          resize: true,
        })
      })
      .catch(() => {
        if (!cancelled) setCalendarFailed(true)
      })
    return () => { cancelled = true }
  }, [step, name, email, product])

  // Calendly tells the page when a time is booked. The backend checks the
  // booking with Calendly itself; if this report never arrives, its sync
  // still links the booking by email.
  useEffect(() => {
    if (step !== "schedule" || !bookingId) return
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== "https://calendly.com" || e.data?.event !== "calendly.event_scheduled") return
      setStep("booked")
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/demo-bookings/${bookingId}/scheduled`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inviteeUri: e.data.payload?.invitee?.uri }),
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => { if (data?.scheduledAt) setScheduledAt(data.scheduledAt) })
        .catch(() => {})
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [step, bookingId])

  const popInput = "w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition"
  const popInputStyle = { borderColor: INK, color: INK, background: "#fff" } as React.CSSProperties

  const fields: { label: string; type: string; ph: string; val: string; set: (v: string) => void }[] = [
    { label: "Full Name", type: "text", ph: "Juan dela Cruz", val: name, set: setName },
    { label: "Email Address", type: "email", ph: "you@example.com", val: email, set: setEmail },
    { label: "Phone Number", type: "tel", ph: "+63 912 345 6789", val: phone, set: setPhone },
  ]

  return (
    <section
      id="book-demo"
      // Calendly needs 320px; on a phone the usual gutter leaves the card less than that
      className={`relative py-24 overflow-hidden ${step === "schedule" ? "px-3 sm:px-6" : "px-6"}`}
      style={{ background: CREAM, fontFamily: popDisplay.fontFamily }}
    >
      {/* playful layered-bar accents */}
      <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden>
        <div className="absolute rounded-[22px] border-2" style={{ top: "12%", left: "-70px", width: 260, height: 76, background: AMBER, borderColor: INK, transform: "rotate(-9deg)" }} />
        <div className="absolute rounded-[22px] border-2" style={{ bottom: "12%", right: "-80px", width: 280, height: 80, background: BLUE, borderColor: INK, transform: "rotate(8deg)", boxShadow: "5px 5px 0 rgba(22,22,22,.12)" }} />
      </div>

      <div className={`relative mx-auto ${step === "schedule" ? "max-w-3xl" : "max-w-xl"}`}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full bg-white border-2 mb-5" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
            <CalendarCheck className="w-3.5 h-3.5" style={{ color: BLUE }} />
            Book a Free Demo
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: INK }}>
            See {productLabel} in action
          </h2>
          <p className="text-base mt-3 leading-relaxed" style={{ color: MUTED }}>
            {SUBTITLES[step]}
          </p>
        </div>

        {/* Card */}
        <div
          className={`rounded-[24px] border-2 ${step === "schedule" ? "p-2 sm:p-3" : "p-8"}`}
          style={{ background: "#fff", borderColor: INK, boxShadow: `10px 10px 0 ${AMBER}` }}
        >
          {step === "booked" || step === "later" ? (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center" style={{ background: "#e9f9f0", borderColor: INK }}>
                <CheckCircle2 className="w-8 h-8" style={{ color: "#0d9f6e" }} />
              </div>
              {step === "booked" ? (
                <>
                  <p className="text-xl font-extrabold" style={{ color: INK }}>You&apos;re booked!</p>
                  {scheduledAt && (
                    <p className="text-base font-bold" style={{ color: INK }}>
                      {new Date(scheduledAt).toLocaleString(undefined, { weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit" })}
                    </p>
                  )}
                  <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                    Your Google Meet link is on its way to{" "}
                    <span className="font-bold" style={{ color: INK }}>{email}</span>. See you there!
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xl font-extrabold" style={{ color: INK }}>You&apos;re all set!</p>
                  <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                    We&apos;ll reach out to you shortly to schedule your demo for{" "}
                    <span className="font-bold" style={{ color: INK }}>{productLabel}</span>.
                  </p>
                </>
              )}
            </div>
          ) : step === "schedule" ? (
            calendarFailed ? (
              <div className="flex flex-col items-center gap-3 py-10 px-6 text-center">
                <p className="text-lg font-extrabold" style={{ color: INK }}>We have your details.</p>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                  The calendar didn&apos;t load here, so we&apos;ll reach out to schedule your demo, or you can{" "}
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="font-bold underline" style={{ color: BLUE }}>
                    pick a time on Calendly
                  </a>.
                </p>
              </div>
            ) : (
              <>
                <div className="relative rounded-[18px] overflow-hidden" style={{ minWidth: 320 }}>
                  {/* Sits under the calendar until Calendly's iframe covers it */}
                  <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
                    <Loader2 className="w-6 h-6 animate-spin" style={{ color: MUTED }} />
                  </div>
                  {/* Calendly owns this node: it draws the iframe here and resets the
                      height at every step. React never renders children into it.
                      The floor matters while Calendly loads: it reports 26px then. */}
                  <div ref={calendarRef} className="relative scroll-mt-24" style={{ height: 700, minHeight: 700 }} aria-label="Pick a time for your demo" />
                </div>
                <p className="text-center text-xs py-3" style={{ color: MUTED }}>
                  No time that works?{" "}
                  <button type="button" onClick={() => setStep("later")} className="font-bold underline" style={{ color: INK }}>
                    We&apos;ll contact you instead
                  </button>
                </p>
              </>
            )
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {fields.map((f) => (
                <div key={f.label} className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold" style={{ color: INK }}>{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.ph}
                    value={f.val}
                    onChange={(e) => f.set(e.target.value)}
                    required
                    className={popInput}
                    style={popInputStyle}
                  />
                </div>
              ))}

              {error && (
                <p className="text-sm font-semibold rounded-xl px-4 py-2.5 border-2" style={{ color: "#c01a3e", background: "#fdecec", borderColor: "#e11d48" }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-1 disabled:opacity-60 font-bold py-3.5 rounded-full border-2 transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm"
                style={{ ...popDisplay, background: AMBER, color: INK, borderColor: INK, boxShadow: `4px 4px 0 ${INK}` }}
              >
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : <>Next: Pick a Time <ChevronRight className="w-4 h-4" /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
