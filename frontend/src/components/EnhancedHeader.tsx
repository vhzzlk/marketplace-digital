import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  User, 
  Bell, 
  Star, 
  Zap,
  LogOut,
  Crown
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';

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
    return level === 'Platinum' ? <Crown className="w-4 h-4" /> : <Star className="w-4 h-4" />;
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>1.247 usuários online</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>4.8/5 avaliação</span>
            </div>
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
                  title="Sair"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/login'}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
              >
                Entrar
              </motion.button>
            )}

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Notificações"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center">
                3
              </span>
            </motion.button>

            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={actions.toggleCart}
              className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Carrinho"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartMetrics.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">
                  {cartMetrics.totalItems}
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default EnhancedHeader;