# Current State

## Implemented features

### Backend features
- Generacion de dataset mock financiero anual (12 meses, 30 movimientos por mes).
- Filtros por fecha, categoria y tipo de operacion.
- Segmentacion por business type (B2B/B2C).
- Endpoints implementados:
  - `/health`
  - `/api/metrics`
  - `/api/metrics/facets`
  - `/api/metrics/summary`
  - `/api/metrics/categories/top`
  - `/api/metrics/comparison`
  - `/api/metrics/alerts`
  - `/api/metrics/b2b`
  - `/api/metrics/b2c`

### Frontend features
- Dashboard unico con:
  - Header
  - KPI cards
  - Grafico Income vs Outcome
  - Grafico Profit Margin %
- Manejo de loading con skeletons.
- Manejo basico de error en carga de datos.
- Calculo local de KPIs y serie mensual.

### Testing implemented
- Backend:
  - Tests de endpoints principales y filtros.
  - Tests para facets, summary, top categories, comparison y alerts.
- Frontend:
  - Tests unitarios de utilidades financieras (`computeKPIs`, `computeMonthlyData`, formatters).

## Known gaps
- No persistencia real (datos son mock, regenerados en runtime).
- No autenticacion ni autorizacion.
- Frontend consume solo `/api/metrics`; no explota facets/comparison/alerts/top categories en UI.
- Cobertura de tests frontend limitada a utilidades; faltan tests de componentes y de flujo de pantalla.
- Falta estrategia i18n formal (texto mixto ES/EN en UI).
- Inconsistencias de estilo detectadas en frontend (comillas/semicolon convencion no completamente unificada).

## Next priorities (recommended)
1. Integrar en UI endpoints de mayor valor de negocio:
   - `facets` para filtros dinamicos
   - `summary` configurable por agrupacion
   - `comparison` y `alerts` como widgets accionables
2. Mejorar calidad frontend:
   - Tests de componentes (render, loading, error, empty states)
   - Pruebas de integracion del flujo de dashboard
3. Definir y automatizar consistencia de estilo:
   - Regla unica de comillas
   - Regla unica de semicolon
   - Lint/formatter con enforcement automatico
4. Preparar evolucion de datos reales:
   - Abstraccion de capa de datos en backend
   - Plan de migracion de mock a fuente persistente
5. Definir estrategia de idioma:
   - Elegir idioma principal de UI o implementar i18n

## Verified evidence
- `backend/app/routes.py`
- `backend/tests/test_routes.py`
- `frontend/src/App.tsx`
- `frontend/src/lib/financial-utils.ts`
- `frontend/src/lib/financial-utils.test.ts`
- `README.md`
