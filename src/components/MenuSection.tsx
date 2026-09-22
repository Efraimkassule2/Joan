import React, { useState, useMemo, useEffect } from 'react';
import { Search, Plus, MessageCircle, Info, Check, Filter, X } from 'lucide-react';
import { MENU_CATEGORIES, formatKz, RESTAURANT_INFO } from '../data/restaurantData';
import { Dish } from '../types';
import { generateWhatsAppLink, getStoredDishes } from '../services/restaurantStorage';

interface MenuSectionProps {
  onAddToCart: (dish: Dish) => void;
  cartDishIds: Set<string>;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart, cartDishIds }) => {
  const [allDishes, setAllDishes] = useState<Dish[]>(getStoredDishes);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDishModal, setActiveDishModal] = useState<Dish | null>(null);

  useEffect(() => {
    const handleUpdate = () => {
      setAllDishes(getStoredDishes());
    };
    window.addEventListener('jb_dishes_updated', handleUpdate);
    return () => window.removeEventListener('jb_dishes_updated', handleUpdate);
  }, []);

  const filteredDishes = useMemo(() => {
    return allDishes.filter((dish) => {
      const matchesCategory = selectedCategory === 'todos' || dish.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.ingredients?.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [allDishes, selectedCategory, searchQuery]);

  const handleWhatsAppSingleDish = (dish: Dish) => {
    const priceText = dish.priceDisplay || formatKz(dish.priceKz);
    const text = `Olá, Joana's By Birolita! Gostaria de consultar sobre o prato: *${dish.name}* (${priceText}) do vosso menu em Benguela.`;
    window.open(generateWhatsAppLink(RESTAURANT_INFO.whatsappNumber, text), '_blank');
  };

  return (
    <section id="menu" className="py-20 bg-[#FAF7F2] border-t border-[#ECE5D8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-widest text-[#C5A059] uppercase">
            Ementa Gastronómica
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] mt-2 mb-3">
            O Nosso Menu
          </h2>
          <div className="w-12 h-0.5 bg-[#C5A059] mx-auto mb-4" />
          <p className="text-stone-600 text-sm sm:text-base">
            Uma seleção de receitas preparadas com ingredientes frescos da região de Benguela. Escolha os seus pratos e faça o pedido direto pelo WhatsApp.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="menu-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar por prato, marisco, carne ou ingrediente..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-[#E0D8C8] text-sm text-[#1C1917] placeholder-stone-400 focus:outline-none focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-stone-400 hover:text-stone-600 px-2 py-1"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar justify-start sm:justify-center">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`category-btn-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                  isActive
                    ? 'bg-[#24211D] text-[#FAF7F2] shadow-md border border-[#C5A059]'
                    : 'bg-[#EFE9DD] text-stone-700 hover:bg-[#E5DEC9] border border-transparent'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Dishes Grid */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-16 bg-white/50 rounded-2xl border border-dashed border-[#DDD5C5]">
            <Filter className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <p className="font-serif text-lg text-stone-700 font-semibold">Nenhum prato encontrado</p>
            <p className="text-xs text-stone-500 mt-1">Tente pesquisar por outro termo ou mude de categoria.</p>
            <button
              onClick={() => {
                setSelectedCategory('todos');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-[#C5A059] text-white text-xs font-semibold"
            >
              Ver Menu Completo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDishes.map((dish) => {
              const isInCart = cartDishIds.has(dish.id);

              return (
                <div
                  key={dish.id}
                  id={`dish-card-${dish.id}`}
                  className="bg-white rounded-2xl overflow-hidden border border-[#ECE5D8] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Top Image Banner */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-stone-100 cursor-pointer" onClick={() => setActiveDishModal(dish)}>
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Badge or Unavailable */}
                    {dish.available === false ? (
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-stone-900/90 backdrop-blur-sm text-stone-300 text-[11px] font-semibold border border-stone-600">
                        Indisponível hoje
                      </span>
                    ) : dish.badge ? (
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#1C1917]/80 backdrop-blur-sm text-[#E5C378] text-[11px] font-semibold border border-[#C5A059]/40">
                        {dish.badge}
                      </span>
                    ) : null}

                    {/* View Details Click */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDishModal(dish);
                      }}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm transition-colors"
                      title="Ver detalhes do prato"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>

                    {/* Price in Kz */}
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-[#FAF7F2]/95 backdrop-blur-sm shadow text-[#1C1917] font-serif font-bold text-xs sm:text-sm border border-[#C5A059]/30">
                      {formatKz(dish.priceKz, dish.priceDisplay)}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3
                        onClick={() => setActiveDishModal(dish)}
                        className="font-serif text-base sm:text-lg font-bold text-[#1C1917] mb-1.5 group-hover:text-[#A67C1E] transition-colors cursor-pointer"
                      >
                        {dish.name}
                      </h3>
                      <p className="text-stone-600 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4">
                        {dish.description}
                      </p>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-3 border-t border-[#F2ECE0] grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onAddToCart(dish)}
                        className={`flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl text-xs font-semibold transition-all active:scale-95 ${
                          isInCart
                            ? 'bg-[#1C1917] text-[#FAF7F2] border border-[#C5A059]'
                            : 'bg-[#F7F3EB] hover:bg-[#EFE7D8] text-[#1C1917] border border-[#DDD5C5]'
                        }`}
                      >
                        {isInCart ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#C5A059]" />
                            <span>No Pedido</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5 text-[#C5A059]" />
                            <span>Adicionar</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleWhatsAppSingleDish(dish)}
                        className="flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold transition-colors shadow-sm active:scale-95"
                        title="Pedir direto no WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal for Dish Details with Mobile Overflow Protection */}
        {activeDishModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#FAF7F2] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E0D8C8]">
              <div className="relative h-56 sm:h-64">
                <img
                  src={activeDishModal.image}
                  alt={activeDishModal.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setActiveDishModal(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center text-sm hover:bg-black transition-colors"
                  aria-label="Fechar"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-[#FAF7F2]/95 text-[#1C1917] font-serif font-bold text-sm sm:text-base border border-[#C5A059]/40">
                  {formatKz(activeDishModal.priceKz, activeDishModal.priceDisplay)}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {activeDishModal.badge && (
                      <span className="text-[11px] font-semibold text-[#8C6D23] bg-[#C5A059]/15 px-2 py-0.5 rounded-md">
                        {activeDishModal.badge}
                      </span>
                    )}
                    <span className="text-[11px] uppercase tracking-wider text-stone-400">
                      Benguela • Joana's By Birolita
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917]">
                    {activeDishModal.name}
                  </h3>
                </div>

                <p className="text-stone-600 text-sm leading-relaxed">
                  {activeDishModal.description}
                </p>

                {activeDishModal.ingredients && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                      Ingredientes & Preparação:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {activeDishModal.ingredients.map((ing, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-[#ECE5D8] text-stone-800">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeDishModal.pairing && (
                  <div className="p-3 rounded-lg bg-[#F5EEDD] border-l-2 border-[#C5A059] text-xs text-[#6B5218]">
                    <span className="font-semibold">Harmonização sugerida:</span> {activeDishModal.pairing}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => {
                      onAddToCart(activeDishModal);
                      setActiveDishModal(null);
                    }}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#24211D] text-[#FAF7F2] font-semibold text-xs sm:text-sm hover:bg-[#38332E] transition-colors border border-[#C5A059] active:scale-95"
                  >
                    <Plus className="w-4 h-4 text-[#C5A059]" />
                    <span>Adicionar</span>
                  </button>

                  <button
                    onClick={() => {
                      handleWhatsAppSingleDish(activeDishModal);
                    }}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] text-white font-semibold text-xs sm:text-sm hover:bg-[#20bd5a] transition-colors shadow active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
