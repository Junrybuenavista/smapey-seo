"use client"

import { useMemo, useState } from "react"
import { SIZES, percentGrown, uncertaintyPct, fullyGrownWeeks, type SizeKey } from "./growth"

const INK = "#161616"
const BLUE = "#2f6bff"
const CREAM = "#fbf7f0"
const MUTED = "#54514c"
const GOOD = "#186a3b"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

const num = (s: string) => {
  const n = parseFloat(String(s).replace(/[^0-9.]/g, ""))
  return Number.isFinite(n) ? n : 0
}

const KG_PER_LB = 0.453592

/** Milestones worth projecting - the ages owners actually ask about. */
const MILESTONES = [12, 16, 20, 24, 32, 40, 52, 68]

function Labelled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-bold uppercase tracking-wide mb-1.5" style={{ color: MUTED }}>
        {label}
      </span>
      {children}
    </label>
  )
}

export default function PuppyWeightCalculator({ embed = false }: { embed?: boolean }) {
  const [weight, setWeight] = useState("13")
  const [unit, setUnit] = useState<"kg" | "lb">("kg")
  const [age, setAge] = useState("16")
  const [ageUnit, setAgeUnit] = useState<"weeks" | "months">("weeks")
  const [sizeKey, setSizeKey] = useState<SizeKey>("large")

  const size = SIZES.find((s) => s.key === sizeKey) ?? SIZES[3]

  const r = useMemo(() => {
    const w = num(weight)
    const weeks = ageUnit === "months" ? num(age) * 4.345 : num(age)

    // Below four weeks a puppy is still largely on milk and the curves do not
    // mean anything useful, so the tool declines rather than guessing.
    const tooYoung = weeks > 0 && weeks < 4
    const valid = w > 0 && weeks >= 4

    const pct = valid ? percentGrown(size, weeks) : 0
    const adult = valid && pct > 0 ? w / (pct / 100) : 0
    const u = uncertaintyPct(pct)
    const done = fullyGrownWeeks(size)
    const remaining = Math.max(0, done - weeks)

    const projection = valid
      ? MILESTONES.filter((m) => m > weeks && m <= done).map((m) => ({
          weeks: m,
          weight: adult * (percentGrown(size, m) / 100),
        }))
      : []

    return {
      valid,
      tooYoung,
      weeks,
      pct,
      adult,
      lo: adult * (1 - u / 100),
      hi: adult * (1 + u / 100),
      remaining,
      done,
      projection,
    }
  }, [weight, age, ageUnit, size])

  const fmt = (kgOrLb: number) => `${kgOrLb.toFixed(1)} ${unit}`

  return (
    <div style={embed ? { ...display, padding: "20px" } : display}>
      <div className="grid lg:grid-cols-[1fr_1.15fr] gap-8 items-start">
        <div className="rounded-3xl border-2 p-6" style={{ borderColor: INK, background: CREAM }}>
          <div className="grid sm:grid-cols-2 gap-4">
            <Labelled label="Puppy's weight now">
              <div className="flex rounded-xl border-2 overflow-hidden" style={{ borderColor: INK, background: "#fff" }}>
                <input
                  inputMode="decimal"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="13"
                  className="w-full px-3 py-2.5 text-base font-semibold outline-none"
                  style={{ background: "transparent", color: INK }}
                />
                <div className="flex">
                  {(["kg", "lb"] as const).map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => {
                        // Convert the number so the puppy does not change size
                        // when the owner is only changing how it is measured.
                        if (u === unit) return
                        const w = num(weight)
                        setWeight(String(Number((u === "kg" ? w * KG_PER_LB : w / KG_PER_LB).toFixed(2))))
                        setUnit(u)
                      }}
                      className="px-3 text-sm font-bold"
                      style={{
                        background: unit === u ? INK : "transparent",
                        color: unit === u ? "#fff" : MUTED,
                      }}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>
            </Labelled>

            <Labelled label="Age">
              <div className="flex rounded-xl border-2 overflow-hidden" style={{ borderColor: INK, background: "#fff" }}>
                <input
                  inputMode="decimal"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="16"
                  className="w-full px-3 py-2.5 text-base font-semibold outline-none"
                  style={{ background: "transparent", color: INK }}
                />
                <div className="flex">
                  {(["weeks", "months"] as const).map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setAgeUnit(u)}
                      className="px-2.5 text-xs font-bold"
                      style={{
                        background: ageUnit === u ? INK : "transparent",
                        color: ageUnit === u ? "#fff" : MUTED,
                      }}
                    >
                      {u === "weeks" ? "wk" : "mo"}
                    </button>
                  ))}
                </div>
              </div>
            </Labelled>
          </div>

          <div className="mt-5">
            <span className="block text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: MUTED }}>
              Expected adult size
            </span>
            <div className="grid grid-cols-5 gap-1.5">
              {SIZES.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setSizeKey(s.key)}
                  className="rounded-lg border-2 py-2 text-xs font-bold transition-transform hover:-translate-y-0.5"
                  style={{
                    borderColor: INK,
                    background: sizeKey === s.key ? INK : "#fff",
                    color: sizeKey === s.key ? "#fff" : INK,
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <p className="text-xs mt-2.5 leading-relaxed" style={{ color: MUTED }}>
              <strong style={{ color: INK }}>{size.label}</strong> - {size.adultRange}. Typical breeds: {size.breeds}.
            </p>
            <p className="text-xs mt-2 leading-relaxed" style={{ color: MUTED }}>
              Mixed breed? Pick the size the larger parent finished at. If you have no idea, medium is the safest
              starting point.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {r.tooYoung ? (
            <div className="rounded-2xl border-2 px-5 py-5" style={{ borderColor: INK, background: "#fff" }}>
              <p className="text-base font-extrabold mb-1.5" style={{ color: INK }}>
                Too young to estimate
              </p>
              <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                Under four weeks a puppy is still mostly on milk and its weight says very little about the adult dog
                it will become. Come back at around eight weeks - and at twelve to sixteen weeks the estimate gets
                noticeably tighter.
              </p>
            </div>
          ) : (
            <>
              <div className="rounded-2xl border-2 px-5 py-4" style={{ borderColor: INK, background: "#fff" }}>
                <p className="text-[11px] font-bold uppercase tracking-wide mb-1" style={{ color: MUTED }}>
                  Estimated adult weight
                </p>
                <p className="text-4xl font-extrabold tracking-tight leading-none" style={{ color: BLUE }}>
                  {r.valid ? fmt(r.adult) : "-"}
                </p>
                <p className="text-sm mt-2.5 font-semibold" style={{ color: INK }}>
                  {r.valid ? `Likely range ${fmt(r.lo)} to ${fmt(r.hi)}` : "Enter a weight and age to start."}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border-2 px-5 py-4" style={{ borderColor: INK, background: "#fff" }}>
                  <p className="text-[11px] font-bold uppercase tracking-wide mb-1" style={{ color: MUTED }}>
                    Already grown
                  </p>
                  <p className="text-2xl font-extrabold tracking-tight" style={{ color: GOOD }}>
                    {r.valid ? `${r.pct.toFixed(0)}%` : "-"}
                  </p>
                  <div className="mt-2.5 h-2 rounded-full overflow-hidden" style={{ background: "#e7e2d9" }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${Math.min(100, r.pct)}%`, background: GOOD }}
                    />
                  </div>
                </div>
                <div className="rounded-2xl border-2 px-5 py-4" style={{ borderColor: INK, background: "#fff" }}>
                  <p className="text-[11px] font-bold uppercase tracking-wide mb-1" style={{ color: MUTED }}>
                    Still growing for
                  </p>
                  <p className="text-2xl font-extrabold tracking-tight" style={{ color: INK }}>
                    {r.valid ? (r.remaining <= 0 ? "Fully grown" : `~${Math.round(r.remaining / 4.345)} months`) : "-"}
                  </p>
                  <p className="text-xs mt-2 leading-relaxed" style={{ color: MUTED }}>
                    {size.label} breeds finish at roughly {Math.round(r.done / 4.345)} months.
                  </p>
                </div>
              </div>

              {r.projection.length > 0 ? (
                <div className="rounded-2xl border-2 px-5 py-4" style={{ borderColor: INK, background: CREAM }}>
                  <p className="text-[11px] font-bold uppercase tracking-wide mb-3" style={{ color: MUTED }}>
                    What to expect from here
                  </p>
                  <div className="space-y-1.5">
                    {r.projection.map((p) => (
                      <div key={p.weeks} className="flex justify-between gap-4 text-sm">
                        <span style={{ color: MUTED }}>
                          {p.weeks} weeks
                          <span className="opacity-60"> ({Math.round(p.weeks / 4.345)} mo)</span>
                        </span>
                        <span className="font-bold" style={{ color: INK }}>
                          {fmt(p.weight)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </>
          )}

          <p className="text-xs leading-relaxed px-1" style={{ color: MUTED }}>
            These figures are averages across many dogs of a similar size, not a measurement of your puppy. Healthy
            individuals sit above and below the curve all the time, and diet, neutering age, and genetics all move
            the finishing weight. If your puppy seems to be gaining or losing weight in a way that worries you, that
            is a conversation for your vet rather than a calculator.
          </p>
        </div>
      </div>
    </div>
  )
}
