import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Switch } from './ui/switch';
import { 
  ArrowLeft,
  Shield,
  Eye,
  EyeOff,
  MapPin,
  Users,
  MessageCircle,
  Heart
} from 'lucide-react';

interface PrivacySettingsProps {
  onBack: () => void;
}

export default function PrivacySettings({ onBack }: PrivacySettingsProps) {
  const [settings, setSettings] = useState({
    showDistance: true,
    showAge: true,
    showOnlineStatus: false,
    allowMessagesFromMatches: true,
    showReadReceipts: true,
    discoverable: true,
    showRecentActivity: false
  });

  const updateSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const privacyOptions = [
    {
      key: 'discoverable' as const,
      title: 'Make me discoverable',
      description: 'Allow others to see your profile in their recommendations',
      icon: Users,
      color: 'text-purple-500'
    },
    {
      key: 'showDistance' as const,
      title: 'Show my distance',
      description: 'Display distance from other users on your profile',
      icon: MapPin,
      color: 'text-blue-500'
    },
    {
      key: 'showAge' as const,
      title: 'Show my age',
      description: 'Display your age on your profile',
      icon: Users,
      color: 'text-green-500'
    },
    {
      key: 'showOnlineStatus' as const,
      title: 'Show online status',
      description: 'Let others know when you are online',
      icon: Eye,
      color: 'text-orange-500'
    },
    {
      key: 'allowMessagesFromMatches' as const,
      title: 'Messages from matches only',
      description: 'Only allow messages from people you matched with',
      icon: MessageCircle,
      color: 'text-pink-500'
    },
    {
      key: 'showReadReceipts' as const,
      title: 'Read receipts',
      description: 'Show others when you have read their messages',
      icon: Eye,
      color: 'text-indigo-500'
    },
    {
      key: 'showRecentActivity' as const,
      title: 'Show recent activity',
      description: 'Display your recent app activity to matches',
      icon: Heart,
      color: 'text-red-500'
    }
  ];

  return (
    <div className="h-full bg-gradient-to-b from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <div className="px-6 pt-16 pb-6">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-white p-2 hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl">Privacy Settings</h1>
                <p className="text-white/80 text-sm">Control your visibility and data sharing</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6 pb-24 overflow-y-auto">
        {/* Profile Visibility */}
        <div>
          <h2 className="text-lg mb-4">Profile Visibility</h2>
          <div className="space-y-3">
            {privacyOptions.slice(0, 4).map((option) => {
              const Icon = option.icon;
              return (
                <motion.div
                  key={option.key}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="rounded-2xl">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 ${option.color}`} />
                          <div>
                            <span className="font-medium">{option.title}</span>
                            <p className="text-sm text-muted-foreground">{option.description}</p>
                          </div>
                        </div>
                        <Switch 
                          checked={settings[option.key]} 
                          onCheckedChange={() => updateSetting(option.key)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Communication */}
        <div>
          <h2 className="text-lg mb-4">Communication & Activity</h2>
          <div className="space-y-3">
            {privacyOptions.slice(4).map((option) => {
              const Icon = option.icon;
              return (
                <motion.div
                  key={option.key}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="rounded-2xl">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 ${option.color}`} />
                          <div>
                            <span className="font-medium">{option.title}</span>
                            <p className="text-sm text-muted-foreground">{option.description}</p>
                          </div>
                        </div>
                        <Switch 
                          checked={settings[option.key]} 
                          onCheckedChange={() => updateSetting(option.key)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Privacy Information */}
        <Card className="rounded-2xl bg-muted/30">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <h3 className="font-medium mb-2">Your Privacy Matters</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  These settings help you control how your information is shared with other users. 
                  You can change these preferences at any time. Your safety and privacy are our top priorities.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}