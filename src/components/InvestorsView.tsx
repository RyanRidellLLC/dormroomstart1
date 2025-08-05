import React, { useState } from 'react';
import { 
  Search, DollarSign, Building2, MapPin, Star, MessageCircle, 
  Filter, Zap, Eye, Users, Globe, Award, ExternalLink
} from 'lucide-react';
import { mockUsers } from '../data/mockData';
import { User } from '../types';

const InvestorsView: React.FC = () => {
  const [investors] = useState<User[]>(mockUsers.filter(user => user.type === 'investor'));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFocus, setSelectedFocus] = useState('all');
  const [selectedFundSize, setSelectedFundSize] = useState('all');

  const investmentFocuses = ['all', 'AI', 'SaaS', 'FinTech', 'HealthTech', 'EdTech', 'CleanTech', 'E-commerce'];
  const fundSizes = ['all', '$25K - $100K', '$100K - $500K', '$500K - $2M', '$2M+'];

  const filteredInvestors = investors.filter(investor => {
    const matchesSearch = investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investor.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investor.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFocus = selectedFocus === 'all' || 
                        investor.investmentFocus?.includes(selectedFocus);
    const matchesFundSize = selectedFundSize === 'all' || 
                           investor.fundSize === selectedFundSize;
    
    return matchesSearch && matchesFocus && matchesFundSize;
  });

  const handleConnect = (investor: User) => {
    console.log('Connecting with:', investor.name);
  };

  const handleMessage = (investor: User) => {
    console.log('Messaging:', investor.name);
  };

  const handleScheduleMeeting = (investor: User) => {
    console.log('Scheduling meeting with:', investor.name);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <Users className="w-8 h-8 mr-3 text-purple-600" />
          Find Investors
        </h1>
        <p className="text-gray-600 mb-4">Connect with VCs and angel investors who are perfect matches for your startup</p>
        <div className="flex items-center space-x-6 text-sm text-gray-500">
          <span className="flex items-center">
            <Globe className="w-4 h-4 mr-1" />
            2,847 active investors
          </span>
          <span className="flex items-center">
            <DollarSign className="w-4 h-4 mr-1" />
            $2.3B+ available capital
          </span>
          <span className="flex items-center">
            <Award className="w-4 h-4 mr-1" />
            89% response rate
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, company, or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
          <div>
            <select
              value={selectedFocus}
              onChange={(e) => setSelectedFocus(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              {investmentFocuses.map(focus => (
                <option key={focus} value={focus}>
                  {focus === 'all' ? 'All Focus Areas' : focus}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={selectedFundSize}
              onChange={(e) => setSelectedFundSize(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              {fundSizes.map(size => (
                <option key={size} value={size}>
                  {size === 'all' ? 'All Fund Sizes' : size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Featured Investors Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 mb-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">🌟 Featured Investors This Week</h2>
            <p className="text-purple-100">Actively seeking new investments and taking meetings</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold">15</div>
              <div className="text-sm text-purple-200">Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">$50M</div>
              <div className="text-sm text-purple-200">Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Investors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredInvestors.map(investor => (
          <div key={investor.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="relative p-6 bg-gradient-to-br from-purple-50 to-blue-50">
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <img
                    src={investor.avatar}
                    alt={investor.name}
                    className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-lg"
                  />
                  {investor.verified && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Star className="w-3 h-3 text-white fill-current" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{investor.name}</h3>
                  <p className="text-purple-600 font-medium">{investor.company}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">4.9 rating</span>
                  </div>
                </div>
              </div>

              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  🟢 Active
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{investor.bio}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  <div>
                    <span className="text-sm font-medium text-gray-900">{investor.fundSize}</span>
                    <p className="text-xs text-gray-500">Typical investment</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <div>
                    <span className="text-sm font-medium text-gray-900">{investor.location}</span>
                    <p className="text-xs text-gray-500">Based in</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Building2 className="w-5 h-5 text-purple-500" />
                  <div>
                    <span className="text-sm font-medium text-gray-900">{investor.connections} connections</span>
                    <p className="text-xs text-gray-500">Network size</p>
                  </div>
                </div>
              </div>
              
              {investor.investmentFocus && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Investment Focus</h4>
                  <div className="flex flex-wrap gap-2">
                    {investor.investmentFocus.slice(0, 4).map(focus => (
                      <span
                        key={focus}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                      >
                        {focus}
                      </span>
                    ))}
                    {investor.investmentFocus.length > 4 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        +{investor.investmentFocus.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleConnect(investor)}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all font-semibold text-sm flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Zap className="w-4 h-4" />
                  <span>Connect</span>
                </button>
                <button
                  onClick={() => handleMessage(investor)}
                  className="px-4 py-3 border-2 border-purple-200 text-purple-700 rounded-xl hover:bg-purple-50 transition-all font-semibold text-sm flex items-center justify-center"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleScheduleMeeting(investor)}
                  className="px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold text-sm flex items-center justify-center"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              {/* Match Score */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Match Score</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div className="w-3/4 h-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-bold text-green-600">87%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredInvestors.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Filter className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No investors found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search criteria or filters to find more investors</p>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all font-semibold">
            Clear All Filters
          </button>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center border border-blue-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Not finding the right investors?</h2>
        <p className="text-gray-600 mb-6">
          Our AI-powered matching system can help you discover investors who are perfect fits for your startup.
        </p>
        <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-lg">
          Get Smart Recommendations
        </button>
      </div>
    </div>
  );
};

export default InvestorsView;