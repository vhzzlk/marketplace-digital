import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';

// Types
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'consumer' | 'seller';
  avatar?: string;
  level?: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  points?: number;
  achievements?: Achievement[];
  createdAt: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}

export interface Product {
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
  seller: {
    _id: string;
    name: string;
    avatar?: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOptions?: Record<string, any>;
}

export interface CartMetrics {
  totalItems: number;
  totalValue: number;
  savedAmount: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
}

export interface UrgencyNotification {
  id: string;
  type: 'purchase' | 'stock' | 'offer' | 'activity';
  message: string;
  timestamp: string;
  duration?: number;
  productId?: string;
}

export interface LiveActivity {
  id: string;
  type: 'purchase' | 'view' | 'add_to_cart';
  userName: string;
  productName: string;
  timestamp: string;
  location?: string;
}

export interface UserProgress {
  level: string;
  points: number;
  nextLevelPoints: number;
  streak: number;
  totalPurchases: number;
  totalSpent: number;
  achievements: Achievement[];
  badges: string[];
}

export interface PersonalizationData {
  mood?: 'happy' | 'hungry' | 'healthy' | 'indulgent' | 'quick';
  preferences: string[];
  recentlyViewed: Product[];
  favoriteCategories: string[];
  shoppingPatterns: Record<string, any>;
}

// AppState Interface
export interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Cart
  cart: CartItem[];
  cartMetrics: CartMetrics;
  
  // Products
  products: Product[];
  featuredProducts: Product[];
  favorites: Product[];
  recentlyViewed: Product[];
  
  // Social Proof & Urgency
  notifications: UrgencyNotification[];
  liveActivity: LiveActivity[];
  liveUsersCount: number;
  
  // Gamification
  userProgress: UserProgress;
  
  // Personalization
  personalization: PersonalizationData;
  
  // UI State
  isCartOpen: boolean;
  isNotificationsPaused: boolean;
  currentMood?: string;
}

// Actions
type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_TO_FAVORITES'; payload: Product }
  | { type: 'REMOVE_FROM_FAVORITES'; payload: string }
  | { type: 'ADD_RECENTLY_VIEWED'; payload: Product }
  | { type: 'ADD_NOTIFICATION'; payload: UrgencyNotification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'ADD_LIVE_ACTIVITY'; payload: LiveActivity }
  | { type: 'UPDATE_LIVE_USERS'; payload: number }
  | { type: 'UPDATE_USER_PROGRESS'; payload: Partial<UserProgress> }
  | { type: 'SET_MOOD'; payload: string }
  | { type: 'TOGGLE_NOTIFICATIONS_PAUSE' };

// Initial State
const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  cart: [],
  cartMetrics: {
    totalItems: 0,
    totalValue: 0,
    savedAmount: 0,
    freeShippingThreshold: 50,
    freeShippingProgress: 0,
  },
  products: [],
  featuredProducts: [],
  favorites: [],
  recentlyViewed: [],
  notifications: [],
  liveActivity: [],
  liveUsersCount: 1247,
  userProgress: {
    level: 'Bronze',
    points: 0,
    nextLevelPoints: 1000,
    streak: 0,
    totalPurchases: 0,
    totalSpent: 0,
    achievements: [],
    badges: [],
  },
  personalization: {
    preferences: [],
    recentlyViewed: [],
    favoriteCategories: [],
    shoppingPatterns: {},
  },
  isCartOpen: false,
  isNotificationsPaused: false,
};

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(
        item => item.product._id === action.payload.product._id
      );
      
      let newCart: CartItem[];
      if (existingItem) {
        newCart = state.cart.map(item =>
          item.product._id === action.payload.product._id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newCart = [...state.cart, { product: action.payload.product, quantity: action.payload.quantity }];
      }
      
      const totalItems = newCart.reduce((sum, item) => sum + item.quantity, 0);
      const totalValue = newCart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      const savedAmount = newCart.reduce((sum, item) => {
        const saved = item.product.originalPrice ? 
          (item.product.originalPrice - item.product.price) * item.quantity : 0;
        return sum + saved;
      }, 0);
      
      return {
        ...state,
        cart: newCart,
        cartMetrics: {
          ...state.cartMetrics,
          totalItems,
          totalValue,
          savedAmount,
          freeShippingProgress: Math.min(totalValue / state.cartMetrics.freeShippingThreshold * 100, 100),
        },
      };
    }
    
    case 'REMOVE_FROM_CART': {
      const newCart = state.cart.filter(item => item.product._id !== action.payload);
      const totalItems = newCart.reduce((sum, item) => sum + item.quantity, 0);
      const totalValue = newCart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      
      return {
        ...state,
        cart: newCart,
        cartMetrics: {
          ...state.cartMetrics,
          totalItems,
          totalValue,
          freeShippingProgress: Math.min(totalValue / state.cartMetrics.freeShippingThreshold * 100, 100),
        },
      };
    }
    
    case 'TOGGLE_CART':
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
    
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        featuredProducts: action.payload.filter(p => p.isFeatured),
      };
    
    case 'ADD_TO_FAVORITES': {
      const exists = state.favorites.find(p => p._id === action.payload._id);
      if (exists) return state;
      
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    }
    
    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        favorites: state.favorites.filter(p => p._id !== action.payload),
      };
    
    case 'ADD_RECENTLY_VIEWED': {
      const filtered = state.recentlyViewed.filter(p => p._id !== action.payload._id);
      return {
        ...state,
        recentlyViewed: [action.payload, ...filtered].slice(0, 10),
      };
    }
    
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload].slice(-5), // Keep only last 5
      };
    
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload),
      };
    
    case 'ADD_LIVE_ACTIVITY':
      return {
        ...state,
        liveActivity: [action.payload, ...state.liveActivity].slice(0, 20), // Keep only last 20
      };
    
    case 'UPDATE_LIVE_USERS':
      return {
        ...state,
        liveUsersCount: action.payload,
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
        cartMetrics: {
          ...state.cartMetrics,
          totalItems: 0,
          totalValue: 0,
          savedAmount: 0,
          freeShippingProgress: 0,
        },
      };

    case 'UPDATE_CART_QUANTITY': {
      const newCart = state.cart.map(item =>
        item.product._id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      
      const totalItems = newCart.reduce((sum, item) => sum + item.quantity, 0);
      const totalValue = newCart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      const savedAmount = newCart.reduce((sum, item) => {
        const saved = item.product.originalPrice ? 
          (item.product.originalPrice - item.product.price) * item.quantity : 0;
        return sum + saved;
      }, 0);
      
      return {
        ...state,
        cart: newCart,
        cartMetrics: {
          ...state.cartMetrics,
          totalItems,
          totalValue,
          savedAmount,
          freeShippingProgress: Math.min(totalValue / state.cartMetrics.freeShippingThreshold * 100, 100),
        },
      };
    }

    case 'SET_MOOD':
      return {
        ...state,
        currentMood: action.payload,
        personalization: {
          ...state.personalization,
          mood: action.payload as any,
        },
      };
    
    default:
      return state;
  }
};

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  actions: {
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    addToCart: (product: Product, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    toggleCart: () => void;
    addToFavorites: (product: Product) => void;
    removeFromFavorites: (productId: string) => void;
    addRecentlyViewed: (product: Product) => void;
    showNotification: (notification: Omit<UrgencyNotification, 'id' | 'timestamp'>) => void;
    setMood: (mood: string) => void;
  };
} | null>(null);

// Provider
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        dispatch({ type: 'SET_USER', payload: user });
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Simulate live user count updates
  useEffect(() => {
    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * 6) - 3; // -3 to +3
      dispatch({ 
        type: 'UPDATE_LIVE_USERS', 
        payload: Math.max(1000, state.liveUsersCount + change) 
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, [state.liveUsersCount]);

  // Auto-remove notifications after duration
  useEffect(() => {
    state.notifications.forEach(notification => {
      if (notification.duration) {
        setTimeout(() => {
          dispatch({ type: 'REMOVE_NOTIFICATION', payload: notification.id });
        }, notification.duration);
      }
    });
  }, [state.notifications]);

  const actions = {
    login: async (email: string, password: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        
        const data = await response.json();
        
        if (data.success) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          dispatch({ type: 'SET_USER', payload: data.user });
          toast.success('Login realizado com sucesso!');
        } else {
          toast.error(data.message || 'Erro ao fazer login');
        }
      } catch (error) {
        toast.error('Erro de conexão');
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },

    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch({ type: 'SET_USER', payload: null });
      dispatch({ type: 'CLEAR_CART' });
      toast.success('Logout realizado com sucesso!');
    },

    addToCart: (product: Product, quantity: number = 1) => {
      dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
      
      // Show success notification with confetti effect
      toast.success('Produto adicionado ao carrinho! 🎉', {
        icon: '🛒',
      });
      
      // Add live activity
      const activity: LiveActivity = {
        id: Date.now().toString(),
        type: 'add_to_cart',
        userName: state.user?.name || 'Usuário',
        productName: product.name,
        timestamp: new Date().toISOString(),
      };
      dispatch({ type: 'ADD_LIVE_ACTIVITY', payload: activity });
    },

    removeFromCart: (productId: string) => {
      dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
      toast.success('Produto removido do carrinho');
    },

    toggleCart: () => {
      dispatch({ type: 'TOGGLE_CART' });
    },

    addToFavorites: (product: Product) => {
      dispatch({ type: 'ADD_TO_FAVORITES', payload: product });
      toast.success('Adicionado aos favoritos! ❤️');
    },

    removeFromFavorites: (productId: string) => {
      dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: productId });
      toast.success('Removido dos favoritos');
    },

    addRecentlyViewed: (product: Product) => {
      dispatch({ type: 'ADD_RECENTLY_VIEWED', payload: product });
    },

    showNotification: (notification: Omit<UrgencyNotification, 'id' | 'timestamp'>) => {
      const fullNotification: UrgencyNotification = {
        ...notification,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        duration: notification.duration || 5000,
      };
      dispatch({ type: 'ADD_NOTIFICATION', payload: fullNotification });
    },

    setMood: (mood: string) => {
      dispatch({ type: 'SET_MOOD', payload: mood });
      toast.success(`Humor definido como: ${mood} 😊`);
    },
  };

  return (
    <AppContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;