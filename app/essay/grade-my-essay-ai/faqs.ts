// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Can I grade my own essay with AI for free?", a: "Yes. Smapey Essay's free plan lets you grade up to 30 essays per month at no cost. No credit card required, just sign up and submit." },
  { q: "What subjects or essay types can it grade?", a: "Any written essay, academic essays, argumentative writing, narrative essays, college application essays, descriptive writing. The AI adapts to the content." },
  { q: "How accurate is AI essay grading?", a: "The AI evaluates against a fixed multi-dimension rubric every time, producing consistent results comparable to experienced human graders. Most users find it more consistent than human marking." },
  { q: "Can I submit multiple drafts of the same essay?", a: "Yes. You can revise and resubmit as many times as you want. Each submission is graded independently and saved so you can track your improvement." },
  { q: "Do I need to create an account to grade my essay?", a: "Yes, a free account is required to submit and receive graded feedback. Sign up takes under a minute with no payment details needed." },
]

