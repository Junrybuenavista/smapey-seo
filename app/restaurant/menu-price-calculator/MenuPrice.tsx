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
 * The reverse of the percentage tool: instead of asking what percentage a
 * price implies, this asks what price a target percentage implies. Same two
 * numbers, opposite direction, and the one operators actually use when adding
 * a dish to a menu.
 */
export default function MenuPrice() {
  const [currency, setCurrency] = useState("PHP")
  const [cost, setCost] = useState("54")
  const [target, setTarget] = useState("30")
  const [vat, setVat] = useState("12")
  const [round, setRound] = useState(true)

  const symbol = CURRENCIES.find((c) => c.code === currency)?.symbol ?? "₱"

  const r = useMemo(() => {
    const c = num(cost)
    const t = num(target)
    const v = num(vat)

    // A target of zero would price the dish at infinity. Treat it as unset.
    const valid = t > 0 && t < 100
    const raw = valid ? c / (t / 100) : 0

    /**
     * Menus price at .00, .50 or .95 far more often than at 178.43, so round
     * up to the next 5 rather than to nearest - rounding down would quietly
     * push the dish past the target percentage the operator just asked for.
     */
    const suggested = round ? Math.ceil(raw / 5) * 5 : raw

    const actualPct = suggested > 0 ? (c / suggested) * 100 : 0
    const profit = suggested - c
    const withVat = suggested * (1 + v / 100)

    return { valid, raw, suggested, actualPct, profit, withVat }
  }, [cost, target, vat, round])

  return (
    <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 items-start">
      <div className="rounded-3xl border-2 p-6" style={{ borderColor: INK, background: CREAM }}>
        <div className="grid sm:grid-cols-2 gap-4">
          <CurrencySelect value={currency} onChange={setCurrency} />
          <Field label="Cost per portion" value={cost} onChange={setCost} prefix={symbol} placeholder="54" />
          <Field label="Target food cost" value={target} onChange={setTarget} suffix="%" placeholder="30" />
          <Field label="VAT / sales tax" value={vat} onChange={setVat} suffix="%" placeholder="12" />
        </div>

        <label className="flex items-center gap-2.5 mt-5 cursor-pointer">
          <input
            type="checkbox"
            checked={round}
            onChange={(e) => setRound(e.target.checked)}
            className="w-4 h-4 rounded border-2"
            style={{ borderColor: INK, accentColor: BLUE }}
          />
          <span className="text-sm font-semibold" style={{ color: INK }}>
            Round up to the nearest 5
          </span>
        </label>

        <p className="text-xs leading-relaxed mt-5" style={{ color: MUTED }}>
          Not sure what a portion costs?{" "}
          <Link href="/restaurant/food-cost-calculator" className="font-bold underline" style={{ color: BLUE }}>
            Cost the recipe first
          </Link>{" "}
          - the figure this needs is ingredients only.
        </p>
      </div>

      <div className="space-y-4">
        <Result
          label="Suggested menu price"
          value={r.valid ? money(r.suggested, symbol) : "-"}
          tone="blue"
          hint={
            r.valid
              ? round
                ? `Exact figure is ${money(r.raw, symbol)}, rounded up to a price a menu would actually print.`
                : "Unrounded, straight from the target percentage."
              : "Enter a target food cost between 1 and 99%."
          }
          big
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <Result
            label="Gross profit per portion"
            value={r.valid ? money(r.profit, symbol) : "-"}
            tone="good"
            hint="Covers labour, gas, rent, and everything else before any of it is profit."
          />
          <Result
            label="Food cost at that price"
            value={r.valid ? `${r.actualPct.toFixed(1)}%` : "-"}
            hint={
              !r.valid
                ? "Set a target above to see where the rounded price actually lands."
                : round
                  ? "Slightly under target, because rounding up always helps you."
                  : "Matches your target exactly."
            }
          />
        </div>

        {num(vat) > 0 && r.valid ? (
          <Result
            label={`Price including ${num(vat)}% VAT`}
            value={money(r.withVat, symbol)}
            hint="Use this if your menu prices are displayed tax-inclusive. The percentage above is calculated on the pre-tax price, which is the correct base."
          />
        ) : null}

        <div className="rounded-2xl border-2 px-5 py-4" style={{ borderColor: INK, background: CREAM }}>
          <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
            <span className="font-bold" style={{ color: INK }}>
              Treat this as a floor, not an answer.
            </span>{" "}
            It is the lowest price that hits your target on ingredients alone. What the dish is worth to your
            customers, and what the restaurant down the road charges for it, both belong in the final decision.
          </p>
        </div>
      </div>
    </div>
  )
}
