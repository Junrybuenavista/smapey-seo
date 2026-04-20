"use client"
import Footer from "@/components/Footer"

export default function InvoiceExamplePage() {
  return (
    <>
    <div className="bg-gray-50 min-h-screen">

      {/* HERO */}
      <section className="mt-20 text-center max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold leading-tight">
          Invoice Example (Free Template for Freelancers & Businesses)
        </h1>

        <p className="mt-4 text-gray-600">
          See a real-world invoice example with taxes, payment methods, and professional structure.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <a
            href="/invoice/invoice-generation-online"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition font-semibold"
          >
            Free Genarator
          </a>

          <a
            href="/invoice/free-invoice-template"
            className="border px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Free Templates
          </a>
        </div>
      </section>

      {/* INVOICE PREVIEW */}
      <section
        id="example"
        className="mt-20 max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 border"
      >
        <h2 className="text-xl font-semibold mb-6">Professional Invoice Example</h2>

        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <div>
            <p className="font-bold text-lg">Smapey Solutions</p>
            <p className="text-sm text-gray-500">hello@app.smapey.com</p>
            <p className="text-sm text-gray-500">Davao City, Philippines</p>
          </div>

          <div className="text-right">
            <p className="font-bold text-lg">INVOICE</p>
            <p className="text-sm text-gray-500">INV-2026-0001</p>
            <p className="text-sm text-gray-500">Issue: Aug 1, 2026</p>
            <p className="text-sm text-gray-500">Due: Aug 7, 2026</p>
            <span className="inline-block mt-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
              Pending
            </span>
          </div>
        </div>

        {/* CLIENT */}
        <div className="mb-6">
          <p className="font-semibold">Billed To:</p>
          <p>Juan Dela Cruz</p>
          <p className="text-gray-500 text-sm">juan@email.com</p>
        </div>

        {/* TABLE */}
        <table className="w-full text-sm border-t border-b">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="py-2">Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Tax</th>
              <th className="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="py-2">Website Development</td>
              <td>1</td>
              <td>$500</td>
              <td>$60</td>
              <td className="text-right">$560</td>
            </tr>
            <tr className="border-t">
              <td className="py-2">Hosting (1 year)</td>
              <td>1</td>
              <td>$100</td>
              <td>$12</td>
              <td className="text-right">$112</td>
            </tr>
          </tbody>
        </table>

        {/* TOTAL */}
        <div className="flex justify-end mt-6">
          <div className="text-right">
            <p className="text-gray-600">Subtotal: $600</p>
            <p className="text-gray-600">Tax (12%): $72</p>
            <p className="text-lg font-bold text-blue-600">Total: $672</p>
          </div>
        </div>

        {/* PAYMENT */}
        <div className="mt-8 border-t pt-6 text-sm">
          <p className="font-semibold mb-2">Payment Methods:</p>
          <p>GCash: 09123456789</p>
          <p>PayPal: paypal@app.smapey.com</p>
          <p>Bank: BPI - 1234 5678 90</p>

          <p className="mt-4 text-gray-600">
            Terms: Payment due within 7 days. Late payments may incur additional fees.
          </p>
        </div>
      </section>

      {/* EDUCATIONAL SECTION (SEO BOOST) */}
      <section className="mt-20 max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center">
          What Should a Proper Invoice Include?
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Info
            title="Invoice Number"
            desc="Unique identifier like INV-2026-0001 for tracking and compliance."
          />
          <Info
            title="Due Date"
            desc="Clearly defines when payment is expected."
          />
          <Info
            title="Taxes"
            desc="VAT or GST must be included depending on your country."
          />
          <Info
            title="Payment Methods"
            desc="Include GCash, bank, or PayPal for faster payments."
          />
        </div>
      </section>

      {/* CALCULATION EXPLAINED */}
<section className="mt-20 max-w-4xl mx-auto px-4">
  <h2 className="text-2xl font-bold text-center">
    How Invoice Total is Calculated
  </h2>

  <div className="mt-8 bg-white p-6 rounded-xl border shadow">
    <p className="text-sm text-gray-600">
      Subtotal = Sum of all items  
    </p>
    <p className="text-sm text-gray-600">
      Tax = Subtotal × Tax Rate (e.g., 12% VAT)
    </p>
    <p className="text-sm text-gray-600">
      Total = Subtotal + Tax - Discounts
    </p>

    <div className="mt-4 text-sm">
      <p>Example:</p>
      <p>$600 + $72 VAT = <b>$672 Total</b></p>
    </div>
  </div>
</section>

{/* COMPLIANCE */}
<section className="mt-20 max-w-5xl mx-auto px-4">
  <h2 className="text-2xl font-bold text-center">
    Invoice Requirements by Country
  </h2>

  <div className="grid md:grid-cols-3 gap-6 mt-8">
    <Info
      title="Philippines"
      desc="Invoices must include TIN, VAT (12%), and registered business details."
    />
    <Info
      title="United States"
      desc="Sales tax varies by state. No federal VAT system."
    />
    <Info
      title="Europe"
      desc="VAT required with strict invoice numbering and compliance rules."
    />
  </div>
</section>

{/* MISTAKES */}
<section className="mt-20 max-w-4xl mx-auto px-4">
  <h2 className="text-2xl font-bold text-center">
    Common Invoice Mistakes to Avoid
  </h2>

  <div className="mt-8 space-y-4 text-sm text-gray-700">
    <p>❌ Missing invoice number</p>
    <p>❌ No due date</p>
    <p>❌ Incorrect tax calculation</p>
    <p>❌ No payment method</p>
    <p>❌ Unclear item descriptions</p>
  </div>
</section>

{/* FEATURES */}
<section className="mt-20 max-w-5xl mx-auto px-4">
  <h2 className="text-2xl font-bold text-center">
    Smart Invoice Features You Need
  </h2>

  <div className="grid md:grid-cols-2 gap-6 mt-8">
    <Card
      title="Auto Invoice Generation"
      desc="Automatically create invoices for subscriptions."
    />
    <Card
      title="Recurring Billing"
      desc="Charge clients monthly or yearly."
    />
    <Card
      title="Payment Tracking"
      desc="Track paid, pending, and overdue invoices."
    />
    <Card
      title="PDF Export"
      desc="Download professional invoices instantly."
    />
  </div>
</section>

      {/* BENEFITS */}
      <section className="mt-20 max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center">
          Why Use a Professional Invoice?
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card title="Get Paid Faster" desc="Clear invoices reduce confusion." />
          <Card title="Build Trust" desc="Professional invoices increase credibility." />
          <Card title="Stay Compliant" desc="Avoid legal and tax issues." />
        </div>
      </section>

      {/* COMPARISON */}
<section className="mt-20 max-w-5xl mx-auto px-4">
  <h2 className="text-2xl font-bold text-center">
    Invoice Example vs Template vs Generator
  </h2>

  <div className="overflow-x-auto mt-8">
    <table className="w-full text-sm border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-3 text-left">Feature</th>
          <th>Example</th>
          <th>Template</th>
          <th>Generator</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-t">
          <td className="p-3">Editable</td>
          <td>No</td>
          <td>Yes</td>
          <td>Yes</td>
        </tr>
        <tr className="border-t">
          <td className="p-3">Auto Calculations</td>
          <td>No</td>
          <td>No</td>
          <td>Yes</td>
        </tr>
        <tr className="border-t">
          <td className="p-3">Best For</td>
          <td>Learning</td>
          <td>Manual use</td>
          <td>Fast invoicing</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
{/* INTERNAL LINKS */}
<section className="mt-20 max-w-4xl mx-auto px-4 text-center">
  <h2 className="text-xl font-bold">
    Related Invoice Resources
  </h2>

  <div className="mt-6 flex flex-wrap justify-center gap-4 text-blue-600">
    <a href="/invoice/free-invoice-template" className="hover:underline">
      Free Invoice Templates
    </a>
    <a href="/invoice/invoice-generation-online" className="hover:underline">
      Invoice Generator
    </a>
    <a href="/invoice/how-to-send-invoice" className="hover:underline">
      How to send Invoice
    </a>
  </div>
</section>
      

      {/* CTA */}
      <section className="mt-24 bg-blue-600 text-white text-center py-14 px-4">
        <h2 className="text-3xl font-bold">
          Start Creating Invoices in Seconds
        </h2>

        <p className="mt-3 text-blue-100">
          Simple invoicing built for freelancers and SaaS businesses.
        </p>

        <a
          href="/invoice/https://app.smapey.com/register?product=INVOICE&plan=FREE"
          className="inline-block mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Try Smapey Free
        </a>
      </section>
    </div>
    <Footer /></>
  )
}

/* CARD */
function Card({ title, desc }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow border">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  )
}

/* INFO */
function Info({ title, desc }: any) {
  return (
    <div className="bg-white p-5 rounded-xl border">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{desc}</p>
    </div>
  )
}