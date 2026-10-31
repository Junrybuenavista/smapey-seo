import RestaurantLanding, { type RestaurantVariant } from "@/components/restaurant/RestaurantLanding"

const variant: RestaurantVariant = {
  currentPath: "/restaurant/online-ordering-system",
  navMode: "page",
  hero: {
    badge: "Online ordering system",
    titleLead: "Let customers order from their phone",
    titleAccent: "with one QR code.",
    subtitle:
      "Smapey is an online ordering system for small restaurants, cafés, and canteens. Customers scan your QR code to order from their phone and pay by GCash, your cashier sends the order to the kitchen screen, a TV calls the number when it's ready, and daily sales are tracked automatically.",
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
    heading: "Let customers place their own order, without an app",
    intro:
      "Online ordering usually means joining a delivery platform and handing over a cut of every sale. QR ordering is the version where the customer does the typing and you keep the whole bill.",
    blocks: [
      {
        h: "One QR code for the whole shop",
        p: "Put it on the counter, the walls or the tables. Customers scan it, browse your live menu, and order themselves, then show their order number at the counter. There is no app to download and no account to create, which is the step most people abandon.",
      },
      {
        h: "Your menu, updated live",
        p: "The menu on the customer's phone is the one you edit in the dashboard. Mark an item sold out and it greys out on the customer's phone immediately, rather than being ordered and then apologised for.",
      },
      {
        h: "They can see where their food is",
        p: "After the cashier scans their order, the customer's phone shows Being prepared, then Ready to claim, and chimes when it's ready. That one change removes most of the is-my-food-coming interruptions your staff field.",
      },
      {
        h: "Staff can still take orders too",
        p: "QR ordering does not replace the counter. Your cashier takes orders on the Cashier screen as before, and both routes feed the same kitchen screen and the same 01 to 99 numbers.",
      },
    ],
  },
}

export default function OnlineOrderingSystemContent() {
  return <RestaurantLanding variant={variant} />
}
