"use client"

import { useState } from "react"
import { INK, BLUE, AMBER, CREAM, MUTED, FAINT, display } from "./shared"

/**
 * Example barbershop floor plans for two, three and five chairs, drawn to scale.
 *
 * Everything is placed in metres from the inside face of the back-left
 * corner: x runs right, y runs from the back wall towards the street. The
 * stations are 1.45 m apart, which leaves each barber room to walk round the
 * chair, and every plan keeps one hand-washing sink and one toilet for up to
 * five chairs, the DOH minimum for barbershops. Door swings and markers were
 * placed to clear the fixtures they sit beside, so move them together.
 *
 * All three plans render at the same scale, so switching between them shows
 * how much bigger the room really gets.
 */

const U = 100 // SVG units per metre
const s = (v: number) => Math.round(v * U * 10) / 10

const FLOOR = CREAM
const GLASS = "#cfe0ff"
const MIRROR = "#dbe6ff"
const BACKREST = "#1f4fd1"
const WOOD = "#efe5d6"
const LEAF = "#3f9d63"

// Room for the dimension labels on the left and top, and the scale bar below.
const PAD = { left: 0.6, top: 0.58, right: 0.25, bottom: 0.8 }
const WIDEST = 5.0 + PAD.left + PAD.right
// Desktop cap on the widest plan, in px. The others are drawn at the same scale.
const MAX_PX = 440

type Pt = [number, number]

type Item =
  | { kind: "station"; side: "left" | "right"; cy: number }
  | { kind: "bench"; side: "left" | "right"; y0: number; y1: number }
  | { kind: "counter" | "sink" | "cabinet" | "products" | "tv" | "wall"; x: number; y: number; w: number; h: number }
  | { kind: "toilet" | "shampoo"; x: number; y: number }
  | { kind: "plant"; cx: number; cy: number; r: number }
  | { kind: "door"; hinge: Pt; closed: Pt; open: Pt; sweep: 0 | 1 }

type Plan = {
  key: string
  chairs: number
  w: number
  d: number
  area: string
  title: string
  note: string
  desc: string
  /** The opening in the glass front, from x0 to x1. Its door hinges at x1. */
  door: [number, number]
  items: Item[]
  /** [legend number, x, y] */
  markers: [number, number, number][]
}

const LEGEND: Record<number, string> = {
  1: "Barber station: chair, mirror and shelf",
  2: "Waiting bench",
  3: "Counter",
  4: "Hand-washing sink",
  5: "Toilet",
  6: "Towels, tools and sterilizer",
  7: "Shampoo sink",
  8: "Storage",
  9: "Product shelf",
  10: "TV showing the queue",
}

const PLANS: Plan[] = [
  {
    key: "two",
    chairs: 2,
    w: 3.0,
    d: 5.0,
    area: "15",
    title: "Two chairs in 15\u00a0m²",
    note: "Both stations share one wall and the bench faces them, leaving about 1.4 metres to work and walk between. The toilet and the hand-washing sink sit at the back, out of the customers' way.",
    desc: "Floor plan of a 3.0 by 5.0 metre shop with a glass front and door on the street side. Two barber stations line the left wall. A waiting bench runs along the right wall facing them, with a small counter by the door. At the back are a shelf for towels and tools, a hand-washing sink, and a toilet in the right corner.",
    door: [0.9, 1.8],
    items: [
      { kind: "wall", x: 1.76, y: 0, w: 0.08, h: 1.54 },
      { kind: "wall", x: 1.76, y: 1.46, w: 0.29, h: 0.08 },
      { kind: "wall", x: 2.75, y: 1.46, w: 0.25, h: 0.08 },
      { kind: "door", hinge: [2.75, 1.5], closed: [2.05, 1.5], open: [2.75, 0.8], sweep: 1 },
      { kind: "toilet", x: 2.55, y: 0 },
      { kind: "sink", x: 1.05, y: 0.04, w: 0.5, h: 0.42 },
      { kind: "cabinet", x: 0.1, y: 0.04, w: 0.75, h: 0.4 },
      { kind: "station", side: "left", cy: 2.15 },
      { kind: "station", side: "left", cy: 3.65 },
      { kind: "bench", side: "right", y0: 2.2, y1: 4.0 },
      { kind: "counter", x: 2.25, y: 4.3, w: 0.7, h: 0.5 },
      { kind: "plant", cx: 0.35, cy: 4.65, r: 0.2 },
    ],
    markers: [[1, 1.45, 2.9], [2, 2.775, 3.1], [3, 2.6, 4.55], [4, 1.3, 0.7], [5, 2.05, 0.6], [6, 0.475, 0.7]],
  },
  {
    key: "three",
    chairs: 3,
    w: 3.6,
    d: 5.6,
    area: "20",
    title: "Three chairs in about 20\u00a0m²",
    note: "The third chair takes the rest of the left wall, so the bench, the counter and the hand-washing sink move to the right, with about 2 metres between the chairs and the bench. A product shelf by the glass faces the street.",
    desc: "Floor plan of a 3.6 by 5.6 metre shop with a glass front and door on the street side. Three barber stations line the left wall from the back to the front. Along the right wall are a toilet in the back corner, a hand-washing sink, a waiting bench and a counter by the door. A towel and tool shelf sits on the back wall, and a product shelf stands at the front by the glass.",
    door: [1.1, 2.0],
    items: [
      { kind: "wall", x: 2.36, y: 0, w: 0.08, h: 1.54 },
      { kind: "wall", x: 2.36, y: 1.46, w: 0.29, h: 0.08 },
      { kind: "wall", x: 3.35, y: 1.46, w: 0.25, h: 0.08 },
      { kind: "door", hinge: [3.35, 1.5], closed: [2.65, 1.5], open: [3.35, 0.8], sweep: 1 },
      { kind: "toilet", x: 3.15, y: 0 },
      { kind: "sink", x: 3.16, y: 1.68, w: 0.4, h: 0.5 },
      { kind: "cabinet", x: 1.35, y: 0.04, w: 0.9, h: 0.4 },
      { kind: "station", side: "left", cy: 0.825 },
      { kind: "station", side: "left", cy: 2.275 },
      { kind: "station", side: "left", cy: 3.725 },
      { kind: "bench", side: "right", y0: 2.45, y1: 4.25 },
      { kind: "counter", x: 2.8, y: 4.65, w: 0.75, h: 0.5 },
      { kind: "products", x: 0.05, y: 4.6, w: 0.35, h: 0.9 },
      { kind: "plant", cx: 2.4, cy: 5.3, r: 0.18 },
    ],
    markers: [[1, 1.5, 2.275], [2, 3.375, 3.35], [3, 3.175, 4.9], [4, 2.9, 1.93], [5, 2.65, 0.6], [6, 1.8, 0.7], [9, 0.65, 5.05]],
  },
  {
    key: "five",
    chairs: 5,
    w: 5.0,
    d: 7.6,
    area: "38",
    title: "Five chairs in about 38\u00a0m²",
    note: "Stations line both walls with about 2.6 metres between the rows, and the back holds a shampoo sink and storage. Five chairs, one toilet and one hand-washing sink: the DOH rule is at least one of each for every five chairs.",
    desc: "Floor plan of a 5.0 by 7.6 metre shop with a glass front and door on the street side. Three barber stations line the left wall and two line the right wall, with an aisle between them. Across the back are a toilet in the left corner, a hand-washing sink, a shampoo sink with its chair, a towel and tool shelf, and storage. At the front are a counter with a TV showing the queue on the left, a waiting bench on the right, and a product shelf by the glass.",
    door: [2.0, 2.9],
    items: [
      { kind: "wall", x: 1.26, y: 0, w: 0.08, h: 0.6 },
      { kind: "wall", x: 1.26, y: 1.3, w: 0.08, h: 0.44 },
      { kind: "wall", x: 0, y: 1.66, w: 1.34, h: 0.08 },
      { kind: "door", hinge: [1.3, 1.3], closed: [1.3, 0.6], open: [0.6, 1.3], sweep: 0 },
      { kind: "toilet", x: 0.45, y: 0 },
      { kind: "sink", x: 1.55, y: 0.04, w: 0.5, h: 0.42 },
      { kind: "shampoo", x: 2.75, y: 0 },
      { kind: "cabinet", x: 3.4, y: 0.04, w: 0.75, h: 0.4 },
      { kind: "cabinet", x: 4.3, y: 0.04, w: 0.66, h: 0.86 },
      { kind: "station", side: "left", cy: 2.625 },
      { kind: "station", side: "left", cy: 4.075 },
      { kind: "station", side: "left", cy: 5.525 },
      { kind: "station", side: "right", cy: 2.625 },
      { kind: "station", side: "right", cy: 4.075 },
      { kind: "bench", side: "right", y0: 5.0, y1: 6.8 },
      { kind: "counter", x: 0.05, y: 6.6, w: 1.0, h: 0.5 },
      { kind: "tv", x: 0, y: 6.5, w: 0.07, h: 0.7 },
      { kind: "products", x: 3.25, y: 7.15, w: 1.0, h: 0.35 },
      { kind: "plant", cx: 4.7, cy: 7.2, r: 0.2 },
    ],
    markers: [[1, 2.5, 4.075], [2, 4.775, 5.9], [3, 0.55, 6.85], [4, 1.8, 0.7], [5, 0.3, 1.25], [6, 3.78, 0.7], [7, 3.25, 1.1], [8, 4.63, 1.2], [9, 3.75, 6.9], [10, 0.3, 7.35]],
  },
]

/** A station drawn on the left wall; the right wall gets the mirror image. */
function Station({ side, cy, w }: { side: "left" | "right"; cy: number; w: number }) {
  const parts = (
    <>
      <rect x={0} y={s(cy - 0.62)} width={s(0.3)} height={s(1.24)} fill={MIRROR} stroke={INK} strokeWidth={2} />
      <line x1={s(0.05)} y1={s(cy - 0.55)} x2={s(0.05)} y2={s(cy + 0.55)} stroke={BLUE} strokeWidth={3} />
      <rect x={s(0.4)} y={s(cy - 0.16)} width={s(0.12)} height={s(0.32)} rx={3} fill={INK} />
      <rect x={s(0.55)} y={s(cy - 0.25)} width={s(0.5)} height={s(0.5)} rx={s(0.08)} fill={BLUE} stroke={INK} strokeWidth={2} />
      <rect x={s(0.6)} y={s(cy - 0.31)} width={s(0.42)} height={s(0.07)} rx={3} fill={INK} />
      <rect x={s(0.6)} y={s(cy + 0.24)} width={s(0.42)} height={s(0.07)} rx={3} fill={INK} />
      <rect x={s(1.02)} y={s(cy - 0.24)} width={s(0.16)} height={s(0.48)} rx={s(0.05)} fill={BACKREST} stroke={INK} strokeWidth={2} />
    </>
  )
  return side === "left" ? <g>{parts}</g> : <g transform={`translate(${s(w)} 0) scale(-1 1)`}>{parts}</g>
}

function Bench({ side, y0, y1, w }: { side: "left" | "right"; y0: number; y1: number; w: number }) {
  const x = side === "left" ? 0 : w - 0.45
  const seats = Math.max(1, Math.round((y1 - y0) / 0.6))
  const step = (y1 - y0) / seats
  return (
    <g>
      <rect x={s(x)} y={s(y0)} width={s(0.45)} height={s(y1 - y0)} rx={4} fill={AMBER} stroke={INK} strokeWidth={2} />
      {Array.from({ length: seats - 1 }, (_, i) => (
        <line key={i} x1={s(x)} y1={s(y0 + step * (i + 1))} x2={s(x + 0.45)} y2={s(y0 + step * (i + 1))} stroke={INK} strokeWidth={1.5} />
      ))}
    </g>
  )
}

/** Back of the tank against the wall at (x, y), facing into the room. */
function Toilet({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={s(x - 0.2)} y={s(y)} width={s(0.4)} height={s(0.18)} rx={3} fill="#fff" stroke={INK} strokeWidth={2} />
      <ellipse cx={s(x)} cy={s(y + 0.45)} rx={s(0.18)} ry={s(0.26)} fill="#fff" stroke={INK} strokeWidth={2} />
      <ellipse cx={s(x)} cy={s(y + 0.47)} rx={s(0.1)} ry={s(0.15)} fill="none" stroke={INK} strokeWidth={1.5} />
    </g>
  )
}

/** Basin against the wall at (x, y), with its reclining chair in front. */
function Shampoo({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={s(x - 0.3)} y={s(y)} width={s(0.6)} height={s(0.45)} rx={4} fill="#fff" stroke={INK} strokeWidth={2} />
      <ellipse cx={s(x)} cy={s(y + 0.22)} rx={s(0.2)} ry={s(0.13)} fill={MIRROR} stroke={INK} strokeWidth={1.5} />
      <rect x={s(x - 0.26)} y={s(y + 0.55)} width={s(0.52)} height={s(0.7)} rx={s(0.08)} fill={BLUE} stroke={INK} strokeWidth={2} />
      <rect x={s(x - 0.2)} y={s(y + 0.5)} width={s(0.4)} height={s(0.12)} rx={s(0.05)} fill={BACKREST} stroke={INK} strokeWidth={2} />
    </g>
  )
}

function Box({ kind, x, y, w, h }: { kind: "counter" | "sink" | "cabinet" | "products" | "tv" | "wall"; x: number; y: number; w: number; h: number }) {
  if (kind === "wall") return <rect x={s(x)} y={s(y)} width={s(w)} height={s(h)} fill={INK} />
  if (kind === "tv") return <rect x={s(x)} y={s(y)} width={s(w)} height={s(h)} rx={2} fill={INK} />
  if (kind === "sink") {
    return (
      <g>
        <rect x={s(x)} y={s(y)} width={s(w)} height={s(h)} rx={4} fill="#fff" stroke={INK} strokeWidth={2} />
        <ellipse cx={s(x + w / 2)} cy={s(y + h / 2)} rx={s(Math.min(w, h) * 0.32)} ry={s(Math.min(w, h) * 0.26)} fill={MIRROR} stroke={INK} strokeWidth={1.5} />
      </g>
    )
  }
  if (kind === "cabinet") {
    // The usual drawing convention for a cabinet or shelving unit.
    return (
      <g>
        <rect x={s(x)} y={s(y)} width={s(w)} height={s(h)} fill="#fff" stroke={INK} strokeWidth={2} />
        <line x1={s(x)} y1={s(y)} x2={s(x + w)} y2={s(y + h)} stroke={INK} strokeWidth={1} />
        <line x1={s(x + w)} y1={s(y)} x2={s(x)} y2={s(y + h)} stroke={INK} strokeWidth={1} />
      </g>
    )
  }
  if (kind === "products") {
    const across = w >= h
    const n = Math.max(2, Math.floor((across ? w : h) / 0.2))
    return (
      <g>
        <rect x={s(x)} y={s(y)} width={s(w)} height={s(h)} fill={WOOD} stroke={INK} strokeWidth={2} />
        {Array.from({ length: n }, (_, i) => {
          const t = ((i + 0.5) / n) * (across ? w : h)
          return <circle key={i} cx={s(across ? x + t : x + w / 2)} cy={s(across ? y + h / 2 : y + t)} r={s(0.05)} fill={AMBER} stroke={INK} strokeWidth={1} />
        })}
      </g>
    )
  }
  return (
    <g>
      <rect x={s(x)} y={s(y)} width={s(w)} height={s(h)} rx={4} fill={WOOD} stroke={INK} strokeWidth={2} />
      <rect x={s(x + w / 2 - 0.12)} y={s(y + h / 2 - 0.08)} width={s(0.24)} height={s(0.16)} rx={2} fill={INK} />
    </g>
  )
}

function Door({ hinge, closed, open, sweep }: { hinge: Pt; closed: Pt; open: Pt; sweep: 0 | 1 }) {
  const r = Math.hypot(closed[0] - hinge[0], closed[1] - hinge[1])
  return (
    <g>
      <line x1={s(hinge[0])} y1={s(hinge[1])} x2={s(open[0])} y2={s(open[1])} stroke={INK} strokeWidth={3} />
      <path d={`M ${s(closed[0])} ${s(closed[1])} A ${s(r)} ${s(r)} 0 0 ${sweep} ${s(open[0])} ${s(open[1])}`} fill="none" stroke={INK} strokeWidth={1.5} strokeDasharray="6 5" />
    </g>
  )
}

function Plant({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g>
      {[0, 60, 120].map((a) => (
        <ellipse key={a} cx={s(cx)} cy={s(cy)} rx={s(r)} ry={s(r * 0.38)} transform={`rotate(${a} ${s(cx)} ${s(cy)})`} fill={LEAF} stroke={INK} strokeWidth={1.2} />
      ))}
      <circle cx={s(cx)} cy={s(cy)} r={s(r * 0.22)} fill={INK} />
    </g>
  )
}

function Marker({ n, x, y }: { n: number; x: number; y: number }) {
  return (
    <g>
      <circle cx={s(x)} cy={s(y)} r={s(0.19)} fill="#fff" stroke={INK} strokeWidth={2.5} />
      <text x={s(x)} y={s(y)} dy="0.35em" textAnchor="middle" fontSize={n > 9 ? 19 : 23} fontWeight={800} fill={INK}>{n}</text>
    </g>
  )
}

function PlanDrawing({ plan }: { plan: Plan }) {
  const { w, d, door } = plan
  const vb = [-s(PAD.left), -s(PAD.top), s(w + PAD.left + PAD.right), s(d + PAD.top + PAD.bottom)]
  const glass: [number, number][] = [[0, door[0]], [door[1], w]]
  return (
    <svg
      viewBox={vb.join(" ")}
      role="img"
      aria-labelledby={`fp-title-${plan.key} fp-desc-${plan.key}`}
      style={{ width: `${((w + PAD.left + PAD.right) / WIDEST) * 100}%`, height: "auto", display: "block", fontFamily: display.fontFamily }}
    >
      <title id={`fp-title-${plan.key}`}>{plan.title}, example barbershop floor plan</title>
      <desc id={`fp-desc-${plan.key}`}>{plan.desc}</desc>

      {/* Walls, then the floor inside them */}
      <rect x={-12} y={-12} width={s(w) + 24} height={s(d) + 24} fill={INK} />
      <rect x={0} y={0} width={s(w)} height={s(d)} fill={FLOOR} />

      {/* The street side is glass, apart from the door opening */}
      {glass.map(([a, b]) => (
        <g key={a}>
          <rect x={s(a)} y={s(d)} width={s(b - a)} height={12} fill={GLASS} stroke={INK} strokeWidth={1.5} />
          <line x1={s(a)} y1={s(d) + 6} x2={s(b)} y2={s(d) + 6} stroke={INK} strokeWidth={1} />
        </g>
      ))}
      <rect x={s(door[0])} y={s(d) - 1} width={s(door[1] - door[0])} height={14} fill={FLOOR} />

      {plan.items.map((it, i) => {
        switch (it.kind) {
          case "station": return <Station key={i} side={it.side} cy={it.cy} w={w} />
          case "bench": return <Bench key={i} side={it.side} y0={it.y0} y1={it.y1} w={w} />
          case "toilet": return <Toilet key={i} x={it.x} y={it.y} />
          case "shampoo": return <Shampoo key={i} x={it.x} y={it.y} />
          case "plant": return <Plant key={i} cx={it.cx} cy={it.cy} r={it.r} />
          case "door": return <Door key={i} hinge={it.hinge} closed={it.closed} open={it.open} sweep={it.sweep} />
          default: return <Box key={i} kind={it.kind} x={it.x} y={it.y} w={it.w} h={it.h} />
        }
      })}
      <Door hinge={[door[1], d]} closed={[door[0], d]} open={[door[1], d - (door[1] - door[0])]} sweep={1} />

      {plan.markers.map(([n, x, y]) => <Marker key={`${n}-${x}-${y}`} n={n} x={x} y={y} />)}

      {/* Overall size */}
      <g stroke={MUTED} strokeWidth={1.5}>
        <line x1={0} y1={-32} x2={s(w)} y2={-32} />
        <line x1={0} y1={-40} x2={0} y2={-24} />
        <line x1={s(w)} y1={-40} x2={s(w)} y2={-24} />
        <line x1={-32} y1={0} x2={-32} y2={s(d)} />
        <line x1={-40} y1={0} x2={-24} y2={0} />
        <line x1={-40} y1={s(d)} x2={-24} y2={s(d)} />
      </g>
      <text x={s(w) / 2} y={-42} textAnchor="middle" fontSize={20} fontWeight={700} fill={MUTED}>{w.toFixed(1)} m</text>
      <text transform={`translate(-42 ${s(d) / 2}) rotate(-90)`} textAnchor="middle" fontSize={20} fontWeight={700} fill={MUTED}>{d.toFixed(1)} m</text>

      {/* Scale bar and the street */}
      <g stroke={INK} strokeWidth={2}>
        <line x1={0} y1={s(d) + 46} x2={U} y2={s(d) + 46} />
        <line x1={0} y1={s(d) + 38} x2={0} y2={s(d) + 54} />
        <line x1={U} y1={s(d) + 38} x2={U} y2={s(d) + 54} />
      </g>
      <text x={U / 2} y={s(d) + 72} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>1 m</text>
      <text x={s(w)} y={s(d) + 52} textAnchor="end" fontSize={17} fontWeight={800} letterSpacing={3} fill={FAINT}>STREET</text>
    </svg>
  )
}

export default function FloorPlans() {
  const [active, setActive] = useState(0)
  return (
    <figure className="my-8 rounded-[24px] border-2 p-4 sm:p-6" style={{ borderColor: INK, background: "#fff", boxShadow: `8px 8px 0 ${AMBER}`, ...display }}>
      <div role="tablist" aria-label="Shop size" className="flex flex-wrap gap-2 mb-6">
        {PLANS.map((p, i) => (
          <button
            key={p.key}
            type="button"
            role="tab"
            id={`fp-tab-${p.key}`}
            aria-selected={active === i}
            aria-controls={`fp-panel-${p.key}`}
            onClick={() => setActive(i)}
            className="px-3.5 py-1.5 rounded-full text-sm font-bold border-2 transition-colors"
            style={active === i ? { background: INK, color: "#fff", borderColor: INK } : { background: "#fff", color: INK, borderColor: INK }}
          >
            {p.chairs} chairs · {p.area}&nbsp;m²
          </button>
        ))}
      </div>

      {PLANS.map((p, i) => {
        const numbers = Array.from(new Set(p.markers.map(([n]) => n))).sort((a, b) => a - b)
        return (
          // Toggled by class, not the hidden attribute: Tailwind's `grid`
          // would override [hidden] and show every panel at once.
          <div
            key={p.key}
            role="tabpanel"
            id={`fp-panel-${p.key}`}
            aria-labelledby={`fp-tab-${p.key}`}
            className={`${active === i ? "grid" : "hidden"} md:grid-cols-[minmax(0,1fr)_210px] gap-6 items-start`}
          >
            <div className="w-full" style={{ maxWidth: MAX_PX }}>
              <PlanDrawing plan={p} />
            </div>
            <div>
              <p className="font-extrabold text-lg leading-snug" style={{ color: INK }}>{p.title}</p>
              <p className="text-xs font-semibold mt-1 mb-4" style={{ color: FAINT }}>{p.w.toFixed(1)} × {p.d.toFixed(1)} m, drawn to scale</p>
              <ul className="space-y-1.5 mb-4">
                {numbers.map((n) => (
                  <li key={n} className="flex items-start gap-2 text-sm" style={{ color: MUTED }}>
                    <span className="w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center text-[10px] font-extrabold" style={{ borderColor: INK, color: INK }}>{n}</span>
                    <span className="leading-snug">{LEGEND[n]}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{p.note}</p>
            </div>
          </div>
        )
      })}

      <figcaption className="mt-6 pt-4 text-xs leading-relaxed" style={{ color: FAINT, borderTop: `1px solid ${CREAM}` }}>
        Example layouts, drawn to the same scale so you can compare them, not plans to build from. Measure your own space,
        and have your contractor and the city or municipal health office check your drawing before the renovation starts.
      </figcaption>
    </figure>
  )
}
