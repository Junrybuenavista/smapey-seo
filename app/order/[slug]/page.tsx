import { Metadata } from "next"
import { Suspense } from "react"
import OrderPageContent from "./OrderPageContent"

export const dynamic = "force-dynamic"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `Order Online - ${slug} | Smapey`,
    description: `Scan, browse the menu and order from your table at ${slug}.`,
    robots: { index: false, follow: false },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  return (
    <Suspense fallback={null}>
      <OrderPageContent slug={slug} />
    </Suspense>
  )
}
