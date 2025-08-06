import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Star, 
  Clock, 
  Eye, 
  TrendingUp, 
  Zap,
  Fire,
  AlertTriangle,
  Heart,
  Share2
} from 'lucide-react';
import toast from 'react-hot-toast';
import LiveActivityIndicator from './LiveActivityIndicator';

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
  urgency?: {
    isLimited: boolean;
    isFlashSale: boolean;
    isTrending: boolean;
    isFeatured: boolean;
    stockStatus: string;
    timeLeft?: number;
  };
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  // Countdown timer for flash sales
  useEffect(() => {
    if (product.isFlashSale && product.flashSaleEndsAt) {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const endTime = new Date(product.flashSaleEndsAt!).getTime();
        const remaining = Math.max(0, endTime - now);
        setTimeLeft(remaining);
        
        if (remaining <= 0) {
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [product.isFlashSale, product.flashSaleEndsAt]);

  const formatTimeLeft = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getDiscountPercentage = () => {
    if (product.originalPrice && product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  };

  const getStockStatus = () => {
    if (product.isLimited && product.limitedStock) {
      if (product.limitedStock <= 3) return 'critical';
      if (product.limitedStock <= 10) return 'low';
    }
    if (product.stock === 0) return 'out';
    return 'available';
  };

  const handleAddToCart = () => {
    onAddToCart(product);
    toast.success(`${product.name} adicionado ao carrinho!`, {
      icon: '🛒',
      style: {
        background: 'rgba(0, 212, 255, 0.9)',
        color: '#000',
      },
    });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? 'Removido dos favoritos' : 'Adicionado aos favoritos', {
      icon: isLiked ? '💔' : '❤️',
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Confira ${product.name} por apenas R$ ${product.price.toFixed(2)}!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copiado para a área de transferência!');
    }
  };

  const stockStatus = getStockStatus();
  const discountPercentage = getDiscountPercentage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group cursor-pointer"
    >
      {/* Urgency Badges */}
      <AnimatePresence>
        {product.isFlashSale && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute top-3 left-3 z-10"
          >
            <div className="flash-sale-badge text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Fire className="w-3 h-3" />
              FLASH SALE
            </div>
          </motion.div>
        )}

        {product.isTrending && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute top-3 right-3 z-10"
          >
            <div className="trending-badge text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              TRENDING
            </div>
          </motion.div>
        )}

        {product.isLimited && product.limitedStock && product.limitedStock <= 10 && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute top-12 left-3 z-10"
          >
            <div className="limited-stock-badge text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              SÓ {product.limitedStock} RESTAM!
            </div>
          </motion.div>
        )}

        {stockStatus === 'critical' && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute top-12 right-3 z-10"
          >
            <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 animate-pulse">
              <Zap className="w-3 h-3" />
              ÚLTIMAS UNIDADES!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Card */}
      <div className="glass-effect rounded-2xl overflow-hidden hover:neon-glow transition-all duration-500">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay with actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors"
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : 'text-white'}`} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors"
            >
              <Share2 className="w-5 h-5 text-white" />
            </motion.button>
          </motion.div>

          {/* Category Badge */}
          <div className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded">
            {product.category}
          </div>

          {/* Views Badge */}
          <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {product.views}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title and Rating */}
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-bold text-white line-clamp-2 flex-1 mr-2">
              {product.name}
            </h3>
            <div className="flex items-center gap-1 bg-black/20 px-2 py-1 rounded">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-semibold">{product.rating}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Price Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-gray-400 text-sm line-through">
                  R$ {product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-2xl font-bold text-cyan-400">
                R$ {product.price.toFixed(2)}
              </span>
              {discountPercentage > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">
                  -{discountPercentage}%
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <Clock className="w-4 h-4" />
              <span>{product.deliveryTime}min</span>
            </div>
          </div>

          {/* Live Activity Indicator */}
          <div className="mb-4">
            <LiveActivityIndicator productId={product._id} />
          </div>

          {/* Flash Sale Countdown */}
          {product.isFlashSale && timeLeft !== null && timeLeft > 0 && (
            <div className="mb-4">
              <div className="countdown-timer text-center mb-2">
                <div className="text-xs text-gray-300 mb-1">PROMOÇÃO TERMINA EM:</div>
                <div className="font-mono text-lg font-bold">
                  {formatTimeLeft(timeLeft)}
                </div>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${Math.max(0, Math.min(100, (timeLeft / (24 * 60 * 60 * 1000)) * 100))}%` 
                  }}
                />
              </div>
            </div>
          )}

          {/* Stock Indicator */}
          {product.isLimited && product.limitedStock && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">Estoque limitado:</span>
                <span className={`font-bold ${
                  product.limitedStock <= 3 ? 'text-red-400' : 
                  product.limitedStock <= 10 ? 'text-orange-400' : 'text-green-400'
                }`}>
                  {product.limitedStock} unidades
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    product.limitedStock <= 3 ? 'bg-red-500' : 
                    product.limitedStock <= 10 ? 'bg-orange-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(100, (product.limitedStock / 50) * 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Adicionar
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onViewDetails(product)}
              className="px-4 py-3 glass-effect text-white rounded-lg font-semibold hover:neon-glow transition-all duration-300"
            >
              Ver
            </motion.button>
          </div>

          {/* Social Proof */}
          <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
            <span>{product.reviewCount} avaliações</span>
            <span>{product.sales} vendidos</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard; 