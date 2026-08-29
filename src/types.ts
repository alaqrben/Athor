export type TabType = 'home' | 'map' | 'add' | 'capsules' | 'profile';

export type TraceCategory = 'audio' | 'draw' | 'text' | 'photo';

export interface Trace {
  id: string;
  title: string;
  location: string;
  city: string;
  category: TraceCategory;
  timeAgo: string;
  audioDuration?: string;
  snippet: string;
  author: string;
  authorAvatar?: string;
  likes: number;
  isLocked?: boolean;
  coordinates: { x: number; y: number }; // Percentage for map display
  colorTheme?: string;
  tags?: string[];
  dateCreated: string;
}

export interface TimeCapsule {
  id: string;
  title: string;
  unlockYear: number;
  unlockDate: string;
  timeLeftStr: string;
  isUnlocked: boolean;
  iconBg: string;
  iconColor: string;
  iconType: 'purple' | 'orange' | 'blue' | 'emerald';
  recipient: string;
  message: string;
  mediaType: 'text' | 'audio' | 'photo';
  locationName: string;
  sender: string;
  audioDuration?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  type: 'capsule' | 'trace' | 'like' | 'system';
  isRead: boolean;
}
