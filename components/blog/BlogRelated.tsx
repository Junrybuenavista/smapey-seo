import Link from "next/link"
import { relatedPosts, hubForCategory, type BlogPost } from "@/lib/blog"
import { INK, BLUE, AMBER, MUTED, CREAM, display } from "@/components/silo/tokens"

/**
 * "Keep reading" for a post outside the reverse silo.
 *
 * Silo posts get SiloSiblings and SiloUpwardLinks instead, which render from
 * the link graph and obey its rules; this is the fallback for everything else,
 * which today is every published post - the ten planned tier-4 posts in
 * lib/silo.nodes.json are all still unbuilt. Without it a post is a dead end:
 * nothing links in, and nothing links out.
 *
 * It also carries the one link that matters commercially - up to the product
 * cluster the post belongs to. That is the whole point of writing owner-intent
 * guides, and until now the guides never made the handoff.
 */

const HUB_LABEL: Record<string, string> = {
  "/water-refilling": "water refilling station",
  "/laundry": "laundry shop",
  "/massage": "massage and spa",
  "/school-desk": "tutorial center",
  "/clinic": "clinic",
  "/vet-clinic": "veterinary clinic",
  "/catering": "catering",
  "/store": "store and inventory",
  "/restaurant": "restaurant",
  "/airbnb": "Airbnb rental",
  "/car-rental": "car rental",
  "/lending": "lending",
}

export default async function BlogRelated({ post }: { post: BlogPost }) {
  const related = await relatedPosts(post, 3)
  const hub = hubForCategory(post.category)
  const hubLabel = hub ? HUB_LABEL[hub] : null

  if (related.length === 0 && !hub) return null

  return (
    <section className="py-16 px-6" style={{ ...display, background: CREAM, borderTop: `2px solid ${INK}` }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-8" style={{ color: INK }}>
          Keep reading
        </h2>

        {related.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((r, i) => {
              const accent = i % 2 === 0 ? BLUE : AMBER
              return (
                <Link
                  key={r.id}
                  href={`/blog/${r.slug}`}
                  className="group rounded-[22px] p-6 border-2 bg-white transition-transform hover:-translate-y-1 flex flex-col"
                  style={{ borderColor: INK, boxShadow: `6px 6px 0 ${accent}` }}
                >
                  {r.category && (
                    <span className="text-xs font-bold mb-2" style={{ color: MUTED }}>
                      {r.category}
                    </span>
                  )}
                  <h3 className="font-extrabold text-lg leading-snug mb-2" style={{ color: INK }}>
                    {r.title}
                  </h3>
                  <span
                    className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-bold group-hover:translate-x-1 transition-transform"
                    style={{ color: accent === AMBER ? INK : BLUE }}
                  >
                    Read more →
                  </span>
                </Link>
              )
            })}
          </div>
        )}

        {hub && hubLabel && (
          <div
            className="mt-10 rounded-[22px] border-2 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-4 justify-between bg-white"
            style={{ borderColor: INK, boxShadow: `6px 6px 0 ${INK}` }}
          >
            <p className="text-base leading-relaxed m-0" style={{ color: MUTED }}>
              Running a {hubLabel} business? See how Smapey handles the day-to-day.
            </p>
            <Link
              href={hub}
              className="shrink-0 inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-full border-2 transition-transform hover:-translate-y-0.5"
              style={{ background: AMBER, color: INK, borderColor: INK }}
            >
              Explore Smapey →
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
