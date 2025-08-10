import React from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  MessageCircle, 
  Camera, 
  Trophy, 
  User 
} from 'lucide-react';

type Screen = 'swipe' | 'chat-inbox' | 'stories' | 'quests' | 'profile';

interface BottomNavigationProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

const navItems = [
  { key: 'swipe' as Screen, icon: Heart, label: 'Home' },
  { key: 'chat-inbox' as Screen, icon: MessageCircle, label: 'Chat' },
  { key: 'stories' as Screen, icon: Camera, label: 'Story' },
  { key: 'quests' as Screen, icon: Trophy, label: 'Quests' },
  { key: 'profile' as Screen, icon: User, label: 'Profile' },
];

export default function BottomNavigation({ currentScreen, onScreenChange }: BottomNavigationProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white/80 dark:bg-card/80 backdrop-blur-sm border-t border-border">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.key;
          
          return (
            <motion.button
              key={item.key}
              whileTap={{ scale: 0.9 }}
              onClick={() => onScreenChange(item.key)}
              className="relative flex flex-col items-center py-2 px-4 min-w-0 flex-1"
            >
              {/* Active Background */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-2xl gradient-primary opacity-10"
                  transition={{ type: "spring", duration: 0.4 }}
                />
              )}
              
              {/* Icon */}
              <div className={`relative p-1 ${
                isActive 
                  ? 'text-purple-600 dark:text-purple-400' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                <Icon className="w-6 h-6" />
                
                {/* Notification Badge */}
                {item.key === 'chat-inbox' && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-card" />
                )}
                
                {item.key === 'stories' && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-card" />
                )}
              </div>
              
              {/* Label */}
              <span className={`text-xs mt-1 ${
                isActive 
                  ? 'text-purple-600 dark:text-purple-400 font-medium' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}