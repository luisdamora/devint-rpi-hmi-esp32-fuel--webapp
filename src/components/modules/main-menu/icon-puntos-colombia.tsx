import React from "react";

interface IconPuntosColombiaProps {
	size?: number;
	className?: string;
}

export const IconPuntosColombia: React.FC<IconPuntosColombiaProps> = ({
	size = 64,
	className = "",
}) => {
	return (
		<img
			src="/src/assets/images/puntos-colombia.png"
			alt="Puntos Colombia"
			width={size}
			height={size}
			className={className}
			style={{
				width: size,
				height: size,
				objectFit: "contain",
			}}
		/>
	);
};
