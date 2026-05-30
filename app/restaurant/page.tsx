export const metadata = {
  title: "Food Ordering Manager | Menu, Orders & Kitchen Queue | Smapey",
  description: "Smapey Food Ordering Manager handles menu building, dine-in and takeaway orders, kitchen queue tracking, and daily sales reporting for small restaurants and cafés. Start free — no credit card required.",
  alternates: {
    canonical: "https://smapey.com/restaurant",
  },
}

import RestaurantContent from "./RestaurantContent"

export default function Page() {
  return <RestaurantContent />
}
