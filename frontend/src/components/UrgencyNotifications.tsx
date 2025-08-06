import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, 
  ShoppingCart, 
  AlertTriangle,
  Eye
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
      case 'purchase': return <ShoppingCart className="w-4 h-4" />;
      case 'stock': return <AlertTriangle className="w-4 h-4" />;
      case 'activity': return <Eye className="w-4 h-4" />;
      case 'offer': return <Flame className="w-4 h-4" />;
      default: return <Flame className="w-4 h-4" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'purchase': return 'from-green-500 to-emerald-600';
      case 'stock': return 'from-red-500 to-orange-600';
      case 'activity': return 'from-blue-500 to-cyan-600';
      case 'offer': return 'from-purple-500 to-pink-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      <AnimatePresence>
        {state.notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`bg-gradient-to-r ${getColor(notification.type)} text-white p-3 rounded-lg shadow-lg max-w-sm`}
          >
            <div className="flex items-center space-x-2">
              {getIcon(notification.type)}
              <span className="text-sm font-medium">{notification.message}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default UrgencyNotifications;