import { Dish, MenuCategory, GalleryItem, RestaurantContactInfo } from '../types';

export const RESTAURANT_INFO: RestaurantContactInfo = {
  name: "Joana's By Birolita",
  subtitle: "Restaurante & Bar Gastronómico",
  city: "Benguela",
  country: "Angola",
  address: "[ENDEREÇO DO RESTAURANTE, BENGUELA - ANGOLA]",
  phone: "[TELEFONE DO RESTAURANTE]",
  phoneDisplay: "[TELEFONE DO RESTAURANTE]",
  whatsappNumber: "[WHATSAPP]",
  whatsappDisplay: "[WHATSAPP]",
  email: "[EMAIL DO RESTAURANTE]",
  hours: {
    weekdays: "[HORÁRIO - DIAS ÚTEIS: ALMOÇO E JANTAR]",
    weekends: "[HORÁRIO - FIM DE SEMANA: ALMOÇO E JANTAR]",
    closed: "[HORÁRIO - DIA DE ENCERRAMENTO/FOLGA]",
  },
  social: {
    instagram: "[LINK DO INSTAGRAM]",
    facebook: "[LINK DO FACEBOOK]",
  },
};

export const MENU_CATEGORIES: MenuCategory[] = [
  { id: 'todos', name: 'Todos os Pratos', description: 'Explore a nossa seleção completa' },
  { id: 'entradas', name: 'Entradas & Petiscos', description: 'Para abrir o apetite e partilhar momentos' },
  { id: 'mar', name: 'Peixes & Frutos do Mar', description: 'O frescor inigualável da costa de Benguela' },
  { id: 'carnes', name: 'Carnes Nobres', description: 'Cortes selecionados e grelhados no ponto perfeito' },
  { id: 'tipicos', name: 'Sabores Tradicionais', description: 'A alma e essência da cozinha angolana' },
  { id: 'sobremesas', name: 'Sobremesas', description: 'Toque doce artesanal para fechar a experiência' },
  { id: 'bebidas', name: 'Bebidas & Cocktails', description: 'Sumos naturais, vinhos selecionados e cocktails' },
];

export const DISHES: Dish[] = [
  // Especialidades / Peixes & Frutos do Mar
  {
    id: 'prato-mar-1',
    name: '[Especialidade de Marisco 1] - [NOME DO PRATO]',
    description: '[DESCRIÇÃO: Inserir descrição dos ingredientes frescos da costa, preparação e guarnições a fornecer pelo restaurante Joana\'s By Birolita]',
    priceKz: 0,
    priceDisplay: '[PREÇO]',
    category: 'mar',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
    badge: 'Especialidade da Casa',
    isSpecialty: true,
    ingredients: ['[Ingrediente Principal / Peixe da Costa]', '[Tempero da Casa]', '[Acompanhamento Tradicional]'],
    pairing: '[Sugestão de Harmonização / Vinho ou Bebida]'
  },
  {
    id: 'prato-mar-2',
    name: '[Especialidade de Marisco 2] - [NOME DO PRATO]',
    description: '[DESCRIÇÃO: Inserir detalhes sobre a confeção deste prato nobre de marisco com tempero da casa e acompanhamentos]',
    priceKz: 0,
    priceDisplay: '[PREÇO]',
    category: 'mar',
    image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=900&q=80',
    badge: 'Sugestão do Chef',
    isSpecialty: true,
    ingredients: ['[Marisco Selecionado]', '[Molho Especial]', '[Guarnição da Casa]'],
    pairing: '[Sugestão de Harmonização]'
  },
  {
    id: 'prato-mar-3',
    name: '[Prato de Peixe da Costa] - [NOME DO PRATO]',
    description: '[DESCRIÇÃO: Peixe fresco da baía de Benguela grelhado na brasa ou cozinhado com acompanhamentos à escolha do cliente]',
    priceKz: 0,
    priceDisplay: '[PREÇO]',
    category: 'mar',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80',
    badge: 'Mais Pedido',
    isSpecialty: true,
    ingredients: ['[Peixe Fresco]', '[Azeite e Ervas]', '[Acompanhamento]'],
    pairing: '[Sugestão de Vinho]'
  },
  {
    id: 'prato-mar-4',
    name: '[Prato de Polvo ou Choco] - [NOME DO PRATO]',
    description: '[DESCRIÇÃO: Prato de frutos do mar assado ou grelhado com azeite virgem, alho dourado e acompanhamentos]',
    priceKz: 0,
    priceDisplay: '[PREÇO]',
    category: 'mar',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=80',
    ingredients: ['[Fruto do Mar]', '[Azeite e Alho]', '[Batatas ou Legumes]'],
  },

  // Carnes
  {
    id: 'prato-carne-1',
    name: '[Prato de Carne Nobre 1] - [NOME DO PRATO]',
    description: '[DESCRIÇÃO: Corte nobre de carne grelhado no ponto de preferência com molho especial e acompanhamento rústico]',
    priceKz: 0,
    priceDisplay: '[PREÇO]',
    category: 'carnes',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=900&q=80',
    badge: 'Especialidade da Casa',
    isSpecialty: true,
    ingredients: ['[Corte de Carne Selecionado]', '[Molho de Assinatura]', '[Guarnição]'],
    pairing: '[Sugestão de Vinho Tinto]'
  },
  {
    id: 'prato-carne-2',
    name: '[Grelhado Misto / Picanha] - [NOME DO PRATO]',
    description: '[DESCRIÇÃO: Fatias nobres de carne na brasa acompanhadas de guarnições tradicionais e molho à escolha]',
    priceKz: 0,
    priceDisplay: '[PREÇO]',
    category: 'carnes',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=80',
    badge: 'Mais Pedido',
    ingredients: ['[Carne Bovina]', '[Sal Grosso]', '[Acompanhamentos Variados]'],
  },
  {
    id: 'prato-carne-3',
    name: '[Prato de Carne Assada / Costela] - [NOME DO PRATO]',
    description: '[DESCRIÇÃO: Carne marinada em especiarias e assada lentamente até atingir máxima suculência e textura tenra]',
    priceKz: 0,
    priceDisplay: '[PREÇO]',
    category: 'carnes',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
    ingredients: ['[Corte de Carne]', '[Especiarias]', '[Acompanhamento Crocante]'],
  },

  // Sabores Tradicionais Angolanos
  {
    id: 'prato-tradicional-1',
    name: '[Prato Tradicional 1 / Moamba] - [NOME DO PRATO]',
    description: '[DESCRIÇÃO: Prato clássico da gastronomia angolana preparado com ingredientes genuínos e acompanhado de funje]',
    priceKz: 0,
    priceDisplay: '[PREÇO]',
    category: 'tipicos',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
    badge: 'Tradição Angolana',
    isSpecialty: true,
    ingredients: ['[Ingrediente Base Tradicional]', '[Óleo de Palma / Dendém]', '[Funje de Milho ou Bombó]'],
    pairing: '[Sugestão de Bebida Típica]'
  },
  {
    id: 'prato-tradicional-2',
    name: '[Prato Tradicional 2 / Calulu] - [NOME DO PRATO]',
    description: '[DESCRIÇÃO: Receita regional com folhas tradicionais, peixe ou carne, feijão com óleo de palma e funje]',
    priceKz: 0,
    priceDisplay: '[PREÇO]',
    category: 'tipicos',
    image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=900&q=80',
    badge: 'Herança Cultural',
    ingredients: ['[Folhas Tradicionais]', '[Peixe ou Carne]', '[Feijão e Funje]'],
  },

  // Entradas & Petiscos
  {
    id: 'prato-entrada-1',
    name: '[Petisco / Entrada de Frutos do Mar] - [NOME DO PRATO]',
    description: '[DESCRIÇÃO: Petisco para partilhar com mariscos salteados em azeite, alho e torradas artesanais]',
    priceKz: 0,
    priceDisplay: '[PREÇO]',
    category: 'entradas',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=80',
    badge: 'Petisco Favorito',
    ingredients: ['[Marisco]', '[Alho e Azeite]', '[Pão Tostado]'],
  },
  {
    id: 'prato-entrada-2',
    name: '[Entrada Crocante / Salgados] - [NOME DO PRATO]',
    description: '[DESCRIÇÃO: Porção de salgados ou croquetes artesanais com recheio cremoso e molho especial da casa]',
    priceKz: 0,
    priceDisplay: '[PREÇO]',
    category: 'entradas',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=900&q=80',
    ingredients: ['[Massa Artesanal]', '[Recheio]', '[Molho da Casa]'],
  },

  // Sobremesas
  {
    id: 'prato-sobremesa-1',
    name: '[Sobremesa de Frutas Nacionais] - [NOME DA SOBREMESA]',
    description: '[DESCRIÇÃO: Sobremesa artesanal com frutas tropicais de Angola, equilíbrio entre textura aveludada e frescor]',
    priceKz: 0,
    priceDisplay: '[PREÇO]',
    category: 'sobremesas',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80',
    badge: 'Toque da Casa',
    ingredients: ['[Polpa de Fruta Tropical]', '[Natas]', '[Praliné Crocante]'],
  },
  {
    id: 'prato-sobremesa-2',
    name: '[Sobremesa de Chocolate / Torta] - [NOME DA SOBREMESA]',
    description: '[DESCRIÇÃO: Sobremesa de confeitaria fina servida com calda especial ou gelado artesanal]',
    priceKz: 0,
    priceDisplay: '[PREÇO]',
    category: 'sobremesas',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80',
    ingredients: ['[Chocolate]', '[Gelado]', '[Calda de Frutos]'],
  },

  // Bebidas & Cocktails
  {
    id: 'prato-bebida-1',
    name: '[Sumo Natural da Época] - [NOME DO SUMO]',
    description: '[DESCRIÇÃO: Sumo natural preparado na hora com frutas frescas, servido bem fresco em jarra ou copo]',
    priceKz: 0,
    priceDisplay: '[PREÇO]',
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=900&q=80',
    badge: '100% Natural',
    ingredients: ['[Frutas Frescas da Época]', '[Água Mineral]', '[Hortelã Fresca]'],
  },
  {
    id: 'prato-bebida-2',
    name: '[Cocktail de Assinatura] - [NOME DO COCKTAIL]',
    description: '[DESCRIÇÃO: Cocktail autoral preparado pela equipa de bar com frutas locais e destilados selecionados]',
    priceKz: 0,
    priceDisplay: '[PREÇO]',
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80',
    badge: 'Cocktail da Casa',
    ingredients: ['[Destilado Especial]', '[Frutas Tropicais]', '[Gelo Picado]'],
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: '[Espaço & Sala do Restaurante 1]',
    category: 'ambiente',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    caption: '[LEGENDA: Ambiente acolhedor e climatizado do Joana\'s By Birolita em Benguela]'
  },
  {
    id: 'gal-2',
    title: '[Prato de Frutos do Mar da Costa]',
    category: 'pratos',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    caption: '[LEGENDA: Apresentação gastronómica de peixes e mariscos frescos da costa]'
  },
  {
    id: 'gal-3',
    title: '[Zona Lounge & Bar]',
    category: 'ambiente',
    image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=80',
    caption: '[LEGENDA: Espaço lounge ideal para cocktails, aperitivos e convívio]'
  },
  {
    id: 'gal-4',
    title: '[Prato Tradicional Angolano]',
    category: 'pratos',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
    caption: '[LEGENDA: Sabores autênticos com ingredientes da terra e tempero tradicional]'
  },
  {
    id: 'gal-5',
    title: '[Cocktails & Carta de Bebidas]',
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80',
    caption: '[LEGENDA: Cocktails de autor e sumos naturais preparados na hora]'
  },
  {
    id: 'gal-6',
    title: '[Mesa de Jantar para Grupos & Família]',
    category: 'ambiente',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
    caption: '[LEGENDA: Disposição de mesas para almoços executivos, famílias e celebrações]'
  },
  {
    id: 'gal-7',
    title: '[Especialidade da Casa]',
    category: 'pratos',
    image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=1200&q=80',
    caption: '[LEGENDA: Prato de assinatura com ingredientes nobres]'
  },
  {
    id: 'gal-8',
    title: '[Sobremesas & Cafetaria]',
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80',
    caption: '[LEGENDA: Confeitaria artesanal para fechar a experiência com chave de ouro]'
  },
];

export function formatKz(amount: number, priceDisplay?: string): string {
  if (priceDisplay) {
    return priceDisplay;
  }
  if (!amount || amount === 0) {
    return '[PREÇO]';
  }
  return new Intl.NumberFormat('pt-AO').format(amount) + ' Kz';
}
