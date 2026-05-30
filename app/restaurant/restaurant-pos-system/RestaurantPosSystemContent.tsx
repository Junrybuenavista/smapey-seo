import RestaurantLanding, { type RestaurantVariant } from "@/components/restaurant/RestaurantLanding"

const variant: RestaurantVariant = {
  currentPath: "/restaurant/restaurant-pos-system",
  navMode: "page",
  hero: {
    badge: "Restaurant POS system",
    titleLead: "A restaurant POS system",
    titleAccent: "without the hardware cost.",
    subtitle:
      "Smapey is a browser-based restaurant POS system for small restaurants and cafés. Menu builder, order intake, kitchen queue, and daily sales reports — no expensive terminal, no locked-in hardware.",
  },
  features: {
    eyebrow: "Restaurant POS System",
    heading: "POS features that actually matter for small restaurants",
    sub: "Skip the expensive hardware and bloated enterprise POS. Smapey gives you what a small restaurant actually needs — menu, orders, kitchen queue, and sales — for free.",
  },
  cta: {
    heading: "A restaurant POS system that fits your budget.",
    sub: "Free forever on the small-restaurant plan. No terminal fee, no setup cost, no long-term contract.",
  },
}

export default function RestaurantPosSystemContent() {
  return <RestaurantLanding variant={variant} />
}
