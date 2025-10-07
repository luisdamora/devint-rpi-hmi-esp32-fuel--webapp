/**
 * TouchInput - Barrel export
 * Punto de entrada principal para el componente TouchInput
 */

// Constantes
export {
	KEYBOARD_LAYOUT,
	SPECIAL_CHARS,
	TOUCH_INPUT_CLASSES,
	TOUCH_INPUT_SIZES,
} from "./constants";
// Componente principal
export { TouchInput } from "./touch-input";
export { TouchInputModal } from "./touch-input-modal";
// Sub-componentes (exportados por si se necesitan usar individualmente)
export { TouchInputTrigger } from "./touch-input-trigger";
export { TouchKeyboard } from "./touch-keyboard";

// Tipos
export type {
	KeyboardKey,
	TouchInputModalProps,
	TouchInputProps,
	TouchInputTriggerProps,
	TouchKeyboardProps,
} from "./types";
// Hook personalizado
export { useTouchInput } from "./use-touch-input";
