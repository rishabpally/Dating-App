import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { 
  Settings, 
  Edit, 
  Sun, 
  Moon,
  MapPin,
  Briefcase,
  GraduationCap,
  ChevronRight,
  X,
  Save,
  Shield,
  Bell,
  UserX,
  LogOut,
  Camera,
  Plus,
  Trash2,
  Search
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { interests, stats, storyHighlights } from './data/profileData';

interface ProfilePageProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenSettings: () => void;
}

// Extended interests for the add interest modal
const allInterests = [
  ...interests,
  { icon: Plus, label: 'Gaming', color: 'bg-blue-600' },
  { icon: Plus, label: 'Yoga', color: 'bg-purple-400' },
  { icon: Plus, label: 'Swimming', color: 'bg-cyan-500' },
  { icon: Plus, label: 'Writing', color: 'bg-orange-600' },
  { icon: Plus, label: 'Meditation', color: 'bg-teal-500' },
  { icon: Plus, label: 'Cycling', color: 'bg-green-600' },
  { icon: Plus, label: 'Theater', color: 'bg-red-600' },
  { icon: Plus, label: 'Volunteering', color: 'bg-pink-600' }
];

export default function ProfilePage({ isDarkMode, onToggleDarkMode, onOpenSettings }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showAddInterestModal, setShowAddInterestModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editData, setEditData] = useState({
    name: 'You',
    bio: 'Coffee enthusiast ☕ Love exploring the city and trying new restaurants. Always up for an adventure or a good conversation!',
    location: 'New York, NY',
    job: 'Product Designer at TechCorp',
    school: 'NYU Graduate',
    selectedInterests: ['Music', 'Photography', 'Coffee', 'Hiking', 'Art', 'Reading'],
    highlights: [...storyHighlights]
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save the data to your backend
  };

  const toggleInterest = (interestLabel: string) => {
    if (editData.selectedInterests.includes(interestLabel)) {
      setEditData({
        ...editData,
        selectedInterests: editData.selectedInterests.filter(i => i !== interestLabel)
      });
    } else {
      setEditData({
        ...editData,
        selectedInterests: [...editData.selectedInterests, interestLabel]
      });
    }
  };

  const addInterest = (interestLabel: string) => {
    if (!editData.selectedInterests.includes(interestLabel)) {
      setEditData({
        ...editData,
        selectedInterests: [...editData.selectedInterests, interestLabel]
      });
    }
    setShowAddInterestModal(false);
    setSearchQuery('');
  };

  const addHighlight = () => {
    const newHighlight = `Highlight ${editData.highlights.length + 1}`;
    setEditData({
      ...editData,
      highlights: [...editData.highlights, newHighlight]
    });
  };

  const removeHighlight = (index: number) => {
    setEditData({
      ...editData,
      highlights: editData.highlights.filter((_, i) => i !== index)
    });
  };

  const availableInterests = allInterests.filter(interest => 
    !editData.selectedInterests.includes(interest.label) &&
    interest.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
      {/* Header */}
      <div className="relative">
        {/* Cover gradient */}
        <div className="h-32 gradient-primary relative">
          <div className="absolute inset-0 bg-black/10" />
        </div>
        
        {/* Profile Picture */}
        <div className="absolute top-16 left-6">
          <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-white dark:border-card card-shadow relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop"
              alt="Profile"
              className="w-full h-full object-cover"
            />
            {isEditing && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-20 right-6 flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={onOpenSettings}
            className="bg-white/90 text-purple-600 hover:bg-white rounded-2xl p-2"
          >
            <Settings className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="bg-white/90 text-purple-600 hover:bg-white rounded-2xl"
          >
            {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
            {isEditing ? 'Save' : 'Edit'}
          </Button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="px-6 pt-16 pb-6 overflow-y-auto">
        <div className="mb-6">
          {/* Name */}
          {isEditing ? (
            <Input
              value={editData.name}
              onChange={(e) => setEditData({...editData, name: e.target.value})}
              className="text-2xl font-medium border-none bg-transparent p-0 mb-1"
              placeholder="Your name"
            />
          ) : (
            <h1 className="text-2xl mb-1">{editData.name}</h1>
          )}
          
          <div className="flex items-center gap-4 text-muted-foreground mb-2">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {isEditing ? (
                <Input
                  value={editData.location}
                  onChange={(e) => setEditData({...editData, location: e.target.value})}
                  className="text-sm border-none bg-transparent p-0 w-32"
                  placeholder="Location"
                />
              ) : (
                <span className="text-sm">{editData.location}</span>
              )}
            </div>
            <span className="text-sm">25</span>
          </div>
          
          {/* Bio */}
          {isEditing ? (
            <Textarea
              value={editData.bio}
              onChange={(e) => setEditData({...editData, bio: e.target.value})}
              className="text-sm leading-relaxed mb-4 border-muted resize-none"
              placeholder="Tell people about yourself..."
              rows={3}
            />
          ) : (
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {editData.bio}
            </p>
          )}

          {/* Quick Info */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <Briefcase className="w-4 h-4 text-purple-500" />
              {isEditing ? (
                <Input
                  value={editData.job}
                  onChange={(e) => setEditData({...editData, job: e.target.value})}
                  className="border-none bg-transparent p-0 flex-1"
                  placeholder="Job title"
                />
              ) : (
                <span>{editData.job}</span>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <GraduationCap className="w-4 h-4 text-purple-500" />
              {isEditing ? (
                <Input
                  value={editData.school}
                  onChange={(e) => setEditData({...editData, school: e.target.value})}
                  className="border-none bg-transparent p-0 flex-1"
                  placeholder="Education"
                />
              ) : (
                <span>{editData.school}</span>
              )}
            </div>
          </div>

          {/* Interests */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Interests</h3>
              {editData.selectedInterests.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  {editData.selectedInterests.length} selected
                </span>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {editData.selectedInterests.map((interestLabel) => {
                const interest = interests.find(i => i.label === interestLabel);
                const Icon = interest?.icon || Plus;
                return (
                  <motion.div
                    key={interestLabel}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative"
                  >
                    <Badge variant="secondary" className="rounded-full px-3 py-1 pr-8">
                      <Icon className="w-3 h-3 mr-1" />
                      {interestLabel}
                    </Badge>
                    {isEditing && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleInterest(interestLabel)}
                        className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    )}
                  </motion.div>
                );
              })}
              
              {/* Add Interest Button */}
              {(isEditing || editData.selectedInterests.length === 0) && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddInterestModal(true)}
                  className="px-3 py-1 rounded-full border-2 border-dashed border-muted hover:border-purple-200 transition-colors flex items-center gap-1 text-sm text-muted-foreground hover:text-purple-600"
                >
                  <Plus className="w-3 h-3" />
                  Add Interest
                </motion.button>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <Card className="rounded-2xl mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center">
                    <div className={`w-10 h-10 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-2 ${stat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="font-medium">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Story Highlights */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Story Highlights</h3>
            {isEditing && (
              <Button
                size="sm"
                variant="ghost"
                onClick={addHighlight}
                className="p-1"
              >
                <Plus className="w-4 h-4" />
              </Button>
            )}
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {editData.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center gap-2 min-w-0 relative"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border-2 border-dashed border-purple-200 dark:border-purple-700 flex items-center justify-center relative">
                  <span className="text-2xl">
                    {index === 0 ? '🌍' : index === 1 ? '🍕' : index === 2 ? '🎨' : '👥'}
                  </span>
                  {isEditing && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeHighlight(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 p-0 bg-red-500 text-white rounded-full"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  )}
                </div>
                <span className="text-xs text-center">{highlight}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Settings Preview (when not editing) */}
        {!isEditing && (
          <div className="space-y-3 mb-6">
            <h3 className="font-medium">Quick Settings</h3>
            
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
                        {isDarkMode ? 'Dark theme enabled' : 'Light theme enabled'}
                      </p>
                    </div>
                  </div>
                  <Switch checked={isDarkMode} onCheckedChange={onToggleDarkMode} />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Add Interest Modal */}
      <AnimatePresence>
        {showAddInterestModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm bg-white dark:bg-card rounded-3xl max-h-[80vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="gradient-primary p-6 text-white rounded-t-3xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl">Add Interest</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowAddInterestModal(false);
                      setSearchQuery('');
                    }}
                    className="text-white p-2"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                  <Input
                    placeholder="Search interests..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60 rounded-xl"
                  />
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto flex-1">
                <div className="grid grid-cols-2 gap-3">
                  {availableInterests.map((interest) => {
                    const Icon = interest.icon;
                    return (
                      <motion.button
                        key={interest.label}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addInterest(interest.label)}
                        className="p-4 rounded-2xl border border-muted hover:border-purple-200 transition-colors text-center"
                      >
                        <div className={`w-10 h-10 rounded-xl ${interest.color} flex items-center justify-center mb-2 mx-auto`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-sm">{interest.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
                
                {availableInterests.length === 0 && (
                  <div className="text-center py-8">
                    <Plus className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {searchQuery ? 'No interests found matching your search.' : 'No more interests available.'}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}