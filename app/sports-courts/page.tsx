import JsonLd from "@/components/JsonLd"
import {
  buildMetadata,
  softwareApplicationSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo"
import SportsCourtsContent from "./SportsCourtsContent"
import { FAQS } from "./faqs"

const PATH = "/sports-courts"
const TITLE = "Free Pickleball Court Booking System Philippines | Smapey"
const DESCRIPTION = "Free court booking system for Philippine pickleball, badminton, tennis and padel venues: a schedule that can't double-book, GCash deposits and daily closing."

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
            name: "Smapey Sports Courts",
            description: DESCRIPTION,
            path: PATH,
          }),
          faqSchema(FAQS),
          breadcrumbSchema(PATH),
        ]}
      />
      <SportsCourtsContent />
    </>
  )
}
