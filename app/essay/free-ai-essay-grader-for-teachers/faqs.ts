// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Is the free plan really free forever?", a: "Yes. The Free plan has no expiry. You can grade up to 30 essays per month and create 5 assignments, forever, at no cost. No credit card required to sign up." },
  { q: "What happens when I hit the 30 submission limit?", a: "You'll see a notification when you're approaching the limit. You can upgrade to Pro for unlimited submissions, or wait for your monthly limit to reset." },
  { q: "Can I upgrade from free to paid anytime?", a: "Yes, instantly. Your existing assignments and results carry over when you upgrade." },
  { q: "Is the AI grading on the free plan the same quality?", a: "The same AI model grades essays on all plans. Free plan feedback is slightly less detailed than Pro, but still includes a rubric score and written comments." },
  { q: "Do students need an account to submit?", a: "No. Students submit through a shareable assignment link. Only the teacher needs a Smapey account." },
]

