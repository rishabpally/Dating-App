import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Edit,
  Save,
  Camera,
  Trash2,
  Lock,
  Link,
  Download
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AccountSettingsProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export default function AccountSettings({ onBack, onNavigate }: AccountSettingsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [accountData, setAccountData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1998-03-15',
    location: 'New York, NY'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save the data to your backend
  };

  const accountActions = [
    {
      title: 'Change Password',
      description: 'Update your account password',
      icon: Lock,
      color: 'text-blue-500',
      action: () => onNavigate('change-password')
    },
    {
      title: 'Connected Accounts',
      description: 'Manage linked social media accounts',
      icon: Link,
      color: 'text-purple-500',
      action: () => onNavigate('connected-accounts')
    },
    {
      title: 'Download My Data',
      description: 'Request a copy of your data',
      icon: Download,
      color: 'text-green-500',
      action: () => onNavigate('download-data')
    }
  ];

  return (
    <div className="h-full bg-gradient-to-b from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
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
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl">Account Settings</h1>
                <p className="text-white/80 text-sm">Manage your account information</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6 pb-24 overflow-y-auto">
        {/* Profile Picture */}
        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  size="sm"
                  className="absolute -bottom-1 -right-1 w-8 h-8 p-0 rounded-full"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex-1">
                <h3 className="font-medium mb-1">Profile Picture</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  This photo will be displayed on your profile
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="rounded-xl">
                    Change Photo
                  </Button>
                  <Button size="sm" variant="ghost" className="rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg">Personal Information</h2>
            <Button
              size="sm"
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              className="rounded-xl"
            >
              {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
              {isEditing ? 'Save' : 'Edit'}
            </Button>
          </div>
          
          <Card className="rounded-2xl">
            <CardContent className="p-6 space-y-4">
              <div>
                <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-blue-500" />
                  Full Name
                </Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={accountData.name}
                    onChange={(e) => setAccountData({...accountData, name: e.target.value})}
                    className="rounded-xl"
                  />
                ) : (
                  <p className="text-muted-foreground">{accountData.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4 text-green-500" />
                  Email Address
                </Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={accountData.email}
                    onChange={(e) => setAccountData({...accountData, email: e.target.value})}
                    className="rounded-xl"
                  />
                ) : (
                  <p className="text-muted-foreground">{accountData.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4 text-orange-500" />
                  Phone Number
                </Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    type="tel"
                    value={accountData.phone}
                    onChange={(e) => setAccountData({...accountData, phone: e.target.value})}
                    className="rounded-xl"
                  />
                ) : (
                  <p className="text-muted-foreground">{accountData.phone}</p>
                )}
              </div>

              <div>
                <Label htmlFor="dob" className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  Date of Birth
                </Label>
                {isEditing ? (
                  <Input
                    id="dob"
                    type="date"
                    value={accountData.dateOfBirth}
                    onChange={(e) => setAccountData({...accountData, dateOfBirth: e.target.value})}
                    className="rounded-xl"
                  />
                ) : (
                  <p className="text-muted-foreground">
                    {new Date(accountData.dateOfBirth).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="location" className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-red-500" />
                  Location
                </Label>
                {isEditing ? (
                  <Input
                    id="location"
                    value={accountData.location}
                    onChange={(e) => setAccountData({...accountData, location: e.target.value})}
                    className="rounded-xl"
                  />
                ) : (
                  <p className="text-muted-foreground">{accountData.location}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Actions */}
        <div>
          <h2 className="text-lg mb-4">Account Actions</h2>
          <div className="space-y-3">
            {accountActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={index}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="rounded-2xl">
                    <CardContent className="p-4">
                      <button 
                        onClick={action.action}
                        className="flex items-center justify-between w-full text-left"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 ${action.color}`} />
                          <div>
                            <span className="font-medium">{action.title}</span>
                            <p className="text-sm text-muted-foreground">{action.description}</p>
                          </div>
                        </div>
                        <ArrowLeft className="w-5 h-5 text-muted-foreground rotate-180" />
                      </button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Delete Account */}
        <Card className="rounded-2xl border-red-200 dark:border-red-800">
          <CardContent className="p-4">
            <button className="flex items-center justify-between w-full text-left">
              <div className="flex items-center gap-3">
                <Trash2 className="w-5 h-5 text-red-500" />
                <div>
                  <span className="font-medium text-red-600 dark:text-red-400">Delete Account</span>
                  <p className="text-sm text-red-500/70">Permanently delete your account and all data</p>
                </div>
              </div>
              <ArrowLeft className="w-5 h-5 text-red-400 rotate-180" />
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}