/**
 * Renders structured data as a single JSON-LD `@graph`.
 *
 * One script tag per instance rather than one per schema: sibling <script>
 * elements sharing a parent get mis-reconciled during hydration, and @graph
 * is the shape schema.org recommends for multiple entities on a page anyway.
 *
 * Must be used from a server component so the markup is in the initial HTML -
 * crawlers should not have to hydrate to find it.
 */
export default function JsonLd({ schema }: { schema: unknown | unknown[] }) {
  const graphs = (Array.isArray(schema) ? schema : [schema]).filter(Boolean) as Record<
    string,
    unknown
  >[]
  if (graphs.length === 0) return null

  const payload =
    graphs.length === 1
      ? graphs[0]
      : {
          "@context": "https://schema.org",
          // @context is declared once at the top level instead of per entity.
          "@graph": graphs.map(({ "@context": _ctx, ...rest }) => rest),
        }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  )
}
