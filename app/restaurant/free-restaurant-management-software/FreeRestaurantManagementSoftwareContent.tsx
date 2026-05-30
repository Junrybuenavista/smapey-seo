import RestaurantLanding, { type RestaurantVariant } from "@/components/restaurant/RestaurantLanding"

const variant: RestaurantVariant = {
  currentPath: "/restaurant/free-restaurant-management-software",
  navMode: "page",
  hero: {
    badge: "Free restaurant management software",
    titleLead: "Free restaurant software.",
    titleAccent: "Permanently, not just a trial.",
    subtitle:
      "Smapey's free plan gives you a menu builder, kitchen queue, dine-in and takeaway orders, and a daily sales dashboard — forever, with no credit card. Upgrade only if you outgrow the free limits.",
  },
  features: {
    eyebrow: "Free Restaurant Software",
    heading: "What you get completely free",
    sub: "No 14-day trial. No credit card. The free plan includes 20 menu items, 100 orders per month, the full kitchen queue, and all the core features — with no expiry date.",
  },
  cta: {
    heading: "Free restaurant software that actually stays free.",
    sub: "No trial, no card, no catch. Start with the free plan and upgrade only when your volume demands it.",
  },
}

export default function FreeRestaurantManagementSoftwareContent() {
  return <RestaurantLanding variant={variant} />
}
