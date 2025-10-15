import { Home, Search } from "lucide-react";
import React, { useState } from "react";
import { HMIContainer } from "@/components/layouts/hmi-container";
import { SmallSideTile } from "@/components/shared/sales/small-side-tile";
import { TouchInput } from "@/components/shared/touch-input";
import { BUTTON_STYLES, NEXUS_COLORS } from "@/lib/config/theme";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";

export const PointsView: React.FC = () => {
	const { navigateTo } = useHMINavigation();
	const [documentNumber, setDocumentNumber] = useState("");
	const [isSearching, setIsSearching] = useState(false);

	const handleSearch = () => {
		setIsSearching(true);
		// Simulate API call for loyalty points consultation
		setTimeout(() => {
			setIsSearching(false);
			// Here you would implement the actual API call to consult points
			console.log("Consulting points for document:", documentNumber);
		}, 1500);
	};

	return (
		<HMIContainer showHeader={true} showFooter={true}>
			<div className="w-full h-full flex items-center justify-center px-2">
				<div className="grid grid-cols-4 gap-6 w-full max-w-6xl">
					{/* Panel lateral compacto */}
					<div className="col-span-1 flex flex-col gap-4 self-start pt-8">
						{/* Título como span estático con estilo side-tile */}
						<div className="text-center">
							<span
								className="inline-block px-4 text-xl font-bold"
								style={{
									backgroundColor: NEXUS_COLORS.status.green,
									color: NEXUS_COLORS.white,
									borderRadius: 4,
								}}
							>
								PUNTOS DE FIDELIDAD
							</span>
						</div>

						{/* Íconos compactos */}
						<div className="flex flex-col gap-4 items-center">
							{/* Consultar puntos como texto estático */}
							<div className="text-center">
								<span
									className="inline-block px-3 text-sm"
									style={{
										backgroundColor: NEXUS_COLORS.status.green,
										color: NEXUS_COLORS.white,
										borderRadius: 4,
									}}
								>
									CONSULTAR PUNTOS
								</span>
							</div>

							{/* Ícono de búsqueda más pequeño */}
							<div className="flex justify-center py-2">
								<Search size={48} color={NEXUS_COLORS.status.green} />
							</div>
						</div>

						{/* Espacio flexible */}
						<div className="flex-grow"></div>

						{/* Botón Inicio con SmallSideTile centrado */}
						<div className="flex justify-center">
							<SmallSideTile
								title="INICIO"
								icon={<Home size={36} />}
								onClick={() => navigateTo("menu")}
							/>
						</div>
					</div>

					{/* Formulario central */}
					<div className="col-span-3 flex items-center justify-center">
						<div className="w-full max-w-2xl space-y-6">
							<TouchInput
								value={documentNumber}
								onChange={setDocumentNumber}
								label="Número de Identificación"
								placeholder="Ingrese el documento"
								maxLength={10}
								keyboardMode="numeric"
								useFixedDimensions={true}
							/>

							<div className="flex justify-center pt-1">
								<button
									type="button"
									className={BUTTON_STYLES.success}
									style={{
										minWidth: "300px",
										fontSize: "1.25rem",
										padding: "0.5rem 1rem",
									}}
									onClick={handleSearch}
									disabled={!documentNumber || isSearching}
								>
									{isSearching ? "CONSULTANDO..." : "CONSULTAR PUNTOS"}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</HMIContainer>
	);
};
