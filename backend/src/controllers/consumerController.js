const Consumer = require('../models/User'); // Supondo que o modelo de consumidor seja o mesmo que o de usuário
const Order = require('../models/Order');

// Função para obter informações do consumidor
exports.getConsumerInfo = async (req, res) => {
    try {
        const consumerId = req.params.id;
        const consumer = await Consumer.findById(consumerId);
        if (!consumer) {
            return res.status(404).json({ message: 'Consumidor não encontrado' });
        }
        res.status(200).json(consumer);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter informações do consumidor', error });
    }
};

// Função para obter pedidos do consumidor
exports.getConsumerOrders = async (req, res) => {
    try {
        const consumerId = req.params.id;
        const orders = await Order.find({ consumerId });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter pedidos do consumidor', error });
    }
};