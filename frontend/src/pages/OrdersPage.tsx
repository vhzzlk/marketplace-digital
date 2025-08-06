import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  MapPin, 
  Truck, 
  CheckCircle, 
  XCircle, 
  Star,
  Filter,
  Search,
  ArrowLeft,
  Package,
  CreditCard,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const OrdersPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const orders = [
    {
      id: 1,
      orderNumber: '#ORD-2024-001',
      restaurant: 'Cyber Burger Deluxe',
      items: [
        { name: 'Cyber Burger', quantity: 2, price: 29.90 },
        { name: 'Batatas Cyber', quantity: 1, price: 12.50 }
      ],
      total: 72.30,
      status: 'delivered',
      orderDate: '2024-01-15',
      deliveryDate: '2024-01-15',
      deliveryTime: '15:30',
      rating: 5,
      address: 'Rua Cyber, 123 - São Paulo, SP'
    },
    {
      id: 2,
      orderNumber: '#ORD-2024-002',
      restaurant: 'Neon Sushi Bar',
      items: [
        { name: 'Sushi Roll Premium', quantity: 1, price: 45.00 },
        { name: 'Sashimi Mix', quantity: 1, price: 38.00 }
      ],
      total: 83.00,
      status: 'preparing',
      orderDate: '2024-01-16',
      deliveryDate: '2024-01-16',
      deliveryTime: '19:45',
      rating: null,
      address: 'Av. Digital, 456 - São Paulo, SP'
    },
    {
      id: 3,
      orderNumber: '#ORD-2024-003',
      restaurant: 'Digital Pizza Supreme',
      items: [
        { name: 'Pizza Margherita', quantity: 1, price: 38.50 },
        { name: 'Refrigerante', quantity: 2, price: 8.00 }
      ],
      total: 54.50,
      status: 'cancelled',
      orderDate: '2024-01-14',
      deliveryDate: '2024-01-14',
      deliveryTime: '20:15',
      rating: null,
      address: 'Rua Tech, 789 - São Paulo, SP'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-400 bg-green-400/10';
      case 'preparing':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'cancelled':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5" />;
      case 'preparing':
        return <Clock className="w-5 h-5" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Entregue';
      case 'preparing':
        return 'Preparando';
      case 'cancelled':
        return 'Cancelado';
      default:
        return 'Pendente';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesFilter = activeFilter === 'all' || order.status === activeFilter;
    const matchesSearch = order.restaurant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleRateOrder = (orderId: number, rating: number) => {
    toast.success(`Pedido avaliado com ${rating} estrelas!`);
  };

  const handleReorder = (order: any) => {
    toast.success('Pedido adicionado ao carrinho!');
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
                Meus Pedidos
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar pedidos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Filters */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="container mx-auto px-4 py-6"
      >
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'Todos', count: orders.length },
            { key: 'preparing', label: 'Preparando', count: orders.filter(o => o.status === 'preparing').length },
            { key: 'delivered', label: 'Entregues', count: orders.filter(o => o.status === 'delivered').length },
            { key: 'cancelled', label: 'Cancelados', count: orders.filter(o => o.status === 'cancelled').length }
          ].map((filter) => (
            <motion.button
              key={filter.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                activeFilter === filter.key
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg'
                  : 'glass-effect text-gray-300 hover:text-white'
              }`}
            >
              {filter.label} ({filter.count})
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* Orders List */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="container mx-auto px-4 pb-16"
      >
        <div className="space-y-6">
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="glass-effect rounded-xl p-6 hover:neon-glow transition-all duration-300"
            >
              {/* Order Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{order.restaurant}</h3>
                  <p className="text-gray-400 text-sm">{order.orderNumber}</p>
                </div>
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span className="text-sm font-semibold">{getStatusText(order.status)}</span>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-2 mb-4">
                {order.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="text-cyan-400 font-semibold">
                      R$ {item.price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Order Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>Pedido: {new Date(order.orderDate).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>Entrega: {order.deliveryTime}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{order.address}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Total:</span>
                    <span className="text-2xl font-bold text-cyan-400">
                      R$ {order.total.toFixed(2)}
                    </span>
                  </div>
                  {order.rating && (
                    <div className="flex items-center space-x-1">
                      <span className="text-gray-400 text-sm">Avaliação:</span>
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < order.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Order Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <div className="flex space-x-2">
                  {order.status === 'delivered' && !order.rating && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRateOrder(order.id, 5)}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      <Star className="w-4 h-4" />
                      <span>Avaliar</span>
                    </motion.button>
                  )}
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleReorder(order)}
                    className="flex items-center space-x-2 px-4 py-2 glass-effect text-white rounded-lg font-semibold hover:neon-glow transition-all duration-300"
                  >
                    <Package className="w-4 h-4" />
                    <span>Pedir Novamente</span>
                  </motion.button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Ver Detalhes</span>
                </motion.button>
              </div>
            </motion.div>
          ))}

          {filteredOrders.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-400 mb-2">Nenhum pedido encontrado</h3>
              <p className="text-gray-500">Tente ajustar os filtros ou fazer seu primeiro pedido!</p>
            </motion.div>
          )}
        </div>
      </motion.section>
    </div>
  );
};

export default OrdersPage;