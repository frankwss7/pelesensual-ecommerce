// SEMPRE no topo do arquivo server.js
require('dotenv').config();

const express = require('express');
const app = express();

// Agora você pode usar as variáveis
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

console.log(`Servidor rodando na porta ${PORT}`);
console.log(`Ambiente: ${NODE_ENV}`);

app.listen(PORT, () => {
    console.log(`✅ Servidor iniciado na porta ${PORT}`);
});
