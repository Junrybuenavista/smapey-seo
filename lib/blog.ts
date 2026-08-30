/**
 * Server-side access to the blog CMS.
 *
 * Every module that renders internal links into /blog/* reads from here, so the
 * post list is fetched once per render pass and shared - Next dedupes identical
 * fetches, and the "blog-posts" tag means the existing revalidation webhook
 * clears this alongside the sitemap.
 *
 * Why this file exists at all: until 30 Aug 2026 nothing on the site rendered a
 * server-side link to a blog post. The index fetched its grid in the browser,
 * and the only /blog/* href in the shipped HTML was /blog/submit. Sixty posts
 * were reachable through sitemap.xml and nothing else, which is how six of the
 * site's top ten pages by clicks ended up with no internal link equity at all.
 * These helpers are what the linking modules render from.
 */

const API = process.env.NEXT_PUBLIC_API_URL

export type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  coverImage: string | null
  authorName: string
  category: string | null
  publishedAt: string
  createdAt: string
}

/**
 * Every published post, newest first.
 *
 * The CMS caps out well below this limit; sitemap.ts already asks for 1000 the
 * same way. A failure returns [] rather than throwing - a linking module that
 * renders nothing degrades to today's behaviour, while a throw would take down
 * the page it sits on.
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  if (!API) return []
  try {
    const res = await fetch(`${API}/api/blog/posts?limit=1000`, {
      next: { tags: ["blog-posts"] },
    })
    if (!res.ok) return []
    const data = await res.json()
    return (data.posts || []) as BlogPost[]
  } catch {
    return []
  }
}

export async function getCategories(): Promise<string[]> {
  if (!API) return []
  try {
    const res = await fetch(`${API}/api/blog/posts/categories`, {
      next: { tags: ["blog-posts"] },
    })
    if (!res.ok) return []
    const data = await res.json()
    return (data.categories || []) as string[]
  } catch {
    return []
  }
}

/**
 * Which product cluster each CMS category belongs under.
 *
 * The categories are writer-facing and have drifted - laundry alone is filed
 * three ways - so the mapping is explicit rather than derived from the string.
 * Categories absent from this map ("Technology", "Operations", "Money &
 * Finance", "Business Tips", "Customer Service") are cross-cutting and
 * deliberately belong to no hub; they surface on /blog and nowhere else.
 *
 * /boarding-house is absent on purpose. It is the tier-1 apex of the reverse
 * silo (lib/silo.nodes.json) and may link down only to its three hubs, so it
 * takes its post links from the silo graph, never from this map.
 */
const HUB_CATEGORIES: Record<string, string[]> = {
  "/water-refilling": ["Water Refilling"],
  "/laundry": ["Laundry Shop", "Laundry", "Laundry Software"],
  "/massage": ["Massage and Spa"],
  "/school-desk": ["SchoolDesk"],
  "/clinic": ["Clinic", "Dental Clinic"],
  "/vet-clinic": ["Vet Clinic"],
  "/catering": ["Catering"],
  "/store": ["Store Manager"],
  "/restaurant": ["Food Ordering"],
  "/airbnb": ["AirBnb"],
  "/car-rental": ["Car Rental"],
  "/lending": ["Lending"],
}

export function categoriesForHub(hubPath: string): string[] {
  return HUB_CATEGORIES[hubPath] ?? []
}

export function hubForCategory(category: string | null): string | null {
  if (!category) return null
  for (const [hub, cats] of Object.entries(HUB_CATEGORIES)) {
    if (cats.includes(category)) return hub
  }
  return null
}

/** Posts belonging to a product cluster, newest first. */
export async function postsForHub(hubPath: string, limit = 6): Promise<BlogPost[]> {
  const cats = categoriesForHub(hubPath)
  if (cats.length === 0) return []

  const posts = await getAllPosts()
  return posts.filter((p) => p.category && cats.includes(p.category)).slice(0, limit)
}

/**
 * Related reading for a post that sits outside the reverse silo.
 *
 * Same cluster first - which is broader than same category, so the three ways
 * laundry is filed still relate to each other - then topped up with recent
 * posts if the cluster is too small to fill the row. A post with no cluster
 * still gets the top-up, because "nothing" is what it renders today.
 */
export async function relatedPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  const pool = posts.filter((p) => p.slug !== post.slug)

  const hub = hubForCategory(post.category)
  const cats = hub ? categoriesForHub(hub) : post.category ? [post.category] : []

  const sameCluster = pool.filter((p) => p.category && cats.includes(p.category))
  if (sameCluster.length >= limit) return sameCluster.slice(0, limit)

  const seen = new Set(sameCluster.map((p) => p.slug))
  const topUp = pool.filter((p) => !seen.has(p.slug)).slice(0, limit - sameCluster.length)
  return [...sameCluster, ...topUp]
}
