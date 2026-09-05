"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  BLUE,
  CREAM,
  CURRENCIES,
  CurrencySelect,
  Field,
  INK,
  MUTED,
  Result,
  money,
  num,
} from "@/components/restaurant/costing"

/**
 * One division, deliberately. The full recipe tool works out what a portion
 * costs; this answers the question people ask once they already know that
 * number - what percentage of the menu price is it, and is that healthy.
 */
export default function FoodCostPercentage() {
  const [currency, setCurrency] = useState("PHP")
  const [cost, setCost] = useState("54")
  const [price, setPrice] = useState("180")
  const [sold, setSold] = useState("40")

  const symbol = CURRENCIES.find((c) => c.code === currency)?.symbol ?? "₱"

  const r = useMemo(() => {
    const c = num(cost)
    const p = num(price)
    const units = num(sold)

    // Price drives every ratio here, so a blank or zero price has no answer -
    // better to show a dash than a division by zero dressed up as 0%.
    const priced = p > 0
    const pct = priced ? (c / p) * 100 : 0
    const profit = p - c
    const margin = priced ? (profit / p) * 100 : 0

    return {
      priced,
      pct,
      profit,
      margin,
      weekProfit: profit * units,
      weekRevenue: p * units,
      weekCost: c * units,
    }
  }, [cost, price, sold])

  // The bands most kitchens are judged against. They are a sanity check, not a
  // rule: a steakhouse routinely runs above 35% and is not in trouble for it.
  const verdict = !r.priced
    ? { tone: "ink" as const, text: "Enter a selling price to see the percentage." }
    : r.pct < 20
      ? { tone: "good" as const, text: "Very low. Check the cost is complete before celebrating - a missing ingredient looks exactly like this." }
      : r.pct <= 35
        ? { tone: "good" as const, text: "Inside the 28-35% band most full-service kitchens target." }
        : r.pct <= 45
          ? { tone: "danger" as const, text: "High for most menus. Either the portion is generous, the price is soft, or an ingredient has quietly gone up." }
          : { tone: "danger" as const, text: "Very high. At this level the dish is unlikely to be covering its share of labour and rent." }

  return (
    <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 items-start">
      <div className="rounded-3xl border-2 p-6" style={{ borderColor: INK, background: CREAM }}>
        <div className="grid sm:grid-cols-2 gap-4">
          <CurrencySelect value={currency} onChange={setCurrency} />
          <Field label="Portions sold per week" value={sold} onChange={setSold} placeholder="40" />
          <Field label="Cost per portion" value={cost} onChange={setCost} prefix={symbol} placeholder="54" />
          <Field label="Menu price" value={price} onChange={setPrice} prefix={symbol} placeholder="180" />
        </div>

        <p className="text-xs leading-relaxed mt-5" style={{ color: MUTED }}>
          Cost per portion is ingredients only - no labour, gas, or packaging. If you do not have that figure yet,{" "}
          <Link href="/restaurant/food-cost-calculator" className="font-bold underline" style={{ color: BLUE }}>
            cost the recipe first
          </Link>
          .
        </p>
      </div>

      <div className="space-y-4">
        <Result
          label="Food cost percentage"
          value={r.priced ? `${r.pct.toFixed(1)}%` : "-"}
          tone={verdict.tone}
          hint={verdict.text}
          big
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <Result
            label="Gross profit per portion"
            value={money(r.profit, symbol)}
            tone={r.profit >= 0 ? "good" : "danger"}
            hint="What is left after ingredients - before labour, rent, and everything else."
          />
          <Result
            label="Gross margin"
            value={r.priced ? `${r.margin.toFixed(1)}%` : "-"}
            hint="The mirror of food cost: the two always add up to 100%."
          />
        </div>

        <div className="rounded-2xl border-2 px-5 py-4" style={{ borderColor: INK, background: CREAM }}>
          <p className="text-[11px] font-bold uppercase tracking-wide mb-3" style={{ color: MUTED }}>
            At {num(sold).toLocaleString()} portions a week
          </p>
          <dl className="space-y-1.5 text-sm" style={{ color: INK }}>
            <div className="flex justify-between gap-4">
              <dt style={{ color: MUTED }}>Revenue</dt>
              <dd className="font-bold">{money(r.weekRevenue, symbol)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt style={{ color: MUTED }}>Ingredient cost</dt>
              <dd className="font-bold">{money(r.weekCost, symbol)}</dd>
            </div>
            <div
              className="flex justify-between gap-4 pt-1.5 mt-1.5 border-t-2"
              style={{ borderColor: INK }}
            >
              <dt className="font-bold">Gross profit</dt>
              <dd className="font-extrabold">{money(r.weekProfit, symbol)}</dd>
            </div>
          </dl>
          <p className="text-xs mt-3 leading-relaxed" style={{ color: MUTED }}>
            A percentage point on a dish you sell forty times a week is worth more than five points on one you sell
            twice. This is why the volume matters.
          </p>
        </div>
      </div>
    </div>
  )
}
