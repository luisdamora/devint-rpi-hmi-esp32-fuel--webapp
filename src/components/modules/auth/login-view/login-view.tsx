import React from "react";
import { HMIContainer } from "@/components/layouts/hmi-container";
import { OperatorHeader } from "../shared/components/operator-header";
import { SideNavigation } from "../shared/components/side-navigation";
import { LoginForm } from "./components/login-form";
import { useLoginForm } from "./hooks/use-login-form";

export const LoginViewComponent: React.FC = () => {
	const {
		operatorId,
		password,
		setOperatorId,
		setPassword,
		handleSubmit,
		isLoading,
	} = useLoginForm();

	return (
		<HMIContainer>
			<div className="w-full h-full flex items-center justify-center px-2">
				<div className="grid grid-cols-4 gap-4 w-full max-w-6xl">
					{/* Left side navigation */}
					<SideNavigation />

					{/* Center login form */}
					<div className="col-span-3">
						<div className="mx-auto max-w-2xl">
							<OperatorHeader />
							<LoginForm
								operatorId={operatorId}
								password={password}
								onOperatorIdChange={setOperatorId}
								onPasswordChange={setPassword}
								onSubmit={handleSubmit}
								isLoading={isLoading}
							/>
						</div>
					</div>
				</div>
			</div>
		</HMIContainer>
	);
};
