import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { 
  ArrowLeft,
  UserX,
  Search,
  Unlock,
  AlertTriangle
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BlockedUsersSettingsProps {
  onBack: () => void;
}

const blockedUsers = [
  {
    id: '1',
    name: 'John Smith',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    blockedDate: '2 weeks ago'
  },
  {
    id: '2', 
    name: 'Sarah Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b72bb643?w=100&h=100&fit=crop',
    blockedDate: '1 month ago'
  },
  {
    id: '3',
    name: 'Mike Johnson', 
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    blockedDate: '3 months ago'
  }
];

export default function BlockedUsersSettings({ onBack }: BlockedUsersSettingsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState(blockedUsers);

  const handleUnblock = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full bg-gradient-to-b from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
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
                <UserX className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl">Blocked Users</h1>
                <p className="text-white/80 text-sm">Manage users you have blocked</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6 pb-24">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search blocked users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-2xl bg-muted/50"
          />
        </div>

        {/* Blocked Users List */}
        <div>
          <h2 className="text-lg mb-4">
            Blocked Users ({filteredUsers.length})
          </h2>
          
          {filteredUsers.length > 0 ? (
            <div className="space-y-3">
              {filteredUsers.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="rounded-2xl">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-muted relative">
                            <ImageWithFallback
                              src={user.avatar}
                              alt={user.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <UserX className="w-5 h-5 text-white" />
                            </div>
                          </div>
                          <div>
                            <span className="font-medium">{user.name}</span>
                            <p className="text-sm text-muted-foreground">
                              Blocked {user.blockedDate}
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUnblock(user.id)}
                          className="rounded-xl text-green-600 border-green-200 hover:bg-green-50"
                        >
                          <Unlock className="w-4 h-4 mr-2" />
                          Unblock
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                <UserX className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg mb-2">
                {searchQuery ? 'No users found' : 'No blocked users'}
              </h3>
              <p className="text-muted-foreground max-w-xs mx-auto">
                {searchQuery 
                  ? 'Try adjusting your search to find the user you\'re looking for.'
                  : 'Users you block will appear here. You can unblock them at any time.'
                }
              </p>
            </div>
          )}
        </div>

        {/* Information */}
        <Card className="rounded-2xl bg-muted/30">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
              <div>
                <h3 className="font-medium mb-2">About Blocking</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  When you block someone, they won't be able to see your profile, send you messages, 
                  or appear in your recommendations. You can unblock users at any time from this page.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}