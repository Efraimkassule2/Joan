import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Calendar, Phone, MessageCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { generateWhatsAppLink } from '../services/firebaseReadyStorage';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onOpenReservation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Especialidades', href: '#especialidades' },
    { name: 'Menu', href: '#menu' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Galeria', href: '#galeria' },
    { name: 'Reservas', href: '#reservas' },
    { name: 'Contactos', href: '#contactos' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappGeneralUrl = generateWhatsAppLink(
    RESTAURANT_INFO.whatsappNumber,
    "Olá, Joana's By Birolita! Gostaria de obter informações sobre o restaurante e o menu em Benguela."
  );

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-[#E8E2D5] py-3'
            : 'bg-gradient-to-b from-black/70 via-black/40 to-transparent py-4 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#inicio"
            id="brand-logo-link"
            onClick={(e) => handleNavClick(e, '#inicio')}
            className="flex items-center gap-3 group"
          >
            <div
              className={`w-10 h-10 rounded-full border flex items-center justify-center font-serif text-lg font-bold transition-colors ${
                isScrolled
                  ? 'border-[#C5A059] bg-[#FAF7F2] text-[#24211D]'
                  : 'border-[#C5A059] bg-black/40 text-[#F5E6C8]'
              }`}
            >
              J&B
            </div>
            <div className="flex flex-col">
              <span
                className={`font-serif text-lg sm:text-xl font-bold tracking-tight leading-none transition-colors ${
                  isScrolled ? 'text-[#1F1C18]' : 'text-white'
                }`}
              >
                Joana's <span className="text-[#C5A059] font-normal italic">By Birolita</span>
              </span>
              <span
                className={`text-[10px] tracking-widest uppercase mt-0.5 ${
                  isScrolled ? 'text-[#78716C]' : 'text-stone-300'
                }`}
              >
                Benguela • Angola
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`transition-colors hover:text-[#C5A059] relative py-1 ${
                  isScrolled ? 'text-[#44403C]' : 'text-stone-200 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* WhatsApp Quick Link */}
            <a
              href={whatsappGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                isScrolled
                  ? 'bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 border border-[#25D366]/30'
                  : 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
              }`}
              title="Conversar pelo WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>

            {/* Cart / Order Trigger */}
            <button
              id="cart-trigger-btn-desktop"
              onClick={onOpenCart}
              className={`relative p-2 rounded-lg transition-colors flex items-center justify-center ${
                isScrolled
                  ? 'text-[#292524] hover:bg-[#EFE9DD]'
                  : 'text-white hover:bg-white/10'
              }`}
              title="Ver meu pedido"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C5A059] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Reservation Button */}
            <button
              id="nav-reservation-btn-desktop"
              onClick={onOpenReservation}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#24211D] text-[#FAF7F2] hover:bg-[#38332E] text-xs font-semibold tracking-wide shadow transition-all border border-[#C5A059]/40 hover:border-[#C5A059]"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Reservar Mesa</span>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Cart trigger for mobile */}
            <button
              id="cart-trigger-btn-mobile"
              onClick={onOpenCart}
              className={`relative p-2 rounded-lg ${
                isScrolled ? 'text-[#292524]' : 'text-white'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C5A059] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-[#292524] hover:bg-[#EFE9DD]' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-4/5 max-w-sm h-full bg-[#FAF7F2] text-[#24211D] shadow-2xl flex flex-col p-6 overflow-y-auto animate-in slide-in-from-right duration-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E5DEC9] pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full border border-[#C5A059] bg-[#F5EEDD] flex items-center justify-center font-serif text-sm font-bold text-[#24211D]">
                  J&B
                </div>
                <div>
                  <p className="font-serif font-bold text-base leading-none">Joana's By Birolita</p>
                  <p className="text-[10px] text-[#78716C] uppercase tracking-wider">Benguela</p>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-[#57534E] hover:text-[#1C1917] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-2 mb-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3 py-2.5 rounded-lg text-base font-medium text-[#292524] hover:bg-[#EFE9DD] hover:text-[#C5A059] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Mobile Actions */}
            <div className="mt-auto space-y-3 pt-4 border-t border-[#E5DEC9]">
              <a
                href={whatsappGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] text-white font-semibold text-sm shadow hover:bg-[#20bd5a] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Conversar no WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#24211D] text-[#FAF7F2] font-semibold text-sm shadow hover:bg-[#38332E] transition-colors border border-[#C5A059]"
              >
                <Calendar className="w-4 h-4 text-[#C5A059]" />
                <span>Reservar Mesa Online</span>
              </button>

              <div className="text-center pt-2 text-xs text-[#78716C]">
                <p className="flex items-center justify-center gap-1">
                  <Phone className="w-3 h-3 text-[#C5A059]" /> {RESTAURANT_INFO.phoneDisplay}
                </p>
                <p className="mt-1 text-[11px] text-[#A8A29E]">Benguela, Angola</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
