import React from 'react';
import { 
  TrendingUp, Users, MessageCircle, DollarSign, Star, Calendar, 
  Zap, Target, Globe, Award, ArrowRight, Eye, Heart
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const studentStats = [
    { 
      label: 'Active Startups', 
      value: '3', 
      icon: Zap, 
      change: '+1 this month',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      label: 'Global Connections', 
      value: user?.connections?.toString() || '127', 
      icon: Globe, 
      change: '+23 this week',
      color: 'from-green-500 to-green-600'
    },
    { 
      label: 'Investor Interest', 
      value: '12', 
      icon: Star, 
      change: '+4 this week',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      label: 'Total Funding', 
      value: '$125K', 
      icon: DollarSign, 
      change: '+$50K raised',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const investorStats = [
    { 
      label: 'Portfolio Size', 
      value: '18', 
      icon: Target, 
      change: '+3 this quarter',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      label: 'Total Invested', 
      value: '$2.8M', 
      icon: DollarSign, 
      change: '+$750K this quarter',
      color: 'from-green-500 to-green-600'
    },
    { 
      label: 'Startups Reviewed', 
      value: '248', 
      icon: Eye, 
      change: '+42 this month',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      label: 'Success Rate', 
      value: '34%', 
      icon: Award, 
      change: '+5% this year',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const stats = user?.type === 'student' ? studentStats : investorStats;

  const recentActivity = [
    { 
      type: 'match', 
      message: user?.type === 'student' 
        ? 'Sarah Johnson from Future Ventures showed interest in EcoTrack' 
        : 'New high-potential startup InnovateTech matches your criteria',
      time: '2h ago',
      important: true
    },
    { 
      type: 'connection', 
      message: 'Maria Rodriguez from MIT sent you a connection request', 
      time: '4h ago',
      important: false
    },
    { 
      type: 'forum', 
      message: 'Your post "AI in Healthcare" received 12 new comments and 28 likes', 
      time: '6h ago',
      important: false
    },
    { 
      type: 'event', 
      message: 'Reminder: Global Pitch Night starts in 2 days', 
      time: '1d ago',
      important: true
    },
    { 
      type: 'funding', 
      message: user?.type === 'student'
        ? 'EcoTrack reached 25% of funding goal!' 
        : 'Portfolio company StudyBuddy raised $500K Series A',
      time: '2d ago',
      important: true
    }
  ];

  const trendingTopics = [
    { name: 'AI in Education', posts: 156, trend: '+24%' },
    { name: 'Climate Tech', posts: 89, trend: '+18%' },
    { name: 'FinTech Innovation', posts: 134, trend: '+15%' },
    { name: 'Health Tech', posts: 67, trend: '+12%' }
  ];

  const upcomingEvents = [
    {
      title: 'Global Student Pitch Night',
      date: 'Dec 28, 2024',
      time: '7:00 PM PST',
      attendees: 450,
      featured: true
    },
    {
      title: 'Investor Speed Dating',
      date: 'Jan 15, 2025',
      time: '2:00 PM PST',
      attendees: 200,
      featured: true
    },
    {
      title: 'AI Startup Workshop',
      date: 'Jan 22, 2025',
      time: '10:00 AM PST',
      attendees: 350,
      featured: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-lg"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-gray-600 flex items-center space-x-2">
              <span>
                {user?.type === 'student' 
                  ? `${user?.university} • ${user?.major}`
                  : `${user?.company} • Investor`
                }
              </span>
              {user?.verified && (
                <span className="flex items-center text-blue-600">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  Verified
                </span>
              )}
            </p>
          </div>
        </div>
        <p className="text-lg text-gray-700">
          {user?.type === 'student' 
            ? 'Ready to build the next unicorn? Your startup journey continues here.' 
            : 'Discover promising startups and track your portfolio performance.'
          }
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="mb-2">
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
              </div>
              <p className="text-sm text-green-600 font-semibold">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity - Left Column */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                View all <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className={`flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer ${
                  activity.important ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50'
                }`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'match' ? 'bg-purple-100' :
                    activity.type === 'connection' ? 'bg-blue-100' :
                    activity.type === 'forum' ? 'bg-green-100' :
                    activity.type === 'event' ? 'bg-orange-100' :
                    'bg-yellow-100'
                  }`}>
                    {activity.type === 'match' && <Zap className="w-5 h-5 text-purple-600" />}
                    {activity.type === 'connection' && <Users className="w-5 h-5 text-blue-600" />}
                    {activity.type === 'forum' && <MessageCircle className="w-5 h-5 text-green-600" />}
                    {activity.type === 'event' && <Calendar className="w-5 h-5 text-orange-600" />}
                    {activity.type === 'funding' && <DollarSign className="w-5 h-5 text-yellow-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 text-sm font-medium">{activity.message}</p>
                    <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                  </div>
                  {activity.important && (
                    <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="space-y-3">
              {user?.type === 'student' ? (
                <>
                  <button className="w-full p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold flex items-center justify-center space-x-2 shadow-lg">
                    <Zap className="w-5 h-5" />
                    <span>Create New Startup</span>
                  </button>
                  <button className="w-full p-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all font-semibold flex items-center justify-center space-x-2 shadow-lg">
                    <Users className="w-5 h-5" />
                    <span>Find Co-founders</span>
                  </button>
                  <button className="w-full p-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all font-semibold flex items-center justify-center space-x-2 shadow-lg">
                    <Calendar className="w-5 h-5" />
                    <span>Schedule Pitch</span>
                  </button>
                </>
              ) : (
                <>
                  <button className="w-full p-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all font-semibold flex items-center justify-center space-x-2 shadow-lg">
                    <Eye className="w-5 h-5" />
                    <span>Discover Startups</span>
                  </button>
                  <button className="w-full p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold flex items-center justify-center space-x-2 shadow-lg">
                    <Calendar className="w-5 h-5" />
                    <span>Schedule Meetings</span>
                  </button>
                  <button className="w-full p-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all font-semibold flex items-center justify-center space-x-2 shadow-lg">
                    <Target className="w-5 h-5" />
                    <span>View Analytics</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Trending Topics */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">🔥 Trending Topics</h2>
            <div className="space-y-4">
              {trendingTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors">
                  <div>
                    <p className="font-medium text-gray-900">{topic.name}</p>
                    <p className="text-sm text-gray-500">{topic.posts} posts</p>
                  </div>
                  <span className="text-green-600 font-semibold text-sm bg-green-100 px-2 py-1 rounded-full">
                    {topic.trend}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className={`p-4 rounded-xl border transition-all cursor-pointer hover:shadow-md ${
                  event.featured ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm">{event.title}</h3>
                    {event.featured && (
                      <span className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{event.date} • {event.time}</p>
                  <div className="flex items-center space-x-2">
                    <Users className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{event.attendees} attending</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;