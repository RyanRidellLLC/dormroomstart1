import React, { useState } from 'react';
import { 
  Search, Filter, TrendingUp, DollarSign, Users, 
  Eye, MessageCircle, ArrowRight, Star, Zap, Target,
  Building2, Globe, Award, ChevronRight, ExternalLink
} from 'lucide-react';
import { mockStartups } from '../data/mockData';
import { Startup } from '../types';

const MainInterface: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedStage, setSelectedStage] = useState<'ideas' | 'revenue' | 'backed'>('ideas');

  // Categorize startups by stage
  const businessIdeas = mockStartups.filter(s => s.stage === 'idea' || s.stage === 'prototype');
  const revenueMade = mockStartups.filter(s => s.stage === 'mvp' && s.metrics.revenue);
  const investorBacked = mockStartups.filter(s => s.stage === 'growth' || s.stage === 'scaling');

  const stages = [
    { 
      id: 'ideas' as const, 
      title: 'Business Ideas', 
      subtitle: 'Raw startup concepts',
      count: businessIdeas.length,
      startups: businessIdeas,
      color: 'from-slate-600 to-slate-700'
    },
    { 
      id: 'revenue' as const, 
      title: 'Revenue Made', 
      subtitle: 'Structured projects in development',
      count: revenueMade.length,
      startups: revenueMade,
      color: 'from-blue-600 to-indigo-700'
    },
    { 
      id: 'backed' as const, 
      title: 'Investor Backed', 
      subtitle: 'Businesses already making money',
      count: investorBacked.length,
      startups: investorBacked,
      color: 'from-green-600 to-emerald-700'
    }
  ];

  const currentStage = stages.find(s => s.id === selectedStage)!;

  const StartupCard: React.FC<{ startup: Startup; isExpanded: boolean }> = ({ startup, isExpanded }) => (
    <div 
      className={`bg-white rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 cursor-pointer ${
        isExpanded ? 'transform scale-105 shadow-2xl z-10 relative' : 'hover:shadow-xl hover:-translate-y-1'
      }`}
      onMouseEnter={() => setHoveredCard(startup.id)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      <div className="relative">
        <img
          src={startup.image}
          alt={startup.name}
          className="w-full h-32 object-cover rounded-t-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-2xl"></div>
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 bg-gradient-to-r ${currentStage.color} text-white rounded-full text-xs font-semibold shadow-lg`}>
            {startup.industry}
          </span>
        </div>
        <div className="absolute bottom-3 right-3">
          <div className="flex items-center space-x-1 text-white text-xs">
            <Eye className="w-3 h-3" />
            <span>{startup.investorInterest}</span>
          </div>
        </div>
      </div>

      <div className={`p-4 transition-all duration-300 ${isExpanded ? 'pb-6' : ''}`}>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{startup.name}</h3>
        <p className={`text-gray-600 text-sm leading-relaxed ${isExpanded ? 'line-clamp-none' : 'line-clamp-2'} mb-3`}>
          {startup.description}
        </p>

        {isExpanded && (
          <div className="space-y-4 animate-fadeIn">
            {/* Product/Service Summary */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-2">What We Do</h4>
              <p className="text-sm text-gray-700">{startup.pitch}</p>
            </div>

            {/* Looking For */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Looking For</h4>
              <div className="flex flex-wrap gap-2">
                {startup.lookingFor.map((item, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Traction */}
            {(startup.metrics.users || startup.metrics.revenue) && (
              <div className="grid grid-cols-2 gap-4">
                {startup.metrics.users && (
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-700">{startup.metrics.users.toLocaleString()}</div>
                    <div className="text-xs text-green-600">Users</div>
                  </div>
                )}
                {startup.metrics.revenue && (
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-700">${(startup.metrics.revenue / 1000).toFixed(0)}K</div>
                    <div className="text-xs text-blue-600">Revenue</div>
                  </div>
                )}
              </div>
            )}

            {/* Contact Button */}
            <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all font-semibold flex items-center justify-center space-x-2 shadow-lg">
              <MessageCircle className="w-4 h-4" />
              <span>Connect with Founder</span>
            </button>
          </div>
        )}

        {!isExpanded && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{startup.teamSize}</span>
              </div>
              {startup.currentFunding > 0 && (
                <div className="flex items-center space-x-1">
                  <DollarSign className="w-4 h-4" />
                  <span>${(startup.currentFunding / 1000).toFixed(0)}K</span>
                </div>
              )}
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold text-gray-900">StartuConnect</span>
              </div>
              
              <nav className="hidden md:flex space-x-8">
                <a href="#" className="text-gray-900 hover:text-blue-600 font-medium">Home</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Browse Startups</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Submit Idea</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Investor Portal</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search startups, founders..."
                  className="pl-10 pr-4 py-2 w-64 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to Your Future</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Discover exceptional startups at every stage of development. From raw ideas to investor-backed companies.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-blue-400" />
              <span>2,400+ Startups</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-400" />
              <span>850+ Investors</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-yellow-400" />
              <span>$2.8B+ Deployed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interface */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stage Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-2 border border-gray-200">
            {stages.map((stage) => (
              <button
                key={stage.id}
                onClick={() => setSelectedStage(stage.id)}
                className={`px-8 py-4 rounded-xl font-semibold transition-all ${
                  selectedStage === stage.id
                    ? `bg-gradient-to-r ${stage.color} text-white shadow-lg`
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="text-center">
                  <div className="text-lg">{stage.title}</div>
                  <div className="text-xs opacity-80">{stage.subtitle}</div>
                  <div className="text-sm font-bold mt-1">{stage.count} companies</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Stage Display */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{currentStage.title}</h2>
          <p className="text-gray-600">{currentStage.subtitle}</p>
        </div>

        {/* Startup Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {currentStage.startups.map((startup) => (
            <StartupCard
              key={startup.id}
              startup={startup}
              isExpanded={hoveredCard === startup.id}
            />
          ))}
        </div>

        {/* Call-to-Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white text-center shadow-2xl">
            <Zap className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h3 className="text-2xl font-bold mb-4">Founders: Start Here</h3>
            <p className="text-blue-100 mb-6">
              Submit your startup idea and connect with investors worldwide. 
              <strong className="block mt-2">Free to submit — just opportunity</strong>
            </p>
            <button className="w-full py-4 bg-white text-blue-700 rounded-xl hover:bg-blue-50 transition-all font-bold text-lg flex items-center justify-center space-x-2">
              <span>Submit Your Idea</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-8 text-white text-center shadow-2xl">
            <Target className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h3 className="text-2xl font-bold mb-4">Investors: Start Here</h3>
            <p className="text-green-100 mb-6">
              Discover curated startup opportunities across all stages.
              <strong className="block mt-2">Filter by tech, health, AI, and more</strong>
            </p>
            <button className="w-full py-4 bg-white text-green-700 rounded-xl hover:bg-green-50 transition-all font-bold text-lg flex items-center justify-center space-x-2">
              <span>Explore Opportunities</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainInterface;