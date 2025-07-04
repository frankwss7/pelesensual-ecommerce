// ✅ Cart.jsx atualizado: Carrinho sempre visível
import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, CreditCard } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import PaymentModal from './PaymentModal';

const Cart = () => {
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

  return (
    <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Carrinho ({getTotalQuantity()})
          </h2>
          <button className="text-gray-500 hover:text-gray-700 transition-colors" onClick={clearCart}>
            <Trash2 className="w-6 h-6" />
          </button>
        </div>

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
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-800 truncate">{item.name}</h3>
                        <p className="text-sm text-gray-600">Tamanho: {item.size}</p>
                        <p className="text-lg font-semibold text-pink-600">
                          R$ {price.toFixed(2)}
                        </p>
                      </div>
                      <button onClick={() => removeFromCart(item.id, item.size)} className="text-red-500 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="w-8 h-8 bg-gray-200 rounded-full">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="w-8 h-8 bg-gray-200 rounded-full">
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

        {items.length > 0 && (
          <div className="border-t border-gray-200 p-4 space-y-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span className="text-pink-600">R$ {getTotalPrice().toFixed(2)}</span>
            </div>

            <button
              onClick={() => setShowPaymentModal(true)}
              className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700"
            >
              <CreditCard className="w-5 h-5 inline-block mr-2" /> Pagar com PIX ou Cartão
            </button>

            <button
              onClick={handleCheckout}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
            >
              Finalizar via WhatsApp
            </button>
          </div>
        )}
      </div>

      <PaymentModal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)} />
    </div>
  );
};

export default Cart;
