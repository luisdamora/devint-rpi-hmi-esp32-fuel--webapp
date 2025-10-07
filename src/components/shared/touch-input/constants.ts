/**
 * TouchInput - Constantes y configuración
 */

/**
 * Layout del teclado QWERTY
 */
export const KEYBOARD_LAYOUT = {
	row1: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
	row2: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
	row3: ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"],
	row4: ["z", "x", "c", "v", "b", "n", "m", "@", ".", "-"],
} as const;

/**
 * Caracteres especiales disponibles
 */
export const SPECIAL_CHARS = [
	"@",
	".",
	"-",
	"_",
	",",
	";",
	":",
	"!",
	"?",
	"#",
	"$",
	"%",
	"&",
	"*",
	"(",
	")",
	"+",
	"=",
	"/",
] as const;

/**
 * Tamaños de los elementos
 */
export const TOUCH_INPUT_SIZES = {
	/** Altura mínima del trigger */
	triggerMinHeight: "30px",
	/** Tamaño de fuente del trigger */
	triggerFontSize: "1rem",
	/** Tamaño del teclado */
	keyboardKeySize: "45px",
	/** Tamaño de fuente de las teclas */
	keyboardKeyFontSize: "1.1rem",
	/** Tamaño del display del modal */
	modalDisplayHeight: "60px",
	/** Tamaño de fuente del display */
	modalDisplayFontSize: "1.5rem",
	/** Tamaño del botón cerrar */
	closeButtonSize: "50px",
} as const;

/**
 * Clases CSS reutilizables
 */
export const TOUCH_INPUT_CLASSES = {
	// Trigger
	trigger:
		"w-full px-4 py-1 rounded-lg font-medium focus:outline-none focus:ring-4 focus:ring-blue-500 bg-white text-left transition-all cursor-pointer flex items-center justify-between gap-2",
	triggerDisabled: "opacity-50 cursor-not-allowed",
	label: "block text-white font-semibold mb-1 text-xs uppercase tracking-wide",

	// Modal
	modalOverlay: "fixed inset-0 z-50 flex items-center justify-center",
	modalContainer: "w-full h-full flex flex-col p-6",
	modalHeader: "flex items-center justify-between mb-4",
	modalTitle: "text-white text-2xl font-bold",
	closeButton:
		"p-3 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 transition-colors focus:outline-none focus:ring-4 focus:ring-red-500",

	// Display
	display:
		"w-full px-6 py-4 rounded-lg bg-white text-gray-900 font-semibold text-center mb-4 border-2 border-blue-500",

	// Keyboard
	keyboardContainer: "flex-1 flex flex-col justify-center gap-2",
	keyboardRow: "flex justify-center gap-2",
	key: "rounded-lg font-bold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95 select-none",
	keyNormal: "bg-white text-gray-900 hover:bg-gray-100 active:bg-gray-200",
	keyAction: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
	keySpecial: "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800",

	// Botones de acción
	actionButtons: "flex gap-4 mt-4",
	buttonClear:
		"flex-1 py-3 rounded-lg bg-yellow-600 text-white font-bold hover:bg-yellow-700 active:bg-yellow-800 transition-colors",
	buttonConfirm:
		"flex-1 py-3 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 active:bg-green-800 transition-colors",
} as const;
