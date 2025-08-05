import React, { useState } from 'react';
import { Plus, Search, Filter, SlidersHorizontal, Zap, TrendingUp } from 'lucide-react';
import StartupCard from './StartupCard';
import { mockStartups } from '../data/mockData';
import { Startup } from '../types';

const StartupsView: React.FC = () => {
  const [startups] = useState<Startup[]>(mockStartups);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedStage, setSelectedStage] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const industries = ['all', 'CleanTech', 'FinTech', 'HealthTech', 'EdTech', 'AI/ML', 'SaaS', 'E-commerce'];
  const stages = ['all', 'idea', 'prototype', 'mvp', 'growth', 'scaling'];

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
      default:
        return b.updatedAt.getTime() - a.updatedAt.getTime();
    }
  });

  const handleViewDetails = (startup: Startup) => {
    console.log('Viewing details for:', startup.name);
    // TODO: Implement detailed view modal or navigate to detail page
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Zap className="w-8 h-8 mr-3 text-blue-600" />
            My Startups
          </h1>
          <p className="text-gray-600">Build, manage, and scale your startup projects</p>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
            <span>{filteredStartups.length} startups</span>
            <span>•</span>
            <span>Total funding: $625K raised</span>
            <span>•</span>
            <span>59 investors interested</span>
          </div>
        </div>
        <button className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-lg hover:shadow-xl">
          <Plus className="w-5 h-5 mr-2" />
          Create Startup
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search startups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
          
          {/* Industry Filter */}
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
          
          {/* Stage Filter */}
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
          
          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="recent">Recently Updated</option>
              <option value="funding">Funding Amount</option>
              <option value="interest">Investor Interest</option>
            </select>
          </div>
          
          {/* Advanced Filters */}
          <div>
            <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all">
              <SlidersHorizontal className="w-5 h-5 mr-2 text-gray-500" />
              <span className="text-gray-700">Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Startups', value: '3', change: '+1 this month', color: 'blue' },
          { label: 'Active Funding', value: '$625K', change: '+$125K raised', color: 'green' },
          { label: 'Investor Views', value: '1.2K', change: '+340 this week', color: 'purple' },
          { label: 'Success Rate', value: '67%', change: '+12% this quarter', color: 'orange' }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">{stat.label}</h3>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-green-600 font-medium">{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Startups Grid */}
      {filteredStartups.length > 0 ? (
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
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Filter className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No startups found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || selectedIndustry !== 'all' || selectedStage !== 'all'
              ? 'Try adjusting your search criteria or filters'
              : 'Start building your first startup to get started'
            }
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold">
            {searchTerm || selectedIndustry !== 'all' || selectedStage !== 'all' ? 'Clear Filters' : 'Create Your First Startup'}
          </button>
        </div>
      )}
    </div>
  );
};

export default StartupsView;