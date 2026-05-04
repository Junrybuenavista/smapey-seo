"use client"

import { useState } from "react"
import {
  BookOpen, ClipboardList, Camera, Upload, Star,
  Eye, Trash2, BarChart3, Users, ChevronRight,
  CheckCircle2, Menu, X, FileText, Zap, ArrowLeft,
} from "lucide-react"

//////////////////////////////////////////////////////
// DATA
//////////////////////////////////////////////////////

const SECTIONS = [
  { id: "overview",     label: "Overview" },
  { id: "assignments",  label: "1. Create an Assignment" },
  { id: "evaluate",     label: "2. Evaluate an Essay" },
  { id: "camera",       label: "3. Scan with Camera" },
  { id: "results",      label: "4. View Student Results" },
  { id: "dashboard",    label: "5. Analytics Dashboard" },
  { id: "tips",         label: "Tips & Best Practices" },
]

//////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////

function Badge({ children, color = "indigo" }: { children: React.ReactNode; color?: string }) {
  const colors: Record<string, string> = {
    indigo: "bg-indigo-100 text-indigo-700",
    purple: "bg-purple-100 text-purple-700",
    green:  "bg-green-100 text-green-700",
    amber:  "bg-amber-100 text-amber-700",
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${colors[color]}`}>
      {children}
    </span>
  )
}

function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
          {number}
        </div>
        <div className="w-px flex-1 bg-indigo-100 mt-2" />
      </div>
      <div className="pb-8 flex-1 min-w-0">
        <h4 className="font-semibold text-slate-800 mb-2 mt-0.5">{title}</h4>
        <div className="text-sm text-slate-500 leading-relaxed space-y-2">{children}</div>
      </div>
    </div>
  )
}

function Callout({ icon: Icon, title, children, color = "indigo" }: {
  icon: any; title: string; children: React.ReactNode; color?: string
}) {
  const colors: Record<string, string> = {
    indigo: "bg-indigo-50 border-indigo-200 text-indigo-800",
    amber:  "bg-amber-50 border-amber-200 text-amber-800",
    green:  "bg-green-50 border-green-200 text-green-800",
  }
  const iconColors: Record<string, string> = {
    indigo: "text-indigo-500",
    amber:  "text-amber-500",
    green:  "text-green-500",
  }
  return (
    <div className={`rounded-xl border p-4 flex gap-3 ${colors[color]}`}>
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColors[color]}`} />
      <div>
        <p className="font-semibold text-sm mb-1">{title}</p>
        <div className="text-sm opacity-80 leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

function MockUI({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="bg-slate-100 px-4 py-2 flex items-center gap-2 border-b border-slate-200">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <span className="ml-2 text-xs text-slate-400 font-medium">{label}</span>
      </div>
      <div className="bg-white p-5">{children}</div>
    </div>
  )
}

//////////////////////////////////////////////////////
// NAVBAR
//////////////////////////////////////////////////////
function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[#0a0f1e]/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="/essay" className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </a>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Smapey Essay" className="w-7 h-7 rounded-lg object-cover" />
            <span className="text-white font-bold tracking-tight">Smapey Essay</span>
            <Badge color="indigo">Guide</Badge>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`}
            className="text-sm text-white/60 hover:text-white transition-colors px-4 py-2">
            Sign in
          </a>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=ESSAY&plan=FREE`}
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors">
            Get started free
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-white/60 hover:text-white">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#0a0f1e] border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          <a href="/essay" className="text-sm text-white/60">← Back to Essay</a>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=ESSAY&plan=FREE`}
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-indigo-600 text-white text-center">
            Get started free
          </a>
        </div>
      )}
    </nav>
  )
}

//////////////////////////////////////////////////////
// SIDEBAR
//////////////////////////////////////////////////////
function Sidebar({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return (
    <aside className="hidden lg:block w-56 shrink-0">
      <div className="sticky top-24 flex flex-col gap-1">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 px-3">Contents</p>
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${
              active === s.id
                ? "bg-indigo-50 text-indigo-700 font-semibold"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </aside>
  )
}

//////////////////////////////////////////////////////
// SECTIONS
//////////////////////////////////////////////////////

function SectionOverview() {
  return (
    <section id="overview" className="scroll-mt-24 mb-16">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold mb-4">
        <BookOpen className="w-3.5 h-3.5" /> Getting Started
      </div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-4 tracking-tight">
        Welcome to Smapey Essay
      </h2>
      <p className="text-slate-500 leading-relaxed mb-6">
        Smapey Essay is an AI-powered essay grading tool for teachers. It evaluates student essays using a
        standard 5-point rubric across 5 dimensions — in seconds. This guide walks you through every feature
        from start to finish.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: ClipboardList, label: "Create assignments", desc: "Set topic, question & model answer" },
          { icon: Zap,           label: "AI grades instantly", desc: "Score + rubric + suggestions" },
          { icon: BarChart3,     label: "Track results",      desc: "Filter, view, and analyze" },
        ].map(({ icon: Icon, label, desc }) => (
          <div key={label} className="bg-indigo-50 rounded-xl p-4 flex flex-col gap-2">
            <Icon className="w-5 h-5 text-indigo-600" />
            <p className="font-semibold text-slate-800 text-sm">{label}</p>
            <p className="text-xs text-slate-500">{desc}</p>
          </div>
        ))}
      </div>

      <Callout icon={CheckCircle2} title="No setup required" color="green">
        Once you activate the Essay product from your dashboard, you can create your first assignment immediately.
        No configuration or installation needed.
      </Callout>
    </section>
  )
}

function SectionAssignments() {
  return (
    <section id="assignments" className="scroll-mt-24 mb-16">
      <h2 className="text-xl font-extrabold text-slate-800 mb-1 tracking-tight">1. Create an Assignment</h2>
      <p className="text-slate-500 text-sm mb-6">
        An assignment defines the essay topic, question, and the model answer the AI uses to grade against.
      </p>

      <div className="space-y-0 mb-8">
        <Step number={1} title='Go to the "Assignments" tab'>
          <p>Open the Essay Feedback page from your sidebar. You'll land on the <strong>Assignments</strong> tab by default.</p>
        </Step>
        <Step number={2} title='Click "New Assignment"'>
          <p>Hit the <strong>+ New Assignment</strong> button in the top right. A modal form will open.</p>
        </Step>
        <Step number={3} title="Fill in the assignment details">
          <p>Complete the 3 required fields:</p>
          <ul className="mt-2 space-y-1.5 list-none">
            {[
              { label: "Assignment Title", desc: 'A short name like "Unit 3 Essay" or "Midterm Writing"' },
              { label: "Essay Question / Topic", desc: "The exact question or prompt students will write about" },
              { label: "Model / Perfect Answer", desc: "Write an ideal answer — the AI compares every student essay against this" },
            ].map(({ label, desc }) => (
              <li key={label} className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span><strong>{label}</strong> — {desc}</span>
              </li>
            ))}
          </ul>
        </Step>
        <Step number={4} title='Click "Create Assignment"'>
          <p>The assignment appears in your list with a submission count of 0. Share the topic with your students and start collecting essays.</p>
        </Step>
      </div>

      <MockUI label="New Assignment Form">
        <div className="space-y-3">
          <div>
            <p className="text-xs text-slate-400 mb-1 font-medium">Assignment Title</p>
            <div className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 bg-slate-50">
              The Impact of Social Media on Youth Mental Health
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1 font-medium">Essay Question</p>
            <div className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 bg-slate-50">
              Discuss the positive and negative effects of social media on the mental health of teenagers. Use specific examples to support your argument.
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1 font-medium">Model / Perfect Answer</p>
            <div className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 bg-slate-50 text-xs leading-relaxed">
              Social media has become an integral part of teenage life... [your ideal answer here]
            </div>
          </div>
          <button className="w-full py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold">
            Create Assignment
          </button>
        </div>
      </MockUI>

      <div className="mt-6">
        <Callout icon={Zap} title="Tip: Write a strong model answer" color="indigo">
          The more detailed and well-structured your model answer is, the more accurate and useful the AI feedback will be for students.
          Aim for at least 2–3 paragraphs.
        </Callout>
      </div>
    </section>
  )
}

function SectionEvaluate() {
  return (
    <section id="evaluate" className="scroll-mt-24 mb-16">
      <h2 className="text-xl font-extrabold text-slate-800 mb-1 tracking-tight">2. Evaluate an Essay</h2>
      <p className="text-slate-500 text-sm mb-6">
        Once an assignment exists, you can submit any student's essay for instant AI grading.
      </p>

      <div className="space-y-0 mb-8">
        <Step number={1} title="Open an assignment">
          <p>Click the <strong>Evaluate</strong> button on any assignment card in the list.</p>
        </Step>
        <Step number={2} title="Enter the student's name (optional)">
          <p>Type the student's name or leave it blank — they'll appear as <em>Anonymous</em> in results.</p>
        </Step>
        <Step number={3} title="Paste or type the student's essay">
          <p>Either type the essay directly into the text area, or use the <strong>Upload Image</strong> or <strong>Open Camera</strong> buttons to scan a handwritten essay (see Section 3).</p>
        </Step>
        <Step number={4} title='Click "Evaluate Essay"'>
          <p>The AI processes the essay in seconds and returns:</p>
          <ul className="mt-2 space-y-1">
            {[
              "Overall score (1–5)",
              "Summary assessment",
              "Per-criterion rubric scores (5 categories)",
              "Strengths list",
              "Improvement suggestions",
            ].map(f => (
              <li key={f} className="flex items-center gap-2">
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 shrink-0" />
                <span>{f}</span>
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
                {[1,2,3,4,5].map(n => (
                  <Star key={n} className={`w-4 h-4 ${n <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`} />
                ))}
              </div>
              <p className="text-xs font-semibold text-indigo-600 mt-0.5">4/5 · Good</p>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-600 leading-relaxed">
            <strong>Summary:</strong> The student demonstrates a good understanding of the topic with relevant examples and clear structure. Minor grammar issues noted.
          </div>
          <div className="space-y-1.5">
            {["Content & Ideas", "Organization", "Evidence & Support", "Language & Style", "Grammar"].map((c, i) => (
              <div key={c} className="flex items-center gap-2 text-xs">
                <span className="w-32 text-slate-500 shrink-0">{c}</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${[80,75,85,70,60][i]}%` }} />
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
      <h2 className="text-xl font-extrabold text-slate-800 mb-1 tracking-tight">3. Scan with Camera or Upload Image</h2>
      <p className="text-slate-500 text-sm mb-6">
        For handwritten essays, you can use your device camera or upload a photo instead of typing.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="border border-slate-200 rounded-2xl p-5">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-3">
            <Camera className="w-5 h-5 text-indigo-600" />
          </div>
          <h4 className="font-bold text-slate-800 mb-2 text-sm">Open Camera</h4>
          <ol className="text-sm text-slate-500 space-y-1.5 list-decimal list-inside">
            <li>Click <strong>Open Camera</strong> in the evaluate modal</li>
            <li>Allow browser camera access when prompted</li>
            <li>Point your camera at the handwritten essay</li>
            <li>Click <strong>Capture Photo</strong></li>
            <li>The text is extracted automatically</li>
          </ol>
        </div>
        <div className="border border-slate-200 rounded-2xl p-5">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-3">
            <Upload className="w-5 h-5 text-purple-600" />
          </div>
          <h4 className="font-bold text-slate-800 mb-2 text-sm">Upload Image</h4>
          <ol className="text-sm text-slate-500 space-y-1.5 list-decimal list-inside">
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
          <li>• Use good lighting — avoid shadows over the paper</li>
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
      <h2 className="text-xl font-extrabold text-slate-800 mb-1 tracking-tight">4. View Student Results</h2>
      <p className="text-slate-500 text-sm mb-6">
        All evaluated essays are stored in the <strong>Student Results</strong> tab for easy review and management.
      </p>

      <div className="space-y-0 mb-8">
        <Step number={1} title='Switch to the "Student Results" tab'>
          <p>Click <strong>Student Results</strong> at the top of the Essay Feedback page.</p>
        </Step>
        <Step number={2} title="Filter by assignment">
          <p>Use the <strong>Filter by Assignment</strong> dropdown to narrow results to one specific assignment. Hit <strong>Clear</strong> to show all.</p>
        </Step>
        <Step number={3} title="View a submission">
          <p>Click the <Eye className="w-3.5 h-3.5 inline text-blue-500 mx-0.5" /> <strong>View</strong> icon to open the full result — score, rubric breakdown, strengths, and suggestions.</p>
        </Step>
        <Step number={4} title="Delete a submission">
          <p>Click the <Trash2 className="w-3.5 h-3.5 inline text-red-400 mx-0.5" /> <strong>Delete</strong> icon to permanently remove a result. A confirmation will appear before deletion.</p>
        </Step>
      </div>

      <MockUI label="Student Results Table">
        <div className="space-y-2">
          {[
            { name: "Maria Santos",  score: 4, label: "Good",              assignment: "Social Media Essay" },
            { name: "Juan dela Cruz", score: 2, label: "Needs Improvement", assignment: "Social Media Essay" },
            { name: "Anonymous",      score: 3, label: "Average",           assignment: "Climate Change Essay" },
          ].map((r, i) => (
            <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate">{r.name}</p>
                <p className="text-xs text-slate-400 truncate">{r.assignment}</p>
              </div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(n => (
                  <Star key={n} className={`w-3 h-3 ${n <= r.score ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`} />
                ))}
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                r.score >= 4 ? "bg-green-100 text-green-700" :
                r.score >= 3 ? "bg-blue-100 text-blue-700" :
                               "bg-red-100 text-red-700"
              }`}>{r.score}/5</span>
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
      <h2 className="text-xl font-extrabold text-slate-800 mb-1 tracking-tight">5. Analytics Dashboard</h2>
      <p className="text-slate-500 text-sm mb-6">
        The main Dashboard gives you a bird's-eye view of your essay feedback activity.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: ClipboardList, label: "Total Assignments", desc: "Number of active assignments you've created", color: "bg-indigo-50 text-indigo-600" },
          { icon: FileText,      label: "Total Submissions", desc: "All essays evaluated across all assignments",  color: "bg-purple-50 text-purple-600" },
          { icon: Star,          label: "Average Score",     desc: "Class average score out of 5 with star rating", color: "bg-amber-50 text-amber-600" },
        ].map(({ icon: Icon, label, desc, color }) => (
          <div key={label} className="border border-slate-200 rounded-xl p-4">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${color}`}>
              <Icon className="w-4 h-4" />
            </div>
            <p className="font-semibold text-slate-800 text-sm mb-1">{label}</p>
            <p className="text-xs text-slate-500">{desc}</p>
          </div>
        ))}
      </div>

      <p className="text-sm text-slate-500 mb-3">The dashboard also shows a <strong>score distribution bar</strong> — how many students scored 1 through 5:</p>

      <MockUI label="Score Distribution">
        <div className="space-y-2">
          {[
            { score: 5, label: "Excellent",          count: 3, color: "bg-green-500",  pct: "60%" },
            { score: 4, label: "Good",               count: 5, color: "bg-blue-500",   pct: "100%" },
            { score: 3, label: "Average",            count: 4, color: "bg-indigo-500", pct: "80%" },
            { score: 2, label: "Needs Improvement",  count: 2, color: "bg-amber-500",  pct: "40%" },
            { score: 1, label: "Poor",               count: 1, color: "bg-red-500",    pct: "20%" },
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
    {
      title: "Write a detailed model answer",
      desc: "A longer, well-structured model answer gives the AI more context to compare against — resulting in more precise rubric scores.",
    },
    {
      title: "Use consistent student names",
      desc: "Always enter the same name format (e.g. 'Juan dela Cruz') so you can easily filter and track a student's progress across assignments.",
    },
    {
      title: "Scan in good lighting",
      desc: "When using the camera for handwritten essays, natural light or bright overhead lighting reduces OCR errors significantly.",
    },
    {
      title: "Review AI feedback with students",
      desc: "Share the rubric scores and suggestions directly with students. The specific per-criterion feedback is designed to be readable by students.",
    },
    {
      title: "Create one assignment per topic",
      desc: "Keep assignments focused — one question per assignment. This keeps results organized and makes filtering in Student Results easy.",
    },
    {
      title: "Use the score distribution to spot trends",
      desc: "If many students score 1–2 on a specific criterion, it signals a gap in teaching — not just a student issue.",
    },
  ]

  return (
    <section id="tips" className="scroll-mt-24 mb-16">
      <h2 className="text-xl font-extrabold text-slate-800 mb-1 tracking-tight">Tips & Best Practices</h2>
      <p className="text-slate-500 text-sm mb-8">Get the most out of Smapey Essay with these recommendations.</p>

      <div className="grid sm:grid-cols-2 gap-4">
        {tips.map(({ title, desc }, i) => (
          <div key={i} className="border border-slate-200 rounded-xl p-4 flex gap-3">
            <div className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              {i + 1}
            </div>
            <div>
              <p className="font-semibold text-slate-800 text-sm mb-1">{title}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

//////////////////////////////////////////////////////
// PAGE
//////////////////////////////////////////////////////
export default function GuideContent() {
  const [activeSection, setActiveSection] = useState("overview")

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* HERO */}
      <div
        className="pt-16"
        style={{ background: "linear-gradient(135deg, #0a0f1e 0%, #1e1b4b 60%, #0a0f1e 100%)" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-5">
            <BookOpen className="w-3.5 h-3.5" /> Step-by-Step Guide
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            How to use Smapey Essay
          </h1>
          <p className="text-white/50 max-w-xl mx-auto text-base leading-relaxed mb-8">
            Everything you need to know — from creating your first assignment to reading AI feedback and tracking student progress.
          </p>
          <a
            href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=ESSAY&plan=FREE`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30"
          >
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
          <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center">
            <h3 className="text-xl font-extrabold text-white mb-2">Ready to start grading smarter?</h3>
            <p className="text-indigo-100/70 text-sm mb-6">Free plan includes 30 essay evaluations per month. No credit card required.</p>
            <a
              href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=ESSAY&plan=FREE`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-indigo-700 font-semibold text-sm hover:bg-indigo-50 transition-all shadow-md"
            >
              Create free account <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white px-6 py-6 mt-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Smapey" className="w-5 h-5 rounded object-cover" />
            <span className="text-slate-500 text-sm font-semibold">Smapey Essay</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <a href="/essay" className="hover:text-slate-600 transition-colors">← Back to Essay</a>
            <a href="/essay#pricing" className="hover:text-slate-600 transition-colors">Pricing</a>
            <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=ESSAY&plan=FREE`}
              className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
              Get started free
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
