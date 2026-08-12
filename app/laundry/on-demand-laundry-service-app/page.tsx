import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import OnDemandContent from "./OnDemandContent"
import { FAQS } from "./faqs"

const PATH = "/laundry/on-demand-laundry-service-app"
const TITLE = "On-Demand Laundry Service App | Smapey LaundryOS"
const DESCRIPTION = "Smapey is an on-demand laundry service app for small shops, accept orders instantly, auto-notify customers when ready, and collect payments via GCash or cash."

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
      <OnDemandContent />
    </>
  )
}
