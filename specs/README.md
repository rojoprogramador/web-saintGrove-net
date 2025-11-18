# 📚 DOCUMENTACIÓN TÉCNICA - SAINTGROVE-NET

> **Documentación completa condensada del proyecto SaintGrove-net**
> **Última actualización:** 2025-11-08 | **Progreso:** 35%

---

## 🗂️ ÍNDICE DE DOCUMENTOS

### 📋 DOCUMENTOS PRINCIPALES

| Documento | Descripción | Estado |
|-----------|-------------|--------|
| **[COMO-FUNCIONA-EL-PROYECTO.md](./COMO-FUNCIONA-EL-PROYECTO.md)** | 📘 Explicación técnica completa: componentes, rutas, comunicación interna | ✅ Completo |
| **[PROJECT-STATUS.md](./PROJECT-STATUS.md)** | 📊 Estado visual del proyecto, métricas, calendario | ✅ Completo |
| **[ROADMAP.md](./ROADMAP.md)** | 🗺️ Plan maestro: 28 tareas en 5 fases con instrucciones completas | ✅ Completo |
| **[TASK-ASSIGNMENTS.md](./TASK-ASSIGNMENTS.md)** | 👥 Asignación por agente (6 agentes, tiempos estimados) | ✅ Completo |

### 📁 CARPETAS

| Carpeta | Contenido | Estado |
|---------|-----------|--------|
| **setup/** | 5 guías (development, testing, quickstart, immediate-actions, **environment-variables**) | ✅ Completo |
| **processes/** | 2 guías (**git-workflow**, **code-review-guide**) | ✅ NUEVO |
| **screenshots/** | 8 carpetas para capturas de servicios externos | ✅ Creado |

---

## 🏗️ ARQUITECTURA DEL PROYECTO (Condensado)

### Estructura de Carpetas Frontend
```
frontend/
├── app/                          # Next.js 16 App Router
│   ├── layout.tsx, page.tsx, globals.css
│   ├── servicios/, proceso/, contacto/
│
├── components/
│   ├── features/                 # Organizados por feature (NEW)
│   │   ├── home/                # Hero, Process, CTA
│   │   ├── services/            # ServicesGrid
│   │   └── contact/             # ContactForm
│   ├── layout/                  # Header, Footer, WhatsApp, SocialBar
│   ├── ui/                      # Button, Card, Logo
│   └── common/                  # Componentes compartidos
│
├── lib/
│   ├── api/                     # API clients (para Strapi)
│   ├── constants/               # navigation.ts, config.ts
│   ├── data/fallback/           # services.ts (datos estáticos)
│   ├── metadata/                # site.ts (SEO generators)
│   └── utils/                   # cn.ts, format.ts, validation.ts
│
├── hooks/                       # Custom React hooks
├── types/                       # TypeScript interfaces
├── __tests__/                   # Vitest + Playwright tests
└── public/                      # Assets estáticos
```

### Principios de Organización
- **Feature-based:** Componentes agrupados por funcionalidad
- **Colocation:** Tests junto al código
- **Path aliases:** `@/components/`, `@/lib/`, etc.
- **Barrel exports:** index.ts en cada feature

---

## 🎨 GUÍAS DE COMPONENTES (Condensado)

### Estructura de un Componente
```typescript
// components/features/ejemplo/MiComponente.tsx
'use client'; // Solo si usa hooks o interactividad

import React from 'react';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface MiComponenteProps {
  title: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const MiComponente: React.FC<MiComponenteProps> = ({
  title,
  variant = 'primary',
  className
}) => {
  return (
    <div className={cn('base-classes', className)}>
      <h2>{title}</h2>
      <Button variant={variant}>Acción</Button>
    </div>
  );
};
```

### Convenciones
- **Naming:** PascalCase para componentes, camelCase para utils
- **Props:** Siempre tipar con TypeScript interface
- **Exports:** Named exports (no default)
- **Styling:** Tailwind CSS + variantes con `cva` o `cn()`
- **Tests:** Un test por componente mínimo

---

## 🔌 API ENDPOINTS (Condensado)

### Endpoints Actuales
```
GET  /                        → Homepage
GET  /servicios               → Lista de servicios
GET  /servicios/[slug]        → Servicio individual
GET  /proceso                 → Página de proceso
GET  /contacto                → Formulario de contacto
```

### Endpoints Planeados (Fase 1-2)
```
POST /api/contact             → Enviar email (Resend)
GET  /api/services            → Obtener servicios (Strapi)
GET  /api/blog                → Obtener posts (Strapi)
GET  /api/portfolio           → Obtener proyectos (Strapi)
```

### API Client Pattern
```typescript
// lib/api/client.ts
export async function fetchAPI(endpoint: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${endpoint}`);
  if (!res.ok) throw new Error('API Error');
  return res.json();
}

// Con fallback
import { fallbackData } from '@/lib/data/fallback';
const data = await fetchAPI('/services').catch(() => fallbackData);
```

---

## 🚀 DEPLOYMENT (Condensado - ver ROADMAP para detalles)

### Servicios a Configurar

**Frontend:** Vercel (Fase 5)
**Backend:** Railway o DigitalOcean (Fase 5)
**Database:** PostgreSQL (incluido en Railway/DO)
**Email:** Resend (Fase 1) → https://resend.com
**Media:** Cloudinary (Fase 2) → https://cloudinary.com
**Monitoring:** Sentry + UptimeRobot (Fase 5)
**Analytics:** Google Analytics 4 (Fase 3)

Ver instrucciones completas en [ROADMAP.md](./ROADMAP.md)

---

## 📸 CAPTURAS Y SCREENSHOTS

Guardar capturas en: `specs/screenshots/[nombre-servicio]/`

**Servicios que requieren capturas:**
- resend/ → API key de Resend
- cloudinary/ → Dashboard con credenciales
- vercel/ → Setup, env vars, DNS records
- railway/ → Strapi deployment, DB configurada
- sentry/ → Dashboard, DSN key
- uptimerobot/ → Monitors configurados
- google-analytics/ → GA4 Measurement ID
- google-search-console/ → Verificación, sitemap enviado

**Importante:** Ocultar información sensible (API keys completas, passwords)

---

## 📖 GUÍA RÁPIDA POR ROL

### Frontend Developer
- [setup/development.md](./setup/development.md) → Cómo empezar
- Ver sección "Arquitectura" arriba → Estructura de carpetas
- Ver sección "Guías de Componentes" arriba → Cómo crear componentes
- [setup/testing.md](./setup/testing.md) → Cómo escribir tests

### Backend Developer
- [ROADMAP.md](./ROADMAP.md) → Tareas de Strapi (Fase 2)
- Ver sección "API Endpoints" arriba → Estructura de APIs
- [setup/testing.md](./setup/testing.md) → Testing de APIs

### DevOps Engineer
- [ROADMAP.md](./ROADMAP.md) → Tareas 1.4, 1.5, 3.6, 5.1-5.4
- Ver sección "Deployment" arriba → Servicios a configurar
- [PROJECT-STATUS.md](./PROJECT-STATUS.md) → Métricas objetivo

### QA/Tester
- [setup/testing.md](./setup/testing.md) → Guía completa de testing
- [setup/IMMEDIATE-ACTIONS.md](./setup/IMMEDIATE-ACTIONS.md) → Tests a arreglar
- [TASK-ASSIGNMENTS.md](./TASK-ASSIGNMENTS.md) → Tareas asignadas a QATesting

### Product Owner / Manager
- [PROJECT-STATUS.md](./PROJECT-STATUS.md) → Estado visual del proyecto
- [ROADMAP.md](./ROADMAP.md) → Plan completo (28 tareas, 5 fases)
- [TASK-ASSIGNMENTS.md](./TASK-ASSIGNMENTS.md) → Quién hace qué

### Usuario Final (Admin del sitio)
- Strapi CMS Guide → Pendiente Fase 5

---

## 🎯 PRÓXIMOS PASOS

**Documentos a crear en futuras fases:**

**Fase 1:** environment-variables.md (en setup/)
**Fase 2:** strapi-setup.md, content-types.md (en ROADMAP)
**Fase 5:** user-manual/, operations/runbook.md

**Toda la información detallada está en:**
- [ROADMAP.md](./ROADMAP.md) → Tareas completas con subtareas e instrucciones
- [TASK-ASSIGNMENTS.md](./TASK-ASSIGNMENTS.md) → Asignación por agente
- [PROJECT-STATUS.md](./PROJECT-STATUS.md) → Estado y métricas

---

## 📝 CHANGELOG

**2025-11-08** - Documentación Inicial Consolidada
- ✅ ROADMAP.md (28 tareas, 5 fases)
- ✅ TASK-ASSIGNMENTS.md (6 agentes)
- ✅ PROJECT-STATUS.md (estado visual)
- ✅ README.md condensado
- ✅ setup/ (4 guías: development, testing, quickstart, immediate-actions)
- ✅ screenshots/ (8 carpetas para servicios)
- ✅ Eliminada duplicación /frontend/specs
- ✅ Arquitectura, API endpoints y componentes condensados en README

---

**Última actualización:** 2025-11-08
**Mantenido por:** Equipo SaintGrove
**Versión:** 1.0 (Consolidada)
