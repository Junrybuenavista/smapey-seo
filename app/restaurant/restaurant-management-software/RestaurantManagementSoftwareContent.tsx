import RestaurantLanding, { type RestaurantVariant } from "@/components/restaurant/RestaurantLanding"

const variant: RestaurantVariant = {
  currentPath: "/restaurant/restaurant-management-software",
  navMode: "page",
  hero: {
    badge: "Restaurant management software",
    titleLead: "Restaurant management software",
    titleAccent: "built for small operations.",
    subtitle:
      "Smapey is restaurant management software for small restaurants, cafés, and canteens. Build your menu, manage orders, run the kitchen queue, and track daily revenue, all from one browser-based dashboard.",
  },
  features: {
    eyebrow: "Restaurant Management Software",
    heading: "Manage your restaurant without the enterprise price tag",
    sub: "Most restaurant management software is built for chains with a hundred locations. Smapey is built for the restaurant with one or two, and priced accordingly.",
  },
  cta: {
    heading: "Restaurant management software that fits your business.",
    sub: "Free forever for small restaurants. No setup cost, no long-term contract, no IT team required.",
  },
  unique: {
    eyebrow: "Beyond taking orders",
    heading: "The parts of running a restaurant that are not the till",
    intro:
      "Taking the order is the easy half. Management software earns its place in the hours around service: setting up, keeping track, and closing out.",
    blocks: [
      {
        h: "A menu you can actually maintain",
        p: "Build categories, add items with photos, descriptions and prices, and toggle anything available or 86'd in seconds. The change reaches everyone placing orders at once.",
      },
      {
        h: "A record you can search later",
        p: "Filter order history by status, type, or date, and open any order to see its line items, total, and payment status. Useful when a customer queries a bill from last Tuesday.",
      },
      {
        h: "Numbers that answer the real question",
        p: "Revenue and order count for today, a seven-day trend, and a top-selling items chart. Enough to tell you which dish is carrying the menu and which one is only taking up space on it.",
      },
      {
        h: "Two people before it costs anything",
        p: "The free tier includes two team members, so an owner and one staff member can both be working in it before there is any cost.",
      },
    ],
  },
}

export default function RestaurantManagementSoftwareContent() {
  return <RestaurantLanding variant={variant} />
}
