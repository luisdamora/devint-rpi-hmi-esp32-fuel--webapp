import React from "react";
import logoSrc from "@/assets/images/logo.png";
import logoWhiteSrc from "@/assets/images/logo-nexus-blanco.png";
import { cn } from "@/lib/utils";

export interface LogoBaseProps {
	alt?: string;
	className?: string;
	style?: React.CSSProperties;
	white?: boolean;
}

/**
 * LogoBase
 * Componente base para renderizar el logo de Nexus desde assets.
 */
export const LogoBase: React.FC<LogoBaseProps> = ({
	alt = "Nexus logo",
	className,
	style,
	white = false,
}) => {
	const src = white ? logoWhiteSrc : logoSrc;
	return (
		<img src={src} alt={alt} className={cn("block", className)} style={style} />
	);
};
