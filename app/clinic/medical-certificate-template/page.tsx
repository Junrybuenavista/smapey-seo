import Link from "next/link"
import JsonLd from "@/components/JsonLd"
import SiteNavbar from "@/components/SiteNavbar"
import Footer from "@/components/Footer"
import InternalLinks from "@/components/InternalLinks"
import { buildMetadata, breadcrumbSchema, faqSchema, SITE, type Faq } from "@/lib/seo"
import CertificateBuilder from "./CertificateBuilder"

const PATH = "/clinic/medical-certificate-template"
const TITLE = "Medical Certificate Template for Clinics - Free, Printable | Smapey"
const DESCRIPTION =
  "Free medical certificate template for clinics and licensed physicians. Fill in the clinic, patient, and examination details and print or save as PDF - or print a blank form for the consulting room."

const INK = "#161616"
const BLUE = "#2f6bff"
const CREAM = "#fbf7f0"
const MUTED = "#54514c"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

const FAQS: Faq[] = [
  {
    q: "What should a medical certificate contain?",
    a: "The issuing clinic and its contact details, a certificate number and date of issue, the patient's name, age and address, the date the patient was actually examined, the physician's findings, any period of recommended rest or unfitness for duty, the purpose it was requested for, and the attending physician's name, signature, and licence number. The examination date matters as much as the issue date - they are not always the same day.",
  },
  {
    q: "Who can issue a medical certificate?",
    a: "Only a physician licensed to practise in the relevant jurisdiction, and only for a patient they have actually examined. The certificate is a professional attestation carrying the physician's licence number, which is why this template puts that number on the face of the document and states that it is valid only once signed.",
  },
  {
    q: "What details go in the findings section?",
    a: "Whatever the examining physician determines is clinically relevant and appropriate to disclose for the stated purpose. Many employers need only a statement of fitness or unfitness for duty and the dates involved, not a diagnosis - sharing no more than the purpose requires is generally the better practice for patient confidentiality.",
  },
  {
    q: "How long is a medical certificate valid?",
    a: "It attests to an examination on a specific date, so it does not expire so much as become historical. Where it covers a period of rest or unfitness, that period is stated explicitly on the certificate. Organisations often decline certificates issued long after the absence they cover.",
  },
  {
    q: "What is the PRC licence number on the form?",
    a: "In the Philippines, the Professional Regulation Commission licence number identifies the physician as registered to practise. A PTR number, issued by the local government where the practitioner pays their professional tax, is often included alongside it. Outside the Philippines, substitute whichever registration number your regulator issues.",
  },
  {
    q: "Can I use this template in my clinic?",
    a: "Yes, and it is free to use commercially. Fill it in and print, or clear every field and print blank forms to keep in the consulting room. Nothing you type is transmitted anywhere - the form runs entirely in your browser.",
  },
]

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Medical Certificate Template",
            description: DESCRIPTION,
            url: `${SITE}${PATH}`,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            publisher: { "@id": `${SITE}/#organization` },
            offers: { "@type": "Offer", price: "0", priceCurrency: "PHP" },
          },
          breadcrumbSchema(PATH),
          faqSchema(FAQS),
        ]}
      />

      <main style={display}>
        <SiteNavbar />

        <section className="py-14 px-6" style={{ background: CREAM }}>
          <div className="max-w-5xl mx-auto">
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>
              Free template for clinics
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.06] tracking-tight mb-5" style={{ color: INK }}>
              Medical certificate template
            </h1>
            <p className="text-lg max-w-2xl leading-relaxed" style={{ color: MUTED }}>
              A printable medical certificate form for clinics and licensed physicians. Fill in the clinic, patient,
              and examination details and print or save as PDF - or clear the fields and print blank forms to keep in
              the consulting room.
            </p>
            <p className="text-base max-w-2xl leading-relaxed mt-4 font-semibold" style={{ color: INK }}>
              A medical certificate can only be issued by a licensed physician for a patient they have examined. This
              is a blank form for that physician to complete and sign - it certifies nothing on its own.
            </p>
          </div>
        </section>

        <section className="py-12 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <CertificateBuilder />
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-3xl mx-auto space-y-5">
            <h2 className="text-2xl font-extrabold tracking-tight" style={{ color: INK }}>
              The fields clinics most often leave off
            </h2>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              The certificate itself is a short document, which is exactly why the omissions are easy to miss until
              an employer or an insurer sends one back.
            </p>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              The most common is the date of examination. Clinics print the issue date and stop, but the two are
              frequently different - a patient seen on Monday may collect the certificate on Wednesday - and the
              examination date is the one that establishes what was actually observed and when. Both belong on the
              form.
            </p>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              The second is the licence number. A certificate is a professional attestation, and without the
              physician&apos;s registration number on its face it is difficult for anyone receiving it to verify who
              issued it. It sits directly under the signature on this form for that reason.
            </p>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              The third is a stated purpose and, where relevant, explicit rest dates. &quot;Unfit for duty&quot; with
              no dates invites the recipient to interpret it, and they will interpret it in whichever direction suits
              them. Naming the period removes the ambiguity.
            </p>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              One point on confidentiality: many employers need only a statement of fitness and the dates, not a
              diagnosis. Disclosing no more than the stated purpose requires is generally the better practice, and it
              is the examining physician&apos;s judgement to make rather than a form&apos;s.
            </p>
          </div>
        </section>

        <section className="py-12 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-extrabold tracking-tight mb-7" style={{ color: INK }}>
              Common questions
            </h2>
            <div className="space-y-6">
              {FAQS.map((f) => (
                <div key={f.q}>
                  <h3 className="text-base font-extrabold mb-1.5" style={{ color: INK }}>
                    {f.q}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: MUTED }}>
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 px-6" style={{ background: CREAM }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-extrabold tracking-tight mb-3" style={{ color: INK }}>
              When certificates are one part of the record
            </h2>
            <p className="text-base leading-relaxed" style={{ color: MUTED }}>
              A printed form is fine for occasional requests. The friction shows up when a patient asks for a copy of
              something issued months ago and it lives in a folder rather than against their record. Smapey&apos;s{" "}
              <Link href="/clinic" className="font-bold underline" style={{ color: BLUE }}>
                clinic manager
              </Link>{" "}
              keeps patient records, appointments, and visit history together, with a{" "}
              <Link href="/clinic/clinic-appointment-management-system" className="font-bold underline" style={{ color: BLUE }}>
                scheduling side
              </Link>{" "}
              for the consultations themselves.
            </p>
          </div>
        </section>

        <InternalLinks cluster="clinic" currentPath={PATH} />
        <Footer />
      </main>
    </>
  )
}
