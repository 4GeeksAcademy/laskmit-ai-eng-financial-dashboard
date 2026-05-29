# Reglas propuestas para mitigar riesgos y preservar buenas prácticas

## Arquitectura
- Limitar los orígenes permitidos en CORS solo a dominios de confianza en producción.
- Prohibido el uso de datos simulados (mock) en endpoints productivos; toda persistencia debe realizarse en base de datos.
- Los contenedores Docker deben ejecutarse bajo un usuario no privilegiado (no root).
- Separar claramente la lógica de negocio, rutas y utilidades en módulos independientes.

## Naming y Localización
- Prohibido hardcodear formatos de fecha, moneda o idioma. Usar variables de entorno o configuración para internacionalización (i18n).
- Los nombres de variables, funciones y componentes deben ser descriptivos y seguir la convención camelCase (JS/TS) o snake_case (Python).

## Testing
- Todo módulo de lógica debe tener pruebas unitarias con cobertura mínima del 80%.
- Los tests deben cubrir casos de éxito, error y bordes.
- Prohibido dejar código de test o debug en producción.

## Documentación
- Toda función pública debe tener docstring o comentario explicativo.
- Mantener actualizada la documentación de la API (Swagger/OpenAPI en backend, Storybook o similar en frontend si aplica).

## Developer Experience (DX)
- Los errores deben gestionarse mostrando mensajes claros y diferenciando tipos (404, 500, red, validación, etc.).
- Usar alias de importación para evitar rutas largas y mejorar la legibilidad.
- Mantener consistencia visual usando un sistema de diseño y estilos centralizado.
- Revisar y actualizar dependencias regularmente para evitar vulnerabilidades.

---

Estas reglas ayudan a reducir riesgos de seguridad, mejorar la mantenibilidad y asegurar una experiencia de desarrollo y usuario consistente.