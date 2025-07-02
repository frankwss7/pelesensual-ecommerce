// SEMPRE no topo do arquivo server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import QRCode from 'qrcode';
import crypto from 'crypto';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurações
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Configuração do PagBank CORRIGIDA
const PAGBANK_CONFIG = {
    token: process.env.PAGBANK_TOKEN,
    baseUrl: process.env.PAGBANK_BASE_URL || 'https://sandbox.api.pagseguro.com',
    environment: NODE_ENV === 'production' ? 'production' : 'sandbox'
};

// Conexão com MySQL
async function createConnection() {
    return await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });
}

// Model Pedido (igual ao anterior)
class Pedido {
    static async create(dados) {
        const connection = await createConnection();
        
        try {
            const [result] = await connection.execute(
                `INSERT INTO pedidos (cliente_id, valor_total, status, created_at) 
                 VALUES (?, ?, ?, NOW())`,
                [dados.cliente_id || null, dados.valor_total, dados.status]
            );
            
            if (dados.itens && dados.itens.length > 0) {
                for (const item of dados.itens) {
                    await connection.execute(
                        `INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario) 
                         VALUES (?, ?, ?, ?)`,
                        [result.insertId, item.id, item.quantidade, item.preco]
                    );
                }
            }
            
            return { id: result.insertId, ...dados };
            
        } finally {
            await connection.end();
        }
    }
    
    static async update(id, dados) {
        const connection = await createConnection();
        
        try {
            const campos = Object.keys(dados).map(key => `${key} = ?`).join(', ');
            const valores = Object.values(dados);
            
            await connection.execute(
                `UPDATE pedidos SET ${campos} WHERE id = ?`,
                [...valores, id]
            );
            
        } finally {
            await connection.end();
        }
    }

    static async findById(id) {
        const connection = await createConnection();
        
        try {
            const [rows] = await connection.execute(
                `SELECT * FROM pedidos WHERE id = ?`,
                [id]
            );
            
            return rows[0] || null;
            
        } finally {
            await connection.end();
        }
    }
}

// Service PagBank CORRIGIDO
class PagBankService {
    
    // Gerar QR Code PIX manual (mais confiável)
    gerarPixQRCode(valor, descricao = "Pagamento Pele Sensual") {
        const pixKey = process.env.PIX_KEY;
        const merchantName = process.env.PIX_MERCHANT_NAME;
        const merchantCity = process.env.PIX_MERCHANT_CITY;
        const txId = Date.now().toString();
        
        // Código PIX EMV padrão
        let pixCode = '';
        pixCode += '00020126'; // Formato
        pixCode += '01040014'; // Iniciação
        pixCode += `26${(pixKey.length + 22).toString().padStart(2, '0')}0014br.gov.bcb.pix01${pixKey.length.toString().padStart(2, '0')}${pixKey}`;
        pixCode += `52040000`; // Categoria
        pixCode += `5303986`; // Moeda BRL
        pixCode += `54${valor.toFixed(2).replace('.', '').padStart(10, '0').length.toString().padStart(2, '0')}${valor.toFixed(2).replace('.', '').padStart(10, '0')}`;
        pixCode += `5802BR`; // País
        pixCode += `59${merchantName.length.toString().padStart(2, '0')}${merchantName}`;
        pixCode += `60${merchantCity.length.toString().padStart(2, '0')}${merchantCity}`;
        pixCode += `62${(4 + txId.length).toString().padStart(2, '0')}05${txId.length.toString().padStart(2, '0')}${txId}`;
        
        // Calcular CRC16
        const crc = this.calcularCRC16(pixCode + '6304');
        pixCode += '6304' + crc;
        
        return pixCode;
    }
    
    calcularCRC16(str) {
        const polynomial = 0x1021;
        let crc = 0xFFFF;
        
        for (let i = 0; i < str.length; i++) {
            crc ^= (str.charCodeAt(i) << 8);
            for (let j = 0; j < 8; j++) {
                if (crc & 0x8000) {
                    crc = (crc << 1) ^ polynomial;
                } else {
                    crc <<= 1;
                }
                crc &= 0xFFFF;
            }
        }
        
        return crc.toString(16).toUpperCase().padStart(4, '0');
    }
    
    // Criar checkout completo CORRIGIDO
    async criarCheckout(dadosPedido) {
        const checkoutData = {
            reference_id: `pedido_${dadosPedido.pedidoId}`,
            description: "Compra Pele Sensual Moda Íntima",
            amount: {
                value: Math.round(dadosPedido.valorTotal * 100),
                currency: "BRL"
            },
            
            items: dadosPedido.itens.map(item => ({
                reference_id: item.id.toString(),
                name: item.nome,
                quantity: item.quantidade,
                unit_amount: Math.round(item.preco * 100)
            })),
            
            customer: {
                name: dadosPedido.cliente.nome,
                email: dadosPedido.cliente.email,
                tax_id: dadosPedido.cliente.cpf.replace(/\D/g, ''),
                phones: [{
                    country: "55",
                    area: dadosPedido.cliente.ddd || "85",
                    number: dadosPedido.cliente.telefone.replace(/\D/g, '')
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
                            { number: 3, free_interest: false },
                            { number: 6, free_interest: false },
                            { number: 12, free_interest: false }
                        ]
                    }
                }
            ],
            
            redirect_url: `${process.env.FRONTEND_URL}/pagamento/sucesso`,
            notification_urls: [`${process.env.BACKEND_URL}/webhook/pagbank`]
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
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('PagBank Error Response:', errorText);
                throw new Error(`PagBank API Error: ${response.status} - ${errorText}`);
            }
            
            return await response.json();
            
        } catch (error) {
            console.error('Erro ao criar checkout:', error);
            throw error;
        }
    }
    
    // Criar PIX direto CORRIGIDO
    async criarPagamentoPIX(dadosPedido) {
        try {
            // Usar PIX manual mais confiável
            const pixCode = this.gerarPixQRCode(dadosPedido.valorTotal);
            const qrCodeImage = await QRCode.toDataURL(pixCode);
            
            return {
                success: true,
                qr_code: pixCode,
                qr_code_image: qrCodeImage,
                expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
                amount: {
                    value: Math.round(dadosPedido.valorTotal * 100),
                    currency: "BRL"
                }
            };
            
        } catch (error) {
            console.error('Erro ao criar PIX:', error);
            throw error;
        }
    }
}

const pagbankService = new PagBankService();

// Controller de Pagamento CORRIGIDO
class PagamentoController {
    
    async finalizarCompra(req, res) {
        try {
            const dadosPedido = req.body;
            
            if (!dadosPedido.valorTotal || !dadosPedido.cliente || !dadosPedido.itens) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'Dados incompletos para finalizar compra' 
                });
            }
            
            const pedido = await Pedido.create({
                cliente_id: dadosPedido.clienteId || null,
                valor_total: dadosPedido.valorTotal,
                status: 'pendente',
                itens: dadosPedido.itens
            });
            
            dadosPedido.pedidoId = pedido.id;
            const checkout = await pagbankService.criarCheckout(dadosPedido);
            
            await Pedido.update(pedido.id, { 
                checkout_id: checkout.id,
                pagbank_data: JSON.stringify(checkout)
            });
            
            const linkPagamento = checkout.links?.find(link => link.rel === 'PAY');
            
            res.json({
                success: true,
                pedido_id: pedido.id,
                checkout_id: checkout.id,
                link_pagamento: linkPagamento?.href || null,
                checkout: checkout
            });
            
        } catch (error) {
            console.error('Erro ao finalizar compra:', error);
            res.status(500).json({ 
                success: false, 
                error: 'Erro interno do servidor',
                details: NODE_ENV === 'development' ? error.message : 'Erro interno'
            });
        }
    }
    
    async criarPIX(req, res) {
        try {
            const dadosPedido = req.body;
            
            if (!dadosPedido.valorTotal || !dadosPedido.cliente) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'Dados incompletos para criar PIX' 
                });
            }
            
            const pedido = await Pedido.create({
                cliente_id: dadosPedido.clienteId || null,
                valor_total: dadosPedido.valorTotal,
                status: 'aguardando_pix'
            });
            
            dadosPedido.pedidoId = pedido.id;
            const pixData = await pagbankService.criarPagamentoPIX(dadosPedido);
            
            await Pedido.update(pedido.id, { 
                pagbank_data: JSON.stringify(pixData)
            });
            
            res.json({
                success: true,
                pedido_id: pedido.id,
                qr_code: pixData.qr_code,
                qr_code_image: pixData.qr_code_image,
                expires_at: pixData.expires_at,
                amount: pixData.amount
            });
            
        } catch (error) {
            console.error('Erro ao criar PIX:', error);
            res.status(500).json({ 
                success: false, 
                error: error.message || 'Erro interno do servidor' 
            });
        }
    }
}

const pagamentoController = new PagamentoController();

// ROTAS
app.get('/', (req, res) => {
    res.json({
        status: 'online',
        message: '🚀 API Pele Sensual funcionando!',
        ambiente: NODE_ENV,
        porta: PORT,
        version: '2.0.0',
        routes: {
            checkout: 'POST /api/pedidos/checkout',
            pix: 'POST /api/pedidos/pix',
            webhook: 'POST /webhook/pagbank',
            status: 'GET /api/pedidos/:id/status'
        }
    });
});

app.post('/api/pedidos/checkout', pagamentoController.finalizarCompra.bind(pagamentoController));
app.post('/api/pedidos/pix', pagamentoController.criarPIX.bind(pagamentoController));

app.get('/api/pedidos/:id/status', async (req, res) => {
    try {
        const pedido = await Pedido.findById(req.params.id);
        
        if (!pedido) {
            return res.status(404).json({ 
                success: false, 
                error: 'Pedido não encontrado' 
            });
        }
        
        res.json({
            success: true,
            pedido: {
                id: pedido.id,
                status: pedido.status,
                valor_total: pedido.valor_total,
                created_at: pedido.created_at,
                data_pagamento: pedido.data_pagamento
            }
        });
        
    } catch (error) {
        console.error('Erro ao consultar pedido:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erro interno do servidor' 
        });
    }
});

// Webhook do PagBank MELHORADO
app.post('/webhook/pagbank', express.raw({type: 'application/json'}), async (req, res) => {
    try {
        console.log('📨 Webhook PagBank recebido');
        
        const notification = JSON.parse(req.body);
        console.log('Dados:', notification);
        
        const { reference_id, charges } = notification;
        
        if (charges && charges.length > 0) {
            const charge = charges[0];
            const status = charge.status;
            
            const pedidoId = reference_id.replace(/^(pedido_|pix_)/, '');
            
            let novoStatus;
            switch (status) {
                case 'PAID':
                    novoStatus = 'pago';
                    break;
                case 'CANCELED':
                case 'DECLINED':
                    novoStatus = 'cancelado';
                    break;
                case 'WAITING':
                    novoStatus = 'aguardando_pagamento';
                    break;
                case 'IN_ANALYSIS':
                    novoStatus = 'em_analise';
                    break;
                default:
                    novoStatus = 'processando';
            }
            
            const updateData = { 
                status: novoStatus,
                webhook_data: JSON.stringify(notification)
            };
            
            if (status === 'PAID') {
                updateData.data_pagamento = new Date();
            }
            
            await Pedido.update(pedidoId, updateData);
            
            console.log(`✅ Pedido ${pedidoId} atualizado para: ${novoStatus}`);
        }
        
        res.status(200).send('OK');
        
    } catch (error) {
        console.error('❌ Erro no webhook:', error);
        res.status(400).send('Erro no processamento');
    }
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error('❌ Erro:', err.stack);
    res.status(500).json({ 
        success: false, 
        error: 'Erro interno do servidor' 
    });
});

app.use('*', (req, res) => {
    res.status(404).json({ 
        success: false, 
        error: 'Rota não encontrada',
        path: req.originalUrl 
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`\n🚀 ===== SERVIDOR PELE SENSUAL INICIADO ===== 🚀`);
    console.log(`🌐 Porta: ${PORT}`);
    console.log(`🔧 Ambiente: ${NODE_ENV}`);
    console.log(`💳 PagBank: ${PAGBANK_CONFIG.environment}`);
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`💰 PIX Key: ${process.env.PIX_KEY}`);
    console.log(`🏪 Merchant: ${process.env.PIX_MERCHANT_NAME}`);
    console.log(`================================================\n`);
});

export default app;
