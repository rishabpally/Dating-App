import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  X, 
  Heart, 
  Star, 
  RotateCcw, 
  MapPin, 
  Briefcase, 
  GraduationCap,
  Music,
  Camera,
  Coffee,
  Trophy
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SwipeDeckProps {
  onMatch: (type: 'normal' | 'reverse') => void;
  onOpenLeaderboard?: () => void;
}

const profiles = [
  {
    id: '1',
    name: 'Alex',
    age: 24,
    distance: '2 miles away',
    images: [
      'https://images.unsplash.com/photo-1494790108755-2616b72bb643?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop'
    ],
    bio: 'Love hiking and coffee dates ☕ Looking for someone to explore the city with!',
    interests: ['Coffee', 'Photography', 'Travel'],
    occupation: 'Graphic Designer',
    education: 'Art Institute'
  },
  {
    id: '2',
    name: 'Jordan',
    age: 26,
    distance: '5 miles away',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop'
    ],
    bio: 'Musician by night, software engineer by day 🎵 Always up for concerts and good food!',
    interests: ['Music', 'Gaming', 'Cooking'],
    occupation: 'Software Engineer',
    education: 'Stanford University'
  },
  {
    id: '3',
    name: 'Sam',
    age: 23,
    distance: '1 mile away',
    images: [
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop'
    ],
    bio: 'Adventure seeker 🏔️ Love trying new restaurants and weekend getaways',
    interests: ['Hiking', 'Food', 'Photography'],
    occupation: 'Marketing Manager',
    education: 'UCLA'
  }
];

export default function SwipeDeck({ onMatch, onOpenLeaderboard }: SwipeDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipesLeft] = useState(25);
  const [imageIndex, setImageIndex] = useState(0);
  
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 100;
    
    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0) {
        // Swiped right (like)
        onMatch('normal');
      } else {
        // Swiped left (pass)
        // Small chance for reverse match
        if (Math.random() < 0.2) {
          setTimeout(() => onMatch('reverse'), 500);
        }
      }
      
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        x.set(0);
        setImageIndex(0);
      }, 300);
    } else {
      x.set(0);
    }
  };

  const handleAction = (action: 'pass' | 'like' | 'superlike') => {
    if (action === 'like') {
      onMatch('normal');
    } else if (action === 'pass' && Math.random() < 0.2) {
      setTimeout(() => onMatch('reverse'), 500);
    }
    
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      x.set(0);
      setImageIndex(0);
    }, 300);
  };

  const currentProfile = profiles[currentIndex % profiles.length];

  const nextImage = () => {
    setImageIndex((prev) => (prev + 1) % currentProfile.images.length);
  };

  const prevImage = () => {
    setImageIndex((prev) => (prev - 1 + currentProfile.images.length) % currentProfile.images.length);
  };

  return (
    <div className="h-full bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 relative">
      {/* Header */}
      <div className="px-6 pt-16 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl gradient-text">Discover</h1>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="rounded-full">
              {swipesLeft} swipes left
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenLeaderboard}
              className="rounded-full gradient-primary text-white border-0 shadow-sm hover:shadow-md transition-all"
            >
              <Trophy className="w-4 h-4 mr-1" />
              Leaderboard
            </Button>
          </div>
        </div>
      </div>

      {/* Card Stack */}
      <div className="relative flex-1 px-6 pb-32">
        {currentIndex < profiles.length ? (
          <motion.div
            className="relative w-full h-full max-h-[600px] rounded-3xl overflow-hidden card-shadow cursor-grab active:cursor-grabbing"
            style={{ x, rotate, opacity }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 1.05 }}
          >
            {/* Image */}
            <div className="relative h-3/5 bg-gray-200">
              <ImageWithFallback
                src={currentProfile.images[imageIndex]}
                alt={currentProfile.name}
                className="w-full h-full object-cover"
              />
              
              {/* Image Navigation */}
              <div className="absolute inset-0 flex">
                <button
                  onClick={prevImage}
                  className="flex-1 bg-transparent"
                  disabled={imageIndex === 0}
                />
                <button
                  onClick={nextImage}
                  className="flex-1 bg-transparent"
                  disabled={imageIndex === currentProfile.images.length - 1}
                />
              </div>

              {/* Image Indicators */}
              <div className="absolute top-4 left-4 right-4 flex gap-2">
                {currentProfile.images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`flex-1 h-1 rounded-full ${
                      idx === imageIndex ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>

              {/* Swipe Indicators */}
              <motion.div
                className="absolute top-16 left-8 bg-red-500 text-white px-4 py-2 rounded-xl rotate-12 opacity-0"
                style={{
                  opacity: useTransform(x, [-100, -50, 0], [1, 0, 0])
                }}
              >
                NOPE
              </motion.div>
              
              <motion.div
                className="absolute top-16 right-8 bg-green-500 text-white px-4 py-2 rounded-xl -rotate-12 opacity-0"
                style={{
                  opacity: useTransform(x, [0, 50, 100], [0, 0, 1])
                }}
              >
                LIKE
              </motion.div>
            </div>

            {/* Profile Info */}
            <div className="h-2/5 bg-white dark:bg-card p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xl">{currentProfile.name}, {currentProfile.age}</h3>
                  <div className="flex items-center text-muted-foreground text-sm mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {currentProfile.distance}
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                {currentProfile.bio}
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="w-4 h-4 text-purple-500" />
                  <span>{currentProfile.occupation}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="w-4 h-4 text-purple-500" />
                  <span>{currentProfile.education}</span>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {currentProfile.interests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="rounded-full text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl mb-2">No more profiles</h3>
              <p className="text-muted-foreground">Come back later for more matches!</p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {currentIndex < profiles.length && (
        <div className="absolute bottom-20 left-0 right-0 px-6">
          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleAction('pass')}
              className="w-14 h-14 rounded-full border-2 border-red-200 text-red-500 hover:bg-red-50 dark:border-red-800 dark:text-red-400"
            >
              <X className="w-6 h-6" />
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              className="w-10 h-10 rounded-full border-2 border-yellow-200 text-yellow-600 hover:bg-yellow-50"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>

            <Button
              size="lg"
              onClick={() => handleAction('superlike')}
              className="w-14 h-14 rounded-full gradient-secondary text-white shadow-lg"
            >
              <Star className="w-6 h-6" />
            </Button>

            <Button
              size="lg"
              onClick={() => handleAction('like')}
              className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg"
            >
              <Heart className="w-7 h-7" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}