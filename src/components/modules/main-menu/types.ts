/**
 * Props para el componente principal MainMenu
 */
export interface MainMenuProps {
	/** @deprecated - Este prop está deprecated, usar el estado del store global */
	turnActive?: boolean;
}

/**
 * Props para el componente MenuTile
 */
export interface MenuTileProps {
	/** Título del tile */
	title: string;
	/** Icono del tile */
	icon: React.ReactNode;
	/** Función que se ejecuta al hacer click */
	onClick?: () => void;
	/** Si el tile está deshabilitado */
	disabled?: boolean;
	/** Etiqueta de accesibilidad */
	ariaLabel?: string;
}

/**
 * Datos de configuración para un tile del menú
 */
export interface MenuTileData {
	/** Clave única del tile */
	key: MenuTileKey;
	/** Título del tile */
	title: string;
	/** Icono del tile */
	icon: React.ReactNode;
	/** Acción que se ejecuta al hacer click */
	action?: () => void;
}

/**
 * Claves válidas para los tiles del menú
 */
export type MenuTileKey =
	| "contado"
	| "credito"
	| "fidelizacion"
	| "utilidades"
	| "auth";

/**
 * Tipo para el array de tiles del menú
 */
export type MenuTilesData = readonly MenuTileData[];
