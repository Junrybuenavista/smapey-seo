"use client"

import InternalLinks from "@/components/InternalLinks"
import {
  Navbar, Footer, CTA, ArticleHero, AH2, AP, Bullets, Cite, FAQList, SoftwarePitch,
  INK, BLUE, AMBER, CREAM, MUTED,
} from "../_shared"
import { NAME_GROUPS, NAME_COUNT, SERVICE_SETS, TAGLINES } from "./names"
import { FAQS } from "./faqs"

const START_PATH = "/laundry/how-to-start-a-laundry-business-philippines"
const PLAN_PATH = "/laundry/laundry-shop-business-plan-philippines"

export default function Content() {
  return (
    <main className="bg-white">
      <Navbar />

      <ArticleHero
        badge="Names · Taglines · Services"
        title={<>Laundry business name ideas</>}
        intro={`${NAME_COUNT} name ideas for a laundry shop, laundromat or pickup service, from classic to Filipino and Taglish, plus names for your service tiers, taglines for your tarpaulin, and how to check a name is free before you print anything.`}
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
            <li><a href="#services" className="text-sm font-semibold hover:opacity-60" style={{ color: INK }}>Service names</a></li>
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
          <><strong>Your street or barangay + Laundry.</strong> Neighbours find you, and the name says where to walk to. Hard to beat for a shop that lives on foot traffic.</>,
          <><strong>Your name + Laundry Shop.</strong> It puts a person behind the counter, and your own name is almost never already registered.</>,
          <><strong>A clean word + your town.</strong> Presko, Malinis or Mabango with the place name: short, local, and it spells itself.</>,
          <><strong>A promise + Laundry.</strong> Labada Express, Araw-Araw Laundry, Wash on Wheels. The name tells customers what they get before they ask.</>,
        ]} />

        <section id="services" className="scroll-mt-24">
          <AH2>Laundry service names</AH2>
          <AP>
            Three tiers is enough to choose from at the counter. Laundry sells by what happens to the clothes rather
            than by how long it takes, so name the tiers that way and price each one per kilo on the board above the
            counter.
          </AP>
          <div className="grid gap-3 my-5">
            {SERVICE_SETS.map((s) => (
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
          <AH2>Taglines for a laundry tarpaulin</AH2>
          <AP>A tagline sits under your name on the tarpaulin. Keep it short enough to read while walking past.</AP>
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
          <><strong>Say it out loud.</strong> If you have to spell it twice over the phone, customers will misspell it when they search for you, and they will not find your page.</>,
          <><strong>Say what you do.</strong> Laundry, Labada or Laundromat in the name tells people what you are before they read anything else.</>,
          <><strong>Picture it on a tarpaulin.</strong> A short name prints big enough to read from across the street. A long one shrinks until nobody can read it from the jeepney.</>,
          <><strong>Leave room to grow.</strong> If you might add dry cleaning, pickup or a second branch later, do not pick a name that rules them out. &ldquo;Self Serve Suds&rdquo; is awkward the day you start folding for people.</>,
          <><strong>Check it is free before you spend anything.</strong> Generic laundry names get registered early, including some on this page.</>,
        ]} />

        <section id="check" className="scroll-mt-24">
          <AH2>Check the name is free before you print anything</AH2>
          <AP>
            A tarpaulin, a signboard and a stack of claim stubs are all cheap to reprint once and expensive to reprint
            twice. Check three places first:
          </AP>
          <Bullets items={[
            <><strong>The DTI&apos;s Business Name Registration System</strong> at <a href="https://bnrs.dti.gov.ph" target="_blank" rel="noopener noreferrer" className="font-bold underline" style={{ color: INK }}>bnrs.dti.gov.ph</a> has a name availability check. As a sole proprietor, you register your business name there; a partnership or corporation registers with the SEC instead.</>,
            <><strong>IPOPHL&apos;s trademark database</strong> at <a href="https://www.ipophil.gov.ph" target="_blank" rel="noopener noreferrer" className="font-bold underline" style={{ color: INK }}>ipophil.gov.ph</a>, for marks already registered or pending. WIPO&apos;s <a href="https://branddb.wipo.int" target="_blank" rel="noopener noreferrer" className="font-bold underline" style={{ color: INK }}>Global Brand Database</a> searches it too.</>,
            <><strong>Facebook and Google Maps</strong>, for laundry shops near you already using the name, registered or not. This is the one that catches the shop two barangays over.</>,
          ]} />
          <Cite>
            Business name registration for a sole proprietor is handled by the Department of Trade and Industry through
            bnrs.dti.gov.ph; trademark searches are through the Intellectual Property Office of the Philippines at
            ipophil.gov.ph. Confirm current requirements with each agency before registering.
          </Cite>
          <AP>
            Registering the name is the first step of opening. The rest, from the barangay clearance to the sanitation
            rules a laundry has to meet, is in our guide to{" "}
            <a href={START_PATH} className="font-bold underline" style={{ color: INK }}>starting a laundry business in the Philippines</a>.
            If you are writing this up for a lender, the{" "}
            <a href={PLAN_PATH} className="font-bold underline" style={{ color: INK }}>laundry shop business plan</a> page
            covers the sections they look for.
          </AP>
        </section>

        <SoftwarePitch />

        <AH2>Frequently asked questions</AH2>
        <FAQList faqs={FAQS} />
      </article>

      <CTA />
      <InternalLinks cluster="laundry" currentPath="/laundry/laundry-business-name-ideas" />
      <Footer />
    </main>
  )
}
