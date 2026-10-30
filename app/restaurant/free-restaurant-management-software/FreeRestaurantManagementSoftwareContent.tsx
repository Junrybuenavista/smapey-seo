import RestaurantLanding, { type RestaurantVariant } from "@/components/restaurant/RestaurantLanding"

const variant: RestaurantVariant = {
  currentPath: "/restaurant/free-restaurant-management-software",
  navMode: "page",
  hero: {
    badge: "Free restaurant management software",
    titleLead: "Free restaurant software.",
    titleAccent: "Permanently, not just a trial.",
    subtitle:
      "Smapey's free plan gives you a menu builder, counter and QR phone ordering, the kitchen and cashier screens, and a daily sales dashboard, forever, with no credit card. Upgrade only if you outgrow the free limits.",
  },
  features: {
    eyebrow: "Free Restaurant Software",
    heading: "What you get completely free",
    sub: "No 14-day trial. No credit card. The free plan includes 20 menu items, 100 orders per month, the kitchen and cashier screens, and all the core features, with no expiry date.",
  },
  cta: {
    heading: "Free restaurant software that actually stays free.",
    sub: "No trial, no card, no catch. Start with the free plan and upgrade only when your volume demands it.",
  },
  unique: {
    eyebrow: "The free plan, in full",
    heading: "What free covers here, and the point where it stops",
    intro:
      "Most free restaurant software is a trial wearing a different word. This one is not, so here are the actual numbers rather than letting you find them at the worst possible moment.",
    blocks: [
      {
        h: "What you get, permanently",
        p: "20 menu items, 100 orders a month, the kitchen and cashier screens, QR phone ordering, the TV calling page, the daily sales dashboard, and 2 team members. No credit card to sign up and no expiry date.",
      },
      {
        h: "Where you would outgrow it",
        p: "100 orders a month is roughly three a day, so a weekend-only stall may never reach it while a lunch counter will pass it in the first week. Only orders that reach the kitchen count, so a phone order nobody brings to the counter doesn't use one up. The 20-item menu limit usually binds first for anyone with a full a la carte list.",
      },
      {
        h: "What is not limited",
        p: "GCash payments, the TV calling page, order history, and the live status on the customer's phone work the same on the free plan as on any other. The ceilings are on menu size and monthly volume, not on which features you can use.",
      },
      {
        h: "No gateway taking a cut",
        p: "Because GCash payments go straight to your own wallet, there is no per-transaction fee on any plan, free included. What the customer sends is what you receive.",
      },
    ],
  },
}

export default function FreeRestaurantManagementSoftwareContent() {
  return <RestaurantLanding variant={variant} />
}
