"use client"

import { useState, useEffect } from "react"
import {
  BookOpen, ClipboardList, Camera, Upload, Star,
  Eye, Trash2, BarChart3, ChevronRight,
  CheckCircle2, Menu, X, FileText, Zap, ArrowLeft,
} from "lucide-react"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }
const REGISTER_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=ESSAY&plan=FREE`
const cardStyle: React.CSSProperties = { background: "#fff", borderColor: INK }

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "assignments", label: "1. Create an Assignment" },
  { id: "evaluate", label: "2. Evaluate an Essay" },
  { id: "camera", label: "3. Scan with Camera" },
  { id: "results", label: "4. View Student Results" },
  { id: "dashboard", label: "5. Analytics Dashboard" },
  { id: "tips", label: "Tips & Best Practices" },
]

function useFont() {
  useEffect(() => {
    const id = "smapey-pop-fonts"
    if (!document.getElementById(id)) {
      const l = document.createElement("link"); l.id = id; l.rel = "stylesheet"
      l.href = "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap"
      document.head.appendChild(l)
    }
  }, [])
}

function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full border-2 text-sm font-bold flex items-center justify-center shrink-0" style={{ background: BLUE, color: "#fff", borderColor: INK }}>{number}</div>
        <div className="w-px flex-1 mt-2" style={{ background: "rgba(22,22,22,.15)" }} />
      </div>
      <div className="pb-8 flex-1 min-w-0">
        <h4 className="font-bold mb-2 mt-0.5" style={{ color: INK }}>{title}</h4>
        <div className="text-sm leading-relaxed space-y-2" style={{ color: "#54514c" }}>{children}</div>
      </div>
    </div>
  )
}

function Callout({ icon: Icon, title, children, color = "indigo" }: { icon: any; title: string; children: React.ReactNode; color?: string }) {
  const bg = color === "amber" ? "#fff7e8" : color === "green" ? "#e9f9f0" : "#eaf1ff"
  const iconColor = color === "amber" ? "#b06c00" : color === "green" ? "#0d9f6e" : BLUE
  const textColor = color === "amber" ? "#5c4a28" : color === "green" ? "#14543b" : "#21314f"
  return (
    <div className="rounded-[14px] border-2 p-4 flex gap-3" style={{ background: bg, borderColor: INK }}>
      <Icon className="w-5 h-5 shrink-0 mt-0.5" style={{ color: iconColor }} />
      <div>
        <p className="font-extrabold text-sm mb-1" style={{ color: INK }}>{title}</p>
        <div className="text-sm leading-relaxed" style={{ color: textColor }}>{children}</div>
      </div>
    </div>
  )
}

function MockUI({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="rounded-[16px] border-2 overflow-hidden" style={{ borderColor: INK, boxShadow: `5px 5px 0 ${AMBER}` }}>
      <div className="px-4 py-2 flex items-center gap-2" style={{ background: CREAM, borderBottom: `2px solid ${INK}` }}>
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff6b5e", border: `1px solid ${INK}` }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: AMBER, border: `1px solid ${INK}` }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#3ec77c", border: `1px solid ${INK}` }} />
        <span className="ml-2 text-xs font-bold" style={{ color: "#9a948b" }}>{label}</span>
      </div>
      <div className="bg-white p-5">{children}</div>
    </div>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="fixed top-0 inset-x-0 z-50" style={{ background: CREAM, borderBottom: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/essay" className="flex items-center gap-1.5 text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: "#54514c" }}>
            <ArrowLeft className="w-4 h-4" /><span className="hidden sm:inline">Back</span>
          </a>
          <span style={{ color: "rgba(22,22,22,.2)" }}>|</span>
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Smapey Essay" className="w-8 h-8 rounded-lg object-cover" />
            <span className="font-extrabold tracking-tight" style={{ color: INK }}>Smapey Essay</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border-2 text-xs font-bold" style={{ background: BLUE, color: "#fff", borderColor: INK }}>Guide</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`} className="text-sm font-semibold hover:opacity-60 transition-opacity px-2 py-2" style={{ color: INK }}>Sign in</a>
          <a href={REGISTER_URL} className="text-sm font-bold px-5 py-2.5 rounded-full border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${INK}` }}>Get started free</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ color: INK }}>{open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </div>
      {open && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-4" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
          <a href="/essay" className="text-sm font-semibold" style={{ color: INK }}>← Back to Essay</a>
          <a href={REGISTER_URL} className="text-sm font-bold px-4 py-2.5 rounded-full border-2 text-center" style={{ ...display, background: AMBER, color: INK, borderColor: INK }}>Get started free</a>
        </div>
      )}
    </nav>
  )
}

function Sidebar({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return (
    <aside className="hidden lg:block w-56 shrink-0">
      <div className="sticky top-24 flex flex-col gap-1">
        <p className="text-xs font-bold uppercase tracking-widest mb-3 px-3" style={{ color: "#9a948b" }}>Contents</p>
        {SECTIONS.map((s) => {
          const isActive = active === s.id
          return (
            <button key={s.id} onClick={() => onSelect(s.id)}
              className="text-left text-sm px-3 py-2.5 rounded-[12px] transition-colors border-2"
              style={isActive ? { background: INK, color: "#fff", borderColor: INK, fontWeight: 700 } : { background: "transparent", color: "#54514c", borderColor: "transparent", fontWeight: 600 }}>
              {s.label}
            </button>
          )
        })}
      </div>
    </aside>
  )
}

function SectionOverview() {
  return (
    <section id="overview" className="scroll-mt-24 mb-16">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 text-xs font-bold mb-4" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
        <BookOpen className="w-3.5 h-3.5" /> Getting Started
      </div>
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 tracking-tight" style={{ color: INK }}>Welcome to Smapey Essay</h2>
      <p className="leading-relaxed mb-6" style={{ color: "#54514c" }}>
        Smapey Essay is an AI-powered essay grading tool for teachers. It evaluates student essays using a
        standard 5-point rubric across 5 dimensions, in seconds. This guide walks you through every feature from start to finish.
      </p>
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: ClipboardList, label: "Create assignments", desc: "Set topic, question & model answer" },
          { icon: Zap, label: "AI grades instantly", desc: "Score + rubric + suggestions" },
          { icon: BarChart3, label: "Track results", desc: "Filter, view, and analyze" },
        ].map(({ icon: Icon, label, desc }, i) => (
          <div key={label} className="rounded-[14px] p-4 flex flex-col gap-2 border-2" style={{ ...cardStyle, boxShadow: `5px 5px 0 ${i % 2 === 0 ? BLUE : AMBER}` }}>
            <div className="w-9 h-9 rounded-[10px] border-2 flex items-center justify-center" style={{ background: BLUE, borderColor: INK }}>
              <Icon className="w-4 h-4 text-white" />
            </div>
            <p className="font-extrabold text-sm" style={{ color: INK }}>{label}</p>
            <p className="text-xs" style={{ color: "#54514c" }}>{desc}</p>
          </div>
        ))}
      </div>
      <Callout icon={CheckCircle2} title="No setup required" color="green">
        Once you activate the Essay product from your dashboard, you can create your first assignment immediately. No configuration or installation needed.
      </Callout>
    </section>
  )
}

function SectionAssignments() {
  return (
    <section id="assignments" className="scroll-mt-24 mb-16">
      <h2 className="text-xl font-extrabold mb-1 tracking-tight" style={{ color: INK }}>1. Create an Assignment</h2>
      <p className="text-sm mb-6" style={{ color: "#54514c" }}>An assignment defines the essay topic, question, and the model answer the AI uses to grade against.</p>
      <div className="space-y-0 mb-8">
        <Step number={1} title='Go to the "Assignments" tab'><p>Open the Essay Feedback page from your sidebar. You&apos;ll land on the <strong>Assignments</strong> tab by default.</p></Step>
        <Step number={2} title='Click "New Assignment"'><p>Hit the <strong>+ New Assignment</strong> button in the top right. A modal form will open.</p></Step>
        <Step number={3} title="Fill in the assignment details">
          <p>Complete the 3 required fields:</p>
          <ul className="mt-2 space-y-1.5 list-none">
            {[
              { label: "Assignment Title", desc: 'A short name like "Unit 3 Essay" or "Midterm Writing"' },
              { label: "Essay Question / Topic", desc: "The exact question or prompt students will write about" },
              { label: "Model / Perfect Answer", desc: "Write an ideal answer, the AI compares every student essay against this" },
            ].map(({ label, desc }) => (
              <li key={label} className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: BLUE }} />
                <span><strong>{label}</strong>, {desc}</span>
              </li>
            ))}
          </ul>
        </Step>
        <Step number={4} title='Click "Create Assignment"'><p>The assignment appears in your list with a submission count of 0. Share the topic with your students and start collecting essays.</p></Step>
      </div>
      <MockUI label="New Assignment Form">
        <div className="space-y-3">
          <div>
            <p className="text-xs text-slate-400 mb-1 font-medium">Assignment Title</p>
            <div className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 bg-slate-50">The Impact of Social Media on Youth Mental Health</div>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1 font-medium">Essay Question</p>
            <div className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 bg-slate-50">Discuss the positive and negative effects of social media on the mental health of teenagers. Use specific examples to support your argument.</div>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1 font-medium">Model / Perfect Answer</p>
            <div className="rounded-lg border border-slate-200 px-3 py-2 text-slate-700 bg-slate-50 text-xs leading-relaxed">Social media has become an integral part of teenage life... [your ideal answer here]</div>
          </div>
          <button className="w-full py-2 rounded-full text-sm font-bold border-2" style={{ background: BLUE, color: "#fff", borderColor: INK }}>Create Assignment</button>
        </div>
      </MockUI>
      <div className="mt-6">
        <Callout icon={Zap} title="Tip: Write a strong model answer" color="amber">
          The more detailed and well-structured your model answer is, the more accurate and useful the AI feedback will be for students. Aim for at least 2–3 paragraphs.
        </Callout>
      </div>
    </section>
  )
}

function SectionEvaluate() {
  return (
    <section id="evaluate" className="scroll-mt-24 mb-16">
      <h2 className="text-xl font-extrabold mb-1 tracking-tight" style={{ color: INK }}>2. Evaluate an Essay</h2>
      <p className="text-sm mb-6" style={{ color: "#54514c" }}>Once an assignment exists, you can submit any student&apos;s essay for instant AI grading.</p>
      <div className="space-y-0 mb-8">
        <Step number={1} title="Open an assignment"><p>Click the <strong>Evaluate</strong> button on any assignment card in the list.</p></Step>
        <Step number={2} title="Enter the student's name (optional)"><p>Type the student&apos;s name or leave it blank - they&apos;ll appear as <em>Anonymous</em> in results.</p></Step>
        <Step number={3} title="Paste or type the student's essay"><p>Either type the essay directly into the text area, or use the <strong>Upload Image</strong> or <strong>Open Camera</strong> buttons to scan a handwritten essay (see Section 3).</p></Step>
        <Step number={4} title='Click "Evaluate Essay"'>
          <p>The AI processes the essay in seconds and returns:</p>
          <ul className="mt-2 space-y-1">
            {["Overall score (1–5)", "Summary assessment", "Per-criterion rubric scores (5 categories)", "Strengths list", "Improvement suggestions"].map(f => (
              <li key={f} className="flex items-center gap-2">
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 shrink-0" /><span>{f}</span>
              </li>
            ))}
          </ul>
        </Step>
      </div>
      <MockUI label="Evaluation Result">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Student</p>
              <p className="font-semibold text-slate-800 text-sm">Maria Santos</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">Overall Score</p>
              <div className="flex items-center gap-1 justify-end">
                {[1,2,3,4,5].map(n => (<Star key={n} className={`w-4 h-4 ${n <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`} />))}
              </div>
              <p className="text-xs font-bold mt-0.5" style={{ color: BLUE }}>4/5 · Good</p>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-600 leading-relaxed"><strong>Summary:</strong> The student demonstrates a good understanding of the topic with relevant examples and clear structure. Minor grammar issues noted.</div>
          <div className="space-y-1.5">
            {["Content & Ideas", "Organization", "Evidence & Support", "Language & Style", "Grammar"].map((c, i) => (
              <div key={c} className="flex items-center gap-2 text-xs">
                <span className="w-32 text-slate-500 shrink-0">{c}</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full">
                  <div className="h-full rounded-full" style={{ width: `${[80,75,85,70,60][i]}%`, background: BLUE }} />
                </div>
                <span className="text-slate-600 font-medium w-6 text-right">{[4,4,4,3,3][i]}/5</span>
              </div>
            ))}
          </div>
        </div>
      </MockUI>
    </section>
  )
}

function SectionCamera() {
  return (
    <section id="camera" className="scroll-mt-24 mb-16">
      <h2 className="text-xl font-extrabold mb-1 tracking-tight" style={{ color: INK }}>3. Scan with Camera or Upload Image</h2>
      <p className="text-sm mb-6" style={{ color: "#54514c" }}>For handwritten essays, you can use your device camera or upload a photo instead of typing.</p>
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="rounded-[16px] p-5 border-2" style={{ ...cardStyle, boxShadow: `5px 5px 0 ${BLUE}` }}>
          <div className="w-10 h-10 rounded-[12px] border-2 flex items-center justify-center mb-3" style={{ background: BLUE, borderColor: INK }}>
            <Camera className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-extrabold mb-2 text-sm" style={{ color: INK }}>Open Camera</h4>
          <ol className="text-sm space-y-1.5 list-decimal list-inside" style={{ color: "#54514c" }}>
            <li>Click <strong>Open Camera</strong> in the evaluate modal</li>
            <li>Allow browser camera access when prompted</li>
            <li>Point your camera at the handwritten essay</li>
            <li>Click <strong>Capture Photo</strong></li>
            <li>The text is extracted automatically</li>
          </ol>
        </div>
        <div className="rounded-[16px] p-5 border-2" style={{ ...cardStyle, boxShadow: `5px 5px 0 ${AMBER}` }}>
          <div className="w-10 h-10 rounded-[12px] border-2 flex items-center justify-center mb-3" style={{ background: AMBER, borderColor: INK }}>
            <Upload className="w-5 h-5" style={{ color: INK }} />
          </div>
          <h4 className="font-extrabold mb-2 text-sm" style={{ color: INK }}>Upload Image</h4>
          <ol className="text-sm space-y-1.5 list-decimal list-inside" style={{ color: "#54514c" }}>
            <li>Click <strong>Upload Image</strong> in the evaluate modal</li>
            <li>Select a photo from your device (JPG, PNG, WEBP)</li>
            <li>The AI reads all text from the image via OCR</li>
            <li>Extracted text appears in the essay field</li>
            <li>Review and click <strong>Evaluate Essay</strong></li>
          </ol>
        </div>
      </div>
      <Callout icon={Camera} title="Best results for camera scanning" color="indigo">
        <ul className="space-y-1 mt-1">
          <li>• Use good lighting, avoid shadows over the paper</li>
          <li>• Keep the paper flat and the camera parallel to it</li>
          <li>• Make sure all text fits within the camera frame</li>
          <li>• Darker ink on white paper gives the best OCR accuracy</li>
        </ul>
      </Callout>
    </section>
  )
}

function SectionResults() {
  return (
    <section id="results" className="scroll-mt-24 mb-16">
      <h2 className="text-xl font-extrabold mb-1 tracking-tight" style={{ color: INK }}>4. View Student Results</h2>
      <p className="text-sm mb-6" style={{ color: "#54514c" }}>All evaluated essays are stored in the <strong>Student Results</strong> tab for easy review and management.</p>
      <div className="space-y-0 mb-8">
        <Step number={1} title='Switch to the "Student Results" tab'><p>Click <strong>Student Results</strong> at the top of the Essay Feedback page.</p></Step>
        <Step number={2} title="Filter by assignment"><p>Use the <strong>Filter by Assignment</strong> dropdown to narrow results to one specific assignment. Hit <strong>Clear</strong> to show all.</p></Step>
        <Step number={3} title="View a submission"><p>Click the <Eye className="w-3.5 h-3.5 inline mx-0.5" style={{ color: BLUE }} /> <strong>View</strong> icon to open the full result - score, rubric breakdown, strengths, and suggestions.</p></Step>
        <Step number={4} title="Delete a submission"><p>Click the <Trash2 className="w-3.5 h-3.5 inline text-red-400 mx-0.5" /> <strong>Delete</strong> icon to permanently remove a result. A confirmation will appear before deletion.</p></Step>
      </div>
      <MockUI label="Student Results Table">
        <div className="space-y-2">
          {[
            { name: "Maria Santos", score: 4, assignment: "Social Media Essay" },
            { name: "Juan dela Cruz", score: 2, assignment: "Social Media Essay" },
            { name: "Anonymous", score: 3, assignment: "Climate Change Essay" },
          ].map((r, i) => (
            <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate">{r.name}</p>
                <p className="text-xs text-slate-400 truncate">{r.assignment}</p>
              </div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(n => (<Star key={n} className={`w-3 h-3 ${n <= r.score ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`} />))}
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${r.score >= 4 ? "bg-green-100 text-green-700" : r.score >= 3 ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"}`}>{r.score}/5</span>
              <div className="flex gap-1">
                <button className="p-1 rounded text-blue-500 hover:bg-blue-50"><Eye className="w-3.5 h-3.5" /></button>
                <button className="p-1 rounded text-red-400 hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      </MockUI>
    </section>
  )
}

function SectionDashboard() {
  return (
    <section id="dashboard" className="scroll-mt-24 mb-16">
      <h2 className="text-xl font-extrabold mb-1 tracking-tight" style={{ color: INK }}>5. Analytics Dashboard</h2>
      <p className="text-sm mb-6" style={{ color: "#54514c" }}>The main Dashboard gives you a bird&apos;s-eye view of your essay feedback activity.</p>
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: ClipboardList, label: "Total Assignments", desc: "Number of active assignments you've created", c: BLUE },
          { icon: FileText, label: "Total Submissions", desc: "All essays evaluated across all assignments", c: BLUE },
          { icon: Star, label: "Average Score", desc: "Class average score out of 5 with star rating", c: AMBER },
        ].map(({ icon: Icon, label, desc, c }) => (
          <div key={label} className="rounded-[14px] p-4 border-2" style={{ ...cardStyle, boxShadow: `5px 5px 0 ${c}` }}>
            <div className="w-9 h-9 rounded-[10px] border-2 flex items-center justify-center mb-3" style={{ background: c, borderColor: INK }}>
              <Icon className="w-4 h-4" style={{ color: c === AMBER ? INK : "#fff" }} />
            </div>
            <p className="font-extrabold text-sm mb-1" style={{ color: INK }}>{label}</p>
            <p className="text-xs" style={{ color: "#54514c" }}>{desc}</p>
          </div>
        ))}
      </div>
      <p className="text-sm mb-3" style={{ color: "#54514c" }}>The dashboard also shows a <strong>score distribution bar</strong>, how many students scored 1 through 5:</p>
      <MockUI label="Score Distribution">
        <div className="space-y-2">
          {[
            { score: 5, label: "Excellent", count: 3, color: "bg-green-500", pct: "60%" },
            { score: 4, label: "Good", count: 5, color: "bg-blue-500", pct: "100%" },
            { score: 3, label: "Average", count: 4, color: "bg-blue-400", pct: "80%" },
            { score: 2, label: "Needs Improvement", count: 2, color: "bg-amber-500", pct: "40%" },
            { score: 1, label: "Poor", count: 1, color: "bg-red-500", pct: "20%" },
          ].map(r => (
            <div key={r.score} className="flex items-center gap-3 text-xs">
              <span className="w-4 text-slate-500 font-bold text-right">{r.score}</span>
              <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${r.color}`} style={{ width: r.pct }} />
              </div>
              <span className="w-16 text-slate-500">{r.label}</span>
              <span className="w-4 text-slate-400 text-right">{r.count}</span>
            </div>
          ))}
        </div>
      </MockUI>
    </section>
  )
}

function SectionTips() {
  const tips = [
    { title: "Write a detailed model answer", desc: "A longer, well-structured model answer gives the AI more context to compare against - resulting in more precise rubric scores." },
    { title: "Use consistent student names", desc: "Always enter the same name format (e.g. 'Juan dela Cruz') so you can easily filter and track a student's progress across assignments." },
    { title: "Scan in good lighting", desc: "When using the camera for handwritten essays, natural light or bright overhead lighting reduces OCR errors significantly." },
    { title: "Review AI feedback with students", desc: "Share the rubric scores and suggestions directly with students. The specific per-criterion feedback is designed to be readable by students." },
    { title: "Create one assignment per topic", desc: "Keep assignments focused - one question per assignment. This keeps results organized and makes filtering in Student Results easy." },
    { title: "Use the score distribution to spot trends", desc: "If many students score 1–2 on a specific criterion, it signals a gap in teaching - not just a student issue." },
  ]
  return (
    <section id="tips" className="scroll-mt-24 mb-16">
      <h2 className="text-xl font-extrabold mb-1 tracking-tight" style={{ color: INK }}>Tips & Best Practices</h2>
      <p className="text-sm mb-8" style={{ color: "#54514c" }}>Get the most out of Smapey Essay with these recommendations.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {tips.map(({ title, desc }, i) => {
          const c = i % 2 === 0 ? BLUE : AMBER
          return (
            <div key={i} className="rounded-[14px] p-4 flex gap-3 border-2" style={{ ...cardStyle, boxShadow: `5px 5px 0 ${c}` }}>
              <div className="w-6 h-6 rounded-full border-2 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5" style={{ background: c, color: c === AMBER ? INK : "#fff", borderColor: INK }}>{i + 1}</div>
              <div>
                <p className="font-extrabold text-sm mb-1" style={{ color: INK }}>{title}</p>
                <p className="text-xs leading-relaxed" style={{ color: "#54514c" }}>{desc}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default function GuideContent() {
  useFont()
  const [activeSection, setActiveSection] = useState("overview")
  const scrollToSection = (id: string) => {
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }
  return (
    <div className="min-h-screen" style={{ background: CREAM, fontFamily: display.fontFamily }}>
      <Navbar />

      {/* HERO */}
      <div className="relative overflow-hidden pt-16" style={{ background: CREAM, borderBottom: `2px solid ${INK}` }}>
        <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden>
          <div className="absolute rounded-[22px] border-2" style={{ top: "30%", right: "-70px", width: 260, height: 72, background: BLUE, borderColor: INK, transform: "rotate(8deg)", boxShadow: "5px 5px 0 rgba(22,22,22,.12)" }} />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 text-xs font-bold mb-5" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
            <BookOpen className="w-3.5 h-3.5" /> Step-by-Step Guide
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4" style={{ color: INK }}>How to use Smapey Essay</h1>
          <p className="max-w-xl mx-auto text-base leading-relaxed mb-8" style={{ color: "#54514c" }}>
            Everything you need to know, from creating your first assignment to reading AI feedback and tracking student progress.
          </p>
          <a href={REGISTER_URL} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `4px 4px 0 ${INK}` }}>
            Get started free <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-12 flex gap-12">
        <Sidebar active={activeSection} onSelect={scrollToSection} />
        <main className="flex-1 min-w-0">
          <SectionOverview />
          <SectionAssignments />
          <SectionEvaluate />
          <SectionCamera />
          <SectionResults />
          <SectionDashboard />
          <SectionTips />

          {/* CTA */}
          <div className="rounded-[24px] border-2 p-8 text-center" style={{ background: AMBER, borderColor: INK, boxShadow: `10px 10px 0 ${INK}` }}>
            <h3 className="text-xl font-extrabold mb-2" style={{ color: INK }}>Ready to start grading smarter?</h3>
            <p className="text-sm mb-6 font-medium" style={{ color: "#5c4a28" }}>Free plan includes 30 essay evaluations per month. No credit card required.</p>
            <a href={REGISTER_URL} className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: INK, color: "#fff", borderColor: INK }}>
              Create free account <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="px-6 py-8 mt-8" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md object-cover" />
            <span className="text-sm font-extrabold" style={{ color: INK }}>Essay by Smapey</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a href="/essay" className="font-semibold hover:opacity-60 transition-opacity" style={{ color: "#54514c" }}>← Back to Essay</a>
            <a href="/essay#pricing" className="font-semibold hover:opacity-60 transition-opacity" style={{ color: "#54514c" }}>Pricing</a>
            <a href={REGISTER_URL} className="font-bold hover:opacity-60 transition-opacity" style={{ color: BLUE }}>Get started free</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
