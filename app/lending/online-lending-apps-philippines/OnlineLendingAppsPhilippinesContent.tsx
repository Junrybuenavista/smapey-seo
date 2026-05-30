import LendingLanding, { type LendingVariant } from "@/components/lending/LendingLanding"

const variant: LendingVariant = {
  currentPath: "/lending/online-lending-apps-philippines",
  navMode: "page",
  hero: {
    badge: "Online lending app for Filipino lenders",
    titleLead: "Run your online lending business",
    titleAccent: "anywhere in the Philippines",
    subtitle:
      "Smapey is the cloud-based lending app for lenders. Manage borrowers, issue loans, generate amortization schedules, and record GCash and bank payments from your phone or laptop — no installs, no spreadsheets.",
  },
  features: {
    eyebrow: "Lending, online and in sync",
    heading: "Your lending business, online and always in sync",
    sub: "Everything lives in the cloud — access your loan book, record payments, and check overdue accounts from any device, wherever your borrowers are.",
  },
  cta: {
    heading: "Take your lending business online",
    sub: "Free forever for small lenders. No card, no trial. Set up your online loan book and issue your first loan in minutes.",
  },
}

export default function OnlineLendingAppsPhilippinesContent() {
  return <LendingLanding variant={variant} />
}
