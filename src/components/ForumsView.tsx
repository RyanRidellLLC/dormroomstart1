import React, { useState } from 'react';
import { 
  Plus, MessageCircle, Heart, Calendar, User, Eye, Pin, 
  Star, TrendingUp, Search, Filter, Users
} from 'lucide-react';
import { mockForumPosts } from '../data/mockData';
import { ForumPost } from '../types';

const ForumsView: React.FC = () => {
  const [posts] = useState<ForumPost[]>(mockForumPosts);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Categories', count: 234, color: 'gray' },
    { id: 'Fundraising', name: 'Fundraising', count: 67, color: 'green' },
    { id: 'Product', name: 'Product Development', count: 45, color: 'blue' },
    { id: 'Marketing', name: 'Marketing & Growth', count: 38, color: 'purple' },
    { id: 'Legal', name: 'Legal & Compliance', count: 28, color: 'red' },
    { id: 'Networking', name: 'Networking', count: 34, color: 'yellow' },
    { id: 'General', name: 'General Discussion', count: 22, color: 'indigo' }
  ];

  const trendingTopics = [
    { name: 'AI Funding Trends', count: 45 },
    { name: 'Co-founder Equity', count: 32 },
    { name: 'MVP Development', count: 28 },
    { name: 'Pitch Deck Tips', count: 25 }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.likes - a.likes;
      case 'views':
        return b.views - a.views;
      case 'replies':
        return b.replies.length - a.replies.length;
      case 'recent':
      default:
        return b.updatedAt.getTime() - a.updatedAt.getTime();
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <MessageCircle className="w-8 h-8 mr-3 text-green-600" />
            Community Forums
          </h1>
          <p className="text-gray-600">Connect, share knowledge, and get advice from the global startup community</p>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
            <span>15.2K members</span>
            <span>•</span>
            <span>1.8K posts this month</span>
            <span>•</span>
            <span>234 active discussions</span>
          </div>
        </div>
        <button className="flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all font-semibold shadow-lg hover:shadow-xl">
          <Plus className="w-5 h-5 mr-2" />
          New Post
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar - Categories */}
        <div className="lg:col-span-1 space-y-6">
          {/* Search */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="views">Most Viewed</option>
              <option value="replies">Most Replies</option>
            </select>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all ${
                    selectedCategory === category.id
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className="font-medium">{category.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedCategory === category.id
                      ? 'bg-green-200 text-green-800'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Trending Topics */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-orange-500" />
              Trending
            </h3>
            <div className="space-y-3">
              {trendingTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <span className="text-sm font-medium text-gray-700">{topic.name}</span>
                  <span className="text-xs text-gray-500">{topic.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Posts */}
        <div className="lg:col-span-3">
          {/* Posts List */}
          <div className="space-y-6">
            {filteredPosts.map(post => (
              <div key={post.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border border-gray-100">
                <div className="flex items-start space-x-4">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {post.pinned && (
                          <Pin className="w-4 h-4 text-orange-500" />
                        )}
                        <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 cursor-pointer flex-1">
                          {post.title}
                        </h3>
                        {post.featured && (
                          <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-xs font-semibold">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{post.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        post.category === 'Fundraising' ? 'bg-green-100 text-green-700' :
                        post.category === 'Product' ? 'bg-blue-100 text-blue-700' :
                        post.category === 'Marketing' ? 'bg-purple-100 text-purple-700' :
                        post.category === 'Legal' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {post.category}
                      </span>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <User className="w-4 h-4" />
                        <span>{post.author.name}</span>
                        <span>•</span>
                        <span>{post.author.university || post.author.company}</span>
                        {post.author.verified && (
                          <Star className="w-4 h-4 text-blue-500 fill-current" />
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">{post.content}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2 text-gray-500 hover:text-red-500 cursor-pointer transition-colors">
                          <Heart className="w-5 h-5" />
                          <span className="text-sm font-medium">{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 cursor-pointer transition-colors">
                          <MessageCircle className="w-5 h-5" />
                          <span className="text-sm font-medium">{post.replies.length} replies</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500">
                          <Eye className="w-5 h-5" />
                          <span className="text-sm font-medium">{post.views} views</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {post.replies.slice(0, 3).map((reply) => (
                          <img
                            key={reply.id}
                            src={reply.author.avatar}
                            alt={reply.author.name}
                            className="w-6 h-6 rounded-full border border-white"
                          />
                        ))}
                        {post.replies.length > 3 && (
                          <span className="text-xs text-gray-500">+{post.replies.length - 3} more</span>
                        )}
                      </div>
                    </div>
                    
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                        {post.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs hover:bg-gray-200 cursor-pointer transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || selectedCategory !== 'all'
                  ? 'Try adjusting your search or category filters'
                  : 'Be the first to start a discussion in this category'
                }
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all font-semibold">
                Start New Discussion
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForumsView;