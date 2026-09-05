"use client"

import { useState, type ReactNode } from "react"

/**
 * Shared chrome for the printable template tools. Each document owns its own
 * fields and its own sheet layout - a repair estimate, a medical certificate
 * and a rental agreement have almost nothing structural in common, so trying
 * to drive all three from one schema would cost more than it saved. What they
 * do share is this: a form beside a live A4 sheet, a print button, and the
 * print stylesheet in globals.css that strips everything except the sheet.
 */

export const INK = "#161616"
export const BLUE = "#2f6bff"
export const CREAM = "#fbf7f0"
export const MUTED = "#54514c"
export const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

export function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  wide = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: "text" | "date" | "number"
  wide?: boolean
}) {
  return (
    <label className={wide ? "block sm:col-span-2" : "block"}>
      <span className="block text-[11px] font-bold uppercase tracking-wide mb-1" style={{ color: MUTED }}>
        {label}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border-2 px-3 py-2 text-sm font-semibold outline-none focus:ring-0"
        style={{ borderColor: INK, background: "#fff", color: INK }}
      />
    </label>
  )
}

export function Area({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}) {
  return (
    <label className="block sm:col-span-2">
      <span className="block text-[11px] font-bold uppercase tracking-wide mb-1" style={{ color: MUTED }}>
        {label}
      </span>
      <textarea
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border-2 px-3 py-2 text-sm font-semibold outline-none focus:ring-0 resize-y"
        style={{ borderColor: INK, background: "#fff", color: INK }}
      />
    </label>
  )
}

export function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-xs font-extrabold uppercase tracking-widest mb-3" style={{ color: BLUE }}>
        {title}
      </p>
      <div className="grid sm:grid-cols-2 gap-3">{children}</div>
    </div>
  )
}

/** A value on the printed sheet - falls back to a rule you can write on by hand. */
export function Slot({ value, minWidth = 120 }: { value: string; minWidth?: number }) {
  if (value.trim()) return <span>{value}</span>
  return (
    <span
      style={{
        display: "inline-block",
        minWidth,
        borderBottom: "1px solid #9a958c",
        height: "1.1em",
        verticalAlign: "bottom",
      }}
    />
  )
}

export default function DocShell({
  form,
  sheet,
  onReset,
  printLabel = "Print / Save as PDF",
}: {
  form: ReactNode
  sheet: ReactNode
  onReset: () => void
  printLabel?: string
}) {
  const [justReset, setJustReset] = useState(false)

  return (
    <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] gap-8 items-start" style={display}>
      <div className="doc-no-print rounded-3xl border-2 p-6 space-y-6" style={{ borderColor: INK, background: CREAM }}>
        {form}
        <div className="flex flex-wrap gap-3 pt-1">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-6 py-3 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5"
            style={{ background: INK, color: "#fff", borderColor: INK }}
          >
            {printLabel}
          </button>
          <button
            type="button"
            onClick={() => {
              onReset()
              setJustReset(true)
              setTimeout(() => setJustReset(false), 1600)
            }}
            className="px-5 py-3 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5"
            style={{ background: "#fff", color: INK, borderColor: INK }}
          >
            {justReset ? "Cleared" : "Clear all fields"}
          </button>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: MUTED }}>
          Nothing you type here leaves your browser - there is no account, and the form is not sent anywhere. Clear
          the fields and print to get a blank version you can fill in by hand.
        </p>
      </div>

      <div className="lg:sticky lg:top-6">
        <div
          className="doc-sheet rounded-2xl border-2 bg-white p-8 sm:p-10 overflow-x-auto"
          style={{ borderColor: INK, color: INK, fontSize: 13, lineHeight: 1.5 }}
        >
          {sheet}
        </div>
      </div>
    </div>
  )
}
