import { BanknoteArrowDown, CreditCard, Settings, Star } from "lucide-react";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";
import type { MenuTilesData } from "./types";

/**
 * Hook personalizado para obtener la función de navegación
 * Esto permite separar la lógica de navegación de los datos de configuración
 */
const useMenuNavigation = () => {
	const { navigateTo } = useHMINavigation();

	return {
		navigateTo,
	};
};

/**
 * Datos de configuración de los tiles del menú principal
 * Cada tile representa una acción disponible en el menú
 */
export const useMenuTilesData = (): MenuTilesData => {
	const { navigateTo } = useMenuNavigation();

	return [
		// {
		// 	key: "turnos",
		// 	title: "TURNOS",
		// 	icon: <Calendar size={64} />,
		// 	action: () => navigateTo("close-turn"),
		// },
		{
			key: "contado",
			title: "CONTADO",
			icon: <BanknoteArrowDown size={64} />,
			action: () => navigateTo("cash-sale"),
		},
		{
			key: "credito",
			title: "CREDITO",
			icon: <CreditCard size={64} />,
			action: () => navigateTo("payment"),
		},
		// {
		// 	key: "inicio",
		// 	title: "INICIO",
		// 	icon: <Home size={64} />,
		// 	action: () => navigateTo("login"),
		// },
		{
			key: "fidelizacion",
			title: "FIDELIZACION",
			icon: <Star size={64} />,
			action: () => navigateTo("loyalty"),
		},
		{
			key: "utilidades",
			title: "UTILIDADES",
			icon: <Settings size={64} />,
			action: undefined, // Sin acción definida por ahora
		},
	] as const;
};
