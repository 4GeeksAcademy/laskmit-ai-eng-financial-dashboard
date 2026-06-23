# Desglose de componentes por funcionalidad

## Objetivo del documento
Definir, con nivel implementable, los componentes de UI, responsabilidades, props, estados y flujo de datos para:

1. Filtro de rango de fechas en dashboard principal.
2. Tabla de alertas de anomalías en dashboard principal.
3. Vista comparativa B2B vs B2C.

Este desglose asume contrato API existente y los tipos ya definidos en:

- `frontend/specs/api-types.ts`
- `frontend/specs/param-types.ts`

## Reglas globales de implementación

- Mantener nombres de campos de contrato en `snake_case` en requests/responses de API.
- Mantener idioma único en UI: español en labels, ayudas, errores y estados vacíos.
- No usar `any` ni `object` en TypeScript.
- Fechas de consulta siempre en formato `YYYY-MM-DD`.
- Todos los estados de carga/error/vacío deben renderizarse explícitamente (no ocultar componentes).
- El filtro de fechas es fuente de verdad compartida para funcionalidades 1 y 2, y reutilizable en funcionalidad 3.

---

## Funcionalidad 1: Filtro de rango de fechas (dashboard principal)

### Componentes a crear o modificar

1. `dashboard-header` (modificar)
- Archivo actual: `frontend/src/components/dashboard/dashboard-header.tsx`
- Cambio: quitar periodo hardcodeado y recibir periodo dinámico.

2. `date-range-filter` (nuevo)
- Ruta sugerida: `frontend/src/components/dashboard/date-range-filter.tsx`
- Renderiza inputs `Desde` y `Hasta`, texto de rango válido y errores de validación.

3. `dashboard-page` o `app-dashboard-view` (nuevo contenedor)
- Ruta sugerida: `frontend/src/components/dashboard/dashboard-page.tsx`
- Orquesta fetch de `facets`, fetch de `metrics`, validación de fechas y distribución de props a KPI/charts.

4. `dashboard-empty-state` (nuevo)
- Ruta sugerida: `frontend/src/components/dashboard/dashboard-empty-state.tsx`
- Mensaje cuando `GET /api/metrics` responde 0 registros para un rango válido.

### Contrato de props recomendado

```ts
interface DateRangeFilterProps {
	value: DateRangeFilter
	validRange: {
		min_date: string
		max_date: string
	} | null
	errorMessage: string | null
	disabled?: boolean
	onChange: (next: DateRangeFilter) => void
	onApply: () => void
	onClear: () => void
}
```

```ts
interface DashboardHeaderProps {
	period_label: string
}
```

### Estado y fuente de verdad

En el contenedor `dashboard-page`:

- `facets: FacetsResponse | null`
- `date_filter: DateRangeFilter`
- `date_filter_error: string | null`
- `movements: FinancialMovement[]`
- `metrics: KPIMetrics | null`
- `monthly_data: MonthlyDataPoint[]`
- `loading_facets: boolean`
- `loading_metrics: boolean`
- `error_facets: string | null`
- `error_metrics: string | null`

### Flujo de datos obligatorio

1. En montaje:
- Llamar `GET /api/metrics/facets`.
- Guardar `min_date` y `max_date`.

2. Tras cargar `facets`:
- Llamar `GET /api/metrics` sin filtros (`start_date` y `end_date` omitidos).

3. Al aplicar filtro:
- Validar fechas.
- Si hay error, no ejecutar request.
- Si es válido, llamar `GET /api/metrics` con query params informados.

### Reglas de validación en `date-range-filter`

- Si ambas fechas existen: `start_date <= end_date`.
- Si existe `start_date`: `start_date >= min_date`.
- Si existe `end_date`: `end_date <= max_date`.
- Si hay error, mostrar mensaje claro y bloquear `onApply`.

Mensajes de error sugeridos:

- `La fecha Desde no puede ser posterior a la fecha Hasta.`
- `La fecha Desde está fuera del rango permitido.`
- `La fecha Hasta está fuera del rango permitido.`

### Render del período dinámico

Regla para `period_label` del header:

- Sin fechas: `Periodo completo disponible`.
- Solo `start_date`: `Desde {start_date}`.
- Solo `end_date`: `Hasta {end_date}`.
- Ambas: `{start_date} a {end_date}`.

### Estados de UI

- Carga inicial de `facets`: skeleton o texto `Cargando rango de fechas...`.
- Error de `facets`: bloque de error con acción `Reintentar`.
- Carga de métricas: mantener estructura del dashboard con skeletons.
- Vacío de métricas (0 registros): renderizar `dashboard-empty-state` con mensaje:
	`No hay datos para el rango seleccionado.`

### Accesibilidad mínima

- Labels visibles para ambos inputs: `Desde` y `Hasta`.
- Texto de ayuda conectado con `aria-describedby`.
- Error conectado con `aria-live="polite"`.

---

## Funcionalidad 2: Tabla de alertas de anomalías

### Componentes a crear

1. `alerts-panel` (nuevo)
- Ruta sugerida: `frontend/src/components/dashboard/alerts-panel.tsx`
- Contenedor de input de umbral + tabla/estado vacío/error.

2. `alerts-threshold-input` (nuevo)
- Ruta sugerida: `frontend/src/components/dashboard/alerts-threshold-input.tsx`
- Input numérico para ratio de alerta.

3. `alerts-table` (nuevo)
- Ruta sugerida: `frontend/src/components/dashboard/alerts-table.tsx`
- Tabla con columnas requeridas.

4. `alerts-empty-state` (nuevo)
- Ruta sugerida: `frontend/src/components/dashboard/alerts-empty-state.tsx`
- Mensaje explícito cuando no hay alertas.

### Contrato de props recomendado

```ts
interface AlertsPanelProps {
	date_filter: DateRangeFilter
	disabled_by_date_validation: boolean
}

interface AlertsThresholdInputProps {
	value: number
	min?: number
	max?: number
	step?: number
	onChange: (next: number) => void
	onApply: () => void
}

interface AlertsTableProps {
	rows: AlertEntry[]
	loading?: boolean
}
```

### Query params y comportamiento

Request a `GET /api/metrics/alerts` con:

- `threshold` (obligatorio en frontend, default `0.3`).
- `start_date` y `end_date` heredados del filtro de funcionalidad 1 cuando estén presentes.

Restricciones UI del umbral:

- Rango permitido en input: `0.01` a `1.0`.
- Paso recomendado: `0.01`.
- Si valor inválido, mostrar error y no disparar request.

### Columnas de tabla (obligatorias)

1. `Período` -> `period`
2. `Outcome registrado` -> `outcome_total`
3. `Media móvil (3 períodos previos)` -> `baseline_average`
4. `Incremento porcentual` -> `increase_ratio * 100` mostrado como `%`

Formato recomendado:

- Montos monetarios con `formatCurrency`.
- Incremento con 1 o 2 decimales (ejemplo: `34.5%`).

### Estados de UI

- Cargando: tabla skeleton.
- Error: banner con acción `Reintentar`.
- Sin alertas: `alerts-empty-state` con texto:
	`No se detectaron anomalías para el umbral seleccionado.`

### Integración exacta en dashboard principal

- Ubicar `alerts-panel` debajo de los gráficos actuales (`income-outcome-chart` y `profit-percent-chart`).
- El panel debe actualizarse cuando cambie:
	- El umbral.
	- El filtro de fecha aplicado en funcionalidad 1.

---

## Funcionalidad 3: Página comparativa B2B vs B2C

### Componentes a crear

1. `comparison-page` (nuevo)
- Ruta sugerida: `frontend/src/components/comparison/comparison-page.tsx`
- Orquesta filtros, requests, cálculos de porcentaje y layout completo.

2. `comparison-date-filter` (nuevo, reutilizable)
- Ruta sugerida: `frontend/src/components/comparison/comparison-date-filter.tsx`
- Puede reutilizar la API de props de `date-range-filter`.

3. `business-top-categories-table` (nuevo)
- Ruta sugerida: `frontend/src/components/comparison/business-top-categories-table.tsx`
- Tabla para cada grupo (B2B y B2C).

4. `income-comparison-chart` (nuevo)
- Ruta sugerida: `frontend/src/components/comparison/income-comparison-chart.tsx`
- Gráfico único comparando total ingresos B2B vs B2C.

5. `comparison-empty-state` (nuevo)
- Ruta sugerida: `frontend/src/components/comparison/comparison-empty-state.tsx`

### Navegación y entrada a la página

Implementación definida (sin ambigüedad):

- Agregar `react-router-dom`.
- Rutas mínimas:
	- `/` -> dashboard principal.
	- `/comparativa-b2b-b2c` -> `comparison-page`.
- Agregar navegación visible entre ambas vistas en el header global o barra superior.

### Requests obligatorios en `comparison-page`

1. `GET /api/metrics/facets`
- Usar `min_date` y `max_date` para rango válido del filtro.
- Usar `categories` solo como referencia de catálogo (texto auxiliar o validación de consistencia).

2. `GET /api/metrics/categories/top?operation_type=income&limit=5&business_type=B2B[&start_date][&end_date]`

3. `GET /api/metrics/categories/top?operation_type=income&limit=5&business_type=B2C[&start_date][&end_date]`

Notas de implementación:

- Disparar requests de B2B y B2C en paralelo.
- Si hay filtro parcial de fechas, enviar solo el parámetro presente.

### Tabla por grupo (B2B/B2C)

Columnas obligatorias:

1. `Categoría`
2. `Total ingresos`
3. `% sobre total del grupo`

Regla de porcentaje:

- `group_total = sum(total_amount de las filas del grupo)`
- `percentage = group_total > 0 ? (row.total_amount / group_total) * 100 : 0`

### Gráfico comparativo único

Datos de entrada:

- `b2b_total_income = sum(total_amount de top B2B)`
- `b2c_total_income = sum(total_amount de top B2C)`

Render:

- Gráfico de barras de dos categorías: `B2B` y `B2C`.
- Eje Y en moneda.
- Tooltip con valor monetario y porcentaje relativo sobre la suma B2B+B2C.

### Estados de UI

- Cargando: skeleton para filtro, ambas tablas y gráfico.
- Error parcial (falla solo uno de los grupos):
	- Mostrar error contextual en sección afectada.
	- Mantener visible la sección que sí respondió.
- Vacío total: `comparison-empty-state` con texto:
	`No hay datos de ingresos para el rango seleccionado.`

---

## Contratos de estado recomendados (frontend)

```ts
interface AsyncState<T> {
	data: T | null
	loading: boolean
	error: string | null
}
```

```ts
interface ComparisonGroupData {
	business_type: 'B2B' | 'B2C'
	rows: CategoryEntry[]
	total_income: number
}
```

---

## Orden de implementación sugerido

1. Implementar funcionalidad 1 (filtro + validaciones + periodo dinámico).
2. Integrar funcionalidad 2 reutilizando el filtro de fechas ya aplicado.
3. Implementar rutas y página de funcionalidad 3 con su propio filtro reutilizable.
4. Estandarizar idioma de textos existentes a español en todos los componentes tocados.
5. Cubrir pruebas mínimas por componente crítico:
	 - validación de fechas,
	 - bloqueo de requests inválidos,
	 - estado vacío en alerts,
	 - cálculo de porcentaje en comparativa.
