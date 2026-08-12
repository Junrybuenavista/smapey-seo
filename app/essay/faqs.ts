// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Can it grade handwritten essays?", a: "Yes. Students or teachers can photograph a handwritten essay using the built-in camera feature. The AI reads the text via OCR and grades it like any typed submission." },
  { q: "How accurate is the AI grading?", a: "The AI uses the same rubric criteria every time (content, grammar, structure, clarity, and creativity) producing consistent, bias-free results comparable to human graders." },
  { q: "Can students see their own feedback?", a: "Yes. You control what's shared. Students can view their score and feedback comments once the teacher releases results." },
  { q: "What languages are supported?", a: "English is fully supported. Other languages depend on the AI model's capabilities. Most major languages work well for basic grading." },
  { q: "Can I customize the grading rubric?", a: "Enterprise plan users can set custom rubric weights per assignment. All plans include the standard multi-dimension rubric out of the box." },
]

