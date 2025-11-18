# Email Integration API Documentation

## Overview

Sistema de envío de emails para el formulario de contacto de SaintGrove.net usando Resend API y React Email templates.

**Endpoint:** `/api/contact`
**Methods:** `POST`, `GET`
**Rate Limit:** 10 requests/hour por IP
**Authentication:** Ninguna (público)

---

## POST /api/contact

Envía un mensaje desde el formulario de contacto.

### Request

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "phone": "+57 300 123 4567",
  "service": "desarrollo-web",
  "message": "Hola, estoy interesado en desarrollar un sitio web para mi empresa..."
}
```

**Field Validation:**

| Campo | Tipo | Requerido | Validación |
|-------|------|-----------|------------|
| name | string | Sí | Min: 2 caracteres, Max: 100 caracteres |
| email | string | Sí | Email válido |
| phone | string | No | Min: 10 caracteres (si se proporciona) |
| service | string | Sí | Min: 1 caracter |
| message | string | Sí | Min: 10 caracteres, Max: 1000 caracteres |

**Service Options:**
- `desarrollo-web` - Desarrollo Web
- `software-medida` - Software a Medida
- `branding` - Creación de Marca
- `marketing` - Campañas Publicitarias
- `consultoria` - Consultoría
- `otro` - Otro

### Response

#### Success (200 OK)

**Production Mode (con RESEND_API_KEY):**
```json
{
  "success": true,
  "message": "Mensaje enviado correctamente. Te contactaremos pronto.",
  "messageId": "re_abc123xyz"
}
```

**Development Mode (sin RESEND_API_KEY):**
```json
{
  "success": true,
  "message": "Mensaje recibido (modo desarrollo)",
  "dev": true
}
```

#### Rate Limit Exceeded (429 Too Many Requests)

```json
{
  "error": "Demasiados intentos. Por favor intenta de nuevo en 1 hora.",
  "code": "RATE_LIMIT_EXCEEDED"
}
```

#### Validation Error (400 Bad Request)

```json
{
  "error": "Los datos enviados no son válidos",
  "code": "VALIDATION_ERROR",
  "details": [
    {
      "field": "email",
      "message": "Email inválido"
    },
    {
      "field": "message",
      "message": "El mensaje debe tener al menos 10 caracteres"
    }
  ]
}
```

#### Invalid JSON (400 Bad Request)

```json
{
  "error": "El formato de los datos no es válido",
  "code": "INVALID_JSON"
}
```

#### Internal Server Error (500 Internal Server Error)

```json
{
  "error": "Error al procesar tu solicitud. Por favor intenta de nuevo.",
  "code": "INTERNAL_ERROR"
}
```

---

## GET /api/contact

Obtiene información sobre el estado del endpoint.

### Response (200 OK)

```json
{
  "status": "operational",
  "endpoint": "/api/contact",
  "methods": ["POST"],
  "description": "Contact form submission endpoint",
  "rateLimit": {
    "maxRequests": 10,
    "windowMs": 3600000
  },
  "requiredFields": ["name", "email", "service", "message"],
  "optionalFields": ["phone"],
  "documentation": "/specs/api/email-integration.md"
}
```

---

## Rate Limiting

El endpoint implementa rate limiting basado en IP para prevenir abuso:

- **Límite:** 10 requests por hora
- **Algoritmo:** Sliding window
- **Identificador:** IP del cliente (x-forwarded-for, x-real-ip o request.ip)
- **Storage:** In-memory (se reinicia con el servidor)
- **Cleanup:** Automático cada 5 minutos

### Rate Limit Headers (No implementado todavía)

Futuras versiones incluirán headers de rate limit:
```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 7
X-RateLimit-Reset: 1678901234
```

---

## Email Configuration

### Resend Setup

**From Address:**
- Default: `SaintGrove <onboarding@resend.dev>` (Resend free plan)
- Custom domain: Configurar dominio verificado en Resend

**To Address:**
- Default: `info@saintgrove.net`
- Override: Variable de entorno `CONTACT_TO_EMAIL`

**Reply-To:**
- Se configura automáticamente con el email del remitente

### Environment Variables

```bash
# Required for production
RESEND_API_KEY=re_your_api_key_here

# Optional - override recipient email
CONTACT_TO_EMAIL=info@saintgrove.net
```

### Email Template

El email usa componentes de React Email (`@react-email/components`) con:
- Header con branding SaintGrove
- Información del contacto estructurada
- Mensaje formateado
- Estilos con Tailwind CSS (sin inline styles)
- Responsive y compatible con todos los email clients

**Template Location:** `lib/email/templates/ContactNotificationEmail.tsx`

---

## Testing

### 1. Test API Endpoint (Development Mode)

Sin configurar RESEND_API_KEY, el endpoint funciona en modo desarrollo:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "service": "desarrollo-web",
    "message": "Este es un mensaje de prueba"
  }'
```

**Expected Output:**
```json
{
  "success": true,
  "message": "Mensaje recibido (modo desarrollo)",
  "dev": true
}
```

El mensaje será logueado en la consola del servidor.

### 2. Test with Resend API

1. Obtener API key de Resend (ver instrucciones abajo)
2. Configurar variable de entorno:
   ```bash
   RESEND_API_KEY=re_your_api_key
   ```
3. Enviar request de prueba
4. Verificar email en la bandeja de entrada

### 3. Test Rate Limiting

```bash
# Script para testear rate limiting (Bash/PowerShell)
for i in {1..12}; do
  curl -X POST http://localhost:3000/api/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@test.com","service":"test","message":"Test message 123"}'
  echo "\nRequest $i completed"
done
```

**Expected:** Primeros 10 requests exitosos, requests 11-12 retornan 429.

### 4. Test Email Template Preview

Usar React Email CLI para preview:

```bash
cd frontend
npx react-email dev
```

Navegar a `http://localhost:3000` y seleccionar el template.

---

## Error Codes Reference

| Code | Status | Description |
|------|--------|-------------|
| `RATE_LIMIT_EXCEEDED` | 429 | Más de 10 requests en 1 hora |
| `VALIDATION_ERROR` | 400 | Datos inválidos según schema Zod |
| `INVALID_JSON` | 400 | JSON malformado |
| `INTERNAL_ERROR` | 500 | Error del servidor |

---

## Obtaining Resend API Key

### Step-by-Step Instructions

1. **Crear cuenta en Resend:**
   - Visitar https://resend.com
   - Sign up con email o GitHub
   - Verificar email

2. **Acceder al Dashboard:**
   - Login en https://resend.com/login
   - Ir a "API Keys" en el sidebar

3. **Crear nueva API Key:**
   - Click en "Create API Key"
   - Name: `SaintGrove Production` o `SaintGrove Development`
   - Permission: `Sending access` (Full access no es necesario)
   - Click "Create"

4. **Copiar la API Key:**
   - **IMPORTANTE:** Copiar la key inmediatamente
   - La key solo se muestra una vez
   - Formato: `re_xxxxxxxxxxxxxxxxx`

5. **Configurar en el proyecto:**

   **Desarrollo local:**
   ```bash
   # frontend/.env.local
   RESEND_API_KEY=re_your_api_key_here
   CONTACT_TO_EMAIL=info@saintgrove.net
   ```

   **Production (Railway/Vercel/etc):**
   - Agregar variable de entorno en el dashboard del hosting
   - Name: `RESEND_API_KEY`
   - Value: `re_your_api_key_here`

6. **Verificar configuración:**
   ```bash
   curl http://localhost:3000/api/contact
   ```
   Debe retornar status `operational`.

### Free Plan Limits

- **Sending:** 100 emails/día, 3,000 emails/mes
- **From Address:** Solo `onboarding@resend.dev`
- **Custom Domains:** No disponible

Para producción, considerar plan pago para:
- Custom domain (`noreply@saintgrove.net`)
- Mayor límite de envío
- Mejor deliverability

---

## Next Steps (Optional)

### 1. Custom Domain Setup

Configurar dominio personalizado en Resend para mejor branding:

1. Ir a "Domains" en Resend Dashboard
2. Add domain: `saintgrove.net`
3. Agregar records DNS en Hostinger:
   - SPF record
   - DKIM record
   - DMARC record (opcional)
4. Verify domain
5. Actualizar `from` address en `lib/email/resend-client.ts`:
   ```ts
   from: 'SaintGrove <noreply@saintgrove.net>'
   ```

### 2. Email Analytics

Resend Dashboard provee:
- Email delivery status
- Open rates (si se habilita tracking)
- Click rates
- Bounce rates

### 3. Webhooks

Configurar webhooks para recibir eventos:
- Email delivered
- Email bounced
- Email complained

### 4. Database Logging

Considerar guardar submissions en database (Strapi/PostgreSQL):
- Backup de todos los mensajes
- Analytics de servicios más solicitados
- Seguimiento de conversiones

### 5. Auto-reply Email

Implementar email de confirmación automático al cliente:
```
"Gracias por contactarnos. Hemos recibido tu mensaje y
te responderemos en las próximas 24 horas."
```

---

## Troubleshooting

### Email no se envía (Production)

1. **Verificar API key:**
   ```bash
   echo $RESEND_API_KEY
   ```
   Debe estar configurada y empezar con `re_`

2. **Verificar logs del servidor:**
   ```bash
   # En desarrollo
   Check console output

   # En Railway/Vercel
   Check deployment logs
   ```

3. **Verificar Resend Dashboard:**
   - Ir a "Logs" en Resend
   - Ver si hay errores de envío
   - Verificar límite de emails

### Rate limit demasiado restrictivo

Modificar configuración en `lib/api/rate-limit.ts`:

```typescript
export const RATE_LIMIT_CONFIG = {
  maxRequests: 20, // Aumentar límite
  windowMs: 60 * 60 * 1000, // 1 hora
};
```

### Email llega a spam

Soluciones:
1. Configurar custom domain con records DNS correctos
2. No usar palabras spam en subject/body
3. Mantener ratio de bounce bajo
4. Configurar DMARC policy

### TypeScript errors

Verificar tipos:
```bash
cd frontend
npm run type-check
```

---

## Architecture

```
Client (ContactForm.tsx)
  │
  │ POST /api/contact
  │ { name, email, phone, service, message }
  │
  ▼
API Route (/app/api/contact/route.ts)
  │
  ├─► Rate Limiter (lib/api/rate-limit.ts)
  │   ├─ Check IP
  │   └─ Allow/Deny
  │
  ├─► Zod Validation
  │   └─ Validate schema
  │
  ├─► Resend Client (lib/email/resend-client.ts)
  │   │
  │   ├─ Dev Mode: Log to console
  │   │
  │   └─ Prod Mode: Send email
  │       │
  │       ├─► React Email Template
  │       │   (ContactNotificationEmail.tsx)
  │       │
  │       └─► Resend API
  │           └─► info@saintgrove.net
  │
  └─► Response JSON
      ├─ 200: Success
      ├─ 400: Validation error
      ├─ 429: Rate limit
      └─ 500: Server error
```

---

## Files Reference

```
frontend/
├── app/api/contact/
│   └── route.ts                    # API endpoint (POST/GET)
├── lib/
│   ├── email/
│   │   ├── templates/
│   │   │   └── ContactNotificationEmail.tsx  # React Email template
│   │   └── resend-client.ts       # Resend helper functions
│   └── api/
│       └── rate-limit.ts          # Rate limiting logic
├── components/features/contact/
│   └── ContactForm.tsx            # Client form component
└── .env.local                     # Environment variables (gitignored)
```

---

## Security Considerations

1. **Rate Limiting:** Implementado para prevenir spam/abuse
2. **Input Validation:** Server-side con Zod
3. **Sanitization:** Inputs son sanitizados por React Email
4. **API Key:** Nunca expuesta al cliente (server-only)
5. **CORS:** Next.js API routes tienen CORS restrictivo por default
6. **XSS Protection:** React escapa HTML automáticamente

---

## Support

**Documentación oficial:**
- Resend: https://resend.com/docs
- React Email: https://react.email/docs
- Next.js API Routes: https://nextjs.org/docs/app/building-your-application/routing/route-handlers

**Issues del proyecto:**
- Reportar en el repositorio de GitHub
- O contactar al equipo de desarrollo

---

**Última actualización:** 2025-11-10
**Versión:** 1.0.0
**Autor:** IntegradorBACKEND - SaintGrove Team
