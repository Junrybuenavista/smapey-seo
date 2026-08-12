import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import BlogSubmitContent from "./BlogSubmitContent"

const PATH = "/blog/submit"
const TITLE = "Submit a Blog Post | Smapey Community Blog"
const DESCRIPTION = "Share your small business story, tips, or insights with the Smapey community. Anyone can submit, posts go live after review."

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
      <BlogSubmitContent />
    </>
  )
}
