/**
 * UI Store Initial State
 * Estado inicial del store global de UI
 */

import type { UIStoreState } from './types';

// ============================================================================
// Color Constants
// ============================================================================

export const MENU_COLORS = {
	INACTIVE: '#EF4444', // Rojo - Turno inactivo
	ACTIVE: '#22C55E',   // Verde - Turno activo
} as const;

// ============================================================================
// Initial State
// ============================================================================

export const initialState: UIStoreState = {
	// Session State
	isAuthenticated: false,
	isTurnActive: false,
	operatorName: null,
	turnStartTime: null,
	sessionId: null,

	// UI State
	menuBorderColor: MENU_COLORS.INACTIVE,
	menuTilesEnabled: false,
	showCloseTurnDialog: false,
	isLoading: false,
	notification: null,

	// Turn State
	turnClosed: false,
	closeTurnReason: null,
	lastTurnCloseTime: null,
};
