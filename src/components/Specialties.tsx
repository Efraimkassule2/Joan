import React, { useState, useEffect } from 'react';
import { Star, MessageCircle, Plus, Sparkles } from 'lucide-react';
import { formatKz, RESTAURANT_INFO } from '../data/restaurantData';
import { Dish } from '../types';
import { generateWhatsAppLink, getStoredDishes } from '../services/restaurantStorage';

interface SpecialtiesProps {
  onAddToCart: (dish: Dish) => void;
}

export const Specialties: React.FC<SpecialtiesProps> = ({ onAddToCart }) => {
  const [allDishes, setAllDishes] = useState<Dish[]>(getStoredDishes);

  useEffect(() => {
    const handleUpdate = () => {
      setAllDishes(getStoredDishes());
    };
    window.addEventListener('jb_dishes_updated', handleUpdate);
    return () => window.removeEventListener('jb_dishes_updated', handleUpdate);
  }, []);

  const specialties = allDishes.filter((d) => d.isSpecialty);

  const handleWhatsAppSingleDish = (dish: Dish) => {
    const priceText = dish.priceDisplay || formatKz(dish.priceKz);
    const text = `Olá, Joana's By Birolita! Gostaria de consultar a disponibilidade da especialidade: *${dish.name}* (${priceText}) do vosso restaurante em Benguela.`;
    window.open(generateWhatsAppLink(RESTAURANT_INFO.whatsappNumber, text), '_blank');
  };

  return (
    <section id="especialidades" className="py-20 bg-[#F4EFE6] border-t border-[#E5DEC9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A059]/15 text-[#8C6D23] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Sugestões de Assinatura</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] mb-3">
            Especialidades da Casa
          </h2>
          <div className="w-12 h-0.5 bg-[#C5A059] mx-auto mb-4" />
          <p className="text-stone-600 text-sm sm:text-base">
            Pratos icónicos que representam o melhor da gastronomia em Benguela e a rica herança da culinária angolana.
          </p>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialties.map((dish) => (
            <div
              key={dish.id}
              id={`specialty-${dish.id}`}
              className="group bg-[#FAF7F2] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E8E1D0] flex flex-col"
            >
              {/* Image Container with Badges */}
              <div className="relative h-60 overflow-hidden bg-stone-200">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />

                {/* Badge Tag */}
                {dish.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#1C1917]/85 backdrop-blur-sm text-[#E5C378] text-xs font-semibold tracking-wide border border-[#C5A059]/40 flex items-center gap-1">
                    <Star className="w-3 h-3 text-[#C5A059] fill-[#C5A059]" />
                    {dish.badge}
                  </span>
                )}

                {/* Price Tag Pill */}
                <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-[#FAF7F2]/95 backdrop-blur-md shadow-md text-[#1C1917] font-serif font-bold text-xs sm:text-sm border border-[#C5A059]/30">
                  {formatKz(dish.priceKz, dish.priceDisplay)}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917] mb-2 leading-snug group-hover:text-[#A67C1E] transition-colors">
                    {dish.name}
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
                    {dish.description}
                  </p>

                  {/* Ingredients preview */}
                  {dish.ingredients && (
                    <div className="mb-4">
                      <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5">
                        Ingredientes em Destaque:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {dish.ingredients.slice(0, 3).map((ing, i) => (
                          <span
                            key={i}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-[#EFE9DD] text-stone-700 font-medium"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pairing recommendation */}
                  {dish.pairing && (
                    <p className="text-xs text-[#8C6D23] italic mb-4">
                      🍷 <span className="font-medium">Harmonização:</span> {dish.pairing}
                    </p>
                  )}
                </div>

                {/* Dual Action Buttons */}
                <div className="pt-4 border-t border-[#E8E1D0] grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onAddToCart(dish)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#FAF7F2] hover:bg-[#EBE4D5] text-[#1C1917] border border-[#D5CCB8] text-xs font-semibold transition-colors active:scale-95"
                    title="Adicionar ao pedido"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Adicionar</span>
                  </button>

                  <button
                    onClick={() => handleWhatsAppSingleDish(dish)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold transition-colors shadow-sm active:scale-95"
                    title="Pedir direto no WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
