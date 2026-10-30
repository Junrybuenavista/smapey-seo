import RestaurantLanding, { type RestaurantVariant } from "@/components/restaurant/RestaurantLanding"

import type { BlogPost } from "@/lib/blog"

const variant: RestaurantVariant = {
  currentPath: "/restaurant",
  navMode: "anchors",
  hero: {
    badge: "Food ordering & kitchen management",
    titleLead: "Take every order,",
    titleAccent: "call every number.",
    subtitle:
      "Build your menu, take orders at the counter or by phone, run the kitchen and cashier screens, and track daily sales, all from one clean dashboard. Free forever, no card required.",
  },
  features: {
    eyebrow: "Features",
    heading: "Built for restaurants, cafés, and canteens",
    sub: "From your first menu item to your hundredth order, every essential a small food business needs, without the enterprise price tag.",
  },
  cta: {
    heading: "Ready to take your first order?",
    sub: "Free forever. No card, no trial. Build your menu and start taking orders in under five minutes.",
  },
}

export default function RestaurantContent({ guides = [] }: { guides?: BlogPost[] }) {
  return <RestaurantLanding variant={variant} guides={guides} />
}
