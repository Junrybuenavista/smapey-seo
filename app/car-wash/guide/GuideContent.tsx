"use client"

import {
  Navbar, Footer, CTA, ArticleHero, AH2, AP, Bullets,
  INK, BLUE, CREAM, display, PRICES_PATH,
} from "@/components/car-wash/shared"

// The in-app assistant reads this page (admin Sync Guides), so every section
// says where things are and what the buttons are called, in the app's words.
const SECTIONS: { id: string; title: string; body: React.ReactNode }[] = [
  {
    id: "setup",
    title: "1. Set up your shop",
    body: (
      <>
        <AP>The first time you open Smapey Carwash it asks one question: what does this shop wash?</AP>
        <Bullets items={[
          <><strong>Cars</strong> - sizes Sedan / Hatchback, SUV / AUV / MPV, Pick-up and Van, with Wash, Wash &amp; Vacuum, Wax, Engine Wash, Interior Detailing and Glass Watermark Removal.</>,
          <><strong>Motorcycles</strong> - sizes Motorcycle and Big bike, with Wash, Wash &amp; Wax and Chain Clean &amp; Lube.</>,
          <><strong>Both</strong> - all six sizes and every service, on one board and one queue.</>,
        ]} />
        <AP>
          Only the owner or an admin can make that choice. Staff who open Carwash first are asked to wait for the owner.
        </AP>
        <AP>
          Your board then opens filled with <a href={PRICES_PATH} className="font-bold underline" style={{ color: INK }}>typical Philippine prices</a>, the
          average of price lists carwashes have published. They are a starting point, not your prices: a yellow note
          says <strong>These are typical prices, not yours yet</strong> until you change them and save, or tap{" "}
          <strong>These are my prices</strong> to keep them as they are. Services nobody had published a price for, like a
          motorcycle Wash &amp; Wax, start empty.
        </AP>
        <AP>
          If your board was set up before typical prices existed, the price board offers <strong>Fill with typical prices</strong>.
          It only fills empty boxes and never changes a price you typed.
        </AP>
      </>
    ),
  },
  {
    id: "price-board",
    title: "2. The price board",
    body: (
      <>
        <AP>
          The price board is a grid of services by vehicle size, and it is the price at the counter: nobody types an
          amount when taking a car in. Open it from <strong>Price Board</strong> in the Carwash menu.
        </AP>
        <Bullets items={[
          <><strong>Packages</strong> are the main wash, one per car. <strong>Add-ons</strong> are extras on top of a package.</>,
          "An empty box means you don't offer that service for that size, so it won't show at intake. 0 is a real price.",
          <>Tap <strong>+ Size</strong> or <strong>+ Service</strong> to add one, the pencil to rename it, and the arrows to change the order. The order on the board is the order at the counter.</>,
          "Retiring a size or service hides it from the board and from intake. Past tickets keep it, and you can bring it back from the Retired list.",
          <>Each service has two settings: whether the crew earns a share on it (say no for things like an air freshener sold at the counter), and whether it puts a stamp on the card.</>,
        ]} />
        <AP>
          Change any prices, then tap <strong>Save</strong>. Only the owner or an admin can change the board; staff see it with
          the prices filled in.
        </AP>
        <AP>
          To put your prices on the wall, tap <strong>Print price list</strong>. It makes a tarpaulin or poster from your board,
          in the size you pick, as an image to take to any tarpaulin printer or a page to print for the counter.
        </AP>
      </>
    ),
  },
  {
    id: "intake",
    title: "3. Take a car in",
    body: (
      <>
        <AP>On <strong>Queue</strong>, tap <strong>New car</strong> and type the plate.</AP>
        <Bullets items={[
          "A car that has been in before comes back with its size, its owner and their usual package already picked, and when it was last here.",
          "A new car needs a plate and a size. Make, model, the owner's name and phone number are optional; the phone number is only needed for texts.",
          "Tap the package and any add-ons. Prices come from your board and the total is worked out for you.",
          <>Pick <strong>who washed this car</strong>. Two or more people can share a car.</>,
          <>Under <strong>Drop-off photos</strong>, tap <strong>Take photo</strong> to shoot scratches and dents before washing. It uses the phone&apos;s camera, or a laptop&apos;s webcam. You can add up to six.</>,
        ]} />
        <AP>
          Charging something other than the board price needs the owner or an admin, and a reason. The change is recorded
          with who made it and shows on the owner&apos;s dashboard under today&apos;s price changes.
        </AP>
      </>
    ),
  },
  {
    id: "queue",
    title: "4. The queue",
    body: (
      <>
        <AP>
          Every car gets a queue number and moves through <strong>Waiting</strong>, <strong>Washing</strong> and <strong>Ready</strong>.
          Tap a car to open its ticket, then <strong>Start washing</strong> and <strong>Mark ready</strong>. <strong>Back to
          waiting</strong> and <strong>Back to washing</strong> undo a step, and <strong>Cancel ticket</strong> takes a car off the queue.
        </AP>
        <AP>
          <strong>TV display</strong> opens the queue in large type for a TV in the waiting area. It shows plates and queue numbers
          only, never names, phone numbers or prices, and refreshes by itself.
        </AP>
        <AP>
          Each ticket also has a <strong>Customer link</strong> with a QR code. The customer scans it to follow their car on their own
          phone, without an account: their queue number, how many cars are ahead, the status, the amount due and their
          stamp card.
        </AP>
      </>
    ),
  },
  {
    id: "payment",
    title: "5. Payment and release",
    body: (
      <>
        <AP>
          When a car is ready, tap <strong>Take payment &amp; release</strong> and pick how they paid: Cash, GCash, Maya, Card or Bank.
          A car can also be paid before it is ready with <strong>Take payment</strong>, and then simply released.
        </AP>
        <AP>
          A paid car can&apos;t be cancelled. If you are giving the money back, tap <strong>Undo payment</strong> first, then
          cancel it.
        </AP>
      </>
    ),
  },
  {
    id: "crew",
    title: "6. Crew and their share",
    body: (
      <>
        <AP>
          Add your washers on <strong>Crew</strong>. They don&apos;t need logins: this is your roster, not a list of accounts.
        </AP>
        <AP>Under <strong>How your crew is paid</strong>, choose one:</AP>
        <Bullets items={[
          <><strong>A percentage of each car</strong> - of what the car paid, after any discount.</>,
          <><strong>A fixed amount per car</strong> - the same amount for every car washed.</>,
        ]} />
        <AP>
          Each car&apos;s share is split evenly between everyone who washed it, and it is earned when the car is released.
          Anyone can have their own rate instead of the shop&apos;s. Retiring someone takes them off intake, and past payouts
          still show them.
        </AP>
        <AP>
          The payout shows each person&apos;s cars and share for the days you pick, plus any cars nobody was assigned to, so the
          gap is visible instead of lost. It exports to Excel.
        </AP>
      </>
    ),
  },
  {
    id: "stamp-card",
    title: "7. The stamp card",
    body: (
      <>
        <AP>
          Turn it on in <strong>Settings</strong> under <strong>Stamp card</strong>: pick after how many washes the next one is free,
          from 2 to 50, and which service is free. The count lives on the plate, so there is no paper card.
        </AP>
        <Bullets items={[
          "Counting starts when you turn it on. Earlier visits don't earn free washes.",
          "Which services put a stamp on the card is set per service on the price board.",
          <>When a car has earned one, the counter sees <strong>Free wash available</strong>. Tap <strong>Use free wash</strong> to put it on the ticket.</>,
          <>Under <strong>Crew on a free wash</strong>, choose whether the crew <strong>Gets their share</strong> or <strong>Gets nothing</strong> on it.</>,
          "Cancelling a free wash gives the washes back, so nobody loses a reward to a mistake.",
        ]} />
      </>
    ),
  },
  {
    id: "texts",
    title: "8. Ready texts",
    body: (
      <>
        <AP>
          A ready text tells the customer their car is ready, using your SMS credits. When taking a car in with a phone
          number, tick <strong>Text them when it&apos;s ready</strong>, and the text goes out when the car is marked ready. On a ready
          car, <strong>Text now</strong> sends it by hand.
        </AP>
        <AP>
          Your SMS credits are under <strong>Settings</strong>, in <strong>Ready texts</strong>. The
          customer link works without any text, so a shop that doesn&apos;t send texts can hand over the QR code instead.
        </AP>
      </>
    ),
  },
  {
    id: "closing",
    title: "9. Expenses and closing the day",
    body: (
      <>
        <AP>
          Record money spent during the day with <strong>Expense</strong> on the Queue: the amount, what it was for (Supplies, Meals,
          Water, Electricity, Repairs, Rent or Other), whether it came out of the drawer, a note and a photo of the receipt.
        </AP>
        <AP>At the end of the day, open <strong>Closing</strong>. It shows:</AP>
        <Bullets items={[
          <><strong>Opening cash</strong> - what was in the drawer at the start.</>,
          <><strong>Cash taken</strong> - cash paid for cars released today.</>,
          <><strong>Expenses</strong> paid from the drawer, and <strong>Crew pay from the drawer</strong> if the crew was paid out of this cash.</>,
          <><strong>Should be in the drawer</strong> - the opening cash plus cash taken, less what came out.</>,
        ]} />
        <AP>
          Under <strong>Count the drawer</strong>, type the total or tap <strong>Count by bill</strong> to count each denomination, and
          the difference shows straight away as short or over. GCash, Maya, card and bank payments are listed under{" "}
          <strong>Not in the drawer</strong>. Tap <strong>Close today</strong> to finish. When staff close the day, the owner gets a
          notice with the result.
        </AP>
        <AP>
          A closed day is locked: cars can&apos;t be added, paid or released on it, and its expenses can&apos;t change. The owner or
          an admin can reopen it and must say why. The earlier closing stays on record, under <strong>Reopened closings</strong>.
        </AP>
      </>
    ),
  },
  {
    id: "numbers",
    title: "10. The dashboard and analytics",
    body: (
      <>
        <AP>
          <strong>Dashboard</strong> shows the day: what was paid by each method, the last closing, and today&apos;s price changes and
          cancellations, so the owner can check the counter from anywhere.
        </AP>
        <AP>
          <strong>Analytics</strong> covers any date range: revenue, cars washed, which services and sizes earned the most, each
          washer&apos;s share, free washes, discounts and price changes, the busiest days and hours, and how many cars came back.
          Revenue counts on the day a car is released, and cancelled cars are left out of every figure. Analytics shows the
          shop&apos;s money and the crew&apos;s pay, so only the owner and admins see it.
        </AP>
      </>
    ),
  },
]

export default function GuideContent() {
  return (
    <div style={{ background: "#fff" }}>
      <Navbar />

      <main>
        <ArticleHero
          badge="Guide"
          title="How to run your car wash with Smapey Carwash"
          intro="Set-up to closing, in the order you will meet it. The same guide covers car washes, motor washes and shops that do both: it's one product, and the only thing your choice changes is which sizes and services you start with."
        />

        <section className="py-16 px-6" style={{ background: "#fff", fontFamily: display.fontFamily }}>
          <div className="max-w-3xl mx-auto">
            <nav className="rounded-[22px] border-2 p-6 mb-14" style={{ borderColor: INK, background: CREAM }} aria-label="On this page">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>On this page</p>
              <ol className="grid sm:grid-cols-2 gap-y-2 gap-x-6">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {SECTIONS.map((s) => (
              <div key={s.id} id={s.id} className="scroll-mt-24 mb-12">
                <AH2>{s.title}</AH2>
                {s.body}
              </div>
            ))}

          </div>
        </section>
      </main>

      <CTA />
      <Footer />
    </div>
  )
}
