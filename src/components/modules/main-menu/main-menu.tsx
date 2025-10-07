import React from "react";
import { HMIContainer } from "@/components/layouts/hmi-container";
import { useMenuTheme } from "@/lib/hooks/use-ui-store-helpers";
import { AuthTile } from "./auth-tile";
import { useMenuTilesData } from "./menu-data";
import { MenuTile } from "./menu-tile";
import type { MainMenuProps } from "./types";

/**
 * Componente principal del menú de navegación HMI
 * Muestra los diferentes tiles de acciones disponibles según el estado del turno
 */
export const MainMenu: React.FC<MainMenuProps> = ({
	turnActive: _deprecated,
}) => {
	// Obtener estado del turno desde el store global
	const { isTurnActive } = useMenuTheme();

	// Obtener datos de configuración de los tiles
	const tiles = useMenuTilesData();

	return (
		<HMIContainer>
			<div className="min-h-full w-full flex items-center justify-center px-4 relative">
				<div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto w-2/3">
					{tiles.map((tile) => {
						// Deshabilitar tiles si no hay turno activo, excepto algunos casos específicos
						const disabled = !isTurnActive && !tile.key.includes("inicio");

						return (
							<MenuTile
								key={tile.key}
								title={tile.title}
								icon={tile.icon}
								onClick={tile.action}
								disabled={disabled || !tile.action}
								ariaLabel={
									disabled ? `${tile.title} (deshabilitado)` : tile.title
								}
							/>
						);
					})}
				</div>
				{/* Botón de autenticación posicionado en esquina inferior derecha */}
				<div className="absolute bottom-1 right-1">
					<AuthTile />
				</div>
			</div>
		</HMIContainer>
	);
};
