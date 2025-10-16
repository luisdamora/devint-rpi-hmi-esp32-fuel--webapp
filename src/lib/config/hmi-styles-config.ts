/**
 * Configuración de estilos estandarizados para HMI
 * 
 * Este archivo centraliza todos los estilos, colores, dimensiones y
 * configuraciones visuales del sistema HMI para garantizar consistencia
 * en toda la aplicación.
 * 
 * Basado en optimizaciones ULTRA-COMPACTAS para pantallas táctiles
 */

// ============================================================================
// PALETA DE COLORES
// ============================================================================

export const HMI_COLORS = {
	// Backgrounds
	navy: {
		900: "#0A1628", // Fondo principal oscuro
		800: "#1A2744", // Fondo secundario
		700: "#2A3F64", // Fondo terciario
	},

	// Estados y feedbacks
	success: "#10B981", // Verde - Monto, éxito, confirmaciones
	info: "#3B82F6", // Azul - Estado actual, información
	warning: "#F59E0B", // Amarillo - Advertencias
	error: "#EF4444", // Rojo - Errores, alertas

	// Acentos
	primary: "#10B981", // Verde principal
	secondary: "#3B82F6", // Azul secundario
	accent: "#F59E0B", // Amarillo acento

	// Texto
	textPrimary: "#FFFFFF", // Blanco - Texto principal
	textSecondary: "#94A3B8", // Gris claro - Texto secundario
	textTertiary: "#64748B", // Gris medio - Texto terciario

	// Bordes y separadores
	border: {
		light: "#E2E8F0",
		medium: "#CBD5E1",
		dark: "#475569",
	},

	// Backgrounds adicionales
	bg: {
		white: "#FFFFFF",
		light: "#F8FAFC",
		medium: "#F1F5F9",
		dark: "#0F172A",
	},
} as const;

// ============================================================================
// DIMENSIONES HMI (Optimizadas para touch)
// ============================================================================

export const HMI_SIZES = {
	// Botones táctiles (siguiendo estándares Apple/Google)
	minTouchTarget: 44, // px - Mínimo absoluto
	recommendedTouchTarget: 48, // px - Recomendado
	largeTouchTarget: 56, // px - Para botones principales

	// Espaciado (reducido para pantallas pequeñas)
	spacing: {
		xs: 4, // 0.25rem
		sm: 8, // 0.5rem
		md: 12, // 0.75rem
		lg: 16, // 1rem
		xl: 24, // 1.5rem
	},

	// Fuentes (legibles en pantallas táctiles)
	fontSize: {
		xs: 12, // Muy pequeño
		sm: 14, // Pequeño (labels)
		base: 16, // Base (inputs, texto normal)
		lg: 18, // Grande
		xl: 20, // Títulos
		"2xl": 24, // Títulos grandes
		"3xl": 30, // Display
	},

	// Inputs y campos
	input: {
		height: 48, // Altura estándar
		padding: 12, // Padding interno
		borderWidth: 2, // Ancho de borde
	},

	// Íconos
	icon: {
		sm: 20,
		md: 24,
		lg: 32,
		xl: 48,
		"2xl": 64,
	},

	// Bordes redondeados
	borderRadius: {
		sm: 4,
		md: 8,
		lg: 12,
		xl: 16,
	},
} as const;

// ============================================================================
// CLASES TAILWIND ESTANDARIZADAS
// ============================================================================

/**
 * Clases para botones touch-optimizados
 */
export const HMI_BUTTON_CLASSES = {
	// Botón base (común a todos)
	base: `
		inline-flex items-center justify-center
		font-bold rounded-lg
		transition-all duration-150
		active:scale-95
		disabled:opacity-50 disabled:cursor-not-allowed
	`,

	// Tamaños
	sizes: {
		sm: "min-h-[44px] px-3 py-2 text-sm",
		md: "min-h-[48px] px-4 py-2 text-base",
		lg: "min-h-[56px] px-6 py-3 text-lg",
	},

	// Variantes de color
	variants: {
		primary: "bg-green-500 hover:bg-green-600 text-white shadow-lg",
		secondary: "bg-blue-500 hover:bg-blue-600 text-white shadow-lg",
		danger: "bg-red-500 hover:bg-red-600 text-white shadow-lg",
		warning: "bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg",
		ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
		outline:
			"bg-transparent border-2 border-gray-300 hover:border-gray-400 text-gray-700",
	},
} as const;

/**
 * Clases para inputs touch-optimizados
 */
export const HMI_INPUT_CLASSES = {
	base: `
		h-12 px-3 text-base
		rounded border-2
		bg-white text-gray-900
		transition-colors duration-150
		focus:outline-none focus:ring-2 focus:ring-offset-1
		disabled:bg-gray-100 disabled:cursor-not-allowed
	`,

	states: {
		default: "border-gray-300 focus:border-blue-500 focus:ring-blue-200",
		error: "border-red-500 focus:border-red-600 focus:ring-red-200",
		success: "border-green-500 focus:border-green-600 focus:ring-green-200",
	},
} as const;

/**
 * Clases para cards y contenedores
 */
export const HMI_CARD_CLASSES = {
	base: "rounded-lg shadow-sm",
	padding: {
		sm: "p-2",
		md: "p-3",
		lg: "p-4",
	},
	border: "border-2",
	states: {
		default: "bg-white border-gray-200",
		active: "bg-blue-50 border-blue-500",
		success: "bg-green-50 border-green-500",
		error: "bg-red-50 border-red-500",
	},
} as const;

/**
 * Clases para labels y texto
 */
export const HMI_TEXT_CLASSES = {
	label: "text-sm font-semibold text-gray-700 mb-1",
	title: "text-xl font-bold text-gray-800",
	subtitle: "text-lg font-semibold text-gray-700",
	body: "text-base text-gray-700",
	caption: "text-sm text-gray-600",
	error: "text-sm text-red-600 mt-1",
	success: "text-sm text-green-600 mt-1",
} as const;

// ============================================================================
// HELPERS PARA CONSTRUCCIÓN DE CLASES
// ============================================================================

/**
 * Construye clases de botón con tamaño y variante
 */
export const getButtonClasses = (
	size: keyof typeof HMI_BUTTON_CLASSES.sizes = "md",
	variant: keyof typeof HMI_BUTTON_CLASSES.variants = "primary",
): string => {
	return `${HMI_BUTTON_CLASSES.base} ${HMI_BUTTON_CLASSES.sizes[size]} ${HMI_BUTTON_CLASSES.variants[variant]}`;
};

/**
 * Construye clases de input con estado
 */
export const getInputClasses = (
	state: keyof typeof HMI_INPUT_CLASSES.states = "default",
): string => {
	return `${HMI_INPUT_CLASSES.base} ${HMI_INPUT_CLASSES.states[state]}`;
};

/**
 * Construye clases de card con padding y estado
 */
export const getCardClasses = (
	padding: keyof typeof HMI_CARD_CLASSES.padding = "md",
	state: keyof typeof HMI_CARD_CLASSES.states = "default",
): string => {
	return `${HMI_CARD_CLASSES.base} ${HMI_CARD_CLASSES.padding[padding]} ${HMI_CARD_CLASSES.border} ${HMI_CARD_CLASSES.states[state]}`;
};

// ============================================================================
// CONFIGURACIÓN DE ANIMACIONES
// ============================================================================

export const HMI_ANIMATIONS = {
	// Duración
	duration: {
		fast: 150,
		normal: 200,
		slow: 300,
	},

	// Easing
	easing: {
		default: "ease-in-out",
		in: "ease-in",
		out: "ease-out",
	},

	// Transiciones comunes
	transitions: {
		all: "transition-all duration-200 ease-in-out",
		opacity: "transition-opacity duration-200 ease-in-out",
		transform: "transition-transform duration-150 ease-in-out",
		colors: "transition-colors duration-150 ease-in-out",
	},
} as const;

// ============================================================================
// LAYOUT Y GRID
// ============================================================================

export const HMI_LAYOUT = {
	// Contenedor principal
	container: "w-full h-full flex items-center justify-center px-2",

	// Grid principal (sidebar + contenido)
	mainGrid: "grid grid-cols-4 gap-4 w-full max-w-6xl",

	// Columnas
	sidebar: "col-span-1 flex flex-col gap-6 self-start pt-8",
	content: "col-span-3 space-y-4 overflow-y-auto max-h-screen pb-8",

	// Grid de campos (2x2)
	fieldsGrid: "grid grid-cols-2 gap-4",

	// Espaciado común
	spacing: {
		section: "space-y-4",
		fields: "space-y-3",
		tight: "space-y-2",
	},
} as const;

// ============================================================================
// ESTADOS VISUALES
// ============================================================================

export const HMI_STATES = {
	loading: {
		spinner: "animate-spin h-10 w-10",
		overlay: "opacity-50 pointer-events-none",
	},

	disabled: {
		opacity: "opacity-50",
		cursor: "cursor-not-allowed",
	},

	hover: {
		scale: "hover:scale-105",
		brightness: "hover:brightness-110",
	},

	active: {
		scale: "active:scale-95",
		brightness: "active:brightness-90",
	},
} as const;

// ============================================================================
// EXPORT DEFAULT
// ============================================================================

export const HMI_STYLES = {
	colors: HMI_COLORS,
	sizes: HMI_SIZES,
	buttons: HMI_BUTTON_CLASSES,
	inputs: HMI_INPUT_CLASSES,
	cards: HMI_CARD_CLASSES,
	text: HMI_TEXT_CLASSES,
	animations: HMI_ANIMATIONS,
	layout: HMI_LAYOUT,
	states: HMI_STATES,
	helpers: {
		getButtonClasses,
		getInputClasses,
		getCardClasses,
	},
} as const;

export default HMI_STYLES;
