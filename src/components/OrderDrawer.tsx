import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { formatKz, RESTAURANT_INFO } from '../data/restaurantData';
import { generateWhatsAppLink, recordWhatsAppOrder } from '../services/firebaseReadyStorage';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (dishId: string, delta: number) => void;
  onRemoveItem: (dishId: string) => void;
  onClearCart: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState<'mesa' | 'takeaway' | 'entrega'>('mesa');
  const [tableNumber, setTableNumber] = useState('');
  const [addressBenguela, setAddressBenguela] = useState('');
  const [notes, setNotes] = useState('');
  const [isSending, setIsSending] = useState(false);

  if (!isOpen) return null;

  const totalKz = cartItems.reduce((acc, item) => acc + item.dish.priceKz * item.quantity, 0);

  const handleSendOrderWhatsApp = async () => {
    if (cartItems.length === 0) return;
    setIsSending(true);

    // Save order in local storage
    await recordWhatsAppOrder(
      cartItems,
      totalKz,
      customerName,
      undefined,
      orderType,
      tableNumber,
      addressBenguela,
      notes
    );

    // Build structured WhatsApp message
    let message = `🍽️ *NOVO PEDIDO - JOANA'S BY BIROLITA*\n`;
    message += `📍 *Benguela, Angola*\n`;
    message += `----------------------------------------\n`;
    
    if (customerName.trim()) {
      message += `👤 *Cliente:* ${customerName.trim()}\n`;
    }
    
    if (orderType === 'mesa') {
      message += `🪑 *Tipo:* Consumo no Restaurante ${tableNumber ? `(Mesa ${tableNumber})` : ''}\n`;
    } else if (orderType === 'takeaway') {
      message += `🛍️ *Tipo:* Takeaway (Recolha no Restaurante)\n`;
    } else {
      message += `🛵 *Tipo:* Entrega ao Domicílio em Benguela\n`;
      if (addressBenguela.trim()) {
        message += `📍 *Endereço:* ${addressBenguela.trim()}\n`;
      }
    }

    message += `----------------------------------------\n`;
    message += `*ITENS DO PEDIDO:*\n`;

    cartItems.forEach((item, index) => {
      const priceText = item.dish.priceDisplay || (item.dish.priceKz > 0 ? formatKz(item.dish.priceKz * item.quantity) : '[PREÇO]');
      message += `${index + 1}. ${item.quantity}x *${item.dish.name}*\n`;
      message += `   Preço: ${priceText}\n`;
    });

    message += `----------------------------------------\n`;
    message += `💰 *VALOR TOTAL:* *${totalKz > 0 ? formatKz(totalKz) : '[VALOR TOTAL A CONFIRMAR COM O RESTAURANTE]'}*\n`;

    if (notes.trim()) {
      message += `📝 *Observações:* ${notes.trim()}\n`;
    }

    message += `----------------------------------------\n`;
    message += `Por favor, confirmem a receção e o tempo estimado de preparação. Obrigado!`;

    const link = generateWhatsAppLink(RESTAURANT_INFO.whatsappNumber, message);
    setIsSending(false);
    window.open(link, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md h-full bg-[#FAF7F2] text-[#24211D] shadow-2xl flex flex-col justify-between border-l border-[#E5DEC9]">
        {/* Top Header */}
        <div className="p-5 border-b border-[#E8E1D0] flex items-center justify-between bg-white/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#24211D] text-[#C5A059] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg leading-tight text-[#1C1917]">
                O Seu Pedido
              </h3>
              <p className="text-xs text-stone-500">
                {cartItems.length} {cartItems.length === 1 ? 'item selecionado' : 'itens selecionados'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-[#ECE5D8] transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Middle Content List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 text-stone-500 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#EFE9DD] flex items-center justify-center mx-auto text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="font-serif font-semibold text-stone-700 text-lg">
                O seu carrinho está vazio
              </p>
              <p className="text-xs max-w-xs mx-auto leading-relaxed">
                Navegue pelo nosso menu e selecione os seus pratos favoritos para enviar o pedido via WhatsApp.
              </p>
            </div>
          ) : (
            <>
              {/* Item cards */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.dish.id}
                    className="p-3.5 rounded-xl bg-white border border-[#E8E1D0] shadow-sm flex items-center justify-between gap-3"
                  >
                    <img
                      src={item.dish.image}
                      alt={item.dish.name}
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-xs sm:text-sm text-[#1C1917] truncate">
                        {item.dish.name}
                      </h4>
                      <p className="text-xs font-semibold text-[#8C6D23]">
                        {item.dish.priceDisplay || (item.dish.priceKz > 0 ? formatKz(item.dish.priceKz * item.quantity) : '[PREÇO]')}
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1.5 bg-[#FAF7F2] border border-[#E0D8C8] rounded-lg p-1">
                      <button
                        onClick={() => onUpdateQuantity(item.dish.id, -1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-stone-600 hover:bg-[#E5DEC9] transition-colors"
                        aria-label="Diminuir"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.dish.id, 1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-stone-600 hover:bg-[#E5DEC9] transition-colors"
                        aria-label="Aumentar"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.dish.id)}
                      className="p-1.5 text-stone-400 hover:text-red-600 transition-colors"
                      title="Remover"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Order options form */}
              <div className="pt-3 border-t border-[#E8E1D0] space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    Seu Nome (Opcional):
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ex: João Silva"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#E0D8C8] text-xs text-[#1C1917] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    Como deseja receber o pedido?
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setOrderType('mesa')}
                      className={`py-1.5 px-2 rounded-lg font-medium border text-center transition-colors ${
                        orderType === 'mesa'
                          ? 'bg-[#24211D] text-white border-[#C5A059]'
                          : 'bg-white text-stone-700 border-[#DDD5C5]'
                      }`}
                    >
                      No Restaurante
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('takeaway')}
                      className={`py-1.5 px-2 rounded-lg font-medium border text-center transition-colors ${
                        orderType === 'takeaway'
                          ? 'bg-[#24211D] text-white border-[#C5A059]'
                          : 'bg-white text-stone-700 border-[#DDD5C5]'
                      }`}
                    >
                      Takeaway
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('entrega')}
                      className={`py-1.5 px-2 rounded-lg font-medium border text-center transition-colors ${
                        orderType === 'entrega'
                          ? 'bg-[#24211D] text-white border-[#C5A059]'
                          : 'bg-white text-stone-700 border-[#DDD5C5]'
                      }`}
                    >
                      Entrega
                    </button>
                  </div>
                </div>

                {orderType === 'mesa' && (
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      Número da Mesa (Se já estiver sentado):
                    </label>
                    <input
                      type="text"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="Ex: Mesa 5"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#E0D8C8] text-xs text-[#1C1917] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                )}

                {orderType === 'entrega' && (
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">
                      Bairro / Endereço em Benguela:
                    </label>
                    <input
                      type="text"
                      value={addressBenguela}
                      onChange={(e) => setAddressBenguela(e.target.value)}
                      placeholder="Ex: Restinga, Benguela perto de..."
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#E0D8C8] text-xs text-[#1C1917] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                )}

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    Notas ou Preferências (Opcional):
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ex: Ponto da carne, sem cebola, etc."
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#E0D8C8] text-xs text-[#1C1917] focus:outline-none focus:border-[#C5A059] resize-none"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom Footer Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-[#E8E1D0] bg-white space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-stone-600">Subtotal</span>
              <span className="font-serif font-bold text-base text-[#1C1917]">
                {totalKz > 0 ? formatKz(totalKz) : '[PREÇO A CONFIRMAR]'}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-500">
              <span>Destino WhatsApp:</span>
              <span className="font-medium text-[#25D366]">{RESTAURANT_INFO.whatsappDisplay}</span>
            </div>

            <button
              onClick={handleSendOrderWhatsApp}
              disabled={isSending}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#20bd5a] transition-colors shadow-lg active:scale-98"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Finalizar Pedido via WhatsApp</span>
            </button>

            <div className="flex justify-between items-center text-[11px] text-stone-400">
              <button
                onClick={onClearCart}
                className="hover:text-red-600 transition-colors"
              >
                Esvaziar pedido
              </button>
              <span>Sem pagamento online necessário</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
