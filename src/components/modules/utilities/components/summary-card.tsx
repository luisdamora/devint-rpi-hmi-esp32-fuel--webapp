import React from "react";
import { LucideIcon } from "lucide-react";

interface SummaryCardProps {
	title: string;
	value: string | number;
	icon: LucideIcon;
	iconColor?: string;
	subValue?: string;
	minHeight?: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
	title,
	value,
	icon: Icon,
	iconColor = "text-blue-400",
	subValue,
	minHeight = "min-h-0",
}) => (
	<div className={`bg-gray-800 rounded-lg p-3 text-center ${minHeight}`}>
		<Icon size={24} className={`mx-auto mb-1 ${iconColor}`} />
		<h3 className="text-xs font-medium text-gray-300 mb-1">{title}</h3>
		<p className="text-white font-semibold text-sm leading-tight">{value}</p>
		{subValue && (
			<p className="text-gray-400 text-xs leading-tight">{subValue}</p>
		)}
	</div>
);
