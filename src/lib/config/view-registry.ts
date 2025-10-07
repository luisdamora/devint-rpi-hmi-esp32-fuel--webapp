import type { ViewRegistryItem } from "@/lib/types/modules";
import { SplashScreen } from "@/components/modules/auth/splash-screen";
import { MainMenu } from "@/components/modules/auth/main-menu";
import { LoginViewComponent } from "@/components/modules/auth/login-view";
import { CloseTurnViewComponent } from "@/components/modules/auth/close-turn-view";
import { KeypadViewComponent } from "@/components/modules/sales/keypad-view";
import { PaymentMethods } from "@/components/modules/sales/payment-methods";
import { PointsView } from "@/components/modules/loyalty/points-view";

/**
 * Central registry of all views in the HMI system
 */
export const VIEW_REGISTRY: ViewRegistryItem[] = [
  {
    id: "splash-screen",
    name: "Pantalla de Inicio",
    description: "Splash screen inicial del sistema",
    module: "splash",
    states: [
      {
        id: "default",
        name: "Default",
        filename: "nexus-pos-splash-screen-default.png",
      },
    ],
    component: SplashScreen,
  },
  {
    id: "main-menu",
    name: "Menú Principal",
    description: "Menú principal con opciones del sistema",
    module: "menu",
    states: [
      {
        id: "turn-inactive",
        name: "Turno Inactivo",
        filename: "nexus-pos-main-menu-turn-inactive.png",
      },
      {
        id: "turn-active",
        name: "Turno Activo",
        filename: "nexus-pos-main-menu-turn-active.png",
      },
    ],
    component: MainMenu,
  },
  {
    id: "login",
    name: "Iniciar Turno",
    description: "Vista de login para iniciar turno",
    module: "auth",
    states: [
      {
        id: "default",
        name: "Default",
        filename: "nexus-pos-login-default.png",
      },
    ],
    component: LoginViewComponent,
  },
  {
    id: "close-turn",
    name: "Cerrar Turno",
    description: "Vista para cerrar turno activo",
    module: "auth",
    states: [
      {
        id: "default",
        name: "Default",
        filename: "nexus-pos-close-turn-default.png",
      },
    ],
    component: CloseTurnViewComponent,
  },
  {
    id: "keypad",
    name: "Teclado Numérico",
    description: "Teclado para ingreso de montos",
    module: "sales",
    states: [
      {
        id: "money",
        name: "Modo Dinero",
        filename: "nexus-pos-keypad-money.png",
      },
      {
        id: "volume",
        name: "Modo Volumen",
        filename: "nexus-pos-keypad-volume.png",
      },
    ],
    component: KeypadViewComponent,
  },
  {
    id: "payment-methods",
    name: "Métodos de Pago",
    description: "Selección de métodos de pago",
    module: "sales",
    states: [
      {
        id: "default",
        name: "Default",
        filename: "nexus-pos-payment-methods-default.png",
      },
    ],
    component: PaymentMethods,
  },
  {
    id: "loyalty",
    name: "Puntos Colombia",
    description: "Consulta de puntos de fidelización",
    module: "loyalty",
    states: [
      {
        id: "default",
        name: "Default",
        filename: "nexus-pos-loyalty-default.png",
      },
    ],
    component: PointsView,
  },
];

/**
 * Get view by ID
 */
export function getViewById(id: string): ViewRegistryItem | undefined {
  return VIEW_REGISTRY.find((view) => view.id === id);
}

/**
 * Get all views for a module
 */
export function getViewsByModule(module: string): ViewRegistryItem[] {
  return VIEW_REGISTRY.filter((view) => view.module === module);
}

/**
 * Get all unique modules
 */
export function getAllModules(): string[] {
  return Array.from(new Set(VIEW_REGISTRY.map((view) => view.module)));
}

/**
 * Get views that should be shown in main navigation
 */
export function getNavigationViews(): ViewRegistryItem[] {
  return VIEW_REGISTRY.filter((view) =>
    ["main-menu", "login", "close-turn"].includes(view.id)
  );
}