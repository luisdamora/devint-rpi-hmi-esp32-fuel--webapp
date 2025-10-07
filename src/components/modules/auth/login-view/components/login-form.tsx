import React from "react";
import { NEXUS_COLORS } from "@/lib/config/theme";

interface LoginFormProps {
	operatorId: string;
	password: string;
	onOperatorIdChange: (value: string) => void;
	onPasswordChange: (value: string) => void;
	onSubmit: (e: React.FormEvent) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
	operatorId,
	password,
	onOperatorIdChange,
	onPasswordChange,
	onSubmit,
}) => {
	return (
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
					onChange={(e) => onOperatorIdChange(e.target.value)}
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
					onChange={(e) => onPasswordChange(e.target.value)}
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
	);
};
