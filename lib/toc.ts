export type TocEntry = { id: string; text: string }

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/g, " ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60)

/**
 * Pulls a table of contents out of a post's H2s and stamps matching ids on them.
 *
 * Both halves happen here so the anchor in the TOC and the id on the heading can
 * never drift apart. Posts written as plain text have no H2 tags and get no TOC,
 * which is the honest outcome - a fake one built from paragraph breaks would
 * link to nothing.
 */
export function extractToc(html: string): { toc: TocEntry[]; html: string } {
  if (!html || !/<h2\b/i.test(html)) return { toc: [], html }

  const toc: TocEntry[] = []
  const used = new Set<string>()

  const out = html.replace(
    /<h2\b([^>]*)>([\s\S]*?)<\/h2>/gi,
    (match, attrs: string, inner: string) => {
      const text = inner.replace(/<[^>]+>/g, "").trim()
      if (!text) return match

      // An id the author already set wins - overriding it would break any link
      // pointing at it from elsewhere. The TOC must then use that id, not the
      // slug it would have picked, or the anchor lands on nothing.
      const existing = attrs.match(/\bid=["']([^"']+)["']/i)
      if (existing) {
        used.add(existing[1])
        toc.push({ id: existing[1], text })
        return match
      }

      const base = slugify(text) || `section-${toc.length + 1}`
      let id = base
      let n = 2
      while (used.has(id)) id = `${base}-${n++}`
      used.add(id)

      toc.push({ id, text })
      return `<h2${attrs} id="${id}">${inner}</h2>`
    }
  )

  return { toc, html: out }
}
