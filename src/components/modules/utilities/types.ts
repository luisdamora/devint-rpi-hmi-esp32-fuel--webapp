import type React from "react";

/**
 * Registro de una venta en el sistema
 */
export interface SaleRecord {
	/** Número de factura electrónica */
	fe: string;

	/** Identificador de programa de puntos */
	idPuntos: string;

	/** Identificador de promoción aplicada */
	idPromo: string;

	/** Placa del vehículo */
	placa: string;

	/** Nombre del producto vendido */
	producto: string;

	/** Monto total en pesos colombianos */
	dinero: number;

	/** Volumen en litros o galones */
	volumen: number;
}

/**
 * Definición de una acción/botón en utilidades
 */
export interface UtilityAction {
	/** Identificador único de la acción */
	key: string;

	/** Etiqueta a mostrar en el botón */
	label: string;

	/** Icono de lucide-react */
	icon: React.ReactNode;

	/** Función a ejecutar al hacer clic (opcional) */
	action?: () => void;

	/** Si es la acción activa/seleccionada */
	isActive?: boolean;
}

/**
 * Props del componente SalesTable
 */
export interface SalesTableProps {
	/** Array de registros de ventas */
	salesData: SaleRecord[];
}

/**
 * Información del último turno de trabajo
 */
export interface TurnInfo {
	/** ID único del turno */
	id: string;

	/** Fecha y hora de inicio del turno */
	startTime: string;

	/** Fecha y hora de fin del turno (opcional) */
	endTime?: string;

	/** Operador del turno */
	operator: string;

	/** Total de ventas en pesos */
	totalSales: number;

	/** Total de volumen vendido */
	totalVolume: number;

	/** Número de transacciones */
	transactionCount: number;

	/** Estado del turno */
	status: 'active' | 'closed' | 'cancelled';
}

/**
 * Configuración de la impresora
 */
export interface PrinterConfig {
	/** Nombre o identificador de la impresora */
	name: string;

	/** Dirección IP de la impresora */
	ipAddress: string;

	/** Puerto de conexión */
	port: number;

	/** Ancho del papel en mm */
	paperWidth: number;

	/** Fuente a usar (opcional) */
	font?: string;

	/** Configuración activa */
	isActive: boolean;
}

/**
 * Estados de impresión
 */
export type PrintStatus = 'idle' | 'printing' | 'success' | 'error';

/**
 * Datos adicionales en el resultado de impresión
 */
export interface PrintResultData {
	/** Timestamp de la operación */
	timestamp?: string;
	/** Mensaje impreso */
	message?: string;
	/** Error ocurrido (si aplica) */
	error?: string;
	/** Dirección IP (para conexiones de prueba) */
	ip?: string;
	/** Puerto (para conexiones de prueba) */
	port?: number;
}

/**
 * Resultado de una operación de impresión
 */
export interface PrintResult {
	/** Estado de la impresión */
	status: PrintStatus;

	/** Mensaje descriptivo */
	message: string;

	/** Datos adicionales (opcional) */
	data?: PrintResultData;
}

/**
 * Props del componente UtilitiesActions
 */
export interface UtilitiesActionsProps {
	/** Handler para clicks en botones de acción */
	onActionClick: (actionKey: string) => void;
}
