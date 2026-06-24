# Contexto del proyecto: laskmit-ai-eng-financial-dashboard

## 1) Resumen del proyecto

Proyecto full-stack para visualizar métricas financieras con:

- Frontend en React + TypeScript + Vite + Tailwind + Recharts convertido a Next.js.
- Backend en FastAPI (Python) que entrega datos mock y endpoints de análisis.
- Ejecución local con Docker Compose.

### Arquitectura y responsabilidades

- `frontend/`: interfaz del dashboard, cálculo de KPIs en cliente y gráficos.
- `backend/`: API REST que genera movimientos financieros simulados, filtra, agrega y compara periodos.
- `memory-bank/`: documentación/contexto operativo del proyecto.

### Flujo funcional principal

1. El frontend llama `GET /api/metrics` para obtener movimientos.
2. En cliente se calculan KPIs (`computeKPIs`) y series mensuales (`computeMonthlyData`).
3. Se renderizan tarjetas KPI y dos gráficos (ingresos vs egresos, margen de utilidad).

### Endpoints backend relevantes

- `GET /health`
- `GET /api/metrics`
- `GET /api/metrics/facets`
- `GET /api/metrics/summary`
- `GET /api/metrics/categories/top`
- `GET /api/metrics/comparison`
- `GET /api/metrics/alerts`
- `GET /api/metrics/b2b`
- `GET /api/metrics/b2c`

Evidencia principal: `backend/app/routes.py`, `backend/app/main.py`, `frontend/src/App.tsx`, `frontend/src/lib/financial-utils.ts`, `docker-compose.yml`.

## 2) Hallazgos

Se listan 10 hallazgos agrupados por categoría: 5 buenas prácticas y 5 malas prácticas.

### Arquitectura

| Práctica | Tipo | Hallazgo |
| --- | --- | --- |
| Separación clara frontend/backend | Buena | La solución divide UI en `frontend/` y API en `backend/`, con responsabilidades bien delimitadas y ejecución conjunta mediante Docker Compose. |
| Duplicación de lógica por segmento B2B/B2C | Mala | Los endpoints `get_b2b_metrics` y `get_b2c_metrics` repiten el mismo flujo de filtrado cambiando solo el `business_type`, lo que aumenta costo de mantenimiento. |

### Naming y contrato

| Práctica | Tipo | Hallazgo |
| --- | --- | --- |
| Convenciones de nombres consistentes por lenguaje | Buena | En backend predomina `snake_case` para funciones/variables y `PascalCase` para modelos; en frontend se usa `PascalCase` para componentes/tipos y `camelCase` para utilidades. |
| Contrato API estable en snake_case | Buena | Los campos de dominio (`create_date`, `operation_type`, `business_type`) conservan el mismo nombre desde FastAPI hasta los tipos de TypeScript, evitando mapeos extra. |
| Naming de archivos top-level no uniforme | Mala | En frontend conviven `App.tsx` y `main.tsx` con criterios distintos respecto al patrón predominante `kebab-case`, lo que deja la convención incompleta. |

### Testing

| Práctica | Tipo | Hallazgo |
| --- | --- | --- |
| Cobertura automatizada en backend y frontend | Buena | El proyecto incluye tests de API con pytest y tests de utilidades con vitest, lo que mejora validación de comportamiento en dos capas. |
| Cobertura parcial concentrada en utilidades | Mala | En frontend las pruebas visibles están centradas en `financial-utils` y no cubren componentes, renderizado ni estados de carga/error del dashboard. |

### Documentación

| Práctica | Tipo | Hallazgo |
| --- | --- | --- |
| Documentación bilingüe y arranque claro | Buena | Existen `README.md` y `README.es.md` con stack, pasos de ejecución y URLs de acceso, lo que reduce fricción de onboarding. |
| Convenciones antes implícitas y luego formalizadas | Mala | Las reglas del proyecto nacieron del análisis del código y no de una guía preexistente dentro del repo, por lo que hubo deriva de estilo antes de crear `.agents/rules`. |

### DX y UI

| Práctica | Tipo | Hallazgo |
| --- | --- | --- |
| DX/UI sin enforcement estilístico completo | Mala | El frontend muestra mezcla de comillas, punto y coma e idioma de UI; además, el lint actual no impone una convención visual única, por lo que el estilo queda librado al archivo. |

### Resumen cuantitativo

- Buenas prácticas: 5
- Malas prácticas: 5

