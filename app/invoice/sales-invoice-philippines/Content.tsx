"use client"

import Link from "next/link"
import Footer from "@/components/Footer"
import InternalLinks from "@/components/InternalLinks"
import {
  Animate, ArticleHero, AH2, AP, Bullets, DataTable, FAQList, Cite, Caution,
} from "@/components/article/ArticleKit"
import { FAQS } from "./faqs"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const REGISTER_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=INVOICE&plan=FREE`

function SpokeLink({ href, title, blurb }: { href: string; title: string; blurb: string }) {
  return (
    <Link href={href} className="block rounded-[16px] border-2 bg-white p-5 transition-transform hover:-translate-y-0.5" style={{ borderColor: INK, boxShadow: `5px 5px 0 ${BLUE}` }}>
      <p className="font-extrabold text-sm mb-1" style={{ color: INK }}>{title} →</p>
      <p className="text-sm leading-relaxed" style={{ color: "#54514c" }}>{blurb}</p>
    </Link>
  )
}

export default function Content() {
  return (
    <main className="bg-white">
      <ArticleHero
        badge="Philippines · The whole picture"
        title={<>Sales invoice, explained for Philippine businesses</>}
        intro="What a sales invoice is, why it now covers services too, why the words in front of it — cash, charge, credit, billing — change nothing, how to compute the VAT, and what separates a valid invoice from a piece of paper."
      />

      <article className="max-w-3xl mx-auto px-6 py-16">
        <Animate>
          <AH2>What a sales invoice is</AH2>
          <AP>
            A sales invoice is the document that records a sale. Since 2024 it is also the{" "}
            <strong>primary evidence of that sale for tax purposes</strong> — for goods and for services alike. It
            names the seller and the buyer, describes what was sold, shows the amounts with VAT separated out where it
            applies, and carries a sequential number and a date.
          </AP>
          <AP>
            Two people need it. Your customer needs it to claim input VAT. You need it as the record that the sale
            happened at all.
          </AP>

          <AH2>Cash, charge, credit, billing, service — why none of it changes anything</AH2>
          <AP>
            This is the question that sends most people looking, and the answer is simpler than the search results
            suggest. <strong>The word in front describes the transaction, not a different legal document.</strong>
          </AP>
          <DataTable
            head={["What it is called", "What the name is telling you"]}
            rows={[
              ["Cash invoice", <span className="font-medium text-left block">Paid on the spot</span>],
              ["Charge invoice", <span className="font-medium text-left block">Goods or services delivered now, paid later</span>],
              ["Credit invoice", <span className="font-medium text-left block">The same thing, different house style</span>],
              ["Billing invoice", <span className="font-medium text-left block">Usually issued as work progresses or on a cycle</span>],
              ["Service invoice", <span className="font-medium text-left block">The sale was a service rather than goods</span>],
              ["Sales invoice", <span className="font-medium text-left block">The general term for all of the above</span>],
            ]}
          />
          <AP>
            RR 7-2024 is explicit about this. Changing a document&apos;s heading to Invoice, Cash Invoice, Charge
            Invoice, Credit Invoice, Billing Invoice &ldquo;or any name describing the transaction&rdquo; is treated as
            a <strong>minor change that does not require notifying your Revenue District Office</strong>. If the
            regulation considers the wording minor, so should you. What matters is the contents, not the heading.
          </AP>

          <AH2>Valid invoice, or supplementary document?</AH2>
          <AP>
            That is the distinction worth internalising, because it decides whether your customer can claim input VAT.
            An invoice is valid when it carries the contents RR 7-2024 requires:
          </AP>
          <Bullets items={[
            <>The <strong>VAT-registered</strong> statement, with your <strong>TIN and branch code</strong>.</>,
            <>The <strong>total amount payable</strong>, with <strong>VAT shown separately</strong> from the net.</>,
            <>The <strong>date</strong>, the <strong>quantity</strong> and the <strong>unit cost</strong>.</>,
            <>A <strong>description of the goods</strong> or the <strong>nature of the service</strong>.</>,
            <>For sales of <strong>₱1,000 or more to a VAT-registered buyer</strong>, the buyer&apos;s <strong>name, address and TIN</strong>.</>,
          ]} />
          <AP>
            Miss those and what you have issued is a <strong>supplementary document</strong>, whatever the heading says
            — and a supplementary document cannot support an input VAT claim. A manual or looseleaf official receipt
            issued without a stamped &ldquo;Invoice&rdquo; falls squarely in that category.
          </AP>

          <AH2>VAT, and how to compute it</AH2>
          <AP>
            VAT is <strong>12% of the net selling price</strong>, and the regulation wants it visible on its own line
            rather than folded into a single figure.
          </AP>
          <DataTable
            head={["Working forwards, from net prices", "Amount"]}
            rows={[
              ["Line items, totalled (VATable sales)", "₱12,780.00"],
              ["VAT at 12%", "₱1,533.60"],
              ["Total amount due", "₱14,313.60"],
            ]}
            note="If your prices are quoted VAT-inclusive, work backwards instead: divide the gross by 1.12 to get the net, and the difference is the VAT."
          />
          <AP>
            If you are <strong>not VAT-registered</strong>, there is no VAT line and your invoice must not describe you
            as VAT-registered. Getting that wrong is expensive: a non-VAT taxpayer who issues a VAT invoice becomes
            liable for the VAT on that transaction under Section 106 or 108, on top of any percentage tax already owed,
            plus a <strong>50 percent surcharge</strong>.
          </AP>

          <AH2>When you have to issue one</AH2>
          <DataTable
            head={["If you are…", "You must issue an invoice"]}
            rows={[
              ["VAT-registered", "For every sale, regardless of amount"],
              ["Not VAT-registered", "For sales of ₱500 or more"],
              ["Either, and the buyer asks", "Always, whatever the amount"],
            ]}
          />

          <AH2>Where to go from here</AH2>
          <AP>
            Two questions come up straight after this one, and each has its own page:
          </AP>
          <div className="grid sm:grid-cols-2 gap-4 my-6">
            <SpokeLink
              href="/invoice/sales-invoice-vs-official-receipt-philippines"
              title="Sales invoice vs official receipt"
              blurb="What the Ease of Paying Taxes Act changed in 2024, what the official receipt is still good for, and the mistake with a surcharge attached."
            />
            <SpokeLink
              href="/invoice/sales-invoice-sample-philippines"
              title="Sales invoice sample"
              blurb="A filled-in VAT invoice with every required element, and a field-by-field walkthrough of how to fill one up."
            />
          </div>

          <Caution>
            <strong>This is general information, not tax advice.</strong> BIR rules change and how they apply depends on
            your registration type and your Revenue District Office. This page reflects the issuances cited below as of
            August 2026. Confirm with the BIR or your accountant before you commission printed invoices, reconfigure a
            POS or e-invoicing system, or file anything.
          </Caution>

          <Cite>
            Sources: Republic Act No. 11976 (Ease of Paying Taxes Act); BIR Revenue Regulations No. 7-2024, effective
            27 April 2024, including Section 3(B) on the required contents of an invoice and its treatment of document
            renaming as a minor change; Revenue Regulations No. 11-2024 on transitional provisions and the conversion
            of Billing Statements; Revenue Memorandum Circular No. 77-2024. Summarised from published Philippine
            tax-practitioner guidance rather than read from the issuances directly, so treat the regulation numbers as
            the thing to look up.
          </Cite>

          <AH2>Issuing them without the arithmetic</AH2>
          <AP>
            Nothing above is difficult. It is just relentless: the same required fields, the VAT computed and shown
            separately, and a number that increments without gaps, on every document, on the busiest day of the month.
            That is the part worth handing to software.
          </AP>
          <AP>
            Smapey Invoice does that. It does not register your business, secure your Authority to Print, or accredit a
            system with your RDO — those stay yours, and they come first.
          </AP>

          <div className="my-10 rounded-[22px] border-2 p-7 text-center" style={{ borderColor: INK, background: "#fbf7f0", boxShadow: `6px 6px 0 ${AMBER}` }}>
            <h3 className="text-xl font-extrabold mb-2" style={{ color: INK }}>Every invoice, the same every time</h3>
            <p className="text-sm mb-5" style={{ color: "#54514c" }}>Free plan, no credit card. Set your business details once and stop re-typing them.</p>
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
        currentPath="/invoice/sales-invoice-philippines"
      />
      <Footer />
    </main>
  )
}
