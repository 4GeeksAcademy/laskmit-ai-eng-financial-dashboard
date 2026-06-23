# Especificación Funcionalidad 1 - Filtro de rango de fechas en el dashboard principal

## Objetivo
Permitir que el usuario filtre el dashboard principal por un rango de fechas usando un campo Desde y un campo Hasta, para analizar una porción específica del dataset financiero.

## Alcance
Esta funcionalidad aplica únicamente al dashboard principal y debe impactar todos los datos visibles en la pantalla:
- Etiqueta o resumen del período visible en el header.
- KPIs.
- Gráfico de ingresos vs egresos.
- Gráfico de porcentaje de profit.

## Restricciones
- Mantener el contrato actual de la API.
- Utilizar las reglas definidas en el proyecto.
- Mantener consistencia de idioma en toda la pantalla.
- No asumir un año fijo como período por defecto; el rango válido debe derivarse de los datos disponibles.

## Contexto funcional
- Actualmente existe un texto hardcodeado en el header con el valor 2024 - Full Year.
- Ese texto debe reemplazarse por la visualización del filtro de fechas y por el período actualmente aplicado.
- El rango válido de fechas debe obtenerse desde el endpoint GET /api/metrics/facets.
- Los datos filtrados deben obtenerse desde el endpoint GET /api/metrics.
- Las fechas deben enviarse a la API en formato YYYY-MM-DD.

## Fuente de datos y contrato esperado

### Endpoint para rango válido
- Endpoint: GET /api/metrics/facets
- Objetivo: obtener la fecha mínima y máxima disponibles en el dataset.
- Campos relevantes del response:
  - min_date
  - max_date

### Endpoint para datos filtrados
- Endpoint: GET /api/metrics
- Parámetros relevantes:
  - start_date
  - end_date
- Ambos parámetros son opcionales.
- Si se informan, deben enviarse en formato YYYY-MM-DD.
- El filtrado por fechas debe ser inclusivo en ambos extremos.

## Reglas funcionales
- Si el usuario no informa fecha de inicio ni fecha de fin, se muestran todos los registros disponibles.
- Si el usuario informa solo fecha de inicio, se muestran los registros con fecha mayor o igual a start_date.
- Si el usuario informa solo fecha de fin, se muestran los registros con fecha menor o igual a end_date.
- Si el usuario informa ambas fechas, se muestran los registros comprendidos entre start_date y end_date, incluyendo ambos extremos.
- La fecha de inicio debe ser menor o igual a la fecha de fin.
- Ambas fechas, si fueron informadas, deben estar dentro del rango válido definido por min_date y max_date.
- Si alguna validación falla, no se debe disparar la consulta de datos filtrados.

## Comportamiento esperado de la interfaz

### Carga inicial
- Al cargar la pantalla, la aplicación debe consultar primero GET /api/metrics/facets para conocer el rango válido.
- Luego debe consultar GET /api/metrics sin filtros para mostrar el estado inicial completo del dashboard.
- El resumen del período visible debe reflejar el estado inicial sin asumir un texto fijo anual.

### Render del filtro
- Deben mostrarse dos campos de fecha:
  - Desde
  - Hasta
- Debajo de los campos debe mostrarse el rango válido disponible para el usuario.
- El texto de ayuda debe indicar claramente el rango permitido usando min_date y max_date.

### Aplicación del filtro
- Al aplicar un rango válido, deben actualizarse todos los datos visibles del dashboard.
- El resumen del período en el header debe reflejar el rango actualmente aplicado.
- Si solo existe una de las fechas, el resumen del período debe representar correctamente ese filtro parcial.

### Validaciones y mensajes
- Si la fecha de inicio es posterior a la fecha de fin, debe mostrarse un mensaje de validación claro al usuario.
- Si alguna fecha queda fuera del rango válido, debe mostrarse un mensaje de validación claro al usuario.
- Mientras exista un error de validación, no debe actualizarse la consulta de métricas.

### Estado vacío
- Si la consulta devuelve cero registros para un rango válido, la pantalla debe mostrar un estado vacío entendible para el usuario.
- El estado vacío no debe interpretarse como error técnico.

## Criterios de aceptación
- El dashboard muestra dos campos de fecha visibles para filtrar por período.
- El dashboard muestra el rango mínimo y máximo permitido usando la información de GET /api/metrics/facets.
- Al cargar la pantalla sin filtros, se muestran todos los registros disponibles.
- Al aplicar un rango válido, se actualizan el header, los KPIs y ambos gráficos.
- Si solo se informa start_date, el dashboard muestra datos desde esa fecha en adelante.
- Si solo se informa end_date, el dashboard muestra datos hasta esa fecha inclusive.
- Si se informan ambas fechas, el dashboard muestra únicamente los datos dentro del rango inclusivo.
- Si start_date es mayor que end_date, la UI muestra un error de validación y no ejecuta la consulta filtrada.
- Si alguna fecha está fuera del rango válido, la UI muestra un error de validación y no ejecuta la consulta filtrada.
- Si el filtro produce cero resultados, la UI muestra un estado vacío claro.

## Casos de prueba sugeridos
- Sin fecha de inicio y sin fecha de fin.
- Solo fecha de inicio.
- Solo fecha de fin.
- Fecha de inicio y fecha de fin dentro del rango válido.
- Fecha de inicio igual a fecha de fin.
- Fecha de inicio mayor que fecha de fin.
- Fecha de inicio menor que min_date.
- Fecha de fin mayor que max_date.
- Rango válido sin resultados.

## Notas de UX y consistencia
- Toda la pantalla debe mantener un único idioma para labels, ayudas, mensajes y estados.
- El período visible en el header debe ser dinámico y derivado del filtro aplicado.
- El texto hardcodeado 2024 - Full Year no debe permanecer como comportamiento por defecto.

## Fuera de alcance
- No se requiere en esta funcionalidad cambiar otros filtros distintos al rango de fechas.
- No se requiere persistir la selección del filtro entre recargas.
- No se requiere modificar endpoints adicionales más allá del consumo de facets y metrics para esta pantalla.