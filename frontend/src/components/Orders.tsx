import React, { useEffect, useState } from 'react';

const Orders: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/orders'); // Ajuste a URL conforme necessário
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Erro ao buscar pedidos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div>Carregando pedidos...</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Histórico de Pedidos</h2>
            {orders.length === 0 ? (
                <p>Nenhum pedido encontrado.</p>
            ) : (
                <ul>
                    {orders.map((order) => (
                        <li key={order.id} className="border-b py-2">
                            <h3 className="font-semibold">Pedido #{order.id}</h3>
                            <p>Status: {order.status}</p>
                            <p>Total: R$ {order.total.toFixed(2)}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Orders;