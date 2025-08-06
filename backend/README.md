# Marketplace Digital Backend

Este é o backend do projeto Marketplace Digital, que serve como uma plataforma para gerenciar um marketplace semelhante ao iFood. O backend é construído utilizando Node.js e Express.js, e fornece as APIs necessárias para suportar as funcionalidades do frontend.

## Estrutura do Projeto

A estrutura do projeto é a seguinte:

```
backend
├── src
│   ├── controllers       # Controladores para gerenciar a lógica de negócios
│   ├── models            # Modelos de dados para usuários, produtos, pedidos e carrinho
│   ├── routes            # Definição das rotas da API
│   ├── middlewares       # Middlewares para autenticação e proteção de rotas
│   ├── app.js            # Configuração do aplicativo Express
│   └── server.js         # Inicialização do servidor
├── package.json          # Dependências e scripts do projeto
└── README.md             # Documentação do projeto
```

## Funcionalidades

- **Autenticação**: Registro e login de usuários.
- **Gerenciamento de Carrinho**: Adicionar e remover itens do carrinho de compras.
- **Pedidos**: Criação e visualização do histórico de pedidos.
- **Painéis de Vendedores e Consumidores**: Funcionalidades específicas para gerenciar produtos e visualizar informações de pedidos.

## Como Executar

1. Clone o repositório:
   ```
   git clone <URL_DO_REPOSITORIO>
   cd marketplace-digital/backend
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Inicie o servidor:
   ```
   npm start
   ```

O servidor estará rodando em `http://localhost:3000`.

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções. Para isso, crie um fork do repositório e envie um pull request.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.