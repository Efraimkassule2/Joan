import React, { useState } from 'react';
import { Calendar, Users, Clock, MessageCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { createReservation, generateWhatsAppLink } from '../services/firebaseReadyStorage';
import { ReservationData } from '../types';

export const ReservationSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    date: '',
    time: '19:30',
    guests: 2,
    occasion: 'Jantar Romântico',
    specialRequests: '',
  });

  const [loading, setLoading] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<ReservationData | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'guests' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.date) {
      alert('Por favor preencha o seu nome, telefone e data da reserva.');
      return;
    }

    setLoading(true);

    try {
      // Prepared for Firebase persistence
      const saved = await createReservation({
        fullName: formData.fullName,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        guests: formData.guests,
        occasion: formData.occasion,
        specialRequests: formData.specialRequests,
      });

      setConfirmedReservation(saved);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendToWhatsApp = () => {
    const msg = `🍷 *NOVA RESERVA DE MESA - JOANA'S BY BIROLITA*\n` +
      `📍 *Benguela, Angola*\n` +
      `----------------------------------------\n` +
      `👤 *Nome:* ${formData.fullName}\n` +
      `📞 *Contacto:* ${formData.phone}\n` +
      `📅 *Data:* ${formData.date}\n` +
      `⏰ *Horário:* ${formData.time}\n` +
      `👥 *Pessoas:* ${formData.guests} pessoa(s)\n` +
      `🎉 *Ocasião:* ${formData.occasion}\n` +
      (formData.specialRequests ? `📝 *Pedidos Especiais:* ${formData.specialRequests}\n` : '') +
      `----------------------------------------\n` +
      `Aguardo a confirmação da disponibilidade da nossa mesa. Obrigado!`;

    const link = generateWhatsAppLink(RESTAURANT_INFO.whatsappNumber, msg);
    window.open(link, '_blank');
  };

  return (
    <section id="reservas" className="py-20 bg-[#FAF7F2] border-t border-[#ECE5D8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A059]/15 text-[#8C6D23] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Garanta o Seu Momento</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] mb-3">
            Reserva de Mesa
          </h2>
          <div className="w-12 h-0.5 bg-[#C5A059] mx-auto mb-4" />
          <p className="text-stone-600 text-sm sm:text-base">
            Planeie o seu almoço ou jantar em Benguela. Reserve online ou confirme de forma imediata via WhatsApp.
          </p>
        </div>

        {/* Main Card Container */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-[#E8E1D0] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Visual / Info Sidebar */}
          <div className="lg:col-span-5 bg-[#1F1C18] text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                alt="Ambiente de jantar"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="relative z-10 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#E5C378] font-semibold">
                  Benguela • Angola
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                  Joana's By Birolita
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-stone-300">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Horários de Serviço:</p>
                    <p className="text-stone-300">{RESTAURANT_INFO.hours.weekdays}</p>
                    <p className="text-stone-300">{RESTAURANT_INFO.hours.weekends}</p>
                    <p className="text-stone-400 text-xs mt-0.5">{RESTAURANT_INFO.hours.closed}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Eventos & Grupos:</p>
                    <p className="text-stone-300">
                      [POLÍTICA DE RESERVAS PARA GRUPOS E EVENTOS A CONFIRMAR COM O RESTAURANTE]
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/15">
              <p className="text-xs text-stone-300">Prefere reservar por telefone?</p>
              <p className="font-serif text-sm sm:text-base font-bold text-[#E5C378] mt-1 break-words">
                {RESTAURANT_INFO.phoneDisplay}
              </p>
            </div>
          </div>

          {/* Right Interactive Form */}
          <div className="lg:col-span-7 p-6 sm:p-8">
            {confirmedReservation ? (
              <div className="text-center py-8 space-y-5 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-[#25D366]/15 text-[#25D366] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1C1917]">
                    Pedido de Reserva Registado!
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-sm mx-auto">
                    Obrigado, <strong>{confirmedReservation.fullName}</strong>. A sua solicitação para o dia{' '}
                    <strong>{confirmedReservation.date}</strong> às <strong>{confirmedReservation.time}</strong> foi recebida.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8E1D0] text-xs text-left max-w-sm mx-auto space-y-1">
                  <p><strong>Nº Pessoas:</strong> {confirmedReservation.guests}</p>
                  <p><strong>Contacto:</strong> {confirmedReservation.phone}</p>
                  <p><strong>Ocasião:</strong> {confirmedReservation.occasion}</p>
                  {confirmedReservation.specialRequests && (
                    <p><strong>Notas:</strong> {confirmedReservation.specialRequests}</p>
                  )}
                </div>

                <div className="space-y-2 max-w-sm mx-auto pt-2">
                  <button
                    onClick={handleSendToWhatsApp}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#20bd5a] transition-colors shadow"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Confirmar Agora pelo WhatsApp</span>
                  </button>

                  <button
                    onClick={() => {
                      setConfirmedReservation(null);
                      setFormData({
                        fullName: '',
                        phone: '',
                        date: '',
                        time: '19:30',
                        guests: 2,
                        occasion: 'Jantar Romântico',
                        specialRequests: '',
                      });
                    }}
                    className="text-xs text-stone-500 hover:text-stone-800 transition-colors underline pt-2"
                  >
                    Fazer outra reserva
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Ex: Seu Nome Completo"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0D8C8] bg-white text-xs sm:text-sm text-[#1C1917] focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Telefone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Ex: [Seu Telefone / WhatsApp]"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0D8C8] bg-white text-xs sm:text-sm text-[#1C1917] focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                    />
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Data da Reserva *
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0D8C8] bg-white text-xs sm:text-sm text-[#1C1917] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Horário Desejado *
                    </label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0D8C8] bg-white text-xs sm:text-sm text-[#1C1917] focus:outline-none focus:border-[#C5A059]"
                    >
                      <optgroup label="Almoço">
                        <option value="12:00">12:00</option>
                        <option value="12:30">12:30</option>
                        <option value="13:00">13:00</option>
                        <option value="13:30">13:30</option>
                        <option value="14:00">14:00</option>
                      </optgroup>
                      <optgroup label="Jantar">
                        <option value="19:00">19:00</option>
                        <option value="19:30">19:30</option>
                        <option value="20:00">20:00</option>
                        <option value="20:30">20:30</option>
                        <option value="21:00">21:00</option>
                        <option value="21:30">21:30</option>
                      </optgroup>
                    </select>
                  </div>
                </div>

                {/* Guests & Occasion */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Número de Pessoas *
                    </label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0D8C8] bg-white text-xs sm:text-sm text-[#1C1917] focus:outline-none focus:border-[#C5A059]"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Pessoa' : 'Pessoas'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Tipo de Ocasião
                    </label>
                    <select
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0D8C8] bg-white text-xs sm:text-sm text-[#1C1917] focus:outline-none focus:border-[#C5A059]"
                    >
                      <option value="Almoço / Jantar Casual">Almoço / Jantar Casual</option>
                      <option value="Jantar Romântico">Jantar Romântico</option>
                      <option value="Convívio Familiar">Convívio Familiar</option>
                      <option value="Almoço de Negócios">Almoço de Negócios</option>
                      <option value="Aniversário / Celebração">Aniversário / Celebração</option>
                      <option value="Outra Ocasião">Outra Ocasião</option>
                    </select>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Pedidos Especiais / Observações
                  </label>
                  <textarea
                    rows={2}
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    placeholder="Ex: Mesa próxima da janela, cadeira de bebé, restrições alimentares..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0D8C8] bg-white text-xs sm:text-sm text-[#1C1917] focus:outline-none focus:border-[#C5A059] resize-none"
                  />
                </div>

                {/* Submit Actions */}
                <div className="pt-3 space-y-2.5">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#24211D] text-[#FAF7F2] font-semibold text-sm hover:bg-[#38332E] transition-all border border-[#C5A059] shadow active:scale-95"
                  >
                    <Calendar className="w-4 h-4 text-[#C5A059]" />
                    <span>{loading ? 'A processar...' : 'Confirmar Reserva de Mesa'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendToWhatsApp}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 font-semibold text-xs transition-colors border border-[#25D366]/30 active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>Ou enviar diretamente pelo WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
