import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Search, 
  Star, 
  Flame, 
  MessageCircle, 
  Heart,
  Sparkles,
  MoreVertical,
  Camera
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ChatInboxProps {
  onChatSelect: (chatId: string) => void;
}

const chats = [
  {
    id: '1',
    name: 'Alex',
    preview: 'Hey! Thanks for the match 😊',
    time: '2m',
    unread: 2,
    isMatch: true,
    hasStory: true,
    streak: 3,
    isFavorite: true,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b72bb643?w=100&h=100&fit=crop'
  },
  {
    id: '2',
    name: 'Jordan',
    preview: 'That concert was amazing! 🎵',
    time: '1h',
    unread: 0,
    isMatch: true,
    hasStory: false,
    streak: 0,
    isFavorite: false,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
  },
  {
    id: '3',
    name: 'Sam',
    preview: 'We both said no... wanna talk about it?',
    time: '3h',
    unread: 1,
    isMatch: false,
    hasStory: true,
    streak: 0,
    isFavorite: false,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
  },
  {
    id: '4',
    name: 'Taylor',
    preview: 'Love your travel photos! ✈️',
    time: '1d',
    unread: 0,
    isMatch: true,
    hasStory: false,
    streak: 7,
    isFavorite: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
  }
];

export default function ChatInbox({ onChatSelect }: ChatInboxProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = chats.filter(chat => {
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    switch (activeFilter) {
      case 'matches':
        return matchesSearch && chat.isMatch;
      case 'reverse':
        return matchesSearch && !chat.isMatch;
      case 'favorites':
        return matchesSearch && chat.isFavorite;
      case 'streaks':
        return matchesSearch && chat.streak > 0;
      default:
        return matchesSearch;
    }
  });

  return (
    <div className="h-full bg-background">
      {/* Header */}
      <div className="px-6 pt-16 pb-4">
        <h1 className="text-2xl mb-4">Messages</h1>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-2xl bg-muted/50"
          />
        </div>

        {/* Filters */}
        <Tabs value={activeFilter} onValueChange={setActiveFilter}>
          <TabsList className="w-full grid grid-cols-5 bg-muted/50 rounded-2xl p-1">
            <TabsTrigger value="all" className="rounded-xl text-xs">All</TabsTrigger>
            <TabsTrigger value="matches" className="rounded-xl text-xs">Matches</TabsTrigger>
            <TabsTrigger value="reverse" className="rounded-xl text-xs">Reverse</TabsTrigger>
            <TabsTrigger value="favorites" className="rounded-xl text-xs">Favorites</TabsTrigger>
            <TabsTrigger value="streaks" className="rounded-xl text-xs">Streaks</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Chat List */}
      <div className="flex-1 px-6 pb-20 space-y-1">
        {filteredChats.map((chat, index) => (
          <motion.button
            key={chat.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onChatSelect(chat.id)}
            className="w-full p-4 rounded-2xl hover:bg-muted/50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              {/* Avatar with Story Ring */}
              <div className="relative">
                <div className={`w-14 h-14 rounded-full overflow-hidden ${
                  chat.hasStory ? 'p-0.5 gradient-primary' : ''
                }`}>
                  <div className="w-full h-full rounded-full overflow-hidden bg-white">
                    <ImageWithFallback
                      src={chat.avatar}
                      alt={chat.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Match Type Indicator */}
                {chat.isMatch ? (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Heart className="w-3 h-3 text-white fill-white" />
                  </div>
                ) : (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium truncate">{chat.name}</h3>
                    {chat.isFavorite && (
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    )}
                    {chat.streak > 0 && (
                      <div className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-orange-500" />
                        <span className="text-xs text-orange-500">{chat.streak}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate pr-2">
                    {chat.preview}
                  </p>
                  {chat.unread > 0 && (
                    <Badge className="bg-purple-500 text-white rounded-full min-w-[20px] h-5 text-xs flex items-center justify-center">
                      {chat.unread}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </motion.button>
        ))}

        {filteredChats.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <MessageCircle className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg mb-2">No conversations</h3>
            <p className="text-muted-foreground max-w-sm">
              Start swiping to find your perfect match and begin conversations!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}