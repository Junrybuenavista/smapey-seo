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
}

export default function FoodOrderingSystemContent() {
  return <RestaurantLanding variant={variant} />
}
