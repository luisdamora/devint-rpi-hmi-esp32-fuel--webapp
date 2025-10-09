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
 * Props del componente UtilitiesActions
 */
export interface UtilitiesActionsProps {
	/** Handler para clicks en botones de acción */
	onActionClick: (actionKey: string) => void;
}
