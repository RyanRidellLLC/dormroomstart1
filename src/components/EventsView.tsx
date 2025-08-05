import React, { useState } from 'react';
import { 
  Calendar, MapPin, Users, Clock, Star, ExternalLink, 
  Filter, Search, Video, Globe, Award, Ticket
} from 'lucide-react';
import { mockEvents } from '../data/mockData';
import { Event } from '../types';

const EventsView: React.FC = () => {
  const [events] = useState<Event[]>(mockEvents);
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const eventTypes = [
    { id: 'all', name: 'All Events', count: 24 },
    { id: 'pitch_night', name: 'Pitch Nights', count: 8 },
    { id: 'networking', name: 'Networking', count: 6 },
    { id: 'workshop', name: 'Workshops', count: 5 },
    { id: 'speed_dating', name: 'Speed Dating', count: 3 },
    { id: 'demo_day', name: 'Demo Days', count: 2 }
  ];

  const upcomingHighlights = [
    { title: 'Global connections made', value: '15.2K', icon: Globe },
    { title: 'Successful matches', value: '2.3K', icon: Star },
    { title: 'Funding secured', value: '$45M', icon: Award },
    { title: 'Events this month', value: '24', icon: Calendar }
  ];

  const filteredEvents = events.filter(event => {
    const matchesType = selectedType === 'all' || event.type === selectedType;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'pitch_night': return '🎤';
      case 'networking': return '🤝';
      case 'workshop': return '🛠️';
      case 'speed_dating': return '⚡';
      case 'demo_day': return '🚀';
      default: return '📅';
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'pitch_night': return 'from-blue-500 to-blue-600';
      case 'networking': return 'from-green-500 to-green-600';
      case 'workshop': return 'from-purple-500 to-purple-600';
      case 'speed_dating': return 'from-orange-500 to-orange-600';
      case 'demo_day': return 'from-red-500 to-red-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <Calendar className="w-8 h-8 mr-3 text-orange-600" />
          Startup Events
        </h1>
        <p className="text-gray-600 mb-4">
          Connect, learn, and grow through our global community events
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {upcomingHighlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900">{highlight.value}</div>
                    <div className="text-xs text-gray-500">{highlight.title}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Featured Event Banner */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                  ⭐ Featured Event
                </span>
                <span className="px-3 py-1 bg-red-500/30 rounded-full text-sm font-semibold">
                  Filling Fast
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-2">Global Student Pitch Night</h2>
              <p className="text-orange-100 mb-4 text-lg">
                Join student entrepreneurs from 50+ countries competing for $100K in prizes
              </p>
              <div className="flex items-center space-x-6 text-orange-100">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Dec 28, 2024 • 7:00 PM PST</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Video className="w-5 h-5" />
                  <span>Virtual Event</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>450/500 registered</span>
                </div>
              </div>
            </div>
            <button className="px-8 py-4 bg-white text-orange-600 rounded-xl hover:bg-orange-50 transition-all font-bold text-lg shadow-lg">
              Register Now
            </button>
          </div>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-yellow-300/20 rounded-full blur-xl"></div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events by title, description, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
          <div>
            <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all">
              <Filter className="w-5 h-5 mr-2 text-gray-500" />
              <span className="text-gray-700">More Filters</span>
            </button>
          </div>
        </div>

        {/* Event Type Filters */}
        <div className="flex flex-wrap gap-3">
          {eventTypes.map(type => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all ${
                selectedType === type.id
                  ? 'bg-orange-100 text-orange-700 border-2 border-orange-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent'
              }`}
            >
              <span className="mr-2">{getEventTypeIcon(type.id)}</span>
              {type.name}
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                selectedType === type.id
                  ? 'bg-orange-200 text-orange-800'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {type.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map(event => (
          <div key={event.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              {/* Event Type Badge */}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 bg-gradient-to-r ${getEventTypeColor(event.type)} text-white rounded-full text-xs font-semibold shadow-lg`}>
                  {getEventTypeIcon(event.type)} {event.type.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              {/* Featured Badge */}
              {event.featured && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-yellow-500 text-white rounded-full text-xs font-semibold shadow-lg">
                    ⭐ Featured
                  </span>
                </div>
              )}

              {/* Date Overlay */}
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-2xl font-bold">
                  {event.date.getDate()}
                </div>
                <div className="text-sm opacity-90">
                  {event.date.toLocaleDateString('en-US', { month: 'short' })}
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{event.title}</h3>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">{event.description}</p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>{event.date.toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit'
                  })}</span>
                </div>
                
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  {event.isVirtual ? (
                    <>
                      <Video className="w-4 h-4 text-green-500" />
                      <span>Virtual Event</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span>{event.location}</span>
                    </>
                  )}
                </div>

                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Users className="w-4 h-4 text-purple-500" />
                  <span>{event.attendees.length} attending</span>
                  {event.maxAttendees && (
                    <span className="text-gray-400">/ {event.maxAttendees} max</span>
                  )}
                </div>
              </div>

              {/* Organizer Info */}
              <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-xl">
                <img
                  src={event.organizer.avatar}
                  alt={event.organizer.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{event.organizer.name}</p>
                  <p className="text-xs text-gray-500">{event.organizer.company}</p>
                </div>
              </div>

              {/* Attendee Avatars */}
              {event.attendees.length > 0 && (
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex -space-x-2">
                    {event.attendees.slice(0, 4).map((attendee) => (
                      <img
                        key={attendee.id}
                        src={attendee.avatar}
                        alt={attendee.name}
                        className="w-6 h-6 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                    {event.attendees.length > 4 && (
                      <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center">
                        <span className="text-xs text-gray-600">+{event.attendees.length - 4}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 ml-2">attending</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button className={`flex-1 px-4 py-3 bg-gradient-to-r ${getEventTypeColor(event.type)} text-white rounded-xl hover:shadow-lg transition-all font-semibold text-sm flex items-center justify-center space-x-2`}>
                  <Ticket className="w-4 h-4" />
                  <span>Register</span>
                </button>
                <button className="px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold text-sm flex items-center justify-center">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              {/* Registration Deadline */}
              <div className="mt-3 text-center">
                <p className="text-xs text-gray-500">
                  Register by {event.registrationDeadline.toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
          <p className="text-gray-500 mb-6">
            Try adjusting your search criteria or event type filters
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl hover:from-orange-700 hover:to-red-700 transition-all font-semibold">
            Clear Filters
          </button>
        </div>
      )}

      {/* Create Event CTA */}
      <div className="mt-12 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 text-center border border-orange-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Want to host your own event?</h2>
        <p className="text-gray-600 mb-6">
          Create networking events, pitch nights, or workshops for the global startup community
        </p>
        <button className="px-8 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl hover:from-orange-700 hover:to-red-700 transition-all font-semibold shadow-lg">
          Create Event
        </button>
      </div>
    </div>
  );
};

export default EventsView;