// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "How much time does it actually save teachers?", a: "Teachers report saving 3–5 hours per assignment batch. Instead of reading and scoring each essay manually, you review the AI's feedback and approve or adjust, the heavy lifting is done for you." },
  { q: "Can I customize the grading rubric for my class?", a: "Enterprise plan users can set custom rubric weights per assignment. All plans include the standard multi-dimension rubric (content, grammar, structure, clarity, creativity) out of the box." },
  { q: "Do students see their feedback?", a: "Yes, once you release results. You control when students can view their score and comments, so you can review AI feedback before sharing." },
  { q: "Can it grade handwritten essays?", a: "Yes. Students or teachers photograph a handwritten essay. The AI reads the text via OCR and grades it the same as any typed submission." },
  { q: "Is the AI grading accurate enough to trust?", a: "The AI evaluates essays against a fixed rubric every time, producing consistent, structured scores comparable to human graders. Most teachers use it as a first pass and adjust if needed." },
]

