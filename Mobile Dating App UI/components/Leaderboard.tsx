import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Slider } from './ui/slider';
import { ScrollArea } from './ui/scroll-area';
import { 
  Trophy, 
  Medal, 
  Award, 
  Crown,
  TrendingUp,
  Heart,
  MessageCircle,
  Users,
  Flame,
  ArrowLeft,
  Filter,
  MapPin,
  X,
  Clock
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const leaderboardData = {
  '24h': [
    { rank: 1, user: 'Jordan_M', matches: 12, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', isMe: false },
    { rank: 2, user: 'You', matches: 9, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop', isMe: true },
    { rank: 3, user: 'Alex_K', matches: 8, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b72bb643?w=100&h=100&fit=crop', isMe: false },
    { rank: 4, user: 'Sam_L', matches: 7, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', isMe: false },
    { rank: 5, user: 'Taylor_B', matches: 6, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop', isMe: false },
    { rank: 6, user: 'Casey_W', matches: 5, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop', isMe: false },
    { rank: 7, user: 'Riley_H', matches: 4, avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop', isMe: false },
    { rank: 8, user: 'Morgan_T', matches: 3, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', isMe: false },
    { rank: 9, user: 'Avery_P', matches: 2, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop', isMe: false },
    { rank: 10, user: 'Quinn_R', matches: 1, avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop', isMe: false }
  ],
  week: [
    { rank: 1, user: 'You', matches: 45, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop', isMe: true },
    { rank: 2, user: 'Alex_K', matches: 42, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b72bb643?w=100&h=100&fit=crop', isMe: false },
    { rank: 3, user: 'Jordan_M', matches: 38, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', isMe: false },
    { rank: 4, user: 'Sam_L', matches: 35, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', isMe: false },
    { rank: 5, user: 'Taylor_B', matches: 32, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop', isMe: false },
  ],
  month: [
    { rank: 1, user: 'Alex_K', matches: 180, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b72bb643?w=100&h=100&fit=crop', isMe: false },
    { rank: 2, user: 'Jordan_M', matches: 165, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', isMe: false },
    { rank: 3, user: 'You', matches: 142, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop', isMe: true },
    { rank: 4, user: 'Sam_L', matches: 128, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', isMe: false },
    { rank: 5, user: 'Taylor_B', matches: 115, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop', isMe: false },
  ],
  allTime: [
    { rank: 1, user: 'Jordan_M', matches: 892, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', isMe: false },
    { rank: 2, user: 'Alex_K', matches: 756, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b72bb643?w=100&h=100&fit=crop', isMe: false },
    { rank: 3, user: 'Sam_L', matches: 634, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', isMe: false },
    { rank: 4, user: 'You', matches: 587, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop', isMe: true },
    { rank: 5, user: 'Taylor_B', matches: 523, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop', isMe: false },
  ]
};

const achievements = [
  { icon: Heart, title: 'Match Maker', description: '100+ matches', color: 'text-red-500' },
  { icon: MessageCircle, title: 'Conversationalist', description: '50+ conversations', color: 'text-blue-500' },
  { icon: Flame, title: 'Streak Master', description: '7-day streak', color: 'text-orange-500' },
  { icon: Users, title: 'Popular', description: 'Top 10 this week', color: 'text-purple-500' }
];

interface LeaderboardProps {
  onBack?: () => void;
}

// Generate 100 mock entries with time-based filtering support
const generateLeaderboardData = (type: 'matches' | 'rejections', timeRange: string, count: number = 100) => {
  const names = [
    'Jordan_M', 'Alex_K', 'Sam_L', 'Taylor_B', 'Casey_W', 'Riley_H', 'Morgan_T', 'Avery_P', 'Quinn_R', 'Blake_D',
    'Cameron_S', 'Dakota_F', 'Emery_J', 'Finley_G', 'Harper_L', 'Hayden_C', 'Indigo_V', 'Jesse_B', 'Kai_N', 'Lane_M',
    'Logan_W', 'Marley_R', 'Nova_T', 'Ocean_P', 'Parker_H', 'Reese_K', 'River_S', 'Rowan_D', 'Sage_L', 'Skyler_F',
    'Storm_J', 'Tatum_G', 'Teagan_B', 'Tessa_N', 'Phoenix_M', 'Wren_C', 'Zion_V', 'Scout_R', 'Rain_T', 'Mars_P',
    'Onyx_H', 'Rebel_K', 'Raven_S', 'Atlas_D', 'Echo_L', 'Jett_F', 'Knox_J', 'Vale_G', 'Zara_B', 'Aspen_N'
  ];
  
  const avatars = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1494790108755-2616b72bb643?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'
  ];

  // Adjust base values based on time range
  const timeMultipliers = {
    today: 0.1,
    week: 0.3,
    month: 0.7,
    year: 0.9,
    alltime: 1.0
  };

  const multiplier = timeMultipliers[timeRange as keyof typeof timeMultipliers] || 1.0;

  return Array.from({ length: count }, (_, index) => {
    const baseValue = type === 'matches' ? 500 - index * 4 : 1200 - index * 10;
    const adjustedValue = Math.floor(baseValue * multiplier);
    const randomVariation = Math.floor(Math.random() * 20) - 10;
    
    return {
      rank: index + 1,
      user: index === 1 ? 'You' : names[index % names.length] || `User_${index}`,
      [type]: Math.max(0, adjustedValue + randomVariation),
      distance: Math.floor(Math.random() * 50) + 1, // Increased range to 50 miles
      avatar: avatars[index % avatars.length],
      isMe: index === 1
    };
  }).sort((a, b) => (b[type] as number) - (a[type] as number)); // Sort by count descending
};

export default function Leaderboard({ onBack }: LeaderboardProps) {
  const [leaderboardType, setLeaderboardType] = useState<'matches' | 'rejections'>('matches');
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month' | 'year' | 'alltime'>('week');
  const [proximityRange, setProximityRange] = useState([25]);
  const [showFilters, setShowFilters] = useState(false);

  // Memoize data generation for performance
  const rawLeaderboardData = useMemo(() => 
    generateLeaderboardData(leaderboardType, timeRange, 100), 
    [leaderboardType, timeRange]
  );

  // Filter and re-rank data based on proximity
  const filteredData = useMemo(() => {
    const filtered = rawLeaderboardData.filter(user => user.distance <= proximityRange[0]);
    // Re-assign ranks after filtering
    return filtered.map((user, index) => ({
      ...user,
      rank: index + 1
    }));
  }, [rawLeaderboardData, proximityRange]);

  // Enhanced slider change handler with visual feedback
  const handleProximityChange = useCallback((newValue: number[]) => {
    setProximityRange(newValue);
    // Add subtle haptic feedback simulation via visual cue
    // In a real app, this would trigger navigator.vibrate(50)
  }, []);

  // Generate active filter summary
  const getActiveFilterSummary = useCallback(() => {
    const filters = [];
    
    if (leaderboardType === 'rejections') {
      filters.push('Most Rejected');
    } else {
      filters.push('Most Matched');
    }
    
    if (proximityRange[0] < 50) {
      filters.push(`${proximityRange[0]} miles`);
    }
    
    if (timeRange !== 'alltime') {
      const timeLabels = {
        today: 'Today',
        week: 'This Week', 
        month: 'This Month',
        year: 'This Year',
        alltime: 'All Time'
      };
      filters.push(timeLabels[timeRange]);
    }
    
    return filters;
  }, [leaderboardType, proximityRange, timeRange]);

  const activeFilters = getActiveFilterSummary();
  const hasActiveFilters = activeFilters.length > 1 || leaderboardType === 'rejections' || proximityRange[0] < 50 || timeRange !== 'alltime';

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBackground = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600';
      default:
        return 'bg-muted';
    }
  };

  const myRank = filteredData.find(item => item.isMe);

  return (
    <div className="h-full bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
      {/* Header */}
      <div className="px-6 pt-16 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="p-2 -ml-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl gradient-text">Leaderboard</h1>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="rounded-full"
            >
              <Filter className="w-4 h-4 mr-1" />
              Filters
            </Button>
            
            {/* Active Filters Indicator */}
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full"
              >
                <span className="text-xs text-purple-700 dark:text-purple-300">
                  {activeFilters.join(' • ')}
                </span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Filters Section */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-white/50 dark:bg-card/50 rounded-2xl space-y-4"
          >
            {/* Type Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Type</label>
              <div className="flex gap-2">
                <Button
                  variant={leaderboardType === 'matches' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setLeaderboardType('matches')}
                  className="rounded-full flex-1"
                >
                  <Heart className="w-4 h-4 mr-1" />
                  Most Matched
                </Button>
                <Button
                  variant={leaderboardType === 'rejections' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setLeaderboardType('rejections')}
                  className="rounded-full flex-1"
                >
                  <X className="w-4 h-4 mr-1" />
                  Most Rejected
                </Button>
              </div>
            </div>

            {/* Enhanced Proximity Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                <MapPin className="w-4 h-4 inline mr-1" />
                Proximity: <span className="font-bold text-purple-600 dark:text-purple-400">{proximityRange[0]} miles</span>
              </label>
              <div className="relative">
                <Slider
                  value={proximityRange}
                  onValueChange={handleProximityChange}
                  max={50}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1 mile</span>
                  <span>50 miles</span>
                </div>
              </div>
            </div>

            {/* Time Range Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Time Range</label>
              <div className="flex gap-2 overflow-x-auto">
                {[
                  { value: 'today', label: 'Today' },
                  { value: 'week', label: 'This Week' },
                  { value: 'month', label: 'This Month' },
                  { value: 'year', label: 'This Year' },
                  { value: 'alltime', label: 'All Time' }
                ].map((option) => (
                  <Button
                    key={option.value}
                    variant={timeRange === option.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTimeRange(option.value as any)}
                    className="rounded-full whitespace-nowrap"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* My Rank Card */}
        {myRank && (
          <Card className="rounded-2xl gradient-primary text-white mb-4">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30">
                  <ImageWithFallback
                    src={myRank.avatar}
                    alt="You"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {getRankIcon(myRank.rank)}
                    <span className="font-medium">Your Rank</span>
                  </div>
                  <p className="text-white/80 text-sm">
                    {myRank[leaderboardType]} {leaderboardType}
                  </p>
                </div>
                <div className="text-right">
                  <TrendingUp className="w-5 h-5 ml-auto mb-1" />
                  <p className="text-xs text-white/80">+3 from yesterday</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Leaderboard List */}
      <div className="px-6 flex-1">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Rankings</h2>
          <Badge variant="secondary" className="rounded-full">
            {filteredData.length} users
          </Badge>
        </div>
        
        <ScrollArea className="h-full pb-20">
          <motion.div 
            layout 
            className="space-y-2"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {filteredData.map((item, index) => (
              <motion.div
                key={`${item.user}-${item.rank}`}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ 
                  delay: Math.min(index * 0.01, 0.3), // Cap delay for performance
                  duration: 0.2,
                  layout: { duration: 0.3 }
                }}
              >
                <Card className={`rounded-2xl transition-all duration-200 ${
                  item.isMe ? 'border-purple-200 bg-purple-50/50 dark:bg-purple-950/20 shadow-md' : 'hover:shadow-sm'
                }`}>
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      {/* Rank */}
                      <motion.div 
                        layout
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${getRankBackground(item.rank)}`}
                      >
                        {item.rank <= 3 ? (
                          getRankIcon(item.rank)
                        ) : (
                          <span className="text-xs font-bold text-white">
                            {item.rank}
                          </span>
                        )}
                      </motion.div>

                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <ImageWithFallback
                          src={item.avatar}
                          alt={item.user}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* User Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{item.user}</span>
                          {item.isMe && (
                            <Badge variant="secondary" className="rounded-full text-xs gradient-primary text-white">
                              You
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{item.distance} miles</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            {leaderboardType === 'matches' ? (
                              <Heart className="w-3 h-3 text-red-500" />
                            ) : (
                              <X className="w-3 h-3 text-muted-foreground" />
                            )}
                            <span>{item[leaderboardType]}</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span className="capitalize">{timeRange === 'alltime' ? 'all time' : timeRange}</span>
                          </div>
                        </div>
                      </div>

                      {/* Count */}
                      <div className="text-right">
                        <motion.div 
                          layout
                          className="flex items-center gap-1"
                        >
                          <span className="font-bold text-lg gradient-text">{item[leaderboardType]}</span>
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            
            {/* Empty State */}
            {filteredData.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No users found</h3>
                <p className="text-muted-foreground text-sm">
                  Try adjusting your filters to see more results
                </p>
              </motion.div>
            )}
          </motion.div>
        </ScrollArea>
      </div>


    </div>
  );
}