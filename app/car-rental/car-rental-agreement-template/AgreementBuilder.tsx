"use client"

import { useMemo, useState } from "react"
import DocShell, { Area, Field, FormSection, MUTED, Slot } from "@/components/docs/DocShell"

const num = (s: string) => {
  const n = parseFloat(String(s).replace(/[^0-9.]/g, ""))
  return Number.isFinite(n) ? n : 0
}

const DEFAULT_TERMS = `1. The renter confirms they hold a valid driver's licence and will be the only person driving the vehicle unless an additional driver is named above.
2. The vehicle may not be used to carry passengers or goods for hire, to tow, to race, or for any unlawful purpose.
3. The renter returns the vehicle at the agreed date, time, and place, with the same fuel level it left with. Late returns are charged at the daily rate.
4. Fuel, tolls, parking, and traffic violations during the rental period are the renter's responsibility.
5. The renter reports any accident, breakdown, or theft to the owner immediately, and does not authorise repairs without the owner's written consent.
6. The security deposit is refunded after the vehicle is returned and inspected, less any deductions for damage, missing fuel, fines, or excess mileage.`

export default function AgreementBuilder() {
  const [owner, setOwner] = useState("Metro Drive Car Rental")
  const [ownerAddr, setOwnerAddr] = useState("22 Rizal Avenue, Cebu City")
  const [ownerPhone, setOwnerPhone] = useState("0917 555 0110")
  const [agrNo, setAgrNo] = useState("RA-1187")

  const [renter, setRenter] = useState("Daniel Cruz")
  const [renterAddr, setRenterAddr] = useState("8 Acacia Street, Mandaue City")
  const [renterPhone, setRenterPhone] = useState("0999 555 0164")
  const [licence, setLicence] = useState("N01-23-456789")
  const [licenceExp, setLicenceExp] = useState("")
  const [addlDriver, setAddlDriver] = useState("")

  const [vehicle, setVehicle] = useState("2022 Toyota Innova 2.8 E")
  const [plate, setPlate] = useState("XYZ 7788")
  const [colour, setColour] = useState("Silver")
  const [odoOut, setOdoOut] = useState("41,250")
  const [fuelOut, setFuelOut] = useState("Full")

  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [days, setDays] = useState("5")
  const [rate, setRate] = useState("2500")
  const [mileageCap, setMileageCap] = useState("200")
  const [excessRate, setExcessRate] = useState("15")
  const [deposit, setDeposit] = useState("5000")
  const [extras, setExtras] = useState("0")
  const [currency, setCurrency] = useState("₱")
  const [terms, setTerms] = useState(DEFAULT_TERMS)

  const r = useMemo(() => {
    const base = num(days) * num(rate)
    const total = base + num(extras)
    return { base, total, dueNow: total + num(deposit) }
  }, [days, rate, extras, deposit])

  const money = (n: number) =>
    `${currency}${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

  const reset = () => {
    setOwner(""); setOwnerAddr(""); setOwnerPhone(""); setAgrNo("")
    setRenter(""); setRenterAddr(""); setRenterPhone(""); setLicence(""); setLicenceExp(""); setAddlDriver("")
    setVehicle(""); setPlate(""); setColour(""); setOdoOut(""); setFuelOut("")
    setStart(""); setEnd(""); setDays(""); setRate(""); setMileageCap(""); setExcessRate("")
    setDeposit(""); setExtras(""); setTerms("")
  }

  const form = (
    <>
      <FormSection title="Owner">
        <Field label="Owner / company" value={owner} onChange={setOwner} />
        <Field label="Phone" value={ownerPhone} onChange={setOwnerPhone} />
        <Field label="Address" value={ownerAddr} onChange={setOwnerAddr} wide />
        <Field label="Agreement no." value={agrNo} onChange={setAgrNo} />
        <Field label="Currency symbol" value={currency} onChange={setCurrency} />
      </FormSection>

      <FormSection title="Renter">
        <Field label="Renter name" value={renter} onChange={setRenter} />
        <Field label="Phone" value={renterPhone} onChange={setRenterPhone} />
        <Field label="Address" value={renterAddr} onChange={setRenterAddr} wide />
        <Field label="Driver's licence no." value={licence} onChange={setLicence} />
        <Field label="Licence expiry" value={licenceExp} onChange={setLicenceExp} type="date" />
        <Field label="Additional driver (optional)" value={addlDriver} onChange={setAddlDriver} wide />
      </FormSection>

      <FormSection title="Vehicle">
        <Field label="Vehicle" value={vehicle} onChange={setVehicle} wide />
        <Field label="Plate no." value={plate} onChange={setPlate} />
        <Field label="Colour" value={colour} onChange={setColour} />
        <Field label="Odometer at release" value={odoOut} onChange={setOdoOut} />
        <Field label="Fuel at release" value={fuelOut} onChange={setFuelOut} />
      </FormSection>

      <FormSection title="Period & charges">
        <Field label="Start (date & time)" value={start} onChange={setStart} />
        <Field label="Return (date & time)" value={end} onChange={setEnd} />
        <Field label="Number of days" value={days} onChange={setDays} />
        <Field label="Daily rate" value={rate} onChange={setRate} />
        <Field label="Mileage allowance / day (km)" value={mileageCap} onChange={setMileageCap} />
        <Field label="Excess mileage rate / km" value={excessRate} onChange={setExcessRate} />
        <Field label="Security deposit" value={deposit} onChange={setDeposit} />
        <Field label="Other charges" value={extras} onChange={setExtras} />
      </FormSection>

      <FormSection title="Terms">
        <Area label="Terms and conditions" value={terms} onChange={setTerms} rows={8} />
      </FormSection>
    </>
  )

  const sheet = (
    <>
      <div className="text-center">
        <p className="text-xl font-extrabold tracking-tight">CAR RENTAL AGREEMENT</p>
        <p style={{ color: MUTED }}>
          Agreement no. <Slot value={agrNo} minWidth={90} />
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-7 pt-5" style={{ borderTop: "2px solid #161616" }}>
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-widest mb-1" style={{ color: MUTED }}>
            Owner / lessor
          </p>
          <p className="font-bold"><Slot value={owner} minWidth={160} /></p>
          <p style={{ color: MUTED }}><Slot value={ownerAddr} minWidth={180} /></p>
          <p style={{ color: MUTED }}><Slot value={ownerPhone} minWidth={130} /></p>
        </div>
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-widest mb-1" style={{ color: MUTED }}>
            Renter / lessee
          </p>
          <p className="font-bold"><Slot value={renter} minWidth={160} /></p>
          <p style={{ color: MUTED }}><Slot value={renterAddr} minWidth={180} /></p>
          <p style={{ color: MUTED }}><Slot value={renterPhone} minWidth={130} /></p>
          <p style={{ color: MUTED }}>
            Licence <Slot value={licence} minWidth={110} /> exp. <Slot value={licenceExp} minWidth={80} />
          </p>
          {addlDriver.trim() ? <p style={{ color: MUTED }}>Additional driver: {addlDriver}</p> : null}
        </div>
      </div>

      <div className="mt-6 pt-5" style={{ borderTop: "1px solid #e7e2d9" }}>
        <p className="text-[10px] font-extrabold uppercase tracking-widest mb-2" style={{ color: MUTED }}>
          Vehicle
        </p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1">
          <p><span style={{ color: MUTED }}>Vehicle </span><Slot value={vehicle} minWidth={150} /></p>
          <p><span style={{ color: MUTED }}>Plate </span><Slot value={plate} minWidth={90} /></p>
          <p><span style={{ color: MUTED }}>Colour </span><Slot value={colour} minWidth={80} /></p>
          <p><span style={{ color: MUTED }}>Odometer out </span><Slot value={odoOut} minWidth={80} /></p>
          <p><span style={{ color: MUTED }}>Fuel out </span><Slot value={fuelOut} minWidth={70} /></p>
          <p><span style={{ color: MUTED }}>Odometer in </span><Slot value="" minWidth={80} /></p>
        </div>
      </div>

      <div className="mt-6 pt-5" style={{ borderTop: "1px solid #e7e2d9" }}>
        <p className="text-[10px] font-extrabold uppercase tracking-widest mb-2" style={{ color: MUTED }}>
          Rental period &amp; charges
        </p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1">
          <p><span style={{ color: MUTED }}>Release </span><Slot value={start} minWidth={130} /></p>
          <p><span style={{ color: MUTED }}>Return </span><Slot value={end} minWidth={130} /></p>
          <p>
            <span style={{ color: MUTED }}>Mileage allowance </span>
            <Slot value={mileageCap ? `${mileageCap} km/day` : ""} minWidth={90} />
          </p>
          <p>
            <span style={{ color: MUTED }}>Excess mileage </span>
            <Slot value={excessRate ? `${currency}${excessRate}/km` : ""} minWidth={80} />
          </p>
        </div>

        <dl className="mt-4 max-w-[320px] space-y-1">
          <div className="flex justify-between">
            <dt style={{ color: MUTED }}>
              {num(days) || "-"} day(s) at {money(num(rate))}
            </dt>
            <dd className="font-semibold">{money(r.base)}</dd>
          </div>
          <div className="flex justify-between">
            <dt style={{ color: MUTED }}>Other charges</dt>
            <dd className="font-semibold">{money(num(extras))}</dd>
          </div>
          <div className="flex justify-between pt-1.5 mt-1" style={{ borderTop: "1px solid #161616" }}>
            <dt className="font-extrabold">Rental total</dt>
            <dd className="font-extrabold">{money(r.total)}</dd>
          </div>
          <div className="flex justify-between">
            <dt style={{ color: MUTED }}>Refundable security deposit</dt>
            <dd className="font-semibold">{money(num(deposit))}</dd>
          </div>
          <div className="flex justify-between pt-1.5 mt-1" style={{ borderTop: "2px solid #161616" }}>
            <dt className="font-extrabold">Due at release</dt>
            <dd className="font-extrabold">{money(r.dueNow)}</dd>
          </div>
        </dl>
      </div>

      {terms.trim() ? (
        <div className="mt-6 pt-5" style={{ borderTop: "1px solid #e7e2d9" }}>
          <p className="text-[10px] font-extrabold uppercase tracking-widest mb-2" style={{ color: MUTED }}>
            Terms and conditions
          </p>
          <p style={{ color: MUTED, whiteSpace: "pre-line", fontSize: 11.5, lineHeight: 1.6 }}>{terms}</p>
        </div>
      ) : null}

      <p className="mt-6" style={{ fontSize: 11.5, color: MUTED }}>
        Both parties confirm the vehicle was inspected at release and that the details above are correct. By signing,
        the renter accepts the terms set out in this agreement.
      </p>

      <div className="grid grid-cols-2 gap-8 mt-9">
        <div>
          <div style={{ borderBottom: "1px solid #161616", height: 34 }} />
          <p className="text-[10px] font-extrabold uppercase tracking-widest mt-1.5" style={{ color: MUTED }}>
            Owner signature &amp; date
          </p>
        </div>
        <div>
          <div style={{ borderBottom: "1px solid #161616", height: 34 }} />
          <p className="text-[10px] font-extrabold uppercase tracking-widest mt-1.5" style={{ color: MUTED }}>
            Renter signature &amp; date
          </p>
        </div>
      </div>
    </>
  )

  return <DocShell form={form} sheet={sheet} onReset={reset} />
}
