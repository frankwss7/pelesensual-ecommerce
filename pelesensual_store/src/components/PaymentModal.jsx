import React, { useState } from 'react';
import { X, CreditCard, QrCode, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const PaymentModal = ({ isOpen, onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [paymentStatus, setPaymentStatus] = useState('selecting'); // selecting, processing, success, error
  const [pixData, setPixData] = useState(null);
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: ''
  });
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const { items, getTotalPrice, clearCart, pricingMode } = useCart();

  const handleCustomerDataChange = (field, value) => {
    setCustomerData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCardDataChange = (field, value) => {
    setCardData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const createPixPayment = async () => {
    try {
      setPaymentStatus('processing');
      
      const response = await fetch('https://kkh7ikcgyvw9.manus.space/api/create-pix-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: getTotalPrice(),
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            size: item.size,
            quantity: item.quantity,
            price: pricingMode === 'wholesale' ? item.wholesalePrice : item.retailPrice
          })),
          customer: customerData
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setPixData(data.payment);
        setPaymentStatus('success');
      } else {
        setPaymentStatus('error');
      }
    } catch (error) {
      console.error('Erro ao criar pagamento PIX:', error);
      setPaymentStatus('error');
    }
  };

  const createCardPayment = async () => {
    try {
      setPaymentStatus('processing');
      
      const response = await fetch('https://kkh7ikcgyvw9.manus.space/api/create-card-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: getTotalPrice(),
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            size: item.size,
            quantity: item.quantity,
            price: pricingMode === 'wholesale' ? item.wholesalePrice : item.retailPrice
          })),
          customer: customerData,
          card_data: cardData
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setPaymentStatus('success');
        clearCart();
      } else {
        setPaymentStatus('error');
      }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      setPaymentStatus('error');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (paymentMethod === 'pix') {
      createPixPayment();
    } else {
      createCardPayment();
    }
  };

  const resetModal = () => {
    setPaymentStatus('selecting');
    setPixData(null);
    setCustomerData({ name: '', email: '', phone: '', cpf: '' });
    setCardData({ number: '', name: '', expiry: '', cvv: '' });
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Finalizar Pagamento</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {paymentStatus === 'selecting' && (
            <>
              {/* Resumo do Pedido */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Resumo do Pedido</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-600 ml-2">({item.size})</span>
                        <span className="text-gray-600 ml-2">x{item.quantity}</span>
                      </div>
                      <span className="font-medium">
                        R$ {((pricingMode === 'wholesale' ? item.wholesalePrice : item.retailPrice) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between items-center font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-pink-600">R$ {getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dados do Cliente */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Dados do Cliente</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nome completo"
                    value={customerData.name}
                    onChange={(e) => handleCustomerDataChange('name', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="email"
                    placeholder="E-mail"
                    value={customerData.email}
                    onChange={(e) => handleCustomerDataChange('email', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Telefone"
                    value={customerData.phone}
                    onChange={(e) => handleCustomerDataChange('phone', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="text"
                    placeholder="CPF"
                    value={customerData.cpf}
                    onChange={(e) => handleCustomerDataChange('cpf', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Método de Pagamento */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Método de Pagamento</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`p-4 border-2 rounded-lg flex items-center gap-3 transition-all ${
                      paymentMethod === 'pix'
                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                        : 'border-gray-200 hover:border-pink-300'
                    }`}
                  >
                    <QrCode className="w-6 h-6" />
                    <div className="text-left">
                      <div className="font-medium">PIX</div>
                      <div className="text-sm text-gray-600">Pagamento instantâneo</div>
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border-2 rounded-lg flex items-center gap-3 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                        : 'border-gray-200 hover:border-pink-300'
                    }`}
                  >
                    <CreditCard className="w-6 h-6" />
                    <div className="text-left">
                      <div className="font-medium">Cartão</div>
                      <div className="text-sm text-gray-600">Crédito ou débito</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Dados do Cartão (se cartão selecionado) */}
              {paymentMethod === 'card' && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Dados do Cartão</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Número do cartão"
                      value={cardData.number}
                      onChange={(e) => handleCardDataChange('number', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Nome no cartão"
                      value={cardData.name}
                      onChange={(e) => handleCardDataChange('name', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                    />
                    <input
                      type="text"
                      placeholder="MM/AA"
                      value={cardData.expiry}
                      onChange={(e) => handleCardDataChange('expiry', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      value={cardData.cvv}
                      onChange={(e) => handleCardDataChange('cvv', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Botão de Finalizar */}
              <button
                onClick={handleSubmit}
                className="w-full bg-pink-600 text-white py-4 rounded-lg font-medium hover:bg-pink-700 transition-colors"
              >
                Finalizar Pagamento - R$ {getTotalPrice().toFixed(2)}
              </button>
            </>
          )}

          {paymentStatus === 'processing' && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold mb-2">Processando pagamento...</h3>
              <p className="text-gray-600">Aguarde enquanto processamos seu pagamento.</p>
            </div>
          )}

          {paymentStatus === 'success' && paymentMethod === 'pix' && pixData && (
            <div className="text-center py-8">
              <QrCode className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-4">PIX Gerado com Sucesso!</h3>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <img 
                  src={`data:image/png;base64,${pixData.qr_code}`} 
                  alt="QR Code PIX"
                  className="mx-auto mb-4 max-w-64"
                />
                <p className="text-sm text-gray-600 mb-2">
                  Escaneie o QR Code com seu app do banco ou copie o código PIX:
                </p>
                <div className="bg-white p-3 rounded border text-xs font-mono break-all">
                  {pixData.pix_payload}
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-orange-600 mb-4">
                <Clock className="w-5 h-5" />
                <span className="text-sm">Válido por 30 minutos</span>
              </div>

              <p className="text-sm text-gray-600 mb-6">
                Após o pagamento, você receberá a confirmação por e-mail.
              </p>

              <button
                onClick={handleClose}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Fechar
              </button>
            </div>
          )}

          {paymentStatus === 'success' && paymentMethod === 'card' && (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Pagamento Aprovado!</h3>
              <p className="text-gray-600 mb-6">
                Seu pagamento foi processado com sucesso. Você receberá a confirmação por e-mail.
              </p>
              <button
                onClick={handleClose}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Fechar
              </button>
            </div>
          )}

          {paymentStatus === 'error' && (
            <div className="text-center py-8">
              <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Erro no Pagamento</h3>
              <p className="text-gray-600 mb-6">
                Ocorreu um erro ao processar seu pagamento. Tente novamente.
              </p>
              <button
                onClick={() => setPaymentStatus('selecting')}
                className="bg-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors"
              >
                Tentar Novamente
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;

