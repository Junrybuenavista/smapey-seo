import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import Content from "./Content"
import { FAQS } from "./faqs"

const PATH = "/laundry/washing-machine-for-laundry-business"
const TITLE = "Washing Machines for a Laundry Business (Philippines) | Smapey"
const DESCRIPTION = "How to choose and size washing machines for a laundry business in the Philippines: why domestic machines fail, the capacity calculation, why the dryer is the real bottleneck, and what your building must support."

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
      <Content />
    </>
  )
}
