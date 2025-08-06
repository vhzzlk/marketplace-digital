const express = require('express');
const router = express.Router();

// Buscar dados do consumidor
router.get('/:consumerId', (req, res) => {
  res.status(200).json({ message: `Dados do consumidor ${req.params.consumerId}` });
});

// Atualizar dados do consumidor
router.put('/:consumerId', (req, res) => {
  res.status(200).json({ message: `Dados do consumidor ${req.params.consumerId} atualizados` });
});

// Ver pedidos do consumidor
router.get('/:consumerId/orders', (req, res) => {
  res.status(200).json({ message: `Pedidos do consumidor ${req.params.consumerId}` });
});

module.exports = router;