import JsonLd from "@/components/JsonLd"
import {
  buildMetadata,
  softwareApplicationSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo"
import LaundryContent from "./LaundryContent"
import { FAQS } from "./faqs"

const PATH = "/laundry"
const TITLE = "Laundry App | Laundry Shop Management Software | Smapey LaundryOS"
const DESCRIPTION = "Smapey LaundryOS is a laundry app for small laundry shops. Track orders, send SMS notifications, manage customers, and accept GCash or cash payments. Free plan available."

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
            name: "Laundry Shop App",
            description: DESCRIPTION,
            path: PATH,
          }),
          faqSchema(FAQS),
          breadcrumbSchema(PATH),
        ]}
      />
      <LaundryContent />
    </>
  )
}
