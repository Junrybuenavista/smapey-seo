import { Metadata } from "next"
import { notFound } from "next/navigation"
import BlogPostContent from "./BlogPostContent"

const API = process.env.NEXT_PUBLIC_API_URL
const SITE = "https://smapey.com"

async function getPost(slug: string) {
  try {
    const res = await fetch(`${API}/api/blog/posts/${slug}`, { next: { revalidate: 300 } })
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

  const description = post.excerpt || post.content.slice(0, 160).replace(/\n/g, " ")
  const url = `${SITE}/blog/${post.slug}`

  return {
    title: `${post.title} | Smapey Blog`,
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.content.slice(0, 160),
    ...(post.coverImage ? { image: post.coverImage } : {}),
    author: { "@type": "Person", name: post.authorName },
    publisher: {
      "@type": "Organization",
      name: "Smapey",
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/blog/${post.slug}` },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostContent post={post} />
    </>
  )
}
