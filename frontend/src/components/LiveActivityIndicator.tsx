import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Eye, Zap } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface LiveActivityIndicatorProps {
  productId?: string;
  showGlobal?: boolean;
}

const LiveActivityIndicator: React.FC<LiveActivityIndicatorProps> = ({ 
  productId, 
  showGlobal = false
}) => {
  const { state } = useApp();
  const [currentViewers, setCurrentViewers] = useState(0);

  // Simulate live viewer count for specific product
  useEffect(() => {
    if (productId) {
      const baseViewers = Math.floor(Math.random() * 15) + 3; // 3-18 viewers
      setCurrentViewers(baseViewers);
      
      const interval = setInterval(() => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        setCurrentViewers(prev => Math.max(1, prev + change));
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [productId]);

  if (showGlobal) {
    return (
      <motion.div 
        className="flex items-center space-x-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Global online users */}
        <div className="flex items-center space-x-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <Users className="w-4 h-4" />
          <span className="text-sm font-medium">
            {state.liveUsersCount.toLocaleString()} online
          </span>
        </div>

        {/* Recent activity */}
        <div className="flex items-center space-x-2 bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
          <Zap className="w-4 h-4" />
          <span className="text-sm font-medium">
            +100 vendas hoje
          </span>
        </div>
      </motion.div>
    );
  }

  // Product-specific indicators
  return (
    <div className="space-y-2">
      {/* Current viewers */}
      <motion.div 
        className="flex items-center space-x-2 bg-orange-500/20 text-orange-400 px-2 py-1 rounded-lg"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
        <Eye className="w-3 h-3" />
        <span className="text-xs font-medium">
          {currentViewers} {currentViewers === 1 ? 'pessoa vendo' : 'pessoas vendo'}
        </span>
      </motion.div>

      {/* Hot indicator */}
      {currentViewers >= 10 && (
        <motion.div 
          className="flex items-center space-x-1 bg-red-500/20 text-red-400 px-2 py-1 rounded-lg"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Zap className="w-3 h-3" />
          <span className="text-xs font-medium">Hot!</span>
        </motion.div>
      )}
    </div>
  );
};

export default LiveActivityIndicator;