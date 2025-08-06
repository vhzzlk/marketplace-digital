# 🛒 CyberMarket

Marketplace digital completo com funcionalidades de vendedor e consumidor, construído com React + TypeScript (frontend) e Node.js + Express + MongoDB (backend).

## 🚀 Início Rápido

### Pré-requisitos
- Node.js 16+ 
- MongoDB Atlas (opcional - funciona com dados demo)

### Instalação

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (novo terminal)
cd frontend
npm install
npm start
```

### Acesso
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000
- **Health Check:** http://localhost:5000/api/health

## 📱 Funcionalidades

### Para Vendedores
- ✅ Dashboard de vendas
- ✅ Gerenciamento de produtos
- ✅ Visualização de pedidos

### Para Consumidores
- ✅ Navegação por produtos
- ✅ Carrinho de compras
- ✅ Histórico de pedidos

### Sistema
- ✅ Autenticação JWT
- ✅ Rate limiting
- ✅ Interface responsiva
- ✅ Notificações em tempo real
- ✅ Modo demo (funciona sem banco)

## 🛠️ Tecnologias

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion

### Backend
- Node.js + Express
- MongoDB Atlas (opcional)
- JWT Authentication
- bcryptjs

## 📁 Estrutura

```
marketplace-digital-main/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── config/
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   └── App.tsx
│   └── package.json
└── README.md
```

## 🔧 Configuração do Banco (Opcional)

### Opção 1: Modo Demo (Recomendado)
O projeto funciona perfeitamente sem banco de dados usando dados mock:

```bash
# Apenas execute
cd backend
npm run dev

cd frontend
npm start
```

### Opção 2: MongoDB Atlas
Se quiser usar banco real:

1. Crie conta no [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crie um cluster gratuito
3. Configure o arquivo `backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://seu-usuario:sua-senha@cluster.mongodb.net/marketplace?retryWrites=true&w=majority
JWT_SECRET=sua-chave-secreta
FRONTEND_URL=http://localhost:5173
```

4. Adicione seu IP na whitelist do MongoDB Atlas
5. Execute o seed: `node src/seed.js`

## 🎯 Demo

**Login:** demo@cybermarket.com  
**Senha:** demo123

**Vendedor:** seller@cybermarket.com  
**Senha:** demo123

## 🔍 Troubleshooting

### Erro de conexão com banco
- O projeto funciona em modo demo automaticamente
- Se quiser usar MongoDB Atlas, verifique:
  - IP adicionado na whitelist
  - String de conexão correta
  - Usuário e senha válidos

### Erro de dependências
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### Erro de porta
- Backend: porta 5000
- Frontend: porta 5173
- Verifique se as portas estão livres

## 🚀 Deploy

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
```

### Backend (Railway/Render)
```bash
cd backend
npm start
```

---

**🚀 Seu marketplace digital está pronto!**

O projeto funciona imediatamente em modo demo, sem necessidade de configuração de banco de dados. 