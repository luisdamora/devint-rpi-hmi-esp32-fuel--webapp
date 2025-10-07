import React from "react";
import { LogoBase, type LogoBaseProps } from "./logo-base";

export interface SplashLogoProps extends Omit<LogoBaseProps, "className"> {
	className?: string;
}

/**
 * SplashLogo
 * Variante del logo para la pantalla de inicio (splash).
 * - Se adapta al ancho disponible con un máximo grande
 * - Mantiene display block para centrar fácilmente
 */
export const SplashLogo: React.FC<SplashLogoProps> = ({
	alt = "Nexus logo",
	className,
	style,
}) => {
	return (
		<LogoBase
			alt={alt}
			className={["block w-full max-w-[720px]", className]
				.filter(Boolean)
				.join(" ")}
			style={style}
		/>
	);
};
