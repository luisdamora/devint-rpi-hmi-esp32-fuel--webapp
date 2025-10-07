/**
 * UI Store Actions
 * Definiciones de acciones del store
 */

import type { StateCreator } from 'zustand';
import type {
	UIStore,
	SessionActions,
	UIActions,
	ResetActions,
	NotificationType,
} from './types';
import { initialState, MENU_COLORS } from './state';

// ============================================================================
// Helper: Generate Session ID
// ============================================================================

const generateSessionId = (): string => {
	return `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

// ============================================================================
// Session Actions Implementation
// ============================================================================

export const createSessionActions = (
	set: Parameters<StateCreator<UIStore>>[0],
	get: Parameters<StateCreator<UIStore>>[1],
): SessionActions => ({
	login: (operatorName: string) => {
		const sessionId = generateSessionId();
		set({
			isAuthenticated: true,
			operatorName,
			sessionId,
		});
		
		// Auto-iniciar turno al hacer login
		get().startTurn();
	},

	logout: () => {
		// Cerrar turno si está activo
		if (get().isTurnActive) {
			get().closeTurn('Cierre por logout');
		}
		
		set({
			isAuthenticated: false,
			operatorName: null,
			sessionId: null,
			isTurnActive: false,
		});
		
		// Actualizar tema del menú
		get().setMenuTheme(false);
	},

	startTurn: () => {
		set({
			isTurnActive: true,
			turnStartTime: new Date(),
			turnClosed: false,
			closeTurnReason: null,
		});
		
		// Actualizar tema del menú a activo
		get().setMenuTheme(true);
	},

	closeTurn: (reason?: string) => {
		set({
			isTurnActive: false,
			turnClosed: true,
			closeTurnReason: reason ?? 'Cierre manual',
			lastTurnCloseTime: new Date(),
		});
		
		// Actualizar tema del menú a inactivo
		get().setMenuTheme(false);
		
		// Mostrar notificación de confirmación
		get().showNotification('Turno cerrado correctamente', 'success');
	},
});

// ============================================================================
// UI Actions Implementation
// ============================================================================

export const createUIActions = (
	set: Parameters<StateCreator<UIStore>>[0],
): UIActions => ({
	setMenuTheme: (turnActive: boolean) => {
		set({
			menuBorderColor: turnActive ? MENU_COLORS.ACTIVE : MENU_COLORS.INACTIVE,
			menuTilesEnabled: turnActive,
		});
	},

	setLoading: (loading: boolean) => {
		set({ isLoading: loading });
	},

	showNotification: (message: string, type: NotificationType) => {
		set({
			notification: {
				message,
				type,
				id: `notif-${Date.now()}`,
			},
		});
	},

	clearNotification: () => {
		set({ notification: null });
	},

	toggleCloseTurnDialog: (show: boolean) => {
		set({ showCloseTurnDialog: show });
	},
});

// ============================================================================
// Reset Actions Implementation
// ============================================================================

export const createResetActions = (
	set: Parameters<StateCreator<UIStore>>[0],
): ResetActions => ({
	resetSession: () => {
		set({
			isAuthenticated: false,
			isTurnActive: false,
			operatorName: null,
			sessionId: null,
			turnStartTime: null,
			turnClosed: false,
			closeTurnReason: null,
		});
	},

	resetAll: () => {
		set(initialState);
	},
});
