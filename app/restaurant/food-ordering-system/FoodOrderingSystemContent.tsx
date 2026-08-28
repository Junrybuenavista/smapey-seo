import RestaurantLanding, { type RestaurantVariant } from "@/components/restaurant/RestaurantLanding"

const variant: RestaurantVariant = {
  currentPath: "/restaurant/food-ordering-system",
  navMode: "page",
  hero: {
    badge: "Food order management system",
    titleLead: "A food ordering system",
    titleAccent: "built for small restaurants.",
    subtitle:
      "Smapey is a food order management system for restaurants, cafés, canteens, and food stalls. Build your menu, intake dine-in and takeaway orders, manage the kitchen queue, and track daily sales, free.",
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
    eyebrow: "From table to kitchen",
    heading: "What happens to an order between the table and the till",
    intro:
      "A food ordering system is mostly about one thing: making sure the order that reaches the kitchen is the order the customer actually asked for.",
    blocks: [
      {
        h: "Dine-in and takeaway, told apart",
        p: "Assign a table number for dine-in or a customer name for takeaway. Add notes on individual items and a memo for the whole order, so no onions reaches the person cooking instead of staying in someone's head.",
      },
      {
        h: "One queue everybody works from",
        p: "Every order lands as Pending, moves to Preparing when cooking starts, Ready when the food is up, and Completed when it is served. Nobody has to ask what to start next.",
      },
      {
        h: "Orders you can cancel cleanly",
        p: "An order can be cancelled while it is Pending or Preparing. After that it stays part of the day's record, which is what you want when you are reconciling at close.",
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
