// Configuração da API
const API_BASE_URL = 'http://localhost:3001/api';

export const api = {
    // Finalizar compra
    async finalizarCompra(dadosPedido) {
        const response = await fetch(`${API_BASE_URL}/pedidos/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosPedido)
        });
        
        return await response.json();
    },
    
    // Criar PIX
    async criarPIX(dadosPedido) {
        const response = await fetch(`${API_BASE_URL}/pedidos/pix`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosPedido)
        });
        
        return await response.json();
    }
};