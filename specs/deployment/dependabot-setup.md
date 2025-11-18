# Dependabot Setup - Actualización Automática de Dependencias

## Introducción

Dependabot es el sistema de GitHub para mantener tus dependencias actualizadas automáticamente. Crea pull requests para actualizar dependencias y alerta sobre vulnerabilidades de seguridad.

### ¿Qué hace Dependabot?

- 🔄 **Version Updates:** Actualiza dependencias automáticamente
- 🛡️ **Security Alerts:** Alerta sobre vulnerabilidades conocidas
- 📦 **Automated PRs:** Crea pull requests con actualizaciones
- 🔍 **Compatibility Checks:** Ejecuta CI antes de notificar
- 📊 **Release Notes:** Incluye changelog en PRs

### ¿Por qué usar Dependabot?

- ✅ **Gratuito** para todos los repositorios
- ✅ Mantiene dependencias actualizadas
- ✅ Reduce vulnerabilidades de seguridad
- ✅ Ahorra tiempo manual
- ✅ Mejora estabilidad del proyecto

---

## Tipos de Dependabot

### 1. Dependabot Alerts (Security)

**Qué hace:**
- Escanea dependencias en busca de vulnerabilidades conocidas
- Alerta cuando encuentra vulnerabilidades
- Sugiere versiones seguras

**Frecuencia:** Continuo (en tiempo real)

**Gratuito:** ✅ Sí, para todos los repositorios

---

### 2. Dependabot Security Updates

**Qué hace:**
- Crea PRs automáticamente para arreglar vulnerabilidades
- Solo actualiza a versiones que arreglan el issue
- Prioriza security fixes

**Frecuencia:** Inmediatamente cuando se detecta vulnerabilidad

**Gratuito:** ✅ Sí, para todos los repositorios

---

### 3. Dependabot Version Updates

**Qué hace:**
- Crea PRs periódicos para actualizar dependencias
- Actualiza a últimas versiones (no solo security)
- Sigue schedule configurado

**Frecuencia:** Configurable (diario, semanal, mensual)

**Gratuito:** ✅ Sí, para todos los repositorios

**Requiere:** Archivo `.github/dependabot.yml`

---

## Paso 1: Habilitar Dependabot

### 1.1 Acceder a Configuración

1. Ve a tu repositorio en GitHub
2. Click en **Settings**
3. En el menú lateral: **Code security and analysis**

### 1.2 Habilitar Features

Habilita las tres opciones:

```
✅ Dependabot alerts
   └─ Get notified when dependencies have security vulnerabilities

✅ Dependabot security updates
   └─ Automatically open pull requests to resolve vulnerabilities

✅ Dependabot version updates
   └─ Keep dependencies up to date with automated pull requests
```

**Cómo habilitar:**
- Click en **"Enable"** para cada opción

### 1.3 Verificación

Deberías ver las tres opciones con estado "Enabled" ✅

---

## Paso 2: Configurar Version Updates

### 2.1 Archivo de Configuración

Ya tenemos el archivo configurado:
```
.github/dependabot.yml
```

### 2.2 Estructura del Archivo

```yaml
version: 2

updates:
  # Frontend npm dependencies
  - package-ecosystem: "npm"
    directory: "/frontend"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    open-pull-requests-limit: 10
```

### 2.3 Verificar Configuración

```bash
# Desde la raíz del proyecto
cd "d:\Conocimientos Programacion\SaintGrove-net"

# Ver contenido
cat .github/dependabot.yml

# Verificar sintaxis con yamllint (si tienes)
yamllint .github/dependabot.yml
```

---

## Paso 3: Entender la Configuración

### 3.1 Package Ecosystems

```yaml
package-ecosystem: "npm"      # npm/yarn packages
directory: "/frontend"        # Dónde está package.json
```

**Ecosistemas soportados:**
- `npm` - JavaScript/Node.js
- `pip` - Python
- `bundler` - Ruby
- `maven` - Java
- `gradle` - Java/Kotlin
- `composer` - PHP
- `nuget` - .NET
- `cargo` - Rust
- `go` - Go modules
- `docker` - Dockerfiles
- `github-actions` - GitHub Actions workflows

### 3.2 Schedule

```yaml
schedule:
  interval: "weekly"           # Frecuencia
  day: "monday"                # Día (para weekly)
  time: "09:00"                # Hora UTC
  timezone: "America/Mexico_City"
```

**Intervalos disponibles:**
- `daily` - Cada día
- `weekly` - Una vez por semana
- `monthly` - Una vez al mes

**Días (para weekly):**
- `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`, `sunday`

### 3.3 PR Limits

```yaml
open-pull-requests-limit: 10
```

**Propósito:**
- Prevenir spam de PRs
- Límite de PRs abiertos simultáneamente
- Default: 5
- Máximo: 10

### 3.4 Reviewers y Assignees

```yaml
reviewers:
  - "SaintGrove-team"

assignees:
  - "SaintGrove-team"
```

**Nota:** Actualiza con tu GitHub username o team:
```yaml
reviewers:
  - "tu-usuario"
  - "@org/team-name"
```

### 3.5 Commit Messages

```yaml
commit-message:
  prefix: "deps"
  prefix-development: "deps-dev"
  include: "scope"
```

**Resultado:**
```
deps(npm): bump react from 19.0.0 to 19.2.0
deps-dev(npm): bump vitest from 4.0.0 to 4.0.8
```

### 3.6 Labels

```yaml
labels:
  - "dependencies"
  - "automated"
  - "frontend"
```

**Propósito:**
- Filtrar PRs de Dependabot
- Automatizar workflows
- Organizar backlog

### 3.7 Groups

```yaml
groups:
  react:
    patterns:
      - "react*"
      - "@types/react*"
```

**Propósito:**
- Agrupar updates relacionadas en un solo PR
- Reduce número de PRs
- Facilita revisión

**Ejemplo de PR agrupado:**
```
deps(npm): bump react group
- react from 19.0.0 to 19.2.0
- react-dom from 19.0.0 to 19.2.0
- @types/react from 19.0.0 to 19.2.2
```

---

## Paso 4: Primer Análisis

### 4.1 Trigger Manual

Después de crear/actualizar `.github/dependabot.yml`:

1. Ve a **Insights** tab
2. Click en **Dependency graph**
3. Click en **Dependabot** tab
4. Deberías ver "Last checked: X minutes ago"

### 4.2 Forzar Check

No hay forma de forzar manualmente, pero Dependabot checkeará:
- Inmediatamente después de configurar
- Según el schedule configurado
- Después de cambios en package.json

### 4.3 Ver Status

```
Insights → Dependency graph → Dependabot

Status: ✅ Checked 5 minutes ago
Next check: In 6 days (Monday 09:00 UTC)
```

---

## Paso 5: Revisar Pull Requests

### 5.1 Encontrar PRs de Dependabot

1. Ve a **Pull requests** tab
2. Filtra por: `is:pr author:app/dependabot`
3. O busca label `dependencies`

### 5.2 Anatomía de un PR de Dependabot

**Título:**
```
deps(npm): bump react from 19.0.0 to 19.2.0
```

**Descripción:**
```markdown
Bumps [react](https://github.com/facebook/react) from 19.0.0 to 19.2.0.

## Release notes
- Fix memory leak in useEffect
- Improve performance of useState

## Commits
- abc1234 Fix useEffect
- def5678 Optimize useState

## Compatibility
✅ All CI checks passed
```

**Metadata:**
```
Labels: dependencies, automated, frontend
Assignee: tu-usuario
Reviewer: tu-usuario
```

### 5.3 Checks Automáticos

Dependabot espera a que pasen los CI checks antes de notificar:

```
✅ CI / lint
✅ CI / typecheck
✅ CI / test
✅ CI / build
```

Solo verás el PR si todos los checks pasan.

---

## Paso 6: Proceso de Revisión

### 6.1 Revisar Cambios

**1. Ver qué cambió:**
```bash
# En el PR, tab "Files changed"
# Deberías ver cambios en:
- package.json (nueva versión)
- package-lock.json (lockfile update)
```

**2. Revisar release notes:**
- Lee la descripción del PR
- Click en links a release notes
- Busca breaking changes

**3. Verificar compatibilidad:**
- Check que CI pasó ✅
- Revisar tests siguen pasando
- No hay warnings en build

### 6.2 Probar Localmente (Opcional)

```bash
# Checkout el branch de Dependabot
git fetch origin
git checkout dependabot/npm_and_yarn/frontend/react-19.2.0

# Instalar dependencias
cd frontend
npm install

# Correr tests
npm test

# Correr build
npm run build

# Correr dev
npm run dev
```

### 6.3 Decisión

**Merge inmediatamente si:**
- ✅ Patch version (19.0.0 → 19.0.1)
- ✅ CI pasó
- ✅ No hay breaking changes
- ✅ Es security update

**Revisar más si:**
- ⚠️ Minor version (19.0.0 → 19.1.0)
- ⚠️ Hay breaking changes mencionados
- ⚠️ Es dependencia core (React, Next.js)

**Postponer si:**
- ❌ Major version (18.0.0 → 19.0.0)
- ❌ Breaking changes significativos
- ❌ Requiere refactoring

---

## Paso 7: Comandos de Dependabot

Puedes controlar Dependabot con comentarios en el PR:

### 7.1 Comandos Disponibles

**@dependabot rebase**
```
Rebases el PR con la rama base más reciente
```

**@dependabot recreate**
```
Recrea el PR desde cero (útil si hay conflictos)
```

**@dependabot merge**
```
Mergea el PR una vez que los checks pasen
```

**@dependabot squash and merge**
```
Squash y merge
```

**@dependabot cancel merge**
```
Cancela merge automático pendiente
```

**@dependabot reopen**
```
Reabre un PR cerrado
```

**@dependabot close**
```
Cierra el PR y ignora la actualización
```

**@dependabot ignore this [major|minor|patch] version**
```
Ignora esta versión específica
Ejemplo: @dependabot ignore this minor version
```

**@dependabot ignore this dependency**
```
Ignora todas las actualizaciones futuras de esta dependencia
```

**@dependabot unignore this dependency**
```
Deja de ignorar esta dependencia
```

### 7.2 Ejemplo de Uso

```markdown
# En un comentario del PR:

@dependabot rebase

# Dependabot responderá:
OK, I'll rebase this pull request now.
```

---

## Paso 8: Security Alerts

### 8.1 Ver Alerts

1. Ve a **Security** tab
2. Click en **"Dependabot alerts"** en el menú lateral

**URL directa:**
```
https://github.com/{user}/{repo}/security/dependabot
```

### 8.2 Anatomía de un Alert

**Ejemplo:**
```
🚨 High severity vulnerability in react

Package: react
Affected versions: < 19.2.0
Patched version: 19.2.0

Description:
Memory corruption vulnerability that could lead to
arbitrary code execution.

CVE: CVE-2024-12345
CVSS Score: 8.1 (High)

Recommendation:
Update to version 19.2.0 or later
```

### 8.3 Tipos de Severity

- 🔴 **Critical** - Requiere acción inmediata (CVSS 9.0-10.0)
- 🟠 **High** - Arreglar urgentemente (CVSS 7.0-8.9)
- 🟡 **Moderate** - Arreglar pronto (CVSS 4.0-6.9)
- 🔵 **Low** - Monitorear (CVSS 0.1-3.9)

### 8.4 Acciones

**Si hay Dependabot security update disponible:**
```
✅ Dependabot security update available

[View pull request]
```

Click para ir al PR y hacer merge.

**Si no hay update disponible:**
```
⚠️ No fix available yet

Monitor this alert and check back later.
```

---

## Paso 9: Auto-merge (Opcional)

### 9.1 Habilitar Auto-merge

Puedes auto-mergear PRs de Dependabot que pasen todos los checks:

**En el PR:**
1. Click en **"Enable auto-merge"**
2. Selecciona merge method (squash recomendado)
3. El PR se mergeará automáticamente cuando:
   - ✅ Todos los checks pasen
   - ✅ Approvals requeridos (si aplica)

### 9.2 Auto-merge por Label (GitHub Actions)

Crear workflow para auto-merge:

```yaml
# .github/workflows/dependabot-auto-merge.yml
name: Dependabot Auto-merge

on:
  pull_request:
    types: [labeled, unlabeled, synchronize, opened, reopened]

permissions:
  pull-requests: write
  contents: write

jobs:
  auto-merge:
    runs-on: ubuntu-latest
    if: github.actor == 'dependabot[bot]'

    steps:
      - name: Enable auto-merge for Dependabot PRs
        run: gh pr merge --auto --squash "$PR_URL"
        env:
          PR_URL: ${{github.event.pull_request.html_url}}
          GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}
```

**Nota:** Solo auto-mergea patch versions para seguridad.

---

## Paso 10: Ignorar Dependencias

### 10.1 En dependabot.yml

```yaml
ignore:
  # Ignorar major updates de React
  - dependency-name: "react"
    update-types: ["version-update:semver-major"]

  # Ignorar completamente una dependencia
  - dependency-name: "legacy-package"
```

### 10.2 Via Comando

En el PR de Dependabot:

```markdown
@dependabot ignore this major version
```

### 10.3 Via UI

1. Ve al alert o PR
2. Click en **"Dismiss"** o **"Close"**
3. Selecciona razón
4. Agregar comentario

---

## Configuración Avanzada

### Grupos Inteligentes

```yaml
groups:
  # Agrupar todo testing
  testing:
    patterns:
      - "@testing-library/*"
      - "@vitest/*"
      - "vitest"
      - "@playwright/*"

  # Agrupar tipos
  types:
    patterns:
      - "@types/*"
    exclude-patterns:
      - "@types/react*"
```

### Estrategias de Versioning

```yaml
versioning-strategy: "auto"
```

**Opciones:**
- `auto` - Sigue package.json version format
- `increase` - Siempre incrementa versión
- `increase-if-necessary` - Solo incrementa si necesario
- `lockfile-only` - Solo actualiza lockfile
- `widen` - Amplía version range

### Target Branch

```yaml
target-branch: "develop"
```

**Por defecto:** rama default del repo (main)

---

## Troubleshooting

### Issue: PRs no se crean

**Síntomas:**
- Dependabot configurado pero no aparecen PRs

**Posibles causas:**

1. **Límite de PRs alcanzado:**
   ```yaml
   open-pull-requests-limit: 10  # Aumentar
   ```

2. **CI checks fallan:**
   - Dependabot espera a que CI pase
   - Arregla tests fallidos primero

3. **No hay actualizaciones disponibles:**
   - Todas las dependencias están actualizadas

4. **Schedule no ha llegado:**
   - Espera al próximo lunes 09:00 UTC

**Solución:**
```bash
# Verificar status
# Insights → Dependency graph → Dependabot
```

---

### Issue: "Error creating pull request"

**Síntomas:**
```
Error creating pull request: API rate limit exceeded
```

**Solución:**
- Esperar 1 hora (GitHub rate limits)
- Reducir `open-pull-requests-limit`

---

### Issue: Conflictos en package-lock.json

**Síntomas:**
- PR tiene conflictos de merge

**Solución:**
```markdown
# En el PR:
@dependabot rebase
```

---

### Issue: CI falla en PR de Dependabot

**Síntomas:**
- ❌ Tests fallan en PR

**Solución:**

1. **Si es breaking change:**
   - Revisar release notes
   - Actualizar código para nueva API
   - Commit en PR de Dependabot

2. **Si es incompatibilidad:**
   - Cerrar PR
   - Investigar issue
   - Actualizar manualmente cuando esté arreglado

---

## Mejores Prácticas

### 1. Review Regularmente

```
⏰ Lunes por la mañana (después de que Dependabot corra)
📋 Review todos los PRs abiertos
✅ Merge los que sean safe
📌 Label los que requieren más review
```

### 2. Priorizar Security Updates

```
1. 🔴 Critical security → Merge inmediatamente
2. 🟠 High security → Review y merge mismo día
3. 🟡 Moderate security → Merge en 1 semana
4. 📦 Version updates → Review cuando tengas tiempo
```

### 3. Agrupar Updates

```yaml
# En vez de 10 PRs separados:
deps(npm): bump lucide-react
deps(npm): bump framer-motion
...

# Un solo PR:
deps(npm): bump ui group
- lucide-react 0.550.0 → 0.552.0
- framer-motion 12.20.0 → 12.23.24
```

### 4. Documentar Decisiones

```markdown
# En PR que postpones:
Postponing this update until next sprint because it
requires refactoring the authentication flow.

@dependabot ignore this major version
```

### 5. Monitorear Tendencias

```
📈 Metrics to track:
- Average time to merge Dependabot PRs
- Number of ignored updates
- Security alerts open
- Dependencies out of date
```

---

## Recursos

### Documentación Oficial
- [Dependabot Docs](https://docs.github.com/en/code-security/dependabot)
- [Configuration Options](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file)
- [Commands](https://docs.github.com/en/code-security/dependabot/working-with-dependabot/managing-pull-requests-for-dependency-updates)

### Herramientas
- [Cron Generator](https://crontab.guru/)
- [YAML Validator](https://www.yamllint.com/)

---

## Checklist Final

- [ ] Dependabot alerts habilitado
- [ ] Dependabot security updates habilitado
- [ ] Dependabot version updates habilitado
- [ ] Archivo dependabot.yml configurado
- [ ] Reviewers y assignees configurados
- [ ] Groups configurados
- [ ] Primer PR de Dependabot revisado
- [ ] Proceso de review documentado con team

---

**Última Actualización:** 2025-11-10
**Versión:** 1.0
**Mantenido Por:** SaintGrove DevOps Team
