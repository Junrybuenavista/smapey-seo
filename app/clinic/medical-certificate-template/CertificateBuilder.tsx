"use client"

import { useState } from "react"
import DocShell, { Area, Field, FormSection, MUTED, Slot } from "@/components/docs/DocShell"

/**
 * Built for the practitioner issuing the certificate, not for the person who
 * wants one. The physician's name and licence number sit on the form and on
 * the printed sheet, the document says on its face that it is only valid once
 * signed by the attending physician, and no clinical findings are pre-filled -
 * the sample data stops at the administrative fields for that reason.
 */
export default function CertificateBuilder() {
  const [clinic, setClinic] = useState("San Roque Family Clinic")
  const [clinicAddr, setClinicAddr] = useState("31 Bonifacio Street, Iloilo City")
  const [clinicPhone, setClinicPhone] = useState("(033) 555 0121")
  const [certNo, setCertNo] = useState("MC-0429")
  const [issued, setIssued] = useState("")

  const [patient, setPatient] = useState("")
  const [age, setAge] = useState("")
  const [sex, setSex] = useState("")
  const [patientAddr, setPatientAddr] = useState("")

  const [examined, setExamined] = useState("")
  const [findings, setFindings] = useState("")
  const [restFrom, setRestFrom] = useState("")
  const [restTo, setRestTo] = useState("")
  const [purpose, setPurpose] = useState("")

  const [physician, setPhysician] = useState("")
  const [licenceNo, setLicenceNo] = useState("")
  const [ptr, setPtr] = useState("")

  const reset = () => {
    setClinic(""); setClinicAddr(""); setClinicPhone(""); setCertNo(""); setIssued("")
    setPatient(""); setAge(""); setSex(""); setPatientAddr("")
    setExamined(""); setFindings(""); setRestFrom(""); setRestTo(""); setPurpose("")
    setPhysician(""); setLicenceNo(""); setPtr("")
  }

  const form = (
    <>
      <FormSection title="Clinic">
        <Field label="Clinic name" value={clinic} onChange={setClinic} />
        <Field label="Phone" value={clinicPhone} onChange={setClinicPhone} />
        <Field label="Address" value={clinicAddr} onChange={setClinicAddr} wide />
        <Field label="Certificate no." value={certNo} onChange={setCertNo} />
        <Field label="Date issued" value={issued} onChange={setIssued} type="date" />
      </FormSection>

      <FormSection title="Patient">
        <Field label="Patient name" value={patient} onChange={setPatient} />
        <Field label="Age" value={age} onChange={setAge} />
        <Field label="Sex" value={sex} onChange={setSex} />
        <Field label="Address" value={patientAddr} onChange={setPatientAddr} />
      </FormSection>

      <FormSection title="Examination">
        <Field label="Date examined" value={examined} onChange={setExamined} type="date" />
        <Field label="Purpose of certificate" value={purpose} onChange={setPurpose} placeholder="Return to work" />
        <Area
          label="Findings and remarks"
          value={findings}
          onChange={setFindings}
          rows={4}
          placeholder="To be completed by the examining physician."
        />
        <Field label="Rest / unfit from" value={restFrom} onChange={setRestFrom} type="date" />
        <Field label="Rest / unfit until" value={restTo} onChange={setRestTo} type="date" />
      </FormSection>

      <FormSection title="Attending physician">
        <Field label="Physician name" value={physician} onChange={setPhysician} placeholder="Dr. ..." />
        <Field label="PRC licence no." value={licenceNo} onChange={setLicenceNo} />
        <Field label="PTR no. (optional)" value={ptr} onChange={setPtr} />
      </FormSection>
    </>
  )

  const sheet = (
    <>
      <div className="text-center pb-5" style={{ borderBottom: "2px solid #161616" }}>
        <p className="text-lg font-extrabold leading-tight">
          <Slot value={clinic} minWidth={220} />
        </p>
        <p style={{ color: MUTED }}>
          <Slot value={clinicAddr} minWidth={220} />
        </p>
        <p style={{ color: MUTED }}>
          <Slot value={clinicPhone} minWidth={140} />
        </p>
      </div>

      <div className="text-center mt-7">
        <p className="text-xl font-extrabold tracking-tight">MEDICAL CERTIFICATE</p>
        <p style={{ color: MUTED }}>
          No. <Slot value={certNo} minWidth={80} /> &nbsp;&nbsp; Date issued <Slot value={issued} minWidth={90} />
        </p>
      </div>

      <div className="mt-7 space-y-2.5">
        <p>
          <span style={{ color: MUTED }}>This is to certify that </span>
          <Slot value={patient} minWidth={210} />
        </p>
        <p>
          <span style={{ color: MUTED }}>Age </span>
          <Slot value={age} minWidth={50} />
          <span style={{ color: MUTED }}> &nbsp; Sex </span>
          <Slot value={sex} minWidth={70} />
        </p>
        <p>
          <span style={{ color: MUTED }}>Address </span>
          <Slot value={patientAddr} minWidth={260} />
        </p>
        <p>
          <span style={{ color: MUTED }}>was examined on </span>
          <Slot value={examined} minWidth={120} />
        </p>
      </div>

      <div className="mt-6">
        <p className="text-[10px] font-extrabold uppercase tracking-widest mb-2" style={{ color: MUTED }}>
          Findings and remarks
        </p>
        {findings.trim() ? (
          <p style={{ whiteSpace: "pre-line" }}>{findings}</p>
        ) : (
          <div className="space-y-4 pt-1">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ borderBottom: "1px solid #9a958c", height: 2 }} />
            ))}
          </div>
        )}
      </div>

      <p className="mt-6">
        <span style={{ color: MUTED }}>Advised rest / unfit for duty from </span>
        <Slot value={restFrom} minWidth={110} />
        <span style={{ color: MUTED }}> to </span>
        <Slot value={restTo} minWidth={110} />
      </p>

      <p className="mt-2.5">
        <span style={{ color: MUTED }}>Issued upon request of the patient for the purpose of </span>
        <Slot value={purpose} minWidth={170} />
      </p>

      <div className="mt-12 flex justify-end">
        <div className="w-full max-w-[300px] text-center">
          <div style={{ borderBottom: "1px solid #161616", height: 36 }} />
          <p className="font-bold mt-1.5">
            <Slot value={physician} minWidth={170} />
          </p>
          <p style={{ color: MUTED }}>
            PRC Licence No. <Slot value={licenceNo} minWidth={100} />
          </p>
          {ptr.trim() ? <p style={{ color: MUTED }}>PTR No. {ptr}</p> : null}
          <p className="text-[10px] font-extrabold uppercase tracking-widest mt-1" style={{ color: MUTED }}>
            Attending physician
          </p>
        </div>
      </div>

      <p className="mt-9 pt-4" style={{ borderTop: "1px solid #e7e2d9", fontSize: 11, color: MUTED }}>
        This certificate is valid only when completed and signed by the attending licensed physician named above,
        and relates solely to the examination carried out on the date stated.
      </p>
    </>
  )

  return <DocShell form={form} sheet={sheet} onReset={reset} />
}
