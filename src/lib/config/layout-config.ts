import type {
	ModuleConfig,
	NavigationItem,
} from "@/lib/types/modules";


/**
 * Module configurations
 */
export const MODULE_CONFIGS: ModuleConfig[] = [
	{
		id: "auth",
		name: "Autenticación",
		description: "Gestión de turnos y accesos",
		order: 1,
		enabled: true,
	},
	{
		id: "sales",
		name: "Ventas",
		description: "Proceso de ventas y pagos",
		order: 2,
		enabled: true,
	},
	{
		id: "loyalty",
		name: "Fidelización",
		description: "Sistema de puntos y beneficios",
		order: 3,
		enabled: true,
	},
	{
		id: "splash",
		name: "Inicio",
		description: "Pantalla de bienvenida",
		order: 0,
		enabled: true,
	},
	{
		id: "menu",
		name: "Menú",
		description: "Navegación principal",
		order: 1,
		enabled: true,
	},
];

/**
 * Navigation items configuration
 */
export const NAVIGATION_ITEMS: NavigationItem[] = [
	{
		id: "nav-login",
		label: "Iniciar Turno",
		icon: "🔑",
		targetView: "login",
		moduleId: "auth",
		order: 1,
		enabled: true,
	},
	{
		id: "nav-sales",
		label: "Ventas",
		icon: "💰",
		targetView: "keypad",
		moduleId: "sales",
		order: 2,
		enabled: true,
	},
	{
		id: "nav-payments",
		label: "Pagos",
		icon: "💳",
		targetView: "payment-methods",
		moduleId: "sales",
		order: 3,
		enabled: true,
	},
	{
		id: "nav-loyalty",
		label: "Puntos Colombia",
		icon: "⭐",
		targetView: "loyalty",
		moduleId: "loyalty",
		order: 4,
		enabled: true,
	},
	{
		id: "nav-close-turn",
		label: "Cerrar Turno",
		icon: "🔒",
		targetView: "close-turn",
		moduleId: "auth",
		order: 5,
		enabled: true,
	},
];


/**
 * Screen size configurations
 */
export const SCREEN_CONFIGS = {
	mobile: "max-width: 768px",
	tablet: "min-width: 769px and max-width: 1024px",
	desktop: "min-width: 1025px",
};

/**
 * Animation configurations
 */
export const ANIMATION_CONFIGS = {
	durations: {
		fast: "150ms",
		normal: "300ms",
		slow: "500ms",
	},
	easings: {
		easeIn: "ease-in",
		easeOut: "ease-out",
		easeInOut: "ease-in-out",
	},
};

/**
 * Get module configuration by ID
 */
export function getModuleConfig(id: string): ModuleConfig | undefined {
	return MODULE_CONFIGS.find((config) => config.id === id);
}

/**
 * Get navigation items for a specific module
 */
export function getNavigationItems(moduleId?: string): NavigationItem[] {
	const items = moduleId
		? NAVIGATION_ITEMS.filter((item) => item.moduleId === moduleId)
		: NAVIGATION_ITEMS;

	return items.filter((item) => item.enabled).sort((a, b) => a.order - b.order);
}

