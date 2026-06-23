# Especificación Funcionalidad 1 - Filtro de rango de fechas en el dashboard principal

## Objetivo: 
Contar con un filtro de fechas (desde / hasta) para hacer análisis sobre una porción de los datos regida por ese periodo

## Alcance: 
Filtro para visualización

## Restricciones: 
Al modificar, ustilizar las reglas definidas en el proyecto 


## Criterios de Aceptación:
- Nuevo filtro incluido sobre los rangos permitidos
- Todos los graficos cambian al colocar los filtros de fecha

## Contexto: 
- El usuario indica una fecha de inicio y una de fin como filtro para la página.
- Eliminar el campo que aparece arriba a la derecha que está como hardcode que dice: 2024 - Full Year y colocar alli las fechas de inicio y fin y debajo de ellas el rango válido.
- Se deben filtrar todos los datos que se estén mostrando en la página de acuerdo al periodo ingresado por el usuario. 
- Para el filtrado, las fechas se envian a la API en formato YYYY-MM-DD
- Si el usuario no coloca fecha de inicio, no se toma en cuenta ese filtro y se dejan todos los registros filtrando solo hasta la fecha final.
- Si el usuario no coloca fecha de fin se muestran los  registros posteriores o iguales a la fecha de inicio indicada sin filtrar por fecha final 
- Si el usuario no coloca ninguna fecha, es equivalente a que no haya solicitado filtro, es decir, se muestran todos los registros.
- Abajo del periodo a solicitar, se deben mostrar abajo de los campos, el rango de fechas (la fecha más antigua y la más reciente del dataset) para que el usuario sepa qué rango es válido.  
- Para este filtro, revisar el Endpoint relevante: GET /api/metrics/facets (para obtener el rango de fechas disponible en el dataset) y la extensión de filtros sobre el endpoint de métricas existente. 
- Validar que la fecha de inicio sea menor o igual a la fecha final y que ambas estén dentro del rángo válido
