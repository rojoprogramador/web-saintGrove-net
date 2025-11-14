# SaintGrove - Sitio Web Oficial

> Sitio web empresarial de SaintGrove, especialistas en desarrollo de software y marketing digital en Cali, Colombia.

## 📊 Status

[![CI](https://img.shields.io/badge/CI-configured-success)](https://github.com/rojoprogramador/web-saintGrove-net/actions)
[![Tests](https://img.shields.io/badge/tests-129%20passing-success)](https://github.com/rojoprogramador/web-saintGrove-net)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

## 🚀 Stack Tecnológico

### Frontend
- **Next.js 16** con App Router
- **React 19** con TypeScript 5.9
- **Tailwind CSS 3.4** para estilos
- **Framer Motion** para animaciones
- **React Hook Form + Zod** para formularios

### Testing
- **Vitest** para tests unitarios
- **Playwright** para tests E2E
- **React Testing Library**

### CI/CD
- **GitHub Actions** para integración continua
- **SonarCloud** para análisis de código
- **CodeQL** para análisis de seguridad

## 🎯 Features

- ✅ Diseño responsive y moderno
- ✅ Animaciones fluidas con Framer Motion
- ✅ Sistema de formularios con validación
- ✅ Email notifications con Resend
- ✅ Rate limiting en API routes
- ✅ Error boundaries personalizadas
- ✅ SEO optimizado
- ✅ Security headers (CSP, HSTS, etc.)
- ✅ Coverage de tests: 49.82%

## 📦 Instalación

### Requisitos
- Node.js 18+
- npm o yarn

### Setup

```bash
# Clonar el repositorio
git clone https://github.com/rojoprogramador/web-saintGrove-net.git
cd web-saintGrove-net

# Instalar dependencias
cd frontend
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus valores

# Iniciar servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linter

# Testing
npm run test         # Tests unitarios
npm run test:e2e     # Tests E2E
npm run test:coverage # Reporte de coverage
```

## 📁 Estructura del Proyecto

```
frontend/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── (pages)/           # Páginas del sitio
│   └── layout.tsx         # Layout principal
├── components/
│   ├── features/          # Componentes por feature
│   ├── layout/            # Header, Footer, etc.
│   └── ui/                # Componentes UI base
├── lib/
│   ├── api/               # Clients de API
│   ├── constants/         # Constantes
│   ├── utils/             # Utilidades
│   └── email/             # Email templates
├── __tests__/             # Tests
└── public/                # Assets estáticos
```

## 🌐 Páginas

- **/** - Homepage
- **/servicios** - Servicios ofrecidos
- **/servicios/[slug]** - Detalle de servicios
- **/proceso** - Metodología de trabajo
- **/contacto** - Formulario de contacto

## 🔧 Configuración

### Variables de Entorno

Copiar `.env.example` a `.env.local` y configurar:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Email Service (Resend)
RESEND_API_KEY=your_api_key
RESEND_FROM_EMAIL=your@email.com
CONTACT_TO_EMAIL=contact@email.com
```

### Security Headers

El proyecto incluye security headers configurados en `next.config.ts`:
- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm run test:all

# Tests unitarios
npm run test

# Tests E2E
npm run test:e2e

# Tests con UI interactiva
npm run test:ui

# Coverage report
npm run test:coverage
```

**Test Status**:
- Unit Tests: 129 passing
- E2E Tests: 11 passing, 12 skipped (awaiting API configuration)
- Coverage: 49.82%
- E2E Execution Time: ~15.8s

**Note**: E2E tests use `domcontentloaded` wait strategy for optimal performance. Some tests are temporarily skipped pending API endpoint configuration. See `specs/setup/testing.md` for details.

## 🚀 Deployment

El proyecto está optimizado para deployment en:
- **Vercel** (recomendado para Next.js)
- **Netlify**
- Cualquier plataforma compatible con Next.js

```bash
# Build de producción
npm run build

# Verificar build localmente
npm run start
```

## 📞 Contacto

- **Website**: [saintgrove.net](https://saintgrove.net)
- **Email**: info@saintgrove.net
- **WhatsApp**: +57 322 674 0993
- **Ubicación**: Cali, Colombia

## 🌟 Redes Sociales

- [Instagram](https://instagram.com/saintgrove)
- [LinkedIn](https://linkedin.com/company/saintgrove)
- [YouTube](https://youtube.com/@saintgrove)

## 📄 Licencia

© 2025 SaintGrove. Todos los derechos reservados.

---

**Hecho con ❤️ en Cali, Colombia**
