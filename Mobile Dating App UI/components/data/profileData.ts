import { 
  Music, 
  Camera, 
  Coffee, 
  Mountain, 
  Palette, 
  Book,
  Heart,
  MessageCircle,
  Star,
  Crown,
  Edit,
  Shield,
  Settings
} from 'lucide-react';

export const interests = [
  { icon: Music, label: 'Music', color: 'bg-purple-500' },
  { icon: Camera, label: 'Photography', color: 'bg-pink-500' },
  { icon: Coffee, label: 'Coffee', color: 'bg-amber-500' },
  { icon: Mountain, label: 'Hiking', color: 'bg-emerald-500' },
  { icon: Palette, label: 'Art', color: 'bg-indigo-500' },
  { icon: Book, label: 'Reading', color: 'bg-green-500' }
];

export const stats = [
  { label: 'Matches', value: '127', icon: Heart, color: 'text-red-500' },
  { label: 'Conversations', value: '43', icon: MessageCircle, color: 'text-blue-500' },
  { label: 'Super Likes', value: '18', icon: Star, color: 'text-yellow-500' },
  { label: 'Streak', value: '7 days', icon: Crown, color: 'text-purple-500' }
];

export const settingsItems = [
  { label: 'Edit Profile', icon: Edit, description: 'Update your photos and info' },
  { label: 'Privacy Settings', icon: Shield, description: 'Manage who can see you' },
  { label: 'Notifications', icon: Settings, description: 'Control your alerts' },
];

export const storyHighlights = [
  'Travel',
  'Food', 
  'Hobbies',
  'Friends'
];