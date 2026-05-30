import LendingLanding, { type LendingVariant } from "@/components/lending/LendingLanding"

const variant: LendingVariant = {
  currentPath: "/lending",
  navMode: "anchors",
  hero: {
    badge: "All-in-one lending & loan management",
    titleLead: "Run your lending business",
    titleAccent: "without the spreadsheets",
    subtitle:
      "Borrowers, loans, amortization schedules, payments, and collections analytics — everything an independent lender needs, in one clean dashboard. No spreadsheets, no missed dues.",
  },
  features: {
    eyebrow: "Features",
    heading: "Built for lenders and lending businesses",
    sub: "From the first loan you issue to the final payment collected — every essential a small lending business needs, without the enterprise price tag.",
  },
  cta: {
    heading: "Ready to run your loan book with less stress?",
    sub: "Free forever. No card, no trial. Add your first borrower and issue your first loan in under ten minutes.",
  },
}

export default function LendingContent() {
  return <LendingLanding variant={variant} />
}
