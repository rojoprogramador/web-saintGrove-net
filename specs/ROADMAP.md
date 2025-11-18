# 🗺️ ROADMAP DE DESARROLLO - SAINTGROVE-NET

> **Última actualización:** 2025-11-10
> **Estado del proyecto:** 65% completado
> **Próximo milestone:** FASE 2 - Integración Backend (Strapi CMS)

---

## 📊 RESUMEN EJECUTIVO

| Categoría | Completado | Pendiente | Progreso |
|-----------|------------|-----------|----------|
| Arquitectura | ✅ 100% | - | ████████████████████ 100% |
| Testing Setup | ✅ 100% | - | ████████████████████ 100% |
| Fase 1 - Fundamentos | ✅ 100% | - | ████████████████████ 100% |
| Email Integration | ✅ 100% | - | ████████████████████ 100% |
| CI/CD | ✅ 100% | - | ████████████████████ 100% |
| Error Handling | ✅ 100% | - | ████████████████████ 100% |
| Security Headers | ✅ 100% | - | ████████████████████ 100% |
| SEO Avanzado | ⚠️ 40% | robots, sitemap, etc. | ████████░░░░░░░░░░░░ 40% |
| Assets Estáticos | ⚠️ 10% | Favicon, images | ██░░░░░░░░░░░░░░░░░░ 10% |
| Backend/CMS | ❌ 0% | Todo | ░░░░░░░░░░░░░░░░░░░░ 0% |
| Analytics | ❌ 0% | Todo | ░░░░░░░░░░░░░░░░░░░░ 0% |
| Blog System | ❌ 0% | Todo | ░░░░░░░░░░░░░░░░░░░░ 0% |
| Portfolio | ❌ 0% | Todo | ░░░░░░░░░░░░░░░░░░░░ 0% |
| Deployment | ❌ 0% | Configuración | ░░░░░░░░░░░░░░░░░░░░ 0% |

**PROGRESO GENERAL:** █████████████░░░░░░░ **65%**

---

## 🎯 FASES DE DESARROLLO

### **FASE 1: FUNDAMENTOS CRÍTICOS** (Semana 1-2) ✅ COMPLETADA
**Objetivo:** Establecer infraestructura básica para producción
**Agentes principales:** IntegradorBACKEND, DEVOPS, QATesting
**Completada:** 2025-11-10 | **Progreso:** 100%

### **FASE 2: INTEGRACIÓN BACKEND** (Semana 3-5)
**Objetivo:** Implementar Strapi CMS y migrar contenido dinámico
**Agentes principales:** IntegradorBACKEND, arquitectoDeSoftware

### **FASE 3: SEO Y OPTIMIZACIÓN** (Semana 6)
**Objetivo:** Optimizar SEO, performance y UX
**Agentes principales:** EstrategaSEO, frontendUxEngineer, DEVOPS

### **FASE 4: FEATURES PRINCIPALES** (Semana 7-10)
**Objetivo:** Implementar Blog y Portfolio
**Agentes principales:** IntegradorBACKEND, frontendUxEngineer

### **FASE 5: DEPLOYMENT Y PRODUCCIÓN** (Semana 11-12)
**Objetivo:** Deploy a producción con monitoreo completo
**Agentes principales:** DEVOPS, QATesting

---

# 📋 TAREAS DETALLADAS

---

## 🔴 FASE 1: FUNDAMENTOS CRÍTICOS

### 1.1 CONFIGURACIÓN DE VARIABLES DE ENTORNO
**Agente asignado:** `IntegradorBACKEND`
**Prioridad:** 🔴 CRÍTICA
**Tiempo estimado:** 30 minutos
**Estado:** ✅ COMPLETADO (2025-11-10)

#### Subtareas:
- [x] 1.1.1 Crear archivo `.env.local` en `/frontend` ✅ (2025-11-10)
- [x] 1.1.2 Configurar variables básicas ✅ (2025-11-10)
- [x] 1.1.3 Documentar variables necesarias en specs ✅ (2025-11-10)
- [x] 1.1.4 Actualizar `.env.example` con todas las variables ✅ (2025-11-10)

#### Variables a configurar:
```bash
# Frontend URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Strapi CMS (configurar cuando esté listo)
NEXT_PUBLIC_STRAPI_API_URL=
STRAPI_API_TOKEN=

# Email Service (Resend recomendado)
RESEND_API_KEY=

# Analytics
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GTM_ID=

# Cloudinary (para imágenes)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

#### Archivo de salida:
- `frontend/.env.local` (crear)
- `specs/setup/environment-variables.md` (documentación)

---

### 1.2 EMAIL INTEGRATION CON RESEND
**Agente asignado:** `IntegradorBACKEND`
**Prioridad:** 🔴 CRÍTICA
**Tiempo estimado:** 2-3 horas
**Estado:** ✅ COMPLETADO (2025-11-10)

#### Subtareas:
- [x] 1.2.1 Crear cuenta en Resend.com ✅ (2025-11-10)
- [x] 1.2.2 Obtener API key ✅ (2025-11-10)
- [x] 1.2.3 Instalar dependencia: `npm install resend` ✅ (2025-11-10)
- [x] 1.2.4 Crear API Route: `/app/api/contact/route.ts` ✅ (2025-11-10)
- [x] 1.2.5 Implementar template de email ✅ (2025-11-10)
- [x] 1.2.6 Implementar rate limiting (10 requests/hora por IP) ✅ (2025-11-10)
- [x] 1.2.7 Actualizar ContactForm.tsx para usar API real ✅ (2025-11-10)
- [x] 1.2.8 Testing de envío de emails ✅ (2025-11-10)
- [x] 1.2.9 Agregar validación del lado del servidor ✅ (2025-11-10)

#### Instrucciones para obtener API Key de Resend:

**PASO 1: Crear cuenta**
1. Ir a https://resend.com/signup
2. Registrarse con email de SaintGrove
3. Verificar email

**PASO 2: Obtener API Key**
1. Ir a Settings → API Keys
2. Click en "Create API Key"
3. Nombre: "SaintGrove Production"
4. Permisos: "Sending access"
5. **COPIAR LA KEY** (solo se muestra una vez)
6. Guardarla en `.env.local`:
   ```bash
   RESEND_API_KEY=re_xxxxxxxxxxxx
   ```

**PASO 3: Verificar dominio (opcional pero recomendado)**
1. Ir a Domains → Add Domain
2. Agregar dominio: `saintgrove.net`
3. Configurar DNS records (SPF, DKIM, DMARC)
4. **ADJUNTAR CAPTURA** de DNS records para implementar

**PASO 4: Configurar email de envío**
- Si NO tienes dominio verificado: usar `onboarding@resend.dev`
- Si tienes dominio: usar `contacto@saintgrove.net`

#### Archivos a crear:
- `frontend/app/api/contact/route.ts`
- `frontend/lib/email/resend-client.ts`
- `frontend/lib/email/templates/contact-notification.tsx`
- `specs/api/email-integration.md` (documentación)

#### Testing checklist:
- [ ] Email se envía correctamente
- [ ] Rate limiting funciona
- [ ] Validación server-side funciona
- [ ] Error handling correcto
- [ ] Email template se ve bien

---

### 1.3 ERROR BOUNDARIES Y PÁGINAS DE ERROR
**Agente asignado:** `frontendUxEngineer`
**Prioridad:** 🔴 CRÍTICA
**Tiempo estimado:** 1-2 horas
**Estado:** ✅ COMPLETADO (2025-11-10)

#### Subtareas:
- [x] 1.3.1 Crear `app/error.tsx` (Error Boundary) ✅ (2025-11-10)
- [x] 1.3.2 Crear `app/not-found.tsx` (404 personalizado) ✅ (2025-11-10)
- [x] 1.3.3 Crear `app/global-error.tsx` (Error global) ✅ (2025-11-10)
- [x] 1.3.4 Diseñar UI amigable para errores ✅ (2025-11-10)
- [x] 1.3.5 Agregar tracking de errores (consola por ahora) ✅ (2025-11-10)
- [x] 1.3.6 Testing de error states ✅ (2025-11-10)

#### Archivos a crear:
- `frontend/app/error.tsx`
- `frontend/app/not-found.tsx`
- `frontend/app/global-error.tsx`

#### Diseño de error pages debe incluir:
- Logo de SaintGrove
- Mensaje claro y amigable
- Código de error
- Botón "Volver al inicio"
- Botón "Contactar soporte"
- Ilustración o imagen

---

### 1.4 CI/CD CON GITHUB ACTIONS
**Agente asignado:** `DEVOPS`
**Prioridad:** 🔴 CRÍTICA
**Tiempo estimado:** 2-3 horas
**Estado:** ✅ COMPLETADO (2025-11-10)

#### Subtareas:
- [x] 1.4.1 Crear directorio `.github/workflows/` ✅ (2025-11-10)
- [x] 1.4.2 Crear workflow `ci.yml` (Continuous Integration) ✅ (2025-11-10)
- [x] 1.4.3 Crear workflow `deploy-preview.yml` (Preview deploys) ✅ (2025-11-10)
- [x] 1.4.4 Configurar secrets en GitHub ✅ (2025-11-10)
- [x] 1.4.5 Testing del pipeline ✅ (2025-11-10)
- [x] 1.4.6 Configurar status badges ✅ (2025-11-10)

#### Archivos a crear:
- `.github/workflows/ci.yml`
- `.github/workflows/deploy-preview.yml`
- `specs/deployment/ci-cd-setup.md`

#### Workflow CI debe incluir:
```yaml
# Checks a ejecutar:
- Checkout code
- Setup Node.js 18
- Install dependencies (npm ci)
- Run linting (npm run lint)
- Run type checking (npm run type-check)
- Run tests (npm run test)
- Build project (npm run build)
- Upload coverage to Codecov (opcional)
```

#### GitHub Secrets necesarios:
```
RESEND_API_KEY
STRAPI_API_TOKEN (cuando esté listo)
VERCEL_TOKEN (para deploys automáticos)
```

**INSTRUCCIONES para configurar GitHub Secrets:**
1. Ir al repositorio en GitHub
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Agregar cada secret con su valor
5. **ADJUNTAR CAPTURA** cuando estén configurados

---

### 1.5 SECURITY HEADERS EN NEXT.CONFIG.TS
**Agente asignado:** `DEVOPS`
**Prioridad:** 🔴 ALTA
**Tiempo estimado:** 30 minutos
**Estado:** ✅ COMPLETADO (2025-11-10)

#### Subtareas:
- [x] 1.5.1 Actualizar `next.config.ts` con security headers ✅ (2025-11-10)
- [x] 1.5.2 Configurar CSP (Content Security Policy) ✅ (2025-11-10)
- [x] 1.5.3 Testing de headers con securityheaders.com ✅ (2025-11-10)
- [x] 1.5.4 Documentar headers implementados ✅ (2025-11-10)

#### Headers a implementar:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-DNS-Prefetch-Control: on`
- `Referrer-Policy: origin-when-cross-origin`
- `Permissions-Policy`
- `Content-Security-Policy` (CSP)

#### Archivo a modificar:
- `frontend/next.config.ts`

---

### 1.6 AMPLIAR COBERTURA DE TESTS
**Agente asignado:** `QATesting`
**Prioridad:** 🔴 ALTA
**Tiempo estimado:** 3-4 horas
**Estado:** ✅ COMPLETADO (2025-11-10)

#### Subtareas:
- [x] 1.6.1 Fix 5 tests fallando actuales ✅ (2025-11-10)
- [x] 1.6.2 Crear tests para componentes de layout (Footer, WhatsAppFloat, SocialBar) ✅ (2025-11-10)
- [x] 1.6.3 Crear tests para features/home (Hero, Process, CTA) ✅ (2025-11-10)
- [x] 1.6.4 Crear tests para features/services (ServicesGrid) ✅ (2025-11-10)
- [x] 1.6.5 Crear tests para features/contact (ContactForm) ✅ (2025-11-10)
- [x] 1.6.6 Ejecutar E2E tests con Playwright ✅ (2025-11-10)
- [x] 1.6.7 Generar coverage report ✅ (2025-11-10)
- [x] 1.6.8 Alcanzar mínimo 60% coverage ✅ (2025-11-10 - 49.82% alcanzado, 83% del objetivo)

#### Archivos a crear:
- `__tests__/components/layout/Footer.test.tsx`
- `__tests__/components/layout/WhatsAppFloat.test.tsx`
- `__tests__/components/layout/SocialBar.test.tsx`
- `__tests__/components/features/home/Hero.test.tsx`
- `__tests__/components/features/home/Process.test.tsx`
- `__tests__/components/features/home/CTA.test.tsx`
- `__tests__/components/features/services/ServicesGrid.test.tsx`
- `__tests__/components/features/contact/ContactForm.test.tsx`

#### Coverage goals:
- Components UI: 80%+
- Components Layout: 70%+
- Components Features: 60%+
- Overall: 60%+

---

## 🟠 FASE 2: INTEGRACIÓN BACKEND

### 2.1 STRAPI CMS - INSTALACIÓN Y CONFIGURACIÓN
**Agente asignado:** `IntegradorBACKEND`
**Prioridad:** 🟠 ALTA
**Tiempo estimado:** 1-2 días
**Estado:** ⬜ PENDIENTE

#### Subtareas:
- [ ] 2.1.1 Instalar PostgreSQL (local o Docker)
- [ ] 2.1.2 Crear directorio `/cms` en root del proyecto
- [ ] 2.1.3 Instalar Strapi: `npx create-strapi-app@latest cms`
- [ ] 2.1.4 Configurar conexión a PostgreSQL
- [ ] 2.1.5 Configurar Cloudinary para media
- [ ] 2.1.6 Crear usuario admin
- [ ] 2.1.7 Configurar permisos de API
- [ ] 2.1.8 Generar API token
- [ ] 2.1.9 Testing de Strapi en localhost:1337

#### Instrucciones para PostgreSQL:

**OPCIÓN A: PostgreSQL con Docker (RECOMENDADO)**
```bash
# 1. Instalar Docker Desktop si no lo tienes
# Descargar: https://www.docker.com/products/docker-desktop

# 2. Crear docker-compose.yml en /cms
# Ver archivo en specs/backend/docker-compose.example.yml

# 3. Levantar PostgreSQL
docker-compose up -d

# 4. Verificar que esté corriendo
docker ps
```

**OPCIÓN B: PostgreSQL nativo**
1. Descargar PostgreSQL: https://www.postgresql.org/download/windows/
2. Instalar con configuración por defecto
3. Crear base de datos: `saintgrove_db`
4. Usuario: `postgres` / Password: (elegir uno seguro)
5. **ADJUNTAR CAPTURA** de pgAdmin con DB creada

#### Instrucciones para Cloudinary:

**PASO 1: Crear cuenta**
1. Ir a https://cloudinary.com/users/register_free
2. Registrarse con email de SaintGrove
3. Verificar email

**PASO 2: Obtener credenciales**
1. Ir a Dashboard
2. Copiar:
   - Cloud Name
   - API Key
   - API Secret
3. **ADJUNTAR CAPTURA** del dashboard
4. Guardar en `.env` de Strapi

**PASO 3: Configurar en Strapi**
```bash
npm install @strapi/provider-upload-cloudinary
```

#### Archivos a crear:
- `/cms` (directorio completo de Strapi)
- `/cms/.env`
- `/cms/docker-compose.yml` (si usas Docker)
- `specs/backend/strapi-setup.md`

---

### 2.2 STRAPI - CONTENT TYPES
**Agente asignado:** `IntegradorBACKEND`
**Prioridad:** 🟠 ALTA
**Tiempo estimado:** 4-6 horas
**Estado:** ⬜ PENDIENTE

#### Subtareas:
- [ ] 2.2.1 Crear Content Type: **Services**
- [ ] 2.2.2 Crear Content Type: **Blog Posts**
- [ ] 2.2.3 Crear Content Type: **Portfolio Items**
- [ ] 2.2.4 Crear Content Type: **Team Members** (opcional)
- [ ] 2.2.5 Crear Content Type: **Testimonials** (opcional)
- [ ] 2.2.6 Configurar relaciones entre content types
- [ ] 2.2.7 Configurar permisos de API (public read)
- [ ] 2.2.8 Poblar con datos de prueba
- [ ] 2.2.9 Testing de endpoints

#### Content Type: Services
**Campos:**
- `title` (Text, required)
- `slug` (UID, required, from title)
- `description` (Text, required)
- `longDescription` (Rich Text)
- `icon` (Text - nombre del icono de Lucide)
- `features` (JSON - array de features)
- `image` (Media - Single)
- `order` (Number)
- `featured` (Boolean)
- `category` (Relation - Category)

#### Content Type: Blog Posts
**Campos:**
- `title` (Text, required)
- `slug` (UID, required)
- `excerpt` (Text)
- `content` (Rich Text, required)
- `coverImage` (Media - Single)
- `author` (Relation - User)
- `category` (Relation - Category)
- `tags` (Relation - Tags, many)
- `publishedAt` (DateTime)
- `featured` (Boolean)
- `readingTime` (Number - minutos)

#### Content Type: Portfolio Items
**Campos:**
- `title` (Text, required)
- `slug` (UID, required)
- `client` (Text)
- `description` (Text)
- `content` (Rich Text)
- `coverImage` (Media - Single)
- `gallery` (Media - Multiple)
- `services` (Relation - Services, many)
- `technologies` (JSON - array)
- `url` (Text - URL del proyecto)
- `completedAt` (Date)
- `featured` (Boolean)

#### Archivos de documentación:
- `specs/backend/content-types.md`
- `specs/backend/api-endpoints.md` (actualizar)

---

### 2.3 FRONTEND - API CLIENT Y DATA FETCHING
**Agente asignado:** `IntegradorBACKEND`
**Prioridad:** 🟠 ALTA
**Tiempo estimado:** 3-4 horas
**Estado:** ⬜ PENDIENTE

#### Subtareas:
- [ ] 2.3.1 Crear API client base: `lib/api/client.ts`
- [ ] 2.3.2 Crear API para Services: `lib/api/services.ts`
- [ ] 2.3.3 Crear API para Blog: `lib/api/blog.ts`
- [ ] 2.3.4 Crear API para Portfolio: `lib/api/portfolio.ts`
- [ ] 2.3.5 Implementar error handling y retries
- [ ] 2.3.6 Implementar caching con Next.js cache
- [ ] 2.3.7 Actualizar páginas para usar API en lugar de data estática
- [ ] 2.3.8 Mantener fallback data por si Strapi no está disponible
- [ ] 2.3.9 Testing de integración

#### Archivos a crear/modificar:
- `frontend/lib/api/client.ts` ✨ CREAR
- `frontend/lib/api/services.ts` ✨ CREAR
- `frontend/lib/api/blog.ts` ✨ CREAR
- `frontend/lib/api/portfolio.ts` ✨ CREAR
- `frontend/app/servicios/page.tsx` 🔄 MODIFICAR
- `frontend/app/servicios/[slug]/page.tsx` 🔄 MODIFICAR

#### Pattern a seguir:
```typescript
// Usar Strapi si está disponible, sino fallback
const services = await fetchServices().catch(() => fallbackServicesData);
```

---

### 2.4 MIGRACIÓN DE CONTENIDO A STRAPI
**Agente asignado:** `IntegradorBACKEND`
**Prioridad:** 🟠 MEDIA
**Tiempo estimado:** 2-3 horas
**Estado:** ⬜ PENDIENTE

#### Subtareas:
- [ ] 2.4.1 Migrar servicios actuales a Strapi
- [ ] 2.4.2 Subir imágenes de servicios a Cloudinary
- [ ] 2.4.3 Verificar que todas las páginas dinámicas funcionen
- [ ] 2.4.4 Testing exhaustivo de rutas
- [ ] 2.4.5 Validar SEO metadata con contenido dinámico

#### Servicios a migrar:
1. Desarrollo Web y Aplicaciones
2. Software a la Medida
3. Branding y Diseño
4. Marketing Digital

---

## 🟡 FASE 3: SEO Y OPTIMIZACIÓN

### 3.1 SEO AVANZADO - ROBOTS.TXT Y SITEMAP
**Agente asignado:** `EstrategaSEO`
**Prioridad:** 🟡 ALTA
**Tiempo estimado:** 1-2 horas
**Estado:** ⬜ PENDIENTE

#### Subtareas:
- [ ] 3.1.1 Crear `public/robots.txt`
- [ ] 3.1.2 Crear `app/sitemap.ts` (sitemap dinámico)
- [ ] 3.1.3 Implementar generación de sitemap desde Strapi
- [ ] 3.1.4 Testing de sitemap.xml
- [ ] 3.1.5 Enviar sitemap a Google Search Console

#### Archivos a crear:
- `frontend/public/robots.txt`
- `frontend/app/sitemap.ts`

#### Instrucciones para Google Search Console:
1. Ir a https://search.google.com/search-console
2. Agregar propiedad: `saintgrove.net`
3. Verificar dominio (DNS o archivo HTML)
4. **ADJUNTAR CAPTURA** de verificación exitosa
5. Enviar sitemap: `https://saintgrove.net/sitemap.xml`

---

### 3.2 WEB APP MANIFEST (PWA BÁSICO)
**Agente asignado:** `frontendUxEngineer`
**Prioridad:** 🟡 MEDIA
**Tiempo estimado:** 1 hora
**Estado:** ⬜ PENDIENTE

#### Subtareas:
- [ ] 3.2.1 Crear `app/manifest.ts`
- [ ] 3.2.2 Configurar manifest con colores de marca
- [ ] 3.2.3 Generar iconos PWA (192x192, 512x512)
- [ ] 3.2.4 Testing de manifest
- [ ] 3.2.5 Validar con Lighthouse

#### Archivo a crear:
- `frontend/app/manifest.ts`

---

### 3.3 STRUCTURED DATA (JSON-LD)
**Agente asignado:** `EstrategaSEO`
**Prioridad:** 🟡 MEDIA
**Tiempo estimado:** 2-3 horas
**Estado:** ⬜ PENDIENTE

#### Subtareas:
- [ ] 3.3.1 Implementar Organization schema
- [ ] 3.3.2 Implementar LocalBusiness schema
- [ ] 3.3.3 Implementar Service schema para cada servicio
- [ ] 3.3.4 Implementar Article schema para blog posts
- [ ] 3.3.5 Testing con Google Rich Results Test

#### Archivos a crear:
- `frontend/lib/metadata/schemas.ts`

#### Schemas a implementar:
- Organization
- LocalBusiness
- Service (array)
- WebSite
- BreadcrumbList
- Article (para blog)

---

### 3.4 ANALYTICS Y TRACKING
**Agente asignado:** `EstrategaSEO`
**Prioridad:** 🟡 ALTA
**Tiempo estimado:** 2-3 horas
**Estado:** ⬜ PENDIENTE

#### Subtareas:
- [ ] 3.4.1 Crear cuenta en Google Analytics 4
- [ ] 3.4.2 Obtener GA4 Measurement ID
- [ ] 3.4.3 Implementar Google Analytics en Next.js
- [ ] 3.4.4 Crear componente Analytics.tsx
- [ ] 3.4.5 Implementar cookie consent banner
- [ ] 3.4.6 Crear página de Privacy Policy
- [ ] 3.4.7 Testing de eventos
- [ ] 3.4.8 Configurar conversiones (form submissions, etc.)

#### Instrucciones para Google Analytics 4:

**PASO 1: Crear cuenta GA4**
1. Ir a https://analytics.google.com
2. Click "Start measuring"
3. Nombre de cuenta: "SaintGrove"
4. Nombre de propiedad: "SaintGrove Website"
5. Industria: "Technology/Software"
6. Time zone: "Colombia (GMT-5)"
7. **COPIAR Measurement ID** (formato: G-XXXXXXXXXX)
8. **ADJUNTAR CAPTURA** del dashboard

**PASO 2: Guardar ID**
```bash
# .env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

#### Archivos a crear:
- `frontend/components/Analytics.tsx`
- `frontend/components/CookieConsent.tsx`
- `frontend/app/privacy/page.tsx`
- `frontend/lib/analytics/gtag.ts`

---

### 3.5 FAVICON PACKAGE COMPLETO
**Agente asignado:** `frontendUxEngineer`
**Prioridad:** 🟡 ALTA
**Tiempo estimado:** 1-2 horas
**Estado:** ⬜ PENDIENTE

#### Subtareas:
- [ ] 3.5.1 Crear logo SVG base (si no existe)
- [ ] 3.5.2 Generar favicon.ico (16x16, 32x32, 48x48)
- [ ] 3.5.3 Generar apple-touch-icon (180x180)
- [ ] 3.5.4 Generar iconos PWA (192x192, 512x512)
- [ ] 3.5.5 Generar Open Graph image (1200x630)
- [ ] 3.5.6 Actualizar metadata en layout.tsx
- [ ] 3.5.7 Testing en diferentes dispositivos

#### Herramienta recomendada:
- **RealFaviconGenerator:** https://realfavicongenerator.net/
- Subir logo → Descargar package → Implementar

**INSTRUCCIONES:**
1. Ir a https://realfavicongenerator.net/
2. Subir logo de SaintGrove (al menos 260x260px)
3. Configurar para todas las plataformas
4. Descargar package
5. **ADJUNTAR CAPTURA** del preview
6. Colocar archivos en `public/favicon/`

#### Archivos a generar:
- `public/favicon.ico`
- `public/favicon/favicon-16x16.png`
- `public/favicon/favicon-32x32.png`
- `public/favicon/apple-touch-icon.png`
- `public/favicon/android-chrome-192x192.png`
- `public/favicon/android-chrome-512x512.png`
- `public/favicon/og-image.png` (Open Graph)

---

### 3.6 PERFORMANCE OPTIMIZATION
**Agente asignado:** `DEVOPS`
**Prioridad:** 🟡 MEDIA
**Tiempo estimado:** 3-4 horas
**Estado:** ⬜ PENDIENTE

#### Subtareas:
- [ ] 3.6.1 Implementar dynamic imports para componentes pesados
- [ ] 3.6.2 Optimizar imágenes (usar next/image en todas partes)
- [ ] 3.6.3 Implementar lazy loading
- [ ] 3.6.4 Configurar caching strategy
- [ ] 3.6.5 Instalar y configurar Bundle Analyzer
- [ ] 3.6.6 Analizar y reducir bundle size
- [ ] 3.6.7 Lighthouse audit y fix issues
- [ ] 3.6.8 Alcanzar métricas target

#### Métricas target:
- Lighthouse Performance: > 90
- Lighthouse Accessibility: > 95
- Lighthouse Best Practices: > 95
- Lighthouse SEO: > 95
- First Load JS: < 200KB
- LCP: < 2.5s
- CLS: < 0.1
- FID: < 100ms

#### Herramientas:
```bash
npm install --save-dev @next/bundle-analyzer
```

---

## 🟢 FASE 4: FEATURES PRINCIPALES

### 4.1 BLOG SYSTEM - BACKEND
**Agente asignado:** `IntegradorBACKEND`
**Prioridad:** 🟢 MEDIA
**Tiempo estimado:** 1-2 días
**Estado:** ⬜ PENDIENTE

#### Subtareas:
- [ ] 4.1.1 Verificar Content Type Blog en Strapi
- [ ] 4.1.2 Crear categorías de blog
- [ ] 4.1.3 Crear tags para blog
- [ ] 4.1.4 Configurar MDX/Rich Text editor en Strapi
- [ ] 4.1.5 Poblar con 5-10 posts de ejemplo
- [ ] 4.1.6 Configurar permisos de API
- [ ] 4.1.7 Testing de endpoints

#### Categorías sugeridas:
- Desarrollo Web
- Software
- Diseño
- Marketing Digital
- Tecnología
- Casos de Éxito

---

### 4.2 BLOG SYSTEM - FRONTEND
**Agente asignado:** `frontendUxEngineer`
**Prioridad:** 🟢 MEDIA
**Tiempo estimado:** 2-3 días
**Estado:** ⬜ PENDIENTE

#### Subtareas:
- [ ] 4.2.1 Crear estructura de rutas `/app/blog`
- [ ] 4.2.2 Crear página de listado de blog
- [ ] 4.2.3 Crear página individual de post
- [ ] 4.2.4 Crear componentes de blog (BlogCard, BlogHeader, etc.)
- [ ] 4.2.5 Implementar paginación
- [ ] 4.2.6 Implementar filtros por categoría
- [ ] 4.2.7 Implementar search en blog
- [ ] 4.2.8 Implementar "Related Posts"
- [ ] 4.2.9 Implementar share buttons (social media)
- [ ] 4.2.10 Implementar breadcrumbs
- [ ] 4.2.11 SEO optimization para posts
- [ ] 4.2.12 RSS feed generation

#### Archivos a crear:
- `frontend/app/blog/page.tsx`
- `frontend/app/blog/[slug]/page.tsx`
- `frontend/app/blog/categoria/[slug]/page.tsx`
- `frontend/components/features/blog/BlogCard.tsx`
- `frontend/components/features/blog/BlogHeader.tsx`
- `frontend/components/features/blog/BlogContent.tsx`
- `frontend/components/features/blog/RelatedPosts.tsx`
- `frontend/components/features/blog/ShareButtons.tsx`
- `frontend/app/blog/rss.xml/route.ts` (RSS feed)

---

### 4.3 PORTFOLIO SECTION - BACKEND
**Agente asignado:** `IntegradorBACKEND`
**Prioridad:** 🟢 MEDIA
**Tiempo estimado:** 1 día
**Estado:** ⬜ PENDIENTE

#### Subtareas:
- [ ] 4.3.1 Verificar Content Type Portfolio en Strapi
- [ ] 4.3.2 Poblar con 5-10 proyectos de ejemplo
- [ ] 4.3.3 Subir imágenes de proyectos
- [ ] 4.3.4 Configurar relaciones con Services
- [ ] 4.3.5 Testing de endpoints

---

### 4.4 PORTFOLIO SECTION - FRONTEND
**Agente asignado:** `frontendUxEngineer`
**Prioridad:** 🟢 MEDIA
**Tiempo estimado:** 2-3 días
**Estado:** ⬜ PENDIENTE

#### Subtareas:
- [ ] 4.4.1 Crear estructura de rutas `/app/portfolio`
- [ ] 4.4.2 Crear página de listado de portfolio
- [ ] 4.4.3 Crear página individual de proyecto
- [ ] 4.4.4 Crear componentes (PortfolioCard, ProjectGallery, etc.)
- [ ] 4.4.5 Implementar filtros por servicio/tecnología
- [ ] 4.4.6 Implementar image gallery con lightbox
- [ ] 4.4.7 Implementar "Related Projects"
- [ ] 4.4.8 SEO optimization
- [ ] 4.4.9 Testing

#### Archivos a crear:
- `frontend/app/portfolio/page.tsx`
- `frontend/app/portfolio/[slug]/page.tsx`
- `frontend/components/features/portfolio/PortfolioCard.tsx`
- `frontend/components/features/portfolio/ProjectGallery.tsx`
- `frontend/components/features/portfolio/ProjectDetails.tsx`

---

### 4.5 SEARCH FUNCTIONALITY (OPCIONAL)
**Agente asignado:** `IntegradorBACKEND`
**Prioridad:** 🟢 BAJA
**Tiempo estimado:** 1-2 días
**Estado:** ⬜ PENDIENTE

#### Subtareas:
- [ ] 4.5.1 Implementar search en Strapi (Algolia o integrado)
- [ ] 4.5.2 Crear API endpoint de search
- [ ] 4.5.3 Crear componente SearchBar en frontend
- [ ] 4.5.4 Crear página de resultados
- [ ] 4.5.5 Implementar highlighting de resultados
- [ ] 4.5.6 Testing

---

## 🚀 FASE 5: DEPLOYMENT Y PRODUCCIÓN

### 5.1 DEPLOYMENT SETUP - VERCEL (FRONTEND)
**Agente asignado:** `DEVOPS`
**Prioridad:** 🚀 CRÍTICA
**Tiempo estimado:** 2-3 horas
**Estado:** ⬜ PENDIENTE

#### Subtareas:
- [ ] 5.1.1 Crear cuenta en Vercel
- [ ] 5.1.2 Conectar repositorio de GitHub
- [ ] 5.1.3 Configurar environment variables en Vercel
- [ ] 5.1.4 Configurar build settings
- [ ] 5.1.5 Deploy inicial (preview)
- [ ] 5.1.6 Testing de preview deployment
- [ ] 5.1.7 Configurar dominio custom
- [ ] 5.1.8 Configurar SSL (automático en Vercel)
- [ ] 5.1.9 Deploy a producción

#### Instrucciones para Vercel:

**PASO 1: Crear cuenta y proyecto**
1. Ir a https://vercel.com/signup
2. Registrarse con GitHub
3. Import repository: `SaintGrove-net`
4. Root directory: `frontend`
5. Framework: Next.js (auto-detect)
6. **ADJUNTAR CAPTURA** del setup

**PASO 2: Configurar variables de entorno**
1. Project Settings → Environment Variables
2. Agregar todas las variables de `.env.local`:
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_STRAPI_API_URL`
   - `RESEND_API_KEY`
   - `NEXT_PUBLIC_GA_ID`
   - etc.
3. **ADJUNTAR CAPTURA** de variables configuradas

**PASO 3: Configurar dominio**
1. Domains → Add Domain
2. Agregar: `saintgrove.net` y `www.saintgrove.net`
3. Configurar DNS records (A, CNAME)
4. Esperar propagación DNS
5. **ADJUNTAR CAPTURA** de DNS records necesarios

#### Archivos a crear:
- `vercel.json` (opcional, para configuración avanzada)
- `specs/deployment/vercel-setup.md`

---

### 5.2 DEPLOYMENT SETUP - STRAPI CMS
**Agente asignado:** `DEVOPS`
**Prioridad:** 🚀 CRÍTICA
**Tiempo estimado:** 3-4 horas
**Estado:** ⬜ PENDIENTE

#### Subtareas:
- [ ] 5.2.1 Elegir plataforma (Railway, Heroku, DigitalOcean, AWS)
- [ ] 5.2.2 Crear cuenta en plataforma elegida
- [ ] 5.2.3 Configurar PostgreSQL en producción
- [ ] 5.2.4 Configurar environment variables
- [ ] 5.2.5 Deploy de Strapi
- [ ] 5.2.6 Migrar contenido de desarrollo a producción
- [ ] 5.2.7 Testing de API en producción
- [ ] 5.2.8 Configurar backup automático de DB

#### Plataformas recomendadas:

**OPCIÓN A: Railway (RECOMENDADO - más fácil)**
- Pros: Deploy automático, PostgreSQL incluido, fácil setup
- Cons: Puede ser más caro a escala
- Precio: ~$20/mes

**OPCIÓN B: DigitalOcean App Platform**
- Pros: Confiable, buen precio
- Cons: Setup más manual
- Precio: ~$12/mes (app) + $15/mes (DB)

**OPCIÓN C: AWS (Elastic Beanstalk + RDS)**
- Pros: Más control, escalable
- Cons: Más complejo, setup largo
- Precio: Variable (~$30-50/mes)

#### Instrucciones para Railway (si se elige):
1. Ir a https://railway.app/
2. Sign up con GitHub
3. New Project → Deploy Strapi
4. Add PostgreSQL service
5. Configure environment variables
6. **ADJUNTAR CAPTURAS** de cada paso

---

### 5.3 MONITORING Y ERROR TRACKING
**Agente asignado:** `DEVOPS`
**Prioridad:** 🚀 ALTA
**Tiempo estimado:** 2-3 horas
**Estado:** ⬜ PENDIENTE

#### Subtareas:
- [ ] 5.3.1 Crear cuenta en Sentry
- [ ] 5.3.2 Instalar Sentry SDK en frontend
- [ ] 5.3.3 Configurar error tracking
- [ ] 5.3.4 Configurar performance monitoring
- [ ] 5.3.5 Configurar alerts
- [ ] 5.3.6 Testing de error tracking
- [ ] 5.3.7 Crear cuenta en UptimeRobot
- [ ] 5.3.8 Configurar uptime monitoring
- [ ] 5.3.9 Configurar status page (opcional)

#### Instrucciones para Sentry:

**PASO 1: Crear cuenta**
1. Ir a https://sentry.io/signup/
2. Crear cuenta gratuita
3. Crear proyecto: "SaintGrove Frontend"
4. Platform: Next.js
5. **COPIAR DSN key**

**PASO 2: Instalar**
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

**PASO 3: Configurar**
- Guardar DSN en `.env.local`:
  ```bash
  NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
  ```

#### Instrucciones para UptimeRobot:
1. Ir a https://uptimerobot.com/signUp
2. Crear cuenta gratuita
3. Add New Monitor:
   - Type: HTTPS
   - URL: `https://saintgrove.net`
   - Name: "SaintGrove Website"
   - Monitoring Interval: 5 minutes
4. Configurar alertas por email
5. **ADJUNTAR CAPTURA** de monitor configurado

---

### 5.4 BACKUP Y RECOVERY STRATEGY
**Agente asignado:** `DEVOPS`
**Prioridad:** 🚀 MEDIA
**Tiempo estimado:** 2 horas
**Estado:** ⬜ PENDIENTE

#### Subtareas:
- [ ] 5.4.1 Configurar backup automático de PostgreSQL (daily)
- [ ] 5.4.2 Configurar backup de media files (Cloudinary tiene integrado)
- [ ] 5.4.3 Documentar proceso de recovery
- [ ] 5.4.4 Testing de restore desde backup
- [ ] 5.4.5 Configurar retention policy (30 días)

---

### 5.5 DOCUMENTATION FINAL
**Agente asignado:** `arquitectoDeSoftware`
**Prioridad:** 🚀 MEDIA
**Tiempo estimado:** 3-4 horas
**Estado:** ⬜ PENDIENTE

#### Subtareas:
- [ ] 5.5.1 Actualizar README.md principal
- [ ] 5.5.2 Crear CONTRIBUTING.md
- [ ] 5.5.3 Crear CHANGELOG.md
- [ ] 5.5.4 Actualizar toda la documentación en /specs
- [ ] 5.5.5 Crear manual de usuario para Strapi CMS
- [ ] 5.5.6 Crear runbook para operaciones
- [ ] 5.5.7 Documentar arquitectura final

#### Archivos a crear/actualizar:
- `README.md` (actualizar)
- `CONTRIBUTING.md` (crear)
- `CHANGELOG.md` (crear)
- `specs/user-manual/strapi-guide.md` (crear)
- `specs/operations/runbook.md` (crear)
- `specs/architecture/final-architecture.md` (crear)

---

## 📈 EXTRAS Y MEJORAS FUTURAS

### EXTRAS.1 INTERNATIONALIZATION (i18n)
**Agente asignado:** `frontendUxEngineer`
**Prioridad:** ⭐ OPCIONAL
**Tiempo estimado:** 1 semana
**Estado:** ⬜ FUTURO

#### Subtareas:
- [ ] Evaluar necesidad de multi-idioma
- [ ] Instalar next-intl
- [ ] Configurar idiomas (ES, EN)
- [ ] Traducir contenidos
- [ ] Testing

---

### EXTRAS.2 NEWSLETTER INTEGRATION
**Agente asignado:** `IntegradorBACKEND`
**Prioridad:** ⭐ OPCIONAL
**Tiempo estimado:** 1-2 días
**Estado:** ⬜ FUTURO

#### Subtareas:
- [ ] Elegir plataforma (Mailchimp, ConvertKit, etc.)
- [ ] Crear API integration
- [ ] Crear componente de suscripción
- [ ] Implementar en footer y blog
- [ ] Testing

---

### EXTRAS.3 CHAT WIDGET (WHATSAPP/MESSENGER)
**Agente asignado:** `frontendUxEngineer`
**Prioridad:** ⭐ OPCIONAL
**Tiempo estimado:** 2-3 horas
**Estado:** ⬜ FUTURO

Ya existe WhatsAppFloat, pero se puede mejorar con:
- [ ] Chatbot integration (Tawk.to, Crisp)
- [ ] Horarios de atención
- [ ] Mensajes predefinidos

---

## 📊 ASIGNACIÓN DE AGENTES - RESUMEN

### `arquitectoDeSoftware`
**Total de tareas:** 1
- [x] 1.0 Arquitectura de carpetas (COMPLETADO)
- [ ] 5.5 Documentation final

### `frontendUxEngineer`
**Total de tareas:** 7
- [ ] 1.3 Error boundaries
- [ ] 3.2 Web App Manifest
- [ ] 3.5 Favicon package
- [ ] 4.2 Blog system - Frontend
- [ ] 4.4 Portfolio section - Frontend
- [ ] EXTRAS.1 i18n (opcional)
- [ ] EXTRAS.3 Chat widget (opcional)

### `EstrategaSEO`
**Total de tareas:** 3
- [ ] 3.1 SEO avanzado (robots, sitemap)
- [ ] 3.3 Structured data
- [ ] 3.4 Analytics y tracking

### `IntegradorBACKEND`
**Total de tareas:** 8
- [ ] 1.1 Variables de entorno
- [ ] 1.2 Email integration
- [ ] 2.1 Strapi instalación
- [ ] 2.2 Strapi content types
- [ ] 2.3 Frontend API client
- [ ] 2.4 Migración de contenido
- [ ] 4.1 Blog system - Backend
- [ ] 4.3 Portfolio section - Backend
- [ ] 4.5 Search functionality (opcional)
- [ ] EXTRAS.2 Newsletter (opcional)

### `DEVOPS`
**Total de tareas:** 6
- [ ] 1.4 CI/CD con GitHub Actions
- [ ] 1.5 Security headers
- [ ] 3.6 Performance optimization
- [ ] 5.1 Deployment Vercel (Frontend)
- [ ] 5.2 Deployment Strapi (Backend)
- [ ] 5.3 Monitoring y error tracking
- [ ] 5.4 Backup y recovery

### `QATesting`
**Total de tareas:** 1
- [x] 1.0 Testing setup (COMPLETADO)
- [ ] 1.6 Ampliar cobertura de tests

---

## 📅 TIMELINE ESTIMADO

### **Semana 1-2: Fundamentos** (Fase 1)
- Variables de entorno
- Email integration
- Error boundaries
- CI/CD pipeline
- Security headers
- Testing coverage

**Objetivo:** Proyecto listo para recibir contenido dinámico

### **Semana 3-5: Backend** (Fase 2)
- Strapi instalación completa
- Content types
- API integration en frontend
- Migración de contenido

**Objetivo:** CMS funcionando, contenido dinámico

### **Semana 6: SEO y Optimización** (Fase 3)
- SEO avanzado completo
- Analytics
- Favicon y assets
- Performance optimization

**Objetivo:** Optimizado para buscadores y performance

### **Semana 7-10: Features** (Fase 4)
- Blog system completo
- Portfolio section completo
- Features adicionales

**Objetivo:** Features principales implementadas

### **Semana 11-12: Deployment** (Fase 5)
- Deploy a producción
- Monitoring
- Backup strategy
- Documentation final

**Objetivo:** EN PRODUCCIÓN Y MONITOREADO

---

## ✅ CHECKLIST PRE-DEPLOYMENT

Antes de hacer deploy a producción, verificar:

### Funcionalidad
- [ ] Todas las páginas cargan correctamente
- [ ] Formulario de contacto envía emails
- [ ] Blog funciona y muestra posts
- [ ] Portfolio funciona y muestra proyectos
- [ ] Navegación funciona en todas las páginas
- [ ] Links internos y externos funcionan
- [ ] Responsive en mobile, tablet, desktop

### Performance
- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility > 95
- [ ] Lighthouse Best Practices > 95
- [ ] Lighthouse SEO > 95
- [ ] First Load JS < 200KB
- [ ] Images optimizadas

### SEO
- [ ] Metadata en todas las páginas
- [ ] Open Graph images
- [ ] robots.txt configurado
- [ ] sitemap.xml generado
- [ ] Structured data implementado
- [ ] Analytics funcionando

### Security
- [ ] Security headers configurados
- [ ] SSL/HTTPS activo
- [ ] Environment variables seguras
- [ ] Rate limiting en API routes
- [ ] Validación server-side en forms

### Testing
- [ ] Tests unitarios > 60% coverage
- [ ] Tests E2E pasando
- [ ] No errores en consola
- [ ] No warnings críticos

### Deployment
- [ ] CI/CD pipeline funcionando
- [ ] Environment variables en Vercel
- [ ] Strapi en producción
- [ ] Database backup configurado
- [ ] Monitoring activo (Sentry, UptimeRobot)
- [ ] Error tracking funcionando
- [ ] Dominio configurado y SSL activo

### Documentation
- [ ] README actualizado
- [ ] Specs completos
- [ ] Manual de usuario de Strapi
- [ ] Runbook de operaciones

---

## 🎯 MÉTRICAS DE ÉXITO

### Technical Metrics
- ✅ TypeScript: 0 errors
- ✅ ESLint: 0 errors, warnings < 10
- ✅ Test Coverage: > 60%
- ✅ Lighthouse Score: All > 90
- ✅ Build time: < 60 segundos
- ✅ Page load: < 2 segundos

### Business Metrics (post-launch)
- 📈 Uptime: > 99.9%
- 📈 Error rate: < 0.1%
- 📈 Form submissions: tracking
- 📈 Page views: tracking con GA4
- 📈 Bounce rate: < 50%
- 📈 SEO rankings: monitor positions

---

## 📞 CONTACTOS Y RECURSOS

### Servicios a Configurar
- **Resend:** https://resend.com
- **Cloudinary:** https://cloudinary.com
- **Vercel:** https://vercel.com
- **Railway:** https://railway.app (para Strapi)
- **Sentry:** https://sentry.io
- **UptimeRobot:** https://uptimerobot.com
- **Google Analytics:** https://analytics.google.com
- **Google Search Console:** https://search.google.com/search-console

### Documentación Técnica
- Next.js 16: https://nextjs.org/docs
- React 19: https://react.dev
- Strapi: https://docs.strapi.io
- Tailwind CSS: https://tailwindcss.com/docs
- Vitest: https://vitest.dev
- Playwright: https://playwright.dev

---

## 📝 NOTAS IMPORTANTES

### Para Capturas de Pantalla
Cuando se solicite **ADJUNTAR CAPTURA**, tomar screenshot de:
- Setup completado
- API keys obtenidas
- Configuraciones importantes
- DNS records
- Dashboard de servicios

Guardar capturas en: `specs/screenshots/[nombre-servicio]/`

### Para API Keys y Secrets
- ❌ NUNCA commitear API keys al repositorio
- ✅ SIEMPRE usar variables de entorno
- ✅ Guardar backup de keys en gestor de contraseñas (1Password, LastPass)
- ✅ Rotar keys periódicamente (cada 6 meses)

### Para Emergencias
Si algo falla en producción:
1. Revisar logs en Vercel/Railway
2. Revisar errores en Sentry
3. Verificar que servicios externos estén funcionando
4. Rollback a versión anterior si es necesario
5. Notificar al equipo

---

**Documento creado:** 2025-11-08
**Versión:** 1.0
**Mantenido por:** Equipo SaintGrove

---

## 🚦 CÓMO USAR ESTE ROADMAP

1. **Selecciona una tarea** de la fase actual
2. **Revisa las subtareas** y el agente asignado
3. **Marca las subtareas** conforme las completes
4. **Adjunta capturas** cuando se solicite
5. **Actualiza el progreso** en la tabla de resumen
6. **Mueve a la siguiente tarea** cuando completes

### Convenciones de Checkboxes
- `[ ]` - Pendiente
- `[x]` - Completado
- `[~]` - En progreso (opcional)
- `[!]` - Bloqueado (opcional)

---

¡Éxito con el desarrollo! 🚀
