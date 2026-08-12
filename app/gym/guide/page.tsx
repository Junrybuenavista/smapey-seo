import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import GymGuideContent from "./GymGuideContent"

const PATH = "/gym/guide"
const TITLE = "GymOS Guide - How to Use Smapey Gym Management"
const DESCRIPTION = "Step-by-step guide on how to use GymOS by Smapey. Learn member management, QR check-in, walk-ins, subscriptions, trainer assignment, and analytics."

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
      <GymGuideContent />
    </>
  )
}
