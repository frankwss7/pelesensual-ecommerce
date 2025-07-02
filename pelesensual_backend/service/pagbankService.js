const PAGBANK_CONFIG = require('../config/pagbank');

class PagBankService {
    
    // Criar checkout
    async criarCheckout(dadosPedido) {
        const checkoutData = {
            reference_id: `pedido_${dadosPedido.pedidoId}`,
            description: "Compra no E-commerce",
            amount: {
                value: dadosPedido.valorTotal * 100, // Centavos
                currency: "BRL"
            },
            
            items: dadosPedido.itens.map(item => ({
                reference_id: item.id,
                name: item.nome,
                quantity: item.quantidade,
                unit_amount: item.preco * 100
            })),
            
            customer: {
                name: dadosPedido.cliente.nome,
                email: dadosPedido.cliente.email,
                tax_id: dadosPedido.cliente.cpf,
                phones: [{
                    country: "55",
                    area: dadosPedido.cliente.ddd,
                    number: dadosPedido.cliente.telefone
                }]
            },
            
            payment_methods: [
                {
                    type: "PIX",
                    config: {
                        expiration_date: new Date(Date.now() + 30 * 60 * 1000).toISOString()
                    }
                },
                {
                    type: "CREDIT_CARD",
                    config: {
                        installment_options: [
                            { number: 1, free_interest: true },
                            { number: 2, free_interest: true },
                            { number: 3, free_interest: false }
                        ]
                    }
                }
            ],
            
            redirect_url: "http://localhost:3000/pagamento/sucesso",
            notification_urls: ["http://localhost:3001/webhook/pagbank"]
        };
        
        try {
            const response = await fetch(`${PAGBANK_CONFIG.baseUrl}/checkouts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${PAGBANK_CONFIG.token}`
                },
                body: JSON.stringify(checkoutData)
            });
            
            return await response.json();
            
        } catch (error) {
            console.error('Erro ao criar checkout:', error);
            throw error;
        }
    }
    
    // Criar PIX direto
    async criarPagamentoPIX(dadosPedido) {
        const pixData = {
            reference_id: `pix_${dadosPedido.pedidoId}`,
            description: "Pagamento PIX",
            amount: {
                value: dadosPedido.valorTotal * 100,
                currency: "BRL"
            },
            payment_method: {
                type: "PIX",
                pix: {
                    expiration_date: new Date(Date.now() + 30 * 60 * 1000).toISOString()
                }
            },
            customer: {
                name: dadosPedido.cliente.nome,
                email: dadosPedido.cliente.email,
                tax_id: dadosPedido.cliente.cpf
            },
            notification_urls: ["http://localhost:3001/webhook/pix"]
        };
        
        const response = await fetch(`${PAGBANK_CONFIG.baseUrl}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${PAGBANK_CONFIG.token}`
            },
            body: JSON.stringify(pixData)
        });
        
        return await response.json();
    }
}

module.exports = new PagBankService();