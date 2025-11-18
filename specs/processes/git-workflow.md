# 🌿 Git Workflow - SaintGrove-net

> **Guía completa del workflow de Git para el proyecto**
> **Última actualización:** 2025-11-08
> **Versión:** 1.0

---

## 📋 ÍNDICE

1. [Branch Strategy](#-branch-strategy)
2. [Naming Conventions](#-naming-conventions)
3. [Workflow Completo](#-workflow-completo)
4. [Commit Messages](#-commit-messages)
5. [Pull Request Process](#-pull-request-process)
6. [Merge Strategies](#-merge-strategies)
7. [Casos Especiales](#-casos-especiales)
8. [Comandos Útiles](#-comandos-útiles)

---

## 🌳 BRANCH STRATEGY

### Estructura de Branches

```
main (producción)
  ↓
develop (opcional - evaluando necesidad)
  ↓
feature/* (nuevas funcionalidades)
bugfix/* (corrección de bugs)
hotfix/* (fixes críticos en producción)
```

### Descripción de Branches

#### `main`
- **Propósito:** Código en producción
- **Estado:** Siempre estable, deployable
- **Protección:** ✅ Protected (requiere PR + review)
- **Deploy:** Automático a producción (cuando se configure CI/CD)

#### `feature/*`
- **Propósito:** Desarrollo de nuevas funcionalidades
- **Origen:** Se crea desde `main`
- **Merge a:** `main` (vía PR)
- **Lifetime:** Temporal (se elimina después del merge)

#### `bugfix/*`
- **Propósito:** Corrección de bugs encontrados en desarrollo
- **Origen:** Se crea desde `main`
- **Merge a:** `main` (vía PR)
- **Lifetime:** Temporal

#### `hotfix/*`
- **Propósito:** Correcciones urgentes en producción
- **Origen:** Se crea desde `main`
- **Merge a:** `main` (vía PR urgente)
- **Lifetime:** Muy corto
- **Prioridad:** MÁXIMA

---

## 📛 NAMING CONVENTIONS

### Feature Branches

**Formato:**
```bash
feature/descripcion-corta
feature/numero-issue-descripcion
```

**Ejemplos:**
```bash
feature/email-integration
feature/123-blog-system
feature/strapi-setup
feature/analytics-ga4
```

### Bugfix Branches

**Formato:**
```bash
bugfix/descripcion-del-bug
bugfix/issue-123-descripcion
```

**Ejemplos:**
```bash
bugfix/contact-form-validation
bugfix/456-header-mobile-menu
bugfix/typescript-error-services
```

### Hotfix Branches

**Formato:**
```bash
hotfix/descripcion-urgente
hotfix/critical-descripcion
```

**Ejemplos:**
```bash
hotfix/email-api-error
hotfix/critical-payment-bug
hotfix/production-crash
```

### Reglas de Naming

✅ **SÍ:**
- Usar kebab-case (palabras-separadas-por-guiones)
- Ser descriptivo pero conciso
- Incluir número de issue si existe
- Usar inglés o español consistentemente (preferir español para este proyecto)

❌ **NO:**
- Usar espacios
- Usar caracteres especiales (excepto `-` y `/`)
- Nombres genéricos como `fix`, `update`, `test`
- Nombres muy largos (más de 50 caracteres)

---

## 🔄 WORKFLOW COMPLETO

### Workflow Estándar (Feature/Bugfix)

```bash
# 1. Actualizar tu main local
git checkout main
git pull origin main

# 2. Crear nueva branch
git checkout -b feature/mi-nueva-funcionalidad

# 3. Hacer cambios y commits
git add .
git commit -m "feat: agregar nueva funcionalidad"

# 4. Push a remote
git push -u origin feature/mi-nueva-funcionalidad

# 5. Crear Pull Request en GitHub
# (Ver sección Pull Request Process)

# 6. Después del merge, limpiar
git checkout main
git pull origin main
git branch -d feature/mi-nueva-funcionalidad
```

### Workflow Hotfix (Urgente)

```bash
# 1. Desde main (código en producción)
git checkout main
git pull origin main

# 2. Crear hotfix branch
git checkout -b hotfix/critical-fix

# 3. Hacer el fix
# Editar archivos...
git add .
git commit -m "hotfix: corregir error crítico en producción"

# 4. Push urgente
git push -u origin hotfix/critical-fix

# 5. Crear PR URGENTE y notificar al equipo
# 6. Merge inmediato después de review rápido
# 7. Verificar que se deployó correctamente
```

---

## 💬 COMMIT MESSAGES

### Conventional Commits

Usamos el estándar **Conventional Commits** para mensajes consistentes.

**Formato:**
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types Permitidos

| Type | Cuándo Usar | Emoji (opcional) |
|------|-------------|------------------|
| `feat` | Nueva funcionalidad | ✨ |
| `fix` | Corrección de bug | 🐛 |
| `docs` | Cambios en documentación | 📝 |
| `style` | Cambios de formato (no código) | 💄 |
| `refactor` | Refactorización | ♻️ |
| `test` | Agregar/modificar tests | ✅ |
| `chore` | Tareas de mantenimiento | 🔧 |
| `perf` | Mejoras de performance | ⚡ |
| `ci` | Cambios en CI/CD | 👷 |
| `build` | Cambios en build system | 📦 |
| `revert` | Revertir commit anterior | ⏪ |

### Ejemplos de Buenos Commits

```bash
# Feature
git commit -m "feat(contact): integrar Resend API para envío de emails"
git commit -m "feat: agregar página de blog"

# Fix
git commit -m "fix(services): corregir ruta dinámica en [slug]"
git commit -m "fix: resolver error de TypeScript en Button"

# Docs
git commit -m "docs: actualizar README con instrucciones de testing"
git commit -m "docs(roadmap): marcar tarea 1.2 como completada"

# Style
git commit -m "style: formatear código con prettier"
git commit -m "style(button): ajustar padding y colores"

# Refactor
git commit -m "refactor: mover servicios a lib/data/fallback"
git commit -m "refactor(components): reorganizar a estructura feature-based"

# Test
git commit -m "test: agregar tests para ContactForm"
git commit -m "test(button): aumentar coverage a 90%"

# Chore
git commit -m "chore: actualizar dependencias"
git commit -m "chore(deps): bump next to 16.0.2"
```

### Ejemplos de Malos Commits

```bash
❌ "cambios"
❌ "fix"
❌ "update"
❌ "wip"
❌ "asdf"
❌ "final version"
❌ "this should work now"
```

### Commit con Body y Footer

Para cambios complejos:

```bash
git commit -m "feat(strapi): integrar CMS con frontend

- Crear API client en lib/api/client.ts
- Implementar getServices() con fallback
- Actualizar ServicesGrid para usar datos dinámicos
- Agregar error handling robusto

Closes #123
Breaking change: servicesData ahora es async"
```

### Reglas de Commits

✅ **SÍ:**
- Usar presente imperativo ("agregar" no "agregado" o "agregando")
- Primera letra minúscula después del tipo
- Máximo 72 caracteres en la primera línea
- Descripción clara del "qué" y "por qué"

❌ **NO:**
- Commits genéricos sin descripción
- Múltiples cambios no relacionados en un commit
- Commits con errores de TypeScript o lint

---

## 🔀 PULL REQUEST PROCESS

### Antes de Crear el PR

**Checklist:**
- [ ] Todos los tests pasan (`npm run test`)
- [ ] Build exitoso (`npm run build`)
- [ ] Lint sin errores (`npm run lint`)
- [ ] TypeScript sin errores (`npm run type-check`)
- [ ] Código formateado
- [ ] Documentación actualizada si es necesario
- [ ] No hay `console.log()` olvidados
- [ ] No hay comentarios `// TODO` sin issue asociado

### Crear el Pull Request

**Título del PR:**
```
[Type] Descripción corta del cambio

Ejemplos:
[Feature] Integración de email con Resend API
[Fix] Corregir validación en ContactForm
[Docs] Actualizar guía de testing
```

**Template del PR:**

```markdown
## 📋 Descripción

Descripción clara de qué hace este PR.

## 🎯 Tipo de Cambio

- [ ] Feature (nueva funcionalidad)
- [ ] Bugfix (corrección de bug)
- [ ] Hotfix (fix crítico)
- [ ] Refactor (reestructuración de código)
- [ ] Docs (documentación)
- [ ] Test (agregar/modificar tests)

## 🧪 Testing

¿Cómo se testeó?
- [ ] Unit tests agregados/actualizados
- [ ] E2E tests ejecutados
- [ ] Testing manual realizado

## 📸 Screenshots (si aplica)

Agregar screenshots para cambios visuales.

## ✅ Checklist

- [ ] Tests pasan
- [ ] Build exitoso
- [ ] Lint sin errores
- [ ] TypeScript sin errores
- [ ] Documentación actualizada
- [ ] Sin console.logs

## 🔗 Issues Relacionados

Closes #123
Relates to #456

## 📝 Notas Adicionales

Cualquier información adicional relevante.
```

### Review Process

**Reviewers:**
- Al menos **1 review requerido** antes de merge
- Para cambios críticos: **2 reviews**
- Timeframe: Reviewers deben revisar en **24 horas**

**Como Reviewer:**
1. Leer el código completo
2. Verificar que sigue el style guide
3. Verificar que hay tests
4. Ejecutar localmente si es necesario
5. Dejar comentarios constructivos
6. Aprobar o solicitar cambios

**Como Author:**
1. Responder a todos los comments
2. Hacer cambios solicitados
3. Push cambios adicionales
4. Re-request review

### Merge Conditions

**Debe cumplir:**
- ✅ Al menos 1 approval
- ✅ CI/CD passing (cuando se configure)
- ✅ No conflicts con base branch
- ✅ Todos los comments resueltos

---

## 🔀 MERGE STRATEGIES

### Strategy por Tipo de Branch

| Branch Type | Merge Strategy | Razón |
|-------------|---------------|--------|
| `feature/*` | **Squash and merge** | Historia limpia, un commit por feature |
| `bugfix/*` | **Squash and merge** | Historia limpia |
| `hotfix/*` | **Merge commit** | Mantener historial completo del hotfix |
| `docs/*` | **Squash and merge** | Simplificar historia |

### Squash and Merge

**Cuándo:** Features, bugfixes, docs

**Resultado:**
```
* feat: nueva funcionalidad completa (squashed commit)
* fix: corrección de bug (squashed commit)
```

**Ventajas:**
- Historia limpia en main
- Un commit por PR
- Fácil de revertir

### Merge Commit

**Cuándo:** Hotfixes

**Resultado:**
```
*   Merge pull request #123 from hotfix/critical-fix
|\
| * hotfix: corregir error crítico
|/
```

**Ventajas:**
- Mantiene contexto completo
- Fácil identificar hotfixes

---

## 🆘 CASOS ESPECIALES

### Revertir un Commit

```bash
# Revertir el último commit
git revert HEAD

# Revertir commit específico
git revert abc1234

# Crear PR con el revert
git push origin feature/revert-cambio
```

### Resolver Conflicts

```bash
# 1. Actualizar tu branch con main
git checkout feature/mi-branch
git fetch origin
git merge origin/main

# 2. Resolver conflicts manualmente
# Editar archivos con conflicts

# 3. Marcar como resuelto
git add .
git commit -m "merge: resolver conflicts con main"

# 4. Push
git push origin feature/mi-branch
```

### Cambiar Último Commit Message

```bash
# Si NO has hecho push
git commit --amend -m "nuevo mensaje correcto"

# Si YA hiciste push (NO recomendado si otros tienen tu branch)
git commit --amend -m "nuevo mensaje"
git push --force-with-lease origin feature/mi-branch
```

### Actualizar Branch Feature con Cambios de Main

```bash
# Opción 1: Rebase (historia más limpia)
git checkout feature/mi-branch
git fetch origin
git rebase origin/main

# Si hay conflicts, resolver y:
git add .
git rebase --continue

# Push (requiere force porque cambiaste historia)
git push --force-with-lease origin feature/mi-branch

# Opción 2: Merge (más seguro)
git checkout feature/mi-branch
git merge origin/main
git push origin feature/mi-branch
```

### Stash (Guardar Cambios Temporalmente)

```bash
# Guardar cambios sin commit
git stash

# Ver stashes guardados
git stash list

# Recuperar último stash
git stash pop

# Aplicar stash específico
git stash apply stash@{0}
```

---

## 🛠️ COMANDOS ÚTILES

### Navegación

```bash
# Ver branches locales
git branch

# Ver branches remotos
git branch -r

# Ver todos los branches
git branch -a

# Cambiar de branch
git checkout nombre-branch

# Crear y cambiar a nuevo branch
git checkout -b nombre-nuevo-branch
```

### Estado y Logs

```bash
# Ver estado actual
git status

# Ver log simplificado
git log --oneline

# Ver log con gráfico
git log --graph --oneline --all

# Ver cambios no staged
git diff

# Ver cambios staged
git diff --staged
```

### Limpieza

```bash
# Eliminar branch local
git branch -d nombre-branch

# Forzar eliminación de branch local
git branch -D nombre-branch

# Eliminar branch remoto
git push origin --delete nombre-branch

# Limpiar branches remotos que ya no existen
git fetch --prune
```

### Deshacer Cambios

```bash
# Deshacer cambios en archivo (no staged)
git checkout -- nombre-archivo

# Deshacer git add (unstage)
git reset nombre-archivo

# Deshacer último commit (mantener cambios)
git reset --soft HEAD~1

# Deshacer último commit (descartar cambios)
git reset --hard HEAD~1
```

---

## ⚠️ REGLAS IMPORTANTES

### DO ✅

1. **Siempre crear branch desde main actualizado**
2. **Un PR = Una funcionalidad/fix**
3. **Commits pequeños y frecuentes**
4. **Mensajes descriptivos**
5. **Pull antes de push**
6. **Review código propio antes de PR**
7. **Tests antes de merge**

### DON'T ❌

1. **NUNCA commit a main directamente**
2. **NUNCA push --force a main**
3. **NUNCA merge sin review**
4. **NUNCA dejar branches viejos sin eliminar**
5. **NUNCA commitear secretos/API keys**
6. **NUNCA commitear node_modules**
7. **NUNCA usar git add . sin revisar qué agregas**

---

## 🚨 Troubleshooting

### "Cannot push to main"
✅ **Correcto** - Main está protegido. Crea un PR.

### "Merge conflicts"
1. Pull main
2. Merge main en tu branch
3. Resolver conflicts
4. Commit y push

### "Accidentally committed to main"
```bash
# Si NO has hecho push
git reset --soft HEAD~1
git checkout -b feature/mi-cambio
git commit -m "feat: mi cambio"
git push -u origin feature/mi-cambio
```

### "Olvidé crear branch antes de hacer cambios"
```bash
# Guardar cambios
git stash

# Crear branch
git checkout -b feature/nueva-branch

# Recuperar cambios
git stash pop

# Commit
git add .
git commit -m "feat: cambios"
```

---

## 📚 Referencias

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Code Review Guide](./code-review-guide.md)

---

**Última actualización:** 2025-11-08
**Mantenido por:** Equipo SaintGrove
**Versión:** 1.0
