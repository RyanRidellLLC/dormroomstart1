import React, { useState } from 'react';
import { 
  TrendingUp, Mail, User as UserIcon, Building2, 
  Eye, EyeOff, ArrowRight, Play, CheckCircle, Award, 
  Target, DollarSign, Users, Globe, Star, Zap
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { User } from '../types';

const LoginForm: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userType, setUserType] = useState<'student' | 'investor'>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    university: '',
    major: '',
    company: '',
    bio: ''
  });
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const userData: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || (userType === 'student' ? 'Alex Chen' : 'Sarah Johnson'),
      email: formData.email || (userType === 'student' ? 'alex@stanford.edu' : 'sarah@investor.com'),
      type: userType,
      bio: formData.bio || (userType === 'student' 
        ? 'Building the next generation of transformative companies' 
        : 'Backing exceptional founders who are reshaping industries'),
      skills: userType === 'student' ? ['Strategy', 'Product', 'Leadership', 'Growth'] : [],
      interests: userType === 'student' ? ['AI', 'FinTech', 'HealthTech', 'Enterprise'] : [],
      location: 'San Francisco, CA',
      avatar: userType === 'student' 
        ? 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        : 'https://images.pexels.com/photos/3792581/pexels-photo-3792581.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      verified: true,
      memberSince: new Date(),
      reputation: Math.floor(Math.random() * 900) + 100,
      connections: Math.floor(Math.random() * 500) + 50,
      ...(userType === 'student' ? {
        university: formData.university || 'Stanford University',
        major: formData.major || 'Computer Science',
        graduationYear: 2025
      } : {
        company: formData.company || 'Sequoia Capital',
        investmentFocus: ['AI', 'Enterprise', 'FinTech', 'HealthTech'],
        fundSize: '$1M - $10M'
      })
    };

    login(userData);
  };

  const successMetrics = [
    { value: '$2.8B', label: 'Capital Deployed', subtitle: 'Across 500+ companies' },
    { value: '89%', label: 'Success Rate', subtitle: 'Portfolio performance' },
    { value: '15', label: 'Unicorns Created', subtitle: 'Billion-dollar outcomes' },
    { value: '2,400', label: 'Elite Founders', subtitle: 'Building the future' }
  ];

  const portfolioHighlights = [
    { 
      company: 'NeuralTech', 
      founder: 'Sarah Kim, MIT', 
      outcome: '$50M Series B', 
      sector: 'AI Infrastructure',
      description: 'Revolutionizing enterprise AI deployment'
    },
    { 
      company: 'QuantumHealth', 
      founder: 'David Chen, Stanford', 
      outcome: '$25M Series A', 
      sector: 'Digital Health',
      description: 'Personalized medicine at scale'
    },
    { 
      company: 'CarbonZero', 
      founder: 'Maria Rodriguez, Harvard', 
      outcome: '$75M Series C', 
      sector: 'Climate Tech',
      description: 'Industrial carbon capture technology'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-navy-900 to-slate-800 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-40"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-slate-600/10 to-gray-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Hero Content */}
        <div className="flex-1 flex flex-col justify-center p-8 lg:p-16 max-w-5xl">
          {/* Header */}
          <div className="flex items-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-2xl">
              <TrendingUp className="w-9 h-9 text-white" />
            </div>
            <span className="ml-4 text-4xl font-bold text-white">
              StartuConnect
            </span>
          </div>

          {/* Hero Section */}
          <div className="mb-16">
            <div className="flex items-center space-x-3 mb-6">
              <span className="px-6 py-3 bg-gradient-to-r from-blue-900/50 to-indigo-900/50 text-blue-200 rounded-full text-sm font-semibold border border-blue-800/30 backdrop-blur-sm">
                ⚡ Where Exceptional Founders Meet Visionary Capital
              </span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-bold text-white mb-8 leading-tight">
              Welcome to
              <span className="block bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-300 bg-clip-text text-transparent">
                Your Future
              </span>
            </h1>
            
            <p className="text-2xl text-slate-300 mb-12 leading-relaxed max-w-3xl font-light">
              The premier platform where world-class founders connect with institutional investors. 
              Where billion-dollar ideas meet the capital and expertise to scale globally.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
              <button 
                onClick={() => setIsSignUp(true)}
                className="px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all font-bold text-xl shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 flex items-center justify-center space-x-3"
              >
                <Target className="w-6 h-6" />
                <span>Join the Elite</span>
                <ArrowRight className="w-6 h-6" />
              </button>
              <button className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all font-semibold text-xl border border-white/20 flex items-center justify-center space-x-3">
                <Play className="w-6 h-6" />
                <span>See Success Stories</span>
              </button>
            </div>
          </div>

          {/* Success Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {successMetrics.map((metric, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-2 shadow-xl">
                <div className="text-4xl font-bold text-white mb-2">{metric.value}</div>
                <div className="text-blue-200 font-semibold mb-1">{metric.label}</div>
                <div className="text-slate-400 text-sm">{metric.subtitle}</div>
              </div>
            ))}
          </div>

          {/* Portfolio Highlights */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Award className="w-8 h-8 text-blue-400 mr-3" />
              Portfolio Excellence
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {portfolioHighlights.map((company, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-1 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold text-white">{company.company}</h4>
                    <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-semibold border border-green-500/30">
                      {company.sector}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm mb-3">{company.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-300 font-semibold text-lg">{company.outcome}</p>
                      <p className="text-slate-400 text-sm">{company.founder}</p>
                    </div>
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Trusted by Industry Leaders</h3>
              <p className="text-slate-300">Where the world's most successful investors discover tomorrow's unicorns</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-300 mb-1">Sequoia</div>
                <div className="text-slate-400 text-sm">Partner Network</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-300 mb-1">a16z</div>
                <div className="text-slate-400 text-sm">Active Investors</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-300 mb-1">Kleiner</div>
                <div className="text-slate-400 text-sm">Portfolio Partners</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-300 mb-1">GV</div>
                <div className="text-slate-400 text-sm">Strategic Backers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Premium Form */}
        <div className="w-full lg:w-96 xl:w-[32rem] flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/20">
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <Star className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">
                  {isSignUp ? 'Join the Elite' : 'Welcome Back'}
                </h2>
                <p className="text-slate-300 text-lg">
                  {isSignUp 
                    ? 'Access the world\'s most exclusive startup ecosystem' 
                    : 'Continue building exceptional companies'
                  }
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {isSignUp && (
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <button
                      type="button"
                      onClick={() => setUserType('student')}
                      className={`flex flex-col items-center justify-center px-4 py-6 rounded-xl border-2 transition-all font-semibold ${
                        userType === 'student'
                          ? 'border-blue-500 bg-blue-500/20 text-blue-300 shadow-lg shadow-blue-500/25'
                          : 'border-white/20 text-slate-300 hover:border-white/40 hover:bg-white/5'
                      }`}
                    >
                      <Zap className="w-8 h-8 mb-2" />
                      <span className="text-sm">Founder</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserType('investor')}
                      className={`flex flex-col items-center justify-center px-4 py-6 rounded-xl border-2 transition-all font-semibold ${
                        userType === 'investor'
                          ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300 shadow-lg shadow-indigo-500/25'
                          : 'border-white/20 text-slate-300 hover:border-white/40 hover:bg-white/5'
                      }`}
                    >
                      <Building2 className="w-8 h-8 mb-2" />
                      <span className="text-sm">Investor</span>
                    </button>
                  </div>
                )}

                <div className="space-y-5">
                  {isSignUp && (
                    <div>
                      <label className="block text-sm font-semibold text-slate-200 mb-3">
                        Full Name
                      </label>
                      <div className="relative">
                        <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="pl-12 w-full px-4 py-4 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/5 backdrop-blur-sm text-white placeholder-slate-400"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-3">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-12 w-full px-4 py-4 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/5 backdrop-blur-sm text-white placeholder-slate-400"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-3">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        className="w-full px-4 py-4 pr-12 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/5 backdrop-blur-sm text-white placeholder-slate-400"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {isSignUp && userType === 'student' && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-slate-200 mb-3">
                          University
                        </label>
                        <input
                          type="text"
                          value={formData.university}
                          onChange={(e) => setFormData(prev => ({ ...prev, university: e.target.value }))}
                          className="w-full px-4 py-4 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/5 backdrop-blur-sm text-white placeholder-slate-400"
                          placeholder="e.g., Stanford University"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-200 mb-3">
                          Field of Study
                        </label>
                        <input
                          type="text"
                          value={formData.major}
                          onChange={(e) => setFormData(prev => ({ ...prev, major: e.target.value }))}
                          className="w-full px-4 py-4 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/5 backdrop-blur-sm text-white placeholder-slate-400"
                          placeholder="e.g., Computer Science, MBA"
                        />
                      </div>
                    </>
                  )}

                  {isSignUp && userType === 'investor' && (
                    <div>
                      <label className="block text-sm font-semibold text-slate-200 mb-3">
                        Firm / Organization
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                        className="w-full px-4 py-4 border border-white/20 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white/5 backdrop-blur-sm text-white placeholder-slate-400"
                        placeholder="e.g., Sequoia Capital"
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className={`w-full py-5 rounded-xl font-bold text-white transition-all transform hover:scale-105 shadow-2xl text-lg ${
                    userType === 'student'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 hover:shadow-blue-500/25'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 hover:shadow-indigo-500/25'
                  }`}
                >
                  {isSignUp ? 'Access the Platform' : 'Continue Building'}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-sm text-slate-300 hover:text-white font-medium transition-colors"
                  >
                    {isSignUp ? 'Already have access? Sign in' : 'Ready to join the elite? Get access'}
                  </button>
                </div>
              </form>

              {/* Exclusivity Indicator */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs text-slate-400 text-center mb-3">Invitation-only platform</p>
                <div className="flex justify-center space-x-6 text-xs text-slate-500">
                  <span>Sequoia</span>
                  <span>•</span>
                  <span>a16z</span>
                  <span>•</span>
                  <span>Kleiner</span>
                  <span>•</span>
                  <span>GV</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;