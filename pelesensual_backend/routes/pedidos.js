const express = require('express');
const router = express.Router();
const pagamentoController = require('../controllers/pagamentoController');

// POST /api/pedidos/checkout - Criar checkout completo
router.post('/checkout', pagamentoController.finalizarCompra);

// POST /api/pedidos/pix - Criar PIX direto
router.post('/pix', pagamentoController.criarPIX);

module.exports = router;