import React, { useState } from 'react';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems([...cartItems, item]);
    };

    const removeFromCart = (itemToRemove) => {
        setCartItems(cartItems.filter(item => item.id !== itemToRemove.id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <div className="cart">
            <h2 className="text-xl font-bold">Carrinho de Compras</h2>
            {cartItems.length === 0 ? (
                <p>Seu carrinho está vazio.</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id} className="flex justify-between items-center">
                            <span>{item.name}</span>
                            <button onClick={() => removeFromCart(item)} className="text-red-500">Remover</button>
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={clearCart} className="mt-4 bg-red-500 text-white px-4 py-2">Limpar Carrinho</button>
        </div>
    );
};

export default Cart;