import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  User, 
  Store, 
  Star, 
  Truck, 
  Clock, 
  Shield, 
  Zap,
  ArrowRight,
  Search,
  Filter,
  Fire,
  TrendingUp,
  Users,
  Award,
  CheckCircle,
  Eye,
  Heart,
  Share2,
  Play,
  Pause
} from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import ProductCard from '../components/ProductCard';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category: string;
  rating: number;
  reviewCount: number;
  preparationTime: number;
  deliveryTime: number;
  stock: number;
  isLimited?: boolean;
  limitedStock?: number;
  isFlashSale?: boolean;
  flashSaleEndsAt?: string;
  isTrending?: boolean;
  isFeatured?: boolean;
  views: number;
  sales: number;
}

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cartCount, setCartCount] = useState(3);
  const [liveUsers, setLiveUsers] = useState(1247);

  // Simulate live user count
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUsers(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotating testimonials
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const featuredProducts: Product[] = [
    {
      _id: '1',
      name: "Cyber Burger Deluxe",
      description: "Hambúrguer gourmet com queijo artesanal, bacon crocante e molho especial da casa. Uma experiência gastronômica única!",
      price: 29.90,
      originalPrice: 39.90,
      imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      category: "Fast Food",
      rating: 4.8,
      reviewCount: 127,
      preparationTime: 15,
      deliveryTime: 20,
      stock: 50,
      isLimited: true,
      limitedStock: 8,
      isFlashSale: true,
      flashSaleEndsAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours
      isTrending: true,
      views: 1247,
      sales: 89
    },
    {
      _id: '2',
      name: "Neon Sushi Roll",
      description: "Sushi premium com salmão fresco, abacate e cream cheese. Decorado com flores comestíveis e molho especial.",
      price: 45.00,
      originalPrice: 65.00,
      imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
      category: "Sushi",
      rating: 4.9,
      reviewCount: 203,
      preparationTime: 20,
      deliveryTime: 30,
      stock: 30,
      isLimited: true,
      limitedStock: 3,
      isFlashSale: true,
      flashSaleEndsAt: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(), // 1 hour
      isTrending: true,
      views: 2156,
      sales: 156
    },
    {
      _id: '3',
      name: "Digital Pizza Supreme",
      description: "Pizza artesanal com massa fermentada naturalmente, molho caseiro e ingredientes premium selecionados.",
      price: 38.50,
      originalPrice: 48.50,
      imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
      category: "Pizza",
      rating: 4.7,
      reviewCount: 89,
      preparationTime: 25,
      deliveryTime: 35,
      stock: 40,
      isLimited: false,
      isFeatured: true,
      views: 892,
      sales: 67
    }
  ];

  const categories = [
    { name: "Fast Food", icon: "🍔", color: "from-red-500 to-orange-500", count: 156 },
    { name: "Pizza", icon: "🍕", color: "from-yellow-500 to-red-500", count: 89 },
    { name: "Sushi", icon: "🍣", color: "from-green-500 to-blue-500", count: 67 },
    { name: "Bebidas", icon: "🥤", color: "from-purple-500 to-pink-500", count: 234 },
    { name: "Sobremesas", icon: "🍰", color: "from-pink-500 to-red-500", count: 123 },
    { name: "Saladas", icon: "🥗", color: "from-green-500 to-emerald-500", count: 78 }
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      rating: 5,
      comment: "Incrível! Pedido entregue em 15 minutos. Comida fresca e deliciosa!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face"
    },
    {
      name: "João Santos",
      rating: 5,
      comment: "Melhor experiência de delivery que já tive. Interface intuitiva e rápida!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
    },
    {
      name: "Ana Costa",
      rating: 5,
      comment: "Promoções incríveis e qualidade excepcional. Recomendo para todos!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face"
    }
  ];

  const stats = [
    { label: "Pedidos Entregues", value: "50K+", icon: Truck },
    { label: "Usuários Ativos", value: "10K+", icon: Users },
    { label: "Avaliações", value: "4.9★", icon: Star },
    { label: "Tempo Médio", value: "18min", icon: Clock }
  ];

  const handleAddToCart = (product: Product) => {
    setCartCount(prev => prev + 1);
    toast.success(`${product.name} adicionado ao carrinho!`, {
      icon: '🛒',
      style: {
        background: 'rgba(0, 212, 255, 0.9)',
        color: '#000',
      },
    });
  };

  const handleViewDetails = (product: Product) => {
    toast.success(`Visualizando ${product.name}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Live Activity Bar */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-black/20 backdrop-blur-sm border-b border-white/10 py-2"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-semibold">{liveUsers} pessoas online</span>
              </div>
              <div className="flex items-center gap-2">
                <Fire className="w-4 h-4 text-orange-400" />
                <span className="text-orange-400">Flash Sale ativo!</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-400">+15% de desconto hoje</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-effect sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h1 className="cyber-font text-2xl font-bold gradient-text">
                CyberMarket
              </h1>
            </motion.div>

            <div className="flex items-center space-x-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2"
              >
                <ShoppingCart className="w-6 h-6 text-white" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              </motion.button>

              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Entrar
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="cyber-font text-6xl md:text-8xl font-bold mb-6 gradient-text"
          >
            O FUTURO DO
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              MARKETPLACE
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Descubra produtos incríveis com entrega ultrarrápida e tecnologia de ponta
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center space-x-2"
            >
              <span>Explorar Agora</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="glass-effect text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-all duration-300"
            >
              Ver Promoções
            </motion.button>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className="glass-effect p-6 rounded-xl text-center"
            >
              <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <motion.div 
            whileHover={{ y: -10 }}
            className="glass-effect p-6 rounded-xl text-center"
          >
            <Truck className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Entrega Rápida</h3>
            <p className="text-gray-300">Entregas em até 30 minutos</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="glass-effect p-6 rounded-xl text-center"
          >
            <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Segurança Total</h3>
            <p className="text-gray-300">Pagamentos seguros e protegidos</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="glass-effect p-6 rounded-xl text-center"
          >
            <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Qualidade Premium</h3>
            <p className="text-gray-300">Produtos selecionados com cuidado</p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Flash Sale Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full mb-4"
          >
            <Fire className="w-5 h-5" />
            <span className="font-bold">FLASH SALE</span>
          </motion.div>
          <h2 className="cyber-font text-4xl font-bold gradient-text mb-4">
            Promoções Relâmpago
          </h2>
          <p className="text-gray-300">Ofertas imperdíveis que terminam em breve!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.filter(p => p.isFlashSale).map((product, index) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={handleAddToCart}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      </motion.section>

      {/* Categories */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="container mx-auto px-4 py-16"
      >
        <h2 className="cyber-font text-4xl font-bold text-center mb-12 gradient-text">
          Categorias
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-effect p-6 rounded-xl text-center cursor-pointer hover:neon-glow transition-all duration-300"
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="font-semibold mb-2">{category.name}</h3>
              <div className="text-sm text-gray-400">{category.count} produtos</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="container mx-auto px-4 py-16"
      >
        <h2 className="cyber-font text-4xl font-bold text-center mb-12 gradient-text">
          O que nossos clientes dizem
        </h2>
        
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="glass-effect rounded-2xl p-8 text-center"
            >
              <div className="flex items-center justify-center mb-6">
                <img
                  src={testimonials[currentSlide].avatar}
                  alt={testimonials[currentSlide].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-lg text-gray-300 mb-4 italic">
                "{testimonials[currentSlide].comment}"
              </p>
              <h4 className="font-semibold text-white">{testimonials[currentSlide].name}</h4>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 glass-effect rounded-full hover:neon-glow transition-all duration-300"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-cyan-400' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="glass-effect rounded-2xl p-12 text-center">
          <h2 className="cyber-font text-4xl font-bold mb-6 gradient-text">
            Pronto para a Experiência?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de usuários que já descobriram o futuro do marketplace
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-all duration-300"
          >
            Começar Agora
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;