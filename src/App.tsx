import React, { useState, useEffect } from 'react';
import { 
  Search, ChevronDown, TrendingUp, Users, DollarSign, 
  Eye, MessageCircle, ArrowRight, Star, Zap, Target,
  Building2, Globe, Award, ChevronRight, ExternalLink,
  Play, CheckCircle, Linkedin, Mail, Phone
} from 'lucide-react';

const startups = [
  {
    id: 1,
    title: "Campus Cupboard",
    stage: "ideas",
    category: "Food Tech",
    summary: "A dorm-based food-sharing network to eliminate waste.",
    founder: "Sophie L.",
    university: "Stanford University",
    pitch: "We're eliminating food waste one dorm at a time by connecting students who have extra food with those who need it.",
    product: "Mobile app that connects students in dorms to share excess food, reducing waste and building community.",
    lookingFor: ["Co-founder", "Seed Funding", "Marketing Help"],
    traction: { users: 150, campuses: 2 },
    contact: { linkedin: "sophie-l-stanford", email: "sophie@campuscupboard.com" },
    avatar: "https://images.pexels.com/photos/3763152/pexels-photo-3763152.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    id: 2,
    title: "NoteFlow",
    stage: "revenue",
    category: "EdTech",
    summary: "AI-generated notes & summaries for students.",
    founder: "Jamal K.",
    university: "MIT",
    pitch: "Helping students learn smarter with AI-powered note generation and intelligent summaries.",
    product: "AI platform that automatically generates comprehensive study notes from lectures, textbooks, and research papers.",
    lookingFor: ["Series A Funding", "Technical Co-founder", "Sales Team"],
    traction: { users: 2400, revenue: 15000, mrr: 5000 },
    contact: { linkedin: "jamal-k-mit", email: "jamal@noteflow.ai" },
    avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    id: 3,
    title: "DormRunner",
    stage: "backed",
    category: "Logistics",
    summary: "Student-run package & laundry delivery service.",
    founder: "Emma T.",
    university: "Harvard Business School",
    pitch: "Over $2k MRR across 3 campuses and growing fast with our student delivery network.",
    product: "On-demand delivery service run by students for students, handling packages, laundry, and campus errands.",
    lookingFor: ["Growth Capital", "Operations Manager", "Campus Expansion"],
    traction: { users: 1200, revenue: 25000, mrr: 8500, campuses: 3 },
    contact: { linkedin: "emma-t-harvard", email: "emma@dormrunner.com" },
    avatar: "https://images.pexels.com/photos/3792581/pexels-photo-3792581.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    id: 4,
    title: "StudySync",
    stage: "ideas",
    category: "EdTech",
    summary: "Virtual study groups with AI matching.",
    founder: "Alex R.",
    university: "UC Berkeley",
    pitch: "Connecting students worldwide for collaborative learning through AI-powered study group matching.",
    product: "Platform that uses AI to match students with similar learning goals and schedules for virtual study sessions.",
    lookingFor: ["Technical Co-founder", "Pre-seed Funding", "Beta Users"],
    traction: { users: 50, waitlist: 300 },
    contact: { linkedin: "alex-r-berkeley", email: "alex@studysync.co" },
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    id: 5,
    title: "EcoTrack",
    stage: "revenue",
    category: "Climate Tech",
    summary: "Carbon footprint tracking for universities.",
    founder: "Maria S.",
    university: "Stanford University",
    pitch: "Helping universities reduce their carbon footprint by 40% through intelligent monitoring and analytics.",
    product: "IoT-enabled platform that tracks and analyzes university energy consumption, waste, and carbon emissions.",
    lookingFor: ["Series A", "Climate Tech Advisor", "Enterprise Sales"],
    traction: { users: 800, revenue: 45000, mrr: 12000, universities: 5 },
    contact: { linkedin: "maria-s-stanford", email: "maria@ecotrack.io" },
    avatar: "https://images.pexels.com/photos/3763152/pexels-photo-3763152.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    id: 6,
    title: "FinanceFlow",
    stage: "backed",
    category: "FinTech",
    summary: "Student budgeting and financial literacy app.",
    founder: "David L.",
    university: "Wharton",
    pitch: "Teaching financial literacy to 10,000+ students while helping them manage their money better.",
    product: "Comprehensive financial app that teaches budgeting, investing, and money management specifically for students.",
    lookingFor: ["Growth Funding", "Financial Advisors", "Marketing Team"],
    traction: { users: 10000, revenue: 120000, mrr: 25000, retention: "85%" },
    contact: { linkedin: "david-l-wharton", email: "david@financeflow.app" },
    avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  }
];

const categories = [
  { name: "All", count: startups.length },
  { name: "EdTech", count: startups.filter(s => s.category === "EdTech").length },
  { name: "FinTech", count: startups.filter(s => s.category === "FinTech").length },
  { name: "Food Tech", count: startups.filter(s => s.category === "Food Tech").length },
  { name: "Climate Tech", count: startups.filter(s => s.category === "Climate Tech").length },
  { name: "Logistics", count: startups.filter(s => s.category === "Logistics").length }
];

export default function App() {
  const [currentSection, setCurrentSection] = useState('landing');
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFounderForm, setShowFounderForm] = useState(false);
  const [showInvestorPortal, setShowInvestorPortal] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition < 100) {
      setCurrentSection('landing');
    } else if (scrollPosition < 800) {
      setCurrentSection('transition');
    } else {
      setCurrentSection('platform');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (section) => {
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredStartups = startups.filter(startup => {
    const matchesSearch = startup.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         startup.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         startup.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || startup.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStartupsByStage = (stage) => {
    return filteredStartups.filter(startup => startup.stage === stage);
  };

  const StartupCard = ({ startup, isExpanded }) => (
    <div 
      className={`bg-white rounded-3xl shadow-lg border border-slate-200 transition-all duration-500 cursor-pointer ${
        isExpanded ? 'transform scale-105 shadow-2xl z-20 relative ring-2 ring-emerald-200' : 'hover:shadow-xl hover:-translate-y-2 hover:ring-2 hover:ring-slate-200'
      }`}
      onMouseEnter={() => setHoveredCard(startup.id)}
      onMouseLeave={() => setHoveredCard(null)}
      onClick={() => setSelectedStartup(startup)}
    >
      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <img
              src={startup.avatar}
              alt={startup.founder}
              className="w-16 h-16 rounded-full object-cover border-3 border-slate-200 shadow-md"
            />
            <div>
              <h3 className="text-xl font-semibold text-slate-800 mb-1">{startup.title}</h3>
              <p className="text-sm text-slate-600 font-medium">{startup.founder} • {startup.university}</p>
              <p className="text-xs text-emerald-600 font-medium mt-1">"{startup.quote || 'Building the future, one idea at a time.'}"</p>
            </div>
          </div>
          <span className="px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-full text-sm font-medium shadow-sm">
            {startup.category}
          </span>
        </div>

        <p className="text-slate-700 mb-6 line-clamp-2 leading-relaxed">{startup.summary}</p>

        {isExpanded && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-100">
              <h4 className="font-semibold text-slate-800 mb-3 flex items-center">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                What We're Building
              </h4>
              <p className="text-slate-700 leading-relaxed">{startup.product}</p>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
              <h4 className="font-semibold text-slate-800 mb-3 flex items-center">
                <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                Our Vision
              </h4>
              <p className="text-slate-700 leading-relaxed">{startup.pitch}</p>
            </div>

            <div>
              <h4 className="font-semibold text-slate-800 mb-3">How You Can Help</h4>
              <div className="flex flex-wrap gap-3">
                {startup.lookingFor.map((item, index) => (
                  <span key={index} className="px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 rounded-full text-sm font-medium shadow-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {startup.traction && (
              <div className="grid grid-cols-2 gap-4">
                {startup.traction.users && (
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                    <div className="text-2xl font-bold text-blue-700">{startup.traction.users.toLocaleString()}</div>
                    <div className="text-sm text-blue-600 font-medium">Active Users</div>
                  </div>
                )}
                {startup.traction.revenue && (
                  <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-100">
                    <div className="text-2xl font-bold text-emerald-700">${(startup.traction.revenue / 1000).toFixed(0)}K</div>
                    <div className="text-sm text-emerald-600 font-medium">Monthly Revenue</div>
                  </div>
                )}
              </div>
            )}

            <div className="flex space-x-3">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`https://linkedin.com/in/${startup.contact.linkedin}`, '_blank');
                }}
                className="flex-1 py-4 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-2xl hover:from-slate-800 hover:to-slate-900 transition-all font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Linkedin className="w-5 h-5" />
                <span>Connect on LinkedIn</span>
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `mailto:${startup.contact.email}`;
                }}
                className="px-6 py-4 border-2 border-slate-300 text-slate-700 rounded-2xl hover:bg-slate-50 hover:border-slate-400 transition-all font-semibold"
              >
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {!isExpanded && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm text-slate-600">
              {startup.traction?.users && (
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium">{startup.traction.users.toLocaleString()}</span>
                </div>
              )}
              {startup.traction?.revenue && (
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium">${(startup.traction.revenue / 1000).toFixed(0)}K</span>
                </div>
              )}
            </div>
            <ChevronRight className="w-6 h-6 text-slate-400" />
          </div>
        )}
      </div>
    </div>
  );

  const StartupModal = ({ startup, onClose }) => (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={startup.avatar}
                alt={startup.founder}
                className="w-20 h-20 rounded-full object-cover border-4 border-slate-200 shadow-lg"
              />
              <div>
                <h2 className="text-4xl font-bold text-slate-800 mb-2">{startup.title}</h2>
                <p className="text-xl text-slate-600 font-medium">{startup.founder} • {startup.university}</p>
                <p className="text-emerald-600 font-medium mt-2 italic">"{startup.quote || 'Passionate about creating meaningful change.'}"</p>
                <span className="inline-block mt-3 px-6 py-3 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-full font-semibold">
                  {startup.category}
                </span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 text-3xl font-bold p-2 hover:bg-slate-100 rounded-full transition-all"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></span>
                  Our Vision
                </h3>
                <p className="text-slate-700 leading-relaxed text-lg">{startup.pitch}</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-teal-500 rounded-full mr-3"></span>
                  What We're Building
                </h3>
                <p className="text-slate-700 leading-relaxed text-lg">{startup.product}</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-amber-500 rounded-full mr-3"></span>
                  How You Can Help
                </h3>
                <div className="flex flex-wrap gap-4">
                  {startup.lookingFor.map((item, index) => (
                    <span key={index} className="px-6 py-3 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 rounded-full font-semibold shadow-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {startup.traction && (
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                    Our Progress
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    {startup.traction.users && (
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 text-center border border-blue-100">
                        <div className="text-3xl font-bold text-blue-700 mb-2">{startup.traction.users.toLocaleString()}</div>
                        <div className="text-blue-600 font-medium">Active Users</div>
                      </div>
                    )}
                    {startup.traction.revenue && (
                      <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 text-center border border-emerald-100">
                        <div className="text-3xl font-bold text-emerald-700 mb-2">${(startup.traction.revenue / 1000).toFixed(0)}K</div>
                        <div className="text-emerald-600 font-medium">Monthly Revenue</div>
                      </div>
                    )}
                    {startup.traction.mrr && (
                      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 text-center border border-teal-100">
                        <div className="text-3xl font-bold text-teal-700 mb-2">${(startup.traction.mrr / 1000).toFixed(1)}K</div>
                        <div className="text-teal-600 font-medium">Monthly Recurring</div>
                      </div>
                    )}
                    {startup.traction.campuses && (
                      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 text-center border border-orange-100">
                        <div className="text-3xl font-bold text-orange-700 mb-2">{startup.traction.campuses}</div>
                        <div className="text-orange-600 font-medium">Active Campuses</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                  <span className="w-3 h-3 bg-slate-500 rounded-full mr-3"></span>
                  Let's Connect
                </h3>
                <div className="space-y-4">
                  <button 
                    onClick={() => window.open(`https://linkedin.com/in/${startup.contact.linkedin}`, '_blank')}
                    className="w-full py-4 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-2xl hover:from-slate-800 hover:to-slate-900 transition-all font-semibold flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span>Connect with {startup.founder.split(' ')[0]}</span>
                  </button>
                  <button 
                    onClick={() => window.location.href = `mailto:${startup.contact.email}`}
                    className="w-full py-4 border-2 border-slate-300 text-slate-700 rounded-2xl hover:bg-slate-50 hover:border-slate-400 transition-all font-semibold flex items-center justify-center space-x-3"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Send Email</span>
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8 border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-4 text-xl flex items-center">
                  <span className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></span>
                  Community Discussion
                </h4>
                <p className="text-slate-600 mb-6 font-medium">Join the conversation about {startup.title}</p>
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <p className="text-slate-700 font-medium leading-relaxed">"This could revolutionize how students approach {startup.category.toLowerCase()}!"</p>
                    <p className="text-sm text-slate-500 mt-2 font-medium">- Sarah K., Angel Investor</p>
                  </div>
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <p className="text-slate-700 font-medium leading-relaxed">"I'd love to help with the technical implementation."</p>
                    <p className="text-sm text-slate-500 mt-2 font-medium">- Alex M., Senior Developer</p>
                  </div>
                  <textarea 
                    placeholder="Add your thoughts or offer help..."
                    className="w-full p-4 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    rows="3"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg">
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-['Inter',sans-serif]">
      {/* Landing Section */}
      <section id="landing" className="min-h-screen relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Real City Skyline Photo */}
          <img 
            src="https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop" 
            alt="City Skyline" 
            className="w-full h-full object-cover"
          />
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-800/60 to-slate-900/80"></div>
          {/* Warm accent overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 via-transparent to-blue-900/20"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">
          <div className="mb-12">
            <div className="w-24 h-24 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <TrendingUp className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight text-white">
              Welcome to
              <span className="block bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 bg-clip-text text-transparent mt-4">
                Your Future
              </span>
            </h1>
            <p className="text-2xl text-slate-200 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
              Where passionate founders meet visionary investors. 
              <span className="block mt-2 text-emerald-300 font-medium">Join as Founder or Investor</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-20">
            <button 
              onClick={() => scrollToSection('discover')}
              className="px-10 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl hover:from-emerald-700 hover:to-teal-700 transition-all font-semibold text-xl shadow-2xl hover:shadow-emerald-500/25 transform hover:-translate-y-1 flex items-center space-x-3"
            >
              <span>Explore Opportunities</span>
              <ArrowRight className="w-6 h-6" />
            </button>
            <div className="text-center">
              <div className="text-xl font-semibold text-emerald-300">Where Innovation Meets Investment</div>
              <div className="text-slate-300 font-medium">Building tomorrow's companies today</div>
            </div>
          </div>

          <button 
            onClick={() => scrollToSection('discover')}
            className="animate-bounce p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
          >
            <ChevronDown className="w-8 h-8 text-white" />
          </button>
        </div>
      </section>

      {/* Discover Startups Section */}
      <section id="discover" className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center py-20 relative z-10">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-800 mb-8">Discover Startups</h2>
            <p className="text-xl text-slate-600 mb-16 max-w-3xl mx-auto leading-relaxed">
              The future is being built by passionate students in dorm rooms, labs, and co-working spaces around the world.
              <span className="block mt-2 text-emerald-600 font-semibold">Find your next opportunity or collaborator.</span>
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex justify-center mb-20 relative z-10">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-slate-500" />
              <input
                type="text"
                placeholder="Search startups, founders, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-16 pr-6 py-5 w-[500px] border-2 border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 bg-white shadow-xl text-slate-800 placeholder-slate-500 font-medium text-lg transition-all"
              />
            </div>
          </div>

          {/* Three Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20 relative z-10">
            {/* Business Idea */}
            <div>
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <span className="text-2xl">💡</span>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-slate-800">Business Idea</h3>
                  <p className="text-slate-600 font-medium">Raw concepts & early stage</p>
                </div>
              </div>
              <div className="space-y-8">
                {getStartupsByStage('ideas').map(startup => (
                  <StartupCard 
                    key={startup.id} 
                    startup={startup} 
                    isExpanded={hoveredCard === startup.id}
                  />
                ))}
              </div>
            </div>

            {/* Revenue Made */}
            <div>
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <span className="text-2xl">📈</span>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-slate-800">Revenue Made</h3>
                  <p className="text-slate-600 font-medium">Generating income & growing</p>
                </div>
              </div>
              <div className="space-y-8">
                {getStartupsByStage('revenue').map(startup => (
                  <StartupCard 
                    key={startup.id} 
                    startup={startup} 
                    isExpanded={hoveredCard === startup.id}
                  />
                ))}
              </div>
            </div>

            {/* Investor Backed */}
            <div>
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <span className="text-2xl">🚀</span>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-slate-800">Investor Backed</h3>
                  <p className="text-slate-600 font-medium">Funded & scaling rapidly</p>
                </div>
              </div>
              <div className="space-y-8">
                {getStartupsByStage('backed').map(startup => (
                  <StartupCard 
                    key={startup.id} 
                    startup={startup} 
                    isExpanded={hoveredCard === startup.id}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto relative z-10">
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-10 text-white text-center shadow-2xl hover:shadow-3xl transition-all transform hover:-translate-y-2">
              <Zap className="w-20 h-20 mx-auto mb-6 opacity-90" />
              <h3 className="text-3xl font-bold mb-6">Founders: Start Here</h3>
              <p className="text-emerald-100 mb-8 text-lg leading-relaxed">
                Submit your startup idea and connect with investors worldwide.
                <strong className="block mt-3 text-xl">Free to submit — just opportunity</strong>
              </p>
              <button 
                onClick={() => setShowFounderForm(true)}
                className="w-full py-5 bg-white text-emerald-700 rounded-2xl hover:bg-slate-50 transition-all font-bold text-xl flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
              >
                <span>Submit Your Idea</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl p-10 text-white text-center shadow-2xl hover:shadow-3xl transition-all transform hover:-translate-y-2">
              <Target className="w-20 h-20 mx-auto mb-6 opacity-90" />
              <h3 className="text-3xl font-bold mb-6">Investors: Start Here</h3>
              <p className="text-slate-200 mb-8 text-lg leading-relaxed">
                Discover curated startup opportunities across all stages.
                <strong className="block mt-3 text-xl">Filter by tech, health, AI, and more</strong>
              </p>
              <button 
                onClick={() => setShowInvestorPortal(true)}
                className="w-full py-5 bg-white text-slate-700 rounded-2xl hover:bg-slate-50 transition-all font-bold text-xl flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
              >
                <span>Explore Opportunities</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Startup Detail Modal */}
      {selectedStartup && (
        <StartupModal 
          startup={selectedStartup} 
          onClose={() => setSelectedStartup(null)} 
        />
      )}

      {/* Founder Form Modal */}
      {showFounderForm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-4xl font-bold text-slate-800">Submit Your Startup</h2>
                <button 
                  onClick={() => setShowFounderForm(false)}
                  className="text-slate-400 hover:text-slate-600 text-3xl font-bold p-2 hover:bg-slate-100 rounded-full transition-all"
                >
                  ×
                </button>
              </div>
              
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 mb-8 border border-emerald-200">
                <h3 className="font-bold text-emerald-900 mb-3 text-xl">✨ It's Completely Free</h3>
                <p className="text-emerald-700 text-lg leading-relaxed">No cost, no hidden fees. This is just an opportunity to connect with investors and fellow founders who can help bring your vision to life.</p>
              </div>

              <form className="space-y-8">
                <div>
                  <label className="block text-lg font-semibold text-slate-700 mb-3">Startup Name</label>
                  <input type="text" className="w-full p-4 border-2 border-slate-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 transition-all text-lg" placeholder="What's your startup called?" />
                </div>
                
                <div>
                  <label className="block text-lg font-semibold text-slate-700 mb-3">Category</label>
                  <select className="w-full p-4 border-2 border-slate-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 transition-all text-lg">
                    <option>EdTech</option>
                    <option>FinTech</option>
                    <option>HealthTech</option>
                    <option>Food Tech</option>
                    <option>Climate Tech</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-slate-700 mb-3">One-Line Summary</label>
                  <input type="text" className="w-full p-4 border-2 border-slate-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 transition-all text-lg" placeholder="Describe your startup in one sentence" />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-slate-700 mb-3">The Problem You're Solving</label>
                  <textarea rows="4" className="w-full p-4 border-2 border-slate-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 transition-all text-lg" placeholder="What problem does your startup solve?"></textarea>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-slate-700 mb-3">Your Solution</label>
                  <textarea rows="4" className="w-full p-4 border-2 border-slate-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 transition-all text-lg" placeholder="How does your product/service solve this problem?"></textarea>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-slate-700 mb-4">What You're Looking For</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['Co-founder', 'Seed Funding', 'Technical Help', 'Marketing Help', 'Mentorship', 'Beta Users'].map(item => (
                      <label key={item} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer">
                        <input type="checkbox" className="rounded w-5 h-5 text-emerald-600 focus:ring-emerald-500" />
                        <span className="font-medium">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button className="w-full py-5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl hover:from-emerald-700 hover:to-teal-800 transition-all font-bold text-xl shadow-lg hover:shadow-xl">
                  Submit My Startup
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Investor Portal Modal */}
      {showInvestorPortal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-4xl font-bold text-slate-800">Investor Portal</h2>
                <button 
                  onClick={() => setShowInvestorPortal(false)}
                  className="text-slate-400 hover:text-slate-600 text-3xl font-bold p-2 hover:bg-slate-100 rounded-full transition-all"
                >
                  ×
                </button>
              </div>
              
              <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8 mb-8 border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-3 text-xl">🎯 Find Your Next Investment</h3>
                <p className="text-slate-700 text-lg leading-relaxed">Use our AI-powered search to discover startups that match your investment criteria and interests.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-6">Search Criteria</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-lg font-semibold text-slate-700 mb-3">Industry Focus</label>
                      <select className="w-full p-4 border-2 border-slate-300 rounded-2xl focus:ring-2 focus:ring-slate-500 focus:border-slate-400 transition-all text-lg">
                        <option>All Industries</option>
                        <option>EdTech</option>
                        <option>FinTech</option>
                        <option>HealthTech</option>
                        <option>Climate Tech</option>
                        <option>AI/ML</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-lg font-semibold text-slate-700 mb-3">Stage Preference</label>
                      <select className="w-full p-4 border-2 border-slate-300 rounded-2xl focus:ring-2 focus:ring-slate-500 focus:border-slate-400 transition-all text-lg">
                        <option>All Stages</option>
                        <option>Ideas (Pre-revenue)</option>
                        <option>Revenue (Generating income)</option>
                        <option>Backed (Already funded)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-lg font-semibold text-slate-700 mb-3">Investment Range</label>
                      <select className="w-full p-4 border-2 border-slate-300 rounded-2xl focus:ring-2 focus:ring-slate-500 focus:border-slate-400 transition-all text-lg">
                        <option>$10K - $50K</option>
                        <option>$50K - $250K</option>
                        <option>$250K - $1M</option>
                        <option>$1M+</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-lg font-semibold text-slate-700 mb-3">AI Search</label>
                      <input 
                        type="text" 
                        className="w-full p-4 border-2 border-slate-300 rounded-2xl focus:ring-2 focus:ring-slate-500 focus:border-slate-400 transition-all text-lg" 
                        placeholder="e.g., 'AI startups solving healthcare problems'"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-6">Why Invest Here?</h3>
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200">
                      <h4 className="font-semibold text-slate-800 mb-3 text-lg">🎓 Top Universities</h4>
                      <p className="text-slate-700 leading-relaxed">Founders from Stanford, MIT, Harvard, and other leading institutions</p>
                    </div>
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
                      <h4 className="font-semibold text-slate-800 mb-3 text-lg">📊 Proven Track Record</h4>
                      <p className="text-slate-700 leading-relaxed">89% success rate with portfolio companies showing strong growth</p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                      <h4 className="font-semibold text-slate-800 mb-3 text-lg">🚀 Early Access</h4>
                      <p className="text-slate-700 leading-relaxed">Get in early with the next generation of unicorn companies</p>
                    </div>
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                      <h4 className="font-semibold text-slate-800 mb-3 text-lg">🤝 Direct Connection</h4>
                      <p className="text-slate-700 leading-relaxed">Connect directly with founders through our platform</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-200">
                <button className="w-full py-5 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-2xl hover:from-slate-800 hover:to-slate-900 transition-all font-bold text-xl shadow-lg hover:shadow-xl">
                  Start Discovering Startups
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}