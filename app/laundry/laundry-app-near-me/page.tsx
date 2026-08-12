import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import LaundryAppNearMeContent from "./LaundryAppNearMeContent"
import { FAQS } from "./faqs"

const PATH = "/laundry/laundry-app-near-me"
const TITLE = "Laundry App Near Me | Find & Manage Local Laundry Shops | Smapey"
const DESCRIPTION = "Looking for a laundry app near you? Smapey LaundryOS helps local laundry shops manage orders, notify customers by SMS, and grow their business."

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
      <LaundryAppNearMeContent />
    </>
  )
}
