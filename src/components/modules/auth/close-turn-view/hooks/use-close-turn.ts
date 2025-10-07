import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";
import { useSession } from "@/lib/hooks/use-ui-store-helpers";

export const useCloseTurn = () => {
	const { goToMenu } = useHMINavigation();
	const { closeTurn } = useSession();

	const handleCloseTurn = () => {
		// Cerrar turno en el store global
		closeTurn("Cierre manual desde vista de cierre de turno");

		// Navegar al menú principal
		goToMenu();
	};

	return {
		handleCloseTurn,
	};
};
