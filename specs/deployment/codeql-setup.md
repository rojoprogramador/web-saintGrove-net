# CodeQL Setup - Análisis de Seguridad

## Introducción

CodeQL es el motor de análisis de código de GitHub que detecta vulnerabilidades de seguridad mediante análisis semántico profundo. Es **gratuito para repositorios públicos** y se integra nativamente con GitHub.

### ¿Qué es CodeQL?

CodeQL trata tu código como datos que pueden ser consultados para encontrar patrones de vulnerabilidades:

```
Código → Base de Datos CodeQL → Queries → Vulnerabilidades
```

### ¿Qué detecta CodeQL?

- 🛡️ **SQL Injection** - Inyección de código SQL
- 🚨 **XSS (Cross-Site Scripting)** - Ejecución de scripts maliciosos
- 🔒 **CSRF (Cross-Site Request Forgery)** - Falsificación de peticiones
- 📁 **Path Traversal** - Acceso no autorizado a archivos
- 🔑 **Hardcoded Secrets** - Credenciales en código
- 📦 **Insecure Dependencies** - Dependencias vulnerables
- ⚡ **Command Injection** - Ejecución de comandos maliciosos
- 🔗 **Unvalidated Redirects** - Redirecciones no validadas
- 📊 **Sensitive Data Exposure** - Exposición de datos sensibles

### ¿Por qué usar CodeQL?

- ✅ **Gratuito** para repos públicos
- ✅ Integración nativa con GitHub
- ✅ Análisis profundo y preciso
- ✅ Actualización constante de queries
- ✅ Soporte para múltiples lenguajes
- ✅ Bajo ratio de falsos positivos

---

## Requisitos Previos

- ✅ Repositorio GitHub (público o privado con Advanced Security)
- ✅ GitHub Actions habilitado
- ✅ Acceso de administrador al repositorio

---

## Paso 1: Verificar Elegibilidad

### 1.1 Repositorios Públicos

CodeQL es **completamente gratuito** para repositorios públicos.

### 1.2 Repositorios Privados

Para repositorios privados, necesitas **GitHub Advanced Security**:

**Verifica si lo tienes:**
1. Ve a tu repositorio
2. Settings → Code security and analysis
3. Busca "Code scanning" section

**Planes con Advanced Security:**
- GitHub Enterprise Cloud
- GitHub Enterprise Server
- GitHub Team (con add-on)

**No disponible en:**
- Free tier para repos privados
- GitHub Free para organizaciones

---

## Paso 2: Habilitar CodeQL (Automático)

### 2.1 Para Repositorios Públicos

CodeQL puede habilitarse de dos formas:

**Opción A: Configuración Automática**

1. Ve a tu repositorio en GitHub
2. Click en **Security** tab
3. Click en **"Set up code scanning"**
4. Selecciona **"CodeQL Analysis"**
5. Click en **"Set up this workflow"**
6. GitHub creará `.github/workflows/codeql-analysis.yml`
7. Commit el archivo

**Opción B: Archivo Pre-configurado (Ya lo tenemos)**

Ya tenemos el workflow configurado en:
```
.github/workflows/codeql-analysis.yml
```

No necesitas hacer nada más, solo push a GitHub.

---

## Paso 3: Entender el Workflow

### 3.1 Estructura del Workflow

Archivo: `.github/workflows/codeql-analysis.yml`

```yaml
name: "CodeQL Security Analysis"

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
  schedule:
    - cron: '0 0 * * 1'  # Lunes a las 00:00 UTC
```

**Triggers:**
- ✅ Push a main/develop
- ✅ Pull requests
- ✅ Schedule semanal (Lunes)

### 3.2 Jobs

```yaml
jobs:
  analyze:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        language: ['javascript-typescript']
```

**Lenguajes soportados:**
- javascript-typescript (nuestro caso)
- python
- java-kotlin
- go
- c-cpp
- csharp
- ruby
- swift

### 3.3 Steps Clave

```yaml
# 1. Inicializar CodeQL
- name: Initialize CodeQL
  uses: github/codeql-action/init@v3
  with:
    languages: javascript-typescript
    queries: security-extended,security-and-quality

# 2. Autobuild (analiza sin compilar para JS/TS)
- name: Autobuild
  uses: github/codeql-action/autobuild@v3

# 3. Realizar análisis
- name: Perform CodeQL Analysis
  uses: github/codeql-action/analyze@v3
```

### 3.4 Query Suites

Usamos dos query suites:

**security-extended:**
- Queries de seguridad comprehensivas
- Cubre CWE Top 25
- OWASP Top 10
- SANS Top 25

**security-and-quality:**
- Queries de seguridad
- Queries de calidad de código
- Más completo pero tarda más

---

## Paso 4: Primer Análisis

### 4.1 Trigger Análisis

**Opción A: Push a GitHub**
```bash
# Si aún no has hecho push del workflow
git add .github/workflows/codeql-analysis.yml
git commit -m "ci: add CodeQL security analysis"
git push origin main
```

**Opción B: Ya configurado**

Si ya hiciste push, CodeQL ya debería estar ejecutándose.

### 4.2 Monitorear Ejecución

1. Ve a tu repositorio en GitHub
2. Click en **Actions** tab
3. Busca workflow **"CodeQL Security Analysis"**
4. Click para ver detalles

**Tiempo esperado:** 5-15 minutos

### 4.3 Verificar Completado

El workflow debe mostrar:
```
✅ Initialize CodeQL
✅ Autobuild
✅ Perform CodeQL Analysis
```

---

## Paso 5: Ver Resultados

### 5.1 Acceder a Security Tab

1. Ve a tu repositorio
2. Click en **Security** tab
3. En el menú lateral, click en **"Code scanning"**

**URL directa:**
```
https://github.com/{user}/{repo}/security/code-scanning
```

### 5.2 Dashboard de Alertas

Verás todas las alertas de seguridad encontradas:

**Estados:**
- 🔴 **Open** - Alerta activa que necesita atención
- 🟢 **Fixed** - Vulnerabilidad arreglada
- ⚪ **Dismissed** - Falso positivo o riesgo aceptado

**Severidad:**
- 🔴 **Critical** - Crítico, arreglar inmediatamente
- 🟠 **High** - Alta prioridad
- 🟡 **Medium** - Prioridad media
- 🔵 **Low** - Baja prioridad

### 5.3 Ver Detalles de Alerta

Click en cualquier alerta para ver:

1. **Descripción:** Qué es la vulnerabilidad
2. **Recommendation:** Cómo arreglarla
3. **Location:** Dónde está en el código
4. **Path:** Data flow de la vulnerabilidad
5. **Example:** Ejemplos de explotación

---

## Paso 6: Interpretar Resultados

### 6.1 Tipos de Vulnerabilidades

#### SQL Injection

**Descripción:**
Permite a un atacante ejecutar SQL arbitrario en tu base de datos.

**Ejemplo vulnerable:**
```typescript
// ❌ VULNERABLE
const query = `SELECT * FROM users WHERE id = ${userId}`;
```

**Solución:**
```typescript
// ✅ SEGURO
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [userId]);
```

---

#### Cross-Site Scripting (XSS)

**Descripción:**
Permite ejecutar JavaScript malicioso en el navegador del usuario.

**Ejemplo vulnerable:**
```typescript
// ❌ VULNERABLE
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

**Solución:**
```typescript
// ✅ SEGURO
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />
```

---

#### Path Traversal

**Descripción:**
Permite acceder a archivos fuera del directorio permitido.

**Ejemplo vulnerable:**
```typescript
// ❌ VULNERABLE
const file = fs.readFileSync(`./uploads/${filename}`);
```

**Solución:**
```typescript
// ✅ SEGURO
import path from 'path';
const safePath = path.join('./uploads', path.basename(filename));
const file = fs.readFileSync(safePath);
```

---

#### Hardcoded Secrets

**Descripción:**
Credenciales o tokens expuestos en el código.

**Ejemplo vulnerable:**
```typescript
// ❌ VULNERABLE
const API_KEY = "sk_live_1234567890abcdefg";
```

**Solución:**
```typescript
// ✅ SEGURO
const API_KEY = process.env.API_KEY;
```

---

#### Command Injection

**Descripción:**
Permite ejecutar comandos del sistema operativo.

**Ejemplo vulnerable:**
```typescript
// ❌ VULNERABLE
exec(`git clone ${repoUrl}`);
```

**Solución:**
```typescript
// ✅ SEGURO
import { execFile } from 'child_process';
execFile('git', ['clone', repoUrl]);
```

---

### 6.2 Niveles de Confianza

**High confidence:**
- 🎯 Muy probablemente una vulnerabilidad real
- Prioridad alta de arreglo

**Medium confidence:**
- ⚠️ Posible vulnerabilidad
- Revisar contexto

**Low confidence:**
- 💭 Posible falso positivo
- Revisar cuidadosamente

---

## Paso 7: Arreglar Vulnerabilidades

### 7.1 Proceso de Remediación

1. **Revisar** la alerta en detalle
2. **Entender** el flujo de datos
3. **Validar** que es una vulnerabilidad real
4. **Arreglar** el código
5. **Test** la solución
6. **Commit** y push
7. **Verificar** que la alerta se cierra

### 7.2 Ejemplo Completo

**Alerta:**
```
SQL injection vulnerability in user query
Severity: High
File: lib/database.ts
Line: 42
```

**Código vulnerable:**
```typescript
// lib/database.ts:42
export async function getUser(id: string) {
  const query = `SELECT * FROM users WHERE id = ${id}`;
  return await db.query(query);
}
```

**Arreglo:**
```typescript
// lib/database.ts:42
export async function getUser(id: string) {
  const query = 'SELECT * FROM users WHERE id = ?';
  return await db.query(query, [id]);
}
```

**Commit:**
```bash
git add lib/database.ts
git commit -m "fix: prevent SQL injection in getUser query

- Use parameterized query instead of string interpolation
- Fixes CodeQL alert CWE-89

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
git push origin main
```

### 7.3 Verificar Arreglo

1. CodeQL analizará el nuevo código
2. Si está arreglado, la alerta se marcará como **Fixed**
3. Verás en Security tab: ✅ Fixed

---

## Paso 8: Gestionar Alertas

### 8.1 Dismiss Alert

Si una alerta es un **falso positivo** o **riesgo aceptado**:

1. Ve a la alerta en Security tab
2. Click en **"Dismiss alert"**
3. Selecciona razón:
   - **False positive** - No es una vulnerabilidad real
   - **Won't fix** - Riesgo conocido y aceptado
   - **Used in tests** - Solo en código de tests
4. Agregar comentario explicando
5. Click **"Dismiss alert"**

**Ejemplo de comentario:**
```
This is a false positive because the input is already sanitized
by the middleware layer before reaching this function.
```

### 8.2 Re-abrir Alert

Si dismisseaste por error:

1. Ve a la alerta
2. Click en **"Reopen"**
3. La alerta volverá a estado Open

---

## Paso 9: Configurar Branch Protection

### 9.1 Bloquear Merge con Alertas

Puedes prevenir merge de PRs con alertas de CodeQL:

1. Settings → Branches
2. Branch protection rules para `main`
3. Enable:
   ```
   ✅ Require status checks to pass before merging
      └─ Select: CodeQL / Analyze (javascript-typescript)
   ```

### 9.2 Configuración Recomendada

```
✅ Require a pull request before merging
✅ Require status checks to pass before merging
   └─ ✅ CodeQL / Analyze (javascript-typescript)
✅ Require conversation resolution before merging
```

---

## Paso 10: Análisis en Pull Requests

### 10.1 Cómo Funciona

Cuando creas un PR:

1. CodeQL analiza **solo el código nuevo/modificado**
2. Compara con el baseline de la rama base
3. Reporta **nuevas vulnerabilidades introducidas**
4. Agrega un check al PR

### 10.2 Ver Resultados en PR

En el PR verás:

```
✅ CodeQL / Analyze (javascript-typescript)
   0 new problems found
```

O si hay problemas:

```
❌ CodeQL / Analyze (javascript-typescript)
   3 new problems found
   - 1 high severity
   - 2 medium severity
```

Click para ver detalles y ubicación exacta.

### 10.3 Arreglar en PR

```bash
# Arreglar vulnerabilidad
# Editar archivo...

# Commit en mismo PR
git add .
git commit -m "fix: address CodeQL security alert"
git push origin feature-branch

# CodeQL re-analizará automáticamente
```

---

## Paso 11: Schedule Scans

### 11.1 Análisis Semanal

Nuestro workflow incluye análisis semanal:

```yaml
schedule:
  - cron: '0 0 * * 1'  # Lunes a las 00:00 UTC
```

**Propósito:**
- Detectar vulnerabilidades en queries actualizadas
- Analizar cambios de dependencies
- Mantener dashboard actualizado

### 11.2 Modificar Schedule

Para cambiar frecuencia, edita el cron:

```yaml
# Diario a las 2 AM
- cron: '0 2 * * *'

# Miércoles y Sábado
- cron: '0 0 * * 3,6'

# Primer día del mes
- cron: '0 0 1 * *'
```

**Herramienta:** https://crontab.guru/

---

## Configuración Avanzada

### Custom Queries

Puedes agregar queries personalizadas:

1. Crear archivo `.github/codeql/codeql-config.yml`:

```yaml
name: "CodeQL Config"

queries:
  - uses: security-extended
  - uses: security-and-quality
  # Agregar queries custom
  - uses: ./custom-queries

paths-ignore:
  - node_modules
  - '**/*.test.ts'
  - '**/*.spec.ts'
```

2. Referenciarlo en workflow:

```yaml
- name: Initialize CodeQL
  uses: github/codeql-action/init@v3
  with:
    config-file: ./.github/codeql/codeql-config.yml
```

### Exclusiones

Excluir archivos del análisis:

```yaml
paths-ignore:
  - 'frontend/e2e/**'
  - '**/*.test.ts'
  - '**/generated/**'
```

---

## Troubleshooting

### Issue: Workflow no se ejecuta

**Síntomas:**
- No aparece en Actions tab

**Solución:**
1. Verificar que el archivo existe:
   ```
   .github/workflows/codeql-analysis.yml
   ```
2. Verificar sintaxis YAML
3. Verificar triggers en `on:`
4. Push un cambio para triggear

---

### Issue: "Advanced Security not enabled"

**Síntomas:**
```
Error: Advanced Security must be enabled for this repository
```

**Solución:**

**Si es repositorio público:**
- No deberías ver este error
- CodeQL es gratuito para repos públicos

**Si es repositorio privado:**
1. Necesitas GitHub Advanced Security
2. O hacer el repositorio público
3. Ver: https://docs.github.com/en/get-started/learning-about-github/about-github-advanced-security

---

### Issue: Muchos falsos positivos

**Síntomas:**
- Muchas alertas que no son vulnerabilidades reales

**Solución:**
1. Revisar contexto de cada alerta
2. Dismiss falsos positivos con comentario
3. Ajustar configuración para excluir archivos:
   ```yaml
   paths-ignore:
     - '**/*.test.ts'
   ```
4. Considerar usar solo `security-extended` en vez de `security-and-quality`

---

## Mejores Prácticas

### 1. Priorizar por Severidad

```
1. 🔴 Critical - Arreglar en < 24 horas
2. 🟠 High - Arreglar en < 1 semana
3. 🟡 Medium - Arreglar en sprint actual
4. 🔵 Low - Backlog
```

### 2. Revisar Semanalmente

- ⏰ Dedicar 30 min cada semana
- 📊 Revisar nuevas alertas
- ✅ Verificar alertas fixed
- 💭 Discutir dismissed alerts

### 3. Educar al Team

- 📚 Compartir alertas interesantes
- 🎓 Explicar vulnerabilidades comunes
- 🛡️ Best practices de seguridad
- 💡 Aprender de errores

### 4. Integrar en PR Process

- ✅ Revisar alertas en cada PR
- ✅ No mergear con alertas high/critical
- ✅ Discutir trade-offs
- ✅ Documentar decisiones

---

## Recursos

### Documentación Oficial
- [CodeQL Documentation](https://codeql.github.com/docs/)
- [CodeQL Queries](https://codeql.github.com/codeql-query-help/)
- [GitHub Code Scanning](https://docs.github.com/en/code-security/code-scanning)

### Learning Resources
- [CodeQL Academy](https://codeql.github.com/docs/codeql-academy/)
- [CodeQL CTF](https://securitylab.github.com/ctf/)
- [Query Examples](https://github.com/github/codeql/tree/main/javascript/ql/examples)

### Security Standards
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [SANS Top 25](https://www.sans.org/top25-software-errors/)

---

## Checklist Final

- [ ] CodeQL workflow creado
- [ ] Primer análisis completado
- [ ] Security tab revisado
- [ ] Alertas entendidas
- [ ] Branch protection configurado
- [ ] Schedule semanal verificado
- [ ] Team notificado del proceso

---

**Última Actualización:** 2025-11-10
**Versión:** 1.0
**Mantenido Por:** SaintGrove DevOps Team
