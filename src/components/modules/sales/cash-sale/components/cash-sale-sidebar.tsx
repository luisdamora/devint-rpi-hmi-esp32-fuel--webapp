import { Fuel, Home } from "lucide-react";
import React, { useEffect, useState } from "react";
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
	const [isAnimationComplete, setIsAnimationComplete] = useState(false);

	useEffect(() => {
		// Animación por 3 segundos
		const timer = setTimeout(() => {
			setIsAnimationComplete(true);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

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
				<Fuel
					size={80}
					className={isAnimationComplete ? "text-green-500" : "text-blue-500"}
					style={
						isAnimationComplete
							? {}
							: {
									animation: "blink 1.5s ease-in-out infinite",
								}
					}
				/>
				<style>{`
					@keyframes blink {
						0%, 100% { opacity: 1; }
						50% { opacity: 0.3; }
					}
				`}</style>
			</div>

			{/* Espacio flexible */}
			<div className="flex-grow"></div>

			{/* Botón Inicio con SmallSideTile */}
			<div className="mt-auto">
				<SmallSideTile
					title="INICIO"
					icon={<Home size={48} />}
					onClick={() => navigateTo("menu")}
				/>
			</div>
		</div>
	);
};
