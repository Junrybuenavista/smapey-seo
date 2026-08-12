import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import SpaManagementAppContent from "./SpaManagementAppContent"
import { FAQS } from "./faqs"

const PATH = "/massage/spa-management-app"
const TITLE = "Spa Management App | All-in-One Spa & Wellness Software | Smapey"
const DESCRIPTION = "Spa management app for treatments, therapists, deposits, and analytics. Run your spa from one clean dashboard, with a branded public booking page included. Free plan available."

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
      <SpaManagementAppContent />
    </>
  )
}
