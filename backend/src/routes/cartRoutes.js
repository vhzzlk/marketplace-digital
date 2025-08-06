const express = require('express');
const router = express.Router();

// Buscar o carrinho de um usuário
router.get('/:userId', (req, res) => {
  res.status(200).json({ message: `Carrinho do usuário ${req.params.userId}` });
});

// Adicionar item ao carrinho
router.post('/:userId/items', (req, res) => {
  res.status(201).json({ message: `Item adicionado ao carrinho do usuário ${req.params.userId}` });
});

// Remover item do carrinho
router.delete('/:userId/items/:itemId', (req, res) => {
  res.status(200).json({ message: `Item ${req.params.itemId} removido do carrinho do usuário ${req.params.userId}` });
});

// Limpar o carrinho
router.delete('/:userId', (req, res) => {
  res.status(200).json({ message: `Carrinho do usuário ${req.params.userId} limpo` });
});

module.exports = router;