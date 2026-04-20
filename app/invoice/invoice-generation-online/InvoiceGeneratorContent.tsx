"use client"

import { useState, useEffect, useRef } from "react"
import { FileText, Download, DollarSign,User, ListChecks, Calculator,ChevronDown } from "lucide-react"
import InternalLinks from "@/components/InternalLinks"
export default function FreeInvoiceGenerator() {

  //////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////

  const [open, setOpen] = useState<number | null>(0)

  const faqs = [
    {
      q: "Is this invoice generator free to use?",
      a: "Yes, our invoice generator is completely free with no hidden fees."
    },
    {
      q: "Can I download invoices as PDF?",
      a: "Yes, you can instantly download your invoice as a professional PDF file."
    },
    {
      q: "Can I add my company logo?",
      a: "Yes, you can upload your logo to personalize your invoice."
    },
    {
      q: "Does it support multiple currencies?",
      a: "Yes, you can generate invoices in different currencies including USD, PHP, EUR, and more."
    }
  ]

  const [invoice, setInvoice] = useState<any>({
    companyName: "",
    logoUrl: "",
    clientName: "",
    clientEmail: "",
    invoiceNumber: "0001",
    dueDate: "",
    currency: "USD",
    items: [
      { id: 1, name: "", quantity: 1, price: 0 }
    ],
    taxRate: 0,
    notes: ""
  })

  const invoiceRef = useRef<HTMLDivElement>(null)

  //////////////////////////////////////////////////////
  // CLEANUP
  //////////////////////////////////////////////////////

  useEffect(() => {
    return () => {
      if (invoice.logoUrl) {
        URL.revokeObjectURL(invoice.logoUrl)
      }
    }
  }, [invoice.logoUrl])

  //////////////////////////////////////////////////////
  // HANDLERS
  //////////////////////////////////////////////////////

  const updateField = (field: string, value: any) => {
    setInvoice((prev: any) => ({
      ...prev,
      [field]: value
    }))
  }

  const updateItem = (index: number, field: string, value: any) => {
    const updated = [...invoice.items]
    updated[index][field] = value
    setInvoice({ ...invoice, items: updated })
  }

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [
        ...invoice.items,
        { id: Date.now(), name: "", quantity: 1, price: 0 }
      ]
    })
  }

  const removeItem = (index: number) => {
    const updated = invoice.items.filter((_: any, i: number) => i !== index)
    setInvoice({ ...invoice, items: updated })
  }

  //////////////////////////////////////////////////////
  // LOGO UPLOAD
  //////////////////////////////////////////////////////

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const url = URL.createObjectURL(file)
    updateField("logoUrl", url)
  }

  //////////////////////////////////////////////////////
  // PDF DOWNLOAD
  //////////////////////////////////////////////////////

  const downloadPDF = async () => {
    if (!invoiceRef.current) return

    const html2pdf = (await import("html2pdf.js")).default

const opt = {
  margin: 10,
  filename: `invoice-${invoice.invoiceNumber}.pdf`,
  image: { type: "jpeg" as const, quality: 0.98 },
  html2canvas: { scale: 2 },
  jsPDF: {
    unit: "mm",
    format: "a4",
    orientation: "portrait" as const
  }
}

    html2pdf().set(opt).from(invoiceRef.current).save()
  }

  //////////////////////////////////////////////////////
  // CALCULATIONS
  //////////////////////////////////////////////////////

  const subtotal = invoice.items.reduce(
    (sum: number, item: any) =>
      sum + item.quantity * item.price,
    0
  )

  const taxAmount = subtotal * (invoice.taxRate / 100)
  const total = subtotal + taxAmount

const formatMoney = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: invoice.currency
  }).format(value)
}

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

<section className="relative overflow-hidden py-24 px-6">

  {/* BACKGROUND GRADIENT */}
  <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white -z-10" />

  <div className="max-w-5xl mx-auto text-center">

    {/* BADGE */}
    <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-1.5 rounded-full text-sm mb-6">
      🚀 Free Invoice Tool • No Signup Required
    </div>

    {/* HEADLINE */}
<h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
  Invoice Generation Online for Freelancers & Businesses
</h1>

    {/* SUBTEXT */}
    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
      Free invoice generator for freelancers and businesses. Add your logo, items, taxes, supports multiple currencies, and download clean PDF invoices instantly.
    </p>

    {/* CTA BUTTONS */}
    <div className="flex flex-col sm:flex-row justify-center gap-4">

      <button
  onClick={() => {
    document
      .getElementById("invoice-generator")
      ?.scrollIntoView({ behavior: "smooth" })
  }}
  className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition"
>
  Create Invoice Now
</button>

      <button 
        onClick={() => {
    document
      .getElementById("how-to")
      ?.scrollIntoView({ behavior: "smooth" })
  }}
      className="border px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition">
        How To Create Invoice
      </button>

    </div>

    {/* TRUST TEXT */}
    <p className="text-sm text-gray-400 mt-6">
      Trusted by freelancers & small businesses worldwide
    </p>

  </div>

</section>

<section className="max-w-6xl mx-auto px-6 py-16">

  <div className="grid md:grid-cols-3 gap-8">

    {/* CARD 1 */}
    <div className="group bg-white border rounded-2xl p-6 shadow-sm hover:shadow-lg transition">

      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 mb-4 group-hover:bg-black transition">
        <FileText className="w-6 h-6 text-gray-700 group-hover:text-white transition" />
      </div>

      <h3 className="font-semibold text-lg mb-2">
        Easy Invoice Creation
      </h3>

      <p className="text-gray-600 text-sm leading-relaxed">
        Create professional invoices in minutes with a simple and intuitive interface designed for freelancers and businesses.
      </p>

    </div>

    {/* CARD 2 */}
    <div className="group bg-white border rounded-2xl p-6 shadow-sm hover:shadow-lg transition">

      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 mb-4 group-hover:bg-black transition">
        <Download className="w-6 h-6 text-gray-700 group-hover:text-white transition" />
      </div>

      <h3 className="font-semibold text-lg mb-2">
        Download as PDF
      </h3>

      <p className="text-gray-600 text-sm leading-relaxed">
        Export your invoice instantly as a clean, professional PDF ready to send to your clients.
      </p>

    </div>

    {/* CARD 3 */}
    <div className="group bg-white border rounded-2xl p-6 shadow-sm hover:shadow-lg transition">

      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 mb-4 group-hover:bg-black transition">
        <DollarSign className="w-6 h-6 text-gray-700 group-hover:text-white transition" />
      </div>

      <h3 className="font-semibold text-lg mb-2">
        Multi-Currency Support
      </h3>

      <p className="text-gray-600 text-sm leading-relaxed">
        Generate invoices in multiple currencies including USD, PHP, EUR, GBP, and more for global clients.
      </p>

    </div>

  </div>

</section>


      <div id="invoice-generator" className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">

        {/* ========================= */}
        {/* FORM */}
        {/* ========================= */}

        <div className="bg-white p-6 rounded-lg shadow space-y-5">

          <h2 className="text-xl font-bold">
            Invoice Details
          </h2>

          {/* LOGO */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Upload Logo
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
  <label className="block text-sm font-medium mb-1">
    Invoice Number
  </label>

  <input
    className="w-full border p-2 rounded"
    value={invoice.invoiceNumber}
    onChange={(e) => updateField("invoiceNumber", e.target.value)}
  />
</div>

          {/* COMPANY */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Company Name
            </label>
            <input
              className="w-full border p-2 rounded"
              value={invoice.companyName}
              onChange={(e) => updateField("companyName", e.target.value)}
            />
          </div>

          {/* CLIENT */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Client Name
            </label>
            <input
              className="w-full border p-2 rounded"
              value={invoice.clientName}
              onChange={(e) => updateField("clientName", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Client Email
            </label>
            <input
              className="w-full border p-2 rounded"
              value={invoice.clientEmail}
              onChange={(e) => updateField("clientEmail", e.target.value)}
            />
          </div>

          {/* DATE */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Due Date
            </label>
            <input
              type="date"
              className="w-full border p-2 rounded"
              value={invoice.dueDate}
              onChange={(e) => updateField("dueDate", e.target.value)}
            />
          </div>

          <div>
  <label className="block text-sm font-medium mb-1">
    Currency
  </label>

  <select
    className="w-full border p-2 rounded"
    value={invoice.currency}
    onChange={(e) => updateField("currency", e.target.value)}
  >
    {/* 🌎 MOST USED */}
    <option value="USD">USD ($) - US Dollar</option>
    <option value="PHP">PHP (₱) - Philippine Peso</option>
    <option value="EUR">EUR (€) - Euro</option>
    <option value="GBP">GBP (£) - British Pound</option>
    <option value="JPY">JPY (¥) - Japanese Yen</option>

    {/* 🌏 ASIA */}
    <option value="SGD">SGD (S$) - Singapore Dollar</option>
    <option value="HKD">HKD (HK$) - Hong Kong Dollar</option>
    <option value="CNY">CNY (¥) - Chinese Yuan</option>
    <option value="INR">INR (₹) - Indian Rupee</option>
    <option value="MYR">MYR (RM) - Malaysian Ringgit</option>
    <option value="THB">THB (฿) - Thai Baht</option>
    <option value="IDR">IDR (Rp) - Indonesian Rupiah</option>
    <option value="KRW">KRW (₩) - South Korean Won</option>

    {/* 🌍 EUROPE */}
    <option value="CHF">CHF (CHF) - Swiss Franc</option>
    <option value="SEK">SEK (kr) - Swedish Krona</option>
    <option value="NOK">NOK (kr) - Norwegian Krone</option>
    <option value="DKK">DKK (kr) - Danish Krone</option>

    {/* 🌎 AMERICAS */}
    <option value="CAD">CAD (C$) - Canadian Dollar</option>
    <option value="AUD">AUD (A$) - Australian Dollar</option>
    <option value="NZD">NZD (NZ$) - New Zealand Dollar</option>
    <option value="MXN">MXN ($) - Mexican Peso</option>
    <option value="BRL">BRL (R$) - Brazilian Real</option>

    {/* 🌍 MIDDLE EAST */}
    <option value="AED">AED (د.إ) - UAE Dirham</option>
    <option value="SAR">SAR (﷼) - Saudi Riyal</option>
  </select>
</div>

          {/* ITEMS */}
          <div>
            <h3 className="font-semibold mb-3 text-lg">
              Items
            </h3>

            <div className="grid grid-cols-4 gap-2 mb-2 text-xs text-gray-500 px-1">
              <span>Item</span>
              <span className="text-right">Qty</span>
              <span className="text-right">Price</span>
              <span></span>
            </div>

            {invoice.items.map((item: any, i: number) => (
              <div key={item.id} className="grid grid-cols-4 gap-2 mb-2">

                <input
                  className="border p-2 rounded"
                  value={item.name}
                  onChange={(e) => updateItem(i, "name", e.target.value)}
                />

                <input
                  type="number"
                  className="border p-2 rounded text-right"
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(i, "quantity", Number(e.target.value))
                  }
                />

                <input
                  type="number"
                  className="border p-2 rounded text-right"
                  value={item.price}
                  onChange={(e) =>
                    updateItem(i, "price", Number(e.target.value))
                  }
                />

                <button
                  onClick={() => removeItem(i)}
                  className="text-red-500 text-sm"
                >
                  ✕
                </button>

              </div>
            ))}

            <button
              onClick={addItem}
              className="text-blue-600 text-sm mt-2 hover:underline"
            >
              + Add Item
            </button>
          </div>

          {/* TAX */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Tax Rate (%)
            </label>

            <input
              type="number"
              className="w-full border p-2 rounded"
              value={invoice.taxRate}
              onChange={(e) =>
                updateField("taxRate", Number(e.target.value))
              }
            />
          </div>

          {/* NOTES */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Notes
            </label>

            <textarea
              className="w-full border p-2 rounded"
              rows={4}
              value={invoice.notes}
              onChange={(e) => updateField("notes", e.target.value)}
            />
          </div>

          {/* DOWNLOAD BUTTON */}
          <button
            onClick={downloadPDF}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            Download PDF
          </button>

        </div>

        {/* ========================= */}
        {/* PREVIEW */}
        {/* ========================= */}

        <div
          ref={invoiceRef}
          className="bg-white p-6 rounded-lg shadow print:shadow-none"
        >

          {/* HEADER */}
          <div className="flex items-center gap-4 mb-6">

            {invoice.logoUrl && (
              <img
                src={invoice.logoUrl}
                alt="logo"
                className="h-12 object-contain"
              />
            )}

            <div>
              <h2 className="text-2xl font-bold">
                {invoice.companyName || "Your Company"}
              </h2>

              <p className="text-sm text-gray-500">
                Invoice #{invoice.invoiceNumber}
              </p>
            </div>

          </div>

          {/* CLIENT */}
           <div>
    <p className="text-sm text-gray-500">
      Billed To
    </p>
    <p className="font-medium">{invoice.clientName}</p>
    <p className="text-sm text-gray-500">
      {invoice.clientEmail}
    </p>
  </div>

  <div className="text-right">
    <p className="text-sm text-gray-500">
      Due Date
    </p>
    <p className="font-medium">
      {invoice.dueDate
        ? new Date(invoice.dueDate).toLocaleDateString()
        : "-"}
    </p>
  </div>


          {/* TABLE */}
    {/* TABLE + TOTAL WRAPPER */}
<div className="mt-8">

  {/* TABLE */}
  <table className="w-full text-sm border-t">

    <thead>
      <tr className="text-gray-500">
        <th className="text-left py-3">Item</th>
        <th className="text-right">Qty</th>
        <th className="text-right">Price</th>
        <th className="text-right">Total</th>
      </tr>
    </thead>

    <tbody>
      {invoice.items.map((item: any) => {
        const lineTotal = item.quantity * item.price

        return (
          <tr key={item.id} className="border-t">
            <td className="py-3">{item.name || "-"}</td>
            <td className="text-right">{item.quantity}</td>
            <td className="text-right">{formatMoney(item.price)}</td>
            <td className="text-right font-medium">
              {formatMoney(lineTotal)}
            </td>
          </tr>
        )
      })}
    </tbody>

  </table>

  {/* TOTALS */}
  <div className="flex justify-end mt-6">

    <div className="w-full max-w-xs space-y-2">

      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Subtotal</span>
        <span>{formatMoney(subtotal)}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-gray-500">
          Tax ({invoice.taxRate}%)
        </span>
        <span>{formatMoney(taxAmount)}</span>
      </div>

      <div className="border-t pt-3 flex justify-between text-lg font-bold">
        <span>Total</span>
        <span>{formatMoney(total)}</span>
      </div>

    </div>

  </div>

</div>

          {/* NOTES */}
          {invoice.notes && (
            <p className="mt-6 text-sm text-gray-600">
              {invoice.notes}
            </p>
          )}

        </div>

      </div>

 <section id="how-to" className="bg-gray-50 py-20">

  <div className="max-w-5xl mx-auto px-6">

    {/* HEADER */}
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
      How to Create an Invoice Online
    </h2>

    {/* STEPS */}
    <div className="space-y-6">

      {/* STEP 1 */}
      <div className="flex items-start gap-4 bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition">

        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white font-semibold">
          1
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <User className="w-4 h-4 text-gray-500" />
            <h3 className="font-semibold">
              Enter your business details
            </h3>
          </div>
          <p className="text-gray-600 text-sm">
            Add your company name and upload your logo for a professional look.
          </p>
        </div>

      </div>

      {/* STEP 2 */}
      <div className="flex items-start gap-4 bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition">

        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white font-semibold">
          2
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <User className="w-4 h-4 text-gray-500" />
            <h3 className="font-semibold">
              Add client information
            </h3>
          </div>
          <p className="text-gray-600 text-sm">
            Include your client’s name and email to personalize the invoice.
          </p>
        </div>

      </div>

      {/* STEP 3 */}
      <div className="flex items-start gap-4 bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition">

        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white font-semibold">
          3
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <ListChecks className="w-4 h-4 text-gray-500" />
            <h3 className="font-semibold">
              Add items and pricing
            </h3>
          </div>
          <p className="text-gray-600 text-sm">
            List your services or products along with quantity and price.
          </p>
        </div>

      </div>

      {/* STEP 4 */}
      <div className="flex items-start gap-4 bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition">

        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white font-semibold">
          4
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calculator className="w-4 h-4 text-gray-500" />
            <h3 className="font-semibold">
              Apply tax and totals
            </h3>
          </div>
          <p className="text-gray-600 text-sm">
            Automatically calculate totals and taxes for accurate billing.
          </p>
        </div>

      </div>

      {/* STEP 5 */}
      <div className="flex items-start gap-4 bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition">

        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white font-semibold">
          5
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <Download className="w-4 h-4 text-gray-500" />
            <h3 className="font-semibold">
              Download your invoice
            </h3>
          </div>
          <p className="text-gray-600 text-sm">
            Export your invoice as a PDF and send it directly to your client.
          </p>
        </div>

      </div>

    </div>

  </div>

</section>

<section className="bg-gray-50 py-20">

      <div className="max-w-3xl mx-auto px-6">

        {/* HEADER */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>

        {/* FAQ LIST */}
        <div className="space-y-4">

          {faqs.map((item, i) => (
            <div
              key={i}
              className="bg-white border rounded-xl shadow-sm overflow-hidden"
            >

              {/* QUESTION */}
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center p-5 text-left"
              >

                <span className="font-medium">
                  {item.q}
                </span>

                <ChevronDown
                  className={`w-5 h-5 transition ${
                    open === i ? "rotate-180" : ""
                  }`}
                />

              </button>

              {/* ANSWER */}
              {open === i && (
                <div className="px-5 pb-5 text-sm text-gray-600">
                  {item.a}
                </div>
              )}

            </div>
          ))}

        </div>

      </div>

    </section>

           <InternalLinks />
          
    </div>

    
  )
}