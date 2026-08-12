import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import BookAMassageAppContent from "./BookAMassageAppContent"
import { FAQS } from "./faqs"

const PATH = "/massage/book-a-massage-app"
const TITLE = "Book a Massage App | Online Massage Booking for Clients | Smapey"
const DESCRIPTION = "Let your clients book a massage online in seconds. Pick a therapist, choose a treatment, and confirm with a deposit, all from your branded public booking page. Free for your spa."

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
      <BookAMassageAppContent />
    </>
  )
}
