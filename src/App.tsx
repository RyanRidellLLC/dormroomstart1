import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  Search,
  ArrowRight,
  Users,
  DollarSign,
  Zap,
  Target,
  ChevronDown,
} from "lucide-react";
import { supabase } from "./supabaseClient";
import FounderSubmit from "./pages/FounderSubmit";
import RequestProAccess from "./components/RequestProAccess";

/* ---------------------------------------
   STARTUPS (same as before)
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
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
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
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  // ... keep rest of your startup objects unchanged
];

/* ---------------------------------------
   MENTORS (unchanged)
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

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/founder" element={<FounderSubmit />} />
    </Routes>
  );
}

/* =======================================
   HOMEPAGE
=========================================*/
function HomePage(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("All");
  const [hoveredStartupId, setHoveredStartupId] = useState<number | null>(null);
  const [selectedStartupId, setSelectedStartupId] = useState<number | null>(null);
  const [showInvestorPortal, setShowInvestorPortal] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showRequestPro, setShowRequestPro] = useState(false);
  const [countdown, setCountdown] = useState("Loading...");
  const [currentInvestor, setCurrentInvestor] = useState<any>(null);

  const navigate = useNavigate();

  // 🔐 Load investor from Supabase
  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.id) {
        const { data } = await supabase
          .from("investors")
          .select("*")
          .eq("id", user.id)
          .single();
        setCurrentInvestor(data);
      }
    })();
  }, []);

  // Countdown logic
  useEffect(() => {
    const target = new Date("2025-09-15T17:00:00");
    const tick = () => {
      const now = new Date();
      const diff = +target - +now;
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

  const universityOptions = useMemo(() => {
    const set = new Set(startups.map((s) => s.university));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const getStartupsByStage = (stage: string) =>
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

  const StageColumn: React.FC<{ stageKey: string; title: string }> = ({
    stageKey,
    title,
  }) => {
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
                  isExpanded
                    ? "scale-105 shadow-xl"
                    : "hover:scale-[1.02] hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-4 mb-2">
                  <img src={startup.avatar} alt={startup.founder} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-800">
                      {startup.title}
                      {revenueK && (
                        <span className="ml-2 text-xs bg-navy-100 text-navy-600 px-2 py-0.5 rounded-full">
                          🎯 ${revenueK}k Rev
                        </span>
                      )}
                    </h4>
                    <p className="text-sm text-slate-500">{startup.founder} · {startup.university}</p>
                  </div>
                </div>

                <p className="text-slate-600 text-sm mb-2 line-clamp-2">{startup.summary}</p>

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

                {isExpanded && (
                  <div className="mt-3 text-sm text-slate-700 space-y-3">
                    <div>
                      <p className="font-semibold mb-1">Video Pitch:</p>
                      <video controls className="rounded-xl w-full">
                        <source src={startup.video} type="video/mp4" />
                      </video>
                    </div>
                    <p><strong>Product:</strong> {startup.product}</p>
                    <p><strong>Vision:</strong> {startup.pitch}</p>

                    <div className="flex items-center gap-4 text-slate-600">
                      {startup.traction?.users && (
                        <span className="inline-flex items-center gap-1 text-xs bg-slate-100 px-2 py-1 rounded-full">
                          <Users className="w-3 h-3" />
                          {startup.traction.users.toLocaleString()} users
                        </span>
                      )}
                      {revenueK && (
                        <span className="inline-flex items-center gap-1 text-xs bg-navy-100 text-navy-600 px-2 py-1 rounded-full">
                          <DollarSign className="w-3 h-3" />${revenueK}k revenue
                        </span>
                      )}
                    </div>

                    {/* 🔐 contact gating */}
                    {currentInvestor?.is_pro ? (
                      <div className="text-xs text-slate-500">{startup.contact.email}</div>
                    ) : (
                      <button
                        onClick={() => setShowRequestPro(true)}
                        className="text-xs bg-navy-500 text-white px-3 py-2 rounded-full"
                      >
                        Request Pro Access
                      </button>
                    )}

                    <p className="text-xs text-slate-400 italic">Click again to collapse.</p>
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
      {showRequestPro && <RequestProAccess onClose={() => setShowRequestPro(false)} />}

      {/* HERO */}
      <section className="relative min-h-[70vh] flex flex-col justify-center items-center text-center px-6 text-white">
        <img
          src="https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="City Skyline"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-slate-900/70 z-10" />
        <div className="relative z-20 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to <span className="text-navy-400">Your Future</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-8">
            A trusted space where student founders meet bold investors.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate("/founder")}
              className="px-6 py-3 text-lg font-semibold bg-navy-500 text-white rounded-full hover:bg-navy-600 transition shadow"
            >
              Post Your Startup
            </button>
            <button
              onClick={() => setShowInvestorPortal(true)}
              className="px-6 py-3 text-lg font-semibold bg-navy-500 rounded-full hover:bg-navy-600 transition shadow flex items-center gap-2 text-white"
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
      {/* ...keep the rest of your DISCOVER and CTA sections intact, 
          just ensure any emerald/teal colors are now replaced by bg-navy-*,
          text-navy-*, ring-navy-* etc. (same pattern as above) */}
    </div>
  );
}

// -------------- END OF FILE ----------------
