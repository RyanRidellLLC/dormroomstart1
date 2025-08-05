import { User, Startup, ForumPost, Event, ForumReply } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Chen',
    email: 'alex@stanford.edu',
    type: 'student',
    university: 'Stanford University',
    major: 'Computer Science',
    graduationYear: 2025,
    bio: 'Passionate about AI and machine learning. Building the next generation of intelligent applications that will revolutionize how we interact with technology.',
    skills: ['JavaScript', 'Python', 'Machine Learning', 'React', 'TensorFlow', 'Node.js'],
    interests: ['AI', 'FinTech', 'Healthcare', 'CleanTech'],
    location: 'Palo Alto, CA',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    linkedIn: 'linkedin.com/in/alexchen',
    github: 'github.com/alexchen',
    verified: true,
    memberSince: new Date('2024-01-15'),
    reputation: 850,
    connections: 124
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@futureventures.com',
    type: 'investor',
    bio: 'Seed stage investor focused on EdTech, AI, and climate solutions. Former founder with 2 successful exits totaling $45M. Passionate about supporting diverse student entrepreneurs.',
    skills: [],
    interests: [],
    location: 'San Francisco, CA',
    avatar: 'https://images.pexels.com/photos/3792581/pexels-photo-3792581.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    investmentFocus: ['EdTech', 'AI', 'CleanTech', 'SaaS', 'HealthTech'],
    fundSize: '$100K - $2M',
    company: 'Future Ventures',
    linkedIn: 'linkedin.com/in/sarahjohnson',
    verified: true,
    memberSince: new Date('2023-08-20'),
    reputation: 950,
    connections: 432
  },
  {
    id: '3',
    name: 'Maria Rodriguez',
    email: 'maria@mit.edu',
    type: 'student',
    university: 'MIT',
    major: 'Bioengineering',
    graduationYear: 2024,
    bio: 'Biotech entrepreneur developing revolutionary medical devices. Combining engineering excellence with healthcare innovation to save lives.',
    skills: ['Bioengineering', 'Medical Devices', 'CAD', 'Python', 'Research'],
    interests: ['HealthTech', 'MedTech', 'Biotech', 'AI in Healthcare'],
    location: 'Cambridge, MA',
    avatar: 'https://images.pexels.com/photos/3763152/pexels-photo-3763152.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    verified: true,
    memberSince: new Date('2024-02-10'),
    reputation: 720,
    connections: 89
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david@techventures.com',
    type: 'investor',
    bio: 'Angel investor and former Google executive. Invested in 50+ startups with a focus on early-stage technology companies. Love working with ambitious student founders.',
    skills: [],
    interests: [],
    location: 'Mountain View, CA',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    investmentFocus: ['AI', 'SaaS', 'FinTech', 'Enterprise Software'],
    fundSize: '$25K - $500K',
    company: 'Tech Ventures',
    verified: true,
    memberSince: new Date('2023-05-12'),
    reputation: 890,
    connections: 567
  }
];

export const mockStartups: Startup[] = [
  {
    id: '1',
    name: 'EcoTrack',
    description: 'AI-powered sustainability tracking platform that helps universities reduce their carbon footprint by 40% through intelligent monitoring, predictive analytics, and actionable insights.',
    industry: 'CleanTech',
    stage: 'mvp',
    fundingGoal: 500000,
    currentFunding: 125000,
    founders: [mockUsers[0]],
    tags: ['AI', 'Sustainability', 'Universities', 'IoT', 'Analytics'],
    pitch: 'EcoTrack revolutionizes campus sustainability by providing real-time environmental monitoring and AI-driven recommendations that have helped 12 universities reduce energy consumption by 40% and waste by 35%.',
    metrics: {
      users: 2400,
      revenue: 28000,
      growth: '35% MoM',
      mrr: 8500
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-12-15'),
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
    gallery: [
      'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/159804/wind-turbine-power-generation-sky-159804.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    ],
    website: 'https://ecotrack.io',
    socialMedia: {
      twitter: '@ecotrack_io',
      linkedin: 'company/ecotrack'
    },
    teamSize: 4,
    lookingFor: ['Seed Funding', 'Technical Co-founder', 'Marketing Lead'],
    investorInterest: 23
  },
  {
    id: '2',
    name: 'MedAlert',
    description: 'Smart medical alert system using wearable technology and AI to predict and prevent medical emergencies before they happen, specifically designed for college students.',
    industry: 'HealthTech',
    stage: 'prototype',
    fundingGoal: 750000,
    currentFunding: 50000,
    founders: [mockUsers[2]],
    tags: ['HealthTech', 'Wearables', 'AI', 'Medical', 'Emergency'],
    pitch: 'MedAlert uses advanced biosensors and machine learning to predict medical emergencies 30 minutes before they occur, potentially saving thousands of lives on college campuses.',
    metrics: {
      users: 150,
      growth: '45% MoM'
    },
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-12-10'),
    image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
    gallery: [
      'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    ],
    teamSize: 3,
    lookingFor: ['Pre-seed Funding', 'Medical Advisor', 'Hardware Engineer'],
    investorInterest: 18
  },
  {
    id: '3',
    name: 'StudyBuddy AI',
    description: 'Personalized AI tutoring platform that adapts to each student\'s learning style, helping improve academic performance by 60% through intelligent content delivery.',
    industry: 'EdTech',
    stage: 'growth',
    fundingGoal: 1200000,
    currentFunding: 400000,
    founders: [mockUsers[0]],
    tags: ['EdTech', 'AI', 'Personalization', 'Learning', 'Students'],
    pitch: 'StudyBuddy AI has helped over 10,000 students improve their grades by an average of 1.2 GPA points using our proprietary adaptive learning algorithms.',
    metrics: {
      users: 12500,
      revenue: 85000,
      growth: '25% MoM',
      mrr: 22000
    },
    createdAt: new Date('2023-09-10'),
    updatedAt: new Date('2024-12-12'),
    image: 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
    gallery: [
      'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    ],
    website: 'https://studybuddy.ai',
    teamSize: 8,
    lookingFor: ['Series A Funding', 'Head of Growth', 'Data Scientists'],
    investorInterest: 45
  }
];

const mockReplies: ForumReply[] = [
  {
    id: '1',
    content: 'Great question! I just went through this process. Focus on your traction metrics and make sure you can clearly articulate your unique value proposition in 30 seconds.',
    author: mockUsers[2],
    likes: 8,
    createdAt: new Date('2024-12-14')
  },
  {
    id: '2',
    content: 'Also prepare for tough questions about your business model and competition. VCs will definitely ask about your go-to-market strategy.',
    author: mockUsers[0],
    likes: 12,
    createdAt: new Date('2024-12-14')
  }
];

export const mockForumPosts: ForumPost[] = [
  {
    id: '1',
    title: 'Best practices for pitching to VCs as a student founder',
    content: 'I\'m preparing for my first VC pitch next week and feeling nervous. What are the key things I should focus on? Any specific slides that are must-haves? Would love to hear from founders who\'ve successfully raised seed rounds.',
    author: mockUsers[0],
    category: 'Fundraising',
    replies: mockReplies,
    likes: 34,
    views: 156,
    createdAt: new Date('2024-12-13'),
    updatedAt: new Date('2024-12-14'),
    tags: ['pitching', 'vc', 'fundraising', 'seed'],
    pinned: false,
    featured: true
  },
  {
    id: '2',
    title: 'Co-founder equity split - need advice!',
    content: 'My co-founder and I are splitting equity but we\'re not sure what\'s fair. I came up with the idea and have been working on it for 6 months, but he\'s bringing technical skills I don\'t have. What would you recommend?',
    author: mockUsers[2],
    category: 'Legal',
    replies: [],
    likes: 28,
    views: 89,
    createdAt: new Date('2024-12-12'),
    updatedAt: new Date('2024-12-12'),
    tags: ['equity', 'co-founder', 'legal', 'startup'],
    pinned: true,
    featured: false
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Global Student Pitch Night',
    description: 'Join student entrepreneurs from around the world as they pitch their innovative startups to a panel of top VCs and angel investors.',
    type: 'pitch_night',
    date: new Date('2024-12-28'),
    location: 'Virtual Event',
    isVirtual: true,
    organizer: mockUsers[1],
    attendees: [mockUsers[0], mockUsers[2]],
    maxAttendees: 500,
    image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
    registrationDeadline: new Date('2024-12-25'),
    featured: true
  },
  {
    id: '2',
    title: 'Investor-Startup Speed Dating',
    description: 'Fast-paced networking event where student founders get 5-minute slots to pitch their startups directly to investors.',
    type: 'speed_dating',
    date: new Date('2025-01-15'),
    location: 'San Francisco, CA',
    isVirtual: false,
    organizer: mockUsers[3],
    attendees: [],
    maxAttendees: 200,
    image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
    registrationDeadline: new Date('2025-01-10'),
    featured: true
  }
];