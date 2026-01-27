---
name: commits
version: 1.0.0
description: Estructurar la forma de generar commits de los cambios 
---

## Objetivo

Generar commits estructurados siguiendo el formato de Conventional Commits, agrupando cambios relacionados y procesando todos los archivos modificados de forma sistemática.

## Cuándo Usar

Úsalo cuando el usuario:
- Dice "commit" o "git commit"
- Solicita confirmar cambios
- Desea crear un commit
- El trabajo está completo y listo para confirmar

## Formato de Commit

### Tipos Convencionales

- **feat**: nuevas funcionalidades
- **fix**: correcciones de bugs
- **docs**: cambios en documentación
- **style**: formato, puntos y comas faltantes, etc.
- **refactor**: reestructuración de código sin cambiar funcionalidad
- **test**: agregar o actualizar tests
- **chore**: tareas de mantenimiento, dependencias, proceso de build
- **perf**: mejoras de rendimiento
- **ci**: cambios en integración continua

### Estructura del Mensaje

```
<tipo>: <descripción>
```

**Reglas:**
- Solo título, sin cuerpo
- Siempre en español
- Descripción clara y concisa
- Comenzar con verbo en infinitivo o sustantivo

## Proceso de Commit

1. **Revisar archivos modificados**
   - Ejecutar `git status` para ver todos los cambios

2. **Agrupar cambios relacionados**
   - Identificar archivos que pertenecen al mismo tipo de cambio
   - Agrupar por funcionalidad, módulo o tipo de modificación

3. **Staged de cambios agrupados**
   - Usar `git add <archivos>` para agregar solo los archivos del grupo actual

4. **Crear commit con mensaje apropiado**
   - Determinar el tipo convencional correcto
   - Escribir mensaje descriptivo en español
   - Ejecutar `git commit -m "<tipo>: <descripción>"`

5. **Repetir hasta completar**
   - Continuar con el siguiente grupo de cambios
   - Repetir pasos 3-4 hasta que no queden archivos modificados

## Ejemplos

```bash
# Ejemplo 1: Nueva funcionalidad
git add tests/login.spec.ts
git commit -m "feat: agregar test de autenticación para CetApp Go"

# Ejemplo 2: Corrección de bug
git add src/utils/validation.ts
git commit -m "fix: corregir validación de campos requeridos"

# Ejemplo 3: Documentación
git add README.md
git commit -m "docs: actualizar estructura del proyecto en README"

# Ejemplo 4: Refactorización
git add src/pages/*.ts
git commit -m "refactor: reorganizar page objects por módulo"

# Ejemplo 5: Mantenimiento
git add package.json pnpm-lock.yaml
git commit -m "chore: actualizar dependencias de Playwright"
```

## Lineamientos Adicionales

- **Atomicidad**: Cada commit debe representar un cambio lógico completo
- **Claridad**: El mensaje debe explicar QUÉ se cambió, no cómo
- **Consistencia**: Mantener el mismo estilo en todos los commits
- **Contexto**: Si el cambio está relacionado con un ticket, incluir el ID en el mensaje
