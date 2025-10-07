/**
 * Nexus POS Theme Configuration
 * Colores y estilos del sistema HMI
 */

export const NEXUS_COLORS = {
	primary: {
		blue: "#2196F3",
		blueDark: "#1976D2",
	},
	background: {
		main: "#3B4B5C", // Color de fondo principal del HMI (azul grisáceo oscuro)
		dark: "#2C3E50", // Variante más oscura
		light: "#4F5F7F", // Variante intermedia entre main y dark (azul grisáceo claro)
	},
	status: {
		red: "#EF4444",
		green: "#22C55E",
		orange: "#F97316",
		yellow: "#FCD34D",
	},
	neutral: {
		gray50: "#F9FAFB",
		gray100: "#F3F4F6",
		gray200: "#E5E7EB",
		gray300: "#D1D5DB",
		gray400: "#9CA3AF",
		gray500: "#6B7280",
		gray600: "#4B5563",
		gray700: "#374151",
		gray800: "#1F2937",
		gray900: "#111827",
	},
	white: "#FFFFFF",
	black: "#000000",
} as const;

export const NEXUS_TYPOGRAPHY = {
	fontFamily: {
		sans: "Inter, system-ui, sans-serif",
		mono: "ui-monospace, monospace",
	},
	fontSize: {
		xs: "0.75rem",
		sm: "0.875rem",
		base: "1rem",
		lg: "1.125rem",
		xl: "1.25rem",
		"2xl": "1.5rem",
		"3xl": "1.875rem",
	},
} as const;

/**
 * Reutilizable button styles with Tailwind classes - Granular approach
 */

// Base text colors
export const BUTTON_TEXT_STYLES = {
	white: "text-white",
	gray: "text-gray-700",
	primary: "text-blue-600",
	success: "text-green-600",
	danger: "text-red-600",
	warning: "text-yellow-600",
} as const;

// Base background colors
export const BUTTON_BG_STYLES = {
	gray: {
		base: "bg-gray-600",
		hover: "hover:bg-gray-700",
		active: "active:bg-gray-800",
	},
	light: {
		base: "bg-gray-200",
		hover: "hover:bg-gray-300",
		active: "active:bg-gray-400",
	},
	success: {
		base: "bg-green-600",
		hover: "hover:bg-green-700",
		active: "active:bg-green-800",
	},
	danger: {
		base: "bg-red-600",
		hover: "hover:bg-red-700",
		active: "active:bg-red-800",
	},
	warning: {
		base: "bg-yellow-600",
		hover: "hover:bg-yellow-700",
		active: "active:bg-yellow-800",
	},
	primary: {
		base: "bg-blue-600",
		hover: "hover:bg-blue-700",
		active: "active:bg-blue-800",
	},
} as const;

// Click effect styles
export const BUTTON_CLICK_EFFECTS = {
	scale: "active:scale-95",
	transition: "transition-all duration-150 ease-in-out",
	shadow: "shadow-md hover:shadow-lg",
	focus: "focus:outline-none focus:ring-2 focus:ring-opacity-50",
} as const;

// Focus ring colors (must match bg colors)
export const BUTTON_FOCUS_STYLES = {
	gray: "focus:ring-gray-500",
	light: "focus:ring-gray-400",
	success: "focus:ring-green-500",
	danger: "focus:ring-red-500",
	warning: "focus:ring-yellow-500",
	primary: "focus:ring-blue-500",
} as const;

// Predefined button combinations using granular styles
export const BUTTON_STYLES = {
	// Primary action button with click effects
	primary: `${BUTTON_TEXT_STYLES.white} text-center font-semibold py-3 px-4 rounded-lg ${BUTTON_BG_STYLES.gray.base} ${BUTTON_BG_STYLES.gray.hover} ${BUTTON_BG_STYLES.gray.active} ${BUTTON_CLICK_EFFECTS.scale} ${BUTTON_CLICK_EFFECTS.transition} ${BUTTON_CLICK_EFFECTS.shadow} ${BUTTON_CLICK_EFFECTS.focus} ${BUTTON_FOCUS_STYLES.gray}`,

	// Secondary button variant
	secondary: `${BUTTON_TEXT_STYLES.gray} text-center font-semibold py-2 px-3 rounded-md ${BUTTON_BG_STYLES.light.base} ${BUTTON_BG_STYLES.light.hover} ${BUTTON_BG_STYLES.light.active} ${BUTTON_CLICK_EFFECTS.scale} ${BUTTON_CLICK_EFFECTS.transition} shadow-sm hover:shadow-md ${BUTTON_CLICK_EFFECTS.focus} ${BUTTON_FOCUS_STYLES.light}`,

	// Success button variant
	success: `${BUTTON_TEXT_STYLES.white} text-center font-semibold py-3 px-4 rounded-lg ${BUTTON_BG_STYLES.success.base} ${BUTTON_BG_STYLES.success.hover} ${BUTTON_BG_STYLES.success.active} ${BUTTON_CLICK_EFFECTS.scale} ${BUTTON_CLICK_EFFECTS.transition} ${BUTTON_CLICK_EFFECTS.shadow} ${BUTTON_CLICK_EFFECTS.focus} ${BUTTON_FOCUS_STYLES.success}`,

	// Danger button variant
	danger: `${BUTTON_TEXT_STYLES.white} text-center font-semibold py-3 px-4 rounded-lg ${BUTTON_BG_STYLES.danger.base} ${BUTTON_BG_STYLES.danger.hover} ${BUTTON_BG_STYLES.danger.active} ${BUTTON_CLICK_EFFECTS.scale} ${BUTTON_CLICK_EFFECTS.transition} ${BUTTON_CLICK_EFFECTS.shadow} ${BUTTON_CLICK_EFFECTS.focus} ${BUTTON_FOCUS_STYLES.danger}`,

	// Small button variant
	small: `${BUTTON_TEXT_STYLES.white} text-center font-medium py-2 px-3 rounded-md ${BUTTON_BG_STYLES.gray.base} ${BUTTON_BG_STYLES.gray.hover} ${BUTTON_BG_STYLES.gray.active} ${BUTTON_CLICK_EFFECTS.scale} ${BUTTON_CLICK_EFFECTS.transition} shadow-sm hover:shadow-md ${BUTTON_CLICK_EFFECTS.focus} ${BUTTON_FOCUS_STYLES.gray}`,

	// Large button variant
	large: `${BUTTON_TEXT_STYLES.white} text-center font-semibold py-4 px-6 rounded-lg ${BUTTON_BG_STYLES.gray.base} ${BUTTON_BG_STYLES.gray.hover} ${BUTTON_BG_STYLES.gray.active} ${BUTTON_CLICK_EFFECTS.scale} ${BUTTON_CLICK_EFFECTS.transition} shadow-lg hover:shadow-xl ${BUTTON_CLICK_EFFECTS.focus} ${BUTTON_FOCUS_STYLES.gray}`,
} as const;

/**
 * Helper function to create custom button styles
 * @param textColor - Text color style
 * @param bgStyle - Background color style key
 * @param size - Size preset (sm, md, lg)
 * @param shape - Shape preset (rounded, square, pill)
 * @returns Combined class string
 */
export const createCustomButton = (
	textColor: keyof typeof BUTTON_TEXT_STYLES = 'white',
	bgStyle: keyof typeof BUTTON_BG_STYLES = 'gray',
	size: 'small' | 'medium' | 'large' = 'medium',
	shape: 'rounded' | 'square' | 'pill' = 'rounded'
): string => {
	const text = BUTTON_TEXT_STYLES[textColor];
	const bg = BUTTON_BG_STYLES[bgStyle];
	const focusRing = BUTTON_FOCUS_STYLES[bgStyle];

	const sizeStyles = {
		small: "py-2 px-3 text-sm",
		medium: "py-3 px-4 text-base",
		large: "py-4 px-6 text-lg",
	};

	const shapeStyles = {
		rounded: "rounded-lg",
		square: "rounded-none",
		pill: "rounded-full",
	};

	return `${text} text-center font-semibold ${sizeStyles[size]} ${shapeStyles[shape]} ${bg.base} ${bg.hover} ${bg.active} ${BUTTON_CLICK_EFFECTS.scale} ${BUTTON_CLICK_EFFECTS.transition} ${BUTTON_CLICK_EFFECTS.shadow} ${BUTTON_CLICK_EFFECTS.focus} ${focusRing}`;
};

/**
 * Additional predefined button combinations
 */
export const BUTTON_VARIANTS = {
	// Warning button
	warning: `${BUTTON_TEXT_STYLES.white} text-center font-semibold py-3 px-4 rounded-lg ${BUTTON_BG_STYLES.warning.base} ${BUTTON_BG_STYLES.warning.hover} ${BUTTON_BG_STYLES.warning.active} ${BUTTON_CLICK_EFFECTS.scale} ${BUTTON_CLICK_EFFECTS.transition} ${BUTTON_CLICK_EFFECTS.shadow} ${BUTTON_CLICK_EFFECTS.focus} ${BUTTON_FOCUS_STYLES.warning}`,

	// Primary blue button
	primaryBlue: `${BUTTON_TEXT_STYLES.white} text-center font-semibold py-3 px-4 rounded-lg ${BUTTON_BG_STYLES.primary.base} ${BUTTON_BG_STYLES.primary.hover} ${BUTTON_BG_STYLES.primary.active} ${BUTTON_CLICK_EFFECTS.scale} ${BUTTON_CLICK_EFFECTS.transition} ${BUTTON_CLICK_EFFECTS.shadow} ${BUTTON_CLICK_EFFECTS.focus} ${BUTTON_FOCUS_STYLES.primary}`,

	// Outline button (solo borde, fondo transparente)
	outline: "text-center font-semibold py-2 px-4 rounded-lg border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white active:scale-95 transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50",

	// Ghost button (sin fondo, solo texto con hover)
	ghost: "text-center font-semibold py-2 px-4 rounded-lg text-gray-600 hover:bg-gray-100 active:bg-gray-200 active:scale-95 transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50",

	// Disabled button style
	disabled: "text-center font-semibold py-3 px-4 rounded-lg bg-gray-300 text-gray-500 cursor-not-allowed opacity-50",
} as const;

/**
 * Usage Examples:
 *
 * // 1. Usar estilos predefinidos
 * <button className={BUTTON_STYLES.primary}>Guardar</button>
 * <button className={BUTTON_STYLES.success}>Aceptar</button>
 * <button className={BUTTON_VARIANTS.warning}>Advertencia</button>
 *
 * // 2. Crear estilos personalizados con la función helper
 * const customButton = createCustomButton('white', 'success', 'large', 'pill');
 * <button className={customButton}>Botón personalizado</button>
 *
 * // 3. Combinar estilos manualmente para máxima flexibilidad
 * const myButton = `${BUTTON_TEXT_STYLES.white} ${BUTTON_BG_STYLES.danger.base} ${BUTTON_BG_STYLES.danger.hover} ${BUTTON_CLICK_EFFECTS.scale} ...`;
 *
 * // 4. Modificar estilos existentes
 * <button className={`${BUTTON_STYLES.primary} w-full`}>Botón de ancho completo</button>
 */

/**
 * Theme configurations for Tailwind CSS
 */
export const NEXUS_THEME_CONFIG = {
	background: NEXUS_COLORS.background.main,
	surface: NEXUS_COLORS.background.dark,
	text: NEXUS_COLORS.white,
	textSecondary: "#E5E7EB",
	border: NEXUS_COLORS.neutral.gray700,
	primary: NEXUS_COLORS.primary.blue,
	primaryHover: NEXUS_COLORS.primary.blueDark,
	success: NEXUS_COLORS.status.green,
	error: NEXUS_COLORS.status.red,
	warning: NEXUS_COLORS.status.orange,
};
