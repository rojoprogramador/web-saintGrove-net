# CI/CD Setup - Guía Completa

## Introducción

Esta guía detalla la configuración completa del sistema de Integración Continua (CI) y Despliegue Continuo (CD) para SaintGrove-net. Nuestro sistema CI/CD garantiza calidad de código, seguridad y despliegues confiables.

### ¿Qué es CI/CD?

- **CI (Continuous Integration):** Automáticamente prueba y valida cada cambio de código
- **CD (Continuous Deployment):** Automáticamente despliega código que pasa todas las pruebas

### ¿Por qué es importante?

- ✅ Detecta errores tempranamente
- ✅ Mantiene alta calidad de código
- ✅ Reduce riesgo de bugs en producción
- ✅ Acelera el desarrollo
- ✅ Documenta el estado del proyecto

---

## Arquitectura del Sistema

```
┌─────────────────┐
│   Git Push/PR   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  GitHub Actions │
└────────┬────────┘
         │
    ┌────┴────┬────────┬──────────┬─────────┐
    ▼         ▼        ▼          ▼         ▼
┌──────┐  ┌──────┐  ┌─────┐  ┌────────┐  ┌────────┐
│ Lint │  │Tests │  │Build│  │CodeQL  │  │Sonar   │
└──────┘  └──────┘  └─────┘  └────────┘  └────────┘
    │         │        │          │         │
    └─────────┴────────┴──────────┴─────────┘
              │
              ▼
        ┌──────────┐
        │  Deploy  │
        └──────────┘
```

---

## Requisitos Previos

### 1. Repositorio GitHub
- ✅ Repositorio creado y configurado
- ✅ Acceso de administrador
- ✅ GitHub Actions habilitado

### 2. Cuentas de Servicios
- [ ] SonarCloud account (ver sonarcloud-setup.md)
- [ ] Codecov account (opcional)
- [ ] Vercel account (Fase 5)

### 3. Herramientas Locales
```bash
# Node.js 18.x o 20.x
node --version

# npm
npm --version

# Git
git --version
```

---

## Paso 1: Verificar Archivos de Configuración

Asegúrate de que los siguientes archivos existan en tu repositorio:

```
SaintGrove-net/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                    ✅
│   │   ├── codeql-analysis.yml       ✅
│   │   └── deploy-preview.yml        ✅
│   ├── dependabot.yml                ✅
│   └── CODEOWNERS                    ✅
└── sonar-project.properties          ✅
```

### Verificación Local

```bash
# Desde la raíz del proyecto
cd "d:\Conocimientos Programacion\SaintGrove-net"

# Verificar archivos
ls -la .github/workflows/
ls -la .github/dependabot.yml
ls -la .github/CODEOWNERS
ls -la sonar-project.properties
```

---

## Paso 2: Configurar GitHub Secrets

Los secrets son variables de entorno seguras que GitHub Actions utiliza.

### Acceder a GitHub Secrets

1. Ve a tu repositorio en GitHub
2. Click en **Settings** → **Secrets and variables** → **Actions**
3. Click en **New repository secret**

### Secrets Requeridos (Fase 1)

#### SONAR_TOKEN (Requerido)
```
Nombre: SONAR_TOKEN
Valor: [Tu token de SonarCloud]
```

**Cómo obtenerlo:**
Ver documentación detallada en `sonarcloud-setup.md`

#### CODECOV_TOKEN (Opcional)
```
Nombre: CODECOV_TOKEN
Valor: [Tu token de Codecov]
```

**Cómo obtenerlo:**
1. Ir a https://codecov.io
2. Conectar con GitHub
3. Seleccionar repositorio SaintGrove-net
4. Copiar token

### Verificar Secrets Configurados

```bash
# Los secrets no se pueden leer, pero puedes verificar que existen
# En GitHub: Settings → Secrets → Actions
# Deberías ver listados (sin valores):
# - SONAR_TOKEN
# - CODECOV_TOKEN (opcional)
```

---

## Paso 3: Configurar Variables de Entorno

Además de secrets, puedes configurar variables no sensibles.

### Variables de Repositorio

1. Ve a **Settings** → **Secrets and variables** → **Actions** → **Variables**
2. Click en **New repository variable**

#### Variables Recomendadas

```
NODE_VERSION: 20.x
WORKING_DIRECTORY: ./frontend
```

---

## Paso 4: Hacer Push a GitHub

Una vez configurados los archivos y secrets:

```bash
# Agregar todos los archivos de CI/CD
git add .github/
git add sonar-project.properties

# Commit
git commit -m "feat: configure CI/CD pipeline with GitHub Actions

- Add CI workflow (lint, test, build, e2e)
- Add CodeQL security analysis
- Add deploy preview workflow
- Configure Dependabot for automated updates
- Add SonarCloud configuration
- Add CODEOWNERS file

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"

# Push to GitHub
git push origin main
```

---

## Paso 5: Verificar Ejecución

### Ver Workflows en Ejecución

1. Ve a tu repositorio en GitHub
2. Click en la pestaña **Actions**
3. Deberías ver los workflows ejecutándose:
   - ✅ CI
   - ✅ CodeQL Security Analysis

### Verificar Status

Cada workflow muestra su estado:
- 🟡 Amarillo = En ejecución
- ✅ Verde = Exitoso
- ❌ Rojo = Fallido

### Revisar Logs

Si un workflow falla:
1. Click en el workflow fallido
2. Click en el job que falló
3. Expande los pasos para ver logs detallados

---

## Paso 6: Configurar Branch Protection

Protege la rama `main` para requerir que los workflows pasen antes de merge.

### Configuración

1. Ve a **Settings** → **Branches**
2. Click en **Add rule** en "Branch protection rules"
3. Configurar:

```
Branch name pattern: main

✅ Require a pull request before merging
   └─ ✅ Require approvals: 1
   └─ ✅ Dismiss stale pull request approvals

✅ Require status checks to pass before merging
   └─ ✅ Require branches to be up to date
   └─ Status checks required:
      - CI / lint
      - CI / typecheck
      - CI / test
      - CI / build
      - CodeQL / analyze

✅ Require conversation resolution before merging

✅ Do not allow bypassing the above settings
```

4. Click **Create** o **Save changes**

---

## Paso 7: Configurar Dependabot

Dependabot ya está configurado con `.github/dependabot.yml`, pero necesitas:

### Habilitar Dependabot Alerts

1. Ve a **Settings** → **Code security and analysis**
2. Habilitar:
   - ✅ Dependabot alerts
   - ✅ Dependabot security updates
   - ✅ Dependabot version updates

### Revisar PRs de Dependabot

Dependabot creará PRs automáticamente cada lunes:
- Frontend dependencies
- GitHub Actions versions

**Cómo revisar:**
1. Ve a **Pull requests**
2. Busca PRs de `dependabot[bot]`
3. Revisa cambios
4. Si los tests pasan, haz merge

---

## Workflows Explicados

### 1. CI Workflow (ci.yml)

**Triggers:**
- Push a `main` o `develop`
- Pull requests a `main` o `develop`

**Jobs:**
1. **Lint:** ESLint para calidad de código
2. **TypeCheck:** Validación de tipos TypeScript
3. **Test:** Tests unitarios con cobertura (Node 18.x y 20.x)
4. **Build:** Build de Next.js (Node 18.x y 20.x)
5. **E2E:** Tests end-to-end con Playwright (solo main)
6. **SonarCloud:** Análisis de calidad y seguridad
7. **Security:** npm audit de vulnerabilidades
8. **Dependency Review:** Revisa cambios de dependencias en PRs

**Artifacts Generados:**
- Coverage reports (7 días)
- Build output (7 días)
- Playwright reports (7 días)

**Duración Esperada:** 8-12 minutos

---

### 2. CodeQL Workflow (codeql-analysis.yml)

**Triggers:**
- Push a `main` o `develop`
- Pull requests a `main` o `develop`
- Schedule: Lunes a las 00:00 UTC

**Análisis de Seguridad:**
- SQL Injection
- XSS (Cross-Site Scripting)
- CSRF (Cross-Site Request Forgery)
- Path Traversal
- Hardcoded secrets
- Insecure dependencies
- Command injection
- Unvalidated redirects
- Sensitive data exposure

**Query Suites:**
- `security-extended`
- `security-and-quality`

**Resultados:**
- Security tab en GitHub
- SARIF artifacts (30 días)

**Duración Esperada:** 5-10 minutos

---

### 3. Deploy Preview Workflow (deploy-preview.yml)

**Triggers:**
- Pull requests (opened, synchronize, reopened)

**Funcionalidad:**
1. Build con URL específica del PR
2. Comment automático en el PR con status
3. Análisis de bundle size
4. Artifacts para revisión

**Características:**
- ✅ Comentario auto-actualizable
- ✅ Bundle size tracking
- ✅ Build artifacts (3 días)
- ✅ Preview URL placeholder

**Nota:** Preview deployments reales requieren Vercel (Fase 5)

**Duración Esperada:** 5-8 minutos

---

## Métricas y Monitoreo

### Dashboards

1. **GitHub Actions**
   - URL: `https://github.com/{user}/{repo}/actions`
   - Métricas: Workflow runs, success rate, duration

2. **SonarCloud**
   - URL: `https://sonarcloud.io/dashboard?id=saintgrove_saintgrove-net`
   - Métricas: Quality Gate, coverage, bugs, vulnerabilities

3. **CodeQL**
   - URL: `https://github.com/{user}/{repo}/security/code-scanning`
   - Métricas: Security alerts, vulnerabilities

### Targets de Calidad

```
✅ CI Success Rate: > 95%
✅ Code Coverage: > 80%
✅ SonarCloud Quality Gate: Pass
✅ CodeQL Alerts: 0 critical/high
✅ Build Time: < 10 minutes
✅ Dependabot PRs: Review within 3 days
```

---

## Troubleshooting

### Issue: Workflow falla con "npm ci" error

**Síntomas:**
```
Error: `npm ci` can only install packages when your package.json and
package-lock.json or npm-shrinkwrap.json are in sync
```

**Solución:**
```bash
cd frontend
rm package-lock.json
npm install
git add package-lock.json
git commit -m "fix: sync package-lock.json"
git push
```

---

### Issue: SonarCloud analysis falla

**Síntomas:**
```
Error: SONAR_TOKEN not found
```

**Solución:**
1. Verificar que `SONAR_TOKEN` está configurado en GitHub Secrets
2. Verificar proyecto en SonarCloud
3. Regenerar token si es necesario
4. Ver `sonarcloud-setup.md` para configuración completa

---

### Issue: CodeQL timeout

**Síntomas:**
```
Error: The job running on runner exceeded the maximum execution time
```

**Solución:**
1. Aumentar timeout en workflow:
```yaml
timeout-minutes: 60
```

2. Revisar tamaño del repositorio
3. Optimizar queries de CodeQL

---

### Issue: E2E tests fallan en CI

**Síntomas:**
```
Error: browserType.launch: Executable doesn't exist
```

**Solución:**
1. Verificar instalación de Playwright browsers:
```yaml
- name: Install Playwright Browsers
  run: npx playwright install --with-deps
```

2. Verificar tests localmente:
```bash
cd frontend
npm run test:e2e
```

---

### Issue: Dependabot PRs no se crean

**Síntomas:**
- No aparecen PRs de Dependabot

**Solución:**
1. Verificar Dependabot está habilitado:
   - Settings → Code security → Dependabot version updates
2. Verificar `.github/dependabot.yml` syntax
3. Revisar logs en Dependabot tab

---

## Optimización y Mejores Prácticas

### 1. Reducir Costos de CI

```yaml
# Skip E2E en branches de features
if: github.ref == 'refs/heads/main'

# Path filters para skip workflows innecesarios
paths:
  - 'frontend/**'

# Concurrency para cancelar runs obsoletos
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

### 2. Acelerar Workflows

```yaml
# Cache de node_modules
- uses: actions/setup-node@v4
  with:
    cache: 'npm'

# Jobs en paralelo
jobs:
  lint:
  typecheck:  # Corre simultáneamente con lint
  test:       # Corre simultáneamente con lint y typecheck
```

### 3. Mejorar Debugging

```yaml
# Enable debug logging
- name: Debug step
  run: echo "Debug info"
  env:
    ACTIONS_STEP_DEBUG: true
```

### 4. Artifacts Strategy

```yaml
# Retención estratégica
retention-days: 7  # Para builds regulares
retention-days: 30 # Para reportes de seguridad
retention-days: 3  # Para preview builds
```

---

## Próximos Pasos

Una vez configurado el CI/CD:

### Fase 1 (Actual) ✅
- [x] CI workflow
- [x] CodeQL security
- [x] Dependabot
- [x] SonarCloud

### Fase 2 (Backend Integration)
- [ ] Tests de integración con Strapi
- [ ] API contract testing
- [ ] Database migrations testing

### Fase 3 (Performance)
- [ ] Lighthouse CI
- [ ] Performance budgets
- [ ] Bundle size tracking

### Fase 5 (Production)
- [ ] Vercel deployment
- [ ] Production smoke tests
- [ ] Rollback procedures
- [ ] Blue-green deployments

---

## Recursos

### Documentación Oficial
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [CodeQL Docs](https://codeql.github.com/docs/)
- [Dependabot Docs](https://docs.github.com/en/code-security/dependabot)

### Documentación del Proyecto
- [SonarCloud Setup](./sonarcloud-setup.md)
- [CodeQL Setup](./codeql-setup.md)
- [Dependabot Setup](./dependabot-setup.md)
- [Tokens and Secrets](./tokens-and-secrets.md)

### Tutoriales
- [GitHub Actions Tutorial](https://docs.github.com/en/actions/quickstart)
- [SonarCloud GitHub Integration](https://docs.sonarcloud.io/advanced-setup/ci-based-analysis/github-actions/)

---

## Checklist Final

Antes de considerar el CI/CD setup completo:

- [ ] Todos los workflows files creados
- [ ] SONAR_TOKEN configurado en GitHub Secrets
- [ ] SonarCloud proyecto configurado
- [ ] Dependabot habilitado
- [ ] Branch protection rules configuradas
- [ ] Primer workflow ejecutado exitosamente
- [ ] Status badges agregados al README
- [ ] Team notificado de nuevo proceso

---

**Última Actualización:** 2025-11-10
**Versión:** 1.0
**Mantenido Por:** SaintGrove DevOps Team
**Siguiente Revisión:** Fase 2 - Backend Integration
