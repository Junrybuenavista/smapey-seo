import type { Metadata } from "next"
import { CLUSTERS, clusterForPath } from "./routes"
import { isSiloPath, siloTrail, trailFor, type SiloContext } from "./silo"

export const SITE = "https://smapey.com"
export const SITE_NAME = "Smapey"
/** Generated at build time by app/og/route.tsx. */
export const DEFAULT_OG_IMAGE = `${SITE}/og`

/**
 * Canonical metadata builder for every static page on the site.
 *
 * Pass the full title including its brand suffix - there is no title
 * template at the root, so what you pass is what gets served.
 */
export function buildMetadata({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  type = "website",
  noIndex = false,
}: {
  title: string
  description: string
  /** Site-relative, leading slash, no trailing slash. e.g. "/gym/guide" */
  path: string
  /** Defaults to the generated site-wide card at /og. */
  ogImage?: string
  type?: "website" | "article"
  noIndex?: boolean
}): Metadata {
  const url = `${SITE}${path}`

  return {
    title,
    description,
    alternates: { canonical: url },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
      locale: "en_PH",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  }
}

//////////////////////////////////////////////////////
// STRUCTURED DATA
//////////////////////////////////////////////////////

/** Site-wide publisher entity. Render once, in the root layout. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE}/#organization`,
    name: SITE_NAME,
    url: SITE,
    logo: {
      "@type": "ImageObject",
      url: `${SITE}/logo.png`,
    },
    description:
      "Smapey builds simple management software for small businesses - invoicing, gyms, salons, rentals, clinics, boarding houses, and more.",
    areaServed: {
      "@type": "Country",
      name: "Philippines",
    },
  }
}

/** Enables sitelinks search box eligibility. Render once, in the root layout. */
export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    url: SITE,
    name: SITE_NAME,
    publisher: { "@id": `${SITE}/#organization` },
  }
}

export type Faq = { q: string; a: string }

/**
 * FAQPage rich result. Only emit on pages where the questions and answers
 * are actually visible to the user - Google requires that.
 */
export function faqSchema(faqs: readonly Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  }
}

/**
 * Builds a breadcrumb trail so the crumbs always match the real structure
 * instead of being hand-maintained per page.
 *
 * Pages inside the boarding-house silo follow the silo hierarchy, which is
 * deliberately not the URL path - a Tier 4 post lives at /blog/<slug> but
 * belongs under its sub-topic page, hub, and money page. Everything else falls
 * back to the flat hub-and-spoke cluster map.
 */
export function breadcrumbSchema(target: string | SiloContext) {
  const items: { name: string; item: string }[] = [{ name: "Home", item: SITE }]

  // A blog post passes its context directly - its place in the silo comes from
  // CMS fields, so it cannot be looked up by path.
  if (typeof target !== "string") {
    for (const node of trailFor(target)) {
      items.push({ name: node.title, item: `${SITE}${node.path}` })
    }
    return breadcrumbList(items)
  }

  const path = target
  if (isSiloPath(path)) {
    for (const node of siloTrail(path)) {
      items.push({ name: node.title, item: `${SITE}${node.path}` })
    }
    return breadcrumbList(items)
  }

  const key = clusterForPath(path)
  if (key) {
    const cluster = CLUSTERS[key]
    items.push({ name: cluster.hub.title, item: `${SITE}${cluster.hub.path}` })

    if (path !== cluster.hub.path) {
      const page = cluster.pages.find((p) => p.path === path)
      if (page) items.push({ name: page.title, item: `${SITE}${path}` })
    }
  }

  return breadcrumbList(items)
}

function breadcrumbList(items: { name: string; item: string }[]) {
  if (items.length < 2) return null

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((entry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: entry.name,
      item: entry.item,
    })),
  }
}

/**
 * Product schema for a cluster hub.
 *
 * `price: "0"` reflects the free plan every product ships with. Paid tier
 * prices are fetched client-side per visitor currency, so they are
 * deliberately not asserted here - only the free entry point is.
 */
export function softwareApplicationSchema({
  name,
  description,
  path,
  category = "BusinessApplication",
}: {
  name: string
  description: string
  path: string
  category?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url: `${SITE}${path}`,
    applicationCategory: category,
    operatingSystem: "Web",
    publisher: { "@id": `${SITE}/#organization` },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "PHP",
      availability: "https://schema.org/InStock",
      description: "Free plan, no credit card required",
    },
  }
}

export function videoSchema({
  name,
  description,
  contentUrl,
  thumbnailUrl,
  uploadDate,
}: {
  name: string
  description: string
  contentUrl: string
  thumbnailUrl?: string
  uploadDate: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    contentUrl,
    ...(thumbnailUrl ? { thumbnailUrl } : {}),
    uploadDate,
  }
}
