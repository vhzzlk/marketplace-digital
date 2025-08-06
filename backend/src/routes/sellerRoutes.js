const express = require('express');
const router = express.Router();

// Listar produtos do vendedor
router.get('/:sellerId/products', (req, res) => {
  res.status(200).json({ message: `Produtos do vendedor ${req.params.sellerId}` });
});

// Adicionar produto
router.post('/:sellerId/products', (req, res) => {
  res.status(201).json({ message: `Produto adicionado pelo vendedor ${req.params.sellerId}` });
});

// Ver vendas do vendedor
router.get('/:sellerId/orders', (req, res) => {
  res.status(200).json({ message: `Pedidos do vendedor ${req.params.sellerId}` });
});

module.exports = router;