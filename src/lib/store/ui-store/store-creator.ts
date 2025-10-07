/**
 * UI Store Creator
 * StateCreator que combina estado inicial y acciones
 */

import type { StateCreator } from "zustand";
import {
	createResetActions,
	createSessionActions,
	createUIActions,
} from "./actions";
import { initialState } from "./state";
import type { UIStore } from "./types";

// ============================================================================
// Store Creator
// ============================================================================

/**
 * StateCreator principal del UI Store
 * Combina estado inicial con todas las acciones
 */
export const createUIStoreSlice: StateCreator<
	UIStore,
	[["zustand/devtools", never], ["zustand/persist", unknown]],
	[],
	UIStore
> = (set, get, _store) => {
	return {
		// Estado inicial
		...initialState,

		// Session Actions
		...createSessionActions(set, get),

		// UI Actions
		...createUIActions(set),

		// Reset Actions
		...createResetActions(set),
	};
};
