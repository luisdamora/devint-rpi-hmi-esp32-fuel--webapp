import React from "react";
import { NEXUS_COLORS } from "@/lib/config/theme";
import { useMenuTheme } from "@/lib/hooks/use-ui-store-helpers";
import type { MenuTileProps } from "./types";

/**
 * Componente reutilizable para los tiles del menú principal
 */
export const MenuTile: React.FC<MenuTileProps> = ({
	title,
	icon,
	onClick,
	disabled,
	ariaLabel,
}) => {
	// Obtener colores del tema desde el store global
	const { borderColor } = useMenuTheme();

	return (
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
};
