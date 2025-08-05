import React, { useState } from 'react';
import { 
  Search, Filter, TrendingUp, Star, Zap, Eye, Heart, 
  Share2, Globe, Users, DollarSign, Calendar
} from 'lucide-react';
import StartupCard from './StartupCard';
import { mockStartups } from '../data/mockData';
import { Startup } from '../types';
import { useAuth } from '../hooks/useAuth';

const DiscoverView: React.FC = () => {
  const { user } = useAuth();
  const [startups] = useState<Startup[]>(mockStartups);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedStage, setSelectedStage] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const industries = ['all', 'AI/ML', 'FinTech', 'HealthTech', 'EdTech', 'CleanTech', 'SaaS', 'E-commerce'];
  const stages = ['all', 'idea', 'prototype', 'mvp', 'growth', 'scaling'];

  const featuredStartups = startups.filter(startup => startup.investorInterest > 20);
  const trendingCategories = [
    { name: 'AI & Machine Learning', count: 45, growth: '+23%' },
    { name: 'Climate Technology', count: 32, growth: '+18%' },
    { name: 'Healthcare Innovation', count: 28, growth: '+15%' },
    { name: 'Financial Technology', count: 38, growth: '+12%' }
  ];

  const filteredStartups = startups.filter(startup => {
    const matchesSearch = startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         startup.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === 'all' || startup.industry === selectedIndustry;
    const matchesStage = selectedStage === 'all' || startup.stage === selectedStage;
    
    return matchesSearch && matchesIndustry && matchesStage;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'funding':
        return b.currentFunding - a.currentFunding;
      case 'interest':
        return b.investorInterest - a.investorInterest;
      case 'recent':
        return b.updatedAt.getTime() - a.updatedAt.getTime();
      case 'trending':
      default:
        return (b.investorInterest * 0.7 + b.currentFunding * 0.3) - (a.investorInterest * 0.7 + a.currentFunding * 0.3);
    }
  });

  const handleViewDetails = (startup: Startup) => {
    console.log('Viewing details for:', startup.name);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <Search className="w-8 h-8 mr-3 text-blue-600" />
          {user?.type === 'student' ? 'Discover Startups' : 'Discover Investment Opportunities'}
        </h1>
        <p className="text-gray-600 mb-4">
          {user?.type === 'student' 
            ? 'Explore innovative startups from students worldwide and find collaboration opportunities'
            : 'Find the next unicorn among promising student-led startups'
          }
        </p>
        <div className="flex items-center space-x-6 text-sm text-gray-500">
          <span className="flex items-center">
            <Globe className="w-4 h-4 mr-1" />
            1,247 active startups
          </span>
          <span className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            3,892 student founders
          </span>
          <span className="flex items-center">
            <DollarSign className="w-4 h-4 mr-1" />
            $12.5M+ seeking funding
          </span>
        </div>
      </div>

      {/* Featured Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center">
                🔥 Hot Startups This Week
              </h2>
              <p className="text-blue-100">High investor interest and rapid growth</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold">87</div>
                <div className="text-sm text-blue-200">New This Week</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">234%</div>
                <div className="text-sm text-blue-200">Avg Growth</div>
              </div>
            </div>
          </div>
        </div>

        {/* Trending Categories */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {trendingCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-4 border border-gray-100 hover:shadow-xl transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-sm">{category.name}</h3>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">{category.count}</span>
                <span className="text-green-600 font-semibold text-sm bg-green-100 px-2 py-1 rounded-full">
                  {category.growth}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search startups, founders, or technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
          <div>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              {industries.map(industry => (
                <option key={industry} value={industry}>
                  {industry === 'all' ? 'All Industries' : industry}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              {stages.map(stage => (
                <option key={stage} value={stage}>
                  {stage === 'all' ? 'All Stages' : stage.charAt(0).toUpperCase() + stage.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="trending">Trending</option>
              <option value="recent">Recently Updated</option>
              <option value="funding">Funding Amount</option>
              <option value="interest">Investor Interest</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex-1 p-3 rounded-xl transition-all ${
                viewMode === 'grid'
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex-1 p-3 rounded-xl transition-all ${
                viewMode === 'list'
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {filteredStartups.length} startups found
          </h2>
          <p className="text-gray-500 text-sm">
            {searchTerm && `Results for "${searchTerm}"`}
            {selectedIndustry !== 'all' && ` in ${selectedIndustry}`}
            {selectedStage !== 'all' && ` at ${selectedStage} stage`}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Startups Grid/List */}
      {filteredStartups.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStartups.map(startup => (
              <StartupCard
                key={startup.id}
                startup={startup}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredStartups.map(startup => (
              <div key={startup.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border border-gray-100">
                <div className="flex items-start space-x-6">
                  <img
                    src={startup.image}
                    alt={startup.name}
                    className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{startup.name}</h3>
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                            {startup.industry}
                          </span>
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                            {startup.stage.toUpperCase()}
                          </span>
                          {startup.investorInterest > 20 && (
                            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                              🔥 Hot
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Heart className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">{startup.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{startup.teamSize} team</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4" />
                          <span>${(startup.currentFunding / 1000).toFixed(0)}K raised</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{startup.investorInterest} interested</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{startup.updatedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleViewDetails(startup)}
                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold flex items-center space-x-2"
                      >
                        <Zap className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No startups found</h3>
          <p className="text-gray-500 mb-6">
            Try adjusting your search criteria or filters to discover more startups
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold">
            Clear All Filters
          </button>
        </div>
      )}

      {/* Load More */}
      {filteredStartups.length > 0 && (
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all font-semibold">
            Load More Startups
          </button>
        </div>
      )}
    </div>
  );
};

export default DiscoverView;