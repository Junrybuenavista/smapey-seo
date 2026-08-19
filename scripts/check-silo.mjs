#!/usr/bin/env node
/**
 * Verifies the boarding-house reverse silo by crawling it.
 *
 * The build spec's definition of done requires the internal link graph to be
 * "verified by crawl, not by eye" - a silo decays silently, because every
 * individual broken link looks harmless. This script is that verification.
 *
 * Two passes:
 *   1. graph  - validates lib/silo.nodes.json on its own (no server needed)
 *   2. crawl  - fetches every page and checks the links it actually renders
 *
 * Usage:
 *   node scripts/check-silo.mjs                     # graph + crawl localhost:3000
 *   node scripts/check-silo.mjs --graph-only        # skip the crawl
 *   node scripts/check-silo.mjs --base=https://smapey.com
 *   node scripts/check-silo.mjs --strict            # warnings and unbuilt pages fail
 *
 * Exit code 1 on any error, so it can gate a deploy.
 */

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const argv = process.argv.slice(2)
const flag = (name) => argv.some((a) => a === `--${name}`)
const opt = (name, fallback) => {
  const hit = argv.find((a) => a.startsWith(`--${name}=`))
  return hit ? hit.slice(name.length + 3) : fallback
}

const BASE = opt("base", "http://localhost:3000").replace(/\/$/, "")
const GRAPH_ONLY = flag("graph-only")
const STRICT = flag("strict")

const errors = []
const warnings = []
const notes = []
const err = (where, msg) => errors.push(`${where}: ${msg}`)
const warn = (where, msg) => warnings.push(`${where}: ${msg}`)
const note = (where, msg) => notes.push(`${where}: ${msg}`)

const raw = JSON.parse(fs.readFileSync(path.join(ROOT, "lib/silo.nodes.json"), "utf8"))
const { apex: APEX, apexOutboundAllow: APEX_ALLOW, nodes } = raw
const byPath = new Map(nodes.map((n) => [n.path, n]))

// ─── Pass 1: the graph ────────────────────────────────────────────────────────

function checkGraph() {
  const seen = new Set()
  for (const n of nodes) {
    if (seen.has(n.path)) err(n.path, "duplicate path in the node list")
    seen.add(n.path)
  }

  if (!byPath.has(APEX)) err("graph", `apex ${APEX} is not in the node list`)

  const apexes = nodes.filter((n) => n.tier === 1)
  if (apexes.length !== 1) err("graph", `expected exactly 1 tier-1 node, found ${apexes.length}`)

  for (const branch of ["A", "B", "C"]) {
    const hubs = nodes.filter((n) => n.tier === 2 && n.branch === branch)
    if (hubs.length !== 1) err("graph", `branch ${branch} has ${hubs.length} hubs, expected 1`)
  }

  for (const n of nodes) {
    if (n.tier === 1) {
      if (n.parent) err(n.path, "the apex must not have a parent")
      if (n.branch) err(n.path, "the apex must not belong to a branch")
      continue
    }

    if (!n.branch) err(n.path, "every node below the apex needs a branch")
    if (!n.parent) {
      err(n.path, "missing parent")
      continue
    }

    const parent = byPath.get(n.parent)
    if (!parent) {
      err(n.path, `parent ${n.parent} is not a silo node`)
      continue
    }
    if (parent.tier >= n.tier) {
      err(n.path, `parent ${n.parent} is tier ${parent.tier}, which is not above tier ${n.tier}`)
    }
    if (parent.branch && n.branch && parent.branch !== n.branch) {
      err(n.path, `branch ${n.branch} but parent ${n.parent} is branch ${parent.branch}`)
    }

    // walk to the apex, catching cycles and orphans
    const trail = new Set([n.path])
    let cursor = n.parent
    while (cursor) {
      if (trail.has(cursor)) {
        err(n.path, `parent chain cycles at ${cursor}`)
        break
      }
      trail.add(cursor)
      const up = byPath.get(cursor)
      if (!up) break
      cursor = up.parent
    }
    if (!trail.has(APEX)) err(n.path, "parent chain does not reach the apex")

    if (!Array.isArray(n.anchors) || n.anchors.length === 0) {
      err(n.path, "no anchor text defined - other pages cannot link to it")
    }
    if (n.tier === 3 && n.anchors.length !== 1) {
      warn(n.path, "tier 3 pages should carry one exact-match anchor; found " + n.anchors.length)
    }
  }

  for (const n of nodes) {
    if (n.note) note(n.path, n.note)
  }
}

// ─── Pass 2: the crawl ────────────────────────────────────────────────────────

function extractLinks(html) {
  const out = []
  const re = /<a\b[^>]*?href=["']([^"']+)["'][^>]*>/gi
  let m
  while ((m = re.exec(html)) !== null) out.push(m[1])
  return out
}

/** Site-relative path, or null for off-site, mailto, and same-page anchors. */
function normalize(href) {
  if (!href) return null
  if (/^(mailto:|tel:|#)/i.test(href)) return null

  let url = href
  if (/^https?:\/\//i.test(href)) {
    let parsed
    try {
      parsed = new URL(href)
    } catch {
      return null
    }
    if (!/(^|\.)smapey\.com$/i.test(parsed.hostname) && parsed.hostname !== "localhost") return null
    if (parsed.hostname.toLowerCase() === "app.smapey.com") return href.split("#")[0]
    url = parsed.pathname
  }

  url = url.split("#")[0].split("?")[0]
  if (!url.startsWith("/")) return null
  if (url.length > 1) url = url.replace(/\/$/, "")
  return url
}

async function fetchPage(p) {
  const res = await fetch(`${BASE}${p}`, { redirect: "follow" })
  const html = res.ok ? await res.text() : ""
  return { status: res.status, html }
}

function checkApexLinks(links) {
  const hubPaths = new Set(nodes.filter((n) => n.tier === 2).map((n) => n.path))
  const allow = new Set([...APEX_ALLOW, APEX])

  for (const link of links) {
    if (link === APEX) continue

    if (byPath.has(link)) {
      if (!hubPaths.has(link)) {
        const target = byPath.get(link)
        err(APEX, `links down to tier ${target.tier} page ${link} - the money page may only link to the three hubs`)
      }
      continue
    }
    if (allow.has(link)) continue
    warn(APEX, `links out to ${link}, which is outside the permitted set (three hubs, signup, demo)`)
  }

  for (const hub of hubPaths) {
    if (!links.includes(hub)) err(APEX, `missing its link to hub ${hub}`)
  }
}

function checkNodeLinks(node, links) {
  const where = node.path
  const siloLinks = links.filter((l) => byPath.has(l) && l !== node.path)

  if (node.parent && !siloLinks.includes(node.parent)) {
    err(where, `does not link up to its parent ${node.parent}`)
  }

  const apexCount = siloLinks.filter((l) => l === APEX).length
  if (apexCount === 0) {
    err(where, "does not link up to the money page")
  } else if (apexCount > 2) {
    warn(where, `links to the money page ${apexCount} times; the spec allows 1-2`)
  }

  // Rule 2 - lateral links stay in-branch. Hubs are the designated routers.
  for (const link of siloLinks) {
    const target = byPath.get(link)
    if (!target.branch || !node.branch) continue
    if (target.branch === node.branch) continue
    if (node.tier === 2 && target.tier === 2) continue
    err(where, `links across branches to ${link} (branch ${target.branch}); route it through the hubs instead`)
  }

  if (node.tier === 4) {
    const lateral = siloLinks.filter((l) => {
      const t = byPath.get(l)
      return t.tier === 4 && t.branch === node.branch
    }).length
    if (lateral === 0) warn(where, "has no lateral link to a sibling post; the spec asks for 1-2")
    else if (lateral > 2) warn(where, `has ${lateral} lateral links; the spec allows 1-2`)

    const total = new Set(siloLinks).size
    if (total > 6) warn(where, `${total} distinct internal silo links; more than about 5 dilutes each one`)
  }
}

async function checkCrawl() {
  let reachable = 0

  for (const node of nodes) {
    let page
    try {
      page = await fetchPage(node.path)
    } catch (e) {
      err(node.path, `could not be fetched from ${BASE} (${e.message})`)
      continue
    }

    if (page.status === 404) {
      const msg = `not built yet (404)${node.cms ? " - lives in the blog CMS" : ""}`
      if (STRICT) err(node.path, msg)
      else note(node.path, msg)
      continue
    }
    if (page.status >= 400) {
      err(node.path, `returned HTTP ${page.status}`)
      continue
    }

    reachable++
    const links = extractLinks(page.html).map(normalize).filter(Boolean)

    if (node.tier === 1) checkApexLinks(links)
    else checkNodeLinks(node, links)
  }

  return reachable
}

// ─── Report ───────────────────────────────────────────────────────────────────

console.log(`\nSilo check - ${nodes.length} nodes, apex ${APEX}`)

checkGraph()
console.log(`  graph: ${errors.length === 0 ? "ok" : `${errors.length} error(s)`}`)

if (!GRAPH_ONLY) {
  const graphErrors = errors.length
  console.log(`  crawl: ${BASE}`)
  const reachable = await checkCrawl()
  const crawlErrors = errors.length - graphErrors
  console.log(`         ${reachable}/${nodes.length} pages live, ${crawlErrors} error(s)`)
}

const section = (label, list) => {
  if (list.length === 0) return
  console.log(`\n${label}`)
  for (const line of list) console.log(`  - ${line}`)
}

section(`Errors (${errors.length})`, errors)
section(`Warnings (${warnings.length})`, warnings)
section(`Notes (${notes.length})`, notes)

const failed = errors.length > 0 || (STRICT && warnings.length > 0)
console.log(failed ? "\nFAIL\n" : "\nPASS\n")
process.exit(failed ? 1 : 0)
