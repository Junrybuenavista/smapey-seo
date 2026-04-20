// app/what-is-an-invoice/page.tsx

import Link from "next/link"
import Footer from "@/components/Footer"


export default function WhatIsInvoicePage() {
  return (
    <>
    <main className="bg-white text-gray-800">

      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            What Is an Invoice? (Complete Guide for Beginners)
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8">
            Learn what an invoice is, how it works, its key components, and how to create one professionally.
          </p>

          <Link
            href="invoice-generation-online"
            className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold shadow hover:bg-gray-100 transition"
          >
            Create Free Invoice →
          </Link>
        </div>
      </section>

      {/* INTRO */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-4">What is an Invoice?</h2>
        <p className="text-lg leading-relaxed text-gray-600">
          An invoice is a business document issued by a seller to request payment from a buyer for goods or services provided.
          It serves as both a payment request and an official record of a transaction.
        </p>

        <p className="text-lg leading-relaxed text-gray-600 mt-4">
          In accounting, invoices are essential because they help track revenue, expenses, and cash flow.
          They are also used for tax reporting and financial audits.
        </p>
      </section>
      <section className="max-w-5xl mx-auto px-6 py-16">
  <h2 className="text-3xl font-bold mb-6">
    Why Are Invoices Important?
  </h2>

  <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
    <p>
      Invoices are more than just payment requests—they are critical business tools
      that help manage cash flow, maintain accurate records, and ensure legal compliance.
    </p>

    <ul className="list-disc pl-6 space-y-3">
      <li><strong>Get Paid Faster:</strong> Clear invoices reduce delays and confusion.</li>
      <li><strong>Track Income:</strong> Helps monitor revenue and outstanding payments.</li>
      <li><strong>Legal Protection:</strong> Serves as proof of transaction.</li>
      <li><strong>Tax Compliance:</strong> Required for proper tax reporting and audits.</li>
      <li><strong>Professional Image:</strong> Builds trust with clients.</li>
    </ul>
  </div>
</section>

<section className="bg-gray-50 py-16 px-6">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-12">
      Invoice vs Receipt vs Purchase Order
    </h2>

    <div className="grid md:grid-cols-3 gap-8">

      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="font-semibold text-lg mb-2">Invoice</h3>
        <p className="text-gray-600 text-sm">
          Sent by the seller to request payment for goods or services.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="font-semibold text-lg mb-2">Receipt</h3>
        <p className="text-gray-600 text-sm">
          Proof that payment has already been made.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="font-semibold text-lg mb-2">Purchase Order</h3>
        <p className="text-gray-600 text-sm">
          Created by the buyer to authorize a purchase before it happens.
        </p>
      </div>

    </div>
  </div>
</section>

      {/* KEY COMPONENTS */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Key Components of an Invoice
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              {
                title: "Invoice Number",
                desc: "A unique identifier that helps track and prevent duplicate payments.",
              },
              {
                title: "Invoice Date",
                desc: "The date the invoice is issued, used for payment terms and accounting.",
              },
              {
                title: "Buyer & Seller Info",
                desc: "Names and addresses of both parties for legal and tax purposes.",
              },
              {
                title: "Description of Services",
                desc: "Clear details of what was provided, including quantity and pricing.",
              },
              {
                title: "Total Amount",
                desc: "The total amount the customer must pay.",
              },
              {
                title: "Payment Terms",
                desc: "Defines when and how payment should be made (e.g., Net 30).",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* TYPES */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Types of Invoices
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="p-6 border rounded-2xl">
            <h3 className="font-semibold text-lg mb-2">Standard Invoice</h3>
            <p className="text-gray-600 text-sm">
              The most common type, issued after goods or services are delivered.
            </p>
          </div>

          <div className="p-6 border rounded-2xl">
            <h3 className="font-semibold text-lg mb-2">Pro Forma Invoice</h3>
            <p className="text-gray-600 text-sm">
              A preliminary invoice sent before the final transaction.
            </p>
          </div>

          <div className="p-6 border rounded-2xl">
            <h3 className="font-semibold text-lg mb-2">Recurring Invoice</h3>
            <p className="text-gray-600 text-sm">
              Used for subscriptions or ongoing services billed regularly.
            </p>
          </div>

          <div className="p-6 border rounded-2xl">
            <h3 className="font-semibold text-lg mb-2">Credit Note</h3>
            <p className="text-gray-600 text-sm">
              Issued to reduce or cancel a previously issued invoice.
            </p>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">
            How Invoices Work (Step-by-Step)
          </h2>

          <ol className="space-y-6 text-gray-600 text-lg">
            <li>1. Seller creates and sends the invoice</li>
            <li>2. Buyer receives and reviews it</li>
            <li>3. Invoice is approved and recorded</li>
            <li>4. Payment is made based on terms</li>
            <li>5. Transaction is completed and recorded</li>
          </ol>
        </div>
      </section>

      {/* EXAMPLE */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6">Example of an Invoice</h2>

        <div className="border rounded-2xl p-6 shadow-sm bg-white">
          <p className="font-semibold mb-2">Invoice #INV-001</p>
          <p className="text-sm text-gray-500 mb-4">Date: April 9, 2026</p>

          <div className="border-t pt-4">
            <p>Web Development Services - $500</p>
          </div>

          <div className="border-t mt-4 pt-4 font-semibold">
            Total: $500
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="mt-24 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-12 text-center max-w-4xl mx-auto shadow-xl">
          <h2 className="text-2xl font-bold mb-3">
            Ready to Create Your First Invoice?
          </h2>

          <p className="text-blue-100 mb-6">
            Generate professional invoices in seconds and get paid faster.
          </p>

          <Link
            href="invoice-generation-online"
            className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold shadow hover:bg-gray-100 transition"
          >
            Start Free →
          </Link>
        </div>
      </section>

    </main>
    <Footer/></>
  )
}