import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Heart, Sparkles, Sun, Moon } from 'lucide-react';

interface WelcomeScreenProps {
  onNext: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function WelcomeScreen({ onNext, isDarkMode, onToggleDarkMode }: WelcomeScreenProps) {
  return (
    <div className="h-full relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-primary opacity-90" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-8 text-white/20"
        >
          <Heart className="w-12 h-12" />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-40 right-12 text-white/20"
        >
          <Sparkles className="w-8 h-8" />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            x: [0, 5, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-40 left-12 text-white/20"
        >
          <Heart className="w-6 h-6" />
        </motion.div>
      </div>

      {/* Dark Mode Toggle */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={onToggleDarkMode}
        className="absolute top-8 right-6 z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm"
      >
        {isDarkMode ? (
          <Sun className="w-5 h-5 text-white" />
        ) : (
          <Moon className="w-5 h-5 text-white" />
        )}
      </motion.button>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center p-6 text-white">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            delay: 0.2,
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
          className="mb-8"
        >
          <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Heart className="w-12 h-12 text-white fill-white" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-4"
        >
          <h1 className="text-4xl mb-2 text-white">Spark</h1>
          <p className="text-white/80 text-lg">Find your perfect match</p>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-white/70 text-center mb-12 max-w-xs"
        >
          Discover meaningful connections with people who share your interests and values
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="w-full max-w-xs space-y-4"
        >
          <Button
            onClick={onNext}
            className="w-full bg-white text-purple-600 hover:bg-white/90 rounded-2xl h-12 font-medium shadow-lg"
          >
            Create Account
          </Button>
          
          <Button
            variant="outline"
            className="w-full bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-2xl h-12 font-medium"
          >
            Login
          </Button>
        </motion.div>

        {/* Terms */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-white/50 text-sm text-center mt-8 max-w-xs"
        >
          By continuing, you agree to our Terms of Service and Privacy Policy
        </motion.p>
      </div>
    </div>
  );
}