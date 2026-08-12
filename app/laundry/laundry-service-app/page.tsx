import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import LaundryServiceAppContent from "./LaundryServiceAppContent"
import { FAQS } from "./faqs"

const PATH = "/laundry/laundry-service-app"
const TITLE = "Laundry Service App | Manage Orders & Customers | Smapey"
const DESCRIPTION = "A laundry service app built for small shops. Manage walk-in orders, send SMS updates to customers, and track payments, all from one simple dashboard."

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
      <LaundryServiceAppContent />
    </>
  )
}
