# Suite de Casos de Prueba – Alta, Edición y Cancelación de Programación de Inspección (Playwright)

> Contexto: CetApp GO – Módulo de calendario / programación de inspecciones  
> Ambiente: **CetApp GO - Test 1**  
> Rol: Usuario con permiso **“Programar Inspecciones”** (y edición/cancelación donde aplique)  
> Evidencia: En **todos** los casos, al final se incluye:  
> `Generá el Trace de Playwright y capturas de pantalla en caso de error. Al finalizar, guardá el archivo de evidencia`

---

## TC-001 – Alta exitosa de Programación de Inspección con Lista de Verificación

**Objetivo:**  
Validar que se pueda **dar de alta una nueva programación de inspección** completando todas las jerarquías, horarios válidos, inspector opcional “Sin asignar” y **Lista de Verificación**, y que se cree correctamente mostrando la **duración estimada** y el impacto en el calendario.

**Prompt para Playwright (instrucción para el agente):**

Precondiciones:
- Usuario autenticado en la aplicación web con permiso **“Programar Inspecciones”**.
- Existe al menos una combinación válida de **Jerarquía Nivel 1**, **Jerarquía Nivel 2** y **Jerarquía Nivel 3**.
- Existe al menos una **Lista de Verificación** válida asociada a la combinación de jerarquías seleccionada.
- Existen inspectores configurados con permiso de **Alta de inspección**, pero no se seleccionará ninguno (se usará **“Sin asignar”** por defecto).

Navegación:
1. Ingresá a la aplicación web de **CetApp GO** en el **Ambiente de Test: CetApp GO - Test 1**.
2. Navegá hasta el módulo donde se muestra el **calendario de inspecciones** o la lista desde donde se puede ejecutar la acción **“Programar inspección”**.
3. En ese módulo, ubicá y presioná la acción o botón **“Programar inspección”** para abrir el modal **“Alta de Programación de Inspección”**.

Acción:
1. En el modal **“Alta de Programación de Inspección”**, en el campo **Jerarquía Nivel 1**, seleccioná una opción válida.
2. Verificá que el campo **Jerarquía Nivel 2** filtre sus opciones en función de la **Jerarquía Nivel 1** seleccionada y elegí una opción válida.
3. Verificá que el campo **Jerarquía Nivel 3** filtre sus opciones en función de la **Jerarquía Nivel 2** seleccionada y elegí una opción válida.
4. Dejá el campo **Dirección** vacío (es opcional).
5. En **Fecha programada**, seleccioná una fecha válida dentro del rango permitido (mismo día actual o futuro).
6. En **Horario de inicio**, ingresá un horario válido dentro del mismo día (por ejemplo, 10:00).
7. En **Horario de fin**, ingresá un horario posterior dentro del mismo día (por ejemplo, 11:00), respetando que sea mayor al horario de inicio y dentro de 00:00 a 23:59.
8. Verificá que el sistema calcule y muestre la **duración estimada** correspondiente al rango horario (por ejemplo, “1:00 hs” o similar).
9. En el campo **Inspector**, dejá la opción por defecto **“Sin asignar”**.
10. En el campo **Lista de verificación**, seleccioná una **Lista de Verificación** válida de la lista desplegable con buscador interno.
11. En el campo **Descripción / Notas**, ingresá un texto libre con observaciones (por ejemplo, “Programación de inspección automatizada con lista de verificación”).
12. Presioná el botón **“Guardar”** para crear la programación de inspección.

Aserción (Validación):
- Verificá que no se muestren mensajes de error de validación para los campos obligatorios.
- Verificá que el modal **“Alta de Programación de Inspección”** se cierre correctamente después de presionar **“Guardar”**.
- Verificá que en el **calendario de inspecciones** aparezca una nueva **programación de inspección** en la **Fecha programada** y en el rango de **Horario de inicio** a **Horario de fin** especificado.
- Verificá que la programación se muestre como disponible para ejecución (no en estado Cancelada).
- (Opcional, si la UI lo expone) Verificá que el **nombre de la inspección** corresponda al **nombre de la Lista de Verificación seleccionada** según la regla de negocio.

Evidencia:
- Generá el Trace de Playwright y capturas de pantalla en caso de error.

---

## TC-002 – Validación de jerarquías obligatorias y dependencias

**Objetivo:**  
Verificar que **Jerarquía Nivel 1**, **Jerarquía Nivel 2** y **Jerarquía Nivel 3** sean obligatorias, dependientes entre sí y que no se permita continuar ni guardar sin completar las tres.

**Prompt para Playwright (instrucción para el agente):**

Precondiciones:
- Usuario autenticado con permiso **“Programar Inspecciones”**.
- Existen datos de jerarquías configurados (Nivel 1, 2 y 3).

Navegación:
1. Ingresá al **Ambiente de Test: CetApp GO - Test 1**.
2. Navegá al módulo del **calendario de inspecciones** o listado que contenga la acción **“Programar inspección”**.
3. Presioná **“Programar inspección”** para abrir el modal **“Alta de Programación de Inspección”**.

Acción:
1. Intentá presionar **“Guardar”** sin seleccionar ninguna jerarquía (dejando vacíos **Jerarquía Nivel 1**, **Jerarquía Nivel 2** y **Jerarquía Nivel 3**).
2. Observá las validaciones mostradas para los campos de jerarquías.
3. Seleccioná solo **Jerarquía Nivel 1** y dejá vacías **Jerarquía Nivel 2** y **Jerarquía Nivel 3**; intentá nuevamente presionar **“Guardar”**.
4. Luego, completá **Jerarquía Nivel 1** y **Jerarquía Nivel 2**, dejando **Jerarquía Nivel 3** vacía, e intentá **“Guardar”**.
5. Verificá que **Jerarquía Nivel 2** solo muestre opciones filtradas según la **Jerarquía Nivel 1** seleccionada.
6. Verificá que **Jerarquía Nivel 3** solo muestre opciones filtradas según la **Jerarquía Nivel 2** seleccionada.

Aserción (Validación):
- Verificá que el sistema muestre mensajes claros de validación indicando que las jerarquías son **obligatorias** cuando se intenta guardar sin completarlas.
- Verificá que el sistema **no permita guardar** mientras falte al menos una de las jerarquías obligatorias (**Jerarquía Nivel 1**, **Jerarquía Nivel 2**, **Jerarquía Nivel 3**).
- Verificá que ante la selección de **Jerarquía Nivel 1**, las opciones de **Jerarquía Nivel 2** estén filtradas correctamente.
- Verificá que ante la selección de **Jerarquía Nivel 2**, las opciones de **Jerarquía Nivel 3** estén filtradas correctamente.

Evidencia:
- Generá el Trace de Playwright y capturas de pantalla en caso de error.

---

## TC-003 – Validación de horarios: horario de inicio posterior al horario de fin

**Objetivo:**  
Validar que el sistema muestre un **mensaje de error** y **no permita guardar** cuando el **Horario de inicio** es igual o posterior al **Horario de fin**.

**Prompt para Playwright (instrucción para el agente):**

Precondiciones:
- Usuario autenticado con permiso **“Programar Inspecciones”**.
- Existen jerarquías válidas para seleccionar.

Navegación:
1. Ingresá al **Ambiente de Test: CetApp GO - Test 1**.
2. Navegá al módulo de **calendario de inspecciones** o sección donde se pueda **Programar inspección**.
3. Presioná el botón **“Programar inspección”** para abrir el modal **“Alta de Programación de Inspección”**.

Acción:
1. Seleccioná una combinación válida de **Jerarquía Nivel 1**, **Jerarquía Nivel 2** y **Jerarquía Nivel 3**.
2. Ingresá una **Fecha programada** válida.
3. En **Horario de inicio**, ingresá un horario posterior al horario de fin esperado (por ejemplo, **16:00**).
4. En **Horario de fin**, ingresá un horario anterior o igual al horario de inicio (por ejemplo, **15:00** o **16:00**).
5. Completá el resto de campos obligatorios si es necesario (por ejemplo, dejar **Inspector** en **“Sin asignar”**, no seleccionar **Lista de verificación**, dejar **Dirección** y **Descripción / Notas** vacías).
6. Presioná el botón **“Guardar”**.

Aserción (Validación):
- Verificá que el sistema muestre un **mensaje de error** indicando que el **horario de inicio debe ser anterior al horario de fin**.
- Verificá que no se cree la **programación de inspección** en el calendario (el modal no debería cerrar como éxito o debería permanecer mostrando el error).
- Verificá que el botón **“Guardar”** no permita avanzar mientras la validación de horarios no se cumpla.

Evidencia:
- Generá el Trace de Playwright y capturas de pantalla en caso de error.

---

## TC-004 – Validación de horarios: fuera del rango 00:00 - 23:59

**Objetivo:**  
Validar que la inspección **no pueda ser programada luego de las 23:59 ni antes de las 00:00**, mostrando el mensaje de error correspondiente y bloqueando el guardado.

**Prompt para Playwright (instrucción para el agente):**

Precondiciones:
- Usuario autenticado con permiso **“Programar Inspecciones”**.
- Existen jerarquías válidas para seleccionar.

Navegación:
1. Ingresá al **Ambiente de Test: CetApp GO - Test 1**.
2. Navegá al módulo donde se encuentre el botón **“Programar inspección”**.
3. Abrí el modal **“Alta de Programación de Inspección”** presionando **“Programar inspección”**.

Acción:
1. Seleccioná **Jerarquía Nivel 1**, **Jerarquía Nivel 2** y **Jerarquía Nivel 3** válidas.
2. Seleccioná una **Fecha programada** válida.
3. En un primer intento, intentá ingresar valores de **Horario de inicio** y **Horario de fin** fuera del rango permitido por el control (por ejemplo, valores menores a 00:00 o mayores a 23:59, según lo que el componente permita).
4. En cada intento que el control acepte un valor fuera de rango, presioná **“Guardar”**.
5. Repetí la prueba ajustando valores cercanos a los límites (por ejemplo 23:59 a 24:30 si el control lo permite) para forzar la validación de rango.

Aserción (Validación):
- Verificá que el sistema muestre validaciones impidiendo programar inspecciones **antes de las 00:00** o **después de las 23:59**.
- Verificá que el sistema **no permita guardar** mientras los horarios estén fuera del rango permitido.
- Verificá que no se cree ninguna **programación de inspección** en el calendario para estos rangos inválidos.

Evidencia:
- Generá el Trace de Playwright y capturas de pantalla en caso de error.

---

## TC-005 – Validación de disponibilidad del inspector (inspector ocupado)

**Objetivo:**  
Validar que, al seleccionar un **Inspector** que ya tiene otra inspección programada que se **superpone total o parcialmente** con la fecha y rango horario, el sistema **no permita guardar** y muestre un **mensaje de error**.

**Prompt para Playwright (instrucción para el agente):**

Precondiciones:
- Usuario autenticado con permiso **“Programar Inspecciones”**.
- Existe una **programación de inspección previa** creada para un **Inspector** específico, en una cierta **Fecha programada**, con un rango de **Horario de inicio** y **Horario de fin** ya ocupados (podés crearla previamente mediante la UI o por setup de datos).
- El mismo **Inspector** está disponible en la lista de **Inspector** para la misma combinación de **Jerarquía Nivel 1**, **Jerarquía Nivel 2** y **Jerarquía Nivel 3**.

Navegación:
1. Ingresá al **Ambiente de Test: CetApp GO - Test 1**.
2. Navegá al módulo del **calendario de inspecciones** o listado que permite **Programar inspección**.
3. Abrí el modal **“Alta de Programación de Inspección”** con el botón **“Programar inspección”**.

Acción:
1. Seleccioná la misma combinación de **Jerarquía Nivel 1**, **Jerarquía Nivel 2** y **Jerarquía Nivel 3** que tiene asociada la programación previa del inspector ocupado.
2. Seleccioná la misma **Fecha programada** utilizada en la programación existente.
3. Ingresá un **Horario de inicio** y **Horario de fin** que se **superpongan total o parcialmente** con el rango horario ocupado (por ejemplo, si la otra inspección es de 10:00 a 11:00, probá 09:30 a 10:30, 10:00 a 11:00 o 10:30 a 11:30).
4. En el campo **Inspector**, seleccioná explícitamente el inspector que ya tiene la otra inspección programada.
5. Completá el resto de campos obligatorios (podés dejar **Lista de verificación** sin seleccionar, **Dirección** y **Descripción / Notas** como opcionales).
6. Presioná **“Guardar”**.

Aserción (Validación):
- Verificá que el sistema **no permita guardar** la nueva programación.
- Verificá que se muestre un **mensaje de error** informando el conflicto de horario por **inspector ocupado**.
- Verificá que no se cree ninguna nueva **programación de inspección** en el calendario para esa combinación de inspector, fecha y horario superpuesto.

Evidencia:
- Generá el Trace de Playwright y capturas de pantalla en caso de error.

---

## TC-006 – Alta de programación sin Lista de Verificación (nombre por Jerarquía Nivel 1)

**Objetivo:**  
Validar que la programación pueda crearse **sin seleccionar ninguna Lista de Verificación**, que siga siendo válida y que el **nombre de la inspección** se defina automáticamente usando el valor de la **Jerarquía Nivel 1**.

**Prompt para Playwright (instrucción para el agente):**

Precondiciones:
- Usuario autenticado con permiso **“Programar Inspecciones”**.
- Existen jerarquías configuradas.
- No es obligatorio seleccionar Lista de Verificación.

Navegación:
1. Ingresá al **Ambiente de Test: CetApp GO - Test 1**.
2. Navegá al módulo con el **calendario de inspecciones** o listado desde donde se pueda **Programar inspección**.
3. Abrí el modal **“Alta de Programación de Inspección”** mediante el botón **“Programar inspección”**.

Acción:
1. Seleccioná una combinación válida de **Jerarquía Nivel 1**, **Jerarquía Nivel 2** y **Jerarquía Nivel 3**.
2. Ingresá una **Fecha programada** válida y un rango horario válido (**Horario de inicio** anterior a **Horario de fin**, dentro del rango 00:00 a 23:59).
3. Dejá el **Inspector** en **“Sin asignar”**.
4. No selecciones ninguna opción en **Lista de verificación** (dejá el campo vacío).
5. Opcionalmente, completá **Dirección** y **Descripción / Notas** con cualquier texto.
6. Presioná **“Guardar”** para crear la programación.

Aserción (Validación):
- Verificá que el sistema **no requiera** la **Lista de verificación** para guardar.
- Verificá que la programación se cree exitosamente y aparezca en el **calendario de inspecciones** en la fecha y horario seleccionados.
- (Si la UI expone el nombre) Verificá que el **nombre de la inspección** sea automáticamente el valor correspondiente a la **Jerarquía Nivel 1** seleccionada, cumpliendo con la regla: “Si no se selecciona ninguna Lista de Verificación → el nombre de la inspección será el valor correspondiente a la Jerarquía Nivel 1”.

Evidencia:
- Generá el Trace de Playwright y capturas de pantalla en caso de error.

---

## TC-007 – Identificación visual de Inspector “Contratista”

**Objetivo:**  
Validar que, para usuarios con la opción **“¿Es contratista?”** activada, el selector de **Inspector** muestre un identificador visual **“Contratista”** y el **nombre de la empresa**.

**Prompt para Playwright (instrucción para el agente):**

Precondiciones:
- Usuario autenticado con permiso **“Programar Inspecciones”**.
- Existe al menos un usuario con permiso de **Alta de inspeccion** configurado como **“¿Es contratista?” = true**, con empresa asociada.
- Existen jerarquías de **Jerarquía Nivel 1**, **Jerarquía Nivel 2** y **Jerarquía Nivel 3** en las que ese contratista esté asociado como inspector disponible.

Navegación:
1. Ingresá al **Ambiente de Test: CetApp GO - Test 1**.
2. Navegá al módulo donde se pueda **Programar inspección** (calendario de inspecciones).
3. Abrí el modal **“Alta de Programación de Inspección”** mediante la acción **“Programar inspección”**.

Acción:
1. Seleccioná una combinación de **Jerarquía Nivel 1**, **Jerarquía Nivel 2** y **Jerarquía Nivel 3** que tenga al inspector contratista asociado.
2. Abrí el desplegable del campo **Inspector** y usá el buscador interno para ubicar al usuario configurado como contratista.
3. Observá cómo se muestra ese usuario en la lista desplegable.

Aserción (Validación):
- Verificá que, para el usuario contratista, se muestre un identificador visual con la etiqueta **“Contratista”** en la opción del desplegable del campo **Inspector**.
- Verificá que, junto a la etiqueta **“Contratista”**, se muestre el **nombre de la empresa** a la que pertenece el usuario contratista.
- Verificá que se pueda seleccionar al inspector contratista como valor del campo **Inspector** sin errores.

Evidencia:
- Generá el Trace de Playwright y capturas de pantalla en caso de error.

---

## TC-008 – Edición de programación: actualización de fecha, horario, inspector y campos opcionales

**Objetivo:**  
Validar que, al editar una **programación de inspección** existente, se puedan modificar los campos editables (Fecha programada, Horario de inicio, Horario de fin, Inspector, Dirección, Descripción / Notas, Lista de verificación) respetando todas las validaciones, y que los cambios se reflejen en el calendario.

**Prompt para Playwright (instrucción para el agente):**

Precondiciones:
- Usuario autenticado con permiso de **Programar Inspecciones** y permisos de **edición** sobre la programación.
- Existe una **programación de inspección** previamente creada con jerarquías válidas (las jerarquías no son editables).
- Existen uno o más inspectores disponibles para esas jerarquías.
- Existen **Listas de verificación** filtradas según las jerarquías asociadas a la inspección.

Navegación:
1. Ingresá al **Ambiente de Test: CetApp GO - Test 1**.
2. Navegá al **calendario de inspecciones** y localizá una **programación de inspección** existente.
3. Hacé clic o “tocá” sobre la inspección para abrir el **detalle de la programación**.

Acción:
1. Verificá que se muestren los detalles de la **programación de inspección** y que, teniendo permisos de edición, estén habilitadas las acciones **“Guardar cambios”**, **“Cancelar programación”** y **“Volver”** (según la disposición visual).
2. Modificá la **Fecha programada** a un nuevo día válido.
3. Ajustá el **Horario de inicio** y **Horario de fin** a un nuevo rango válido (respetando todas las validaciones de horarios).
4. Cambiá el **Inspector** a otro inspector disponible (o dejalo en **“Sin asignar”** para validar que siga siendo opcional).
5. Modificá el campo **Dirección** agregando un nuevo texto.
6. Modificá el campo **Descripción / Notas** agregando o cambiando el texto.
7. En **Lista de verificación**, seleccioná una opción diferente (la lista debe estar filtrada según las **jerarquías asociadas** a la inspección).
8. Presioná el botón **“Guardar”** para ejecutar la acción **Guardar cambios**.

Aserción (Validación):
- Verificá que se ejecuten nuevamente todas las validaciones y que no aparezcan mensajes de error para los datos actualizados.
- Verificá que la programación se **actualice correctamente** y que los nuevos valores se muestren en el **detalle de la programación**.
- Verificá que los cambios de **Fecha programada**, **Horario de inicio**, **Horario de fin** e **Inspector** se reflejen en el **calendario**, mostrando la inspección en la nueva fecha y franja horaria, con el inspector actualizado.

Evidencia:
- Generá el Trace de Playwright y capturas de pantalla en caso de error.

---

## TC-009 – Cancelar programación: cambio de estado a Cancelada e impacto visual

**Objetivo:**  
Validar que, al ejecutar la acción **“Cancelar programación”** sobre una inspección existente, se muestre el mensaje de confirmación, la inspección cambie de estado a **“Cancelada”**, se actualice en el calendario en **color rojo** y **no pueda ser editada**.

**Prompt para Playwright (instrucción para el agente):**

Precondiciones:
- Usuario autenticado con permiso para editar y **Cancelar programación** de inspecciones.
- Existe una **programación de inspección** en estado activo (no cancelada) visible en el **calendario de inspecciones**.

Navegación:
1. Ingresá al **Ambiente de Test: CetApp GO - Test 1**.
2. Navegá al **calendario de inspecciones**.
3. Localizá una **programación de inspección** activa y hacé clic/tap para abrir el **detalle de la programación**.

Acción:
1. Dentro del detalle de la programación, presioná el botón **“Cancelar programación”**.
2. Verificá que el sistema muestre un **mensaje de confirmación** solicitando validar la cancelación.
3. En el mensaje de confirmación, seleccioná la opción para **confirmar** la cancelación.

Aserción (Validación):
- Verificá que, tras confirmar, la inspección cambie su estado a **“Cancelada”** (según se muestre en el detalle o en el calendario).
- Verificá que en el **calendario de inspecciones** la inspección en estado **Cancelada** se visualice con el **color rojo**, cumpliendo el impacto visual requerido.
- Verificá que una inspección en estado **Cancelada** **no pueda ser editada**: los campos deben mostrarse en modo solo lectura o las acciones de edición (como **Guardar cambios**) deben estar deshabilitadas.

Evidencia:
- Generá el Trace de Playwright y capturas de pantalla en caso de error.

---

## TC-010 – Acción “Volver” en alta: mensaje de confirmación y descarte de cambios

**Objetivo:**  
Validar que, al utilizar la acción **“Volver”** en el modal de **Alta de Programación de Inspección**, el sistema muestre un **mensaje de confirmación** y permita cerrar el modal **sin guardar cambios**.

**Prompt para Playwright (instrucción para el agente):**

Precondiciones:
- Usuario autenticado con permiso **“Programar Inspecciones”**.

Navegación:
1. Ingresá al **Ambiente de Test: CetApp GO - Test 1**.
2. Navegá al módulo desde el cual se habilita el botón **“Programar inspección”**.
3. Abrí el modal **“Alta de Programación de Inspección”** presionando **“Programar inspección”**.

Acción:
1. Completá parcialmente algunos campos del formulario (por ejemplo, **Jerarquía Nivel 1**, **Fecha programada**, **Horario de inicio**, **Horario de fin**).
2. En lugar de presionar **Guardar**, presioná el botón **“Volver”** del formulario.
3. Observá el comportamiento del sistema ante la acción **“Volver”**.
4. En el mensaje de confirmación (si se muestra), elegí la opción que confirme que deseás salir sin guardar.

Aserción (Validación):
- Verificá que el sistema muestre un **mensaje de confirmación** al presionar **“Volver”** (por ejemplo, solicitando validar la salida sin guardar).
- Verificá que, al confirmar la salida, el modal **“Alta de Programación de Inspección”** se cierre sin crear ninguna nueva programación en el calendario.
- Verificá que, si volvés a abrir el modal **“Alta de Programación de Inspección”**, los campos no contengan los datos que se habían ingresado previamente (no deben persistir cambios no guardados).

Evidencia:
- Generá el Trace de Playwright y capturas de pantalla en caso de error.