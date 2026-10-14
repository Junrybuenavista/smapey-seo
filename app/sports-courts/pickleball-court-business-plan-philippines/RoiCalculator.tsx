"use client"

import { useState } from "react"
import { INK, BLUE, AMBER, CREAM, MUTED, display } from "@/components/sports-courts/shared"

// Every box starts empty on purpose. A calculator that opens with someone
// else's numbers invites people to keep them, and a plan built on borrowed
// figures is the one a lender stops reading.

const NUM = /^[0-9,]*\.?[0-9]*$/
const n = (v: string) => (v.trim() === "" ? null : Number(v.replace(/,/g, "")))
const peso = (v: number) => `₱${Math.round(v).toLocaleString("en-PH")}`
const signed = (v: number) => (v < 0 ? `−${peso(-v)}` : peso(v))
const whole = (v: number) => Math.ceil(v).toLocaleString("en-PH")
const oneDp = (v: number) => (Math.ceil(v * 10) / 10).toLocaleString("en-PH", { maximumFractionDigits: 1 })

function Box({ id, label, hint, value, onChange, prefix }: {
  id: string; label: string; hint?: string; value: string; onChange: (v: string) => void; prefix?: string
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="block text-[11px] font-bold uppercase tracking-wide mb-1" style={{ color: MUTED }}>{label}</span>
      <span className="relative block">
        {prefix && <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold" style={{ color: MUTED }}>{prefix}</span>}
        <input
          id={id}
          value={value}
          inputMode="decimal"
          onChange={(e) => { if (NUM.test(e.target.value)) onChange(e.target.value) }}
          className={`w-full rounded-lg border-2 py-2 text-sm font-semibold outline-none tabular-nums ${prefix ? "pl-7 pr-3" : "px-3"}`}
          style={{ borderColor: INK, background: "#fff", color: INK }}
        />
      </span>
      {hint && <span className="block text-xs mt-1 leading-snug" style={{ color: MUTED }}>{hint}</span>}
    </label>
  )
}

function Result({ label, value, note, strong }: { label: string; value: string; note?: string; strong?: boolean }) {
  return (
    <div className="rounded-[14px] border-2 bg-white p-4" style={{ borderColor: INK, boxShadow: strong ? `4px 4px 0 ${AMBER}` : "none" }}>
      <p className="text-[11px] font-extrabold uppercase tracking-widest" style={{ color: BLUE }}>{label}</p>
      <p className="text-2xl font-extrabold tabular-nums mt-1" style={{ color: INK }}>{value}</p>
      {note && <p className="text-xs mt-1 leading-snug" style={{ color: MUTED }}>{note}</p>}
    </div>
  )
}

export default function RoiCalculator() {
  const [rate, setRate] = useState("")
  const [lights, setLights] = useState("")
  const [courts, setCourts] = useState("")
  const [hours, setHours] = useState("")
  const [days, setDays] = useState("")
  const [fixed, setFixed] = useState("")
  const [other, setOther] = useState("")
  const [expected, setExpected] = useState("")
  const [build, setBuild] = useState("")

  const r = n(rate)
  const perHour = r === null ? null : r - (n(lights) ?? 0)
  const fixedN = n(fixed)
  const daysN = n(days)
  const otherN = n(other) ?? 0
  const courtsN = n(courts)
  const hoursN = n(hours)
  // What the court rentals have to cover once other income has done its part.
  const toCover = fixedN === null ? null : Math.max(0, fixedN - otherN)
  const ready = perHour !== null && perHour > 0 && toCover !== null && daysN !== null && daysN > 0
  const perMonth = ready ? toCover! / perHour! : null
  const perDay = ready ? perMonth! / daysN! : null
  const perCourt = perDay !== null && courtsN !== null && courtsN > 0 ? perDay / courtsN : null
  const share = perCourt !== null && hoursN !== null && hoursN > 0 ? perCourt / hoursN : null
  const expectedN = n(expected)
  const profit = ready && expectedN !== null && courtsN !== null && courtsN > 0
    ? expectedN * courtsN * daysN! * perHour! + otherN - fixedN!
    : null
  const buildN = n(build)
  const payback = profit !== null && profit > 0 && buildN !== null && buildN > 0 ? buildN / profit : null
  const yearly = profit !== null && buildN !== null && buildN > 0 ? ((profit * 12) / buildN) * 100 : null

  return (
    <div className="my-8 rounded-[24px] border-2 p-5 sm:p-7" style={{ borderColor: INK, background: CREAM, boxShadow: `8px 8px 0 ${BLUE}`, ...display }}>
      <p className="text-xs font-extrabold uppercase tracking-widest mb-1" style={{ color: BLUE }}>Free calculator</p>
      <h3 className="text-xl font-extrabold mb-1" style={{ color: INK }}>Pickleball court ROI and break-even calculator</h3>
      <p className="text-sm mb-6" style={{ color: MUTED }}>Fill in your own figures. Nothing you type leaves this page.</p>

      <p className="text-xs font-extrabold uppercase tracking-widest mb-3" style={{ color: INK }}>Each court-hour</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <Box id="roi-rate" label="What a court-hour pays on average" prefix="₱" value={rate} onChange={setRate} hint="Across peak and off-peak, after discounts. Not just your peak rate." />
        <Box id="roi-lights" label="Lights and power per court-hour" prefix="₱" value={lights} onChange={setLights} hint="Averaged over day and night games. AEDO's default layout draws 0.9 kW a court: ₱12.60 an hour at ₱14 a kWh." />
      </div>

      <p className="text-xs font-extrabold uppercase tracking-widest mt-7 mb-3" style={{ color: INK }}>The venue</p>
      <div className="grid grid-cols-3 gap-3">
        <Box id="roi-courts" label="Courts" value={courts} onChange={setCourts} />
        <Box id="roi-hours" label="Hours open a day" value={hours} onChange={setHours} />
        <Box id="roi-days" label="Days open a month" value={days} onChange={setDays} />
      </div>

      <p className="text-xs font-extrabold uppercase tracking-widest mt-7 mb-3" style={{ color: INK }}>Each month</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <Box id="roi-fixed" label="Fixed costs a month" prefix="₱" value={fixed} onChange={setFixed} hint="Rent or lease, salaries, internet, permits ÷ 12, a resurfacing fund, loan repayment, and your own pay." />
        <Box id="roi-other" label="Other income a month (optional)" prefix="₱" value={other} onChange={setOther} hint="Open play fees, paddle rental, drinks, after what they cost you. Leave open-play hours out of the booked hours below." />
        <Box id="roi-expected" label="Hours each court is booked a day (optional)" value={expected} onChange={setExpected} hint="For the monthly result. Use a number you can defend, not your busiest Saturday." />
        <Box id="roi-build" label="What it costs to open (optional)" prefix="₱" value={build} onChange={setBuild} hint="Building works, lights, nets, permits and fees. For the payback and the yearly return." />
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mt-7" aria-live="polite">
        <Result
          label="Each court-hour leaves you"
          value={perHour === null ? "—" : signed(perHour)}
          note={perHour !== null && perHour <= 0 ? "Each hour loses money at these numbers. Raise the rate or cut the per-hour cost." : "After lights and power."}
        />
        <Result
          label="Break-even"
          value={perDay === null ? "—" : `${whole(perDay)} court-hours a day`}
          note={
            perHour !== null && perHour <= 0 ? "Out of reach while each hour loses money."
            : perMonth === null ? "Needs the rate, fixed costs and days open."
            : perMonth === 0 ? "Other income alone covers your fixed costs."
            : perCourt === null ? `${whole(perMonth)} court-hours a month to cover fixed costs.`
            : `About ${oneDp(perCourt)} hours per court a day${share !== null ? `, ${Math.round(share * 100)}% of your opening hours` : ""}.`
          }
          strong
        />
        {profit !== null && (
          <Result
            label={`Monthly result at ${expectedN!.toLocaleString("en-PH")} hours a court`}
            value={signed(profit)}
            note={hoursN !== null && expectedN! > hoursN ? "That's more hours than you're open. Check the numbers." : profit >= 0 ? "Before tax." : "A loss: below break-even."}
          />
        )}
        {yearly !== null && (
          <Result
            label="Payback and yearly return"
            value={payback === null ? "Never" : `${oneDp(payback)} months`}
            note={payback === null ? "At these numbers the courts don't earn back what they cost." : `${Math.round(yearly)}% of the cost back a year, before tax.`}
          />
        )}
      </div>
    </div>
  )
}
