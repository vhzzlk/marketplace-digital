# 🔧 CONFIGURAÇÃO DO ARQUIVO .ENV

## 📋 Passo a Passo

### 1. Criar o arquivo .env
Na pasta `backend/`, crie um arquivo chamado `.env` (sem extensão)

### 2. Copiar o conteúdo básico
Cole o seguinte conteúdo no arquivo `.env`:

```env
# ========================================
# CONFIGURAÇÃO BÁSICA (OBRIGATÓRIA)
# ========================================
PORT=5000
NODE_ENV=development

# ========================================
# BANCO DE DADOS (OBRIGATÓRIO)
# ========================================
# Para MongoDB Local:
MONGODB_URI=mongodb://localhost:27017/marketplace

# ========================================
# AUTENTICAÇÃO (OBRIGATÓRIA)
# ========================================
JWT_SECRET=cybermarket-super-secret-jwt-key-2024-change-in-production
JWT_EXPIRES_IN=7d

# ========================================
# FRONTEND (OBRIGATÓRIO)
# ========================================
FRONTEND_URL=http://localhost:5173

# ========================================
# SEGURANÇA (OBRIGATÓRIO)
# ========================================
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🔍 Verificações Importantes

### ✅ MongoDB Local
Se você está usando MongoDB local:
1. Certifique-se que o MongoDB está instalado
2. Inicie o serviço: `mongod`
3. Use: `MONGODB_URI=mongodb://localhost:27017/marketplace`

### ✅ MongoDB Atlas (Recomendado)
Se você está usando MongoDB Atlas:
1. Crie uma conta no MongoDB Atlas
2. Crie um cluster gratuito
3. Obtenha a string de conexão
4. Substitua a linha MONGODB_URI por:
```env
MONGODB_URI=mongodb+srv://seu-usuario:sua-senha@cluster.mongodb.net/marketplace?retryWrites=true&w=majority
```

### ✅ Porta do Frontend
Certifique-se que a porta 5173 está correta:
- Se o frontend rodar na porta 3000: `FRONTEND_URL=http://localhost:3000`
- Se o frontend rodar na porta 5173: `FRONTEND_URL=http://localhost:5173`

## 🚨 Problemas Comuns

### ❌ Erro: "MongoDB connection failed"
**Solução:**
- Verifique se o MongoDB está rodando
- Confirme a string de conexão
- Teste a conexão: `mongosh`

### ❌ Erro: "CORS policy"
**Solução:**
- Verifique se `FRONTEND_URL` está correto
- Confirme a porta do frontend

### ❌ Erro: "JWT_SECRET is required"
**Solução:**
- Certifique-se que `JWT_SECRET` está definido
- Use uma chave forte e única

## 🧪 Teste da Configuração

### 1. Verificar se o arquivo existe
```bash
cd backend
ls -la .env
```

### 2. Testar a conexão
```bash
npm run dev
```

### 3. Verificar logs
Se tudo estiver correto, você verá:
```
✅ Conectado ao banco de dados
✅ Servidor rodando na porta 5000
✅ Rate limiting configurado
✅ CORS configurado
```

## 📝 Exemplo Completo

Aqui está um exemplo completo do arquivo `.env`:

```env
# ========================================
# CYBERMARKET - CONFIGURAÇÃO DE AMBIENTE
# ========================================

# ========================================
# CONFIGURAÇÃO DO SERVIDOR
# ========================================
PORT=5000
NODE_ENV=development

# ========================================
# CONFIGURAÇÃO DO BANCO DE DADOS
# ========================================
# Para MongoDB Local:
MONGODB_URI=mongodb://localhost:27017/marketplace

# Para MongoDB Atlas (descomente e configure):
# MONGODB_URI=mongodb+srv://seu-usuario:sua-senha@cluster.mongodb.net/marketplace?retryWrites=true&w=majority

# ========================================
# CONFIGURAÇÃO JWT (AUTENTICAÇÃO)
# ========================================
# IMPORTANTE: Mude esta chave em produção!
JWT_SECRET=cybermarket-super-secret-jwt-key-2024-change-in-production
JWT_EXPIRES_IN=7d

# ========================================
# CONFIGURAÇÃO CORS (FRONTEND)
# ========================================
FRONTEND_URL=http://localhost:5173

# ========================================
# CONFIGURAÇÃO RATE LIMITING
# ========================================
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# ========================================
# CONFIGURAÇÃO REDIS (CACHE - OPCIONAL)
# ========================================
# Para Redis Local:
REDIS_URL=redis://localhost:6379

# ========================================
# CONFIGURAÇÃO DE LOGS
# ========================================
LOG_LEVEL=debug

# ========================================
# CONFIGURAÇÃO DE DESENVOLVIMENTO
# ========================================
DEBUG=true
```

## ✅ Checklist Final

- [ ] Arquivo `.env` criado na pasta `backend/`
- [ ] MongoDB configurado (local ou Atlas)
- [ ] JWT_SECRET definido
- [ ] FRONTEND_URL correto
- [ ] Backend inicia sem erros
- [ ] Frontend conecta com o backend

---

**🎉 Seu arquivo .env está configurado corretamente!** 