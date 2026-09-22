import React from 'react';
import { Heart, Compass, Award, Clock } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const About: React.FC = () => {
  return (
    <section id="sobre" className="py-20 bg-[#FAF7F2] border-t border-[#ECE5D8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest text-[#C5A059] uppercase">
            Nossa História & Essência
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F1C18] mt-2 mb-4">
            Sobre o Joana's By Birolita
          </h2>
          <div className="w-12 h-0.5 bg-[#C5A059] mx-auto mb-4" />
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Uma homenagem ao bom gosto, à hospitalidade angolana e à riqueza culinária inesgotável da província de Benguela.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Composition: 2 Curated Photos */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80"
                alt="Ambiente sofisticado e acolhedor do restaurante em Benguela"
                className="w-full h-80 sm:h-96 object-cover object-center transform hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Secondary Floating Image */}
            <div className="hidden sm:block absolute -bottom-8 -right-6 z-20 w-56 h-56 rounded-xl overflow-hidden shadow-2xl border-4 border-[#FAF7F2]">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80"
                alt="Chef a preparar pratos no Joana's By Birolita"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Experience Badge */}
            <div className="absolute top-2 left-2 sm:-top-4 sm:-left-4 z-20 bg-[#24211D] text-[#FAF7F2] p-3 sm:p-4 rounded-xl shadow-lg border border-[#C5A059]/40 max-w-[170px]">
              <p className="font-serif text-xl sm:text-2xl font-bold text-[#C5A059] leading-none">Benguela</p>
              <p className="text-[10px] sm:text-[11px] text-stone-300 mt-1 uppercase tracking-wider">Tradição & Sabor</p>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-6 space-y-6 text-[#2E2A25]">
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1C1917] leading-snug">
              Onde o carinho da cozinha familiar encontra a elegância da gastronomia contemporânea.
            </h3>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              No coração de <strong>Benguela</strong>, o <strong>Joana's By Birolita</strong> nasceu com uma missão clara: proporcionar uma experiência sensorial acolhedora e memorável. Cada receita valoriza os ingredientes locais, desde o pescado fresco da costa marítima até aos sabores tradicionais e cortes grelhados.
            </p>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              O nosso espaço foi desenhado para acolher almoços executivos, jantares tranquilos e celebrações especiais em família, com hospitalidade genuína e dedicação em cada detalhe.
            </p>

            {/* Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-white/70 border border-[#EBE3D3] shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-[#C5A059]/15 flex items-center justify-center text-[#C5A059] mb-2">
                  <Compass className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-sm text-[#1F1C18]">Frescura da Costa</h4>
                <p className="text-xs text-stone-500 mt-1">Ingredientes selecionados e preparados diariamente em Benguela.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/70 border border-[#EBE3D3] shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-[#C5A059]/15 flex items-center justify-center text-[#C5A059] mb-2">
                  <Heart className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-sm text-[#1F1C18]">Cozinha com Alma</h4>
                <p className="text-xs text-stone-500 mt-1">Temperos autênticos e receitas com história e carinho.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/70 border border-[#EBE3D3] shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-[#C5A059]/15 flex items-center justify-center text-[#C5A059] mb-2">
                  <Award className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-sm text-[#1F1C18]">Serviço de Excelência</h4>
                <p className="text-xs text-stone-500 mt-1">Hospitalidade calorosa e atenção a cada detalhe.</p>
              </div>
            </div>

            {/* Location Notice Tag */}
            <div className="p-3.5 rounded-lg bg-[#F2ECE0] border-l-2 border-[#C5A059] text-xs text-stone-600 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span>
                Horário: {RESTAURANT_INFO.hours.weekdays} • Localização: {RESTAURANT_INFO.address}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
