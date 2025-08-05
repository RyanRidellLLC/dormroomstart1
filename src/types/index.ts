export interface User {
  id: string;
  name: string;
  email: string;
  type: 'student' | 'investor';
  university?: string;
  major?: string;
  graduationYear?: number;
  bio: string;
  skills: string[];
  interests: string[];
  location: string;
  avatar: string;
  investmentFocus?: string[];
  fundSize?: string;
  company?: string;
  linkedIn?: string;
  twitter?: string;
  github?: string;
  website?: string;
  verified: boolean;
  memberSince: Date;
  reputation: number;
  connections: number;
}

export interface Startup {
  id: string;
  name: string;
  description: string;
  industry: string;
  stage: 'idea' | 'prototype' | 'mvp' | 'growth' | 'scaling';
  fundingGoal: number;
  currentFunding: number;
  founders: User[];
  tags: string[];
  pitch: string;
  metrics: {
    users?: number;
    revenue?: number;
    growth?: string;
    mrr?: number;
  };
  createdAt: Date;
  updatedAt: Date;
  image: string;
  gallery: string[];
  video?: string;
  deck?: string;
  website?: string;
  socialMedia: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  teamSize: number;
  lookingFor: string[];
  investorInterest: number;
  matchScore?: number;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: User;
  category: string;
  replies: ForumReply[];
  likes: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  pinned: boolean;
  featured: boolean;
}

export interface ForumReply {
  id: string;
  content: string;
  author: User;
  likes: number;
  createdAt: Date;
  parentId?: string;
}

export interface Match {
  id: string;
  startup: Startup;
  investor: User;
  status: 'pending' | 'interested' | 'meeting_scheduled' | 'negotiating' | 'invested' | 'passed';
  matchScore: number;
  createdAt: Date;
  notes?: string;
  meetingDate?: Date;
  investmentAmount?: number;
}

export interface Connection {
  id: string;
  user1: User;
  user2: User;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
  acceptedAt?: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'pitch_night' | 'networking' | 'workshop' | 'demo_day' | 'speed_dating';
  date: Date;
  location: string;
  isVirtual: boolean;
  organizer: User;
  attendees: User[];
  maxAttendees?: number;
  image: string;
  registrationDeadline: Date;
  featured: boolean;
}

export interface Notification {
  id: string;
  type: 'match' | 'connection' | 'message' | 'investment' | 'event' | 'forum';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export interface Message {
  id: string;
  sender: User;
  receiver: User;
  content: string;
  createdAt: Date;
  read: boolean;
  conversationId: string;
}