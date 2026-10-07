"use client"

/**
 * A worked sample of a Philippine VAT sales invoice, rendered rather than
 * screenshotted so it stays readable on a phone and legible to search engines.
 *
 * Everything on it is fictional and labelled as such: the business names are
 * invented and both TINs are 000-prefixed placeholders, so nothing here can be
 * mistaken for a real issued document or a real taxpayer.
 *
 * The arithmetic is real and should stay that way - the page walks through it:
 *   20 x 285.00 = 5,700.00
 *   10 x 248.00 = 2,480.00
 *    5 x 920.00 = 4,600.00
 *   net 12,780.00 + 12% VAT 1,533.60 = 14,313.60
 */

const INK = "#161616"
const BLUE = "#2f6bff"
const CREAM = "#fbf7f0"

const LINES: { qty: string; desc: string; unit: string; amount: string }[] = [
  { qty: "20", desc: "Portland cement, 40 kg", unit: "285.00", amount: "5,700.00" },
  { qty: "10", desc: "Steel bar, 10 mm x 6 m", unit: "248.00", amount: "2,480.00" },
  { qty: "5", desc: "Plywood, 3/4 in. marine", unit: "920.00", amount: "4,600.00" },
]

function Field({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] uppercase tracking-wider" style={{ color: "#9a948b" }}>{label}</span>
      <span className={`text-[13px] font-semibold ${mono ? "tabular-nums" : ""}`} style={{ color: INK }}>{value}</span>
    </div>
  )
}

export default function SampleInvoice() {
  return (
    <figure className="my-8">
      <div className="rounded-[18px] border-2 overflow-hidden bg-white" style={{ borderColor: INK, boxShadow: `6px 6px 0 ${BLUE}` }}>

        {/* label band - makes it unmistakable that this is not a real document */}
        <div className="px-5 py-2 text-[11px] font-extrabold uppercase tracking-widest text-white" style={{ background: INK }}>
          Sample only · fictional business · placeholder TINs
        </div>

        <div className="p-5 sm:p-7">
          {/* seller block */}
          <div className="flex flex-wrap gap-4 justify-between items-start pb-5 mb-5" style={{ borderBottom: `2px solid ${INK}` }}>
            <div>
              <p className="text-lg font-extrabold leading-tight" style={{ color: INK }}>Malaya Hardware Supply</p>
              <p className="text-xs mt-1 leading-relaxed" style={{ color: "#54514c" }}>
                123 Rizal Street, Barangay San Roque<br />
                Quezon City, Metro Manila
              </p>
              <p className="text-xs mt-2 font-bold" style={{ color: INK }}>
                VAT&#8209;REGISTERED &nbsp;·&nbsp; TIN 000&#8209;000&#8209;000&#8209;00000
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-extrabold uppercase tracking-widest" style={{ color: BLUE }}>Sales Invoice</p>
              <p className="text-xs mt-2 tabular-nums" style={{ color: "#54514c" }}>No. <span className="font-bold" style={{ color: INK }}>001234</span></p>
              <p className="text-xs tabular-nums" style={{ color: "#54514c" }}>Date <span className="font-bold" style={{ color: INK }}>15 Aug 2026</span></p>
            </div>
          </div>

          {/* buyer block */}
          <div className="grid sm:grid-cols-3 gap-4 pb-5 mb-5" style={{ borderBottom: `2px solid ${INK}` }}>
            <Field label="Sold to" value="Northgate Builders Inc." />
            <Field label="Address" value="45 Katipunan Ave., Quezon City" />
            <Field label="TIN" value="000-000-000-00001" mono />
          </div>

          {/* line items */}
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]" style={{ minWidth: 420 }}>
              <thead>
                <tr style={{ background: CREAM }}>
                  <th className="px-3 py-2 text-left font-extrabold" style={{ color: INK }}>Qty</th>
                  <th className="px-3 py-2 text-left font-extrabold" style={{ color: INK }}>Description</th>
                  <th className="px-3 py-2 text-right font-extrabold" style={{ color: INK }}>Unit cost</th>
                  <th className="px-3 py-2 text-right font-extrabold" style={{ color: INK }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {LINES.map((l) => (
                  <tr key={l.desc} style={{ borderBottom: "1px solid rgba(22,22,22,.12)" }}>
                    <td className="px-3 py-2.5 tabular-nums" style={{ color: "#54514c" }}>{l.qty}</td>
                    <td className="px-3 py-2.5" style={{ color: "#54514c" }}>{l.desc}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums" style={{ color: "#54514c" }}>{l.unit}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums font-semibold" style={{ color: INK }}>{l.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* totals - VAT shown separately, which is the part the regulation requires */}
          <div className="flex justify-end mt-5">
            <div className="w-full sm:w-72 flex flex-col gap-1.5">
              <div className="flex justify-between text-[13px]">
                <span style={{ color: "#54514c" }}>VATable sales</span>
                <span className="tabular-nums font-semibold" style={{ color: INK }}>₱12,780.00</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span style={{ color: "#54514c" }}>VAT (12%)</span>
                <span className="tabular-nums font-semibold" style={{ color: INK }}>₱1,533.60</span>
              </div>
              <div className="flex justify-between text-[15px] pt-2 mt-1" style={{ borderTop: `2px solid ${INK}` }}>
                <span className="font-extrabold" style={{ color: INK }}>Total amount due</span>
                <span className="tabular-nums font-extrabold" style={{ color: INK }}>₱14,313.60</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="text-xs mt-3 leading-relaxed" style={{ color: "#8a857e" }}>
        A VAT sales invoice with every required element filled in. Business names are invented and both TINs are
        placeholders. Your printer&apos;s layout will differ; the elements it carries should not.
      </figcaption>
    </figure>
  )
}
