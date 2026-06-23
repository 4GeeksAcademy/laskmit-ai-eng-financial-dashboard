/**
 * Tipo de operacion financiera.
 * Valores validos:
 * - 'income': ingreso de dinero.
 * - 'outcome': egreso de dinero.
 */
export type OperationType = 'income' | 'outcome'

/**
 * Segmento comercial del movimiento.
 * Valores validos:
 * - 'B2B': negocio entre empresas.
 * - 'B2C': negocio hacia consumidor final.
 */
export type BusinessType = 'B2B' | 'B2C'

/**
 * Categoria del movimiento financiero.
 * Valores validos:
 * - 'suppliers': pagos a proveedores.
 * - 'sales': ventas o ingresos comerciales.
 * - 'operational': gastos operativos.
 * - 'administrative': gastos administrativos.
 * - 'others': otros conceptos no clasificados.
 */
export type Category = 'suppliers' | 'sales' | 'operational' | 'administrative' | 'others'

/**
 * Respuesta de GET /api/metrics/facets.
 * Incluye valores de referencia para filtros y rango de fechas disponible.
 */
export interface FacetsResponse {
	/**
	 * Lista de tipos de operacion disponibles en el dataset.
	 * Valores posibles por elemento: 'income' | 'outcome'.
	 */
	operation_types: OperationType[]
	/**
	 * Lista de tipos de negocio disponibles en el dataset.
	 * Valores posibles por elemento: 'B2B' | 'B2C'.
	 */
	business_types: BusinessType[]
	/**
	 * Lista de categorias detectadas en el dataset.
	 * Valores posibles por elemento:
	 * 'suppliers' | 'sales' | 'operational' | 'administrative' | 'others'.
	 */
	categories: Category[]
	/**
	 * Fecha minima disponible para filtrar datos.
	 * Formato: fecha ISO 8601 (YYYY-MM-DD).
	 */
	min_date: string
	/**
	 * Fecha maxima disponible para filtrar datos.
	 * Formato: fecha ISO 8601 (YYYY-MM-DD).
	 */
	max_date: string
}

/**
 * Registro individual de alerta de anomalia.
 * Corresponde a un periodo donde el egreso supera el umbral configurado
 * respecto de la linea base historica.
 */
export interface AlertEntry {
	/**
	 * Identificador del periodo evaluado.
	 * Formato depende del agrupamiento:
	 * - day: YYYY-MM-DD
	 * - week: YYYY-Www (semana ISO)
	 * - month: YYYY-MM
	 */
	period: string
	/**
	 * Total de egresos observados en el periodo.
	 * Unidad: monto monetario decimal.
	 */
	outcome_total: number
	/**
	 * Promedio historico de egresos usado como baseline.
	 * Unidad: monto monetario decimal.
	 */
	baseline_average: number
	/**
	 * Incremento relativo entre el periodo y la baseline.
	 * Formula: (outcome_total - baseline_average) / baseline_average.
	 * Ejemplo: 0.35 representa +35%.
	 */
	increase_ratio: number
}

/**
 * Respuesta de GET /api/metrics/alerts.
 * Coleccion de alertas detectadas para el rango/filtros consultados.
 */
export type AlertsResponse = AlertEntry[]

/**
 * Registro individual de categoria para ranking de top categorias.
 */
export interface CategoryEntry {
	/**
	 * Categoria agregada para el ranking.
	 * Valores posibles:
	 * 'suppliers' | 'sales' | 'operational' | 'administrative' | 'others'.
	 */
	category: Category
	/**
	 * Tipo de operacion sobre el cual se calculo el ranking.
	 * Valores posibles: 'income' | 'outcome'.
	 */
	operation_type: OperationType
	/**
	 * Monto total acumulado de la categoria en el periodo consultado.
	 * Unidad: monto monetario decimal.
	 */
	total_amount: number
}

/**
 * Respuesta de GET /api/metrics/categories/top.
 * Ranking ordenado de categorias por monto total.
 */
export type TopCategoriesResponse = CategoryEntry[]
