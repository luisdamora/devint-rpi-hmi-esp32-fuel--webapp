/**
 * UI Store Provider
 * 
 * Provider opcional para el UI Store de Zustand.
 * Aunque Zustand no requiere un provider (funciona globalmente),
 * este componente provee:
 * - Inicialización controlada del store
 * - Sincronización con el ciclo de vida de React
 * - Debug helpers en desarrollo
 * - Hook de hidratación post-mount
 */

import React, { useEffect, useRef } from "react";
import { useUIStore } from "@/lib/store/ui-store";

// ============================================================================
// Types
// ============================================================================

interface UIStoreProviderProps {
	children: React.ReactNode;
	/** Habilitar logs de debug en desarrollo */
	enableDebug?: boolean;
	/** Callback después de hidratar el estado desde storage */
	onHydrated?: () => void;
}

// ============================================================================
// Provider Component
// ============================================================================

/**
 * Provider del UI Store
 * 
 * Envuelve la aplicación y gestiona la inicialización del store.
 * 
 * @example
 * ```tsx
 * import { UIStoreProvider } from '@/lib/providers/ui-store-provider';
 * 
 * function App() {
 *   return (
 *     <UIStoreProvider enableDebug={true}>
 *       <YourApp />
 *     </UIStoreProvider>
 *   );
 * }
 * ```
 */
export const UIStoreProvider: React.FC<UIStoreProviderProps> = ({
	children,
	enableDebug = process.env.NODE_ENV === "development",
	onHydrated,
}) => {
	const isHydrated = useRef(false);
	const isMounted = useRef(false);

	useEffect(() => {
		isMounted.current = true;

		// Log inicial en desarrollo
		if (enableDebug) {
			console.log(
				"%c[UI Store Provider] Mounted",
				"color: #22C55E; font-weight: bold",
			);
			console.log("Initial state:", useUIStore.getState());
		}

		// Callback de hidratación (se ejecuta después del primer render)
		if (!isHydrated.current) {
			isHydrated.current = true;

			// Esperar un tick para asegurar que persist haya hidratado
			setTimeout(() => {
				const state = useUIStore.getState();

				if (enableDebug) {
					console.log(
						"%c[UI Store Provider] State hydrated from sessionStorage",
						"color: #3B82F6; font-weight: bold",
					);
					console.log("Hydrated state:", {
						isAuthenticated: state.isAuthenticated,
						isTurnActive: state.isTurnActive,
						operatorName: state.operatorName,
						sessionId: state.sessionId,
					});
				}

				// Ejecutar callback si existe
				if (onHydrated) {
					onHydrated();
				}
			}, 0);
		}

		return () => {
			isMounted.current = false;
			if (enableDebug) {
				console.log(
					"%c[UI Store Provider] Unmounted",
					"color: #EF4444; font-weight: bold",
				);
			}
		};
	}, [enableDebug, onHydrated]);

	// Suscripción a cambios en desarrollo para debugging
	useEffect(() => {
		if (!enableDebug) return;

		const unsubscribe = useUIStore.subscribe((state, prevState) => {
			// Log solo cambios significativos
			if (state.isTurnActive !== prevState.isTurnActive) {
				console.log(
					`%c[UI Store] Turn state changed: ${prevState.isTurnActive} -> ${state.isTurnActive}`,
					"color: #F59E0B; font-weight: bold",
				);
			}

			if (state.isAuthenticated !== prevState.isAuthenticated) {
				console.log(
					`%c[UI Store] Auth state changed: ${prevState.isAuthenticated} -> ${state.isAuthenticated}`,
					"color: #F59E0B; font-weight: bold",
				);
			}

			if (state.menuBorderColor !== prevState.menuBorderColor) {
				console.log(
					`%c[UI Store] Menu color changed: ${prevState.menuBorderColor} -> ${state.menuBorderColor}`,
					"color: #F59E0B; font-weight: bold",
				);
			}
		});

		return unsubscribe;
	}, [enableDebug]);

	return <>{children}</>;
};

// ============================================================================
// Hook para verificar hidratación
// ============================================================================

/**
 * Hook para verificar si el store está hidratado
 * Útil para mostrar loaders o placeholders mientras se carga el estado
 * 
 * @returns true si el estado ya fue hidratado desde storage
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const isHydrated = useStoreHydration();
 *   
 *   if (!isHydrated) {
 *     return <LoadingSpinner />;
 *   }
 *   
 *   return <YourContent />;
 * }
 * ```
 */
export const useStoreHydration = () => {
	const [isHydrated, setIsHydrated] = React.useState(false);

	useEffect(() => {
		// En el siguiente tick, el store ya está hidratado
		const timeout = setTimeout(() => {
			setIsHydrated(true);
		}, 0);

		return () => clearTimeout(timeout);
	}, []);

	return isHydrated;
};

// ============================================================================
// Hook de debug (solo desarrollo)
// ============================================================================

/**
 * Hook para debug del store en desarrollo
 * Expone helpers para inspeccionar y manipular el estado
 * 
 * @example
 * ```tsx
 * function DebugPanel() {
 *   const debug = useStoreDebug();
 *   
 *   return (
 *     <div>
 *       <button onClick={debug.logState}>Log State</button>
 *       <button onClick={debug.clearStorage}>Clear Storage</button>
 *     </div>
 *   );
 * }
 * ```
 */
export const useStoreDebug = () => {
	const isDev = process.env.NODE_ENV === "development";

	return {
		/** Loguear estado actual en consola */
		logState: () => {
			if (!isDev) return;
			console.log("Current UI Store State:", useUIStore.getState());
		},

		/** Limpiar sessionStorage del store */
		clearStorage: () => {
			if (!isDev) return;
			sessionStorage.removeItem("nexus-pos-ui-store");
			console.log("sessionStorage cleared");
		},

		/** Resetear store completamente */
		resetStore: () => {
			if (!isDev) return;
			useUIStore.getState().resetAll();
			console.log("Store reset to initial state");
		},

		/** Obtener snapshot del estado */
		getSnapshot: () => {
			if (!isDev) return null;
			return JSON.parse(JSON.stringify(useUIStore.getState()));
		},

		/** Restaurar un snapshot */
		restoreSnapshot: (snapshot: Record<string, unknown>) => {
			if (!isDev) return;
			// Nota: Esto es para debug, no para producción
			Object.assign(useUIStore.getState(), snapshot);
			console.log("Snapshot restored:", snapshot);
		},
	};
};
