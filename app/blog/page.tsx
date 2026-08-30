import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import { getAllPosts, getCategories } from "@/lib/blog"
import BlogContent from "./BlogContent"
import BlogArchive from "./BlogArchive"

// Fallback: regenerate hourly in case the on-demand webhook ever misses.
// The index is prerendered with its post list now, so a missed revalidation
// would be visible here - a new post simply would not appear - where the same
// miss on sitemap.ts only delays a crawl. Same belt-and-braces as sitemap.ts.
export const revalidate = 3600

const PATH = "/blog"
const TITLE = "Smapey Blog - Small Business Tips & Stories"
const DESCRIPTION = "Real insights, tips, and stories from small business owners using Smapey. Written by the community, for the community."

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
})

const POSTS_PER_PAGE = 9

/**
 * The index is server-rendered now.
 *
 * BlogContent still owns search, category filtering and pagination, but it is
 * seeded with the first page rather than fetching it in an effect - so the
 * shipped HTML contains real post links instead of a loading spinner - and
 * BlogArchive below it renders the complete list. Passing a server component
 * down as a prop is the same pattern [slug]/page.tsx already uses for its
 * breadcrumbs and related modules.
 */
export default async function Page() {
  const [posts, categories] = await Promise.all([getAllPosts(), getCategories()])

  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema(PATH),
        ]}
      />
      <BlogContent
        initialPosts={posts.slice(0, POSTS_PER_PAGE)}
        initialTotal={posts.length}
        initialCategories={categories}
        archive={<BlogArchive />}
      />
    </>
  )
}
