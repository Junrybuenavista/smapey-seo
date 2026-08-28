import RestaurantLanding, { type RestaurantVariant } from "@/components/restaurant/RestaurantLanding"

const variant: RestaurantVariant = {
  currentPath: "/restaurant/restaurant-pos-system",
  navMode: "page",
  hero: {
    badge: "Restaurant POS system",
    titleLead: "A restaurant POS system",
    titleAccent: "without the hardware cost.",
    subtitle:
      "Smapey is a browser-based restaurant POS system for small restaurants and cafés. Menu builder, order intake, kitchen queue, and daily sales reports, no expensive terminal, no locked-in hardware.",
  },
  features: {
    eyebrow: "Restaurant POS System",
    heading: "POS features that actually matter for small restaurants",
    sub: "Skip the expensive hardware and bloated enterprise POS. Smapey gives you what a small restaurant actually needs (menu, orders, kitchen queue, and sales) for free.",
  },
  cta: {
    heading: "A restaurant POS system that fits your budget.",
    sub: "Free forever on the small-restaurant plan. No terminal fee, no setup cost, no long-term contract.",
  },
  unique: {
    eyebrow: "POS without the terminal",
    heading: "A restaurant POS that runs on what you already own",
    intro:
      "A traditional POS means buying a terminal, a printer, and a support contract before you take a single order. This one opens in a browser on the phone or tablet already sitting on your counter.",
    blocks: [
      {
        h: "No terminal to buy",
        p: "Open it in a browser on a phone, a tablet, or the laptop in the back office. There is no hardware to purchase, no installer to schedule, and nothing to replace when it breaks mid-service.",
      },
      {
        h: "GCash without a payment gateway",
        p: "Add your own GCash name, number, and QR in settings and they appear on the customer's phone after they order. They pay you directly, tap I've paid, and your staff confirm it. The money lands in your own GCash wallet: no gateway fees, no monthly cost, no KYC paperwork.",
      },
      {
        h: "Cash, GCash, or card, tracked per order",
        p: "Mark any order paid by cash, GCash, or card. Payment status sits on the orders list, so at the end of a shift you can see exactly what has been settled and what has not.",
      },
      {
        h: "It starts free",
        p: "20 menu items, 100 orders a month, the full kitchen queue and the daily sales dashboard, with no credit card. Enough to run a small carinderia or cafe before you decide to pay for anything.",
      },
    ],
  },
}

export default function RestaurantPosSystemContent() {
  return <RestaurantLanding variant={variant} />
}
