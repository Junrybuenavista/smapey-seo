"use client"

import { useState, useEffect } from "react"
import { templates } from "@/lib/templatesList"
import { getTemplate } from "@/lib/getTemplate"
import InternalLinks from "@/components/InternalLinks"
import {
  CheckCircle,
  FileText,
  Zap,
  Globe,
  Layers,
  Users,
  ArrowRight,
  DollarSign,
} from "lucide-react"
import Link from "next/link"
import Footer from "@/components/Footer"

export default function Page() {

  const [loadingId, setLoadingId] = useState<string | null>(null)

   type InvoiceItem = {
  name: string
  qty: number
  price: number
}
type FormType = {
  logo: string
  companyName: string
  clientName: string
  clientEmail: string
  invoiceNumber: string
  date: string
  dueDate: string
  currency: string
  items: InvoiceItem[]
  taxRate: number
  notes: string
  subtotal: number
  tax: number
  total: number
}

const [form, setForm] = useState<FormType>({
  logo: "",
  companyName: "",
  clientName: "",
  clientEmail: "",
  invoiceNumber: "INV-001",
  date: "",
  dueDate: "",
  currency: "USD",
  items: [
    { name: "Website Design", qty: 1, price: 500 },
    { name: "Hosting", qty: 1, price: 100 },
  ],
  taxRate: 0,
  notes: "",
  subtotal: 0,
  tax: 0,
  total: 600,
})
useEffect(() => {
  const today = new Date().toISOString().split("T")[0]

  setForm((prev) => ({
    ...prev,
    date: today,
  }))
}, [])
  // 🔥 AUTO CALCULATE
  useEffect(() => {
    const subtotal = form.items.reduce(
      (sum, i) => sum + i.qty * i.price,
      0
    )

    const tax = subtotal * (form.taxRate / 100)
    const total = subtotal + tax

    setForm((prev) => ({
      ...prev,
      subtotal,
      tax,
      total,
    }))
  }, [form.items, form.taxRate])

  // 🧾 UPDATE ITEM


const updateItem = <K extends keyof InvoiceItem>(
  index: number,
  field: K,
  value: InvoiceItem[K]
) => {
  const items = [...form.items]

  items[index] = {
    ...items[index],
    [field]: value,
  }

  setForm({ ...form, items })
}

  // 📥 DOWNLOAD
const downloadHTML = async (html: string) => {
  const res = await fetch("https://saas-app-jwlw.onrender.com/api/pdf/generate-pdf", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ html }),
  })

  // 🚨 IMPORTANT
  if (!res.ok) {
    throw new Error("PDF generation failed")
  }

  const blob = await res.blob()
  const url = window.URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = "invoice.pdf"
  a.click()
}

  return (
    <>
  <main className="min-h-screen bg-gray-50 p-10">

  {/* TITLE */}
<div className="text-center mb-14 max-w-3xl mx-auto">

  {/* BADGE */}
  <div className="inline-block mb-4 px-4 py-1 text-sm bg-blue-50 text-blue-600 rounded-full font-medium">
    Free Invoice Generator • No Signup Required
  </div>

  {/* MAIN TITLE */}
  <h1 className="text-4xl md:text-5xl font-bold leading-tight">
    Create & Download
    <span className="text-blue-600"> Free Invoice Templates</span>
  </h1>

  {/* SUBTEXT */}
  <p className="text-gray-600 mt-4 text-lg leading-relaxed">
    Generate professional invoices instantly using our free invoice template generator.
    Download as PDF, Word, or Excel — perfect for freelancers, agencies, and businesses.
  </p>

  {/* TRUST LINE */}
  <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-gray-500">
    <span>✔ Free & Unlimited</span>
    <span>✔ PDF Download</span>
    <span>✔ No Login Required</span>
    <span>✔ Easy to Use</span>
  </div>

</div>

  {/* 🔥 MAIN GRID */}
  <div className="grid lg:grid-cols-2 gap-10 max-w-7xl mx-auto">

    {/* ================= LEFT: FORM ================= */}
 <div className="sticky top-10 h-fit">

  <div className="bg-white p-8 rounded-2xl shadow space-y-8">

    <h2 className="text-xl font-semibold">Invoice Details</h2>

    {/* LOGO */}
    <div>
      <label className="text-sm font-medium">Company Logo</label>
      <p className="text-xs text-gray-500 mb-2">
        Upload your business logo (PNG or JPG, max 500KB). It will appear on the invoice header.
      </p>
      <input
        type="file"
        className="border p-2 w-full rounded"
        onChange={(e: any) => {
          const file = e.target.files[0]
          if (!file) return

          if (file.size > 500000) {
            alert("Logo too large (<500KB)")
            return
          }

          const reader = new FileReader()
          reader.onload = () => {
            setForm({ ...form, logo: reader.result as string })
          }
          reader.readAsDataURL(file)
        }}
      />
    </div>

    {/* BASIC INFO */}
 <div className="space-y-6">

  {/* ROW 1 */}
  <div className="grid grid-cols-2 gap-4">

    {/* INVOICE NUMBER */}
    <div>
      <label className="text-sm font-medium">Invoice Number</label>
      <p className="text-xs text-gray-500 mb-1">
        Unique identifier (e.g. INV-001)
      </p>
      <input
        className="border p-2 w-full rounded"
        value={form.invoiceNumber}
        onChange={(e) =>
          setForm({ ...form, invoiceNumber: e.target.value })
        }
      />
    </div>

    {/* INVOICE DATE */}
    <div>
      <label className="text-sm font-medium">Invoice Date</label>
      <p className="text-xs text-gray-500 mb-1">
        Date this invoice is issued
      </p>
      <input
        type="date"
        className="border p-2 w-full rounded"
        value={form.date}
        onChange={(e) =>
          setForm({ ...form, date: e.target.value })
        }
      />
    </div>

  </div>

  {/* ROW 2 */}
  <div className="grid grid-cols-2 gap-4">

    {/* DUE DATE */}
    <div>
      <label className="text-sm font-medium">Due Date</label>
      <p className="text-xs text-gray-500 mb-1">
        When payment is expected
      </p>
      <input
        type="date"
        className="border p-2 w-full rounded"
        value={form.dueDate}
        onChange={(e) =>
          setForm({ ...form, dueDate: e.target.value })
        }
      />
    </div>

    {/* OPTIONAL: EMPTY / FUTURE FIELD */}
    <div />
  </div>

</div>

    {/* COMPANY + CLIENT */}
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="text-sm font-medium">Your Company Name</label>
        <input
          className="border p-2 w-full rounded"
          value={form.companyName}
          onChange={(e) =>
            setForm({ ...form, companyName: e.target.value })
          }
        />
      </div>

      <div>
        <label className="text-sm font-medium">Client Name</label>
        <input
          className="border p-2 w-full rounded"
          value={form.clientName}
          onChange={(e) =>
            setForm({ ...form, clientName: e.target.value })
          }
        />
      </div>
    </div>

    {/* EMAIL */}
    <div>
      <label className="text-sm font-medium">Client Email</label>
      <p className="text-xs text-gray-500 mb-1">
        Optional: used for sending invoices
      </p>
      <input
        className="border p-2 w-full rounded"
        placeholder="client@email.com"
        value={form.clientEmail}
        onChange={(e) =>
          setForm({ ...form, clientEmail: e.target.value })
        }
      />
    </div>

    {/* 🌍 CURRENCY (IMPROVED) */}
    <div>
      <label className="text-sm font-medium">Currency</label>
      <p className="text-xs text-gray-500 mb-1">
        Select the currency used for pricing
      </p>
  <select
  className="border p-2 w-full rounded"
  value={form.currency}
  onChange={(e) =>
    setForm({ ...form, currency: e.target.value })
  }
>
  <option value="USD">USD ($) - US Dollar</option>
  <option value="PHP">PHP (₱) - Philippine Peso</option>
  <option value="EUR">EUR (€) - Euro</option>
  <option value="GBP">GBP (£) - British Pound</option>
  <option value="AUD">AUD ($) - Australian Dollar</option>
  <option value="CAD">CAD ($) - Canadian Dollar</option>
  <option value="SGD">SGD ($) - Singapore Dollar</option>
  <option value="JPY">JPY (¥) - Japanese Yen</option>
  <option value="INR">INR (₹) - Indian Rupee</option>

  {/* 🔥 NEW (HIGH VALUE) */}
  <option value="CNY">CNY (¥) - Chinese Yuan</option>
  <option value="HKD">HKD ($) - Hong Kong Dollar</option>
  <option value="NZD">NZD ($) - New Zealand Dollar</option>
  <option value="ZAR">ZAR (R) - South African Rand</option>
  <option value="BRL">BRL (R$) - Brazilian Real</option>
  <option value="MXN">MXN ($) - Mexican Peso</option>
  <option value="AED">AED (د.إ) - UAE Dirham</option>
  <option value="SAR">SAR (﷼) - Saudi Riyal</option>
  <option value="KRW">KRW (₩) - South Korean Won</option>
  <option value="THB">THB (฿) - Thai Baht</option>
  <option value="IDR">IDR (Rp) - Indonesian Rupiah</option>
  <option value="MYR">MYR (RM) - Malaysian Ringgit</option>
  <option value="VND">VND (₫) - Vietnamese Dong</option>
</select>
    </div>

    {/* ITEMS */}
    <div>
      <h3 className="font-semibold">Items</h3>
      <p className="text-xs text-gray-500 mb-2">
        Add products or services included in the invoice
      </p>

      {form.items.map((item, index) => (
        <div key={index} className="grid grid-cols-4 gap-2 mt-2">
          <input
            className="border p-2 rounded"
            placeholder="Item name"
            value={item.name}
            onChange={(e) =>
              updateItem(index, "name", e.target.value)
            }
          />
          <input
            type="number"
            className="border p-2 rounded"
            placeholder="Qty"
            value={item.qty}
            onChange={(e) =>
              updateItem(index, "qty", Number(e.target.value))
            }
          />
          <input
            type="number"
            className="border p-2 rounded"
            placeholder="Price"
            value={item.price}
            onChange={(e) =>
              updateItem(index, "price", Number(e.target.value))
            }
          />
          <button
            onClick={() => {
              const items = form.items.filter((_, i) => i !== index)
              setForm({ ...form, items })
            }}
            className="text-red-500 text-sm"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        onClick={() =>
          setForm({
            ...form,
            items: [...form.items, { name: "", qty: 1, price: 0 }],
          })
        }
        className="text-blue-600 mt-3 text-sm"
      >
        + Add Item
      </button>
    </div>

    {/* TAX */}
    <div>
      <label className="text-sm font-medium">Tax Rate (%)</label>
      <p className="text-xs text-gray-500 mb-1">
        Example: 12 for 12% VAT
      </p>
      <input
        type="number"
        className="border p-2 w-full rounded"
        value={form.taxRate}
        onChange={(e) =>
          setForm({ ...form, taxRate: Number(e.target.value) })
        }
      />
    </div>

    {/* NOTES */}
    <div>
      <label className="text-sm font-medium">Notes</label>
      <p className="text-xs text-gray-500 mb-1">
        Optional message (e.g. thank you note or payment terms)
      </p>
      <textarea
        className="border p-2 w-full rounded"
        value={form.notes}
        onChange={(e) =>
          setForm({ ...form, notes: e.target.value })
        }
      />
    </div>

    {/* TOTAL */}
    <div className="text-right text-lg font-bold border-t pt-4">
      Total: {form.currency} {Number(form.total).toLocaleString()}
    </div>

  </div>
</div>

   {/* ================= RIGHT: TEMPLATES ================= */}
<div className="bg-white p-6 rounded-2xl shadow flex flex-col h-[calc(100vh-120px)]">

  <h2 className="text-lg font-semibold mb-4">
    Choose Template
  </h2>

  {/* 🔥 SCROLL AREA (NOW TRUE FULL HEIGHT) */}
  <div className="flex-1 overflow-y-auto pr-2">

    <div className="grid grid-cols-1 gap-4 pb-4">

      {templates.map((t) => (
        <div
          key={t.id}
          className="bg-gray-50 rounded-xl hover:shadow-md transition p-3"
        >
          <img
            src={t.image}
            alt={t.name}
            className="rounded-lg mb-2"
          />

          <p className="text-sm font-semibold text-center">
            {t.name}
          </p>

          <button
            onClick={async () => {
              setLoadingId(t.id) // ✅ START LOADING

              try {
                const html = getTemplate(t.id, form)
                await downloadHTML(html) // ✅ WAIT
              } catch (err) {
                console.error("PDF error:", err)
              }

              setLoadingId(null) // ✅ STOP LOADING
            }}
            disabled={loadingId === t.id}
            className={`mt-2 w-full py-2 rounded text-sm text-white transition
              ${
                loadingId === t.id
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }
            `}
          >
            {loadingId === t.id ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Generating...
              </span>
            ) : (
              "Use Template"
            )}
          </button>
                  </div>
                ))}

              </div>

            </div>

          </div>

      </div>


  <div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

  {/* WHY USE */}
<section className="max-w-6xl mx-auto mt-20 space-y-12 py-6">
  <div className="bg-white p-8 rounded-2xl shadow">
    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
      <Zap className="text-blue-600" /> Why Use Our Free Invoice Template?
    </h2>

    <div className="grid md:grid-cols-2 gap-6 text-gray-600">

      <div className="flex gap-3">
        <CheckCircle className="text-blue-600 mt-1" />
        <div>
          <h3 className="font-semibold text-black">
            Save Time & Avoid Errors
          </h3>
          <p className="text-sm">
            Automatically calculate totals, taxes, and subtotals without manual work.
          </p>
        </div>
      </div>
      <div className="flex gap-3">
  <DollarSign  className="text-blue-600 mt-1" />
  <div>
    <h3 className="font-semibold text-black">
      Multi-Currency Support
    </h3>
    <p className="text-sm">
      Create invoices in USD, PHP, EUR, GBP, and more — perfect for international clients.
    </p>
  </div>
</div>
      <div className="flex gap-3">
        <CheckCircle className="text-blue-600 mt-1" />
        <div>
          <h3 className="font-semibold text-black">
            Professional Look
          </h3>
          <p className="text-sm">
            Clean and modern invoice templates that impress your clients.
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <CheckCircle className="text-blue-600 mt-1" />
        <div>
          <h3 className="font-semibold text-black">
            No Signup Required
          </h3>
          <p className="text-sm">
            Generate and download invoices instantly without creating an account.
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <Globe className="text-blue-600 mt-1" />
        <div>
          <h3 className="font-semibold text-black">
            Global Ready
          </h3>
          <p className="text-sm">
            Supports multiple currencies and tax systems like VAT and GST.
          </p>
        </div>
      </div>

    </div>
  </div>

  {/* WHAT INCLUDED */}
  <div className="bg-white p-8 rounded-2xl shadow">
    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
      <FileText className="text-blue-600" /> What Should an Invoice Include?
    </h2>

    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">

      <p>✔ Invoice number and issue date</p>
      <p>✔ Business name and logo</p>
      <p>✔ Client details and contact info</p>
      <p>✔ List of products or services</p>
      <p>✔ Quantity, price, and totals</p>
      <p>✔ Tax (VAT/GST) and subtotal</p>
      <p>✔ Payment terms and due date</p>
      <p>✔ Notes or instructions</p>

    </div>

    <p className="text-gray-500 text-sm mt-4">
      Our invoice generator ensures you never miss important details.
    </p>
  </div>

  {/* HOW IT WORKS */}
  <div className="bg-white p-8 rounded-2xl shadow">
    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
      <Layers className="text-blue-600" /> How It Works
    </h2>

    <div className="grid md:grid-cols-3 gap-6 text-center">

      <div>
        <div className="mb-2 flex justify-center">
          <Users className="text-blue-600" />
        </div>
        <h3 className="font-semibold">1. Fill Details</h3>
        <p className="text-sm text-gray-600">
          Enter your business and client information.
        </p>
      </div>

      <div>
        <div className="mb-2 flex justify-center">
          <FileText className="text-blue-600" />
        </div>
        <h3 className="font-semibold">2. Choose Template</h3>
        <p className="text-sm text-gray-600">
          Pick a professional invoice design.
        </p>
      </div>

      <div>
        <div className="mb-2 flex justify-center">
          <ArrowRight className="text-blue-600" />
        </div>
        <h3 className="font-semibold">3. Download</h3>
        <p className="text-sm text-gray-600">
          Export your invoice instantly as PDF.
        </p>
      </div>

    </div>
  </div>
    
  {/* USE CASES */}
  <div className="bg-white p-8 rounded-2xl shadow">
    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
      <Users className="text-blue-600" /> Invoice Templates for Every Business
    </h2>

    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">

      <p>✔ Freelance invoice template</p>
      <p>✔ Contractor invoice template</p>
      <p>✔ Agency invoice template</p>
      <p>✔ Small business invoice template</p>
      <p>✔ Consultant invoice template</p>
      <p>✔ Service invoice template</p>

    </div>
  </div>


  {/* CTA */}
      <div className="bg-blue-600 text-white p-8 rounded-2xl shadow text-center">
            <h2 className="text-2xl font-bold mb-3">
              Want to Manage Invoices Like a Pro?
            </h2>

            <p className="text-blue-100 mb-6">
              Save invoices, track payments, and automate billing with Smapey.
            </p>

            <Link
          href="https://app.smapey.com/register?product=INVOICE&plan=FREE"
          className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Create Free Account
        </Link>
      </div>
    </section>

  <section className="max-w-6xl mx-auto mt-20 space-y-12 py-6">

  {/* 🔥 INTRO */}
  <div className="bg-white p-8 rounded-2xl shadow">
    <h2 className="text-2xl font-bold mb-4">
      Free Invoice Template Generator
    </h2>
    <p className="text-gray-600 leading-relaxed">
      Create professional invoices instantly using our free invoice template generator.
      Whether you need a PDF invoice, Word template, or simple billing format,
      Smapey helps you generate clean, modern invoices in seconds — no signup required.
    </p>
  </div>

  {/* 🔥 FEATURES */}
  <div className="grid md:grid-cols-3 gap-6">

    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="font-semibold mb-2">
        Free Invoice Template PDF
      </h3>
      <p className="text-sm text-gray-600">
        Download ready-to-use invoice templates in PDF format. Perfect for freelancers,
        agencies, and small businesses.
      </p>
    </div>

    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="font-semibold mb-2">
        Invoice Template for Word & Excel
      </h3>
      <p className="text-sm text-gray-600">
        Easily customize your invoices using formats compatible with Microsoft Word and Excel.
      </p>
    </div>

    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="font-semibold mb-2">
        Instant Invoice Generator
      </h3>
      <p className="text-sm text-gray-600">
        Fill out your invoice details and download instantly — no design skills required.
      </p>
    </div>

  </div>

  {/* 🔥 FAQ (BIG FOR SEO) */}
  <div className="bg-white p-8 rounded-2xl shadow space-y-6">
    <h2 className="text-2xl font-bold">
      Frequently Asked Questions
    </h2>

    <div>
      <h3 className="font-semibold">
        Is this invoice template really free?
      </h3>
      <p className="text-gray-600 text-sm mt-1">
        Yes, you can create and download invoices completely free with no hidden fees.
      </p>
    </div>

    <div>
      <h3 className="font-semibold">
        Can I download invoice as PDF?
      </h3>
      <p className="text-gray-600 text-sm mt-1">
        Yes, all invoices generated can be downloaded as PDF instantly.
      </p>
    </div>

    <div>
      <h3 className="font-semibold">
        Do I need to create an account?
      </h3>
      <p className="text-gray-600 text-sm mt-1">
        No signup required. Just fill in your details and download your invoice.
      </p>
    </div>

  </div>

</section>
  <InternalLinks />
</main>
<Footer/></>
  )
}