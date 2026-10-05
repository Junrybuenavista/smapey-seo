"use client"

import InternalLinks from "@/components/InternalLinks"
import {
  Navbar, Footer, CTA, ArticleHero, AH2, AP, Bullets, Cite, FAQList, SoftwarePitch,
  INK, BLUE, AMBER, CREAM, MUTED,
} from "@/components/car-wash/shared"
import { NAME_GROUPS, NAME_COUNT, PACKAGE_SETS, TAGLINES } from "./names"
import { FAQS } from "./faqs"

const TARPAULIN_PATH = "/car-wash/car-wash-tarpaulin-design"
const START_PATH = "/car-wash/how-to-start-a-car-wash-business-philippines"

export default function Content() {
  return (
    <main className="bg-white">
      <Navbar />

      <ArticleHero
        badge="Names · Taglines · Packages"
        title={<>Car wash name ideas</>}
        intro={`${NAME_COUNT} name ideas for a car wash or motor wash, from classic to Filipino and Taglish, plus names for your packages, taglines for your tarpaulin, and how to check a name is free before you print anything.`}
      />

      <article className="max-w-3xl mx-auto px-6 py-16">
        <nav className="rounded-[22px] border-2 p-6 mb-4" style={{ borderColor: INK, background: CREAM }} aria-label="Name groups">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>Jump to</p>
          <ol className="grid sm:grid-cols-2 gap-y-2 gap-x-6">
            {NAME_GROUPS.map((g) => (
              <li key={g.id}>
                <a href={`#${g.id}`} className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>
                  {g.title} <span style={{ color: MUTED }}>({g.names.length})</span>
                </a>
              </li>
            ))}
            <li><a href="#packages" className="text-sm font-semibold hover:opacity-60" style={{ color: INK }}>Package names</a></li>
            <li><a href="#taglines" className="text-sm font-semibold hover:opacity-60" style={{ color: INK }}>Taglines</a></li>
            <li><a href="#check" className="text-sm font-semibold hover:opacity-60" style={{ color: INK }}>Checking a name is free</a></li>
          </ol>
        </nav>

        {NAME_GROUPS.map((g) => (
          <section key={g.id} id={g.id} className="scroll-mt-24">
            <AH2>{g.heading}</AH2>
            <AP>{g.intro}</AP>
            <ul className="grid sm:grid-cols-2 gap-2.5 my-5">
              {g.names.map((n) => (
                <li key={n.name} className="rounded-[14px] border-2 bg-white px-4 py-3" style={{ borderColor: INK }}>
                  <span className="block font-extrabold" style={{ color: INK }}>{n.name}</span>
                  {n.note && <span className="block text-xs mt-0.5" style={{ color: MUTED }}>{n.note}</span>}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <AH2>Make your own: four formulas</AH2>
        <Bullets items={[
          <><strong>Your street or barangay + Car Wash.</strong> Locals find you, and the name tells them where you are.</>,
          <><strong>Your name + Car &amp; Motor Wash.</strong> It puts a face to the shop and says you take both.</>,
          <><strong>A shine word + your town.</strong> Kintab, Kislap or Kinang with the place name: short, local and hard to forget.</>,
          <><strong>A promise + Car Wash.</strong> Linis Agad, Sulit Wash: the name tells customers what they get.</>,
        ]} />

        <section id="packages" className="scroll-mt-24">
          <AH2>Car wash package names</AH2>
          <AP>
            Three tiers is enough for a customer to choose from at the counter. Name them so the step up is obvious, then
            price each one by vehicle size.
          </AP>
          <div className="grid gap-3 my-5">
            {PACKAGE_SETS.map((s) => (
              <div key={s.names.join()} className="rounded-[14px] border-2 bg-white px-4 py-3 flex flex-wrap items-center gap-2" style={{ borderColor: INK }}>
                {s.names.map((n, i) => (
                  <span key={n} className="inline-flex items-center gap-2">
                    {i > 0 && <span style={{ color: AMBER }} aria-hidden>→</span>}
                    <span className="font-extrabold" style={{ color: INK }}>{n}</span>
                  </span>
                ))}
                {s.note && <span className="text-xs w-full sm:w-auto sm:ml-auto" style={{ color: MUTED }}>{s.note}</span>}
              </div>
            ))}
          </div>
        </section>

        <section id="taglines" className="scroll-mt-24">
          <AH2>Taglines for a car wash tarpaulin</AH2>
          <AP>A tagline goes under your name on the tarpaulin. Keep it short enough to read from a moving car.</AP>
          <ul className="my-5 space-y-2.5">
            {TAGLINES.map((t) => (
              <li key={t.line} className="rounded-[14px] px-4 py-3" style={{ background: CREAM }}>
                <span className="font-extrabold" style={{ color: INK }}>&ldquo;{t.line}&rdquo;</span>
                {t.note && <span className="text-xs ml-2" style={{ color: MUTED }}>{t.note}</span>}
              </li>
            ))}
          </ul>
        </section>

        <AH2>How to pick the right one</AH2>
        <Bullets items={[
          <><strong>Say it out loud.</strong> If you have to spell it twice over the phone, customers will misspell it when they search for you.</>,
          <><strong>Say what you do.</strong> Car Wash, Motor Wash or Auto Spa in the name tells people what you are before they read anything else.</>,
          <><strong>Picture it on a tarpaulin.</strong> A short name can be printed big enough to read from the road. Try it on the <a href={TARPAULIN_PATH} className="font-bold underline" style={{ color: INK }}>free tarpaulin maker</a>.</>,
          <><strong>Leave room to grow.</strong> If you might add detailing or motorcycles later, don&apos;t pick a name that rules them out.</>,
          <><strong>Make it yours.</strong> A name with a story, like a family name or a nickname, is easier to remember than a generic one.</>,
        ]} />
        <Cite>
          Naming tips adapted from Moneymax, &ldquo;Wash and Earn: How to Start a Car Wash Business in the Philippines&rdquo;,
          last updated 6 July 2023: pick a name that tells a story, avoid names that are hard to spell or say, use puns
          with care, and make sure the name fits your future plans.
        </Cite>

        <section id="check" className="scroll-mt-24">
          <AH2>Check the name is free before you print anything</AH2>
          <AP>
            Generic names get taken, including some on this page. Before you order a tarpaulin or a sign, check three
            places:
          </AP>
          <Bullets items={[
            <><strong>The DTI&apos;s Business Name Registration System</strong> at <a href="https://bnrs.dti.gov.ph" target="_blank" rel="noopener noreferrer" className="font-bold underline" style={{ color: INK }}>bnrs.dti.gov.ph</a> has a name availability check. As a sole proprietor, you register your business name there; a partnership or corporation registers with the SEC instead.</>,
            <><strong>IPOPHL&apos;s trademark database</strong> at <a href="https://www.ipophil.gov.ph" target="_blank" rel="noopener noreferrer" className="font-bold underline" style={{ color: INK }}>ipophil.gov.ph</a>, for marks already registered or pending. WIPO&apos;s <a href="https://branddb.wipo.int" target="_blank" rel="noopener noreferrer" className="font-bold underline" style={{ color: INK }}>Global Brand Database</a> searches it too.</>,
            <><strong>Facebook and Google Maps</strong>, for car washes near you already using the name, registered or not.</>,
          ]} />
          <AP>
            Registering the name is the first step of opening. The rest, from the barangay clearance to the DENR
            discharge permit, is in our guide to{" "}
            <a href={START_PATH} className="font-bold underline" style={{ color: INK }}>starting a car wash business in the Philippines</a>.
          </AP>
        </section>

        <SoftwarePitch
          title="Got a name? Put it to work"
          body="Smapey Carwash puts your shop's name on everything a customer sees: the price list tarpaulin printed from your board, the queue on the waiting-area TV, and the link where customers follow their car. Free plan, no card."
          cta="Set up your car wash free"
        />

        <AH2>Frequently asked questions</AH2>
        <FAQList faqs={FAQS} />
      </article>

      <CTA />
      <InternalLinks cluster="car-wash" currentPath="/car-wash/car-wash-name-ideas" />
      <Footer />
    </main>
  )
}
