# Especificación Funcional Frontend - Dashboard Financiero

## Objetivo
Definir de forma implementable qué ve el usuario, qué datos requiere cada componente y qué reglas rigen los campos para tres funcionalidades del dashboard:

1. Fila de KPIs
2. Gráfico Income vs Outcome
3. Gráfico Profit Margin %

## Contrato API Base

### Endpoint principal
GET /api/metrics

### Query params
1. start_date (opcional, formato fecha YYYY-MM-DD)
2. end_date (opcional, formato fecha YYYY-MM-DD)
3. category (opcional): suppliers | sales | operational | administrative | others
4. operation_type (opcional): income | outcome

### Respuesta
Lista de movimientos financieros con esta estructura:

1. create_date: string fecha ISO (YYYY-MM-DD)
2. amount: number
3. operation_type: income | outcome
4. category: suppliers | sales | operational | administrative | others
5. business_type: B2B | B2C

### Reglas de backend relevantes
1. Filtros de fecha inclusivos en ambos extremos.
2. Respuesta ordenada cronológicamente ascendente por create_date.
3. Dominios cerrados para operation_type, category y business_type.

---

## Funcionalidad 1: Fila de KPIs

### Qué ve el usuario
Cuatro tarjetas:

1. Total Income
2. Total Outcome
3. Profit
4. Profit Margin

### Datos de entrada
Lista de movimientos de GET /api/metrics.

### Reglas de cálculo
1. totalIncome = suma de amount donde operation_type = income
2. totalOutcome = suma de amount donde operation_type = outcome
3. profit = totalIncome - totalOutcome
4. profitPercent:
   - Si totalIncome > 0: (profit / totalIncome) * 100
   - Si totalIncome = 0: 0

### Reglas de presentación
1. Moneda en USD sin decimales para Income, Outcome y Profit.
2. Profit Margin con 1 decimal y símbolo %.
3. Si aún no hay métricas, mostrar placeholder visual en vez del valor final.

### Criterios de aceptación
1. Siempre se renderizan 4 KPIs.
2. Los valores reflejan exactamente los datos filtrados.
3. No hay división por cero en Profit Margin.

---

## Funcionalidad 2: Gráfico Income vs Outcome

### Qué ve el usuario
Un gráfico de líneas mensual con dos series:

1. Income
2. Outcome

### Datos de entrada
Agregación mensual derivada de la lista de movimientos.

### Transformación
1. Agrupar por mes calendario usando create_date.
2. income mensual = suma de amount con operation_type = income.
3. outcome mensual = suma de amount con operation_type = outcome.
4. Orden de salida: cronológico por mes.
5. Etiqueta de mes: formato corto mes-año (ejemplo: Mar 2025).

### Reglas de visualización
1. Si no hay datos, mostrar mensaje de estado vacío.
2. Tooltip debe mostrar mes + valores formateados en moneda.
3. Ejes y líneas deben mantenerse legibles en desktop y móvil.

### Criterios de aceptación
1. Cada punto mensual coincide con la agregación exacta de datos.
2. Tooltip no muestra valores sin formato.
3. Estado vacío aparece cuando no hay puntos válidos.

---

## Funcionalidad 3: Gráfico Profit Margin %

### Qué ve el usuario
Gráfico de línea de margen de beneficio mensual.

### Datos de entrada
La misma agregación mensual usada por el gráfico anterior, incluyendo profitPercent por mes.

### Transformación
Para cada mes:

1. profit = income - outcome
2. profitPercent:
   - Si income > 0: (profit / income) * 100
   - Si income = 0: 0

### Reglas de visualización
1. Mostrar línea de referencia en 0%.
2. Tooltip con valor de porcentaje a 1 decimal.
3. Si no hay datos con margen calculable, mostrar estado vacío.

### Criterios de aceptación
1. El porcentaje mensual es consistente con income y outcome del mismo mes.
2. Soporta valores negativos.
3. La línea 0% siempre visible.

---

## Estados Transversales

### Loading
Mientras la API no responde, mostrar estados de carga en KPIs y gráficos.

### Error
Si falla GET /api/metrics:

1. Mostrar mensaje de error al usuario.
2. No bloquear el render general de la pantalla.

### Fuente de verdad
Las tres funcionalidades se derivan del mismo payload base de /api/metrics para mantener consistencia.

---

## Reglas de Validación de Implementación

1. Respetar exactamente los dominios de valores que devuelve la API.
2. No asumir campos fuera del contrato.
3. Mantener nombres de campo idénticos al backend.
4. Cualquier cambio de contrato API requiere actualización coordinada de tipos, cálculos y pruebas.

---

## Casos Límite Mínimos

1. Lista vacía de movimientos.
2. Todos los movimientos son outcome.
3. Todos los movimientos son income.
4. Filtro de fecha con mismo start_date y end_date.
5. Meses con margen negativo.
6. Datos no continuos entre meses.

---

## Definición de Terminado

1. Las tres vistas renderizan correctamente con datos reales de la API.
2. Loading, vacío y error están cubiertos en UI.
3. Cálculos de KPI y series mensuales pasan pruebas unitarias.
4. No hay discrepancias entre tipos frontend y respuesta backend.
