"use client"

import { useState } from "react"
import { INK, BLUE, AMBER, CREAM, MUTED, display } from "@/components/car-wash/shared"

// Every box starts empty on purpose. A calculator that opens with someone
// else's numbers invites people to keep them, and a plan built on borrowed
// figures is the one a lender stops reading.

const NUM = /^[0-9,]*\.?[0-9]*$/
const n = (v: string) => (v.trim() === "" ? null : Number(v.replace(/,/g, "")))
const peso = (v: number) => `₱${Math.round(v).toLocaleString("en-PH")}`
const whole = (v: number) => Math.ceil(v).toLocaleString("en-PH")

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

export default function BreakEvenCalculator() {
  const [price, setPrice] = useState("")
  const [shareMode, setShareMode] = useState<"pct" | "fixed">("pct")
  const [share, setShare] = useState("")
  const [supplies, setSupplies] = useState("")
  const [utilities, setUtilities] = useState("")
  const [fixed, setFixed] = useState("")
  const [days, setDays] = useState("")
  const [expected, setExpected] = useState("")
  const [bays, setBays] = useState("")
  const [hours, setHours] = useState("")
  const [perBay, setPerBay] = useState("")

  const p = n(price)
  const shareN = n(share) ?? 0
  const crew = p === null ? null : shareMode === "pct" ? (p * shareN) / 100 : shareN
  const perCar = p === null || crew === null ? null : p - crew - (n(supplies) ?? 0) - (n(utilities) ?? 0)
  const fixedN = n(fixed)
  const daysN = n(days)
  const ready = perCar !== null && perCar > 0 && fixedN !== null && daysN !== null && daysN > 0
  const perMonth = ready ? fixedN! / perCar! : null
  const perDay = ready ? perMonth! / daysN! : null
  const expectedN = n(expected)
  const profit = ready && expectedN !== null ? expectedN * daysN! * perCar! - fixedN! : null
  const capacity = n(bays) !== null && n(hours) !== null && n(perBay) !== null ? n(bays)! * n(hours)! * n(perBay)! : null

  return (
    <div className="my-8 rounded-[24px] border-2 p-5 sm:p-7" style={{ borderColor: INK, background: CREAM, boxShadow: `8px 8px 0 ${BLUE}`, ...display }}>
      <p className="text-xs font-extrabold uppercase tracking-widest mb-1" style={{ color: BLUE }}>Free calculator</p>
      <h3 className="text-xl font-extrabold mb-1" style={{ color: INK }}>Car wash break-even calculator</h3>
      <p className="text-sm mb-6" style={{ color: MUTED }}>Fill in your own figures. Nothing you type leaves this page.</p>

      <p className="text-xs font-extrabold uppercase tracking-widest mb-3" style={{ color: INK }}>Each car</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <Box id="be-price" label="What an average car pays" prefix="₱" value={price} onChange={setPrice} hint="Across your mix of sizes and add-ons, not just the cheapest wash." />
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-wide mb-1" style={{ color: MUTED }}>Washer&apos;s share of each car</span>
          <div className="flex gap-2 mb-2">
            {([["pct", "% of the car"], ["fixed", "₱ per car"]] as const).map(([k, label]) => (
              <button key={k} type="button" onClick={() => setShareMode(k)} aria-pressed={shareMode === k} className="px-3 py-1 rounded-full text-xs font-bold border-2" style={shareMode === k ? { background: INK, color: "#fff", borderColor: INK } : { background: "#fff", color: INK, borderColor: INK }}>{label}</button>
            ))}
          </div>
          <Box id="be-share" label={shareMode === "pct" ? "Share, %" : "Share per car"} prefix={shareMode === "fixed" ? "₱" : undefined} value={share} onChange={setShare} hint="Leave empty if the crew is on a daily rate; put that in fixed costs." />
        </div>
        <Box id="be-supplies" label="Supplies per car" prefix="₱" value={supplies} onChange={setSupplies} hint="Shampoo, wax, tire black, towels: price a case and divide by the cars it washes." />
        <Box id="be-utilities" label="Water and electricity per car" prefix="₱" value={utilities} onChange={setUtilities} hint="Water: about 57 litres a car by hand (US EPA) at your rate per cubic metre." />
      </div>

      <p className="text-xs font-extrabold uppercase tracking-widest mt-7 mb-3" style={{ color: INK }}>Each month</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <Box id="be-fixed" label="Fixed costs a month" prefix="₱" value={fixed} onChange={setFixed} hint="Rent, salaries not paid per car, permits ÷ 12, loan repayment, and your own pay." />
        <Box id="be-days" label="Days open a month" value={days} onChange={setDays} />
        <Box id="be-expected" label="Cars you expect a day (optional)" value={expected} onChange={setExpected} hint="For the monthly profit. Use a number you can defend, not your best day." />
      </div>

      <p className="text-xs font-extrabold uppercase tracking-widest mt-7 mb-3" style={{ color: INK }}>Capacity (optional)</p>
      <div className="grid grid-cols-3 gap-3">
        <Box id="be-bays" label="Bays" value={bays} onChange={setBays} />
        <Box id="be-hours" label="Hours open a day" value={hours} onChange={setHours} />
        <Box id="be-perbay" label="Cars per bay an hour" value={perBay} onChange={setPerBay} />
      </div>
      <p className="text-xs mt-2" style={{ color: MUTED }}>AEDO Construction plans about 2 cars per bay per hour for a hand wash. Time your own crew if you can.</p>

      <div className="grid sm:grid-cols-2 gap-3 mt-7" aria-live="polite">
        <Result
          label="Each car leaves you"
          value={perCar === null ? "—" : perCar < 0 ? `−${peso(-perCar)}` : peso(perCar)}
          note={perCar !== null && perCar <= 0 ? "Each car loses money at these numbers. Raise the price or cut the per-car costs." : "After the washer's share, supplies, water and electricity."}
        />
        <Result
          label="Break-even"
          value={perDay === null ? "—" : `${whole(perDay)} cars a day`}
          note={perMonth === null ? "Needs the price, fixed costs and days open." : `${whole(perMonth)} cars a month just to cover fixed costs.`}
          strong
        />
        {profit !== null && (
          <Result
            label={`Monthly result at ${expectedN!.toLocaleString("en-PH")} cars a day`}
            value={profit >= 0 ? peso(profit) : `−${peso(-profit)}`}
            note={profit >= 0 ? "Before tax." : "A loss: below break-even."}
          />
        )}
        {capacity !== null && (
          <Result
            label="Daily capacity"
            value={`${whole(capacity)} cars`}
            note={perDay !== null && capacity > 0 ? `Break-even uses ${Math.round((Math.ceil(perDay) / capacity) * 100)}% of it.` : "Bays × hours × cars per bay an hour."}
          />
        )}
      </div>
    </div>
  )
}
