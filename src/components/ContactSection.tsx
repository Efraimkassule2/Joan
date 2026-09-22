import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, MapPin, Clock, ExternalLink } from 'lucide-react';
import { generateWhatsAppLink, getStoredRestaurantInfo } from '../services/restaurantStorage';
import { RestaurantContactInfo } from '../types';

export const ContactSection: React.FC = () => {
  const [info, setInfo] = useState<RestaurantContactInfo>(getStoredRestaurantInfo);

  useEffect(() => {
    const handleInfoUpdate = () => setInfo(getStoredRestaurantInfo());
    window.addEventListener('jb_info_updated', handleInfoUpdate);
    return () => window.removeEventListener('jb_info_updated', handleInfoUpdate);
  }, []);

  const whatsappUrl = generateWhatsAppLink(
    info.whatsappNumber,
    "Olá, Joana's By Birolita! Gostaria de esclarecer uma dúvida sobre o restaurante e localização em Benguela."
  );

  return (
    <section id="contactos" className="py-20 bg-[#F4EFE6] border-t border-[#E5DEC9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-widest text-[#C5A059] uppercase">
            Visite-nos ou Fale Connosco
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] mt-2 mb-3">
            Informações & Contactos
          </h2>
          <div className="w-12 h-0.5 bg-[#C5A059] mx-auto mb-4" />
          <p className="text-stone-600 text-sm sm:text-base">
            Estamos em Benguela, prontos para lhe proporcionar momentos gastronómicos memoráveis. Entre em contacto por telefone, WhatsApp ou visite-nos.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Card: WhatsApp */}
          <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8E1D0] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center mb-4">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1C1917] mb-1">
                WhatsApp Oficial
              </h3>
              <p className="text-xs text-stone-500 mb-3">
                Para pedidos rápidos, confirmação de reservas e atendimento.
              </p>
              <p className="text-xs sm:text-sm font-semibold text-[#1F1C18] break-all bg-white/70 p-2 rounded-lg border border-[#E5DEC9]">
                {info.whatsappDisplay || info.whatsappNumber}
              </p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#128C7E] hover:text-[#0b6b5f] transition-colors"
            >
              <span>Abrir conversa WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card: Telefone */}
          <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8E1D0] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1C1917] mb-1">
                Chamadas Telefónicas
              </h3>
              <p className="text-xs text-stone-500 mb-3">
                Atendimento direto durante o horário de funcionamento.
              </p>
              <p className="text-xs sm:text-sm font-semibold text-[#1F1C18] bg-white/70 p-2 rounded-lg border border-[#E5DEC9]">
                {info.phoneDisplay || info.phone}
              </p>
            </div>
            <div className="mt-4 text-xs font-bold text-[#8C6D23]">
              <span>Disponível nos horários de serviço</span>
            </div>
          </div>

          {/* Card: Endereço */}
          <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8E1D0] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#24211D] text-[#C5A059] flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1C1917] mb-1">
                Localização
              </h3>
              <p className="text-xs text-stone-500 mb-2">
                Benguela, Angola
              </p>
              <p className="text-xs text-[#24211D] font-medium leading-relaxed bg-white/70 p-2 rounded-lg border border-[#E5DEC9]">
                {info.address}
              </p>
            </div>
            <div className="mt-4 text-[11px] text-[#8C6D23] font-semibold flex items-center gap-1">
              <span>[ESTACIONAMENTO A CONFIRMAR]</span>
            </div>
          </div>

          {/* Card: Horários */}
          <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8E1D0] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1C1917] mb-1">
                Horário de Atendimento
              </h3>
              <div className="space-y-2 text-xs text-stone-700 mt-2 bg-white/70 p-2.5 rounded-lg border border-[#E5DEC9]">
                <p>
                  <strong className="text-stone-900 block">Dias Úteis:</strong>
                  {info.hours.weekdays}
                </p>
                <p>
                  <strong className="text-stone-900 block">Fim de Semana:</strong>
                  {info.hours.weekends}
                </p>
                <p className="text-stone-500 italic text-[11px]">
                  {info.hours.closed}
                </p>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-[#E8E1D0] text-[11px] text-stone-500">
              [HORÁRIO DE ENCERRAMENTO DA COZINHA]
            </div>
          </div>
        </div>

        {/* Stylized Benguela Map & Direction Context */}
        <div className="bg-white rounded-3xl overflow-hidden border border-[#E8E1D0] shadow-lg p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C5A059]">
              Como Chegar
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#1C1917]">
              No Coração de Benguela
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              O restaurante situa-se em Benguela, Angola. Entre em contacto direto para receber a localização em tempo real no mapa.
            </p>

            <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8E1D0] text-xs text-stone-600 space-y-1">
              <p className="font-semibold text-stone-800 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" /> {info.city}, {info.country}
              </p>
              <p className="text-stone-500">
                {info.address}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20bd5a] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pedir Localização no WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Map Preview Graphic */}
          <div className="lg:col-span-7 h-64 sm:h-80 rounded-2xl overflow-hidden border border-[#E0D8C8] relative bg-[#EFE9DD] flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
              alt="Mapa ilustrativo de Benguela"
              className="w-full h-full object-cover filter saturate-75 opacity-70"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-stone-900/40" />

            {/* Simulated Pin */}
            <div className="relative z-10 bg-[#FAF7F2] p-4 rounded-2xl shadow-2xl border-2 border-[#C5A059] text-center max-w-xs">
              <div className="w-10 h-10 rounded-full bg-[#1C1917] text-[#C5A059] flex items-center justify-center mx-auto mb-1.5 shadow">
                <MapPin className="w-5 h-5 fill-[#C5A059]" />
              </div>
              <p className="font-serif font-bold text-sm text-[#1C1917]">Joana's By Birolita</p>
              <p className="text-[11px] text-stone-600 mt-0.5">Benguela, Angola</p>
              <span className="inline-block mt-1 text-[10px] bg-[#C5A059]/15 text-[#8C6D23] font-semibold px-2 py-0.5 rounded">
                [LOCALIZAÇÃO / MAPA A DEFINIR]
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
