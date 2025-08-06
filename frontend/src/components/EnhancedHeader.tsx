import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  User, 
  Bell, 
  Star, 
  Zap,
  LogOut,
  Settings,
  Gift,
  Crown
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import LiveActivityIndicator from './LiveActivityIndicator';

const EnhancedHeader: React.FC = () => {
  const { state, actions } = useApp();
  const { user, isAuthenticated, cartMetrics, userProgress } = state;

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Bronze': return 'text-amber-600';
      case 'Silver': return 'text-gray-400';
      case 'Gold': return 'text-yellow-500';
      case 'Platinum': return 'text-purple-500';
      default: return 'text-gray-600';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'Platinum': return <Crown className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white shadow-lg relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
      <div className="absolute inset-0 bg-black/10" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
              CyberMarket
            </h1>
          </motion.div>

          {/* Center - Live Activity */}
          <div className="hidden md:block">
            <LiveActivityIndicator showGlobal className="flex-1" />
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* User Info */}
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3">
                {/* User Progress */}
                <motion.div 
                  className="hidden sm:flex items-center space-x-2 bg-black/20 rounded-lg px-3 py-1"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`flex items-center space-x-1 ${getLevelColor(userProgress.level)}`}>
                    {getLevelIcon(userProgress.level)}
                    <span className="text-sm font-medium">{userProgress.level}</span>
                  </div>
                  
                  <div className="text-yellow-400 flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span className="text-sm font-medium">{userProgress.points}</span>
                  </div>
                </motion.div>

                {/* User Avatar */}
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="hidden sm:block text-sm font-medium">{user.name}</span>
                </div>

                {/* Logout */}
                <button
                  onClick={actions.logout}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button 
                className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                Entrar
              </button>
            )}

            {/* Notifications */}
            <motion.button 
              className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Bell className="w-5 h-5" />
              {state.notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {state.notifications.length}
                </span>
              )}
            </motion.button>

            {/* Cart */}
            <motion.button
              onClick={actions.toggleCart}
              className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartMetrics.totalItems > 0 && (
                <motion.span
                  key={cartMetrics.totalItems}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg"
                >
                  {cartMetrics.totalItems > 99 ? '99+' : cartMetrics.totalItems}
                </motion.span>
              )}
            </motion.button>

            {/* Cart Value Preview */}
            {cartMetrics.totalValue > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden lg:flex items-center space-x-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-lg border border-green-500/30"
              >
                <Gift className="w-4 h-4" />
                <span className="text-sm font-medium">
                  R$ {cartMetrics.totalValue.toFixed(2)}
                </span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Mobile Live Activity */}
        <div className="md:hidden pb-3">
          <LiveActivityIndicator showGlobal />
        </div>

        {/* Progress Bar to Next Level (for authenticated users) */}
        {isAuthenticated && user && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pb-2"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-blue-200">
                Próximo nível: {userProgress.nextLevelPoints - userProgress.points} pontos
              </span>
              <span className="text-xs text-blue-200">
                {Math.round((userProgress.points / userProgress.nextLevelPoints) * 100)}%
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500"
                initial={{ width: 0 }}
                animate={{ width: `${(userProgress.points / userProgress.nextLevelPoints) * 100}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Glow Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50" />
    </header>
  );
};

export default EnhancedHeader;