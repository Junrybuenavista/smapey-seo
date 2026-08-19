import Link from "next/link"
import SiteNavbar from "@/components/SiteNavbar"
import SiloFooter from "@/components/silo/SiloFooter"
import SiloBreadcrumbs from "@/components/silo/SiloBreadcrumbs"
import SiloChildren from "@/components/silo/SiloChildren"
import SiloUpwardLinks from "@/components/silo/SiloUpwardLinks"
import SiloRelatedHubs from "@/components/silo/SiloRelatedHubs"
import { siloContextFor, anchorFor, APEX } from "@/lib/silo"

const PATH = "/boarding-house/boarding-house-business-philippines"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const MUTED = "#54514c"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

type Block = { id: string; h2: string; body: string[]; aside?: { title: string; lines: string[] } }

const SECTIONS: Block[] = [
  {
    id: "the-model",
    h2: "What the business actually is",
    body: [
      "A boarding house rents sleeping space by the month to people who are working or studying away from home. That is a different business from renting an apartment, and the difference is not size - it is turnover and involvement. An apartment landlord might see a tenant twice a year. A boarding house owner is dealing with move-ins, move-outs, repairs, and payments continuously.",
      "Three models get grouped under the same name and they are worth separating. Renting private rooms is closest to ordinary tenancy: fewer tenants, higher rent each, less churn. Shared rooms put several tenants in a room, each on their own agreement. Bedspace rents the bed itself, usually with double-deck bunks, which yields the most income per square metre and demands the most management.",
      "Revenue per floor area rises as you move down that list, and so does the work. A house of eight private rooms is a quieter business than a house of forty bedspaces at the same total income. Neither is better - but choosing bedspace because the revenue arithmetic looks attractive, without accounting for the operational load, is a common and expensive mistake.",
      "Location determines which model fits. Near a university you are letting to students on an academic calendar, with predictable emptiness over the long break. Near a BPO hub you are letting to workers on shift patterns, with year-round demand and a different set of expectations about noise, hours, and security.",
    ],
    aside: {
      title: "Three models under one name",
      lines: [
        "Private room - one tenant or couple per room, lowest turnover.",
        "Shared room - several tenants per room, each on their own terms.",
        "Bedspace - the bed is the unit, highest yield and highest workload.",
      ],
    },
  },
  {
    id: "capital-and-setup",
    h2: "Capital, and where it actually goes",
    body: [
      "The property is the obvious cost, whether that is a mortgage on a house you buy or the rent on one you lease to sublet. What surprises people is the size of everything else, particularly for bedspace.",
      "Fit-out is the big one: bunks, mattresses, electrical work to put enough outlets where people actually need them, fans or aircon, water pressure that survives eight people getting ready at once, and security - locks, gates, often cameras in common areas. A bedspace conversion is a construction project, not a furniture purchase.",
      "Then there is working capital, which is the item most often left out of a plan. You will pay for electricity, water, internet, and a caretaker before the house is full, and a new house is not full for the first few months. Running out of cash while waiting for occupancy to climb is a more common failure than any single overspend.",
      "Registration and permits carry their own costs and, more importantly, their own timelines. These vary by city and municipality and they change, so any figure you read - including in any article - needs checking against your own LGU before you rely on it. Treat published numbers as a rough shape, not a budget.",
    ],
  },
  {
    id: "registration-and-permits",
    h2: "Registration, permits, and staying on the right side of it",
    body: [
      "Running a boarding house as a business means registering as one. In broad terms that involves registering the business name, clearing it with the barangay, obtaining a mayor's permit from the city or municipality, and registering with the BIR for tax purposes. Depending on the building and the locality there are also safety and sanitary inspections.",
      "The specifics genuinely differ between LGUs - which office, which order, which supporting documents, what it costs, and how long it takes. Two owners in neighbouring cities will describe noticeably different processes and both will be telling the truth. This is why it is worth asking at your own city hall rather than relying on a checklist written for somewhere else.",
      "Permits also renew, usually annually, and renewal is where otherwise careful owners slip. It is worth putting the dates in a calendar the moment you receive each permit, because nobody reminds you and lapsed paperwork is a problem discovered at the worst time.",
      "None of this is legal advice, and it is not a substitute for asking your LGU or a professional. What it is worth internalising is that the paperwork is ordinary, expected, and much cheaper to do properly at the start than to fix later.",
    ],
    aside: {
      title: "Typically involved - confirm with your own LGU",
      lines: [
        "Business name registration.",
        "Barangay clearance.",
        "Mayor's or business permit from the city or municipality.",
        "BIR registration for tax.",
        "Fire safety and sanitary inspection, depending on the building.",
      ],
    },
  },
  {
    id: "tenants-and-rules",
    h2: "Screening tenants and writing house rules people follow",
    body: [
      "Who you let in determines most of your experience of this business. Screening does not need to be elaborate - a valid ID, where they work or study, a contact number, and someone to call in an emergency covers the majority of it. The emergency contact matters more than owners expect and is the detail most often skipped.",
      "House rules work when they are short, posted where people see them, and explained at move-in rather than produced afterwards as a complaint. A rule nobody was told about is not a rule; it is an ambush. The ones that earn their place cover quiet hours, visitors, cooking, cleanliness in shared spaces, and how to report a problem.",
      "Enforcement is easier when the rules are few and the reasoning is obvious. Tenants sharing a room with strangers generally want quiet hours enforced - you are not imposing on them, you are protecting something they also want. The rules that cause friction are usually the arbitrary ones nobody can explain.",
      "The contract sits underneath all of this: the rate, the deposit and advance and what they cover, the notice period on both sides, and the grounds for ending the arrangement. Having it in writing is not distrust. It is the thing that lets a disagreement be settled by reading rather than by argument.",
    ],
  },
  {
    id: "maintenance",
    h2: "Maintenance is a cost centre that quietly sets your reputation",
    body: [
      "In a house where eight people share a bathroom, things break at eight times the rate of a family home. Water heaters, flush mechanisms, door locks, outlets, the internet. This is not misfortune; it is the running condition of the business, and it should be budgeted as a monthly figure rather than treated as a series of surprises.",
      "Speed of response matters more than the quality of the eventual repair. A tenant who reports a leak and hears nothing for four days concludes nobody is in charge, and that conclusion changes how they treat the property, whether they pay on time, and what they tell the friend who asks about a vacancy.",
      "The practical fix is a way for tenants to report problems that does not depend on catching you in person, and a record of what was reported and what happened. Verbal reports in a corridor are forgotten by both parties within a day.",
      "Tracking repair costs also feeds the only profitability number that means anything. Rent collected is not profit. Rent collected minus utilities, minus the caretaker, minus repairs, minus vacancy, minus tax is much closer - and repairs are the line owners most consistently underestimate.",
    ],
  },
  {
    id: "profitability",
    h2: "What actually drives profit",
    body: [
      "Three levers move the number, and they are not equally easy to pull. Occupancy is the first and by some distance the most powerful: an empty bed earns nothing while still costing you a share of the electricity, the caretaker, and the loan. Filling beds beats almost any economy you can make elsewhere.",
      "Pricing is the second, and it is more granular than a single house rate. Lower decks are worth more than uppers. A room nearer the bathroom or with better ventilation is worth more than one that is not. Owners who charge one blended rate across a house are usually leaving money on the better beds and struggling to fill the worse ones.",
      "Cost control is third and least glamorous. Utilities are the largest variable cost in most houses, which is why how you bill them - split evenly, by headcount, or by sub-meter - has a direct effect on both your margin and the number of disputes you have each month.",
      "Underneath all three is knowing your actual numbers. A surprising number of houses run on a general feeling that things are going well or badly. Money in, money out, and net per month, recorded as it happens rather than reconstructed at the end of the year, is what turns the feeling into a decision you can defend.",
    ],
  },
]

export default function BoardingHouseBusinessContent() {
  const ctx = siloContextFor(PATH)

  return (
    <main style={display}>
      <SiteNavbar />
      <SiloBreadcrumbs ctx={ctx} />

      <section className="py-16 px-6" style={{ background: CREAM }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>
            Business setup
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.06] tracking-tight mb-6" style={{ color: INK }}>
            Starting and running a boarding house business
          </h1>
          <div className="space-y-4 text-lg leading-relaxed" style={{ color: MUTED }}>
            <p>
              A boarding house looks like a simple business from the outside: you have space,
              people need somewhere to sleep, they pay you monthly. The parts that decide
              whether it works are less visible - which model you choose, how much capital the
              fit-out really needs, what your LGU expects, and whether you run it on paper or
              on a{" "}
              <Link href={APEX} className="font-bold underline" style={{ color: BLUE }}>
                {anchorFor(APEX, PATH)}
              </Link>
              .
            </p>
            <p>
              It is also a genuinely good business when it is run properly. Demand near schools and
              workplaces is durable, the income is monthly and predictable, and the operation can be
              run by one person for a long time before it needs staff.
            </p>
            <p>
              This guide covers the business end of it - the models and what each demands of you,
              where the capital goes, registration and permits, screening tenants and setting house
              rules, maintenance, and what actually drives profit.
            </p>
          </div>
        </div>
      </section>

      <article className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto space-y-14">
          {SECTIONS.map((section) => (
            <section key={section.id} id={section.id}>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-5" style={{ color: INK }}>
                {section.h2}
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: MUTED }}>
                {section.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              {section.aside && (
                <div className="mt-6 rounded-[22px] border-2 p-6" style={{ borderColor: INK, background: CREAM, boxShadow: `6px 6px 0 ${AMBER}` }}>
                  <p className="text-sm font-extrabold mb-3" style={{ color: INK }}>{section.aside.title}</p>
                  <ul className="space-y-2">
                    {section.aside.lines.map((line) => (
                      <li key={line} className="text-sm leading-relaxed flex gap-2" style={{ color: MUTED }}>
                        <span aria-hidden style={{ color: BLUE }}>—</span>
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}

          <section className="rounded-[22px] border-2 p-6" style={{ borderColor: INK, background: "#fff" }}>
            <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
              <strong style={{ color: INK }}>A note on figures and requirements.</strong> Permit
              processes, fees, and timelines vary by city and municipality and change over time.
              Nothing here is legal or financial advice - confirm anything that affects your money
              or your paperwork with your own LGU or a professional.
            </p>
          </section>

          <section id="how-smapey-handles-this" className="rounded-[26px] border-2 p-8" style={{ borderColor: INK, background: CREAM, boxShadow: `8px 8px 0 ${BLUE}` }}>
            <h2 className="text-2xl font-extrabold tracking-tight mb-4" style={{ color: INK }}>
              How Smapey handles this
            </h2>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: MUTED }}>
              <p>
                Smapey covers the operating half of the business. Occupancy counts beds rather than
                rooms, so you can see what is genuinely empty and act on it. Each bed carries its
                own rate, so lower decks can be priced for what they are worth instead of blended
                into a house average.
              </p>
              <p>
                Tenants report repairs by scanning a QR poster in their room - no app, no account -
                and each report lands with photos and a status you can track to resolved, with the
                cost recorded against the month. Cashflow adds up rent, utilities, and deposits
                against repairs and expenses to give you money in, money out, and net per month.
              </p>
              <p>
                This is the day-to-day layer of the same system that also handles rent billing, utilities, and tenant records.
              </p>
            </div>
          </section>
        </div>
      </article>

      <SiloChildren
        path={PATH}
        subheading="Detailed guides on the paperwork and the numbers."
      />

      <SiloRelatedHubs path={PATH} />
      <SiloUpwardLinks ctx={ctx} />
      <SiloFooter />
    </main>
  )
}
