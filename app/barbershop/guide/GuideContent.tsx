"use client"

import {
  Navbar, Footer, CTA, ArticleHero, AH2, AP, Bullets,
  INK, BLUE, CREAM, display,
} from "@/components/barbershop/shared"

// The in-app assistant reads this page (admin Sync Guides), so every section
// says where things are and what the buttons are called, in the app's words.
const SECTIONS: { id: string; title: string; body: React.ReactNode }[] = [
  {
    id: "setup",
    title: "1. Set up your shop",
    body: (
      <>
        <AP>
          The first time the owner or an admin opens Barbershop, <strong>Set up your barbershop</strong> asks two things.
          You can change both later.
        </AP>
        <Bullets items={[
          <><strong>What services do you offer?</strong> Tick what you offer and type your price. Leave a price blank to set it later.</>,
          <><strong>How much of each service goes to the barber?</strong> This is the shop&apos;s commission. Pick 40%, 50% or 60%, type your own, or pick <strong>On salary (0%)</strong> if your barbers are paid a wage: the menu and the queue work the same either way.</>,
        ]} />
        <AP>
          Tap <strong>Set up my shop</strong>, then add your barbers. Staff who open Barbershop before it&apos;s set up are asked
          to wait for the owner.
        </AP>
      </>
    ),
  },
  {
    id: "barbers",
    title: "2. Barbers and commission",
    body: (
      <>
        <AP>
          On <strong>Barbers</strong>, tap <strong>Add a barber</strong>: the name customers call them, a mobile number if you
          like, and their commission.
        </AP>
        <Bullets items={[
          <><strong>The shop&apos;s share</strong> uses the rate under <strong>Barber&apos;s commission</strong> at the top of the page. A change there counts from then on.</>,
          <><strong>Their own share</strong> gives one barber a different rate, say for a senior barber.</>,
          "A barber's share comes from the services on each customer's bill, and it's fixed when the customer pays, so changing a rate never rewrites what was already earned.",
          <><strong>Remove</strong> takes a barber off your list. You can bring them back any time.</>,
        ]} />
        <AP>
          <strong>Payouts</strong> shows what each barber earned from customers who paid in the days you pick: Today,
          Yesterday, This week, This month, or your own dates. It exports to <strong>Excel</strong>.
        </AP>
        <AP>
          The Free plan has room for two barbers. To add more, upgrade from <strong>See plans</strong>, or remove one first.
          Only the owner or an admin can add barbers and change commission.
        </AP>
      </>
    ),
  },
  {
    id: "services",
    title: "3. Services",
    body: (
      <>
        <AP>
          <strong>Services</strong> is your menu, with prices and time in the chair. Tap <strong>Add a service</strong>, or tap
          a service to change it.
        </AP>
        <Bullets items={[
          <><strong>Price</strong>: leave it blank if you haven&apos;t decided, and 0 means free. A service needs a price before it can go on a customer&apos;s bill.</>,
          <><strong>Time in the chair</strong>: 5 to 480 minutes. The queue uses it to work out each customer&apos;s wait.</>,
          <><strong>Barber earns commission on this</strong>: turn it off for something the barber doesn&apos;t do, like a shampoo by an assistant.</>,
          <>A <strong>Description</strong> if you like, such as &ldquo;Hot towel included&rdquo;.</>,
          <>Use the arrows to change the order of your menu. <strong>Remove</strong> takes a service off it, and you can bring it back any time.</>,
        ]} />
        <AP>Only the owner or an admin can change services.</AP>
      </>
    ),
  },
  {
    id: "add",
    title: "4. Add customers to the line",
    body: (
      <>
        <AP>On <strong>Queue</strong>, tap <strong>Add customer</strong> when someone walks in.</AP>
        <Bullets items={[
          <>Under <strong>Returning customer?</strong>, search a name or mobile number. A regular comes back with their usual barber, services and notes filled in. If they&apos;re already in line, in the chair or reserved today, the search says so, and the same customer can&apos;t be added twice in a day.</>,
          <><strong>Name to call</strong> is all a walk-in needs. A <strong>Mobile</strong> number is optional, and saves them as a customer.</>,
          <>Tick <strong>Text them when they&apos;re next</strong> so they can step out while they wait. Tick <strong>OK to text reminders</strong> only if they agree to a &ldquo;time for your next cut&rdquo; text later.</>,
          <>Pick a <strong>Barber</strong>, or <strong>Anyone</strong> for whoever is free first.</>,
          <>Tick the <strong>Services</strong>, add any <strong>Notes</strong> like &ldquo;low fade, #2 on the sides&rdquo;, and tap <strong>Add to the line</strong>.</>,
        ]} />
        <AP>
          To hold a time for someone, tap <strong>Reserve</strong> instead and pick the date and time. They keep their place in
          line from that time, with 10 minutes&apos; grace, and show under <strong>Reservations</strong>. Tap{" "}
          <strong>Arrived</strong> when they walk in.
        </AP>
        <AP>
          Each plan covers a number of customers a month, and the Queue shows how many you&apos;ve used as you get close. The
          Free plan covers 200.
        </AP>
      </>
    ),
  },
  {
    id: "queue",
    title: "5. Run the queue",
    body: (
      <>
        <AP>
          The top of the Queue has a card for each barber: who&apos;s <strong>In the chair</strong> and how long they&apos;ve been
          there against the time their services take, or <strong>Free</strong> and who&apos;s next for them.
        </AP>
        <Bullets items={[
          <><strong>Call next</strong> seats the right customer in that barber&apos;s chair: their own customers first, then whoever will take anyone.</>,
          <><strong>Done</strong> ends the cut and opens the bill.</>,
          "The arrow puts a customer back in line, and the X removes them, with a reason if you want to give one.",
          <><strong>Off today</strong> takes a barber out of the line for the day, and <strong>Working today</strong> brings them back. Anyone waiting for a barber who&apos;s off is flagged.</>,
        ]} />
        <AP>
          Under <strong>Waiting</strong>, each customer shows their wait and tags like <strong>For</strong> a barber,{" "}
          <strong>Anyone</strong>, <strong>Online</strong>, <strong>On the way</strong>, <strong>Reserved</strong>,{" "}
          <strong>Wants a text</strong> or <strong>Texted</strong>.
        </AP>
        <Bullets items={[
          <>When exactly one free barber has them next, the button reads <strong>Start with</strong> and that barber&apos;s name. Otherwise <strong>Start</strong> asks who&apos;s cutting them and shows each free barber&apos;s next customer, so jumping the line is a choice, not a slip.</>,
          <>Someone who joined from their phone shows as <strong>On the way</strong>. They keep their place, but Call next skips them until you tap <strong>Here</strong>.</>,
          <><strong>Text</strong> tells them they&apos;re next with one tap. It stands out when their turn is about five minutes away.</>,
          "The QR button shows a code the customer scans to follow their place in line on their own phone, with no app or sign-up.",
          <>Anyone left over from an earlier day shows at the top, with <strong>Clear them</strong>.</>,
        ]} />
        <AP>
          <strong>TV display</strong> opens the line in large type for a TV in the waiting area: each barber&apos;s chair and
          who&apos;s next, the waiting numbers, and who&apos;s on the way. It shows queue numbers only, never names, notes or
          prices, and refreshes by itself.
        </AP>
      </>
    ),
  },
  {
    id: "payment",
    title: "6. Take payment",
    body: (
      <>
        <AP>
          <strong>Done</strong> opens the bill. Anyone not paid yet waits under <strong>To pay</strong>, with a{" "}
          <strong>Take payment</strong> button.
        </AP>
        <Bullets items={[
          <><strong>What they had</strong> starts with the services they were added with. Add or take off what they actually had.</>,
          <>Under <strong>Products they&apos;re buying</strong>, tap a product and use − and + for how many.</>,
          <>The owner or an admin can give a <strong>Discount</strong>, with a reason: Suki, Senior / PWD, Promo, or your own.</>,
          <>Pick how they paid: Cash, GCash, Maya or Card. For cash, type the <strong>Cash received</strong> and the change shows.</>,
          <>A booking&apos;s deposit comes off the bill as <strong>Deposit paid by GCash</strong>, with what&apos;s left <strong>To collect</strong>.</>,
        ]} />
        <AP>
          Tap <strong>Take</strong> and the amount to finish, or <strong>Pay later</strong> to leave them under To pay. The
          barber&apos;s share is worked out the moment they pay.
        </AP>
        <AP>
          Paid customers are listed under <strong>Paid today</strong>. If a payment was wrong, tap its undo button and say why:
          Wrong payment method, Wrong customer, Refunded, or your own reason. They go back to To pay, and any products go back
          on the shelf.
        </AP>
        <AP>
          For someone buying without a cut, tap <strong>Sell products</strong> on the Queue. Pick the products and how they
          paid. Under <strong>Sold by</strong>, choose <strong>The counter</strong> or the barber who sold it, which matters
          when a product pays its seller a share. Counter sales don&apos;t count toward your plan&apos;s customers.
        </AP>
      </>
    ),
  },
  {
    id: "closing",
    title: "7. Closing",
    body: (
      <>
        <AP>
          <strong>Closing</strong> is the day&apos;s money: what came in, how, and what each barber earned. Use{" "}
          <strong>Previous day</strong> and <strong>Next day</strong> to look back. It shows:
        </AP>
        <Bullets items={[
          <><strong>Sales</strong>, the <strong>Customers</strong> who paid that day, what the <strong>Barbers</strong> earned, and what the <strong>Shop keeps</strong>.</>,
          <><strong>How customers paid</strong>. Cash is what should be in the drawer from that day&apos;s customers, before anything is paid out. GCash, deposits included, is listed apart.</>,
          <><strong>Products sold</strong>.</>,
          "Each barber's customers, sales, share, and what the shop keeps. Tap a barber to see their customers.",
          <><strong>Payments undone</strong>, with who did it and why.</>,
        ]} />
        <AP>
          Customers still under To pay aren&apos;t in the figures until they pay, and Closing reminds you to take their
          payment from the Queue. <strong>Excel</strong> exports the day, products included. Closing is for the owner and
          admins.
        </AP>
      </>
    ),
  },
  {
    id: "customers",
    title: "8. Customers and texts",
    body: (
      <>
        <AP>
          <strong>Customers</strong> keeps your regulars: who usually cuts them, how they like it, and every visit. A customer
          is saved when you type their mobile number in the queue, or with <strong>Add customer</strong> here.
        </AP>
        <Bullets items={[
          "Search a name or mobile number. Tap a customer for their visits, their last visit, their usual barber and how they like their cut.",
          <>Tick <strong>OK to text reminders</strong> only if they agreed to a reminder text.</>,
          <>Removed customers are hidden. <strong>Show removed</strong> lists them, and you can bring one back.</>,
        ]} />
        <AP>
          <strong>Time for their next cut</strong> lists who&apos;s due for a reminder: customers who agreed and haven&apos;t been
          back in 21 days, or the number you set under <strong>Remind after</strong>, from 7 to 120 days. It shows what a
          reminder says, and <strong>Send</strong> texts the ones you&apos;ve ticked.
        </AP>
        <AP>
          For now, texts reach Globe and TM numbers only, and other numbers are marked as unreachable before you try. Texts
          come out of your plan&apos;s monthly allowance first, then your text credits, both shown on the same page. If it says
          texts aren&apos;t switched on for Barbershop yet, ask Smapey support to turn them on.
        </AP>
      </>
    ),
  },
  {
    id: "online",
    title: "9. Your online page",
    body: (
      <>
        <AP>
          On <strong>Online</strong>, the owner or an admin sets up the shop&apos;s own page, where customers see the wait and
          can join the line or book a time from their phone.
        </AP>
        <Bullets items={[
          <><strong>Your page</strong>: pick its link, in letters, numbers and dashes. Changing it later breaks links and posters you&apos;ve already shared. <strong>Copy link</strong> and <strong>Open page</strong> sit beside it.</>,
          <><strong>Opening hours</strong>: when you open and close, and the days you&apos;re closed. Joining and booking online only happen inside these hours.</>,
          <><strong>Join the line from their phone</strong>: customers get a number and hold their place, showing as On the way until you tap Here. Set how many people can be on their way at once; it starts at 5.</>,
          <><strong>Book a time</strong>: customers pick a barber, a day up to two weeks ahead, and a free half hour. Bookings show under Reservations on the Queue.</>,
          <><strong>Deposit</strong>, if you want one: the amount, your GCash number and the name on the account. Customers send it straight to your GCash and type the reference number. Check your GCash, then tap <strong>Deposit received</strong> on the booking. It comes off their bill when they pay. Smapey never holds the money, so refunds are yours to send.</>,
          <><strong>A note on your page</strong>, like a landmark or where to park.</>,
          <><strong>QR poster</strong>: your page&apos;s QR code on a poster for the door or the counter. <strong>Save image</strong> or <strong>Print</strong> it.</>,
        ]} />
        <AP>
          Customers see whether you&apos;re open, the wait right now, which barbers are free or off, and your services with
          prices. To join, they give a name and mobile number, a barber or Anyone, and what they&apos;d like. They get a number
          and their own page showing their place in line, with an <strong>I can&apos;t come</strong> button that frees it.
        </AP>
        <AP>
          Joining pauses by itself when the shop is closed, when no barber is working, when the line is too long to finish
          before closing, or when too many people are already on their way. Online customers count toward your plan&apos;s
          customers for the month.
        </AP>
      </>
    ),
  },
  {
    id: "products",
    title: "10. Products and stock",
    body: (
      <>
        <AP>
          <strong>Products</strong> is for pomade, wax and the rest, which come off the shelf as you sell them, on a bill or at
          the counter. Tap <strong>Add product</strong>:
        </AP>
        <Bullets items={[
          <><strong>Price</strong>, and <strong>Your cost</strong> if you like: what you paid for one, so Analytics can show the profit. Customers never see it, and neither do staff.</>,
          <><strong>Barber&apos;s share</strong>: leave it empty and barbers earn nothing on it, which is the usual way. Set it, and the barber who sells it earns that much of its price.</>,
          <><strong>Warn when down to</strong>: the count at which it shows as running low.</>,
          <><strong>On the shelf now</strong>: how many you have.</>,
        ]} />
        <AP>
          To change the count, tap <strong>Stock</strong> and say what happened: a <strong>Delivery</strong>, a{" "}
          <strong>Correction</strong> when stock was damaged, used in the shop, lost or given away, or a{" "}
          <strong>Count</strong> of what&apos;s on the shelf. Every change is kept in its <strong>History</strong>.
        </AP>
        <AP>
          Stock comes off with every sale and goes back when a payment is undone. A sale is never blocked because the count
          says zero; the product is flagged instead, so you can fix the count. Only the owner or an admin can change products
          and stock.
        </AP>
      </>
    ),
  },
  {
    id: "analytics",
    title: "11. Analytics",
    body: (
      <>
        <AP>
          <strong>Analytics</strong> shows the shop&apos;s money and the barbers&apos; pay, so only the owner and admins see it.
          Pick This week, This month, Last month or your own dates. Like Closing, it counts each customer on the day they
          paid.
        </AP>
        <Bullets items={[
          "Customers, sales after discounts with products included, the average per customer, and how many saved customers came back.",
          "Where the money came from: services, products, discounts, the barbers' share and what the shop keeps.",
          "Sales per day, and the busiest times by the hour customers came in, for deciding who works when.",
          "Your services by how often each was done, and products by units sold, with profit where you've set the cost.",
          "Each barber's customers, sales, share and usual time in the chair.",
          "The average wait and time in the chair, results from your online page, and products running low.",
        ]} />
      </>
    ),
  },
  {
    id: "roles",
    title: "12. Owner and staff",
    body: (
      <>
        <AP>
          Staff see <strong>Queue</strong>, <strong>Customers</strong>, <strong>Barbers</strong>, <strong>Services</strong>{" "}
          and <strong>Products</strong>. They run the line, take payments, sell products, and add and edit customers.
        </AP>
        <AP>
          Only the owner or an admin can change services, barbers and commission, give discounts, change products and stock,
          send reminders and set up the online page, and only they see Closing and Analytics. Staff see product prices and
          stock, never what you paid for a product.
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
          title="How to run your barbershop with Smapey Barbershop"
          intro="Set-up to closing, in the order you'll meet it: your menu and barbers, the walk-in line, payment and each barber's share, then texts, your online page, products and the numbers."
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
