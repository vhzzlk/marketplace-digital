import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, AlertTriangle } from 'lucide-react';

interface UrgencyTimerProps {
  endTime: string | Date;
  title?: string;
  urgent?: boolean;
  onExpire?: () => void;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

const UrgencyTimer: React.FC<UrgencyTimerProps> = ({
  endTime,
  title = "Oferta especial termina em:",
  urgent = false,
  onExpire
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0, total: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const targetTime = new Date(endTime).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance <= 0) {
        setIsExpired(true);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, total: 0 });
        if (onExpire) onExpire();
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds, total: distance });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [endTime, onExpire]);

  const isVeryUrgent = timeLeft.total < 300000; // Less than 5 minutes
  const isUrgent = timeLeft.total < 900000; // Less than 15 minutes
  
  const getUrgencyColor = () => {
    if (isVeryUrgent) return 'from-red-600 to-orange-500';
    if (isUrgent) return 'from-orange-500 to-red-500';
    return 'from-blue-500 to-purple-500';
  };

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  if (isExpired) {
    return (
      <motion.div 
        className="bg-gradient-to-r from-gray-500 to-gray-700 text-white p-4 rounded-lg text-center"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1, repeat: 3 }}
      >
        <div className="flex items-center justify-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-gray-300" />
          <span className="font-bold">Oferta Expirada</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={`bg-gradient-to-r ${getUrgencyColor()} p-4 rounded-lg backdrop-blur-sm border border-white/30`}
      animate={isVeryUrgent ? { 
        scale: [1, 1.02, 1],
        boxShadow: [
          '0 0 0 0 rgba(239, 68, 68, 0.4)',
          '0 0 0 10px rgba(239, 68, 68, 0)',
          '0 0 0 0 rgba(239, 68, 68, 0)'
        ]
      } : {}}
      transition={{ duration: 1, repeat: isVeryUrgent ? Infinity : 0 }}
    >
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          {isVeryUrgent ? <Zap className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
          <span className="font-bold text-white">
            {isVeryUrgent ? '⚡ ÚLTIMA CHANCE!' : title}
          </span>
        </div>
        
        <div className="font-mono text-2xl font-bold text-white mb-2">
          {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-2 mb-2">
          <motion.div
            className="h-2 rounded-full bg-white"
            initial={{ width: '100%' }}
            animate={{ width: `${Math.max(0, Math.min(100, (timeLeft.total / (24 * 60 * 60 * 1000)) * 100))}%` }}
            transition={{ duration: 1, ease: 'linear' }}
          />
        </div>
        
        <div className="text-xs text-white/80">
          {isVeryUrgent ? 'Não perca esta oportunidade!' : 'Aproveite enquanto dura!'}
        </div>
      </div>
    </motion.div>
  );
};

export default UrgencyTimer;