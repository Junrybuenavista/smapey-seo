import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import FreeLaundryAppContent from "./FreeLaundryAppContent"
import { FAQS } from "./faqs"

const PATH = "/laundry/free-laundry-app"
const TITLE = "Free Laundry App | No Credit Card | Smapey LaundryOS"
const DESCRIPTION = "Run your laundry shop for free. Smapey's free laundry app includes order tracking, customer management, and basic dashboard, no credit card required."

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
      <FreeLaundryAppContent />
    </>
  )
}
