import SiloGuide, { type GuideSection } from "@/components/silo/SiloGuide"

const PATH = "/boarding-house/boarding-house-permits-and-roi"

const SECTIONS: GuideSection[] = [
  {
    id: "what-registration-involves",
    h2: "What registering a boarding house involves",
    body: [
      "Letting rooms for profit is a business, and the paperwork treats it as one. In broad strokes that means registering the business itself, clearing it with your barangay, obtaining a permit from your city or municipality, and registering with the BIR so the income is declared. Depending on the building and the locality, there are usually safety and sanitary inspections attached.",
      "The order and the specifics vary more than newcomers expect. Which office you start at, what supporting documents they want, what it costs, and how long each step takes genuinely differ between LGUs - two owners in neighbouring cities will describe noticeably different processes and both will be right.",
      "That variation is why this page does not give you a figure. Any peso amount published for permits is a snapshot of one city at one moment, and using it as a budget is how people end up short. Ask your own city hall, and ask early - the answer shapes your timeline as much as your costs.",
      "Permits also renew, usually every year. Putting the renewal dates in a calendar the moment you receive each one is a two-minute task that prevents the specific unpleasantness of discovering a lapsed permit at an inspection.",
    ],
    aside: {
      title: "Typically involved - confirm locally",
      lines: [
        "Business name registration.",
        "Barangay clearance.",
        "Mayor's or business permit from your city or municipality.",
        "BIR registration.",
        "Fire safety and sanitary inspection, depending on the building.",
      ],
    },
  },
  {
    id: "where-the-capital-goes",
    h2: "Where the capital actually goes",
    body: [
      "The building is the visible cost, whether you are buying, or leasing to sublet. What gets underestimated is everything required to turn a house into a boarding house, particularly for bedspace.",
      "Fit-out is the largest line and it is construction, not shopping. Bunks and mattresses are the cheap part. The expensive parts are electrical work to put enough outlets where people actually need them, ventilation or aircon, plumbing that survives eight people getting ready inside the same hour, and security - locks, a gate, often cameras in the common areas.",
      "Then there is working capital, which is the item most often missing from a plan. Electricity, water, internet, and a caretaker all have to be paid while the house fills, and a new house does not fill immediately. Running out of cash waiting for occupancy to climb is a more common failure than any single overspend.",
      "Budget a contingency you genuinely expect to use. Older buildings in particular reveal their wiring and their plumbing only once work begins, and a fit-out that discovers a problem halfway through is a fit-out that stops until more money appears.",
    ],
  },
  {
    id: "the-cost-side",
    h2: "The cost side people leave out",
    body: [
      "Revenue is easy to model and pleasant to think about: beds times rate times twelve. The cost side is where honest projections separate from optimistic ones, and there are five lines that get missed with striking regularity.",
      "Vacancy is the first. Assuming full occupancy for twelve months is not a forecast, it is a wish. Every house has turnover, and every turnover has a gap. Modelling at a realistic occupancy rather than a hoped-for one changes the answer substantially.",
      "Utilities are the second and are larger than most expect, because common areas - corridors, the shared bathroom, the water pump, the wifi - consume power that no individual tenant is billed for. Third is the caretaker, if you have one, which you will want once the house is beyond a certain size or you value your evenings.",
      "Fourth is maintenance, which in a house where eight people share a bathroom runs well above what a family home costs. Fifth is tax, which is not optional once you are registered, and which a surprising number of first projections simply omit.",
    ],
    aside: {
      title: "The five most-missed cost lines",
      lines: [
        "Vacancy - the months a bed sits empty between tenants.",
        "Common-area utilities nobody is individually billed for.",
        "Caretaker or staff, once the house outgrows one person.",
        "Maintenance at shared-bathroom rates, not family-home rates.",
        "Tax on declared income.",
      ],
    },
  },
  {
    id: "modelling-returns",
    h2: "Modelling returns without fooling yourself",
    body: [
      "A useful model is not a single number. It is three: a pessimistic case, a realistic one, and an optimistic one, differing mainly in occupancy and in what you assume about rates. If the pessimistic case still services the loan, the project is robust. If only the optimistic case works, you are relying on nothing going wrong for several years.",
      "Payback period - how long before the accumulated net covers what you put in - is the figure most owners actually care about, and it is the one most distorted by leaving out the cost lines above. A model that omits vacancy and tax can easily halve the apparent payback, which is the difference between a good decision and a bad one.",
      "Be specific about what you are comparing against. Money in a boarding house is money not in something else, and a return that looks strong in isolation may look ordinary against the alternatives once you account for the fact that this one comes with a job attached.",
      "Finally, model the operating reality, not just the arithmetic. A forty-bed bedspace house and an eight-room private-let house can show similar annual income while demanding completely different amounts of your time. The spreadsheet will not tell you that; only thinking about your week will.",
    ],
  },
]

export default function PermitsAndRoiContent() {
  return (
    <SiloGuide
      path={PATH}
      eyebrow="Permits & ROI"
      h1="Boarding house permits, costs, and returns"
      intro={[
        "Two questions decide whether a boarding house happens: what the paperwork requires, and whether the numbers work. They are usually researched separately and they belong together, because the permits and the fit-out are a large part of what the returns have to pay back.",
        "Both are areas where confident published figures do more harm than good. Permit costs and processes vary by LGU and change; returns depend on your building, your location, and an occupancy rate nobody can promise you.",
        "This guide covers what registration typically involves, where the capital actually goes, the cost lines most projections leave out, and how to model returns in a way that survives contact with a real year.",
      ]}
      sections={SECTIONS}
      disclaimer="Permit requirements, fees, and processing times differ by city and municipality and change over time, and returns depend on your own building, location, and occupancy. Nothing on this page is legal, tax, or financial advice - confirm anything that affects your money or your paperwork with your own LGU or a professional before you rely on it."
      product={{
        paragraphs: [
          "Smapey does not file your permits, but it does produce the numbers the second half of this page depends on. Cashflow adds up rent, utility payments, and deposits against repairs and expenses, giving money in, money out, and net for each month - the actual figures rather than a projection.",
          "Occupancy counts beds rather than rooms, so the vacancy assumption in your model can be checked against what really happened. Maintenance costs are recorded against the month they were resolved, which is usually the line that reveals whether the original projection was honest.",
        ],
        closing: "Knowing your real numbers is one part of",
      }}
      childrenSubheading="Permit checklists, a sample business plan, and a full ROI breakdown."
    />
  )
}
