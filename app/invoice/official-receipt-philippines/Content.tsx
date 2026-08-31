"use client"

import Link from "next/link"
import Footer from "@/components/Footer"
import InternalLinks from "@/components/InternalLinks"
import {
  Animate, ArticleHero, AH2, AP, Bullets, DataTable, FAQList, Cite, Caution,
} from "@/components/article/ArticleKit"
import SampleReceipt from "./SampleReceipt"
import { FAQS } from "./faqs"

const INK = "#161616"
const AMBER = "#ff9e2c"
const REGISTER_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=INVOICE&plan=FREE`

export default function Content() {
  return (
    <main className="bg-white">
      <ArticleHero
        badge="Philippines · BIR compliance"
        title={<>Official receipt</>}
        intro="Most of what you will read about Philippine official receipts is out of date. Since April 2024 the official receipt is no longer the document that proves your sale — the invoice is. The official receipt survives, but as something narrower, and issuing one the old way can cost your customer their input VAT and cost you a penalty. Here is what it is now, what a correct one looks like, and when you would still write one."
      />

      <article className="max-w-3xl mx-auto px-6 py-16">
        <Animate>

          <AH2>What an official receipt is now</AH2>
          <AP>
            Revenue Regulations No. 7-2024, issued 11 April 2024, implemented the Ease of Paying Taxes Act
            (RA 11976). It made one change that undoes most of what was previously true: <strong>the invoice became
            the primary evidence of a sale for goods and for services alike.</strong> Before this, sellers of goods
            issued a sales invoice and sellers of services issued an official receipt. That split is gone.
          </AP>
          <AP>
            The official receipt was not abolished. It was demoted. It now sits in the category of{" "}
            <strong>supplementary documents</strong> — alongside the collection receipt and the payment receipt —
            whose job is to evidence that money changed hands, not that a sale occurred.
          </AP>
          <DataTable
            head={["Document", "What it now evidences"]}
            rows={[
              [<><strong>Invoice</strong></>, "The sale itself. The primary document, for goods and services."],
              [<><strong>Official receipt</strong></>, "Proof of payment only. Supplementary."],
              [<><strong>Collection receipt</strong></>, "Proof that payment was collected. Supplementary."],
              [<><strong>Acknowledgement receipt</strong></>, "Proof something was received. Not a BIR sales document."],
            ]}
            note="Positions under RR 7-2024, as amended by RR 11-2024."
          />
          <AP>
            The practical consequence is the one that catches people: a supplementary document{" "}
            <strong>cannot support an input VAT claim.</strong> If your customer is VAT-registered and you hand them
            an official receipt instead of an invoice, you have given them paper they cannot use, and they will come
            back for the invoice. The full comparison is on{" "}
            <Link href="/invoice/sales-invoice-vs-official-receipt-philippines" className="underline">
              sales invoice vs official receipt
            </Link>.
          </AP>

          <AH2>What a correct official receipt looks like now</AH2>
          <AP>
            This is an official receipt issued the way the current rules require — as a supplementary document that
            settles a named invoice. Note the black band; the next section is entirely about it.
          </AP>

          <SampleReceipt />

          <AH2>The statement that makes it valid</AH2>
          <AP>
            This is the single most important thing on the page, and the detail most published samples still omit
            because they predate the change.
          </AP>
          <Caution>
            An official receipt used as a supplementary document must carry the statement{" "}
            <strong>&ldquo;THIS DOCUMENT IS NOT VALID FOR CLAIM OF INPUT TAX&rdquo;</strong> on its face. Without it,
            the document is not a valid supplementary receipt, and the omission can attract a penalty. If you are
            working through a booklet printed before the change, the phrase has to be stamped on.
          </Caution>
          <AP>
            It reads like a disclaimer and it is easy to treat as small print, but it is doing real work. It is the
            marker that tells a BIR examiner — and your customer&apos;s accountant — that this piece of paper is
            evidence of payment and nothing more. A supplementary receipt without it is claiming to be something it
            is not.
          </AP>
          <Cite>
            Source: Revenue Regulations No. 7-2024 (issued 11 April 2024), implementing RA 11976, the Ease of Paying
            Taxes Act, as amended by RR 11-2024. Verify the current text against the BIR&apos;s own issuance before
            relying on it for a filing decision, and take a professional opinion for anything consequential — this
            page is written for orientation, not as tax advice. Last checked 31 August 2026.
          </Cite>

          <AH2>When you would still issue one</AH2>
          <AP>
            Given all of the above, it is fair to ask why you would write an official receipt at all. There are a few
            real reasons.
          </AP>
          <Bullets items={[
            <><strong>You have unused booklets.</strong> Unused or unissued official receipts may still be used as supplementary documents until the stock is consumed, provided the input-tax statement is stamped on them. You do not have to destroy them.</>,
            <><strong>Your customer asks for one.</strong> Plenty of Philippine businesses still run internal processes that expect a receipt against a payment, particularly for reimbursements and liquidations. Issuing one alongside the invoice is fine.</>,
            <><strong>Payment arrives separately from the sale.</strong> If you invoiced in June and were paid in August, a receipt at the point of payment is a genuinely useful record for both sides.</>,
            <><strong>Never instead of the invoice.</strong> That is the one case that is not allowed, and it is the mistake that costs the most.</>,
          ]} />

          <AH2>Official receipt, collection receipt, acknowledgement receipt</AH2>
          <AP>
            These three get used interchangeably in conversation and they are not the same thing. The distinction
            matters when someone asks you for a specific one.
          </AP>
          <DataTable
            head={["Document", "When it is issued"]}
            rows={[
              ["Invoice", "When the sale is made — the order is taken or the service is rendered."],
              ["Collection receipt", "When the payment is actually collected. Optional, or on the customer's request."],
              ["Official receipt", "As proof of payment, in the same supplementary role as a collection receipt."],
              ["Acknowledgement receipt", "To record that something was received. Not a BIR sales document at all."],
            ]}
          />
          <AP>
            In current practice the official receipt and the collection receipt occupy substantially the same ground:
            both are supplementary, both evidence payment rather than the sale, and both need the input-tax statement
            when used that way. An acknowledgement receipt is a different animal — it is a general business record,
            not part of the BIR invoicing framework, and it should never be offered to a customer who is asking for a
            document to support a claim.
          </AP>

          <AH2>If you are not VAT-registered</AH2>
          <AP>
            The document hierarchy is the same. A non-VAT business issues a non-VAT invoice as its primary document,
            and may issue a non-VAT official receipt as a supplementary one, carrying the same statement.
          </AP>
          <AP>
            What changes is what goes on the face of it: there is no 12% VAT line to separate out, and the invoice
            should be marked as non-VAT so nobody mistakes the total for a VAT-inclusive figure. A filled example of
            the non-VAT variant is on the{" "}
            <Link href="/invoice/sales-invoice-sample-philippines" className="underline">sales invoice sample</Link>{" "}
            page.
          </AP>

          <AH2>The three mistakes that come up most</AH2>
          <Bullets items={[
            <><strong>Issuing an official receipt instead of an invoice for a service.</strong> The most common one, because for years it was correct. It is not any more, and it leaves your VAT-registered customer unable to claim.</>,
            <><strong>Using an old booklet without stamping the statement.</strong> The stock is still usable; the omission is what creates the exposure.</>,
            <><strong>Treating an acknowledgement receipt as an official receipt.</strong> Different document, different purpose, no standing in the invoicing framework.</>,
          ]} />

          <AH2>Issuing these without a booklet</AH2>
          <AP>
            The reason this is confusing is that it is genuinely new, and the reason it stays confusing is that most
            businesses are reconstructing which document went out from a stack of carbon copies. Software makes the
            question disappear: the invoice is the record, the payment is attached to it, and what you hand the
            customer follows from that rather than from which booklet was nearest.
          </AP>
          <Bullets items={[
            "An invoice for every sale, numbered in sequence, with the VAT separated out.",
            "Payments recorded against the invoice they settle, so a receipt always references a real document.",
            "Who has paid, who has not, and by what — cash, GCash, Maya or bank transfer.",
            "A record you can hand an examiner without reconstructing it from memory.",
          ]} />

          <div className="my-8 flex flex-wrap gap-3 items-center">
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
        currentPath="/invoice/official-receipt-philippines"
      />
      <Footer />
    </main>
  )
}
