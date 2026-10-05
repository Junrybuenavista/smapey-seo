"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Download, ImagePlus, Plus, Printer, Trash2, X } from "lucide-react"
import { INK, BLUE, AMBER, CREAM, MUTED, display, TYPICAL_SIZES, TYPICAL_ROWS } from "@/components/car-wash/shared"
import { POSTER_SIZES, drawPoster, loadPosterFonts, pixelsFor, readLogo, type PosterGroup, type PosterSizeKey } from "@/components/car-wash/poster"

type Kind = "PACKAGE" | "ADD_ON"
interface Row { id: string; name: string; kind: Kind; prices: string[] }

// Starts from the typical Philippine prices on the price list guide, so nobody
// types a grid from nothing. Motorcycle Wash & Wax and Chain Clean & Lube have
// no published price, so they start empty, the same as a new Smapey board.
const KIND: Record<string, Kind> = { "Wash": "PACKAGE", "Wash & Vacuum": "PACKAGE" }
const fromTypical = (p: string | null) => (p ? p.replace(/[₱,]/g, "") : "")
const START_ROWS: Row[] = [
  ...TYPICAL_ROWS.map((r, i) => ({ id: `t${i}`, name: r.name, kind: KIND[r.name] ?? ("ADD_ON" as Kind), prices: r.prices.map(fromTypical) })),
  { id: "m0", name: "Wash & Wax", kind: "PACKAGE", prices: ["", "", "", "", "", ""] },
  { id: "m1", name: "Chain Clean & Lube", kind: "ADD_ON", prices: ["", "", "", "", "", ""] },
]
// Packages first, the way a counter reads a board.
const ordered = (rows: Row[]) => [...rows.filter((r) => r.kind === "PACKAGE"), ...rows.filter((r) => r.kind === "ADD_ON")]

const PRICE_TYPING = /^[0-9,]*\.?[0-9]{0,2}$/
const peso = (v: string) => {
  const n = Number(v.replace(/,/g, ""))
  return Number.isFinite(n) && v.trim() !== "" ? `₱${n.toLocaleString("en-PH", { maximumFractionDigits: 2 })}` : null
}

let nextId = 0
const newId = () => `n${nextId++}`

const field = "w-full rounded-lg border-2 px-3 py-2 text-sm font-semibold outline-none focus:ring-2 focus:ring-offset-0"
const fieldStyle = { borderColor: INK, background: "#fff", color: INK } as const

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-extrabold uppercase tracking-widest mb-3" style={{ color: BLUE }}>{title}</p>
      {children}
    </div>
  )
}

export default function TarpaulinMaker() {
  const [shopName, setShopName] = useState("")
  const [title, setTitle] = useState("Car Wash Price List")
  const [footer, setFooter] = useState("")
  const [sizesOn, setSizesOn] = useState([true, true, true, true, false, false])
  const [rows, setRows] = useState<Row[]>(START_ROWS)
  const [sizeKey, setSizeKey] = useState<PosterSizeKey | null>(null)
  const [credit, setCredit] = useState(true)
  const [logo, setLogo] = useState<HTMLImageElement | null>(null)
  const [fontsReady, setFontsReady] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => { loadPosterFonts().then(() => setFontsReady(true)) }, [])

  const shown = useMemo(() => TYPICAL_SIZES.map((name, i) => ({ name, i })).filter((s) => sizesOn[s.i]), [sizesOn])

  // Only what's offered reaches the poster: a row with no price in any shown
  // size is left off, and so is a size nobody priced.
  const poster = useMemo(() => {
    const priced = ordered(rows)
      .filter((r) => r.name.trim())
      .map((r) => ({ ...r, cells: shown.map((s) => peso(r.prices[s.i] ?? "")) }))
      .filter((r) => r.cells.some(Boolean))
    const keep = shown.map((_, j) => priced.some((r) => r.cells[j]))
    const sizes = shown.filter((_, j) => keep[j]).map((s) => s.name)
    const rowsOf = (kind: Kind) =>
      priced.filter((r) => r.kind === kind).map((r) => ({ name: r.name.trim(), prices: r.cells.filter((_, j) => keep[j]) }))
    const groups: PosterGroup[] = [
      { label: "Packages", rows: rowsOf("PACKAGE") },
      { label: "Add-ons", rows: rowsOf("ADD_ON") },
    ]
    return { sizes, groups, count: priced.length }
  }, [rows, shown])

  const size = POSTER_SIZES.find((s) => s.key === (sizeKey ?? (poster.sizes.length > 4 ? "3x2" : "2x3")))!
  const px = pixelsFor(size)

  useEffect(() => {
    if (!fontsReady || !canvasRef.current) return
    const canvas = canvasRef.current
    const t = setTimeout(() => {
      drawPoster(canvas, size, {
        shopName: shopName.trim() || "Your Car Wash",
        title: title.trim() || "Price List",
        footer,
        credit,
        sizes: poster.sizes,
        groups: poster.groups,
        logo,
      })
    }, 120)
    return () => clearTimeout(t)
  }, [fontsReady, size, shopName, title, footer, credit, poster, logo])

  const setPrice = (id: string, i: number, v: string) => {
    if (!PRICE_TYPING.test(v)) return
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, prices: r.prices.map((p, j) => (j === i ? v : p)) } : r)))
  }
  const update = (id: string, patch: Partial<Row>) => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)))

  const toBlob = () =>
    new Promise<Blob>((resolve, reject) => {
      const c = canvasRef.current
      if (!c) { reject(new Error("The preview isn't ready yet")); return }
      c.toBlob((b) => (b ? resolve(b) : reject(new Error("Couldn't make the image"))), "image/png")
    })
  const fileName = `car-wash-price-list-${size.key}.png`

  const download = async () => {
    setBusy(true)
    setNotice(null)
    try {
      const url = URL.createObjectURL(await toBlob())
      const a = document.createElement("a")
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      a.remove()
      setTimeout(() => URL.revokeObjectURL(url), 60_000)
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "Couldn't make the image")
    } finally {
      setBusy(false)
    }
  }

  // Prints the same image at its real size. The window opens straight from
  // the click, because browsers block pop-ups opened later.
  const print = async () => {
    setNotice(null)
    const w = window.open("", "_blank")
    if (!w) { setNotice("Your browser blocked the print window. Allow pop-ups for this site and try again."); return }
    try {
      const url = URL.createObjectURL(await toBlob())
      w.document.write(`<!DOCTYPE html><html><head><title>${fileName}</title><style>
        @page { size: ${size.wIn}in ${size.hIn}in; margin: 0 }
        html, body { margin: 0; padding: 0 }
        img { display: block; width: ${size.wIn}in; height: ${size.hIn}in }
      </style></head><body><img src="${url}" alt="Car wash price list" /></body></html>`)
      w.document.close()
      const img = w.document.querySelector("img")
      const go = () => setTimeout(() => { w.focus(); w.print() }, 150)
      if (img?.complete) go()
      else img?.addEventListener("load", go)
    } catch (err) {
      w.close()
      setNotice(err instanceof Error ? err.message : "Couldn't make the image")
    }
  }

  const pickLogo = async (file: File | undefined) => {
    if (!file) return
    const img = await readLogo(file)
    if (img) setLogo(img)
    else setNotice("That file isn't an image we can use. Try a PNG or JPG.")
  }

  return (
    // minmax(0, …) and min-w-0 let the price grid scroll inside its card on a
    // phone instead of stretching the whole page sideways.
    <div className="grid gap-8 grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] items-start" style={display}>
      <div className="min-w-0 rounded-3xl border-2 p-5 sm:p-6 space-y-7" style={{ borderColor: INK, background: CREAM }}>
        <Section title="Your shop">
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="block sm:col-span-2">
              <span className="block text-[11px] font-bold uppercase tracking-wide mb-1" style={{ color: MUTED }}>Shop name</span>
              <input value={shopName} maxLength={50} onChange={(e) => setShopName(e.target.value)} placeholder="Your Car Wash" className={field} style={fieldStyle} />
            </label>
            <label className="block">
              <span className="block text-[11px] font-bold uppercase tracking-wide mb-1" style={{ color: MUTED }}>Title</span>
              <input value={title} maxLength={40} onChange={(e) => setTitle(e.target.value)} className={field} style={fieldStyle} />
            </label>
            <label className="block">
              <span className="block text-[11px] font-bold uppercase tracking-wide mb-1" style={{ color: MUTED }}>Line at the bottom</span>
              <input value={footer} maxLength={80} onChange={(e) => setFooter(e.target.value)} placeholder="Open daily · GCash accepted" className={field} style={fieldStyle} />
            </label>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { pickLogo(e.target.files?.[0]); e.target.value = "" }} />
            <button type="button" onClick={() => fileRef.current?.click()} className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm border-2 bg-white" style={{ borderColor: INK, color: INK }}>
              <ImagePlus className="w-4 h-4" /> {logo ? "Change logo" : "Add your logo"}
            </button>
            {logo && (
              <button type="button" onClick={() => setLogo(null)} className="inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: MUTED }}>
                <X className="w-4 h-4" /> Remove logo
              </button>
            )}
          </div>
        </Section>

        <Section title="Vehicle sizes">
          <div className="flex flex-wrap gap-2">
            {TYPICAL_SIZES.map((name, i) => (
              <button
                key={name}
                type="button"
                aria-pressed={sizesOn[i]}
                onClick={() => setSizesOn((on) => on.map((v, j) => (j === i ? !v : v)))}
                className="px-3.5 py-2 rounded-full text-sm font-bold border-2 transition-colors"
                style={sizesOn[i] ? { background: BLUE, color: "#fff", borderColor: INK } : { background: "#fff", color: INK, borderColor: INK }}
              >
                {name}
              </button>
            ))}
          </div>
          <p className="text-xs mt-2" style={{ color: MUTED }}>For a motor wash, turn on Motorcycle and Big bike and set the title to Motor Wash Price List.</p>
        </Section>

        <Section title="Services and prices">
          {shown.length === 0 ? (
            <p className="text-sm font-semibold" style={{ color: MUTED }}>Turn on at least one vehicle size.</p>
          ) : (
            <div className="overflow-x-auto -mx-1 px-1">
              <table className="w-full text-sm border-separate" style={{ borderSpacing: "0 6px" }}>
                <thead>
                  <tr>
                    <th className="sticky left-0 z-10 text-left text-[11px] font-bold uppercase tracking-wide pr-2 min-w-[150px]" style={{ color: MUTED, background: CREAM }}>Service</th>
                    {shown.map((s) => (
                      <th key={s.name} className="px-1 text-[11px] font-bold uppercase tracking-wide text-center min-w-[84px] leading-tight" style={{ color: MUTED }}>{s.name}</th>
                    ))}
                    <th className="w-8" />
                  </tr>
                </thead>
                <tbody>
                  {ordered(rows).map((r) => (
                    <tr key={r.id}>
                      <td className="sticky left-0 z-10 pr-2 align-top" style={{ background: CREAM }}>
                        <input value={r.name} maxLength={40} aria-label="Service name" onChange={(e) => update(r.id, { name: e.target.value })} className={field} style={fieldStyle} />
                        <div className="flex gap-1 mt-1">
                          {(["PACKAGE", "ADD_ON"] as Kind[]).map((k) => (
                            <button
                              key={k}
                              type="button"
                              onClick={() => update(r.id, { kind: k })}
                              className="px-2 py-0.5 rounded-full text-[11px] font-bold border"
                              style={r.kind === k ? { background: INK, color: "#fff", borderColor: INK } : { background: "#fff", color: MUTED, borderColor: "#d8d2c6" }}
                            >
                              {k === "PACKAGE" ? "Package" : "Add-on"}
                            </button>
                          ))}
                        </div>
                      </td>
                      {shown.map((s) => (
                        <td key={s.name} className="px-1 align-top">
                          <div className="relative">
                            <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold" style={{ color: MUTED }}>₱</span>
                            <input
                              value={r.prices[s.i] ?? ""}
                              inputMode="decimal"
                              placeholder="—"
                              aria-label={`${r.name || "Service"}, ${s.name}`}
                              onChange={(e) => setPrice(r.id, s.i, e.target.value)}
                              className={`${field} pl-5 text-right tabular-nums`}
                              style={fieldStyle}
                            />
                          </div>
                        </td>
                      ))}
                      <td className="align-top pt-2">
                        <button type="button" onClick={() => setRows((rs) => rs.filter((x) => x.id !== r.id))} aria-label={`Remove ${r.name || "service"}`} className="p-1.5 rounded-lg" style={{ color: MUTED }}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <button
            type="button"
            onClick={() => setRows((rs) => [...rs, { id: newId(), name: "", kind: "ADD_ON", prices: ["", "", "", "", "", ""] }])}
            className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-full font-bold text-sm border-2 bg-white"
            style={{ borderColor: INK, color: INK }}
          >
            <Plus className="w-4 h-4" /> Add a service
          </button>
          <p className="text-xs mt-2" style={{ color: MUTED }}>
            Leave a box empty for anything you don&apos;t offer in that size. Prices start at typical Philippine prices from
            published shop price lists, mostly from 2020, so change them to yours.
          </p>
        </Section>

        <Section title="Tarpaulin size">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {POSTER_SIZES.map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setSizeKey(s.key)}
                className="text-left p-3 rounded-xl border-2 transition-colors"
                style={size.key === s.key ? { background: "#fff", borderColor: BLUE, boxShadow: `3px 3px 0 ${BLUE}` } : { background: "#fff", borderColor: INK }}
              >
                <span className="block text-sm font-extrabold" style={{ color: INK }}>{s.label}</span>
                <span className="block text-xs mt-0.5" style={{ color: MUTED }}>{s.hint}</span>
              </button>
            ))}
          </div>
        </Section>

        <label className="flex items-center gap-3 text-sm font-semibold cursor-pointer" style={{ color: INK }}>
          <input type="checkbox" checked={credit} onChange={(e) => setCredit(e.target.checked)} className="w-4 h-4" />
          Show a small &ldquo;made with Smapey&rdquo; line at the bottom
        </label>

        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={download} disabled={busy || !fontsReady || poster.count === 0} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5 disabled:opacity-50" style={{ background: AMBER, color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${INK}` }}>
            <Download className="w-4 h-4" /> Download image
          </button>
          <button onClick={print} disabled={!fontsReady || poster.count === 0} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm border-2 bg-white transition-transform hover:-translate-y-0.5 disabled:opacity-50" style={{ color: INK, borderColor: INK }}>
            <Printer className="w-4 h-4" /> Print or save as PDF
          </button>
        </div>
        {notice && <p className="text-sm font-semibold" style={{ color: "#b45309" }}>{notice}</p>}
        <p className="text-xs leading-relaxed" style={{ color: MUTED }}>
          {size.key === "a4"
            ? `A4 at ${size.ppi} pixels per inch: ${px.w.toLocaleString("en-PH")} × ${px.h.toLocaleString("en-PH")} pixels.`
            : `A PNG at the real size: ${px.w.toLocaleString("en-PH")} × ${px.h.toLocaleString("en-PH")} pixels, ${size.label} at ${size.ppi} pixels per inch. Ask the printer for ${size.label}.`}{" "}
          Nothing you type or upload leaves your browser.
        </p>
      </div>

      <div className="min-w-0 order-first lg:order-none lg:sticky lg:top-24">
        <div className="rounded-3xl border-2 p-4 sm:p-5 flex items-center justify-center" style={{ borderColor: INK, background: "#fff", boxShadow: `8px 8px 0 ${BLUE}` }}>
          {poster.count === 0 ? (
            <p className="text-sm font-semibold py-16 text-center" style={{ color: MUTED }}>Add a price to see your tarpaulin.</p>
          ) : (
            <canvas ref={canvasRef} aria-label="Tarpaulin preview" className="block max-w-full h-auto" style={{ maxHeight: "72vh", width: "auto", boxShadow: "0 1px 6px rgba(22,22,22,.18)" }} />
          )}
        </div>
      </div>
    </div>
  )
}
