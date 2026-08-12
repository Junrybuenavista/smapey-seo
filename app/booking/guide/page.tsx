import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import GuideContent from "./GuideContent"

const PATH = "/booking/guide"
const TITLE = "Booking App Guide - How to Use Smapey Booking | Smapey"
const DESCRIPTION = "Step-by-step guide on how to set up and use Smapey Booking. Learn how to manage services, availability, appointments, staff, and deposits."

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
          breadcrumbSchema(PATH),
        ]}
      />
      <GuideContent />
    </>
  )
}
