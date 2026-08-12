import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import Content from "./ContactContent"

const PATH = "/invoice/contact"
const TITLE = "Contact Us | Smapey Invoicing Software"
const DESCRIPTION = "Get in touch with Smapey. Contact our team for support, questions, or business inquiries. We\u2019re here to help you streamline your invoicing."

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
      <Content />
    </>
  )
}
