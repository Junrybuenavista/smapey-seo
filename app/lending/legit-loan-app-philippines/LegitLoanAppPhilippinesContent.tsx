import LendingLanding, { type LendingVariant } from "@/components/lending/LendingLanding"

const variant: LendingVariant = {
  currentPath: "/lending/legit-loan-app-philippines",
  navMode: "page",
  hero: {
    badge: "A legit loan app for professional lenders",
    titleLead: "A legit loan app",
    titleAccent: "for serious lenders in the Philippines",
    subtitle:
      "Run your lending business the legit way. Smapey keeps clean, auditable records of every borrower, loan, and payment — with amortization schedules and a clear repayment history you can stand behind.",
  },
  features: {
    eyebrow: "Built for professional lenders",
    heading: "Keep your lending business clean and legit",
    sub: "Transparent terms, automatic amortization, and a full payment trail for every loan — so your records are accurate, organized, and ready whenever you need them.",
  },
  cta: {
    heading: "Lend with clean, legit records",
    sub: "Free forever for small lenders. No card, no trial. Bring order and transparency to your loan book in minutes.",
  },
}

export default function LegitLoanAppPhilippinesContent() {
  return <LendingLanding variant={variant} />
}
