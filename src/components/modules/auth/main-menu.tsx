import React from "react";
import { HMIContainer } from "@/components/layout/hmi-container";
import { NEXUS_COLORS } from "@/lib/config/theme";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";
import { cn } from "@/lib/utils";

interface MainMenuProps {
	turnActive?: boolean;
}

export const MainMenu: React.FC<MainMenuProps> = ({ turnActive = false }) => {
	const { navigateTo } = useHMINavigation();

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
				"group relative rounded-md border-2 p-3 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-transform select-none " +
				"" +
				(disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02]")
			}
			style={{ borderColor: "#EF4444", backgroundColor: "transparent" }}
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
					className="inline-block px-4"
					style={{ backgroundColor: "#EF4444", borderRadius: 4 }}
				>
					{title}
				</span>
			</div>
			<div className="flex items-center justify-center h-28">
				<span className="text-6xl" aria-hidden>
					{icon}
				</span>
			</div>
		</button>
	);

	const tiles = [
		{
			key: "turnos",
			title: "TURNOS",
			icon: "📅",
			action: () => navigateTo("close-turn"),
		},
		{
			key: "contado",
			title: "CONTADO",
			icon: "⬇️",
			action: () => navigateTo("keypad"),
		},
		{
			key: "credito",
			title: "CREDITO",
			icon: "💳",
			action: () => navigateTo("payment"),
		},
		{
			key: "inicio",
			title: "INICIO",
			icon: "🏠",
			action: () => navigateTo("login"),
		},
		{
			key: "fidelizacion",
			title: "FIDELIZACION",
			icon: "🅿️",
			action: () => navigateTo("loyalty"),
		},
		{ key: "utilidades", title: "UTILIDADES", icon: "⚙️", action: undefined },
	] as const;

	return (
		<HMIContainer>
			<div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
				{tiles.map((t) => {
					const isInicio = t.key === "inicio";
					const disabled =
						!turnActive &&
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
		</HMIContainer>
	);
};
