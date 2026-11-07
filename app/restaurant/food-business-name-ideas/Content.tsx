"use client"

import Footer from "@/components/Footer"
import InternalLinks from "@/components/InternalLinks"
import {
  Animate, ArticleHero, AH2, AP, Bullets, FAQList, Cite,
} from "@/components/article/ArticleKit"
import { NAME_GROUPS, NAME_COUNT, MENU_SETS, TAGLINES } from "./names"
import { FAQS } from "./faqs"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const MUTED = "#8a857e"

const FOOD_COST_PATH = "/restaurant/how-to-calculate-food-cost"
const MENU_PRICE_PATH = "/restaurant/menu-price-calculator"
const CATERING_PATH = "/catering/how-to-start-a-catering-business-in-the-philippines"

export default function Content() {
  return (
    <main className="bg-white">
      <ArticleHero
        badge="Philippines · Names · Menus"
        title={<>Food business name ideas</>}
        intro={`${NAME_COUNT} name ideas for a Philippine food business — carinderia, food cart, bakery, milk tea shop, home kitchen or bigasan — with every Filipino word explained, plus menu group names, taglines, and how to check a name is free before you print a tarpaulin.`}
      />

      <article className="max-w-3xl mx-auto px-6 py-16">
        <Animate>
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
              <li><a href="#menu" className="text-sm font-semibold hover:opacity-60" style={{ color: INK }}>Menu group names</a></li>
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
            <><strong>A person + the food.</strong> Kusina ni Nanay, Luto ni Lola, Bigasan ni Mang Tonyo. Customers trust a person with their cooking, and your own family name is almost never already registered.</>,
            <><strong>Your street or barangay + the food.</strong> Kainan sa Kanto, Ihawan sa Baryo. It tells people where to walk and it ranks when they search your area.</>,
            <><strong>A taste word + the format.</strong> Sarap Kitchen, Masarap Turo-Turo, Lami Kaayo Eatery. Short, local, and it spells itself.</>,
            <><strong>A promise + the food.</strong> Busog Carinderia, Sulit Meals, Bagong Luto. The name does the selling before anyone reads the board.</>,
          ]} />

          <section id="menu" className="scroll-mt-24">
            <AH2>Menu group names</AH2>
            <AP>
              A food business names its menu groups, not service tiers. Group them the way customers actually decide —
              by who is eating, by the time of day, or by budget — and keep the group names short enough to read from
              the back of the queue.
            </AP>
            <div className="grid gap-3 my-5">
              {MENU_SETS.map((s) => (
                <div key={s.names.join()} className="rounded-[14px] border-2 bg-white px-4 py-3 flex flex-wrap items-center gap-2" style={{ borderColor: INK }}>
                  {s.names.map((n, i) => (
                    <span key={n} className="inline-flex items-center gap-2">
                      {i > 0 && <span style={{ color: AMBER }} aria-hidden>·</span>}
                      <span className="font-extrabold" style={{ color: INK }}>{n}</span>
                    </span>
                  ))}
                  {s.note && <span className="text-xs w-full sm:w-auto sm:ml-auto" style={{ color: MUTED }}>{s.note}</span>}
                </div>
              ))}
            </div>
            <AP>
              Naming the groups is the easy half. Pricing what goes in them is the half that decides whether the shop
              survives — our{" "}
              <a href={FOOD_COST_PATH} className="font-bold underline" style={{ color: INK }}>guide to calculating food cost</a>{" "}
              works a real recipe through end to end, and the{" "}
              <a href={MENU_PRICE_PATH} className="font-bold underline" style={{ color: INK }}>menu price calculator</a>{" "}
              turns a cost per portion into a price.
            </AP>
          </section>

          <section id="taglines" className="scroll-mt-24">
            <AH2>Taglines for a food tarpaulin</AH2>
            <AP>A tagline sits under your name on the tarpaulin or the cart. Short enough to read from a passing jeepney.</AP>
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
            <><strong>Say what you cook.</strong> Silog, Ihaw, Bakeshop, Milk Tea or Bigasan in the name means a passer-by knows in one glance whether you sell what they want. A small shop with no frontage cannot afford mystery.</>,
            <><strong>Say it out loud.</strong> Customers will search for you on Facebook by typing what they heard. If the spelling is not obvious from the sound, they will not find you.</>,
            <><strong>Check it fits the price board and the cup.</strong> A long name shrinks until nobody can read it from the queue, and it will not fit on a milk tea sleeve at all.</>,
            <><strong>Leave room to grow.</strong> If the carinderia might add catering or a second branch, do not lock yourself to one street in the name. &ldquo;Kainan sa Kanto&rdquo; is charming until you open in another kanto.</>,
            <><strong>Avoid claims you would have to defend.</strong> Words like organic, healthiest or number one in a registered name invite questions you do not need from a regulator or a competitor.</>,
          ]} />

          <section id="check" className="scroll-mt-24">
            <AH2>Check the name is free before you print anything</AH2>
            <AP>
              Food names get reused more heavily than any other trade, often twice on the same street. Check three
              places before you order a tarpaulin, a cart decal or a stack of boxes:
            </AP>
            <Bullets items={[
              <><strong>The DTI&apos;s Business Name Registration System</strong> at <a href="https://bnrs.dti.gov.ph" target="_blank" rel="noopener noreferrer" className="font-bold underline" style={{ color: INK }}>bnrs.dti.gov.ph</a> has a name availability check. As a sole proprietor you register your business name there; a partnership or corporation registers with the SEC instead.</>,
              <><strong>IPOPHL&apos;s trademark database</strong> at <a href="https://www.ipophil.gov.ph" target="_blank" rel="noopener noreferrer" className="font-bold underline" style={{ color: INK }}>ipophil.gov.ph</a>, for marks already registered or pending. WIPO&apos;s <a href="https://branddb.wipo.int" target="_blank" rel="noopener noreferrer" className="font-bold underline" style={{ color: INK }}>Global Brand Database</a> searches it too.</>,
              <><strong>Facebook and Google Maps</strong>, for food businesses near you already using the name. This is the one that catches the carinderia two barangays over that never registered anything.</>,
            ]} />
            <Cite>
              Business name registration for a sole proprietor is handled by the Department of Trade and Industry
              through bnrs.dti.gov.ph; trademark searches are through the Intellectual Property Office of the
              Philippines at ipophil.gov.ph. Confirm current requirements with each agency before registering.
            </Cite>
            <AP>
              The name you register is the one that then appears on your barangay clearance, Mayor&apos;s Permit and
              sanitary permit, so settle it before you apply for any of them. If you are also planning to cook for
              events, our guide to{" "}
              <a href={CATERING_PATH} className="font-bold underline" style={{ color: INK }}>starting a catering business in the Philippines</a>{" "}
              covers the permits that go beyond a single shop.
            </AP>
          </section>

          <AH2>Frequently asked questions</AH2>
          <FAQList faqs={FAQS} />
        </Animate>
      </article>

      <InternalLinks cluster="restaurant" currentPath="/restaurant/food-business-name-ideas" />
      <Footer />
    </main>
  )
}
