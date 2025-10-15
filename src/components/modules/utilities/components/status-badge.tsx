import React from "react";

interface StatusBadgeProps {
	status: "closed" | "active" | "cancelled";
	text: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, text }) => {
	const getStatusStyles = () => {
		switch (status) {
			case "closed":
				return "bg-green-900 text-green-200";
			case "active":
				return "bg-yellow-900 text-yellow-200";
			case "cancelled":
				return "bg-red-900 text-red-200";
			default:
				return "bg-gray-900 text-gray-200";
		}
	};

	const getDotColor = () => {
		switch (status) {
			case "closed":
				return "bg-green-400";
			case "active":
				return "bg-yellow-400";
			case "cancelled":
				return "bg-red-400";
			default:
				return "bg-gray-400";
		}
	};

	return (
		<div className="bg-gray-800 rounded-lg p-3 text-center">
			<div
				className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${getStatusStyles()}`}
			>
				<div className={`w-1.5 h-1.5 rounded-full mr-2 ${getDotColor()}`} />
				{text}
			</div>
		</div>
	);
};
