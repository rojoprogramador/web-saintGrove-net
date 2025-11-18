# Security Headers - Verification Checklist

## Quick Verification Guide

Este documento proporciona comandos rapidos para verificar que los security headers estan funcionando correctamente.

## Pre-requisitos

```bash
# Asegurate de estar en el directorio frontend
cd "d:\Conocimientos Programacion\SaintGrove-net\frontend"
```

## 1. Development Testing

### Start Dev Server
```bash
npm run dev
```

**Expected output:**
```
▲ Next.js 16.0.1 (Turbopack)
- Local:        http://localhost:3000
✓ Ready in 10s
```

### Verify Headers - Homepage
```bash
curl -I http://localhost:3000
```

**Expected headers (todos deben estar presentes):**
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-DNS-Prefetch-Control: on
- Referrer-Policy: origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
- Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'...

**NOT expected in development:**
- Strict-Transport-Security (HSTS) - Solo en produccion

### Verify Headers - Other Routes

```bash
# Servicios page
curl -I http://localhost:3000/servicios

# Contacto page
curl -I http://localhost:3000/contacto

# Proceso page
curl -I http://localhost:3000/proceso

# API endpoint
curl -I http://localhost:3000/api/contact
```

**Todos deben mostrar los mismos security headers**

## 2. Browser Testing

### Open DevTools
1. Abrir http://localhost:3000 en Chrome/Edge
2. F12 para abrir DevTools
3. Network tab
4. Reload (Ctrl+R)
5. Click en request principal (/)
6. Scroll a "Response Headers"

### Verify Headers Present
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-DNS-Prefetch-Control: on
- Referrer-Policy: origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
- Content-Security-Policy: [long string]

### Check Console for CSP Errors

**Console debe estar LIMPIO - sin errores**

Si ves errores como:
```
Refused to load script 'https://evil.com/hack.js' because it violates CSP
```
Esto es BUENO - CSP esta bloqueando recursos maliciosos.

Si ves errores en recursos legitimos (ej: Cloudinary, Vercel):
```
Refused to load image from 'https://res.cloudinary.com/...'
```
Esto es MALO - necesitas ajustar CSP.

## 3. Production Build Testing

### Build for Production
```bash
npm run build
```

**Expected output:**
```
✓ Compiled successfully in ~60s
✓ Generating static pages (12/12)
```

**NO debe haber errores de TypeScript o build**

### Start Production Server
```bash
npm run start
```

### Verify HSTS Header

```bash
# En produccion, HSTS debe estar presente
curl -I http://localhost:3000
```

**Expected (adicional a otros headers):**
```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

**IMPORTANTE:** Este header solo aparece cuando NODE_ENV=production

## 4. Functional Testing

### Verify App Works Normally

1. **Homepage:** http://localhost:3000
   - [ ] Page carga sin errores
   - [ ] Estilos aplicados correctamente
   - [ ] Sin errores en console

2. **Servicios:** http://localhost:3000/servicios
   - [ ] Page carga sin errores
   - [ ] Imagenes de Cloudinary cargan
   - [ ] Animaciones Framer Motion funcionan

3. **Contacto:** http://localhost:3000/contacto
   - [ ] Formulario visible
   - [ ] Inputs funcionan
   - [ ] Validation funciona

4. **Proceso:** http://localhost:3000/proceso
   - [ ] Content carga
   - [ ] Layout correcto

### Verify Framer Motion Works

**Test animaciones:**
1. Abrir cualquier pagina
2. Buscar elementos animados
3. Verificar que animaciones se ejecutan
4. No debe haber errores CSP sobre estilos inline

**Si animaciones NO funcionan:**
- Check Console para errores CSP
- Verificar que style-src tiene 'unsafe-inline'

### Verify Images Load

**Test Cloudinary:**
1. Ir a /servicios
2. Verificar que imagenes cargan
3. No debe haber errores CSP sobre img-src

**Si imagenes NO cargan:**
- Check Console para errores CSP
- Verificar que img-src incluye res.cloudinary.com

## 5. Security Scanner Testing (Post-Deployment)

### SecurityHeaders.com

**URL:** https://securityheaders.com

**Steps:**
1. Deploy to Vercel staging/production
2. Ingresar URL: https://yourdomain.vercel.app
3. Click "Scan"

**Expected Score:** B+ a A-

**Known Issues:**
- CSP con 'unsafe-inline' reduce score
- Esto es un trade-off documentado y aceptable

### Mozilla Observatory

**URL:** https://observatory.mozilla.org

**Steps:**
1. Ingresar production URL
2. Click "Scan Me"
3. Review results

**Expected Score:** B+ o superior

**Common Warnings:**
- CSP allows 'unsafe-inline' - EXPECTED
- Consider implementing SRI - TODO Fase 5

### CSP Evaluator

**URL:** https://csp-evaluator.withgoogle.com/

**Steps:**
1. Copiar CSP header completo
2. Pegar en evaluator
3. Click "Evaluate"

**Expected Issues:**
- 'unsafe-inline' in style-src - Medium severity
- 'unsafe-inline' in script-src - High severity
- 'unsafe-eval' in script-src - High severity

**Todas estas son CONOCIDAS y DOCUMENTADAS**

## 6. Troubleshooting Common Issues

### Issue: Headers not present

**Symptom:**
```bash
curl -I http://localhost:3000
# No security headers visible
```

**Causes:**
1. Dev server not running
2. next.config.ts syntax error
3. Cache issue

**Solutions:**
```bash
# 1. Verify dev server running
# Should see "✓ Ready in Xs"

# 2. Check for build errors
npm run build
# Look for TypeScript errors in next.config.ts

# 3. Clear cache and restart
# Ctrl+C to stop dev server
rm -rf .next
npm run dev
```

### Issue: Framer Motion animations broken

**Symptom:**
- Animations not working
- Console error: "Refused to apply inline style"

**Cause:**
- CSP blocking inline styles

**Solution:**
```typescript
// Verify in next.config.ts:
style-src 'self' 'unsafe-inline';
// Must have 'unsafe-inline'
```

### Issue: Images not loading

**Symptom:**
- Broken images from Cloudinary
- Console error: "Refused to load image"

**Cause:**
- Cloudinary not in CSP allowlist

**Solution:**
```typescript
// Verify in next.config.ts:
img-src 'self' blob: data: https: res.cloudinary.com;
// Must include res.cloudinary.com
```

### Issue: HSTS in development

**Symptom:**
- Can't access localhost
- Browser forces HTTPS

**Cause:**
- HSTS cached in browser from production testing

**Solution:**
```
Chrome: chrome://net-internals/#hsts
1. "Delete domain security policies"
2. Enter: localhost
3. Click "Delete"
4. Restart browser
```

## 7. Final Checklist

### Pre-Deployment
- [ ] npm run build exitoso
- [ ] npm run dev funciona
- [ ] Headers verificados con curl
- [ ] Headers verificados en DevTools
- [ ] Console sin errores CSP
- [ ] Framer Motion animations funcionan
- [ ] Cloudinary images cargan
- [ ] Formularios funcionan

### Post-Deployment (Staging)
- [ ] Headers presentes en staging URL
- [ ] HSTS header presente
- [ ] SecurityHeaders.com scan: B+ o superior
- [ ] Mozilla Observatory scan: B+ o superior
- [ ] Functional testing completo
- [ ] No degradacion de performance

### Production
- [ ] Headers verificados en production
- [ ] HSTS funcionando
- [ ] Monitoring configurado
- [ ] Team notificado
- [ ] Documentation actualizada

## 8. Quick Reference Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Check headers - homepage
curl -I http://localhost:3000

# Check headers - specific route
curl -I http://localhost:3000/servicios

# Check HSTS (production only)
curl -I http://localhost:3000 | grep -i strict

# Clear Next.js cache
rm -rf .next

# Full reset
rm -rf .next node_modules
npm install
npm run dev
```

## 9. Expected curl Output (Development)

```
HTTP/1.1 200 OK
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-DNS-Prefetch-Control: on
Referrer-Policy: origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https: res.cloudinary.com; font-src 'self' data:; connect-src 'self' https://vercel.live https://vitals.vercel-insights.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests;
Vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch, Accept-Encoding
Cache-Control: no-store, must-revalidate
X-Powered-By: Next.js
Content-Type: text/html; charset=utf-8
Date: [current date]
Connection: keep-alive
```

## 10. Contact

Si encuentras problemas no documentados aqui:
1. Revisar specs/deployment/security-headers.md (troubleshooting detallado)
2. Contactar DevOps Agent
3. Abrir issue en GitHub (cuando este configurado)

---

**Document Version:** 1.0
**Last Updated:** 2025-11-10
**Author:** DevOps Agent - Deployment & Performance Specialist
