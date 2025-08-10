import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Switch } from './ui/switch';
import { 
  ArrowLeft,
  Settings, 
  Shield, 
  Bell, 
  UserX, 
  LogOut,
  Sun, 
  Moon,
  ChevronRight,
  User,
  Smartphone
} from 'lucide-react';

interface SettingsPageProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onBack: () => void;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

const settingsMenuItems = [
  { 
    key: 'privacy-settings',
    label: 'Privacy', 
    icon: Shield, 
    description: 'Control who can see your profile and manage your visibility',
    color: 'text-green-500'
  },
  { 
    key: 'account-settings',
    label: 'Account', 
    icon: User, 
    description: 'Manage your account settings and personal information',
    color: 'text-blue-500'
  },
  { 
    key: 'notification-settings',
    label: 'Notifications', 
    icon: Bell, 
    description: 'Control your alerts, messages, and push notifications',
    color: 'text-orange-500'
  },
  { 
    key: 'blocked-users',
    label: 'Blocked Users', 
    icon: UserX, 
    description: 'View and manage profiles you have blocked',
    color: 'text-red-500'
  }
];

export default function SettingsPage({ 
  isDarkMode, 
  onToggleDarkMode, 
  onBack, 
  onNavigate, 
  onLogout 
}: SettingsPageProps) {
  return (
    <div className="h-full bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
      {/* Header */}
      <div className="gradient-primary text-white">
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
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl">Settings</h1>
                <p className="text-white/80 text-sm">Manage your app preferences</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6 pb-24">
        {/* App Preferences */}
        <div>
          <h2 className="text-lg mb-4">App Preferences</h2>
          
          {/* Dark Mode Toggle */}
          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isDarkMode ? (
                    <Moon className="w-5 h-5 text-purple-500" />
                  ) : (
                    <Sun className="w-5 h-5 text-yellow-500" />
                  )}
                  <div>
                    <span className="font-medium">Dark Mode</span>
                    <p className="text-sm text-muted-foreground">
                      Switch between light and dark themes
                    </p>
                  </div>
                </div>
                <Switch checked={isDarkMode} onCheckedChange={onToggleDarkMode} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Settings */}
        <div>
          <h2 className="text-lg mb-4">Account & Privacy</h2>
          <div className="space-y-3">
            {settingsMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.key}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="rounded-2xl">
                    <CardContent className="p-4">
                      <button 
                        onClick={() => onNavigate(item.key)}
                        className="flex items-center justify-between w-full text-left"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 ${item.color}`} />
                          <div>
                            <span className="font-medium">{item.label}</span>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* App Information */}
        <div>
          <h2 className="text-lg mb-4">App Information</h2>
          
          <div className="space-y-3">
            <Card className="rounded-2xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-purple-500" />
                    <div>
                      <span className="font-medium">App Version</span>
                      <p className="text-sm text-muted-foreground">Version 1.0.0</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-4">
                <button className="flex items-center justify-between w-full text-left">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-blue-500" />
                    <div>
                      <span className="font-medium">Help & Support</span>
                      <p className="text-sm text-muted-foreground">Get help or contact support</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-4">
                <button className="flex items-center justify-between w-full text-left">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-green-500" />
                    <div>
                      <span className="font-medium">Terms & Privacy</span>
                      <p className="text-sm text-muted-foreground">Read our terms and privacy policy</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Logout */}
        <div>
          <motion.div whileTap={{ scale: 0.98 }}>
            <Card className="rounded-2xl border-red-200 dark:border-red-800">
              <CardContent className="p-4">
                <button 
                  onClick={onLogout}
                  className="flex items-center justify-between w-full text-left"
                >
                  <div className="flex items-center gap-3">
                    <LogOut className="w-5 h-5 text-red-500" />
                    <div>
                      <span className="font-medium text-red-600 dark:text-red-400">Log Out</span>
                      <p className="text-sm text-red-500/70">Sign out of your account</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-red-400" />
                </button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}