# 🔐 Environment Variables Guide - SaintGrove-net

> **Guía completa para configurar variables de entorno**
> **Última actualización:** 2025-11-10
> **Versión:** 1.2
> **Estado:** ✅ Tarea 1.1 COMPLETADA - Variables configuradas y build funcionando

---

## 📋 ÍNDICE

1. [Configuración Inicial](#-configuración-inicial)
2. [Frontend Variables](#-frontend-variables-nextjs)
3. [Backend Variables (Strapi)](#-backend-variables-strapi---fase-2)
4. [Variables por Entorno](#-variables-por-entorno)
5. [Seguridad](#-seguridad)
6. [Troubleshooting](#-troubleshooting)

---

## 🚀 CONFIGURACIÓN INICIAL

### 1. Frontend (.env.local)

**Ubicación:** `D:\Conocimientos Programacion\SaintGrove-net\frontend\.env.local`

```bash
# 1. Navegar al directorio frontend
cd frontend

# 2. Crear archivo .env.local (copia de .env.example)
cp .env.example .env.local

# 3. Editar con tu IDE favorito
code .env.local
```

### 2. ¿Qué Archivo Usar?

| Archivo | Propósito | Commitear? | Cuándo |
|---------|-----------|------------|--------|
| `.env.example` | Template con todas las variables | ✅ SÍ | Siempre actualizado |
| `.env.local` | Desarrollo local | ❌ NO | Tu máquina |
| `.env.development` | Desarrollo (opcional) | ❌ NO | Si tienes múltiples configs |
| `.env.production` | Producción | ❌ NO | Servidor/Vercel |
| `.env.test` | Testing | ❌ NO | CI/CD tests |

### 3. Orden de Prioridad

Next.js carga variables en este orden (último gana):
```
.env                    # Todas las variables por defecto
.env.local              # Override local (gitignored)
.env.[environment]      # .env.development o .env.production
.env.[environment].local # Override por entorno
```

---

## 🎨 FRONTEND VARIABLES (Next.js)

### Variables Actuales (Fase 1)

```bash
#########################################
# FRONTEND - NEXT.JS CONFIGURATION
#########################################

# ===========================================
# SITE CONFIGURATION
# ===========================================
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="SaintGrove - Desarrollo de Software y Marketing Digital"

# ===========================================
# EMAIL SERVICE (RESEND) - FASE 1
# ===========================================
# Obtener en: https://resend.com/api-keys
# Instrucciones en: specs/ROADMAP.md → Tarea 1.2
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Email de envío (después de verificar dominio)
RESEND_FROM_EMAIL=contacto@saintgrove.net
# Si NO tienes dominio verificado, usa:
# RESEND_FROM_EMAIL=onboarding@resend.dev

# Email de destino para formulario de contacto
CONTACT_TO_EMAIL=info@saintgrove.net

# ===========================================
# ANALYTICS (GOOGLE ANALYTICS 4) - FASE 3
# ===========================================
# Obtener en: https://analytics.google.com
# Formato: G-XXXXXXXXXX
NEXT_PUBLIC_GA_ID=

# Google Tag Manager (opcional)
NEXT_PUBLIC_GTM_ID=

# ===========================================
# STRAPI CMS - FASE 2
# ===========================================
# URL del API de Strapi
# Desarrollo local:
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
# Producción (cuando se despliegue):
# NEXT_PUBLIC_STRAPI_API_URL=https://cms.saintgrove.net

# Token de autenticación de Strapi (generar en Strapi admin)
STRAPI_API_TOKEN=

# ===========================================
# CLOUDINARY (MEDIA STORAGE) - FASE 2
# ===========================================
# Obtener en: https://cloudinary.com/console
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# ===========================================
# MONITORING (SENTRY) - FASE 5
# ===========================================
# Obtener en: https://sentry.io
# Formato: https://xxx@xxx.ingest.sentry.io/xxx
NEXT_PUBLIC_SENTRY_DSN=

# Environment name
NEXT_PUBLIC_SENTRY_ENVIRONMENT=development

# ===========================================
# FEATURE FLAGS (OPCIONAL)
# ===========================================
NEXT_PUBLIC_ENABLE_BLOG=false
NEXT_PUBLIC_ENABLE_PORTFOLIO=false
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

### Variables por Fase de Desarrollo

#### FASE 1 (Actual - Próximas 2 semanas)
```bash
# ✅ NECESARIAS AHORA:
RESEND_API_KEY=                    # Email integration
CONTACT_TO_EMAIL=info@saintgrove.net
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### FASE 2 (Semanas 3-5)
```bash
# ✅ AGREGAR EN FASE 2:
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=                  # Generar en Strapi
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

#### FASE 3 (Semana 6)
```bash
# ✅ AGREGAR EN FASE 3:
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=               # Opcional
```

#### FASE 5 (Deployment)
```bash
# ✅ AGREGAR EN FASE 5:
NEXT_PUBLIC_SENTRY_DSN=
NEXT_PUBLIC_SITE_URL=https://saintgrove.net  # Producción
```

---

## 🗄️ BACKEND VARIABLES (Strapi) - FASE 2

### Ubicación

**Archivo:** `D:\Conocimientos Programacion\SaintGrove-net\cms\.env`

### Variables de Strapi

```bash
#########################################
# STRAPI CMS CONFIGURATION
#########################################

# ===========================================
# SERVER
# ===========================================
HOST=0.0.0.0
PORT=1337

# ===========================================
# ADMIN PANEL
# ===========================================
# URL del admin panel (cambiar en producción)
ADMIN_URL=/admin

# Secret para JWT tokens (GENERAR UNO NUEVO)
# Usar: openssl rand -base64 32
APP_KEYS=toBeModified1,toBeModified2
API_TOKEN_SALT=toBeModified
ADMIN_JWT_SECRET=toBeModified
JWT_SECRET=toBeModified

# ===========================================
# DATABASE (POSTGRESQL)
# ===========================================
# Desarrollo local
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=saintgrove_db
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=TU_PASSWORD_AQUI
DATABASE_SSL=false

# Producción (Railway/DigitalOcean/AWS)
# DATABASE_URL=postgresql://user:password@host:port/database?ssl=true

# ===========================================
# CLOUDINARY (MEDIA STORAGE)
# ===========================================
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret

# ===========================================
# CORS
# ===========================================
# Permitir frontend en desarrollo
CLIENT_URL=http://localhost:3000
# Producción:
# CLIENT_URL=https://saintgrove.net

# ===========================================
# EMAIL (OPCIONAL - PARA STRAPI)
# ===========================================
# Si Strapi necesita enviar emails (reset password, etc.)
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_USERNAME=resend
SMTP_PASSWORD=YOUR_RESEND_API_KEY
EMAIL_FROM=noreply@saintgrove.net
```

### Generar Secrets Seguros

```bash
# Generar secrets aleatorios (Git Bash / WSL)
openssl rand -base64 32

# O usar Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# O usar generador online (solo para desarrollo)
# https://generate-secret.vercel.app/32
```

---

## 🌍 VARIABLES POR ENTORNO

### Development (Local)

```bash
# frontend/.env.local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
NEXT_PUBLIC_SENTRY_ENVIRONMENT=development
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

### Production (Vercel)

```bash
# Configurar en Vercel Dashboard
NEXT_PUBLIC_SITE_URL=https://saintgrove.net
NEXT_PUBLIC_STRAPI_API_URL=https://cms.saintgrove.net
NEXT_PUBLIC_SENTRY_ENVIRONMENT=production
NEXT_PUBLIC_ENABLE_ANALYTICS=true

# Secrets (no exponer con NEXT_PUBLIC_)
RESEND_API_KEY=re_prod_xxxxxxxxxxxx
STRAPI_API_TOKEN=bearer_prod_xxxxxxxxxxxx
```

### Testing (CI/CD)

```bash
# frontend/.env.test
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
# Usar mocks en lugar de servicios reales
```

---

## 🔒 SEGURIDAD

### ✅ BUENAS PRÁCTICAS

1. **NUNCA Commitear Variables Reales**
   ```bash
   # .gitignore ya incluye:
   .env
   .env.local
   .env*.local
   .env.production
   ```

2. **Usar NEXT_PUBLIC_ Solo Cuando Necesario**
   ```bash
   # ❌ INCORRECTO (expone secret al cliente)
   NEXT_PUBLIC_RESEND_API_KEY=re_xxxxx

   # ✅ CORRECTO (solo servidor)
   RESEND_API_KEY=re_xxxxx

   # ✅ CORRECTO (necesita estar en cliente)
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

3. **Rotar Secrets Regularmente**
   - Cada 6 meses: rotar API keys
   - Inmediatamente si hay exposición accidental

4. **Usar Secrets Managers en Producción**
   - Vercel: Variables de entorno en dashboard
   - Railway: Variables en project settings
   - AWS: AWS Secrets Manager
   - No usar .env files en producción

5. **Validar Variables al Inicio**
   ```typescript
   // lib/utils/env.ts
   export function validateEnv() {
     const required = [
       'NEXT_PUBLIC_SITE_URL',
       'RESEND_API_KEY',
     ];

     for (const key of required) {
       if (!process.env[key]) {
         throw new Error(`Missing required env var: ${key}`);
       }
     }
   }
   ```

### ❌ QUÉ NO HACER

```bash
# ❌ NO commitear valores reales
RESEND_API_KEY=re_real_key_12345  # En .env.example

# ❌ NO usar valores de ejemplo en producción
ADMIN_JWT_SECRET=toBeModified

# ❌ NO exponer secrets al cliente
NEXT_PUBLIC_DATABASE_PASSWORD=xxx

# ❌ NO hardcodear en código
const apiKey = 're_xxxxx';  // NUNCA hacer esto
```

---

## 🔍 ACCEDER A VARIABLES EN CÓDIGO

### En Next.js (Frontend)

```typescript
// ✅ Variables públicas (cliente)
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const gaId = process.env.NEXT_PUBLIC_GA_ID;

// ✅ Variables privadas (solo server components y API routes)
// app/api/contact/route.ts
const apiKey = process.env.RESEND_API_KEY;

// ❌ NO funcionará en client components
'use client';
const key = process.env.RESEND_API_KEY;  // undefined
```

### En API Routes

```typescript
// app/api/contact/route.ts
export async function POST(request: Request) {
  // ✅ Acceso seguro (server-side)
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error('RESEND_API_KEY no configurada');
    return Response.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }

  // Usar apiKey...
}
```

### En Strapi

```javascript
// cms/config/plugins.js
module.exports = {
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
      },
    },
  },
};
```

---

## 🆘 TROUBLESHOOTING

### Variable No Se Carga

**Problema:**
```typescript
console.log(process.env.MY_VAR);  // undefined
```

**Soluciones:**

1. **Verificar que existe en .env.local**
   ```bash
   cat .env.local | grep MY_VAR
   ```

2. **Reiniciar servidor de desarrollo**
   ```bash
   # Next.js no hot-reload variables de entorno
   # Ctrl+C para detener
   npm run dev
   ```

3. **Verificar NEXT_PUBLIC_ prefix**
   ```bash
   # En client components, DEBE tener prefix:
   NEXT_PUBLIC_MY_VAR=value
   ```

4. **Verificar build**
   ```bash
   # Variables se bake-in durante build
   npm run build
   ```

### Error "Missing API Key"

**Problema:**
```
Error: Missing required env var: RESEND_API_KEY
```

**Solución:**
```bash
# 1. Verificar que existe
cat .env.local

# 2. Agregar si falta
echo "RESEND_API_KEY=re_xxxxx" >> .env.local

# 3. Reiniciar server
npm run dev
```

### Variables No Actualizan

**Problema:**
Variables antiguas persisten después de cambiar .env.local

**Solución:**
```bash
# 1. Limpiar .next cache
rm -rf .next

# 2. Rebuild
npm run build
npm run dev
```

### Vercel Deploy con Variables Faltantes

**Problema:**
Deploy falla por variables de entorno faltantes

**Solución:**
```bash
# 1. Ir a Vercel Dashboard
# 2. Project Settings → Environment Variables
# 3. Agregar TODAS las variables
# 4. Importante: Seleccionar environments (Production, Preview, Development)
# 5. Redeploy
```

---

## 📋 CHECKLIST DE CONFIGURACIÓN

### Desarrollo Local (Fase 1)

- [x] Creado `frontend/.env.local` (Completado 2025-11-10)
- [x] Creado `frontend/.env.example` actualizado (Completado 2025-11-10)
- [x] Configurado `NEXT_PUBLIC_SITE_URL` = http://localhost:3000
- [x] Configurado `CONTACT_TO_EMAIL` = info@saintgrove.net
- [x] Verificado que `.env.local` está en `.gitignore`
- [x] Build de Next.js funciona correctamente
- [ ] Configurado `RESEND_API_KEY` (Pendiente - Tarea 1.2)
- [ ] Reiniciado dev server después de obtener API key
- [ ] Verificado que formulario de contacto funciona

### Antes de Commit

- [ ] Verificado que `.env.local` está en `.gitignore`
- [ ] Actualizado `.env.example` si agregaste variables
- [ ] No hay API keys reales en código
- [ ] Documentadas nuevas variables en este archivo

### Deployment a Producción (Fase 5)

- [ ] Variables configuradas en Vercel Dashboard
- [ ] Variables de producción diferentes a desarrollo
- [ ] Secrets rotados (no usar mismos que desarrollo)
- [ ] Verificado que deploy funciona con nuevas variables
- [ ] Monitoring configurado

---

## 🔗 RECURSOS

### Obtener API Keys

- **Resend:** https://resend.com/api-keys (Fase 1)
- **Cloudinary:** https://cloudinary.com/console (Fase 2)
- **Google Analytics:** https://analytics.google.com (Fase 3)
- **Sentry:** https://sentry.io/settings/projects/ (Fase 5)

### Documentación Oficial

- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Strapi Environment Configuration](https://docs.strapi.io/dev-docs/configurations/environment)

### Guías Relacionadas

- [ROADMAP - Tarea 1.1](../ROADMAP.md#11-configuración-de-variables-de-entorno) - Configuración inicial
- [ROADMAP - Tarea 1.2](../ROADMAP.md#12-email-integration-con-resend) - Email con Resend
- [Development Guide](./development.md) - Setup general

---

## 📝 TEMPLATE .env.example

```bash
#########################################
# SAINTGROVE-NET - ENVIRONMENT VARIABLES
#########################################
# Copiar este archivo como .env.local y completar los valores
# NUNCA commitear .env.local al repositorio

# ===========================================
# FASE 1 - NECESARIAS AHORA
# ===========================================
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=
CONTACT_TO_EMAIL=info@saintgrove.net

# ===========================================
# FASE 2 - BACKEND (Próximamente)
# ===========================================
NEXT_PUBLIC_STRAPI_API_URL=
STRAPI_API_TOKEN=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# ===========================================
# FASE 3 - ANALYTICS (Próximamente)
# ===========================================
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GTM_ID=

# ===========================================
# FASE 5 - MONITORING (Próximamente)
# ===========================================
NEXT_PUBLIC_SENTRY_DSN=
NEXT_PUBLIC_SENTRY_ENVIRONMENT=development

# ===========================================
# FEATURE FLAGS
# ===========================================
NEXT_PUBLIC_ENABLE_BLOG=false
NEXT_PUBLIC_ENABLE_PORTFOLIO=false
```

---

**Última actualización:** 2025-11-10
**Mantenido por:** Equipo SaintGrove - IntegradorBACKEND
**Versión:** 1.2
