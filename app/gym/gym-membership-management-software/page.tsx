import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import MembershipContent from "./MembershipContent"
import { FAQS } from "./faqs"

const PATH = "/gym/gym-membership-management-software"
const TITLE = "Gym Membership Management Software | Smapey GymOS"
const DESCRIPTION = "Track, renew, and manage gym memberships effortlessly. GymOS gives you complete control over member profiles, subscriptions, and expiry dates."

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
})

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          faqSchema(FAQS),
          breadcrumbSchema(PATH),
        ]}
      />
      <MembershipContent />
    </>
  )
}
