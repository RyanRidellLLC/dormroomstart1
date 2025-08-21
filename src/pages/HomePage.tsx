import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  TrendingUp, 
  Users, 
  Star, 
  CheckCircle, 
  ArrowRight, 
  Play,
  MapPin,
  Calendar,
  DollarSign,
  Target,
  Award,
  Zap,
  Globe,
  BarChart3,
  Shield
} from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('startups');
  const [currentDrop, setCurrentDrop] = useState(0);

  const monthlyDrops = [
    {
      month: "January 2025",
      theme: "AI & Machine Learning",
      startups: 12,
      totalRaised: "$45M",
      featured: ["TechFlow AI", "DataVision", "MLCore"]
    },
    {
      month: "December 2024", 
      theme: "Sustainable Tech",
      startups: 15,
      totalRaised: "$62M",
      featured: ["GreenEnergy+", "EcoTech", "SolarSync"]
    }
  ];

  const featuredStartups = [
    {
      name: "TechFlow AI",
      industry: "Artificial Intelligence",
      revenue: "$2.4M ARR",
      growth: "+340%",
      funding: "Series A Ready",
      location: "San Francisco, CA",
      compatibility: 94,
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "EcoVantage",
      industry: "Clean Technology",
      revenue: "$890K ARR",
      growth: "+225%", 
      funding: "Seed Extension",
      location: "Austin, TX",
      compatibility: 87,
      image: "https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "FinanceCore",
      industry: "Fintech",
      revenue: "$5.2M ARR",
      growth: "+180%",
      funding: "Series B Ready", 
      location: "New York, NY",
      compatibility: 91,
      image: "https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const investorProfiles = [
    {
      name: "Sarah Chen",
      firm: "Venture Peak Capital",
      checkSize: "$500K - $5M",
      focus: "AI/ML, Enterprise SaaS",
      portfolio: 45,
      location: "Palo Alto, CA",
      compatibility: 96,
      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Marcus Rodriguez",
      firm: "Impact Ventures",
      checkSize: "$250K - $2M", 
      focus: "Climate, Healthcare",
      portfolio: 32,
      location: "Austin, TX",
      compatibility: 89,
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Elena Popov",
      firm: "TechForward Fund",
      checkSize: "$1M - $10M",
      focus: "Fintech, B2B SaaS",
      portfolio: 28,
      location: "New York, NY", 
      compatibility: 93,
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDrop((prev) => (prev + 1) % monthlyDrops.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [monthlyDrops.length]);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <div className="relative min-h-screen overflow-hidden">
        {/* City Background */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=1600')",
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            backgroundAttachment: 'fixed'
          }}
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-slate-900/95 to-cyan-900/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        
        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between p-6 lg:px-12">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">VentureSync</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-slate-300 hover:text-white transition-colors">How it Works</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Success Stories</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Resources</a>
            <button className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300">
              Sign In
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Where <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Startups</span> Meet
              <br />Perfect <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Investors</span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              AI-powered matching platform connecting high-growth startups with strategic investors. 
              Join our exclusive monthly drops and discover your perfect match.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
              <button className="group w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2">
                <Rocket className="w-5 h-5" />
                <span>I'm a Startup</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group w-full sm:w-auto bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>I'm an Investor</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">2,500+</div>
                <div className="text-slate-300">Active Startups</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">1,200+</div>
                <div className="text-slate-300">Verified Investors</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">$2.1B+</div>
                <div className="text-slate-300">Capital Raised</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">94%</div>
                <div className="text-slate-300">Match Success</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Drop Section */}
      <section className="py-20 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Monthly <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Drops</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Exclusive monthly showcases featuring hand-picked startups ready for investment. 
              Each drop focuses on a specific industry with verified growth metrics.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{monthlyDrops[currentDrop].month}</h3>
                  <p className="text-slate-400">{monthlyDrops[currentDrop].theme}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">{monthlyDrops[currentDrop].startups}</div>
                <div className="text-slate-400">Selected Startups</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <DollarSign className="w-8 h-8 text-green-400 mb-3" />
                <div className="text-2xl font-bold text-white mb-2">{monthlyDrops[currentDrop].totalRaised}</div>
                <div className="text-slate-400">Total Capital Raised</div>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <Target className="w-8 h-8 text-blue-400 mb-3" />
                <div className="text-2xl font-bold text-white mb-2">89%</div>
                <div className="text-slate-400">Funding Success Rate</div>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <Award className="w-8 h-8 text-orange-400 mb-3" />
                <div className="text-2xl font-bold text-white mb-2">4.8/5</div>
                <div className="text-slate-400">Investor Rating</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-slate-300">Featured Companies:</span>
              {monthlyDrops[currentDrop].featured.map((company, index) => (
                <span key={index} className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                  {company}
                </span>
              ))}
            </div>

            <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-[1.02]">
              View January 2025 Drop
            </button>
          </div>
        </div>
      </section>

      {/* Profiles Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Meet Your Perfect <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Match</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Our AI-powered compatibility system analyzes over 200 data points to connect 
              startups with investors who truly understand their vision and market.
            </p>
            
            <div className="flex justify-center mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
                <button
                  onClick={() => setActiveTab('startups')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === 'startups' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Featured Startups
                </button>
                <button
                  onClick={() => setActiveTab('investors')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === 'investors' 
                      ? 'bg-orange-600 text-white' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Top Investors
                </button>
              </div>
            </div>
          </div>

          {/* Startup Profiles */}
          {activeTab === 'startups' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredStartups.map((startup, index) => (
                <div key={index} className="group bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="flex items-center space-x-4 mb-6">
                    <img 
                      src={startup.image} 
                      alt={startup.name}
                      className="w-14 h-14 rounded-2xl object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-white">{startup.name}</h3>
                      <p className="text-slate-400">{startup.industry}</p>
                    </div>
                    <div className="ml-auto bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                      {startup.compatibility}% Match
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 rounded-2xl p-4">
                      <div className="text-lg font-bold text-white mb-1">{startup.revenue}</div>
                      <div className="text-slate-400 text-sm">Annual Revenue</div>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-4">
                      <div className="text-lg font-bold text-green-400 mb-1">{startup.growth}</div>
                      <div className="text-slate-400 text-sm">YoY Growth</div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-blue-400" />
                      <span className="text-slate-300">{startup.funding}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-orange-400" />
                      <span className="text-slate-300">{startup.location}</span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold transition-colors">
                      View Profile
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-2xl transition-colors">
                      <Play className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Investor Profiles */}
          {activeTab === 'investors' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {investorProfiles.map((investor, index) => (
                <div key={index} className="group bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:border-orange-500/50 transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="flex items-center space-x-4 mb-6">
                    <img 
                      src={investor.image} 
                      alt={investor.name}
                      className="w-14 h-14 rounded-2xl object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-white">{investor.name}</h3>
                      <p className="text-slate-400">{investor.firm}</p>
                    </div>
                    <div className="ml-auto bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                      {investor.compatibility}% Match
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 rounded-2xl p-4">
                      <div className="text-lg font-bold text-white mb-1">{investor.checkSize}</div>
                      <div className="text-slate-400 text-sm">Check Size</div>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-4">
                      <div className="text-lg font-bold text-orange-400 mb-1">{investor.portfolio}</div>
                      <div className="text-slate-400 text-sm">Portfolio Cos</div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-blue-400" />
                      <span className="text-slate-300">{investor.focus}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-orange-400" />
                      <span className="text-slate-300">{investor.location}</span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-2xl font-semibold transition-colors">
                      Connect
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-2xl transition-colors">
                      <Shield className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              How <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">VentureSync</span> Works
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Our sophisticated matching algorithm considers compatibility across multiple dimensions
              to ensure meaningful connections that lead to successful partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Smart Profiling</h3>
              <p className="text-slate-300">
                Complete comprehensive profiles with verified metrics, growth data, 
                and strategic goals. Our AI analyzes 200+ compatibility factors.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">AI Matching</h3>
              <p className="text-slate-300">
                Advanced algorithms match startups with investors based on industry focus, 
                stage, check size, geography, and strategic alignment.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Secure Connection</h3>
              <p className="text-slate-300">
                Verified introductions with built-in video pitching, document sharing, 
                and progress tracking throughout the funding process.
              </p>
            </div>
          </div>

          {/* Signup Criteria Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-3xl p-8 border border-blue-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">Startup Requirements</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300">Minimum $50K ARR or clear revenue path</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300">Comprehensive business plan & financial projections</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300">Verified team credentials & experience</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300">Market traction evidence (users, revenue, partnerships)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300">2-minute video pitch & demo</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-3xl p-8 border border-orange-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">Investor Requirements</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300">Minimum $25K check size capacity</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300">Verified accreditation & investment history</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300">Clear investment thesis & focus areas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300">Portfolio companies & success metrics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300">Value-add capabilities beyond capital</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Find Your Perfect Match?
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Join thousands of successful startups and investors who've found their 
            ideal partnerships through VentureSync's intelligent matching platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="group w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-12 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2">
              <Rocket className="w-5 h-5" />
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-6 lg:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">VentureSync</span>
            </div>
            <div className="flex items-center space-x-8">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center">
            <p className="text-slate-400">© 2025 VentureSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
