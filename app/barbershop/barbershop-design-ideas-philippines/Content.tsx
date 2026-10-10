"use client"

import InternalLinks from "@/components/InternalLinks"
import FloorPlans from "@/components/barbershop/FloorPlans"
import {
  Navbar, Footer, CTA, ArticleHero, AH2, AP, Bullets, KeyFacts, CostTable, Cite,
  FAQList, SoftwarePitch, INK, AMBER, FAINT, START_PATH,
} from "@/components/barbershop/shared"
import { shot, SHOT_W, SHOT_H } from "@/lib/cloudinary"
import { FAQS } from "./faqs"

// KlingAI renders made for this page from the style prompts, on Cloudinary
// like every other showcase photograph.
const CONCEPT_A = shot("v1791653368/kling_20261011_IMAGE_Photoreali_360_0_tassqj.png")
const CONCEPT_B = shot("v1791653380/kling_20261011_IMAGE_Photoreali_339_1_vd3hz3.png")

/**
 * The photographs are generated, so each one says so where it's shown. On a
 * page of design ideas, a reader could otherwise take them for real shops.
 */
function Concept({ src, alt, eager }: { src: string; alt: string; eager?: boolean }) {
  return (
    <figure className="my-10">
      <div className="rounded-[20px] border-2 overflow-hidden" style={{ borderColor: INK, boxShadow: `8px 8px 0 ${AMBER}` }}>
        <img
          src={src}
          alt={alt}
          width={SHOT_W}
          height={SHOT_H}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="w-full h-auto block"
        />
      </div>
      <figcaption className="mt-3 text-xs" style={{ color: FAINT }}>Design concept, generated with AI for this guide. It isn&apos;t a real shop.</figcaption>
    </figure>
  )
}

export default function Content() {
  return (
    <main className="bg-white">
      <Navbar />

      <ArticleHero
        badge="Philippines · Layouts and ideas"
        title={<>Barbershop design ideas for a small shop</>}
        intro="Most barbershop design ideas online are photos of big, finished shops. A small one, like the 10 to 20 square metres with two or three chairs in Business Diary PH's 2026 budget, is won or lost on the layout before the look. So start with the floor plan, drawn to scale below for two, three and five chairs, then spend on what customers actually notice."
      />

      <article className="max-w-3xl mx-auto px-6 py-16">
        <Concept src={CONCEPT_A} alt="A barbershop interior, an AI-generated design concept" eager />

        <KeyFacts items={[
          { k: "Renovating 10–20 m²", v: "₱80,000 to ₱150,000 in one 2026 budget" },
          { k: "Mirrors and lighting", v: "₱20,000 to ₱40,000 in the same budget" },
          { k: "DOH minimum", v: "One hand-washing facility and one toilet for every five chairs" },
          { k: "A barber chair", v: "₱2,500 used to ₱50,000+" },
        ]} />

        <AH2 id="floor-plans">Start with the floor plan</AH2>
        <AP>
          In a small shop, the layout decides how many customers you can serve at once, how the barbers move, and what the
          renovation costs. Plan it in this order, because each step limits the next:
        </AP>
        <Bullets items={[
          <><strong>Plumbing first.</strong> The toilet and the hand-washing sink, and a shampoo sink if you&apos;ll offer one, are the hardest things to move later. Keep them together at the back, where they can share pipes, out of the customers&apos; way. The DOH rule for barbershops is at least one hand-washing facility and one water closet for every five chairs.</>,
          <><strong>Stations along the longest wall.</strong> Each needs a mirror, a shelf for tools and an outlet for clippers within reach, with room behind the chair for the barber to work round it.</>,
          <><strong>Waiting where customers can see the line.</strong> A bench facing the stations, or a TV showing the queue, answers &ldquo;how long?&rdquo; before anyone has to ask.</>,
          <><strong>The counter by the door,</strong> so every customer passes it on the way out.</>,
          <><strong>Storage for towels, tools and the sterilizer.</strong> The Code on Sanitation wants clean towels for every customer and tools disinfected before and after every use, so they need a place of their own.</>,
        ]} />
        <AP>Here&apos;s how that comes together at three sizes. Switch between them to see how much the room grows:</AP>
        <FloorPlans />
        <Cite>
          Department of Health, Implementing Rules and Regulations of Chapter XII, &ldquo;Tonsorial and Beauty
          Establishments&rdquo;, of the Code on Sanitation of the Philippines (PD 856), 15 December 1997, and PD 856 Section
          58. Shop size from Business Diary PH, &ldquo;How To Start A Barber Shop Or Men&apos;s Grooming Studio: Step-by-Step
          Guide&rdquo;, 2026. The floor plans are our own examples.
        </Cite>

        <AH2>Where the renovation money goes</AH2>
        <AP>
          Business Diary PH&apos;s 2026 budget for a small shop of 10 to 20 square metres puts most of the money into the room
          itself, then the chairs, then what goes on the walls:
        </AP>
        <CostTable
          rows={[
            ["Renovating the shop, 10–20 m²", "₱80,000 – ₱150,000"],
            ["Barber chairs, 2–3", "₱30,000 – ₱60,000"],
            ["Mirrors and lighting", "₱20,000 – ₱40,000"],
          ]}
          note="Three lines of Business Diary PH's 2026 sample budget for a small shop. It has no line for rent or a rental deposit, so add those from the lease you're offered."
        />
        <AP>
          The rest of the budget, from tools to permits, is in our{" "}
          <a href={START_PATH} className="font-bold underline" style={{ color: INK }}>guide to starting a barbershop</a>,
          along with <a href={`${START_PATH}#barber-chair-price`} className="font-bold underline" style={{ color: INK }}>barber chair prices</a>.
          Within the renovation, these are the choices that matter most:
        </AP>
        <Bullets items={[
          <><strong>Light at the mirror.</strong> Even light on the customer&apos;s face from the front and both sides, so the barber sees the fade without shadows. A single ceiling light behind the chair puts the barber&apos;s own shadow on the cut.</>,
          <><strong>A floor that shows hair.</strong> Smooth tiles in a light colour sweep fast and show what&apos;s been missed. Deep grout lines and rough tiles hold on to it.</>,
          <><strong>Walls you can wipe down.</strong> The DOH rules want walls and ceilings smooth, tightly built and easy to keep clean, so keep rough textures away from the stations.</>,
          <><strong>Mirrors on the side walls.</strong> A mirror facing the glass front catches the glare from the street, and the customer squints at the traffic instead of the cut.</>,
          <><strong>Cooling for a full shop.</strong> Size the aircon for the room with every chair and the bench full, not for the empty shop you&apos;re measuring.</>,
          <><strong>An outlet at every station,</strong> so clipper cords never cross the floor.</>,
        ]} />

        <AH2>Pick a style you can keep clean</AH2>
        <AP>
          A style is mostly materials and light. In a small shop, choose one that still looks right at closing, after a
          day of hair and talc:
        </AP>
        <Bullets items={[
          <><strong>Clean and bright:</strong> white tiles, light wood and plenty of light. The simplest look to build and the easiest to keep clean, which suits a neighbourhood shop.</>,
          <><strong>Modern industrial:</strong> concrete, black steel and warm pendant lights. It hides wear well, but dark surfaces need more light at each mirror.</>,
          <><strong>Classic:</strong> a checkered floor, chrome-and-leather chairs and dark wood. Timeless, though leather and wood need care in humid weather.</>,
          <><strong>Filipino-inspired:</strong> warm wood, capiz shell lamps and rattan in the waiting area. It stands apart from the usual looks, and capiz and rattan are Philippine-made.</>,
          <><strong>Premium lounge:</strong> dark walls, brass and reclining chairs for hot-towel shaves and packages. The most expensive to fit out, and it needs prices to match.</>,
        ]} />
        <Concept src={CONCEPT_B} alt="A barbershop interior, an AI-generated design concept" />

        <AH2>Mistakes that cost a small shop</AH2>
        <Bullets items={[
          "Chairs packed so close that two barbers can't work side by side.",
          "Plumbing at the front, which means longer pipe runs and a toilet door opening onto the waiting area.",
          "No outlet at the stations, and clipper cords across the floor.",
          "A dark floor that hides hair until a customer notices it.",
          "A bench that blocks the way to the back.",
          "Towels and tools on open shelves, where customers see the clutter.",
        ]} />

        <SoftwarePitch
          title="Once the chairs are in"
          body="Smapey Barbershop runs the walk-in line with each barber's wait, works out each barber's share as customers pay, and can put the queue on a TV in the waiting area. Try it on the Free plan."
        />

        <AH2>Frequently asked questions</AH2>
        <FAQList faqs={FAQS} />
      </article>

      <CTA />
      <InternalLinks cluster="barbershop" currentPath="/barbershop/barbershop-design-ideas-philippines" />
      <Footer />
    </main>
  )
}
