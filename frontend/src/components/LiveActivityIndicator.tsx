import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
<<<<<<< HEAD
import { Users, Eye, Zap } from 'lucide-react';
=======
import { Users, Eye, ShoppingCart, Zap, Flame } from 'lucide-react';
>>>>>>> f73d985fb2c11ca1b8aeb6510f4465ea32fd8f9c
import { useApp } from '../contexts/AppContext';

interface LiveActivityIndicatorProps {
  productId?: string;
  showGlobal?: boolean;
<<<<<<< HEAD
=======
  className?: string;
>>>>>>> f73d985fb2c11ca1b8aeb6510f4465ea32fd8f9c
}

const LiveActivityIndicator: React.FC<LiveActivityIndicatorProps> = ({ 
  productId, 
<<<<<<< HEAD
  showGlobal = false
}) => {
  const { state } = useApp();
  const [currentViewers, setCurrentViewers] = useState(0);
=======
  showGlobal = false,
  className = ""
}) => {
  const { state } = useApp();
  const [currentViewers, setCurrentViewers] = useState(0);
  const [recentPurchases, setRecentPurchases] = useState(0);
>>>>>>> f73d985fb2c11ca1b8aeb6510f4465ea32fd8f9c

  // Simulate live viewer count for specific product
  useEffect(() => {
    if (productId) {
<<<<<<< HEAD
=======
      // Simulate real-time viewer count
>>>>>>> f73d985fb2c11ca1b8aeb6510f4465ea32fd8f9c
      const baseViewers = Math.floor(Math.random() * 15) + 3; // 3-18 viewers
      setCurrentViewers(baseViewers);
      
      const interval = setInterval(() => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        setCurrentViewers(prev => Math.max(1, prev + change));
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [productId]);

<<<<<<< HEAD
  if (showGlobal) {
    return (
      <motion.div 
        className="flex items-center space-x-4"
=======
  // Simulate recent purchases
  useEffect(() => {
    const basePurchases = Math.floor(Math.random() * 50) + 10; // 10-60 purchases
    setRecentPurchases(basePurchases);
    
    const interval = setInterval(() => {
      setRecentPurchases(prev => prev + Math.floor(Math.random() * 3));
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  if (showGlobal) {
    return (
      <motion.div 
        className={`flex items-center space-x-4 ${className}`}
>>>>>>> f73d985fb2c11ca1b8aeb6510f4465ea32fd8f9c
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Global online users */}
<<<<<<< HEAD
        <div className="flex items-center space-x-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
=======
        <div className="flex items-center space-x-2 bg-green-500/20 text-green-400 
                       px-3 py-1 rounded-full backdrop-blur-sm border border-green-500/30">
>>>>>>> f73d985fb2c11ca1b8aeb6510f4465ea32fd8f9c
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <Users className="w-4 h-4" />
          <span className="text-sm font-medium">
            {state.liveUsersCount.toLocaleString()} online
          </span>
        </div>

        {/* Recent activity */}
<<<<<<< HEAD
        <div className="flex items-center space-x-2 bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
          <Zap className="w-4 h-4" />
          <span className="text-sm font-medium">
            +100 vendas hoje
=======
        <div className="flex items-center space-x-2 bg-blue-500/20 text-blue-400 
                       px-3 py-1 rounded-full backdrop-blur-sm border border-blue-500/30">
          <Zap className="w-4 h-4" />
          <span className="text-sm font-medium">
            {recentPurchases} vendas hoje
>>>>>>> f73d985fb2c11ca1b8aeb6510f4465ea32fd8f9c
          </span>
        </div>
      </motion.div>
    );
  }

  // Product-specific indicators
  return (
<<<<<<< HEAD
    <div className="space-y-2">
      {/* Current viewers */}
      <motion.div 
        className="flex items-center space-x-2 bg-orange-500/20 text-orange-400 px-2 py-1 rounded-lg"
=======
    <div className={`space-y-2 ${className}`}>
      {/* Current viewers */}
      <motion.div 
        className="flex items-center space-x-2 bg-orange-500/20 text-orange-400 
                   px-2 py-1 rounded-lg backdrop-blur-sm border border-orange-500/30"
>>>>>>> f73d985fb2c11ca1b8aeb6510f4465ea32fd8f9c
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
<<<<<<< HEAD
          className="flex items-center space-x-1 bg-red-500/20 text-red-400 px-2 py-1 rounded-lg"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Zap className="w-3 h-3" />
          <span className="text-xs font-medium">Hot!</span>
        </motion.div>
      )}
=======
          className="flex items-center space-x-1 bg-red-500/20 text-red-400 
                     px-2 py-1 rounded-lg backdrop-blur-sm border border-red-500/30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <Flame className="w-3 h-3 animate-pulse" />
          <span className="text-xs font-bold">QUENTE!</span>
        </motion.div>
      )}

      {/* Recent purchases */}
      <motion.div 
        className="flex items-center space-x-2 bg-purple-500/20 text-purple-400 
                   px-2 py-1 rounded-lg backdrop-blur-sm border border-purple-500/30"
        whileHover={{ scale: 1.05 }}
      >
        <ShoppingCart className="w-3 h-3" />
        <span className="text-xs font-medium">
          {Math.floor(recentPurchases / 10)} compras recentes
        </span>
      </motion.div>
>>>>>>> f73d985fb2c11ca1b8aeb6510f4465ea32fd8f9c
    </div>
  );
};

export default LiveActivityIndicator;