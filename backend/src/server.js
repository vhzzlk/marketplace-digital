const express = require('express');
<<<<<<< HEAD
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
require('dotenv').config();

const { connectDatabase } = require('./config/database');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const consumerRoutes = require('./routes/consumerRoutes');
const sellerRoutes = require('./routes/sellerRoutes');

const app = express();

// Conectar ao banco de dados
connectDatabase();

// Middlewares de segurança
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // limite por IP
});
app.use('/api/', limiter);

// Middlewares
app.use(compression());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Sanitização
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/consumer', consumerRoutes);
app.use('/api/seller', sellerRoutes);

// Rota de teste
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Marketplace Digital API funcionando!',
    timestamp: new Date().toISOString()
  });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error('❌ Erro:', err);
  res.status(500).json({ 
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Algo deu errado'
  });
});

// Rota 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('🚀 Marketplace Digital Backend iniciado!');
  console.log(`📱 Frontend: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  console.log(`🔧 API: http://localhost:${PORT}`);
  console.log(`🌐 Health Check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
=======
const mongoose = require('mongoose');
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/marketplace';

// Conexão com o banco de dados
mongoose.connect(MONGODB_URI)
.then(() => {
    console.log('✅ Conectado ao banco de dados MongoDB Atlas');
    console.log(`🌐 Servidor rodando na porta ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
})
.catch(err => {
    console.error('❌ Erro ao conectar ao banco de dados:', err.message);
    process.exit(1);
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`🚀 Marketplace Digital Backend iniciado!`);
    console.log(`📱 Frontend: http://localhost:5173`);
    console.log(`🔧 API: http://localhost:${PORT}`);
});
>>>>>>> f73d985fb2c11ca1b8aeb6510f4465ea32fd8f9c
