import { LogIn, LogOut } from "lucide-react";
import React from "react";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";
import { useMenuTheme, useSession } from "@/lib/hooks/use-ui-store-helpers";
import { cn } from "@/lib/utils";

const SIZE_LOGO: number = 24;

interface AuthTileProps {
	/** Si el tile está deshabilitado */
	disabled?: boolean;
}

/**
 * Componente de tile para autenticación que sigue el mismo estilo visual que MenuTile
 * Muestra diferentes iconos y acciones según el estado del turno
 */
export const AuthTile: React.FC<AuthTileProps> = ({ disabled = false }) => {
	// Obtener colores del tema desde el store global
	const { borderColor } = useMenuTheme();
	const { isTurnActive, logout } = useSession();
	const { goToLogin } = useHMINavigation();

	/**
	 * Maneja el click del tile según el estado del turno
	 */
	const handleClick = () => {
		if (disabled) return;

		if (isTurnActive) {
			// Si el turno está activo, hacer logout
			logout();
		} else {
			// Si el turno está cerrado, ir al login
			goToLogin();
		}
	};

	// Determinar el icono según el estado del turno
	const icon = isTurnActive ? (
		<LogOut size={SIZE_LOGO} />
	) : (
		<LogIn size={SIZE_LOGO} />
	);

	// Tooltip según el estado
	const title = isTurnActive ? "CERRAR TURNO" : "INICIAR TURNO";
	const tooltip = isTurnActive ? "Cerrar turno" : "Iniciar turno";

	return (
		<button
			type="button"
			onClick={handleClick}
			aria-label={tooltip}
			className={cn(
				"group relative rounded-md border-2 p-3 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 select-none ",
				disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02]",
			)}
			style={{ borderColor, backgroundColor: "transparent" }}
			disabled={disabled}
		>
			<div className="flex flex-col items-center justify-center space-y-2">
				<div className="flex text-white items-center justify-center">
					{icon}
				</div>
				<span className="text-xs text-white font-bold text-center leading-tight">
					{title}
				</span>
			</div>
		</button>
	);
};
