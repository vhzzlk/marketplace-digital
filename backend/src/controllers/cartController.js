const Cart = require('../models/Cart');

// Adicionar item ao carrinho
exports.addItemToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const existingItem = cart.items.find(item => item.productId === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar item ao carrinho', error });
    }
};

// Remover item do carrinho
exports.removeItemFromCart = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Carrinho não encontrado' });
        }

        cart.items = cart.items.filter(item => item.productId !== productId);
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao remover item do carrinho', error });
    }
};

// Obter carrinho do usuário
exports.getCart = async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Carrinho não encontrado' });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter carrinho', error });
    }
};