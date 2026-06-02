"use client"

import {
  Droplets, Boxes, Truck, PackageOpen, Users, Settings, MessageSquare,
  BarChart3, CreditCard, Lightbulb, ArrowRight, CheckCircle2, BookOpen,
} from "lucide-react"
import InternalLinks from "@/components/InternalLinks"
import { Navbar, Footer, CTA, Animate, HeroShell, HeroBadge, REGISTER_URL } from "../_shared"

//////////////////////////////////////////////////////
// SMALL BUILDING BLOCKS
//////////////////////////////////////////////////////
function Callout({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="my-6 rounded-2xl border border-cyan-200 bg-cyan-50/70 p-5">
      <div className="flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
        <div>
          {title && <p className="font-semibold text-cyan-900 mb-1">{title}</p>}
          <div className="text-sm text-cyan-900/80 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}

function Example({ children, title = "Quick example" }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{title}</p>
      <div className="text-sm text-slate-600 leading-relaxed space-y-2">{children}</div>
    </div>
  )
}

function Steps({ items }: { items: { t: string; d: string }[] }) {
  return (
    <ol className="my-6 space-y-4">
      {items.map((s, i) => (
        <li key={i} className="flex gap-4">
          <span className="shrink-0 w-8 h-8 rounded-full bg-cyan-600 text-white text-sm font-bold flex items-center justify-center">
            {i + 1}
          </span>
          <div className="pt-0.5">
            <p className="font-semibold text-slate-800">{s.t}</p>
            <p className="text-sm text-slate-500 leading-relaxed mt-0.5">{s.d}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

function H2({ id, icon: Icon, children }: { id: string; icon: any; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 flex items-center gap-3 text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mt-16 mb-4">
      <span className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-cyan-600" />
      </span>
      {children}
    </h2>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-slate-600 leading-relaxed my-4">{children}</p>
}

//////////////////////////////////////////////////////
// TABLE OF CONTENTS
//////////////////////////////////////////////////////
const TOC = [
  { id: "big-idea", label: "The big idea (read this first)" },
  { id: "setup", label: "1. Set up your station" },
  { id: "deliveries", label: "2. Take a delivery order" },
  { id: "containers", label: "3. Container deposits explained" },
  { id: "returns", label: "4. Record returned empties" },
  { id: "inventory", label: "5. Inventory & refills" },
  { id: "payments", label: "6. Payments" },
  { id: "sms", label: "7. SMS notifications" },
  { id: "dashboard", label: "8. The dashboard" },
  { id: "glossary", label: "Glossary" },
]

export default function GuideContent() {
  return (
    <main className="bg-white">
      <Navbar />

      {/* HERO */}
      <HeroShell>
        <div className="max-w-3xl mx-auto text-center">
          <HeroBadge>Step-by-step guide</HeroBadge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight mb-6">
            How to run your water refilling station with Smapey
          </h1>
          <p className="text-lg text-white/50 leading-relaxed">
            This app does a lot — so we wrote this guide in plain language. No jargon. Just follow it top to bottom
            and you'll understand the whole system, including the part everyone finds confusing: tracking who is holding your bottles.
          </p>
        </div>
      </HeroShell>

      <article className="max-w-3xl mx-auto px-6 py-16">

        {/* TOC */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 mb-4">
          <p className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-4">
            <BookOpen className="w-4 h-4 text-cyan-600" /> What's in this guide
          </p>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
            {TOC.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`} className="text-sm text-slate-600 hover:text-cyan-600 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-cyan-400" /> {t.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* THE BIG IDEA */}
        <Animate>
          <H2 id="big-idea" icon={Droplets}>The big idea (read this first)</H2>
          <P>
            A water refilling station has to keep track of <strong>two completely different things</strong>. Once these
            click, the whole app makes sense:
          </P>
          <div className="grid sm:grid-cols-2 gap-4 my-6">
            <div className="rounded-2xl border border-slate-200 p-5 bg-white shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center mb-3">
                <Boxes className="w-5 h-5 text-cyan-600" />
              </div>
              <p className="font-bold text-slate-800 mb-1">1. The water you sell</p>
              <p className="text-sm text-slate-500 leading-relaxed">
                Filled gallons sitting at your station, ready to sell. This is your <strong>inventory / stock</strong>.
                It goes up when you refill, and down when you deliver.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-5 bg-white shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mb-3">
                <PackageOpen className="w-5 h-5 text-blue-600" />
              </div>
              <p className="font-bold text-slate-800 mb-1">2. The bottles you lend out</p>
              <p className="text-sm text-slate-500 leading-relaxed">
                The physical containers customers borrow. This is the <strong>container deposit</strong>. You need to
                know who is holding how many of your bottles so they come back.
              </p>
            </div>
          </div>
          <Callout title="Think of it like a library">
            The <strong>water</strong> is like the knowledge inside a book — you "sell" it. The <strong>bottle</strong> is
            like the physical book — you lend it and expect it back. Smapey tracks both separately, because a returned
            empty bottle is <em>not</em> the same as sellable water. It has to be refilled first.
          </Callout>
        </Animate>

        {/* SETUP */}
        <Animate>
          <H2 id="setup" icon={Settings}>1. Set up your station</H2>
          <P>Do this once, in this order, and everything afterwards is faster.</P>
          <Steps items={[
            { t: "Open Settings and set your defaults", d: "Go to Water Refilling → Settings. Set your default price per gallon (e.g. ₱25), default container deposit (e.g. ₱0 or ₱150 per bottle), and a low-stock threshold (the number where Smapey warns you to refill)." },
            { t: "Add your delivery routes", d: "Go to Routes and add the areas you serve — e.g. 'Barangay San Jose' or 'Downtown'. This lets you group customers and plan a delivery run." },
            { t: "Add your customers", d: "Go to Customers → New Customer. Just the name is required. Leave the price blank to use your station default, or set a special price for that customer. Assign them to a route if you deliver." },
          ]} />
          <Callout title="You only set the price once">
            Because new customers automatically inherit your default price and deposit, you don't have to type ₱25 over
            and over. Only change it for the rare customer who pays a different rate.
          </Callout>
        </Animate>

        {/* DELIVERIES */}
        <Animate>
          <H2 id="deliveries" icon={Truck}>2. Take a delivery order</H2>
          <P>Every time you sell water — walk-in or delivery — you create an order.</P>
          <Steps items={[
            { t: "Go to Orders → New Delivery Order", d: "Pick the customer. Their price fills in automatically." },
            { t: "Enter 'Gallons to Deliver'", d: "How many filled gallons the customer is taking today, e.g. 5." },
            { t: "Enter 'Empty Returned' (if any)", d: "If they hand back empty bottles at the same time, type the number here. Leave it 0 if they didn't bring any back." },
            { t: "Create the order", d: "It starts as Pending. As the delivery happens you move it Pending → Out for Delivery → Delivered." },
            { t: "Mark it Delivered", d: "When you confirm delivery, Smapey automatically subtracts those gallons from your stock and records the sale." },
          ]} />
          <Callout title="Why status matters">
            Gallons on Pending / Out-for-Delivery orders are shown as <strong>Reserved</strong> in inventory — they're
            promised but not gone yet. They only leave your stock when the order is marked <strong>Delivered</strong>.
          </Callout>
        </Animate>

        {/* CONTAINERS */}
        <Animate>
          <H2 id="containers" icon={PackageOpen}>3. Container deposits explained</H2>
          <P>
            This is the part that confuses everyone, so let's go slow. For every customer, Smapey keeps a simple running count:
          </P>
          <div className="my-6 rounded-2xl bg-slate-900 p-6 text-center">
            <p className="text-white/60 text-sm">
              <span className="text-cyan-400 font-semibold">Bottles you've lent out</span>
              {"  −  "}
              <span className="text-blue-400 font-semibold">Bottles they've returned</span>
            </p>
            <p className="text-white text-lg font-bold mt-2">= Containers the customer is still holding</p>
          </div>
          <P>
            Every time you deliver gallons, the "lent out" number goes up. Every time they return empties, the "returned"
            number goes up. The difference is what they still owe you in physical bottles.
          </P>
          <Example title="Example: Juan">
            <p>• Juan orders 10 gallons over the month → he's now holding <strong>10</strong> of your bottles.</p>
            <p>• Next visit, Juan hands back 8 empties → he's now holding <strong>2</strong>.</p>
            <p>• Smapey shows Juan's "outstanding containers" as <strong>2</strong> — no notebook needed.</p>
          </Example>
        </Animate>

        {/* RETURNS */}
        <Animate>
          <H2 id="returns" icon={PackageOpen}>4. Record returned empties</H2>
          <P>There are two situations, and Smapey handles both.</P>
          <P><strong>A) Empties come back during a delivery.</strong> Just type the number in the "Empty Returned" field on the order (see step 2). Done.</P>
          <P><strong>B) A customer just drops by to return empties — no purchase.</strong> Use the dedicated Returns page:</P>
          <Steps items={[
            { t: "Go to Returns → Record Return", d: "Pick the customer. Smapey shows how many bottles they're currently holding." },
            { t: "Enter how many empties they returned", d: "For example, 8. Add a note if you like." },
            { t: "Save", d: "Their outstanding container count drops immediately, and the return is logged with the date and who recorded it." },
          ]} />
          <Callout title="Important: returned empties are NOT sellable yet">
            When a bottle comes back empty, it lowers the customer's count — but you can't sell it until you refill it.
            That's what the next section is about.
          </Callout>
        </Animate>

        {/* INVENTORY */}
        <Animate>
          <H2 id="inventory" icon={Boxes}>5. Inventory &amp; refills</H2>
          <P>The Inventory page shows four numbers:</P>
          <ul className="my-4 space-y-2">
            {[
              ["Total Stock", "Filled gallons you can sell right now."],
              ["Reserved (pending)", "Gallons promised to orders that aren't delivered yet."],
              ["Available (after pending)", "Stock minus reserved — what's truly free to sell."],
              ["Empties on Hand", "Returned empty bottles waiting to be refilled."],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3 text-sm">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                <span className="text-slate-600"><strong className="text-slate-800">{t}:</strong> {d}</span>
              </li>
            ))}
          </ul>
          <P>There are three buttons:</P>
          <Steps items={[
            { t: "Restock — water from a supplier", d: "Got filled gallons delivered from a bulk supplier? Enter the amount. Stock goes up." },
            { t: "Refill Empties — turn returned bottles into stock", d: "After you refill the empties customers returned, enter the number here. Stock goes up and 'Empties on Hand' goes down. This is the step that closes the loop." },
            { t: "Manual Adjustment — fix mistakes", d: "Use + or − to correct stock after a physical count, or to write off broken bottles." },
          ]} />
          <Example title="Example: the full loop">
            <p>• You start the day with <strong>38</strong> filled gallons in stock.</p>
            <p>• Juan returns <strong>12</strong> empties → Empties on Hand shows <strong>12</strong>. Stock is still 38 (empties aren't sellable).</p>
            <p>• You refill those 12 bottles, then click <strong>Refill Empties → 12</strong>.</p>
            <p>• Now Stock = <strong>50</strong>, Empties on Hand = <strong>0</strong>. The loop is closed. 🎉</p>
          </Example>
        </Animate>

        {/* PAYMENTS */}
        <Animate>
          <H2 id="payments" icon={CreditCard}>6. Payments</H2>
          <P>
            Every order is Unpaid until you mark it Paid. Open the order and choose how they paid — Cash, GCash, Maya,
            or Bank Transfer. Your dashboard then shows today's revenue and any unpaid balances so you always know who still owes you.
          </P>
        </Animate>

        {/* SMS */}
        <Animate>
          <H2 id="sms" icon={MessageSquare}>7. SMS notifications</H2>
          <P>
            Smapey can automatically text a customer when their delivery is on the way. It's an <strong>optional toggle</strong> —
            turn it on when you want the heads-up texts going out, and off when you don't. Customers don't need any app;
            the message goes to their phone number.
          </P>
        </Animate>

        {/* DASHBOARD */}
        <Animate>
          <H2 id="dashboard" icon={BarChart3}>8. The dashboard</H2>
          <P>Your home screen answers the questions you ask every day:</P>
          <ul className="my-4 space-y-2">
            {[
              "How many orders today, and how many are still pending delivery?",
              "How much did I collect today and this month?",
              "Who hasn't paid yet, and how much?",
              "How much stock do I have, and am I running low?",
              "How many of my containers are still out with customers?",
            ].map((t) => (
              <li key={t} className="flex gap-3 text-sm">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                <span className="text-slate-600">{t}</span>
              </li>
            ))}
          </ul>
        </Animate>

        {/* GLOSSARY */}
        <Animate>
          <H2 id="glossary" icon={BookOpen}>Glossary</H2>
          <dl className="my-4 space-y-4">
            {[
              ["Stock / Inventory", "Filled gallons you can sell right now."],
              ["Reserved", "Gallons promised to orders not yet delivered."],
              ["Container deposit", "The bottles a customer is holding, lent out against a deposit."],
              ["Outstanding containers", "Bottles a customer still has = lent out − returned."],
              ["Empties on hand", "Returned empty bottles waiting to be refilled into stock."],
              ["Refill", "Turning empties back into sellable stock with one click."],
            ].map(([t, d]) => (
              <div key={t} className="border-l-2 border-cyan-200 pl-4">
                <dt className="font-semibold text-slate-800">{t}</dt>
                <dd className="text-sm text-slate-500">{d}</dd>
              </div>
            ))}
          </dl>
        </Animate>

        {/* INLINE CTA */}
        <Animate>
          <div className="mt-16 rounded-3xl bg-gradient-to-br from-cyan-600 to-blue-700 p-8 text-center text-white">
            <Droplets className="w-8 h-8 mx-auto mb-3 text-cyan-200" />
            <h3 className="text-2xl font-extrabold mb-2">Ready to try it on your own station?</h3>
            <p className="text-cyan-100/80 text-sm mb-6 max-w-md mx-auto">
              The free plan is enough to run a small station. No credit card, set up in five minutes.
            </p>
            <a href={REGISTER_URL} className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-white text-cyan-700 font-semibold text-sm hover:bg-cyan-50 transition-colors">
              Create your free account <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </Animate>
      </article>

      <CTA />
      <InternalLinks cluster="water-refilling" currentPath="/water-refilling/guide" />
      <Footer />
    </main>
  )
}
