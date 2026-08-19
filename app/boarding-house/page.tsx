import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google"
import JsonLd from "@/components/JsonLd"
import {
  buildMetadata,
  softwareApplicationSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo"
import BoardingHouseContent from "./BoardingHouseContent"
import { FAQS } from "./faqs"

/**
 * Self-hosted through next/font rather than a client-injected stylesheet link,
 * which is how the rest of the site loads its face. The fonts then arrive with
 * the document instead of after hydration, so the text does not reflow once
 * they land - the page is judged on Core Web Vitals, and CLS is the one this
 * would otherwise cost.
 */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-mono",
  display: "swap",
})

const PATH = "/boarding-house"
const TITLE = "Boarding House Management System for Philippine Landlords | Smapey"
const DESCRIPTION =
  "Smapey is a boarding house management system for Philippine landlords. Track rooms and beds, collect rent via GCash or Maya, split utilities, and handle maintenance. Free plan available."

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
          softwareApplicationSchema({
            name: "Smapey Boarding House Manager",
            description: DESCRIPTION,
            path: PATH,
          }),
          faqSchema(FAQS),
          breadcrumbSchema(PATH),
        ]}
      />
      <div className={`${jakarta.variable} ${jetbrains.variable}`}>
        <BoardingHouseContent />
      </div>
    </>
  )
}
