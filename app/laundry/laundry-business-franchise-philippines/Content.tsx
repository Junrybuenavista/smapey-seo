"use client"

import InternalLinks from "@/components/InternalLinks"
import Link from "next/link"
import {
  Navbar, Footer, CTA, Animate, ArticleHero,
  AH2, AP, Bullets, CostTable, FAQList, SoftwarePitch, Cite,
} from "../_shared"
import { FAQS } from "./faqs"

export default function Content() {
  return (
    <main className="bg-white">
      <Navbar />

      <ArticleHero
        badge="Philippines · Franchise & packages"
        title={<>Laundry franchises and business packages</>}
        intro="Three different things get sold under similar names in the Philippines: a franchise, an equipment package, and a turnkey setup. They cost different amounts, they oblige you to different things, and confusing them is how people sign a ten-year agreement believing they bought a delivery of machines. Here is how to tell them apart before you pay a deposit."
      />

      <article className="max-w-3xl mx-auto px-6 py-16">
        <Animate>

          <AH2>Three things, sold under similar names</AH2>
          <AP>
            &ldquo;Laundry business package&rdquo; is the phrase most people search, and it is the most ambiguous of
            the three. Establish which one you are being offered before anything else, because the differences are not
            details.
          </AP>
          <Bullets items={[
            <><strong>A franchise.</strong> You license someone else&apos;s brand and system. You get the name, the operating method, training and supplier relationships. You also accept ongoing obligations - normally a royalty, often a marketing contribution, usually a requirement to buy certain supplies through them, and a contract with a fixed term and territory. This is a long-term relationship, not a purchase.</>,
            <><strong>An equipment or business package.</strong> A supplier bundles machines, installation and sometimes basic training, at a package price. You own the equipment, you trade under your own name, and once it is installed and paid for you owe them nothing. This is a purchase, not a relationship.</>,
            <><strong>A turnkey setup.</strong> Somewhere between the two - a contractor fits out the whole shop and hands you the keys. Whether it carries ongoing obligations depends entirely on what you sign, which is exactly why you must read it.</>,
          ]} />
          <AP>
            The plainest question to ask a seller is this: <strong>after I have paid in full and the shop is running,
            what do I still owe you, and for how long?</strong> A package answers &ldquo;nothing&rdquo;. A franchise has a
            long answer. If the answer is vague, keep asking until it is not.
          </AP>

          <AH2>What Philippine law actually requires</AH2>
          <AP>
            This part surprises most people, and it is worth knowing before you read any franchise advice written for
            another country. <strong>The Philippines has no franchise disclosure law.</strong> There are no rules
            specifically regulating the offer or sale of a franchise, and a franchisor here is under no legal obligation
            to hand you a disclosure document before you sign. If you have read about the American Franchise Disclosure
            Document and are waiting to be given one, you may be waiting for something that is never coming.
          </AP>
          <AP>
            Two instruments do apply, and they are worth knowing by name because most franchise sales conversations
            will not raise them.
          </AP>
          <Bullets items={[
            <><strong>DTI Bureau Order No. 10-24</strong> advises a prospective franchisee to obtain Disclosure Information from the franchisor as part of due diligence, and sets out a list of roughly sixteen items to ask for - corporate existence, registration documents, financial requirements, franchise operations, a draft of the agreement. It is <em>advisory only</em>. It places no obligation on the franchisor and prescribes no format. But it means asking for these things is the officially recommended course, not an unusual demand, and a franchisor who treats the request as offensive has told you something.</>,
            <><strong>Executive Order No. 169, signed 12 May 2022,</strong> does impose real obligations, and it applies to you specifically - a laundry shop franchisee is almost certainly an MSME. It requires minimum terms and conditions in franchise agreements with MSME franchisees, and it makes registering that agreement with the DTI <em>the franchisor&apos;s</em> responsibility. Franchisors belonging to a duly registered franchise association register a standard agreement plus an undertaking that future MSME agreements will carry the minimum terms; franchisors who are not members must register each MSME agreement within thirty days of signing.</>,
          ]} />
          <AP>
            So the practical question to put to a franchisor is not &ldquo;can I see your disclosure document&rdquo;,
            which they need not have. It is <strong>&ldquo;are you a member of a registered franchise association, and
            will you be registering our agreement with the DTI under EO 169?&rdquo;</strong> That single question tells
            you whether they know their own obligations.
          </AP>
          <Cite>
            Sources: DTI Bureau Order No. 10-24 (advisory on franchise disclosure information); Executive Order No. 169,
            s. 2022, signed 12 May 2022 and published 16 May 2022. Note that EO 169 directed the DTI to issue
            implementing guidelines for the MSME Registry of Franchise Agreements, and public reporting as of this
            writing indicates those guidelines had not yet been promulgated - so registration practice in the field is
            uneven, and a franchisor&apos;s answer about it is more useful as a signal of diligence than as proof of
            anything. Confirm the current position before relying on it. Last checked 30 August 2026.
          </Cite>

          <AH2>What a franchise actually gets you</AH2>
          <AP>
            Franchises are frequently dismissed as an expensive shortcut, which is unfair. For the right person they
            solve real problems, and it is worth being clear about which ones.
          </AP>
          <Bullets items={[
            <><strong>A known name.</strong> In a business where customers hand over their clothes to a stranger, trust has real value, and a brand people recognise shortens the build-up period that empties so many bank accounts.</>,
            <><strong>A system that already works.</strong> Pricing, workflow, staffing, what to do when a garment is damaged. You are buying answers someone else paid to learn.</>,
            <><strong>Supplier relationships and equipment specification.</strong> Somebody has already made the machine decisions covered in the <Link href="/laundry/washing-machine-for-laundry-business" className="underline">machines guide</Link>, and got them roughly right.</>,
            <><strong>Site selection help</strong>, which in a business whose catchment is a few hundred metres is worth more than it sounds.</>,
          ]} />
          <AP>
            What it does not get you is a guarantee. A franchise in a poor location with an absent owner fails exactly
            like an independent one, and the fees keep being due while it does.
          </AP>

          <AH2>The ongoing costs people forget to ask about</AH2>
          <AP>
            The headline franchise fee is the number in the brochure. The numbers that decide whether the shop makes
            money are the recurring ones, and they are rarely on the first page.
          </AP>
          <Bullets items={[
            <><strong>Royalty.</strong> Usually a percentage of gross sales - note gross, not profit. You pay it in a bad month too.</>,
            <><strong>Marketing or advertising fund.</strong> Often a further percentage. Ask what it is actually spent on and whether you see any accounting for it.</>,
            <><strong>Required purchases.</strong> Many franchises require you to buy detergent, packaging or parts through them. Compare those prices against the open market before you sign, because the difference is a cost for the life of the agreement.</>,
            <><strong>Renewal fees</strong> at the end of the term, and what happens if you do not renew.</>,
            <><strong>Refurbishment obligations.</strong> Some agreements require you to refit to brand standard on a schedule, at your expense.</>,
          ]} />
          <AH2>What the published numbers say, and why they disagree</AH2>
          <AP>
            Here is something more useful than a price: <strong>the published figures for Philippine laundry franchises
            contradict each other so badly that no single number is meaningful.</strong> We went looking, and this is
            what is out there.
          </AP>
          <CostTable
            rows={[
              ["Franchise fee, commonly quoted", "₱100,000 – ₱500,000"],
              ["Total franchise investment, across sources", "₱250,000 – ₱3,000,000"],
              ["One named brand's package", "₱1,000,000 – ₱3,000,000"],
              ["Another named brand's package", "₱200,000 – ₱400,000"],
              ["Royalty and marketing fund", "Rarely published at all"],
            ]}
            note="Published ranges collected from Philippine franchise and lending guides, last checked 30 August 2026. Presented to show the spread, not as a price. None of these are quotations and none should be budgeted against."
          />
          <AP>
            A ten-times spread is not sloppy reporting, it is the actual state of the market: &ldquo;laundry
            franchise&rdquo; covers everything from a small drop-off counter to a full self-service laundromat, and the
            brands are not selling the same product. It also reflects who writes this content. Most of these guides are
            published by lenders and franchise consultancies with an interest in the number looking attainable, and one
            article we checked, titled as a guide to laundry <em>franchises</em>, contained no franchise fees at all —
            only general costs for an independent shop.
          </AP>
          <AP>
            <strong>The practical consequence:</strong> ignore every published figure, including the ones above, and
            get the total cost to open in writing from the specific franchisor, itemised, with the recurring fees
            stated separately. Royalty and marketing percentages in particular are almost never published, which is
            precisely why they belong at the top of your question list.
          </AP>

          <AH2>Franchise or independent</AH2>
          <AP>
            There is no general answer, but there is a way to decide that does not rely on how persuasive the sales
            presentation was.
          </AP>
          <CostTable
            rows={[
              ["Upfront cost", "Franchise higher"],
              ["Ongoing cost", "Franchise higher, and permanent"],
              ["Time to trust in the neighbourhood", "Franchise shorter"],
              ["Freedom to set your own prices", "Independent"],
              ["Freedom to choose suppliers", "Independent"],
              ["Support when something goes wrong", "Franchise, in principle - verify in practice"],
              ["Value if you sell the business later", "Depends on the brand and on transfer terms"],
            ]}
            note="General trade-offs, not a recommendation. Which side wins depends on the specific franchisor and on how much of the operating knowledge you already have."
          />
          <AP>
            A reasonable test: <strong>what are you actually buying that you could not work out yourself?</strong> If the
            answer is the brand and a working system and you have never run a shop, that may be worth a royalty. If the
            answer is mainly the equipment, you are paying franchise prices for a supplier relationship, and you should
            price the machines separately using the{" "}
            <Link href="/laundry/laundry-business-capital-philippines" className="underline">capital guide</Link> before
            deciding.
          </AP>

          <AH2>Questions to ask before you sign anything</AH2>
          <AP>
            Ask all of these in writing, and treat reluctance to answer as the answer.
          </AP>
          <Bullets items={[
            "How many branches are currently open, and how many have closed in the last three years?",
            "Can I speak to three existing franchisees, including one who is struggling - not just your best performers?",
            "What is the total cost to open, itemised, and what is explicitly not included?",
            "What are the royalty and marketing fees, and are they on gross sales?",
            "What am I required to buy from you, and at what prices compared to the open market?",
            "What territory do I get, and what stops you opening another branch nearby?",
            "What is the term, what does renewal cost, and what happens if I want out early?",
            "Can I sell the business, and what do you charge to approve a transfer?",
            "What support do I actually receive after opening, and how quickly?",
            "Are you a member of a registered franchise association, and will you register our agreement with the DTI under EO 169?",
            "Will our agreement carry the minimum terms and conditions EO 169 requires for MSME franchisees?",
            "What does your own agreement require of you, in writing, rather than in the presentation?",
          ]} />
          <Cite>
            Have a lawyer read the agreement before you sign it. This is a long-term contract with financial obligations
            that continue whether the shop succeeds or not, and the cost of that review is trivial against the cost of
            the commitment. Because no law obliges a franchisor to disclose anything, the questions above are the only
            disclosure you are going to get - which makes asking all of them, in writing, more important here than it
            would be in a country with a mandatory disclosure regime.
          </Cite>

          <AH2>If you buy an equipment package instead</AH2>
          <AP>
            Packages are often the sensible middle route: you get sized, installed machines without a decade of
            obligations. The things to check are different.
          </AP>
          <Bullets items={[
            "Exactly which machines, at which capacities - a package price means nothing without the specification.",
            "Is delivery, installation and commissioning included, or quoted separately afterwards?",
            "What warranty applies to each item, and who services it?",
            "Are parts stocked in the country?",
            "Is any training included, and is it real training or a handover?",
            "Are the machines new, reconditioned or ex-export, and if reconditioned, what was replaced?",
          ]} />
          <AP>
            A package sized to somebody else&apos;s shop is not a bargain. Run your own capacity calculation first, then
            see whether the package matches it - not the other way round.
          </AP>

          <AH2>Running it once it opens</AH2>
          <AP>
            Franchise or independent, the daily job is identical: know where every bag is and who has paid. Franchisors
            increasingly require reporting of gross sales, which is considerably easier when your numbers come out of a
            system rather than a notebook.
          </AP>
          <Bullets items={[
            "A claim stub on every drop-off, so a bag is never identified by memory.",
            "Daily and monthly gross sales you can report accurately, and defend.",
            "Who has paid, who has not, and by what - cash, GCash, Maya or bank transfer.",
            "Order volume by week, so you can see the build-up rather than guess at it.",
          ]} />

          <SoftwarePitch />

          <AH2>Frequently asked questions</AH2>
          <FAQList faqs={FAQS} />
        </Animate>
      </article>

      <CTA />
      <InternalLinks
        cluster="laundry"
        currentPath="/laundry/laundry-business-franchise-philippines"
      />
      <Footer />
    </main>
  )
}
