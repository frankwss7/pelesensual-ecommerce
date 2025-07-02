const pagbankService = require('../services/pagbankService');
const Pedido = require('../models/Pedido');

class PagamentoController {
    
    // Finalizar compra - criar checkout
    async finalizarCompra(req, res) {
        try {
            const dadosPedido = req.body;
            
            // 1. Salvar pedido no banco
            const pedido = await Pedido.create({
                cliente_id: dadosPedido.clienteId,
                valor_total: dadosPedido.valorTotal,
                status: 'pendente',
                itens: dadosPedido.itens
            });
            
            // 2. Criar checkout no PagBank
            dadosPedido.pedidoId = pedido.id;
            const checkout = await pagbankService.criarCheckout(dadosPedido);
            
            // 3. Atualizar pedido com checkout_id
            await Pedido.update(pedido.id, { 
                checkout_id: checkout.id,
                pagbank_data: JSON.stringify(checkout)
            });
            
            // 4. Retornar link de pagamento
            const linkPagamento = checkout.links.find(link => link.rel === 'PAY');
            
            res.json({
                success: true,
                pedido_id: pedido.id,
                checkout_id: checkout.id,
                link_pagamento: linkPagamento.href
            });
            
        } catch (error) {
            console.error('Erro ao finalizar compra:', error);
            res.status(500).json({ 
                success: false, 
                error: 'Erro interno do servidor' 
            });
        }
    }
    
    // Criar PIX direto
    async criarPIX(req, res) {
        try {
            const dadosPedido = req.body;
            
            const pedido = await Pedido.create({
                cliente_id: dadosPedido.clienteId,
                valor_total: dadosPedido.valorTotal,
                status: 'aguardando_pix'
            });
            
            dadosPedido.pedidoId = pedido.id;
            const pixOrder = await pagbankService.criarPagamentoPIX(dadosPedido);
            
            await Pedido.update(pedido.id, { 
                pagbank_order_id: pixOrder.id 
            });
            
            res.json({
                success: true,
                pedido_id: pedido.id,
                qr_code: pixOrder.qr_codes[0].text,
                qr_code_image: pixOrder.qr_codes[0].links[0].href
            });
            
        } catch (error) {
            console.error('Erro ao criar PIX:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }
}

module.exports = new PagamentoController();