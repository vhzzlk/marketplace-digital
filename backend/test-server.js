const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Marketplace Digital API funcionando!',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/products', (req, res) => {
  res.json({
    success: true,
    data: [
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
      }
    ],
    message: 'Produtos carregados (modo demo)'
  });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log('🚀 Marketplace Digital Backend iniciado!');
  console.log(`📱 Frontend: http://localhost:5173`);
  console.log(`🔧 API: http://localhost:${PORT}`);
  console.log(`🌐 Health Check: http://localhost:${PORT}/api/health`);
  console.log('✅ Servidor funcionando em modo demo');
}); 