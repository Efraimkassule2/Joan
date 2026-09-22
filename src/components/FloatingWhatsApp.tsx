import React, { useState } from 'react';
import { MessageCircle, X, Calendar, ShoppingBag, HelpCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { generateWhatsAppLink } from '../services/firebaseReadyStorage';

interface FloatingWhatsAppProps {
  onOpenReservation: () => void;
  onOpenMenu: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onOpenReservation, onOpenMenu }) => {
  const [isOpen, setIsOpen] = useState(false);

  const directChatUrl = generateWhatsAppLink(
    RESTAURANT_INFO.whatsappNumber,
    "Olá, Joana's By Birolita! Estou a contactar através do website do restaurante em Benguela."
  );

  const orderChatUrl = generateWhatsAppLink(
    RESTAURANT_INFO.whatsappNumber,
    "Olá, Joana's By Birolita! Gostaria de consultar o menu do dia e fazer um pedido."
  );

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Options Popup */}
      {isOpen && (
        <div className="mb-3 w-72 bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E8E1D0] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="p-4 bg-[#24211D] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="font-serif font-bold text-xs leading-tight">Joana's By Birolita</p>
                <p className="text-[10px] text-[#25D366]">Atendimento no WhatsApp</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-white p-1 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 space-y-2 text-xs">
            <a
              href={orderChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-[#EFE9DD] text-[#1C1917] transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
              <div className="text-left">
                <p className="font-semibold">Fazer Pedido / Ver Pratos</p>
                <p className="text-[10px] text-stone-500">Enviar mensagem de pedido</p>
              </div>
            </a>

            <button
              onClick={() => {
                setIsOpen(false);
                onOpenReservation();
              }}
              className="w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-[#EFE9DD] text-[#1C1917] transition-colors text-left"
            >
              <Calendar className="w-4 h-4 text-[#C5A059]" />
              <div>
                <p className="font-semibold">Reservar Mesa</p>
                <p className="text-[10px] text-stone-500">Formulário ou confirmação rápida</p>
              </div>
            </button>

            <a
              href={directChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-semibold transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-[#25D366]" />
              <div className="text-left">
                <p>Conversar com Atendente</p>
                <p className="text-[10px] text-stone-500 font-normal">Tirar dúvidas em tempo real</p>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        id="floating-whatsapp-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 px-4 py-3.5 rounded-full bg-[#25D366] text-white shadow-2xl hover:bg-[#20bd5a] transition-all transform hover:scale-105 active:scale-95 border-2 border-white"
        aria-label="Atendimento via WhatsApp"
        title="Falar no WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300"></span>
        </span>
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="font-semibold text-xs sm:text-sm tracking-wide hidden sm:inline">
          WhatsApp
        </span>
      </button>
    </div>
  );
};
