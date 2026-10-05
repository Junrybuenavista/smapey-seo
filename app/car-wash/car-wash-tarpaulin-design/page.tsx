import Link from "next/link"
import JsonLd from "@/components/JsonLd"
import InternalLinks from "@/components/InternalLinks"
import { buildMetadata, breadcrumbSchema, faqSchema, SITE, type Faq } from "@/lib/seo"
import { Navbar, Footer, CTA } from "@/components/car-wash/shared"
import TarpaulinMaker from "./TarpaulinMaker"

const PATH = "/car-wash/car-wash-tarpaulin-design"
const HUB_PATH = "/car-wash"
const PRICES_PATH = "/car-wash/car-wash-price-list-philippines"

// Local copies: this is a server component, and values exported from a
// "use client" module arrive here as client references, not strings.
const INK = "#161616"
const BLUE = "#2f6bff"
const CREAM = "#fbf7f0"
const MUTED = "#54514c"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }
const TITLE = "Free Car Wash Tarpaulin Design Maker: Price List Tarpaulin | Smapey"
const DESCRIPTION =
  "Free car wash tarpaulin design maker. Type your prices by vehicle size, add your logo, pick 2×3, 3×4 ft or A4, and download a print-ready price list tarpaulin. For car wash and motor wash shops. No sign-up."

export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

const FAQS: Faq[] = [
  {
    q: "Is the car wash tarpaulin maker free?",
    a: "Yes. Make as many price list tarpaulins as you like and download them as images or print them. There's no sign-up, and a small line at the bottom saying it was made with Smapey can be switched off.",
  },
  {
    q: "Where does my information go?",
    a: "Nowhere. The tarpaulin is drawn in your browser, and your shop name, prices and logo are never sent to a server. Close the page and they're gone, so download the image before you leave.",
  },
  {
    q: "What size tarpaulin should I print?",
    a: "Pick by where it will hang. A tall 2 × 3 ft tarp suits a wall beside the counter. A wide 3 × 2 ft tarp fits a price list with many vehicle sizes, like a shop that washes both cars and motorcycles. The 3 × 4 and 4 × 3 ft sizes are for the entrance or the roadside, and A4 is for the counter or a window.",
  },
  {
    q: "What file do I give the tarpaulin printer?",
    a: "Download image gives you a PNG at the real size you chose, for example 2,400 × 3,600 pixels for 2 × 3 ft at 100 pixels per inch. Tell the printer the size you picked. For paper, use Print or save as PDF.",
  },
  {
    q: "Can I make a motor wash tarpaulin?",
    a: "Yes. Turn on the Motorcycle and Big bike sizes, turn off the car sizes if you only wash motorcycles, and change the title to Motor Wash Price List. Add services like Chain Clean & Lube with your own prices.",
  },
  {
    q: "Where do the starting prices come from?",
    a: "They are the averages of price lists Philippine car washes have published, mostly from 2020, so many shops charge more today. Change every price to your own before you print. The sources are on our car wash price list guide.",
  },
]

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Car Wash Tarpaulin Design Maker",
            description: DESCRIPTION,
            url: `${SITE}${PATH}`,
            applicationCategory: "DesignApplication",
            operatingSystem: "Web",
            publisher: { "@id": `${SITE}/#organization` },
            offers: { "@type": "Offer", price: "0", priceCurrency: "PHP" },
          },
          breadcrumbSchema(PATH),
          faqSchema(FAQS),
        ]}
      />

      <Navbar />
      <main style={display}>
        <section className="pt-28 pb-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-6xl mx-auto">
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>Free tool</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.06] tracking-tight mb-5" style={{ color: INK }}>
              Free car wash tarpaulin design maker
            </h1>
            <p className="text-lg max-w-2xl leading-relaxed" style={{ color: MUTED }}>
              Make a price list tarpaulin for your car wash or motor wash: type your prices by vehicle size, add your
              logo, pick a size, and download a print-ready image to take to any tarpaulin printer. No sign-up.
            </p>
          </div>
        </section>

        <section className="py-12 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <TarpaulinMaker />
          </div>
        </section>

        <section className="py-14 px-6" style={{ background: CREAM }}>
          <div className="max-w-3xl mx-auto space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: INK }}>
              What a good car wash tarpaulin shows
            </h2>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              A price tarpaulin does one job: it settles the price before the car is washed, not after. Customers
              read it from the driveway in a few seconds, so everything on it should help them find their price fast.
            </p>
            <ul className="space-y-3 text-base leading-relaxed" style={{ color: MUTED }}>
              <li><strong style={{ color: INK }}>Prices by vehicle size.</strong> A sedan, an SUV and a van don&apos;t cost the same to wash, and a single price for all of them starts arguments. Group sizes the way your shop does.</li>
              <li><strong style={{ color: INK }}>Packages first, add-ons after.</strong> The main wash is the first choice a customer makes; wax, engine wash and detailing come after it.</li>
              <li><strong style={{ color: INK }}>Only what you offer.</strong> A blank box beats a price you won&apos;t honour. Leave out sizes and services you don&apos;t do.</li>
              <li><strong style={{ color: INK }}>Big numbers, few words.</strong> The prices are the biggest thing on the tarp, and the maker sizes them to fill their columns.</li>
              <li><strong style={{ color: INK }}>Your name and one useful line.</strong> Opening hours, a phone number, or the payments you take, like GCash.</li>
            </ul>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              Not sure what to charge? Our{" "}
              <Link href={PRICES_PATH} className="font-bold underline" style={{ color: INK }}>car wash price list for the Philippines</Link>{" "}
              has typical prices by vehicle size, with the motor wash price and the sources.
            </p>
          </div>
        </section>

        <section className="py-14 px-6 bg-white">
          <div className="max-w-3xl mx-auto space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: INK }}>
              Choosing the size, and taking it to the printer
            </h2>
            <ul className="space-y-3 text-base leading-relaxed" style={{ color: MUTED }}>
              <li><strong style={{ color: INK }}>2 × 3 ft, tall:</strong> a wall beside the counter or the waiting area.</li>
              <li><strong style={{ color: INK }}>3 × 2 ft, wide:</strong> many vehicle sizes side by side, like a shop that washes cars and motorcycles.</li>
              <li><strong style={{ color: INK }}>3 × 4 or 4 × 3 ft:</strong> the entrance, or facing the road where drivers decide whether to pull in.</li>
              <li><strong style={{ color: INK }}>A4 paper:</strong> the counter, a window, or a stand by the cashier.</li>
            </ul>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              The downloaded image is drawn at the real size you picked, so the printer doesn&apos;t have to stretch it.
              Tell them the size, and check one corner of the proof before they print the whole tarp.
            </p>
          </div>
        </section>

        <section className="py-14 px-6" style={{ background: CREAM }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-7" style={{ color: INK }}>Common questions</h2>
            <div className="space-y-6">
              {FAQS.map((f) => (
                <div key={f.q}>
                  <h3 className="text-base font-extrabold mb-1.5" style={{ color: INK }}>{f.q}</h3>
                  <p className="text-base leading-relaxed" style={{ color: MUTED }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3" style={{ color: INK }}>
              When your prices change, the tarpaulin should too
            </h2>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              A tarpaulin is only right until the day you change a price. In{" "}
              <Link href={HUB_PATH} className="font-bold underline" style={{ color: BLUE }}>Smapey Carwash</Link>, your
              prices live on one price board: every car at the counter is priced from it, every price change is
              recorded, and the board prints this same tarpaulin from your current prices whenever you need a new one.
              The free plan covers 200 cars a month.
            </p>
          </div>
        </section>
      </main>

      <CTA title="Put your price board to work" subtitle="Every car priced from your board, crew shares worked out per car, and a fresh tarpaulin whenever prices change. Free plan, no card." />
      <InternalLinks cluster="car-wash" currentPath={PATH} heading="More for car wash owners" />
      <Footer />
    </>
  )
}
