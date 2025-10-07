/**
 * UI Store - Punto de entrada principal
 * Exporta el store y todas las utilidades necesarias
 */

// Store principal
export { useUIStore, uiStoreSelectors } from './ui-store/ui-store';

// Tipos
export type {
	UIStore,
	UIStoreState,
	SessionState,
	UIState,
	TurnState,
	SessionActions,
	UIActions,
	ResetActions,
	Notification,
	NotificationType,
	PersistedState,
} from './ui-store/types';

// Constantes
export { MENU_COLORS, initialState } from './ui-store/state';
