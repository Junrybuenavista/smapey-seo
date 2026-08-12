import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import NailSalonManagementAppContent from "./NailSalonManagementAppContent"
import { FAQS } from "./faqs"

const PATH = "/salon/nail-salon-management-app"
const TITLE = "Nail Salon Management App | Appointment & Client Software | Smapey"
const DESCRIPTION = "Manage your nail salon with Smapey, book nail appointments, track client preferences, publish a public booking page, and monitor revenue from one simple dashboard."

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
      <NailSalonManagementAppContent />
    </>
  )
}
