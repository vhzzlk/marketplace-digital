import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  DollarSign, 
  Package, 
  Users, 
  Star,
  Plus,
  Edit,
  Trash2,
  Eye,
  Settings,
  BarChart3,
  Calendar,
  Clock,
  MapPin,
  ArrowLeft,
  Filter,
  Search,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const SellerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    {
      title: 'Vendas Hoje',
      value: 'R$ 2.847,50',
      change: '+12.5%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'from-green-400 to-green-600'
    },
    {
      title: 'Pedidos Pendentes',
      value: '23',
      change: '+3',
      changeType: 'positive',
      icon: Package,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      title: 'Avaliação Média',
      value: '4.8',
      change: '+0.2',
      changeType: 'positive',
      icon: Star,
      color: 'from-purple-400 to-purple-600'
    },
    {
      title: 'Clientes Ativos',
      value: '1.247',
      change: '+18',
      changeType: 'positive',
      icon: Users,
      color: 'from-blue-400 to-blue-600'
    }
  ];

  const recentOrders = [
    {
      id: 1,
      customer: 'João Silva',
      items: ['Cyber Burger', 'Batatas Cyber'],
      total: 42.40,
      status: 'preparing',
      time: '15:30',
      address: 'Rua Cyber, 123'
    },
    {
      id: 2,
      customer: 'Maria Santos',
      items: ['Pizza Margherita'],
      total: 38.50,
      status: 'ready',
      time: '15:25',
      address: 'Av. Digital, 456'
    },
    {
      id: 3,
      customer: 'Pedro Costa',
      items: ['Sushi Roll', 'Sashimi Mix'],
      total: 83.00,
      status: 'delivered',
      time: '15:20',
      address: 'Rua Tech, 789'
    }
  ];

  const products = [
    {
      id: 1,
      name: 'Cyber Burger Deluxe',
      price: 29.90,
      stock: 45,
      sales: 127,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      name: 'Batatas Cyber',
      price: 12.50,
      stock: 23,
      sales: 89,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      name: 'Refrigerante Cyber',
      price: 8.00,
      stock: 67,
      sales: 234,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=100&h=100&fit=crop'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'ready':
        return 'text-green-400 bg-green-400/10';
      case 'delivered':
        return 'text-blue-400 bg-blue-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'preparing':
        return 'Preparando';
      case 'ready':
        return 'Pronto';
      case 'delivered':
        return 'Entregue';
      default:
        return 'Pendente';
    }
  };

  const handleAcceptOrder = (orderId: number) => {
    toast.success('Pedido aceito com sucesso!');
  };

  const handleRejectOrder = (orderId: number) => {
    toast.error('Pedido rejeitado');
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
                Dashboard do Vendedor
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

      {/* Stats */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
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
                <div className={`text-sm font-semibold ${
                  stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                }`}>
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
        transition={{ delay: 0.3 }}
        className="container mx-auto px-4 py-6"
      >
        <div className="flex space-x-1 glass-effect rounded-xl p-1">
          {[
            { key: 'overview', label: 'Visão Geral', icon: BarChart3 },
            { key: 'orders', label: 'Pedidos', icon: Package },
            { key: 'products', label: 'Produtos', icon: Plus }
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
        transition={{ delay: 0.4 }}
        className="container mx-auto px-4 pb-16"
      >
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Recent Orders */}
            <div className="glass-effect rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Pedidos Recentes</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold"
                >
                  Ver Todos
                </motion.button>
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
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">{order.time}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{order.customer}</h3>
                        <p className="text-sm text-gray-400">{order.items.join(', ')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-bold text-cyan-400">
                        R$ {order.total.toFixed(2)}
                      </span>
                      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                        <span className="text-sm font-semibold">{getStatusText(order.status)}</span>
                      </div>
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAcceptOrder(order.id)}
                          className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all duration-300"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRejectOrder(order.id)}
                          className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-300"
                        >
                          <XCircle className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-effect rounded-xl p-6 text-center cursor-pointer hover:neon-glow transition-all duration-300"
              >
                <Plus className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Adicionar Produto</h3>
                <p className="text-gray-400 text-sm">Crie novos produtos para vender</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-effect rounded-xl p-6 text-center cursor-pointer hover:neon-glow transition-all duration-300"
              >
                <BarChart3 className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Ver Relatórios</h3>
                <p className="text-gray-400 text-sm">Analise suas vendas e performance</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-effect rounded-xl p-6 text-center cursor-pointer hover:neon-glow transition-all duration-300"
              >
                <Settings className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Configurações</h3>
                <p className="text-gray-400 text-sm">Gerencie sua loja e preferências</p>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Todos os Pedidos</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar pedidos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  <Filter className="w-5 h-5" />
                  <span>Filtrar</span>
                </motion.button>
              </div>
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
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-300">{order.time}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{order.customer}</h3>
                      <p className="text-sm text-gray-400">{order.items.join(', ')}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <MapPin className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-500">{order.address}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-bold text-cyan-400">
                      R$ {order.total.toFixed(2)}
                    </span>
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                      <span className="text-sm font-semibold">{getStatusText(order.status)}</span>
                    </div>
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all duration-300"
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAcceptOrder(order.id)}
                        className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all duration-300"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Meus Produtos</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                <span>Adicionar Produto</span>
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="glass-effect rounded-xl p-6 hover:neon-glow transition-all duration-300"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-white">{product.name}</h3>
                      <p className="text-2xl font-bold text-cyan-400">
                        R$ {product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Estoque:</span>
                      <span className="text-white">{product.stock} unidades</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Vendas:</span>
                      <span className="text-white">{product.sales} vendas</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Avaliação:</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Editar</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.section>
    </div>
  );
};

export default SellerDashboard;