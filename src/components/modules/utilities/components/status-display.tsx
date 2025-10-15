import { AlertCircle, CheckCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import React from "react";

interface StatusDisplayProps {
	status: "idle" | "testing" | "success" | "error" | "printing";
	title: string;
	message?: string;
	timestamp?: string;
	icon?: LucideIcon;
}

export const StatusDisplay: React.FC<StatusDisplayProps> = ({
	status,
	title,
	message,
	timestamp,
	icon: CustomIcon,
}) => {
	const getStatusIcon = () => {
		if (CustomIcon) {
			return <CustomIcon size={32} className="text-white" />;
		}

		switch (status) {
			case "testing":
			case "printing":
				return (
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
				);
			case "success":
				return <CheckCircle size={32} className="text-green-500" />;
			case "error":
				return <AlertCircle size={32} className="text-red-500" />;
			default:
				return (
					<div className="w-8 h-8 bg-gray-400 rounded-full mx-auto mb-2"></div>
				);
		}
	};

	const getStatusMessage = () => {
		switch (status) {
			case "testing":
				return "Probando...";
			case "printing":
				return "Procesando...";
			case "success":
				return "Completado";
			case "error":
				return "Error";
			default:
				return "Listo";
		}
	};

	return (
		<div className="bg-gray-800 rounded-lg p-4 text-center">
			<div className="flex justify-center mb-2">{getStatusIcon()}</div>
			<h2 className="text-lg font-semibold text-white mb-2">{title}</h2>
			<p className="text-gray-300 text-sm mb-2">
				{message || getStatusMessage()}
			</p>
			{timestamp && (
				<p className="text-gray-400 text-xs">
					Hora: {new Date(timestamp).toLocaleString()}
				</p>
			)}
		</div>
	);
};
