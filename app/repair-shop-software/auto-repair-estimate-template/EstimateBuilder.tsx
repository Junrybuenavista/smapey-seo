"use client"

import { useMemo, useState } from "react"
import DocShell, { Area, Field, FormSection, INK, MUTED, Slot } from "@/components/docs/DocShell"

type Line = { id: number; desc: string; kind: "Parts" | "Labour"; qty: string; price: string }

const num = (s: string) => {
  const n = parseFloat(String(s).replace(/[^0-9.]/g, ""))
  return Number.isFinite(n) ? n : 0
}

const BLANK_LINES: Line[] = [
  { id: 1, desc: "", kind: "Parts", qty: "", price: "" },
  { id: 2, desc: "", kind: "Labour", qty: "", price: "" },
  { id: 3, desc: "", kind: "Parts", qty: "", price: "" },
]

const SAMPLE: Line[] = [
  { id: 1, desc: "Front brake pads (set)", kind: "Parts", qty: "1", price: "2400" },
  { id: 2, desc: "Brake disc resurfacing", kind: "Labour", qty: "2", price: "600" },
  { id: 3, desc: "Brake fluid DOT 4", kind: "Parts", qty: "1", price: "450" },
  { id: 4, desc: "Labour - brake service", kind: "Labour", qty: "2.5", price: "500" },
]

export default function EstimateBuilder() {
  const [shop, setShop] = useState("Northside Auto Service")
  const [shopAddr, setShopAddr] = useState("14 Mabini Street, Quezon City")
  const [shopPhone, setShopPhone] = useState("0917 555 0142")
  const [estNo, setEstNo] = useState("EST-2041")
  const [date, setDate] = useState("")
  const [validDays, setValidDays] = useState("14")

  const [customer, setCustomer] = useState("Marisol Reyes")
  const [custPhone, setCustPhone] = useState("0918 555 0199")

  const [vehicle, setVehicle] = useState("2019 Toyota Vios 1.3 E")
  const [plate, setPlate] = useState("ABC 1234")
  const [odo, setOdo] = useState("78,420")
  const [vin, setVin] = useState("")

  const [lines, setLines] = useState<Line[]>(SAMPLE)
  const [nextId, setNextId] = useState(5)
  const [taxPct, setTaxPct] = useState("12")
  const [currency, setCurrency] = useState("₱")
  const [notes, setNotes] = useState(
    "Estimate only. Additional faults found during teardown will be quoted for approval before any further work starts."
  )

  const patch = (id: number, k: keyof Line, v: string) =>
    setLines((rows) => rows.map((r) => (r.id === id ? { ...r, [k]: v } : r)))

  const r = useMemo(() => {
    const priced = lines.map((l) => ({ ...l, amount: num(l.qty) * num(l.price) }))
    const parts = priced.filter((l) => l.kind === "Parts").reduce((a, l) => a + l.amount, 0)
    const labour = priced.filter((l) => l.kind === "Labour").reduce((a, l) => a + l.amount, 0)
    const sub = parts + labour
    const tax = sub * (num(taxPct) / 100)
    return { priced, parts, labour, sub, tax, total: sub + tax }
  }, [lines, taxPct])

  const money = (n: number) =>
    `${currency}${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

  const reset = () => {
    setShop(""); setShopAddr(""); setShopPhone(""); setEstNo(""); setDate(""); setValidDays("")
    setCustomer(""); setCustPhone("")
    setVehicle(""); setPlate(""); setOdo(""); setVin("")
    setLines(BLANK_LINES); setNextId(4); setTaxPct(""); setNotes("")
  }

  const form = (
    <>
      <FormSection title="Your shop">
        <Field label="Shop name" value={shop} onChange={setShop} placeholder="Northside Auto Service" />
        <Field label="Phone" value={shopPhone} onChange={setShopPhone} placeholder="0917 555 0142" />
        <Field label="Address" value={shopAddr} onChange={setShopAddr} wide placeholder="14 Mabini Street, Quezon City" />
        <Field label="Estimate no." value={estNo} onChange={setEstNo} placeholder="EST-2041" />
        <Field label="Date" value={date} onChange={setDate} type="date" />
        <Field label="Valid for (days)" value={validDays} onChange={setValidDays} placeholder="14" />
        <Field label="Currency symbol" value={currency} onChange={setCurrency} placeholder="₱" />
      </FormSection>

      <FormSection title="Customer & vehicle">
        <Field label="Customer name" value={customer} onChange={setCustomer} placeholder="Marisol Reyes" />
        <Field label="Customer phone" value={custPhone} onChange={setCustPhone} placeholder="0918 555 0199" />
        <Field label="Vehicle" value={vehicle} onChange={setVehicle} wide placeholder="2019 Toyota Vios 1.3 E" />
        <Field label="Plate no." value={plate} onChange={setPlate} placeholder="ABC 1234" />
        <Field label="Odometer" value={odo} onChange={setOdo} placeholder="78,420" />
        <Field label="VIN / chassis (optional)" value={vin} onChange={setVin} wide />
      </FormSection>

      <div>
        <p className="text-xs font-extrabold uppercase tracking-widest mb-3" style={{ color: "#2f6bff" }}>
          Parts & labour
        </p>
        <div className="space-y-2">
          {lines.map((l) => (
            <div key={l.id} className="grid grid-cols-[1fr_auto] gap-2 items-end">
              <div className="grid grid-cols-2 sm:grid-cols-[2fr_1fr_0.7fr_1fr] gap-2">
                <input
                  value={l.desc}
                  onChange={(e) => patch(l.id, "desc", e.target.value)}
                  placeholder="Description"
                  className="rounded-lg border-2 px-2.5 py-2 text-sm font-semibold outline-none"
                  style={{ borderColor: INK, background: "#fff", color: INK }}
                />
                <select
                  value={l.kind}
                  onChange={(e) => patch(l.id, "kind", e.target.value)}
                  className="rounded-lg border-2 px-2 py-2 text-sm font-semibold outline-none"
                  style={{ borderColor: INK, background: "#fff", color: INK }}
                >
                  <option>Parts</option>
                  <option>Labour</option>
                </select>
                <input
                  inputMode="decimal"
                  value={l.qty}
                  onChange={(e) => patch(l.id, "qty", e.target.value)}
                  placeholder="Qty"
                  className="rounded-lg border-2 px-2.5 py-2 text-sm font-semibold outline-none"
                  style={{ borderColor: INK, background: "#fff", color: INK }}
                />
                <input
                  inputMode="decimal"
                  value={l.price}
                  onChange={(e) => patch(l.id, "price", e.target.value)}
                  placeholder="Unit price"
                  className="rounded-lg border-2 px-2.5 py-2 text-sm font-semibold outline-none"
                  style={{ borderColor: INK, background: "#fff", color: INK }}
                />
              </div>
              <button
                type="button"
                onClick={() => setLines((rows) => (rows.length > 1 ? rows.filter((x) => x.id !== l.id) : rows))}
                aria-label="Remove line"
                className="rounded-lg border-2 w-9 h-[38px] font-bold"
                style={{ borderColor: INK, background: "#fff", color: MUTED }}
              >
                x
              </button>
            </div>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 gap-3 mt-3">
          <button
            type="button"
            onClick={() => {
              setLines((rows) => [...rows, { id: nextId, desc: "", kind: "Parts", qty: "", price: "" }])
              setNextId((n) => n + 1)
            }}
            className="rounded-lg border-2 px-4 py-2 text-sm font-bold"
            style={{ borderColor: INK, background: "#fff", color: INK }}
          >
            + Add line
          </button>
          <Field label="Tax / VAT %" value={taxPct} onChange={setTaxPct} placeholder="12" />
        </div>
      </div>

      <FormSection title="Terms">
        <Area label="Notes shown on the estimate" value={notes} onChange={setNotes} rows={3} />
      </FormSection>
    </>
  )

  const sheet = (
    <>
      <div className="flex justify-between gap-6 flex-wrap">
        <div>
          <p className="text-lg font-extrabold leading-tight">
            <Slot value={shop} minWidth={200} />
          </p>
          <p style={{ color: MUTED, whiteSpace: "pre-line" }}>
            <Slot value={shopAddr} minWidth={200} />
          </p>
          <p style={{ color: MUTED }}>
            <Slot value={shopPhone} minWidth={140} />
          </p>
        </div>
        <div className="text-right">
          <p className="text-xl font-extrabold tracking-tight">REPAIR ESTIMATE</p>
          <p style={{ color: MUTED }}>
            No. <Slot value={estNo} minWidth={90} />
          </p>
          <p style={{ color: MUTED }}>
            Date <Slot value={date} minWidth={90} />
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-7 pt-5" style={{ borderTop: "2px solid #161616" }}>
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-widest mb-1" style={{ color: MUTED }}>
            Customer
          </p>
          <p className="font-bold">
            <Slot value={customer} minWidth={150} />
          </p>
          <p style={{ color: MUTED }}>
            <Slot value={custPhone} minWidth={130} />
          </p>
        </div>
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-widest mb-1" style={{ color: MUTED }}>
            Vehicle
          </p>
          <p className="font-bold">
            <Slot value={vehicle} minWidth={170} />
          </p>
          <p style={{ color: MUTED }}>
            Plate <Slot value={plate} minWidth={80} /> &nbsp; Odo <Slot value={odo} minWidth={70} />
          </p>
          {vin.trim() ? <p style={{ color: MUTED }}>VIN {vin}</p> : null}
        </div>
      </div>

      <table className="w-full mt-7" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #161616" }}>
            <th className="text-left py-2 text-[10px] font-extrabold uppercase tracking-widest">Description</th>
            <th className="text-left py-2 text-[10px] font-extrabold uppercase tracking-widest">Type</th>
            <th className="text-right py-2 text-[10px] font-extrabold uppercase tracking-widest">Qty</th>
            <th className="text-right py-2 text-[10px] font-extrabold uppercase tracking-widest">Unit</th>
            <th className="text-right py-2 text-[10px] font-extrabold uppercase tracking-widest">Amount</th>
          </tr>
        </thead>
        <tbody>
          {r.priced.map((l) => (
            <tr key={l.id} style={{ borderBottom: "1px solid #e7e2d9" }}>
              <td className="py-2 pr-2">
                <Slot value={l.desc} minWidth={150} />
              </td>
              <td className="py-2 pr-2" style={{ color: MUTED }}>
                {l.kind}
              </td>
              <td className="py-2 text-right">{l.qty.trim() ? l.qty : "-"}</td>
              <td className="py-2 text-right">{l.price.trim() ? money(num(l.price)) : "-"}</td>
              <td className="py-2 text-right font-bold">{l.amount ? money(l.amount) : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mt-5">
        <dl className="w-full max-w-[280px] space-y-1">
          <div className="flex justify-between">
            <dt style={{ color: MUTED }}>Parts</dt>
            <dd className="font-semibold">{money(r.parts)}</dd>
          </div>
          <div className="flex justify-between">
            <dt style={{ color: MUTED }}>Labour</dt>
            <dd className="font-semibold">{money(r.labour)}</dd>
          </div>
          <div className="flex justify-between">
            <dt style={{ color: MUTED }}>Subtotal</dt>
            <dd className="font-semibold">{money(r.sub)}</dd>
          </div>
          <div className="flex justify-between">
            <dt style={{ color: MUTED }}>Tax {num(taxPct) ? `(${num(taxPct)}%)` : ""}</dt>
            <dd className="font-semibold">{money(r.tax)}</dd>
          </div>
          <div className="flex justify-between pt-2 mt-1" style={{ borderTop: "2px solid #161616" }}>
            <dt className="font-extrabold">Estimated total</dt>
            <dd className="font-extrabold">{money(r.total)}</dd>
          </div>
        </dl>
      </div>

      {notes.trim() ? (
        <p className="mt-6 pt-4" style={{ borderTop: "1px solid #e7e2d9", color: MUTED, whiteSpace: "pre-line" }}>
          {notes}
        </p>
      ) : null}

      <p className="mt-3" style={{ color: MUTED }}>
        This estimate is valid for <Slot value={validDays} minWidth={40} /> days from the date above.
      </p>

      <div className="grid grid-cols-2 gap-8 mt-10">
        <div>
          <div style={{ borderBottom: "1px solid #161616", height: 34 }} />
          <p className="text-[10px] font-extrabold uppercase tracking-widest mt-1.5" style={{ color: MUTED }}>
            Customer approval &amp; date
          </p>
        </div>
        <div>
          <div style={{ borderBottom: "1px solid #161616", height: 34 }} />
          <p className="text-[10px] font-extrabold uppercase tracking-widest mt-1.5" style={{ color: MUTED }}>
            Service adviser
          </p>
        </div>
      </div>
    </>
  )

  return <DocShell form={form} sheet={sheet} onReset={reset} />
}
