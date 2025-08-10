import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  Link as LinkIcon, 
  Check, 
  X,
  ExternalLink,
  Instagram,
  Facebook,
  Twitter,
  Music
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ConnectedAccountsScreenProps {
  onBack: () => void;
}

interface SocialAccount {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  connected: boolean;
  username?: string;
  connectedDate?: string;
}

export default function ConnectedAccountsScreen({ onBack }: ConnectedAccountsScreenProps) {
  const [accounts, setAccounts] = useState<SocialAccount[]>([
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <Instagram className="w-5 h-5" />,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      connected: true,
      username: '@your_username',
      connectedDate: 'Connected 2 weeks ago'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5" />,
      color: 'bg-blue-600',
      connected: false
    },
    {
      id: 'snapchat',
      name: 'Snapchat',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.405.042-3.441.219-.937 1.404-5.965 1.404-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.688 0 1.029-.654 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.146-1.378l.584-2.329c.214-.852.775-1.927.775-2.833 0-.654-.179-1.125-.551-1.125-.437 0-.788.451-.788 1.053 0 .975.324 1.851.324 2.825 0 1.015-.465 1.507-1.415 1.507z"/>
        </svg>
      ),
      color: 'bg-yellow-400',
      connected: false
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      color: 'bg-blue-400',
      connected: true,
      username: '@your_handle',
      connectedDate: 'Connected 1 month ago'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: <Music className="w-5 h-5" />,
      color: 'bg-black dark:bg-white',
      connected: false
    }
  ]);

  const [connectingAccount, setConnectingAccount] = useState<string | null>(null);

  const handleConnect = async (accountId: string) => {
    setConnectingAccount(accountId);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate occasional failure
      if (Math.random() < 0.2) {
        throw new Error('Failed to connect account');
      }

      setAccounts(prev => prev.map(account => 
        account.id === accountId 
          ? {
              ...account,
              connected: true,
              username: `@your_${account.name.toLowerCase()}`,
              connectedDate: 'Just connected'
            }
          : account
      ));

      const accountName = accounts.find(acc => acc.id === accountId)?.name;
      toast.success(`${accountName} connected successfully!`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to connect account');
    } finally {
      setConnectingAccount(null);
    }
  };

  const handleDisconnect = async (accountId: string) => {
    setConnectingAccount(accountId);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setAccounts(prev => prev.map(account => 
        account.id === accountId 
          ? {
              ...account,
              connected: false,
              username: undefined,
              connectedDate: undefined
            }
          : account
      ));

      const accountName = accounts.find(acc => acc.id === accountId)?.name;
      toast.success(`${accountName} disconnected successfully!`);
    } catch (error) {
      toast.error('Failed to disconnect account');
    } finally {
      setConnectingAccount(null);
    }
  };

  const connectedCount = accounts.filter(account => account.connected).length;

  return (
    <div className="h-full bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
      {/* Header */}
      <div className="px-6 pt-16 pb-6">
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2 -ml-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center">
            <LinkIcon className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl gradient-text">Connected Accounts</h1>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            Link your social accounts to enhance your profile
          </p>
          <Badge variant="secondary" className="rounded-full">
            {connectedCount}/{accounts.length} connected
          </Badge>
        </div>
      </div>

      {/* Connected Accounts Summary */}
      {connectedCount > 0 && (
        <div className="px-6 mb-6">
          <Card className="rounded-2xl gradient-primary text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">Profile Enhanced</h3>
                  <p className="text-white/80 text-sm">
                    {connectedCount} social account{connectedCount > 1 ? 's' : ''} connected
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Accounts List */}
      <div className="px-6 pb-6">
        <div className="space-y-3">
          {accounts.map((account) => (
            <motion.div
              key={account.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <Card className={`rounded-2xl transition-all duration-200 ${
                account.connected 
                  ? 'border-green-200 bg-green-50/50 dark:bg-green-950/20 dark:border-green-800' 
                  : ''
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Platform Icon */}
                    <div className={`w-12 h-12 rounded-2xl ${account.color} flex items-center justify-center text-white`}>
                      {account.icon}
                    </div>

                    {/* Platform Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{account.name}</h3>
                        {account.connected && (
                          <div className="flex items-center gap-1">
                            <Check className="w-4 h-4 text-green-500" />
                            <Badge 
                              variant="secondary" 
                              className="rounded-full text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            >
                              Connected
                            </Badge>
                          </div>
                        )}
                      </div>
                      {account.connected ? (
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-green-600 dark:text-green-400">
                            {account.username}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {account.connectedDate}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Connect to show photos and interests
                        </p>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="flex flex-col gap-2">
                      {account.connected ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDisconnect(account.id)}
                            disabled={connectingAccount === account.id}
                            className="rounded-full text-xs"
                          >
                            {connectingAccount === account.id ? 'Disconnecting...' : 'Disconnect'}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-full text-xs p-1 h-auto"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleConnect(account.id)}
                          disabled={connectingAccount === account.id}
                          className="rounded-full gradient-primary text-white"
                        >
                          {connectingAccount === account.id ? 'Connecting...' : 'Connect'}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Loading Overlay */}
              <AnimatePresence>
                {connectingAccount === account.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/50 dark:bg-black/50 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                  >
                    <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Info Card */}
        <Card className="rounded-2xl mt-6 border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <LinkIcon className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-1">
                  Why Connect Accounts?
                </h4>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Connected accounts help verify your identity and show more about your interests and lifestyle. This can lead to better matches!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}