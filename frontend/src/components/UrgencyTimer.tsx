import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, AlertTriangle } from 'lucide-react';

interface UrgencyTimerProps {
  endTime: string | Date;
  title?: string;
  urgent?: boolean;
  onExpire?: () => void;
<<<<<<< HEAD
=======
  className?: string;
>>>>>>> f73d985fb2c11ca1b8aeb6510f4465ea32fd8f9c
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
<<<<<<< HEAD
  onExpire
=======
  onExpire,
  className = ""
>>>>>>> f73d985fb2c11ca1b8aeb6510f4465ea32fd8f9c
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
<<<<<<< HEAD
    if (isVeryUrgent) return 'from-red-600 to-orange-500';
    if (isUrgent) return 'from-orange-500 to-red-500';
    return 'from-blue-500 to-purple-500';
=======
    if (isVeryUrgent) return 'from-red-600 via-red-500 to-orange-500';
    if (isUrgent) return 'from-orange-500 via-yellow-500 to-red-500';
    return 'from-blue-500 via-purple-500 to-pink-500';
  };

  const getTextColor = () => {
    if (isVeryUrgent) return 'text-red-100';
    if (isUrgent) return 'text-orange-100';
    return 'text-blue-100';
>>>>>>> f73d985fb2c11ca1b8aeb6510f4465ea32fd8f9c
  };

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  if (isExpired) {
    return (
      <motion.div 
<<<<<<< HEAD
        className="bg-gradient-to-r from-gray-500 to-gray-700 text-white p-4 rounded-lg text-center"
=======
        className={`bg-gradient-to-r from-gray-500 to-gray-700 text-white 
                   p-4 rounded-lg text-center ${className}`}
>>>>>>> f73d985fb2c11ca1b8aeb6510f4465ea32fd8f9c
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
<<<<<<< HEAD
      className={`bg-gradient-to-r ${getUrgencyColor()} p-4 rounded-lg backdrop-blur-sm border border-white/30`}
=======
      className={`bg-gradient-to-r ${getUrgencyColor()} p-4 rounded-lg 
                 backdrop-blur-sm border-2 border-white/30 ${className}`}
>>>>>>> f73d985fb2c11ca1b8aeb6510f4465ea32fd8f9c
      animate={isVeryUrgent ? { 
        scale: [1, 1.02, 1],
        boxShadow: [
          '0 0 0 0 rgba(239, 68, 68, 0.4)',
          '0 0 0 10px rgba(239, 68, 68, 0)',
          '0 0 0 0 rgba(239, 68, 68, 0)'
        ]
      } : {}}
<<<<<<< HEAD
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
=======
      transition={isVeryUrgent ? { 
        duration: 1.5, 
        repeat: Infinity,
        ease: "easeInOut"
      } : {}}
    >
      {/* Title */}
      <div className="flex items-center justify-center space-x-2 mb-3">
        {isVeryUrgent ? (
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <Zap className={`w-5 h-5 ${getTextColor()}`} />
          </motion.div>
        ) : (
          <Clock className={`w-5 h-5 ${getTextColor()}`} />
        )}
        <span className={`font-bold text-sm ${getTextColor()}`}>
          {isVeryUrgent ? "⚡ ÚLTIMA CHANCE!" : title}
        </span>
      </div>

      {/* Timer Display */}
      <div className="flex items-center justify-center space-x-2">
        {/* Hours */}
        {timeLeft.hours > 0 && (
          <>
            <motion.div 
              className="bg-black/30 backdrop-blur-sm rounded-lg p-2 min-w-[50px] text-center"
              animate={isVeryUrgent ? { scale: [1, 1.1, 1] } : {}}
              transition={isVeryUrgent ? { duration: 1, repeat: Infinity } : {}}
            >
              <div className={`text-2xl font-bold ${getTextColor()}`}>
                {formatNumber(timeLeft.hours)}
              </div>
              <div className={`text-xs ${getTextColor()} opacity-80`}>
                HRS
              </div>
            </motion.div>
            <span className={`text-xl font-bold ${getTextColor()}`}>:</span>
          </>
        )}

        {/* Minutes */}
        <motion.div 
          className="bg-black/30 backdrop-blur-sm rounded-lg p-2 min-w-[50px] text-center"
          animate={isVeryUrgent ? { scale: [1, 1.1, 1] } : {}}
          transition={isVeryUrgent ? { duration: 1, repeat: Infinity, delay: 0.2 } : {}}
        >
          <div className={`text-2xl font-bold ${getTextColor()}`}>
            {formatNumber(timeLeft.minutes)}
          </div>
          <div className={`text-xs ${getTextColor()} opacity-80`}>
            MIN
          </div>
        </motion.div>

        <span className={`text-xl font-bold ${getTextColor()}`}>:</span>

        {/* Seconds */}
        <motion.div 
          className="bg-black/30 backdrop-blur-sm rounded-lg p-2 min-w-[50px] text-center"
          animate={isVeryUrgent ? { 
            scale: [1, 1.15, 1],
            backgroundColor: ['rgba(0,0,0,0.3)', 'rgba(255,255,255,0.2)', 'rgba(0,0,0,0.3)']
          } : {}}
          transition={isVeryUrgent ? { duration: 1, repeat: Infinity, delay: 0.4 } : {}}
        >
          <div className={`text-2xl font-bold ${getTextColor()}`}>
            {formatNumber(timeLeft.seconds)}
          </div>
          <div className={`text-xs ${getTextColor()} opacity-80`}>
            SEG
          </div>
        </motion.div>
      </div>

      {/* Urgency Message */}
      {isVeryUrgent && (
        <motion.div 
          className="text-center mt-3"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <span className="text-white text-xs font-bold bg-red-600/50 px-2 py-1 rounded-full">
            🔥 APENAS ALGUNS MINUTOS RESTANTES!
          </span>
        </motion.div>
      )}

      {/* Progress Bar */}
      <div className="mt-3 bg-black/20 rounded-full h-2 overflow-hidden">
        <motion.div
          className={`h-full ${isVeryUrgent ? 'bg-red-400' : isUrgent ? 'bg-orange-400' : 'bg-blue-400'}`}
          initial={{ width: '100%' }}
          animate={{ 
            width: `${Math.max(0, (timeLeft.total / (24 * 60 * 60 * 1000)) * 100)}%` 
          }}
          transition={{ duration: 0.5 }}
        />
>>>>>>> f73d985fb2c11ca1b8aeb6510f4465ea32fd8f9c
      </div>
    </motion.div>
  );
};

export default UrgencyTimer;