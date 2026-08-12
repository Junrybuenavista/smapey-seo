import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import SmallBusinessContent from "./SmallBusinessContent"
import { FAQS } from "./faqs"

const PATH = "/car-rental/car-rental-software-for-small-business"
const TITLE = "Car Rental Software for Small Business | Smapey"
const DESCRIPTION = "Smapey is affordable car rental software built for small businesses, manage your fleet, customers, and rentals without the complexity of enterprise tools."

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
      <SmallBusinessContent />
    </>
  )
}
