import React from "react";
import { NEXUS_COLORS } from "@/lib/config/theme";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";

interface MainMenuProps {
	turnActive?: boolean;
}

export const MainMenu: React.FC<MainMenuProps> = ({ turnActive = false }) => {
	const { navigateTo } = useHMINavigation();

	return (
		<div
			className="flex flex-col h-full"
			style={{ backgroundColor: NEXUS_COLORS.background.main }}
		>
			{/* Status Header */}
			<div
				className="px-4 py-3 text-white flex justify-between items-center"
				style={{
					backgroundColor: turnActive
						? NEXUS_COLORS.status.green
						: NEXUS_COLORS.status.red,
				}}
			>
				<h1 className="font-bold" style={{ fontSize: "1.25rem" }}>
					Nexus POS
				</h1>
				<div className="flex items-center space-x-2">
					<span style={{ fontSize: "0.875rem" }}>Estado:</span>
					<span className="font-semibold" style={{ fontSize: "0.875rem" }}>
						{turnActive ? "Turno Activo" : "Turno Inactivo"}
					</span>
				</div>
			</div>

			{/* Menu Grid */}
			<div className="flex-1 p-4">
				<div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
					{turnActive ? (
						<>
							<button
								type="button"
								onClick={() => navigateTo("keypad")}
								className="rounded-lg p-4 flex flex-col items-center transition-all hover:scale-105"
								style={{
									backgroundColor: NEXUS_COLORS.primary.blue,
									color: NEXUS_COLORS.white,
								}}
							>
								<div className="text-2xl mb-2">💰</div>
								<span className="text-sm font-semibold">Ventas</span>
							</button>
							<button
								type="button"
								onClick={() => navigateTo("payment")}
								className="rounded-lg p-4 flex flex-col items-center transition-all hover:scale-105"
								style={{
									backgroundColor: NEXUS_COLORS.primary.blue,
									color: NEXUS_COLORS.white,
								}}
							>
								<div className="text-2xl mb-2">💳</div>
								<span className="text-sm font-semibold">Pagos</span>
							</button>
							<button
								type="button"
								onClick={() => navigateTo("loyalty")}
								className="rounded-lg p-4 flex flex-col items-center transition-all hover:scale-105"
								style={{
									backgroundColor: NEXUS_COLORS.status.orange,
									color: NEXUS_COLORS.white,
								}}
							>
								<div className="text-2xl mb-2">⭐</div>
								<span className="text-sm font-semibold">Puntos Colombia</span>
							</button>
							<button
								type="button"
								className="rounded-lg p-4 flex flex-col items-center transition-all hover:scale-105 opacity-60 cursor-not-allowed"
								style={{
									backgroundColor: NEXUS_COLORS.neutral.gray600,
									color: NEXUS_COLORS.white,
								}}
								disabled
							>
								<div className="text-2xl mb-2">📊</div>
								<span className="text-sm font-semibold">Reportes</span>
							</button>
							<button
								type="button"
								onClick={() => navigateTo("close-turn")}
								className="rounded-lg p-4 flex flex-col items-center transition-all hover:scale-105"
								style={{
									backgroundColor: NEXUS_COLORS.status.red,
									color: NEXUS_COLORS.white,
								}}
							>
								<div className="text-2xl mb-2">🔒</div>
								<span className="text-sm font-semibold">Cerrar Turno</span>
							</button>
						</>
					) : (
						<button
							type="button"
							onClick={() => navigateTo("login")}
							className="rounded-lg p-6 flex flex-col items-center transition-all hover:scale-105 mx-auto"
							style={{
								backgroundColor: NEXUS_COLORS.status.green,
								color: NEXUS_COLORS.white,
							}}
						>
							<div className="text-3xl mb-3">🔑</div>
							<span className="font-semibold" style={{ fontSize: "1rem" }}>
								Iniciar Turno
							</span>
						</button>
					)}
				</div>
			</div>
		</div>
	);
};
