import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  ArrowLeft, 
  Send, 
  Smile, 
  Image as ImageIcon, 
  Heart,
  Sparkles,
  Flame,
  MoreVertical,
  Phone,
  Video
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ChatWindowProps {
  chatId: string | null;
  onBack: () => void;
}

const chatData: Record<string, any> = {
  '1': {
    name: 'Alex',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b72bb643?w=100&h=100&fit=crop',
    isMatch: true,
    streak: 3,
    messages: [
      { id: 1, text: 'Hey! Thanks for the match 😊', sender: 'other', timestamp: '2:30 PM', reactions: [] },
      { id: 2, text: 'Hi Alex! Nice to meet you', sender: 'me', timestamp: '2:32 PM', reactions: [] },
      { id: 3, text: 'I love your photos! That hiking one is amazing', sender: 'other', timestamp: '2:35 PM', reactions: ['❤️'] },
      { id: 4, text: 'Thanks! That was from my trip to Yosemite last month', sender: 'me', timestamp: '2:36 PM', reactions: [] },
      { id: 5, text: 'No way! I was just there in June. Which trail did you take?', sender: 'other', timestamp: '2:40 PM', reactions: [] }
    ]
  },
  '3': {
    name: 'Sam',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    isMatch: false,
    streak: 0,
    messages: [
      { id: 1, text: 'We both said no... wanna talk about it?', sender: 'system', timestamp: '1:15 PM', reactions: [] },
      { id: 2, text: 'Haha this is interesting! Why did you swipe left on me?', sender: 'other', timestamp: '1:16 PM', reactions: ['😂'] },
      { id: 3, text: 'Honestly? I thought you looked too good to be true 😅', sender: 'me', timestamp: '1:18 PM', reactions: [] },
      { id: 4, text: 'That\'s actually really sweet! I swiped left because I was being picky about distance', sender: 'other', timestamp: '1:20 PM', reactions: [] }
    ]
  }
};

export default function ChatWindow({ chatId, onBack }: ChatWindowProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const chat = chatId ? chatData[chatId] : null;

  useEffect(() => {
    if (chat) {
      setMessages(chat.messages);
    }
  }, [chat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!chat) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-muted-foreground">Select a conversation</p>
      </div>
    );
  }

  const sendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reactions: []
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const addReaction = (messageId: number, emoji: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId 
        ? { ...msg, reactions: [...msg.reactions, emoji] }
        : msg
    ));
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className={`px-4 py-3 border-b border-border ${
        chat.isMatch 
          ? 'bg-gradient-to-r from-green-500/10 to-blue-500/10' 
          : 'bg-gradient-to-r from-red-500/10 to-orange-500/10'
      }`}>
        <div className="flex items-center justify-between pt-8">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <ImageWithFallback
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1">
                  {chat.isMatch ? (
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <Heart className="w-2.5 h-2.5 text-white fill-white" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h2 className="font-medium">{chat.name}</h2>
                {chat.streak > 0 && (
                  <div className="flex items-center gap-1">
                    <Flame className="w-3 h-3 text-orange-500" />
                    <span className="text-xs text-orange-500">Streak: {chat.streak} Days</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="p-2">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Video className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {!chat.isMatch && (
          <div className="mt-3 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-xl">
            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Confidence Clash</span>
            </div>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 py-4 space-y-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex ${
              msg.sender === 'me' ? 'justify-end' : 
              msg.sender === 'system' ? 'justify-center' : 'justify-start'
            }`}
          >
            {msg.sender === 'system' ? (
              <div className="bg-muted/50 rounded-2xl px-4 py-2 max-w-xs text-center">
                <p className="text-sm text-muted-foreground">{msg.text}</p>
              </div>
            ) : (
              <div className="max-w-xs">
                <div className={`rounded-2xl px-4 py-2 ${
                  msg.sender === 'me'
                    ? 'gradient-primary text-white'
                    : 'bg-muted text-foreground'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
                
                <div className="flex items-center gap-2 mt-1 px-2">
                  <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                  {msg.reactions.length > 0 && (
                    <div className="flex gap-1">
                      {msg.reactions.map((reaction, idx) => (
                        <span key={idx} className="text-xs">{reaction}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick Reactions */}
                {msg.sender === 'other' && (
                  <div className="flex gap-1 mt-2">
                    {['❤️', '😂', '👍', '😮'].map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => addReaction(msg.id, emoji)}
                        className="text-xs opacity-50 hover:opacity-100 transition-opacity"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-border bg-background">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="p-2 shrink-0">
            <ImageIcon className="w-5 h-5" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="rounded-2xl pr-12 bg-muted/50"
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2"
            >
              <Smile className="w-4 h-4" />
            </Button>
          </div>
          
          <Button
            onClick={sendMessage}
            className={`p-3 rounded-full ${
              chat.isMatch 
                ? 'gradient-primary' 
                : 'bg-gradient-to-r from-red-500 to-orange-500'
            } text-white`}
            disabled={!message.trim()}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}