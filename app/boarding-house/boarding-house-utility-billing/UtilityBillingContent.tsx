import Link from "next/link"
import SiloGuide, { type GuideSection } from "@/components/silo/SiloGuide"
import { anchorFor } from "@/lib/silo"

const HUB = "/boarding-house/boarding-house-management-and-billing-system"

const PATH = "/boarding-house/boarding-house-utility-billing"

const SECTIONS: GuideSection[] = [
  {
    id: "why-utilities-are-hard",
    h2: "Why utilities are harder than rent",
    body: [
      "Rent is agreed once and then repeats. A tenant knows their rate before they move in, it does not change without notice, and there is nothing to dispute. Utilities are the opposite on every count: the amount changes every month, nobody agreed to it in advance, and it arrives as a single figure for a space shared by several people.",
      "That combination is why utilities generate most of the friction in a boarding house. A tenant who accepts their rent without comment will question a four-hundred-peso electricity share, not because the amount is large but because they have no way to check it. The bill came to you, not to them.",
      "The way out is not a better argument at the end of the month. It is a method decided in advance, explained at move-in, and applied the same way every month - so that when the amount changes, the reason is visible and the tenant can follow the arithmetic themselves.",
    ],
  },
  {
    id: "allocation-methods",
    h2: "The three ways to split a shared bill",
    body: [
      "Equal split divides the bill by the number of occupants. It is the simplest to explain and the easiest to compute, and it is fair when everybody uses roughly the same amount - which in a bedspace room of workers on similar shifts is often true. Its weakness is obvious: the tenant with a rice cooker, a desk fan, and a gaming laptop pays the same as the one who is out fourteen hours a day.",
      "Fixed rate charges each tenant a set amount per month regardless of the actual bill - say a flat figure folded into the rent. It removes the monthly conversation entirely, and tenants like the predictability. The risk sits with you: a hot month or a new appliance can put the real bill well above what you collected, and raising a fixed rate is a negotiation with everyone at once.",
      "Sub-metering puts a meter on each room, or in some houses each bed's outlets, and bills actual consumption. It is the fairest method and the only one that answers a dispute with data rather than a principle. It also costs money to install, needs someone to read the meters every month, and adds a step to your billing that has to happen on time.",
      "Most houses land on equal split for water and internet - where individual usage genuinely does not vary much - and either equal split or sub-metering for electricity, which is where the real variation lives.",
    ],
    aside: {
      title: "Choosing between them",
      lines: [
        "Equal split - simplest, fair when usage is genuinely similar.",
        "Fixed rate - predictable for tenants, puts the risk on you.",
        "Sub-meter - fairest and dispute-proof, costs money and monthly effort.",
      ],
    },
  },
  {
    id: "the-arithmetic",
    h2: "Getting the arithmetic right, and keeping it fixed",
    body: [
      "There is a subtle trap in splitting a shared bill that catches a lot of homemade systems. Suppose a room's electric bill is divided among four tenants and one of them pays early. If you then compute everybody else's share from the remaining balance, each of the three suddenly appears to owe a third of what is left rather than their original quarter - and the numbers keep moving every time somebody pays.",
      "The correct approach is to fix each tenant's share when the bill is created and never recompute it. Their share is the bill divided by the number of occupants, full stop. What changes as people pay is how much of their own fixed share is still outstanding, not the share itself.",
      "This matters beyond the arithmetic. A share that moves is a share a tenant cannot verify, and the whole point of a stated method is that the tenant can check it. A number that was six hundred pesos yesterday and is eight hundred today destroys trust even when the total collected is correct.",
      "Mid-month move-ins and move-outs are the other place to be deliberate. If someone occupied the room for half the billing period, decide whether they carry a half share or a full one, write the rule down, and apply it consistently.",
    ],
  },
  {
    id: "showing-your-work",
    h2: "Show the computation, not just the total",
    body: [
      "The single most effective thing you can do about utility disputes is to stop sending totals and start sending computations. Not \"electricity: ₱600\" but the room's bill, the number of people it was divided among, and the resulting share.",
      "A tenant who can see that the room's bill was ₱2,400 and there are four of them does the arithmetic in their head, agrees, and pays. The same tenant given only ₱600 has to decide whether to trust you, and some months they will not.",
      "It also protects you. When a tenant queries a high month, you are both looking at the same figures, and the conversation becomes about the bill from the provider rather than about whether you calculated fairly. Very often the answer is simply that it was a hot month and everybody ran fans.",
      "Keep the provider's bill itself where you can produce it. Being able to show the original document ends the small number of disputes that showing your arithmetic does not.",
    ],
  },
  {
    id: "disputes",
    h2: "When a tenant disputes their share",
    body: [
      "Start by assuming the tenant is asking in good faith, because usually they are. A challenge to a utility share is almost always one of three things: the amount jumped compared with last month, they believe someone else in the room uses far more, or they were away for part of the period.",
      "The first is answered with history. If you can show the same room over several months, a spike usually explains itself - a hotter month, an extra occupant, a new appliance. The second is the genuine limitation of equal split, and it is worth being honest that this is the trade-off the method makes. If it keeps recurring in one room, that room is a candidate for sub-metering.",
      "The third is a policy question you should have settled before it was asked. A tenant who was in the province for three weeks will feel a full share is unfair; whether you agree is your call, but making it case by case is how you end up with different tenants on different terms and no way to explain either.",
      "What settles almost all of it is a record: what the room was billed, how it was divided, what each person paid and when. A dispute with a record takes two minutes. Without one it takes an evening and leaves both sides unhappy.",
    ],
  },
]

export default function UtilityBillingContent() {
  return (
    <SiloGuide
      path={PATH}
      eyebrow="Utility billing"
      h1="Boarding house utility billing explained"
      intro={[
        <>
          One electricity bill arrives for a room that four people share. Splitting it sounds
          like arithmetic and is really a policy question - which method you use, whether
          tenants can check it, and what happens when somebody disagrees. It is one half of{" "}
          <Link href={HUB} className="font-bold underline" style={{ color: "#2f6bff" }}>
            {anchorFor(HUB, PATH)}
          </Link>
          , the other being rent itself.
        </>,
        "Get it wrong and utilities become the recurring argument of your month, every month. Get it right and it becomes a line on a statement that nobody queries.",
        "This guide covers why utilities are harder than rent, the three ways to allocate a shared bill and what each costs you, the arithmetic trap that makes shares appear to move, and how to handle a dispute when it comes.",
      ]}
      sections={SECTIONS}
      product={{
        paragraphs: [
          "Smapey creates utility bills per room per month - electricity, water, internet, or anything you name yourself - and keeps them separate from rent so a tenant always sees which is which. You can enter a whole month in one pass with the rooms listed, or import from a spreadsheet template.",
          "Each tenant's share is fixed when the bill is created, so a roommate paying early never changes what anyone else owes. Statements show the room's total, the number of tenants it was split across, and the resulting share, so the tenant can check the arithmetic without asking. Payments record per tenant against the room's bill, and a single wrong entry can be undone without resetting everyone else's.",
        ],
        closing: "Utility billing is one part of",
      }}
      childrenSubheading="Worked examples and the choice between sub-meters and a flat rate."
    />
  )
}
