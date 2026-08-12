// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Is this designed specifically for college application essays?", a: "Yes. The college essay grader evaluates criteria that matter to admissions officers (authentic voice, narrative clarity, self-reflection depth) not just grammar and structure." },
  { q: "Can it handle Common App and other essay prompts?", a: "Yes. You can set any prompt when creating the assignment, Common App, Coalition App, school-specific supplemental essays, or custom prompts." },
  { q: "How many drafts can a student submit?", a: "Unlimited on Pro and Enterprise plans. Students can revise and resubmit as many times as they need, and you can track which draft improved the most." },
  { q: "Can students submit directly, or does everything go through the teacher?", a: "Both. Teachers share an assignment link with students. Students submit directly, and the teacher sees all submissions in the dashboard." },
  { q: "Does it work for international students writing in English?", a: "Yes. The AI grades English-language essays regardless of the student's background, and gives feedback that's especially useful for non-native speakers improving their college writing." },
]

