import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import GuideContent from "./GuideContent"

const PATH = "/lending/guide"
const TITLE = "Lending Software Guide | How It Works | Smapey"
const DESCRIPTION = "A complete guide to running a lending business with software. Learn how to add borrowers, issue loans, generate amortization schedules, record payments, and track collections."

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
