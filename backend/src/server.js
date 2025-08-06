const express = require('express');
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