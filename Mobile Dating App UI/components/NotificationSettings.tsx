import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Switch } from './ui/switch';
import { 
  ArrowLeft,
  Bell,
  MessageCircle,
  Heart,
  Users,
  Trophy,
  Camera,
  Smartphone,
  Mail,
  Volume2
} from 'lucide-react';

interface NotificationSettingsProps {
  onBack: () => void;
}

export default function NotificationSettings({ onBack }: NotificationSettingsProps) {
  const [settings, setSettings] = useState({
    // Push Notifications
    newMatches: true,
    newMessages: true,
    likes: false,
    superLikes: true,
    questRewards: true,
    stories: false,
    
    // Email Notifications  
    emailMatches: false,
    emailMessages: false,
    emailUpdates: true,
    
    // Sound & Vibration
    soundEnabled: true,
    vibrationEnabled: true
  });

  const updateSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const pushNotificationOptions = [
    {
      key: 'newMatches' as const,
      title: 'New Matches',
      description: 'Get notified when someone likes you back',
      icon: Heart,
      color: 'text-red-500'
    },
    {
      key: 'newMessages' as const,
      title: 'New Messages',
      description: 'Receive alerts for new chat messages',
      icon: MessageCircle,
      color: 'text-blue-500'
    },
    {
      key: 'likes' as const,
      title: 'Likes',
      description: 'Know when someone likes your profile',
      icon: Heart,
      color: 'text-pink-500'
    },
    {
      key: 'superLikes' as const,
      title: 'Super Likes',
      description: 'Get notified about super likes received',
      icon: Trophy,
      color: 'text-yellow-500'
    },
    {
      key: 'questRewards' as const,
      title: 'Quest Rewards',
      description: 'Alerts for completed quests and rewards',
      icon: Trophy,
      color: 'text-purple-500'
    },
    {
      key: 'stories' as const,
      title: 'Stories',
      description: 'Updates about new stories from matches',
      icon: Camera,
      color: 'text-orange-500'
    }
  ];

  const emailOptions = [
    {
      key: 'emailMatches' as const,
      title: 'Match Updates',
      description: 'Weekly summary of your matches',
      icon: Heart,
      color: 'text-red-500'
    },
    {
      key: 'emailMessages' as const,
      title: 'Message Reminders',
      description: 'Reminders about unread messages',
      icon: MessageCircle,
      color: 'text-blue-500'
    },
    {
      key: 'emailUpdates' as const,
      title: 'App Updates',
      description: 'News about new features and updates',
      icon: Smartphone,
      color: 'text-green-500'
    }
  ];

  return (
    <div className="h-full bg-gradient-to-b from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
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
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl">Notifications</h1>
                <p className="text-white/80 text-sm">Manage your alerts and updates</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6 pb-24 overflow-y-auto">
        {/* Push Notifications */}
        <div>
          <h2 className="text-lg mb-4">Push Notifications</h2>
          <div className="space-y-3">
            {pushNotificationOptions.map((option) => {
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

        {/* Email Notifications */}
        <div>
          <h2 className="text-lg mb-4">Email Notifications</h2>
          <div className="space-y-3">
            {emailOptions.map((option) => {
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

        {/* Sound & Vibration */}
        <div>
          <h2 className="text-lg mb-4">Sound & Vibration</h2>
          <div className="space-y-3">
            <Card className="rounded-2xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-5 h-5 text-blue-500" />
                    <div>
                      <span className="font-medium">Sound</span>
                      <p className="text-sm text-muted-foreground">Play sounds for notifications</p>
                    </div>
                  </div>
                  <Switch 
                    checked={settings.soundEnabled} 
                    onCheckedChange={() => updateSetting('soundEnabled')}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-green-500" />
                    <div>
                      <span className="font-medium">Vibration</span>
                      <p className="text-sm text-muted-foreground">Vibrate device for notifications</p>
                    </div>
                  </div>
                  <Switch 
                    checked={settings.vibrationEnabled} 
                    onCheckedChange={() => updateSetting('vibrationEnabled')}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Notification Tips */}
        <Card className="rounded-2xl bg-muted/30">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-orange-500 mt-0.5" />
              <div>
                <h3 className="font-medium mb-2">Notification Tips</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  You can customize when and how you receive notifications. 
                  Turn off notifications you don't need to reduce distractions while staying connected.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}