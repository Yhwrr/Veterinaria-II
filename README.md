# Veterinaria-II

Esta aplicación, escrita en **JavaScript puro**, permite gestionar en memoria a los dueños y sus mascotas dentro de una clínica veterinaria. Se ejecuta directamente desde el navegador y realiza todas las interacciones por medio de la consola, usando `prompt`, `alert` y `console.log`.

---

## Descripción General

La aplicación ofrece un menú interactivo para:

1. Registrar dueños
2. Registrar mascotas (asociadas a un dueño existente)
3. Listar todas las mascotas
4. Buscar una mascota por nombre
5. Actualizar el estado de salud de una mascota
6. Eliminar una mascota por nombre
7. Ver mascotas de un dueño (por cédula)
8. Salir del programa

No requiere backend ni almacenamiento persistente: toda la información se maneja en memoria durante la ejecución.

---

## Tecnologías Usadas

- HTML5 (estructura básica)
- JavaScript (funcionalidad completa)
  - `setTimeout`
  - Callbacks
  - Promesas
  - Async/Await
- No se usaron frameworks ni librerías externas.

---

## Asincronía Aplicada

Se aplicó comportamiento asíncrono para simular operaciones con retardo:

| Función                             | Técnica              | Descripción |
|------------------------------------|----------------------|-------------|
| Registro de dueño                  | `setTimeout` + callback | Validación tras 1.5 segundos |
| Registro de mascota                | `setTimeout` + callback | Verifica existencia del dueño tras 2 segundos |
| Búsqueda de mascota                | Promesa              | Simula búsqueda con demora de 1.5 segundos |
| Actualizar estado de salud         | `async/await`        | Simula atención veterinaria con espera de 1 segundo |
| Eliminación de mascota             | Promesa + confirmación | Confirmación de borrado tras 2 segundos |
| Ver mascotas de un dueño           | `async/await` + retardo | Carga de información tras 2 segundos |

---

## Estructura del Proyecto

by Yhwrr and Chat GPT

