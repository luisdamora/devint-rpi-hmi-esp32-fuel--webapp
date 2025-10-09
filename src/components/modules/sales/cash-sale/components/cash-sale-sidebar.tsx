import { Home } from "lucide-react";
import React from "react";
import { AnimatedFuelIcon } from "@/components/shared/sales/animated-fuel-icon";
import { SmallSideTile } from "@/components/shared/sales/small-side-tile";
import { NEXUS_COLORS } from "@/lib/config/theme";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";

interface CashSaleSidebarProps {
	onContadoClick?: () => void;
}

export const CashSaleSidebar: React.FC<CashSaleSidebarProps> = ({
	onContadoClick,
}) => {
	const { navigateTo } = useHMINavigation();

	const handleContadoClick = () => {
		if (onContadoClick) {
			onContadoClick();
		} else {
			navigateTo("cash-sale");
		}
	};

	return (
		<div className="col-span-1 flex flex-col gap-4 self-start pt-8 h-full">
			{/* Título CONTADO como span estático con estilo side-tile */}
			<div className="text-center">
				<span
					className="inline-block px-4 text-xl font-bold"
					style={{
						backgroundColor: NEXUS_COLORS.status.red,
						color: NEXUS_COLORS.white,
						borderRadius: 4,
					}}
				>
					CONTADO
				</span>
			</div>

			{/* Icono de surtidor con animación */}
			<div className="flex justify-center py-4">
				<AnimatedFuelIcon
					size={80}
					isAnimating={false}
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
					onClick={() => navigateTo("menu")}
				/>
			</div>
		</div>
	);
};
