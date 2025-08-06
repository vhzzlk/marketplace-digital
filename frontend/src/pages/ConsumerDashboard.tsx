import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Clock, 
  Star, 
  MapPin, 
  ShoppingBag,
  User,
  Settings,
  Gift,
  CreditCard,
  Truck,
  ArrowLeft,
  Search,
  Filter,
  Calendar,
  Package,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const ConsumerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const userStats = [
    {
      title: 'Pedidos Realizados',
      value: '47',
      change: '+5 este mês',
      icon: ShoppingBag,
      color: 'from-blue-400 to-blue-600'
    },
    {
      title: 'Favoritos',
      value: '12',
      change: '+2 novos',
      icon: Heart,
      color: 'from-red-400 to-red-600'
    },
    {
      title: 'Avaliação Média',
      value: '4.9',
      change: '+0.3',
      icon: Star,
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      title: 'Economia Total',
      value: 'R$ 847,30',
      change: '+R$ 125,50',
      icon: Gift,
      color: 'from-green-400 to-green-600'
    }
  ];

  const favoriteRestaurants = [
    {
      id: 1,
      name: 'Cyber Burger Deluxe',
      rating: 4.8,
      deliveryTime: '15-20 min',
      minOrder: 15.00,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=150&fit=crop',
      category: 'Fast Food',
      isOpen: true
    },
    {
      id: 2,
      name: 'Neon Sushi Bar',
      rating: 4.9,
      deliveryTime: '25-30 min',
      minOrder: 25.00,
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=200&h=150&fit=crop',
      category: 'Japanese',
      isOpen: true
    },
    {
      id: 3,
      name: 'Digital Pizza Supreme',
      rating: 4.7,
      deliveryTime: '20-25 min',
      minOrder: 20.00,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=150&fit=crop',
      category: 'Pizza',
      isOpen: false
    }
  ];

  const recentOrders = [
    {
      id: 1,
      restaurant: 'Cyber Burger Deluxe',
      items: ['Cyber Burger', 'Batatas Cyber'],
      total: 42.40,
      status: 'delivered',
      date: '2024-01-15',
      rating: 5
    },
    {
      id: 2,
      restaurant: 'Neon Sushi Bar',
      items: ['Sushi Roll Premium', 'Sashimi Mix'],
      total: 83.00,
      status: 'preparing',
      date: '2024-01-16',
      rating: null
    }
  ];

  const rewards = [
    {
      id: 1,
      title: 'Desconto 20%',
      description: 'Próximo pedido em Cyber Burger',
      points: 500,
      validUntil: '2024-02-15',
      isActive: true
    },
    {
      id: 2,
      title: 'Entrega Grátis',
      description: 'Qualquer pedido acima de R$ 50',
      points: 300,
      validUntil: '2024-01-30',
      isActive: true
    },
    {
      id: 3,
      title: 'Cupom R$ 10',
      description: 'Válido em qualquer restaurante',
      points: 200,
      validUntil: '2024-01-25',
      isActive: false
    }
  ];

  const handleReorder = (restaurant: any) => {
    toast.success(`Redirecionando para ${restaurant.name}!`);
  };

  const handleRedeemReward = (reward: any) => {
    toast.success(`Recompensa "${reward.title}" resgatada!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-effect sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 text-white hover:text-cyan-400 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Voltar</span>
                </motion.button>
              </Link>
              <h1 className="cyber-font text-2xl font-bold gradient-text">
                Meu Perfil
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 glass-effect text-white rounded-lg hover:neon-glow transition-all duration-300"
              >
                <Settings className="w-5 h-5" />
                <span>Configurações</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* User Info */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="glass-effect rounded-xl p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">João Silva</h2>
              <p className="text-gray-400">Cliente desde Janeiro 2024</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-300">4.9</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-gray-300">Cliente VIP</span>
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            >
              Editar Perfil
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* Stats */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="container mx-auto px-4 py-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {userStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="glass-effect rounded-xl p-6 hover:neon-glow transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm font-semibold text-green-400">
                  {stat.change}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.title}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Tabs */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="container mx-auto px-4 py-6"
      >
        <div className="flex space-x-1 glass-effect rounded-xl p-1">
          {[
            { key: 'overview', label: 'Visão Geral', icon: User },
            { key: 'favorites', label: 'Favoritos', icon: Heart },
            { key: 'orders', label: 'Pedidos', icon: Package },
            { key: 'rewards', label: 'Recompensas', icon: Gift }
          ].map((tab) => (
            <motion.button
              key={tab.key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center space-x-2 flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* Content */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="container mx-auto px-4 pb-16"
      >
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-effect rounded-xl p-6 text-center cursor-pointer hover:neon-glow transition-all duration-300"
              >
                <ShoppingBag className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Fazer Pedido</h3>
                <p className="text-gray-400 text-sm">Encontre restaurantes próximos</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-effect rounded-xl p-6 text-center cursor-pointer hover:neon-glow transition-all duration-300"
              >
                <Package className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Meus Pedidos</h3>
                <p className="text-gray-400 text-sm">Acompanhe seus pedidos</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-effect rounded-xl p-6 text-center cursor-pointer hover:neon-glow transition-all duration-300"
              >
                <Gift className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Recompensas</h3>
                <p className="text-gray-400 text-sm">Resgate seus benefícios</p>
              </motion.div>
            </div>

            {/* Recent Orders */}
            <div className="glass-effect rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Pedidos Recentes</h2>
                <Link to="/orders">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold"
                  >
                    Ver Todos
                  </motion.button>
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center justify-between p-4 bg-black/20 rounded-lg hover:bg-black/30 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">
                          {new Date(order.date).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{order.restaurant}</h3>
                        <p className="text-sm text-gray-400">{order.items.join(', ')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-bold text-cyan-400">
                        R$ {order.total.toFixed(2)}
                      </span>
                      <div className="flex items-center space-x-2">
                        {order.rating && (
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-white">{order.rating}</span>
                          </div>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                        >
                          Pedir Novamente
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Restaurantes Favoritos</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar favoritos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteRestaurants.map((restaurant, index) => (
                <motion.div
                  key={restaurant.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="glass-effect rounded-xl overflow-hidden hover:neon-glow transition-all duration-300"
                >
                  <div className="relative h-32 overflow-hidden">
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <div className={`px-2 py-1 rounded text-xs font-semibold ${
                        restaurant.isOpen 
                          ? 'bg-green-500/80 text-white' 
                          : 'bg-red-500/80 text-white'
                      }`}>
                        {restaurant.isOpen ? 'Aberto' : 'Fechado'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-white">{restaurant.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-white">{restaurant.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-400 mb-2">{restaurant.category}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Entrega:</span>
                        <span className="text-white">{restaurant.deliveryTime}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Pedido mínimo:</span>
                        <span className="text-white">R$ {restaurant.minOrder.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleReorder(restaurant)}
                      disabled={!restaurant.isOpen}
                      className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                        restaurant.isOpen
                          ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:shadow-lg'
                          : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {restaurant.isOpen ? 'Fazer Pedido' : 'Fechado'}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Histórico de Pedidos</h2>
              <Link to="/orders">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold"
                >
                  Ver Todos
                </motion.button>
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center justify-between p-4 bg-black/20 rounded-lg hover:bg-black/30 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-300">
                        {new Date(order.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{order.restaurant}</h3>
                      <p className="text-sm text-gray-400">{order.items.join(', ')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-bold text-cyan-400">
                      R$ {order.total.toFixed(2)}
                    </span>
                    <div className="flex items-center space-x-2">
                      {order.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-white">{order.rating}</span>
                        </div>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                      >
                        Ver Detalhes
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Minhas Recompensas</h2>
              <div className="flex items-center space-x-2">
                <Gift className="w-5 h-5 text-purple-400" />
                <span className="text-purple-400 font-semibold">1.250 pontos</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewards.map((reward, index) => (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`glass-effect rounded-xl p-6 hover:neon-glow transition-all duration-300 ${
                    !reward.isActive ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                      <Gift className="w-6 h-6 text-white" />
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      reward.isActive 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {reward.isActive ? 'Ativo' : 'Expirado'}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2">{reward.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{reward.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Pontos necessários:</span>
                      <span className="text-white">{reward.points}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Válido até:</span>
                      <span className="text-white">
                        {new Date(reward.validUntil).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleRedeemReward(reward)}
                    disabled={!reward.isActive}
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                      reward.isActive
                        ? 'bg-gradient-to-r from-purple-400 to-purple-600 text-white hover:shadow-lg'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {reward.isActive ? 'Resgatar' : 'Expirado'}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.section>
    </div>
  );
};

export default ConsumerDashboard;