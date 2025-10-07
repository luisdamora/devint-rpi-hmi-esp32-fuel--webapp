import React, { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { NEXUS_COLORS } from "@/lib/config/theme";
import { cn } from "@/lib/utils";

export interface TouchSelectOption {
	value: string;
	label: string;
	icon?: React.ReactNode;
	description?: string;
}

export interface TouchSelectProps {
	value: string;
	options: TouchSelectOption[];
	onChange: (value: string) => void;
	placeholder?: string;
	label?: string;
	disabled?: boolean;
	className?: string;
	gridCols?: 1 | 2 | 3 | 4;
}

export const TouchSelect: React.FC<TouchSelectProps> = ({
	value,
	options,
	onChange,
	placeholder = "Seleccione una opción...",
	label,
	disabled = false,
	className,
	gridCols = 2,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const selectedOption = options.find((opt) => opt.value === value);

	const handleSelect = (optionValue: string) => {
		onChange(optionValue);
		setIsOpen(false);
	};

	const handleOpen = () => {
		if (!disabled) {
			setIsOpen(true);
		}
	};

	const gridColsClass = {
		1: "grid-cols-1",
		2: "grid-cols-1 md:grid-cols-2",
		3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
		4: "grid-cols-2 lg:grid-cols-4",
	}[gridCols];

	return (
		<>
			{/* Input Display */}
			<div className={cn("relative", className)}>
				{label && (
					<div className="block text-white font-semibold mb-2 text-sm uppercase tracking-wide">
						{label}
					</div>
				)}
				<button
					type="button"
					onClick={handleOpen}
					disabled={disabled}
					className={cn(
						"w-full px-6 py-4 rounded-lg font-semibold focus:outline-none focus:ring-4 focus:ring-blue-500 bg-white text-left flex items-center justify-between transition-all",
						disabled && "opacity-50 cursor-not-allowed"
					)}
					style={{
						fontSize: "1.2rem",
						minHeight: "70px",
					}}
				>
					<span className={cn(
						"flex items-center gap-3",
						!selectedOption && "text-gray-400"
					)}>
						{selectedOption?.icon && (
							<span className="text-2xl">{selectedOption.icon}</span>
						)}
						<span className="text-gray-900">
							{selectedOption?.label || placeholder}
						</span>
					</span>
					<ChevronDown size={24} className="text-gray-500 flex-shrink-0" />
				</button>
			</div>

			{/* Fullscreen Modal */}
			{isOpen && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center"
					style={{ backgroundColor: NEXUS_COLORS.background.main }}
				>
					<div className="w-full h-full flex flex-col p-6">
						{/* Header with Close Button */}
						<div className="flex items-center justify-between mb-8">
							<h2 className="text-white text-3xl font-bold">
								{label || "Seleccione una opción"}
							</h2>
							<button
								type="button"
								onClick={() => setIsOpen(false)}
								className="p-4 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 transition-colors focus:outline-none focus:ring-4 focus:ring-red-500"
								style={{ minWidth: "60px", minHeight: "60px" }}
							>
								<X size={32} className="text-white" />
							</button>
						</div>

						{/* Options Grid */}
						<div className="flex-1 overflow-y-auto">
							<div className={cn("grid gap-4", gridColsClass)}>
								{options.map((option) => (
									<button
										key={option.value}
										type="button"
										onClick={() => handleSelect(option.value)}
										className={cn(
											"p-6 rounded-lg font-semibold text-left transition-all focus:outline-none focus:ring-4 focus:ring-blue-500",
											value === option.value
												? "bg-green-600 text-white border-4 border-green-400"
												: "bg-white text-gray-900 hover:bg-gray-100 active:bg-gray-200"
										)}
										style={{
											minHeight: "100px",
											fontSize: "1.1rem",
										}}
									>
										<div className="flex items-center gap-4">
											{option.icon && (
												<span className="text-4xl flex-shrink-0">
													{option.icon}
												</span>
											)}
											<div className="flex-1">
												<div className="font-bold text-xl">
													{option.label}
												</div>
												{option.description && (
													<div className={cn(
														"text-sm mt-1",
														value === option.value
															? "text-green-100"
															: "text-gray-600"
													)}>
														{option.description}
													</div>
												)}
											</div>
										</div>
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
