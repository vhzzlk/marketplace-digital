import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, 
  Clock, 
  Users, 
  ShoppingCart, 
  Star,
  AlertTriangle,
  TrendingUp,
  Eye,
  X
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const UrgencyNotifications: React.FC = () => {
  const { state, actions } = useApp();
  const [visibleNotifications, setVisibleNotifications] = useState<string[]>([]);

  // Simulate real-time notifications
  useEffect(() => {
    const notifications = [
      {
        type: 'purchase' as const,
        message: '🔥 Ana acabou de comprar "Cyber Burger Deluxe"!',
        duration: 6000,
      },
      {
        type: 'stock' as const,
        message: '⚠️ Apenas 3 unidades restantes do "Pizza Suprema"!',
        duration: 8000,
      },
      {
        type: 'activity' as const,
        message: '👀 12 pessoas estão vendo este produto agora',
        duration: 5000,
      },
      {
        type: 'offer' as const,
        message: '⚡ Oferta especial expira em 15 minutos!',
        duration: 7000,
      },
      {
        type: 'purchase' as const,
        message: '🎉 Carlos ganhou 150 pontos na última compra!',
        duration: 5000,
      },
    ];

    const showRandomNotification = () => {
      if (state.isNotificationsPaused) return;
      
      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
      actions.showNotification(randomNotification);
    };

    // Show first notification after 3 seconds
    const initialTimeout = setTimeout(showRandomNotification, 3000);
    
    // Then show notifications every 8-15 seconds
    const interval = setInterval(() => {
      showRandomNotification();
    }, Math.random() * 7000 + 8000); // 8-15 seconds

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [actions, state.isNotificationsPaused]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'purchase':
        return <ShoppingCart className="w-4 h-4" />;
      case 'stock':
        return <AlertTriangle className="w-4 h-4" />;
      case 'activity':
        return <Eye className="w-4 h-4" />;
      case 'offer':
        return <Flame className="w-4 h-4" />;
      default:
        return <TrendingUp className="w-4 h-4" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'purchase':
        return 'from-green-500 to-emerald-600';
      case 'stock':
        return 'from-red-500 to-orange-600';
      case 'activity':
        return 'from-blue-500 to-cyan-600';
      case 'offer':
        return 'from-purple-500 to-pink-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {state.notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
            className={`bg-gradient-to-r ${getColor(notification.type)} 
                       text-white p-3 rounded-lg shadow-lg backdrop-blur-sm
                       border border-white/20 relative overflow-hidden group
                       cursor-pointer hover:scale-105 transition-transform`}
            onClick={() => actions.dispatch({ type: 'REMOVE_NOTIFICATION', payload: notification.id })}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent 
                           opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Pulsing border animation */}
            <div className="absolute inset-0 border-2 border-white/30 rounded-lg
                           animate-pulse" />
            
            <div className="flex items-start space-x-3 relative z-10">
              <div className="flex-shrink-0 mt-0.5">
                {getIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-tight">
                  {notification.message}
                </p>
                <p className="text-xs text-white/80 mt-1">
                  {new Date(notification.timestamp).toLocaleTimeString()}
                </p>
              </div>
              
              <button 
                className="text-white/60 hover:text-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  actions.dispatch({ type: 'REMOVE_NOTIFICATION', payload: notification.id });
                }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Progress bar */}
            {notification.duration && (
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-white/40 rounded-full"
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: notification.duration / 1000, ease: 'linear' }}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default UrgencyNotifications;