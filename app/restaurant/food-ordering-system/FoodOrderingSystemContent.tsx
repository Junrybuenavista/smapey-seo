import RestaurantLanding, { type RestaurantVariant } from "@/components/restaurant/RestaurantLanding"

const variant: RestaurantVariant = {
  currentPath: "/restaurant/food-ordering-system",
  navMode: "page",
  hero: {
    badge: "Food order management system",
    titleLead: "A food ordering system",
    titleAccent: "built for small restaurants.",
    subtitle:
      "Smapey is a food order management system for restaurants, cafés, canteens, and food stalls. Build your menu, take dine-in and take-out orders at the counter or by QR code, run the kitchen screen, and track daily sales, free.",
  },
  features: {
    eyebrow: "Food Order Management",
    heading: "Everything a food ordering system should do",
    sub: "From menu creation to completed order, every feature a small food business needs to manage orders without paper tickets or group chats.",
  },
  cta: {
    heading: "The food order management system built for your size.",
    sub: "Free forever for small operations. No spreadsheets, no paper tickets, no missed orders.",
  },
  unique: {
    eyebrow: "From counter to kitchen",
    heading: "What happens to an order between the counter and the kitchen",
    intro:
      "A food ordering system is mostly about one thing: making sure the order that reaches the kitchen is the order the customer actually asked for.",
    blocks: [
      {
        h: "Dine-in and takeaway, told apart",
        p: "Mark each order dine-in or take-out so the kitchen knows plate or box. Add notes on individual items and a memo for the whole order, so no onions reaches the person cooking instead of staying in someone's head.",
      },
      {
        h: "One screen for the kitchen, one for the counter",
        p: "Every order lands on the kitchen screen, oldest first. When it's on a tray, the cook taps Ready and it moves to the cashier's Ready column with its tray letter. Nobody has to ask what to start next.",
      },
      {
        h: "Orders you can cancel cleanly",
        p: "Staff can cancel an unpaid order; a paid one needs an owner or admin. A handed-over order stays part of the day's record, which is what you want when you are reconciling at close.",
      },
      {
        h: "The day adds itself up",
        p: "Today's revenue, order count, and a status breakdown sit on one screen, with a seven-day trend and your top sellers updating as orders come in.",
      },
    ],
  },
}

export default function FoodOrderingSystemContent() {
  return <RestaurantLanding variant={variant} />
}
