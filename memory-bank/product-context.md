# Product Context

## Product overview
Financial Metrics Dashboard es un producto de analisis financiero para visualizar movimientos de ingresos y egresos en una interfaz web.

Objetivo funcional actual:
- Mostrar KPIs clave (ingresos, egresos, profit y margen de profit).
- Visualizar evolucion mensual de ingresos vs egresos.
- Visualizar margen de profit por periodo.
- Exponer endpoints de analitica y filtros desde backend.

## Primary users (inferred from implemented flows)
- Usuario operativo/analista que necesita ver tendencia de ingresos y egresos.
- Usuario de negocio que necesita comparar periodos y detectar alertas de aumento de egresos.

## Core product flows implemented
1. Carga inicial de datos financieros desde frontend con `GET /api/metrics`.
2. Calculo en cliente de KPIs y agregacion mensual.
3. Render de tarjetas KPI y graficos en el dashboard.
4. Filtros y analitica avanzada disponibles en backend via endpoints adicionales.

## Scope currently covered by backend API
- Health check.
- Dataset financiero mock anual.
- Filtros por fecha, categoria, tipo de operacion y business type.
- Facets para poblar filtros (categorias, operation types, business types, rango de fechas).
- Resumen agrupado por dia/semana/mes.
- Top categorias por tipo de operacion.
- Comparacion entre periodo actual y previo.
- Alertas por incremento de egresos sobre baseline historico.
- Endpoints dedicados B2B y B2C.

## Scope currently covered by frontend UI
- Dashboard unico con header, fila de KPIs y 2 graficos.
- Estado de carga (skeletons) y estado de error de fetch.
- Consumo de `/api/metrics` y computo local de indicadores.

## Out of scope at this stage (no evidence in repo)
- Autenticacion/autorizacion.
- Persistencia real de datos (base de datos).
- Multi-tenant o gestion de usuarios.
- Exportaciones (CSV/PDF) o reportes descargables.
- i18n formal (hay mezcla de textos ES/EN).

## Evidence (repo files)
- `README.md` (descripcion del producto y run local).
- `frontend/src/App.tsx` (flujo principal UI + fetch de `/api/metrics`).
- `frontend/src/lib/financial-utils.ts` (KPIs y agregacion mensual).
- `backend/app/routes.py` (modelos, reglas de negocio, endpoints).
- `backend/tests/test_routes.py` (validacion de endpoints y contrato basico).
