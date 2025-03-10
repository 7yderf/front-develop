/* eslint-disable vue/max-len */

export const useContentServices = () => {
  const infoServices = [
    {
      img: '/backgrounds/card-4.png',
      title: 'Bodegas y naves industriales',
      description: 'Encontrar la propiedad que busca el cliente ya sea en venta, renta o renta con opción de compra; administración; valuación de inmuebles, estudios de mercado, búsqueda de oportunidades de inversión. \n Servicio confiable, discreto buscando una negociación satisfactoria para todas las partes.',
    },
    {
      img: '/backgrounds/card-3.png',
      title: 'Terrenos comerciales e industriales',
      description: 'Efectividad en encontrar el terreno no importando cuan especializado tenga que ser este en cuanto a su uso de suelo, uso de suelo específico, dimensiones, servicios, viabilidad.',
    },
    {
      img: '/backgrounds/card.png',
      title: 'Proyectos BTS Y Propiedades Industriales especializadas',
      description: 'Desarrollos de proyecto llave en mano, construcción de un inmueble tal como lo necesita el cliente en un plazo de seis meses, buscando que sea permitido legalmente, físicamente posible, económicamente viable y técnicamente factible',
    },
    {
      img: '/backgrounds/card-1.png',
      title: 'Plazas comerciales y locales',
      description: 'Tenemos los contactos para desarrollar, comercializar y operar centros comerciales así como ofrecer en venta cuando ya están totalmente ocupados, con una rentabilidad competitiva.',
    },
    {
      img: '/backgrounds/card-2.png',
      title: 'Edificio de oficinas y oficina',
      description: 'Desarrollo de edificio de oficinas desde el estudio de mercado, encontrar el terreno ideal, construcción, pre venta, venta, administración y venta del mismo una vez que ya esté rentado en su totalidad.',
    },
  ]
  return infoServices
}

export const useContentIconServices = () => {
  const iconServices = [
    {
      img: '/icons/services_1.png',
      title: 'Hacemos una casa tu hogar ideal',
      description: 'Encontramos siempre el mejor trato para usted',
    },
    {
      img: '/icons/services_2.png',
      title: 'Buscamos ser los mejores',
      description: 'Nuestro crecimiento constante es el resultado del profesionalismo, capacitación y entusiasmo de nuestro equipo de trabajo',
    },
    {
      img: '/icons/services_3.png',
      title: 'Distintas formas de pago',
      description: 'Aceptamos todo tipo de créditos bancarios e hipotecarios',
    },
    {
      img: '/icons/services_4.png',
      title: 'Grupo Torres Inmobiliario',
      description: 'Descubrirás la alternativa perfecta que se ajusta a tus necesidades, ya sea en viviendas, apartamentos, espacios de trabajo, propiedades rústicas o terrenos',
    },
  ]
  return iconServices
}

const sellers = [
  {
    img: '/sellers/flora.jpg',
    name: 'Flora Torres',
    description: [
      { description_title: 'Director General', description_text: '' },
    ],
  },
  {
    img: '/sellers/emanuel.jpg',
    name: 'Emanuel Dichi',
    description: [
      { description_title: 'Director Operativo', description_text: '' },
      { description_title: 'Teléfono', description_text: '6462566981' },
    ],
  },
  {
    img: '/sellers/eunice.jpg',
    name: 'M. Eunice Baltazar',
    description: [
      { description_title: 'Gerente de Ventas y Marketing', description_text: '' },
      { description_title: 'Teléfono', description_text: '6461072822' },
    ],
  },
  {
    img: '/sellers/eliana.jpg',
    name: 'Eliana Romero',
    description: [
      { description_title: 'Asesor Inmobiliario con Certificación en Infonavit', description_text: '' },
      { description_title: 'Teléfono', description_text: '6462781654' },
    ],
  },
  {
    img: '/sellers/mariabeltran.jpg',
    name: 'María Beltrán',
    description: [
      { description_title: 'Asesor Inmobiliario Certificado', description_text: '' },
      { description_title: 'Teléfono', description_text: '6462392747' },
    ],
  },
  {
    img: '/sellers/josezu.jpg',
    name: 'José Zúñiga',
    description: [
      { description_title: 'Asesor Inmobiliario', description_text: '' },
      { description_title: 'Teléfono', description_text: '6461352433' },
    ],
  },
  {
    img: '/sellers/noe.jpg',
    name: 'Noe Flores',
    description: [
      { description_title: 'Asesor Inmobiliario', description_text: '' },
      { description_title: 'Teléfono', description_text: '6462373462' },
    ],
  },
  {
    img: '/sellers/saul.jpg',
    name: 'Saul Amador',
    description: [
      { description_title: 'Asesor Inmobiliario', description_text: '' },
      { description_title: 'Teléfono', description_text: '6461289559' },
    ],
  },
  {
    img: '/sellers/paulina.jpg',
    name: 'Paulina Castro ',
    description: [
      { description_title: 'Asesor Inmobiliario ', description_text: '' },
      { description_title: 'Teléfono', description_text: '6461932043' },
    ],
  },
  {
    img: '/sellers/yoshiro.jpg',
    name: 'Yoshiro Rocha',
    description: [
      { description_title: 'Asesor Inmobiliario ', description_text: '' },
      { description_title: 'Teléfono', description_text: '6461419286' },
    ],
  },
  {
    img: '/sellers/rosa.jpg',
    name: 'Rosa Galaviz',
    description: [
      { description_title: 'Asesor Inmobiliario Sucursal Mochis', description_text: '' },
      { description_title: 'Teléfono', description_text: '6681837391' },
    ],
  },
  {
    img: '/sellers/lomeli.jpg',
    name: 'Claudia Lomelí',
    description: [
      { description_title: 'Asesor Inmobiliario ', description_text: '' },
      { description_title: 'Teléfono', description_text: '6461216377' },
    ],
  },
]

export const useSellers = () => {
  const { public: { API_BASE_URL } } = useRuntimeConfig()

  async function fetchVendedores() {
    const sellersList = ref<any>(null)
    let error = null
    const options = {
      method: 'GET',
    }
    try {
      const response = await fetch(`${API_BASE_URL}vendedores/`, options)
      if (!response.ok) {
        throw new Error('No se pudo obtener la lista de vendedores')
      }
      const data = sellers
      sellersList.value = data
    } catch (err: any) {
      error = err
      sellersList.value = sellers
    }
    return { sellersList, error }
  }

  return { fetchVendedores }
}

export const useSale = () => {
  const howBuy = [
    {
      whatsapp: 'https://wa.me/5215513964491',
      textBoton: 'Todo tipo de terrenos',
      message: 'Hola, me gustaría saber más sobre sus servicios',
    },
    {
      whatsapp: 'https://wa.me/5215513964491',
      textBoton: 'Bodegas',
      message: 'Hola, me gustaría saber más sobre sus servicios',
    },
    {
      whatsapp: 'https://wa.me/5215513964491',
      textBoton: 'Naves industriales',
      message: 'Hola, me gustaría saber más sobre sus servicios',
    },
    {
      whatsapp: 'https://wa.me/5215513964491',
      textBoton: 'Patios de maniobra y encierro',
      message: 'Hola, me gustaría saber más sobre sus servicios',
    },
    {
      whatsapp: 'https://wa.me/5215513964491',
      textBoton: 'Plazas comerciales',
      message: 'Hola, me gustaría saber más sobre sus servicios',
    },
    {
      whatsapp: 'https://wa.me/5215513964491',
      textBoton: 'Locales',
      message: 'Hola, me gustaría saber más sobre sus servicios',
    },
    {
      whatsapp: 'https://wa.me/5215513964491',
      textBoton: 'Inmuebles productivos',
      message: 'Hola, me gustaría saber más sobre sus servicios',
    },
    {
      whatsapp: 'https://wa.me/5215513964491',
      textBoton: 'Desarrollo de proyectos',
      message: 'Hola, me gustaría saber más sobre sus servicios',
    },
    {
      whatsapp: 'https://wa.me/5215513964491',
      textBoton: 'Proyectos llave en mano',
      message: 'Hola, me gustaría saber más sobre sus servicios',
    },
    {
      whatsapp: 'https://wa.me/5215513964491',
      textBoton: 'Portafolios de inversión',
      message: 'Hola, me gustaría saber más sobre sus servicios',
    },
    {
      whatsapp: 'https://wa.me/5215513964491',
      textBoton: 'Hoteles',
      message: 'Hola, me gustaría saber más sobre sus servicios',
    },
    {
      whatsapp: 'https://wa.me/5215513964491',
      textBoton: 'Locales',
      message: 'Hola, me gustaría saber más sobre sus servicios',
    },
  ]
  return howBuy
}

export const useValue = () => {
  const value = [
    {
      whatsapp: 'https://wa.me/5215513964491',
      textBoton: 'Todo tipo de terrenos',
      message: 'Hola, me gustaría saber más sobre sus servicios',
    },
    {
      whatsapp: 'https://wa.me/5215513964491',
      textBoton: 'Bodegas',
      message: 'Hola, me gustaría saber más sobre sus servicios',
    },
    {
      whatsapp: 'https://wa.me/5215513964491',
      textBoton: 'Naves industriales',
      message: 'Hola, me gustaría saber más sobre sus servicios',
    },
    {
      whatsapp: 'https://wa.me/5215513964491',
      textBoton: 'Patios de maniobra y encierro',
      message: 'Hola, me gustaría saber más sobre sus servicios',
    },
    {
      whatsapp: 'https://wa.me/5215513964491',
      textBoton: 'Plazas comerciales',
      message: 'Hola, me gustaría saber más sobre sus servicios',
    },
    {
      whatsapp: 'https://wa.me/5215513964491',
      textBoton: 'Locales',
      message: 'Hola, me gustaría saber más sobre sus servicios',
    },
    {
      whatsapp: 'https://wa.me/5215513964491',
      textBoton: 'Edificios',
      message: 'Hola, me gustaría saber más sobre sus servicios',
    },
    {
      whatsapp: 'https://wa.me/5215513964491',
      textBoton: 'Inmuebles productivos',
      message: 'Hola, me gustaría saber más sobre sus servicios',
    },
    {
      whatsapp: 'https://wa.me/5215513964491',
      textBoton: 'Desarrollo de proyectos',
      message: 'Hola, me gustaría saber más sobre sus servicios',
    },
    {
      whatsapp: 'https://wa.me/5215513964491',
      textBoton: 'Proyectos llave en mano',
      message: 'Hola, me gustaría saber más sobre sus servicios',
    },
  ]
  return value
}

export const useAdmin = () => {
  const admin = [
    {
      whatsapp: 'https://wa.me/5215513964491',
      textBoton: 'Encontrar al Arrendador idóneo, realizar la investigación, elaboración del contrato, cobro de rentas, mantenimiento del inmueble, contratación de servicios y seguros.',
      message: 'Hola, me gustaría saber más sobre sus servicios',
    },
  ]
  return admin
}

export const useCap = () => {
  const cap = [
    {
      whatsapp: 'https://wa.me/5215513964491',
      textBoton: 'Elaboración de seminarios y cursos, tanto  de valuación y comercialización inmobiliaria; \n Asesoría para la compra, renta y proyectos de inversió.',
      message: 'Hola, me gustaría saber más sobre sus servicios',
    },
  ]
  return cap
}
