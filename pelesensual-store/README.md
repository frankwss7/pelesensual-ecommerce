# Pele Sensual - E-commerce de Moda Íntima Feminina

## 🛍️ Sobre o Projeto

Site completo de e-commerce para a marca Pele Sensual, especializada em moda íntima feminina. O projeto inclui catálogo de produtos, sistema de carrinho, integração de pagamentos PIX e cartão, além de funcionalidades de varejo e atacado.

## ✨ Funcionalidades

### 🛒 E-commerce Completo
- Catálogo de produtos com filtros (Adulto, Infantil, Kits)
- Sistema de carrinho com persistência
- Seleção de tamanhos (P, M, G, GG)
- Controle de quantidades
- Cálculo automático de preços

### 💰 Sistema Varejo/Atacado
- **Varejo:** Compra unitária com preços normais
- **Atacado:** Mínimo 200 unidades, incremento de 10 em 10, preços especiais
- Alternância automática entre modos
- Indicadores visuais claros

### 💳 Pagamentos Integrados
- **PIX:** Geração automática de QR Code (Chave: fxeconsultoria@gmail.com)
- **Cartão:** Preparado para integração PagBank
- **WhatsApp:** Finalização via mensagem automática

### 📱 Design Responsivo
- Interface moderna e profissional
- Compatível com desktop, tablet e mobile
- Cores da marca (rosa/pink)
- Animações suaves e intuitivas

## 🏗️ Arquitetura

### Frontend (React + Vite)
- **Framework:** React 19 com Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State Management:** Context API
- **Routing:** React Router (SPA)

### Backend (Flask + Python)
- **Framework:** Flask
- **CORS:** Habilitado para integração frontend
- **APIs:** RESTful para pagamentos
- **QR Code:** Geração automática para PIX
- **Database:** SQLite (preparado para PostgreSQL)

## 📦 Estrutura do Projeto

```
pelesensual-ecommerce/
├── pelesensual-store/          # Frontend React
│   ├── src/
│   │   ├── components/         # Componentes React
│   │   │   ├── Header.jsx      # Cabeçalho e navegação
│   │   │   ├── Cart.jsx        # Carrinho de compras
│   │   │   ├── ProductCatalog.jsx # Catálogo de produtos
│   │   │   ├── ProductModal.jsx   # Modal de detalhes
│   │   │   ├── PaymentModal.jsx   # Modal de pagamento
│   │   │   ├── HeroBanner.jsx     # Banner principal
│   │   │   ├── AboutSection.jsx   # Seção sobre
│   │   │   ├── Footer.jsx         # Rodapé
│   │   │   └── WhatsAppButton.jsx # Botão flutuante
│   │   ├── contexts/
│   │   │   └── CartContext.jsx    # Context do carrinho
│   │   ├── data/
│   │   │   └── products.js        # Dados dos produtos
│   │   └── App.jsx                # Componente principal
│   ├── public/
│   │   └── images/                # Imagens dos produtos
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json                # Configuração Vercel
│
└── pelesensual-backend/           # Backend Flask
    ├── src/
    │   ├── routes/
    │   │   ├── payment.py         # Rotas de pagamento
    │   │   └── user.py            # Rotas de usuário
    │   ├── models/
    │   │   └── user.py            # Modelos de dados
    │   └── main.py                # Servidor principal
    ├── requirements.txt
    └── vercel.json                # Configuração Vercel
```

## 🛍️ Produtos Cadastrados

### Moda Íntima Adulto
- Calça Microfibra (R$ 6,11 / R$ 4,70 atacado)
- Calça Modal (R$ 6,76 / R$ 5,20 atacado)
- Pala Cotton (R$ 8,45 / R$ 6,50 atacado)
- Fio Pala Dupla (R$ 9,10 / R$ 7,00 atacado)
- Calça Plus (R$ 10,40 / R$ 8,00 atacado)
- Fio Largo (R$ 9,75 / R$ 7,50 atacado)
- Calça Lateral Dupla (R$ 8,45 / R$ 6,50 atacado)
- ANA LIZ (R$ 7,80 / R$ 6,00 atacado)
- Calçola Modal (R$ 6,76 / R$ 5,20 atacado)
- Pala Microfibra (R$ 7,80 / R$ 6,00 atacado)

### Moda Íntima Infantil
- Infantil Trix (R$ 5,85 / R$ 4,50 atacado)
- Calça Menina Moça (R$ 5,85 / R$ 4,50 atacado)
- Tanga Lari (R$ 7,80 / R$ 6,00 atacado)
- Box Feminina Infantil (R$ 23,40 / R$ 18,00 atacado)

### Kits e Embalagens
- Box Feminina Adulto (R$ 32,50 / R$ 25,00 atacado)
- Caixa de Presente (R$ 2,60 / R$ 2,00 atacado)
- Bag Transparente (R$ 1,30 / R$ 1,00 atacado)

## 🚀 Deploy

### Vercel (Recomendado)
1. Fazer upload para GitHub
2. Conectar repositório no Vercel
3. Deploy automático com cada commit

### Configurações Necessárias
- **Frontend:** Root directory `pelesensual-store`
- **Backend:** Root directory `pelesensual-backend`
- **Variáveis de ambiente:** Configurar URLs da API

## 📞 Contatos

- **WhatsApp:** (85) 99943-6548
- **Email:** pelesensualmodaintima@gmail.com
- **Instagram:** @pelesensual

## 🔧 Tecnologias Utilizadas

### Frontend
- React 19
- Vite
- Tailwind CSS
- Lucide React
- Context API

### Backend
- Python 3.11
- Flask
- Flask-CORS
- QRCode
- Pillow

### Deploy
- Vercel
- GitHub
- HTTPS automático
- CDN global

## 📈 Próximas Melhorias

- [ ] Integração completa PagBank
- [ ] Sistema de pedidos e histórico
- [ ] Painel administrativo
- [ ] Relatórios de vendas
- [ ] Sistema de cupons
- [ ] Avaliações de produtos
- [ ] Chat online
- [ ] Newsletter

## 📄 Licença

Projeto desenvolvido para Pele Sensual Moda Íntima. Todos os direitos reservados.

---

**Desenvolvido com ❤️ para Pele Sensual**

