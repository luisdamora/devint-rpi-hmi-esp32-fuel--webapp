import { Calendar, Home } from "lucide-react";
import React, { useState } from "react";
import { HMIContainer } from "@/components/layout/hmi-container";
import { NEXUS_COLORS } from "@/lib/config/theme";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";

export const LoginViewComponent: React.FC = () => {
	const { navigateTo, goToMenu } = useHMINavigation();
	const [operatorId, setOperatorId] = useState("");
	const [password, setPassword] = useState("");

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

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: validar credenciales (mock). Por ahora navegar al menú.
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

					{/* Center login form */}
					<div className="col-span-3">
						<div className="mx-auto max-w-2xl">
							<div className="text-center mb-4">
								<h3 className="text-white font-semibold tracking-wide">
									VENDEDOR
								</h3>
								<p className="text-white text-xl font-bold">
									SEBASTIAN RESTREPO BUSTAMANTE
								</p>
							</div>

							<form onSubmit={onSubmit} className="space-y-4">
								<div>
									<label
										htmlFor="operatorId"
										className="block text-sm font-medium text-white mb-1"
									>
										USUARIO:
									</label>
									<input
										id="operatorId"
										type="text"
										value={operatorId}
										onChange={(e) => setOperatorId(e.target.value)}
										className="w-full px-4 py-3 rounded-md"
										style={{
											backgroundColor: NEXUS_COLORS.background.dark,
											color: NEXUS_COLORS.white,
											border: `2px solid ${NEXUS_COLORS.status.red}`,
										}}
										placeholder="**************"
									/>
								</div>

								<div>
									<label
										htmlFor="password"
										className="block text-sm font-medium text-white mb-1"
									>
										CONTRASEÑA:
									</label>
									<input
										id="password"
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="w-full px-4 py-3 rounded-md"
										style={{
											backgroundColor: NEXUS_COLORS.background.dark,
											color: NEXUS_COLORS.white,
											border: `2px solid ${NEXUS_COLORS.status.red}`,
										}}
										placeholder="**************"
									/>
								</div>

								<div className="pt-2">
									<button
										type="submit"
										className="w-full font-bold py-4 rounded-md text-white text-2xl"
										style={{ backgroundColor: "#EF4444" }}
									>
										INICIAR
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</HMIContainer>
	);
};
