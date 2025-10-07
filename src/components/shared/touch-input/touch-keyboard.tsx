import { Delete, Space } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import {
	KEYBOARD_LAYOUT,
	NUMERIC_KEYBOARD_LAYOUT,
	TOUCH_INPUT_CLASSES,
	TOUCH_INPUT_SIZES,
} from "./constants";
import type { TouchKeyboardProps } from "./types";

/**
 * Teclado QWERTY virtual para TouchInput
 */
export const TouchKeyboard: React.FC<TouchKeyboardProps> = ({
	onKeyPress,
	onBackspace,
	onSpace,
	onToggleCase,
	isUppercase,
	mode = "full",
}) => {
	const handleKeyPress = (key: string) => {
		const finalKey = isUppercase ? key.toUpperCase() : key;
		onKeyPress(finalKey);
	};

	const keyStyle = {
		minWidth: TOUCH_INPUT_SIZES.keyboardKeySize,
		minHeight: TOUCH_INPUT_SIZES.keyboardKeySize,
		fontSize: TOUCH_INPUT_SIZES.keyboardKeyFontSize,
	};

	// Renderizar teclado numérico
	if (mode === "numeric") {
		return (
			<div className={TOUCH_INPUT_CLASSES.keyboardContainer}>
				{/* Fila 1: 1-3 */}
				<div className={TOUCH_INPUT_CLASSES.keyboardRow}>
					{NUMERIC_KEYBOARD_LAYOUT.row1.map((key) => (
						<button
							key={key}
							type="button"
							onClick={() => handleKeyPress(key)}
							className={cn(
								TOUCH_INPUT_CLASSES.key,
								TOUCH_INPUT_CLASSES.keyNormal,
							)}
							style={{ ...keyStyle, minWidth: "120px", minHeight: "80px" }}
						>
							{key}
						</button>
					))}
				</div>

				{/* Fila 2: 4-6 */}
				<div className={TOUCH_INPUT_CLASSES.keyboardRow}>
					{NUMERIC_KEYBOARD_LAYOUT.row2.map((key) => (
						<button
							key={key}
							type="button"
							onClick={() => handleKeyPress(key)}
							className={cn(
								TOUCH_INPUT_CLASSES.key,
								TOUCH_INPUT_CLASSES.keyNormal,
							)}
							style={{ ...keyStyle, minWidth: "120px", minHeight: "80px" }}
						>
							{key}
						</button>
					))}
				</div>

				{/* Fila 3: 7-9 */}
				<div className={TOUCH_INPUT_CLASSES.keyboardRow}>
					{NUMERIC_KEYBOARD_LAYOUT.row3.map((key) => (
						<button
							key={key}
							type="button"
							onClick={() => handleKeyPress(key)}
							className={cn(
								TOUCH_INPUT_CLASSES.key,
								TOUCH_INPUT_CLASSES.keyNormal,
							)}
							style={{ ...keyStyle, minWidth: "120px", minHeight: "80px" }}
						>
							{key}
						</button>
					))}
				</div>

				{/* Fila 4: - y 0 con backspace */}
				<div className={TOUCH_INPUT_CLASSES.keyboardRow}>
					{NUMERIC_KEYBOARD_LAYOUT.row4.map((key) => (
						<button
							key={key}
							type="button"
							onClick={() => handleKeyPress(key)}
							className={cn(
								TOUCH_INPUT_CLASSES.key,
								TOUCH_INPUT_CLASSES.keyNormal,
							)}
							style={{ ...keyStyle, minWidth: "120px", minHeight: "80px" }}
						>
							{key}
						</button>
					))}
					<button
						type="button"
						onClick={onBackspace}
						className={cn(
							TOUCH_INPUT_CLASSES.key,
							TOUCH_INPUT_CLASSES.keyAction,
						)}
						style={{ ...keyStyle, minWidth: "120px", minHeight: "80px" }}
						title="Borrar"
					>
						<Delete size={24} className="inline" />
					</button>
				</div>
			</div>
		);
	}

	// Renderizar teclado completo QWERTY
	return (
		<div className={TOUCH_INPUT_CLASSES.keyboardContainer}>
			{/* Fila 1: Números */}
			<div className={TOUCH_INPUT_CLASSES.keyboardRow}>
				{KEYBOARD_LAYOUT.row1.map((key) => (
					<button
						key={key}
						type="button"
						onClick={() => handleKeyPress(key)}
						className={cn(
							TOUCH_INPUT_CLASSES.key,
							TOUCH_INPUT_CLASSES.keyNormal,
						)}
						style={keyStyle}
					>
						{key}
					</button>
				))}
				<button
					type="button"
					onClick={onBackspace}
					className={cn(TOUCH_INPUT_CLASSES.key, TOUCH_INPUT_CLASSES.keyAction)}
					style={{ ...keyStyle, minWidth: "90px" }}
					title="Borrar"
				>
					<Delete size={18} className="inline" />
				</button>
			</div>

			{/* Fila 2: Q-P */}
			<div className={TOUCH_INPUT_CLASSES.keyboardRow}>
				{KEYBOARD_LAYOUT.row2.map((key) => (
					<button
						key={key}
						type="button"
						onClick={() => handleKeyPress(key)}
						className={cn(
							TOUCH_INPUT_CLASSES.key,
							TOUCH_INPUT_CLASSES.keyNormal,
						)}
						style={keyStyle}
					>
						{isUppercase ? key.toUpperCase() : key}
					</button>
				))}
			</div>

			{/* Fila 3: A-Ñ */}
			<div className={TOUCH_INPUT_CLASSES.keyboardRow}>
				<button
					type="button"
					onClick={onToggleCase}
					className={cn(
						TOUCH_INPUT_CLASSES.key,
						isUppercase
							? TOUCH_INPUT_CLASSES.keyAction
							: TOUCH_INPUT_CLASSES.keySpecial,
					)}
					style={{ ...keyStyle, minWidth: "70px" }}
					title="Mayúsculas/Minúsculas"
				>
					{isUppercase ? "ABC" : "abc"}
				</button>
				{KEYBOARD_LAYOUT.row3.map((key) => (
					<button
						key={key}
						type="button"
						onClick={() => handleKeyPress(key)}
						className={cn(
							TOUCH_INPUT_CLASSES.key,
							TOUCH_INPUT_CLASSES.keyNormal,
						)}
						style={keyStyle}
					>
						{isUppercase ? key.toUpperCase() : key}
					</button>
				))}
			</div>

			{/* Fila 4: Z-M + especiales */}
			<div className={TOUCH_INPUT_CLASSES.keyboardRow}>
				{KEYBOARD_LAYOUT.row4.map((key) => (
					<button
						key={key}
						type="button"
						onClick={() => handleKeyPress(key)}
						className={cn(
							TOUCH_INPUT_CLASSES.key,
							TOUCH_INPUT_CLASSES.keyNormal,
						)}
						style={keyStyle}
					>
						{isUppercase && /[a-z]/.test(key) ? key.toUpperCase() : key}
					</button>
				))}
			</div>

			{/* Fila 5: Espacio */}
			<div className={TOUCH_INPUT_CLASSES.keyboardRow}>
				<button
					type="button"
					onClick={onSpace}
					className={cn(
						TOUCH_INPUT_CLASSES.key,
						TOUCH_INPUT_CLASSES.keySpecial,
					)}
					style={{ ...keyStyle, minWidth: "400px" }}
					title="Espacio"
				>
					<Space size={18} className="inline mr-2" />
					Espacio
				</button>
			</div>
		</div>
	);
};
