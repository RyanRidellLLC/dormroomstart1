// Enhanced App.jsx with background image, expandable cards, and CTA tabs

import React, { useState } from 'react';
import {
  Search, ArrowRight, Users, DollarSign, Zap, Target
} from 'lucide-react';

const startups = [
  // Idea Stage Placeholder Profiles
  {
    id: 4,
    title: 'CampusCommute',
    stage: 'ideas',
    summary: 'A peer-to-peer ride-sharing app for college campuses.',
    founder: 'Sophie Tran',
    university: 'University of Michigan',
    avatar: 'https://via.placeholder.com/100',
    product: 'Student ride-share platform',
    pitch: 'Making campus transportation safer and smarter.',
    contact: { email: 'sophie@campuscommute.com' }
  },

  // Revenue Stage Placeholder Profiles
  {
    id: 5,
    title: 'StudySync',
    stage: 'revenue',
    summary: 'Selling AI-generated study guides to 500+ students.',
    founder: 'Marcus Li',
    university: 'NYU',
    avatar: 'https://via.placeholder.com/100',
    product: 'AI-powered academic assistant',
    pitch: 'Helping students pass faster with smarter tools.',
    contact: { email: 'marcus@studysync.ai' }
  },

  // Backed Stage Placeholder Profiles
  {
    id: 6,
    title: 'DormDine',
    stage: 'backed',
    summary: 'Recently funded meal delivery startup for dorms.',
    founder: 'Emily Chen',
    university: 'UCLA',
    avatar: 'https://via.placeholder.com/100',
    product: 'Dorm-focused delivery service',
    pitch: 'Revolutionizing how college students eat.',
    contact: { email: 'emily@dormdine.com' }
  },
  {
    id: 1,
    title: 'Placeholder Startup',
    stage: 'ideas',
    summary: 'This is a startup in idea stage.',
    founder: 'Jane Doe',
    university: 'Harvard',
    avatar: 'https://via.placeholder.com/100',
    product: 'A groundbreaking new idea.',
    pitch: 'Making the world better from a dorm room.',
    contact: { email: 'jane@example.com' }
  },
  {
    id: 2,
    title: 'Revenue Runners',
    stage: 'revenue',
    summary: 'Already generating solid revenue.',
    founder: 'John Smith',
    university: 'MIT',
    avatar: 'https://via.placeholder.com/100',
    product: 'An app that manages student finances.',
    pitch: 'Empowering students with tools they need.',
    contact: { email: 'john@example.com' }
  },
  {
    id: 3,
    title: 'Backed & Bold',
    stage: 'backed',
    summary: 'Investor-backed and scaling fast.',
    founder: 'Ella Startup',
    university: 'Stanford',
    avatar: 'https://via.placeholder.com/100',
    product: 'Eco-friendly logistics software.',
    pitch: 'Reducing campus emissions with tech.',
    contact: { email: 'ella@example.com' }
  }
];

export default function App() {
  const [selectedStartupId, setSelectedStartupId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const getStartupsByStage = (stage) =>
    startups.filter(s => s.stage === stage && (
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.summary.toLowerCase().includes(searchTerm.toLowerCase())
    ));

  const stages = [
    { key: 'ideas', label: '🧠 Business Ideas' },
    { key: 'revenue', label: '📈 Revenue Made' },
    { key: 'backed', label: '🚀 Investor Backed' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* University Filter Dropdown */}
      <div className="flex justify-center py-6">
        <select className="border border-slate-300 rounded-full px-4 py-2 shadow-sm">
          <option>Filter by University</option>
          <option>Harvard</option>
          <option>MIT</option>
          <option>Stanford</option>
          <option>UCLA</option>
          <option>NYU</option>
        </select>
      </div>"min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Hero Section with City Background */}
      <section id="landing" className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 text-white">
        <img
          src="https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="City Skyline"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/70 z-10" />
        <div className="relative z-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to <span className="text-emerald-400">Your Future</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto text-slate-200 mb-8">
            A trusted space where student founders meet bold investors.
          </p>
          <button
            onClick={() => document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full hover:from-emerald-600 hover:to-teal-600 transition shadow-lg"
          >
            Explore Startups
          </button>
        </div>
      </section>

      {/* Discover Section */}
      <section id="discover" className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">Discover Dorm Room Startups</h2>
        <p className="text-center text-lg text-slate-600 mb-12 max-w-3xl mx-auto">
          Browse projects making waves across campuses — and support the next generation of changemakers.
        </p>

        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-full focus:ring-2 focus:ring-emerald-500 shadow-sm"
              placeholder="Search startups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {stages.map(({ key, label }) => (
            <div key={key}>
              <h3 className="text-xl font-semibold mb-4">{label}</h3>
              <div className="space-y-4">
                {getStartupsByStage(key).map(startup => {
                  const isExpanded = selectedStartupId === startup.id;
                  return (
                    <div
                      key={startup.id}
                      onClick={() => setSelectedStartupId(isExpanded ? null : startup.id)}
                      className={`bg-white border border-slate-200 p-4 rounded-2xl shadow transition-all duration-300 cursor-pointer ${isExpanded ? 'scale-105 shadow-xl' : 'hover:scale-105'}`}
                    >
                      <div className="flex items-center gap-4 mb-2">
                        <img src={startup.avatar} alt={startup.founder} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <h4 className="font-bold text-slate-800">{startup.title} <span className='ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full'>🎯 $25k Revenue</span></h4>
                          <p className="text-sm text-slate-500">{startup.founder} · {startup.university}</p>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm mb-2 line-clamp-2">{startup.summary}</p>
                      {isExpanded && (
                        <div className="mt-3 text-sm text-slate-700 space-y-2">
                          <p><strong>Video Pitch:</strong></p>
                          <video controls className="rounded-xl w-full mb-2">
                            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                            Your browser does not support video.
                          </video>
                          <p><strong>Product:</strong> {startup.product}</p>
                          <p><strong>Vision:</strong> {startup.pitch}</p>
                          <div className="text-xs text-slate-500">{startup.contact.email}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Founder & Investor CTA Tabs */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-10 rounded-3xl text-white shadow-xl">
          <Zap className="w-10 h-10 mb-4" />
          <h4 className="text-2xl font-bold mb-2">Post Your Startup</h4>
          <p className="mb-6">Submit your startup idea and connect with investors worldwide.</p>
          <button className="w-full py-3 bg-white text-emerald-700 rounded-full font-semibold hover:bg-slate-100 transition flex items-center justify-center gap-2">
            Submit Your Startup <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="bg-gradient-to-br from-slate-700 to-slate-900 p-10 rounded-3xl text-white shadow-xl">
          <Target className="w-10 h-10 mb-4" />
          <h4 className="text-2xl font-bold mb-2">Become an Investor</h4>
          <p className="mb-6">Discover curated startup opportunities across all stages.</p>
          <button className="w-full py-3 bg-white text-slate-700 rounded-full font-semibold hover:bg-slate-100 transition flex items-center justify-center gap-2">
            Explore Startups <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Mentor Spotlight Section */}
      <section className="py-20 px-6 bg-white max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">🌟 Mentor Spotlight</h2>
        <div className="flex space-x-6 overflow-x-auto pb-4">
          {[1,2,3].map(i => (
            <div key={i} className="min-w-[250px] bg-slate-100 rounded-2xl p-6 shadow">
              <img src={`https://randomuser.me/api/portraits/men/${i + 30}.jpg`} alt="mentor" className="w-16 h-16 rounded-full mb-4" />
              <h4 className="text-lg font-semibold">Mentor {i}</h4>
              <p className="text-sm text-slate-600 mb-4">VC Advisor · 10+ years in startups</p>
              <button className="text-emerald-600 font-semibold hover:underline text-sm">Connect</button>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Day Countdown & Matching Quiz */}
      <section className="py-20 px-6 bg-slate-100 text-center">
        <h2 className="text-3xl font-bold mb-4">⏳ Countdown to Demo Day</h2>
        <p className="text-slate-600 mb-6">Next Virtual Pitch Event: <strong>September 15, 2025</strong></p>
        <div className="text-5xl font-bold text-emerald-500 mb-6" id="countdown">Loading...</div>
        <button className="mt-4 bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 font-semibold text-lg">🧠 Take Investor Match Quiz</button>
      </section>

      <footer className="text-center py-12 text-slate-500 text-sm">
        © {new Date().getFullYear()} DormVenture — Built to Launch What’s Next.
      </footer>
    </div>
  );
}
