# Contexto del proyecto: laskmit-ai-eng-financial-dashboard

## 1) Resumen del proyecto

Proyecto full-stack para visualizar métricas financieras con:

- Frontend en React + TypeScript + Vite + Tailwind + Recharts.
- Backend en FastAPI (Python) que entrega datos mock y endpoints de análisis.
- Ejecución local con Docker Compose.

### Arquitectura y responsabilidades

- `frontend/`: interfaz del dashboard, cálculo de KPIs en cliente y gráficos.
- `backend/`: API REST que genera movimientos financieros simulados, filtra, agrega y compara periodos.
- `memory/`: documentación/contexto operativo del proyecto.

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

