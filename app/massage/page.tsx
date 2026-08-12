import JsonLd from "@/components/JsonLd"
import {
  buildMetadata,
  softwareApplicationSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo"
import MassageContent from "./MassageContent"
import { FAQS } from "./faqs"

const PATH = "/massage"
const TITLE = "Massage & Spa Management App | Booking & Therapist Software | Smapey"
const DESCRIPTION = "Smapey Massage & Spa is a management app for massage businesses and wellness clinics. Book sessions, manage therapists and clients, publish a public booking page, and track revenue. Free plan available."

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
          softwareApplicationSchema({
            name: "Massage and Spa App",
            description: DESCRIPTION,
            path: PATH,
          }),
          faqSchema(FAQS),
          breadcrumbSchema(PATH),
        ]}
      />
      <MassageContent />
    </>
  )
}
