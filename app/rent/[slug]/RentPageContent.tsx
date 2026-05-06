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

  const inputCls = "px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-sm text-white placeholder-white/30 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition [color-scheme:dark]"

  if (submitted) return (
    <div className="min-h-screen bg-[#0f0700] flex flex-col items-center justify-center gap-4 text-white p-6">
      <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
        <CheckCircle2 className="w-8 h-8 text-green-400" />
      </div>
      <p className="text-2xl font-bold">Request Sent!</p>
      <p className="text-white/60 text-sm text-center max-w-sm">
        Your booking request has been sent to <strong className="text-white">{data.org.companyName}</strong>. They will contact you shortly.
      </p>
      <button onClick={() => { setSubmitted(false); setForm(EMPTY_FORM) }}
        className="mt-4 px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold transition">
        Make another request
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0f0700] text-white">
      <div className="border-b border-white/10 bg-[#1a0800]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          {data.org.logoUrl
            ? <img src={data.org.logoUrl} alt="logo" className="w-9 h-9 rounded-xl object-cover" />
            : <div className="w-9 h-9 rounded-xl bg-orange-500/20 flex items-center justify-center"><Car className="w-5 h-5 text-orange-400" /></div>}
          <div>
            <p className="font-bold text-sm">{data.org.companyName || "Car Rental"}</p>
            <p className="text-[11px] text-white/40">Online Booking</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <div>
          <h2 className="text-lg font-bold mb-4">Available Vehicles</h2>
          {data.vehicles.length === 0
            ? <p className="text-white/40 text-sm">No vehicles available.</p>
            : <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.vehicles.map(v => (
                  <button key={v.id} type="button" onClick={() => setForm(f => ({ ...f, vehicleId: v.id }))}
                    className={`text-left p-4 rounded-2xl border transition ${form.vehicleId === v.id ? "border-orange-500 bg-orange-500/10" : "border-white/10 bg-white/5 hover:border-white/20"}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-sm">{v.make} {v.model} {v.year ? `(${v.year})` : ""}</p>
                        <p className="text-xs text-white/40 mt-0.5">{v.plateNumber}{v.color ? ` · ${v.color}` : ""}</p>
                      </div>
                      <p className="text-orange-400 font-bold text-sm shrink-0">{sym}{Number(v.dailyRate).toLocaleString()}<span className="text-xs text-white/40 font-normal">/day</span></p>
                    </div>
                    {form.vehicleId === v.id && <div className="mt-2 flex items-center gap-1 text-orange-400 text-xs font-medium"><CheckCircle2 className="w-3.5 h-3.5" /> Selected</div>}
                  </button>
                ))}
              </div>}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="text-lg font-bold">Your Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-white/50 font-medium flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Full Name *</label>
              <input value={form.customerName} onChange={field("customerName")} placeholder="Juan dela Cruz" className={inputCls} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-white/50 font-medium flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Phone *</label>
              <input value={form.customerPhone} onChange={field("customerPhone")} placeholder="+63 917 123 4567" className={inputCls} />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs text-white/50 font-medium flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Email <span className="text-white/30">(optional)</span></label>
              <input value={form.customerEmail} onChange={field("customerEmail")} placeholder="juan@email.com" type="email" className={inputCls} />
            </div>
          </div>
          <h2 className="text-lg font-bold pt-2">Rental Dates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-white/50 font-medium flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Pickup Date *</label>
              <input type="date" value={form.pickupDate} onChange={field("pickupDate")} min={dayjs().format("YYYY-MM-DD")} className={inputCls} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-white/50 font-medium flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Return Date *</label>
              <input type="date" value={form.returnDate} onChange={field("returnDate")} min={form.pickupDate || dayjs().format("YYYY-MM-DD")} className={inputCls} />
            </div>
          </div>
          {total > 0 && (
            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
              <span className="text-sm text-white/60">{days} day{days !== 1 ? "s" : ""} × {sym}{Number(selectedVehicle?.dailyRate).toLocaleString()}/day</span>
              <span className="text-lg font-bold text-orange-400">{sym}{total.toLocaleString()}</span>
            </div>
          )}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-white/50 font-medium flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> Notes <span className="text-white/30">(optional)</span></label>
            <textarea value={form.notes} onChange={field("notes")} rows={3} placeholder="Any special requests…" className={`${inputCls} resize-none`} />
          </div>
          {error && <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"><AlertCircle className="w-4 h-4 shrink-0" /> {error}</div>}
          <button type="submit" disabled={submitting}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold text-sm transition disabled:opacity-60 flex items-center justify-center gap-2">
            {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : "Send Booking Request"}
          </button>
          <p className="text-center text-xs text-white/30">Booking request only — confirmed by {data.org.companyName || "the business"} after review.</p>
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

  const inputCls = "w-full px-0 py-2 border-b-2 border-slate-200 bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-orange-500 transition"

  if (submitted) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 p-6">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
        <CheckCircle2 className="w-8 h-8 text-green-500" />
      </div>
      <p className="text-2xl font-bold text-slate-900">Request Sent!</p>
      <p className="text-slate-500 text-sm text-center max-w-sm">
        Your booking request has been sent to <strong className="text-slate-900">{data.org.companyName}</strong>. They will contact you shortly.
      </p>
      <button onClick={() => { setSubmitted(false); setForm(EMPTY_FORM) }}
        className="mt-4 px-8 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition flex items-center gap-2">
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
              : <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center"><Car className="w-4 h-4 text-orange-500" /></div>}
            <p className="font-bold text-slate-900">{data.org.companyName || "Car Rental"}</p>
          </div>
          <span className="text-xs font-medium text-orange-500 bg-orange-50 px-3 py-1.5 rounded-full">Online Booking</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-10">
        {/* Vehicles — horizontal list */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-5 bg-orange-500 rounded-full" />
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide">Available Vehicles</h2>
          </div>
          {data.vehicles.length === 0
            ? <p className="text-slate-400 text-sm">No vehicles available.</p>
            : <div className="space-y-3">
                {data.vehicles.map(v => (
                  <button key={v.id} type="button" onClick={() => setForm(f => ({ ...f, vehicleId: v.id }))}
                    className={`w-full text-left flex items-center gap-4 px-5 py-4 rounded-2xl border-2 bg-white transition ${form.vehicleId === v.id ? "border-orange-500" : "border-slate-200 hover:border-slate-300"}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition ${form.vehicleId === v.id ? "bg-orange-500" : "bg-slate-100"}`}>
                      <Car className={`w-5 h-5 ${form.vehicleId === v.id ? "text-white" : "text-slate-400"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900">{v.make} {v.model} {v.year ? `· ${v.year}` : ""}</p>
                      <p className="text-xs text-slate-400 truncate">{v.plateNumber}{v.color ? ` · ${v.color}` : ""}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-slate-900">{sym}{Number(v.dailyRate).toLocaleString()}</p>
                      <p className="text-xs text-slate-400">per day</p>
                    </div>
                    {form.vehicleId === v.id && <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />}
                  </button>
                ))}
              </div>}
        </div>

        {/* Form — inside a white card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-5 bg-orange-500 rounded-full" />
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
                <div className="w-1 h-5 bg-orange-500 rounded-full" />
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
                <span className="text-xl font-bold text-orange-500">{sym}{total.toLocaleString()}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Notes <span className="font-normal text-slate-400">(optional)</span></label>
              <textarea value={form.notes} onChange={field("notes")} rows={3} placeholder="Any special requests…"
                className="w-full px-0 py-2 border-b-2 border-slate-200 bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-orange-500 transition resize-none" />
            </div>

            {error && <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm"><AlertCircle className="w-4 h-4 shrink-0" /> {error}</div>}

            <button type="submit" disabled={submitting}
              className="w-full py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition disabled:opacity-60 flex items-center justify-center gap-2">
              {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : <><span>Send Booking Request</span><ArrowRight className="w-4 h-4" /></>}
            </button>
            <p className="text-center text-xs text-slate-400">Booking request only — confirmed by {data.org.companyName || "the business"} after review.</p>
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

  const glassInput = "w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-white placeholder-white/30 outline-none focus:border-cyan-400 focus:bg-cyan-900/20 transition [color-scheme:dark]"

  if (submitted) return (
    <div className="min-h-screen bg-[#020b18] flex flex-col items-center justify-center gap-4 text-white p-6">
      <div className="w-20 h-20 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center backdrop-blur-sm">
        <CheckCircle2 className="w-9 h-9 text-cyan-400" />
      </div>
      <p className="text-2xl font-bold">Request Sent!</p>
      <p className="text-cyan-100/50 text-sm text-center max-w-sm">
        Your booking request has been sent to <strong className="text-white">{data.org.companyName}</strong>.
      </p>
      <button onClick={() => { setSubmitted(false); setForm(EMPTY_FORM) }}
        className="mt-4 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white text-sm font-semibold transition">
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
            : <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/20 flex items-center justify-center"><Car className="w-5 h-5 text-cyan-400" /></div>}
          <div>
            <p className="font-bold text-sm">{data.org.companyName || "Car Rental"}</p>
            <p className="text-[11px] text-cyan-100/40">Online Booking</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs text-cyan-400 font-medium">Live</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <div>
          <h2 className="text-lg font-bold mb-1">Available Vehicles</h2>
          <p className="text-cyan-100/40 text-xs mb-5">Select a vehicle to continue</p>
          {data.vehicles.length === 0
            ? <p className="text-cyan-100/40 text-sm">No vehicles available.</p>
            : <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.vehicles.map(v => (
                  <button key={v.id} type="button" onClick={() => setForm(f => ({ ...f, vehicleId: v.id }))}
                    className={`text-left p-5 rounded-2xl border backdrop-blur-sm transition ${
                      form.vehicleId === v.id
                        ? "border-cyan-400 bg-cyan-400/10 shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8"
                    }`}>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <p className="font-semibold text-sm">{v.make} {v.model}</p>
                        {v.year && <p className="text-xs text-cyan-100/40">{v.year}</p>}
                      </div>
                      <div className={`px-2.5 py-1 rounded-lg text-sm font-bold ${form.vehicleId === v.id ? "bg-cyan-400/20 text-cyan-300" : "bg-white/10 text-white/70"}`}>
                        {sym}{Number(v.dailyRate).toLocaleString()}<span className="text-xs font-normal opacity-60">/d</span>
                      </div>
                    </div>
                    <p className="text-xs text-cyan-100/40">{v.plateNumber}{v.color ? ` · ${v.color}` : ""}</p>
                    {form.vehicleId === v.id && <div className="mt-3 flex items-center gap-1.5 text-cyan-400 text-xs font-medium border-t border-cyan-400/20 pt-3"><CheckCircle2 className="w-3.5 h-3.5" /> Selected</div>}
                  </button>
                ))}
              </div>}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Glass form panel */}
          <div className="rounded-3xl border border-white/10 backdrop-blur-sm p-6 space-y-5" style={{ background: "rgba(255,255,255,0.03)" }}>
            <h2 className="text-lg font-bold">Your Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-cyan-100/50 font-medium flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Full Name *</label>
                <input value={form.customerName} onChange={field("customerName")} placeholder="Juan dela Cruz" className={glassInput} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-cyan-100/50 font-medium flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Phone *</label>
                <input value={form.customerPhone} onChange={field("customerPhone")} placeholder="+63 917 123 4567" className={glassInput} />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs text-cyan-100/50 font-medium flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Email <span className="opacity-50">(optional)</span></label>
                <input value={form.customerEmail} onChange={field("customerEmail")} placeholder="juan@email.com" type="email" className={glassInput} />
              </div>
            </div>

            <div className="border-t border-white/10 pt-5">
              <h2 className="text-lg font-bold mb-4">Rental Dates</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-cyan-100/50 font-medium flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Pickup Date *</label>
                  <input type="date" value={form.pickupDate} onChange={field("pickupDate")} min={dayjs().format("YYYY-MM-DD")} className={glassInput} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-cyan-100/50 font-medium flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Return Date *</label>
                  <input type="date" value={form.returnDate} onChange={field("returnDate")} min={form.pickupDate || dayjs().format("YYYY-MM-DD")} className={glassInput} />
                </div>
              </div>
            </div>

            {total > 0 && (
              <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-cyan-400/10 border border-cyan-400/20">
                <span className="text-sm text-cyan-100/60">{days}d × {sym}{Number(selectedVehicle?.dailyRate).toLocaleString()}</span>
                <span className="text-lg font-bold text-cyan-400">{sym}{total.toLocaleString()}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs text-cyan-100/50 font-medium flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> Notes <span className="opacity-50">(optional)</span></label>
              <textarea value={form.notes} onChange={field("notes")} rows={3} placeholder="Any special requests…" className={`${glassInput} resize-none`} />
            </div>
          </div>

          {error && <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"><AlertCircle className="w-4 h-4 shrink-0" /> {error}</div>}

          <button type="submit" disabled={submitting}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm transition disabled:opacity-60 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
            {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : "Send Booking Request"}
          </button>
          <p className="text-center text-xs text-cyan-100/30">Booking request only — confirmed after review.</p>
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

  const underlineInput = "w-full px-0 py-2.5 border-b border-emerald-900 bg-transparent text-sm text-white placeholder-emerald-100/30 outline-none focus:border-emerald-400 transition [color-scheme:dark]"

  if (submitted) return (
    <div className="min-h-screen bg-[#020e07] flex flex-col items-center justify-center gap-4 text-white p-6">
      <CheckCircle2 className="w-12 h-12 text-emerald-400" />
      <p className="text-2xl font-bold font-mono tracking-tight">REQUEST SENT</p>
      <p className="text-emerald-100/50 text-sm text-center max-w-sm">
        Sent to <strong className="text-white">{data.org.companyName}</strong>. They will contact you to confirm.
      </p>
      <button onClick={() => { setSubmitted(false); setForm(EMPTY_FORM) }}
        className="mt-4 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-bold uppercase tracking-widest transition">
        New Request
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#020e07] text-white">
      {/* Header — no radius, sharp */}
      <div className="border-b-2 border-emerald-900 sticky top-0 z-10 bg-[#020e07]">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
          {data.org.logoUrl
            ? <img src={data.org.logoUrl} alt="logo" className="w-8 h-8 object-cover" />
            : <div className="w-8 h-8 bg-emerald-500/20 flex items-center justify-center"><Car className="w-4 h-4 text-emerald-400" /></div>}
          <div className="flex-1">
            <p className="font-bold text-sm uppercase tracking-widest text-emerald-100">{data.org.companyName || "Car Rental"}</p>
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-600 font-mono">Online Booking</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-600 font-mono mb-4">// Fleet</p>
          {data.vehicles.length === 0
            ? <p className="text-emerald-100/40 text-sm font-mono">No vehicles available.</p>
            : <div className="space-y-0 border border-emerald-900">
                {data.vehicles.map((v, i) => (
                  <button key={v.id} type="button" onClick={() => setForm(f => ({ ...f, vehicleId: v.id }))}
                    className={`w-full text-left flex items-center gap-4 px-4 py-4 transition border-l-4 ${i > 0 ? "border-t border-emerald-900/50" : ""} ${
                      form.vehicleId === v.id ? "border-l-emerald-400 bg-emerald-400/5" : "border-l-transparent hover:bg-emerald-900/20"
                    }`}>
                    <div className="flex-1">
                      <p className="font-bold text-sm uppercase tracking-wide">{v.make} {v.model}</p>
                      <p className="text-xs text-emerald-100/40 font-mono mt-0.5">{v.plateNumber}{v.color ? ` / ${v.color}` : ""}{v.year ? ` / ${v.year}` : ""}</p>
                    </div>
                    <p className="font-mono font-bold text-emerald-400 text-sm shrink-0">{sym}{Number(v.dailyRate).toLocaleString()}<span className="text-emerald-700 text-xs">/day</span></p>
                    {form.vehicleId === v.id && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </button>
                ))}
              </div>}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-5">
            <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-600 font-mono">// Contact</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] text-emerald-700 font-mono mb-1">Full Name *</label>
                <input value={form.customerName} onChange={field("customerName")} placeholder="Juan dela Cruz" className={underlineInput} />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] text-emerald-700 font-mono mb-1">Phone *</label>
                <input value={form.customerPhone} onChange={field("customerPhone")} placeholder="+63 917 123 4567" className={underlineInput} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[10px] uppercase tracking-[0.15em] text-emerald-700 font-mono mb-1">Email (optional)</label>
                <input value={form.customerEmail} onChange={field("customerEmail")} placeholder="juan@email.com" type="email" className={underlineInput} />
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-600 font-mono">// Dates</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] text-emerald-700 font-mono mb-1">Pickup Date *</label>
                <input type="date" value={form.pickupDate} onChange={field("pickupDate")} min={dayjs().format("YYYY-MM-DD")} className={underlineInput} />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] text-emerald-700 font-mono mb-1">Return Date *</label>
                <input type="date" value={form.returnDate} onChange={field("returnDate")} min={form.pickupDate || dayjs().format("YYYY-MM-DD")} className={underlineInput} />
              </div>
            </div>
          </div>

          {total > 0 && (
            <div className="border border-emerald-900 px-4 py-3 flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-700 uppercase tracking-wider">{days}d × {sym}{Number(selectedVehicle?.dailyRate).toLocaleString()}</span>
              <span className="font-mono font-bold text-emerald-400 text-lg">{sym}{total.toLocaleString()}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-[10px] uppercase tracking-[0.15em] text-emerald-700 font-mono">Notes (optional)</label>
            <textarea value={form.notes} onChange={field("notes")} rows={3} placeholder="Special requests…"
              className="w-full px-0 py-2.5 border-b border-emerald-900 bg-transparent text-sm text-white placeholder-emerald-100/30 outline-none focus:border-emerald-400 transition resize-none" />
          </div>

          {error && <div className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm"><AlertCircle className="w-4 h-4 shrink-0" /> {error}</div>}

          <button type="submit" disabled={submitting}
            className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm uppercase tracking-[0.15em] transition disabled:opacity-60 flex items-center justify-center gap-2">
            {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : "Send Booking Request"}
          </button>
          <p className="text-center text-[10px] uppercase tracking-wider text-emerald-900 font-mono">Request confirmed by {data.org.companyName || "the business"} after review</p>
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

  const goldInput = "w-full px-0 py-3 border-b border-yellow-900/60 bg-transparent text-sm text-white placeholder-yellow-100/20 outline-none focus:border-yellow-400 transition [color-scheme:dark]"

  if (submitted) return (
    <div className="min-h-screen bg-[#080604] flex flex-col items-center justify-center gap-5 text-white p-6">
      <div className="w-px h-16 bg-gradient-to-b from-transparent to-yellow-400/50" />
      <CheckCircle2 className="w-8 h-8 text-yellow-400" />
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-yellow-700 mb-2">Confirmed</p>
        <p className="text-2xl font-light">Request Sent</p>
      </div>
      <p className="text-yellow-100/40 text-sm text-center max-w-xs">
        Your request has been received by <em>{data.org.companyName}</em>. You will be contacted shortly.
      </p>
      <div className="w-px h-8 bg-yellow-900/50" />
      <button onClick={() => { setSubmitted(false); setForm(EMPTY_FORM) }}
        className="px-8 py-3 border border-yellow-800 hover:border-yellow-400 text-yellow-400 text-xs uppercase tracking-[0.2em] transition">
        New Request
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#080604] text-white">
      {/* Header — thin gold line */}
      <div className="border-b border-yellow-900/50 sticky top-0 z-10 bg-[#080604]">
        <div className="max-w-2xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {data.org.logoUrl
              ? <img src={data.org.logoUrl} alt="logo" className="w-8 h-8 object-cover rounded" />
              : <div className="w-8 h-8 border border-yellow-900/50 flex items-center justify-center"><Car className="w-4 h-4 text-yellow-600" /></div>}
            <p className="text-sm font-light tracking-[0.1em] uppercase text-yellow-100">{data.org.companyName || "Car Rental"}</p>
          </div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-yellow-800">Reservations</span>
        </div>
      </div>

      {/* Centered narrow layout */}
      <div className="max-w-2xl mx-auto px-6 py-12 space-y-12">

        {/* Section title */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-900/50" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-yellow-700">Our Fleet</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-900/50" />
          </div>
        </div>

        {/* Vehicle cards — tall, centered */}
        {data.vehicles.length === 0
          ? <p className="text-center text-yellow-100/30 text-sm italic">No vehicles available at the moment.</p>
          : <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.vehicles.map(v => (
                <button key={v.id} type="button" onClick={() => setForm(f => ({ ...f, vehicleId: v.id }))}
                  className={`text-left p-6 border transition group ${
                    form.vehicleId === v.id
                      ? "border-yellow-400/60 bg-yellow-400/5"
                      : "border-yellow-900/40 hover:border-yellow-800/60"
                  }`}>
                  <div className="space-y-3">
                    <div>
                      <p className="font-light text-base tracking-wide">{v.make} {v.model}</p>
                      <p className="text-xs text-yellow-100/30 mt-0.5 tracking-wider">{v.plateNumber}{v.color ? ` · ${v.color}` : ""}{v.year ? ` · ${v.year}` : ""}</p>
                    </div>
                    <div className="h-px bg-yellow-900/40" />
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-yellow-800">Daily rate</span>
                      <span className={`font-light text-lg ${form.vehicleId === v.id ? "text-yellow-400" : "text-yellow-600"}`}>
                        {sym}{Number(v.dailyRate).toLocaleString()}
                      </span>
                    </div>
                    {form.vehicleId === v.id && (
                      <div className="flex items-center gap-1.5 text-yellow-400 text-[10px] uppercase tracking-widest">
                        <CheckCircle2 className="w-3 h-3" /> Selected
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>}

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-yellow-900/40" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-yellow-800">Your Details</span>
          <div className="h-px flex-1 bg-yellow-900/40" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-yellow-800 mb-2">Full Name *</label>
              <input value={form.customerName} onChange={field("customerName")} placeholder="Juan dela Cruz" className={goldInput} />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-yellow-800 mb-2">Phone *</label>
              <input value={form.customerPhone} onChange={field("customerPhone")} placeholder="+63 917 123 4567" className={goldInput} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[10px] uppercase tracking-[0.25em] text-yellow-800 mb-2">Email <span className="normal-case tracking-normal text-yellow-900">(optional)</span></label>
              <input value={form.customerEmail} onChange={field("customerEmail")} placeholder="juan@email.com" type="email" className={goldInput} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-yellow-900/40" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-yellow-800">Dates</span>
            <div className="h-px flex-1 bg-yellow-900/40" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-yellow-800 mb-2">Pickup Date *</label>
              <input type="date" value={form.pickupDate} onChange={field("pickupDate")} min={dayjs().format("YYYY-MM-DD")} className={goldInput} />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-yellow-800 mb-2">Return Date *</label>
              <input type="date" value={form.returnDate} onChange={field("returnDate")} min={form.pickupDate || dayjs().format("YYYY-MM-DD")} className={goldInput} />
            </div>
          </div>

          {total > 0 && (
            <div className="text-center py-4 border-y border-yellow-900/40 space-y-1">
              <p className="text-[10px] uppercase tracking-[0.25em] text-yellow-800">{days} day{days !== 1 ? "s" : ""} × {sym}{Number(selectedVehicle?.dailyRate).toLocaleString()} per day</p>
              <p className="text-2xl font-light text-yellow-400">{sym}{total.toLocaleString()}</p>
            </div>
          )}

          <div>
            <label className="block text-[10px] uppercase tracking-[0.25em] text-yellow-800 mb-2">Notes <span className="normal-case tracking-normal text-yellow-900">(optional)</span></label>
            <textarea value={form.notes} onChange={field("notes")} rows={3} placeholder="Special requests or questions…"
              className="w-full px-0 py-3 border-b border-yellow-900/60 bg-transparent text-sm text-white placeholder-yellow-100/20 outline-none focus:border-yellow-400 transition resize-none" />
          </div>

          {error && <div className="flex items-center gap-2 px-4 py-3 border border-red-900/50 text-red-400 text-sm bg-red-500/5"><AlertCircle className="w-4 h-4 shrink-0" /> {error}</div>}

          <button type="submit" disabled={submitting}
            className="w-full py-4 border border-yellow-700 hover:border-yellow-400 hover:bg-yellow-400/5 text-yellow-400 text-xs uppercase tracking-[0.25em] transition disabled:opacity-40 flex items-center justify-center gap-3">
            {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : "Send Booking Request"}
          </button>
          <p className="text-center text-[10px] uppercase tracking-[0.2em] text-yellow-900">Request confirmed by {data.org.companyName || "the business"} after review</p>
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
    if (!form.vehicleId || !form.customerName || !form.customerPhone || !form.pickupDate || !form.returnDate) {
      setError("Please fill in all required fields."); return
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
    <div className="min-h-screen bg-[#0f0700] flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-orange-400" />
    </div>
  )

  if (notFound || !data) return (
    <div className="min-h-screen bg-[#0f0700] flex flex-col items-center justify-center gap-4 text-white p-6">
      <Car className="w-12 h-12 text-orange-400 opacity-50" />
      <p className="text-xl font-bold">Page not found</p>
      <p className="text-white/50 text-sm text-center">This booking page doesn't exist or may have been removed.</p>
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
