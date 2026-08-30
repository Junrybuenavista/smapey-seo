import Link from "next/link"
import { getAllPosts, hubForCategory, type BlogPost } from "@/lib/blog"
import { INK, BLUE, AMBER, MUTED, display } from "@/components/silo/tokens"

/**
 * The full post index, grouped by business type.
 *
 * This is a server component on purpose. The grid above it is a client
 * component that pages nine posts at a time against the API, so the shipped
 * HTML would otherwise carry at most nine of sixty links - and before this
 * existed it carried none, because the grid fetched in an effect. Rendering
 * the complete list here means every post is one server-rendered hop from
 * /blog no matter what the interactive grid is currently showing.
 *
 * It earns its place for readers too: sixty posts behind a nine-per-page grid
 * with no archive is a poor way to find the guide you want.
 */

/** Display name for a cluster, keyed by hub path. */
const CLUSTER_LABEL: Record<string, string> = {
  "/water-refilling": "Water Refilling Station",
  "/laundry": "Laundry Shop",
  "/massage": "Massage & Spa",
  "/school-desk": "Tutorial Center",
  "/clinic": "Clinic",
  "/vet-clinic": "Veterinary Clinic",
  "/catering": "Catering",
  "/store": "Store & Inventory",
  "/restaurant": "Restaurant & Food Ordering",
  "/airbnb": "Airbnb & Short-Term Rental",
  "/car-rental": "Car Rental",
  "/lending": "Lending",
}

const GENERAL = "General Business"

/**
 * Group posts by cluster, largest group first, with the cross-cutting posts
 * ("Technology", "Operations", and friends) collected last under one heading
 * rather than scattered into single-post groups.
 */
function groupPosts(posts: BlogPost[]) {
  const groups = new Map<string, BlogPost[]>()

  for (const post of posts) {
    const hub = hubForCategory(post.category)
    const label = hub ? CLUSTER_LABEL[hub] ?? GENERAL : GENERAL
    const bucket = groups.get(label)
    if (bucket) bucket.push(post)
    else groups.set(label, [post])
  }

  const general = groups.get(GENERAL)
  groups.delete(GENERAL)

  const sorted = [...groups.entries()].sort((a, b) => b[1].length - a[1].length)
  if (general) sorted.push([GENERAL, general])

  return sorted
}

/** The hub a cluster heading links back to, so the archive feeds the clusters. */
function hubForLabel(label: string): string | null {
  const hit = Object.entries(CLUSTER_LABEL).find(([, l]) => l === label)
  return hit ? hit[0] : null
}

export default async function BlogArchive() {
  const posts = await getAllPosts()
  if (posts.length === 0) return null

  const groups = groupPosts(posts)

  return (
    <section className="py-20 px-6" style={{ ...display, background: "#fff", borderTop: `2px solid ${INK}` }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: INK }}>
          Browse all {posts.length} guides
        </h2>
        <p className="mt-3 text-base leading-relaxed max-w-2xl" style={{ color: MUTED }}>
          Every guide we have published, grouped by the kind of business it is for.
        </p>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {groups.map(([label, groupPosts], gi) => {
            const hub = hubForLabel(label)
            const accent = gi % 2 === 0 ? BLUE : AMBER

            return (
              <div key={label}>
                <h3
                  className="text-xs font-extrabold uppercase tracking-widest pb-2 mb-4"
                  style={{ color: INK, borderBottom: `2px solid ${accent}` }}
                >
                  {hub ? (
                    <Link href={hub} className="hover:underline">
                      {label}
                    </Link>
                  ) : (
                    label
                  )}
                </h3>

                <ul className="flex flex-col gap-3 list-none p-0 m-0">
                  {groupPosts.map((post) => (
                    <li key={post.id}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-sm font-semibold leading-snug hover:underline"
                        style={{ color: INK }}
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
