import LendingLanding, { type LendingVariant } from "@/components/lending/LendingLanding"

const variant: LendingVariant = {
  currentPath: "/lending/loan-app-philippines",
  navMode: "page",
  hero: {
    badge: "Loan app for lenders in the Philippines",
    titleLead: "The loan app for lenders",
    titleAccent: "in the Philippines",
    subtitle:
      "Smapey Lending is the app you use to run your own loan business, issue loans, generate amortization schedules, and track GCash, cash, and bank payments. Built for Filipino lenders, lending offices, and sangla businesses.",
  },
  features: {
    eyebrow: "Why lenders choose Smapey",
    heading: "A loan app built for Philippine lenders",
    sub: "Everything you need to issue loans and collect payments, borrowers, amortization schedules, GCash and bank tracking, and collections analytics in one dashboard.",
  },
  cta: {
    heading: "Start lending smarter today",
    sub: "Free forever for small lenders. No card, no trial. Add your first borrower and issue your first loan in under ten minutes.",
  },
}

export default function LoanAppPhilippinesContent() {
  return <LendingLanding variant={variant} />
}
