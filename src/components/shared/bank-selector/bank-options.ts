import type { TouchSelectOption } from "@/components/shared/touch-select";

/**
 * Lista completa de bancos principales en Colombia
 * Organizada alfabéticamente para grid 3×4 con paginación (16 bancos = 2 páginas)
 */
export const bankOptions: TouchSelectOption[] = [
	{
		value: "BANCOLOMBIA",
		label: "Bancolombia",
		icon: "🏦",
		description: "Bancolombia S.A.",
	},
	{
		value: "BANCO_BOGOTA",
		label: "Banco de Bogotá",
		icon: "🏦",
		description: "Banco de Bogotá",
	},
	{
		value: "DAVIVIENDA",
		label: "Davivienda",
		icon: "🏦",
		description: "Banco Davivienda",
	},
	{
		value: "BBVA",
		label: "BBVA Colombia",
		icon: "🏦",
		description: "BBVA Colombia",
	},
	{
		value: "BANCO_AGRARIO",
		label: "Banco Agrario",
		icon: "🌾",
		description: "Banco Agrario de Colombia",
	},
	{
		value: "BANCO_POPULAR",
		label: "Banco Popular",
		icon: "🏦",
		description: "Banco Popular",
	},
	{
		value: "BANCO_OCCIDENTE",
		label: "Banco de Occidente",
		icon: "🏦",
		description: "Banco de Occidente",
	},
	{
		value: "BANCO_AV_VILLAS",
		label: "AV Villas",
		icon: "🏦",
		description: "Banco AV Villas",
	},
	{
		value: "BANCO_CAJA_SOCIAL",
		label: "Caja Social",
		icon: "🏦",
		description: "Banco Caja Social BCSC",
	},
	{
		value: "BANCO_FALABELLA",
		label: "Falabella",
		icon: "🏦",
		description: "Banco Falabella",
	},
	{
		value: "BANCO_GNB",
		label: "GNB Sudameris",
		icon: "🏦",
		description: "Banco GNB Sudameris",
	},
	{
		value: "BANCO_PICHINCHA",
		label: "Pichincha",
		icon: "🏦",
		description: "Banco Pichincha",
	},
	{
		value: "SCOTIABANK",
		label: "Scotiabank Colpatria",
		icon: "🏦",
		description: "Scotiabank Colpatria",
	},
	{
		value: "BANCOOMEVA",
		label: "Bancoomeva",
		icon: "🏦",
		description: "Bancoomeva",
	},
	{
		value: "BANCO_COOPERATIVO",
		label: "Coopcentral",
		icon: "🏦",
		description: "Banco Cooperativo Coopcentral",
	},
	{
		value: "ITAU",
		label: "Itaú",
		icon: "🏦",
		description: "Banco Itaú",
	},
];

/**
 * Configuración del grid para el selector de bancos
 */
export const BANK_GRID_CONFIG = {
	columns: 3,
	rows: 4,
	itemsPerPage: 12,
	totalPages: Math.ceil(bankOptions.length / 12),
} as const;
