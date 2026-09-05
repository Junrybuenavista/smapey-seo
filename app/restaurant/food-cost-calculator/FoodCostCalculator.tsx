"use client"

import { useMemo, useState } from "react"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const MUTED = "#54514c"
const DANGER = "#b42318"
const GOOD = "#186a3b"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

/**
 * Unit conversion is the whole reason a tool beats a spreadsheet here. A cook
 * buys chicken by the kilo and uses it by the gram, buys oil by the litre and
 * uses it by the tablespoon. Every unit resolves to a base within its own
 * dimension, and costing only happens when the two units share that dimension -
 * there is no honest way to convert 1kg of flour into millilitres, so the row
 * says so instead of quietly returning a wrong number.
 */
type Dim = "weight" | "volume" | "count"

const UNITS: Record<string, { dim: Dim; base: number; label: string }> = {
  g: { dim: "weight", base: 1, label: "g" },
  kg: { dim: "weight", base: 1000, label: "kg" },
  oz: { dim: "weight", base: 28.3495, label: "oz" },
  lb: { dim: "weight", base: 453.592, label: "lb" },
  ml: { dim: "volume", base: 1, label: "ml" },
  l: { dim: "volume", base: 1000, label: "L" },
  tsp: { dim: "volume", base: 4.92892, label: "tsp" },
  tbsp: { dim: "volume", base: 14.7868, label: "tbsp" },
  cup: { dim: "volume", base: 236.588, label: "cup" },
  floz: { dim: "volume", base: 29.5735, label: "fl oz" },
  pc: { dim: "count", base: 1, label: "pc" },
  dozen: { dim: "count", base: 12, label: "dozen" },
}

const UNIT_GROUPS: { label: string; keys: string[] }[] = [
  { label: "Weight", keys: ["g", "kg", "oz", "lb"] },
  { label: "Volume", keys: ["ml", "l", "tsp", "tbsp", "cup", "floz"] },
  { label: "Count", keys: ["pc", "dozen"] },
]

const CURRENCIES: { code: string; symbol: string; label: string }[] = [
  { code: "PHP", symbol: "₱", label: "PHP ₱" },
  { code: "USD", symbol: "$", label: "USD $" },
  { code: "EUR", symbol: "€", label: "EUR €" },
  { code: "GBP", symbol: "£", label: "GBP £" },
  { code: "AUD", symbol: "A$", label: "AUD A$" },
  { code: "CAD", symbol: "C$", label: "CAD C$" },
  { code: "INR", symbol: "₹", label: "INR ₹" },
]

type Row = {
  id: number
  name: string
  buyQty: string
  buyUnit: string
  buyPrice: string
  useQty: string
  useUnit: string
  waste: string
}

/**
 * A braised chicken dish costed at illustrative Philippine prices - concrete
 * enough that the tool explains itself on load, and meant to be replaced.
 */
const DEFAULT_ROWS: Row[] = [
  { id: 1, name: "Chicken thigh", buyQty: "1", buyUnit: "kg", buyPrice: "220", useQty: "800", useUnit: "g", waste: "12" },
  { id: 2, name: "Soy sauce", buyQty: "1", buyUnit: "l", buyPrice: "95", useQty: "120", useUnit: "ml", waste: "0" },
  { id: 3, name: "Vinegar", buyQty: "1", buyUnit: "l", buyPrice: "60", useQty: "90", useUnit: "ml", waste: "0" },
  { id: 4, name: "Garlic", buyQty: "250", buyUnit: "g", buyPrice: "45", useQty: "40", useUnit: "g", waste: "20" },
  { id: 5, name: "Cooking oil", buyQty: "1", buyUnit: "l", buyPrice: "130", useQty: "2", useUnit: "tbsp", waste: "0" },
]

const num = (s: string) => {
  const n = parseFloat(String(s).replace(/[^0-9.]/g, ""))
  return Number.isFinite(n) ? n : 0
}

/**
 * Defined at module scope, not inside the calculator. A component created
 * during render is a new type on every keystroke, so React unmounts and
 * remounts the input - and the field loses focus as you type into it.
 */
function Cell({
  label,
  value,
  onChange,
  placeholder,
  wide = false,
}: {
  label: string
  value: string
  onChange: (raw: string) => void
  placeholder?: string
  wide?: boolean
}) {
  return (
    <label className={wide ? "block sm:col-span-2" : "block"}>
      <span className="block text-[11px] font-bold uppercase tracking-wide mb-1" style={{ color: MUTED }}>
        {label}
      </span>
      <input
        inputMode={wide ? "text" : "decimal"}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border-2 px-3 py-2 text-sm font-semibold outline-none focus:ring-0"
        style={{ borderColor: INK, background: "#fff", color: INK }}
      />
    </label>
  )
}

function UnitSelect({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (raw: string) => void
}) {
  return (
    <label className="block">
      <span className="block text-[11px] font-bold uppercase tracking-wide mb-1" style={{ color: MUTED }}>
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border-2 px-2 py-2 text-sm font-semibold outline-none focus:ring-0"
        style={{ borderColor: INK, background: "#fff", color: INK }}
      >
        {UNIT_GROUPS.map((g) => (
          <optgroup key={g.label} label={g.label}>
            {g.keys.map((k) => (
              <option key={k} value={k}>
                {UNITS[k].label}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </label>
  )
}

export default function FoodCostCalculator({ embed = false }: { embed?: boolean }) {
  const [rows, setRows] = useState<Row[]>(DEFAULT_ROWS)
  const [nextId, setNextId] = useState(6)
  const [portions, setPortions] = useState("8")
  const [target, setTarget] = useState("30")
  const [menuPrice, setMenuPrice] = useState("")
  const [currency, setCurrency] = useState("PHP")

  const sym = CURRENCIES.find((c) => c.code === currency)?.symbol ?? "₱"
  const money = (n: number) =>
    sym +
    (Math.round(n * 100) / 100).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

  const patch = (id: number, key: keyof Row, raw: string) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [key]: raw } : r)))

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      { id: nextId, name: "", buyQty: "1", buyUnit: "kg", buyPrice: "", useQty: "", useUnit: "g", waste: "0" },
    ])
    setNextId((n) => n + 1)
  }

  const removeRow = (id: number) => setRows((prev) => prev.filter((r) => r.id !== id))

  const r = useMemo(() => {
    const lines = rows.map((row) => {
      const buyU = UNITS[row.buyUnit]
      const useU = UNITS[row.useUnit]
      const mismatch = buyU.dim !== useU.dim

      const buyBase = num(row.buyQty) * buyU.base
      const useBase = num(row.useQty) * useU.base
      // Trim waste means you must BUY more than the recipe uses: 100g of
      // peeled garlic out of a head that is 20% skin needs 125g purchased.
      const waste = Math.min(Math.max(num(row.waste), 0), 99)
      const effective = useBase / (1 - waste / 100)
      const unitCost = buyBase > 0 ? num(row.buyPrice) / buyBase : 0
      const cost = mismatch ? 0 : unitCost * effective

      return { row, mismatch, cost, wasteCost: mismatch ? 0 : unitCost * (effective - useBase) }
    })

    const batchCost = lines.reduce((a, l) => a + l.cost, 0)
    const wasteCost = lines.reduce((a, l) => a + l.wasteCost, 0)
    const p = Math.max(num(portions), 0)
    const costPerPortion = p > 0 ? batchCost / p : 0

    const targetPct = Math.min(Math.max(num(target), 1), 100)
    const suggested = costPerPortion / (targetPct / 100)

    const price = num(menuPrice)
    const hasPrice = price > 0
    const actualPct = hasPrice && price > 0 ? (costPerPortion / price) * 100 : null
    const profitPerPortion = hasPrice ? price - costPerPortion : suggested - costPerPortion
    const profitPerBatch = profitPerPortion * p

    const anyMismatch = lines.some((l) => l.mismatch)

    return {
      lines,
      batchCost,
      wasteCost,
      costPerPortion,
      suggested,
      targetPct,
      hasPrice,
      price,
      actualPct,
      profitPerPortion,
      profitPerBatch,
      portions: p,
      anyMismatch,
    }
  }, [rows, portions, target, menuPrice])

  const headline = r.hasPrice ? r.actualPct : r.targetPct
  const headlineOff = r.hasPrice && r.actualPct !== null && r.actualPct > r.targetPct

  return (
    <div style={{ ...display, background: embed ? "#fff" : "transparent" }} className={embed ? "p-5" : ""}>
      <div className="grid lg:grid-cols-[1.35fr_1fr] gap-8 items-start">
        {/* ─────────── INPUTS ─────────── */}
        <div className="space-y-7">
          <div className="flex flex-wrap items-end gap-4">
            <label className="block">
              <span className="block text-sm font-bold mb-1" style={{ color: INK }}>
                Portions this batch makes
              </span>
              <input
                inputMode="decimal"
                value={portions}
                onChange={(e) => setPortions(e.target.value)}
                className="w-32 rounded-xl border-2 px-3 py-2 text-base font-semibold outline-none"
                style={{ borderColor: INK, background: "#fff", color: INK }}
              />
            </label>
            <label className="block">
              <span className="block text-sm font-bold mb-1" style={{ color: INK }}>
                Currency
              </span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="rounded-xl border-2 px-3 py-2 text-base font-semibold outline-none"
                style={{ borderColor: INK, background: "#fff", color: INK }}
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <h2 className="text-lg font-extrabold mb-1" style={{ color: INK }}>
              What goes into the batch
            </h2>
            <p className="text-sm mb-4 leading-relaxed" style={{ color: MUTED }}>
              Enter what you <strong>buy</strong> and what the recipe <strong>uses</strong>. The units do not have to
              match - buy by the kilo, cook by the gram.
            </p>

            <div className="space-y-4">
              {r.lines.map(({ row, mismatch, cost }) => {
                const share = r.batchCost > 0 ? (cost / r.batchCost) * 100 : 0
                return (
                  <div
                    key={row.id}
                    className="rounded-[18px] border-2 p-4"
                    style={{ borderColor: INK, background: "#fff" }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1">
                        <Cell
                          label="Ingredient"
                          value={row.name}
                          placeholder="e.g. Chicken thigh"
                          onChange={(x) => patch(row.id, "name", x)}
                          wide
                        />
                      </div>
                      <button
                        onClick={() => removeRow(row.id)}
                        aria-label={`Remove ${row.name || "ingredient"}`}
                        className="mt-5 shrink-0 w-8 h-8 rounded-full border-2 font-bold leading-none transition-transform hover:-translate-y-0.5"
                        style={{ borderColor: INK, background: "#fff", color: DANGER }}
                      >
                        &times;
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <Cell label="Buy qty" value={row.buyQty} onChange={(x) => patch(row.id, "buyQty", x)} />
                      <UnitSelect label="Unit" value={row.buyUnit} onChange={(x) => patch(row.id, "buyUnit", x)} />
                      <Cell
                        label={`Price paid (${sym})`}
                        value={row.buyPrice}
                        onChange={(x) => patch(row.id, "buyPrice", x)}
                      />
                      <Cell label="Trim waste %" value={row.waste} onChange={(x) => patch(row.id, "waste", x)} />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                      <Cell label="Recipe uses" value={row.useQty} onChange={(x) => patch(row.id, "useQty", x)} />
                      <UnitSelect label="Unit" value={row.useUnit} onChange={(x) => patch(row.id, "useUnit", x)} />
                      <div className="sm:col-span-2 flex items-end">
                        {mismatch ? (
                          <p
                            className="text-xs font-bold leading-snug rounded-xl px-3 py-2 w-full"
                            style={{ background: "#fdecea", color: DANGER }}
                          >
                            Can&apos;t convert {UNITS[row.buyUnit].label} to {UNITS[row.useUnit].label} - pick units of
                            the same kind.
                          </p>
                        ) : (
                          <div className="w-full flex items-baseline justify-between gap-2 pb-1">
                            <span className="text-xs font-bold uppercase tracking-wide" style={{ color: MUTED }}>
                              Line cost
                            </span>
                            <span className="text-lg font-extrabold" style={{ color: INK }}>
                              {money(cost)}
                              <span className="ml-2 text-xs font-bold" style={{ color: MUTED }}>
                                {share.toFixed(0)}%
                              </span>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <button
              onClick={addRow}
              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5"
              style={{ background: "#fff", color: INK, borderColor: INK }}
            >
              + Add ingredient
            </button>
          </div>

          <div>
            <h2 className="text-lg font-extrabold mb-4" style={{ color: INK }}>
              Pricing
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <label className="block">
                <span className="block text-sm font-bold mb-1" style={{ color: INK }}>
                  Target food cost %
                </span>
                <span className="block text-xs mb-2 leading-relaxed" style={{ color: MUTED }}>
                  Most full-service kitchens aim for 28-35%.
                </span>
                <input
                  inputMode="decimal"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full rounded-xl border-2 px-3 py-2 text-base font-semibold outline-none"
                  style={{ borderColor: INK, background: "#fff", color: INK }}
                />
              </label>
              <label className="block">
                <span className="block text-sm font-bold mb-1" style={{ color: INK }}>
                  Your menu price
                </span>
                <span className="block text-xs mb-2 leading-relaxed" style={{ color: MUTED }}>
                  Optional. Leave blank to get a suggested price instead.
                </span>
                <input
                  inputMode="decimal"
                  value={menuPrice}
                  placeholder="e.g. 180"
                  onChange={(e) => setMenuPrice(e.target.value)}
                  className="w-full rounded-xl border-2 px-3 py-2 text-base font-semibold outline-none"
                  style={{ borderColor: INK, background: "#fff", color: INK }}
                />
              </label>
            </div>
          </div>
        </div>

        {/* ─────────── RESULTS ─────────── */}
        <div>
          <div
            className="rounded-[22px] border-2 overflow-hidden sticky top-6"
            style={{ borderColor: INK, background: CREAM, boxShadow: `8px 8px 0 ${BLUE}` }}
          >
            <div className="px-6 py-5 border-b-2" style={{ borderColor: INK }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: BLUE }}>
                Cost per portion
              </p>
              <p className="text-4xl font-extrabold" style={{ color: INK }}>
                {money(r.costPerPortion)}
              </p>
              <p className="text-sm mt-1" style={{ color: MUTED }}>
                {r.hasPrice ? (
                  <>
                    that is{" "}
                    <strong style={{ color: headlineOff ? DANGER : GOOD }}>
                      {r.actualPct === null ? "-" : r.actualPct.toFixed(1)}% food cost
                    </strong>{" "}
                    at {money(r.price)}
                  </>
                ) : (
                  <>ingredients only, before labour and overhead</>
                )}
              </p>
            </div>

            <table className="w-full text-sm">
              <tbody>
                <tr style={{ borderTop: "1px solid rgba(22,22,22,.12)" }}>
                  <td className="px-6 py-2.5" style={{ color: MUTED }}>
                    Batch cost
                    <span className="block text-xs" style={{ color: "#8a857e" }}>
                      All {rows.length} ingredient{rows.length === 1 ? "" : "s"}
                    </span>
                  </td>
                  <td className="px-6 py-2.5 text-right font-bold whitespace-nowrap" style={{ color: INK }}>
                    {money(r.batchCost)}
                  </td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(22,22,22,.12)" }}>
                  <td className="px-6 py-2.5" style={{ color: MUTED }}>
                    Of which trim waste
                    <span className="block text-xs" style={{ color: "#8a857e" }}>
                      Bought but never plated
                    </span>
                  </td>
                  <td className="px-6 py-2.5 text-right font-bold whitespace-nowrap" style={{ color: DANGER }}>
                    {money(r.wasteCost)}
                  </td>
                </tr>
                <tr style={{ borderTop: "1px solid rgba(22,22,22,.12)" }}>
                  <td className="px-6 py-2.5" style={{ color: MUTED }}>
                    Portions
                  </td>
                  <td className="px-6 py-2.5 text-right font-bold whitespace-nowrap" style={{ color: INK }}>
                    {r.portions || "-"}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="px-6 py-5 border-t-2 space-y-3" style={{ borderColor: INK, background: "#fff" }}>
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-bold" style={{ color: INK }}>
                  {r.hasPrice ? "Your price" : `Price at ${r.targetPct}% food cost`}
                </span>
                <span className="text-2xl font-extrabold" style={{ color: BLUE }}>
                  {money(r.hasPrice ? r.price : r.suggested)}
                </span>
              </div>
              {r.hasPrice && (
                <div className="flex justify-between items-baseline">
                  <span className="text-sm" style={{ color: MUTED }}>
                    Price at {r.targetPct}% food cost
                  </span>
                  <span className="text-sm font-bold" style={{ color: MUTED }}>
                    {money(r.suggested)}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-bold" style={{ color: INK }}>
                  Gross profit per portion
                </span>
                <span
                  className="text-lg font-extrabold"
                  style={{ color: r.profitPerPortion >= 0 ? INK : DANGER }}
                >
                  {money(r.profitPerPortion)}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm" style={{ color: MUTED }}>
                  Gross profit per batch
                </span>
                <span
                  className="text-sm font-bold"
                  style={{ color: r.profitPerBatch >= 0 ? MUTED : DANGER }}
                >
                  {money(r.profitPerBatch)}
                </span>
              </div>
            </div>

            {headlineOff && (
              <div
                className="px-6 py-4 border-t-2 text-sm leading-relaxed"
                style={{ borderColor: INK, background: "#fff7ed", color: INK }}
              >
                At {money(r.price)} this plate runs{" "}
                <strong>{r.actualPct === null ? "-" : r.actualPct.toFixed(1)}%</strong> food cost, above your{" "}
                {r.targetPct}% target. Either lift the price to {money(r.suggested)} or take cost out of the line
                carrying the biggest share above.
              </div>
            )}

            {r.anyMismatch && (
              <div
                className="px-6 py-4 border-t-2 text-sm leading-relaxed"
                style={{ borderColor: INK, background: "#fdecea", color: DANGER }}
              >
                One or more ingredients have mismatched units and are being counted as zero. Fix those rows before
                trusting the total.
              </div>
            )}

            <div className="px-6 py-4 border-t-2" style={{ borderColor: INK, background: CREAM }}>
              <p className="text-xs leading-relaxed mb-3" style={{ color: MUTED }}>
                This is one recipe. Costing a whole menu, then watching it move as supplier prices change, is what
                Smapey&apos;s food ordering manager is for.
              </p>
              <a
                href="https://app.smapey.com/register?product=RESTAURANT&plan=FREE"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5"
                style={{ background: AMBER, color: INK, borderColor: INK }}
              >
                Cost your whole menu free &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-8 text-xs leading-relaxed" style={{ color: MUTED }}>
        The recipe this opens with uses round illustrative prices, not market rates - replace every figure with your
        own invoices. Food cost here means ingredients only: it does not include labour, gas, electricity, packaging,
        or rent, so the gross profit shown is what is left to cover those, not what you keep. Trim waste covers peel,
        bone, and fat lost in prep; it does not cover spoilage, over-portioning, or comped plates, which sit between
        this number and your real cost of sales.
      </p>
    </div>
  )
}
