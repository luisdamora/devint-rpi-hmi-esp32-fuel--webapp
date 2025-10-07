import { Calendar, Home } from "lucide-react";
import React from "react";
import { HMIContainer } from "@/components/layout/hmi-container";
import { NEXUS_COLORS } from "@/lib/config/theme";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";

export const CloseTurnViewComponent: React.FC = () => {
	const { navigateTo, goToMenu } = useHMINavigation();

	// Local tile (same visual language as MainMenu)
	const SideTile: React.FC<{
		title: string;
		icon: React.ReactNode;
		onClick?: () => void;
		ariaLabel?: string;
	}> = ({ title, icon, onClick, ariaLabel }) => (
		<button
			type="button"
			onClick={onClick}
			aria-label={ariaLabel ?? title}
			className="group relative rounded-md border-2 p-3 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-transform hover:scale-[1.02] select-none"
			style={{ borderColor: "#EF4444", backgroundColor: "transparent" }}
		>
			<div
				className="absolute top-0 left-0 right-0 text-center font-semibold"
				style={{ transform: "translateY(-50%)", color: NEXUS_COLORS.white }}
			>
				<span
					className="inline-block px-4"
					style={{ backgroundColor: "#EF4444", borderRadius: 4 }}
				>
					{title}
				</span>
			</div>
			<div className="flex items-center justify-center h-28">
				<span className="text-6xl text-white" aria-hidden>
					{icon}
				</span>
			</div>
		</button>
	);

	const handleCloseTurn = () => {
		// TODO: Logic to close turn
		goToMenu();
	};

	return (
		<HMIContainer>
			<div className="w-full h-full flex items-center justify-center px-2">
				<div className="grid grid-cols-4 gap-4 w-full max-w-6xl">
					{/* Left side tiles */}
					<div className="col-span-1 flex flex-col gap-6 self-start pt-8">
						<SideTile
							title="TURNOS"
							icon={<Calendar size={64} />}
							onClick={() => navigateTo("close-turn")}
						/>
						<SideTile
							title="INICIO"
							icon={<Home size={64} />}
							onClick={() => navigateTo("menu")}
						/>
					</div>

					{/* Center close turn button */}
					<div className="col-span-3">
						<div className="mx-auto max-w-2xl">
							<div className="text-center mb-8">
								<h3 className="text-white font-semibold tracking-wide">
									VENDEDOR
								</h3>
								<p className="text-white text-xl font-bold">
									SEBASTIAN RESTREPO BUSTAMANTE
								</p>
							</div>

							<div className="flex items-center justify-center">
								<button
									type="button"
									onClick={handleCloseTurn}
									className="w-full max-w-lg font-bold py-6 rounded-md text-white text-3xl transition-transform hover:scale-[1.02]"
									style={{ backgroundColor: "#EF4444" }}
								>
									CERRAR TURNO
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</HMIContainer>
	);
};
