// As variáveis ficam disponíveis em process.env
const PAGBANK_CONFIG = {
    token: process.env.PAGBANK_TOKEN,
    environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
    baseUrl: process.env.NODE_ENV === 'production' 
        ? 'https://ws.pagseguro.uol.com.br' 
        : 'https://ws.sandbox.pagseguro.uol.com.br'
};

module.exports = PAGBANK_CONFIG;
