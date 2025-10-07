/**
 * TouchSelect - Barrel export
 * Punto de entrada principal para el componente TouchSelect
 */

// Componente principal
export { TouchSelect } from "./touch-select";

// Sub-componentes (exportados por si se necesitan usar individualmente)
export { TouchSelectTrigger } from "./touch-select-trigger";
export { TouchSelectModal } from "./touch-select-modal";
export { TouchSelectOptionItem } from "./touch-select-option";

// Hook personalizado
export { useTouchSelect } from "./use-touch-select";

// Tipos
export type {
	TouchSelectOption,
	TouchSelectProps,
	TouchSelectTriggerProps,
	TouchSelectModalProps,
	TouchSelectOptionItemProps,
} from "./types";

// Constantes
export {
	GRID_COLS_CLASSES,
	TOUCH_SELECT_SIZES,
	TOUCH_SELECT_CLASSES,
} from "./constants";
