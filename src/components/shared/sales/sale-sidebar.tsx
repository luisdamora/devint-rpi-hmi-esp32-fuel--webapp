import { Home } from "lucide-react";
import React from "react";
import { AnimatedFuelIcon } from "@/components/shared/sales/animated-fuel-icon";
import { SmallSideTile } from "@/components/shared/sales/small-side-tile";
import { NEXUS_COLORS } from "@/lib/config/theme";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";

interface SaleSidebarProps {
	title: string;
	isAnimating: boolean;
	onTitleClick?: () => void;
	navigationDestination?: string;
}

export const SaleSidebar: React.FC<SaleSidebarProps> = ({
	title,
	isAnimating,
	onTitleClick,
	navigationDestination = "menu",
}) => {
	const { navigateTo } = useHMINavigation();

	const handleTitleClick = () => {
		if (onTitleClick) {
			onTitleClick();
		}
	};

	return (
		<div className="col-span-1 flex flex-col gap-4 self-start pt-8 h-full">
			{/* Título como span estático con estilo side-tile */}
			<div className="text-center">
				<span
					className="inline-block px-4 text-xl font-bold"
					style={{
						backgroundColor: NEXUS_COLORS.status.red,
						color: NEXUS_COLORS.white,
						borderRadius: 4,
					}}
				>
					{title}
				</span>
			</div>

			{/* Icono de surtidor animado */}
			<div className="flex justify-center py-4">
				<AnimatedFuelIcon
					size={80}
					animationDuration={isAnimating ? 5000 : 0}
					continuousAnimation={false}
				/>
			</div>

			{/* Espacio flexible */}
			<div className="flex-grow"></div>

			{/* Botón Inicio con SmallSideTile centrado */}
			<div className="mt-auto flex justify-center">
				<SmallSideTile
					title="INICIO"
					icon={<Home size={36} />}
					onClick={() => navigateTo(navigationDestination)}
				/>
			</div>
		</div>
	);
};
