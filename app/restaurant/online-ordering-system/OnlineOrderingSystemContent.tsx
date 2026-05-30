import RestaurantLanding, { type RestaurantVariant } from "@/components/restaurant/RestaurantLanding"

const variant: RestaurantVariant = {
  currentPath: "/restaurant/online-ordering-system",
  navMode: "page",
  hero: {
    badge: "Online ordering system",
    titleLead: "Take dine-in and takeaway orders",
    titleAccent: "from one dashboard.",
    subtitle:
      "Smapey is an online ordering system for small restaurants, cafés, and canteens. Staff place orders on any device, the kitchen queue updates in real time, and daily sales are tracked automatically.",
  },
  features: {
    eyebrow: "Online Ordering System",
    heading: "Order management from any device, any browser",
    sub: "No app to install, no hardware to buy. Your staff opens a browser, logs in, and starts taking orders — dine-in or takeaway — in minutes.",
  },
  cta: {
    heading: "Start taking orders online in five minutes.",
    sub: "Free forever for small operations. No setup fee, no hardware. Just a browser and your menu.",
  },
}

export default function OnlineOrderingSystemContent() {
  return <RestaurantLanding variant={variant} />
}
