import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight, Search, Users, DollarSign, ChevronDown, Play,
  CheckCircle, ShieldCheck, Target, Rocket, Sparkles, Clock
} from "lucide-react";

/* ===========================
   Types
=========================== */
type Traction = {
  users?: number;
  revenue?: number; // monthly revenue in USD
  mrr?: number;
  campuses?: number;
  waitlist?: number;
  retention?: string;
};
type Startup = {
  id: number;
  title: string;
  stage: "ideas" | "revenue" | "backed";
  summary: string;
  founder: string;
  university: string;
  avatar: string;
  product: string;
  pitch: string;
  contact: { email: string; linkedin?: string };
  traction?: Traction;
  video?: string;
};

/* ===========================
   Sample Data (replace anytime)
=========================== */
const STARTUPS: Startup[] = [
  {
    id: 1,
    title: "Campus Cupboard",
    stage: "ideas",
    summary: "Dorm-based food-sharing network to eliminate waste.",
    founder: "Sophie L.",
    university: "Stanford",
    avatar: "https://images.pexels.com/photos/3763152/pexels-photo-3763152.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    product: "Mobile app for students to share excess food across dorms.",
    pitch: "Eliminating campus food waste by connecting those who have extra with those who need it—fast, safe, and local.",
    contact: { email: "sophie@campuscupboard.com" },
    traction: { users: 150, waitlist: 300 },
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 2,
    title: "NoteFlow",
    stage: "revenue",
    summary: "AI-generated class notes & summaries for students.",
    founder: "Jamal K.",
    university: "MIT",
    avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    product: "AI platform that turns lectures, slides, and PDFs into perfect study notes.",
    pitch: "Learn faster with AI that extracts what matters most—built for speed and accuracy.",
    contact: { email: "jamal@noteflow.ai" },
    traction: { users: 2400, revenue: 15000, mrr: 5000 },
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 3,
    title: "DormRunner",
    stage: "backed",
    summary: "Student-run package & laundry delivery network.",
    founder: "Emma T.",
    university: "Harvard",
    avatar: "https://images.pexels.com/photos/3792581/pexels-photo-3792581.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    product: "On-demand campus delivery: laundry, packages, errands—by students, for students.",
    pitch: "3 campuses, $8.5k MRR, expanding fast with a proven unit model.",
    contact: { email: "emma@dormrunner.com" },
    traction: { users: 1200, revenue: 25000, mrr: 8500, campuses: 3 },
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  // Extra placeholders so the page feels full
  {
    id: 4,
    title: "StudySync",
    stage: "ideas",
    summary: "Virtual study groups with AI matching.",
    founder: "Alex R.",
    university: "UC Berkeley",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    product: "AI matches students by goals/time zones for collaborative sessions.",
    pitch: "Bring the best people together to learn, faster.",
    contact: { email: "alex@studysync.co" },
    traction: { users: 50, waitlist: 300 },
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 5,
    title: "EcoTrack",
    stage: "revenue",
    summary: "Carbon footprint tracking for universities.",
    founder: "Maria S.",
    university: "Stanford",
    avatar: "https://images.pexels.com/photos/3763152/pexels-photo-3763152.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    product: "IoT + analytics suite that tracks energy, waste, and emissions.",
    pitch: "Cut campus carbon by 40% with continuous monitoring and nudges.",
    contact: { email: "maria@ecotrack.io" },
    traction: { users: 800, revenue: 45000 },
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 6,
    title: "FinanceFlow",
    stage: "backed",
    summary: "Student budgeting and financial literacy app.",
    founder: "David L.",
    university: "Wharton",
    avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    product: "Budgeting, investing, and money education built for students.",
    pitch: "10k+ students onboarded, 85% retention, strong referrals.",
    contact: { email: "david@financeflow.app" },
    traction: { users: 10000, revenue: 120000, retention: "85%" },
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
];

/* ===========================
   Page
=========================== */
export default function App(): JSX.Element {
  // Search / filter / UI
  const [search, setSearch] = useState("");
  const [university, setUniversity] = useState("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [openId, setOpenId] = useState<number | null>(null);

  // Modals
  const [showFounder, setShowFounder] = useState(false);
  const [showInvestor, setShowInvestor] = useState(false);

  // “Monthly Drop” countdown → next month’s 1st, 5:00 PM
  const [countdown, setCountdown] = useState("Loading…");
  useEffect(() => {
    const target = (() => {
      const now = new Date();
      const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1, 17, 0, 0);
      return nextMonth;
    })();
    const tick = () => {
      const now = new Date().getTime();
      const diff = target.getTime() - now;
      if (diff <= 0) return setCountdown("Live now!");
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setCountdown(`${d}d ${h}h ${m}m ${s}s`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Derived lists
  const universityOptions = useMemo(() => {
    const set = new Set(STARTUPS.map((s) => s.university));
    return ["All", ...Array.from(set).sort()];
  }, []);
  const filtered = (stage: Startup["stage"]) =>
    STARTUPS.filter((s) => {
      const matchesStage = s.stage === stage;
      const matchesUni = university === "All" || s.university === university;
      const q = search.toLowerCase();
      const matchesSearch =
        s.title.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.product.toLowerCase().includes(q) ||
        s.pitch.toLowerCase().includes(q);
      return matchesStage && matchesUni && matchesSearch;
    });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* ================= HERO ================= */}
      <section className="relative min-h-[72vh] flex items-center justify-center text-center">
        {/* City background */}
        <img
          src="https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="City Skyline"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        <div className="absolute inset-0 bg-slate-900/70 -z-10" />
        <div className="max-w-4xl px-6">
          <h1 className="text-white text-5xl md:text-7xl font-extrabold leading-tight">
            Where <span className="text-navy-400">Founders</span> meet <span className="text-navy-400">Investors</span>
          </h1>
          <p className="mt-6 text-slate-200 text-xl">
            A trusted, curated hub for dorm-room ideas, real traction, and investor-backed launches.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setShowFounder(true)}
              className="px-8 py-3 rounded-full bg-navy-500 text-white font-semibold hover:bg-navy-600 transition shadow"
            >
              Post Your Startup
            </button>
            <button
              onClick={() => setShowInvestor(true)}
              className="px-8 py-3 rounded-full bg-white text-navy-600 font-semibold hover:bg-slate-100 transition shadow flex items-center gap-2"
            >
              Become an Investor <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() =>
              document.getElementById("discover")?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-10 inline-flex items-center gap-2 text-slate-200 hover:text-white transition"
          >
            Learn more <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ================= DISCOVER ================= */}
      <section id="discover" className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold">Discover Startups</h2>
          <p className="text-slate-600 mt-2">
            Browse by stage: <span className="font-semibold">Business Plan</span> (ideas),{" "}
            <span className="font-semibold">Revenue</span>, and{" "}
            <span className="font-semibold">Investor-Backed</span>.
          </p>
        </div>

        {/* Search + filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-10">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search startups, products, or summaries…"
              className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-300 focus:ring-2 focus:ring-navy-500 shadow-sm"
            />
          </div>
          <select
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            className="rounded-full border border-slate-300 px-4 py-3 shadow-sm"
          >
            {universityOptions.map((u) => (
              <option key={u}>{u}</option>
            ))}
          </select>
        </div>

        {/* Columns by stage */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StageColumn
            title="🧠 Business Plan"
            items={filtered("ideas")}
            hoveredId={hoveredId}
            openId={openId}
            setHoveredId={setHoveredId}
            setOpenId={setOpenId}
          />
          <StageColumn
            title="📈 Revenue Made"
            items={filtered("revenue")}
            hoveredId={hoveredId}
            openId={openId}
            setHoveredId={setHoveredId}
            setOpenId={setOpenId}
          />
          <StageColumn
            title="🚀 Investor-Backed"
            items={filtered("backed")}
            hoveredId={hoveredId}
            openId={openId}
            setHoveredId={setHoveredId}
            setOpenId={setOpenId}
          />
        </div>
      </section>

      {/* ================= MONTHLY DROP ================= */}
      <section className="py-16 bg-slate-100 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-navy-600 font-semibold shadow">
              <Sparkles className="w-4 h-4" /> Monthly Drop
            </div>
            <h3 className="mt-4 text-3xl font-bold">Top 10 Campus Ventures</h3>
            <p className="mt-2 text-slate-600">
              Curated by traction, team quality, and clarity of vision. Goes live the first day of each month.
            </p>
            <div className="mt-6 flex items-center gap-3 text-navy-600">
              <Clock className="w-5 h-5" />
              <span className="text-xl font-bold">{countdown}</span>
            </div>
            <button className="mt-6 px-6 py-3 rounded-full bg-navy-500 text-white font-semibold hover:bg-navy-600 transition shadow">
              Get Notified
            </button>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h4 className="font-semibold text-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-navy-500" /> What we look for
            </h4>
            <ul className="mt-4 space-y-2 text-slate-700">
              <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-navy-500" /> Clear user pain + insight</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-navy-500" /> Evidence of velocity (shipping updates or early metrics)</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-navy-500" /> Focused GTM and realistic ask</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-10">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Step
            icon={<Target className="w-6 h-6" />}
            title="Founders apply"
            text="Share your one-liner, problem, solution, traction, and a 60-sec video pitch."
          />
          <Step
            icon={<Users className="w-6 h-6" />}
            title="Investors browse"
            text="Filter by stage, sector, school, and signals like revenue or retention."
          />
          <Step
            icon={<Rocket className="w-6 h-6" />}
            title="Warm intros"
            text="We facilitate intros. Deals happen off-platform (SAFE/note/equity). Simple & safe."
          />
        </div>
      </section>

      {/* ================= CRITERIA (Competitive Edge) ================= */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <h4 className="text-2xl font-bold mb-4">Founder Signup Criteria</h4>
            <ul className="space-y-3 text-slate-700">
              <Criteria text="Clear problem & target user" />
              <Criteria text="Solution description (what you’re building)" />
              <Criteria text="Stage: Business Plan / Revenue / Investor-Backed" />
              <Criteria text="Key metrics (users, MRR, waitlist, pilots)" />
              <Criteria text="Team: roles, time commitment" />
              <Criteria text="60-second video pitch (optional but recommended)" />
              <Criteria text="Ask: funding amount, intros, hiring" />
            </ul>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <h4 className="text-2xl font-bold mb-4">Investor Signup Criteria</h4>
            <ul className="space-y-3 text-slate-700">
              <Criteria text="Name & firm (if applicable)" />
              <Criteria text="Check size range & preferred stage" />
              <Criteria text="Sectors of interest" />
              <Criteria text="Geography / campus preference" />
              <Criteria text="Founder intro policy (what you respond to fast)" />
              <Criteria text="Optional: past investments or portfolio link" />
            </ul>
          </div>
        </div>
        <p className="text-center text-slate-500 mt-6 text-sm">
          *We are not a broker-dealer. We enable discovery and connection; deal terms and execution happen off-platform.
        </p>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-10 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} DormVenture · <a className="hover:underline" href="#how-it-works">How It Works</a>
      </footer>

      {/* ================= MODALS ================= */}
      {showFounder && (
        <Modal onClose={() => setShowFounder(false)} title="Post Your Startup">
          <p className="text-slate-600 mb-4">
            Enter your details and we’ll review for the next Monthly Drop and investor discovery.
          </p>
          <FormGrid
            fields={[
              { label: "Startup Name", type: "text" },
              { label: "Founder Name(s)", type: "text" },
              { label: "University", type: "text" },
              { label: "Email", type: "email" },
              { label: "Stage", type: "select", options: ["Business Plan", "Revenue", "Investor-Backed"] },
              { label: "One-line Pitch", type: "text", full: true },
              { label: "Problem", type: "textarea", full: true },
              { label: "Solution / Product", type: "textarea", full: true },
              { label: "Key Metrics (users / MRR / pilots)", type: "text", full: true },
              { label: "60-sec Video URL (optional)", type: "text", full: true },
              { label: "What you’re looking for", type: "text", full: true },
            ]}
            submitText="Submit for Review"
          />
        </Modal>
      )}

      {showInvestor && (
        <Modal onClose={() => setShowInvestor(false)} title="Become an Investor">
          <p className="text-slate-600 mb-4">
            Tell us what you’re looking for so we can route the best founders to you.
          </p>
          <FormGrid
            fields={[
              { label: "Your Name", type: "text" },
              { label: "Email", type: "email" },
              { label: "Firm (optional)", type: "text" },
              { label: "Check Size", type: "select", options: ["$10k–$50k", "$50k–$250k", "$250k–$1M", "$1M+"] },
              { label: "Preferred Stage", type: "select", options: ["Business Plan", "Revenue", "Investor-Backed"] },
              { label: "Sectors", type: "text", full: true },
              { label: "Geography / campus preference", type: "text", full: true },
              { label: "Intro policy (what you reply to fast)", type: "textarea", full: true },
              { label: "Portfolio link (optional)", type: "text", full: true },
            ]}
            submitText="Create Investor Profile"
          />
        </Modal>
      )}
    </div>
  );
}

/* ===========================
   Components
=========================== */

function StageColumn({
  title,
  items,
  hoveredId,
  openId,
  setHoveredId,
  setOpenId,
}: {
  title: string;
  items: Startup[];
  hoveredId: number | null;
  openId: number | null;
  setHoveredId: (id: number | null) => void;
  setOpenId: (id: number | null) => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-navy-500/10 flex items-center justify-center">
          <Play className="w-5 h-5 text-navy-600" />
        </div>
        <h4 className="text-xl font-semibold">{title}</h4>
      </div>
      <div className="space-y-4">
        {items.map((s) => {
          const expanded = openId === s.id;
          const hovered = hoveredId === s.id;
          const revenueK = s.traction?.revenue ? Math.round(s.traction.revenue / 1000) : null;

          return (
            <div
              key={s.id}
              onMouseEnter={() => setHoveredId(s.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setOpenId(expanded ? null : s.id)}
              className={`bg-white border border-slate-200 rounded-2xl p-4 shadow transition-all duration-300 cursor-pointer ${
                expanded ? "scale-[1.02] shadow-lg" : "hover:scale-[1.01] hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-4">
                <img src={s.avatar} alt={s.founder} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h5 className="font-bold text-slate-800">{s.title}</h5>
                    {revenueK && (
                      <span className="text-xs bg-navy-100 text-navy-700 px-2 py-0.5 rounded-full">
                        ${revenueK}k/mo
                      </span>
                    )}
                    {s.traction?.users && (
                      <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {s.traction.users.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500">{s.founder} · {s.university}</p>
                </div>
              </div>

              <p className="mt-2 text-slate-700 text-sm line-clamp-2">{s.summary}</p>

              {/* Hover Peek */}
              {!expanded && (
                <div className={`mt-2 transition-opacity ${hovered ? "opacity-100" : "opacity-0"}`}>
                  <div className="text-xs bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-slate-600">
                    <span className="font-semibold">Peek:</span> {s.product.slice(0, 48)}
                    {s.product.length > 48 ? "…" : ""} • {s.pitch.slice(0, 42)}
                    {s.pitch.length > 42 ? "…" : ""}
                  </div>
                </div>
              )}

              {/* Expanded Detail */}
              {expanded && (
                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  {s.video && (
                    <div>
                      <p className="font-semibold mb-1">Video Pitch</p>
                      <video controls className="w-full rounded-xl">
                        <source src={s.video} type="video/mp4" />
                      </video>
                    </div>
                  )}
                  <p><strong>Product:</strong> {s.product}</p>
                  <p><strong>Vision:</strong> {s.pitch}</p>
                  <div className="flex items-center gap-3 text-slate-600 flex-wrap">
                    {s.traction?.mrr && (
                      <span className="inline-flex items-center gap-1 text-xs bg-navy-100 text-navy-700 px-2 py-1 rounded-full">
                        <DollarSign className="w-3 h-3" /> MRR ${Math.round((s.traction.mrr || 0) / 1000)}k
                      </span>
                    )}
                    {s.traction?.campuses && (
                      <span className="inline-flex items-center gap-1 text-xs bg-slate-100 px-2 py-1 rounded-full">
                        {s.traction.campuses} campuses
                      </span>
                    )}
                    {s.traction?.waitlist && (
                      <span className="inline-flex items-center gap-1 text-xs bg-slate-100 px-2 py-1 rounded-full">
                        waitlist {s.traction.waitlist}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                    <a
                      href={`mailto:${s.contact.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-navy-600 font-semibold hover:underline"
                    >
                      Contact founder →
                    </a>
                    <span className="text-xs text-slate-500">Click card again to collapse</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Step({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="w-10 h-10 rounded-xl bg-navy-500/10 text-navy-600 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h5 className="font-semibold text-lg mb-1">{title}</h5>
      <p className="text-slate-600">{text}</p>
    </div>
  );
}

function Criteria({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle className="mt-0.5 w-5 h-5 text-navy-500" /> {text}
    </li>
  );
}

function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h4 className="text-2xl font-bold">{title}</h4>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-2xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

function FormGrid({
  fields,
  submitText,
}: {
  fields: { label: string; type: "text" | "email" | "textarea" | "select"; full?: boolean; options?: string[] }[];
  submitText: string;
}) {
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fields.map((f, idx) => (
        <div key={idx} className={f.full ? "md:col-span-2" : ""}>
          <label className="block text-sm font-semibold text-slate-700 mb-1">{f.label}</label>
          {f.type === "textarea" ? (
            <textarea
              rows={4}
              className="w-full rounded-xl border-2 border-slate-300 px-3 py-2 focus:ring-2 focus:ring-navy-500"
            />
          ) : f.type === "select" ? (
            <select className="w-full rounded-xl border-2 border-slate-300 px-3 py-2 focus:ring-2 focus:ring-navy-500">
              {f.options?.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          ) : (
            <input
              type={f.type}
              className="w-full rounded-xl border-2 border-slate-300 px-3 py-2 focus:ring-2 focus:ring-navy-500"
            />
          )}
        </div>
      ))}
      <div className="md:col-span-2">
        <button
          type="button"
          className="w-full mt-2 rounded-2xl bg-navy-500 text-white font-semibold py-3 hover:bg-navy-600 transition shadow"
        >
          {submitText}
        </button>
      </div>
    </form>
  );
}
