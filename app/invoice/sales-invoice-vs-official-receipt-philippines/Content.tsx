"use client"

import Link from "next/link"
import Footer from "@/components/Footer"
import InternalLinks from "@/components/InternalLinks"
import {
  Animate, ArticleHero, AH2, AP, Bullets, DataTable, FAQList, Cite, Caution,
} from "@/components/article/ArticleKit"
import { FAQS } from "./faqs"

const INK = "#161616"
const AMBER = "#ff9e2c"
const REGISTER_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=INVOICE&plan=FREE`

export default function Content() {
  return (
    <main className="bg-white">
      <ArticleHero
        badge="Philippines · BIR compliance"
        title={<>Sales invoice vs official receipt in the Philippines</>}
        intro="The rule changed in 2024 and a lot of businesses are still working from the old one. Here is what the invoice is for now, what the official receipt is still good for, and where the expensive mistakes are."
      />

      <article className="max-w-3xl mx-auto px-6 py-16">
        <Animate>
          <AH2>The short answer</AH2>
          <AP>
            The <strong>invoice is now the primary document for a sale</strong> — whether you sold goods or rendered a
            service. The <strong>official receipt was demoted to a supplementary document</strong>. The consequence that
            actually costs money: an official receipt is no longer valid support for your buyer to claim input VAT.
          </AP>
          <AP>
            If you run a service business and have spent years issuing official receipts, that is the habit to change.
            Services are documented with an invoice now, the same as goods.
          </AP>

          <AH2>What changed, and when</AH2>
          <AP>
            The change came from the <strong>Ease of Paying Taxes Act, Republic Act No. 11976</strong>, implemented by
            the BIR through a short stack of issuances:
          </AP>
          <DataTable
            head={["Issuance", "What it did"]}
            rows={[
              [<><strong>RA 11976</strong><br /><span className="text-xs">Ease of Paying Taxes Act</span></>, <span className="font-medium text-left block">Made the invoice the primary document for both goods and services</span>],
              [<><strong>RR No. 7-2024</strong><br /><span className="text-xs">effective 27 April 2024</span></>, <span className="font-medium text-left block">Implementing regulations, including the required contents of an invoice</span>],
              [<><strong>RR No. 11-2024</strong></>, <span className="font-medium text-left block">Amended RR 7-2024 and set the transitional rules for unused receipts</span>],
              [<><strong>RMC No. 77-2024</strong></>, <span className="font-medium text-left block">Clarified how the invoicing requirements are applied in practice</span>],
            ]}
          />

          <AH2>What an official receipt is still good for</AH2>
          <AP>
            It is not worthless — it is just no longer the document that proves the sale for tax purposes. An official
            receipt now sits in the same category as a delivery receipt or a collection receipt: a supplementary
            document you may issue alongside the invoice if it suits how you work. What one has to look like in that
            role, including the input-tax statement it must carry, is covered on{" "}
            <Link href="/invoice/official-receipt-philippines" className="underline">official receipt</Link>.
          </AP>
          <AP>
            What it cannot do is support an input VAT claim. If your customer is VAT-registered and you hand them only
            an official receipt, you have given them a piece of paper they cannot use, and they will come back for the
            invoice.
          </AP>

          <AH2>When you are required to issue an invoice</AH2>
          <DataTable
            head={["If you are…", "You must issue an invoice"]}
            rows={[
              ["VAT-registered", "For every sale, regardless of amount"],
              ["Not VAT-registered", "For sales of ₱500 or more"],
              ["Either, and the buyer asks", "Always, whatever the amount"],
            ]}
            note="Because a buyer can request one on any sale, most small shops find it simpler to issue an invoice every time rather than judging the threshold at the counter."
          />

          <AH2>What has to be on the invoice</AH2>
          <AP>Section 3(B) of RR 7-2024 sets the required contents. An invoice missing these is not a valid one:</AP>
          <Bullets items={[
            <>A statement that the seller is <strong>VAT-registered</strong>, with the seller&apos;s <strong>TIN and branch code</strong>.</>,
            <>The <strong>total amount payable</strong>, with the <strong>VAT shown separately</strong> from the net amount.</>,
            <>The <strong>date of the transaction</strong>, the <strong>quantity</strong> and the <strong>unit cost</strong>.</>,
            <>A <strong>description of the goods</strong> or the <strong>nature of the service</strong>.</>,
            <>For sales of <strong>₱1,000 or more to a VAT-registered buyer</strong>: the buyer&apos;s <strong>name, address and TIN</strong>.</>,
            <>Where it applies, the transaction marked as a <strong>VAT-exempt sale</strong> or a <strong>zero-rated sale</strong>.</>,
          ]} />

          <AH2>What happened to unused official receipts</AH2>
          <AP>
            The transition ran through 2024. Unused official receipts could be converted by striking through the words
            &ldquo;Official Receipt&rdquo; and stamping &ldquo;Invoice&rdquo;. Any official receipt kept in use as a
            supplementary document had to carry the stamp{" "}
            <strong>&ldquo;THIS DOCUMENT IS NOT VALID FOR CLAIM OF INPUT TAX&rdquo;</strong>.
          </AP>
          <AP>
            Those windows closed in 2024. If you are still holding unconverted booklets, do not simply start issuing
            from them — ask your Revenue District Office what to do with the remaining stock.
          </AP>

          <AH2>The mistake that costs the most</AH2>
          <AP>
            A non-VAT taxpayer issuing a <strong>VAT invoice</strong>. Under the Tax Code that makes you liable for the
            VAT under Section 106 or 108 on that transaction, on top of any percentage tax you already owe, plus a{" "}
            <strong>50 percent surcharge</strong>.
          </AP>
          <AP>
            It is almost never deliberate. It happens when someone reuses a template from a previous business, orders a
            printed booklet with the wrong wording, or copies an invoice format found online without checking which
            registration it was written for.
          </AP>

          <Caution>
            <strong>This is general information, not tax advice.</strong> BIR rules change, and how they apply depends on
            your registration type and your Revenue District Office. This page reflects the issuances cited below as of
            August 2026 — check the current position with the BIR or your accountant before you act on any of it,
            particularly before printing documents or filing.
          </Caution>

          <Cite>
            Sources: Republic Act No. 11976 (Ease of Paying Taxes Act); BIR Revenue Regulations No. 7-2024, effective
            27 April 2024, including Section 3(B) on the required contents of an invoice; Revenue Regulations No.
            11-2024 amending the transitional provisions; Revenue Memorandum Circular No. 77-2024. Summarised from
            published Philippine tax-practitioner guidance rather than read from the issuances directly, so treat the
            regulation numbers as the thing to look up, not as a substitute for reading them.
          </Cite>

          <AH2>Getting the document right, every time</AH2>
          <AP>
            Most invoicing errors are consistency errors rather than knowledge errors: a missing TIN, a skipped number
            in the sequence, VAT bundled into the total instead of shown separately. Those are exactly the things
            software is good at not forgetting.
          </AP>
          <Bullets items={[
            "Invoice numbers issued in sequence, so there are no gaps to explain later.",
            "The same required fields on every document, because the template does not change when you are busy.",
            "VAT shown separately from the net amount rather than folded into one figure.",
            "A running record of what was issued to whom, and what has actually been paid.",
          ]} />
          <AP>
            Smapey Invoice does that part. It does not register your business, secure your Authority to Print, or
            accredit anything with your RDO — those stay yours.
          </AP>

          <div className="my-10 rounded-[22px] border-2 p-7 text-center" style={{ borderColor: INK, background: "#fbf7f0", boxShadow: `6px 6px 0 ${AMBER}` }}>
            <h3 className="text-xl font-extrabold mb-2" style={{ color: INK }}>Create invoices without the guesswork</h3>
            <p className="text-sm mb-5" style={{ color: "#54514c" }}>Free plan, no credit card. Set your details once and every invoice carries them.</p>
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
        currentPath="/invoice/sales-invoice-vs-official-receipt-philippines"
      />
      <Footer />
    </main>
  )
}
