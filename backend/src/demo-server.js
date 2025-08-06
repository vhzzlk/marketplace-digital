const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'demo-secret-key';

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));
app.use(express.json());

// In-memory data store
let users = [
  {
    _id: 'user1',
    name: 'Demo User',
    email: 'demo@cybermarket.com',
    password: '$2a$12$Q8G8j8J8j8j8j8j8j8j8je.hashedPasswordExample',
    role: 'consumer',
    level: 'Bronze',
    points: 150,
    createdAt: new Date().toISOString()
  }
];

let products = [
  {
    _id: 'prod1',
    name: 'Cyber Burger Deluxe',
    description: 'Hambúrguer gourmet com queijo artesanal, bacon crocante e molho especial da casa. Uma experiência gastronômica única!',
    price: 29.90,
    originalPrice: 39.90,
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    category: 'Fast Food',
    rating: 4.8,
    reviewCount: 127,
    preparationTime: 15,
    deliveryTime: 20,
    stock: 50,
    isLimited: true,
    limitedStock: 8,
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    isTrending: true,
    isFeatured: true,
    views: 1247,
    sales: 89,
    seller: {
      _id: 'seller1',
      name: 'Cyber Kitchen',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
    }
  },
  {
    _id: 'prod2',
    name: 'Pizza Quantum Supreme',
    description: 'Pizza com massa artesanal, molho especial e combinação perfeita de ingredientes premium.',
    price: 45.90,
    originalPrice: 55.90,
    imageUrl: 'https://images.unsplash.com/photo-1594007654729-04d280abb6d8?w=400&h=300&fit=crop',
    category: 'Pizza',
    rating: 4.9,
    reviewCount: 203,
    preparationTime: 25,
    deliveryTime: 30,
    stock: 25,
    isLimited: true,
    limitedStock: 3,
    isFlashSale: false,
    isTrending: true,
    isFeatured: true,
    views: 892,
    sales: 156,
    seller: {
      _id: 'seller2',
      name: 'Quantum Pizzeria',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c2cf?w=100&h=100&fit=crop'
    }
  },
  {
    _id: 'prod3',
    name: 'Sushi Fusion Experience',
    description: 'Seleção premium de sushis e sashimis com peixes frescos e técnicas inovadoras.',
    price: 89.90,
    originalPrice: 109.90,
    imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    category: 'Sushi',
    rating: 4.7,
    reviewCount: 89,
    preparationTime: 20,
    deliveryTime: 25,
    stock: 15,
    isLimited: false,
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
    isTrending: false,
    isFeatured: true,
    views: 634,
    sales: 67,
    seller: {
      _id: 'seller3',
      name: 'Fusion Sushi Bar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
    }
  }
];

let liveActivity = [];
let currentUsersOnline = 1247;

// Generate live activity
setInterval(() => {
  const activities = [
    'João acabou de comprar "Cyber Burger Deluxe"',
    'Maria adicionou "Pizza Quantum Supreme" ao carrinho',
    'Carlos está visualizando "Sushi Fusion Experience"',
    'Ana acabou de se cadastrar',
    'Pedro ganhou 50 pontos na última compra'
  ];
  
  const randomActivity = activities[Math.floor(Math.random() * activities.length)];
  
  liveActivity.unshift({
    id: Date.now().toString(),
    type: 'activity',
    message: randomActivity,
    timestamp: new Date().toISOString(),
    userName: 'Usuário',
    productName: 'Produto'
  });
  
  // Keep only last 20 activities
  liveActivity = liveActivity.slice(0, 20);
  
  // Update online users count
  const change = Math.floor(Math.random() * 6) - 3;
  currentUsersOnline = Math.max(1000, currentUsersOnline + change);
}, 8000);

// Routes
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Demo server is running',
    timestamp: new Date().toISOString(),
    environment: 'demo'
  });
});

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, role = 'consumer' } = req.body;
  
  try {
    // Check if user exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Usuário já existe com este email'
      });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create user
    const newUser = {
      _id: `user${Date.now()}`,
      name,
      email,
      password: hashedPassword,
      role,
      level: 'Bronze',
      points: 0,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    
    // Generate token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Return user data without password
    const { password: _, ...userData } = newUser;
    
    res.status(201).json({
      success: true,
      message: 'Usuário registrado com sucesso!',
      token,
      user: userData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao registrar usuário',
      error: error.message
    });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }
    
    // For demo, allow password "demo123" for demo user
    let isPasswordValid = false;
    if (email === 'demo@cybermarket.com' && password === 'demo123') {
      isPasswordValid = true;
    } else {
      isPasswordValid = await bcrypt.compare(password, user.password);
    }
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }
    
    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Return user data without password
    const { password: _, ...userData } = user;
    
    res.json({
      success: true,
      message: 'Login realizado com sucesso!',
      token,
      user: userData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao fazer login',
      error: error.message
    });
  }
});

// Products routes
app.get('/api/products', (req, res) => {
  res.json({
    success: true,
    products,
    count: products.length
  });
});

app.get('/api/products/featured', (req, res) => {
  const featured = products.filter(p => p.isFeatured);
  res.json({
    success: true,
    products: featured,
    count: featured.length
  });
});

app.get('/api/products/flash-sale', (req, res) => {
  const flashSale = products.filter(p => p.isFlashSale);
  res.json({
    success: true,
    products: flashSale,
    count: flashSale.length
  });
});

// Live activity routes
app.get('/api/live/activity', (req, res) => {
  res.json({
    success: true,
    activities: liveActivity,
    onlineUsers: currentUsersOnline,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/live/users-count', (req, res) => {
  res.json({
    success: true,
    count: currentUsersOnline,
    timestamp: new Date().toISOString()
  });
});

// Cart simulation (in a real app, this would be stored per user)
let carts = {};

app.post('/api/cart/add', (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const userId = req.headers.authorization ? 'demo-user' : 'anonymous';
  
  if (!carts[userId]) {
    carts[userId] = [];
  }
  
  const existingItem = carts[userId].find(item => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    carts[userId].push({ productId, quantity });
  }
  
  res.json({
    success: true,
    message: 'Produto adicionado ao carrinho',
    cart: carts[userId]
  });
});

app.get('/api/cart', (req, res) => {
  const userId = req.headers.authorization ? 'demo-user' : 'anonymous';
  const userCart = carts[userId] || [];
  
  const cartItems = userCart.map(item => {
    const product = products.find(p => p._id === item.productId);
    return {
      product,
      quantity: item.quantity
    };
  }).filter(item => item.product);
  
  res.json({
    success: true,
    cart: cartItems
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log('🚀 Demo Marketplace Server iniciado!');
  console.log(`📱 Frontend: http://localhost:5173`);
  console.log(`🔧 API: http://localhost:${PORT}`);
  console.log('💡 Modo demonstração - sem banco de dados');
  console.log('🎯 Login demo: demo@cybermarket.com / demo123');
});