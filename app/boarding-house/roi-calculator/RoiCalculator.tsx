"use client"

import { useMemo, useState } from "react"

const INK = "#161616"
const BLUE = "#2f6bff"
const CREAM = "#fbf7f0"
const MUTED = "#54514c"
const DANGER = "#b42318"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

const peso = (n: number) =>
  "₱" + Math.round(n).toLocaleString("en-PH")

type Field = {
  key: string
  label: string
  hint?: string
  suffix?: string
  step?: number
  max?: number
}

const REVENUE_FIELDS: Field[] = [
  { key: "beds", label: "Beds in the house", step: 1 },
  { key: "rate", label: "Average rent per bed", suffix: "per month" },
  { key: "occupancy", label: "Occupancy you actually expect", suffix: "%", max: 100 },
]

const COST_FIELDS: Field[] = [
  { key: "property", label: "Rent or loan on the property", suffix: "per month" },
  { key: "utilities", label: "Utilities you absorb", hint: "Common areas, water pump, wifi - the part no tenant is billed for", suffix: "per month" },
  { key: "staff", label: "Caretaker or staff", suffix: "per month" },
  { key: "maintenance", label: "Repairs and upkeep", hint: "Budget it monthly; it is the line most often underestimated", suffix: "per month" },
  { key: "other", label: "Everything else", hint: "Permits amortised, insurance, association dues, internet plan", suffix: "per month" },
]

/** Illustrative starting points, not market rates - see the note under the form. */
const DEFAULTS: Record<string, number> = {
  beds: 20,
  rate: 3000,
  occupancy: 85,
  property: 25000,
  utilities: 6000,
  staff: 8000,
  maintenance: 4000,
  other: 2000,
  capital: 600000,
  taxRate: 8,
}

/**
 * Defined at module scope rather than inside the calculator. A component
 * created during render is a new type on every keystroke, so React unmounts and
 * remounts the input - and the field loses focus as you type into it.
 */
function NumberField({
  field,
  value,
  onChange,
}: {
  field: Field
  value: number
  onChange: (key: string, raw: string) => void
}) {
  return (
    <label className="block">
      <span className="block text-sm font-bold mb-1" style={{ color: INK }}>
        {field.label}
      </span>
      {field.hint && (
        <span className="block text-xs mb-2 leading-relaxed" style={{ color: MUTED }}>
          {field.hint}
        </span>
      )}
      <div className="flex items-center gap-2">
        <input
          inputMode="numeric"
          value={String(value ?? 0)}
          onChange={(e) => onChange(field.key, e.target.value)}
          className="w-full rounded-xl border-2 px-3 py-2 text-base font-semibold outline-none focus:ring-0"
          style={{ borderColor: INK, background: "#fff", color: INK }}
        />
        {field.suffix && (
          <span className="text-xs whitespace-nowrap font-semibold" style={{ color: MUTED }}>
            {field.suffix}
          </span>
        )}
      </div>
    </label>
  )
}

export default function RoiCalculator({ embed = false }: { embed?: boolean }) {
  const [v, setV] = useState<Record<string, number>>({ ...DEFAULTS })
  const set = (key: string, raw: string) => {
    const n = Number(raw.replace(/[^0-9.]/g, ""))
    setV((prev) => ({ ...prev, [key]: Number.isFinite(n) ? n : 0 }))
  }

  const r = useMemo(() => {
    const occupiedBeds = (v.beds * v.occupancy) / 100
    const grossPotential = v.beds * v.rate
    const revenue = occupiedBeds * v.rate
    const vacancyLoss = grossPotential - revenue

    const costs = v.property + v.utilities + v.staff + v.maintenance + v.other
    const beforeTax = revenue - costs
    const tax = beforeTax > 0 ? (beforeTax * v.taxRate) / 100 : 0
    const net = beforeTax - tax

    const paybackMonths = net > 0 ? v.capital / net : null

    return { grossPotential, revenue, vacancyLoss, costs, beforeTax, tax, net, paybackMonths, occupiedBeds }
  }, [v])

  const rows: { label: string; value: string; tone?: "in" | "out" | "net"; hint?: string }[] = [
    { label: "Gross potential rent", value: peso(r.grossPotential), hint: "Every bed filled, every month" },
    { label: `Vacancy loss at ${v.occupancy}% occupancy`, value: "-" + peso(r.vacancyLoss), tone: "out" },
    { label: "Collected rent", value: peso(r.revenue), tone: "in" },
    { label: "Operating costs", value: "-" + peso(r.costs), tone: "out" },
    { label: "Net before tax", value: peso(r.beforeTax) },
    { label: `Tax at ${v.taxRate}%`, value: "-" + peso(r.tax), tone: "out" },
  ]

  return (
    <div style={{ ...display, background: embed ? "#fff" : "transparent" }} className={embed ? "p-5" : ""}>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* INPUTS */}
        <div className="space-y-7">
          <div>
            <h2 className="text-lg font-extrabold mb-4" style={{ color: INK }}>What comes in</h2>
            <div className="space-y-5">
              {REVENUE_FIELDS.map((f) => (
                <NumberField key={f.key} field={f} value={v[f.key]} onChange={set} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-extrabold mb-4" style={{ color: INK }}>What goes out, every month</h2>
            <div className="space-y-5">
              {COST_FIELDS.map((f) => (
                <NumberField key={f.key} field={f} value={v[f.key]} onChange={set} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-extrabold mb-4" style={{ color: INK }}>Payback</h2>
            <div className="space-y-5">
              <NumberField field={{ key: "capital", label: "Capital you put in", hint: "Fit-out, bunks, electrical and plumbing work, deposits, working capital" }} value={v.capital} onChange={set} />
              <NumberField field={{ key: "taxRate", label: "Tax rate you expect to pay", suffix: "%", max: 100 }} value={v.taxRate} onChange={set} />
            </div>
          </div>
        </div>

        {/* RESULTS */}
        <div>
          <div className="rounded-[22px] border-2 overflow-hidden sticky top-6" style={{ borderColor: INK, background: CREAM, boxShadow: `8px 8px 0 ${BLUE}` }}>
            <div className="px-6 py-5 border-b-2" style={{ borderColor: INK }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: BLUE }}>
                Every month
              </p>
              <p className="text-4xl font-extrabold" style={{ color: r.net >= 0 ? INK : DANGER }}>
                {peso(r.net)}
              </p>
              <p className="text-sm mt-1" style={{ color: MUTED }}>
                net, after costs and tax
              </p>
            </div>

            <table className="w-full text-sm">
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} style={{ borderTop: "1px solid rgba(22,22,22,.12)" }}>
                    <td className="px-6 py-2.5" style={{ color: MUTED }}>
                      {row.label}
                      {row.hint && (
                        <span className="block text-xs" style={{ color: "#8a857e" }}>{row.hint}</span>
                      )}
                    </td>
                    <td
                      className="px-6 py-2.5 text-right font-bold whitespace-nowrap"
                      style={{ color: row.tone === "out" ? DANGER : INK }}
                    >
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="px-6 py-5 border-t-2 space-y-3" style={{ borderColor: INK, background: "#fff" }}>
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-bold" style={{ color: INK }}>Net per year</span>
                <span className="text-lg font-extrabold" style={{ color: r.net >= 0 ? INK : DANGER }}>
                  {peso(r.net * 12)}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-bold" style={{ color: INK }}>Payback on {peso(v.capital)}</span>
                <span className="text-lg font-extrabold" style={{ color: INK }}>
                  {r.paybackMonths === null
                    ? "never at this net"
                    : r.paybackMonths < 1
                      ? "under a month"
                      : `${(r.paybackMonths / 12).toFixed(1)} years`}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm" style={{ color: MUTED }}>Beds filled</span>
                <span className="text-sm font-bold" style={{ color: MUTED }}>
                  {r.occupiedBeds.toFixed(1)} of {v.beds}
                </span>
              </div>
            </div>

            {r.net < 0 && (
              <div className="px-6 py-4 border-t-2 text-sm leading-relaxed" style={{ borderColor: INK, background: "#fdecea", color: DANGER }}>
                At these numbers the house loses money every month. The two levers that move
                it most are occupancy and the rent per bed - try raising occupancy before
                anything else, since an empty bed still carries its share of every cost above.
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="mt-8 text-xs leading-relaxed" style={{ color: MUTED }}>
        The figures this opens with are round numbers for illustration, not market rates -
        replace every one of them with your own. Rents, utilities, and wages vary widely by
        city and by the kind of house you run. This is a model, not advice: it cannot know
        your building, your barangay, or what your tenants will actually pay.
      </p>
    </div>
  )
}
