-- Criar database
CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

-- Tabela de pedidos
CREATE TABLE pedidos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cliente_id INT,
    checkout_id VARCHAR(100),
    pagbank_order_id VARCHAR(100),
    valor_total DECIMAL(10,2),
    status ENUM('pendente', 'aguardando_pix', 'processando', 'pago', 'cancelado') DEFAULT 'pendente',
    pagbank_data TEXT,
    data_pagamento TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de itens do pedido
CREATE TABLE itens_pedido (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pedido_id INT,
    produto_id INT,
    quantidade INT,
    preco_unitario DECIMAL(10,2),
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
);

-- Tabela de transações (log)
CREATE TABLE transacoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pedido_id INT,
    pagbank_charge_id VARCHAR(100),
    tipo_pagamento ENUM('PIX', 'CREDIT_CARD'),
    status VARCHAR(50),
    valor DECIMAL(10,2),
    data_transacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    webhook_data TEXT,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
);