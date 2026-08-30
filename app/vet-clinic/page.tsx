import JsonLd from "@/components/JsonLd"
import {
  buildMetadata,
  softwareApplicationSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo"
import VetClinicContent from "./VetClinicContent"
import { FAQS } from "./faqs"

import { postsForHub } from "@/lib/blog"

const PATH = "/vet-clinic"
const TITLE = "Veterinary Clinic Management System - Free for Small Vet Clinics | Smapey"
const DESCRIPTION = "Smapey Vet Clinic Manager is a free veterinary clinic management system. Manage pets, veterinarians, appointments, vaccinations, and billing, all in one dashboard."

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
})

export default async function Page() {
  const guides = await postsForHub(PATH)

  return (
    <>
      <JsonLd
        schema={[
          softwareApplicationSchema({
            name: "Veterinary Clinic Management System",
            description: DESCRIPTION,
            path: PATH,
          }),
          faqSchema(FAQS),
          breadcrumbSchema(PATH),
        ]}
      />
      <VetClinicContent guides={guides} />
    </>
  )
}
