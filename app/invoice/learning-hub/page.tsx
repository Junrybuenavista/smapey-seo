import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import BlogContent from "./BlogContent"

const PATH = "/invoice/learning-hub"
const TITLE = "Invoicing Blog | Guides, Templates & Tips | Smapey"
const DESCRIPTION = "Learn how to create, send, and manage invoices with step-by-step guides, templates, and tips for freelancers and small businesses."

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
      <BlogContent />
    </>
  )
}
