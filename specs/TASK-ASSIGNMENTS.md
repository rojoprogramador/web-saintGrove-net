# 👥 ASIGNACIÓN DE TAREAS POR AGENTE

> **Fecha:** 2025-11-08
> **Proyecto:** SaintGrove-net
> **Documento complementario:** Ver [ROADMAP.md](./ROADMAP.md) para detalles completos

---

## 📋 VISTA RÁPIDA - DASHBOARD

| Agente | Tareas Asignadas | Completadas | Pendientes | Progreso |
|--------|------------------|-------------|------------|----------|
| **arquitectoDeSoftware** | 2 | 1 | 1 | ████████████░░░░░░░░ 50% |
| **frontendUxEngineer** | 7 | 0 | 7 | ░░░░░░░░░░░░░░░░░░░░ 0% |
| **EstrategaSEO** | 3 | 0 | 3 | ░░░░░░░░░░░░░░░░░░░░ 0% |
| **IntegradorBACKEND** | 8 | 0 | 8 | ░░░░░░░░░░░░░░░░░░░░ 0% |
| **DEVOPS** | 6 | 0 | 6 | ░░░░░░░░░░░░░░░░░░░░ 0% |
| **QATesting** | 2 | 1 | 1 | ████████████░░░░░░░░ 50% |

**TOTAL:** 28 tareas (2 completadas, 26 pendientes)

---

## 🏗️ ARQUITECTO DE SOFTWARE

**Especialidad:** Decisiones de arquitectura, estructura de proyecto, patrones de diseño

### ✅ Tareas Completadas
- [x] **1.0** Reorganización de arquitectura de carpetas
  - Movidos componentes a estructura feature-based
  - Creados utils, constants, metadata
  - Actualizados todos los imports
  - Build verificado sin errores

### 📋 Tareas Pendientes

#### 🚀 FASE 5 - Semana 11-12
- [ ] **5.5** Documentation Final
  - Actualizar README.md principal
  - Crear CONTRIBUTING.md
  - Crear CHANGELOG.md
  - Manual de usuario para Strapi
  - Runbook de operaciones
  - Documentar arquitectura final
  - **Tiempo:** 3-4 horas

---

## 🎨 FRONTEND UX ENGINEER

**Especialidad:** Componentes UI, experiencia de usuario, diseño visual, accesibilidad

### 📋 Tareas Pendientes

#### 🔴 FASE 1 - Semana 1-2
- [ ] **1.3** Error Boundaries y Páginas de Error
  - Crear app/error.tsx
  - Crear app/not-found.tsx
  - Crear app/global-error.tsx
  - Diseñar UI amigable
  - Testing de error states
  - **Tiempo:** 1-2 horas
  - **Prioridad:** 🔴 CRÍTICA

#### 🟡 FASE 3 - Semana 6
- [ ] **3.2** Web App Manifest (PWA Básico)
  - Crear app/manifest.ts
  - Configurar colores de marca
  - Generar iconos PWA
  - Testing con Lighthouse
  - **Tiempo:** 1 hora
  - **Prioridad:** 🟡 MEDIA

- [ ] **3.5** Favicon Package Completo
  - Crear/obtener logo SVG
  - Generar favicon.ico multi-size
  - Generar apple-touch-icon
  - Generar iconos PWA
  - Generar Open Graph image
  - Actualizar metadata
  - **Tiempo:** 1-2 horas
  - **Prioridad:** 🟡 ALTA
  - **🖼️ CAPTURA REQUERIDA:** Preview de RealFaviconGenerator

#### 🟢 FASE 4 - Semana 7-10
- [ ] **4.2** Blog System - Frontend
  - Crear estructura /app/blog
  - Página de listado
  - Página individual de post
  - Componentes (BlogCard, BlogHeader, etc.)
  - Paginación y filtros
  - Search en blog
  - Related Posts
  - Share buttons
  - SEO optimization
  - RSS feed
  - **Tiempo:** 2-3 días
  - **Prioridad:** 🟢 MEDIA

- [ ] **4.4** Portfolio Section - Frontend
  - Crear estructura /app/portfolio
  - Página de listado
  - Página individual de proyecto
  - Componentes (PortfolioCard, ProjectGallery)
  - Filtros por servicio/tecnología
  - Image gallery con lightbox
  - Related Projects
  - SEO optimization
  - **Tiempo:** 2-3 días
  - **Prioridad:** 🟢 MEDIA

#### ⭐ EXTRAS - Futuro
- [ ] **EXTRAS.1** Internationalization (i18n)
  - Evaluar necesidad
  - Instalar next-intl
  - Configurar ES/EN
  - Traducir contenidos
  - **Tiempo:** 1 semana
  - **Prioridad:** ⭐ OPCIONAL

- [ ] **EXTRAS.3** Chat Widget Mejorado
  - Chatbot integration
  - Horarios de atención
  - Mensajes predefinidos
  - **Tiempo:** 2-3 horas
  - **Prioridad:** ⭐ OPCIONAL

---

## 📈 ESTRATEGA SEO

**Especialidad:** Optimización para buscadores, analytics, conversión, marketing digital

### 📋 Tareas Pendientes

#### 🟡 FASE 3 - Semana 6
- [ ] **3.1** SEO Avanzado - robots.txt y Sitemap
  - Crear public/robots.txt
  - Crear app/sitemap.ts dinámico
  - Implementar generación desde Strapi
  - Testing de sitemap.xml
  - Enviar a Google Search Console
  - **Tiempo:** 1-2 horas
  - **Prioridad:** 🟡 ALTA
  - **🖼️ CAPTURA REQUERIDA:** Verificación en Search Console

- [ ] **3.3** Structured Data (JSON-LD)
  - Organization schema
  - LocalBusiness schema
  - Service schema
  - Article schema (blog)
  - Testing con Google Rich Results Test
  - **Tiempo:** 2-3 horas
  - **Prioridad:** 🟡 MEDIA

- [ ] **3.4** Analytics y Tracking
  - Crear cuenta Google Analytics 4
  - Obtener GA4 Measurement ID
  - Implementar en Next.js
  - Componente Analytics.tsx
  - Cookie consent banner
  - Página Privacy Policy
  - Testing de eventos
  - Configurar conversiones
  - **Tiempo:** 2-3 horas
  - **Prioridad:** 🟡 ALTA
  - **🖼️ CAPTURA REQUERIDA:** Dashboard de GA4

---

## 🔌 INTEGRADOR BACKEND

**Especialidad:** APIs, Strapi CMS, bases de datos, integraciones third-party, email

### 📋 Tareas Pendientes

#### 🔴 FASE 1 - Semana 1-2
- [ ] **1.1** Configuración de Variables de Entorno
  - Crear .env.local
  - Configurar variables básicas
  - Documentar en specs
  - Actualizar .env.example
  - **Tiempo:** 30 minutos
  - **Prioridad:** 🔴 CRÍTICA

- [ ] **1.2** Email Integration con Resend
  - Crear cuenta en Resend.com
  - Obtener API key
  - Instalar dependencia: npm install resend
  - Crear API Route /app/api/contact/route.ts
  - Template de email
  - Rate limiting
  - Actualizar ContactForm.tsx
  - Testing
  - **Tiempo:** 2-3 horas
  - **Prioridad:** 🔴 CRÍTICA
  - **🖼️ CAPTURAS REQUERIDAS:**
    - API Key de Resend
    - DNS records si se verifica dominio

#### 🟠 FASE 2 - Semana 3-5
- [ ] **2.1** Strapi CMS - Instalación y Configuración
  - Instalar PostgreSQL (Docker recomendado)
  - Crear directorio /cms
  - Instalar Strapi
  - Configurar conexión PostgreSQL
  - Configurar Cloudinary
  - Crear usuario admin
  - Configurar permisos
  - Generar API token
  - **Tiempo:** 1-2 días
  - **Prioridad:** 🟠 ALTA
  - **🖼️ CAPTURAS REQUERIDAS:**
    - PostgreSQL corriendo (pgAdmin o Docker)
    - Cloudinary dashboard con credenciales
    - Strapi admin panel

- [ ] **2.2** Strapi - Content Types
  - Content Type: Services
  - Content Type: Blog Posts
  - Content Type: Portfolio Items
  - Content Type: Team Members (opcional)
  - Content Type: Testimonials (opcional)
  - Configurar relaciones
  - Configurar permisos
  - Poblar con datos de prueba
  - **Tiempo:** 4-6 horas
  - **Prioridad:** 🟠 ALTA

- [ ] **2.3** Frontend - API Client y Data Fetching
  - Crear lib/api/client.ts
  - Crear lib/api/services.ts
  - Crear lib/api/blog.ts
  - Crear lib/api/portfolio.ts
  - Error handling y retries
  - Caching con Next.js
  - Actualizar páginas
  - Mantener fallback data
  - **Tiempo:** 3-4 horas
  - **Prioridad:** 🟠 ALTA

- [ ] **2.4** Migración de Contenido a Strapi
  - Migrar servicios actuales
  - Subir imágenes a Cloudinary
  - Verificar páginas dinámicas
  - Testing de rutas
  - Validar SEO metadata
  - **Tiempo:** 2-3 horas
  - **Prioridad:** 🟠 MEDIA

#### 🟢 FASE 4 - Semana 7-10
- [ ] **4.1** Blog System - Backend
  - Verificar Content Type en Strapi
  - Crear categorías
  - Crear tags
  - Configurar Rich Text editor
  - Poblar con 5-10 posts
  - Configurar permisos
  - **Tiempo:** 1-2 días
  - **Prioridad:** 🟢 MEDIA

- [ ] **4.3** Portfolio Section - Backend
  - Verificar Content Type
  - Poblar con 5-10 proyectos
  - Subir imágenes
  - Configurar relaciones con Services
  - **Tiempo:** 1 día
  - **Prioridad:** 🟢 MEDIA

- [ ] **4.5** Search Functionality (OPCIONAL)
  - Implementar search en Strapi
  - API endpoint de search
  - Componente SearchBar
  - Página de resultados
  - Highlighting
  - **Tiempo:** 1-2 días
  - **Prioridad:** 🟢 BAJA

#### ⭐ EXTRAS - Futuro
- [ ] **EXTRAS.2** Newsletter Integration
  - Elegir plataforma (Mailchimp, ConvertKit)
  - API integration
  - Componente de suscripción
  - Implementar en footer y blog
  - **Tiempo:** 1-2 días
  - **Prioridad:** ⭐ OPCIONAL

---

## 🚀 DEVOPS

**Especialidad:** Deployment, hosting, CI/CD, performance, monitoring, infraestructura

### 📋 Tareas Pendientes

#### 🔴 FASE 1 - Semana 1-2
- [ ] **1.4** CI/CD con GitHub Actions
  - Crear .github/workflows/
  - Workflow ci.yml
  - Workflow deploy-preview.yml
  - Configurar secrets en GitHub
  - Testing del pipeline
  - Status badges
  - **Tiempo:** 2-3 horas
  - **Prioridad:** 🔴 CRÍTICA
  - **🖼️ CAPTURA REQUERIDA:** GitHub Secrets configurados

- [ ] **1.5** Security Headers en next.config.ts
  - Actualizar next.config.ts
  - Configurar CSP
  - Testing con securityheaders.com
  - Documentar headers
  - **Tiempo:** 30 minutos
  - **Prioridad:** 🔴 ALTA

#### 🟡 FASE 3 - Semana 6
- [ ] **3.6** Performance Optimization
  - Dynamic imports
  - Optimizar imágenes
  - Lazy loading
  - Caching strategy
  - Bundle Analyzer
  - Reducir bundle size
  - Lighthouse audit
  - Alcanzar métricas target
  - **Tiempo:** 3-4 horas
  - **Prioridad:** 🟡 MEDIA

#### 🚀 FASE 5 - Semana 11-12
- [ ] **5.1** Deployment Setup - Vercel (Frontend)
  - Crear cuenta Vercel
  - Conectar GitHub repo
  - Configurar environment variables
  - Build settings
  - Deploy preview
  - Testing
  - Configurar dominio custom
  - SSL automático
  - Deploy a producción
  - **Tiempo:** 2-3 horas
  - **Prioridad:** 🚀 CRÍTICA
  - **🖼️ CAPTURAS REQUERIDAS:**
    - Setup de Vercel
    - Environment variables
    - DNS records para dominio

- [ ] **5.2** Deployment Setup - Strapi CMS
  - Elegir plataforma (Railway, DigitalOcean, AWS)
  - Crear cuenta
  - PostgreSQL en producción
  - Environment variables
  - Deploy de Strapi
  - Migrar contenido
  - Testing de API
  - Backup automático de DB
  - **Tiempo:** 3-4 horas
  - **Prioridad:** 🚀 CRÍTICA
  - **🖼️ CAPTURAS REQUERIDAS:**
    - Platform setup (Railway, etc.)
    - Database running
    - Strapi deployed

- [ ] **5.3** Monitoring y Error Tracking
  - Crear cuenta Sentry
  - Instalar Sentry SDK
  - Configurar error tracking
  - Performance monitoring
  - Configurar alerts
  - Testing
  - Crear cuenta UptimeRobot
  - Uptime monitoring
  - Status page (opcional)
  - **Tiempo:** 2-3 horas
  - **Prioridad:** 🚀 ALTA
  - **🖼️ CAPTURAS REQUERIDAS:**
    - Sentry dashboard
    - UptimeRobot monitor configurado

- [ ] **5.4** Backup y Recovery Strategy
  - Backup automático de PostgreSQL
  - Backup de media (Cloudinary)
  - Documentar recovery process
  - Testing de restore
  - Retention policy (30 días)
  - **Tiempo:** 2 horas
  - **Prioridad:** 🚀 MEDIA

---

## 🧪 QA TESTING

**Especialidad:** Testing, quality assurance, debugging, validación, test automation

### ✅ Tareas Completadas
- [x] **1.0** Testing Infrastructure Setup
  - Vitest + React Testing Library instalados
  - Playwright configurado
  - 24 tests de ejemplo creados
  - Scripts de testing agregados
  - Documentación completa en specs/

### 📋 Tareas Pendientes

#### 🔴 FASE 1 - Semana 1-2
- [ ] **1.6** Ampliar Cobertura de Tests
  - Fix 5 tests fallando actuales
  - Tests para layout (Footer, WhatsAppFloat, SocialBar)
  - Tests para features/home (Hero, Process, CTA)
  - Tests para features/services (ServicesGrid)
  - Tests para features/contact (ContactForm)
  - Ejecutar E2E tests con Playwright
  - Coverage report
  - Alcanzar mínimo 60% coverage
  - **Tiempo:** 3-4 horas
  - **Prioridad:** 🔴 ALTA

---

## 📊 PRIORIDADES POR SEMANA

### **SEMANA 1-2: FUNDAMENTOS CRÍTICOS** 🔴

**Objetivo:** Infraestructura básica lista

| Tarea | Agente | Tiempo | Status |
|-------|--------|--------|--------|
| 1.1 Variables de entorno | IntegradorBACKEND | 30 min | ⬜ |
| 1.2 Email integration | IntegradorBACKEND | 2-3h | ⬜ |
| 1.3 Error boundaries | frontendUxEngineer | 1-2h | ⬜ |
| 1.4 CI/CD pipeline | DEVOPS | 2-3h | ⬜ |
| 1.5 Security headers | DEVOPS | 30 min | ⬜ |
| 1.6 Testing coverage | QATesting | 3-4h | ⬜ |

**Total estimado:** ~12-16 horas

---

### **SEMANA 3-5: BACKEND INTEGRATION** 🟠

**Objetivo:** Strapi funcionando, contenido dinámico

| Tarea | Agente | Tiempo | Status |
|-------|--------|--------|--------|
| 2.1 Strapi instalación | IntegradorBACKEND | 1-2 días | ⬜ |
| 2.2 Content types | IntegradorBACKEND | 4-6h | ⬜ |
| 2.3 API client frontend | IntegradorBACKEND | 3-4h | ⬜ |
| 2.4 Migración contenido | IntegradorBACKEND | 2-3h | ⬜ |

**Total estimado:** 3-4 días

---

### **SEMANA 6: SEO Y OPTIMIZACIÓN** 🟡

**Objetivo:** SEO completo, assets listos

| Tarea | Agente | Tiempo | Status |
|-------|--------|--------|--------|
| 3.1 SEO avanzado | EstrategaSEO | 1-2h | ⬜ |
| 3.2 Web App Manifest | frontendUxEngineer | 1h | ⬜ |
| 3.3 Structured data | EstrategaSEO | 2-3h | ⬜ |
| 3.4 Analytics | EstrategaSEO | 2-3h | ⬜ |
| 3.5 Favicon package | frontendUxEngineer | 1-2h | ⬜ |
| 3.6 Performance optimization | DEVOPS | 3-4h | ⬜ |

**Total estimado:** 10-15 horas

---

### **SEMANA 7-10: FEATURES PRINCIPALES** 🟢

**Objetivo:** Blog y Portfolio funcionando

| Tarea | Agente | Tiempo | Status |
|-------|--------|--------|--------|
| 4.1 Blog backend | IntegradorBACKEND | 1-2 días | ⬜ |
| 4.2 Blog frontend | frontendUxEngineer | 2-3 días | ⬜ |
| 4.3 Portfolio backend | IntegradorBACKEND | 1 día | ⬜ |
| 4.4 Portfolio frontend | frontendUxEngineer | 2-3 días | ⬜ |

**Total estimado:** 1.5-2 semanas

---

### **SEMANA 11-12: DEPLOYMENT** 🚀

**Objetivo:** EN PRODUCCIÓN

| Tarea | Agente | Tiempo | Status |
|-------|--------|--------|--------|
| 5.1 Deploy Vercel | DEVOPS | 2-3h | ⬜ |
| 5.2 Deploy Strapi | DEVOPS | 3-4h | ⬜ |
| 5.3 Monitoring | DEVOPS | 2-3h | ⬜ |
| 5.4 Backup strategy | DEVOPS | 2h | ⬜ |
| 5.5 Documentation | arquitectoDeSoftware | 3-4h | ⬜ |

**Total estimado:** 12-16 horas

---

## 🎯 QUICK ACTIONS - PRÓXIMOS PASOS

### Para empezar HOY:

**Opción A: Rápido (30-60 min)**
1. ✅ Variables de entorno (IntegradorBACKEND)
2. ✅ Security headers (DEVOPS)

**Opción B: Impacto medio (2-4 horas)**
1. ✅ Email integration (IntegradorBACKEND)
2. ✅ Error boundaries (frontendUxEngineer)
3. ✅ CI/CD pipeline (DEVOPS)

**Opción C: Proyecto avanzado (1+ día)**
1. ✅ Strapi instalación completa (IntegradorBACKEND)

---

## 📞 RECURSOS Y LINKS

### Servicios a Configurar (con capturas)
- [ ] Resend - https://resend.com
- [ ] Cloudinary - https://cloudinary.com
- [ ] Vercel - https://vercel.com
- [ ] Railway - https://railway.app
- [ ] Sentry - https://sentry.io
- [ ] UptimeRobot - https://uptimerobot.com
- [ ] Google Analytics - https://analytics.google.com
- [ ] Google Search Console - https://search.google.com/search-console

### Carpeta para Capturas
```
specs/screenshots/
├── resend/
├── cloudinary/
├── vercel/
├── railway/
├── sentry/
├── uptimerobot/
├── google-analytics/
└── google-search-console/
```

---

## 💡 CÓMO USAR ESTE DOCUMENTO

1. **Identifica tu rol** (agente asignado)
2. **Revisa tus tareas** en tu sección
3. **Prioriza** según la fase actual
4. **Consulta el ROADMAP.md** para detalles de cada tarea
5. **Marca checkboxes** al completar
6. **Adjunta capturas** en specs/screenshots/ cuando se requiera
7. **Actualiza progreso** en la tabla de Dashboard

---

**Última actualización:** 2025-11-08
**Mantenido por:** Equipo SaintGrove
**Versión:** 1.0
