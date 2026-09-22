import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { GalleryItem } from '../types';
import { Eye, X, ChevronRight, ChevronLeft } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'todos' | 'pratos' | 'ambiente' | 'bebidas'>('todos');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeCategory === 'todos') return true;
    return item.category === activeCategory;
  });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const activeLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section id="galeria" className="py-20 bg-[#F4EFE6] border-t border-[#E5DEC9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-widest text-[#C5A059] uppercase">
            Experiência Visual
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] mt-2 mb-3">
            Galeria de Fotografias
          </h2>
          <div className="w-12 h-0.5 bg-[#C5A059] mx-auto mb-4" />
          <p className="text-stone-600 text-sm sm:text-base">
            Um vislumbre dos nossos pratos, do ambiente acolhedor e dos momentos especiais vividos no Joana's By Birolita em Benguela.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {[
            { id: 'todos', label: 'Tudo' },
            { id: 'pratos', label: 'Pratos & Sabores' },
            { id: 'ambiente', label: 'Espaço & Sala' },
            { id: 'bebidas', label: 'Bebidas & Bar' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveCategory(tab.id as any);
                setLightboxIndex(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === tab.id
                  ? 'bg-[#24211D] text-[#FAF7F2] border border-[#C5A059] shadow-sm'
                  : 'bg-[#EFE9DD] text-stone-700 hover:bg-[#E5DEC9]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Bento / Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E8E1D0] bg-stone-200"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <div className="w-8 h-8 rounded-full bg-[#C5A059] text-white flex items-center justify-center mb-2 shadow">
                  <Eye className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-base leading-tight text-white mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-stone-300 line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeLightboxItem && (
          <div
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 animate-in fade-in duration-200 backdrop-blur-md"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              title="Fechar"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Nav Button */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              title="Anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Nav Button */}
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              title="Seguinte"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Content Container */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl max-h-[85vh] flex flex-col rounded-2xl overflow-hidden bg-[#1F1C18] border border-white/10 shadow-2xl"
            >
              <div className="relative flex-1 overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={activeLightboxItem.image}
                  alt={activeLightboxItem.title}
                  className="max-h-[68vh] w-auto max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-4 sm:p-5 bg-[#1C1917] text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-white/10">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#E5C378]">
                    {activeLightboxItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 mt-0.5">
                    {activeLightboxItem.caption}
                  </p>
                </div>
                <div className="text-xs text-stone-400">
                  {lightboxIndex! + 1} de {filteredItems.length}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
