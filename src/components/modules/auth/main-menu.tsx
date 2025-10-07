import {
	BanknoteArrowDown,
	Calendar,
	CreditCard,
	Home,
	Settings,
	Star,
} from "lucide-react";
import React from "react";
import { HMIContainer } from "@/components/layout/hmi-container";
import { NEXUS_COLORS } from "@/lib/config/theme";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";
import { useMenuTheme } from "@/lib/hooks/use-ui-store-helpers";

interface MainMenuProps {
	turnActive?: boolean;
}

export const MainMenu: React.FC<MainMenuProps> = ({ turnActive: _deprecated }) => {
	const { navigateTo } = useHMINavigation();
	
	// Obtener estado del store global
	const { borderColor, isTurnActive } = useMenuTheme();

	// Reusable Tile component
	const MenuTile: React.FC<{
		title: string;
		icon: React.ReactNode;
		onClick?: () => void;
		disabled?: boolean;
		ariaLabel?: string;
	}> = ({ title, icon, onClick, disabled, ariaLabel }) => (
		<button
			type="button"
			onClick={disabled ? undefined : onClick}
			aria-label={ariaLabel ?? title}
			className={
				"group relative rounded-md border-2 p-3 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 select-none " +
				"" +
				(disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02]")
			}
			style={{ borderColor, backgroundColor: "transparent" }}
			disabled={disabled}
		>
			<div
				className="absolute top-0 left-0 right-0 text-center font-semibold"
				style={{
					transform: "translateY(-50%)",
					color: NEXUS_COLORS.white,
					backgroundColor: "transparent",
				}}
			>
				<span
					className="inline-block px-4 transition-colors duration-200"
					style={{ backgroundColor: borderColor, borderRadius: 4 }}
				>
					{title}
				</span>
			</div>
			<div className="flex items-center justify-center h-28">
				<span className="text-6xl text-white" aria-hidden>
					{icon}
				</span>
			</div>
		</button>
	);

	const tiles = [
		{
			key: "turnos",
			title: "TURNOS",
			icon: <Calendar size={64} />,
			action: () => navigateTo("close-turn"),
		},
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
		{
			key: "inicio",
			title: "INICIO",
			icon: <Home size={64} />,
			action: () => navigateTo("login"),
		},
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
			action: undefined,
		},
	] as const;

	return (
		<HMIContainer>
			<div className="min-h-full w-full flex items-center justify-center px-4">
				<div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto w-full">
					{tiles.map((t) => {
						const isInicio = t.key === "inicio";
						// Deshabilitar tiles si no hay turno activo, excepto "INICIO"
						const disabled =
							!isTurnActive &&
							!isInicio &&
							!t.key.includes("utilidades-disabled") &&
							!t.key.includes("inicio");
						return (
							<MenuTile
								key={t.key}
								title={t.title}
								icon={t.icon}
								onClick={t.action}
								disabled={disabled || !t.action}
								ariaLabel={disabled ? `${t.title} (deshabilitado)` : t.title}
							/>
						);
					})}
				</div>
			</div>
		</HMIContainer>
	);
};
