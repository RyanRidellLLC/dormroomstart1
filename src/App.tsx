// Enhanced App.jsx with background image and expandable startup cards

import React, { useState, useEffect } from 'react';
import {
  Search, ChevronDown, ArrowRight, Users, DollarSign,
  Linkedin, Mail, ChevronRight, Zap, Target
} from 'lucide-react';

const startups = [ /* your original startup list */ ];

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
    { key: 'backed', label: '🚀 Investor Backed' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* HERO SECTION with City Background */}
      <section
        id="landing"
        className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 text-white"
      >
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

      {/* DISCOVER SECTION */}
      <section id="discover" className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">Discover Dorm Room Startups</h2>
        <p className="text-center text-lg text-slate-600 mb-12 max-w-3xl mx-auto">
          Browse projects making waves across campuses — and support the next generation of changemakers.
        </p>

        {/* Search */}
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

        {/* Stage Sections */}
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
                          <h4 className="font-bold text-slate-800">{startup.title}</h4>
                          <p className="text-sm text-slate-500">{startup.founder} · {startup.university}</p>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm mb-2 line-clamp-2">{startup.summary}</p>
                      {isExpanded && (
                        <div className="mt-3 text-sm text-slate-700 space-y-2">
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

      <footer className="text-center py-12 text-slate-500 text-sm">
        © {new Date().getFullYear()} DormVenture — Built to Launch What’s Next.
      </footer>
    </div>
  );
}
