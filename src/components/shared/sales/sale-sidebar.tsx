import { Home } from "lucide-react";
import React from "react";
import { SmallSideTile } from "@/components/shared/sales/small-side-tile";
import { AnimatedFuelIcon } from "@/components/shared/sales/animated-fuel-icon";
import { AnimatedCreditIcon } from "@/components/shared/sales/animated-credit-icon";
import { NEXUS_COLORS } from "@/lib/config/theme";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";

export type SaleType = "contado" | "credito";

interface SaleSidebarProps {
	title: string;
	saleType: SaleType;
	onTitleClick?: () => void;
	navigationDestination?: string;
}

export const SaleSidebar: React.FC<SaleSidebarProps> = ({
	title,
	saleType,
	onTitleClick,
	navigationDestination = "menu",
}) => {
	const { navigateTo } = useHMINavigation();

	const handleTitleClick = () => {
		if (onTitleClick) {
			onTitleClick();
		}
	};

	const getSaleTypeConfig = (type: SaleType) => {
		switch (type) {
			case "contado":
				return {
					color: NEXUS_COLORS.status.red,
					showFuelIcon: true,
					showCreditIcon: false,
				};
			case "credito":
				return {
					color: NEXUS_COLORS.status.orange,
					showFuelIcon: false,
					showCreditIcon: true,
				};
			default:
				return {
					color: NEXUS_COLORS.status.gray,
					showFuelIcon: false,
					showCreditIcon: false,
				};
		}
	};

	const config = getSaleTypeConfig(saleType);

	return (
		<div className="col-span-1 flex flex-col gap-4 self-start pt-8 h-full">
			{/* Título como span estático con estilo side-tile */}
			<div className="text-center">
				<span
					className="inline-block px-4 text-xl font-bold"
					style={{
						backgroundColor: config.color,
						color: NEXUS_COLORS.white,
						borderRadius: 4,
					}}
				>
					{title}
				</span>
			</div>

			{/* Icono animado según tipo de venta */}
			<div className="flex justify-center py-4">
				{config.showFuelIcon && (
					<AnimatedFuelIcon
						size={80}
						animationDuration={5000}
						continuousAnimation={false}
					/>
				)}
				{config.showCreditIcon && (
					<AnimatedCreditIcon
						size={80}
						animationDuration={3000}
						continuousAnimation={false}
					/>
				)}
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