const express = require('express');
const router = express.Router();
const Pedido = require('../models/Pedido');

// Webhook do PagBank
router.post('/pagbank', express.raw({type: 'application/json'}), async (req, res) => {
    try {
        const notification = JSON.parse(req.body);
        console.log('Webhook recebido:', notification);
        
        const { reference_id, charges } = notification;
        
        if (charges && charges.length > 0) {
            const charge = charges[0];
            const status = charge.status;
            
            // Extrair ID do pedido do reference_id
            const pedidoId = reference_id.replace('pedido_', '');
            
            // Atualizar status do pedido
            let novoStatus;
            switch (status) {
                case 'PAID':
                    novoStatus = 'pago';
                    break;
                case 'CANCELED':
                    novoStatus = 'cancelado';
                    break;
                default:
                    novoStatus = 'processando';
            }
            
            await Pedido.update(pedidoId, { 
                status: novoStatus,
                data_pagamento: status === 'PAID' ? new Date() : null
            });
            
            console.log(`Pedido ${pedidoId} atualizado para: ${novoStatus}`);
        }
        
        res.status(200).send('OK');
        
    } catch (error) {
        console.error('Erro no webhook:', error);
        res.status(400).send('Erro');
    }
});

module.exports = router;