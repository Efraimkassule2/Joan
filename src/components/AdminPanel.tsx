import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Unlock,
  Calendar,
  ShoppingBag,
  UtensilsCrossed,
  Settings,
  CheckCircle2,
  XCircle,
  Clock,
  Plus,
  Trash2,
  Save,
  MessageCircle,
  Eye,
  EyeOff,
  Phone,
  MapPin,
  RefreshCw,
} from 'lucide-react';
import {
  getStoredDishes,
  saveDishItem,
  toggleDishAvailability,
  deleteDishItem,
  getStoredReservations,
  updateReservationStatus,
  deleteStoredReservation,
  getStoredOrders,
  updateOrderStatus,
  deleteStoredOrder,
  getStoredRestaurantInfo,
  saveStoredRestaurantInfo,
  generateWhatsAppLink,
} from '../services/restaurantStorage';
import { Dish, ReservationData, OrderRecord, RestaurantContactInfo } from '../types';
import { formatKz, MENU_CATEGORIES } from '../data/restaurantData';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'reservas' | 'pedidos' | 'cardapio' | 'configuracoes';

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('jb_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active tab
  const [activeTab, setActiveTab] = useState<TabType>('reservas');

  // Data states
  const [reservations, setReservations] = useState<ReservationData[]>([]);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantContactInfo>(getStoredRestaurantInfo);

  // Dish editor modal state
  const [editingDish, setEditingDish] = useState<Partial<Dish> | null>(null);
  const [isNewDish, setIsNewDish] = useState(false);

  // Status notice
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string | null>(null);

  // Load data
  const refreshAllData = () => {
    setReservations(getStoredReservations());
    setOrders(getStoredOrders());
    setDishes(getStoredDishes());
    setRestaurantInfo(getStoredRestaurantInfo());
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      refreshAllData();
    }
  }, [isOpen, isAuthenticated]);

  // Listen to storage events
  useEffect(() => {
    const handleDishes = () => setDishes(getStoredDishes());
    const handleReservations = () => setReservations(getStoredReservations());
    const handleOrders = () => setOrders(getStoredOrders());
    const handleInfo = () => setRestaurantInfo(getStoredRestaurantInfo());

    window.addEventListener('jb_dishes_updated', handleDishes);
    window.addEventListener('jb_reservations_updated', handleReservations);
    window.addEventListener('jb_orders_updated', handleOrders);
    window.addEventListener('jb_info_updated', handleInfo);

    return () => {
      window.removeEventListener('jb_dishes_updated', handleDishes);
      window.removeEventListener('jb_reservations_updated', handleReservations);
      window.removeEventListener('jb_orders_updated', handleOrders);
      window.removeEventListener('jb_info_updated', handleInfo);
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: 1234 or birolita
    const cleanPin = pinInput.trim().toLowerCase();
    if (cleanPin === '1234' || cleanPin === 'birolita' || cleanPin === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('jb_admin_auth', 'true');
      setAuthError('');
      setPinInput('');
      refreshAllData();
    } else {
      setAuthError('Código de acesso incorreto. Experimente o código padrão: 1234');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('jb_admin_auth');
    setPinInput('');
  };

  const showTemporaryNotice = (msg: string) => {
    setSaveSuccessNotice(msg);
    setTimeout(() => setSaveSuccessNotice(null), 3000);
  };

  // Handlers for Dish
  const handleSaveDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDish || !editingDish.name) return;

    const dishToSave: Dish = {
      id: editingDish.id || `dish-${Date.now()}`,
      name: editingDish.name.trim(),
      description: editingDish.description || '',
      priceKz: Number(editingDish.priceKz) || 0,
      priceDisplay: editingDish.priceDisplay || undefined,
      category: editingDish.category || 'entradas',
      image:
        editingDish.image ||
        'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      badge: editingDish.badge || undefined,
      isSpecialty: Boolean(editingDish.isSpecialty),
      available: editingDish.available !== false,
      ingredients: editingDish.ingredients || [],
    };

    saveDishItem(dishToSave);
    setEditingDish(null);
    showTemporaryNotice('Prato gravado com sucesso no cardápio!');
  };

  // Handlers for Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredRestaurantInfo(restaurantInfo);
    showTemporaryNotice('Configurações atualizadas com sucesso!');
  };

  if (!isOpen) return null;

  return (
    <div
      id="admin-panel-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto"
    >
      <div className="bg-[#FAF7F2] text-[#1C1917] w-full max-w-5xl rounded-2xl shadow-2xl border border-[#DCD3C0] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#1C1917] text-[#FAF7F2] border-b border-[#C5A059]/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center text-[#E5C378]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg font-bold">Painel de Gestão</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C5A059]/30 text-[#E5C378] font-medium border border-[#C5A059]/40">
                  Autónomo & Offline-Ready
                </span>
              </div>
              <p className="text-stone-400 text-xs">Joana's By Birolita • Benguela, Angola</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="text-xs text-stone-300 hover:text-white px-3 py-1.5 rounded-lg border border-stone-700 hover:border-stone-500 transition-colors"
              >
                Encerrar Sessão
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
              title="Fechar painel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Temporary toast notice */}
        {saveSuccessNotice && (
          <div className="bg-[#25D366] text-white px-4 py-2 text-xs font-semibold text-center flex items-center justify-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4" />
            <span>{saveSuccessNotice}</span>
          </div>
        )}

        {/* Content Body */}
        {!isAuthenticated ? (
          /* Login Form */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center my-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#EFE7D8] flex items-center justify-center text-[#8C6D23] mb-4 border border-[#C5A059]/40">
              <Unlock className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-center mb-2">Acesso Administrativo</h3>
            <p className="text-stone-600 text-sm text-center max-w-sm mb-6">
              Área reservada para a equipa do Joana's By Birolita gerir reservas, pedidos, cardápio e contactos.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Código de Acesso (PIN)
                </label>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Digite o código (Padrão: 1234)"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D5CABE] bg-white text-stone-900 focus:outline-none focus:border-[#C5A059] text-center font-mono text-base tracking-widest"
                  autoFocus
                />
              </div>

              {authError && <p className="text-xs text-red-600 text-center font-medium">{authError}</p>}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#1C1917] hover:bg-stone-800 text-[#FAF7F2] font-semibold text-sm border border-[#C5A059] transition-colors"
              >
                Entrar no Painel
              </button>

              <div className="text-center pt-2">
                <span className="text-[11px] text-stone-500">
                  Dica de teste rápido: use o código <strong className="text-stone-800 font-mono">1234</strong>
                </span>
              </div>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Nav Tabs */}
            <div className="flex border-b border-[#E5DEC9] bg-[#F4EFE6] px-4 sm:px-6 overflow-x-auto">
              <button
                onClick={() => setActiveTab('reservas')}
                className={`flex items-center gap-2 py-3.5 px-4 font-semibold text-xs sm:text-sm border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === 'reservas'
                    ? 'border-[#C5A059] text-[#1C1917] bg-[#FAF7F2]'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                <Calendar className="w-4 h-4 text-[#C5A059]" />
                <span>Reservas</span>
                {reservations.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-[#C5A059]/20 text-[#8C6D23] font-bold">
                    {reservations.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('pedidos')}
                className={`flex items-center gap-2 py-3.5 px-4 font-semibold text-xs sm:text-sm border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === 'pedidos'
                    ? 'border-[#C5A059] text-[#1C1917] bg-[#FAF7F2]'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
                <span>Pedidos</span>
                {orders.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-[#C5A059]/20 text-[#8C6D23] font-bold">
                    {orders.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('cardapio')}
                className={`flex items-center gap-2 py-3.5 px-4 font-semibold text-xs sm:text-sm border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === 'cardapio'
                    ? 'border-[#C5A059] text-[#1C1917] bg-[#FAF7F2]'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                <UtensilsCrossed className="w-4 h-4 text-[#C5A059]" />
                <span>Cardápio</span>
                <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-stone-200 text-stone-700 font-bold">
                  {dishes.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('configuracoes')}
                className={`flex items-center gap-2 py-3.5 px-4 font-semibold text-xs sm:text-sm border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === 'configuracoes'
                    ? 'border-[#C5A059] text-[#1C1917] bg-[#FAF7F2]'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                <Settings className="w-4 h-4 text-[#C5A059]" />
                <span>Configurações</span>
              </button>

              <div className="ml-auto flex items-center py-2">
                <button
                  onClick={refreshAllData}
                  className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-200 rounded-lg transition-colors"
                  title="Atualizar dados"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tab Contents */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
              {/* --- TAB: RESERVAS --- */}
              {activeTab === 'reservas' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-[#1C1917]">Reservas de Mesa</h3>
                      <p className="text-xs text-stone-600">
                        Histórico e solicitações submetidas através do website
                      </p>
                    </div>
                  </div>

                  {reservations.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-[#DDD5C5] rounded-xl p-6 bg-white/50">
                      <Calendar className="w-10 h-10 text-stone-400 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-stone-700">Nenhuma reserva registada ainda.</p>
                      <p className="text-xs text-stone-500 mt-1">
                        Assim que um cliente reservar uma mesa pelo formulário do site, ela aparecerá aqui.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {reservations.map((res) => (
                        <div
                          key={res.id}
                          className="p-4 rounded-xl bg-white border border-[#E5DEC9] shadow-sm flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div>
                                <h4 className="font-serif font-bold text-base text-[#1C1917]">{res.fullName}</h4>
                                <p className="text-xs text-stone-500">
                                  Telefone: <span className="font-mono text-stone-700">{res.phone}</span>
                                </p>
                              </div>
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                                  res.status === 'confirmada'
                                    ? 'bg-green-100 text-green-800 border border-green-200'
                                    : res.status === 'cancelada'
                                    ? 'bg-red-100 text-red-800 border border-red-200'
                                    : 'bg-amber-100 text-amber-800 border border-amber-200'
                                }`}
                              >
                                {res.status ? res.status.toUpperCase() : 'PENDENTE'}
                              </span>
                            </div>

                            <div className="grid grid-cols-3 gap-2 py-2 my-2 border-y border-[#F0EAE1] text-xs">
                              <div>
                                <span className="text-stone-500 block">Data:</span>
                                <strong className="text-stone-800">{res.date}</strong>
                              </div>
                              <div>
                                <span className="text-stone-500 block">Hora:</span>
                                <strong className="text-stone-800">{res.time}</strong>
                              </div>
                              <div>
                                <span className="text-stone-500 block">Pessoas:</span>
                                <strong className="text-stone-800">{res.guests} convidados</strong>
                              </div>
                            </div>

                            {res.occasion && (
                              <p className="text-xs text-stone-600 mb-1">
                                <span className="text-stone-500">Ocasião:</span> {res.occasion}
                              </p>
                            )}
                            {res.specialRequests && (
                              <p className="text-xs text-stone-600 italic mb-2">
                                <span className="text-stone-500 not-italic">Obs:</span> "{res.specialRequests}"
                              </p>
                            )}
                          </div>

                          <div className="pt-3 border-t border-[#F0EAE1] flex items-center justify-between gap-2 mt-2">
                            <div className="flex items-center gap-1.5">
                              {res.status !== 'confirmada' && (
                                <button
                                  onClick={() => res.id && updateReservationStatus(res.id, 'confirmada')}
                                  className="px-2.5 py-1 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-semibold"
                                >
                                  Confirmar
                                </button>
                              )}
                              {res.status !== 'cancelada' && (
                                <button
                                  onClick={() => res.id && updateReservationStatus(res.id, 'cancelada')}
                                  className="px-2.5 py-1 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-semibold"
                                >
                                  Cancelar
                                </button>
                              )}
                              {res.phone && (
                                <button
                                  onClick={() => {
                                    const msg = `Olá ${res.fullName}, entramos em contacto do restaurante Joana's By Birolita em Benguela sobre a sua reserva para dia ${res.date} às ${res.time}.`;
                                    window.open(generateWhatsAppLink(res.phone, msg), '_blank');
                                  }}
                                  className="p-1.5 rounded-lg bg-[#25D366] text-white hover:bg-[#20bd5a]"
                                  title="Contactar no WhatsApp"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>

                            <button
                              onClick={() => res.id && deleteStoredReservation(res.id)}
                              className="p-1.5 text-stone-400 hover:text-red-600 transition-colors"
                              title="Remover registo"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* --- TAB: PEDIDOS --- */}
              {activeTab === 'pedidos' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-[#1C1917]">Pedidos Registados</h3>
                      <p className="text-xs text-stone-600">Pedidos gerados pelos clientes através do carrinho</p>
                    </div>
                  </div>

                  {orders.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-[#DDD5C5] rounded-xl p-6 bg-white/50">
                      <ShoppingBag className="w-10 h-10 text-stone-400 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-stone-700">Nenhum pedido registado ainda.</p>
                      <p className="text-xs text-stone-500 mt-1">
                        Assim que um cliente finalizar um pedido pelo carrinho, ele será listado aqui.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orders.map((ord) => (
                        <div
                          key={ord.id}
                          className="p-4 rounded-xl bg-white border border-[#E5DEC9] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-mono text-xs font-bold text-stone-500">
                                #{ord.id.substring(0, 12)}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                  ord.orderType === 'entrega'
                                    ? 'bg-blue-100 text-blue-800'
                                    : ord.orderType === 'takeaway'
                                    ? 'bg-purple-100 text-purple-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {ord.orderType === 'entrega'
                                  ? 'Entrega em Benguela'
                                  : ord.orderType === 'takeaway'
                                  ? 'Takeaway'
                                  : `Mesa ${ord.tableNumber || ''}`}
                              </span>
                              <span className="text-[11px] text-stone-400">
                                {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>

                            {ord.customerName && (
                              <p className="text-xs font-semibold text-stone-800">
                                Cliente: {ord.customerName}
                              </p>
                            )}

                            {ord.addressBenguela && (
                              <p className="text-xs text-stone-600 flex items-center gap-1 mt-0.5">
                                <MapPin className="w-3 h-3 text-[#C5A059]" />
                                {ord.addressBenguela}
                              </p>
                            )}

                            {/* Items breakdown */}
                            <div className="mt-2 text-xs text-stone-700 space-y-0.5 pl-2 border-l-2 border-[#C5A059]/40">
                              {ord.items.map((it, idx) => (
                                <div key={idx}>
                                  <span className="font-semibold">{it.quantity}x</span> {it.dish.name}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between md:flex-col md:items-end gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-[#F0EAE1]">
                            <div className="text-right">
                              <span className="text-[11px] text-stone-500 block">Total:</span>
                              <strong className="font-serif text-base text-[#1C1917]">
                                {formatKz(ord.totalKz)}
                              </strong>
                            </div>

                            <div className="flex items-center gap-2">
                              <select
                                value={ord.status}
                                onChange={(e) =>
                                  updateOrderStatus(
                                    ord.id,
                                    e.target.value as 'recebido' | 'em_preparo' | 'concluido' | 'cancelado'
                                  )
                                }
                                className="text-xs py-1 px-2 rounded-lg border border-stone-300 bg-stone-50 font-medium"
                              >
                                <option value="recebido">Recebido</option>
                                <option value="em_preparo">Em Preparo</option>
                                <option value="concluido">Concluído</option>
                                <option value="cancelado">Cancelado</option>
                              </select>

                              <button
                                onClick={() => deleteStoredOrder(ord.id)}
                                className="p-1.5 text-stone-400 hover:text-red-600"
                                title="Eliminar pedido"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* --- TAB: CARDÁPIO --- */}
              {activeTab === 'cardapio' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-[#1C1917]">Gestão do Cardápio</h3>
                      <p className="text-xs text-stone-600">
                        Ative, desative, adicione ou edite pratos e preços em tempo real
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setIsNewDish(true);
                        setEditingDish({
                          name: '',
                          description: '',
                          priceKz: 0,
                          priceDisplay: '[PREÇO]',
                          category: 'mar',
                          available: true,
                          isSpecialty: false,
                          image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
                        });
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1C1917] hover:bg-stone-800 text-[#FAF7F2] text-xs font-semibold border border-[#C5A059] transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Novo Prato</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {dishes.map((dish) => (
                      <div
                        key={dish.id}
                        className={`p-3 rounded-xl bg-white border transition-all flex flex-col justify-between ${
                          dish.available === false
                            ? 'border-stone-300 opacity-60'
                            : 'border-[#E5DEC9] shadow-sm'
                        }`}
                      >
                        <div className="flex gap-3">
                          <img
                            src={dish.image}
                            alt={dish.name}
                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0 bg-stone-200"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-1">
                              <h4 className="font-serif font-bold text-xs sm:text-sm text-[#1C1917] truncate">
                                {dish.name}
                              </h4>
                            </div>
                            <span className="text-[10px] uppercase font-semibold text-[#8C6D23] block">
                              {dish.category} {dish.isSpecialty ? '• Especialidade' : ''}
                            </span>
                            <span className="font-serif text-xs font-bold text-stone-800 block mt-1">
                              {dish.priceDisplay || formatKz(dish.priceKz)}
                            </span>
                          </div>
                        </div>

                        <div className="pt-2 mt-2 border-t border-[#F2ECE0] flex items-center justify-between gap-1 text-xs">
                          <button
                            onClick={() => toggleDishAvailability(dish.id)}
                            className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-semibold transition-colors ${
                              dish.available === false
                                ? 'bg-stone-200 text-stone-600'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {dish.available === false ? (
                              <>
                                <EyeOff className="w-3 h-3" />
                                <span>Indisponível</span>
                              </>
                            ) : (
                              <>
                                <Eye className="w-3 h-3" />
                                <span>Disponível</span>
                              </>
                            )}
                          </button>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setIsNewDish(false);
                                setEditingDish(dish);
                              }}
                              className="px-2 py-1 rounded text-[11px] bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => deleteDishItem(dish.id)}
                              className="p-1 text-stone-400 hover:text-red-600"
                              title="Remover prato"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- TAB: CONFIGURAÇÕES --- */}
              {activeTab === 'configuracoes' && (
                <form onSubmit={handleSaveSettings} className="max-w-2xl space-y-4">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#1C1917]">
                      Configurações do Restaurante
                    </h3>
                    <p className="text-xs text-stone-600">
                      Atualize os contactos, endereço e horários do Joana's By Birolita
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Nome do Estabelecimento
                      </label>
                      <input
                        type="text"
                        value={restaurantInfo.name}
                        onChange={(e) => setRestaurantInfo({ ...restaurantInfo, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#D5CABE] bg-white text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Subtítulo / Especialidade
                      </label>
                      <input
                        type="text"
                        value={restaurantInfo.subtitle}
                        onChange={(e) => setRestaurantInfo({ ...restaurantInfo, subtitle: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#D5CABE] bg-white text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Telefone Principal
                      </label>
                      <input
                        type="text"
                        value={restaurantInfo.phone}
                        onChange={(e) =>
                          setRestaurantInfo({
                            ...restaurantInfo,
                            phone: e.target.value,
                            phoneDisplay: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#D5CABE] bg-white text-xs sm:text-sm font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        WhatsApp para Pedidos
                      </label>
                      <input
                        type="text"
                        value={restaurantInfo.whatsappNumber}
                        onChange={(e) =>
                          setRestaurantInfo({
                            ...restaurantInfo,
                            whatsappNumber: e.target.value,
                            whatsappDisplay: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#D5CABE] bg-white text-xs sm:text-sm font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Endereço Completo em Benguela
                    </label>
                    <input
                      type="text"
                      value={restaurantInfo.address}
                      onChange={(e) => setRestaurantInfo({ ...restaurantInfo, address: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#D5CABE] bg-white text-xs sm:text-sm"
                    />
                  </div>

                  <div className="pt-2 border-t border-[#E5DEC9]">
                    <h4 className="text-xs font-bold text-stone-800 mb-2 uppercase tracking-wider">
                      Horários de Atendimento
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] text-stone-600 mb-1">Dias Úteis</label>
                        <input
                          type="text"
                          value={restaurantInfo.hours.weekdays}
                          onChange={(e) =>
                            setRestaurantInfo({
                              ...restaurantInfo,
                              hours: { ...restaurantInfo.hours, weekdays: e.target.value },
                            })
                          }
                          className="w-full px-3 py-1.5 rounded-lg border border-[#D5CABE] bg-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-stone-600 mb-1">Fim de Semana</label>
                        <input
                          type="text"
                          value={restaurantInfo.hours.weekends}
                          onChange={(e) =>
                            setRestaurantInfo({
                              ...restaurantInfo,
                              hours: { ...restaurantInfo.hours, weekends: e.target.value },
                            })
                          }
                          className="w-full px-3 py-1.5 rounded-lg border border-[#D5CABE] bg-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-stone-600 mb-1">Folga / Encerramento</label>
                        <input
                          type="text"
                          value={restaurantInfo.hours.closed}
                          onChange={(e) =>
                            setRestaurantInfo({
                              ...restaurantInfo,
                              hours: { ...restaurantInfo.hours, closed: e.target.value },
                            })
                          }
                          className="w-full px-3 py-1.5 rounded-lg border border-[#D5CABE] bg-white text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1C1917] hover:bg-stone-800 text-[#FAF7F2] font-semibold text-xs sm:text-sm border border-[#C5A059] shadow-sm transition-colors"
                    >
                      <Save className="w-4 h-4 text-[#C5A059]" />
                      <span>Salvar Configurações</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* --- DISH EDIT/ADD MODAL --- */}
        {editingDish && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#DCD3C0] max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  {isNewDish ? 'Adicionar Novo Prato' : 'Editar Prato'}
                </h3>
                <button
                  onClick={() => setEditingDish(null)}
                  className="p-1 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveDish} className="space-y-3 text-xs sm:text-sm">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Nome do Prato</label>
                  <input
                    type="text"
                    required
                    value={editingDish.name || ''}
                    onChange={(e) => setEditingDish({ ...editingDish, name: e.target.value })}
                    placeholder="Ex: [NOME DO PRATO]"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Descrição</label>
                  <textarea
                    rows={2}
                    value={editingDish.description || ''}
                    onChange={(e) => setEditingDish({ ...editingDish, description: e.target.value })}
                    placeholder="Descrição dos ingredientes e modo de preparo..."
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Categoria</label>
                    <select
                      value={editingDish.category || 'mar'}
                      onChange={(e) =>
                        setEditingDish({
                          ...editingDish,
                          category: e.target.value as Dish['category'],
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300"
                    >
                      {MENU_CATEGORIES.filter((c) => c.id !== 'todos').map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Preço Display</label>
                    <input
                      type="text"
                      value={editingDish.priceDisplay || ''}
                      onChange={(e) => setEditingDish({ ...editingDish, priceDisplay: e.target.value })}
                      placeholder="Ex: [PREÇO] ou 12.500 Kz"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">URL da Imagem</label>
                  <input
                    type="url"
                    value={editingDish.image || ''}
                    onChange={(e) => setEditingDish({ ...editingDish, image: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                  />
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(editingDish.isSpecialty)}
                      onChange={(e) =>
                        setEditingDish({ ...editingDish, isSpecialty: e.target.checked })
                      }
                      className="rounded text-[#C5A059]"
                    />
                    <span className="text-xs font-semibold text-stone-800">Especialidade da Casa</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingDish.available !== false}
                      onChange={(e) =>
                        setEditingDish({ ...editingDish, available: e.target.checked })
                      }
                      className="rounded text-green-600"
                    />
                    <span className="text-xs font-semibold text-stone-800">Disponível no Menu</span>
                  </label>
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingDish(null)}
                    className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#1C1917] text-white font-semibold hover:bg-stone-800"
                  >
                    Salvar Prato
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
