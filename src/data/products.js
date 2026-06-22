export const products = [
  {
    id: 'mate-imperial-premium',
    name: 'Mate Imperial Premium',
    category: 'mates',
    productType: 'mates',
    mateType: 'imperial',
    price: 48500,
    rating: 4.9,
    reviewsCount: 124,
    description: 'Nuestra joya de la corona. Mate de calabaza seleccionada, forrado en cuero vacuno legítimo de exportación con costura uruguaya hecha a mano y virola de alpaca cincelada artesanalmente.',
    details: [
      'Calabaza de paredes gruesas para mejor templado.',
      'Forrado en cuero vacuno grueso con costura fina al revés.',
      'Virola de alpaca maciza cincelada con motivos criollos.',
      'Base reforzada de 4 patas firmes.',
      'Cada pieza es única por su trabajo artesanal.'
    ],
    features: {
      material: 'Calabaza y Cuero Legítimo',
      virola: 'Alpaca Cincelada',
      costura: 'A mano con hilo encerado grueso'
    },
    images: [
      '/images/mate_imperial.png'
    ],
    canEngrave: true,
    engravingArea: 'virola',
    stock: 12,
    sizes: ['Mediano (Estándar)', 'Grande (Para compartir)']
  },
  {
    id: 'mate-camionero-premium',
    name: 'Mate Camionero Seleccionado',
    category: 'mates',
    productType: 'mates',
    mateType: 'camionero',
    price: 38900,
    rating: 4.8,
    reviewsCount: 98,
    description: 'El clásico de los clásicos. Mate Camionero de boca ancha, ideal para largas jornadas. Forrado en cuero vacuno seleccionado con virola de acero inoxidable pulido espejo.',
    details: [
      'Calabaza brasileña de boca ancha y fácil cebada.',
      'Forrado en cuero de vaqueta con costura reforzada.',
      'Virola de acero inoxidable de alta resistencia.',
      'Base firme que no se tambalea.',
      'Curado rápido y excelente sabor.'
    ],
    features: {
      material: 'Calabaza y Cuero Vacuno',
      virola: 'Acero Inoxidable Pulido',
      costura: 'Costura reforzada de cruz'
    },
    images: [
      '/images/mate_camionero.png'
    ],
    canEngrave: true,
    engravingArea: 'virola',
    stock: 25,
    sizes: ['Chico (Personal)', 'Mediano', 'Grande']
  },
  {
    id: 'mate-torpedo-cincelado',
    name: 'Mate Torpedo Cincelado',
    category: 'mates',
    productType: 'mates',
    mateType: 'torpedo',
    price: 42000,
    rating: 4.7,
    reviewsCount: 76,
    description: 'Diseño compacto y estilizado. El Mate Torpedo es ideal para llevar a todos lados. Cuenta con virola de alpaca labrada a mano y cuerpo de calabaza forrada en cuero premium.',
    details: [
      'Diseño torpedo aerodinámico y cómodo al tacto.',
      'Calabaza de alta densidad para mayor durabilidad.',
      'Virola de alpaca cincelada con motivos florales gauchescos.',
      'Costura invisible ultra resistente.',
      'Excelente retención de calor.'
    ],
    features: {
      material: 'Calabaza y Cuero Vaqueta',
      virola: 'Alpaca Labrada',
      costura: 'Costura invisible'
    },
    images: [
      '/images/mate_imperial.png' // reused premium image
    ],
    canEngrave: true,
    engravingArea: 'virola',
    stock: 8,
    sizes: ['Único']
  },
  {
    id: 'mate-madera-algarrobo',
    name: 'Mate de Algarrobo Criollo',
    category: 'mates',
    productType: 'mates',
    mateType: 'madera',
    price: 19500,
    rating: 4.6,
    reviewsCount: 62,
    description: 'Tradición en madera noble. Tallado en madera de algarrobo seleccionado, estacionado y pulido. Aporta un sabor dulzón único a tus cebadas.',
    details: [
      'Madera de algarrobo macizo de monte chaqueño.',
      'Pulido artesanal con cera de abejas natural.',
      'No requiere virola, tallado en una sola pieza.',
      'Excelente resistencia a fisuras por humedad.',
      'Aroma y sabor característico de maderas nobles.'
    ],
    features: {
      material: 'Madera de Algarrobo Estacionada',
      virola: 'Sin virola (Madera tallada)',
      costura: 'Sin costura'
    },
    images: [
      '/images/mate_madera.png'
    ],
    canEngrave: true,
    engravingArea: 'cuerpo',
    stock: 40,
    sizes: ['Chico', 'Mediano']
  },
  {
    id: 'mate-palo-santo',
    name: 'Mate de Palo Santo Tallado',
    category: 'mates',
    productType: 'mates',
    mateType: 'madera',
    price: 24900,
    rating: 4.8,
    reviewsCount: 84,
    description: 'La madera más aromática del norte argentino. Palo Santo seleccionado, reforzado con una base de aluminio para evitar que la madera trabaje con los cambios térmicos.',
    details: [
      'Madera de Palo Santo de aroma resinoso exquisito.',
      'Funda de aluminio/metal inferior protectora.',
      'Sabor único, ideal para tomar amargo.',
      'Requiere un curado cuidadoso con manteca o aceite.',
      'Pieza sumamente vistosa y aromática.'
    ],
    features: {
      material: 'Palo Santo y Funda Metálica',
      virola: 'Aluminio',
      costura: 'Sin costura'
    },
    images: [
      '/images/mate_madera.png' // reused wood image
    ],
    canEngrave: false,
    stock: 15,
    sizes: ['Chico', 'Mediano']
  },
  {
    id: 'bombilla-pico-loro-alpaca',
    name: 'Bombilla Pico de Loro de Alpaca',
    category: 'accesorios',
    productType: 'accesorios',
    mateType: 'no_aplica',
    price: 18500,
    rating: 4.9,
    reviewsCount: 142,
    description: 'Bombilla de alpaca pesada pulida a espejo. Diseño curvado de pico de loro para una postura cómoda, filtro de pala clásico desmontable para fácil limpieza.',
    details: [
      'Alpaca maciza de alta calidad, no transmite sabores.',
      'Curvatura anatómica perfecta.',
      'Filtro desarmable a rosca para limpieza profunda.',
      'Excelente flujo de agua, no se tapa.',
      'Incluye cepillo limpiador de regalo.'
    ],
    features: {
      material: 'Alpaca Maciza',
      tipo: 'Pico de Loro Desarmable',
      largo: '19 cm'
    },
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop'
    ],
    canEngrave: false,
    stock: 50
  },
  {
    id: 'bombilla-acero-plana',
    name: 'Bombilla de Acero Inoxidable Plana',
    category: 'accesorios',
    productType: 'accesorios',
    mateType: 'no_aplica',
    price: 11000,
    rating: 4.6,
    reviewsCount: 88,
    description: 'Bombilla plana de acero inoxidable quirúrgico. Muy higiénica, indestructible y con excelente filtrado de yerbas finas.',
    details: [
      'Acero inoxidable 316 quirúrgico pulido.',
      'Boquilla ancha y chata para mayor comodidad.',
      'Filtro tipo resorte o ranuras fijas de gran drenaje.',
      'Fácil de limpiar y esterilizar.',
      'Resistente al desgaste del uso diario.'
    ],
    features: {
      material: 'Acero Inoxidable Quirúrgico',
      tipo: 'Plana/Cuchara fija',
      largo: '18 cm'
    },
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop'
    ],
    canEngrave: false,
    stock: 75
  },
  {
    id: 'matera-mochila-cuero',
    name: 'Mochila Matera Cuero Rígido',
    category: 'accesorios',
    productType: 'accesorios',
    mateType: 'no_aplica',
    price: 54000,
    rating: 4.9,
    reviewsCount: 51,
    description: 'La compañera perfecta de tus viajes. Mochila matera de cuero rígido, compartimentada para termo de hasta 1.3L, yerbera, mate y bombilla. Diseño elegante y rústico.',
    details: [
      'Cuero vacuno engrasado semi-rígido de alta durabilidad.',
      'Correas de hombro regulables de cuero con costuras reforzadas.',
      'Separador interno para que el termo viaje seguro sin golpearse.',
      'Herrajes de bronce viejo y costuras a tono.',
      'Bolsillo trasero porta-llaves o celular.'
    ],
    features: {
      material: 'Cuero Vacuno Engrasado',
      herrajes: 'Bronce Viejo',
      medidas: '38cm alto x 24cm ancho x 12cm profundidad'
    },
    images: [
      '/images/matera_cuero.png'
    ],
    canEngrave: true,
    engravingArea: 'cuerpo',
    stock: 6,
    sizes: ['Único']
  },
  {
    id: 'termo-stanley-engomado',
    name: 'Termo Legado Térmico 1.2L',
    category: 'accesorios',
    productType: 'accesorios',
    mateType: 'no_aplica',
    price: 36000,
    rating: 4.7,
    reviewsCount: 69,
    description: 'Termo de acero inoxidable con pintura engomada antideslizante. Conservación extrema de calor por más de 24 horas y pico cebador especial de flujo continuo.',
    details: [
      'Doble pared de acero inoxidable aislado al vacío.',
      'Pintura texturada engomada mate (excelente agarre).',
      'Pico cebador matero de alta precisión, no chorrea.',
      'Tapa de acero aislada que funciona como taza.',
      'Libre de BPA.'
    ],
    features: {
      material: 'Acero Inoxidable 18/8',
      capacidad: '1.2 Litros',
      retencion: 'Caliente 24hs / Frío 36hs'
    },
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop'
    ],
    canEngrave: true,
    engravingArea: 'cuerpo',
    stock: 14
  },
  {
    id: 'yerbera-azucarera-cuero',
    name: 'Set de Yerbera y Azucarera de Cuero',
    category: 'accesorios',
    productType: 'accesorios',
    mateType: 'no_aplica',
    price: 21500,
    rating: 4.8,
    reviewsCount: 43,
    description: 'Juego de dos recipientes metálicos forrados artesanalmente en cuero con cierres y costuras premium. Cómodos, herméticos y súper criollos.',
    details: [
      'Tarros de hojalata interior higiénicos e impermeables.',
      'Exterior forrado en cuero de vaqueta legítimo.',
      'Cierre de cremallera metálica superior.',
      'Pico vertedor plástico interno opcional para verter yerba sin derrames.',
      'Ideal para llevar en la mochila matera.'
    ],
    features: {
      material: 'Cuero Legitimo y Tarros de Metal',
      cantidad: '2 recipientes (Yerbera + Azucarera)',
      capacidad: 'Yerbera: 300g / Azucarera: 200g'
    },
    images: [
      '/images/mate_camionero.png' // placeholder
    ],
    canEngrave: true,
    engravingArea: 'cuerpo',
    stock: 18
  }
];

export const categories = [
  { id: 'todos', name: 'Todos los productos' },
  { id: 'mates', name: 'Mates Premium' },
  { id: 'accesorios', name: 'Accesorios y Matería' }
];

export const engravingSymbols = [
  { id: 'sol-de-mayo', name: 'Sol de Mayo', path: 'M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,5L13,7H11L12,5M12,19L11,17H13L12,19M5,12L7,11V13L5,12M19,12L17,13V11L19,12M7,7L8.5,8.5L7.5,9.5L6,8L7,7M17,17L15.5,15.5L16.5,14.5L18,16L17,17M17,7L18,8L16.5,9.5L15.5,8.5L17,7M7,17L6,16L7.5,14.5L8.5,15.5L7,17Z', icon: '☀️' },
  { id: 'escudo-nacional', name: 'Escudo Argentino', icon: '🛡️' },
  { id: 'caballo', name: 'Caballo Criollo', icon: '🐎' },
  { id: 'guardapampa', name: 'Guardapampa Tradicional', icon: '🏁' },
  { id: 'flor-de-lis', name: 'Flor de Lis', icon: '⚜️' },
  { id: 'cruz-del-sur', name: 'Cruz del Sur', icon: '✨' }
];

export const engravingFonts = [
  { id: 'serif', name: 'Cinzel (Elegante)', fontFamily: "'Cinzel', serif" },
  { id: 'script', name: 'Montserrat (Moderno)', fontFamily: "'Montserrat', sans-serif" },
  { id: 'gothic', name: 'Old English (Gótico)', fontFamily: "'Old Standard TT', serif", style: { fontStyle: 'italic', fontWeight: 'bold' } },
  { id: 'traditional', name: 'Cursiva Criolla', fontFamily: "'Playfair Display', serif", style: { fontStyle: 'italic' } }
];
