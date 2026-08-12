import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import BlogContent from "./BlogContent"

const PATH = "/blog"
const TITLE = "Smapey Blog - Small Business Tips & Stories"
const DESCRIPTION = "Real insights, tips, and stories from small business owners using Smapey. Written by the community, for the community."

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
