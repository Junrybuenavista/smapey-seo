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
    sub: "No app to install, no hardware to buy. Customers scan, browse your live menu, and order from their phone, and your staff can take orders from any browser too.",
  },
  cta: {
    heading: "Start taking orders online in five minutes.",
    sub: "Free forever for small operations. No setup fee, no hardware. Just a browser and your menu.",
  },
  unique: {
    eyebrow: "Ordering from the customer's phone",
    heading: "Let the table place its own order, without an app",
    intro:
      "Online ordering usually means joining a delivery platform and handing over a cut of every sale. Table QR ordering is the version where the customer does the typing and you keep the whole bill.",
    blocks: [
      {
        h: "One QR code per table",
        p: "Print a code for each table. Customers scan it, browse your live menu, and place the order themselves. There is no app to download and no account to create, which is the step most people abandon.",
      },
      {
        h: "Your menu, updated live",
        p: "The menu on the customer's phone is the one you edit in the dashboard. Toggle an item 86'd and it disappears from the table's view immediately, rather than being ordered and then apologised for.",
      },
      {
        h: "They can see where their food is",
        p: "After ordering, the customer's phone shows Order received, then Being prepared, then Ready to serve. That one change removes most of the is-my-food-coming interruptions your floor staff field.",
      },
      {
        h: "Staff can still take orders too",
        p: "QR ordering does not replace the counter. Your team places orders from the dashboard exactly as before, and both routes feed the same kitchen queue.",
      },
    ],
  },
}

export default function OnlineOrderingSystemContent() {
  return <RestaurantLanding variant={variant} />
}
