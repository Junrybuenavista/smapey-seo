import JsonLd from "@/components/JsonLd"
import {
  buildMetadata,
  softwareApplicationSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo"
import SiteNavbar from "@/components/SiteNavbar"
import ApexHubLinks from "@/components/silo/ApexHubLinks"
import SiloFooter from "@/components/silo/SiloFooter"
import BoardingHouseContent from "./BoardingHouseContent"
import { FAQS } from "./faqs"

const PATH = "/boarding-house"
const TITLE = "Boarding House Management System for Philippine Landlords | Smapey"
const DESCRIPTION =
  "Smapey is a boarding house management system for Philippine landlords. Track rooms and beds, collect rent via GCash or Maya, split utilities, and handle maintenance. Free plan available."

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
          softwareApplicationSchema({
            name: "Smapey Boarding House Manager",
            description: DESCRIPTION,
            path: PATH,
          }),
          faqSchema(FAQS),
          breadcrumbSchema(PATH),
        ]}
      />
      <SiteNavbar />
      <BoardingHouseContent />
      {/* The money page links only to the three hubs - never deeper, which
          would leak the equity the silo exists to accumulate. */}
      <ApexHubLinks />
      <SiloFooter />
    </>
  )
}
