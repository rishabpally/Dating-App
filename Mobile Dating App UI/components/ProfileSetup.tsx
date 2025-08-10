import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { 
  Camera, 
  ArrowRight, 
  ArrowLeft, 
  MapPin, 
  Calendar,
  Music,
  Camera as CameraIcon,
  Gamepad2,
  Book,
  Plane,
  Coffee,
  Mountain,
  Palette,
  Heart,
  Users,
  Settings,
  ChevronRight,
  Phone,
  Smartphone,
  X
} from 'lucide-react';

interface ProfileSetupProps {
  onComplete: () => void;
}

const steps = [
  'Photo Upload',
  'Basic Info',
  'Interests',
  'Preferences'
];

const extendedInterests = [
  { icon: Music, label: 'Music', color: 'bg-purple-500' },
  { icon: CameraIcon, label: 'Photography', color: 'bg-pink-500' },
  { icon: Gamepad2, label: 'Video Games', color: 'bg-blue-500' },
  { icon: Book, label: 'Reading', color: 'bg-green-500' },
  { icon: Plane, label: 'Traveling', color: 'bg-orange-500' },
  { icon: Coffee, label: 'Coffee', color: 'bg-amber-500' },
  { icon: Mountain, label: 'Hiking', color: 'bg-emerald-500' },
  { icon: Palette, label: 'Arts & Crafts', color: 'bg-indigo-500' },
  { icon: Heart, label: 'Running', color: 'bg-red-500' },
  { icon: Coffee, label: 'Baking', color: 'bg-yellow-500' },
  { icon: Mountain, label: 'Gardening', color: 'bg-lime-500' },
  { icon: Gamepad2, label: 'Exercise', color: 'bg-cyan-500' },
  { icon: CameraIcon, label: 'Watching TV', color: 'bg-violet-500' },
  { icon: Heart, label: 'Movies', color: 'bg-rose-500' },
  { icon: Users, label: 'Pets', color: 'bg-teal-500' },
  { icon: Gamepad2, label: 'Board Games', color: 'bg-slate-500' },
  { icon: Settings, label: 'Computers', color: 'bg-gray-500' },
  { icon: Users, label: 'Family Time', color: 'bg-pink-400' },
  { icon: Mountain, label: 'Fishing', color: 'bg-blue-400' },
  { icon: Palette, label: 'Painting', color: 'bg-purple-400' },
  { icon: Mountain, label: 'Birding', color: 'bg-green-400' },
  { icon: Coffee, label: 'Cooking', color: 'bg-orange-400' },
  { icon: Music, label: 'Dance', color: 'bg-red-400' },
  { icon: Heart, label: 'Sports', color: 'bg-blue-600' },
  { icon: Mountain, label: 'Outdoor Recreation', color: 'bg-emerald-600' },
  { icon: Mountain, label: 'Hunting', color: 'bg-amber-600' }
];

const pronounOptions = [
  { value: 'he/him', label: 'He/Him' },
  { value: 'she/her', label: 'She/Her' },
  { value: 'they/them', label: 'They/Them' },
  { value: 'other', label: 'Other' }
];

const genderIdentityOptions = ['Man', 'Woman', 'Beyond Binary', 'Custom'];
const sexualOrientationOptions = [
  'Straight', 'Gay', 'Bisexual', 'Asexual', 'Demisexual', 
  'Pansexual', 'Queer', 'Questioning'
];

const verificationMethods = [
  { icon: Phone, label: 'Phone', color: 'bg-green-500' },
  { icon: Settings, label: 'Google', color: 'bg-red-500' },
  { icon: Smartphone, label: 'Apple', color: 'bg-gray-800' },
  { icon: Users, label: 'Facebook', color: 'bg-blue-600' }
];

export default function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    pronouns: '',
    customPronouns: '',
    dateOfBirth: '',
    location: '',
    genderIdentity: [] as string[],
    customGenderIdentity: '',
    sexualOrientation: [] as string[],
    pronounDisplay: [] as string[],
    customPronounDisplay: '',
    showGenderOrientation: true,
    minAge: [18],
    maxAge: [35],
    distance: [50]
  });

  const progress = ((currentStep + 1) / steps.length) * 100;

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleGenderIdentityChange = (option: string) => {
    if (formData.genderIdentity.includes(option)) {
      setFormData({
        ...formData,
        genderIdentity: formData.genderIdentity.filter(item => item !== option)
      });
    } else {
      setFormData({
        ...formData,
        genderIdentity: [...formData.genderIdentity, option]
      });
    }
  };

  const handleSexualOrientationChange = (option: string) => {
    if (formData.sexualOrientation.includes(option)) {
      setFormData({
        ...formData,
        sexualOrientation: formData.sexualOrientation.filter(item => item !== option)
      });
    } else if (formData.sexualOrientation.length < 3) {
      setFormData({
        ...formData,
        sexualOrientation: [...formData.sexualOrientation, option]
      });
    }
  };

  const handlePronounDisplayChange = (option: string) => {
    if (formData.pronounDisplay.includes(option)) {
      setFormData({
        ...formData,
        pronounDisplay: formData.pronounDisplay.filter(item => item !== option)
      });
    } else if (formData.pronounDisplay.length < 4) {
      setFormData({
        ...formData,
        pronounDisplay: [...formData.pronounDisplay, option]
      });
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="h-full bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          {currentStep > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={prevStep}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <span className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
        
        <Progress value={progress} className="h-2 mb-6" />
        
        <h2 className="text-2xl mb-2">
          {steps[currentStep]}
        </h2>
      </div>

      {/* Content */}
      <div className="px-6 flex-1 pb-24 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 0 && (
              <div className="space-y-6">
                <p className="text-muted-foreground mb-8">
                  Add a few photos to show your personality
                </p>
                
                <div className="grid grid-cols-3 gap-4">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <motion.div
                      key={index}
                      whileTap={{ scale: 0.95 }}
                      className="aspect-square rounded-2xl border-2 border-dashed border-muted flex items-center justify-center bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer"
                    >
                      <Camera className="w-8 h-8 text-muted-foreground" />
                    </motion.div>
                  ))}
                </div>
                
                <p className="text-sm text-muted-foreground text-center mt-6">
                  Upload at least 2 photos to continue
                </p>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <p className="text-muted-foreground mb-8">
                  Tell us a bit about yourself
                </p>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter your name"
                      className="rounded-xl mt-1"
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                        placeholder="25"
                        className="rounded-xl mt-1"
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="pronouns">Pronouns</Label>
                      <Select
                        value={formData.pronouns}
                        onValueChange={(value) => setFormData({...formData, pronouns: value})}
                      >
                        <SelectTrigger className="rounded-xl mt-1">
                          <SelectValue placeholder="Select pronouns" />
                        </SelectTrigger>
                        <SelectContent>
                          {pronounOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {formData.pronouns === 'other' && (
                        <Input
                          value={formData.customPronouns}
                          onChange={(e) => setFormData({...formData, customPronouns: e.target.value})}
                          placeholder="Enter custom pronouns"
                          className="rounded-xl mt-2"
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="dob"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                        className="rounded-xl mt-1 pl-10"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      You must be 18 or older to join
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        placeholder="New York, NY"
                        className="rounded-xl mt-1 pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Account Verification</Label>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      {verificationMethods.map((method) => {
                        const Icon = method.icon;
                        return (
                          <motion.button
                            key={method.label}
                            whileTap={{ scale: 0.95 }}
                            className="p-3 rounded-xl border border-muted hover:border-purple-200 transition-colors"
                          >
                            <div className={`w-8 h-8 rounded-lg ${method.color} flex items-center justify-center mb-2 mx-auto`}>
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm">{method.label}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <p className="text-muted-foreground mb-8">
                  What are you interested in? Select at least 5
                </p>
                
                <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                  {extendedInterests.map((interest) => {
                    const isSelected = selectedInterests.includes(interest.label);
                    const Icon = interest.icon;
                    
                    return (
                      <motion.button
                        key={interest.label}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleInterest(interest.label)}
                        className={`p-4 rounded-2xl border-2 transition-all ${
                          isSelected 
                            ? 'border-transparent bg-gradient-to-br from-purple-500/10 to-pink-500/10 shadow-md' 
                            : 'border-muted hover:border-purple-200'
                        }`}
                        style={isSelected ? {
                          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
                          borderImage: 'linear-gradient(135deg, #8B5CF6, #EC4899) 1'
                        } : {}}
                      >
                        <div className={`w-10 h-10 rounded-xl ${interest.color} flex items-center justify-center mb-2 mx-auto`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-sm">{interest.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
                
                <p className="text-sm text-muted-foreground text-center">
                  {selectedInterests.length} selected (minimum 5)
                </p>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <p className="text-muted-foreground mb-8">
                  Set your dating preferences
                </p>
                
                <Card className="p-4 rounded-2xl space-y-4">
                  <button
                    onClick={() => setShowPreferencesModal(true)}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <div className="flex items-center gap-3">
                      <Heart className="w-5 h-5 text-purple-500" />
                      <span>I'm interested in</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-purple-500" />
                          <span>Distance</span>
                        </div>
                        <span className="text-muted-foreground">{formData.distance[0]} miles</span>
                      </div>
                      <Slider
                        value={formData.distance}
                        onValueChange={(value) => setFormData({...formData, distance: value})}
                        max={100}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-purple-500" />
                          <span>Age range</span>
                        </div>
                        <span className="text-muted-foreground">
                          {formData.minAge[0]}-{formData.maxAge[0]}
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm text-muted-foreground">Minimum age: {formData.minAge[0]}</Label>
                          <Slider
                            value={formData.minAge}
                            onValueChange={(value) => {
                              const newMinAge = Math.min(value[0], formData.maxAge[0] - 1);
                              setFormData({...formData, minAge: [newMinAge]});
                            }}
                            max={98}
                            min={18}
                            step={1}
                            className="w-full"
                          />
                        </div>
                        
                        <div>
                          <Label className="text-sm text-muted-foreground">Maximum age: {formData.maxAge[0]}</Label>
                          <Slider
                            value={formData.maxAge}
                            onValueChange={(value) => {
                              const newMaxAge = Math.max(value[0], formData.minAge[0] + 1);
                              setFormData({...formData, maxAge: [Math.min(newMaxAge, 99)]});
                            }}
                            max={99}
                            min={19}
                            step={1}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Next Button */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-background/80 backdrop-blur-sm">
        <Button
          onClick={nextStep}
          className="w-full gradient-primary text-white rounded-2xl h-12"
          disabled={currentStep === 2 && selectedInterests.length < 5}
        >
          {currentStep === steps.length - 1 ? 'Complete Setup' : 'Continue'}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>

      {/* Preferences Modal - Fixed Height */}
      <AnimatePresence>
        {showPreferencesModal && (
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
              className="w-full max-w-sm bg-white dark:bg-card rounded-3xl max-h-[85vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="gradient-primary p-6 text-white rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl">Dating Preferences</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPreferencesModal(false)}
                    className="text-white p-2"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="p-6 space-y-6 overflow-y-auto flex-1">
                {/* Gender Identity */}
                <div>
                  <Label className="text-lg mb-3 block">Gender Identity</Label>
                  <div className="space-y-2">
                    {genderIdentityOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`gender-${option}`}
                          checked={formData.genderIdentity.includes(option)}
                          onCheckedChange={() => handleGenderIdentityChange(option)}
                        />
                        <Label htmlFor={`gender-${option}`}>{option}</Label>
                      </div>
                    ))}
                    {formData.genderIdentity.includes('Custom') && (
                      <Input
                        value={formData.customGenderIdentity}
                        onChange={(e) => setFormData({...formData, customGenderIdentity: e.target.value})}
                        placeholder="Enter custom gender identity"
                        className="rounded-xl mt-2"
                      />
                    )}
                  </div>
                </div>

                {/* Sexual Orientation */}
                <div>
                  <Label className="text-lg mb-3 block">Sexual Orientation (max 3)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {sexualOrientationOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`orientation-${option}`}
                          checked={formData.sexualOrientation.includes(option)}
                          onCheckedChange={() => handleSexualOrientationChange(option)}
                          disabled={!formData.sexualOrientation.includes(option) && formData.sexualOrientation.length >= 3}
                        />
                        <Label htmlFor={`orientation-${option}`} className="text-sm">{option}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pronouns Display */}
                <div>
                  <Label className="text-lg mb-3 block">Pronouns Display (max 4)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {pronounOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`display-${option.value}`}
                          checked={formData.pronounDisplay.includes(option.value)}
                          onCheckedChange={() => handlePronounDisplayChange(option.value)}
                          disabled={!formData.pronounDisplay.includes(option.value) && formData.pronounDisplay.length >= 4}
                        />
                        <Label htmlFor={`display-${option.value}`} className="text-sm">{option.label}</Label>
                      </div>
                    ))}
                    {formData.pronounDisplay.includes('other') && (
                      <Input
                        value={formData.customPronounDisplay}
                        onChange={(e) => setFormData({...formData, customPronounDisplay: e.target.value})}
                        placeholder="Enter custom pronouns"
                        className="rounded-xl mt-2 col-span-2"
                      />
                    )}
                  </div>
                </div>

                {/* Profile Visibility */}
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                  <div>
                    <Label>Show gender and orientation on profile</Label>
                    <p className="text-sm text-muted-foreground">Others can see this information</p>
                  </div>
                  <Switch
                    checked={formData.showGenderOrientation}
                    onCheckedChange={(checked) => setFormData({...formData, showGenderOrientation: checked})}
                  />
                </div>

                {/* Selected Items Summary */}
                <div className="space-y-3">
                  {formData.genderIdentity.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Gender Identity:</p>
                      <div className="flex flex-wrap gap-1">
                        {formData.genderIdentity.map((item) => (
                          <Badge key={item} variant="secondary" className="rounded-full text-xs">
                            {item === 'Custom' ? formData.customGenderIdentity : item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {formData.sexualOrientation.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Sexual Orientation:</p>
                      <div className="flex flex-wrap gap-1">
                        {formData.sexualOrientation.map((item) => (
                          <Badge key={item} variant="secondary" className="rounded-full text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t">
                <Button
                  onClick={() => setShowPreferencesModal(false)}
                  className="w-full gradient-primary text-white rounded-2xl h-12"
                >
                  Save Preferences
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}