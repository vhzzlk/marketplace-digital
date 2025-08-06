import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Star, 
  Clock, 
  Eye, 
  TrendingUp, 
  Zap,
  Fire,
  AlertTriangle
} from 'lucide-react';
import toast from 'react-hot-toast';

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
  deliveryTime: number;
  stock: number;
  isLimited?: boolean;
  limitedStock?: number;
  isFlashSale?: boolean;
  flashSaleEndsAt?: string;
  isTrending?: boolean;
  views: number;
  sales: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails }) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  // Memoized calculations
  const { discountPercentage, stockStatus, formattedTimeLeft } = useMemo(() => {
    const discount = product.originalPrice && product.price 
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

    const stock = product.isLimited && product.limitedStock
      ? product.limitedStock <= 3 ? 'critical' : product.limitedStock <= 10 ? 'low' : 'available'
      : product.stock === 0 ? 'out' : 'available';

    const time = timeLeft ? {
      hours: Math.floor(timeLeft / (1000 * 60 * 60)),
      minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((timeLeft % (1000 * 60)) / 1000)
    } : null;

    const formatted = time 
      ? `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`
      : '';

    return { discountPercentage: discount, stockStatus: stock, formattedTimeLeft: formatted };
  }, [product, timeLeft]);

  // Countdown timer
  useEffect(() => {
    if (!product.isFlashSale || !product.flashSaleEndsAt) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const endTime = new Date(product.flashSaleEndsAt!).getTime();
      const remaining = Math.max(0, endTime - now);
      setTimeLeft(remaining);
      
      if (remaining <= 0) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [product.isFlashSale, product.flashSaleEndsAt]);

  const handleAddToCart = () => {
    onAddToCart(product);
    toast.success(`${product.name} adicionado ao carrinho!`, {
      icon: '🛒',
      style: { background: 'rgba(0, 212, 255, 0.9)', color: '#000' }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative group cursor-pointer"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.isFlashSale && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flash-sale-badge text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"
          >
            <Fire className="w-3 h-3" />
            FLASH SALE
          </motion.div>
        )}

        {product.isLimited && product.limitedStock && product.limitedStock <= 10 && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="limited-stock-badge text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"
          >
            <AlertTriangle className="w-3 h-3" />
            SÓ {product.limitedStock} RESTAM!
          </motion.div>
        )}
      </div>

      {product.isTrending && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-3 right-3 z-10"
        >
          <div className="trending-badge text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            TRENDING
          </div>
        </motion.div>
      )}

      {/* Main Card */}
      <div className="glass-effect rounded-2xl overflow-hidden hover:neon-glow transition-all duration-300">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Category & Views */}
          <div className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded">
            {product.category}
          </div>
          <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {product.views}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
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

          {/* Flash Sale Countdown */}
          {product.isFlashSale && timeLeft !== null && timeLeft > 0 && (
            <div className="mb-4">
              <div className="text-center mb-2">
                <div className="text-xs text-gray-300 mb-1">PROMOÇÃO TERMINA EM:</div>
                <div className="font-mono text-lg font-bold text-red-400">
                  {formattedTimeLeft}
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full transition-all duration-300"
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
                <span className="text-gray-300">Estoque:</span>
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