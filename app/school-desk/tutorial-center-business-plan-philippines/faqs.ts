// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  {
    q: "Do I need a business plan to start a tutorial center?",
    a: "You don't legally need one, but a simple plan keeps you focused, it forces you to think through your market, pricing, costs, and break-even point before you spend money. Even a one-page plan dramatically improves your odds.",
  },
  {
    q: "How much profit can a tutorial center make?",
    a: "Margins are healthy because overhead is low. A small center with 30–40 students paying ₱2,000–₱3,000/month can gross ₱60,000–₱120,000 monthly, with tutor pay and rent as the main costs. Profit hinges on filling seats and collecting tuition on time.",
  },
  {
    q: "What's the break-even point for a tutorial center?",
    a: "Most home-based centers break even within the first 2–4 months once they reach 15–20 paying students. Commercial spaces take longer because of rent. Tracking tuition collection tightly is what gets you to break-even faster.",
  },
  {
    q: "How do I project income in my business plan?",
    a: "Estimate students × monthly tuition, minus tutor pay, rent, utilities, and materials. Build a conservative case (low enrollment) and a target case. Then track actuals against it, which is far easier with software than spreadsheets.",
  },
  {
    q: "What tool should I use to run the center after planning?",
    a: "Smapey SchoolDesk is free to start and manages the operations your plan describes (enrollments, tuition tracking, sessions, and attendance) so your real numbers stay visible.",
  },
]

