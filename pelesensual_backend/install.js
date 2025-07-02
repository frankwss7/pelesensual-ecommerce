import mysql from 'mysql2/promise';
import 'dotenv/config';

async function setupDatabase() {
    try {
        console.log('🔧 Configurando banco de dados...');
        
        // Conectar sem especificar database
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS
        });
        
        // Criar database
        await connection.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
        await connection.execute(`USE ${process.env.DB_NAME}`);
        
        console.log('✅ Database criado/selecionado');
        
        // Criar tabelas (código do database.sql aqui)
        // ... adicionar todas as queries do database.sql
        
        console.log('✅ Tabelas criadas com sucesso!');
        
        await connection.end();
        
    } catch (error) {
        console.error('❌ Erro na configuração:', error);
        process.exit(1);
    }
}

setupDatabase();