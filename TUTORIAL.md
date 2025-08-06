# 🛒 Tutorial Completo - Marketplace Digital

## 📋 Índice
1. [Pré-requisitos](#pré-requisitos)
2. [Instalação](#instalação)
3. [Execução](#execução)
4. [Funcionalidades](#funcionalidades)
5. [Troubleshooting](#troubleshooting)
6. [Estrutura do Projeto](#estrutura-do-projeto)

---

## 🎯 Pré-requisitos

### Software Necessário
- **Node.js** (versão 16 ou superior)
  - Download: https://nodejs.org/
  - Verificar instalação: `node --version`
- **Navegador web moderno** (Chrome, Firefox, Edge)

### Conta MongoDB Atlas (Opcional)
- O projeto já está configurado com uma conta MongoDB Atlas
- Se quiser usar sua própria conta, edite o arquivo `backend/.env`

---

## 🚀 Instalação

### Passo 1: Verificar Node.js
```powershell
node --version
npm --version
```

**Resultado esperado:**
```
v18.17.0 (ou superior)
9.6.7 (ou superior)
```

### Passo 2: Configurar Backend
```powershell
# Navegar para a pasta backend
cd backend

# Copiar arquivo de configuração
copy env_final.txt .env

# Instalar dependências
npm install
```

### Passo 3: Configurar Frontend
```powershell
# Voltar para a pasta raiz
cd ..

# Navegar para a pasta frontend
cd frontend

# Instalar dependências
npm install
```

### Passo 4: Verificar Instalação
```powershell
# Voltar para a pasta raiz
cd ..

# Verificar se os arquivos foram criados
dir backend\node_modules
dir frontend\node_modules
```

---

## ⚡ Execução

### Opção 1: Execução Manual (Recomendado)

#### Terminal 1 - Backend
```powershell
# Abrir novo terminal
cd backend
npm run dev
```

**Resultado esperado:**
```
✅ Conectado ao banco de dados MongoDB Atlas
🌐 Servidor rodando na porta 5000
📊 Health check: http://localhost:5000/api/health
🚀 Marketplace Digital Backend iniciado!
📱 Frontend: http://localhost:5173
🔧 API: http://localhost:5000
```

#### Terminal 2 - Frontend
```powershell
# Abrir novo terminal
cd frontend
npm start
```

**Resultado esperado:**
```
VITE v4.5.14  ready in 244 ms
➜  Local:   http://localhost:5173/
➜  Network: http://192.168.15.22:5173/
```

### Opção 2: Execução Automática

#### Criar Script de Inicialização
Crie um arquivo `start.bat` na pasta raiz:

```batch
@echo off
echo Iniciando Marketplace Digital...
echo.

echo Iniciando Backend...
start "Backend" cmd /k "cd backend && npm run dev"

timeout /t 3

echo Iniciando Frontend...
start "Frontend" cmd /k "cd frontend && npm start"

echo.
echo Marketplace iniciado!
echo Frontend: http://localhost:5173
echo Backend: http://localhost:5000
pause
```

#### Executar Script
```powershell
.\start.bat
```

---

## 🌐 URLs de Acesso

| Serviço | URL | Descrição |
|---------|-----|-----------|
| **Frontend** | http://localhost:5173 | Interface principal |
| **Backend API** | http://localhost:5000 | API REST |
| **Health Check** | http://localhost:5000/api/health | Status do servidor |

---

## 📱 Funcionalidades

### Para Vendedores
- ✅ **Cadastro e Login**
  - Registro de conta vendedor
  - Login com email e senha
  - Autenticação JWT

- ✅ **Dashboard de Vendas**
  - Visão geral das vendas
  - Estatísticas de produtos
  - Gráficos de performance

- ✅ **Gerenciamento de Produtos**
  - Adicionar novos produtos
  - Editar informações
  - Upload de imagens
  - Controle de estoque

- ✅ **Visualização de Pedidos**
  - Lista de pedidos recebidos
  - Status de cada pedido
  - Histórico de vendas

### Para Consumidores
- ✅ **Cadastro e Login**
  - Registro de conta consumidor
  - Login seguro
  - Recuperação de senha

- ✅ **Navegação por Produtos**
  - Catálogo completo
  - Filtros e busca
  - Detalhes dos produtos
  - Avaliações e comentários

- ✅ **Carrinho de Compras**
  - Adicionar produtos
  - Quantidade ajustável
  - Cálculo automático
  - Finalização de compra

- ✅ **Histórico de Pedidos**
  - Pedidos realizados
  - Status de entrega
  - Rastreamento

### Sistema Geral
- ✅ **Autenticação JWT**
  - Tokens seguros
  - Expiração automática
  - Refresh tokens

- ✅ **Rate Limiting**
  - Proteção contra spam
  - Limite de requisições
  - Bloqueio temporário

- ✅ **Validação de Dados**
  - Validação de entrada
  - Sanitização
  - Prevenção de injeção

- ✅ **Interface Responsiva**
  - Design mobile-first
  - Adaptação automática
  - Experiência otimizada

---

## 🚨 Troubleshooting

### Problema 1: "Node.js não encontrado"
**Sintomas:**
```
'node' não é reconhecido como um comando interno ou externo
```

**Solução:**
1. Baixe e instale Node.js: https://nodejs.org/
2. Reinicie o terminal
3. Verifique: `node --version`

### Problema 2: "Erro de conexão MongoDB"
**Sintomas:**
```
❌ Erro ao conectar ao banco de dados: Invalid URI
```

**Solução:**
1. Verifique se o arquivo `.env` existe em `backend/`
2. Confirme se a URI está correta
3. Teste a conexão: `curl http://localhost:5000/api/health`

### Problema 3: "Porta já em uso"
**Sintomas:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solução:**
```powershell
# Encontrar processo usando a porta
netstat -ano | findstr :5000

# Matar o processo (substitua XXXX pelo PID)
taskkill /PID XXXX /F
```

### Problema 4: "Dependências não instaladas"
**Sintomas:**
```
Cannot find module 'express'
```

**Solução:**
```powershell
# Backend
cd backend
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install

# Frontend
cd frontend
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

### Problema 5: "Erro de CORS"
**Sintomas:**
```
Access to fetch at 'http://localhost:5000' from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solução:**
1. Verifique se o backend está rodando
2. Confirme se o frontend está na porta 5173
3. Reinicie ambos os serviços

### Problema 6: "Página não carrega"
**Sintomas:**
```
404 Not Found
```

**Solução:**
1. Verifique se o Vite está rodando
2. Confirme se não há erros no console
3. Tente acessar: http://localhost:5173

---

## 📁 Estrutura do Projeto

```
marketplace-digital/
├── 📁 backend/                    # API REST
│   ├── 📁 src/
│   │   ├── 📁 controllers/        # Controladores da API
│   │   │   ├── authController.js
│   │   │   ├── cartController.js
│   │   │   ├── consumerController.js
│   │   │   ├── orderController.js
│   │   │   ├── productController.js
│   │   │   └── sellerController.js
│   │   ├── 📁 models/            # Modelos MongoDB
│   │   │   ├── Cart.js
│   │   │   ├── Order.js
│   │   │   ├── Product.js
│   │   │   └── User.js
│   │   ├── 📁 routes/            # Rotas da API
│   │   │   ├── authRoutes.js
│   │   │   ├── cartRoutes.js
│   │   │   ├── consumerRoutes.js
│   │   │   ├── orderRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   └── sellerRoutes.js
│   │   ├── 📁 middlewares/       # Middlewares
│   │   │   └── authMiddleware.js
│   │   ├── app.js               # Configuração Express
│   │   └── server.js            # Servidor principal
│   ├── 📄 package.json          # Dependências backend
│   ├── 📄 env_final.txt         # Configurações
│   └── 📄 .env                  # Variáveis de ambiente
├── 📁 frontend/                  # Interface React
│   ├── 📁 src/
│   │   ├── 📁 components/       # Componentes React
│   │   │   ├── Cart.tsx
│   │   │   ├── ConsumerPanel.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Orders.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   └── SellerPanel.tsx
│   │   ├── 📁 pages/           # Páginas da aplicação
│   │   │   ├── ConsumerDashboard.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── OrdersPage.tsx
│   │   │   └── SellerDashboard.tsx
│   │   ├── App.tsx             # Componente principal
│   │   ├── main.tsx            # Ponto de entrada
│   │   └── index.css           # Estilos globais
│   ├── 📁 public/              # Arquivos públicos
│   │   └── index.html          # HTML principal
│   ├── 📄 package.json         # Dependências frontend
│   ├── 📄 vite.config.ts       # Configuração Vite
│   ├── 📄 tailwind.config.js   # Configuração Tailwind
│   └── 📄 tsconfig.json        # Configuração TypeScript
├── 📄 README.md                 # Documentação principal
└── 📄 TUTORIAL.md              # Este tutorial
```

---

## 🔧 Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Banco de dados
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação
- **bcryptjs** - Criptografia
- **CORS** - Cross-origin requests
- **Helmet** - Segurança
- **Rate Limiting** - Proteção contra spam

### Frontend
- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **Tailwind CSS** - Framework CSS
- **React Router** - Roteamento
- **Framer Motion** - Animações
- **React Hot Toast** - Notificações
- **Lucide React** - Ícones

---

## 📊 Logs e Debugging

### Backend Logs
```javascript
// Logs de conexão
✅ Conectado ao banco de dados MongoDB Atlas
🌐 Servidor rodando na porta 5000
📊 Health check: http://localhost:5000/api/health

// Logs de erro
❌ Erro ao conectar ao banco de dados: [mensagem]
```

### Frontend Logs
```javascript
// Logs de inicialização
VITE v4.5.14  ready in 244 ms
➜  Local:   http://localhost:5173/
➜  Network: http://192.168.15.22:5173/

// Logs de erro
[Vite] Error: [mensagem]
```

### Verificar Status dos Serviços
```powershell
# Verificar portas em uso
netstat -an | findstr ":5000|:5173"

# Verificar processos Node.js
Get-Process node -ErrorAction SilentlyContinue

# Testar API
curl http://localhost:5000/api/health
```

---

## 🎯 Próximos Passos

### 1. Primeira Execução
1. Siga o tutorial de instalação
2. Execute backend e frontend
3. Acesse http://localhost:5173
4. Crie uma conta de teste

### 2. Exploração das Funcionalidades
1. **Como Vendedor:**
   - Registre uma conta vendedor
   - Adicione produtos
   - Visualize pedidos

2. **Como Consumidor:**
   - Registre uma conta consumidor
   - Navegue pelos produtos
   - Faça uma compra

### 3. Personalização
1. Edite cores e estilos em `frontend/src/index.css`
2. Modifique componentes em `frontend/src/components/`
3. Adicione novas funcionalidades
4. Configure seu próprio MongoDB Atlas

### 4. Deploy
1. Configure variáveis de produção
2. Use serviços como Vercel (frontend) e Railway (backend)
3. Configure domínio personalizado

---

## 📞 Suporte

### Problemas Comuns
- **Erro 404:** Verifique se os serviços estão rodando
- **Erro de CORS:** Confirme URLs no backend
- **Erro de MongoDB:** Verifique conexão e credenciais
- **Erro de Dependências:** Reinstale node_modules

### Recursos Úteis
- **Documentação React:** https://reactjs.org/
- **Documentação Vite:** https://vitejs.dev/
- **Documentação Express:** https://expressjs.com/
- **Documentação MongoDB:** https://docs.mongodb.com/

---

## 🎉 Conclusão

Seu marketplace digital está pronto para uso! 

**URLs principais:**
- 🌐 **Frontend:** http://localhost:5173
- 🔧 **Backend:** http://localhost:5000
- 📊 **Health:** http://localhost:5000/api/health

**Funcionalidades disponíveis:**
- ✅ Cadastro e login de usuários
- ✅ Dashboard de vendedores e consumidores
- ✅ Gerenciamento de produtos
- ✅ Carrinho de compras
- ✅ Sistema de pedidos
- ✅ Interface responsiva

**🚀 Divirta-se explorando seu marketplace digital!** 