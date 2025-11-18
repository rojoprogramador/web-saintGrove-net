# SonarCloud Setup - Guía Completa

## Introducción

SonarCloud es una plataforma de análisis de código que detecta bugs, vulnerabilidades y code smells. Se integra perfectamente con GitHub para análisis automático en cada commit y pull request.

### ¿Qué hace SonarCloud?

- 🔍 Detecta bugs y code smells
- 🛡️ Identifica vulnerabilidades de seguridad
- 📊 Mide cobertura de tests
- 📈 Calcula technical debt
- ⚡ Proporciona quality gates
- 📉 Rastrea métricas a lo largo del tiempo

### ¿Por qué usar SonarCloud?

- ✅ **Gratuito** para proyectos open source
- ✅ Integración nativa con GitHub
- ✅ Análisis en cada PR
- ✅ Métricas detalladas de calidad
- ✅ Prevención proactiva de bugs

---

## Requisitos Previos

- ✅ Repositorio GitHub (público o privado)
- ✅ Acceso de administrador al repositorio
- ✅ Cuenta de GitHub

---

## Paso 1: Crear Cuenta en SonarCloud

### 1.1 Acceder a SonarCloud

1. Ve a: https://sonarcloud.io
2. Click en **"Sign up free"**
3. Selecciona **"Sign up with GitHub"**

![SonarCloud Homepage](https://sonarcloud.io/images/login/github.svg)

### 1.2 Autorizar SonarCloud

1. GitHub te pedirá autorizar SonarCloud
2. Click en **"Authorize SonarSource"**
3. Ingresa tu password de GitHub si se solicita

### 1.3 Verificación

Deberías ver el dashboard de SonarCloud con tu cuenta conectada.

---

## Paso 2: Crear Organización

### 2.1 Nueva Organización

1. En SonarCloud, click en el avatar (esquina superior derecha)
2. Click en **"Create new organization"**
3. Selecciona tu cuenta de GitHub
4. Click en **"Continue"**

### 2.2 Configurar Organización

```
Organization Key: saintgrove
Display Name: SaintGrove
```

**Importante:** El `Organization Key` debe ser único y en minúsculas.

### 2.3 Plan

1. Selecciona **"Free plan"** (para proyectos públicos)
2. Si es repositorio privado, selecciona plan paid
3. Click en **"Create Organization"**

---

## Paso 3: Importar Repositorio

### 3.1 Analizar Nuevo Proyecto

1. En el dashboard, click en **"Analyze new project"**
2. O ve a: https://sonarcloud.io/projects/create

### 3.2 Seleccionar Repositorio

1. Busca **"SaintGrove-net"** en la lista
2. Check el repositorio
3. Click en **"Set Up"** en la parte inferior

### 3.3 Configuración Inicial

```
Project Key: saintgrove_saintgrove-net
Display Name: SaintGrove.net
```

**Importante:** El `Project Key` debe coincidir con el que está en `sonar-project.properties`.

### 3.4 Método de Análisis

1. Selecciona **"With GitHub Actions"**
2. SonarCloud te mostrará instrucciones

---

## Paso 4: Generar Token de Acceso

### 4.1 Crear Token

1. En la página de setup, busca la sección **"Generate a token"**
2. O ve a: **Account → My Account → Security → Generate Tokens**
3. URL directa: https://sonarcloud.io/account/security

### 4.2 Configurar Token

```
Token Name: SaintGrove-net-GitHub-Actions
Type: Project Analysis Token
Expires in: Never (o 90 days para más seguridad)
Project: saintgrove_saintgrove-net
```

### 4.3 Generar y Copiar

1. Click en **"Generate"**
2. **IMPORTANTE:** Copia el token inmediatamente
3. Guárdalo temporalmente en un lugar seguro
4. **No podrás verlo de nuevo**

**Formato del token:**
```
sqp_1234567890abcdefghijklmnopqrstuvwxyz
```

---

## Paso 5: Configurar GitHub Secret

### 5.1 Ir a GitHub Secrets

1. Ve a tu repositorio en GitHub
2. Click en **Settings**
3. En el menú lateral: **Secrets and variables** → **Actions**
4. Click en **"New repository secret"**

### 5.2 Agregar SONAR_TOKEN

```
Name: SONAR_TOKEN
Secret: [Pega el token de SonarCloud aquí]
```

**Ejemplo:**
```
Name: SONAR_TOKEN
Secret: sqp_1234567890abcdefghijklmnopqrstuvwxyz
```

### 5.3 Guardar

1. Click en **"Add secret"**
2. Deberías ver `SONAR_TOKEN` listado (sin el valor)

---

## Paso 6: Verificar Configuración

### 6.1 Archivo sonar-project.properties

Verifica que existe en la raíz del proyecto:

```properties
# d:\Conocimientos Programacion\SaintGrove-net\sonar-project.properties

sonar.projectKey=saintgrove_saintgrove-net
sonar.organization=saintgrove

sonar.sources=frontend/app,frontend/components,frontend/lib
sonar.tests=frontend/__tests__
```

**Verificar coincidencias:**
- ✅ `projectKey` coincide con el de SonarCloud
- ✅ `organization` coincide con tu organización

### 6.2 Workflow CI

Verifica que el job de SonarCloud está en `.github/workflows/ci.yml`:

```yaml
sonarcloud:
  name: SonarCloud Analysis
  runs-on: ubuntu-latest
  needs: [test]

  steps:
    - uses: SonarSource/sonarcloud-github-action@master
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

---

## Paso 7: Primer Análisis

### 7.1 Trigger Análisis

Puedes triggear el primer análisis de varias formas:

**Opción A: Push a GitHub**
```bash
# Hacer un cambio pequeño
echo "# SonarCloud" >> README.md
git add README.md
git commit -m "docs: trigger SonarCloud first analysis"
git push origin main
```

**Opción B: Re-run Workflow**
1. Ve a **Actions** tab en GitHub
2. Selecciona el último workflow run
3. Click en **"Re-run all jobs"**

### 7.2 Esperar Análisis

1. El workflow tardará ~5-10 minutos
2. Monitorea en **Actions** tab
3. Busca el job **"SonarCloud Analysis"**

### 7.3 Verificar en SonarCloud

1. Ve a https://sonarcloud.io/dashboard?id=saintgrove_saintgrove-net
2. Deberías ver el primer análisis completado
3. Métricas iniciales:
   - Reliability
   - Security
   - Maintainability
   - Coverage
   - Duplications

---

## Paso 8: Configurar Quality Gate

### 8.1 Acceder a Quality Gates

1. En tu proyecto en SonarCloud
2. Click en **"Administration"** (menú superior)
3. Click en **"Quality Gates"**

### 8.2 Quality Gate por Defecto

SonarCloud viene con un Quality Gate llamado **"Sonar way"**:

```
✅ Coverage: Coverage on new code >= 80%
✅ Duplicated Lines: Duplicated lines on new code <= 3%
✅ Maintainability Rating: Maintainability rating on new code = A
✅ Reliability Rating: Reliability rating on new code = A
✅ Security Rating: Security rating on new code = A
✅ Security Hotspots: Security hotspots reviewed >= 100%
```

### 8.3 Quality Gate Personalizado (Opcional)

Si quieres crear uno personalizado:

1. Click en **"Create"**
2. Nombre: `SaintGrove Quality Gate`
3. Agregar condiciones:

```
Condiciones recomendadas:
- Coverage on New Code >= 80%
- Duplicated Lines on New Code <= 3%
- Maintainability Rating on New Code = A
- Reliability Rating on New Code = A
- Security Rating on New Code = A
- Bugs on New Code = 0
- Vulnerabilities on New Code = 0
```

4. Asignar a tu proyecto

---

## Paso 9: Interpretar Resultados

### 9.1 Dashboard Principal

**URL:** https://sonarcloud.io/dashboard?id=saintgrove_saintgrove-net

**Métricas Clave:**

#### Reliability (Fiabilidad)
- **A:** 0 bugs
- **B:** ≥ 1 minor bug
- **C:** ≥ 1 major bug
- **D:** ≥ 1 critical bug
- **E:** ≥ 1 blocker bug

#### Security (Seguridad)
- **A:** 0 vulnerabilities
- **B:** ≥ 1 minor vulnerability
- **C:** ≥ 1 major vulnerability
- **D:** ≥ 1 critical vulnerability
- **E:** ≥ 1 blocker vulnerability

#### Maintainability (Mantenibilidad)
- **A:** Technical debt ratio ≤ 5%
- **B:** 6-10%
- **C:** 11-20%
- **D:** 21-50%
- **E:** > 50%

#### Coverage (Cobertura)
- Porcentaje de código cubierto por tests
- **Target:** ≥ 80%

#### Duplications (Duplicaciones)
- Porcentaje de código duplicado
- **Target:** ≤ 3%

### 9.2 Issues

**Types:**
- 🐛 **Bug:** Error probable en el código
- 🛡️ **Vulnerability:** Problema de seguridad
- 💡 **Code Smell:** Problema de mantenibilidad
- 🔥 **Security Hotspot:** Código sensible que revisar

**Severity:**
- 🔴 **Blocker:** Debe arreglarse inmediatamente
- 🟠 **Critical:** Alto impacto
- 🟡 **Major:** Impacto medio
- 🔵 **Minor:** Impacto bajo
- ⚪ **Info:** Informativo

### 9.3 Technical Debt

SonarCloud calcula el tiempo estimado para arreglar todos los issues:

```
Technical Debt = tiempo para arreglar todos los code smells
```

**Ejemplo:**
```
Technical Debt: 2h 30min
Effort to reach A: 45min
```

---

## Paso 10: Integrar con Pull Requests

### 10.1 Análisis Automático

SonarCloud analiza automáticamente cada PR:

1. Crea un pull request
2. SonarCloud analizará el código nuevo
3. Verás un check de **"SonarCloud Code Analysis"**
4. Click para ver detalles

### 10.2 PR Decoration

SonarCloud agregará un comentario al PR con:

```markdown
## SonarCloud Quality Gate
✅ Quality Gate passed

### Analysis Details
- 0 Bugs
- 0 Vulnerabilities
- 0 Code Smells
- 95% Coverage
- 0% Duplications

[See analysis details on SonarCloud](https://sonarcloud.io/...)
```

### 10.3 Prevenir Merge

Puedes configurar GitHub para **bloquear merge** si Quality Gate falla:

1. GitHub → Settings → Branches
2. Branch protection rules para `main`
3. Enable **"Require status checks to pass"**
4. Selecciona **"SonarCloud Code Analysis"**
5. Save changes

---

## Paso 11: Badges

### 11.1 Obtener Badges

1. En tu proyecto SonarCloud
2. Click en **"Information"** (ℹ️ esquina superior derecha)
3. Sección **"Get project badges"**

### 11.2 Badges Disponibles

#### Quality Gate
```markdown
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=saintgrove_saintgrove-net&metric=alert_status)](https://sonarcloud.io/dashboard?id=saintgrove_saintgrove-net)
```

#### Coverage
```markdown
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=saintgrove_saintgrove-net&metric=coverage)](https://sonarcloud.io/dashboard?id=saintgrove_saintgrove-net)
```

#### Bugs
```markdown
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=saintgrove_saintgrove-net&metric=bugs)](https://sonarcloud.io/dashboard?id=saintgrove_saintgrove-net)
```

#### Vulnerabilities
```markdown
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=saintgrove_saintgrove-net&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=saintgrove_saintgrove-net)
```

#### Code Smells
```markdown
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=saintgrove_saintgrove-net&metric=code_smells)](https://sonarcloud.io/dashboard?id=saintgrove_saintgrove-net)
```

#### Security Rating
```markdown
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=saintgrove_saintgrove-net&metric=security_rating)](https://sonarcloud.io/dashboard?id=saintgrove_saintgrove-net)
```

### 11.3 Agregar al README

```markdown
# SaintGrove.net

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=saintgrove_saintgrove-net&metric=alert_status)](https://sonarcloud.io/dashboard?id=saintgrove_saintgrove-net)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=saintgrove_saintgrove-net&metric=coverage)](https://sonarcloud.io/dashboard?id=saintgrove_saintgrove-net)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=saintgrove_saintgrove-net&metric=security_rating)](https://sonarcloud.io/dashboard?id=saintgrove_saintgrove-net)
```

---

## Troubleshooting

### Issue: "Project not found"

**Síntomas:**
```
Error: Project not found: saintgrove_saintgrove-net
```

**Solución:**
1. Verificar `projectKey` en `sonar-project.properties`
2. Verificar que el proyecto existe en SonarCloud
3. Verificar `organization` es correcta

---

### Issue: "SONAR_TOKEN authentication error"

**Síntomas:**
```
Error: Invalid authentication token
```

**Solución:**
1. Verificar que `SONAR_TOKEN` está configurado en GitHub Secrets
2. Regenerar token en SonarCloud:
   - Account → Security → Generate Tokens
3. Actualizar secret en GitHub
4. Re-run workflow

---

### Issue: Coverage no aparece

**Síntomas:**
- Coverage shows 0% o "-"

**Solución:**
1. Verificar que tests generan lcov.info:
```bash
cd frontend
npm run test:coverage
ls coverage/lcov.info  # Debe existir
```

2. Verificar path en `sonar-project.properties`:
```properties
sonar.javascript.lcov.reportPaths=frontend/coverage/lcov.info
```

3. Verificar workflow corre tests antes de SonarCloud:
```yaml
- name: Run tests with coverage
  run: npm run test:coverage
```

---

### Issue: "Quality Gate failed"

**Síntomas:**
- ❌ Quality Gate status rojo

**Solución:**
1. Click en el badge/enlace para ver detalles
2. Revisar qué condición falló:
   - Coverage insuficiente → Agregar más tests
   - Code smells → Refactorizar código
   - Bugs → Arreglar bugs
   - Vulnerabilities → Arreglar issues de seguridad
3. Arreglar issues
4. Push nuevos cambios
5. SonarCloud analizará de nuevo

---

## Configuración Avanzada

### Exclusiones Personalizadas

Edita `sonar-project.properties`:

```properties
# Excluir archivos generados
sonar.exclusions=**/generated/**,**/*.generated.*

# Excluir archivos de configuración
sonar.exclusions=**/*.config.js,**/*.config.ts

# Excluir directorios específicos
sonar.exclusions=**/migrations/**,**/seeds/**
```

### Configurar Lenguajes

```properties
# Solo analizar TypeScript y JavaScript
sonar.language=ts,tsx,js,jsx

# Path a tsconfig
sonar.typescript.tsconfigPath=frontend/tsconfig.json
```

### Ajustar Umbrales

Puedes ajustar umbrales de Quality Gate:

```
Coverage on New Code >= 80%  → 90% (más estricto)
Duplicated Lines <= 3%       → 2% (más estricto)
```

---

## Mejores Prácticas

### 1. Arreglar Issues Regularmente

- ⏰ Dedica tiempo semanalmente a arreglar code smells
- 🎯 Prioriza bugs y vulnerabilities
- 📊 Monitorea el technical debt

### 2. Mantener Coverage Alto

```bash
# Run tests con coverage localmente
npm run test:coverage

# Target: > 80%
```

### 3. Revisar PRs con SonarCloud

- ✅ No mergear PRs con Quality Gate failed
- ✅ Revisar nuevos issues introducidos
- ✅ Discutir trade-offs de código

### 4. Monitorear Tendencias

- 📈 Coverage subiendo → Bueno
- 📉 Coverage bajando → Alerta
- 📊 Technical debt creciendo → Refactor needed

---

## Recursos

### Documentación Oficial
- [SonarCloud Docs](https://docs.sonarcloud.io/)
- [GitHub Actions Integration](https://docs.sonarcloud.io/advanced-setup/ci-based-analysis/github-actions/)
- [Quality Gates](https://docs.sonarcloud.io/improving/quality-gates/)

### Tutoriales
- [SonarCloud First Analysis](https://docs.sonarcloud.io/getting-started/github/)
- [Understanding Issues](https://docs.sonarcloud.io/improving/issues/)

---

## Checklist Final

Antes de considerar el setup completo:

- [ ] Cuenta de SonarCloud creada
- [ ] Organización configurada
- [ ] Proyecto importado
- [ ] Token generado y configurado en GitHub
- [ ] Primer análisis completado exitosamente
- [ ] Quality Gate configurado
- [ ] PR decoration funcionando
- [ ] Badges agregados al README

---

**Última Actualización:** 2025-11-10
**Versión:** 1.0
**Mantenido Por:** SaintGrove DevOps Team
