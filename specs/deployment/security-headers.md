# Security Headers Documentation

## Overview

Este documento explica la implementación de security headers HTTP en SaintGrove-net para proteger la aplicación contra vulnerabilidades comunes. Los headers están configurados en `frontend/next.config.ts` y se aplican a todas las rutas (`/:path*`).

## Fecha de Implementación
- **Fecha:** 2025-11-10
- **Fase:** Fase 1 - Fundamentos Críticos
- **Tarea:** 1.5 - Security Headers

## Headers Implementados

### 1. X-Frame-Options: DENY

**Propósito:** Protección contra clickjacking

**Qué hace:**
- Previene que el sitio web sea embebido en un iframe
- Evita ataques de clickjacking donde usuarios son engañados para hacer click en elementos ocultos

**Por qué es importante:**
- Los ataques de clickjacking pueden robar credenciales, realizar acciones no autorizadas, o instalar malware
- Al usar `DENY`, ningún sitio (ni siquiera el propio) puede embeber la página en un iframe

**Alternativas consideradas:**
- `SAMEORIGIN`: Permitiría iframes del mismo dominio
- `ALLOW-FROM`: Deprecated, no recomendado

**Decisión:** `DENY` es la opción más segura para este proyecto

### 2. X-Content-Type-Options: nosniff

**Propósito:** Prevenir MIME type sniffing

**Qué hace:**
- Fuerza al browser a respetar el Content-Type declarado
- Previene que el browser "adivine" el tipo de archivo

**Por qué es importante:**
- Sin este header, un browser podría ejecutar un archivo JavaScript disfrazado como imagen
- Previene ataques XSS donde archivos maliciosos son subidos con tipos MIME incorrectos

**Ejemplo de ataque prevenido:**
```
// Sin nosniff:
<img src="malicious.jpg">  // Browser detecta que es JS y lo ejecuta

// Con nosniff:
<img src="malicious.jpg">  // Browser respeta Content-Type: image/jpeg y NO ejecuta
```

### 3. X-DNS-Prefetch-Control: on

**Propósito:** Habilitar DNS prefetching para mejor performance

**Qué hace:**
- Permite que el browser resuelva DNS de dominios externos antes de que sean necesarios
- Reduce latencia cuando el usuario hace click en links externos

**Por qué es importante:**
- Mejora performance sin comprometer seguridad
- Especialmente útil para recursos como Cloudinary, Vercel Analytics, etc.

**Trade-off:**
- Puede exponer qué dominios externos usa el sitio
- Considerado aceptable para este proyecto

### 4. Referrer-Policy: origin-when-cross-origin

**Propósito:** Controlar qué información de referrer se envía

**Qué hace:**
- Envía la URL completa para requests del mismo origen
- Envía solo el origen (dominio) para requests cross-origin
- No envía referrer a sitios HTTP (solo HTTPS)

**Por qué es importante:**
- Balance entre privacidad y funcionalidad
- Protege información sensible en URLs (tokens, IDs) de ser expuestos a terceros
- Permite analytics y tracking legítimo

**Ejemplo:**
```
// Navegación dentro de saintgrove.net:
Referrer: https://saintgrove.net/servicios/desarrollo-web?utm_source=google

// Navegación a sitio externo:
Referrer: https://saintgrove.net
```

### 5. Permissions-Policy

**Propósito:** Controlar qué APIs del browser están disponibles

**Qué hace:**
- Deshabilita APIs no usadas por la aplicación
- Previene que scripts maliciosos accedan a hardware/datos sensibles

**Headers configurados:**
```
camera=()           // Deshabilita acceso a cámara
microphone=()       // Deshabilita acceso a micrófono
geolocation=()      // Deshabilita acceso a ubicación
interest-cohort=()  // Deshabilita FLoC (Google's tracking)
```

**Por qué es importante:**
- Principio de privilegio mínimo: solo habilitar lo necesario
- Protege privacidad de usuarios
- Previene explotación de vulnerabilidades XSS que intentan acceder a hardware

**Futuro:** En fases posteriores, si necesitamos geolocalización u otras APIs, se habilitarán específicamente

### 6. Content-Security-Policy (CSP)

**Propósito:** Protección robusta contra XSS y control de recursos

**Qué hace:**
- Define qué recursos pueden ser cargados y ejecutados
- Previene ejecución de código malicioso inyectado
- Control granular sobre scripts, estilos, imágenes, fonts, etc.

**Configuración actual:**

```csp
default-src 'self';
  // Por defecto, solo recursos del mismo origen

script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com;
  // Scripts: mismo origen, Vercel analytics, y temporalmente unsafe-eval/inline

style-src 'self' 'unsafe-inline';
  // Estilos: mismo origen y inline (requerido por Framer Motion)

img-src 'self' blob: data: https: res.cloudinary.com;
  // Imágenes: mismo origen, data URIs, blobs, HTTPS, y Cloudinary

font-src 'self' data:;
  // Fonts: mismo origen y data URIs

connect-src 'self' https://vercel.live https://vitals.vercel-insights.com;
  // AJAX/WebSocket: mismo origen y Vercel services

frame-ancestors 'none';
  // No permitir embeber en iframes (duplica X-Frame-Options)

base-uri 'self';
  // Tag <base> solo puede usar mismo origen

form-action 'self';
  // Forms solo pueden enviar a mismo origen

upgrade-insecure-requests;
  // Actualizar automáticamente HTTP a HTTPS
```

### TRADE-OFFS IMPORTANTES EN CSP

#### 'unsafe-inline' en style-src

**Por qué está presente:**
- Framer Motion genera estilos inline dinámicamente
- Next.js puede generar estilos inline en ciertos casos
- React 19 con Server Components puede requerir estilos inline

**Riesgo:**
- Abre vector de ataque para XSS via inyección de estilos
- Menos severo que 'unsafe-inline' en scripts

**Mitigación:**
- Input validation estricta (implementada en formularios)
- Output encoding (React lo hace automáticamente)
- Sanitización de contenido user-generated

**Plan futuro (Fase 5):**
```typescript
// Implementar nonce-based CSP:
const nonce = generateNonce();
headers: {
  'Content-Security-Policy': `style-src 'self' 'nonce-${nonce}'`
}

// En componentes:
<style nonce={nonce}>{dynamicStyles}</style>
```

#### 'unsafe-eval' en script-src

**Por qué está presente:**
- Next.js dev server usa `eval()` para hot module replacement
- Webpack/Turbopack requieren `eval()` en desarrollo

**Riesgo:**
- En producción, esto DEBE ser removido
- `eval()` puede ejecutar código arbitrario

**Mitigación actual:**
- Solo necesario en desarrollo
- En producción, Next.js NO usa eval()

**Verificación:**
```bash
# Build de producción NO debe generar eval()
npm run build
npm run start
# Verificar en DevTools que no hay eval() calls
```

#### 'unsafe-inline' en script-src

**Por qué está presente:**
- Vercel Analytics puede usar inline scripts
- Next.js puede generar inline scripts para bootstrapping

**Riesgo:**
- Vector de ataque XSS más peligroso
- Cualquier script inline puede ser ejecutado

**Mitigación:**
- Minimizar uso de inline scripts
- Usar `dangerouslySetInnerHTML` solo cuando absolutamente necesario
- Sanitizar cualquier contenido user-generated

**Plan futuro (Fase 5):**
```typescript
// Nonce-based approach:
const nonce = generateNonce();

// Headers:
'Content-Security-Policy': `script-src 'self' 'nonce-${nonce}'`

// En HTML:
<script nonce={nonce}>
  // Solo scripts con nonce correcto se ejecutan
</script>
```

### 7. Strict-Transport-Security (HSTS)

**Propósito:** Forzar HTTPS en todas las conexiones

**Qué hace:**
- Informa al browser que SIEMPRE use HTTPS
- Previene downgrade attacks de HTTPS a HTTP
- Incluye subdominios en la política

**Configuración:**
```
max-age=63072000         // 2 años en segundos
includeSubDomains        // Aplicar a todos los subdominios
preload                  // Elegible para HSTS preload list
```

**Por qué solo en producción:**
- En desarrollo, localhost usa HTTP
- HSTS rompería el dev server local
- Solo tiene sentido donde HTTPS está disponible

**HSTS Preload List:**
- Lista mantenida por Chrome/browsers de dominios que SOLO usan HTTPS
- Protege incluso la primera visita al sitio
- Submisión manual requerida en: https://hstspreload.org/
- **TODO (Fase 5):** Submit saintgrove.net a HSTS preload list

**Cómo funciona:**
```
// Primera visita (HTTP):
User -> http://saintgrove.net
Server -> Redirect to HTTPS + HSTS header
User -> https://saintgrove.net

// Visitas subsecuentes:
User intenta -> http://saintgrove.net
Browser intercepta -> "Ya sé que este sitio es HTTPS-only"
Browser automáticamente -> https://saintgrove.net
// NO hay request HTTP inseguro!
```

## Configuración en Código

### Ubicación
`frontend/next.config.ts`

### Implementación

```typescript
import type { NextConfig } from "next";

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https: res.cloudinary.com;
  font-src 'self' data:;
  connect-src 'self' https://vercel.live https://vitals.vercel-insights.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
`;

const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  }
];

// HSTS solo en producción
if (process.env.NODE_ENV === 'production') {
  securityHeaders.push({
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  });
}

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
```

## Testing

### 1. Local Testing (Manual)

```bash
# 1. Start dev server
cd frontend
npm run dev

# 2. Check headers (new terminal)
curl -I http://localhost:3000

# Expected output:
# X-Frame-Options: DENY
# X-Content-Type-Options: nosniff
# X-DNS-Prefetch-Control: on
# Referrer-Policy: origin-when-cross-origin
# Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
# Content-Security-Policy: default-src 'self'; script-src...
# NOTE: HSTS NOT present in development
```

### 2. Browser DevTools Testing

**Pasos:**
1. Abrir http://localhost:3000
2. Abrir DevTools (F12)
3. Network tab
4. Reload (Ctrl+R)
5. Click en request principal (/)
6. Ver "Headers" section
7. Scroll a "Response Headers"

**Verificar:**
- Todos los security headers presentes
- Content-Security-Policy correctamente formateado
- No hay errores CSP en Console

**CSP Violations:**
Si ves errores como:
```
Refused to load script 'https://evil.com/hack.js' because it violates CSP
```

Esto es BUENO - significa CSP está bloqueando recursos maliciosos.

Si ves errores en recursos legítimos:
```
Refused to load style from 'https://fonts.googleapis.com/...'
```

Esto significa necesitas ajustar CSP para permitir ese recurso.

### 3. Online Security Scanners

#### SecurityHeaders.com

**URL:** https://securityheaders.com

**Cómo usar:**
1. Deploy a Vercel (o staging)
2. Ingresar URL: https://saintgrove.net
3. Analizar

**Target Score:** A+ (con notas sobre trade-offs)

**Expected Issues:**
- CSP con 'unsafe-inline': Score reducido
- Documentar por qué es necesario

#### Mozilla Observatory

**URL:** https://observatory.mozilla.org

**Cómo usar:**
1. Ingresar URL production
2. Run scan
3. Review recommendations

**Target Score:** B+ o superior

**Known Issues:**
- CSP 'unsafe-inline' reducirá score
- Esto es un trade-off consciente

### 4. Automated Testing (Playwright)

**TODO (Fase 2):** Crear test E2E para verificar headers

```typescript
// frontend/tests/e2e/security-headers.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Security Headers', () => {
  test('should have X-Frame-Options', async ({ page }) => {
    const response = await page.goto('/');
    const headers = response?.headers();
    expect(headers?.['x-frame-options']).toBe('DENY');
  });

  test('should have CSP', async ({ page }) => {
    const response = await page.goto('/');
    const headers = response?.headers();
    expect(headers?.['content-security-policy']).toContain("default-src 'self'");
  });

  test('should have HSTS in production', async ({ page }) => {
    // Skip in development
    if (process.env.NODE_ENV !== 'production') {
      test.skip();
    }
    const response = await page.goto('/');
    const headers = response?.headers();
    expect(headers?.['strict-transport-security']).toBeDefined();
  });
});
```

### 5. Production Verification

```bash
# After Vercel deployment:
curl -I https://saintgrove.net

# Verify HSTS is present:
# Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

## Troubleshooting

### Issue: Framer Motion animations not working

**Síntoma:**
- Animaciones no se aplican
- Console error: "Refused to apply inline style"

**Causa:**
- CSP bloqueando estilos inline de Framer Motion

**Solución:**
```typescript
// Verificar que 'unsafe-inline' está en style-src:
style-src 'self' 'unsafe-inline';
```

**Si no funciona:**
```typescript
// Temporalmente, para debug:
style-src 'self' 'unsafe-inline' *;
// Si esto funciona, el problema es CSP. Ajustar directivas.
```

### Issue: Google Analytics not loading

**Síntoma:**
- GA no registra pageviews
- Console error: "Refused to load script from 'https://www.google-analytics.com'"

**Causa:**
- GA no está en allowlist de CSP

**Solución:**
```typescript
// Agregar GA domains:
script-src 'self' 'unsafe-eval' 'unsafe-inline'
  https://www.google-analytics.com
  https://www.googletagmanager.com
  https://vercel.live
  https://va.vercel-scripts.com;

connect-src 'self'
  https://www.google-analytics.com
  https://analytics.google.com
  https://vercel.live
  https://vitals.vercel-insights.com;
```

### Issue: Images from Cloudinary not loading

**Síntoma:**
- Imágenes aparecen rotas
- Console error: "Refused to load image from 'https://res.cloudinary.com'"

**Causa:**
- Cloudinary no en img-src

**Solución:**
```typescript
// Ya implementado:
img-src 'self' blob: data: https: res.cloudinary.com;

// Si no funciona, verificar dominio exacto:
// Puede ser cdn.cloudinary.com o res.cloudinary.com
```

### Issue: HSTS preventing localhost access

**Síntoma:**
- No puedo acceder a http://localhost:3000
- Browser fuerza HTTPS que no existe

**Causa:**
- HSTS header enviado en desarrollo (no debería pasar)

**Solución:**
```typescript
// Verificar que HSTS solo está en producción:
if (process.env.NODE_ENV === 'production') {
  securityHeaders.push({
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  });
}
```

**Si HSTS está cached en browser:**
```
Chrome: chrome://net-internals/#hsts
1. En "Delete domain security policies"
2. Ingresar: localhost
3. Delete
4. Reload browser
```

### Issue: CSP blocking Next.js HMR

**Síntoma:**
- Hot reload no funciona
- Console error: "Refused to connect to 'ws://localhost:3000/_next/webpack-hmr'"

**Causa:**
- WebSocket de HMR bloqueado por CSP

**Solución:**
```typescript
// Agregar support para WebSocket en development:
const isDev = process.env.NODE_ENV === 'development';

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https: res.cloudinary.com;
  font-src 'self' data:;
  connect-src 'self' ${isDev ? 'ws://localhost:3000' : ''} https://vercel.live https://vitals.vercel-insights.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim();
```

## Roadmap de Mejoras

### Fase 5: Nonce-based CSP

**Objetivo:** Eliminar 'unsafe-inline' de CSP

**Implementación:**
```typescript
// 1. Generar nonce en cada request
import { headers } from 'next/headers';
import crypto from 'crypto';

export function generateNonce() {
  return crypto.randomBytes(16).toString('base64');
}

// 2. Middleware para inyectar nonce
// middleware.ts
export function middleware(request: NextRequest) {
  const nonce = generateNonce();
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Update CSP header with nonce
  const csp = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' https://vercel.live;
    style-src 'self' 'nonce-${nonce}';
    ...
  `.replace(/\s{2,}/g, ' ').trim();

  response.headers.set('Content-Security-Policy', csp);
  return response;
}

// 3. Usar nonce en componentes
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = headers().get('x-nonce');

  return (
    <html>
      <head>
        <style nonce={nonce}>
          {/* Critical CSS */}
        </style>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**Desafíos:**
- Framer Motion debe ser configurado para usar nonce
- All inline styles deben recibir nonce
- Testing más complejo

**Beneficios:**
- Eliminación completa de 'unsafe-inline'
- Security score A+ en scanners
- Protección XSS máxima

### Fase 5: Subresource Integrity (SRI)

**Objetivo:** Verificar integridad de recursos externos

**Implementación:**
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  experimental: {
    sri: {
      algorithm: 'sha384'
    }
  }
};
```

**Genera:**
```html
<script
  src="https://cdn.example.com/script.js"
  integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
  crossorigin="anonymous"
></script>
```

**Beneficios:**
- Previene tampering de CDN
- Protege contra compromised third-parties
- Requerido para score A+ en scanners

### Fase 5: Report-Only Mode para Testing

**Objetivo:** Test CSP changes sin romper el sitio

**Implementación:**
```typescript
// En staging/testing:
const securityHeaders = [
  {
    key: 'Content-Security-Policy-Report-Only',
    value: stricterCSP + ' report-uri /api/csp-violation'
  }
];

// API endpoint para recibir reports:
// app/api/csp-violation/route.ts
export async function POST(request: Request) {
  const violation = await request.json();
  console.error('CSP Violation:', violation);

  // Opcional: Send to monitoring service
  // await sendToSentry(violation);

  return new Response('OK', { status: 204 });
}
```

**Uso:**
1. Implementar CSP más estricto en Report-Only
2. Monitor violations por 1-2 semanas
3. Ajustar CSP basado en reports
4. Promover a enforcing mode

### Fase 6: CAA DNS Records

**Objetivo:** Control sobre qué CAs pueden emitir certificados SSL

**Implementación:**
```bash
# En DNS provider (Vercel/Cloudflare):
saintgrove.net. CAA 0 issue "letsencrypt.org"
saintgrove.net. CAA 0 issuewild "letsencrypt.org"
saintgrove.net. CAA 0 iodef "mailto:security@saintgrove.net"
```

**Beneficios:**
- Previene certificados SSL fraudulentos
- Notificación si alguien intenta obtener cert no autorizado

## Security Checklist

### Pre-deployment

- [ ] Build exitoso sin errores
- [ ] Headers verificados en dev con `curl -I`
- [ ] CSP no bloquea recursos legítimos
- [ ] Framer Motion animations funcionando
- [ ] Images de Cloudinary cargando
- [ ] No errores en browser console
- [ ] Tests E2E pasando (cuando estén implementados)

### Post-deployment (Staging)

- [ ] Headers presentes en staging
- [ ] HSTS header presente
- [ ] SecurityHeaders.com scan: Score B+ o superior
- [ ] Mozilla Observatory scan: Score B+ o superior
- [ ] Functional testing completo
- [ ] Performance no degradada

### Production Launch

- [ ] Headers verificados en production
- [ ] HSTS funcionando correctamente
- [ ] Monitoring configurado para CSP violations
- [ ] Documentation actualizada
- [ ] Team notificado de security policies

### Post-launch (Fase 5)

- [ ] Submit a HSTS preload list
- [ ] Implement nonce-based CSP
- [ ] Enable SRI for external resources
- [ ] Setup CSP violation reporting
- [ ] Configure CAA DNS records
- [ ] Security audit profesional

## Resources

### Documentation
- [MDN: CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [MDN: Security Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers#security)
- [OWASP: Secure Headers Project](https://owasp.org/www-project-secure-headers/)

### Tools
- [SecurityHeaders.com](https://securityheaders.com) - Header scanner
- [Mozilla Observatory](https://observatory.mozilla.org) - Security scanner
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/) - CSP validator
- [HSTS Preload](https://hstspreload.org/) - HSTS preload submission

### Next.js Specific
- [Next.js: Security Headers](https://nextjs.org/docs/app/api-reference/next-config-js/headers)
- [Vercel: Security Best Practices](https://vercel.com/docs/security)

## Contact

Para preguntas sobre security headers o reportar vulnerabilidades:
- Security Email: security@saintgrove.net (TODO: Setup en Fase 5)
- Team Lead: [DevOps Agent]

## Changelog

### 2025-11-10 - Initial Implementation
- Implementación de 6 security headers principales
- CSP con trade-offs documentados para Framer Motion
- HSTS condicional para producción
- Testing manual verificado
- Documentación completa creada

### Future Updates
- Fase 5: Nonce-based CSP
- Fase 5: SRI implementation
- Fase 6: CAA DNS records
