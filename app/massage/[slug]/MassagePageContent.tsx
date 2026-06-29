"use client"

import { useEffect, useState } from "react"
import { Flower2, Calendar, User, CheckCircle2, Loader2, AlertCircle, Clock, Sparkles, Star, Zap, Leaf, HandHelping } from "lucide-react"
import dayjs from "dayjs"

const API = process.env.NEXT_PUBLIC_API_URL || ""

const EMPTY_FORM = {
  serviceId: "",
  therapistId: "",
  clientName: "",
  clientPhone: "",
  clientEmail: "",
  preferredDate: "",
  notes: "",
  depositReference: "",
}
type FormState = typeof EMPTY_FORM

interface PageProps {
  data: { org: any; services: any[]; therapists: any[] }
  form: FormState
  setForm: React.Dispatch<React.SetStateAction<FormState>>
  handleSubmit: (e: React.FormEvent) => void
  submitting: boolean
  submitted: boolean
  setSubmitted: (v: boolean) => void
  error: string
  sym: string
}

// Compact therapist picker — reused inside each theme with theme-specific styling
function TherapistPicker({
  therapists, value, onChange, accent, variant = "light",
}: {
  therapists: any[]
  value: string
  onChange: (id: string) => void
  accent: string
  variant?: "light" | "dark"
}) {
  if (!therapists?.length) return null
  const isDark = variant === "dark"
  const cardBg = isDark ? "#171717" : "white"
  const cardBorder = isDark ? "#262626" : "#e2e8f0"
  const textMain = isDark ? "#e2e8f0" : "#334155"
  const textSub = isDark ? "#64748b" : "#94a3b8"

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {/* "Any therapist" tile */}
      <button type="button" onClick={() => onChange("")}
        className="text-left rounded-xl border-2 p-3 transition"
        style={value === ""
          ? { borderColor: accent, background: `${accent}10` }
          : { borderColor: cardBorder, background: cardBg }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
            style={{ background: `${accent}15` }}>
            <Sparkles className="w-3.5 h-3.5" style={{ color: accent }} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold truncate" style={{ color: textMain }}>Any therapist</p>
            <p className="text-[10px]" style={{ color: textSub }}>No preference</p>
          </div>
        </div>
      </button>

      {therapists.map(t => (
        <button key={t.id} type="button" onClick={() => onChange(t.id)}
          className="text-left rounded-xl border-2 p-3 transition"
          style={value === t.id
            ? { borderColor: accent, background: `${accent}10` }
            : { borderColor: cardBorder, background: cardBg }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
              style={{ background: `${accent}15` }}>
              <HandHelping className="w-3.5 h-3.5" style={{ color: accent }} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold truncate" style={{ color: textMain }}>{t.fullName}</p>
              {t.specialties && (
                <p className="text-[10px] truncate" style={{ color: textSub }}>{t.specialties}</p>
              )}
            </div>
            {value === t.id && (
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} />
            )}
          </div>
        </button>
      ))}
    </div>
  )
}

// ─── ZEN · Soft Green Spa ────────────────────────────────────────────────────
// Colors: emerald / teal — white background, soft green accents, calm spa feel
// Layout: stacked service list with thumbnail, floating form card

function ZenPage({ data, form, setForm, handleSubmit, submitting, submitted, setSubmitted, error, sym }: PageProps) {
  const field = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))
  const accent = data.org.massageAccentColor || "#10b981"
  const soft = "#f7f2e9"
  const selectedService = data.services.find(s => s.id === form.serviceId)

  if (submitted) return (
    <div className="min-h-screen bg-[#fbf7f0] flex flex-col items-center justify-center gap-5 p-6">
      <div className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: `${accent}15` }}>
        <Sparkles className="w-8 h-8" style={{ color: accent }} />
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-[#161616]">You're all set! 🌿</p>
        <p className="text-[#9b9487] text-sm mt-2 max-w-xs">
          <strong className="text-[#56524b]">{data.org.companyName}</strong> will reach out to confirm your session.
        </p>
      </div>
      <button onClick={() => { setSubmitted(false); setForm(EMPTY_FORM) }}
        className="px-8 py-3 rounded-full text-white font-semibold text-sm border-2 border-[#161616] shadow-[3px_3px_0_#161616] transition hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#161616] hover:opacity-95"
        style={{ background: accent }}>
        Book Another
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#fbf7f0]">
      {/* Sticky nav */}
      <div className="sticky top-0 z-10 bg-white border-b-2 border-[#161616]">
        <div className="max-w-xl mx-auto px-4 py-3 flex items-center gap-3">
          {data.org.logoUrl
            ? <img src={data.org.logoUrl} alt="logo" className="w-9 h-9 rounded-full object-cover" />
            : <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: `${accent}15` }}>
                <Flower2 className="w-4 h-4" style={{ color: accent }} />
              </div>}
          <div className="flex-1">
            <p className="font-bold text-[#161616] text-sm">{data.org.companyName || "Spa"}</p>
            <p className="text-[11px] text-[#9b9487]">{data.org.massageTagline || "Online Booking"}</p>
          </div>
          <span className="text-xs font-semibold px-4 py-1.5 rounded-full text-white" style={{ background: accent }}>
            Book Now
          </span>
        </div>
      </div>

      {/* Cover */}
      {data.org.massageCoverUrl && (
        <div className="w-full h-44 overflow-hidden relative">
          <img src={data.org.massageCoverUrl} alt="cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
        </div>
      )}

      <div className="max-w-xl mx-auto px-4 py-6 space-y-4">
        {/* Services */}
        <div className="rounded-3xl bg-white border-2 border-[#161616] overflow-hidden shadow-[5px_5px_0_#161616]">
          <div className="px-5 py-4 border-b-2 border-[#161616]" style={{ background: soft }}>
            <h2 className="font-bold text-[#161616] text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ background: accent }}>1</span>
              Choose a Service
            </h2>
          </div>
          {/* services list rendered below */}
          {data.services.length === 0
            ? <div className="py-10 text-center text-[#9b9487] text-sm">No services yet.</div>
            : <div className="divide-y divide-[#e7ded0]">
                {data.services.map(s => (
                  <button key={s.id} type="button" onClick={() => setForm(f => ({ ...f, serviceId: s.id }))}
                    className="w-full flex items-center gap-3 px-5 py-3.5 text-left transition hover:bg-[#f7f2e9]"
                    style={form.serviceId === s.id ? { background: `${accent}08` } : {}}>
                    {s.imageUrl
                      ? <img src={s.imageUrl} alt={s.name} className="w-12 h-12 rounded-xl object-cover shrink-0 border-2 border-[#161616]" />
                      : <div className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center border-2 border-[#161616]" style={{ background: `${accent}10` }}>
                          <Flower2 className="w-5 h-5" style={{ color: accent }} />
                        </div>}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#161616] text-sm">{s.name}</p>
                      {s.description && <p className="text-xs text-[#9b9487] truncate mt-0.5">{s.description}</p>}
                      <p className="text-[11px] text-[#9b9487] mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />{s.durationMinutes} min
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-sm" style={{ color: accent }}>{sym}{Number(s.price).toLocaleString()}</p>
                      {form.serviceId === s.id
                        ? <CheckCircle2 className="w-4 h-4 mt-1 ml-auto" style={{ color: accent }} />
                        : <div className="w-4 h-4 rounded-full border-2 border-[#161616] mt-1 ml-auto" />}
                    </div>
                  </button>
                ))}
              </div>}
        </div>

        {/* Therapists (optional) */}
        {data.therapists?.length > 0 && (
          <div className="rounded-3xl bg-white border-2 border-[#161616] overflow-hidden shadow-[5px_5px_0_#161616]">
            <div className="px-5 py-4 border-b-2 border-[#161616]" style={{ background: soft }}>
              <h2 className="font-bold text-[#161616] text-sm flex items-center gap-2">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ background: accent }}>2</span>
                Pick a Therapist <span className="text-[10px] font-normal text-[#9b9487]">(optional)</span>
              </h2>
            </div>
            <div className="p-4">
              <TherapistPicker therapists={data.therapists} value={form.therapistId}
                onChange={id => setForm(f => ({ ...f, therapistId: id }))} accent={accent} />
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="rounded-3xl bg-white border-2 border-[#161616] overflow-hidden shadow-[5px_5px_0_#161616]">
          <div className="px-5 py-4 border-b-2 border-[#161616]" style={{ background: soft }}>
            <h2 className="font-bold text-[#161616] text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ background: accent }}>{data.therapists?.length > 0 ? 3 : 2}</span>
              Your Details
            </h2>
          </div>
          <div className="p-5 space-y-4">
            {[
              { key: "clientName",  label: "Full Name",         placeholder: "Juan dela Cruz",   type: "text",  required: true  },
              { key: "clientPhone", label: "Phone Number",      placeholder: "+63 917 123 4567", type: "tel",   required: true  },
              { key: "clientEmail", label: "Email (optional)",  placeholder: "juan@email.com",   type: "email", required: false },
            ].map(f => (
              <div key={f.key} className="space-y-1">
                <label className="text-xs font-semibold text-[#56524b]">{f.label}</label>
                <input value={form[f.key as keyof FormState]} onChange={field(f.key as keyof FormState)}
                  placeholder={f.placeholder} type={f.type}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-[#161616] text-sm text-[#161616] placeholder-[#9b9487] outline-none transition focus:shadow-[3px_3px_0_#2f6bff] bg-white" />
              </div>
            ))}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#56524b]">Preferred Date & Time</label>
              <input type="datetime-local" value={form.preferredDate} onChange={field("preferredDate")}
                min={dayjs().format("YYYY-MM-DDTHH:mm")}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-[#161616] text-sm text-[#161616] outline-none transition focus:shadow-[3px_3px_0_#2f6bff] bg-white [color-scheme:light]" />
            </div>
            {selectedService && (
              <div className="flex items-center justify-between px-4 py-3 rounded-xl border"
                style={{ background: `${accent}08`, borderColor: `${accent}25` }}>
                <div>
                  <p className="font-semibold text-[#161616] text-sm">{selectedService.name}</p>
                  <p className="text-xs text-[#9b9487]">{selectedService.durationMinutes} min</p>
                </div>
                <p className="font-bold" style={{ color: accent }}>{sym}{Number(selectedService.price).toLocaleString()}</p>
              </div>
            )}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#56524b]">Notes (optional)</label>
              <textarea value={form.notes} onChange={field("notes")} rows={3}
                placeholder="Health conditions, focus areas (back, shoulders), pressure preference…"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-[#161616] text-sm text-[#161616] placeholder-[#9b9487] outline-none transition focus:shadow-[3px_3px_0_#2f6bff] bg-white resize-none" />
            </div>
          </div>

          {/* Deposit */}
          {data.org.massageDepositEnabled && (
            <div className="mx-5 mb-5 rounded-2xl border p-4 space-y-3" style={{ background: `${accent}06`, borderColor: `${accent}20` }}>
              <p className="font-bold text-sm text-[#161616]">💳 Deposit Required</p>
              {data.org.massageDepositAmount && (
                <p className="text-sm text-[#56524b]">Send <strong style={{ color: accent }}>{sym}{Number(data.org.massageDepositAmount).toLocaleString()}</strong> to confirm your slot.</p>
              )}
              {data.org.massageDepositQrUrl && (
                <div className="flex flex-col items-center gap-2">
                  <img src={data.org.massageDepositQrUrl} alt="QR" className="w-40 h-40 rounded-xl border-2 border-[#161616] bg-white p-1 object-contain" />
                  {data.org.massageDepositNote && <p className="text-xs text-[#9b9487] text-center">{data.org.massageDepositNote}</p>}
                </div>
              )}
              <input value={form.depositReference} onChange={e => setForm(f => ({ ...f, depositReference: e.target.value }))}
                placeholder="Paste your reference number"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-[#161616] text-sm text-[#161616] placeholder-[#9b9487] outline-none bg-white" />
            </div>
          )}

          <div className="px-5 pb-5 space-y-3">
            {error && (
              <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> {error}
              </div>
            )}
            <button type="submit" disabled={submitting}
              className="w-full py-3.5 rounded-2xl text-white font-bold text-sm border-2 border-[#161616] shadow-[3px_3px_0_#161616] transition hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#161616] hover:opacity-95 disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ background: accent }}>
              {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : "Send Booking Request"}
            </button>
            <p className="text-center text-[11px] text-[#9b9487]">Confirmed by {data.org.companyName || "the spa"} after review</p>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── STONE · Slate Minimal ───────────────────────────────────────────────────
// Colors: slate gray — neutral minimal corporate spa feel
// Layout: sidebar two-column on desktop, service radio list, structured form

function StonePage({ data, form, setForm, handleSubmit, submitting, submitted, setSubmitted, error, sym }: PageProps) {
  const field = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))
  const accent = data.org.massageAccentColor || "#475569"
  const selectedService = data.services.find(s => s.id === form.serviceId)

  if (submitted) return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center gap-5 p-6">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: accent }}>
        <CheckCircle2 className="w-8 h-8 text-white" />
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-slate-800">Booking Request Sent</p>
        <p className="text-slate-500 text-sm mt-2 max-w-xs">
          <strong className="text-slate-700">{data.org.companyName}</strong> will contact you to confirm your session.
        </p>
      </div>
      <button onClick={() => { setSubmitted(false); setForm(EMPTY_FORM) }}
        className="px-8 py-3 rounded-xl text-white font-semibold text-sm transition hover:opacity-90 shadow"
        style={{ background: accent }}>
        Make Another Request
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Clean header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-5 py-3 flex items-center gap-3">
          {data.org.logoUrl
            ? <img src={data.org.logoUrl} alt="logo" className="w-8 h-8 rounded-lg object-cover" />
            : <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ background: accent }}>
                <Flower2 className="w-4 h-4" />
              </div>}
          <div className="flex-1">
            <p className="font-bold text-slate-800 text-sm">{data.org.companyName || "Spa"}</p>
            {data.org.massageTagline && <p className="text-xs text-slate-400">{data.org.massageTagline}</p>}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: `${accent}12`, color: accent }}>
            <Zap className="w-3 h-3" /> Online Booking
          </div>
        </div>
      </div>

      {/* Cover */}
      {data.org.massageCoverUrl && (
        <div className="w-full h-40 overflow-hidden relative">
          <img src={data.org.massageCoverUrl} alt="cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-slate-50/80" />
          <div className="absolute inset-0 flex items-end max-w-2xl mx-auto px-5 pb-4">
            <div>
              <p className="font-bold text-white text-xl drop-shadow">{data.org.companyName}</p>
              {data.org.massageTagline && <p className="text-white/80 text-xs">{data.org.massageTagline}</p>}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto px-5 py-6 space-y-5">

        {/* Services */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="flex items-center gap-3 px-5 py-3 border-b border-slate-100">
            <div className="w-6 h-6 rounded-md flex items-center justify-center text-white" style={{ background: accent }}>
              <Flower2 className="w-3.5 h-3.5" />
            </div>
            <h2 className="font-bold text-slate-800 text-sm">Available Services</h2>
          </div>
          {data.services.length === 0
            ? <div className="py-10 text-center text-slate-400 text-sm">No services listed yet.</div>
            : <div className="divide-y divide-slate-100">
                {data.services.map(s => (
                  <label key={s.id} className="flex items-center gap-4 px-5 py-3.5 cursor-pointer hover:bg-slate-50 transition">
                    <input type="radio" name="service" checked={form.serviceId === s.id}
                      onChange={() => setForm(f => ({ ...f, serviceId: s.id }))} className="sr-only" />
                    <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition"
                      style={form.serviceId === s.id ? { borderColor: accent, background: accent } : { borderColor: "#cbd5e1" }}>
                      {form.serviceId === s.id && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    {s.imageUrl && <img src={s.imageUrl} alt={s.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />}
                    <div className="flex-1">
                      <p className="font-semibold text-slate-700 text-sm">{s.name}</p>
                      {s.description && <p className="text-xs text-slate-400 line-clamp-1">{s.description}</p>}
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-sm" style={{ color: accent }}>{sym}{Number(s.price).toLocaleString()}</p>
                      <p className="text-[10px] text-slate-400 flex items-center gap-0.5 justify-end"><Clock className="w-2.5 h-2.5" />{s.durationMinutes}min</p>
                    </div>
                  </label>
                ))}
              </div>}
        </div>

        {/* Therapists (optional) */}
        {data.therapists?.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="flex items-center gap-3 px-5 py-3 border-b border-slate-100">
              <div className="w-6 h-6 rounded-md flex items-center justify-center text-white" style={{ background: accent }}>
                <HandHelping className="w-3.5 h-3.5" />
              </div>
              <h2 className="font-bold text-slate-800 text-sm">Preferred Therapist <span className="text-[10px] font-normal text-slate-400">(optional)</span></h2>
            </div>
            <div className="p-4">
              <TherapistPicker therapists={data.therapists} value={form.therapistId}
                onChange={id => setForm(f => ({ ...f, therapistId: id }))} accent={accent} />
            </div>
          </div>
        )}

        {/* Contact + schedule */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="flex items-center gap-3 px-5 py-3 border-b border-slate-100">
              <div className="w-6 h-6 rounded-md flex items-center justify-center text-white" style={{ background: accent }}>
                <User className="w-3.5 h-3.5" />
              </div>
              <h2 className="font-bold text-slate-800 text-sm">Contact Information</h2>
            </div>
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: "clientName",  label: "Full Name *",          placeholder: "Juan dela Cruz",   type: "text",  span: 2 },
                { key: "clientPhone", label: "Phone *",               placeholder: "+63 917 123 4567", type: "tel",   span: 1 },
                { key: "clientEmail", label: "Email (optional)",      placeholder: "juan@email.com",   type: "email", span: 1 },
              ].map(f => (
                <div key={f.key} className={`space-y-1 ${f.span === 2 ? "sm:col-span-2" : ""}`}>
                  <label className="text-xs font-semibold text-slate-500">{f.label}</label>
                  <input value={form[f.key as keyof FormState]} onChange={field(f.key as keyof FormState)}
                    placeholder={f.placeholder} type={f.type}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-300 outline-none transition bg-slate-50/50"
                    onFocus={e => e.currentTarget.style.borderColor = accent}
                    onBlur={e => e.currentTarget.style.borderColor = "#e2e8f0"} />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="flex items-center gap-3 px-5 py-3 border-b border-slate-100">
              <div className="w-6 h-6 rounded-md flex items-center justify-center text-white" style={{ background: accent }}>
                <Calendar className="w-3.5 h-3.5" />
              </div>
              <h2 className="font-bold text-slate-800 text-sm">Schedule</h2>
            </div>
            <div className="p-5 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">Preferred Date & Time *</label>
                <input type="datetime-local" value={form.preferredDate} onChange={field("preferredDate")}
                  min={dayjs().format("YYYY-MM-DDTHH:mm")}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none transition bg-slate-50/50 [color-scheme:light]"
                  onFocus={e => e.currentTarget.style.borderColor = accent}
                  onBlur={e => e.currentTarget.style.borderColor = "#e2e8f0"} />
              </div>
              {selectedService && (
                <div className="rounded-xl p-3 flex items-center justify-between" style={{ background: `${accent}08`, border: `1px solid ${accent}20` }}>
                  <div>
                    <p className="font-semibold text-slate-700 text-sm">{selectedService.name}</p>
                    <p className="text-xs text-slate-400">{selectedService.durationMinutes} min session</p>
                  </div>
                  <span className="font-bold text-lg" style={{ color: accent }}>{sym}{Number(selectedService.price).toLocaleString()}</span>
                </div>
              )}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">Notes (optional)</label>
                <textarea value={form.notes} onChange={field("notes")} rows={3} placeholder="Health conditions, focus areas, pressure preference…"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-300 outline-none bg-slate-50/50 resize-none" />
              </div>
            </div>
          </div>

          {/* Deposit */}
          {data.org.massageDepositEnabled && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="flex items-center gap-3 px-5 py-3 border-b border-slate-100">
                <div className="w-6 h-6 rounded-md flex items-center justify-center text-white" style={{ background: accent }}>
                  <span className="text-[10px] font-bold">₱</span>
                </div>
                <h2 className="font-bold text-slate-800 text-sm">Deposit</h2>
              </div>
              <div className="p-5 space-y-4">
                {data.org.massageDepositAmount && (
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-sm text-slate-500">Required deposit</span>
                    <span className="font-bold text-lg" style={{ color: accent }}>{sym}{Number(data.org.massageDepositAmount).toLocaleString()}</span>
                  </div>
                )}
                {data.org.massageDepositQrUrl && (
                  <div className="flex flex-col items-center gap-2">
                    <img src={data.org.massageDepositQrUrl} alt="QR" className="w-40 h-40 rounded-xl border border-slate-200 bg-white p-1 object-contain" />
                    {data.org.massageDepositNote && <p className="text-xs text-slate-400 text-center">{data.org.massageDepositNote}</p>}
                  </div>
                )}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500">Reference Number *</label>
                  <input value={form.depositReference} onChange={e => setForm(f => ({ ...f, depositReference: e.target.value }))}
                    placeholder="Transaction reference number"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-300 outline-none bg-slate-50/50" />
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}
          <button type="submit" disabled={submitting}
            className="w-full py-4 rounded-xl text-white font-bold text-sm shadow-md transition hover:opacity-90 hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
            style={{ background: accent }}>
            {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : "Send Booking Request"}
          </button>
          <p className="text-center text-xs text-slate-400 pb-4">Confirmed by {data.org.companyName || "the spa"} after review</p>
        </form>
      </div>
    </div>
  )
}

// ─── BAMBOO · Lime Earth ─────────────────────────────────────────────────────
// Colors: lime / yellow-green — warm cream bg, earthy lime accents
// Layout: card grid for services, single-column form

function BambooPage({ data, form, setForm, handleSubmit, submitting, submitted, setSubmitted, error, sym }: PageProps) {
  const field = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))
  const accent = data.org.massageAccentColor || "#84cc16"
  const warm = "#fefce8"
  const selectedService = data.services.find(s => s.id === form.serviceId)

  if (submitted) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 p-6" style={{ background: warm }}>
      <Leaf className="w-12 h-12" style={{ color: accent }} />
      <div className="text-center space-y-2">
        <p className="text-3xl font-black text-slate-800 uppercase tracking-tight">Done!</p>
        <p className="text-slate-500 text-sm max-w-xs">
          <strong className="text-slate-700">{data.org.companyName}</strong> will reach out to confirm.
        </p>
      </div>
      <button onClick={() => { setSubmitted(false); setForm(EMPTY_FORM) }}
        className="px-8 py-3 text-white font-bold rounded-xl text-sm transition hover:opacity-90"
        style={{ background: accent }}>
        Book Again
      </button>
    </div>
  )

  return (
    <div className="min-h-screen" style={{ background: warm }}>
      {/* Bold hero */}
      <div className="relative overflow-hidden" style={{ background: accent }}>
        {data.org.massageCoverUrl && (
          <img src={data.org.massageCoverUrl} alt="cover" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-30" />
        )}
        <div className="relative max-w-xl mx-auto px-5 py-8">
          <div className="flex items-center gap-3 mb-6">
            {data.org.logoUrl
              ? <img src={data.org.logoUrl} alt="logo" className="w-8 h-8 rounded-lg object-cover border-2 border-white/30" />
              : <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-white" />
                </div>}
            <span className="text-xs font-bold text-white/80 uppercase tracking-widest">{data.org.companyName}</span>
          </div>
          <h1 className="text-4xl font-black text-white uppercase leading-none tracking-tighter">
            {data.org.massageTagline || "Book Your Session"}
          </h1>
          <p className="text-white/70 text-sm mt-3">Pick a service and fill in your details below.</p>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-6 space-y-5">

        {/* Services — card grid */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-800 text-sm">Services</h2>
            <span className="text-xs text-slate-400">{data.services.length} available</span>
          </div>
          {data.services.length === 0
            ? <div className="py-10 text-center text-slate-400 text-sm">No services listed yet.</div>
            : <div className="grid grid-cols-2 gap-3 p-4">
                {data.services.map(s => (
                  <button key={s.id} type="button" onClick={() => setForm(f => ({ ...f, serviceId: s.id }))}
                    className="text-left rounded-xl border-2 overflow-hidden transition"
                    style={form.serviceId === s.id ? { borderColor: accent } : { borderColor: "#f1f5f9" }}>
                    {s.imageUrl
                      ? <img src={s.imageUrl} alt={s.name} className="w-full h-24 object-cover" />
                      : <div className="w-full h-20 flex items-center justify-center" style={{ background: `${accent}10` }}>
                          <Leaf className="w-7 h-7" style={{ color: `${accent}80` }} />
                        </div>}
                    <div className="p-3">
                      <p className="font-bold text-slate-800 text-xs leading-tight">{s.name}</p>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-[10px] text-slate-400 flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" />{s.durationMinutes}m</span>
                        <span className="font-bold text-sm" style={{ color: accent }}>{sym}{Number(s.price).toLocaleString()}</span>
                      </div>
                      {form.serviceId === s.id && (
                        <div className="flex items-center gap-1 text-[10px] font-bold mt-2" style={{ color: accent }}>
                          <CheckCircle2 className="w-3 h-3" /> Selected
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>}
        </div>

        {/* Therapists (optional) */}
        {data.therapists?.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-800 text-sm">Preferred Therapist</h2>
              <span className="text-xs text-slate-400">optional</span>
            </div>
            <div className="p-4">
              <TherapistPicker therapists={data.therapists} value={form.therapistId}
                onChange={id => setForm(f => ({ ...f, therapistId: id }))} accent={accent} />
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-100">
            <h2 className="font-bold text-slate-800 text-sm">Your Details</h2>
          </div>
          <div className="p-5 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 space-y-1">
                <label className="text-xs font-semibold text-slate-500">Full Name *</label>
                <input value={form.clientName} onChange={field("clientName")} placeholder="Juan dela Cruz"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder-slate-300 outline-none bg-slate-50 transition"
                  onFocus={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.background = "white" }}
                  onBlur={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#f8fafc" }} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">Phone *</label>
                <input value={form.clientPhone} onChange={field("clientPhone")} placeholder="+63 917..."
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder-slate-300 outline-none bg-slate-50 transition"
                  onFocus={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.background = "white" }}
                  onBlur={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#f8fafc" }} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">Email</label>
                <input value={form.clientEmail} onChange={field("clientEmail")} placeholder="Optional" type="email"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder-slate-300 outline-none bg-slate-50 transition"
                  onFocus={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.background = "white" }}
                  onBlur={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#f8fafc" }} />
              </div>
              <div className="col-span-2 space-y-1">
                <label className="text-xs font-semibold text-slate-500">Preferred Date & Time *</label>
                <input type="datetime-local" value={form.preferredDate} onChange={field("preferredDate")}
                  min={dayjs().format("YYYY-MM-DDTHH:mm")}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 outline-none bg-slate-50 transition [color-scheme:light]"
                  onFocus={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.background = "white" }}
                  onBlur={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#f8fafc" }} />
              </div>
            </div>

            {selectedService && (
              <div className="flex items-center justify-between px-4 py-3 rounded-xl border-l-4 bg-slate-50"
                style={{ borderLeftColor: accent }}>
                <div>
                  <p className="font-bold text-slate-700 text-sm">{selectedService.name}</p>
                  <p className="text-xs text-slate-400">{selectedService.durationMinutes} min</p>
                </div>
                <p className="font-black text-xl" style={{ color: accent }}>{sym}{Number(selectedService.price).toLocaleString()}</p>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">Notes (optional)</label>
              <textarea value={form.notes} onChange={field("notes")} rows={2}
                placeholder="Health conditions, focus areas…"
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder-slate-300 outline-none bg-slate-50 resize-none" />
            </div>
          </div>

          {/* Deposit */}
          {data.org.massageDepositEnabled && (
            <div className="mx-5 mb-5 rounded-xl border p-4 space-y-3 bg-slate-50" style={{ borderColor: `${accent}30` }}>
              <p className="font-bold text-sm text-slate-700">Deposit Required</p>
              {data.org.massageDepositAmount && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">Amount:</span>
                  <span className="font-bold" style={{ color: accent }}>{sym}{Number(data.org.massageDepositAmount).toLocaleString()}</span>
                </div>
              )}
              {data.org.massageDepositQrUrl && (
                <div className="flex flex-col items-center gap-2">
                  <img src={data.org.massageDepositQrUrl} alt="QR" className="w-40 h-40 rounded-lg bg-white p-1 border border-slate-200 object-contain" />
                  {data.org.massageDepositNote && <p className="text-xs text-slate-400 text-center">{data.org.massageDepositNote}</p>}
                </div>
              )}
              <input value={form.depositReference} onChange={e => setForm(f => ({ ...f, depositReference: e.target.value }))}
                placeholder="Reference number"
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-700 outline-none bg-white" />
            </div>
          )}

          <div className="px-5 pb-5 space-y-3">
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" /> {error}
              </div>
            )}
            <button type="submit" disabled={submitting}
              className="w-full py-3.5 rounded-xl text-white font-bold text-sm transition hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ background: accent }}>
              {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : "Send Booking Request →"}
            </button>
            <p className="text-center text-xs text-slate-400">Confirmed by {data.org.companyName || "the spa"} after review</p>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── IVORY · Cream Luxe ──────────────────────────────────────────────────────
// Colors: amber / cream — warm white bg, amber accents, premium feel
// Layout: magazine two-tone header, service cards with price badge, clean form

function IvoryPage({ data, form, setForm, handleSubmit, submitting, submitted, setSubmitted, error, sym }: PageProps) {
  const field = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))
  const accent = data.org.massageAccentColor || "#d97706"
  const warm = "#fffbf5"
  const selectedService = data.services.find(s => s.id === form.serviceId)

  if (submitted) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 p-6" style={{ background: warm }}>
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" style={{ color: accent }} />)}
      </div>
      <div className="text-center space-y-2">
        <p className="text-2xl font-bold text-slate-800">Request Received</p>
        <p className="text-slate-500 text-sm max-w-xs">
          Thank you! <strong className="text-slate-700">{data.org.companyName}</strong> will confirm your session shortly.
        </p>
      </div>
      <button onClick={() => { setSubmitted(false); setForm(EMPTY_FORM) }}
        className="px-8 py-3 rounded-xl text-white font-bold text-sm transition hover:opacity-90 shadow-md"
        style={{ background: accent }}>
        Book Again
      </button>
    </div>
  )

  return (
    <div className="min-h-screen" style={{ background: warm }}>
      {/* Two-tone header */}
      <div className="sticky top-0 z-10 shadow-sm" style={{ background: accent }}>
        <div className="max-w-xl mx-auto px-5 py-3.5 flex items-center gap-3">
          {data.org.logoUrl
            ? <img src={data.org.logoUrl} alt="logo" className="w-9 h-9 rounded-xl object-cover border-2 border-white/30" />
            : <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <Flower2 className="w-5 h-5 text-white" />
              </div>}
          <div className="flex-1">
            <p className="font-bold text-white text-sm">{data.org.companyName || "Spa"}</p>
            <p className="text-white/70 text-[11px]">{data.org.massageTagline || "Premium Wellness"}</p>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(3)].map((_, i) => <Star key={i} className="w-3 h-3 text-white/60 fill-current" />)}
          </div>
        </div>
      </div>

      {/* Cover */}
      {data.org.massageCoverUrl && (
        <div className="relative w-full h-44 overflow-hidden">
          <img src={data.org.massageCoverUrl} alt="cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${accent}30, ${warm}aa)` }} />
          <div className="absolute bottom-4 left-5">
            <p className="font-bold text-white text-xl drop-shadow">{data.org.companyName}</p>
          </div>
        </div>
      )}

      <div className="max-w-xl mx-auto px-4 py-6 space-y-5">

        {/* Section label */}
        <div className="flex items-center gap-3">
          <div className="h-0.5 w-5 rounded-full" style={{ background: accent }} />
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>Our Services</p>
          <div className="h-0.5 flex-1 rounded-full" style={{ background: `${accent}25` }} />
        </div>

        {/* Services */}
        {data.services.length === 0
          ? <p className="text-slate-400 text-sm">No services available.</p>
          : <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.services.map(s => (
                <button key={s.id} type="button" onClick={() => setForm(f => ({ ...f, serviceId: s.id }))}
                  className="text-left rounded-2xl bg-white border-2 overflow-hidden transition shadow-sm hover:shadow-md"
                  style={form.serviceId === s.id ? { borderColor: accent, boxShadow: `0 4px 16px ${accent}20` } : { borderColor: "#f3ece0" }}>
                  {s.imageUrl && (
                    <div className="relative">
                      <img src={s.imageUrl} alt={s.name} className="w-full h-32 object-cover" />
                      <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold text-white shadow"
                        style={{ background: accent }}>
                        {sym}{Number(s.price).toLocaleString()}
                      </div>
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{s.name}</p>
                        {s.description && <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{s.description}</p>}
                      </div>
                      {!s.imageUrl && <span className="font-bold text-sm shrink-0" style={{ color: accent }}>{sym}{Number(s.price).toLocaleString()}</span>}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-[10px] text-slate-400 flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" />{s.durationMinutes} min</p>
                      {form.serviceId === s.id && (
                        <span className="text-[10px] font-bold flex items-center gap-0.5" style={{ color: accent }}>
                          <CheckCircle2 className="w-3 h-3" /> Selected
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>}

        {/* Therapists (optional) */}
        {data.therapists?.length > 0 && (
          <>
            <div className="flex items-center gap-3 pt-2">
              <div className="h-0.5 w-5 rounded-full" style={{ background: accent }} />
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>Preferred Therapist</p>
              <div className="h-0.5 flex-1 rounded-full" style={{ background: `${accent}25` }} />
              <span className="text-[10px] text-slate-400">optional</span>
            </div>
            <TherapistPicker therapists={data.therapists} value={form.therapistId}
              onChange={id => setForm(f => ({ ...f, therapistId: id }))} accent={accent} />
          </>
        )}

        {/* Section label */}
        <div className="flex items-center gap-3 pt-2">
          <div className="h-0.5 w-5 rounded-full" style={{ background: accent }} />
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>Your Details</p>
          <div className="h-0.5 flex-1 rounded-full" style={{ background: `${accent}25` }} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border-2 shadow-sm overflow-hidden" style={{ borderColor: "#f3ece0" }}>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: "clientName",  label: "Full Name *",         placeholder: "Juan dela Cruz",   type: "text",  col: 2 },
                { key: "clientPhone", label: "Phone *",              placeholder: "+63 917 123 4567", type: "tel",   col: 1 },
                { key: "clientEmail", label: "Email (optional)",     placeholder: "juan@email.com",   type: "email", col: 1 },
              ].map(f => (
                <div key={f.key} className={`space-y-1 ${f.col === 2 ? "sm:col-span-2" : ""}`}>
                  <label className="text-xs font-semibold text-slate-500">{f.label}</label>
                  <input value={form[f.key as keyof FormState]} onChange={field(f.key as keyof FormState)}
                    placeholder={f.placeholder} type={f.type}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-300 outline-none transition"
                    style={{ background: warm }}
                    onFocus={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.background = "white" }}
                    onBlur={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = warm }} />
                </div>
              ))}
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-500">Preferred Date & Time *</label>
                <input type="datetime-local" value={form.preferredDate} onChange={field("preferredDate")}
                  min={dayjs().format("YYYY-MM-DDTHH:mm")}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none transition [color-scheme:light]"
                  style={{ background: warm }}
                  onFocus={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.background = "white" }}
                  onBlur={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = warm }} />
              </div>
            </div>

            {selectedService && (
              <div className="flex items-center justify-between px-4 py-3 rounded-xl border-l-4"
                style={{ background: `${accent}08`, borderLeftColor: accent, borderTop: `1px solid ${accent}15`, borderRight: `1px solid ${accent}15`, borderBottom: `1px solid ${accent}15` }}>
                <div>
                  <p className="font-bold text-slate-800">{selectedService.name}</p>
                  <p className="text-xs text-slate-400">{selectedService.durationMinutes} min</p>
                </div>
                <p className="font-black text-xl" style={{ color: accent }}>{sym}{Number(selectedService.price).toLocaleString()}</p>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">Notes (optional)</label>
              <textarea value={form.notes} onChange={field("notes")} rows={3} placeholder="Health conditions, focus areas, pressure preference…"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-300 outline-none resize-none"
                style={{ background: warm }} />
            </div>
          </div>

          {/* Deposit */}
          {data.org.massageDepositEnabled && (
            <div className="mx-5 mb-5 rounded-2xl p-4 space-y-3 border" style={{ background: `${accent}06`, borderColor: `${accent}20` }}>
              <p className="font-bold text-sm text-slate-700">Deposit Required ✦</p>
              {data.org.massageDepositAmount && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">Amount:</span>
                  <span className="font-bold" style={{ color: accent }}>{sym}{Number(data.org.massageDepositAmount).toLocaleString()}</span>
                </div>
              )}
              {data.org.massageDepositQrUrl && (
                <div className="flex flex-col items-center gap-2">
                  <img src={data.org.massageDepositQrUrl} alt="QR" className="w-40 h-40 rounded-xl border border-slate-200 bg-white p-1 object-contain" />
                  {data.org.massageDepositNote && <p className="text-xs text-slate-400 text-center">{data.org.massageDepositNote}</p>}
                </div>
              )}
              <input value={form.depositReference} onChange={e => setForm(f => ({ ...f, depositReference: e.target.value }))}
                placeholder="Reference number"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 placeholder-slate-300 outline-none bg-white" />
            </div>
          )}

          <div className="px-5 pb-5 space-y-3">
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" /> {error}
              </div>
            )}
            <button type="submit" disabled={submitting}
              className="w-full py-4 rounded-2xl text-white font-bold text-sm shadow-md transition hover:opacity-90 hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ background: accent }}>
              {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : <><Star className="w-4 h-4" /> Send Booking Request</>}
            </button>
            <p className="text-center text-xs text-slate-400">Confirmed by {data.org.companyName || "the spa"} after review</p>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── CHARCOAL · Dark Sophisticated ───────────────────────────────────────────
// Colors: deep charcoal bg with emerald accent — moody, sophisticated, premium
// Layout: dark theme, glowing emerald accents, refined typography

function CharcoalPage({ data, form, setForm, handleSubmit, submitting, submitted, setSubmitted, error, sym }: PageProps) {
  const field = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))
  const accent = data.org.massageAccentColor || "#34d399"
  const bg = "#0a0a0a"
  const card = "#171717"
  const selectedService = data.services.find(s => s.id === form.serviceId)

  const inp = "w-full px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none border-b border-slate-800 bg-transparent transition focus:border-current"

  if (submitted) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6" style={{ background: bg }}>
      <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: `${accent}20`, boxShadow: `0 0 40px ${accent}40` }}>
        <Sparkles className="w-8 h-8" style={{ color: accent }} />
      </div>
      <div className="text-center space-y-2">
        <p className="text-2xl font-light tracking-widest uppercase text-slate-100">Request Sent</p>
        <p className="text-slate-500 text-sm max-w-xs">
          <em>{data.org.companyName}</em> will contact you shortly to confirm.
        </p>
      </div>
      <button onClick={() => { setSubmitted(false); setForm(EMPTY_FORM) }}
        className="px-8 py-3 text-sm font-medium border transition"
        style={{ borderColor: accent, color: accent }}
        onMouseEnter={e => { e.currentTarget.style.background = accent; e.currentTarget.style.color = bg }}
        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = accent }}>
        Book Again
      </button>
    </div>
  )

  return (
    <div className="min-h-screen" style={{ background: bg }}>
      {/* Elegant header */}
      <div className="border-b sticky top-0 z-10" style={{ background: bg, borderColor: "#1f1f1f" }}>
        <div className="max-w-lg mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {data.org.logoUrl
              ? <img src={data.org.logoUrl} alt="logo" className="w-8 h-8 rounded object-cover" />
              : <Flower2 className="w-5 h-5" style={{ color: accent }} />}
            <div>
              <p className="text-sm font-medium tracking-wide text-slate-100">{data.org.companyName || "Spa"}</p>
              {data.org.massageTagline && <p className="text-[10px] text-slate-500 tracking-wider">{data.org.massageTagline}</p>}
            </div>
          </div>
          <p className="text-[9px] uppercase tracking-[0.3em]" style={{ color: accent }}>Appointments</p>
        </div>
      </div>

      {/* Cover */}
      {data.org.massageCoverUrl && (
        <div className="relative w-full h-40 overflow-hidden">
          <img src={data.org.massageCoverUrl} alt="cover" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent, ${bg})` }} />
          <div className="absolute bottom-4 left-6">
            <p className="font-light tracking-[0.2em] uppercase text-lg text-slate-100">{data.org.companyName}</p>
          </div>
        </div>
      )}

      <div className="max-w-lg mx-auto px-6 py-8 space-y-8">

        {/* Services */}
        <div>
          <div className="flex items-center gap-4 mb-5">
            <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500">Services</p>
            <div className="flex-1 h-px bg-slate-800" />
          </div>
          {data.services.length === 0
            ? <p className="text-slate-500 text-sm italic">No services available.</p>
            : <div className="space-y-2">
                {data.services.map(s => (
                  <button key={s.id} type="button" onClick={() => setForm(f => ({ ...f, serviceId: s.id }))}
                    className="w-full text-left flex items-center gap-4 p-4 rounded-xl border transition"
                    style={form.serviceId === s.id
                      ? { borderColor: accent, borderLeftWidth: 4, paddingLeft: "12px", background: card, boxShadow: `0 0 20px ${accent}15` }
                      : { borderColor: "#262626", background: card }}>
                    {s.imageUrl && <img src={s.imageUrl} alt={s.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />}
                    <div className="flex-1">
                      <p className="font-medium text-slate-100">{s.name}</p>
                      {s.description && <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{s.description}</p>}
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1"><Clock className="w-3 h-3" />{s.durationMinutes} min</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-medium text-base" style={{ color: form.serviceId === s.id ? accent : "#94a3b8" }}>
                        {sym}{Number(s.price).toLocaleString()}
                      </p>
                      {form.serviceId === s.id && <CheckCircle2 className="w-4 h-4 ml-auto mt-1" style={{ color: accent }} />}
                    </div>
                  </button>
                ))}
              </div>}
        </div>

        {/* Therapists (optional) */}
        {data.therapists?.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-5">
              <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500">Preferred Therapist</p>
              <div className="flex-1 h-px bg-slate-800" />
              <span className="text-[9px] uppercase tracking-widest text-slate-600">optional</span>
            </div>
            <TherapistPicker therapists={data.therapists} value={form.therapistId}
              onChange={id => setForm(f => ({ ...f, therapistId: id }))} accent={accent} variant="dark" />
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500">Your Details</p>
              <div className="flex-1 h-px bg-slate-800" />
            </div>
            <div className="rounded-xl border p-5 space-y-0" style={{ borderColor: "#262626", background: card }}>
              {[
                { key: "clientName",  label: "Full Name *",  placeholder: "Juan dela Cruz",   type: "text"  },
                { key: "clientPhone", label: "Phone *",       placeholder: "+63 917 123 4567", type: "tel"   },
                { key: "clientEmail", label: "Email",         placeholder: "Optional",          type: "email" },
              ].map((f, i) => (
                <div key={f.key} className={i > 0 ? "border-t border-slate-800" : ""}>
                  <label className="block text-[10px] uppercase tracking-[0.25em] text-slate-500 pt-3">{f.label}</label>
                  <input value={form[f.key as keyof FormState]} onChange={field(f.key as keyof FormState)}
                    placeholder={f.placeholder} type={f.type} className={inp}
                    style={{ color: "#e2e8f0" }} />
                </div>
              ))}
              <div className="border-t border-slate-800">
                <label className="block text-[10px] uppercase tracking-[0.25em] text-slate-500 pt-3">Date & Time *</label>
                <input type="datetime-local" value={form.preferredDate} onChange={field("preferredDate")}
                  min={dayjs().format("YYYY-MM-DDTHH:mm")} className={inp} style={{ colorScheme: "dark" } as any} />
              </div>
              <div className="border-t border-slate-800">
                <label className="block text-[10px] uppercase tracking-[0.25em] text-slate-500 pt-3">Notes</label>
                <textarea value={form.notes} onChange={field("notes")} rows={3} placeholder="Health conditions, focus areas…"
                  className={`${inp} resize-none`} />
              </div>
            </div>
          </div>

          {selectedService && (
            <div className="rounded-xl overflow-hidden border" style={{ borderColor: `${accent}40` }}>
              <div className="px-5 py-3 flex items-center justify-between" style={{ background: `${accent}10` }}>
                <div>
                  <p className="font-medium text-slate-100">{selectedService.name}</p>
                  <p className="text-xs text-slate-500">{selectedService.durationMinutes} min</p>
                </div>
                <p className="text-xl font-light" style={{ color: accent }}>{sym}{Number(selectedService.price).toLocaleString()}</p>
              </div>
            </div>
          )}

          {/* Deposit */}
          {data.org.massageDepositEnabled && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500">Deposit</p>
                <div className="flex-1 h-px bg-slate-800" />
              </div>
              <div className="rounded-xl border p-5 space-y-4" style={{ borderColor: "#262626", background: card }}>
                {data.org.massageDepositAmount && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Amount to pay</span>
                    <span className="font-medium text-lg" style={{ color: accent }}>{sym}{Number(data.org.massageDepositAmount).toLocaleString()}</span>
                  </div>
                )}
                {data.org.massageDepositQrUrl && (
                  <div className="flex flex-col items-center gap-2">
                    <img src={data.org.massageDepositQrUrl} alt="QR" className="w-40 h-40 rounded-lg border border-slate-800 bg-white p-1 object-contain" />
                    {data.org.massageDepositNote && <p className="text-xs text-slate-500 text-center">{data.org.massageDepositNote}</p>}
                  </div>
                )}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.25em] text-slate-500 mb-2">Reference Number *</label>
                  <input value={form.depositReference} onChange={e => setForm(f => ({ ...f, depositReference: e.target.value }))}
                    placeholder="Transaction reference"
                    className="w-full px-4 py-2.5 rounded-lg border text-sm text-slate-200 placeholder-slate-600 outline-none"
                    style={{ borderColor: "#262626", background: bg }} />
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl border text-sm" style={{ background: "#3f1010", borderColor: "#7f1d1d", color: "#fca5a5" }}>
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}

          <button type="submit" disabled={submitting}
            className="w-full py-4 rounded-xl font-medium tracking-wide text-sm transition disabled:opacity-50 flex items-center justify-center gap-2 hover:opacity-90"
            style={{ background: accent, color: bg, boxShadow: `0 0 30px ${accent}40` }}>
            {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : "Send Booking Request"}
          </button>
          <p className="text-center text-xs text-slate-500 pb-4">Confirmed by {data.org.companyName || "the spa"} after review</p>
        </form>
      </div>
    </div>
  )
}

// ─── Main dispatcher ──────────────────────────────────────────────────────────

export default function MassagePageContent({ slug }: { slug: string }) {
  const [data, setData]             = useState<{ org: any; services: any[]; therapists: any[] } | null>(null)
  const [loading, setLoading]       = useState(true)
  const [notFound, setNotFound]     = useState(false)
  const [form, setForm]             = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted]   = useState(false)
  const [error, setError]           = useState("")

  useEffect(() => {
    fetch(`${API}/api/massage/public/${slug}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(setData)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  const sym = data?.org?.currencySymbol || "₱"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    const missing: string[] = []
    if (!form.serviceId)     missing.push("a service")
    if (!form.clientName)    missing.push("your name")
    if (!form.clientPhone)   missing.push("your phone number")
    if (!form.preferredDate) missing.push("preferred date & time")
    if (data?.org?.massageDepositEnabled && !form.depositReference) missing.push("deposit reference number")
    if (missing.length > 0) {
      setError(`Please provide: ${missing.join(", ")}.`); return
    }
    setSubmitting(true)
    try {
      const res = await fetch(`${API}/api/massage/public/${slug}/inquire`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId:        form.serviceId,
          therapistId:      form.therapistId || undefined,
          clientName:       form.clientName,
          clientPhone:      form.clientPhone,
          clientEmail:      form.clientEmail || undefined,
          preferredDate:    form.preferredDate,
          notes:            form.notes || undefined,
          depositReference: form.depositReference || undefined,
        }),
      })
      if (!res.ok) { const err = await res.json(); throw new Error(err.message || "Failed") }
      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
    </div>
  )

  if (notFound || !data) return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4 p-6">
      <Flower2 className="w-12 h-12 text-slate-300" />
      <p className="text-xl font-bold text-slate-600">Page not found</p>
      <p className="text-slate-400 text-sm text-center">This booking page doesn't exist or may have been removed.</p>
    </div>
  )

  const props: PageProps = { data, form, setForm, handleSubmit, submitting, submitted, setSubmitted, error, sym }
  const theme = data.org?.massageTheme || "zen"

  if (theme === "stone")    return <StonePage    {...props} />
  if (theme === "bamboo")   return <BambooPage   {...props} />
  if (theme === "ivory")    return <IvoryPage    {...props} />
  if (theme === "charcoal") return <CharcoalPage {...props} />
  return <ZenPage {...props} />
}
