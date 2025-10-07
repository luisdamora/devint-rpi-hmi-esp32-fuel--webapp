/**
 * Constantes para el componente TouchSelect
 */

/**
 * Mapeo de número de columnas a clases de Tailwind CSS
 */
export const GRID_COLS_CLASSES: Record<1 | 2 | 3 | 4, string> = {
	1: "grid-cols-1",
	2: "grid-cols-1 md:grid-cols-2",
	3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
	4: "grid-cols-2 lg:grid-cols-4",
};

/**
 * Tamaños y dimensiones
 */
export const TOUCH_SELECT_SIZES = {
	/** Altura mínima del trigger */
	triggerMinHeight: "70px",
	/** Tamaño de fuente del trigger */
	triggerFontSize: "1.2rem",
	/** Altura mínima de cada opción */
	optionMinHeight: "100px",
	/** Tamaño de fuente de las opciones */
	optionFontSize: "1.1rem",
	/** Tamaño del botón de cerrar */
	closeButtonSize: "60px",
} as const;

/**
 * Clases CSS reutilizables
 */
export const TOUCH_SELECT_CLASSES = {
	trigger:
		"w-full px-6 py-4 rounded-lg font-semibold focus:outline-none focus:ring-4 focus:ring-blue-500 bg-white text-left flex items-center justify-between transition-all",
	triggerDisabled: "opacity-50 cursor-not-allowed",
	label: "block text-white font-semibold mb-2 text-sm uppercase tracking-wide",
	modalOverlay: "fixed inset-0 z-50 flex items-center justify-center",
	modalContainer: "w-full h-full flex flex-col p-6",
	modalHeader: "flex items-center justify-between mb-8",
	modalTitle: "text-white text-3xl font-bold",
	closeButton:
		"p-4 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 transition-colors focus:outline-none focus:ring-4 focus:ring-red-500",
	optionsContainer: "flex-1 overflow-y-auto",
	option:
		"p-6 rounded-lg font-semibold text-left transition-all focus:outline-none focus:ring-4 focus:ring-blue-500",
	optionSelected: "bg-green-600 text-white border-4 border-green-400",
	optionUnselected:
		"bg-white text-gray-900 hover:bg-gray-100 active:bg-gray-200",
} as const;
