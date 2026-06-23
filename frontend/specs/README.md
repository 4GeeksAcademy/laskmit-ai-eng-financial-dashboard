# Contrato de datos frontend

## Alcance
Este documento describe el contrato de datos que consume la capa frontend para las 3 funcionalidades definidas en `frontend/specs/components.md`.

Incluye:

- Endpoints por funcionalidad.
- Tipos TypeScript de request y response.
- Valores válidos y restricciones de parámetros.
- Casos edge y comportamiento esperado de UI.

No define implementación de componentes ni lógica de render detallada.

## Verificación de rutas

Las rutas de API listadas aquí fueron validadas contra el contrato backend del proyecto (FastAPI), que es la fuente usada por `/docs`.

Rutas relevantes confirmadas:

- `GET /api/metrics`
- `GET /api/metrics/facets`
- `GET /api/metrics/alerts`
- `GET /api/metrics/categories/top`

---

## Funcionalidad 1: Filtro de rango de fechas en dashboard principal

### Endpoints consumidos

1. `GET /api/metrics/facets`
- Uso: obtener rango válido del dataset (`min_date`, `max_date`).

2. `GET /api/metrics`
- Uso: obtener movimientos financieros filtrados por fechas.

### Tipos TypeScript (request/response)

#### Request

- Para `GET /api/metrics/facets`: sin parámetros.
- Para `GET /api/metrics`: `DateRangeFilter` (definido en `frontend/specs/param-types.ts`).

```ts
export interface DateRangeFilter {
	start_date?: string
	end_date?: string
}
```

#### Response

- `GET /api/metrics/facets` -> `FacetsResponse` (definido en `frontend/specs/api-types.ts`).
- `GET /api/metrics` -> `FinancialMovement[]` (definido en `frontend/src/lib/financial-types.ts`).

```ts
export interface FacetsResponse {
	operation_types: OperationType[]
	business_types: BusinessType[]
	categories: Category[]
	min_date: string
	max_date: string
}
```

```ts
export interface FinancialMovement {
	create_date: string
	amount: number
	operation_type: 'income' | 'outcome'
	category: 'suppliers' | 'sales' | 'operational' | 'administrative' | 'others'
	business_type: 'B2B' | 'B2C'
}
```

### Parámetros válidos y restricciones

- `start_date`:
	- opcional.
	- formato `YYYY-MM-DD`.
	- si existe, debe ser `>= min_date`.

- `end_date`:
	- opcional.
	- formato `YYYY-MM-DD`.
	- si existe, debe ser `<= max_date`.

- Validación cruzada:
	- si existen ambas, `start_date <= end_date`.

- Regla de filtrado:
	- inclusivo en ambos extremos.

### Casos edge (mínimo 2)

1. `start_date` mayor que `end_date`.
- Comportamiento UI esperado: mostrar error de validación claro y no disparar request de métricas.

2. `start_date` o `end_date` fuera de rango (`min_date`/`max_date`).
- Comportamiento UI esperado: mostrar error de validación claro y no disparar request.

3. Rango válido pero respuesta vacía (`[]`).
- Comportamiento UI esperado: mostrar estado vacío explícito para dashboard, no error técnico.

---

## Funcionalidad 2: Tabla de alertas de anomalías

### Endpoints consumidos

1. `GET /api/metrics/alerts`
- Uso: obtener períodos con anomalías de egreso según umbral.
- Debe respetar el mismo filtro de fechas activo en funcionalidad 1.

### Tipos TypeScript (request/response)

#### Request

- `AlertsParams` (definido en `frontend/specs/param-types.ts`).

```ts
export interface AlertsParams extends DateRangeFilter {
	threshold: number
}
```

#### Response

- `AlertsResponse` (definido en `frontend/specs/api-types.ts`).

```ts
export interface AlertEntry {
	period: string
	outcome_total: number
	baseline_average: number
	increase_ratio: number
}

export type AlertsResponse = AlertEntry[]
```

### Parámetros válidos y restricciones

- `threshold`:
	- numérico.
	- backend permite `>= 0`.
	- restricción de producto/UI para esta funcionalidad: entre `0.01` y `1.0`.
	- valor por defecto en UI: `0.3`.

- `start_date` y `end_date`:
	- mismas reglas que funcionalidad 1.

- `period` en respuesta:
	- depende de agrupación backend (por defecto `month`): puede venir como `YYYY-MM`.

### Casos edge (mínimo 2)

1. No hay alertas para el umbral actual (response vacía).
- Comportamiento UI esperado: mostrar mensaje explícito de estado vacío (la tabla no desaparece).

2. Umbral fuera de rango de producto (ejemplo: `0` o `1.5` desde UI).
- Comportamiento UI esperado: mostrar validación de input y no disparar request hasta corregir.

3. Cambio de filtro de fechas a un rango sin movimientos.
- Comportamiento UI esperado: mantener estructura de tabla y mostrar estado vacío coherente con el filtro activo.

---

## Funcionalidad 3: Vista comparativa B2B vs B2C

### Endpoints consumidos

1. `GET /api/metrics/categories/top`
- Uso: obtener top categorías de ingresos para cada línea de negocio.
- Se consume dos veces por cada búsqueda:
	- `business_type=B2B`
	- `business_type=B2C`

2. `GET /api/metrics/facets`
- Uso: obtener rango válido de fechas y referencia de categorías disponibles.

### Tipos TypeScript (request/response)

#### Request

- Para rango: `DateRangeFilter`.
- Para top categorías: `TopCategoriesParams` + `business_type`.

```ts
export interface TopCategoriesParams extends DateRangeFilter {
	operation_type: 'income' | 'outcome'
	limit: number
}

export type BusinessType = 'B2B' | 'B2C'
```

Request efectivo de la funcionalidad:

```ts
type ComparisonTopCategoriesParams = TopCategoriesParams & {
	business_type: BusinessType
}
```

#### Response

- `GET /api/metrics/categories/top` -> `TopCategoriesResponse`.
- `GET /api/metrics/facets` -> `FacetsResponse`.

```ts
export interface CategoryEntry {
	category: Category
	operation_type: 'income' | 'outcome'
	total_amount: number
}

export type TopCategoriesResponse = CategoryEntry[]
```

### Parámetros válidos y restricciones

- `operation_type`:
	- para esta funcionalidad debe ser fijo: `income`.

- `limit`:
	- entero.
	- backend: `1..20`.
	- producto para comparativa: `5`.

- `business_type`:
	- obligatorio para cada consulta de grupo.
	- valores válidos: `B2B` o `B2C`.

- `start_date` y `end_date`:
	- opcionales.
	- formato `YYYY-MM-DD`.
	- dentro del rango de `facets`.

### Casos edge (mínimo 2)

1. Un grupo devuelve datos y el otro no (por rango aplicado).
- Comportamiento UI esperado: mostrar tabla con datos en el grupo disponible y estado vacío explícito en el grupo sin datos; mantener gráfico comparativo con valor 0 en el grupo vacío.

2. Ambos grupos devuelven vacío.
- Comportamiento UI esperado: mostrar estado vacío global de comparativa, no error técnico.

3. Error en una de las dos requests de top categories.
- Comportamiento UI esperado: mostrar error contextual en la sección afectada y mantener la otra sección visible si está disponible.

---

## Resumen de mapeo funcionalidad -> contratos

### Funcionalidad 1
- Requests:
	- `GET /api/metrics/facets` sin params.
	- `GET /api/metrics` con `DateRangeFilter`.
- Responses:
	- `FacetsResponse`.
	- `FinancialMovement[]`.

### Funcionalidad 2
- Request:
	- `GET /api/metrics/alerts` con `AlertsParams`.
- Response:
	- `AlertsResponse`.

### Funcionalidad 3
- Requests:
	- `GET /api/metrics/facets` sin params.
	- `GET /api/metrics/categories/top` con `ComparisonTopCategoriesParams` para `B2B` y `B2C`.
- Responses:
	- `FacetsResponse`.
	- `TopCategoriesResponse` (por grupo).
