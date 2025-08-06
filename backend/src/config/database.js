const mongoose = require('mongoose');

// Dados mock para desenvolvimento quando MongoDB não está disponível
const mockData = {
  users: [
    {
      _id: 'mock-user-1',
      name: 'Demo User',
      email: 'demo@cybermarket.com',
      password: '$2a$12$mock-hash',
      role: 'consumer'
    },
    {
      _id: 'mock-seller-1',
      name: 'Cyber Kitchen',
      email: 'seller@cybermarket.com',
      password: '$2a$12$mock-hash',
      role: 'seller'
    }
  ],
  products: [
    {
      _id: 'mock-product-1',
      name: 'Cyber Burger Deluxe',
      description: 'Hambúrguer gourmet com queijo artesanal, bacon crocante e molho especial da casa.',
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
      flashSaleEndsAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
      isTrending: true,
      isFeatured: true,
      views: 1247,
      sales: 89,
      seller: 'mock-seller-1'
    },
    {
      _id: 'mock-product-2',
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
      seller: 'mock-seller-1'
    }
  ]
};

let isConnected = false;
let useMockData = false;

async function connectDatabase() {
  const MONGODB_URI = process.env.MONGODB_URI;
  
  if (!MONGODB_URI) {
    console.log('⚠️ MONGODB_URI não configurada, usando dados mock');
    useMockData = true;
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5 segundos timeout
    });
    
    isConnected = true;
    console.log('✅ Conectado ao MongoDB Atlas');
    
  } catch (error) {
    console.log('⚠️ Erro ao conectar ao MongoDB Atlas, usando dados mock');
    console.log('💡 Para usar MongoDB Atlas:');
    console.log('   1. Configure MONGODB_URI no arquivo .env');
    console.log('   2. Adicione seu IP na whitelist do MongoDB Atlas');
    console.log('   3. Verifique se o usuário e senha estão corretos');
    
    useMockData = true;
  }
}

function getMockData() {
  return mockData;
}

function isUsingMockData() {
  return useMockData;
}

function isDatabaseConnected() {
  return isConnected;
}

module.exports = {
  connectDatabase,
  getMockData,
  isUsingMockData,
  isDatabaseConnected
}; 