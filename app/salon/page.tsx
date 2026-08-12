import JsonLd from "@/components/JsonLd"
import {
  buildMetadata,
  softwareApplicationSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo"
import SalonContent from "./SalonContent"
import { FAQS } from "./faqs"

const PATH = "/salon"
const TITLE = "Salon Management App | Appointment & Client Software | Smapey SalonOS"
const DESCRIPTION = "Smapey SalonOS is a salon management app for small salons and beauty studios. Book appointments, manage clients, publish a public booking page, and track revenue. Free plan available."

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
            name: "Salon Management App",
            description: DESCRIPTION,
            path: PATH,
          }),
          faqSchema(FAQS),
          breadcrumbSchema(PATH),
        ]}
      />
      <SalonContent />
    </>
  )
}
