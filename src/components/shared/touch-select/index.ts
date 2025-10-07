/**
 * TouchSelect - Barrel export
 * Punto de entrada principal para el componente TouchSelect
 */

// Constantes
export {
	GRID_COLS_CLASSES,
	TOUCH_SELECT_CLASSES,
	TOUCH_SELECT_SIZES,
} from "./constants";
// Componente principal
export { TouchSelect } from "./touch-select";
export { TouchSelectModal } from "./touch-select-modal";
export { TouchSelectOptionItem } from "./touch-select-option";
// Sub-componentes (exportados por si se necesitan usar individualmente)
export { TouchSelectTrigger } from "./touch-select-trigger";

// Tipos
export type {
	TouchSelectModalProps,
	TouchSelectOption,
	TouchSelectOptionItemProps,
	TouchSelectProps,
	TouchSelectTriggerProps,
} from "./types";
// Hook personalizado
export { useTouchSelect } from "./use-touch-select";
