import { BanknoteArrowDown, CreditCard, Settings } from "lucide-react";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";
import { IconPuntosColombia } from "./icon-puntos-colombia";
import type { MenuTilesData } from "./types";

/**
 * Datos de configuración de los tiles del menú principal
 * Cada tile representa una acción disponible en el menú
 */
export const useMenuTilesData = (): MenuTilesData => {
	const { navigateTo } = useHMINavigation();

	return [
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
			action: () => navigateTo("vehicle-identification"),
		},
		{
			key: "fidelizacion",
			title: "FIDELIZACION",
			icon: <IconPuntosColombia size={64} />,
			action: () => navigateTo("loyalty"),
		},
		{
			key: "utilidades",
			title: "UTILIDADES",
			icon: <Settings size={64} />,
			action: () => navigateTo("utilities"),
		},
	] as const;
};
