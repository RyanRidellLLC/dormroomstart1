import React from 'react';
import { 
  TrendingUp, Users, DollarSign, Calendar, Eye, Heart, 
  Share2, ExternalLink, Star, Zap
} from 'lucide-react';
import { Startup } from '../types';

interface StartupCardProps {
  startup: Startup;
  onViewDetails: (startup: Startup) => void;
  showActions?: boolean;
}

const StartupCard: React.FC<StartupCardProps> = ({ startup, onViewDetails, showActions = true }) => {
  const fundingPercentage = (startup.currentFunding / startup.fundingGoal) * 100;

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'idea': return 'bg-gray-100 text-gray-800';
      case 'prototype': return 'bg-blue-100 text-blue-800';
      case 'mvp': return 'bg-green-100 text-green-800';
      case 'growth': return 'bg-purple-100 text-purple-800';
      case 'scaling': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'idea': return '💡';
      case 'prototype': return '🔧';
      case 'mvp': return '🚀';
      case 'growth': return '📈';
      case 'scaling': return '🌟';
      default: return '💡';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group">
      <div className="relative">
        <img
          src={startup.image}
          alt={startup.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Top badges */}
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStageColor(startup.stage)}`}>
            {getStageIcon(startup.stage)} {startup.stage.toUpperCase()}
          </span>
          {startup.investorInterest > 20 && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 flex items-center">
              🔥 Hot
            </span>
          )}
        </div>

        {/* Industry tag */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full text-xs font-medium">
            {startup.industry}
          </span>
        </div>

        {/* Founder info overlay */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-2">
          <img
            src={startup.founders[0]?.avatar}
            alt={startup.founders[0]?.name}
            className="w-8 h-8 rounded-full border-2 border-white"
          />
          <div className="text-white">
            <p className="text-sm font-medium">{startup.founders[0]?.name}</p>
            <p className="text-xs opacity-90">{startup.founders[0]?.university}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">{startup.name}</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{startup.teamSize} team</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{startup.investorInterest} interested</span>
              </div>
            </div>
          </div>
          {showActions && (
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <Heart className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">{startup.description}</p>
        
        {/* Funding Progress */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 font-medium">Funding Progress</span>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-gray-900">
                ${(startup.currentFunding / 1000).toFixed(0)}K
              </span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">
                ${(startup.fundingGoal / 1000).toFixed(0)}K
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 text-right">
            {Math.round(fundingPercentage)}% funded
          </div>
        </div>
        
        {/* Metrics Grid */}
        {(startup.metrics.users || startup.metrics.revenue || startup.metrics.growth) && (
          <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-xl">
            {startup.metrics.users && (
              <div className="text-center">
                <Users className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                <div className="text-sm font-bold text-gray-900">{startup.metrics.users.toLocaleString()}</div>
                <div className="text-xs text-gray-500">Users</div>
              </div>
            )}
            {startup.metrics.revenue && (
              <div className="text-center">
                <DollarSign className="w-4 h-4 text-green-500 mx-auto mb-1" />
                <div className="text-sm font-bold text-gray-900">${(startup.metrics.revenue / 1000).toFixed(0)}K</div>
                <div className="text-xs text-gray-500">Revenue</div>
              </div>
            )}
            {startup.metrics.growth && (
              <div className="text-center">
                <TrendingUp className="w-4 h-4 text-purple-500 mx-auto mb-1" />
                <div className="text-sm font-bold text-gray-900">{startup.metrics.growth}</div>
                <div className="text-xs text-gray-500">Growth</div>
              </div>
            )}
          </div>
        )}
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {startup.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium"
            >
              {tag}
            </span>
          ))}
          {startup.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
              +{startup.tags.length - 3} more
            </span>
          )}
        </div>
        
        {/* Bottom section */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>{startup.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {startup.website && (
              <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                <ExternalLink className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => onViewDetails(startup)}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold text-sm flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <Zap className="w-4 h-4" />
              <span>View Details</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupCard;