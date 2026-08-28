"use client"

import Link from "next/link"
import Footer from "@/components/Footer"
import InternalLinks from "@/components/InternalLinks"
import {
  Animate, ArticleHero, AH2, AP, Bullets, DataTable, FAQList, Cite, Caution,
} from "@/components/article/ArticleKit"
import SampleInvoice from "./SampleInvoice"
import { FAQS } from "./faqs"

const INK = "#161616"
const AMBER = "#ff9e2c"
const REGISTER_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=INVOICE&plan=FREE`

export default function Content() {
  return (
    <main className="bg-white">
      <ArticleHero
        badge="Philippines · Worked example"
        title={<>Sales invoice sample</>}
        intro="A filled-in Philippine VAT sales invoice, with every element the BIR requires, plus a field-by-field walkthrough of what goes where and the four mistakes that come up most often."
      />

      <article className="max-w-3xl mx-auto px-6 py-16">
        <Animate>
          <AH2>The sample</AH2>
          <AP>
            This is a complete VAT sales invoice for a hardware supplier selling to a construction company. Every
            element required by RR 7-2024 is on it. Work through it once and the rest of this page will make sense.
          </AP>

          <SampleInvoice />

          <AH2>What each part is doing</AH2>
          <AP>
            Nothing on that invoice is decorative. Each block is there because a regulation asks for it or because your
            customer&apos;s accountant will:
          </AP>
          <DataTable
            head={["On the invoice", "Why it has to be there"]}
            rows={[
              ["Business name and address", <span className="font-medium text-left block">Identifies who made the sale</span>],
              ["VAT-REGISTERED, TIN and branch code", <span className="font-medium text-left block">Required wording — it tells the buyer this invoice can support an input VAT claim</span>],
              ["Invoice number", <span className="font-medium text-left block">Must run in sequence with no gaps you cannot explain</span>],
              ["Date of transaction", <span className="font-medium text-left block">Fixes the period the sale belongs to</span>],
              ["Buyer name, address, TIN", <span className="font-medium text-left block">Required for sales of ₱1,000 or more to a VAT-registered buyer</span>],
              ["Quantity, description, unit cost", <span className="font-medium text-left block">Required detail — a lump-sum line is not enough</span>],
              ["VAT shown on its own line", <span className="font-medium text-left block">The regulation requires VAT separated from the net, not folded into one figure</span>],
            ]}
          />

          <AH2>Filling it up, line by line</AH2>
          <AP>
            Your own details at the top are normally pre-printed by the accredited printer. What you complete at the
            counter is everything below them.
          </AP>
          <Bullets items={[
            <><strong>Date and invoice number.</strong> The number is usually pre-printed and sequential. Never skip one, and never reuse one — a gap is the first thing an examiner asks about.</>,
            <><strong>Buyer&apos;s details.</strong> Name, address and TIN when the sale is ₱1,000 or more to a VAT-registered buyer. Ask at the counter; chasing it afterwards means re-issuing.</>,
            <><strong>One line per item.</strong> Quantity, a description someone else would recognise, and the unit cost. Multiply out to the amount.</>,
            <><strong>Total the lines.</strong> In the sample, ₱5,700.00 + ₱2,480.00 + ₱4,600.00 gives VATable sales of <strong>₱12,780.00</strong>.</>,
            <><strong>Compute VAT at 12%.</strong> 12% of ₱12,780.00 is <strong>₱1,533.60</strong>, written on its own line.</>,
            <><strong>Add the two.</strong> ₱12,780.00 + ₱1,533.60 = <strong>₱14,313.60</strong> as the amount due.</>,
          ]} />

          <AH2>If you are not VAT-registered</AH2>
          <AP>
            The same document, minus the tax. A non-VAT invoice shows one total with no VAT line, and it must not
            describe you as VAT-registered. The sample above would become a single amount due of ₱12,780.00 with the
            VAT-REGISTERED wording and the VAT row removed.
          </AP>
          <AP>
            This is the difference worth being pedantic about. A non-VAT taxpayer who issues a VAT invoice becomes
            liable for the VAT on that transaction under Section 106 or 108 of the Tax Code, on top of any percentage
            tax already owed, plus a <strong>50 percent surcharge</strong>. It usually happens by reusing a template
            from a business that was registered differently.
          </AP>

          <AH2>The four mistakes that come up most</AH2>
          <Bullets items={[
            <><strong>VAT folded into the total.</strong> One figure with &ldquo;VAT inclusive&rdquo; beside it does not satisfy a requirement to show the VAT separately.</>,
            <><strong>Gaps in the numbering.</strong> Spoiled invoices get cancelled and retained, not thrown away, so the sequence stays whole.</>,
            <><strong>Buyer&apos;s TIN left blank</strong> on a sale where it was required, which is what forces a re-issue later.</>,
            <><strong>A non-VAT business using VAT wording,</strong> the one on this list with a surcharge attached.</>,
          ]} />

          <AP>
            One more that is not a formatting error: still issuing an <strong>official receipt</strong> as the primary
            document for a service. That changed in 2024 — the invoice covers services now, and the official receipt no
            longer supports your customer&apos;s input VAT claim.{" "}
            <Link href="/invoice/sales-invoice-vs-official-receipt-philippines" style={{ color: "#2f6bff", textDecoration: "underline" }}>
              What changed, and what the official receipt is still good for
            </Link>.
          </AP>

          <Caution>
            <strong>This is general information, not tax advice.</strong> The sample is illustrative — the businesses are
            invented and the TINs are placeholders. BIR rules change and how they apply depends on your registration
            type and your Revenue District Office. This page reflects the issuances cited below as of August 2026.
            Confirm with the BIR or your accountant before you commission printed invoices or file anything.
          </Caution>

          <Cite>
            Sources: Republic Act No. 11976 (Ease of Paying Taxes Act); BIR Revenue Regulations No. 7-2024, effective
            27 April 2024, Section 3(B) on the required contents of an invoice; Revenue Regulations No. 11-2024;
            Revenue Memorandum Circular No. 77-2024. Summarised from published Philippine tax-practitioner guidance
            rather than read from the issuances directly, so treat the regulation numbers as the thing to look up.
          </Cite>

          <AH2>Issuing these without a booklet</AH2>
          <AP>
            The sample above is what a paper invoice looks like. If you issue more than a handful a week, the arithmetic
            and the sequence are worth handing to software: numbers that increment on their own, VAT computed and shown
            separately every time, and a record of what went to whom.
          </AP>
          <AP>
            Smapey Invoice does that. It does not register your business, secure your Authority to Print, or accredit a
            system with your RDO — those stay yours, and they come first.
          </AP>

          <div className="my-10 rounded-[22px] border-2 p-7 text-center" style={{ borderColor: INK, background: "#fbf7f0", boxShadow: `6px 6px 0 ${AMBER}` }}>
            <h3 className="text-xl font-extrabold mb-2" style={{ color: INK }}>Stop re-typing the same invoice</h3>
            <p className="text-sm mb-5" style={{ color: "#54514c" }}>Free plan, no credit card. Set your business details once and every invoice carries them.</p>
            <Link href={REGISTER_URL} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5" style={{ background: AMBER, color: INK, borderColor: INK, boxShadow: `4px 4px 0 ${INK}` }}>
              Start free
            </Link>
          </div>

          <AH2>Frequently asked questions</AH2>
          <FAQList faqs={FAQS} />
        </Animate>
      </article>

      <InternalLinks
        cluster="invoice"
        currentPath="/invoice/sales-invoice-sample-philippines"
      />
      <Footer />
    </main>
  )
}
