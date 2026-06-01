import RestaurantLanding, { type RestaurantVariant } from "@/components/restaurant/RestaurantLanding"

const variant: RestaurantVariant = {
  currentPath: "/restaurant/online-ordering-system",
  navMode: "page",
  hero: {
    badge: "Online ordering system",
    titleLead: "Let customers order from their phone",
    titleAccent: "with a table QR code.",
    subtitle:
      "Smapey is an online ordering system for small restaurants, cafés, and canteens. Customers scan a QR code at the table to order and pay by GCash, staff can place orders from any device, the kitchen queue updates in real time, and daily sales are tracked automatically.",
  },
  features: {
    eyebrow: "Online Ordering System",
    heading: "QR ordering and management from any device",
    sub: "No app to install, no hardware to buy. Customers scan, browse your live menu, and order from their phone — and your staff can take orders from any browser too.",
  },
  cta: {
    heading: "Start taking orders online in five minutes.",
    sub: "Free forever for small operations. No setup fee, no hardware. Just a browser and your menu.",
  },
}

export default function OnlineOrderingSystemContent() {
  return <RestaurantLanding variant={variant} />
}
