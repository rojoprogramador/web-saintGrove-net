# 👁️ Code Review Guide - SaintGrove-net

> **Guía completa para realizar y recibir code reviews efectivos**
> **Última actualización:** 2025-11-08
> **Versión:** 1.0

---

## 📋 ÍNDICE

1. [Propósito del Code Review](#-propósito-del-code-review)
2. [Roles y Responsabilidades](#-roles-y-responsabilidades)
3. [Checklist del Reviewer](#-checklist-del-reviewer)
4. [Criterios de Aprobación](#-criterios-de-aprobación)
5. [Cómo Hacer un Buen Review](#-cómo-hacer-un-buen-review)
6. [Cómo Recibir Feedback](#-cómo-recibir-feedback)
7. [Red Flags y Blockers](#-red-flags-y-blockers)
8. [Ejemplos de Comments](#-ejemplos-de-comments)

---

## 🎯 PROPÓSITO DEL CODE REVIEW

### ¿Por Qué Hacemos Code Review?

1. **Calidad del Código**
   - Detectar bugs antes de producción
   - Asegurar código mantenible
   - Seguir estándares del proyecto

2. **Compartir Conocimiento**
   - Aprender de otros developers
   - Difundir mejores prácticas
   - Entender diferentes partes del codebase

3. **Seguridad**
   - Prevenir vulnerabilidades
   - Evitar exposure de secretos
   - Validar input sanitization

4. **Consistencia**
   - Código uniforme en todo el proyecto
   - Mismos patterns y convenciones
   - Arquitectura coherente

---

## 👥 ROLES Y RESPONSABILIDADES

### Author (Quien Crea el PR)

**Antes de Crear el PR:**
- [ ] Ejecutar todos los tests localmente
- [ ] Verificar que el build pasa
- [ ] Ejecutar linter y corregir errores
- [ ] Verificar TypeScript sin errores
- [ ] Hacer self-review del código
- [ ] Escribir descripción clara del PR
- [ ] Agregar screenshots si hay cambios visuales

**Durante el Review:**
- [ ] Responder a todos los comments (dentro de 24h)
- [ ] Hacer cambios solicitados
- [ ] Explicar decisiones de diseño si es necesario
- [ ] Re-request review después de cambios
- [ ] Agradecer el feedback constructivo

**Después del Review:**
- [ ] Hacer merge cuando esté aprobado
- [ ] Eliminar la branch feature
- [ ] Verificar que el deploy fue exitoso (cuando aplique)

### Reviewer

**Al Recibir una Request:**
- [ ] Revisar dentro de 24 horas
- [ ] Leer la descripción del PR completa
- [ ] Entender el contexto del cambio

**Durante el Review:**
- [ ] Revisar cada archivo modificado
- [ ] Verificar lógica de negocio
- [ ] Buscar posibles bugs
- [ ] Verificar tests
- [ ] Verificar performance implications
- [ ] Dejar comments constructivos y específicos
- [ ] Aprobar o solicitar cambios con razones claras

**Después del Review:**
- [ ] Verificar que el author respondió a comments
- [ ] Re-review si hubo cambios significativos
- [ ] Aprobar cuando todo esté correcto

---

## ✅ CHECKLIST DEL REVIEWER

### 1. FUNCIONALIDAD

- [ ] **El código hace lo que dice que hace**
  - ¿La descripción del PR coincide con los cambios?
  - ¿Resuelve el problema/feature completo?

- [ ] **No rompe funcionalidad existente**
  - ¿Podría este cambio afectar otras partes del código?
  - ¿Se consideraron edge cases?

- [ ] **Lógica de negocio correcta**
  - ¿El approach es correcto?
  - ¿Hay un mejor way de hacerlo?

### 2. TESTING

- [ ] **Tests existen y son adecuados**
  - ¿Hay tests para el nuevo código?
  - ¿Los tests cubren casos edge?
  - ¿Los tests son claros y mantenibles?

- [ ] **Tests pasan**
  - ¿Todos los tests pasan en CI?
  - ¿El coverage no disminuyó?

- [ ] **Tests son significativos**
  - ¿Los tests realmente validan la funcionalidad?
  - ¿No son tests triviales o mock excesivo?

### 3. CODE QUALITY

- [ ] **Código es legible**
  - ¿Variables tienen nombres descriptivos?
  - ¿Funciones tienen un solo propósito?
  - ¿Es fácil entender qué hace el código?

- [ ] **No hay código duplicado**
  - ¿Se reutiliza código existente?
  - ¿Nuevas utilidades están en lib/utils?

- [ ] **Funciones no son muy largas**
  - ¿Funciones tienen menos de ~50 líneas?
  - ¿Se pueden extraer subfunciones?

- [ ] **Complejidad razonable**
  - ¿Evita complejidad innecesaria?
  - ¿Es el approach más simple posible?

### 4. TYPESCRIPT & TYPE SAFETY

- [ ] **Sin errores de TypeScript**
  - ¿Compila sin errores?
  - ¿Sin warnings?

- [ ] **Types apropiados**
  - ¿No usa `any`? (o justificado si lo hace)
  - ¿Interfaces bien definidas?
  - ¿Types reutilizables en /types?

- [ ] **Type safety mantenido**
  - ¿No hay type assertions innecesarios?
  - ¿Null/undefined manejados correctamente?

### 5. REACT & NEXT.JS BEST PRACTICES

- [ ] **Componentes bien estructurados**
  - ¿Separación de concerns?
  - ¿Componentes reutilizables?
  - ¿Props bien definidas?

- [ ] **Hooks usados correctamente**
  - ¿Reglas de hooks respetadas?
  - ¿Dependencies arrays correctos?
  - ¿useEffect necesario?

- [ ] **Performance considerations**
  - ¿React.memo cuando es apropiado?
  - ¿No re-renders innecesarios?
  - ¿Lazy loading si aplica?

- [ ] **Next.js patterns**
  - ¿'use client' solo cuando necesario?
  - ¿Server components por defecto?
  - ¿Metadata correcta?

### 6. STYLING (TAILWIND CSS)

- [ ] **Usa Tailwind correctamente**
  - ¿No inline styles?
  - ¿Usa utility classes?
  - ¿Colores de marca (primary-green, etc.)?

- [ ] **Responsive design**
  - ¿Usa breakpoints (md:, lg:, etc.)?
  - ¿Se ve bien en mobile?

- [ ] **Accesibilidad**
  - ¿Contraste de colores adecuado?
  - ¿Usa semantic HTML?

### 7. SEGURIDAD

- [ ] **No secrets en código**
  - ¿API keys en .env?
  - ¿No passwords hardcodeados?

- [ ] **Input validation**
  - ¿User input es validado?
  - ¿Sanitización correcta?

- [ ] **No vulnerabilidades obvias**
  - ¿No SQL injection?
  - ¿No XSS?
  - ¿No eval() o similar?

### 8. PERFORMANCE

- [ ] **No performance regressions**
  - ¿Bundle size no aumentó significativamente?
  - ¿No imports innecesarios?

- [ ] **Optimizaciones apropiadas**
  - ¿Images optimizadas?
  - ¿Lazy loading cuando apropiado?
  - ¿No loops ineficientes?

### 9. DOCUMENTACIÓN

- [ ] **Código auto-documentado**
  - ¿Nombres claros?
  - ¿Lógica fácil de seguir?

- [ ] **Comments cuando necesario**
  - ¿Explica "por qué" no "qué"?
  - ¿No comments obsoletos?

- [ ] **Documentación actualizada**
  - ¿README actualizado si es necesario?
  - ¿Specs actualizados?
  - ¿ROADMAP marcado si es una tarea?

### 10. ARQUITECTURA

- [ ] **Sigue la arquitectura del proyecto**
  - ¿Archivos en directorios correctos?
  - ¿Naming conventions seguidas?
  - ¿Patterns del proyecto respetados?

- [ ] **No acopla componentes innecesariamente**
  - ¿Dependencias claras?
  - ¿No circular dependencies?

### 11. GIT

- [ ] **Commits limpios**
  - ¿Conventional commits?
  - ¿Mensajes descriptivos?
  - ¿No commits "fix typo" múltiples?

- [ ] **No archivos innecesarios**
  - ¿No .env files?
  - ¿No node_modules?
  - ¿No archivos de IDE?

---

## 🎯 CRITERIOS DE APROBACIÓN

### ✅ Aprobar Cuando:

**TODOS estos son verdad:**
1. ✅ Funcionalidad es correcta
2. ✅ Tests pasan y coverage adecuado
3. ✅ Code quality es buena
4. ✅ No hay security issues
5. ✅ Sigue convenciones del proyecto
6. ✅ Documentación actualizada
7. ✅ No hay errores de TypeScript/lint

**Phrases para aprobar:**
```
✅ "LGTM (Looks Good To Me)"
✅ "Great work! Approved ✅"
✅ "Nice solution! Merging"
✅ "Excellent tests! Approved"
```

### ⏸️ Request Changes Cuando:

**CUALQUIERA de estos:**
- ❌ Lógica de negocio incorrecta
- ❌ Bugs evidentes
- ❌ Security vulnerabilities
- ❌ Tests faltan o son inadecuados
- ❌ Rompe convenciones del proyecto
- ❌ Performance issues significativos
- ❌ Código ilegible o muy complejo

**Phrases para request changes:**
```
🔴 "Requesting changes - found potential bug in..."
🔴 "Please add tests for..."
🔴 "Security concern: API key exposed in..."
🔴 "This breaks the existing architecture..."
```

### 💬 Comment (Sin Aprobar ni Rechazar) Cuando:

**Sugerencias no bloqueantes:**
- 💡 Optimizaciones opcionales
- 💡 Mejores prácticas (nice-to-have)
- 💡 Preguntas de aprendizaje
- 💡 Sugerencias de refactor futuro

**Phrases para comments:**
```
💡 "Nit: consider using..."
💡 "Optional: this could be simplified..."
💡 "Question: why did you choose X over Y?"
💡 "Suggestion: maybe extract this to a util?"
```

---

## 🌟 CÓMO HACER UN BUEN REVIEW

### DO ✅

1. **Ser Constructivo**
   ```
   ✅ "Consider extracting this logic to a separate function for better readability"
   ❌ "This code is terrible"
   ```

2. **Ser Específico**
   ```
   ✅ "Line 45: This variable name 'x' is not descriptive. Suggest 'userId' instead"
   ❌ "Variable names are bad"
   ```

3. **Explicar el Por Qué**
   ```
   ✅ "Using useMemo here would prevent recalculations on every render, improving performance"
   ❌ "Use useMemo"
   ```

4. **Ofrecer Soluciones**
   ```
   ✅ "This could cause a memory leak. Try using useEffect cleanup:
        return () => clearInterval(intervalId)"
   ❌ "Memory leak here"
   ```

5. **Reconocer Buen Código**
   ```
   ✅ "Nice solution! 👍 This approach is much cleaner than the previous one"
   ✅ "Great test coverage! 💯"
   ```

6. **Usar Prefijos para Claridad**
   - `Nit:` - Detalle menor, no bloqueante
   - `Question:` - Pregunta para entender
   - `Suggestion:` - Idea opcional
   - `Important:` - Debe ser abordado
   - `Blocker:` - Debe ser resuelto antes de merge

### DON'T ❌

1. **No Ser Personal**
   ```
   ❌ "You don't know how to use React properly"
   ✅ "This useEffect is missing dependencies. Add them to the array"
   ```

2. **No Ser Vago**
   ```
   ❌ "This needs work"
   ✅ "This function is doing too many things. Suggest splitting into:
       - validateInput()
       - processData()
       - saveResults()"
   ```

3. **No Solo Criticar**
   ```
   ❌ Solo señalar problemas
   ✅ Señalar problemas Y reconocer lo bueno
   ```

4. **No Review Apresurado**
   - Tómate el tiempo necesario
   - Entiende el contexto completo
   - Revisa todos los archivos

5. **No Imponer Preferencias Personales**
   ```
   ❌ "I prefer X framework"
   ✅ "According to our architecture guide, we use Y"
   ```

---

## 🤝 CÓMO RECIBIR FEEDBACK

### DO ✅

1. **Agradecer el Feedback**
   ```
   ✅ "Good catch! Thanks for spotting that"
   ✅ "Great suggestion! I'll implement it"
   ```

2. **Pedir Aclaraciones**
   ```
   ✅ "Could you elaborate on why this approach is better?"
   ✅ "I'm not sure I understand - could you provide an example?"
   ```

3. **Explicar Decisiones (si es necesario)**
   ```
   ✅ "I chose this approach because of X constraint.
       However, I'm open to alternatives if you have suggestions"
   ```

4. **Implementar Cambios Rápido**
   - Responder en menos de 24 horas
   - Hacer cambios solicitados
   - Re-request review

5. **Aprender del Feedback**
   - Tomar nota de errores comunes
   - Evitarlos en futuros PRs

### DON'T ❌

1. **No Ponerse Defensivo**
   ```
   ❌ "This is fine, you're being too picky"
   ✅ "I see your point. Let me refactor this"
   ```

2. **No Ignorar Comments**
   - Responder a TODOS los comments
   - Resolver o explicar cada uno

3. **No Tomar Como Personal**
   - Es review del código, no de ti
   - Objetivo es mejorar el proyecto

4. **No Discutir Excesivamente**
   - Si hay desacuerdo, proponer alternativas
   - Si persiste, escalar a arquitecto/lead

---

## 🚨 RED FLAGS Y BLOCKERS

### 🔴 BLOQUEADORES ABSOLUTOS (No Merge)

1. **Security Issues**
   - API keys en código
   - Secrets expuestos
   - Vulnerabilidades obvias (SQL injection, XSS)

2. **Tests No Pasan**
   - CI/CD en rojo
   - Tests fallando

3. **Build Roto**
   - No compila
   - Errores de TypeScript

4. **Lógica Fundamentalmente Incorrecta**
   - No resuelve el problema
   - Introduce bugs críticos

### 🟠 RED FLAGS (Requieren Atención)

1. **No Hay Tests**
   - Código nuevo sin tests
   - Coverage disminuye significativamente

2. **Código Duplicado**
   - Copy-paste de lógica existente
   - No reutiliza utilities

3. **Complejidad Excesiva**
   - Funciones muy largas (>100 líneas)
   - Nesting profundo (>4 niveles)
   - Lógica difícil de seguir

4. **Performance Issues**
   - Loops ineficientes
   - N+1 queries
   - Bundle size aumenta mucho

5. **Falta Documentación**
   - Código complejo sin comments
   - README no actualizado
   - Breaking changes sin documentar

---

## 💬 EJEMPLOS DE COMMENTS

### Sugerencias de Mejora

```markdown
**Nit: Variable Naming**
`data` is too generic. Consider `userProfile` or `serviceInfo` for clarity.

**Suggestion: Extract Function**
This logic could be extracted to `lib/utils/validation.ts` for reusability:
```typescript
export function isValidEmail(email: string): boolean {
  // validation logic
}
```

**Question: Alternative Approach**
Have you considered using `useCallback` here to prevent re-renders?
```

### Detectar Bugs

```markdown
**Important: Potential Bug**
Line 42: This will crash if `user` is undefined. Add null check:
```typescript
if (!user) return null;
```

**Blocker: Memory Leak**
This useEffect is missing cleanup. Add:
```typescript
return () => {
  clearInterval(intervalId);
};
```
```

### Performance

```markdown
**Performance: Optimize Re-renders**
This component re-renders on every parent update. Wrap with `React.memo`:
```typescript
export const ExpensiveComponent = React.memo(({ data }) => {
  // component
});
```

**Suggestion: Lazy Load**
Consider lazy loading this heavy component:
```typescript
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```
```

### Testing

```markdown
**Important: Missing Tests**
Please add tests for:
- Happy path
- Error cases
- Edge cases (empty array, null values)

Example:
```typescript
describe('getServiceBySlug', () => {
  it('should return service when slug exists', () => {
    // test
  });

  it('should return undefined when slug does not exist', () => {
    // test
  });
});
```
```

### Reconocimiento

```markdown
**Nice work! 👍**
Great use of TypeScript generics here. Very clean and reusable.

**Excellent! 💯**
Test coverage is outstanding. Love the edge case coverage.

**Smart solution! 🎯**
This approach is much more performant than the previous implementation.
```

---

## 📊 MÉTRICAS DE SUCCESS

### Review Efectivo

- ⏱️ **Tiempo de review:** < 24 horas
- 💬 **Comments útiles:** > 2 por review (si hay issues)
- ✅ **Approval rate:** ~80% de PRs aprobados sin cambios mayores
- 🔄 **Iterations:** < 3 rondas de cambios

### PR Bien Preparado

- ✅ **Tests:** 100% pasan
- 📝 **Descripción:** Clara y completa
- 🎯 **Scope:** Enfocado (1 feature/fix)
- 📸 **Screenshots:** Si hay cambios visuales
- 🏷️ **Labels:** Apropiados

---

## 🔗 RECURSOS ADICIONALES

- [Git Workflow](./git-workflow.md)
- [Testing Guide](../setup/testing.md)
- [Component Guidelines](../COMO-FUNCIONA-EL-PROYECTO.md#componentes)
- [Architecture Guide](../COMO-FUNCIONA-EL-PROYECTO.md#arquitectura-general)

---

## 📋 QUICK REFERENCE

### Review Checklist (Mínimo)
```
[ ] Funcionalidad correcta
[ ] Tests pasan y coverage OK
[ ] No security issues
[ ] TypeScript sin errores
[ ] Sigue convenciones
[ ] Documentación actualizada
```

### Approval Criteria
```
✅ Todo en checklist OK
✅ CI/CD passing
✅ No conflicts
✅ Comments resueltos
```

### Types of Feedback
```
Nit: Detalles menores
Question: Para entender
Suggestion: Opcional
Important: Debe ser abordado
Blocker: Crítico
```

---

**Última actualización:** 2025-11-08
**Mantenido por:** Equipo SaintGrove
**Versión:** 1.0
