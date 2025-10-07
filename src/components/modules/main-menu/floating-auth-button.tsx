import { LogIn, LogOut } from "lucide-react";
import React from "react";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";
import { useSession } from "@/lib/hooks/use-ui-store-helpers";

interface FloatingAuthButtonProps {
	/** Si el botón está deshabilitado */
	disabled?: boolean;
	/** Función callback personalizada para el click */
	onClick?: () => void;
}

/**
 * Componente de botón flotante para autenticación
 * Se posiciona en la esquina inferior derecha y permite login/logout según el estado del turno
 */
export const FloatingAuthButton: React.FC<FloatingAuthButtonProps> = ({
	disabled = false,
	onClick: customOnClick,
}) => {
	const { isTurnActive, logout } = useSession();
	const { goToLogin } = useHMINavigation();

	/**
	 * Maneja el click del botón
	 * Si hay un callback personalizado, lo usa; de lo contrario, maneja login/logout según el estado
	 */
	const handleClick = () => {
		if (customOnClick) {
			customOnClick();
			return;
		}

		if (isTurnActive) {
			// Si el turno está activo, hacer logout
			logout();
		} else {
			// Si el turno está cerrado, ir al login
			goToLogin();
		}
	};

	// Determinar el icono según el estado del turno
	const icon = isTurnActive ? <LogOut size={20} /> : <LogIn size={20} />;

	// Tooltip según el estado
	const tooltip = isTurnActive ? "Cerrar sesión" : "Iniciar sesión";

	return (
		<button
			type="button"
			onClick={handleClick}
			disabled={disabled}
			aria-label={tooltip}
			title={tooltip}
			className={`
				fixed bottom-4 right-4 z-50
				flex items-center justify-center
				w-12 h-12 rounded-full
				bg-blue-600 hover:bg-blue-700
				disabled:bg-gray-400 disabled:cursor-not-allowed
				text-white shadow-lg
				transition-all duration-200
				hover:scale-105 active:scale-95
				border-2 border-white
			`}
		>
			{icon}
		</button>
	);
};
