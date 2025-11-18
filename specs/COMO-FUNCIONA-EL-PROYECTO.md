# 🔍 CÓMO FUNCIONA EL PROYECTO - SAINTGROVE-NET

> **Documento técnico:** Arquitectura interna, componentes, rutas y comunicación
> **Última actualización:** 2025-11-08
> **Estado actual:** MVP funcional (35% completado)

---

## 📋 ÍNDICE

1. [Stack Tecnológico](#-stack-tecnológico)
2. [Arquitectura General](#-arquitectura-general)
3. [Sistema de Rutas](#-sistema-de-rutas)
4. [Componentes del Proyecto](#-componentes-del-proyecto)
5. [Comunicación Interna](#-comunicación-interna)
6. [Flujo de Datos](#-flujo-de-datos)
7. [Gestión de Estado](#-gestión-de-estado)
8. [Sistema de Estilos](#-sistema-de-estilos)
9. [Testing](#-testing)
10. [Integraciones Pendientes](#-integraciones-pendientes)

---

## 🛠️ STACK TECNOLÓGICO

### Frontend (Actual)
```
Next.js 16.0.1          → Framework principal (App Router)
React 19.2.0            → Biblioteca UI
TypeScript 5.9.3        → Type safety
Tailwind CSS 3.4.18     → Estilos utility-first
Framer Motion 12.23.24  → Animaciones
Lucide React 0.552.0    → Iconos
React Hook Form 7.66.0  → Manejo de formularios
Zod 4.1.12              → Validación de esquemas
next-seo 7.0.1          → SEO metadata
```

### Testing
```
Vitest 4.0.8            → Unit testing
Playwright 1.56.1       → E2E testing
React Testing Library   → Testing de componentes
```

### Herramientas
```
ESLint 9.39.1           → Linting
PostCSS 8.5.6           → Procesamiento CSS
Autoprefixer 10.4.21    → Prefijos CSS automáticos
```

### Backend (Planeado - Fase 2)
```
Strapi v4               → Headless CMS
PostgreSQL              → Base de datos
Cloudinary              → Almacenamiento de imágenes
Resend                  → Servicio de emails
```

---

## 🏗️ ARQUITECTURA GENERAL

### Estructura del Proyecto

```
frontend/
├── app/                          # ⚙️ Next.js App Router (Rutas y páginas)
│   ├── layout.tsx               → Layout raíz (Header, Footer)
│   ├── page.tsx                 → Homepage
│   ├── globals.css              → Estilos globales + Tailwind
│   ├── servicios/
│   │   ├── page.tsx            → Lista de servicios
│   │   └── [slug]/
│   │       └── page.tsx        → Servicio individual (dinámico)
│   ├── proceso/
│   │   └── page.tsx            → Metodología de trabajo
│   └── contacto/
│       └── page.tsx            → Formulario de contacto
│
├── components/                   # 🎨 Componentes React
│   ├── features/                → Componentes por funcionalidad
│   │   ├── home/
│   │   │   ├── Hero.tsx        → Sección hero con gradientes
│   │   │   ├── Process.tsx     → Proceso de 4 pasos
│   │   │   ├── CTA.tsx         → Call-to-action
│   │   │   └── index.ts        → Barrel export
│   │   ├── services/
│   │   │   ├── ServicesGrid.tsx → Grid 2x2 de servicios
│   │   │   └── index.ts
│   │   └── contact/
│   │       ├── ContactForm.tsx  → Formulario con validación
│   │       └── index.ts
│   ├── layout/                  → Componentes de layout
│   │   ├── Header.tsx          → Navegación principal
│   │   ├── Footer.tsx          → Footer con links
│   │   ├── WhatsAppFloat.tsx   → Botón flotante WhatsApp
│   │   ├── SocialBar.tsx       → Barra lateral redes sociales
│   │   └── index.ts
│   ├── ui/                      → Componentes base reutilizables
│   │   ├── Button.tsx          → Botón con variantes
│   │   ├── Card.tsx            → Card con gradientes
│   │   ├── Logo.tsx            → Logo de SaintGrove
│   │   └── index.ts
│   └── common/                  → Componentes compartidos generales
│
├── lib/                         # 📚 Lógica de negocio y utilidades
│   ├── api/                     → API clients (preparado para Strapi)
│   │   └── (vacío actualmente)
│   ├── constants/               → Constantes de la aplicación
│   │   ├── navigation.ts       → Rutas y navegación
│   │   ├── config.ts           → Configuración general
│   │   └── index.ts
│   ├── data/                    → Capa de datos
│   │   └── fallback/
│   │       ├── services.ts     → Datos estáticos de servicios
│   │       └── index.ts
│   ├── metadata/                → Generadores de SEO
│   │   ├── site.ts             → Metadata del sitio
│   │   └── index.ts
│   └── utils/                   → Funciones utilitarias
│       ├── cn.ts               → Class names helper (clsx + tw-merge)
│       ├── format.ts           → Formateo (moneda, teléfono, texto)
│       ├── validation.ts       → Validadores (email, phone, URL)
│       └── index.ts
│
├── hooks/                       # 🪝 Custom React hooks
│   └── index.ts                → (vacío - preparado para hooks custom)
│
├── types/                       # 📝 TypeScript types
│   └── services.ts             → Interfaces de servicios
│
├── __tests__/                   # 🧪 Tests
│   ├── components/
│   │   ├── ui/                 → Tests de Button, Card, Logo
│   │   └── layout/             → Tests de Header
│   ├── e2e/                    → Tests E2E con Playwright
│   │   ├── homepage.spec.ts
│   │   ├── contact-form.spec.ts
│   │   └── navigation.spec.ts
│   └── utils/
│       └── test-helpers.ts
│
├── public/                      # 📁 Assets estáticos
│   ├── favicon/                → Favicons (vacío - pendiente)
│   ├── icons/                  → Iconos (vacío - pendiente)
│   └── images/                 → Imágenes (vacío - pendiente)
│
├── vitest.config.ts            # ⚙️ Config de Vitest
├── playwright.config.ts        # ⚙️ Config de Playwright
├── tailwind.config.ts          # ⚙️ Config de Tailwind
├── tsconfig.json               # ⚙️ Config de TypeScript
├── next.config.ts              # ⚙️ Config de Next.js
├── postcss.config.mjs          # ⚙️ Config de PostCSS
└── package.json                # ⚙️ Dependencias y scripts
```

---

## 🗺️ SISTEMA DE RUTAS

### Rutas Actuales (Next.js App Router)

```
┌─────────────────────────────────────────────────────────────────┐
│                     RUTAS DEL PROYECTO                          │
└─────────────────────────────────────────────────────────────────┘

/                           → Homepage (todas las secciones)
├── Hero Section           → Primer impacto con gradientes
├── Services Section       → Grid 2x2 de servicios
├── Process Section        → 4 pasos del proceso
└── CTA Section            → Call to action

/servicios                  → Listado de todos los servicios
├── Grid de servicios      → Cards clickeables
└── Links a páginas individuales

/servicios/[slug]          → Página individual de cada servicio
├── desarrollo-web         → Desarrollo Web y Aplicaciones
├── software-medida        → Software a la Medida
├── branding               → Branding y Diseño
└── marketing              → Marketing Digital

/proceso                   → Metodología de trabajo completa
└── Mismo componente de Process pero página dedicada

/contacto                  → Formulario de contacto
└── ContactForm con validación

(Planeado - Fase 4)
/blog                      → Sistema de blog
└── /blog/[slug]           → Posts individuales

/portfolio                 → Portfolio de proyectos
└── /portfolio/[slug]      → Proyectos individuales
```

### Cómo Funcionan las Rutas Dinámicas

```typescript
// 📁 app/servicios/[slug]/page.tsx
export async function generateStaticParams() {
  // Genera rutas estáticas en build time
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

// Flujo:
// 1. Next.js lee servicesData
// 2. Por cada servicio, genera una ruta: /servicios/{slug}
// 3. En build time, crea 4 páginas HTML estáticas
// 4. Súper rápido, no requiere servidor para cada request
```

**Resultado en producción:**
- `/servicios/desarrollo-web` → HTML estático
- `/servicios/software-medida` → HTML estático
- `/servicios/branding` → HTML estático
- `/servicios/marketing` → HTML estático

---

## 🎨 COMPONENTES DEL PROYECTO

### 1. LAYOUT COMPONENTS (components/layout/)

#### Header.tsx
**Ubicación:** `components/layout/Header.tsx`
**Propósito:** Navegación principal del sitio

```typescript
export const Header = () => {
  // ¿Qué hace?
  // 1. Muestra el logo de SaintGrove
  // 2. Menú de navegación (Inicio, Servicios, Proceso, Contacto)
  // 3. Responsive: hamburger menu en mobile
  // 4. Sticky: se mantiene fijo al hacer scroll

  // ¿Cómo funciona internamente?
  const [isOpen, setIsOpen] = useState(false); // Estado del menú mobile

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50">
      <Logo />
      <nav>
        <Link href="/">Inicio</Link>
        <Link href="/servicios">Servicios</Link>
        <Link href="/proceso">Proceso</Link>
        <Link href="/contacto">Contacto</Link>
      </nav>
    </header>
  );
};

// ✅ Usado en: app/layout.tsx (en todas las páginas)
```

#### Footer.tsx
**Ubicación:** `components/layout/Footer.tsx`
**Propósito:** Footer con información y links

```typescript
export const Footer = () => {
  // ¿Qué hace?
  // 1. Información de contacto
  // 2. Links rápidos
  // 3. Redes sociales
  // 4. Copyright

  return (
    <footer className="bg-secondary-gray text-white">
      {/* Sección de links */}
      {/* Información de contacto */}
      {/* Redes sociales */}
      {/* Copyright © 2025 SaintGrove */}
    </footer>
  );
};

// ✅ Usado en: app/layout.tsx (en todas las páginas)
```

#### WhatsAppFloat.tsx
**Ubicación:** `components/layout/WhatsAppFloat.tsx`
**Propósito:** Botón flotante para contacto directo

```typescript
export const WhatsAppFloat = () => {
  // ¿Qué hace?
  // 1. Botón flotante en esquina inferior derecha
  // 2. Click → Abre WhatsApp Web con mensaje predefinido
  // 3. Animación de pulso para llamar atención

  const whatsappURL = "https://wa.me/573226740993?text=Hola...";

  return (
    <a
      href={whatsappURL}
      className="fixed bottom-6 right-6 z-50 animate-pulse"
      target="_blank"
    >
      <MessageCircle className="text-white bg-green-500" />
    </a>
  );
};

// ✅ Usado en: app/layout.tsx (en todas las páginas)
```

#### SocialBar.tsx
**Ubicación:** `components/layout/SocialBar.tsx`
**Propósito:** Barra lateral con redes sociales

```typescript
export const SocialBar = () => {
  // ¿Qué hace?
  // 1. Barra vertical fija en el lado izquierdo
  // 2. Links a Instagram, LinkedIn, YouTube
  // 3. Hover effects

  const socialLinks = [
    { icon: Instagram, url: 'https://instagram.com/saintgrove' },
    { icon: Linkedin, url: 'https://linkedin.com/company/saintgrove' },
    { icon: Youtube, url: 'https://youtube.com/@saintgrove' },
  ];

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40">
      {socialLinks.map(/* render icons */)}
    </div>
  );
};

// ✅ Usado en: app/layout.tsx (en todas las páginas)
```

---

### 2. UI COMPONENTS (components/ui/)

#### Button.tsx
**Ubicación:** `components/ui/Button.tsx`
**Propósito:** Botón reutilizable con variantes

```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  // ¿Qué hace?
  // 1. Botón con 3 variantes de color
  // 2. 3 tamaños (small, medium, large)
  // 3. Estados: hover, active, disabled
  // 4. Clases personalizables con className

  const baseStyles = "rounded-lg font-semibold transition-all";

  const variants = {
    primary: "bg-primary-green text-white hover:bg-primary-green/90",
    secondary: "bg-primary-blue text-white hover:bg-primary-blue/90",
    outline: "border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    />
  );
};

// ✅ Usado en: CTA, Hero, ContactForm, etc.
```

#### Card.tsx
**Ubicación:** `components/ui/Card.tsx`
**Propósito:** Card con gradientes para servicios

```typescript
interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  gradient?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  hover = true,
  gradient = true,
  children,
  className,
}) => {
  // ¿Qué hace?
  // 1. Card con bordes redondeados
  // 2. Gradiente sutil de marca (opcional)
  // 3. Efecto hover (scale + shadow)
  // 4. Backdrop blur

  return (
    <div className={cn(
      "rounded-xl p-6 backdrop-blur-sm",
      gradient && "bg-gradient-to-br from-primary-green/10 to-primary-blue/10",
      hover && "hover:scale-105 hover:shadow-xl transition-all",
      className
    )}>
      {children}
    </div>
  );
};

// ✅ Usado en: ServicesGrid, Blog cards (futuro)
```

#### Logo.tsx
**Ubicación:** `components/ui/Logo.tsx`
**Propósito:** Logo de SaintGrove con variantes

```typescript
interface LogoProps {
  variant?: 'full' | 'icon' | 'text';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'md',
}) => {
  // ¿Qué hace?
  // 1. Logo completo (icon + texto)
  // 2. Solo ícono
  // 3. Solo texto
  // 4. Tres tamaños

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {variant !== 'text' && <LogoIcon />}
      {variant !== 'icon' && <span>SaintGrove</span>}
    </div>
  );
};

// ✅ Usado en: Header, Footer
```

---

### 3. FEATURE COMPONENTS (components/features/)

#### features/home/Hero.tsx
**Ubicación:** `components/features/home/Hero.tsx`
**Propósito:** Sección hero de la homepage

```typescript
export const Hero = () => {
  // ¿Qué hace?
  // 1. Primera sección visible del sitio
  // 2. Título principal con gradiente animado
  // 3. Descripción de la empresa
  // 4. CTA button → "Contáctanos"
  // 5. Animaciones con Framer Motion

  // ¿Cómo funciona?
  return (
    <section className="min-h-screen flex items-center justify-center">
      {/* Fondo con gradiente animado */}
      <div className="bg-gradient-to-br from-primary-green via-primary-blue to-secondary-blue">

        {/* Contenido con animación */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-green to-primary-blue"
        >
          Transformamos Ideas en Soluciones Digitales
        </motion.h1>

        <p>Desarrollo de software y marketing digital en Cali</p>

        <Button variant="primary" size="lg">
          Contáctanos
        </Button>
      </div>
    </section>
  );
};

// ✅ Usado en: app/page.tsx (homepage)
// 📦 Importa: Button (ui), motion (framer-motion)
// 🎨 Estilos: Tailwind + gradientes custom
```

#### features/home/Process.tsx
**Ubicación:** `components/features/home/Process.tsx`
**Propósito:** Mostrar el proceso de trabajo en 4 pasos

```typescript
export const Process = () => {
  // ¿Qué hace?
  // 1. Muestra 4 pasos del proceso
  // 2. Iconos de Lucide React
  // 3. Animación de aparición escalonada

  const steps = [
    {
      icon: Lightbulb,
      title: "1. Ideación",
      description: "Escuchamos tus ideas..."
    },
    {
      icon: Palette,
      title: "2. Diseño",
      description: "Creamos prototipos..."
    },
    {
      icon: Code,
      title: "3. Desarrollo",
      description: "Programamos tu solución..."
    },
    {
      icon: Rocket,
      title: "4. Lanzamiento",
      description: "Desplegamos y monitoreamos..."
    },
  ];

  return (
    <section className="py-20">
      <h2>Nuestro Proceso</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card>
              <step.icon className="text-primary-green" size={48} />
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// ✅ Usado en: app/page.tsx, app/proceso/page.tsx
// 📦 Importa: Card (ui), motion (framer-motion), Lucide icons
```

#### features/home/CTA.tsx
**Ubicación:** `components/features/home/CTA.tsx`
**Propósito:** Call-to-action final

```typescript
export const CTA = () => {
  // ¿Qué hace?
  // 1. Sección final de la homepage
  // 2. Título persuasivo
  // 3. Botón grande para contacto
  // 4. Fondo con gradiente

  return (
    <section className="py-20 bg-gradient-to-r from-primary-green to-primary-blue">
      <div className="text-center text-white">
        <h2 className="text-4xl font-bold">
          ¿Listo para transformar tu negocio?
        </h2>
        <p className="text-xl mt-4">
          Contáctanos hoy y comencemos a trabajar juntos
        </p>
        <Button
          variant="outline"
          size="lg"
          className="mt-8 border-white text-white hover:bg-white hover:text-primary-green"
        >
          Agenda una Consulta Gratis
        </Button>
      </div>
    </section>
  );
};

// ✅ Usado en: app/page.tsx
// 📦 Importa: Button (ui)
```

#### features/services/ServicesGrid.tsx
**Ubicación:** `components/features/services/ServicesGrid.tsx`
**Propósito:** Grid 2x2 de servicios

```typescript
export const ServicesGrid = () => {
  // ¿Qué hace?
  // 1. Obtiene servicios desde lib/data/fallback/services.ts
  // 2. Renderiza grid 2x2 (mobile: 1 columna)
  // 3. Cada card es clickeable → /servicios/[slug]
  // 4. Iconos dinámicos desde Lucide

  // ¿De dónde vienen los datos?
  import { servicesData } from '@/lib/data/fallback';

  // ¿Cómo mapea los iconos?
  const iconMap: Record<string, LucideIcon> = {
    Code,      // desarrollo-web
    Settings,  // software-medida
    Palette,   // branding
    TrendingUp // marketing
  };

  return (
    <section className="py-20">
      <h2>Nuestros Servicios</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {servicesData.map((service) => {
          const Icon = iconMap[service.icon];
          return (
            <Link href={`/servicios/${service.slug}`} key={service.slug}>
              <Card hover gradient>
                <Icon size={48} className="text-primary-green" />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="text-primary-blue">Ver más →</span>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

// ✅ Usado en: app/page.tsx, app/servicios/page.tsx
// 📦 Importa: servicesData, Card, Link (next/link), Lucide icons
// 🔗 Enlaza a: /servicios/[slug]
```

#### features/contact/ContactForm.tsx
**Ubicación:** `components/features/contact/ContactForm.tsx`
**Propósito:** Formulario de contacto con validación

```typescript
export const ContactForm = () => {
  // ¿Qué hace?
  // 1. Formulario con 5 campos: nombre, email, teléfono, servicio, mensaje
  // 2. Validación con Zod (React Hook Form + Zod)
  // 3. Estados: idle, loading, success, error
  // 4. Envío de email (ACTUALMENTE MOCK - Fase 1 implementará Resend)

  // ¿Cómo funciona la validación?
  const contactSchema = z.object({
    name: z.string().min(2, 'Mínimo 2 caracteres'),
    email: z.string().email('Email inválido'),
    phone: z.string().min(10, 'Teléfono inválido').optional(),
    service: z.string().min(1, 'Selecciona un servicio'),
    message: z.string().min(10, 'Mínimo 10 caracteres'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(contactSchema),
  });

  // ¿Qué pasa al enviar?
  const onSubmit = async (data) => {
    try {
      // TODO: Fase 1 - Implementar API route /api/contact
      // Por ahora: mock con setTimeout
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Form data:', data);
      setSubmitStatus('success');
      reset(); // Limpia el formulario
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Campo Nombre */}
      <input
        {...register('name')}
        placeholder="Tu nombre"
        className={errors.name && 'border-red-500'}
      />
      {errors.name && <span className="text-red-500">{errors.name.message}</span>}

      {/* Campo Email */}
      <input
        {...register('email')}
        type="email"
        placeholder="Tu email"
      />

      {/* Campo Teléfono */}
      <input {...register('phone')} placeholder="Teléfono (opcional)" />

      {/* Select Servicio */}
      <select {...register('service')}>
        <option value="">Selecciona un servicio</option>
        <option value="desarrollo-web">Desarrollo Web</option>
        <option value="software-medida">Software a Medida</option>
        <option value="branding">Branding</option>
        <option value="marketing">Marketing Digital</option>
      </select>

      {/* Textarea Mensaje */}
      <textarea
        {...register('message')}
        placeholder="Cuéntanos sobre tu proyecto"
        rows={5}
      />

      {/* Botón Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
      </Button>

      {/* Estados de éxito/error */}
      {submitStatus === 'success' && (
        <div className="text-green-600">¡Mensaje enviado con éxito!</div>
      )}
      {submitStatus === 'error' && (
        <div className="text-red-600">Error al enviar. Intenta de nuevo.</div>
      )}
    </form>
  );
};

// ✅ Usado en: app/contacto/page.tsx
// 📦 Importa: useForm (react-hook-form), zodResolver, zod, Button
// ⚠️ NOTA: Email NO funcional aún (mock) - Se implementa en Fase 1
```

---

## 🔄 COMUNICACIÓN INTERNA

### 1. Patrón de Comunicación Actual

```
┌─────────────────────────────────────────────────────────────┐
│                  FLUJO DE COMUNICACIÓN                       │
└─────────────────────────────────────────────────────────────┘

Usuario → Navegación (Header) → Next.js Router → Página
                                                    ↓
                                    Layout (app/layout.tsx)
                                    ├── Header
                                    ├── Contenido de la página
                                    ├── Footer
                                    ├── WhatsAppFloat
                                    └── SocialBar
                                                    ↓
                              Componentes de Features
                              (Hero, Services, Process, etc.)
                                                    ↓
                              Componentes UI (Button, Card)
                                                    ↓
                              Utilidades (cn, format, validation)
                                                    ↓
                              Datos Estáticos (servicesData)
```

### 2. Comunicación Entre Componentes

#### De Padre a Hijo (Props)
```typescript
// Padre (app/page.tsx)
<Hero />
<ServicesGrid />
<Process />

// No hay comunicación compleja actualmente
// Componentes son mayormente autónomos
```

#### De Hijo a Padre (Callbacks)
```typescript
// Ejemplo: ContactForm
const ContactForm = () => {
  const onSubmit = (data) => {
    // Callback que procesa el formulario
  };

  return <form onSubmit={handleSubmit(onSubmit)} />;
};

// Hijo (input) → Padre (form) via React Hook Form
```

#### Entre Hermanos (No implementado actualmente)
```typescript
// NO HAY comunicación entre hermanos actualmente
// Cuando se implemente estado global (Fase 2+), se usará:
// - Context API para temas pequeños
// - Zustand o similar para estado complejo
```

### 3. Comunicación con el Navegador

#### Navegación Programática
```typescript
import { useRouter, usePathname } from 'next/navigation';

const Component = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Navegar a otra página
  router.push('/contacto');

  // Saber en qué página estamos
  const isActive = pathname === '/servicios';
};
```

#### Links
```typescript
import Link from 'next/link';

// Navegación estándar
<Link href="/servicios">Servicios</Link>

// Navegación dinámica
<Link href={`/servicios/${service.slug}`}>
  {service.title}
</Link>
```

### 4. Comunicación con APIs Externas (Futuro - Fase 1-2)

```typescript
// 📁 lib/api/client.ts (a implementar)
export async function fetchAPI(endpoint: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${endpoint}`);
  if (!res.ok) throw new Error('API Error');
  return res.json();
}

// 📁 lib/api/services.ts (a implementar)
export async function getServices() {
  try {
    return await fetchAPI('/api/services');
  } catch {
    // Fallback a datos estáticos si Strapi no está disponible
    return servicesData;
  }
}

// Uso en componente
const ServicesGrid = () => {
  const [services, setServices] = useState(servicesData);

  useEffect(() => {
    getServices().then(setServices);
  }, []);

  return <div>{/* render services */}</div>;
};
```

---

## 📊 FLUJO DE DATOS

### 1. Datos Estáticos Actuales

```typescript
// 📁 lib/data/fallback/services.ts

export const servicesData: Service[] = [
  {
    slug: 'desarrollo-web',
    title: 'Desarrollo Web y Aplicaciones',
    description: 'Sitios web modernos, rápidos y responsive...',
    icon: 'Code',
    features: [
      'Next.js y React',
      'Diseño responsive',
      'SEO optimizado',
      // ...
    ],
  },
  // ... 3 servicios más
];

// Funciones helper
export function getAllServices() {
  return servicesData;
}

export function getServiceBySlug(slug: string) {
  return servicesData.find(s => s.slug === slug);
}
```

**¿Quién usa estos datos?**
- `app/page.tsx` → ServicesGrid
- `app/servicios/page.tsx` → Lista completa
- `app/servicios/[slug]/page.tsx` → Servicio individual
- `generateStaticParams()` → Para generar rutas en build time

### 2. Flujo de Datos en Formulario

```
Usuario completa formulario
         ↓
React Hook Form captura cambios
         ↓
Zod valida cada campo
         ↓
Usuario hace submit
         ↓
handleSubmit() valida todo el formulario
         ↓
Si válido → onSubmit(data)
         ↓
[ACTUALMENTE] setTimeout mock
[FASE 1] → API route /api/contact
         ↓
[FASE 1] → Resend envía email
         ↓
Success/Error feedback al usuario
```

### 3. Flujo de Datos Futuro (con Strapi - Fase 2)

```
Strapi CMS (Backend)
    ↓
PostgreSQL (almacena servicios, blog, portfolio)
    ↓
API REST de Strapi
    ↓
lib/api/services.ts (Frontend)
    ↓
React Component (useState/useEffect)
    ↓
Renderiza en UI

Con fallback:
Si Strapi falla → usa servicesData (estático)
```

---

## 🎨 GESTIÓN DE ESTADO

### Estado Actual (Sin estado global)

```typescript
// Cada componente maneja su propio estado local

// Ejemplo: ContactForm
const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

// Ejemplo: Header (menú mobile)
const [isOpen, setIsOpen] = useState(false);

// NO HAY:
// - Context API
// - Redux
// - Zustand
// - Estado global compartido
```

### ¿Cuándo se necesitará estado global? (Fase 3-4)

```typescript
// Ejemplos de casos de uso futuro:

// 1. Tema (dark/light mode)
const ThemeContext = createContext();

// 2. Carrito de compras (si se agrega e-commerce)
const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
}));

// 3. Usuario autenticado (si se agrega login)
const useAuthStore = create((set) => ({
  user: null,
  login: (user) => set({ user }),
}));
```

---

## 🎨 SISTEMA DE ESTILOS

### Tailwind CSS + Configuración Custom

```typescript
// 📁 tailwind.config.ts

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Colores de marca SaintGrove
        'primary-green': '#14c681',  // Verde principal
        'primary-blue': '#286999',   // Azul principal
        'secondary-blue': '#007BFF', // Azul secundario
        'secondary-gray': '#3F3F3F', // Gris oscuro
        'secondary-light': '#F0F0F0', // Gris claro
      },
      backgroundImage: {
        // Gradientes personalizados
        'saint-gradient': 'linear-gradient(135deg, #14c681 0%, #286999 100%)',
        'hero-gradient': 'linear-gradient(135deg, #14c681 0%, #286999 50%, #007BFF 100%)',
      },
    },
  },
  plugins: [],
};
```

### Utility Function: cn()

```typescript
// 📁 lib/utils/cn.ts

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  // ¿Qué hace?
  // 1. Combina múltiples classNames
  // 2. Maneja condicionales
  // 3. Merge de clases Tailwind (evita conflictos)

  return twMerge(clsx(inputs));
}

// Uso:
<div className={cn(
  'base-class',
  isActive && 'active-class',
  className // props
)} />

// Resultado: merge inteligente sin duplicados
```

### Animaciones con Framer Motion

```typescript
import { motion } from 'framer-motion';

// Fade in desde abajo
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  Contenido
</motion.div>

// Animación al hacer scroll (viewport)
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
  Aparece al hacer scroll
</motion.div>

// Animación escalonada
{items.map((item, i) => (
  <motion.div
    key={i}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: i * 0.2 }} // Cada uno con delay
  >
    {item}
  </motion.div>
))}
```

---

## 🧪 TESTING

### Vitest (Unit Testing)

```typescript
// 📁 __tests__/components/ui/Button.test.tsx

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from '@/components/ui/Button';

describe('Button Component', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies variant styles', () => {
    render(<Button variant="primary">Primary</Button>);
    const button = screen.getByText('Primary');
    expect(button).toHaveClass('bg-primary-green');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    screen.getByText('Click').click();
    expect(handleClick).toHaveBeenCalledOnce();
  });
});

// ✅ 24 tests creados actualmente
// ⚠️ 5 tests fallando (ajustes menores)
// 🎯 Meta: 60%+ coverage
```

### Playwright (E2E Testing)

```typescript
// 📁 __tests__/e2e/homepage.spec.ts

import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');

  // Verifica que el título esté presente
  await expect(page).toHaveTitle(/SaintGrove/);

  // Verifica que el hero esté visible
  await expect(page.getByRole('heading', { name: /Transformamos/i }))
    .toBeVisible();

  // Verifica que los servicios estén visibles
  await expect(page.getByText('Desarrollo Web'))
    .toBeVisible();
});

test('navigation works', async ({ page }) => {
  await page.goto('/');

  // Click en "Servicios"
  await page.click('text=Servicios');

  // Verifica que navegó correctamente
  await expect(page).toHaveURL('/servicios');
});

// ✅ 25 E2E tests creados
// 🎯 Cubren: navegación, formularios, rutas dinámicas
```

---

## ⚙️ INTEGRACIONES PENDIENTES

### Fase 1 (Próximas 2 semanas)

#### 1. Email Integration (Resend)
```typescript
// 📁 app/api/contact/route.ts (a crear)

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const data = await request.json();

  // Validar datos
  const validated = contactSchema.parse(data);

  // Enviar email
  await resend.emails.send({
    from: 'contacto@saintgrove.net',
    to: 'info@saintgrove.net',
    subject: `Nuevo contacto: ${validated.service}`,
    html: `
      <h2>Nuevo mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${validated.name}</p>
      <p><strong>Email:</strong> ${validated.email}</p>
      <p><strong>Servicio:</strong> ${validated.service}</p>
      <p><strong>Mensaje:</strong> ${validated.message}</p>
    `,
  });

  return Response.json({ success: true });
}

// ContactForm.tsx se actualizará para usar:
const response = await fetch('/api/contact', {
  method: 'POST',
  body: JSON.stringify(data),
});
```

### Fase 2 (Semanas 3-5)

#### 2. Strapi CMS Integration
```typescript
// 📁 lib/api/services.ts (a crear)

export async function getServices() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/services`);
    const data = await res.json();
    return data.data; // Strapi wraps data in { data: [...] }
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    // Fallback a datos estáticos
    return servicesData;
  }
}

// Uso en página
export default async function ServiciosPage() {
  const services = await getServices(); // Server Component
  return <ServicesGrid services={services} />;
}
```

### Fase 3 (Semana 6)

#### 3. Google Analytics
```typescript
// 📁 components/Analytics.tsx (a crear)

import Script from 'next/script';

export const Analytics = () => {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
};

// Agregar en app/layout.tsx
<Analytics />
```

---

## 📚 RESUMEN EJECUTIVO

### ¿Cómo Funciona el Proyecto?

**1. Arquitectura:**
- Next.js 16 App Router como framework base
- React 19 para componentes
- TypeScript para type safety
- Tailwind CSS para estilos

**2. Componentes:**
- **Layout:** Header, Footer, WhatsApp, SocialBar (en todas las páginas)
- **UI:** Button, Card, Logo (reutilizables)
- **Features:** Hero, Process, CTA, ServicesGrid, ContactForm (específicos)

**3. Rutas:**
- `/` → Homepage completa
- `/servicios` → Lista de servicios
- `/servicios/[slug]` → Servicio individual (4 páginas estáticas)
- `/proceso` → Metodología
- `/contacto` → Formulario

**4. Datos:**
- **Actuales:** Estáticos en `lib/data/fallback/services.ts`
- **Futuros:** Dinámicos desde Strapi CMS

**5. Comunicación:**
- Props para padre → hijo
- Callbacks para hijo → padre
- No hay estado global (simple actualmente)
- Next.js Router para navegación

**6. Estilos:**
- Tailwind CSS con tema custom (colores SaintGrove)
- Gradientes personalizados
- Animaciones con Framer Motion
- Utility function `cn()` para merge de clases

**7. Testing:**
- Vitest para unit tests
- Playwright para E2E
- 24 tests creados, meta 60% coverage

**8. Pendientes:**
- Email real (Resend - Fase 1)
- Backend (Strapi - Fase 2)
- Analytics (GA4 - Fase 3)
- Blog y Portfolio (Fase 4)

---

**Próximos pasos:** Ver [ROADMAP.md](./ROADMAP.md) para el plan completo de implementación.

