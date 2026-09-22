import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, MapPin, Instagram, Facebook, Heart, Lock } from 'lucide-react';
import { generateWhatsAppLink, getStoredRestaurantInfo } from '../services/restaurantStorage';
import { RestaurantContactInfo } from '../types';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const [info, setInfo] = useState<RestaurantContactInfo>(getStoredRestaurantInfo);

  useEffect(() => {
    const handleInfoUpdate = () => setInfo(getStoredRestaurantInfo());
    window.addEventListener('jb_info_updated', handleInfoUpdate);
    return () => window.removeEventListener('jb_info_updated', handleInfoUpdate);
  }, []);

  const whatsappUrl = generateWhatsAppLink(
    info.whatsappNumber,
    "Olá, Joana's By Birolita! Gostaria de falar com o restaurante em Benguela."
  );

  return (
    <footer className="bg-[#191715] text-[#EFEBE4] pt-16 pb-12 border-t border-[#312B24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#2C2620]">
          {/* Col 1: Brand & Essence */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center font-serif font-bold text-lg text-[#E5C378]">
                J
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-white block">
                  Joana's
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-semibold -mt-1 block">
                  By Birolita • Benguela
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Alta gastronomia costeira e culinária angolana num ambiente acolhedor, sofisticado e memorável na cidade de Benguela.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Rede Social: ${info.social.instagram}`);
                }}
                className="w-9 h-9 rounded-full bg-[#27221D] hover:bg-[#C5A059] hover:text-[#191715] text-stone-300 flex items-center justify-center transition-colors"
                title={info.social.instagram}
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Rede Social: ${info.social.facebook}`);
                }}
                className="w-9 h-9 rounded-full bg-[#27221D] hover:bg-[#C5A059] hover:text-[#191715] text-stone-300 flex items-center justify-center transition-colors"
                title={info.social.facebook}
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/40 flex items-center justify-center transition-colors"
                title="Falar no WhatsApp"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#E5C378]">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#inicio" className="hover:text-[#E5C378] transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#especialidades" className="hover:text-[#E5C378] transition-colors">
                  Especialidades da Casa
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#E5C378] transition-colors">
                  Menu & Ementa
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-[#E5C378] transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#galeria" className="hover:text-[#E5C378] transition-colors">
                  Galeria de Fotografias
                </a>
              </li>
              <li>
                <a href="#reservas" className="hover:text-[#E5C378] transition-colors">
                  Reserva de Mesa
                </a>
              </li>
              <li>
                <a href="#contactos" className="hover:text-[#E5C378] transition-colors">
                  Contactos & Localização
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#E5C378]">
              Horário de Atendimento
            </h4>
            <div className="space-y-2 text-xs text-stone-300">
              <div>
                <p className="text-stone-400 font-medium">Dias Úteis:</p>
                <p className="text-stone-200">{info.hours.weekdays}</p>
              </div>
              <div>
                <p className="text-stone-400 font-medium">Fim de Semana:</p>
                <p className="text-stone-200">{info.hours.weekends}</p>
              </div>
              <div>
                <p className="text-stone-400 font-medium">Encerramento:</p>
                <p className="text-stone-400 italic text-[11px]">{info.hours.closed}</p>
              </div>
            </div>
          </div>

          {/* Col 4: Contacts & Address */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#E5C378]">
              Contactos
            </h4>
            <div className="space-y-2.5 text-xs text-stone-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span className="break-words">{info.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>{info.phoneDisplay || info.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>{info.whatsappDisplay || info.whatsappNumber}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & Admin Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>© {new Date().getFullYear()} Joana's By Birolita. Todos os direitos reservados. Benguela, Angola.</p>
          
          <div className="flex items-center gap-4">
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 text-stone-400 hover:text-[#E5C378] transition-colors py-1 px-2.5 rounded-lg border border-stone-800 hover:border-[#C5A059]/40 bg-stone-900/60"
              >
                <Lock className="w-3 h-3 text-[#C5A059]" />
                <span>Painel de Gestão</span>
              </button>
            )}

            <p className="flex items-center gap-1">
              <span>Feito em</span>
              <span className="text-[#C5A059] font-medium">Benguela</span>
              <Heart className="w-3.5 h-3.5 text-[#C5A059] fill-[#C5A059]" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
