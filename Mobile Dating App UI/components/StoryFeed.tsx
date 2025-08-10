import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Dialog, DialogContent } from './ui/dialog';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Heart, 
  Laugh, 
  Angry, 
  Meh, 
  MessageCircle,
  Send,
  Plus,
  Camera,
  Mic,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const stories = [
  {
    id: '1',
    user: 'Alex',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b72bb643?w=100&h=100&fit=crop',
    stories: [
      {
        id: '1-1',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=700&fit=crop',
        timestamp: '2h',
        viewed: false
      },
      {
        id: '1-2', 
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=700&fit=crop',
        timestamp: '1h',
        viewed: false
      }
    ]
  },
  {
    id: '2',
    user: 'Jordan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    stories: [
      {
        id: '2-1',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=700&fit=crop',
        timestamp: '3h',
        viewed: true
      }
    ]
  },
  {
    id: '3',
    user: 'Sam',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    stories: [
      {
        id: '3-1',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=700&fit=crop',
        timestamp: '4h',
        viewed: false
      }
    ]
  }
];

const reactions = [
  { icon: Heart, label: 'Love', color: 'text-red-500' },
  { icon: Laugh, label: 'Haha', color: 'text-yellow-500' },
  { icon: Angry, label: 'Wow', color: 'text-blue-500' },
  { icon: Meh, label: 'Meh', color: 'text-gray-500' },
  { icon: MessageCircle, label: 'Reply', color: 'text-purple-500' }
];

const permissionSteps = [
  {
    id: 'camera',
    icon: Camera,
    title: 'Camera Access',
    description: 'Allow access to camera to take photos and videos for your stories',
    required: true
  },
  {
    id: 'microphone',
    icon: Mic,
    title: 'Microphone Access',
    description: 'Allow access to microphone to record videos with sound',
    required: false
  },
  {
    id: 'photos',
    icon: ImageIcon,
    title: 'Photo Library Access',
    description: 'Allow access to your photo library to share existing photos',
    required: false
  }
];

export default function StoryFeed() {
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showReactions, setShowReactions] = useState(false);
  const [showCreateFlow, setShowCreateFlow] = useState(false);
  const [currentPermissionStep, setCurrentPermissionStep] = useState(0);
  const [permissions, setPermissions] = useState({
    camera: null as boolean | null,
    microphone: null as boolean | null,
    photos: null as boolean | null
  });
  const [showCreationOptions, setShowCreationOptions] = useState(false);

  const openStory = (userStory: any) => {
    setSelectedStory(userStory);
    setCurrentStoryIndex(0);
    setProgress(0);
  };

  const closeStory = () => {
    setSelectedStory(null);
    setCurrentStoryIndex(0);
    setProgress(0);
    setShowReactions(false);
  };

  const nextStory = () => {
    if (selectedStory && currentStoryIndex < selectedStory.stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setProgress(0);
    } else {
      // Find next user with stories
      const currentUserIndex = stories.findIndex(s => s.id === selectedStory?.id);
      if (currentUserIndex < stories.length - 1) {
        openStory(stories[currentUserIndex + 1]);
      } else {
        closeStory();
      }
    }
  };

  const prevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      setProgress(0);
    } else {
      // Find previous user with stories
      const currentUserIndex = stories.findIndex(s => s.id === selectedStory?.id);
      if (currentUserIndex > 0) {
        const prevUser = stories[currentUserIndex - 1];
        setSelectedStory(prevUser);
        setCurrentStoryIndex(prevUser.stories.length - 1);
        setProgress(0);
      }
    }
  };

  const handleCreateStory = () => {
    setShowCreateFlow(true);
    setCurrentPermissionStep(0);
  };

  const handlePermissionResponse = (allowed: boolean) => {
    const currentPermission = permissionSteps[currentPermissionStep];
    setPermissions(prev => ({
      ...prev,
      [currentPermission.id]: allowed
    }));

    if (currentPermissionStep < permissionSteps.length - 1) {
      setCurrentPermissionStep(currentPermissionStep + 1);
    } else {
      // All permissions handled, show creation options
      setShowCreationOptions(true);
    }
  };

  const resetCreateFlow = () => {
    setShowCreateFlow(false);
    setShowCreationOptions(false);
    setCurrentPermissionStep(0);
    setPermissions({
      camera: null,
      microphone: null,
      photos: null
    });
  };

  React.useEffect(() => {
    if (selectedStory) {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            nextStory();
            return 0;
          }
          return prev + 2;
        });
      }, 100);

      return () => clearInterval(timer);
    }
  }, [selectedStory, currentStoryIndex]);

  return (
    <div className="h-full bg-background">
      {/* Story Circles */}
      <div className="px-6 pt-16 pb-4">
        <h1 className="text-2xl mb-4">Stories</h1>
        
        <div className="flex gap-4 overflow-x-auto pb-4">
          {/* Create Story Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleCreateStory}
            className="flex flex-col items-center gap-2 min-w-0"
          >
            <div className="w-16 h-16 rounded-full p-0.5 gradient-primary">
              <div className="w-full h-full rounded-full bg-white dark:bg-card flex items-center justify-center">
                <Plus className="w-8 h-8 text-purple-500" />
              </div>
            </div>
            <span className="text-xs text-center">Create</span>
          </motion.button>

          {/* Existing Stories */}
          {stories.map((userStory) => {
            const hasUnviewed = userStory.stories.some(s => !s.viewed);
            
            return (
              <motion.button
                key={userStory.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => openStory(userStory)}
                className="flex flex-col items-center gap-2 min-w-0"
              >
                <div className={`w-16 h-16 rounded-full p-0.5 ${
                  hasUnviewed ? 'gradient-primary' : 'bg-gray-200'
                }`}>
                  <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-card">
                    <ImageWithFallback
                      src={userStory.avatar}
                      alt={userStory.user}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <span className="text-xs text-center">{userStory.user}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Story Grid View */}
      <div className="px-6 pb-20">
        <div className="grid grid-cols-2 gap-3">
          {stories.map((userStory) =>
            userStory.stories.map((story, index) => (
              <motion.button
                key={story.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedStory(userStory);
                  setCurrentStoryIndex(index);
                  setProgress(0);
                }}
                className="aspect-[3/4] rounded-2xl overflow-hidden relative"
              >
                <ImageWithFallback
                  src={story.image}
                  alt={`${userStory.user}'s story`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden">
                      <ImageWithFallback
                        src={userStory.avatar}
                        alt={userStory.user}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-white text-xs">{userStory.user}</span>
                    <span className="text-white/70 text-xs ml-auto">{story.timestamp}</span>
                  </div>
                </div>
                {!story.viewed && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-purple-500 rounded-full border-2 border-white" />
                )}
              </motion.button>
            ))
          )}
        </div>
      </div>

      {/* Story Viewer Modal */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            <div className="w-full h-full max-w-sm max-h-screen relative flex flex-col">
              {/* Progress Bars */}
              <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
                {selectedStory.stories.map((_: any, index: number) => (
                  <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-100"
                      style={{
                        width: index < currentStoryIndex ? '100%' :
                               index === currentStoryIndex ? `${progress}%` : '0%'
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Header */}
              <div className="absolute top-12 left-4 right-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <ImageWithFallback
                      src={selectedStory.avatar}
                      alt={selectedStory.user}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-white font-medium">{selectedStory.user}</span>
                  <span className="text-white/70 text-sm">
                    {selectedStory.stories[currentStoryIndex]?.timestamp}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeStory}
                  className="text-white p-2"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Story Content Container */}
              <div className="flex-1 relative overflow-hidden">
                <div className="w-full h-full relative">
                  <ImageWithFallback
                    src={selectedStory.stories[currentStoryIndex]?.image}
                    alt="Story"
                    className="w-full h-full object-contain"
                  />

                  {/* Navigation Areas */}
                  <button
                    onClick={prevStory}
                    className="absolute left-0 top-0 w-1/3 h-full bg-transparent z-10"
                  />
                  <button
                    onClick={nextStory}
                    className="absolute right-0 top-0 w-1/3 h-full bg-transparent z-10"
                  />
                </div>
              </div>

              {/* Reactions Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <AnimatePresence>
                  {showReactions ? (
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 50, opacity: 0 }}
                      className="flex items-center justify-around mb-4"
                    >
                      {reactions.map((reaction, index) => {
                        const Icon = reaction.icon;
                        return (
                          <motion.button
                            key={reaction.label}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex flex-col items-center gap-1 p-3 rounded-2xl bg-white/20 backdrop-blur-sm ${reaction.color}`}
                            onClick={() => setShowReactions(false)}
                          >
                            <Icon className="w-6 h-6" />
                            <span className="text-xs text-white">{reaction.label}</span>
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  ) : (
                    <motion.button
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      onClick={() => setShowReactions(!showReactions)}
                      className="w-full bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-white text-center"
                    >
                      React to story
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Story Flow - Permission Modals */}
      <AnimatePresence>
        {showCreateFlow && !showCreationOptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-card rounded-3xl p-8 mx-4 max-w-sm w-full"
            >
              {currentPermissionStep < permissionSteps.length && (
                <>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                      {React.createElement(permissionSteps[currentPermissionStep].icon, {
                        className: "w-8 h-8 text-white"
                      })}
                    </div>
                    <h3 className="text-xl mb-2">
                      {permissionSteps[currentPermissionStep].title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {permissionSteps[currentPermissionStep].description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={() => handlePermissionResponse(true)}
                      className="w-full gradient-primary text-white rounded-2xl h-12"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Allow
                    </Button>
                    <Button
                      onClick={() => handlePermissionResponse(false)}
                      variant="outline"
                      className="w-full rounded-2xl h-12"
                    >
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Don't Allow
                    </Button>
                  </div>

                  <div className="flex justify-center mt-6">
                    <Progress 
                      value={((currentPermissionStep + 1) / permissionSteps.length) * 100} 
                      className="w-24 h-1"
                    />
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Story Options */}
      <AnimatePresence>
        {showCreationOptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="w-full bg-white dark:bg-card rounded-t-3xl p-6"
            >
              <div className="gradient-primary rounded-2xl p-6 text-white mb-6">
                <h3 className="text-xl mb-2">Create Your Story</h3>
                <p className="text-white/80">Choose how you want to create your story</p>
              </div>

              <div className="space-y-4 mb-6">
                {permissions.camera && (
                  <Button
                    className="w-full h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    onClick={resetCreateFlow}
                  >
                    <Camera className="w-6 h-6 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">Take Photo/Video</p>
                      <p className="text-sm text-white/80">Use camera to capture new content</p>
                    </div>
                  </Button>
                )}

                {permissions.photos && (
                  <Button
                    className="w-full h-16 rounded-2xl bg-gradient-to-r from-green-500 to-teal-500 text-white"
                    onClick={resetCreateFlow}
                  >
                    <ImageIcon className="w-6 h-6 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">Select from Gallery</p>
                      <p className="text-sm text-white/80">Choose from existing photos</p>
                    </div>
                  </Button>
                )}
              </div>

              <Button
                variant="outline"
                onClick={resetCreateFlow}
                className="w-full rounded-2xl h-12"
              >
                Cancel
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}