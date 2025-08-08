import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  ArrowRight,
  Users,
  DollarSign,
  Zap,
  Target,
  ChevronDown,
} from "lucide-react";

/* ---------------------------------------
   SAMPLE STARTUPS (add/replace any time)
-----------------------------------------*/
const startups = [
  {
    id: 1,
    title: "Campus Cupboard",
    stage: "ideas",
    summary: "Dorm-based food-sharing network to eliminate waste.",
    founder: "Sophie L.",
    university: "Stanford",
    avatar: "https://via.placeholder.com/100",
    product: "Mobile app to share excess food across dorms.",
    pitch:
      "We're eliminating food waste one dorm at a time by connecting students who have extra food with those who need it.",
    contact: { email: "sophie@campuscupboard.com" },
    traction: { users: 150 },
    video:
      "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 2,
    title: "NoteFlow",
    stage: "revenue",
    summary: "AI-generated notes & summaries for students.",
    founder: "Jamal K.",
    university: "MIT",
    avatar: "https://via.placeholder.com/100",
    product: "AI platform that generates notes from classes & PDFs.",
    pitch:
      "Helping students learn smarter with AI-powered note generation and intelligent summaries.",
    contact: { email: "jamal@noteflow.ai" },
    traction: { users: 2400, revenue: 15000 },
    video:
      "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 3,
    title: "DormRunner",
    stage: "backed",
    summary: "Student-run package & laundry delivery service.",
    founder: "Emma T.",
    university: "Harvard",
    avatar: "https://via.placeholder.com/100",
    product:
      "On-demand delivery service run by students for students: packages, laundry, errands.",
    pitch:
      "Over $2k MRR across 3 campuses and growing fast with our student delivery network.",
    contact: { email: "emma@dormrunner.com" },
    traction: { users: 1200, revenue: 25000, campuses: 3 },
    video:
      "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 4,
    title: "StudySync",
    stage: "ideas",
    summary: "Virtual study groups with AI matching.",
    founder: "Alex R.",
    university: "UC Berkeley",
    avatar: "https://via.placeholder.com/100",
    product:
      "AI matches students by goals/schedules for virtual study sessions.",
    pitch:
      "Connecting students worldwide for collaborative learning through AI-powered matching.",
    contact: { email: "alex@studysync.co" },
    traction: { users: 50, waitlist: 300 },
    video:
      "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 5,
    title: "EcoTrack",
    stage: "revenue",
    summary: "Carbon footprint tracking for universities.",
    founder: "Maria S.",
    university: "Stanford",
    avatar: "https://via.placeholder.com/100",
    product:
      "IoT + analytics to track energy consumption, waste & emissions.",
    pitch:
      "Helping universities reduce carbon footprint by 40% with intelligent monitoring.",
    contact: { email: "maria@ecotrack.io" },
    traction: { users: 800, revenue: 45000, universities: 5 },
    video:
      "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 6,
    title: "FinanceFlow",
    stage: "backed",
    summary: "Student budgeting and financial literacy app.",
    founder: "David L.",
    university: "Wharton",
    avatar: "https://via.placeholder.com/100",
    product:
      "Budgeting, investing, & money education built for students.",
    pitch:
      "Teaching financial literacy to 10,000+ students while helping them manage their money better.",
    contact: { email: "david@financeflow.app" },
    traction: { users: 10000, revenue: 120000, retention: "85%" },
    video:
      "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  // Extra placeholders to fill the page
  {
    id: 7,
    title: "GreenDorm",
    stage: "ideas",
    summary: "Eco-friendly dorm utilities platform.",
    founder: "Liam Brooks",
    university: "Berkeley",
    avatar: "https://via.placeholder.com/100",
    product: "Sustainable energy monitoring app.",
    pitch: "Saving dorms money and the planet.",
    contact: { email: "liam@greendorm.com" },
    traction: { users: 80 },
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 8,
    title: "NoteMates",
    stage: "revenue",
    summary: "Collaborative study notes marketplace.",
    founder: "Ava White",
    university: "Columbia",
    avatar: "https://via.placeholder.com/100",
    product: "Study notes sharing hub.",
    pitch: "Helping students collaborate smarter.",
    contact: { email: "ava@notemates.com" },
    traction: { users: 600, revenue: 7000 },
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 9,
    title: "ProtoLab",
    stage: "ideas",
    summary: "Rapid prototyping club-to-startup pipeline.",
    founder: "Noah Patel",
    university: "Stanford",
    avatar: "https://via.placeholder.com/100",
    product: "Makerspace-to-market toolkit.",
    pitch: "Turn class projects into real companies.",
    contact: { email: "noah@protolab.io" },
    traction: { users: 120 },
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 10,
    title: "CampusCare",
    stage: "backed",
    summary: "On-demand student mental health access.",
    founder: "Maya Ortiz",
    university: "Harvard",
    avatar: "https://via.placeholder.com/100",
    product: "Teletherapy platform for universities.",
    pitch: "Accessible care for every student.",
    contact: { email: "maya@campuscare.health" },
    traction: { users: 3000, revenue: 40000 },
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
];

/* ---------------------------------------
   MENTORS (placeholder)
-----------------------------------------*/
const mentors = [
  {
    id: 1,
    name: "Jordan Reed",
    title: "VC Advisor",
    bio: "Seed to Series A, 10+ yrs.",
    avatar: "https://randomuser.me/api/portraits/men/40.jpg",
  },
  {
    id: 2,
    name: "Priya Singh",
    title: "Product Coach",
    bio: "Ex-Google PM, EdTech focus.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 3,
    name: "Marcus Lee",
    title: "Growth Strategist",
    bio: "Zero-to-one and GTM.",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    id: 4,
    name: "Emma Zhao",
    title: "Ops & Hiring",
    bio: "Scaled ops at 2 unicorns.",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

export default function App() {
  /* ---------------- state ---------------- */
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("All");
  const [hoveredStartupId, setHoveredStartupId] = useState(null);
  const [selectedStartupId, setSelectedStartupId] = useState(null);
  const [showFounderPortal, setShowFounderPortal] = useState(false);
  const [showInvestorPortal, setShowInvestorPortal] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [countdown, setCountdown] = useState("Loading...");

  // Build university list from data
  const universityOptions = useMemo(() => {
    const set = new Set(startups.map((s) => s.university));
    return ["All", ...Array.from(set).sort()];
  }, []);

  // Dynamic demo day countdown (Sept 15, 2025 17:00)
  useEffect(() => {
    const target = new Date("2025-09-15T17:00:00");
    const tick = () => {
      const now = new Date();
      const diff = target - now;
      if (diff <= 0) return setCountdown("Today!");
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

  /* ---------------- filters ---------------- */
  const getStartupsByStage = (stage) =>
    startups.filter((s) => {
      const matchesStage = s.stage === stage;
      const matchesSearch =
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.product.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesUniversity =
        selectedUniversity === "All" || s.university === selectedUniversity;
      return matchesStage && matchesSearch && matchesUniversity;
    });

  /* ---------------- UI helpers ---------------- */
  const StageColumn = ({ stageKey, title }) => {
    const items = getStartupsByStage(stageKey);
    return (
      <div>
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <div className="space-y-4">
          {items.map((startup) => {
            const isExpanded = selectedStartupId === startup.id;
            const isHovered = hoveredStartupId === startup.id;
            const revenueK = startup.traction?.revenue
              ? Math.round(startup.traction.revenue / 1000)
              : null;

            return (
              <div
                key={startup.id}
                onMouseEnter={() => setHoveredStartupId(startup.id)}
                onMouseLeave={() => setHoveredStartupId(null)}
                onClick={() =>
                  setSelectedStartupId(isExpanded ? null : startup.id)
                }
                className={`group relative bg-white border border-slate-200 p-4 rounded-2xl shadow transition-all duration-300 cursor-pointer ${
                  isExpanded ? "scale-105 shadow-xl" : "hover:scale-[1.02] hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-4 mb-2">
                  <img
                    src={startup.avatar}
                    alt={startup.founder}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-slate-800">
                      {startup.title}
                      {revenueK ? (
                        <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                          🎯 ${revenueK}k Rev
                        </span>
                      ) : null}
                    </h4>
                    <p className="text-sm text-slate-500">
                      {startup.founder} · {startup.university}
                    </p>
                  </div>
                </div>

                <p className="text-slate-600 text-sm mb-2 line-clamp-2">
                  {startup.summary}
                </p>

                {/* HOVER REVEAL: quick peek */}
                {!isExpanded && (
                  <div
                    className={`pointer-events-none absolute inset-x-4 bottom-4 transition-opacity ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="rounded-xl bg-slate-100/80 border border-slate-200 px-3 py-2 text-xs text-slate-600">
                      <span className="font-semibold">Peek: </span>
                      Product – {startup.product.slice(0, 36)}
                      {startup.product.length > 36 ? "…" : ""} • Vision –{" "}
                      {startup.pitch.slice(0, 30)}
                      {startup.pitch.length > 30 ? "…" : ""}
                    </div>
                  </div>
                )}

                {/* CLICK EXPAND: full detail w/ video */}
                {isExpanded && (
                  <div className="mt-3 text-sm text-slate-700 space-y-3">
                    <div>
                      <p className="font-semibold mb-1">Video Pitch:</p>
                      <video controls className="rounded-xl w-full">
                        <source
                          src={startup.video || "https://www.w3schools.com/html/mov_bbb.mp4"}
                          type="video/mp4"
                        />
                      </video>
                    </div>
                    <p>
                      <strong>Product:</strong> {startup.product}
                    </p>
                    <p>
                      <strong>Vision:</strong> {startup.pitch}
                    </p>
                    <div className="flex items-center gap-4 text-slate-600">
                      {startup.traction?.users && (
                        <span className="inline-flex items-center gap-1 text-xs bg-slate-100 px-2 py-1 rounded-full">
                          <Users className="w-3 h-3" />
                          {startup.traction.users.toLocaleString()} users
                        </span>
                      )}
                      {revenueK && (
                        <span className="inline-flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                          <DollarSign className="w-3 h-3" />${revenueK}k revenue
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500">
                      {startup.contact.email}
                    </div>
                    <p className="text-xs text-slate-400 italic">
                      Click again to collapse.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* HERO with city background */}
      <section className="relative min-h-[70vh] flex flex-col justify-center items-center text-center px-6 text-white">
        <img
          src="https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="City Skyline"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-slate-900/70 z-10" />
        <div className="relative z-20 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to <span className="text-emerald-400">Your Future</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-8">
            A trusted space where student founders meet bold investors.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setShowFounderPortal(true)}
              className="px-6 py-3 text-lg font-semibold bg-white text-emerald-700 rounded-full hover:bg-slate-100 transition shadow"
            >
              Post Your Startup
            </button>
            <button
              onClick={() => setShowInvestorPortal(true)}
              className="px-6 py-3 text-lg font-semibold bg-emerald-600 rounded-full hover:bg-emerald-700 transition shadow flex items-center gap-2"
            >
              Become an Investor <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() =>
              document.getElementById("discover")?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-8 text-white/80 hover:text-white flex items-center gap-2 mx-auto"
          >
            Learn more <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* DISCOVER */}
      <section id="discover" className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-3">
          Discover Dorm Room Startups
        </h2>
        <p className="text-center text-lg text-slate-600 mb-10 max-w-3xl mx-auto">
          Browse projects making waves across campuses — support the next
          generation of founders.
        </p>

        {/* Search + University Filter */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-full focus:ring-2 focus:ring-emerald-500 shadow-sm"
              placeholder="Search startups, products, or summaries…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="border border-slate-300 rounded-full px-4 py-3 shadow-sm"
            value={selectedUniversity}
            onChange={(e) => setSelectedUniversity(e.target.value)}
          >
            {universityOptions.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>

        {/* Stage Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <StageColumn stageKey="ideas" title="🧠 Business Ideas" />
          <StageColumn stageKey="revenue" title="📈 Revenue Made" />
          <StageColumn stageKey="backed" title="🚀 Investor Backed" />
        </div>
      </section>

      {/* Founder / Investor CTA tabs */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-10 rounded-3xl text-white shadow-xl">
          <Zap className="w-10 h-10 mb-4" />
          <h4 className="text-2xl font-bold mb-2">Post Your Startup</h4>
          <p className="mb-6">
            Submit your idea and connect with investors & mentors.
          </p>
          <button
            onClick={() => setShowFounderPortal(true)}
            className="w-full py-3 bg-white text-emerald-700 rounded-full font-semibold hover:bg-slate-100 transition flex items-center justify-center gap-2"
          >
            Submit Your Startup <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="bg-gradient-to-br from-slate-700 to-slate-900 p-10 rounded-3xl text-white shadow-xl">
          <Target className="w-10 h-10 mb-4" />
          <h4 className="text-2xl font-bold mb-2">Become an Investor</h4>
          <p className="mb-6">
            Discover curated opportunities by stage, sector, and traction.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowInvestorPortal(true)}
              className="w-full py-3 bg-white text-slate-800 rounded-full font-semibold hover:bg-slate-100 transition"
            >
              Explore Startups
            </button>
            <button
              onClick={() => setShowQuiz(true)}
              className="w-full py-3 bg-emerald-600 rounded-full font-semibold hover:bg-emerald-700 transition"
            >
              🧠 Match Quiz
            </button>
          </div>
        </div>
      </section>

      {/* Mentor Spotlight */}
      <section className="py-16 px-6 bg-white max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">🌟 Mentor Spotlight</h2>
        <div className="flex space-x-6 overflow-x-auto pb-2">
          {mentors.map((m) => (
            <div
              key={m.id}
              className="min-w-[260px] bg-slate-100 rounded-2xl p-6 shadow"
            >
              <img
                src={m.avatar}
                alt={m.name}
                className="w-16 h-16 rounded-full mb-4 object-cover"
              />
              <h4 className="text-lg font-semibold">{m.name}</h4>
              <p className="text-sm text-slate-700">{m.title}</p>
              <p className="text-sm text-slate-600 mt-2">{m.bio}</p>
              <button className="mt-4 text-emerald-600 font-semibold hover:underline text-sm">
                Connect
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Day + Quiz CTA */}
      <section className="py-16 px-6 bg-slate-100 text-center">
        <h2 className="text-3xl font-bold mb-2">⏳ Countdown to Demo Day</h2>
        <p className="text-slate-600 mb-6">
          Next Virtual Pitch Event: <strong>September 15, 2025</strong>
        </p>
        <div className="text-5xl font-bold text-emerald-600 mb-6">{countdown}</div>
        <button
          onClick={() => setShowQuiz(true)}
          className="mt-2 bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 font-semibold text-lg"
        >
          🧠 Take Investor Match Quiz
        </button>
      </section>

      {/* Founder Portal Modal */}
      {showFounderPortal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold">Founder Portal</h3>
              <button
                onClick={() => setShowFounderPortal(false)}
                className="text-slate-400 hover:text-slate-700 text-2xl"
              >
                ×
              </button>
            </div>
            <p className="text-slate-600 mb-6">
              Submit your startup details and get in front of investors and mentors.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="border rounded-xl px-3 py-2" placeholder="Startup Name" />
              <input className="border rounded-xl px-3 py-2" placeholder="Founder Name" />
              <input className="border rounded-xl px-3 py-2 md:col-span-2" placeholder="Website or Deck URL" />
              <textarea className="border rounded-xl px-3 py-2 md:col-span-2" rows="4" placeholder="One-line pitch"></textarea>
            </div>
            <button className="mt-6 bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-700">
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Investor Portal Modal */}
      {showInvestorPortal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold">Investor Portal</h3>
              <button
                onClick={() => setShowInvestorPortal(false)}
                className="text-slate-400 hover:text-slate-700 text-2xl"
              >
                ×
              </button>
            </div>
            <p className="text-slate-600 mb-6">
              Filter startups by stage, sector, and traction.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select className="border rounded-xl px-3 py-2">
                <option>All Stages</option>
                <option>Ideas</option>
                <option>Revenue</option>
                <option>Backed</option>
              </select>
              <select className="border rounded-xl px-3 py-2">
                <option>All Sectors</option>
                <option>EdTech</option>
                <option>FinTech</option>
                <option>Climate Tech</option>
                <option>HealthTech</option>
                <option>Logistics</option>
              </select>
              <select className="border rounded-xl px-3 py-2">
                <option>Any Traction</option>
                <option>Users &gt; 1k</option>
                <option>MRR &gt; $5k</option>
                <option>Raised &gt; $100k</option>
              </select>
            </div>
            <button className="mt-6 bg-slate-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-slate-900">
              View Matches
            </button>
          </div>
        </div>
      )}

      {/* Investor Match Quiz (placeholder) */}
      {showQuiz && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl p-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-2xl font-bold">Investor Match Quiz</h3>
              <button
                onClick={() => setShowQuiz(false)}
                className="text-slate-400 hover:text-slate-700 text-2xl"
              >
                ×
              </button>
            </div>
            <p className="text-slate-600 mb-4">
              Answer a few quick questions to get matched with startups.
            </p>
            <div className="space-y-3">
              <select className="w-full border rounded-xl px-3 py-2">
                <option>Preferred Stage</option>
                <option>Ideas</option>
                <option>Revenue</option>
                <option>Backed</option>
              </select>
              <select className="w-full border rounded-xl px-3 py-2">
                <option>Industry</option>
                <option>EdTech</option>
                <option>FinTech</option>
                <option>Climate Tech</option>
                <option>HealthTech</option>
                <option>Logistics</option>
              </select>
              <select className="w-full border rounded-xl px-3 py-2">
                <option>Check Size</option>
                <option>$10k–$50k</option>
                <option>$50k–$250k</option>
                <option>$250k–$1M</option>
                <option>$1M+</option>
              </select>
            </div>
            <button className="mt-6 bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-700 w-full">
              See Matches
            </button>
          </div>
        </div>
      )}

      <footer className="text-center py-10 text-slate-500 text-sm">
        © {new Date().getFullYear()} DormVenture — Built to Launch What’s Next.
      </footer>
    </div>
  );
}
