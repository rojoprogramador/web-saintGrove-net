# Tokens y Secrets - Documentación Completa SaintGrove-net

## Índice

1. [Introducción](#introducción)
2. [GitHub Actions (CI/CD)](#1-github-actions-cicd)
3. [Resend (Email Service)](#2-resend-email-service)
4. [Vercel (Deployment)](#3-vercel-deployment)
5. [Strapi (CMS Backend)](#4-strapi-cms-backend)
6. [Cloudinary (Media Storage)](#5-cloudinary-media-storage)
7. [Google Analytics](#6-google-analytics)
8. [Sentry (Monitoring)](#7-sentry-monitoring)
9. [SonarCloud (Code Quality)](#8-sonarcloud-code-quality)
10. [Codecov (Coverage)](#9-codecov-coverage-opcional)
11. [Mejores Prácticas de Seguridad](#mejores-prácticas-de-seguridad)

---

## Introducción

Este documento centraliza **TODOS** los tokens, API keys y secrets necesarios para SaintGrove-net a lo largo de todas las fases del proyecto.

### Convenciones

**Estado:**
- ✅ CONFIGURADO - Ya está activo y funcionando
- ⏳ PENDIENTE - Necesita ser configurado en esta fase
- 🔜 FUTURO - Se configurará en fases posteriores

**Formato:**
```
Nombre: NOMBRE_DEL_SECRET
Descripción: Qué hace
Estado: ✅ / ⏳ / 🔜
Fase: 1-5
Tipo: Secret / Variable / Environment Variable
Dónde: GitHub Secrets / Vercel / Archivo .env
```

---

## 1. GitHub Actions (CI/CD)

### 1.1 GITHUB_TOKEN

**Descripción:**
Token automático generado por GitHub para cada workflow run. Permite acceso al repositorio y sus recursos.

**Estado:** ✅ AUTOMÁTICO (no requiere configuración)

**Usos:**
- Crear comments en PRs
- Leer código del repositorio
- Ejecutar workflows
- Acceder a GitHub API

**Permisos:**
```yaml
permissions:
  contents: read
  pull-requests: write
  security-events: write
```

**Configuración:**
```yaml
# En workflow:
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

**Notas:**
- Se genera automáticamente
- Expira al final del workflow
- No necesita rotación

---

### 1.2 SONAR_TOKEN

**Descripción:**
Token de autenticación para SonarCloud. Permite que GitHub Actions envíe análisis de código a SonarCloud.

**Estado:** ⏳ PENDIENTE Fase 1

**Fase:** 1 (Fundamentos Críticos)

**Tipo:** Secret

**Dónde configurar:** GitHub Secrets

**Cómo obtenerlo:**

1. **Crear cuenta en SonarCloud:**
   - Ir a https://sonarcloud.io
   - Sign up with GitHub
   - Autorizar SonarCloud

2. **Crear organización:**
   - Organization Key: `saintgrove`
   - Display Name: `SaintGrove`
   - Plan: Free (para repos públicos)

3. **Importar proyecto:**
   - Analyze new project
   - Seleccionar `SaintGrove-net`
   - Project Key: `saintgrove_saintgrove-net`

4. **Generar token:**
   - Account → My Account → Security
   - Generate Tokens
   - Name: `SaintGrove-net-GitHub-Actions`
   - Type: `Project Analysis Token`
   - Expires: `Never` (o 90 days)
   - Click **Generate**
   - **COPIAR INMEDIATAMENTE** (no se puede ver de nuevo)

**Formato del token:**
```
sqp_1234567890abcdefghijklmnopqrstuvwxyz1234
```

**Configuración en GitHub:**

1. Repositorio → Settings
2. Secrets and variables → Actions
3. New repository secret
4. Name: `SONAR_TOKEN`
5. Secret: `[pegar token aquí]`
6. Add secret

**Uso en workflow:**
```yaml
- name: SonarCloud Scan
  uses: SonarSource/sonarcloud-github-action@master
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

**Permisos necesarios:**
- Analyze projects

**Rotación recomendada:** Anual

**Documentación:** Ver `specs/deployment/sonarcloud-setup.md`

---

### 1.3 CODECOV_TOKEN

**Descripción:**
Token para subir reportes de cobertura de tests a Codecov.

**Estado:** 🔜 OPCIONAL Fase 1

**Fase:** 1 (Fundamentos Críticos) - Opcional

**Tipo:** Secret

**Dónde configurar:** GitHub Secrets

**Cómo obtenerlo:**

1. **Crear cuenta en Codecov:**
   - Ir a https://codecov.io
   - Sign up with GitHub
   - Autorizar Codecov

2. **Agregar repositorio:**
   - Click en **"Add new repository"**
   - Buscar `SaintGrove-net`
   - Click en **Setup repo**

3. **Obtener token:**
   - En la página de setup, copiar el token mostrado
   - O ir a: Settings → General → Repository Upload Token

**Formato del token:**
```
a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

**Configuración en GitHub:**

1. Repositorio → Settings
2. Secrets and variables → Actions
3. New repository secret
4. Name: `CODECOV_TOKEN`
5. Secret: `[pegar token aquí]`
6. Add secret

**Uso en workflow:**
```yaml
- name: Upload coverage to Codecov
  uses: codecov/codecov-action@v4
  with:
    files: ./frontend/coverage/lcov.info
    token: ${{ secrets.CODECOV_TOKEN }}
    fail_ci_if_error: false
```

**Permisos necesarios:**
- Upload coverage reports

**Rotación recomendada:** Anual

**Nota:** Codecov es opcional. SonarCloud ya proporciona coverage tracking.

---

## 2. Resend (Email Service)

### 2.1 RESEND_API_KEY

**Descripción:**
API key para enviar emails transaccionales (formulario de contacto, newsletters).

**Estado:** ⏳ PENDIENTE Fase 1

**Fase:** 1 (Fundamentos Críticos)

**Tipo:** Secret

**Dónde configurar:**
- GitHub Secrets (para CI)
- Vercel Environment Variables (para producción)
- `.env.local` (desarrollo local)

**Cómo obtenerlo:**

1. **Crear cuenta en Resend:**
   - Ir a https://resend.com
   - Sign up (Email o GitHub)
   - Verificar email

2. **Obtener API Key:**
   - Dashboard → API Keys
   - Click en **"Create API Key"**
   - Name: `SaintGrove Production`
   - Permission: `Full access` (o `Sending access` si prefieres)
   - Domain: `saintgrove.net` (configúralo después)
   - Click **"Create"**
   - **COPIAR INMEDIATAMENTE**

**Formato del token:**
```
re_123456789_ABCdefGHIjklMNOpqrSTUvwxYZ
```

**Configuración en GitHub:**

1. Repositorio → Settings
2. Secrets and variables → Actions
3. New repository secret
4. Name: `RESEND_API_KEY`
5. Secret: `[pegar API key aquí]`
6. Add secret

**Configuración en Vercel:**

```bash
# Una vez que configures Vercel (Fase 5)
vercel env add RESEND_API_KEY

# Select environment:
# > Production
# > Preview
# > Development

# Paste value: re_123456789_ABC...
```

**Configuración en desarrollo (.env.local):**

```bash
# frontend/.env.local
RESEND_API_KEY=re_123456789_ABCdefGHIjklMNOpqrSTUvwxYZ
```

**Uso en código:**
```typescript
// lib/email/resend.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
```

**Verificación de dominio:**

Para enviar desde `@saintgrove.net`:

1. **Agregar dominio en Resend:**
   - Dashboard → Domains
   - Click **"Add Domain"**
   - Domain: `saintgrove.net`

2. **Configurar DNS records:**
   - Copiar los records mostrados (SPF, DKIM, DMARC)
   - Ir a tu DNS provider (ej. Cloudflare, Namecheap)
   - Agregar los records

3. **Verificar:**
   - Esperar propagación DNS (5-30 min)
   - Click **"Verify Domain"**
   - Status debe cambiar a ✅ Verified

**Records DNS necesarios:**
```
Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com ~all

Type: TXT
Name: resend._domainkey
Value: [valor proporcionado por Resend]

Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; ...
```

**Límites del plan gratuito:**
- 3,000 emails/mes
- 100 emails/día

**Upgrade cuando sea necesario:**
- $20/mes: 50,000 emails/mes

**Permisos necesarios:**
- Sending access

**Rotación recomendada:** Anual o cuando sospecha de compromiso

**Seguridad:**
- ✅ Nunca commitear en código
- ✅ Usar environment variables
- ✅ Diferentes keys para dev/prod
- ✅ Rotar si se expone

---

## 3. Vercel (Deployment)

### 3.1 VERCEL_TOKEN

**Descripción:**
Token de autenticación para Vercel CLI y deployments automáticos desde GitHub Actions.

**Estado:** 🔜 FUTURO Fase 5

**Fase:** 5 (Production Deployment)

**Tipo:** Secret

**Dónde configurar:** GitHub Secrets

**Cómo obtenerlo:**

1. **Crear cuenta en Vercel:**
   - Ir a https://vercel.com
   - Sign up with GitHub
   - Autorizar Vercel

2. **Generar token:**
   - Settings → Tokens
   - O ir a: https://vercel.com/account/tokens
   - Click **"Create"**
   - Token Name: `SaintGrove GitHub Actions`
   - Scope: `Full Account`
   - Expiration: `No expiration` (o 1 year)
   - Click **"Create Token"**
   - **COPIAR INMEDIATAMENTE**

**Formato del token:**
```
abc123XYZ789DEFghi456JKLmno789PQRstu012
```

**Configuración en GitHub:**

1. Repositorio → Settings
2. Secrets and variables → Actions
3. New repository secret
4. Name: `VERCEL_TOKEN`
5. Secret: `[pegar token aquí]`
6. Add secret

**Uso en workflow:**
```yaml
- name: Deploy to Vercel
  run: vercel deploy --prod
  env:
    VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
    VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
    VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

**Permisos necesarios:**
- Deploy projects
- Read project settings

**Rotación recomendada:** Anual

---

### 3.2 VERCEL_ORG_ID

**Descripción:**
ID de tu organización/cuenta en Vercel.

**Estado:** 🔜 FUTURO Fase 5

**Fase:** 5 (Production Deployment)

**Tipo:** Secret (o Variable)

**Dónde configurar:** GitHub Secrets

**Cómo obtenerlo:**

1. **Método 1: Desde Vercel UI**
   - Settings → General
   - Buscar "Team ID" o "Org ID"
   - Copiar el ID

2. **Método 2: Desde Vercel CLI**
   ```bash
   # Instalar Vercel CLI
   npm install -g vercel

   # Login
   vercel login

   # Ver org ID
   vercel whoami
   ```

**Formato:**
```
team_abc123XYZ789DEFghi456JKL
```

**Configuración en GitHub:**

1. Repositorio → Settings
2. Secrets and variables → Actions
3. New repository secret (o variable)
4. Name: `VERCEL_ORG_ID`
5. Secret: `[pegar org ID aquí]`
6. Add secret

**Rotación:** No aplicable (no es un secret sensible, pero se trata como tal)

---

### 3.3 VERCEL_PROJECT_ID

**Descripción:**
ID único de tu proyecto en Vercel.

**Estado:** 🔜 FUTURO Fase 5

**Fase:** 5 (Production Deployment)

**Tipo:** Secret (o Variable)

**Dónde configurar:** GitHub Secrets

**Cómo obtenerlo:**

1. **Método 1: Desde Vercel UI**
   - Ir a tu proyecto
   - Settings → General
   - Buscar "Project ID"
   - Copiar el ID

2. **Método 2: Desde archivo .vercel/project.json**
   ```bash
   # Después de link project
   vercel link

   # Ver project ID
   cat .vercel/project.json
   ```

**Formato:**
```
prj_abc123XYZ789DEFghi456JKL
```

**Configuración en GitHub:**

1. Repositorio → Settings
2. Secrets and variables → Actions
3. New repository secret (o variable)
4. Name: `VERCEL_PROJECT_ID`
5. Secret: `[pegar project ID aquí]`
6. Add secret

**Rotación:** No aplicable

---

## 4. Strapi (CMS Backend)

### 4.1 NEXT_PUBLIC_STRAPI_API_URL

**Descripción:**
URL del backend de Strapi (CMS). Variable pública expuesta al cliente.

**Estado:** 🔜 FUTURO Fase 2

**Fase:** 2 (Backend Integration)

**Tipo:** Environment Variable (pública)

**Dónde configurar:**
- `.env.local` (desarrollo)
- Vercel Environment Variables (producción)
- `.env.example` (template)

**Valores:**

```bash
# Desarrollo local
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337

# Producción
NEXT_PUBLIC_STRAPI_API_URL=https://cms.saintgrove.net
```

**Configuración en desarrollo:**

```bash
# frontend/.env.local
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
```

**Configuración en Vercel:**

```bash
vercel env add NEXT_PUBLIC_STRAPI_API_URL

# Production: https://cms.saintgrove.net
# Preview: https://cms-preview.saintgrove.net
# Development: http://localhost:1337
```

**Uso en código:**
```typescript
// lib/strapi/client.ts
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export const fetchFromStrapi = async (endpoint: string) => {
  const response = await fetch(`${STRAPI_URL}/api/${endpoint}`);
  return response.json();
};
```

**Nota:** Usa prefijo `NEXT_PUBLIC_` porque necesita estar disponible en el cliente.

**Rotación:** No aplicable (es una URL, no un secret)

---

### 4.2 STRAPI_API_TOKEN

**Descripción:**
Token de autenticación para acceder a la API de Strapi desde el servidor (Server-Side).

**Estado:** 🔜 FUTURO Fase 2

**Fase:** 2 (Backend Integration)

**Tipo:** Secret (server-side only)

**Dónde configurar:**
- `.env.local` (desarrollo)
- Vercel Environment Variables (producción)
- GitHub Secrets (CI)

**Cómo obtenerlo:**

1. **Acceder a Strapi Admin:**
   - http://localhost:1337/admin (desarrollo)
   - https://cms.saintgrove.net/admin (producción)
   - Login con credenciales admin

2. **Crear API Token:**
   - Settings → API Tokens
   - Click **"Create new API Token"**
   - Name: `Next.js Frontend`
   - Token type: `Read-Only` (o `Full Access` si necesario)
   - Token duration: `Unlimited`
   - Click **"Save"**
   - **COPIAR INMEDIATAMENTE**

**Formato del token:**
```
abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890
```

**Configuración en desarrollo:**

```bash
# frontend/.env.local
STRAPI_API_TOKEN=abcdef1234567890abcdef...
```

**Configuración en Vercel:**

```bash
vercel env add STRAPI_API_TOKEN

# Select: Production, Preview, Development
# Paste token
```

**Configuración en GitHub:**

```bash
# Settings → Secrets → Actions → New secret
Name: STRAPI_API_TOKEN
Secret: abcdef1234567890abcdef...
```

**Uso en código:**
```typescript
// lib/strapi/server.ts
// Solo en Server Components o API Routes
const headers = {
  Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
};

export const fetchFromStrapiServer = async (endpoint: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/${endpoint}`,
    { headers }
  );
  return response.json();
};
```

**Permisos recomendados:**
- `Read-Only` para frontend
- `Full Access` solo si necesitas crear/actualizar contenido desde frontend

**Rotación recomendada:** Cada 6 meses

**Seguridad:**
- ✅ Nunca usar en client components
- ✅ Solo en Server Components o API Routes
- ✅ Nunca exponer con `NEXT_PUBLIC_`
- ✅ Diferentes tokens para dev/prod

---

## 5. Cloudinary (Media Storage)

### 5.1 NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

**Descripción:**
Nombre de tu cuenta de Cloudinary. Necesario para cargar y mostrar imágenes.

**Estado:** 🔜 FUTURO Fase 2

**Fase:** 2 (Backend Integration) - Multimedia

**Tipo:** Environment Variable (pública)

**Dónde configurar:**
- `.env.local`
- Vercel Environment Variables
- `.env.example`

**Cómo obtenerlo:**

1. **Crear cuenta en Cloudinary:**
   - Ir a https://cloudinary.com
   - Sign up (email o GitHub)
   - Verificar email

2. **Obtener Cloud Name:**
   - Dashboard → Account Details
   - Cloud name: `saintgrove` (el que elegiste)

**Formato:**
```
saintgrove
```

**Configuración:**

```bash
# frontend/.env.local
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=saintgrove
```

**Uso en código:**
```typescript
// lib/cloudinary/config.ts
export const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

// Para URLs de imágenes
const imageUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/v1234567890/sample.jpg`;
```

**Rotación:** No aplicable (no es secret)

---

### 5.2 CLOUDINARY_API_KEY

**Descripción:**
API Key para autenticación con Cloudinary API.

**Estado:** 🔜 FUTURO Fase 2

**Fase:** 2 (Backend Integration) - Multimedia

**Tipo:** Secret (server-side)

**Dónde configurar:**
- `.env.local`
- Vercel Environment Variables
- GitHub Secrets

**Cómo obtenerlo:**

1. **Dashboard de Cloudinary:**
   - Dashboard → Account Details
   - API Key: `123456789012345`

**Formato:**
```
123456789012345
```

**Configuración:**

```bash
# frontend/.env.local
CLOUDINARY_API_KEY=123456789012345
```

**Uso en código:**
```typescript
// Solo en Server Components o API Routes
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
```

**Seguridad:**
- ✅ Nunca usar en cliente
- ✅ Solo en server-side

**Rotación recomendada:** Anual

---

### 5.3 CLOUDINARY_API_SECRET

**Descripción:**
API Secret para firmar requests a Cloudinary.

**Estado:** 🔜 FUTURO Fase 2

**Fase:** 2 (Backend Integration) - Multimedia

**Tipo:** Secret (server-side, altamente sensible)

**Dónde configurar:**
- `.env.local`
- Vercel Environment Variables
- GitHub Secrets

**Cómo obtenerlo:**

1. **Dashboard de Cloudinary:**
   - Dashboard → Account Details
   - API Secret: `abc123XYZ...` (oculto por defecto)
   - Click en el ícono de ojo para revelar
   - **COPIAR INMEDIATAMENTE**

**Formato:**
```
abc123XYZ789DEFghi456
```

**Configuración:**

```bash
# frontend/.env.local
CLOUDINARY_API_SECRET=abc123XYZ789DEFghi456
```

**Uso en código:**
```typescript
// Solo en Server Components o API Routes
// Ver ejemplo en CLOUDINARY_API_KEY
```

**Seguridad:**
- 🔴 **MUY SENSIBLE** - Nunca exponer
- ✅ Solo server-side
- ✅ No commitear nunca
- ✅ Rotar si se compromete

**Rotación recomendada:** Anual o inmediatamente si se expone

---

## 6. Google Analytics

### 6.1 NEXT_PUBLIC_GA_ID

**Descripción:**
ID de medición de Google Analytics 4 (GA4).

**Estado:** 🔜 FUTURO Fase 3

**Fase:** 3 (Performance & SEO)

**Tipo:** Environment Variable (pública)

**Dónde configurar:**
- `.env.local`
- Vercel Environment Variables
- `.env.example`

**Cómo obtenerlo:**

1. **Crear cuenta de Google Analytics:**
   - Ir a https://analytics.google.com
   - Crear cuenta y propiedad

2. **Configurar propiedad GA4:**
   - Admin → Data Streams
   - Click **"Add stream"** → Web
   - Website URL: `https://saintgrove.net`
   - Stream name: `SaintGrove Web`
   - Click **"Create stream"**

3. **Obtener Measurement ID:**
   - En stream details
   - Measurement ID: `G-XXXXXXXXXX`
   - Copiar

**Formato:**
```
G-ABC123XYZ4
```

**Configuración:**

```bash
# frontend/.env.local
NEXT_PUBLIC_GA_ID=G-ABC123XYZ4
```

**Uso en código:**
```typescript
// lib/analytics/google.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// app/layout.tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
  strategy="afterInteractive"
/>
```

**Rotación:** No aplicable (es público)

**Nota:** Considera usar Google Tag Manager en su lugar.

---

### 6.2 NEXT_PUBLIC_GTM_ID

**Descripción:**
ID de Google Tag Manager para gestión centralizada de tags.

**Estado:** 🔜 FUTURO Fase 3

**Fase:** 3 (Performance & SEO)

**Tipo:** Environment Variable (pública)

**Dónde configurar:**
- `.env.local`
- Vercel Environment Variables
- `.env.example`

**Cómo obtenerlo:**

1. **Crear cuenta de Google Tag Manager:**
   - Ir a https://tagmanager.google.com
   - Create Account
   - Account Name: `SaintGrove`
   - Container Name: `SaintGrove Web`
   - Target platform: `Web`
   - Click **"Create"**

2. **Obtener Container ID:**
   - Container ID: `GTM-XXXXXXX`
   - Copiar

**Formato:**
```
GTM-ABC1234
```

**Configuración:**

```bash
# frontend/.env.local
NEXT_PUBLIC_GTM_ID=GTM-ABC1234
```

**Uso en código:**
```typescript
// lib/analytics/gtm.ts
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

// app/layout.tsx
<Script id="google-tag-manager" strategy="afterInteractive">
  {`
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${GTM_ID}');
  `}
</Script>
```

**Rotación:** No aplicable

---

## 7. Sentry (Monitoring)

### 7.1 NEXT_PUBLIC_SENTRY_DSN

**Descripción:**
DSN (Data Source Name) de Sentry para capturar errores en producción.

**Estado:** 🔜 FUTURO Fase 5

**Fase:** 5 (Production Deployment) - Monitoring

**Tipo:** Environment Variable (pública, pero específica)

**Dónde configurar:**
- `.env.local`
- Vercel Environment Variables
- `.env.example`

**Cómo obtenerlo:**

1. **Crear cuenta en Sentry:**
   - Ir a https://sentry.io
   - Sign up with GitHub
   - Create Organization: `SaintGrove`

2. **Crear proyecto:**
   - Platform: `Next.js`
   - Project name: `saintgrove-net`
   - Click **"Create Project"**

3. **Obtener DSN:**
   - Settings → Projects → saintgrove-net → Client Keys (DSN)
   - DSN: `https://abc123...@o123456.ingest.sentry.io/7654321`
   - Copiar

**Formato:**
```
https://abc123def456ghi789jkl012mno345@o1234567.ingest.sentry.io/9876543
```

**Configuración:**

```bash
# frontend/.env.local
NEXT_PUBLIC_SENTRY_DSN=https://abc123...@o123456.ingest.sentry.io/7654321
```

**Uso en código:**
```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

**Nota:** DSN es público y está diseñado para ser expuesto.

**Rotación:** No necesaria (pero puede crear nuevo DSN si es necesario)

---

### 7.2 SENTRY_AUTH_TOKEN

**Descripción:**
Token de autenticación para subir source maps a Sentry.

**Estado:** 🔜 FUTURO Fase 5

**Fase:** 5 (Production Deployment) - Monitoring

**Tipo:** Secret

**Dónde configurar:**
- `.env.local`
- Vercel Environment Variables
- GitHub Secrets

**Cómo obtenerlo:**

1. **Sentry Dashboard:**
   - Settings → Account → API → Auth Tokens
   - Click **"Create New Token"**
   - Token name: `SaintGrove Release Management`
   - Scopes:
     - ✅ `project:read`
     - ✅ `project:releases`
     - ✅ `org:read`
   - Click **"Create Token"**
   - **COPIAR INMEDIATAMENTE**

**Formato:**
```
sntrys_abc123XYZ789DEFghi456JKLmno789PQRstu012VWXyz345
```

**Configuración:**

```bash
# frontend/.env.local
SENTRY_AUTH_TOKEN=sntrys_abc123...
```

**Uso:**
```bash
# next.config.js (con Sentry Webpack Plugin)
# O en build step para subir source maps
```

**Permisos necesarios:**
- `project:read`
- `project:releases`
- `org:read`

**Rotación recomendada:** Anual

**Seguridad:**
- ✅ No commitear
- ✅ Solo para build/CI

---

### 7.3 SENTRY_PROJECT

**Descripción:**
Nombre del proyecto en Sentry.

**Estado:** 🔜 FUTURO Fase 5

**Fase:** 5 (Production Deployment) - Monitoring

**Tipo:** Variable (no sensible)

**Cómo obtener:**
- Es el nombre que elegiste al crear el proyecto
- Ejemplo: `saintgrove-net`

**Configuración:**

```bash
# frontend/.env.local
SENTRY_PROJECT=saintgrove-net
```

**Rotación:** No aplicable

---

### 7.4 SENTRY_ORG

**Descripción:**
Nombre de la organización en Sentry.

**Estado:** 🔜 FUTURO Fase 5

**Fase:** 5 (Production Deployment) - Monitoring

**Tipo:** Variable (no sensible)

**Cómo obtener:**
- Es el nombre que elegiste al crear la organización
- Ejemplo: `saintgrove`

**Configuración:**

```bash
# frontend/.env.local
SENTRY_ORG=saintgrove
```

**Rotación:** No aplicable

---

## 8. SonarCloud (Code Quality)

**Ver detalle completo en Sección 1.2 SONAR_TOKEN**

---

## 9. Codecov (Coverage) - Opcional

**Ver detalle completo en Sección 1.3 CODECOV_TOKEN**

---

## Resumen por Fase

### Fase 1: Fundamentos Críticos ⏳

**Configurar ahora:**
- ✅ `GITHUB_TOKEN` (automático)
- ⏳ `SONAR_TOKEN` (SonarCloud)
- ⏳ `RESEND_API_KEY` (Email)
- 🔜 `CODECOV_TOKEN` (opcional)

### Fase 2: Backend Integration 🔜

**Configurar en Fase 2:**
- `NEXT_PUBLIC_STRAPI_API_URL`
- `STRAPI_API_TOKEN`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

### Fase 3: Performance & SEO 🔜

**Configurar en Fase 3:**
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_GTM_ID`

### Fase 5: Production Deployment 🔜

**Configurar en Fase 5:**
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `NEXT_PUBLIC_SENTRY_DSN`
- `SENTRY_AUTH_TOKEN`
- `SENTRY_PROJECT`
- `SENTRY_ORG`

---

## Template .env Files

### frontend/.env.example

```bash
# ================================================
# SAINTGROVE.NET - ENVIRONMENT VARIABLES TEMPLATE
# ================================================

# --------------------------------------------
# FASE 1: Fundamentos Críticos
# --------------------------------------------

# Resend - Email Service
RESEND_API_KEY=re_your_resend_api_key_here

# --------------------------------------------
# FASE 2: Backend Integration
# --------------------------------------------

# Strapi CMS
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your_strapi_api_token_here

# Cloudinary - Media Storage
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# --------------------------------------------
# FASE 3: Performance & SEO
# --------------------------------------------

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
# O Google Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# --------------------------------------------
# FASE 5: Production & Monitoring
# --------------------------------------------

# Sentry - Error Tracking
NEXT_PUBLIC_SENTRY_DSN=https://xxx@o123456.ingest.sentry.io/7654321
SENTRY_AUTH_TOKEN=sntrys_your_auth_token_here
SENTRY_PROJECT=saintgrove-net
SENTRY_ORG=saintgrove

# --------------------------------------------
# General
# --------------------------------------------

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://saintgrove.net
NODE_ENV=development
```

### frontend/.env.local (tu archivo personal)

```bash
# Copia .env.example a .env.local y completa con valores reales
# .env.local está en .gitignore - nunca lo comitees

# Fase 1
RESEND_API_KEY=re_abc123...

# Agregar más según avanzas en las fases
```

---

## Mejores Prácticas de Seguridad

### 1. Nunca Commitear Secrets

**Archivo .gitignore:**
```gitignore
# Environment variables
.env
.env.local
.env.*.local
.env.development.local
.env.test.local
.env.production.local

# Vercel
.vercel

# Sentry
.sentryclirc
```

### 2. Usar Diferentes Secrets para Diferentes Ambientes

```bash
# Desarrollo
RESEND_API_KEY=re_dev_123...

# Production
RESEND_API_KEY=re_prod_456...
```

### 3. Principio de Menor Privilegio

```
✅ Read-only tokens cuando sea posible
✅ Scope limitado a lo necesario
✅ Permisos mínimos requeridos
```

### 4. Rotación Regular

```
🔴 Críticos (API secrets): Cada 6-12 meses
🟡 Moderados (Tokens CI): Anualmente
🟢 Bajo riesgo (IDs públicos): No necesaria
```

### 5. Monitoreo de Accesos

```
✅ Revisar logs de acceso regularmente
✅ Alerts para uso anormal
✅ Auditoría de tokens activos
```

### 6. Respuesta a Incidentes

**Si un secret se compromete:**

1. **Inmediatamente:**
   - Revocar/rotar el secret comprometido
   - Generar nuevo secret
   - Actualizar en todos los ambientes

2. **Investigar:**
   - Revisar logs de acceso
   - Identificar posible uso no autorizado
   - Documentar incidente

3. **Prevenir:**
   - Agregar checks para evitar commits de secrets
   - Implementar git hooks
   - Educar al equipo

### 7. Herramientas de Detección

**git-secrets:**
```bash
# Instalar
brew install git-secrets  # macOS
# o descargar de GitHub

# Setup
git secrets --install
git secrets --register-aws
```

**GitGuardian:**
- Monitorea commits automáticamente
- Alerta si detecta secrets
- Gratuito para repos públicos

**TruffleHog:**
```bash
# Escanear repositorio
trufflehog git file://. --only-verified
```

---

## Checklist de Seguridad

### Antes de Configurar un Secret:

- [ ] ¿Es realmente necesario?
- [ ] ¿Necesita ser un secret o puede ser una variable pública?
- [ ] ¿Qué permisos mínimos necesita?
- [ ] ¿Tiene fecha de expiración?
- [ ] ¿Está documentado dónde se usa?

### Después de Configurar:

- [ ] Secret agregado a GitHub Secrets (si aplica)
- [ ] Secret agregado a Vercel (si aplica)
- [ ] `.env.example` actualizado (sin valor real)
- [ ] Documentado en este archivo
- [ ] `.gitignore` cubre archivos con secrets
- [ ] Team informado de nuevo secret

### Mantenimiento Regular:

- [ ] Auditoría trimestral de secrets activos
- [ ] Revocar secrets no utilizados
- [ ] Rotar secrets según schedule
- [ ] Revisar permisos de tokens
- [ ] Actualizar documentación

---

## FAQs

### ¿Cuál es la diferencia entre Secret y Variable?

**Secret:**
- Sensible, no debe exponerse
- Encriptado en GitHub/Vercel
- No se puede leer después de configurar
- Ejemplos: API keys, tokens, passwords

**Variable:**
- No sensible, puede ser público
- Visible en configuración
- Ejemplos: URLs, IDs, nombres

### ¿Cuándo usar NEXT_PUBLIC_ prefix?

**Usa `NEXT_PUBLIC_` cuando:**
- ✅ Necesita estar disponible en el cliente
- ✅ No es sensible (URLs públicas, IDs públicos)
- ✅ Se usa en Client Components

**NO uses `NEXT_PUBLIC_` cuando:**
- ❌ Es un secret (API keys, tokens)
- ❌ Solo se necesita en server-side
- ❌ Contiene información sensible

### ¿Cómo sé si un secret se expuso?

**Señales:**
- GitGuardian alerta
- Requests no autorizados en logs
- Uso inusual del servicio
- Notificación del proveedor (Resend, Vercel, etc.)

**Acción inmediata:**
1. Revocar secret
2. Generar nuevo
3. Actualizar en todos lados
4. Investigar impacto

### ¿Puedo compartir .env.local con mi equipo?

**NO. ❌**

**En su lugar:**
1. Usa `.env.example` como template
2. Documenta cómo obtener cada secret
3. Cada desarrollador configura su propio `.env.local`
4. Usa un password manager del equipo si necesario (1Password Teams, etc.)

---

## Recursos

### Herramientas

- [1Password](https://1password.com) - Password manager
- [GitGuardian](https://www.gitguardian.com) - Secret scanning
- [git-secrets](https://github.com/awslabs/git-secrets) - Prevent commits of secrets
- [TruffleHog](https://github.com/trufflesecurity/trufflehog) - Find secrets in repos

### Documentación

- [GitHub Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

### Best Practices

- [OWASP Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [12 Factor App - Config](https://12factor.net/config)

---

## Changelog

**2025-11-10 - v1.0:**
- Documentación inicial completa
- 20+ secrets documentados
- Todas las fases cubiertas (1-5)
- Guías paso a paso para cada secret

**Próxima actualización:** Fase 2 - Cuando se configure Strapi

---

**Última Actualización:** 2025-11-10
**Versión:** 1.0
**Mantenido Por:** SaintGrove DevOps Team
**Confidencialidad:** INTERNO - No compartir públicamente
