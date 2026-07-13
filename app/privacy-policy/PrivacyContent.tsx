"use client";
import Footer from "@/components/Footer"

const LAST_UPDATED = "July 13, 2026"

export default function PrivacyPolicy() {
  return (
    <>
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-600">
          Your privacy matters to us. This policy explains how Smapey collects, uses, and protects
          your data when you use our platform.
        </p>
        <p className="text-sm text-gray-400 mt-3">Last updated: {LAST_UPDATED}</p>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-6 pb-16 space-y-8">

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">1. Who We Are</h2>
          <p className="text-gray-600">
            Smapey (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) provides business management software for small
            businesses, including tools for invoicing, gym management, salon and spa booking, clinics,
            laundry shops, car rentals, lending, property rentals, and more. Smapey is operated from the
            Philippines and processes personal data in accordance with the Philippine Data Privacy Act of
            2012 (Republic Act No. 10173) and its implementing rules. This policy applies to our websites
            at smapey.com and app.smapey.com and to all Smapey products.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
          <p className="text-gray-600 mb-3">We collect the following categories of information:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>
              <span className="font-medium">Account information.</span> Your name, email address,
              password (stored in hashed form), business name, and profile details you provide when
              you sign up or update your account.
            </li>
            <li>
              <span className="font-medium">Business data you enter.</span> Records you create while
              using Smapey, such as invoices, customer and client records, appointments and
              reservations, member profiles, loan records, orders, inventory, and uploaded files or
              documents (including essays submitted for AI grading).
            </li>
            <li>
              <span className="font-medium">Payment information.</span> When you subscribe to a paid
              plan, payment is handled by our payment processors. We do not store your full card
              number or e-wallet credentials; we receive only confirmation of payment, the plan
              purchased, and limited billing details.
            </li>
            <li>
              <span className="font-medium">Usage data.</span> Log data such as IP address, browser
              type, device information, pages visited, and actions taken in the app. We use this to
              keep the service secure and to improve it.
            </li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">3. Your Customers&apos; Data</h2>
          <p className="text-gray-600">
            When you store information about your own customers, clients, members, tenants, patients,
            students, or borrowers in Smapey (for example names, phone numbers, appointment history, or
            payment records), you are the data controller of that information and Smapey acts as your
            data processor. We process that data only to provide the service to you, we do not sell it
            or use it for advertising, and we rely on you to have the right to collect it and to respond
            to requests from your customers about it. If a person contacts us directly about data held
            in your account, we will refer them to you.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">4. How We Use Your Information</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>To provide, operate, and maintain the Smapey products you use.</li>
            <li>To process subscription payments and manage your plan.</li>
            <li>
              To send transactional messages, such as email verification, password resets, billing
              notices, and, where you enable it, SMS notifications to your customers (for example
              order-ready or appointment reminders).
            </li>
            <li>To respond to support requests.</li>
            <li>To monitor for fraud and abuse and to keep the platform secure.</li>
            <li>To understand how the product is used so we can improve it.</li>
          </ul>
          <p className="text-gray-600 mt-3">
            We do not sell your personal data, and we do not use the business data you store in Smapey
            for advertising.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">5. AI Features</h2>
          <p className="text-gray-600">
            Some Smapey products include AI-powered features, such as automated essay grading in Smapey
            Essay. Content you submit to these features (for example essay text or photos of handwritten
            work) is sent to our AI service providers solely to generate the requested output, such as a
            grade and written feedback. We do not permit our AI providers to use your submitted content
            to train their models. AI output is assistive and may contain errors; final judgment always
            rests with you.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">6. Sharing With Third Parties</h2>
          <p className="text-gray-600 mb-3">
            We share data only with service providers that help us run Smapey, and only to the extent
            needed:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>
              <span className="font-medium">Payment processors</span> (such as Stripe, PayPal, and
              GCash) to handle subscription payments. Their own privacy policies govern the payment
              details you provide to them.
            </li>
            <li>
              <span className="font-medium">Hosting and infrastructure providers</span> that store and
              serve our application and databases.
            </li>
            <li>
              <span className="font-medium">Communication providers</span> used to deliver email and
              SMS messages.
            </li>
            <li>
              <span className="font-medium">AI service providers</span> as described in section 5.
            </li>
            <li>
              <span className="font-medium">Analytics tools</span> that help us understand aggregate
              usage of our websites.
            </li>
          </ul>
          <p className="text-gray-600 mt-3">
            We may also disclose information if required by law, court order, or a lawful request from a
            government authority, or to protect the rights, safety, and property of Smapey and its users.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">7. Cookies</h2>
          <p className="text-gray-600">
            We use cookies and similar technologies to keep you signed in, remember your preferences,
            and measure how our websites are used. You can control cookies through your browser
            settings; disabling them may limit some features, such as staying logged in.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">8. Data Retention and Deletion</h2>
          <p className="text-gray-600">
            We keep your data for as long as your account is active. If you delete your account, or ask
            us to delete it, we remove your personal data and stored business records within a
            reasonable period, except where we must keep certain records to comply with legal,
            accounting, or tax obligations. Backup copies are purged on a rolling schedule.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">9. Security</h2>
          <p className="text-gray-600">
            We protect your data with industry-standard measures, including encryption in transit
            (HTTPS), hashed passwords, access controls, and secure infrastructure. No system is 100%
            secure, so please use a strong password and keep your credentials private. If we become
            aware of a personal data breach that affects you, we will notify you and the National
            Privacy Commission as required by law.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">10. Your Rights</h2>
          <p className="text-gray-600 mb-3">
            Under the Data Privacy Act (and similar laws that may apply to you), you have the right to:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Access the personal data we hold about you.</li>
            <li>Correct inaccurate or outdated information.</li>
            <li>Request deletion of your personal data.</li>
            <li>Object to or withdraw consent for certain processing.</li>
            <li>Receive a copy of your data in a portable format.</li>
            <li>
              Lodge a complaint with the National Privacy Commission (privacy.gov.ph) if you believe
              your rights have been violated.
            </li>
          </ul>
          <p className="text-gray-600 mt-3">
            To exercise any of these rights, contact us at the address in section 13.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">11. Children</h2>
          <p className="text-gray-600">
            Smapey is built for business owners and professionals and is not directed at children. You
            must be at least 18 years old to create an account. If you believe a child has provided us
            personal data, contact us and we will delete it.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">12. Changes to This Policy</h2>
          <p className="text-gray-600">
            We may update this Privacy Policy from time to time. When we make material changes, we will
            update the &quot;Last updated&quot; date above and, where appropriate, notify you by email or
            in the app. Continued use of the service after changes take effect means you accept the
            revised policy.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">13. Contact Us</h2>
          <p className="text-gray-600">
            For questions about this Privacy Policy or to exercise your data rights, email us at
            <span className="font-medium"> support@smapey.com</span>.
          </p>
        </section>
      </div>
    </div>
    <Footer/>
    </>
  );
}
