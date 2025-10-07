/**
 * UI Store Helpers
 * Hooks y utilidades para trabajar con el UI Store
 */

import { useCallback } from "react";
import type { NotificationType } from "@/lib/store/ui-store/types";
import { uiStoreSelectors, useUIStore } from "@/lib/store/ui-store/ui-store";

// ============================================================================
// Re-export del store principal
// ============================================================================

export { useUIStore, uiStoreSelectors };

// ============================================================================
// Custom Hooks
// ============================================================================

/**
 * Hook para gestión de sesión
 * Retorna solo las funciones y estado relacionados con autenticación y turnos
 */
export const useSession = () => {
	const isAuthenticated = useUIStore(uiStoreSelectors.isAuthenticated);
	const isTurnActive = useUIStore(uiStoreSelectors.isTurnActive);
	const operatorName = useUIStore(uiStoreSelectors.operatorName);
	const login = useUIStore((state) => state.login);
	const logout = useUIStore((state) => state.logout);
	const startTurn = useUIStore((state) => state.startTurn);
	const closeTurn = useUIStore((state) => state.closeTurn);

	return {
		isAuthenticated,
		isTurnActive,
		operatorName,
		login,
		logout,
		startTurn,
		closeTurn,
	};
};

/**
 * Hook para el tema del menú principal
 * Retorna solo el estado visual del menú
 */
export const useMenuTheme = () => {
	const borderColor = useUIStore(uiStoreSelectors.menuBorderColor);
	const tilesEnabled = useUIStore(uiStoreSelectors.menuTilesEnabled);
	const isTurnActive = useUIStore(uiStoreSelectors.isTurnActive);

	return {
		borderColor,
		tilesEnabled,
		isTurnActive,
	};
};

/**
 * Hook para notificaciones
 * Retorna funciones para gestionar notificaciones
 */
export const useNotifications = () => {
	const notification = useUIStore(uiStoreSelectors.notification);
	const showNotification = useUIStore((state) => state.showNotification);
	const clearNotification = useUIStore((state) => state.clearNotification);

	const notify = useCallback(
		(message: string, type: NotificationType = "info") => {
			showNotification(message, type);
		},
		[showNotification],
	);

	const success = useCallback(
		(message: string) => notify(message, "success"),
		[notify],
	);

	const error = useCallback(
		(message: string) => notify(message, "error"),
		[notify],
	);

	const info = useCallback(
		(message: string) => notify(message, "info"),
		[notify],
	);

	const warning = useCallback(
		(message: string) => notify(message, "warning"),
		[notify],
	);

	return {
		notification,
		notify,
		success,
		error,
		info,
		warning,
		clear: clearNotification,
	};
};

/**
 * Hook para estado de carga
 */
export const useLoadingState = () => {
	const isLoading = useUIStore(uiStoreSelectors.isLoading);
	const setLoading = useUIStore((state) => state.setLoading);

	return {
		isLoading,
		setLoading,
	};
};

/**
 * Hook para obtener toda la información de sesión
 * Suscribe a valores individuales para evitar re-renders innecesarios
 */
export const useSessionInfo = () => {
	const isAuthenticated = useUIStore(uiStoreSelectors.isAuthenticated);
	const isTurnActive = useUIStore(uiStoreSelectors.isTurnActive);
	const operatorName = useUIStore(uiStoreSelectors.operatorName);

	return {
		isAuthenticated,
		isTurnActive,
		operatorName,
	};
};
