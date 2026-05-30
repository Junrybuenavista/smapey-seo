import RestaurantLanding, { type RestaurantVariant } from "@/components/restaurant/RestaurantLanding"

const variant: RestaurantVariant = {
  currentPath: "/restaurant/restaurant-management-software",
  navMode: "page",
  hero: {
    badge: "Restaurant management software",
    titleLead: "Restaurant management software",
    titleAccent: "built for small operations.",
    subtitle:
      "Smapey is restaurant management software for small restaurants, cafés, and canteens. Build your menu, manage orders, run the kitchen queue, and track daily revenue — all from one browser-based dashboard.",
  },
  features: {
    eyebrow: "Restaurant Management Software",
    heading: "Manage your restaurant without the enterprise price tag",
    sub: "Most restaurant management software is built for chains with a hundred locations. Smapey is built for the restaurant with one or two — and priced accordingly.",
  },
  cta: {
    heading: "Restaurant management software that fits your business.",
    sub: "Free forever for small restaurants. No setup cost, no long-term contract, no IT team required.",
  },
}

export default function RestaurantManagementSoftwareContent() {
  return <RestaurantLanding variant={variant} />
}
