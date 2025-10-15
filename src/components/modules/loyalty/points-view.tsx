import { Home, Search } from "lucide-react";
import React, { useState } from "react";
import { HMIContainer } from "@/components/layouts/hmi-container";
import { SideTile } from "@/components/shared/sales/side-tile";
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
					{/* Tiles laterales */}
					<div className="col-span-1 flex flex-col gap-6 self-start pt-8">
						<SideTile
							title="CONSULTAR PUNTOS"
							icon={<Search size={64} />}
							onClick={() => {
								/* funcionalidad futura */
							}}
							color={NEXUS_COLORS.status.green}
						/>
						<SideTile
							title="INICIO"
							icon={<Home size={64} />}
							onClick={() => navigateTo("menu")}
							color={NEXUS_COLORS.status.red}
						/>
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
