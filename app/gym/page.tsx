import JsonLd from "@/components/JsonLd"
import {
  buildMetadata,
  faqSchema,
  breadcrumbSchema,
  softwareApplicationSchema,
} from "@/lib/seo"
import GymContent from "./GymContent"
import { FAQS } from "./faqs"

const PATH = "/gym"
const TITLE = "Gym Management Software | Free & Pro Plans | Smapey GymOS"
const DESCRIPTION =
  "Smapey GymOS is gym management software that handles member tracking, QR check-ins, subscription plans, and revenue reporting. Start free, no credit card required."

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
            name: "Smapey GymOS",
            description: DESCRIPTION,
            path: PATH,
          }),
          faqSchema(FAQS),
          breadcrumbSchema(PATH),
        ]}
      />
      <GymContent />
    </>
  )
}
