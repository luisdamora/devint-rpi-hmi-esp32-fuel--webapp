/**
 * UI Store
 * Store principal con middlewares de persistencia y devtools
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { UIStore, PersistedState } from './types';
import { createUIStoreSlice } from './store-creator';

// ============================================================================
// Store Configuration
// ============================================================================

const STORE_NAME = 'nexus-pos-ui-store';
const STORE_VERSION = 1;

// ============================================================================
// Persist Partialize Function
// ============================================================================

/**
 * Selecciona qué partes del estado se persisten en sessionStorage
 * Solo persistimos datos críticos de sesión
 */
const partialize = (state: UIStore): PersistedState => ({
	isAuthenticated: state.isAuthenticated,
	isTurnActive: state.isTurnActive,
	operatorName: state.operatorName,
	sessionId: state.sessionId,
	turnStartTime: state.turnStartTime,
});

// ============================================================================
// Store Creation
// ============================================================================

/**
 * UI Store Global
 * 
 * Gestiona el estado global de la UI incluyendo:
 * - Autenticación y sesión de usuario
 * - Estado de turnos
 * - Configuración visual del menú
 * - Notificaciones y diálogos
 * 
 * @example
 * ```tsx
 * // En un componente
 * import { useUIStore } from '@/lib/hooks/use-ui-store';
 * 
 * function MyComponent() {
 *   const { isTurnActive, login, startTurn } = useUIStore();
 *   
 *   return (
 *     <button onClick={() => login('Operador 1')}>
 *       {isTurnActive ? 'Turno Activo' : 'Iniciar Turno'}
 *     </button>
 *   );
 * }
 * ```
 */
export const useUIStore = create<UIStore>()(
	devtools(
		persist(
			createUIStoreSlice,
			{
				name: STORE_NAME,
				version: STORE_VERSION,
				storage: {
					getItem: (name) => {
						const str = sessionStorage.getItem(name);
						if (!str) return null;
						
						try {
							const { state } = JSON.parse(str);
							// Reconstruir objetos Date
							if (state.turnStartTime) {
								state.turnStartTime = new Date(state.turnStartTime);
							}
							return { state };
						} catch (error) {
							console.error('Error parsing persisted state:', error);
							return null;
						}
					},
					setItem: (name, value) => {
						sessionStorage.setItem(name, JSON.stringify(value));
					},
					removeItem: (name) => {
						sessionStorage.removeItem(name);
					},
				},
				partialize,
				// Restaurar tema del menú después de hidratar el estado
				onRehydrateStorage: () => (state) => {
					if (state) {
						// Sincronizar tema del menú con el estado de turno
						state.setMenuTheme(state.isTurnActive);
					}
				},
			},
		),
		{
			name: STORE_NAME,
			enabled: process.env.NODE_ENV === 'development',
		},
	),
);

// ============================================================================
// Selectors (opcional - para optimización)
// ============================================================================

/**
 * Selectores memoizados para optimizar re-renders
 */
export const uiStoreSelectors = {
	// Session selectors
	isAuthenticated: (state: UIStore) => state.isAuthenticated,
	isTurnActive: (state: UIStore) => state.isTurnActive,
	operatorName: (state: UIStore) => state.operatorName,
	sessionId: (state: UIStore) => state.sessionId,
	
	// UI selectors
	menuBorderColor: (state: UIStore) => state.menuBorderColor,
	menuTilesEnabled: (state: UIStore) => state.menuTilesEnabled,
	notification: (state: UIStore) => state.notification,
	isLoading: (state: UIStore) => state.isLoading,
	
	// Turn selectors
	turnClosed: (state: UIStore) => state.turnClosed,
	lastTurnCloseTime: (state: UIStore) => state.lastTurnCloseTime,
	
	// Combined selectors
	sessionInfo: (state: UIStore) => ({
		isAuthenticated: state.isAuthenticated,
		isTurnActive: state.isTurnActive,
		operatorName: state.operatorName,
	}),
	
	menuTheme: (state: UIStore) => ({
		borderColor: state.menuBorderColor,
		tilesEnabled: state.menuTilesEnabled,
	}),
};
