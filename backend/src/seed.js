const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Product = require('./models/Product');

// Definir a string de conexão diretamente
const MONGODB_URI = 'mongodb+srv://vhzzlk:cybermarket123@cluster1.zxujiow.mongodb.net/marketplace?retryWrites=true&w=majority';

console.log('🔍 Debug - MONGODB_URI:', MONGODB_URI);

async function seedDatabase() {
  try {
    // Conectar ao banco com configurações específicas
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Conectado ao banco de dados');

    // Limpar dados existentes
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('🗑️ Dados antigos removidos');

    // Criar usuário demo
    const hashedPassword = await bcrypt.hash('demo123', 12);
    const demoUser = await User.create({
      name: 'Demo User',
      email: 'demo@cybermarket.com',
      password: hashedPassword,
      role: 'consumer'
    });

    // Criar vendedor demo
    const sellerUser = await User.create({
      name: 'Cyber Kitchen',
      email: 'seller@cybermarket.com',
      password: hashedPassword,
      role: 'seller'
    });

    console.log('👤 Usuários criados');

    // Criar produtos demo
    const products = [
      {
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
        flashSaleEndsAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 horas
        isTrending: true,
        isFeatured: true,
        views: 1247,
        sales: 89,
        seller: sellerUser._id
      },
      {
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
        seller: sellerUser._id
      },
      {
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
        isFlashSale: false,
        isTrending: false,
        isFeatured: true,
        views: 456,
        sales: 67,
        seller: sellerUser._id
      },
      {
        name: 'Coca-Cola Zero',
        description: 'Refrigerante Coca-Cola Zero, sem açúcar, sabor original.',
        price: 6.90,
        originalPrice: 8.90,
        imageUrl: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=300&fit=crop',
        category: 'Bebidas',
        rating: 4.5,
        reviewCount: 45,
        preparationTime: 2,
        deliveryTime: 15,
        stock: 100,
        isLimited: false,
        isFlashSale: true,
        flashSaleEndsAt: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hora
        isTrending: false,
        isFeatured: false,
        views: 234,
        sales: 123,
        seller: sellerUser._id
      },
      {
        name: 'Tiramisu Clássico',
        description: 'Sobremesa italiana tradicional com café, mascarpone e cacau em pó.',
        price: 18.90,
        originalPrice: 22.90,
        imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
        category: 'Sobremesas',
        rating: 4.6,
        reviewCount: 78,
        preparationTime: 10,
        deliveryTime: 20,
        stock: 30,
        isLimited: true,
        limitedStock: 5,
        isFlashSale: false,
        isTrending: true,
        isFeatured: false,
        views: 567,
        sales: 89,
        seller: sellerUser._id
      }
    ];

    await Product.insertMany(products);
    console.log('🛍️ Produtos criados');

    console.log('\n🎉 Banco de dados populado com sucesso!');
    console.log('\n📋 Dados de acesso:');
    console.log('👤 Usuário Demo: demo@cybermarket.com / demo123');
    console.log('🏪 Vendedor: seller@cybermarket.com / demo123');
    console.log('\n🚀 Execute: npm run dev');

  } catch (error) {
    console.error('❌ Erro ao popular banco:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Desconectado do banco');
  }
}

seedDatabase(); 