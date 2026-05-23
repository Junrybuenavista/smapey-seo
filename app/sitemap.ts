import { MetadataRoute } from "next"
import fs from "fs"
import path from "path"

// Regenerate the sitemap at most every 12 hours (ISR)
export const revalidate = 43200

const baseUrl = "https://smapey.com"
const API = process.env.NEXT_PUBLIC_API_URL

// Static routes to exclude from the sitemap (forms, utility pages)
const EXCLUDED = new Set(["/blog/submit"])

function getRoutes(dir: string, basePath = ""): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  let routes: string[] = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (
      entry.name.startsWith("_") ||
      entry.name.startsWith("(") ||
      entry.name.startsWith("[") ||
      entry.name === "api"
    ) {
      continue
    }

    if (entry.isDirectory()) {
      routes = routes.concat(getRoutes(fullPath, `${basePath}/${entry.name}`))
    }

    if (entry.isFile() && entry.name === "page.tsx") {
      routes.push(basePath || "")
    }
  }

  return routes
}

async function getPublishedBlogSlugs(): Promise<{ slug: string; publishedAt: string }[]> {
  try {
    const res = await fetch(`${API}/api/blog/posts?limit=1000`, {
      cache: "no-store",
    })
    if (!res.ok) return []
    const data = await res.json()
    return (data.posts || []).map((p: any) => ({
      slug: p.slug,
      publishedAt: p.publishedAt || p.createdAt,
    }))
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appDir = path.join(process.cwd(), "app")

  const staticRoutes = getRoutes(appDir).filter(r => !EXCLUDED.has(r))

  const blogPosts = await getPublishedBlogSlugs()

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : route === "/blog" ? 0.9 : 0.8,
  }))

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticEntries, ...blogEntries]
}
