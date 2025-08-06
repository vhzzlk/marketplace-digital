import React from 'react';

const SellerPanel: React.FC = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Painel do Vendedor</h1>
            <div className="mb-4">
                <h2 className="text-xl">Gerenciar Produtos</h2>
                {/* Aqui você pode adicionar a lógica para gerenciar produtos */}
            </div>
            <div>
                <h2 className="text-xl">Visualizar Vendas</h2>
                {/* Aqui você pode adicionar a lógica para visualizar vendas */}
            </div>
        </div>
    );
};

export default SellerPanel;