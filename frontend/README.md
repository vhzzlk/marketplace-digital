# Marketplace Digital

Este é um projeto de marketplace digital que permite a interação entre consumidores e vendedores, semelhante ao iFood. O projeto é dividido em duas partes principais: o frontend, desenvolvido em React com TailwindCSS, e o backend, desenvolvido em Node.js com Express.js.

## Estrutura do Projeto

```
marketplace-digital
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── Cart.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Orders.tsx
│   │   │   ├── SellerPanel.tsx
│   │   │   └── ConsumerPanel.tsx
│   │   ├── pages
│   │   │   ├── Home.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── OrdersPage.tsx
│   │   │   ├── SellerDashboard.tsx
│   │   │   └── ConsumerDashboard.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── public
│   │   └── index.html
│   ├── tailwind.config.js
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
├── backend
│   ├── src
│   │   ├── controllers
│   │   │   ├── authController.js
│   │   │   ├── cartController.js
│   │   │   ├── orderController.js
│   │   │   ├── sellerController.js
│   │   │   └── consumerController.js
│   │   ├── models
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   ├── Order.js
│   │   │   └── Cart.js
│   │   ├── routes
│   │   │   ├── authRoutes.js
│   │   │   ├── cartRoutes.js
│   │   │   ├── orderRoutes.js
│   │   │   ├── sellerRoutes.js
│   │   │   └── consumerRoutes.js
│   │   ├── middlewares
│   │   │   └── authMiddleware.js
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── README.md
└── README.md
```

## Funcionalidades

### Frontend
- **Carrinho**: Gerencia a exibição e manipulação do carrinho de compras.
- **Login**: Formulário de login e autenticação do usuário.
- **Pedidos**: Exibe o histórico de pedidos do usuário.
- **Painéis**: 
  - **Vendedor**: Gerencia produtos e visualiza vendas.
  - **Consumidor**: Acessa informações e pedidos.

### Backend
- **Autenticação**: Registro e login de usuários.
- **Gerenciamento de Carrinho**: Adicionar e remover itens do carrinho.
- **Gerenciamento de Pedidos**: Criação e visualização do histórico de pedidos.
- **Gerenciamento de Produtos**: Vendedores podem gerenciar seus produtos.

## Tecnologias Utilizadas
- **Frontend**: React, TypeScript, TailwindCSS
- **Backend**: Node.js, Express.js

## Como Executar o Projeto

### Frontend
1. Navegue até a pasta `frontend`.
2. Instale as dependências:
   ```
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```
   npm start
   ```

### Backend
1. Navegue até a pasta `backend`.
2. Instale as dependências:
   ```
   npm install
   ```
3. Inicie o servidor:
   ```
   npm start
   ```

## Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Licença
Este projeto está sob a licença MIT.