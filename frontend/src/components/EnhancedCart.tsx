import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  X, 
  Plus, 
  Minus, 
  Truck, 
  Gift
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const EnhancedCart: React.FC = () => {
  const { state, actions } = useApp();
  const { cart, cartMetrics, isCartOpen } = state;

  const freeShippingRemaining = cartMetrics.freeShippingThreshold - cartMetrics.totalValue;
  const hasFreeShipping = freeShippingRemaining <= 0;

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      actions.removeFromCart(productId);
    } else {
      actions.dispatch({ 
        type: 'UPDATE_CART_QUANTITY', 
        payload: { productId, quantity: newQuantity } 
      });
    }
  };

  const getUrgencyMessage = () => {
    if (hasFreeShipping) return "🎉 Frete GRÁTIS!";
    if (freeShippingRemaining <= 15) return `⚡ R$ ${freeShippingRemaining.toFixed(2)} para frete GRÁTIS!`;
    if (freeShippingRemaining <= 25) return `🚀 R$ ${freeShippingRemaining.toFixed(2)} para frete grátis`;
    return `🛒 R$ ${freeShippingRemaining.toFixed(2)} para frete GRÁTIS!`;
  };

  const getProgressColor = () => {
    if (hasFreeShipping) return 'from-green-500 to-emerald-600';
    if (freeShippingRemaining <= 15) return 'from-orange-500 to-red-500';
    if (freeShippingRemaining <= 25) return 'from-yellow-500 to-orange-500';
    return 'from-blue-500 to-purple-500';
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={actions.toggleCart}
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <h2 className="text-lg font-bold">
                  Carrinho ({cartMetrics.totalItems})
                </h2>
              </div>
              <button
                onClick={actions.toggleCart}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="p-4 bg-gray-50 border-b">
              <div className="mb-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {getUrgencyMessage()}
                  </span>
                  {hasFreeShipping && <Truck className="w-4 h-4 text-green-500" />}
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full bg-gradient-to-r ${getProgressColor()} transition-all duration-300`}
                    style={{ 
                      width: `${Math.min(100, (cartMetrics.totalValue / cartMetrics.freeShippingThreshold) * 100)}%` 
                    }}
                  />
                </div>
                
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>R$ {cartMetrics.totalValue.toFixed(2)}</span>
                  <span>R$ {cartMetrics.freeShippingThreshold.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Carrinho vazio</h3>
                  <p className="text-gray-500">Adicione produtos para começar</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      {/* Product Image */}
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                        loading="lazy"
                      />
                      
                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          R$ {item.price.toFixed(2)}
                        </p>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => actions.removeFromCart(item._id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t p-4 bg-gray-50">
                {/* Savings */}
                {cartMetrics.savedAmount > 0 && (
                  <div className="flex items-center justify-between mb-3 text-sm">
                    <span className="text-gray-600">Você economizou:</span>
                    <span className="text-green-600 font-semibold">
                      R$ {cartMetrics.savedAmount.toFixed(2)}
                    </span>
                  </div>
                )}
                
                {/* Total */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    R$ {cartMetrics.totalValue.toFixed(2)}
                  </span>
                </div>
                
                {/* Checkout Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Gift className="w-5 h-5" />
                  Finalizar Compra
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EnhancedCart;