// The price list poster, drawn on a canvas: a tarpaulin for the wall or a sheet
// for the counter. One canvas is both the preview and the file people take to
// the printer, so what they see is exactly what gets printed.
//
// A copy of the renderer in the app (saas-platform-frontend:
// src/pages/car-wash/priceListPoster.ts), which prints a shop's own price board.
// The two are separate repos; keep them drawing the same poster.
//
// The poster is a physical sign, so its colours are fixed: it has to come out
// the same on any screen and any printer.

export type PosterSizeKey = "2x3" | "3x2" | "3x4" | "4x3" | "a4"

export interface PosterSize {
  key: PosterSizeKey
  label: string
  hint: string
  wIn: number
  hIn: number
  // Pixels per inch. Tarpaulins are seen from metres away, so 75–100 is plenty,
  // and it keeps the long side at 3,600px: phones refuse much bigger canvases.
  ppi: number
}

export const POSTER_SIZES: PosterSize[] = [
  { key: "2x3", label: "2 × 3 ft", hint: "Tarpaulin, tall",     wIn: 24,   hIn: 36,    ppi: 100 },
  { key: "3x2", label: "3 × 2 ft", hint: "Tarpaulin, wide",     wIn: 36,   hIn: 24,    ppi: 100 },
  { key: "3x4", label: "3 × 4 ft", hint: "Big tarpaulin, tall", wIn: 36,   hIn: 48,    ppi: 75 },
  { key: "4x3", label: "4 × 3 ft", hint: "Big tarpaulin, wide", wIn: 48,   hIn: 36,    ppi: 75 },
  { key: "a4",  label: "A4 paper", hint: "For the counter",     wIn: 8.27, hIn: 11.69, ppi: 200 },
]

export const pixelsFor = (s: PosterSize) => ({ w: Math.round(s.wIn * s.ppi), h: Math.round(s.hIn * s.ppi) })

export interface PosterRow { name: string; prices: (string | null)[] }
export interface PosterGroup { label: string; rows: PosterRow[] }

export interface PosterInput {
  shopName: string
  title: string
  footer: string
  credit: boolean
  sizes: string[]
  groups: PosterGroup[]
  logo: HTMLImageElement | null
}

const C = {
  band: "#0b2e6b",
  accent: "#ffd23f",
  ink: "#111827",
  muted: "#4b5563",
  faint: "#9ca3af",
  zebra: "#f1f5fb",
  rule: "#d5dce8",
  white: "#ffffff",
}

const FAMILY = `"Hanken Grotesk", "Helvetica Neue", Arial, sans-serif`

/**
 * The site loads Hanken Grotesk through a stylesheet the navbar adds at
 * runtime, so make sure it's there, then wait for the faces the poster uses.
 * A canvas doesn't redraw when a font arrives late, so callers wait for this.
 */
export async function loadPosterFonts() {
  try {
    const id = "smapey-pop-fonts"
    let link = document.getElementById(id) as HTMLLinkElement | null
    if (!link) {
      link = document.createElement("link")
      link.id = id
      link.rel = "stylesheet"
      link.href = "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap"
      document.head.appendChild(link)
    }
    if (!link.sheet) {
      await new Promise<void>((resolve) => {
        link!.addEventListener("load", () => resolve(), { once: true })
        link!.addEventListener("error", () => resolve(), { once: true })
        setTimeout(resolve, 4000)
      })
    }
    await Promise.all([
      document.fonts.load(`800 100px "Hanken Grotesk"`),
      document.fonts.load(`700 100px "Hanken Grotesk"`),
      document.fonts.load(`600 100px "Hanken Grotesk"`),
    ])
  } catch {
    // The fallback stack still draws a perfectly readable poster.
  }
}

type Ctx = CanvasRenderingContext2D

const setFont = (ctx: Ctx, weight: number, size: number) => { ctx.font = `${weight} ${Math.round(size)}px ${FAMILY}` }

/** Greedy word wrap. A single word wider than the line stays on its own line. */
function wrap(ctx: Ctx, text: string, maxW: number): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean)
  const lines: string[] = []
  let cur = ""
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w
    if (!cur || ctx.measureText(next).width <= maxW) cur = next
    else { lines.push(cur); cur = w }
  }
  if (cur) lines.push(cur)
  return lines
}

/**
 * The largest size, from `start` down to `min`, at which the text fits in
 * `maxLines` lines of `maxW`. Past the minimum it keeps the minimum and trims
 * the last line, so a very long name can't push the table off the poster.
 */
function fit(ctx: Ctx, text: string, maxW: number, maxLines: number, start: number, min: number, weight: number) {
  for (let size = start; size >= min; size -= Math.max(1, size * 0.05)) {
    setFont(ctx, weight, size)
    const lines = wrap(ctx, text, maxW)
    if (lines.length <= maxLines && lines.every((l) => ctx.measureText(l).width <= maxW)) return { size, lines }
  }
  setFont(ctx, weight, min)
  const lines = wrap(ctx, text, maxW).slice(0, maxLines)
  const last = lines.length - 1
  while (last >= 0 && lines[last].length > 1 && ctx.measureText(`${lines[last]}…`).width > maxW) {
    lines[last] = lines[last].slice(0, -1)
  }
  if (last >= 0 && wrap(ctx, text, maxW).length > maxLines) lines[last] = `${lines[last].trimEnd()}…`
  return { size: min, lines }
}

/** One size for a set of texts: the largest at which every one of them fits. */
function uniformSize(ctx: Ctx, texts: string[], maxW: number, maxLines: number, start: number, min: number, weight: number) {
  for (let size = start; size > min; size -= Math.max(1, size * 0.04)) {
    setFont(ctx, weight, size)
    const ok = texts.every((t) => {
      const lines = wrap(ctx, t, maxW)
      return lines.length <= maxLines && lines.every((l) => ctx.measureText(l).width <= maxW)
    })
    if (ok) return size
  }
  return min
}

function roundRect(ctx: Ctx, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

export function drawPoster(canvas: HTMLCanvasElement, size: PosterSize, input: PosterInput) {
  const { w: W, h: H } = pixelsFor(size)
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext("2d")
  if (!ctx) return
  const wide = W > H
  const u = Math.min(W, H) / 100
  const pad = 5 * u

  ctx.fillStyle = C.white
  ctx.fillRect(0, 0, W, H)
  ctx.textBaseline = "middle"

  // ── Header band: logo, shop name, title ──
  const bandH = H * (wide ? 0.25 : 0.19)
  ctx.fillStyle = C.band
  ctx.fillRect(0, 0, W, bandH)
  ctx.fillStyle = C.accent
  ctx.fillRect(0, bandH - 1.1 * u, W, 1.1 * u)

  let textX = pad
  if (input.logo) {
    const s = bandH * 0.56
    const y = (bandH - s) / 2
    ctx.save()
    roundRect(ctx, pad, y, s, s, s * 0.18)
    ctx.fillStyle = C.white
    ctx.fill()
    ctx.clip()
    const img = input.logo
    const ratio = Math.max(s / img.naturalWidth, s / img.naturalHeight)
    const dw = img.naturalWidth * ratio
    const dh = img.naturalHeight * ratio
    ctx.drawImage(img, pad + (s - dw) / 2, y + (s - dh) / 2, dw, dh)
    ctx.restore()
    textX = pad + s + 3.5 * u
  }
  const textW = W - textX - pad
  const name = fit(ctx, input.shopName || "Price list", textW, 2, bandH * 0.3, bandH * 0.14, 800)
  const title = fit(ctx, input.title.toUpperCase(), textW, 1, bandH * 0.14, bandH * 0.08, 800)
  const nameLineH = name.size * 1.08
  const blockH = name.lines.length * nameLineH + title.size * 0.6 + title.size
  let y = (bandH - blockH) / 2 + nameLineH / 2
  ctx.textAlign = "left"
  ctx.fillStyle = C.white
  setFont(ctx, 800, name.size)
  for (const line of name.lines) { ctx.fillText(line, textX, y); y += nameLineH }
  y += title.size * 0.6 - nameLineH / 2 + title.size / 2
  ctx.fillStyle = C.accent
  setFont(ctx, 800, title.size)
  ctx.fillText(title.lines[0] ?? "", textX, y)

  // ── Footer: the shop's own line, then the credit ──
  const footerSize = 3.2 * u
  const creditSize = 1.7 * u
  setFont(ctx, 700, footerSize)
  const footerLines = input.footer.trim() ? fit(ctx, input.footer.trim(), W - 2 * pad, 2, footerSize, 2.2 * u, 700) : null
  let footerH = 0
  if (footerLines) footerH += footerLines.lines.length * footerLines.size * 1.25
  if (input.credit) footerH += creditSize * 2.2
  const footerTop = H - pad * 0.8 - footerH

  // ── The table ──
  // Every heading, name and price shares one size per kind, the largest that
  // fits its column, so the poster reads as one sign rather than cells that
  // each shrank on their own.
  const sizes = input.sizes
  const groups = input.groups.filter((g) => g.rows.length > 0)
  const rows = groups.flatMap((g) => g.rows)
  const tableX = pad
  const tableW = W - 2 * pad
  const nameW = tableW * (sizes.length > 4 ? 0.3 : wide ? 0.32 : 0.36)
  const colW = (tableW - nameW) / Math.max(1, sizes.length)
  const top = bandH + pad * 0.9
  const bottom = footerTop - pad * 0.6

  const headSize = uniformSize(ctx, sizes, colW * 0.92, 2, 3.8 * u, 1.6 * u, 800)
  const headLines = Math.max(1, ...sizes.map((s) => { setFont(ctx, 800, headSize); return wrap(ctx, s, colW * 0.92).length }))
  const headH = headLines * headSize * 1.12 + 3 * u
  const groupH = groups.length > 1 ? 5 * u : 0
  const avail = bottom - top - headH - groupH * groups.length
  const rowH = Math.max(4 * u, Math.min(wide ? 14 * u : 17 * u, avail / Math.max(1, rows.length)))
  const tableH = headH + groupH * groups.length + rowH * rows.length
  const tableY = top + Math.max(0, (bottom - top - tableH) / 2)

  // Column headings: the vehicle sizes.
  ctx.textAlign = "center"
  ctx.fillStyle = C.band
  setFont(ctx, 800, headSize)
  sizes.forEach((s, i) => {
    const cx = tableX + nameW + colW * (i + 0.5)
    const lines = wrap(ctx, s, colW * 0.92)
    const lh = headSize * 1.12
    let ly = tableY + (headH - 0.5 * u) / 2 - ((lines.length - 1) * lh) / 2
    for (const line of lines) { ctx.fillText(line, cx, ly); ly += lh }
  })
  ctx.fillRect(tableX, tableY + headH - 0.5 * u, tableW, 0.5 * u)

  // Rows, grouped into packages and add-ons.
  const nameSize = uniformSize(ctx, rows.map((r) => r.name), nameW - 3 * u, 2, Math.min(rowH * 0.32, 4.8 * u), 1.6 * u, 700)
  const priceTexts = rows.flatMap((r) => r.prices.filter((p): p is string => !!p))
  const priceSize = uniformSize(ctx, priceTexts, colW * 0.8, 1, Math.min(rowH * 0.46, 8 * u), 1.6 * u, 800)
  let ry = tableY + headH
  let stripe = 0
  for (const g of groups) {
    if (groupH) {
      ctx.textAlign = "left"
      ctx.fillStyle = C.muted
      setFont(ctx, 800, Math.min(groupH * 0.42, 2.4 * u))
      ctx.fillText(g.label.toUpperCase(), tableX + 1.5 * u, ry + groupH * 0.58)
      ry += groupH
    }
    for (const r of g.rows) {
      if (stripe++ % 2 === 0) {
        ctx.fillStyle = C.zebra
        ctx.fillRect(tableX, ry, tableW, rowH)
      }
      ctx.textAlign = "left"
      ctx.fillStyle = C.ink
      const f = fit(ctx, r.name, nameW - 3 * u, 2, nameSize, nameSize, 700)
      const lh = f.size * 1.12
      let ly = ry + rowH / 2 - ((f.lines.length - 1) * lh) / 2
      setFont(ctx, 700, f.size)
      for (const line of f.lines) { ctx.fillText(line, tableX + 1.5 * u, ly); ly += lh }

      ctx.textAlign = "center"
      r.prices.forEach((p, i) => {
        const cx = tableX + nameW + colW * (i + 0.5)
        if (p) {
          ctx.fillStyle = C.ink
          setFont(ctx, 800, priceSize)
        } else {
          ctx.fillStyle = C.faint
          setFont(ctx, 600, priceSize * 0.7)
        }
        ctx.fillText(p ?? "—", cx, ry + rowH / 2)
      })
      ry += rowH
    }
  }
  ctx.fillStyle = C.rule
  ctx.fillRect(tableX, ry, tableW, 0.3 * u)

  // Footer text.
  let fy = footerTop
  ctx.textAlign = "center"
  if (footerLines) {
    ctx.fillStyle = C.ink
    setFont(ctx, 700, footerLines.size)
    for (const line of footerLines.lines) {
      fy += footerLines.size * 0.62
      ctx.fillText(line, W / 2, fy)
      fy += footerLines.size * 0.63
    }
  }
  if (input.credit) {
    ctx.fillStyle = C.faint
    setFont(ctx, 600, creditSize)
    ctx.fillText("Price list made with Smapey Carwash · smapey.com", W / 2, fy + creditSize * 1.3)
  }
}

/** Read a logo the visitor picked. It stays in the browser; nothing is uploaded. */
export function readLogo(file: File): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    if (!file.type.startsWith("image/")) { resolve(null); return }
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => { URL.revokeObjectURL(url); resolve(null) }
    img.src = url
  })
}
