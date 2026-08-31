"use client"

/**
 * A worked sample of a Philippine official receipt as it must look *now* -
 * that is, as a supplementary document under RR 7-2024 rather than as evidence
 * of the sale.
 *
 * Rendered rather than screenshotted so it stays readable on a phone and
 * legible to search engines, same as SampleInvoice.tsx in the sales invoice
 * sample page.
 *
 * Everything on it is fictional and labelled as such: the business names are
 * invented and both TINs are 000-prefixed placeholders, so nothing here can be
 * mistaken for a real issued document or a real taxpayer.
 *
 * The input-tax band is the point of the whole figure, not decoration. RR
 * 7-2024 requires a supplementary official receipt to carry that exact
 * statement; without it the document is not a valid supplementary receipt and
 * may draw a penalty. It is rendered as a hard black band for that reason -
 * a reader skimming the image should not be able to miss it.
 */

const INK = "#161616"
const BLUE = "#2f6bff"
const CREAM = "#fbf7f0"

function Field({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] uppercase tracking-wider" style={{ color: "#9a948b" }}>{label}</span>
      <span className={`text-[13px] font-semibold ${mono ? "tabular-nums" : ""}`} style={{ color: INK }}>{value}</span>
    </div>
  )
}

export default function SampleReceipt() {
  return (
    <figure className="my-8">
      <div className="rounded-[18px] border-2 overflow-hidden bg-white" style={{ borderColor: INK, boxShadow: `6px 6px 0 ${BLUE}` }}>

        {/* label band - makes it unmistakable that this is not a real document */}
        <div className="px-5 py-2 text-[11px] font-extrabold uppercase tracking-widest text-white" style={{ background: INK }}>
          Sample only · fictional business · placeholder TINs
        </div>

        <div className="p-5 sm:p-7">
          {/* issuer block */}
          <div className="flex flex-wrap gap-4 justify-between items-start pb-5 mb-5" style={{ borderBottom: `2px solid ${INK}` }}>
            <div>
              <p className="text-[15px] font-extrabold" style={{ color: INK }}>Malaya Wellness Spa</p>
              <p className="text-[12px] leading-relaxed" style={{ color: "#54514c" }}>
                214 Rizal Avenue, Brgy. San Roque<br />
                Marikina City, Metro Manila
              </p>
              <p className="text-[12px] mt-1 tabular-nums" style={{ color: "#54514c" }}>
                TIN 000-000-000-00000 · VAT-registered
              </p>
            </div>
            <div className="text-right">
              <p className="text-[13px] font-extrabold uppercase tracking-wider" style={{ color: INK }}>
                Official Receipt
              </p>
              <p className="text-[11px] uppercase tracking-wider mt-1" style={{ color: "#9a948b" }}>
                Supplementary document
              </p>
              <p className="text-[13px] font-extrabold tabular-nums mt-2" style={{ color: BLUE }}>No. 004821</p>
            </div>
          </div>

          {/* payer + date */}
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <Field label="Received from" value="Cordillera Travel Corp." />
            <Field label="Date" value="14 August 2026" mono />
            <Field label="Address" value="8F Sunrise Tower, Ortigas Center, Pasig City" />
            <Field label="TIN" value="000-000-000-00000" mono />
          </div>

          {/* the sum */}
          <div className="rounded-[12px] p-4 mb-5" style={{ background: CREAM, border: `1px solid rgba(22,22,22,.15)` }}>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] uppercase tracking-wider" style={{ color: "#9a948b" }}>The sum of</span>
                <span className="text-[13px] font-semibold" style={{ color: INK }}>
                  Twenty-eight thousand five hundred sixty pesos only
                </span>
              </div>
              <div className="flex justify-between items-end pt-3" style={{ borderTop: "1px solid rgba(22,22,22,.15)" }}>
                <span className="text-[13px] font-semibold" style={{ color: "#54514c" }}>Amount received</span>
                <span className="text-[18px] font-extrabold tabular-nums" style={{ color: INK }}>₱28,560.00</span>
              </div>
            </div>
          </div>

          {/* what it settles - the link back to the invoice is the important part */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <Field label="In payment of" value="Sales Invoice No. 001937" />
            <Field label="Mode of payment" value="Bank transfer" />
          </div>

          {/* the statement RR 7-2024 requires. deliberately impossible to miss. */}
          <div
            className="rounded-[10px] px-4 py-3 text-center"
            style={{ background: INK }}
          >
            <p className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wider text-white leading-snug">
              This document is not valid for claim of input tax
            </p>
          </div>

          {/* signature + printer block */}
          <div className="flex flex-wrap gap-6 justify-between items-end mt-6 pt-5" style={{ borderTop: "1px solid rgba(22,22,22,.15)" }}>
            <div>
              <div style={{ width: 180, borderBottom: `1px solid ${INK}` }} />
              <p className="text-[11px] mt-1" style={{ color: "#9a948b" }}>Authorised signature</p>
            </div>
            <p className="text-[10px] leading-relaxed text-right" style={{ color: "#9a948b" }}>
              Printer&apos;s accreditation and ATP details<br />
              appear here on a printed booklet
            </p>
          </div>
        </div>
      </div>
      <figcaption className="text-xs mt-3 leading-relaxed" style={{ color: "#8a857e" }}>
        An official receipt issued the way RR 7-2024 requires: as a supplementary document, settling a named
        invoice, carrying the input-tax statement. Business names are invented and both TINs are placeholders.
        Your printer&apos;s layout will differ; the elements it carries should not.
      </figcaption>
    </figure>
  )
}
