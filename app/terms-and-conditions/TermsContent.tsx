"use client";
import Footer from "@/components/Footer"

const LAST_UPDATED = "July 13, 2026"

export default function TermsOfService() {
  return (
    <>
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Terms and Conditions</h1>
        <p className="text-gray-600">
          Please read these terms carefully before using Smapey. By creating an account or using our
          service, you agree to be bound by these terms.
        </p>
        <p className="text-sm text-gray-400 mt-3">Last updated: {LAST_UPDATED}</p>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-6 pb-16 space-y-8">

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p className="text-gray-600">
            These Terms and Conditions (&quot;Terms&quot;) are an agreement between you and Smapey
            (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) governing your use of the Smapey websites
            (smapey.com and app.smapey.com) and all Smapey products. By creating an account, clicking
            &quot;I agree&quot;, or using the service, you accept these Terms and our{" "}
            <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>. If
            you use Smapey on behalf of a business, you confirm you are authorized to bind that
            business to these Terms.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">2. The Service</h2>
          <p className="text-gray-600">
            Smapey provides business management software for small businesses, including tools for
            invoicing, gym management, salon and spa booking, clinic management, laundry shops, food
            ordering, car rentals, lending, property and boarding house rentals, retail inventory,
            catering, water refilling stations, tutoring, and AI essay grading. Each product is
            standalone; you may use one or several under a single account. We may add, change, or
            retire features over time.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">3. Accounts and Eligibility</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>You must be at least 18 years old to create an account.</li>
            <li>You must provide accurate registration information and keep it up to date.</li>
            <li>
              You are responsible for keeping your login credentials confidential and for all activity
              that occurs under your account, including activity by team members you invite.
            </li>
            <li>Notify us immediately at support@smapey.com if you suspect unauthorized access.</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">4. Plans, Billing, and Cancellation</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>
              <span className="font-medium">Free plan.</span> Smapey offers a free plan with usage
              limits (for example, a limited number of records or transactions per month). We may
              adjust free plan limits with reasonable notice.
            </li>
            <li>
              <span className="font-medium">Paid subscriptions.</span> Paid plans are billed in advance
              on a recurring basis (monthly or yearly) through our payment processors and renew
              automatically until cancelled.
            </li>
            <li>
              <span className="font-medium">Cancellation.</span> You can cancel anytime from your
              account settings. Your paid features remain active until the end of the period you have
              already paid for; we do not charge again after cancellation.
            </li>
            <li>
              <span className="font-medium">Refunds.</span> Except where required by law, payments are
              non-refundable, including for partly used billing periods. If you believe you were
              charged in error, contact us and we will review it.
            </li>
            <li>
              <span className="font-medium">Price changes.</span> We may change prices with at least 30
              days&apos; notice; changes apply from your next billing cycle.
            </li>
            <li>
              <span className="font-medium">Failed payments.</span> If a renewal payment fails, we may
              downgrade your account to the free plan after a grace period. Your data is retained
              subject to section 8.
            </li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">5. Your Content and Data</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>
              You own the data you store in Smapey (invoices, customer records, bookings, and similar
              business records). You grant us only the license needed to host, process, back up, and
              display that data in order to provide the service.
            </li>
            <li>
              You are responsible for the accuracy and legality of the data you store, including having
              the right and any required consent to store your customers&apos; personal information
              (see our Privacy Policy, &quot;Your Customers&apos; Data&quot;).
            </li>
            <li>
              You can export your data or request a copy at any time while your account is active.
            </li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">6. Acceptable Use</h2>
          <p className="text-gray-600 mb-3">You agree not to:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Use the service for any unlawful purpose or in violation of any applicable law.</li>
            <li>
              Send spam or unsolicited marketing through Smapey&apos;s messaging features; SMS and
              email notifications may only be sent to people who have a genuine relationship with your
              business.
            </li>
            <li>
              Use the lending tools in violation of lending, collection, or interest-rate regulations
              that apply to your business.
            </li>
            <li>Upload malicious code or attempt to probe, disrupt, or overload our systems.</li>
            <li>Resell, copy, or reverse-engineer the service, or access it to build a competing product.</li>
            <li>Share one account across multiple businesses in a way that circumvents plan limits.</li>
          </ul>
          <p className="text-gray-600 mt-3">
            We may suspend or terminate accounts that violate this section, with notice where practical.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">7. AI Features</h2>
          <p className="text-gray-600">
            AI-powered features, such as automated essay grading, produce output generated by machine
            learning models. Output is assistive and may be inaccurate or incomplete. You are
            responsible for reviewing AI output before relying on it or sharing it (for example, before
            releasing grades to students). AI features are not a substitute for professional judgment.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">8. Termination</h2>
          <p className="text-gray-600">
            You may stop using Smapey and delete your account at any time. We may suspend or terminate
            your access if you materially breach these Terms, if required by law, or if we discontinue
            the service (in which case we will give reasonable notice and an opportunity to export your
            data). After account deletion, we remove your data as described in our Privacy Policy.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">9. Third-Party Services</h2>
          <p className="text-gray-600">
            Payments are processed by third-party providers (such as Stripe, PayPal, and GCash), and
            some features rely on third-party infrastructure, messaging, and AI providers. We are not
            responsible for outages or errors in those third-party services, though we will work in
            good faith to resolve issues that affect your use of Smapey.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">10. Disclaimers</h2>
          <p className="text-gray-600">
            The service is provided &quot;as is&quot; and &quot;as available&quot;. While we work hard to
            keep Smapey reliable and secure, we do not guarantee that the service will be uninterrupted,
            error-free, or that data loss will never occur. You are responsible for maintaining your own
            records where the law requires it (for example, official receipts and tax records). Smapey
            is a software tool; it does not provide legal, tax, accounting, or financial advice.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">11. Limitation of Liability</h2>
          <p className="text-gray-600">
            To the maximum extent permitted by law, Smapey shall not be liable for indirect, incidental,
            special, or consequential damages, or for lost profits, revenue, or data, arising from your
            use of or inability to use the service. Our total liability for any claim relating to the
            service is limited to the amount you paid us in the 12 months before the event giving rise
            to the claim (or PHP 5,000 if you are on the free plan). Nothing in these Terms limits
            liability that cannot be limited under applicable law.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">12. Indemnification</h2>
          <p className="text-gray-600">
            You agree to indemnify and hold Smapey harmless from claims arising out of your use of the
            service in violation of these Terms, your violation of applicable law, or disputes between
            you and your own customers, clients, members, tenants, patients, students, or borrowers.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">13. Governing Law</h2>
          <p className="text-gray-600">
            These Terms are governed by the laws of the Republic of the Philippines. Any dispute that
            cannot be resolved informally shall be brought before the competent courts of the
            Philippines. If any provision of these Terms is found unenforceable, the remaining
            provisions stay in effect.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">14. Changes to These Terms</h2>
          <p className="text-gray-600">
            We may update these Terms from time to time. When we make material changes, we will update
            the &quot;Last updated&quot; date above and, where appropriate, notify you by email or in
            the app. Continued use of the service after changes take effect constitutes acceptance of
            the updated Terms.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">15. Contact</h2>
          <p className="text-gray-600">
            Questions about these Terms? Email us at
            <span className="font-medium"> support@smapey.com</span>.
          </p>
        </section>
      </div>
    </div>
    <Footer />
    </>
  );
}
