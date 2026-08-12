import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import SalonManagementAppContent from "./SalonManagementAppContent"
import { FAQS } from "./faqs"

const PATH = "/salon/salon-management-app"
const TITLE = "Salon Management App | All-in-One Software for Salons | Smapey"
const DESCRIPTION = "Smapey is a salon management app that helps small salons book appointments, manage clients, publish a public booking page, and track revenue, all from one dashboard."

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
      <SalonManagementAppContent />
    </>
  )
}
