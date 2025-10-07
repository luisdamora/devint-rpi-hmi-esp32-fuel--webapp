import { BanknoteArrowDown, Home } from "lucide-react";
import React, { useState } from "react";
import { HMIContainer } from "@/components/layout/hmi-container";
import { NEXUS_COLORS } from "@/lib/config/theme";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";

export const CashSaleViewComponent: React.FC = () => {
	const { navigateTo, navigateBack } = useHMINavigation();
	const [value, setValue] = useState("100000"); // preset inicial
	const [isDecimal, setIsDecimal] = useState(false);

	const displayMoney = () => {
		const n = Number(value || 0);
		return n.toLocaleString("es-CO");
	};

	const handleNumber = (num: string) => {
		const v = value === "0" ? num : value + num;
		setValue(v);
	};

	const handleDecimal = () => {
		if (!isDecimal) {
			setValue(value + ".");
			setIsDecimal(true);
		}
	};

	const handleClear = () => {
		setValue("0");
		setIsDecimal(false);
	};

	const handleBackspace = () => {
		if (value.length > 1) {
			const v = value.slice(0, -1);
			setValue(v);
			if (value.slice(-1) === ".") setIsDecimal(false);
		} else {
			setValue("0");
		}
	};

	// Tile local reutilizable (mismo estilo de MainMenu)
	const SideTile: React.FC<{
		title: string;
		icon: React.ReactNode;
		onClick?: () => void;
		color?: string;
	}> = ({ title, icon, onClick, color = NEXUS_COLORS.status.red }) => (
		<button
			type="button"
			onClick={onClick}
			className="group relative rounded-md border-2 p-3 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-transform hover:scale-[1.02] select-none"
			style={{ borderColor: color, backgroundColor: "transparent" }}
		>
			<div
				className="absolute top-0 left-0 right-0 text-center font-semibold"
				style={{ transform: "translateY(-50%)", color: NEXUS_COLORS.white }}
			>
				<span
					className="inline-block px-4"
					style={{ backgroundColor: color, borderRadius: 4 }}
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

	return (
		<HMIContainer showHeader={false} showFooter={false}>
			<div className="w-full h-full flex items-center justify-center px-2">
				<div className="grid grid-cols-4 gap-4 w-full max-w-6xl">
					{/* Tiles laterales */}
					<div className="col-span-1 flex flex-col gap-6 self-start pt-8">
						<SideTile
							title="CONTADO"
							color={NEXUS_COLORS.status.green}
							icon={<BanknoteArrowDown size={64} />}
							onClick={() => navigateTo("cash-sale")}
						/>
						<SideTile
							title="INICIO"
							icon={<Home size={64} />}
							onClick={() => navigateTo("menu")}
						/>
					</div>

					{/* Centro: preset y keypad */}
					<div className="col-span-3">
						{/* Encabezado: PRESET */}
						<div className="mb-3 text-center">
							<h3 className="text-white font-semibold tracking-wide">PRESET</h3>
							<div className="flex gap-3 justify-center mt-2">
								<div
									className="px-6 py-3 rounded-md font-bold text-2xl"
									style={{
										backgroundColor: NEXUS_COLORS.status.green,
										color: NEXUS_COLORS.white,
									}}
								>
									$ {displayMoney()}
								</div>
								<button
									type="button"
									className="px-6 py-3 rounded-md font-bold text-white text-xl"
									style={{ backgroundColor: NEXUS_COLORS.status.red }}
								>
									TANQUE LLENO
								</button>
							</div>
						</div>

						{/* Campos superiores ($, Vol., 000) */}
						<div className="grid grid-cols-3 gap-3 max-w-xl mx-auto mb-4">
							<div
								className="text-center text-white font-semibold py-2 rounded-md"
								style={{ backgroundColor: NEXUS_COLORS.background.dark }}
							>
								$
							</div>
							<button
								type="button"
								className="text-center text-white font-semibold py-2 rounded-md"
								style={{ backgroundColor: NEXUS_COLORS.background.dark }}
							>
								Vol.
							</button>
							<div
								className="text-center text-white font-semibold py-2 rounded-md"
								style={{ backgroundColor: NEXUS_COLORS.background.dark }}
							>
								{value.length === 0
									? "000"
									: value.replace(/\D/g, "").slice(-3).padStart(3, "0")}
							</div>
						</div>

						{/* Keypad */}
						<div className="grid grid-cols-3 gap-3 max-w-xl mx-auto">
							{["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((n) => (
								<button
									key={n}
									type="button"
									onClick={() => handleNumber(n)}
									className="py-5 rounded-md text-white text-2xl font-semibold"
									style={{ backgroundColor: NEXUS_COLORS.background.dark }}
								>
									{n}
								</button>
							))}

							<button
								type="button"
								onClick={handleClear}
								className="py-5 rounded-md text-white font-semibold"
								style={{ backgroundColor: NEXUS_COLORS.status.red }}
							>
								Borrar
							</button>
							<button
								type="button"
								onClick={() => handleNumber("0")}
								className="py-5 rounded-md text-white text-2xl font-semibold"
								style={{ backgroundColor: NEXUS_COLORS.background.dark }}
							>
								0
							</button>
							<button
								type="button"
								onClick={handleDecimal}
								className="py-5 rounded-md text-white text-2xl font-semibold"
								style={{ backgroundColor: NEXUS_COLORS.background.dark }}
							>
								.
							</button>

							{/* Backspace y acciones */}
							<button
								type="button"
								onClick={handleBackspace}
								className="col-span-2 py-4 rounded-md text-white font-semibold"
								style={{ backgroundColor: "#F97316" }}
							>
								← Borrar
							</button>
							<button
								type="button"
								onClick={navigateBack}
								className="py-4 rounded-md text-white font-semibold"
								style={{ backgroundColor: NEXUS_COLORS.status.green }}
							>
								Enter
							</button>
						</div>
					</div>
				</div>
			</div>
		</HMIContainer>
	);
};
