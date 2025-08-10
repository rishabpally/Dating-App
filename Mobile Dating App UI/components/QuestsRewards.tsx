import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  Trophy, 
  Heart, 
  MessageCircle, 
  Camera, 
  Zap, 
  Target,
  Gift,
  Star,
  Users,
  Clock,
  CheckCircle,
  Sparkles
} from 'lucide-react';

const dailyQuests = [
  {
    id: 1,
    title: 'Swipe 5 profiles with similar interests',
    description: 'Find people who share your hobbies',
    progress: 3,
    target: 5,
    reward: 'Extra swipes',
    icon: Heart,
    color: 'text-pink-500',
    bgColor: 'bg-pink-50 dark:bg-pink-950/20',
    completed: false
  },
  {
    id: 2,
    title: 'Start 2 conversations',
    description: 'Break the ice with your matches',
    progress: 1,
    target: 2,
    reward: 'Profile boost',
    icon: MessageCircle,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    completed: false
  },
  {
    id: 3,
    title: 'Share a story',
    description: 'Show your personality',
    progress: 1,
    target: 1,
    reward: 'Unlimited likes',
    icon: Camera,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    completed: true
  }
];

const weeklyQuests = [
  {
    id: 4,
    title: 'Get 10 matches this week',
    description: 'Show off your charm',
    progress: 7,
    target: 10,
    reward: 'Super likes pack',
    icon: Users,
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-950/20',
    completed: false
  },
  {
    id: 5,
    title: 'Maintain a 3-day streak',
    description: 'Keep the conversation going',
    progress: 2,
    target: 3,
    reward: 'Premium features',
    icon: Zap,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
    completed: false
  }
];

const rewards = [
  {
    id: 1,
    title: 'Extra Swipes',
    description: '50 additional swipes',
    icon: Heart,
    color: 'gradient-primary',
    available: true
  },
  {
    id: 2,
    title: 'Profile Boost',
    description: '2x visibility for 1 hour',
    icon: Target,
    color: 'gradient-secondary',
    available: true
  },
  {
    id: 3,
    title: 'Unlimited Swipes',
    description: 'Swipe without limits for 24h',
    icon: Zap,
    color: 'bg-gradient-to-r from-purple-500 to-blue-500',
    available: false
  },
  {
    id: 4,
    title: 'Super Likes Pack',
    description: '5 super likes',
    icon: Star,
    color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    available: false
  }
];

export default function QuestsRewards() {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly'>('daily');
  const [selectedReward, setSelectedReward] = useState<number | null>(null);

  const currentQuests = activeTab === 'daily' ? dailyQuests : weeklyQuests;
  const completedQuests = currentQuests.filter(q => q.completed).length;

  const handleClaimReward = (rewardId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedReward(rewardId);
    // Handle claim logic here
  };

  return (
    <div className="h-full bg-gradient-to-b from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
      {/* Header */}
      <div className="px-6 pt-16 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl gradient-secondary flex items-center justify-center">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl">Quests & Rewards</h1>
        </div>
        
        <p className="text-muted-foreground mb-6">
          Complete quests to earn amazing rewards and boost your dating game!
        </p>

        {/* Tab Selector */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === 'daily' ? 'default' : 'outline'}
            onClick={() => setActiveTab('daily')}
            className="flex-1 rounded-2xl gradient-primary text-white"
          >
            Daily Quests
          </Button>
          <Button
            variant={activeTab === 'weekly' ? 'default' : 'outline'}
            onClick={() => setActiveTab('weekly')}
            className="flex-1 rounded-2xl"
          >
            Weekly Quests
          </Button>
        </div>

        {/* Progress Summary */}
        <Card className="rounded-2xl mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium">
                {activeTab === 'daily' ? 'Daily' : 'Weekly'} Progress
              </span>
              <Badge variant="secondary" className="rounded-full">
                {completedQuests}/{currentQuests.length} complete
              </Badge>
            </div>
            <Progress 
              value={(completedQuests / currentQuests.length) * 100} 
              className="h-2"
            />
          </CardContent>
        </Card>
      </div>

      {/* Quest List */}
      <div className="px-6 pb-6 space-y-4">
        {currentQuests.map((quest, index) => {
          const Icon = quest.icon;
          const progressPercent = (quest.progress / quest.target) * 100;

          return (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`rounded-2xl ${quest.completed ? 'bg-green-50 dark:bg-green-950/20 border-green-200' : quest.bgColor}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl ${quest.bgColor} flex items-center justify-center`}>
                      {quest.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Icon className={`w-5 h-5 ${quest.color}`} />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium">{quest.title}</h3>
                        {quest.completed && (
                          <Badge className="bg-green-500 text-white rounded-full">
                            Complete!
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {quest.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex-1 mr-4">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-muted-foreground">Progress</span>
                            <span className="text-sm font-medium">
                              {quest.progress}/{quest.target}
                            </span>
                          </div>
                          <Progress value={progressPercent} className="h-2" />
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                            <Gift className="w-3 h-3" />
                            Reward
                          </div>
                          <span className="text-sm font-medium">{quest.reward}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Rewards Section */}
      <div className="px-6 pb-20">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          <h2 className="text-lg">Available Rewards</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {rewards.map((reward) => {
            const Icon = reward.icon;
            
            return (
              <motion.div
                key={reward.id}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-2xl text-left transition-all cursor-pointer ${
                  reward.available 
                    ? 'bg-white dark:bg-card soft-shadow hover:shadow-md' 
                    : 'bg-muted/50 opacity-60'
                }`}
                onClick={() => reward.available && setSelectedReward(reward.id)}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                  reward.available ? reward.color : 'bg-muted'
                }`}>
                  <Icon className={`w-5 h-5 ${reward.available ? 'text-white' : 'text-muted-foreground'}`} />
                </div>
                
                <h3 className="font-medium mb-1">{reward.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{reward.description}</p>
                
                {reward.available ? (
                  <Button 
                    size="sm" 
                    className="w-full rounded-xl"
                    onClick={(e) => handleClaimReward(reward.id, e)}
                  >
                    Claim
                  </Button>
                ) : (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Coming soon</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}