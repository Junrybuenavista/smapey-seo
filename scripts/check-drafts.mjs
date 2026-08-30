#!/usr/bin/env node
/**
 * Keeps unfinished pages out of Google.
 *
 * A page that still carries a <NeedsFigure> marker is a draft: it states the
 * shape of a number nobody has sourced yet. The standing rule on this site is
 * that a peso figure is either sourced and dated or it does not appear, because
 * a reader budgets against it. Drafts therefore have to stay unindexed until
 * someone fills the holes - and "someone will remember" is not a mechanism.
 *
 * This script is the mechanism. For every page whose content contains a marker
 * it checks three things:
 *
 *   1. its page.tsx passes noIndex: true
 *   2. its path is in the EXCLUDED set in app/sitemap.ts
 *   3. its path is not linked from lib/routes.ts
 *
 * and fails if any of them is false. It also fails on the reverse mistake: a
 * path parked in the drafts list that no longer has markers, which means the
 * page is finished but still hidden.
 *
 * Usage:
 *   node scripts/check-drafts.mjs
 *
 * Exit code 1 on any error, so it can gate a deploy.
 */

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const APP = path.join(ROOT, "app")

const errors = []
const err = (where, msg) => errors.push(`${where}: ${msg}`)

/** Every directory under app/ that contains a page.tsx, as a route path. */
function routeDirs(dir, basePath = "") {
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (
      entry.name.startsWith("_") ||
      entry.name.startsWith(".") ||
      entry.name.startsWith("(") ||
      entry.name.startsWith("[") ||
      entry.name === "api"
    ) continue

    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...routeDirs(full, `${basePath}/${entry.name}`))
    if (entry.isFile() && entry.name === "page.tsx") out.push({ route: basePath || "/", dir })
  }
  return out
}

/**
 * Next.js file conventions that live beside a page but are not its content.
 *
 * sitemap.ts matters specifically: it documents the draft markers by name in a
 * comment, which otherwise makes the root route look like a draft of itself.
 */
const NOT_ROUTE_CONTENT = new Set(["sitemap.ts", "robots.ts", "layout.tsx", "not-found.tsx", "error.tsx"])

/** Sibling files a route renders - the page and anything next to it. */
function routeSources(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && /\.(tsx|ts)$/.test(e.name) && !NOT_ROUTE_CONTENT.has(e.name))
    .map((e) => fs.readFileSync(path.join(dir, e.name), "utf8"))
    .join("\n")
}

const routes = routeDirs(APP)

const sitemapSrc = fs.readFileSync(path.join(APP, "sitemap.ts"), "utf8")
const excludedBlock = sitemapSrc.slice(
  sitemapSrc.indexOf("const EXCLUDED"),
  sitemapSrc.indexOf("function getRoutes")
)
const routesSrc = fs.readFileSync(path.join(ROOT, "lib/routes.ts"), "utf8")

const drafts = []

for (const { route, dir } of routes) {
  const src = routeSources(dir)
  if (!src.includes("<NeedsFigure") && !src.includes("<DraftNotice")) {
    // Reverse check: parked in the sitemap exclusions but no longer a draft.
    if (route !== "/blog/submit" && excludedBlock.includes(`"${route}"`)) {
      err(route, "is in the sitemap EXCLUDED set but has no draft markers left - it looks finished, so unhide it (drop noIndex, remove from EXCLUDED, add to lib/routes.ts)")
    }
    continue
  }

  drafts.push(route)
  const pageSrc = fs.readFileSync(path.join(dir, "page.tsx"), "utf8")

  if (!/noIndex:\s*true/.test(pageSrc)) {
    err(route, "still has draft markers but does not set noIndex: true - an unfinished page must not be indexable")
  }
  if (!excludedBlock.includes(`"${route}"`)) {
    err(route, "still has draft markers but is not in the EXCLUDED set in app/sitemap.ts - a noindex page should not be in the sitemap")
  }
  if (routesSrc.includes(`"${route}"`)) {
    err(route, "still has draft markers but is linked from lib/routes.ts - InternalLinks would surface it to readers")
  }
}

const label = (n, s, p) => `${n} ${n === 1 ? s : p}`

console.log(`Draft check - ${label(routes.length, "route", "routes")} scanned, ${label(drafts.length, "draft", "drafts")} found`)
for (const d of drafts) console.log(`  draft: ${d}`)

if (errors.length) {
  console.log(`\nErrors (${errors.length})`)
  for (const e of errors) console.log(`  - ${e}`)
  console.log("\nFAIL")
  process.exit(1)
}

console.log("\nPASS")
