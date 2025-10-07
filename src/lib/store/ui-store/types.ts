/**
 * UI Store Types
 * Definiciones de tipos e interfaces para el store global de UI
 */

// ============================================================================
// Notification Types
// ============================================================================

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
	message: string;
	type: NotificationType;
	id?: string;
}

// ============================================================================
// Session State
// ============================================================================

export interface SessionState {
	/** Usuario autenticado en el sistema */
	isAuthenticated: boolean;
	
	/** Turno activo/abierto */
	isTurnActive: boolean;
	
	/** Nombre del operador actual */
	operatorName: string | null;
	
	/** Hora de inicio del turno */
	turnStartTime: Date | null;
	
	/** ID de sesión único */
	sessionId: string | null;
}

// ============================================================================
// UI State
// ============================================================================

export interface UIState {
	/** Color de borde de tiles del menú principal */
	menuBorderColor: string;
	
	/** Habilitar/deshabilitar tiles del menú */
	menuTilesEnabled: boolean;
	
	/** Mostrar diálogo de cerrar turno */
	showCloseTurnDialog: boolean;
	
	/** Estado de carga global */
	isLoading: boolean;
	
	/** Notificación actual */
	notification: Notification | null;
}

// ============================================================================
// Turn State
// ============================================================================

export interface TurnState {
	/** Indica si el turno fue cerrado */
	turnClosed: boolean;
	
	/** Razón del cierre de turno */
	closeTurnReason: string | null;
	
	/** Última vez que se cerró turno */
	lastTurnCloseTime: Date | null;
}

// ============================================================================
// Complete Store State
// ============================================================================

export interface UIStoreState extends SessionState, UIState, TurnState {}

// ============================================================================
// Session Actions
// ============================================================================

export interface SessionActions {
	/** Iniciar sesión de operador */
	login: (operatorName: string) => void;
	
	/** Cerrar sesión */
	logout: () => void;
	
	/** Abrir turno de trabajo */
	startTurn: () => void;
	
	/** Cerrar turno de trabajo */
	closeTurn: (reason?: string) => void;
}

// ============================================================================
// UI Actions
// ============================================================================

export interface UIActions {
	/** Actualizar tema del menú basado en estado de turno */
	setMenuTheme: (turnActive: boolean) => void;
	
	/** Cambiar estado de carga global */
	setLoading: (loading: boolean) => void;
	
	/** Mostrar notificación */
	showNotification: (message: string, type: NotificationType) => void;
	
	/** Limpiar notificación actual */
	clearNotification: () => void;
	
	/** Toggle diálogo de cerrar turno */
	toggleCloseTurnDialog: (show: boolean) => void;
}

// ============================================================================
// Reset Actions
// ============================================================================

export interface ResetActions {
	/** Resetear solo datos de sesión */
	resetSession: () => void;
	
	/** Resetear todo el estado del store */
	resetAll: () => void;
}

// ============================================================================
// Complete Store (State + Actions)
// ============================================================================

export interface UIStore extends UIStoreState, SessionActions, UIActions, ResetActions {}

// ============================================================================
// Persisted State (datos que se guardan en sessionStorage)
// ============================================================================

export interface PersistedState {
	isAuthenticated: boolean;
	isTurnActive: boolean;
	operatorName: string | null;
	sessionId: string | null;
	turnStartTime: Date | null;
}
