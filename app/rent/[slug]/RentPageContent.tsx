"use client"

import { useEffect, useState } from "react"
import { Car, Calendar, User, Phone, Mail, FileText, CheckCircle2, Loader2, AlertCircle, ArrowRight } from "lucide-react"
import dayjs from "dayjs"

const API = process.env.NEXT_PUBLIC_API_URL || ""

const EMPTY_FORM = {
  vehicleId: "",
  customerName: "",
  customerPhone: "",
  customerEmail: "",
  pickupDate: "",
  returnDate: "",
  notes: "",
  depositReference: "",
}

type FormState = typeof EMPTY_FORM

interface PageProps {
  data: { org: any; vehicles: any[] }
  form: FormState
  setForm: React.Dispatch<React.SetStateAction<FormState>>
  handleSubmit: (e: React.FormEvent) => void
  submitting: boolean
  submitted: boolean
  setSubmitted: (v: boolean) => void
  error: string
  days: number
  total: number
  sym: string
}

// ─── Midnight ─────────────────────────────────────────────────────────────────

function MidnightPage({ data, form, setForm, handleSubmit, submitting, submitted, setSubmitted, error, days, total, sym }: PageProps) {
  const field = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))
  const selectedVehicle = data.vehicles.find(v => v.id === form.vehicleId)

  const accent = data.org.carRentalAccentColor || "#ff9e2c"
  const accentLight = `${accent}1a` // 10% opacity for bg tints

  // Layered Pop input: white field, 2px ink border, blue hard-shadow on focus.
  const inputCls = "px-4 py-2.5 rounded-xl bg-white border-2 border-[#161616] text-sm text-[#1c1a17] placeholder-[#9b9487] outline-none transition"
  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => { e.currentTarget.style.boxShadow = "3px 3px 0 #2f6bff" }
  const onBlur  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => { e.currentTarget.style.boxShadow = "none" }

  if (submitted) return (
    <div className="min-h-screen bg-[#fbf7f0] flex flex-col items-center justify-center gap-4 text-[#1c1a17] p-6">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-[#e2f6ee] border-2 border-[#161616] shadow-[5px_5px_0_#161616]">
        <CheckCircle2 className="w-8 h-8 text-[#0d9f6e]" />
      </div>
      <p className="text-2xl font-extrabold tracking-tight">Request Sent!</p>
      <p className="text-[#56524b] text-sm text-center max-w-sm">
        Your booking request has been sent to <strong className="text-[#161616]">{data.org.companyName}</strong>. They will contact you shortly.
      </p>
      <button onClick={() => { setSubmitted(false); setForm(EMPTY_FORM) }}
        className="mt-4 px-6 py-2.5 rounded-full bg-[#161616] text-[#fbf7f0] border-2 border-[#161616] text-sm font-bold shadow-[3px_3px_0_#161616] transition hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#161616] active:translate-y-0 active:shadow-none">
        Make another request
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#fbf7f0] text-[#1c1a17]">

      {/* Sticky navbar */}
      <div className="border-b-2 border-[#161616] bg-white sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          {data.org.logoUrl
            ? <img src={data.org.logoUrl} alt="logo" className="w-9 h-9 rounded-xl object-cover border-2 border-[#161616]" />
            : <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#fff1da] border-2 border-[#161616]">
                <Car className="w-5 h-5 text-[#c2740a]" />
              </div>}
          <div>
            <p className="font-extrabold text-sm text-[#161616]">{data.org.companyName || "Car Rental"}</p>
            {data.org.carRentalTagline
              ? <p className="text-[11px] text-[#9b9487]">{data.org.carRentalTagline}</p>
              : <p className="text-[11px] text-[#9b9487]">Online Booking</p>}
          </div>
        </div>
      </div>

      {/* Cover photo hero */}
      {data.org.carRentalCoverUrl && (
        <div className="w-full h-44 sm:h-56 relative overflow-hidden border-b-2 border-[#161616]">
          <img src={data.org.carRentalCoverUrl} alt="cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/60" />
          <div className="absolute bottom-0 left-0 right-0 max-w-3xl mx-auto px-4 pb-4">
            <p className="text-2xl font-extrabold tracking-tight text-white drop-shadow">{data.org.companyName || "Car Rental"}</p>
            {data.org.carRentalTagline && (
              <p className="text-sm text-white/80 mt-0.5">{data.org.carRentalTagline}</p>
            )}
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <div>
          <h2 className="text-lg font-extrabold tracking-tight text-[#161616] mb-4">Available Vehicles</h2>
          {data.vehicles.length === 0
            ? <p className="text-[#9b9487] text-sm">No vehicles available.</p>
            : <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.vehicles.map(v => (
                  <button key={v.id} type="button" onClick={() => setForm(f => ({ ...f, vehicleId: v.id }))}
                    style={form.vehicleId === v.id ? { boxShadow: `5px 5px 0 ${accent}` } : undefined}
                    className={`text-left rounded-2xl border-2 border-[#161616] bg-white overflow-hidden transition-all ${form.vehicleId === v.id ? "-translate-y-0.5" : "shadow-[3px_3px_0_#161616] hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#161616]"}`}>
                    {v.imageUrl
                      ? <img src={v.imageUrl} alt={`${v.make} ${v.model}`} className="w-full h-36 object-cover border-b-2 border-[#161616]" />
                      : <div className="w-full h-24 bg-[#f7f2e9] border-b-2 border-[#161616] flex items-center justify-center"><span className="text-4xl opacity-40">🚗</span></div>}
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-bold text-sm text-[#161616]">{v.make} {v.model} {v.year ? `· ${v.year}` : ""}</p>
                          <p className="text-xs text-[#9b9487] mt-0.5">{v.plateNumber}{v.color ? ` · ${v.color}` : ""}</p>
                        </div>
                        <p className="font-extrabold text-sm shrink-0 tabular-nums" style={{ color: accent }}>{sym}{Number(v.dailyRate).toLocaleString()}<span className="text-xs text-[#9b9487] font-normal">/day</span></p>
                      </div>
                      {form.vehicleId === v.id && (
                        <div className="mt-2 inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full border-2 border-[#161616] bg-[#eaf0ff] text-[#2f6bff]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Selected
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="text-lg font-extrabold tracking-tight text-[#161616]">Your Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-[#56524b] font-bold flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Full Name *</label>
              <input value={form.customerName} onChange={field("customerName")} placeholder="Juan dela Cruz" className={inputCls} onFocus={onFocus} onBlur={onBlur} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-[#56524b] font-bold flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Phone *</label>
              <input value={form.customerPhone} onChange={field("customerPhone")} placeholder="+63 917 123 4567" className={inputCls} onFocus={onFocus} onBlur={onBlur} />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs text-[#56524b] font-bold flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Email <span className="text-[#9b9487] font-normal">(optional)</span></label>
              <input value={form.customerEmail} onChange={field("customerEmail")} placeholder="juan@email.com" type="email" className={inputCls} onFocus={onFocus} onBlur={onBlur} />
            </div>
          </div>
          <h2 className="text-lg font-extrabold tracking-tight text-[#161616] pt-2">Rental Dates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-[#56524b] font-bold flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Pickup Date *</label>
              <input type="date" value={form.pickupDate} onChange={field("pickupDate")} min={dayjs().format("YYYY-MM-DD")} className={inputCls} onFocus={onFocus} onBlur={onBlur} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-[#56524b] font-bold flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Return Date *</label>
              <input type="date" value={form.returnDate} onChange={field("returnDate")} min={form.pickupDate || dayjs().format("YYYY-MM-DD")} className={inputCls} onFocus={onFocus} onBlur={onBlur} />
            </div>
          </div>
          {total > 0 && (
            <div className="flex items-center justify-between px-4 py-3 rounded-xl border-2 border-[#161616] bg-[#f7f2e9]">
              <span className="text-sm text-[#56524b]">{days} day{days !== 1 ? "s" : ""} × {sym}{Number(selectedVehicle?.dailyRate).toLocaleString()}/day</span>
              <span className="text-lg font-extrabold tabular-nums" style={{ color: accent }}>{sym}{total.toLocaleString()}</span>
            </div>
          )}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-[#56524b] font-bold flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> Notes <span className="text-[#9b9487] font-normal">(optional)</span></label>
            <textarea value={form.notes} onChange={field("notes")} rows={3} placeholder="Any special requests…" className={`${inputCls} resize-none`} onFocus={onFocus} onBlur={onBlur} />
          </div>
          {/* Deposit QR section */}
          {data.org.carRentalDepositEnabled && (
            <div className="rounded-2xl border-2 border-[#161616] bg-white shadow-[5px_5px_0_#161616] p-5 space-y-4">
              <div className="flex items-center gap-2">
                <p className="font-extrabold text-sm text-[#161616]">Deposit Required</p>
              </div>

              {data.org.carRentalDepositAmount && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#fff1da] border-2 border-[#161616]">
                  <span className="text-sm text-[#56524b]">Amount to deposit:</span>
                  <span className="font-extrabold text-lg tabular-nums" style={{ color: accent }}>{sym}{Number(data.org.carRentalDepositAmount).toLocaleString()}</span>
                </div>
              )}

              {data.org.carRentalDepositQrUrl && (
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs text-[#56524b]">Scan to pay</p>
                  <img
                    src={data.org.carRentalDepositQrUrl}
                    alt="Deposit QR"
                    className="w-44 h-44 rounded-xl bg-white border-2 border-[#161616] p-2 object-contain"
                  />
                  {data.org.carRentalDepositNote && (
                    <p className="text-xs text-[#56524b] text-center">{data.org.carRentalDepositNote}</p>
                  )}
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-[#56524b] font-bold">Reference Number *</label>
                <input
                  value={form.depositReference}
                  onChange={e => setForm(f => ({ ...f, depositReference: e.target.value }))}
                  placeholder="Enter your transaction reference number"
                  className={inputCls}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
                <p className="text-[11px] text-[#9b9487]">Enter the reference/transaction number from your payment app after scanning.</p>
              </div>
            </div>
          )}

          {error && <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#fde6ec] border-2 border-[#161616] text-[#e11d48] text-sm font-medium"><AlertCircle className="w-4 h-4 shrink-0" /> {error}</div>}
          <button type="submit" disabled={submitting}
            className="w-full py-3.5 rounded-full bg-[#161616] text-[#fbf7f0] border-2 border-[#161616] font-bold text-sm shadow-[3px_3px_0_#161616] transition disabled:opacity-60 flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#161616] active:translate-y-0 active:shadow-none">
            {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : "Send Booking Request"}
          </button>
          <p className="text-center text-xs text-[#9b9487]">Booking request only, confirmed by {data.org.companyName || "the business"} after review.</p>
        </form>
      </div>
    </div>
  )
}

// ─── Clean (Light) ────────────────────────────────────────────────────────────

function CleanPage({ data, form, setForm, handleSubmit, submitting, submitted, setSubmitted, error, days, total, sym }: PageProps) {
  const field = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))
  const selectedVehicle = data.vehicles.find(v => v.id === form.vehicleId)

  const accent = data.org.carRentalAccentColor || "#f97316"
  const accentLight = `${accent}15`

  const inputCls = "w-full px-0 py-2 border-b-2 border-slate-200 bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none transition"

  if (submitted) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 p-6">
      <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: accentLight }}>
        <CheckCircle2 className="w-8 h-8" style={{ color: accent }} />
      </div>
      <p className="text-2xl font-bold text-slate-900">Request Sent!</p>
      <p className="text-slate-500 text-sm text-center max-w-sm">
        Your booking request has been sent to <strong className="text-slate-900">{data.org.companyName}</strong>. They will contact you shortly.
      </p>
      <button onClick={() => { setSubmitted(false); setForm(EMPTY_FORM) }}
        style={{ background: accent }}
        className="mt-4 px-8 py-3 rounded-full text-white text-sm font-semibold transition hover:opacity-90 flex items-center gap-2">
        <ArrowRight className="w-4 h-4" /> Make another request
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {data.org.logoUrl
              ? <img src={data.org.logoUrl} alt="logo" className="w-8 h-8 rounded-lg object-cover" />
              : <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: accentLight }}><Car className="w-4 h-4" style={{ color: accent }} /></div>}
            <div>
              <p className="font-bold text-slate-900">{data.org.companyName || "Car Rental"}</p>
              {data.org.carRentalTagline && <p className="text-xs text-slate-400">{data.org.carRentalTagline}</p>}
            </div>
          </div>
          <span className="text-xs font-medium px-3 py-1.5 rounded-full" style={{ color: accent, background: accentLight }}>Online Booking</span>
        </div>
      </div>

      {/* Cover photo */}
      {data.org.carRentalCoverUrl && (
        <div className="w-full h-44 sm:h-56 relative overflow-hidden">
          <img src={data.org.carRentalCoverUrl} alt="cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/90" />
          <div className="absolute bottom-0 left-0 right-0 max-w-3xl mx-auto px-6 pb-4">
            <p className="text-xl font-bold text-slate-900 drop-shadow-sm">{data.org.companyName || "Car Rental"}</p>
            {data.org.carRentalTagline && <p className="text-sm text-slate-600 mt-0.5">{data.org.carRentalTagline}</p>}
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-10">
        {/* Vehicles */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-5 rounded-full" style={{ background: accent }} />
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide">Available Vehicles</h2>
          </div>
          {data.vehicles.length === 0
            ? <p className="text-slate-400 text-sm">No vehicles available.</p>
            : <div className="space-y-3">
                {data.vehicles.map(v => (
                  <button key={v.id} type="button" onClick={() => setForm(f => ({ ...f, vehicleId: v.id }))}
                    className="w-full text-left rounded-2xl border-2 bg-white transition overflow-hidden"
                    style={form.vehicleId === v.id ? { borderColor: accent } : { borderColor: "#e2e8f0" }}>
                    {v.imageUrl
                      ? <img src={v.imageUrl} alt={`${v.make} ${v.model}`} className="w-full h-44 object-contain bg-slate-50 p-2" />
                      : <div className="w-full h-24 bg-slate-50 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: form.vehicleId === v.id ? accent : "#f1f5f9" }}>
                            <Car className={`w-5 h-5 ${form.vehicleId === v.id ? "text-white" : "text-slate-400"}`} />
                          </div>
                        </div>}
                    <div className="flex items-center gap-4 px-5 py-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900">{v.make} {v.model} {v.year ? `· ${v.year}` : ""}</p>
                        <p className="text-xs text-slate-400 truncate">{v.plateNumber}{v.color ? ` · ${v.color}` : ""}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-slate-900">{sym}{Number(v.dailyRate).toLocaleString()}</p>
                        <p className="text-xs text-slate-400">per day</p>
                      </div>
                      {form.vehicleId === v.id && <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: accent }} />}
                    </div>
                  </button>
                ))}
              </div>}
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-5 rounded-full" style={{ background: accent }} />
                <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide">Your Details</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Full Name *</label>
                  <input value={form.customerName} onChange={field("customerName")} placeholder="Juan dela Cruz" className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Phone Number *</label>
                  <input value={form.customerPhone} onChange={field("customerPhone")} placeholder="+63 917 123 4567" className={inputCls} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Email <span className="font-normal text-slate-400">(optional)</span></label>
                  <input value={form.customerEmail} onChange={field("customerEmail")} placeholder="juan@email.com" type="email" className={inputCls} />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-5 rounded-full" style={{ background: accent }} />
                <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide">Rental Dates</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Pickup Date *</label>
                  <input type="date" value={form.pickupDate} onChange={field("pickupDate")} min={dayjs().format("YYYY-MM-DD")} className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Return Date *</label>
                  <input type="date" value={form.returnDate} onChange={field("returnDate")} min={form.pickupDate || dayjs().format("YYYY-MM-DD")} className={inputCls} />
                </div>
              </div>
            </div>

            {total > 0 && (
              <div className="flex items-center justify-between py-4 border-t border-b border-slate-100">
                <span className="text-sm text-slate-500">{days} day{days !== 1 ? "s" : ""} × {sym}{Number(selectedVehicle?.dailyRate).toLocaleString()}/day</span>
                <span className="text-xl font-bold" style={{ color: accent }}>{sym}{total.toLocaleString()}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Notes <span className="font-normal text-slate-400">(optional)</span></label>
              <textarea value={form.notes} onChange={field("notes")} rows={3} placeholder="Any special requests…"
                className="w-full px-0 py-2 border-b-2 border-slate-200 bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none transition resize-none" />
            </div>

            {/* Deposit QR */}
            {data.org.carRentalDepositEnabled && (
              <div className="rounded-2xl p-5 space-y-4 border" style={{ background: accentLight, borderColor: `${accent}33` }}>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm text-slate-900">Deposit Required</p>
                </div>
                {data.org.carRentalDepositAmount && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200">
                    <span className="text-sm text-slate-500">Amount to deposit:</span>
                    <span className="font-bold text-lg" style={{ color: accent }}>{sym}{Number(data.org.carRentalDepositAmount).toLocaleString()}</span>
                  </div>
                )}
                {data.org.carRentalDepositQrUrl && (
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-xs text-slate-400">Scan to pay</p>
                    <img src={data.org.carRentalDepositQrUrl} alt="Deposit QR" className="w-44 h-44 rounded-xl border border-slate-200 p-2 object-contain bg-white" />
                    {data.org.carRentalDepositNote && <p className="text-xs text-slate-500 text-center">{data.org.carRentalDepositNote}</p>}
                  </div>
                )}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-500">Reference Number *</label>
                  <input value={form.depositReference} onChange={e => setForm(f => ({ ...f, depositReference: e.target.value }))}
                    placeholder="Enter your transaction reference number" className={inputCls} />
                  <p className="text-[11px] text-slate-400">Enter the reference number from your payment app after scanning.</p>
                </div>
              </div>
            )}

            {error && <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm"><AlertCircle className="w-4 h-4 shrink-0" /> {error}</div>}

            <button type="submit" disabled={submitting}
              style={{ background: accent }}
              className="w-full py-3.5 rounded-full text-white font-bold text-sm transition disabled:opacity-60 hover:opacity-90 flex items-center justify-center gap-2">
              {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : <><span>Send Booking Request</span><ArrowRight className="w-4 h-4" /></>}
            </button>
            <p className="text-center text-xs text-slate-400">Booking request only, confirmed by {data.org.companyName || "the business"} after review.</p>
          </form>
        </div>
      </div>
    </div>
  )
}

// ─── Ocean (Glassmorphism) ────────────────────────────────────────────────────

function OceanPage({ data, form, setForm, handleSubmit, submitting, submitted, setSubmitted, error, days, total, sym }: PageProps) {
  const field = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))
  const selectedVehicle = data.vehicles.find(v => v.id === form.vehicleId)

  const accent = data.org.carRentalAccentColor || "#22d3ee"
  const accentLight = `${accent}1a`
  const accentMid   = `${accent}33`

  const glassInput = "w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-white placeholder-white/30 outline-none transition [color-scheme:dark]"

  if (submitted) return (
    <div className="min-h-screen bg-[#020b18] flex flex-col items-center justify-center gap-4 text-white p-6">
      <div className="w-20 h-20 rounded-full border flex items-center justify-center backdrop-blur-sm" style={{ background: accentLight, borderColor: accentMid }}>
        <CheckCircle2 className="w-9 h-9" style={{ color: accent }} />
      </div>
      <p className="text-2xl font-bold">Request Sent!</p>
      <p className="text-white/50 text-sm text-center max-w-sm">
        Your booking request has been sent to <strong className="text-white">{data.org.companyName}</strong>.
      </p>
      <button onClick={() => { setSubmitted(false); setForm(EMPTY_FORM) }}
        style={{ background: accent }}
        className="mt-4 px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition hover:opacity-90">
        Make another request
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#020b18] text-white" style={{ background: "radial-gradient(ellipse at 20% 0%, #0a1f35 0%, #020b18 60%)" }}>
      {/* Header */}
      <div className="border-b border-white/10 backdrop-blur-md sticky top-0 z-10" style={{ background: "rgba(2,11,24,0.7)" }}>
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          {data.org.logoUrl
            ? <img src={data.org.logoUrl} alt="logo" className="w-9 h-9 rounded-xl object-cover ring-1 ring-white/10" />
            : <div className="w-9 h-9 rounded-xl border flex items-center justify-center" style={{ background: accentLight, borderColor: accentMid }}><Car className="w-5 h-5" style={{ color: accent }} /></div>}
          <div>
            <p className="font-bold text-sm">{data.org.companyName || "Car Rental"}</p>
            {data.org.carRentalTagline
              ? <p className="text-[11px] text-white/40">{data.org.carRentalTagline}</p>
              : <p className="text-[11px] text-white/40">Online Booking</p>}
          </div>
          <div className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full border" style={{ background: accentLight, borderColor: accentMid }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
            <span className="text-xs font-medium" style={{ color: accent }}>Live</span>
          </div>
        </div>
      </div>

      {/* Cover photo */}
      {data.org.carRentalCoverUrl && (
        <div className="w-full h-44 sm:h-56 relative overflow-hidden">
          <img src={data.org.carRentalCoverUrl} alt="cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-[#020b18]" />
          <div className="absolute bottom-0 left-0 right-0 max-w-3xl mx-auto px-4 pb-4">
            <p className="text-2xl font-extrabold drop-shadow">{data.org.companyName || "Car Rental"}</p>
            {data.org.carRentalTagline && <p className="text-sm text-white/70 mt-0.5">{data.org.carRentalTagline}</p>}
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <div>
          <h2 className="text-lg font-bold mb-1">Available Vehicles</h2>
          <p className="text-white/40 text-xs mb-5">Select a vehicle to continue</p>
          {data.vehicles.length === 0
            ? <p className="text-white/40 text-sm">No vehicles available.</p>
            : <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.vehicles.map(v => (
                  <button key={v.id} type="button" onClick={() => setForm(f => ({ ...f, vehicleId: v.id }))}
                    className="text-left rounded-2xl border backdrop-blur-sm transition overflow-hidden"
                    style={form.vehicleId === v.id
                      ? { borderColor: accent, background: accentLight, boxShadow: `0 0 20px ${accentLight}` }
                      : { borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)" }}>
                    {v.imageUrl
                      ? <img src={v.imageUrl} alt={`${v.make} ${v.model}`} className="w-full h-36 object-cover" />
                      : <div className="w-full h-20 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.03)" }}><span className="text-3xl opacity-20">🚗</span></div>}
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <p className="font-semibold text-sm">{v.make} {v.model}</p>
                          {v.year && <p className="text-xs text-white/40">{v.year}</p>}
                        </div>
                        <div className="px-2.5 py-1 rounded-lg text-sm font-bold"
                          style={form.vehicleId === v.id ? { background: accentMid, color: accent } : { background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}>
                          {sym}{Number(v.dailyRate).toLocaleString()}<span className="text-xs font-normal opacity-60">/d</span>
                        </div>
                      </div>
                      <p className="text-xs text-white/40">{v.plateNumber}{v.color ? ` · ${v.color}` : ""}</p>
                      {form.vehicleId === v.id && (
                        <div className="mt-3 flex items-center gap-1.5 text-xs font-medium border-t pt-3" style={{ color: accent, borderColor: accentMid }}>
                          <CheckCircle2 className="w-3.5 h-3.5" /> Selected
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="rounded-3xl border border-white/10 backdrop-blur-sm p-6 space-y-5" style={{ background: "rgba(255,255,255,0.03)" }}>
            <h2 className="text-lg font-bold">Your Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-white/50 font-medium flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Full Name *</label>
                <input value={form.customerName} onChange={field("customerName")} placeholder="Juan dela Cruz" className={glassInput} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-white/50 font-medium flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Phone *</label>
                <input value={form.customerPhone} onChange={field("customerPhone")} placeholder="+63 917 123 4567" className={glassInput} />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs text-white/50 font-medium flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Email <span className="opacity-50">(optional)</span></label>
                <input value={form.customerEmail} onChange={field("customerEmail")} placeholder="juan@email.com" type="email" className={glassInput} />
              </div>
            </div>

            <div className="border-t border-white/10 pt-5">
              <h2 className="text-lg font-bold mb-4">Rental Dates</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-white/50 font-medium flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Pickup Date *</label>
                  <input type="date" value={form.pickupDate} onChange={field("pickupDate")} min={dayjs().format("YYYY-MM-DD")} className={glassInput} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-white/50 font-medium flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Return Date *</label>
                  <input type="date" value={form.returnDate} onChange={field("returnDate")} min={form.pickupDate || dayjs().format("YYYY-MM-DD")} className={glassInput} />
                </div>
              </div>
            </div>

            {total > 0 && (
              <div className="flex items-center justify-between px-4 py-3 rounded-xl border" style={{ background: accentLight, borderColor: accentMid }}>
                <span className="text-sm text-white/60">{days}d × {sym}{Number(selectedVehicle?.dailyRate).toLocaleString()}</span>
                <span className="text-lg font-bold" style={{ color: accent }}>{sym}{total.toLocaleString()}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs text-white/50 font-medium flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> Notes <span className="opacity-50">(optional)</span></label>
              <textarea value={form.notes} onChange={field("notes")} rows={3} placeholder="Any special requests…" className={`${glassInput} resize-none`} />
            </div>
          </div>

          {/* Deposit QR */}
          {data.org.carRentalDepositEnabled && (
            <div className="rounded-2xl border border-white/10 p-5 space-y-4" style={{ background: accentLight }}>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm">Deposit Required</p>
              </div>
              {data.org.carRentalDepositAmount && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: accentLight, border: `1px solid ${accentMid}` }}>
                  <span className="text-sm text-white/60">Amount to deposit:</span>
                  <span className="font-bold text-lg" style={{ color: accent }}>{sym}{Number(data.org.carRentalDepositAmount).toLocaleString()}</span>
                </div>
              )}
              {data.org.carRentalDepositQrUrl && (
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs text-white/50">Scan to pay</p>
                  <img src={data.org.carRentalDepositQrUrl} alt="Deposit QR" className="w-44 h-44 rounded-xl bg-white p-2 object-contain" />
                  {data.org.carRentalDepositNote && <p className="text-xs text-white/50 text-center">{data.org.carRentalDepositNote}</p>}
                </div>
              )}
              <div className="space-y-1.5">
                <label className="text-xs text-white/50 font-medium">Reference Number *</label>
                <input value={form.depositReference} onChange={e => setForm(f => ({ ...f, depositReference: e.target.value }))}
                  placeholder="Enter your transaction reference number" className={glassInput} />
                <p className="text-[11px] text-white/30">Enter the reference number from your payment app after scanning.</p>
              </div>
            </div>
          )}

          {error && <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"><AlertCircle className="w-4 h-4 shrink-0" /> {error}</div>}

          <button type="submit" disabled={submitting}
            style={{ background: accent }}
            className="w-full py-3.5 rounded-2xl text-white font-bold text-sm transition disabled:opacity-60 hover:opacity-90 flex items-center justify-center gap-2">
            {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : "Send Booking Request"}
          </button>
          <p className="text-center text-xs text-white/30">Booking request only, confirmed after review.</p>
        </form>
      </div>
    </div>
  )
}

// ─── Forest (Industrial / Angular) ───────────────────────────────────────────

function ForestPage({ data, form, setForm, handleSubmit, submitting, submitted, setSubmitted, error, days, total, sym }: PageProps) {
  const field = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))
  const selectedVehicle = data.vehicles.find(v => v.id === form.vehicleId)

  const accent = data.org.carRentalAccentColor || "#34d399"
  const accentLight = `${accent}1a`
  const accentMid   = `${accent}33`

  const underlineInput = "w-full px-0 py-2.5 border-b border-white/10 bg-transparent text-sm text-white placeholder-white/30 outline-none transition [color-scheme:dark]"

  if (submitted) return (
    <div className="min-h-screen bg-[#020e07] flex flex-col items-center justify-center gap-4 text-white p-6">
      <CheckCircle2 className="w-12 h-12" style={{ color: accent }} />
      <p className="text-2xl font-bold font-mono tracking-tight">REQUEST SENT</p>
      <p className="text-white/50 text-sm text-center max-w-sm">
        Sent to <strong className="text-white">{data.org.companyName}</strong>. They will contact you to confirm.
      </p>
      <button onClick={() => { setSubmitted(false); setForm(EMPTY_FORM) }}
        style={{ background: accent }}
        className="mt-4 px-6 py-3 text-white text-sm font-bold uppercase tracking-widest transition hover:opacity-90">
        New Request
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#020e07] text-white">
      {/* Header */}
      <div className="border-b-2 sticky top-0 z-10 bg-[#020e07]" style={{ borderColor: accentMid }}>
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
          {data.org.logoUrl
            ? <img src={data.org.logoUrl} alt="logo" className="w-8 h-8 object-cover" />
            : <div className="w-8 h-8 flex items-center justify-center" style={{ background: accentLight }}><Car className="w-4 h-4" style={{ color: accent }} /></div>}
          <div className="flex-1">
            <p className="font-bold text-sm uppercase tracking-widest">{data.org.companyName || "Car Rental"}</p>
            {data.org.carRentalTagline && <p className="text-[10px] font-mono mt-0.5" style={{ color: accent }}>{data.org.carRentalTagline}</p>}
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-mono" style={{ color: accent }}>Online Booking</span>
        </div>
      </div>

      {/* Cover photo */}
      {data.org.carRentalCoverUrl && (
        <div className="w-full h-44 sm:h-56 relative overflow-hidden">
          <img src={data.org.carRentalCoverUrl} alt="cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-[#020e07]" />
          <div className="absolute bottom-0 left-0 right-0 max-w-3xl mx-auto px-4 pb-4">
            <p className="text-2xl font-extrabold drop-shadow font-mono uppercase tracking-wide">{data.org.companyName || "Car Rental"}</p>
            {data.org.carRentalTagline && <p className="text-sm mt-0.5" style={{ color: accent }}>{data.org.carRentalTagline}</p>}
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] font-mono mb-4" style={{ color: accent }}>// Fleet</p>
          {data.vehicles.length === 0
            ? <p className="text-white/40 text-sm font-mono">No vehicles available.</p>
            : <div className="space-y-0 border" style={{ borderColor: accentMid }}>
                {data.vehicles.map((v, i) => (
                  <button key={v.id} type="button" onClick={() => setForm(f => ({ ...f, vehicleId: v.id }))}
                    className={`w-full text-left flex items-center gap-4 px-4 py-3 transition border-l-4 ${i > 0 ? "border-t" : ""}`}
                    style={form.vehicleId === v.id
                      ? { borderLeftColor: accent, background: accentLight, borderTopColor: accentMid }
                      : { borderLeftColor: "transparent", borderTopColor: accentMid }}>
                    {v.imageUrl
                      ? <img src={v.imageUrl} alt={`${v.make} ${v.model}`} className="w-16 h-12 object-cover rounded shrink-0" style={{ borderColor: accentMid, borderWidth: 1 }} />
                      : <div className="w-16 h-12 flex items-center justify-center rounded shrink-0" style={{ background: accentLight }}><span className="text-xl opacity-40">🚗</span></div>}
                    <div className="flex-1">
                      <p className="font-bold text-sm uppercase tracking-wide">{v.make} {v.model}</p>
                      <p className="text-xs text-white/40 font-mono mt-0.5">{v.plateNumber}{v.color ? ` / ${v.color}` : ""}{v.year ? ` / ${v.year}` : ""}</p>
                    </div>
                    <p className="font-mono font-bold text-sm shrink-0" style={{ color: accent }}>{sym}{Number(v.dailyRate).toLocaleString()}<span className="text-xs opacity-50">/day</span></p>
                    {form.vehicleId === v.id && <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: accent }} />}
                  </button>
                ))}
              </div>}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-5">
            <p className="text-[11px] uppercase tracking-[0.2em] font-mono" style={{ color: accent }}>// Contact</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] font-mono mb-1" style={{ color: accent }}>Full Name *</label>
                <input value={form.customerName} onChange={field("customerName")} placeholder="Juan dela Cruz" className={underlineInput} />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] font-mono mb-1" style={{ color: accent }}>Phone *</label>
                <input value={form.customerPhone} onChange={field("customerPhone")} placeholder="+63 917 123 4567" className={underlineInput} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[10px] uppercase tracking-[0.15em] font-mono mb-1" style={{ color: accent }}>Email (optional)</label>
                <input value={form.customerEmail} onChange={field("customerEmail")} placeholder="juan@email.com" type="email" className={underlineInput} />
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <p className="text-[11px] uppercase tracking-[0.2em] font-mono" style={{ color: accent }}>// Dates</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] font-mono mb-1" style={{ color: accent }}>Pickup Date *</label>
                <input type="date" value={form.pickupDate} onChange={field("pickupDate")} min={dayjs().format("YYYY-MM-DD")} className={underlineInput} />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] font-mono mb-1" style={{ color: accent }}>Return Date *</label>
                <input type="date" value={form.returnDate} onChange={field("returnDate")} min={form.pickupDate || dayjs().format("YYYY-MM-DD")} className={underlineInput} />
              </div>
            </div>
          </div>

          {total > 0 && (
            <div className="border px-4 py-3 flex items-center justify-between" style={{ borderColor: accentMid }}>
              <span className="text-xs font-mono text-white/50 uppercase tracking-wider">{days}d × {sym}{Number(selectedVehicle?.dailyRate).toLocaleString()}</span>
              <span className="font-mono font-bold text-lg" style={{ color: accent }}>{sym}{total.toLocaleString()}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-[10px] uppercase tracking-[0.15em] font-mono" style={{ color: accent }}>Notes (optional)</label>
            <textarea value={form.notes} onChange={field("notes")} rows={3} placeholder="Special requests…" className={`${underlineInput} resize-none`} />
          </div>

          {/* Deposit QR */}
          {data.org.carRentalDepositEnabled && (
            <div className="border p-5 space-y-4" style={{ background: accentLight, borderColor: accentMid }}>
              <div className="flex items-center gap-2">
                <p className="font-bold text-sm uppercase tracking-wider font-mono">Deposit Required</p>
              </div>
              {data.org.carRentalDepositAmount && (
                <div className="flex items-center gap-2 px-3 py-2 border" style={{ borderColor: accentMid }}>
                  <span className="text-sm text-white/60 font-mono">Amount:</span>
                  <span className="font-bold text-lg font-mono" style={{ color: accent }}>{sym}{Number(data.org.carRentalDepositAmount).toLocaleString()}</span>
                </div>
              )}
              {data.org.carRentalDepositQrUrl && (
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xs font-mono" style={{ color: accent }}>// Scan to pay</p>
                  <img src={data.org.carRentalDepositQrUrl} alt="Deposit QR" className="w-44 h-44 bg-white p-2 object-contain" />
                  {data.org.carRentalDepositNote && <p className="text-xs text-white/50 text-center font-mono">{data.org.carRentalDepositNote}</p>}
                </div>
              )}
              <div className="space-y-1">
                <label className="block text-[10px] uppercase tracking-[0.15em] font-mono" style={{ color: accent }}>Reference Number *</label>
                <input value={form.depositReference} onChange={e => setForm(f => ({ ...f, depositReference: e.target.value }))}
                  placeholder="Transaction reference number" className={underlineInput} />
                <p className="text-[11px] text-white/30 font-mono">Enter the reference from your payment app after scanning.</p>
              </div>
            </div>
          )}

          {error && <div className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm"><AlertCircle className="w-4 h-4 shrink-0" /> {error}</div>}

          <button type="submit" disabled={submitting}
            style={{ background: accent }}
            className="w-full py-4 text-white font-bold text-sm uppercase tracking-[0.15em] transition disabled:opacity-60 hover:opacity-90 flex items-center justify-center gap-2">
            {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : "Send Booking Request"}
          </button>
          <p className="text-center text-[10px] uppercase tracking-wider font-mono" style={{ color: accentMid }}>Request confirmed by {data.org.companyName || "the business"} after review</p>
        </form>
      </div>
    </div>
  )
}

// ─── Luxury (Gold) ────────────────────────────────────────────────────────────

function LuxuryPage({ data, form, setForm, handleSubmit, submitting, submitted, setSubmitted, error, days, total, sym }: PageProps) {
  const field = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))
  const selectedVehicle = data.vehicles.find(v => v.id === form.vehicleId)

  const accent = data.org.carRentalAccentColor || "#fbbf24"
  const accentLight = `${accent}15`
  const accentMid   = `${accent}33`
  const accentDim   = `${accent}55`

  const goldInput = `w-full px-0 py-3 border-b bg-transparent text-sm text-white placeholder-white/20 outline-none transition [color-scheme:dark]`

  if (submitted) return (
    <div className="min-h-screen bg-[#080604] flex flex-col items-center justify-center gap-5 text-white p-6">
      <div className="w-px h-16 bg-gradient-to-b from-transparent" style={{ borderColor: accentMid }} />
      <CheckCircle2 className="w-8 h-8" style={{ color: accent }} />
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: accentDim }}>Confirmed</p>
        <p className="text-2xl font-light">Request Sent</p>
      </div>
      <p className="text-white/40 text-sm text-center max-w-xs">
        Your request has been received by <em>{data.org.companyName}</em>. You will be contacted shortly.
      </p>
      <div className="w-px h-8" style={{ background: accentMid }} />
      <button onClick={() => { setSubmitted(false); setForm(EMPTY_FORM) }}
        className="px-8 py-3 text-xs uppercase tracking-[0.2em] transition hover:opacity-80"
        style={{ border: `1px solid ${accentDim}`, color: accent }}>
        New Request
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#080604] text-white">
      {/* Header */}
      <div className="border-b sticky top-0 z-10 bg-[#080604]" style={{ borderColor: accentMid }}>
        <div className="max-w-2xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {data.org.logoUrl
              ? <img src={data.org.logoUrl} alt="logo" className="w-8 h-8 object-cover rounded" />
              : <div className="w-8 h-8 border flex items-center justify-center" style={{ borderColor: accentDim }}><Car className="w-4 h-4" style={{ color: accentDim }} /></div>}
            <div>
              <p className="text-sm font-light tracking-[0.1em] uppercase" style={{ color: accent }}>{data.org.companyName || "Car Rental"}</p>
              {data.org.carRentalTagline && <p className="text-[10px] text-white/30 tracking-wider">{data.org.carRentalTagline}</p>}
            </div>
          </div>
          <span className="text-[10px] uppercase tracking-[0.25em]" style={{ color: accentDim }}>Reservations</span>
        </div>
      </div>

      {/* Cover photo */}
      {data.org.carRentalCoverUrl && (
        <div className="w-full h-44 sm:h-56 relative overflow-hidden">
          <img src={data.org.carRentalCoverUrl} alt="cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-[#080604]" />
          <div className="absolute bottom-0 left-0 right-0 max-w-2xl mx-auto px-6 pb-5">
            <p className="text-2xl font-light tracking-widest uppercase" style={{ color: accent }}>{data.org.companyName || "Car Rental"}</p>
            {data.org.carRentalTagline && <p className="text-sm text-white/50 tracking-wider mt-1">{data.org.carRentalTagline}</p>}
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto px-6 py-12 space-y-12">

        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${accentMid})` }} />
            <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: accentDim }}>Our Fleet</span>
            <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${accentMid})` }} />
          </div>
        </div>

        {data.vehicles.length === 0
          ? <p className="text-center text-white/30 text-sm italic">No vehicles available at the moment.</p>
          : <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.vehicles.map(v => (
                <button key={v.id} type="button" onClick={() => setForm(f => ({ ...f, vehicleId: v.id }))}
                  className="text-left border transition overflow-hidden"
                  style={form.vehicleId === v.id
                    ? { borderColor: `${accent}99`, background: accentLight }
                    : { borderColor: accentMid }}>
                  {v.imageUrl
                    ? <img src={v.imageUrl} alt={`${v.make} ${v.model}`} className="w-full h-40 object-cover" />
                    : <div className="w-full h-24 flex items-center justify-center" style={{ background: accentLight }}><span className="text-4xl opacity-20">🚗</span></div>}
                  <div className="p-5 space-y-3">
                    <div>
                      <p className="font-light text-base tracking-wide">{v.make} {v.model}</p>
                      <p className="text-xs text-white/30 mt-0.5 tracking-wider">{v.plateNumber}{v.color ? ` · ${v.color}` : ""}{v.year ? ` · ${v.year}` : ""}</p>
                    </div>
                    <div className="h-px" style={{ background: accentMid }} />
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: accentDim }}>Daily rate</span>
                      <span className="font-light text-lg" style={{ color: form.vehicleId === v.id ? accent : accentDim }}>
                        {sym}{Number(v.dailyRate).toLocaleString()}
                      </span>
                    </div>
                    {form.vehicleId === v.id && (
                      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest" style={{ color: accent }}>
                        <CheckCircle2 className="w-3 h-3" /> Selected
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>}

        <div className="flex items-center gap-4">
          <div className="h-px flex-1" style={{ background: accentMid }} />
          <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: accentDim }}>Your Details</span>
          <div className="h-px flex-1" style={{ background: accentMid }} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: accentDim }}>Full Name *</label>
              <input value={form.customerName} onChange={field("customerName")} placeholder="Juan dela Cruz"
                className={goldInput} style={{ borderColor: accentMid }} />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: accentDim }}>Phone *</label>
              <input value={form.customerPhone} onChange={field("customerPhone")} placeholder="+63 917 123 4567"
                className={goldInput} style={{ borderColor: accentMid }} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: accentDim }}>Email <span className="normal-case tracking-normal opacity-50">(optional)</span></label>
              <input value={form.customerEmail} onChange={field("customerEmail")} placeholder="juan@email.com" type="email"
                className={goldInput} style={{ borderColor: accentMid }} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-px flex-1" style={{ background: accentMid }} />
            <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: accentDim }}>Dates</span>
            <div className="h-px flex-1" style={{ background: accentMid }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: accentDim }}>Pickup Date *</label>
              <input type="date" value={form.pickupDate} onChange={field("pickupDate")} min={dayjs().format("YYYY-MM-DD")}
                className={goldInput} style={{ borderColor: accentMid }} />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: accentDim }}>Return Date *</label>
              <input type="date" value={form.returnDate} onChange={field("returnDate")} min={form.pickupDate || dayjs().format("YYYY-MM-DD")}
                className={goldInput} style={{ borderColor: accentMid }} />
            </div>
          </div>

          {total > 0 && (
            <div className="text-center py-4 border-y space-y-1" style={{ borderColor: accentMid }}>
              <p className="text-[10px] uppercase tracking-[0.25em]" style={{ color: accentDim }}>{days} day{days !== 1 ? "s" : ""} × {sym}{Number(selectedVehicle?.dailyRate).toLocaleString()} per day</p>
              <p className="text-2xl font-light" style={{ color: accent }}>{sym}{total.toLocaleString()}</p>
            </div>
          )}

          <div>
            <label className="block text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: accentDim }}>Notes <span className="normal-case tracking-normal opacity-50">(optional)</span></label>
            <textarea value={form.notes} onChange={field("notes")} rows={3} placeholder="Special requests or questions…"
              className={`${goldInput} resize-none`} style={{ borderColor: accentMid }} />
          </div>

          {/* Deposit QR */}
          {data.org.carRentalDepositEnabled && (
            <div className="p-5 space-y-4 border" style={{ background: accentLight, borderColor: accentMid }}>
              <div className="flex items-center gap-3">
                <div className="w-px h-8" style={{ background: accent }} />
                <p className="text-xs uppercase tracking-[0.25em]" style={{ color: accent }}>Deposit Required</p>
              </div>
              {data.org.carRentalDepositAmount && (
                <div className="text-center py-3 border-y" style={{ borderColor: accentMid }}>
                  <p className="text-[10px] uppercase tracking-[0.25em] mb-1" style={{ color: accentDim }}>Amount to deposit</p>
                  <p className="text-2xl font-light" style={{ color: accent }}>{sym}{Number(data.org.carRentalDepositAmount).toLocaleString()}</p>
                </div>
              )}
              {data.org.carRentalDepositQrUrl && (
                <div className="flex flex-col items-center gap-3">
                  <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: accentDim }}>Scan to pay</p>
                  <img src={data.org.carRentalDepositQrUrl} alt="Deposit QR" className="w-44 h-44 bg-white p-2 object-contain" />
                  {data.org.carRentalDepositNote && <p className="text-xs text-white/40 text-center tracking-wider">{data.org.carRentalDepositNote}</p>}
                </div>
              )}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: accentDim }}>Reference Number *</label>
                <input value={form.depositReference} onChange={e => setForm(f => ({ ...f, depositReference: e.target.value }))}
                  placeholder="Transaction reference number"
                  className={goldInput} style={{ borderColor: accentMid }} />
                <p className="text-[11px] text-white/30 mt-1">Enter the reference from your payment app after scanning.</p>
              </div>
            </div>
          )}

          {error && <div className="flex items-center gap-2 px-4 py-3 border border-red-900/50 text-red-400 text-sm bg-red-500/5"><AlertCircle className="w-4 h-4 shrink-0" /> {error}</div>}

          <button type="submit" disabled={submitting}
            className="w-full py-4 text-xs uppercase tracking-[0.25em] transition disabled:opacity-40 hover:opacity-80 flex items-center justify-center gap-3"
            style={{ border: `1px solid ${accentDim}`, color: accent }}>
            {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : "Send Booking Request"}
          </button>
          <p className="text-center text-[10px] uppercase tracking-[0.2em]" style={{ color: accentMid }}>Request confirmed by {data.org.companyName || "the business"} after review</p>
        </form>
      </div>
    </div>
  )
}

// ─── Main dispatcher ──────────────────────────────────────────────────────────

export default function RentPageContent({ slug }: { slug: string }) {
  const [data, setData]         = useState<{ org: any; vehicles: any[] } | null>(null)
  const [loading, setLoading]   = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [form, setForm]         = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted]   = useState(false)
  const [error, setError]       = useState("")

  useEffect(() => {
    fetch(`${API}/api/car-rental/public/${slug}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(setData)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  const selectedVehicle = data?.vehicles.find(v => v.id === form.vehicleId)
  const days = form.pickupDate && form.returnDate
    ? Math.max(1, dayjs(form.returnDate).diff(dayjs(form.pickupDate), "day")) : 0
  const total = days && selectedVehicle ? days * selectedVehicle.dailyRate : 0
  const sym = data?.org?.currencySymbol || "₱"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    const missing: string[] = []
    if (!form.vehicleId)      missing.push("Vehicle selection")
    if (!form.customerName)   missing.push("Full name")
    if (!form.customerPhone)  missing.push("Phone number")
    if (!form.pickupDate)     missing.push("Pickup date")
    if (!form.returnDate)     missing.push("Return date")
    if (missing.length > 0) {
      setError(`Please fill in the following: ${missing.join(", ")}.`); return
    }
    if (dayjs(form.returnDate).isBefore(dayjs(form.pickupDate))) {
      setError("Return date must be after pickup date."); return
    }
    setSubmitting(true)
    try {
      const res = await fetch(`${API}/api/car-rental/public/${slug}/inquire`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) { const err = await res.json(); throw new Error(err.message || "Failed") }
      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || "Something went wrong.")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-[#fbf7f0] flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-[#161616]" />
    </div>
  )

  if (notFound || !data) return (
    <div className="min-h-screen bg-[#fbf7f0] flex flex-col items-center justify-center gap-4 text-[#1c1a17] p-6">
      <div className="w-14 h-14 rounded-2xl bg-[#fff1da] border-2 border-[#161616] shadow-[5px_5px_0_#161616] flex items-center justify-center">
        <Car className="w-7 h-7 text-[#c2740a]" />
      </div>
      <p className="text-xl font-extrabold tracking-tight">Page not found</p>
      <p className="text-[#56524b] text-sm text-center">This booking page doesn't exist or may have been removed.</p>
    </div>
  )

  const props: PageProps = { data, form, setForm, handleSubmit, submitting, submitted, setSubmitted, error, days, total, sym }
  const theme = data.org?.carRentalTheme || "dark"

  if (theme === "light")   return <CleanPage   {...props} />
  if (theme === "ocean")   return <OceanPage   {...props} />
  if (theme === "forest")  return <ForestPage  {...props} />
  if (theme === "luxury")  return <LuxuryPage  {...props} />
  return <MidnightPage {...props} />
}
