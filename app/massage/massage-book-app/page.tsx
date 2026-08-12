import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import MassageBookAppContent from "./MassageBookAppContent"
import { FAQS } from "./faqs"

const PATH = "/massage/massage-book-app"
const TITLE = "Massage Book App | Digital Appointment Book for Spas | Smapey"
const DESCRIPTION = "Replace your paper massage appointment book with a cloud massage book app. See every therapist's day at a glance, take bookings online, and never lose a client record again."

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
      <MassageBookAppContent />
    </>
  )
}
