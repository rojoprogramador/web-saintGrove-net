import { Service } from '@/types/services';

export const servicesData: Service[] = [
  {
    slug: 'desarrollo-web',
    name: 'Desarrollo Web',
    shortDescription: 'Sitios web modernos, responsivos y optimizados para SEO',
    fullDescription: 'Creamos sitios web profesionales que no solo se ven increíbles, sino que también convierten visitantes en clientes. Utilizamos las últimas tecnologías y mejores prácticas para garantizar que tu presencia en línea sea rápida, segura y efectiva.',
    icon: 'Code',
    features: [
      'Diseño Responsivo',
      'Optimización SEO',
      'Velocidad Optimizada',
      'CMS Personalizado',
      'Integración de Analytics',
      'Formularios de Contacto',
    ],
    benefits: [
      'Mayor visibilidad en buscadores',
      'Mejor experiencia de usuario',
      'Aumento en conversiones',
      'Accesibilidad desde cualquier dispositivo',
      'Fácil administración de contenido',
    ],
    process: [
      {
        title: 'Análisis y Planificación',
        description: 'Entendemos tus objetivos, audiencia y requerimientos específicos.',
      },
      {
        title: 'Diseño UI/UX',
        description: 'Creamos wireframes y diseños que priorizan la experiencia del usuario.',
      },
      {
        title: 'Desarrollo',
        description: 'Implementamos el sitio con las mejores tecnologías del mercado.',
      },
      {
        title: 'Testing y Lanzamiento',
        description: 'Probamos exhaustivamente antes de lanzar tu sitio al mundo.',
      },
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Strapi CMS'],
    pricing: {
      from: 800,
      currency: 'USD',
      period: 'proyecto',
    },
    cta: {
      text: 'Solicitar Cotización',
      link: '/contacto',
    },
  },
  {
    slug: 'software-medida',
    name: 'Software a Medida',
    shortDescription: 'Soluciones personalizadas que se adaptan a tu negocio',
    fullDescription: 'Desarrollamos software personalizado que resuelve los desafíos únicos de tu negocio. Desde sistemas de gestión hasta aplicaciones empresariales complejas, creamos soluciones escalables que crecen contigo.',
    icon: 'Settings',
    features: [
      'Análisis de Requisitos',
      'Arquitectura Escalable',
      'Integración API',
      'Soporte Continuo',
      'Documentación Completa',
      'Capacitación de Usuarios',
    ],
    benefits: [
      'Automatización de procesos',
      'Mayor eficiencia operativa',
      'Reducción de costos a largo plazo',
      'Ventaja competitiva',
      'Soluciones adaptadas a tu flujo de trabajo',
    ],
    process: [
      {
        title: 'Descubrimiento',
        description: 'Analizamos tus procesos actuales y identificamos oportunidades de mejora.',
      },
      {
        title: 'Diseño de Arquitectura',
        description: 'Diseñamos la estructura técnica y funcional del sistema.',
      },
      {
        title: 'Desarrollo Ágil',
        description: 'Desarrollamos en sprints con feedback constante.',
      },
      {
        title: 'Implementación y Soporte',
        description: 'Desplegamos el sistema y proporcionamos soporte continuo.',
      },
    ],
    technologies: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS'],
    pricing: {
      from: 3000,
      currency: 'USD',
      period: 'proyecto',
    },
    cta: {
      text: 'Consultar Proyecto',
      link: '/contacto',
    },
  },
  // {
  //   slug: 'branding',
  //   name: 'Creación de Marca',
  //   shortDescription: 'Identidad visual única que conecta con tu audiencia',
  //   fullDescription: 'Construimos marcas memorables que resuenan con tu audiencia. Desde el concepto inicial hasta la implementación completa, creamos identidades visuales coherentes que transmiten los valores de tu empresa.',
  //   icon: 'Palette',
  //   features: [
  //     'Logo y Branding',
  //     'Guía de Estilo',
  //     'Material Gráfico',
  //     'Identidad Digital',
  //     'Papelería Corporativa',
  //     'Manual de Marca',
  //   ],
  //   benefits: [
  //     'Diferenciación en el mercado',
  //     'Mayor reconocimiento de marca',
  //     'Coherencia visual en todos los canales',
  //     'Conexión emocional con clientes',
  //     'Profesionalismo y credibilidad',
  //   ],
  //   process: [
  //     {
  //       title: 'Investigación',
  //       description: 'Estudiamos tu industria, competencia y audiencia objetivo.',
  //     },
  //     {
  //       title: 'Concepto Creativo',
  //       description: 'Desarrollamos conceptos que reflejan la esencia de tu marca.',
  //     },
  //     {
  //       title: 'Diseño y Refinamiento',
  //       description: 'Creamos y perfeccionamos todos los elementos visuales.',
  //     },
  //     {
  //       title: 'Entrega de Brand Guide',
  //       description: 'Documentamos todo para uso consistente de tu marca.',
  //     },
  //   ],
  //   technologies: ['Adobe Creative Suite', 'Figma', 'Illustrator', 'Photoshop'],
  //   pricing: {
  //     from: 600,
  //     currency: 'USD',
  //     period: 'proyecto',
  //   },
  //   cta: {
  //     text: 'Crear Mi Marca',
  //     link: '/contacto',
  //   },
  // },
  {
    slug: 'marketing',
    name: 'Campañas Publicitarias',
    shortDescription: 'Estrategias de marketing digital que maximizan tu ROI',
    fullDescription: 'Diseñamos e implementamos campañas publicitarias digitales que generan resultados medibles. Utilizamos data y creatividad para alcanzar a tu audiencia ideal en el momento perfecto.',
    icon: 'TrendingUp',
    features: [
      'Google Ads',
      'Facebook Ads',
      'SEO/SEM',
      'Analytics y Reportes',
      'Email Marketing',
      'Social Media Marketing',
    ],
    benefits: [
      'Mayor visibilidad online',
      'Generación de leads calificados',
      'ROI medible y optimizable',
      'Alcance a audiencia específica',
      'Crecimiento sostenible',
    ],
    process: [
      {
        title: 'Estrategia',
        description: 'Definimos objetivos, KPIs y estrategia de campaña.',
      },
      {
        title: 'Configuración',
        description: 'Configuramos plataformas, audiencias y creatividades.',
      },
      {
        title: 'Optimización',
        description: 'Monitoreamos y optimizamos continuamente el rendimiento.',
      },
      {
        title: 'Reportes',
        description: 'Entregamos reportes detallados con insights accionables.',
      },
    ],
    technologies: ['Google Ads', 'Facebook Business', 'Google Analytics', 'SEMrush'],
    pricing: {
      from: 500,
      currency: 'USD',
      period: 'mes',
    },
    cta: {
      text: 'Iniciar Campaña',
      link: '/contacto',
    },
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return servicesData.find(service => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return servicesData.map(service => service.slug);
}
