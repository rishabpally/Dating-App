import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Heart, MessageCircle, Gamepad2, Sparkles, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchType: 'normal' | 'reverse';
  onStartChat: () => void;
}

const ConfettiPiece = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: -100, x: 0, rotate: 0 }}
    animate={{ 
      opacity: [0, 1, 1, 0],
      y: [0, 200, 400, 600],
      x: [0, Math.random() * 100 - 50],
      rotate: [0, 180, 360, 540]
    }}
    transition={{
      duration: 3,
      delay,
      ease: "easeOut"
    }}
    className="absolute w-3 h-3 rounded-full"
    style={{
      background: `hsl(${Math.random() * 360}, 70%, 60%)`,
      left: `${Math.random() * 100}%`,
      top: 0
    }}
  />
);

export default function MatchModal({ isOpen, onClose, matchType, onStartChat }: MatchModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm p-0 border-0 bg-transparent shadow-none">
        {/* Hidden accessibility elements */}
        <DialogTitle className="sr-only">
          {matchType === 'normal' ? 'New Match!' : 'Confidence Clash!'}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {matchType === 'normal' 
            ? 'You and another user have liked each other. Choose to start chatting or continue swiping.'
            : 'You both initially said no but can still connect. Choose to start chatting or pass.'
          }
        </DialogDescription>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative"
        >
          {/* Confetti */}
          {showConfetti && matchType === 'normal' && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 30 }).map((_, i) => (
                <ConfettiPiece key={i} delay={i * 0.1} />
              ))}
            </div>
          )}

          {/* Modal Content */}
          <div className="bg-white dark:bg-card rounded-3xl p-8 text-center soft-shadow relative overflow-hidden">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 p-0 rounded-full"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </Button>

            {matchType === 'normal' ? (
              <>
                {/* Match Images */}
                <div className="flex items-center justify-center gap-4 mb-6 relative">
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-20 h-20 rounded-full overflow-hidden border-4 border-pink-200"
                  >
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop"
                      alt="You"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="absolute z-10"
                  >
                    <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white fill-white" />
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-20 h-20 rounded-full overflow-hidden border-4 border-purple-200"
                  >
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1494790108755-2616b72bb643?w=200&h=200&fit=crop"
                      alt="Match"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <h2 className="text-2xl mb-2 gradient-text">It's a Match!</h2>
                  <p className="text-muted-foreground mb-6">
                    You and Alex liked each other
                  </p>
                  
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={onClose}
                      className="flex-1 rounded-2xl"
                    >
                      Keep Swiping
                    </Button>
                    <Button
                      onClick={onStartChat}
                      className="flex-1 gradient-primary text-white rounded-2xl"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Say Hello
                    </Button>
                  </div>
                </motion.div>
              </>
            ) : (
              <>
                {/* Reverse Match */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="mb-6"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  
                  <h2 className="text-2xl mb-2">Confidence Clash!</h2>
                  <p className="text-muted-foreground mb-6">
                    You both said no... want to talk about it? 🔥
                  </p>
                  
                  <div className="bg-red-50 dark:bg-red-950/20 rounded-2xl p-4 mb-6">
                    <p className="text-sm text-red-600 dark:text-red-400">
                      "We both said no... wanna talk about it?"
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={onClose}
                      className="flex-1 rounded-2xl"
                    >
                      Maybe Not
                    </Button>
                    <Button
                      onClick={onStartChat}
                      className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl"
                    >
                      <Gamepad2 className="w-4 h-4 mr-2" />
                      Let's Chat
                    </Button>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}