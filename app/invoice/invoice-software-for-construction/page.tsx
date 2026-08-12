import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import Content from "./content"

const PATH = "/invoice/invoice-software-for-construction"
const TITLE = "Best Invoice Software for Construction Companies (2026)"
const DESCRIPTION = "Best invoice software for construction companies. Manage estimates, progress billing, and payments in one place. Built for contractors."

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
