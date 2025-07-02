const mysql = require('mysql2/promise');

class Pedido {
    
    static async create(dados) {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });
        
        try {
            const [result] = await connection.execute(
                `INSERT INTO pedidos (cliente_id, valor_total, status, created_at) 
                 VALUES (?, ?, ?, NOW())`,
                [dados.cliente_id, dados.valor_total, dados.status]
            );
            
            // Inserir itens do pedido
            if (dados.itens) {
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
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });
        
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
}

module.exports = Pedido;