import raw from "./silo.nodes.json"

/**
 * The boarding-house reverse silo.
 *
 * Authority flows UP: ten longtail posts feed three sub-topic pages, which feed
 * three hubs, which feed one money page. The pyramid is held together by the
 * internal link graph, not by the URL path - every page in it lives under
 * /boarding-house/* or /blog/*, and the hierarchy below is what makes it a silo.
 *
 * This module is the single source of truth for that hierarchy. Breadcrumbs,
 * the sibling module, the upward-link module, the anchor-text rotation, and
 * scripts/check-silo.mjs all read from it. Change the structure here, not in a
 * page - a page that hand-rolls its own internal links will fail the crawl.
 *
 * Two boarding-house pages are deliberately NOT in the graph:
 *   /boarding-house        - cluster landing, must not link down into the silo
 *   /boarding-house/guide  - product documentation, linked from the app itself
 */

export type Tier = 1 | 2 | 3 | 4
export type Branch = "A" | "B" | "C"

export type SiloNode = {
  path: string
  tier: Tier
  /** null on the apex only - it sits above the branches. */
  branch: Branch | null
  /** null on the apex only. */
  parent: string | null
  title: string
  h1: string
  primaryKeyword: string
  /** [min, max] target word count from the build spec. */
  words: [number, number]
  /** Anchor text other pages use when linking TO this node. Rotated, not repeated. */
  anchors: string[]
  /** Tier 4 posts live in the blog CMS rather than as a page folder. */
  cms?: boolean
  /** Post number 1-10, tier 4 only. */
  post?: number
  source?: "new" | "rewrite"
  schema?: string[]
  intent?: string
  covers?: string
  magnet?: string
  requiresLastVerified?: boolean
  requiresDisclaimer?: boolean
  note?: string
  /**
   * Whether this page exists as a real route yet. The silo ships in phases, so
   * modules render only built pages - linking at a page that has not been
   * written is a 404, and scripts/check-silo.mjs fails the build for it.
   */
  built?: boolean
}

export const APEX: string = raw.apex

/** Non-silo destinations the money page is allowed to link out to. */
export const APEX_OUTBOUND_ALLOW: readonly string[] = raw.apexOutboundAllow

export const SILO_NODES = raw.nodes as SiloNode[]

const BY_PATH = new Map<string, SiloNode>(SILO_NODES.map((n) => [n.path, n]))

export function siloNode(path: string): SiloNode | null {
  return BY_PATH.get(path) ?? null
}

export function isSiloPath(path: string): boolean {
  return BY_PATH.has(path)
}

export function apexNode(): SiloNode {
  const node = BY_PATH.get(APEX)
  if (!node) throw new Error(`silo: apex ${APEX} is missing from the node list`)
  return node
}

/**
 * A page's position in the silo.
 *
 * Static pages get theirs from the graph. Tier 4 posts get theirs from the blog
 * CMS - `parentPage` and `branch` are editable fields, so the writer can file a
 * post without a deploy - and fall back to the graph when unset. Every module
 * below renders from this rather than from a path, which is what lets both
 * kinds of page share one set of components.
 */
export type SiloContext = {
  path: string
  title: string
  tier: Tier
  branch: Branch | null
  parent: string | null
}

export function siloContextFor(path: string): SiloContext | null {
  const node = siloNode(path)
  if (!node) return null
  return {
    path: node.path,
    title: node.title,
    tier: node.tier,
    branch: node.branch,
    parent: node.parent,
  }
}

/**
 * Context for a blog post, preferring what the CMS says over what the build
 * plan predicted. A post with neither a CMS parent nor a graph entry sits
 * outside the silo - every module then renders nothing, rather than guessing.
 */
export function siloContextFromPost(post: {
  slug: string
  title: string
  parentPage?: string | null
  branch?: string | null
}): SiloContext | null {
  const path = `/blog/${post.slug}`
  const planned = siloNode(path)

  const parent = post.parentPage || planned?.parent || null
  if (!parent) return null

  const declared = post.branch === "A" || post.branch === "B" || post.branch === "C" ? post.branch : null
  const branch = declared ?? siloNode(parent)?.branch ?? planned?.branch ?? null

  return { path, title: post.title, tier: 4, branch, parent }
}

/**
 * Apex-first chain down to `ctx`, inclusive.
 *
 * This is the silo hierarchy, which is what breadcrumbs must follow - it is not
 * derived from the URL, because a Tier 4 post lives at /blog/<slug> and still
 * belongs under its sub-topic page, hub, and money page.
 */
export function trailFor(ctx: SiloContext): SiloContext[] {
  const ancestors: SiloContext[] = []
  const seen = new Set<string>([ctx.path])

  let cursor = ctx.parent
  while (cursor) {
    if (seen.has(cursor)) throw new Error(`silo: parent cycle at ${cursor}`)
    seen.add(cursor)

    const node = siloNode(cursor)
    if (!node) break
    ancestors.unshift({
      path: node.path,
      title: node.title,
      tier: node.tier,
      branch: node.branch,
      parent: node.parent,
    })
    cursor = node.parent
  }

  return [...ancestors, ctx]
}

export function siloTrail(path: string): SiloContext[] {
  const ctx = siloContextFor(path)
  return ctx ? trailFor(ctx) : []
}

export function childrenOf(path: string): SiloNode[] {
  return SILO_NODES.filter((n) => n.parent === path)
}

/** Children that actually exist - what a "deeper guides" module may link to. */
export function builtChildrenOf(path: string): SiloNode[] {
  return childrenOf(path).filter((n) => n.built)
}

export function builtHubs(): SiloNode[] {
  return hubs().filter((n) => n.built)
}

/** Same branch, same tier - the "related in this series" pool. */
export function siblingsFor(ctx: SiloContext): SiloNode[] {
  if (!ctx.branch) return []
  return SILO_NODES.filter(
    (n) => n.path !== ctx.path && n.branch === ctx.branch && n.tier === ctx.tier && n.built
  )
}

export function siblingsOf(path: string): SiloNode[] {
  const ctx = siloContextFor(path)
  return ctx ? siblingsFor(ctx) : []
}

export function hubs(): SiloNode[] {
  return SILO_NODES.filter((n) => n.tier === 2)
}

export function hubForBranch(branch: Branch): SiloNode | null {
  return SILO_NODES.find((n) => n.tier === 2 && n.branch === branch) ?? null
}

/** The parent and the money page - every page below tier 1 links to both. */
export function upwardFor(ctx: SiloContext): { parent: SiloNode | null; apex: SiloNode | null } {
  if (ctx.tier === 1) return { parent: null, apex: null }

  const parent = ctx.parent ? siloNode(ctx.parent) : null
  const apex = apexNode()

  // A hub's parent IS the apex; don't render the same link twice.
  return { parent: parent && parent.path !== apex.path ? parent : null, apex }
}

export function upwardTargets(path: string): { parent: SiloNode | null; apex: SiloNode | null } {
  const ctx = siloContextFor(path)
  return ctx ? upwardFor(ctx) : { parent: null, apex: null }
}

/**
 * Position of a page in the node list, used to rotate anchor text.
 *
 * Rotating by list position rather than by a hash of the path guarantees that
 * neighbouring pages draw different anchors - a hash spreads unevenly and
 * happily gives two sibling pages the same phrase, which is the repetition the
 * spec asks us to avoid. Falls back to a hash for pages outside the graph.
 */
function rotationIndex(path: string): number {
  const i = SILO_NODES.findIndex((n) => n.path === path)
  if (i !== -1) return i

  let h = 0
  for (let c = 0; c < path.length; c++) h = (h * 31 + path.charCodeAt(c)) | 0
  return Math.abs(h)
}

/**
 * Anchor text for a link from `fromPath` to `toPath`.
 *
 * The spec requires anchors to vary rather than repeat one phrase sitewide, but
 * they also have to be stable across builds. Rotating by a hash of the linking
 * page gives both: any given page always renders the same anchor, and different
 * pages spread across the list.
 *
 * Tier 3 pages carry a single exact-match anchor on purpose - that repetition is
 * the mechanism that consolidates a branch, so it is not varied.
 */
export function anchorFor(toPath: string, fromPath: string): string {
  const target = siloNode(toPath)
  if (!target || target.anchors.length === 0) return target?.title ?? toPath
  if (target.anchors.length === 1) return target.anchors[0]
  return target.anchors[rotationIndex(fromPath) % target.anchors.length]
}

/**
 * Every internal path `fromPath` is permitted to link to.
 *
 * Encodes the four linking rules directly:
 *   1. equity flows up; the apex links only to the three hubs
 *   2. lateral links stay inside their branch - cross-branch routes through hubs
 *   3. posts reach their parent, the apex, and same-branch siblings
 */
export function allowedOutbound(fromPath: string): Set<string> {
  const node = siloNode(fromPath)
  if (!node) return new Set()

  // Rule 1: the money page leaks nothing downward except into the hubs.
  if (node.tier === 1) return new Set(hubs().map((h) => h.path))

  const allowed = new Set<string>([APEX])
  if (node.parent) allowed.add(node.parent)
  for (const child of childrenOf(node.path)) allowed.add(child.path)
  for (const sib of siblingsOf(node.path)) allowed.add(sib.path)

  // Hubs are the designated cross-branch routers.
  if (node.tier === 2) for (const h of hubs()) allowed.add(h.path)

  allowed.delete(node.path)
  return allowed
}
