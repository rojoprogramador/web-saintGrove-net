# INSTRUCCIONES DE CONFIGURACIÓN CI/CD - SAINTGROVE-NET

## RESUMEN EJECUTIVO

Se ha completado la configuración completa del sistema CI/CD para SaintGrove-net con:
- 3 workflows de GitHub Actions
- Configuración de Dependabot
- Configuración de SonarCloud
- CODEOWNERS file
- 6 documentos completos de guías
- Documentación de 20+ tokens/secrets

## ARCHIVOS CREADOS (12 archivos)

### 1. GitHub Actions Workflows (3 archivos)

```
.github/workflows/ci.yml                    (8.7 KB)
.github/workflows/codeql-analysis.yml       (5.4 KB)
.github/workflows/deploy-preview.yml        (7.1 KB)
```

**Validación:** ✅ Sintaxis YAML válida en los 3 archivos

### 2. Configuración GitHub (2 archivos)

```
.github/dependabot.yml                      (3.4 KB)
.github/CODEOWNERS                          (1.9 KB)
```

### 3. Configuración SonarCloud (1 archivo)

```
sonar-project.properties                    (2.7 KB)
```

### 4. Documentación (6 archivos)

```
specs/deployment/ci-cd-setup.md             (14 KB)  - Guía completa CI/CD
specs/deployment/sonarcloud-setup.md        (15 KB)  - Setup SonarCloud
specs/deployment/codeql-setup.md            (15 KB)  - Setup CodeQL
specs/deployment/dependabot-setup.md        (16 KB)  - Setup Dependabot
specs/deployment/tokens-and-secrets.md      (30 KB)  - TODOS los tokens
specs/deployment/STATUS-BADGES.md           (9 KB)   - Badges para README
.github/workflows/README.md                 (5.5 KB)  - Docs workflows
```

---

## PASO A PASO: QUÉ HACER AHORA

### PASO 1: Hacer Push a GitHub (OBLIGATORIO)

```bash
# Desde la raíz del proyecto
cd "d:\Conocimientos Programacion\SaintGrove-net"

# Agregar todos los archivos nuevos
git add .github/
git add sonar-project.properties
git add specs/deployment/

# Verificar qué se va a commitear
git status

# Commit
git commit -m "feat: configure CI/CD pipeline with GitHub Actions

- Add CI workflow (lint, test, build, e2e, security)
- Add CodeQL security analysis workflow
- Add deploy preview workflow for PRs
- Configure Dependabot for automated updates
- Add SonarCloud configuration
- Add CODEOWNERS file
- Add comprehensive documentation

Includes:
- 3 GitHub Actions workflows
- Dependabot config with smart grouping
- SonarCloud integration
- CodeQL security scanning
- Complete setup guides
- Tokens and secrets documentation

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"

# Push to GitHub
git push origin main
```

**IMPORTANTE:** Una vez que hagas push, los workflows se ejecutarán automáticamente.

---

### PASO 2: Configurar SonarCloud (REQUERIDO para CI)

**Tiempo estimado:** 15 minutos

**Guía completa:** `specs/deployment/sonarcloud-setup.md`

**Pasos rápidos:**

1. **Crear cuenta:**
   - Ir a https://sonarcloud.io
   - Sign up with GitHub
   - Autorizar SonarCloud

2. **Crear organización:**
   - Organization Key: `saintgrove`
   - Display Name: `SaintGrove`
   - Plan: Free

3. **Importar proyecto:**
   - Analyze new project
   - Seleccionar `SaintGrove-net`
   - Project Key: `saintgrove_saintgrove-net`

4. **Generar token:**
   - Account → Security → Generate Tokens
   - Name: `SaintGrove-net-GitHub-Actions`
   - Type: `Project Analysis Token`
   - Click Generate
   - **COPIAR TOKEN INMEDIATAMENTE**

5. **Configurar en GitHub:**
   - Repositorio → Settings
   - Secrets and variables → Actions
   - New repository secret
   - Name: `SONAR_TOKEN`
   - Value: [pegar token]
   - Add secret

6. **Verificar:**
   - Ve a Actions tab
   - Re-run el workflow CI
   - Debe pasar el job "SonarCloud Analysis"

---

### PASO 3: Habilitar CodeQL (AUTOMÁTICO)

**Tiempo estimado:** 2 minutos

CodeQL se habilitará automáticamente después del push porque el workflow ya existe.

**Verificar:**

1. Ve a tu repositorio en GitHub
2. Security tab → Code scanning
3. Deberías ver "CodeQL" ejecutándose o completado

**Para repos privados:** Requiere GitHub Advanced Security (no disponible en plan Free)

---

### PASO 4: Habilitar Dependabot (RECOMENDADO)

**Tiempo estimado:** 3 minutos

**Guía completa:** `specs/deployment/dependabot-setup.md`

**Pasos:**

1. Repositorio → Settings
2. Code security and analysis
3. Habilitar:
   - ✅ Dependabot alerts
   - ✅ Dependabot security updates
   - ✅ Dependabot version updates

**Verificar:**
- Insights → Dependency graph → Dependabot
- Status: "Checked X minutes ago"

---

### PASO 5: Configurar Branch Protection (RECOMENDADO)

**Tiempo estimado:** 5 minutos

**Protege la rama main para requerir CI antes de merge:**

1. Settings → Branches
2. Add rule
3. Branch name pattern: `main`
4. Configurar:

```
✅ Require a pull request before merging
   └─ Require approvals: 1

✅ Require status checks to pass before merging
   └─ Require branches to be up to date
   └─ Status checks:
      - CI / lint
      - CI / typecheck
      - CI / test
      - CI / build
      - CodeQL / Analyze (javascript-typescript)

✅ Require conversation resolution before merging
```

5. Click Create

---

### PASO 6: Actualizar CODEOWNERS (OPCIONAL)

**Archivo:** `.github/CODEOWNERS`

**Reemplaza:**
```
@SaintGrove-team
```

**Con tu username o team:**
```
@tu-usuario
# O
@org/team-name
```

---

### PASO 7: Actualizar Dependabot Reviewers (OPCIONAL)

**Archivo:** `.github/dependabot.yml`

**Busca y reemplaza:**
```yaml
reviewers:
  - "SaintGrove-team"  # ← Cambiar
assignees:
  - "SaintGrove-team"  # ← Cambiar
```

**Por:**
```yaml
reviewers:
  - "tu-usuario"
assignees:
  - "tu-usuario"
```

---

### PASO 8: Configurar Resend API (Para Formulario de Contacto)

**Tiempo estimado:** 10 minutos

**Guía completa:** `specs/deployment/tokens-and-secrets.md` (Sección 2.1)

**Pasos rápidos:**

1. Crear cuenta en https://resend.com
2. Dashboard → API Keys → Create API Key
3. Copiar API key
4. Configurar en GitHub Secrets:
   - Name: `RESEND_API_KEY`
   - Value: [tu API key]

**Configurar en desarrollo:**
```bash
# frontend/.env.local
RESEND_API_KEY=re_tu_api_key_aqui
```

**Verificar dominio (para producción):**
- Ver guía completa en `tokens-and-secrets.md`

---

### PASO 9: Agregar Status Badges al README (OPCIONAL)

**Guía completa:** `specs/deployment/STATUS-BADGES.md`

**Edita README.md y agrega:**

```markdown
## Status

[![CI](https://github.com/USUARIO/SaintGrove-net/workflows/CI/badge.svg)](https://github.com/USUARIO/SaintGrove-net/actions)
[![CodeQL](https://github.com/USUARIO/SaintGrove-net/workflows/CodeQL%20Security%20Analysis/badge.svg)](https://github.com/USUARIO/SaintGrove-net/security)
[![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=saintgrove_saintgrove-net&metric=alert_status)](https://sonarcloud.io/dashboard?id=saintgrove_saintgrove-net)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=saintgrove_saintgrove-net&metric=coverage)](https://sonarcloud.io/dashboard?id=saintgrove_saintgrove-net)
```

**Reemplaza:**
- `USUARIO` con tu GitHub username
- `saintgrove_saintgrove-net` con tu project key de SonarCloud

---

## VERIFICACIÓN DE CONFIGURACIÓN

### ✅ Checklist Completo

**GitHub Actions:**
- [ ] Push hecho a GitHub
- [ ] Workflows aparecen en Actions tab
- [ ] CI workflow ejecutándose/completado
- [ ] CodeQL workflow ejecutándose/completado

**SonarCloud:**
- [ ] Cuenta creada
- [ ] Organización configurada
- [ ] Proyecto importado
- [ ] Token generado
- [ ] Token configurado en GitHub Secrets
- [ ] Job de SonarCloud pasando en CI
- [ ] Dashboard visible en sonarcloud.io

**Dependabot:**
- [ ] Alerts habilitado
- [ ] Security updates habilitado
- [ ] Version updates habilitado
- [ ] Archivo dependabot.yml pusheado
- [ ] Status visible en Dependency graph

**Branch Protection:**
- [ ] Regla creada para main
- [ ] Status checks requeridos
- [ ] PR approvals configurados

**Secrets Configurados:**
- [ ] SONAR_TOKEN en GitHub Secrets
- [ ] RESEND_API_KEY en GitHub Secrets (para contacto)
- [ ] GITHUB_TOKEN (automático)

**Documentación:**
- [ ] README actualizado con badges (opcional)
- [ ] Team notificado del nuevo proceso

---

## MONITOREO Y MANTENIMIENTO

### Daily/Weekly Tasks

**Lunes (Dependabot day):**
- Revisar PRs de Dependabot
- Mergear actualizaciones seguras
- Investigar breaking changes

**Cuando hay PRs:**
- Revisar checks de CI
- Verificar SonarCloud results
- Revisar CodeQL alerts si hay

**Mensual:**
- Revisar Security tab
- Auditar tokens activos
- Actualizar documentación si hay cambios

---

## TROUBLESHOOTING

### Issue: CI workflow falla

**Síntomas:**
❌ Red X en commit

**Soluciones:**

1. **Ver logs:**
   - Actions tab → Click en workflow fallido
   - Click en job fallido
   - Expandir paso fallido

2. **Errores comunes:**
   - `SONAR_TOKEN not found` → Configurar secret en GitHub
   - `npm ci failed` → package-lock.json desincronizado
   - `Tests failed` → Arreglar tests fallidos

### Issue: SonarCloud no aparece

**Síntomas:**
- Job de SonarCloud se salta

**Soluciones:**
1. Verificar SONAR_TOKEN en GitHub Secrets
2. Verificar proyecto existe en SonarCloud
3. Verificar projectKey en sonar-project.properties

### Issue: Dependabot no crea PRs

**Síntomas:**
- No aparecen PRs de Dependabot

**Soluciones:**
1. Verificar Dependabot está habilitado
2. Verificar dependabot.yml syntax
3. Esperar al próximo lunes 09:00 UTC
4. Verificar límite de PRs no alcanzado

---

## PRÓXIMOS PASOS (FASES FUTURAS)

### Fase 2: Backend Integration
- [ ] Configurar STRAPI_API_TOKEN
- [ ] Configurar Cloudinary secrets
- [ ] Tests de integración con Strapi

### Fase 3: Performance & SEO
- [ ] Configurar Google Analytics
- [ ] Lighthouse CI
- [ ] Performance budgets

### Fase 5: Production Deployment
- [ ] Configurar Vercel
- [ ] Configurar Sentry
- [ ] Production monitoring
- [ ] Backup automation

**Ver documentación completa de todos los secrets futuros en:**
`specs/deployment/tokens-and-secrets.md`

---

## RECURSOS Y DOCUMENTACIÓN

### Guías Paso a Paso
- **CI/CD Setup Completo:** `specs/deployment/ci-cd-setup.md`
- **SonarCloud Setup:** `specs/deployment/sonarcloud-setup.md`
- **CodeQL Setup:** `specs/deployment/codeql-setup.md`
- **Dependabot Setup:** `specs/deployment/dependabot-setup.md`
- **Todos los Tokens:** `specs/deployment/tokens-and-secrets.md`
- **Status Badges:** `specs/deployment/STATUS-BADGES.md`

### Workflows Documentation
- **Workflows README:** `.github/workflows/README.md`

### Links Útiles
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [SonarCloud](https://sonarcloud.io/dashboard?id=saintgrove_saintgrove-net)
- [CodeQL Docs](https://codeql.github.com/docs/)
- [Dependabot Docs](https://docs.github.com/en/code-security/dependabot)

---

## SOPORTE

### ¿Necesitas ayuda?

1. **Revisa las guías:** Cada servicio tiene su guía detallada en `specs/deployment/`
2. **Revisa troubleshooting:** Cada guía tiene sección de troubleshooting
3. **Revisa logs:** GitHub Actions logs son muy descriptivos
4. **Consulta documentación oficial:** Links en cada guía

---

## RESUMEN FINAL

### ¿Qué se logró?

✅ **CI/CD Pipeline completo:**
- Lint, TypeCheck, Tests, Build, E2E
- Análisis de seguridad con CodeQL
- Análisis de calidad con SonarCloud
- Actualizaciones automáticas con Dependabot
- Preview builds en PRs

✅ **Documentación exhaustiva:**
- 6 guías paso a paso
- 20+ secrets documentados
- Troubleshooting para cada servicio
- Best practices de seguridad

✅ **Infraestructura lista para:**
- Desarrollo colaborativo
- Code reviews efectivos
- Despliegues seguros
- Monitoreo continuo

### ¿Qué falta configurar?

⏳ **Ahora mismo (Fase 1):**
- Configurar SonarCloud (15 min)
- Habilitar Dependabot (3 min)
- Configurar Resend para emails (10 min)

🔜 **Fases futuras:**
- Strapi & Cloudinary (Fase 2)
- Google Analytics (Fase 3)
- Vercel & Sentry (Fase 5)

---

**SIGUIENTE ACCIÓN INMEDIATA:**

```bash
# 1. Hacer push a GitHub
git push origin main

# 2. Mientras corre el CI, configurar SonarCloud
# Ver: specs/deployment/sonarcloud-setup.md

# 3. Verificar que todo pasa
# GitHub Actions tab → Todos los checks ✅
```

---

**Creado:** 2025-11-10
**Fase:** 1 - Fundamentos Críticos
**Status:** ✅ COMPLETO - Listo para configurar
**Tiempo estimado setup:** 30-45 minutos
