const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://vhzzlk:cybermarket123@cluster1.zxujiow.mongodb.net/marketplace?retryWrites=true&w=majority';

console.log('🔍 Testando conexão...');
console.log('🔍 URI:', MONGODB_URI);

async function testConnection() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conexão bem-sucedida!');
    
    // Testar uma operação simples
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📊 Collections encontradas:', collections.map(c => c.name));
    
  } catch (error) {
    console.error('❌ Erro na conexão:', error.message);
    console.error('🔍 Detalhes:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Desconectado');
  }
}

testConnection(); 