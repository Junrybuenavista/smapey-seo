import LendingLanding, { type LendingVariant } from "@/components/lending/LendingLanding"

const variant: LendingVariant = {
  currentPath: "/lending/lending-money-apps-philippines",
  navMode: "page",
  hero: {
    badge: "Lending money app for Filipino lenders",
    titleLead: "The lending money app",
    titleAccent: "for lenders in the Philippines",
    subtitle:
      "If you lend money for a living, Smapey is your app. Track who borrowed how much, generate amortization schedules automatically, and record every repayment by GCash, cash, or bank transfer, all in one place.",
  },
  features: {
    eyebrow: "For people who lend money",
    heading: "The lending money app that does the math for you",
    sub: "Stop tracking loans in a notebook. Issue loans, auto-compute interest and installments, and see exactly who owes you what and when.",
  },
  cta: {
    heading: "Lend money the organized way",
    sub: "Free forever for small lenders. No card, no trial. Add your borrowers and start tracking loans in minutes.",
  },
}

export default function LendingMoneyAppsPhilippinesContent() {
  return <LendingLanding variant={variant} />
}
