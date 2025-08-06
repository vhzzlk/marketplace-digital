const express = require('express');
const router = express.Router();

// Listar pedidos de um usuário
router.get('/:userId', (req, res) => {
  res.status(200).json({ message: `Pedidos do usuário ${req.params.userId}` });
});

// Criar novo pedido
router.post('/:userId', (req, res) => {
  res.status(201).json({ message: `Pedido criado para o usuário ${req.params.userId}` });
});

// Cancelar pedido
router.delete('/:userId/:orderId', (req, res) => {
  res.status(200).json({ message: `Pedido ${req.params.orderId} do usuário ${req.params.userId} cancelado` });
});

module.exports = router;