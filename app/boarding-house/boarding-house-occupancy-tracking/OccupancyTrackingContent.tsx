import Link from "next/link"
import SiloGuide, { type GuideSection } from "@/components/silo/SiloGuide"
import { anchorFor } from "@/lib/silo"

const HUB = "/boarding-house/bed-space-and-room-management"

const PATH = "/boarding-house/boarding-house-occupancy-tracking"

const SECTIONS: GuideSection[] = [
  {
    id: "what-you-are-counting",
    h2: "Deciding what you are actually counting",
    body: [
      "Occupancy is occupied slots divided by total slots. The formula is not the hard part - the hard part is that \"slot\" means different things in different houses, and the same house can produce wildly different figures depending on which definition it uses.",
      "Count rooms and a bedspace house looks close to full nearly all the time. A room with one occupant out of six is still an occupied room, so a house at a third of its earning capacity can report ninety percent occupancy. The number is not wrong, it is answering a question nobody asked.",
      "Count beds and the same house reports something closer to thirty-five percent - which is the figure that matches what arrives in your account, because you are paid per bed. For any house letting bedspace, beds are the unit that means something.",
      "The rule that follows is simple and often broken: pick one basis and never mix it. Comparing this month's bed-based occupancy against last year's room-based figure will tell you the business collapsed when nothing changed but the arithmetic.",
    ],
    aside: {
      title: "Same house, two answers",
      lines: [
        "Six rooms, six beds each - thirty-six beds total.",
        "Twelve tenants spread across all six rooms.",
        "Room-based: six of six occupied - one hundred percent.",
        "Bed-based: twelve of thirty-six - thirty-three percent.",
      ],
    },
  },
  {
    id: "capacity",
    h2: "What counts as capacity",
    body: [
      "The denominator deserves as much care as the numerator, and it is where owners quietly mislead themselves. Capacity should be the beds that exist and can be let today - not the beds you intend to build, and not the beds in a room you have taken out of service.",
      "Carrying aspirational capacity is the common version of this. You plan to add four more bunks next quarter, so the house is \"a forty-bed house\" in your head and in your spreadsheet. Every occupancy figure you compute until those bunks exist is depressed by beds that cannot earn anything, and a perfectly healthy house looks like it is failing.",
      "The opposite error is quieter but also real: leaving a room out of the count because it is being repaired, then forgetting to put it back. Occupancy looks great while a sixth of your house sits idle.",
      "Once beds are named individually, capacity mostly takes care of itself - it is simply how many beds are on the list. That is one of the underrated benefits of tracking beds as real things rather than as columns.",
    ],
  },
  {
    id: "reading-the-number",
    h2: "Reading the number over time",
    body: [
      "A single occupancy figure is nearly useless. Ninety percent is excellent in a house that was at sixty last quarter and worrying in one that was at ninety-eight. What you want is the trend, month by month, on a consistent basis.",
      "Seasonality is the biggest pattern you will find, and it is highly specific to who you let to. A house full of students empties on the academic calendar - predictably, every year, at the same time - and the owner who has that pattern written down markets for the next intake in advance instead of discovering empty beds in June. A house near a BPO hub has demand year-round and turns over on its own rhythm.",
      "Turnover is the other number worth watching alongside occupancy. Two houses can both sit at eighty percent while one replaces two tenants a year and the other replaces twenty. The second house is doing far more work for the same income, and the reasons - noise, maintenance response, a rule people dislike - are usually fixable once you can see them.",
      "Watch it per room as well as per house. A house at eighty percent where one room is permanently half empty is telling you something specific about that room: the ventilation, the distance to the bathroom, the price, or the upper decks.",
    ],
  },
  {
    id: "vacancy-cost",
    h2: "What an empty bed actually costs",
    body: [
      "An empty bed does not simply earn nothing. It continues to carry its share of the fixed costs - the loan or the rent on the building, the caretaker, the internet, the water minimum - so a vacancy is a monthly loss rather than a monthly zero.",
      "Putting a figure on it changes decisions. If a bed is worth three thousand pesos a month and it has been empty for two, the loss is not abstract; it is six thousand pesos, and it makes a five-hundred-peso price adjustment or a modest spend on advertising look obviously worthwhile.",
      "This is why occupancy is the most powerful of the three levers on profitability. Trimming costs helps at the margin and raising rates risks the tenants you have, but filling an empty bed adds close to pure margin, since the fixed costs are already being paid.",
      "It also reframes the upper-deck problem. An upper bunk sitting empty at a price nobody wants is earning nothing while costing you its share of everything. A lower price that fills it is almost always better than holding out for a rate the market has already declined.",
    ],
  },
]

export default function OccupancyTrackingContent() {
  return (
    <SiloGuide
      path={PATH}
      eyebrow="Occupancy tracking"
      h1="Tracking occupancy in a boarding house"
      intro={[
        <>
          Occupancy is the number every boarding house owner quotes and very few compute the
          same way. The formula is simple. What counts as a slot, what counts as capacity, and
          what the figure is compared against are where it goes wrong - which makes it
          inseparable from{" "}
          <Link href={HUB} className="font-bold underline" style={{ color: "#2f6bff" }}>
            {anchorFor(HUB, PATH)}
          </Link>
          .
        </>,
        "It matters because occupancy is the strongest lever you have on profit. An empty bed earns nothing while still carrying its share of the loan, the caretaker, and the electricity - so knowing precisely how full you are, and when you are emptiest, is worth more than most cost savings you could make.",
        "This guide covers choosing what to count, what belongs in capacity, reading the trend over time including seasonality, and what a vacancy actually costs you each month.",
      ]}
      sections={SECTIONS}
      product={{
        paragraphs: [
          "Smapey counts beds rather than rooms. In a bedspace room every bed is named and tracked individually, so capacity is simply the beds that exist and occupancy is the ones that are filled - a room with one free upper deck reads as partly vacant, which is what it is.",
          "The dashboard shows occupancy alongside active tenants and total capacity, and it updates the moment somebody moves in, transfers, or leaves. Stay history keeps every tenancy with its dates, so the pattern over a year - including the seasonal dip - is there to look at rather than something you have to remember.",
        ],
        closing: "Occupancy tracking is one part of",
      }}
      childrenSubheading="The formula, worked through with real numbers."
    />
  )
}
