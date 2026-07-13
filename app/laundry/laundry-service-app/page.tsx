export const metadata = {
  title: "Laundry Service App | Manage Orders & Customers | Smapey",
  description:
    "A laundry service app built for small shops. Manage walk-in orders, send SMS updates to customers, and track payments, all from one simple dashboard.",
  alternates: {
    canonical: "https://smapey.com/laundry/laundry-service-app",
  },
}

import LaundryServiceAppContent from "./LaundryServiceAppContent"

export default function Page() {
  return <LaundryServiceAppContent />
}
