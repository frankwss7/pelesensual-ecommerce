import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, CreditCard, QrCode } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import PaymentModal from './PaymentModal';

const Cart = ({ isOpen, onClose }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalPrice, 
    getTotalQuantity,
    pricingMode,
    canUseWholesale 
  } = useCart();

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    // Criar mensagem para WhatsApp
    let message = `🛍️ *Pedido Pele Sensual*\n\n`;
    message += `📋 *Modo:* ${pricingMode === 'wholesale' ? 'Atacado' : 'Varejo'}\n\n`;
    
    items.forEach(item => {
      const price = pricingMode === 'wholesale' ? item.wholesalePrice : item.retailPrice;
      message += `• ${item.name}\n`;
      message += `  Tamanho: ${item.size}\n`;
      message += `  Quantidade: ${item.quantity}\n`;
      message += `  Preço unitário: R$ ${price.toFixed(2)}\n`;
      message += `  Subtotal: R$ ${(price * item.quantity).toFixed(2)}\n\n`;
    });
    
    message += `📊 *Total de itens:* ${getTotalQuantity()}\n`;
    message += `💰 *Valor total:* R$ ${getTotalPrice().toFixed(2)}\n\n`;
    message += `📱 Gostaria de finalizar este pedido!`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5585999436548?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const handlePayment = () => {
    if (items.length === 0) return;
    setShowPaymentModal(true);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={onClose}
        />
      )}
      
      {/* Cart Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Carrinho ({getTotalQuantity()})
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Pricing Mode Info */}
          {pricingMode === 'wholesale' && (
            <div className="bg-green-50 border border-green-200 p-3 m-4 rounded-lg">
              <p className="text-sm text-green-700 font-medium">
                🎉 Modo Atacado Ativo
              </p>
              <p className="text-xs text-green-600">
                Preços especiais para pedidos acima de 200 unidades
              </p>
            </div>
          )}

          {!canUseWholesale() && pricingMode === 'retail' && getTotalQuantity() > 0 && (
            <div className="bg-blue-50 border border-blue-200 p-3 m-4 rounded-lg">
              <p className="text-sm text-blue-700 font-medium">
                💡 Dica: Atacado disponível
              </p>
              <p className="text-xs text-blue-600">
                Adicione {200 - getTotalQuantity()} unidades para preços de atacado
              </p>
            </div>
          )}

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">Carrinho vazio</p>
                <p className="text-gray-400 text-sm">Adicione produtos para começar</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => {
                  const price = pricingMode === 'wholesale' ? item.wholesalePrice : item.retailPrice;
                  return (
                    <div key={`${item.id}-${item.size}`} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-800 truncate">{item.name}</h3>
                          <p className="text-sm text-gray-600">Tamanho: {item.size}</p>
                          <p className="text-sm text-gray-600">{item.material}</p>
                          <p className="text-lg font-semibold text-pink-600">
                            R$ {price.toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="font-semibold text-gray-800">
                          R$ {(price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-4 space-y-4">
              {/* Total */}
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span className="text-pink-600">R$ {getTotalPrice().toFixed(2)}</span>
              </div>

              {/* Clear Cart */}
              <button
                onClick={clearCart}
                className="w-full text-red-600 hover:text-red-700 transition-colors text-sm"
              >
                Limpar carrinho
              </button>

              {/* Checkout Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handlePayment}
                  className="w-full bg-pink-600 text-white py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  Pagar com PIX ou Cartão
                </button>
                
                <button
                  onClick={handleCheckout}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Finalizar via WhatsApp
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal 
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
      />
    </>
  );
};

export default Cart;

