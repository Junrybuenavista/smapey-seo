import JsonLd from "@/components/JsonLd"
import {
  buildMetadata,
  softwareApplicationSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo"
import BarbershopContent from "./BarbershopContent"
import { FAQS } from "./faqs"

const PATH = "/barbershop"
const TITLE = "Barbershop Management System Philippines | Smapey Barbershop"
const DESCRIPTION = "Barbershop management system and POS for Philippine barbershops. A walk-in queue with each barber's wait, barber commission worked out per cut, daily closing and customer texts. Free plan."

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
            name: "Smapey Barbershop",
            description: DESCRIPTION,
            path: PATH,
          }),
          faqSchema(FAQS),
          breadcrumbSchema(PATH),
        ]}
      />
      <BarbershopContent />
    </>
  )
}
