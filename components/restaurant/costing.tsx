"use client"

/**
 * Shared pieces for the small single-purpose costing calculators that sit
 * around the main food cost tool. The big calculator on
 * /restaurant/food-cost-calculator owns its own copies because it needs unit
 * conversion woven through them; these are for the two pages that only ever
 * divide two numbers, and duplicating the currency list across both of them
 * was the alternative.
 */

export const INK = "#161616"
export const BLUE = "#2f6bff"
export const AMBER = "#ff9e2c"
export const CREAM = "#fbf7f0"
export const MUTED = "#54514c"
export const GOOD = "#186a3b"
export const DANGER = "#b42318"
export const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

export const CURRENCIES: { code: string; symbol: string; label: string }[] = [
  { code: "PHP", symbol: "₱", label: "PHP ₱" },
  { code: "USD", symbol: "$", label: "USD $" },
  { code: "EUR", symbol: "€", label: "EUR €" },
  { code: "GBP", symbol: "£", label: "GBP £" },
  { code: "AUD", symbol: "A$", label: "AUD A$" },
  { code: "CAD", symbol: "C$", label: "CAD C$" },
  { code: "INR", symbol: "₹", label: "INR ₹" },
]

/** Strips anything that is not a digit or a dot, so a pasted "₱1,250.00" still costs. */
export const num = (s: string) => {
  const n = parseFloat(String(s).replace(/[^0-9.]/g, ""))
  return Number.isFinite(n) ? n : 0
}

export const money = (n: number, symbol: string) =>
  `${symbol}${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

/**
 * Defined at module scope rather than inside a calculator: a component created
 * during render is a new type on every keystroke, which unmounts and remounts
 * the input and loses focus mid-typing.
 */
export function Field({
  label,
  value,
  onChange,
  prefix,
  suffix,
  placeholder,
}: {
  label: string
  value: string
  onChange: (raw: string) => void
  prefix?: string
  suffix?: string
  placeholder?: string
}) {
  return (
    <label className="block">
      <span className="block text-[11px] font-bold uppercase tracking-wide mb-1.5" style={{ color: MUTED }}>
        {label}
      </span>
      <div
        className="flex items-center rounded-xl border-2 overflow-hidden"
        style={{ borderColor: INK, background: "#fff" }}
      >
        {prefix ? (
          <span className="pl-3 text-sm font-bold" style={{ color: MUTED }}>
            {prefix}
          </span>
        ) : null}
        <input
          inputMode="decimal"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2.5 text-base font-semibold outline-none focus:ring-0"
          style={{ background: "transparent", color: INK }}
        />
        {suffix ? (
          <span className="pr-3 text-sm font-bold" style={{ color: MUTED }}>
            {suffix}
          </span>
        ) : null}
      </div>
    </label>
  )
}

export function CurrencySelect({ value, onChange }: { value: string; onChange: (raw: string) => void }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-bold uppercase tracking-wide mb-1.5" style={{ color: MUTED }}>
        Currency
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border-2 px-3 py-2.5 text-base font-semibold outline-none focus:ring-0"
        style={{ borderColor: INK, background: "#fff", color: INK }}
      >
        {CURRENCIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export function Result({
  label,
  value,
  hint,
  tone = "ink",
  big = false,
}: {
  label: string
  value: string
  hint?: string
  tone?: "ink" | "good" | "danger" | "blue"
  big?: boolean
}) {
  const color = tone === "good" ? GOOD : tone === "danger" ? DANGER : tone === "blue" ? BLUE : INK
  return (
    <div className="rounded-2xl border-2 px-5 py-4" style={{ borderColor: INK, background: "#fff" }}>
      <p className="text-[11px] font-bold uppercase tracking-wide mb-1" style={{ color: MUTED }}>
        {label}
      </p>
      <p
        className={`${big ? "text-4xl" : "text-2xl"} font-extrabold tracking-tight leading-none`}
        style={{ color }}
      >
        {value}
      </p>
      {hint ? (
        <p className="text-xs mt-2 leading-relaxed" style={{ color: MUTED }}>
          {hint}
        </p>
      ) : null}
    </div>
  )
}
