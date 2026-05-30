import LendingLanding, { type LendingVariant } from "@/components/lending/LendingLanding"

const variant: LendingVariant = {
  currentPath: "/lending/best-loan-app-philippines",
  navMode: "page",
  hero: {
    badge: "The best loan app for lending businesses",
    titleLead: "The best loan app in the Philippines",
    titleAccent: "for running your loan book",
    subtitle:
      "The best loan app isn't one you borrow from — it's the one you run your lending business on. Smapey gives Filipino lenders amortization schedules, GCash and bank payment tracking, overdue alerts, and real collections analytics.",
  },
  features: {
    eyebrow: "What makes it the best",
    heading: "Everything the best lending app should do",
    sub: "Issue loans in seconds, auto-generate amortization schedules, track every peso collected, and watch your repayment and default rates in real time.",
  },
  cta: {
    heading: "Run your loan book on the best",
    sub: "Free forever for small lenders. No card, no trial. See why lending businesses across the Philippines choose Smapey.",
  },
}

export default function BestLoanAppPhilippinesContent() {
  return <LendingLanding variant={variant} />
}
