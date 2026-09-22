import React from 'react';
import { ChevronDown, Utensils, MessageCircle, Calendar, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { generateWhatsAppLink } from '../services/firebaseReadyStorage';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onOpenReservation }) => {
  const whatsappUrl = generateWhatsAppLink(
    RESTAURANT_INFO.whatsappNumber,
    "Olá, Joana's By Birolita! Gostaria de fazer um pedido ou consulta sobre o menu de hoje em Benguela."
  );

  return (
    <section id="inicio" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Hero Background Image with Subtle Film Grain / Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=85"
          alt="Especialidades culinárias de Benguela - Joana's By Birolita"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Layered Gradient Overlay for warm contrast and maximum legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-black/60" />
      </div>

      {/* Main Content Box */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        {/* Location & Heritage Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C5A059]/60 bg-black/40 backdrop-blur-md mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span className="text-xs font-semibold tracking-widest text-[#E8D4A8] uppercase">
            Benguela • Angola
          </span>
          <span className="w-1 h-1 rounded-full bg-[#C5A059]" />
          <span className="text-xs text-stone-300 font-medium">Gastronomia com Alma</span>
        </div>

        {/* Restaurant Name */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-4 leading-tight sm:leading-none">
          Joana's <span className="font-normal italic text-[#E5C378]">By Birolita</span>
        </h1>

        {/* Short, evocative tagline */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-stone-200 font-light mb-8 leading-relaxed">
          A autêntica alma da gastronomia em Benguela, onde cada prato celebra o frescor do mar e a riqueza das tradições angolanas.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-lg mx-auto mb-12">
          {/* Ver Menu */}
          <button
            id="hero-ver-menu-btn"
            onClick={onExploreMenu}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#C5A059] text-[#1C1917] font-semibold text-sm sm:text-base hover:bg-[#D4B36E] transition-all shadow-lg hover:shadow-xl transform active:scale-95"
          >
            <Utensils className="w-4 h-4" />
            <span>Ver Menu Completo</span>
          </button>

          {/* Reservar Mesa */}
          <button
            id="hero-reservar-btn"
            onClick={onOpenReservation}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base border border-white/30 backdrop-blur-sm transition-all shadow hover:border-white/60 active:scale-95"
          >
            <Calendar className="w-4 h-4 text-[#C5A059]" />
            <span>Reservar Mesa</span>
          </button>

          {/* Pedir pelo WhatsApp */}
          <a
            id="hero-whatsapp-btn"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] text-white font-semibold text-sm sm:text-base hover:bg-[#20bd5a] transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Pedir no WhatsApp</span>
          </a>
        </div>

        {/* Quick Highlights Pill Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-6 border-t border-white/15 text-xs sm:text-sm text-stone-300">
          <div className="flex items-center justify-center gap-2 p-2 bg-black/30 rounded-lg backdrop-blur-sm border border-white/5">
            <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
            <span>Peixes & Frutos do Mar</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2 bg-black/30 rounded-lg backdrop-blur-sm border border-white/5">
            <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
            <span>Carnes Selecionadas</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2 bg-black/30 rounded-lg backdrop-blur-sm border border-white/5">
            <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
            <span>Sabores Típicos</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2 bg-black/30 rounded-lg backdrop-blur-sm border border-white/5">
            <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
            <span>Atendimento Acolhedor</span>
          </div>
        </div>
      </div>

      {/* Smooth scroll down indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-stone-500 animate-bounce">
        <button
          onClick={onExploreMenu}
          aria-label="Rolar para baixo"
          className="p-1.5 rounded-full hover:text-[#C5A059] transition-colors"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
