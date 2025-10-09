import { Home, UserPlus } from "lucide-react";
import React from "react";
import { HMIContainer } from "@/components/layouts/hmi-container";
import { SideTile } from "@/components/shared/sales/side-tile";
import { NEXUS_COLORS } from "@/lib/config/theme";
import { useHMINavigation } from "@/lib/hooks/use-hmi-navigation";
import { CustomerForm } from "./components/customer-form";
import { useCustomerForm } from "./hooks/use-customer-form";

export const RegisterCustomerViewComponent: React.FC = () => {
	const { navigateTo } = useHMINavigation();
	const {
		formData,
		handleDocumentTypeChange,
		handleDocumentNumberChange,
		handleNameChange,
		handleEmailChange,
		handleSubmit,
	} = useCustomerForm();

	return (
		<HMIContainer showHeader={true} showFooter={true}>
			<div className="w-full h-full flex items-center justify-center px-2">
				<div className="grid grid-cols-4 gap-6 w-full max-w-6xl">
					{/* Tiles laterales */}
					<div className="col-span-1 flex flex-col gap-6 self-start pt-8">
						<SideTile
							title="REGISTRAR CLIENTES"
							icon={<UserPlus size={64} />}
							onClick={() => navigateTo("register-customer")}
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
						<div className="w-full max-w-2xl">
							<CustomerForm
								documentType={formData.documentType}
								documentNumber={formData.documentNumber}
								name={formData.name}
								email={formData.email}
								onDocumentTypeChange={handleDocumentTypeChange}
								onDocumentNumberChange={handleDocumentNumberChange}
								onNameChange={handleNameChange}
								onEmailChange={handleEmailChange}
								onSubmit={handleSubmit}
							/>
						</div>
					</div>
				</div>
			</div>
		</HMIContainer>
	);
};
