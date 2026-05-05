export const metadata = {
  title: "Gym Membership Management Software | Smapey GymOS",
  description: "Track, renew, and manage gym memberships effortlessly. GymOS gives you complete control over member profiles, subscriptions, and expiry dates.",
  alternates: {
    canonical: "https://smapey.com/gym/membership-management",
  },
}

import MembershipContent from "./MembershipContent"

export default function Page() {
  return <MembershipContent />
}
