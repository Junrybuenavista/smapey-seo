"use client"

import { useState } from "react"
import { INK, BLUE, AMBER, CREAM, MUTED, display } from "@/components/sports-courts/shared"

// The playing surface one court needs, lines plus the run-off around them,
// from the USA Pickleball rulebook (rule 3.A.3): 30 by 60 ft at the least,
// 34 by 64 ft recommended for new courts. Courts are laid in a grid, each
// keeping its own surface, as AEDO's planning layouts do.
const FT = 0.3048
const SURFACES = {
  min: { label: "Minimum, 30 × 60 ft", w: 30 * FT, l: 60 * FT },
  rec: { label: "Recommended, 34 × 64 ft", w: 34 * FT, l: 64 * FT },
} as const

// Tapes and plans are rarely closer than a few centimetres, and AEDO's own lot
// sizes are rounded to the nearest 10 cm, so a court that misses by less than
// this still counts.
const SLACK = 0.05

const NUM = /^[0-9,]*\.?[0-9]*$/
const n = (v: string) => (v.trim() === "" ? null : Number(v.replace(/,/g, "")))
const m = (v: number) => `${(Math.round(v * 10) / 10).toLocaleString("en-PH")} m`

function Box({ id, label, hint, value, onChange }: { id: string; label: string; hint?: string; value: string; onChange: (v: string) => void }) {
  return (
    <label htmlFor={id} className="block">
      <span className="block text-[11px] font-bold uppercase tracking-wide mb-1" style={{ color: MUTED }}>{label}</span>
      <span className="relative block">
        <input
          id={id}
          value={value}
          inputMode="decimal"
          onChange={(e) => { if (NUM.test(e.target.value)) onChange(e.target.value) }}
          className="w-full rounded-lg border-2 py-2 pl-3 pr-8 text-sm font-semibold outline-none tabular-nums"
          style={{ borderColor: INK, background: "#fff", color: INK }}
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold" style={{ color: MUTED }}>m</span>
      </span>
      {hint && <span className="block text-xs mt-1 leading-snug" style={{ color: MUTED }}>{hint}</span>}
    </label>
  )
}

/** The most courts a length × width holds, with how they're laid out. */
export function courtsThatFit(length: number, width: number, margin: number, surface: { w: number; l: number }) {
  let best = { courts: 0, across: 0, deep: 0, side: length, end: width }
  for (const [side, end] of [[length, width], [width, length]]) {
    const across = Math.max(0, Math.floor((side - 2 * margin + SLACK) / surface.w))
    const deep = Math.max(0, Math.floor((end - 2 * margin + SLACK) / surface.l))
    if (across * deep > best.courts) best = { courts: across * deep, across, deep, side, end }
  }
  return best
}

export default function CourtsFitCalculator() {
  const [length, setLength] = useState("")
  const [width, setWidth] = useState("")
  const [margin, setMargin] = useState("")
  const [size, setSize] = useState<keyof typeof SURFACES>("min")

  const L = n(length)
  const W = n(width)
  const a = n(margin) ?? 0
  const surface = SURFACES[size]
  const ready = L !== null && W !== null && L > 0 && W > 0
  const fit = ready ? courtsThatFit(L!, W!, a, surface) : null
  const used = fit ? fit.courts * surface.w * surface.l : 0

  return (
    <div className="my-8 rounded-[24px] border-2 p-5 sm:p-7" style={{ borderColor: INK, background: CREAM, boxShadow: `8px 8px 0 ${BLUE}`, ...display }}>
      <p className="text-xs font-extrabold uppercase tracking-widest mb-1" style={{ color: BLUE }}>Free calculator</p>
      <h3 className="text-xl font-extrabold mb-1" style={{ color: INK }}>How many pickleball courts fit?</h3>
      <p className="text-sm mb-6" style={{ color: MUTED }}>Your lot, slab or covered court, measured inside any walls, posts or fence.</p>

      <div className="grid grid-cols-2 gap-3">
        <Box id="fit-length" label="Length" value={length} onChange={setLength} />
        <Box id="fit-width" label="Width" value={width} onChange={setWidth} />
      </div>
      <div className="mt-4">
        <Box id="fit-margin" label="Walkway and fence allowance around the edge (optional)" value={margin} onChange={setMargin} hint="AEDO plans 2 m all round for a walkway and the fence. Leave it empty for the courts' surfaces alone." />
      </div>

      <span className="block text-[11px] font-bold uppercase tracking-wide mt-4 mb-1" style={{ color: MUTED }}>Surface for each court</span>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(SURFACES) as (keyof typeof SURFACES)[]).map((k) => (
          <button key={k} type="button" onClick={() => setSize(k)} aria-pressed={size === k} className="px-3 py-1 rounded-full text-xs font-bold border-2"
                  style={size === k ? { background: INK, color: "#fff", borderColor: INK } : { background: "#fff", color: INK, borderColor: INK }}>
            {SURFACES[k].label}
          </button>
        ))}
      </div>
      <p className="text-xs mt-2" style={{ color: MUTED }}>
        Each is {m(surface.w)} by {m(surface.l)}: the 6.10 by 13.41 m court plus the room to run past its lines.
      </p>

      <div className="grid sm:grid-cols-2 gap-3 mt-7" aria-live="polite">
        <div className="rounded-[14px] border-2 bg-white p-4" style={{ borderColor: INK, boxShadow: `4px 4px 0 ${AMBER}` }}>
          <p className="text-[11px] font-extrabold uppercase tracking-widest" style={{ color: BLUE }}>Courts that fit</p>
          <p className="text-2xl font-extrabold tabular-nums mt-1" style={{ color: INK }}>{fit ? `${fit.courts} court${fit.courts === 1 ? "" : "s"}` : "—"}</p>
          <p className="text-xs mt-1 leading-snug" style={{ color: MUTED }}>
            {!fit ? "Needs the length and the width."
              : fit.courts === 0 ? `Too small for one court's ${m(surface.w)} by ${m(surface.l)}${a > 0 ? " plus the allowance" : ""}.`
              : fit.courts === 1 ? `One court, its length along the ${m(fit.end)} side.`
              : `${fit.across} side by side along the ${m(fit.side)} side${fit.deep > 1 ? `, in ${fit.deep} rows` : ""}.`}
          </p>
        </div>
        {fit && fit.courts > 0 && (
          <div className="rounded-[14px] border-2 bg-white p-4" style={{ borderColor: INK }}>
            <p className="text-[11px] font-extrabold uppercase tracking-widest" style={{ color: BLUE }}>Space they use</p>
            <p className="text-2xl font-extrabold tabular-nums mt-1" style={{ color: INK }}>{Math.round(used).toLocaleString("en-PH")} m²</p>
            <p className="text-xs mt-1 leading-snug" style={{ color: MUTED }}>
              Of {Math.round(L! * W!).toLocaleString("en-PH")} m². Posts, columns, a counter and a comfort room all need room of their own.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
