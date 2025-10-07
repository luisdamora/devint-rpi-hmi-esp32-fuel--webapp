/**
 * UI Store - Punto de entrada principal
 * Exporta el store y todas las utilidades necesarias
 */

// Constantes
export { initialState, MENU_COLORS } from "./ui-store/state";

// Tipos
export type {
	Notification,
	NotificationType,
	PersistedState,
	ResetActions,
	SessionActions,
	SessionState,
	TurnState,
	UIActions,
	UIState,
	UIStore,
	UIStoreState,
} from "./ui-store/types";
// Store principal
export { uiStoreSelectors, useUIStore } from "./ui-store/ui-store";
