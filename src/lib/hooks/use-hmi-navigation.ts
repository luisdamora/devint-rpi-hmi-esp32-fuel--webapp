import { useNavigate } from "react-router";

/**
 * Hook personalizado para navegación en el sistema HMI
 * Proporciona funciones de navegación consistentes usando React Router
 */
export function useHMINavigation() {
	const navigate = useNavigate();

	return {
		/**
		 * Navega a una vista específica del HMI
		 * @param viewId - ID de la vista (splash, menu, login, etc.)
		 */
		navigateTo: (viewId: string) => {
			navigate(`/${viewId}`);
		},

		/**
		 * Navega hacia atrás en el historial
		 */
		navigateBack: () => {
			navigate(-1);
		},

		/**
		 * Navega a la pantalla de splash (inicio)
		 */
		goToSplash: () => {
			navigate("/splash");
		},

		/**
		 * Navega al menú principal
		 */
		goToMenu: () => {
			navigate("/menu");
		},

		/**
		 * Navega al login
		 */
		goToLogin: () => {
			navigate("/login");
		},

		/**
		 * Navega al keypad
		 */
		goToKeypad: () => {
			navigate("/keypad");
		},

		/**
		 * Navega a métodos de pago
		 */
		goToPayment: () => {
			navigate("/payment");
		},

		/**
		 * Navega a loyalty
		 */
		goToLoyalty: () => {
			navigate("/loyalty");
		},

		/**
		 * Navega a cerrar turno
		 */
		goToCloseTurn: () => {
			navigate("/close-turn");
		},

		/**
		 * Navega a utilidades
		 */
		goToUtilities: () => {
			navigate("/utilities");
		},

		/**
		 * Navega a una ruta arbitraria
		 */
		navigateToPath: (path: string) => {
			navigate(path);
		},
	};
}
