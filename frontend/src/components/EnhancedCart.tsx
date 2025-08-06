import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  X, 
  Plus, 
  Minus, 
  Truck, 
  Zap, 
  Gift,
  Star,
  TrendingUp,
  Clock
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
    if (hasFreeShipping) {
      return "🎉 Parabéns! Você tem frete GRÁTIS!";
    }
    if (freeShippingRemaining <= 15) {
      return `⚡ Apenas R$ ${freeShippingRemaining.toFixed(2)} para frete GRÁTIS!`;
    }
    if (freeShippingRemaining <= 25) {
      return `🚀 Você está quase lá! R$ ${freeShippingRemaining.toFixed(2)} para frete grátis`;
    }
    return `🛒 Adicione mais R$ ${freeShippingRemaining.toFixed(2)} e ganhe frete GRÁTIS!`;
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
                
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${getProgressColor()}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(cartMetrics.freeShippingProgress, 100)}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Savings Display */}
              {cartMetrics.savedAmount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center bg-green-100 text-green-700 px-3 py-1 rounded-full"
                >
                  <Gift className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">
                    Você economizou R$ {cartMetrics.savedAmount.toFixed(2)}!
                  </span>
                </motion.div>
              )}
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Seu carrinho está vazio</p>
                  <button
                    onClick={actions.toggleCart}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Continuar Comprando
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={item.product._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white border rounded-lg p-3 shadow-sm"
                  >
                    <div className="flex space-x-3">
                      {/* Product Image */}
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />

                      <div className="flex-1 min-w-0">
                        {/* Product Info */}
                        <h3 className="font-medium text-gray-900 truncate">
                          {item.product.name}
                        </h3>
                        
                        <div className="flex items-center space-x-2 mt-1">
                          {item.product.originalPrice && (
                            <span className="text-xs text-gray-500 line-through">
                              R$ {item.product.originalPrice.toFixed(2)}
                            </span>
                          )}
                          <span className="text-sm font-bold text-blue-600">
                            R$ {item.product.price.toFixed(2)}
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            
                            <button
                              onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => actions.removeFromCart(item.product._id)}
                            className="text-red-500 hover:text-red-700 transition-colors p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Urgency Indicators */}
                    {item.product.isLimited && item.product.limitedStock && item.product.limitedStock <= 5 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-2 flex items-center space-x-1 text-red-600 bg-red-50 px-2 py-1 rounded"
                      >
                        <Clock className="w-3 h-3" />
                        <span className="text-xs font-medium">
                          Apenas {item.product.limitedStock} restantes!
                        </span>
                      </motion.div>
                    )}
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t bg-white p-4 space-y-4">
                {/* Total */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>R$ {cartMetrics.totalValue.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Frete:</span>
                    <span className={hasFreeShipping ? 'text-green-600 font-medium' : ''}>
                      {hasFreeShipping ? 'GRÁTIS' : 'R$ 9,90'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span className="text-blue-600">
                      R$ {(cartMetrics.totalValue + (hasFreeShipping ? 0 : 9.90)).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Zap className="w-5 h-5" />
                      <span>Finalizar Compra</span>
                    </div>
                  </motion.button>
                  
                  <button
                    onClick={actions.toggleCart}
                    className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    Continuar Comprando
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>4.8/5 avaliação</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span>+1000 vendas</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EnhancedCart;