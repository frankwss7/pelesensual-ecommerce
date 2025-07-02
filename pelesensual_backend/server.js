const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/pedidos', require('./routes/pedidos'));
app.use('/webhook', require('./routes/webhook'));

// Rota de teste
app.get('/api/health', (req, res) => {
    res.json({ status: 'API funcionando!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
