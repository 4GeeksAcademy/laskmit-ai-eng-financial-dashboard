import type { OperationType } from './api-types'

/**
 * Filtro compartido de rango de fechas para consultas de metricas.
 */
export interface DateRangeFilter {
	/**
	 * Fecha inicial (inclusive) del rango a consultar.
	 * Formato: YYYY-MM-DD (ISO 8601 de fecha sin hora).
	 * Propiedad opcional.
	 */
	start_date?: string

	/**
	 * Fecha final (inclusive) del rango a consultar.
	 * Formato: YYYY-MM-DD (ISO 8601 de fecha sin hora).
	 * Propiedad opcional.
	 */
	end_date?: string
}

/**
 * Parametros de consulta para GET /api/metrics/alerts.
 */
export interface AlertsParams extends DateRangeFilter {
	/**
	 * Umbral minimo para disparar una alerta de anomalia.
	 * Regla de backend: valor numerico mayor o igual que 0.
	 * Interpretacion habitual: 0.3 equivale a 30% de incremento.
	 */
	threshold: number
}

/**
 * Parametros de consulta para GET /api/metrics/categories/top.
 */
export interface TopCategoriesParams extends DateRangeFilter {
	/**
	 * Tipo de operacion para calcular el ranking de categorias.
	 * Valores validos: 'income' | 'outcome'.
	 */
	operation_type: OperationType

	/**
	 * Cantidad maxima de categorias a devolver.
	 * Regla de backend: entero entre 1 y 20.
	 */
	limit: number
}
