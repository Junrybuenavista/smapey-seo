import { Metadata } from "next"
import { notFound } from "next/navigation"
import BlogPostContent from "./BlogPostContent"
import JsonLd from "@/components/JsonLd"
import SiloBreadcrumbs from "@/components/silo/SiloBreadcrumbs"
import SiloSiblings from "@/components/silo/SiloSiblings"
import SiloUpwardLinks from "@/components/silo/SiloUpwardLinks"
import BlogRelated from "@/components/blog/BlogRelated"
import { siloContextFromPost } from "@/lib/silo"
import { breadcrumbSchema } from "@/lib/seo"
import { extractToc } from "@/lib/toc"

const API = process.env.NEXT_PUBLIC_API_URL
const SITE = "https://smapey.com"

async function getPost(slug: string) {
  try {
    const res = await fetch(`${API}/api/blog/posts/${slug}`, { next: { tags: ["blog-posts"] } })
    if (!res.ok) return null
    const data = await res.json()
    return data.post ?? null
  } catch {
    return null
  }
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return { title: "Post Not Found | Smapey Blog" }

  // The writer's meta fields win when set; otherwise fall back to the post
  const description =
    post.metaDescription || post.excerpt || post.content.slice(0, 160).replace(/\n/g, " ")
  const url = `${SITE}/blog/${post.slug}`

  return {
    title: post.metaTitle || `${post.title} | Smapey Blog`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.authorName],
      ...(post.coverImage
        ? { images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      ...(post.coverImage ? { images: [post.coverImage] } : {}),
    },
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  // A post inside the boarding-house silo carries its own hierarchy: breadcrumbs
  // follow parentPage rather than the URL, and the sibling and upward modules
  // render from the graph so they cannot rot as the library grows.
  const silo = siloContextFromPost(post)
  const { toc, html: contentWithIds } = extractToc(post.content)

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.metaDescription || post.excerpt || post.content.slice(0, 160),
      ...(post.coverImage ? { image: post.coverImage } : {}),
      author: { "@type": "Person", name: post.authorName },
      publisher: {
        "@type": "Organization",
        name: "Smapey",
        logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
      },
      datePublished: post.publishedAt,
      dateModified: post.lastVerifiedAt || post.updatedAt,
      mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/blog/${post.slug}` },
    },
  ]

  const crumbs = silo ? breadcrumbSchema(silo) : null
  if (crumbs) jsonLd.push(crumbs as Record<string, unknown>)

  return (
    <>
      <JsonLd schema={jsonLd} />
      <BlogPostContent
        post={{ ...post, content: contentWithIds }}
        toc={toc}
        breadcrumbs={silo ? <SiloBreadcrumbs ctx={silo} /> : null}
        related={
          // A silo post links by the graph's rules, which are stricter and
          // scripts/check-silo.mjs enforces them. Everything else - today, every
          // published post - gets the cluster-based module instead, so no post
          // is a dead end.
          silo ? (
            <>
              <SiloSiblings ctx={silo} />
              <SiloUpwardLinks ctx={silo} />
            </>
          ) : (
            <BlogRelated post={post} />
          )
        }
      />
    </>
  )
}
