---
name: error-management
description:
  This skill provides guidance on error management in web applications, including best practices for handling errors, displaying error messages, and ensuring accessibility compliance. It helps developers create user-friendly error handling mechanisms that enhance the overall user experience.
license: ninguna
metadata:
  author: Laskmit
  version: "1.0"
---

# error-management Skill (Objetivo: Manejo de errores en aplicaciones web)

Este skill da una visión de como detallar los errores en una aplicación web, incluyendo las mejores prácticas para manejar errores, mostrar mensajes de error. Ayuda a los desarrolladores a crear mecanismos de manejo de errores amigables para el usuario que mejoren la experiencia general del usuario.

## Guias principales para la salida de errores en aplicaciones web

- **Manejo de errores en aplicaciones web**: Proporciona estrategias para capturar y manejar errores de manera efectiva, incluyendo el uso de bloques try-catch, manejo de excepciones y registro de errores.
- **Mostrar mensajes de error**: Ofrece pautas sobre cómo presentar mensajes de error claros y comprensibles para los usuarios, evitando la exposición de información sensible y proporcionando soluciones o pasos a seguir.
- **Cumplimiento de accesibilidad**: Asegura que los mensajes de error sean accesibles para todos los usuarios, incluyendo aquellos con discapacidades, siguiendo las pautas de accesibilidad web (WCAG) y utilizando técnicas como ARIA (Accessible Rich Internet Applications). 
- **Detallar siempre los errores**: No reportar errores genéricos.  Siempre se debe detallar el error incluyendo el tipo de error, la ubicación y cualquier información relevante que pueda ayudar a los desarrolladores a identificar y solucionar el problema de manera más eficiente. Por ejemplo, en un error de API, detallar cuando es problema de clave, de la url, respuesta por congestionamiento, por sobrepasar los rangos autorizados por minuto, por hora, etc.
